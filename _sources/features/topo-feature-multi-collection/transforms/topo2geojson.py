import json, geopandas as gpd
import sys

from typing import Generator


def walk_features(data: list) -> Generator[dict, None, None]:
    """
    Walk features from a list of GeoJSON Features or FeatureCollections.

    Args:
        data: A list containing GeoJSON Feature or FeatureCollection objects

    Yields:
        Individual GeoJSON Feature dictionaries
    """
    for item in data:
        match item.get("type"):
            case "Feature":
                yield item
            case "FeatureCollection":
                yield from walk_features(item.get("features", []))
            case _:
                raise ValueError(f"Unexpected GeoJSON type: {item.get('type')!r}")

def extract_feature_coordinates(data: list) -> dict[str, object]:
    """
    Extract a mapping of feature IDs to their coordinates as JSON strings.

    Args:
        data: A list containing GeoJSON Feature or FeatureCollection objects

    Returns:
        A dictionary mapping feature ID -> JSON-encoded coordinates
    """
    return {
        feature["id"]: feature["geometry"]["coordinates"]
        for feature in walk_features(data)
    }

def process(input_data):
    if type(input_data) == str:
        data = json.loads(input_data)
    else:
        data = json.load(input_data)

    # Normalize: wrap a single Feature into a FeatureCollection
    is_feature = data.get("type") == "Feature"
    if is_feature:
        data = {"type": "FeatureCollection", "features": [data], "crs": data.get("crs")}

    # Extract CRS
    crs_name = data.get("crs", {}).get("properties", {}).get("name")
    epsg_code = crs_name.split(":")[-1] if crs_name else "4326"
    data["features"] = []
    # transfer coordinates to features
    for pc in data["points"]:
        data["features"].extend(pc["features"])
    geomsmap = extract_feature_coordinates(data["points"])
    for feat in walk_features ( data["edges"] ):
        if "topology" in feat:
            coords =  [ geomsmap[node] for node in feat["topology"]["references"] ]
            feat["geometry"] = { "type": "LineString", "coordinates": coords  }
            geomsmap[ feat["id"]]  = coords
        data["features"].append(feat)


    # Create GeoDataFrame from GeoJSON-like dict
    gdf = gpd.GeoDataFrame.from_features(data["features"])

    # Set CRS dynamically
    if epsg_code:
        gdf.set_crs(epsg=int(epsg_code), inplace=True)

    # Print current CRS
    print("Transform from CRS" + str(gdf.crs))

    # Transform to another CRS (example: ETRS89)
    if crs_name != "4326":
        gdf = gdf.to_crs(epsg=4326)
        # Print current CRS
        print("            to CRS" + str(gdf.crs))

    # Convert back to GeoJSON — unwrap back to a single Feature if input was one
    result = json.loads(gdf.to_json())
    if is_feature == 1:
        output_data = json.dumps(result["features"][0], indent=2)
    else:
        output_data = gdf.to_json(indent=2)
    return output_data

testmode = True
try:
    output_data = process(input_data)
    testmode = False
except:
    print("not running in transformer mode")
    pass

if __name__ == "__main__" and testmode:
    import argparse

    argparser = argparse.ArgumentParser()
    argparser.add_argument('-i', '--input_data', help="input file")
    argparser.add_argument('-o', '--output_file', help="output file")
    args = argparser.parse_args()
    if args.input_data:
        input_data = open(args.input_data, "r").read()
    else:
        print("No input file")

    output_data = process(input_data)

    if args.input_data:
        print(output_data)