
# TopoFeatureCollection (Schema)

`ogc.geo.topo.features.topo-feature-collection` *v0.1*

This building block defines a GeoJSON (or FG-JSON) Feature Collection for a set of features with geometries defined by topological relationships. From these it is possible to derive simplified geometries using coordinates for each feature.

[*Status*](http://www.opengis.net/def/status): Under development

## Description

## Feature Collection with Explicit Topology 

%definition% 

A Feature Collection where the set of TopoFeatures contained describe the full geometry of higher-dimension features by topology relationships, ultimately grounded in Point features with explicit coordinates.

TopoFeature is feature type using a topology property to reference an ordered list of references to other features. 

Other features may be either features with topology properties or GeoJSON (or FG-JSON) point objects.

This is a generalisation of the TopoJSON concept using inline data, but not limited to the LineStrings. Topological defined objects 
can be solids, swept volumes or any other concept.


## Examples

### Example referenced points (no topology)
#### json
```json
{
  "type": "FeatureCollection",
  "id": "pointsonly",
  "features": [
    {
      "type": "Feature",
      "id": "P1",
      "geometry": {
        "type": "Point",
        "coordinates": [
          10,
          10
        ]
      },
      "properties": null
    },
    {
      "type": "Feature",
      "id": "P2",
      "geometry": {
        "type": "Point",
        "coordinates": [
          20,
          20
        ]
      },
      "properties": null
    }
  ]
}
```

#### jsonld
```jsonld
{
  "@context": "https://surroundaustralia.github.io/topo-feature/build/annotated/geo/topo/features/topo-feature-collection/context.jsonld",
  "type": "FeatureCollection",
  "id": "pointsonly",
  "features": [
    {
      "type": "Feature",
      "id": "P1",
      "geometry": {
        "type": "Point",
        "coordinates": [
          10,
          10
        ]
      },
      "properties": null
    },
    {
      "type": "Feature",
      "id": "P2",
      "geometry": {
        "type": "Point",
        "coordinates": [
          20,
          20
        ]
      },
      "properties": null
    }
  ]
}
```

#### ttl
```ttl
@prefix geojson: <https://purl.org/geojson/vocab#> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

<http://www.example.com/features/pointsonly> a geojson:FeatureCollection ;
    geojson:features <http://www.example.com/features/P1>,
        <http://www.example.com/features/P2> .

<http://www.example.com/features/P1> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 10 10 ) ] .

<http://www.example.com/features/P2> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 20 20 ) ] .


```


### Example Lines
#### json
```json
{
  "type": "FeatureCollection",
  "id": "line",
  "features": [
    {
      "type": "Feature",
      "id": "LineP1P2",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "P1",
          "P2"
        ]
      },
      "properties": null
    },
    {
      "type": "Feature",
      "id": "P1",
      "geometry": {
        "type": "Point",
        "coordinates": [
          10,
          10
        ]
      },
      "properties": null
    },
    {
      "type": "Feature",
      "id": "P2",
      "geometry": {
        "type": "Point",
        "coordinates": [
          20,
          20
        ]
      },
      "properties": null
    }
  ]
}
```

#### jsonld
```jsonld
{
  "@context": "https://surroundaustralia.github.io/topo-feature/build/annotated/geo/topo/features/topo-feature-collection/context.jsonld",
  "type": "FeatureCollection",
  "id": "line",
  "features": [
    {
      "type": "Feature",
      "id": "LineP1P2",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "P1",
          "P2"
        ]
      },
      "properties": null
    },
    {
      "type": "Feature",
      "id": "P1",
      "geometry": {
        "type": "Point",
        "coordinates": [
          10,
          10
        ]
      },
      "properties": null
    },
    {
      "type": "Feature",
      "id": "P2",
      "geometry": {
        "type": "Point",
        "coordinates": [
          20,
          20
        ]
      },
      "properties": null
    }
  ]
}
```

#### ttl
```ttl
@prefix geojson: <https://purl.org/geojson/vocab#> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

<http://www.example.com/features/line> a geojson:FeatureCollection ;
    geojson:features <http://www.example.com/features/LineP1P2>,
        <http://www.example.com/features/P1>,
        <http://www.example.com/features/P2> .

<http://www.example.com/features/LineP1P2> a geojson:Feature ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <http://www.example.com/features/P1> <http://www.example.com/features/P2> ) ] .

<http://www.example.com/features/P1> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 10 10 ) ] .

<http://www.example.com/features/P2> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 20 20 ) ] .


```


### Points Lines and Polygons
#### json
```json
{
  "type": "FeatureCollection",
  "id": "TopoCollectionExample",
  "features": [
    {
      "type": "Feature",
      "id": "P1",
      "geometry": {
        "type": "Point",
        "coordinates": [
          10,
          10
        ]
      },
      "properties": null
    },
    {
      "type": "Feature",
      "id": "P2",
      "geometry": {
        "type": "Point",
        "coordinates": [
          20,
          20
        ]
      },
      "properties": null
    },
    {
      "type": "Feature",
      "id": "P3",
      "geometry": {
        "type": "Point",
        "coordinates": [
          10,
          20
        ]
      },
      "properties": null
    },
    {
      "type": "Feature",
      "id": "LineP1P2",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "P1",
          "P2"
        ]
      },
      "properties": null
    },
    {
      "type": "Feature",
      "id": "LineP2P3",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "P2",
          "P3"
        ]
      },
      "properties": null
    },
    {
      "type": "Feature",
      "id": "LineP3P1",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "P3",
          "P1"
        ]
      },
      "properties": null
    },
    {
      "type": "Feature",
      "id": "TriangleP1P2P3",
      "geometry": null,
      "topology": {
        "type": "Polygon",
        "references": [
          "LineP1P2",
          "LineP2P3",
          "LineP3P1"
        ]
      },
      "properties": null
    }
  ]
}
```

#### jsonld
```jsonld
{
  "@context": "https://surroundaustralia.github.io/topo-feature/build/annotated/geo/topo/features/topo-feature-collection/context.jsonld",
  "type": "FeatureCollection",
  "id": "TopoCollectionExample",
  "features": [
    {
      "type": "Feature",
      "id": "P1",
      "geometry": {
        "type": "Point",
        "coordinates": [
          10,
          10
        ]
      },
      "properties": null
    },
    {
      "type": "Feature",
      "id": "P2",
      "geometry": {
        "type": "Point",
        "coordinates": [
          20,
          20
        ]
      },
      "properties": null
    },
    {
      "type": "Feature",
      "id": "P3",
      "geometry": {
        "type": "Point",
        "coordinates": [
          10,
          20
        ]
      },
      "properties": null
    },
    {
      "type": "Feature",
      "id": "LineP1P2",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "P1",
          "P2"
        ]
      },
      "properties": null
    },
    {
      "type": "Feature",
      "id": "LineP2P3",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "P2",
          "P3"
        ]
      },
      "properties": null
    },
    {
      "type": "Feature",
      "id": "LineP3P1",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "P3",
          "P1"
        ]
      },
      "properties": null
    },
    {
      "type": "Feature",
      "id": "TriangleP1P2P3",
      "geometry": null,
      "topology": {
        "type": "Polygon",
        "references": [
          "LineP1P2",
          "LineP2P3",
          "LineP3P1"
        ]
      },
      "properties": null
    }
  ]
}
```

#### ttl
```ttl
@prefix geojson: <https://purl.org/geojson/vocab#> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

<http://www.example.com/features/TopoCollectionExample> a geojson:FeatureCollection ;
    geojson:features <http://www.example.com/features/LineP1P2>,
        <http://www.example.com/features/LineP2P3>,
        <http://www.example.com/features/LineP3P1>,
        <http://www.example.com/features/P1>,
        <http://www.example.com/features/P2>,
        <http://www.example.com/features/P3>,
        <http://www.example.com/features/TriangleP1P2P3> .

<http://www.example.com/features/TriangleP1P2P3> a geojson:Feature ;
    geojson:topology [ a geojson:Polygon ;
            geojson:relatedFeatures ( <http://www.example.com/features/LineP1P2> <http://www.example.com/features/LineP2P3> <http://www.example.com/features/LineP3P1> ) ] .

<http://www.example.com/features/LineP1P2> a geojson:Feature ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <http://www.example.com/features/P1> <http://www.example.com/features/P2> ) ] .

<http://www.example.com/features/LineP2P3> a geojson:Feature ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <http://www.example.com/features/P2> <http://www.example.com/features/P3> ) ] .

<http://www.example.com/features/LineP3P1> a geojson:Feature ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <http://www.example.com/features/P3> <http://www.example.com/features/P1> ) ] .

<http://www.example.com/features/P1> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 10 10 ) ] .

<http://www.example.com/features/P2> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 20 20 ) ] .

<http://www.example.com/features/P3> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 10 20 ) ] .


```

## Schema

```yaml
$schema: https://json-schema.org/draft/2020-12/schema
description: Feature Collection with defined topology for bounding elements
$defs:
  FeatureCollectionOptions:
    $anchor: FeatureCollectionOptions
    anyOf:
    - $ref: https://opengeospatial.github.io/bblocks/annotated-schemas/geo/json-fg/featureCollection/schema.yaml
    - $ref: https://opengeospatial.github.io/bblocks/annotated-schemas/geo/json-fg/featureCollection-lenient/schema.yaml
    - $ref: https://opengeospatial.github.io/bblocks/annotated-schemas/geo/features/featureCollection/schema.yaml
  FeatureOptions:
    $anchor: FeatureOptions
    anyOf:
    - $ref: https://opengeospatial.github.io/bblocks/annotated-schemas/geo/json-fg/feature/schema.yaml
    - $ref: https://opengeospatial.github.io/bblocks/annotated-schemas/geo/json-fg/feature-lenient/schema.yaml
    - $ref: https://opengeospatial.github.io/bblocks/annotated-schemas/geo/features/feature/schema.yaml
  PointOptions:
    $anchor: PointOptions
    anyOf:
    - allOf:
      - $ref: '#/$defs/FeatureOptions'
      - properties:
          geometry:
            properties:
              type:
                type: string
                enum:
                - Point
allOf:
- $ref: '#/$defs/FeatureCollectionOptions'
properties:
  features:
    type: array
    items:
      anyOf:
      - $ref: https://surroundaustralia.github.io/topo-feature/build/annotated/geo/topo/features/topo-feature/schema.yaml
      - $ref: '#/$defs/PointOptions'

```

Links to the schema:

* YAML version: [schema.yaml](https://surroundaustralia.github.io/topo-feature/build/annotated/geo/topo/features/topo-feature-collection/schema.json)
* JSON version: [schema.json](https://surroundaustralia.github.io/topo-feature/build/annotated/geo/topo/features/topo-feature-collection/schema.yaml)


# JSON-LD Context

```jsonld
{
  "@context": {
    "type": "@type",
    "features": {
      "@id": "geojson:features",
      "@container": "@set"
    },
    "bbox": {
      "@id": "geojson:bbox",
      "@container": "@list"
    },
    "links": {
      "@context": {
        "href": {
          "@type": "@id",
          "@id": "oa:hasTarget"
        },
        "rel": {
          "@context": {
            "@base": "http://www.iana.org/assignments/relation/"
          },
          "@id": "http://www.iana.org/assignments/relation",
          "@type": "@id"
        },
        "type": "dct:type",
        "hreflang": "dct:language",
        "title": "rdfs:label",
        "length": "dct:extent"
      },
      "@id": "rdfs:seeAlso"
    },
    "properties": "@nest",
    "featureType": "@type",
    "coordRefSys": "http://www.opengis.net/def/glossary/term/CoordinateReferenceSystemCRS",
    "Feature": "geojson:Feature",
    "FeatureCollection": "geojson:FeatureCollection",
    "GeometryCollection": "geojson:GeometryCollection",
    "LineString": "geojson:LineString",
    "MultiLineString": "geojson:MultiLineString",
    "MultiPoint": "geojson:MultiPoint",
    "MultiPolygon": "geojson:MultiPolygon",
    "Point": "geojson:Point",
    "Polygon": "geojson:Polygon",
    "id": "@id",
    "geometry": "geojson:geometry",
    "time": {
      "@context": {
        "date": {
          "@id": "owlTime:hasTime",
          "@type": "xsd:date"
        },
        "timestamp": {
          "@id": "owlTime:hasTime",
          "@type": "xsd:dateTime"
        },
        "interval": {
          "@id": "owlTime:hasTime",
          "@container": "@list"
        }
      },
      "@id": "dct:time"
    },
    "place": "dct:spatial",
    "Polyhedron": "geojson:Polyhedron",
    "MultiPolyhedron": "geojson:MultiPolyhedron",
    "Prism": {
      "@id": "geojson:Prism",
      "@context": {
        "base": "geojson:prismBase",
        "lower": "geojson:prismLower",
        "upper": "geojson:prismUpper"
      }
    },
    "MultiPrism": {
      "@id": "geojson:MultiPrism",
      "@context": {
        "prisms": "geojson:prisms"
      }
    },
    "coordinates": {
      "@container": "@list",
      "@id": "geojson:coordinates"
    },
    "geometries": {
      "@id": "geojson:geometry",
      "@container": "@list"
    },
    "topology": {
      "@context": {
        "references": {
          "@context": {
            "ref": {
              "@type": "@id",
              "@id": "topo:ref"
            }
          },
          "@id": "geojson:relatedFeatures",
          "@type": "@id",
          "@container": "@list"
        },
        "directed_references": {
          "@context": {
            "ref": {
              "@type": "@id",
              "@id": "topo:ref"
            }
          },
          "@id": "topo:directedReferences",
          "@container": "@list"
        },
        "rings": {
          "@id": "topo:rings",
          "@container": "@list"
        },
        "shells": {
          "@id": "topo:shells",
          "@container": "@list"
        }
      },
      "@type": "@id",
      "@id": "geojson:topology"
    },
    "Arc": "geojson:Arc",
    "ArcWithCenter": "geojson:ArcWithCenter",
    "ArcByChord": "geojson:ArcByChord",
    "CircleByCenter": "geojson:CircleByCenter",
    "CubicSpline": "geojson:CubicSpline",
    "radius": "geojson:radius",
    "arcLength": "geojson:arcLength",
    "startTangentVector": "geojson:startTangentVector",
    "endTangentVector": "geojson:endTangentVector",
    "ref": "topo:ref",
    "orientation": "topo:orientation",
    "Face": "topo:Face",
    "Ring": "topo:Ring",
    "Shell": "topo:Shell",
    "Solid": "topo:Solid",
    "rdfs": "http://www.w3.org/2000/01/rdf-schema#",
    "geojson": "https://purl.org/geojson/vocab#",
    "oa": "http://www.w3.org/ns/oa#",
    "dct": "http://purl.org/dc/terms/",
    "owlTime": "http://www.w3.org/2006/time#",
    "xsd": "http://www.w3.org/2001/XMLSchema#",
    "csdm": "https://linked.data.gov.au/def/csdm/",
    "topo": "https://purl.org/geojson/topo#",
    "@version": 1.1
  }
}
```

You can find the full JSON-LD context here:
[context.jsonld](https://surroundaustralia.github.io/topo-feature/build/annotated/geo/topo/features/topo-feature-collection/context.jsonld)


# For developers

The source code for this Building Block can be found in the following repository:

* URL: [https://github.com/surroundaustralia/topo-feature](https://github.com/surroundaustralia/topo-feature)
* Path: `_sources/features/topo-feature-collection`

