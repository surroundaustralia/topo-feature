import json, geopandas as gpd
import sys


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

    # transfer coordinates to features
    data["features"] = data["points"]


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

# output_data = process(input_data)

if __name__ == "__main__":
    import argparse

    argparser = argparse.ArgumentParser()
    argparser.add_argument('-i', '--input_data', help="input file")
    argparser.add_argument('-o', '--output_file', help="output file")
    args = argparser.parse_args()
    if args.input_data:
        input_data = open(args.input_data[0], "r").read()
    else:
        print("No input file")

    output_data = process(input_data)

    if args.input_data:
        print(output_data)