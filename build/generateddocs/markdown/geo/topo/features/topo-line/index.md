
# Line using Point References (Schema)

`ogc.geo.topo.features.topo-line` *v0.1*

Demonstration of a schema using coordinates of points, without duplication. Reuses context but constrains to Line types

[*Status*](http://www.opengis.net/def/status): Under development

## Description

## Topology defined Line

%definition% 

A feature type using a topology property to reference an ordered list of points.

The topology property has an ordered array, defining the direction of the line from the first to second and subsequent points.

This is a generalisation of the TopoJSON concept using inline data, and hence not limited to linestrings.


## Examples

### LineString
#### json
```json
{
  "type": "Feature",
  "id": "LineP1P2",
  "geometry": null,
  "topology": {
    "type": "Edge",
    "references": [
      "P1",
      "P2"
    ]
  },
  "properties": null
}
```

#### jsonld
```jsonld
{
  "@context": "https://surroundaustralia.github.io/topo-feature/build/annotated/geo/topo/features/topo-line/context.jsonld",
  "type": "Feature",
  "id": "LineP1P2",
  "geometry": null,
  "topology": {
    "type": "Edge",
    "references": [
      "P1",
      "P2"
    ]
  },
  "properties": null
}
```

#### ttl
```ttl
@prefix geojson: <https://purl.org/geojson/vocab#> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix topo: <https://purl.org/geojson/topo#> .

<http://www.example.com/features/LineP1P2> a geojson:Feature ;
    geojson:topology [ a topo:Edge ;
            topo:relatedFeatures ( <http://www.example.com/features/P1> <http://www.example.com/features/P2> ) ] .


```


### MultiLineString
#### json
```json
{
  "type": "Feature",
  "id": "MultiLineP1P2P3",
  "geometry": null,
  "topology": {
    "type": "MultiLineString",
    "references": [
      [
        "P1",
        "P2"
      ],
      [
        "P2",
        "P3"
      ]
    ]
  },
  "properties": null
}
```

#### jsonld
```jsonld
{
  "@context": "https://surroundaustralia.github.io/topo-feature/build/annotated/geo/topo/features/topo-line/context.jsonld",
  "type": "Feature",
  "id": "MultiLineP1P2P3",
  "geometry": null,
  "topology": {
    "type": "MultiLineString",
    "references": [
      [
        "P1",
        "P2"
      ],
      [
        "P2",
        "P3"
      ]
    ]
  },
  "properties": null
}
```

#### ttl
```ttl
@prefix geojson: <https://purl.org/geojson/vocab#> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix topo: <https://purl.org/geojson/topo#> .

<http://www.example.com/features/MultiLineP1P2P3> a geojson:Feature ;
    geojson:topology [ a geojson:MultiLineString ;
            topo:relatedFeatures ( ( <http://www.example.com/features/P1> <http://www.example.com/features/P2> ) ( <http://www.example.com/features/P2> <http://www.example.com/features/P3> ) ) ] .


```

## Schema

```yaml
$schema: https://json-schema.org/draft/2020-12/schema
description: Line Feature with geometry by reference
allOf:
- $ref: https://surroundaustralia.github.io/topo-feature/build/annotated/geo/topo/features/topo-feature/schema.yaml
- properties:
    topology:
      allOf:
      - $ref: https://surroundaustralia.github.io/topo-feature/build/annotated/geo/topo/datatypes/topology/schema.yaml
      - properties:
          type:
            type: string
            enum:
            - Edge
            - LineString
            - MultiLineString
  required:
  - topology

```

Links to the schema:

* YAML version: [schema.yaml](https://surroundaustralia.github.io/topo-feature/build/annotated/geo/topo/features/topo-line/schema.json)
* JSON version: [schema.json](https://surroundaustralia.github.io/topo-feature/build/annotated/geo/topo/features/topo-line/schema.yaml)


# JSON-LD Context

```jsonld
{
  "@context": {
    "Feature": "geojson:Feature",
    "FeatureCollection": "geojson:FeatureCollection",
    "GeometryCollection": "geojson:GeometryCollection",
    "LineString": "geojson:LineString",
    "MultiLineString": "geojson:MultiLineString",
    "MultiPoint": "geojson:MultiPoint",
    "MultiPolygon": "geojson:MultiPolygon",
    "Point": "geojson:Point",
    "Polygon": "geojson:Polygon",
    "features": {
      "@container": "@set",
      "@id": "geojson:features"
    },
    "type": "@type",
    "id": "@id",
    "properties": "@nest",
    "geometry": "geojson:geometry",
    "bbox": {
      "@container": "@list",
      "@id": "geojson:bbox"
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
    "featureType": "@type",
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
    "coordRefSys": "http://www.opengis.net/def/glossary/term/CoordinateReferenceSystemCRS",
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
      "@type": "@id",
      "@id": "geojson:topology"
    },
    "references": {
      "@id": "topo:relatedFeatures",
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
    "relationships": {
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
        "length": "dct:extent",
        "role": {
          "@id": "prof:hasRole",
          "@type": "@id"
        },
        "conformsTo": {
          "@id": "dct:conformsTo",
          "@type": "@id"
        }
      },
      "@id": "topo:relatedFeatures",
      "@type": "@id",
      "@container": "@list"
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
    "Edge": "topo:Edge",
    "Face": "topo:Face",
    "Ring": "topo:Ring",
    "Shell": "topo:Shell",
    "Solid": "topo:Solid",
    "rings": {
      "@id": "topo:rings",
      "@container": "@list"
    },
    "shells": {
      "@id": "topo:shells",
      "@container": "@list"
    },
    "faces": {
      "@id": "topo:faces",
      "@container": "@list"
    },
    "geojson": "https://purl.org/geojson/vocab#",
    "rdfs": "http://www.w3.org/2000/01/rdf-schema#",
    "oa": "http://www.w3.org/ns/oa#",
    "dct": "http://purl.org/dc/terms/",
    "owlTime": "http://www.w3.org/2006/time#",
    "xsd": "http://www.w3.org/2001/XMLSchema#",
    "topo": "https://purl.org/geojson/topo#",
    "prof": "http://www.w3.org/ns/dx/prof/",
    "@version": 1.1
  }
}
```

You can find the full JSON-LD context here:
[context.jsonld](https://surroundaustralia.github.io/topo-feature/build/annotated/geo/topo/features/topo-line/context.jsonld)


# For developers

The source code for this Building Block can be found in the following repository:

* URL: [https://github.com/surroundaustralia/topo-feature](https://github.com/surroundaustralia/topo-feature)
* Path: `_sources/features/topo-line`

