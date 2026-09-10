
# Solid Aggregate Topology Feature (Schema)

`ogc.geo.topo.features.topo-solid-aggregate` *v0.1*

A feature representing an aggregation of Solid features into a single combined volumetric object, referencing its member Solids by id. Analogous to AggregatePolygon for Faces/Rings, but one dimension up.

[*Status*](http://www.opengis.net/def/status): Under development

## Description

# Solid Aggregate Topology Feature

A **SolidAggregate** is a topological feature representing a single combined volumetric object
formed by aggregating a set of existing Solid features, referenced by id.

Unlike a Solid — which is bounded by an ordered, oriented set of Shell references
(`directed_references`) describing its own boundary — a SolidAggregate describes no boundary
geometry of its own. It is a plain, unordered list of member Solid ids in its `references`
array, mirroring how [AggregatePolygon](../../../features/topo-feature-multi-collection/) combines
Polygon-topology parcels one dimension down.

## Topology Model

A SolidAggregate's topology consists of:

- `type`: `"SolidAggregate"`
- `references`: an array of feature ids, each referencing a member Solid feature

The `geometry` property is `null` — a renderer resolves the aggregate's extent by resolving each
referenced Solid in turn, the same as it would for those Solids individually.

## Relationship to other types

| Lower dimension                          | SolidAggregate       | Higher dimension |
|-------------------------------------------|----------------------|-------------------|
| Solid (referenced in `references`)        | **SolidAggregate**   | — |

## Example

```json
{
  "topology": {
    "type": "SolidAggregate",
    "references": [
      "uuid:758590d2-8cc6-4ff7-8fcc-d7ecd01b3498",
      "uuid:e7bbe46f-e375-42b6-84aa-e284bc0b9568"
    ]
  }
}
```

## Examples

### SolidAggregate combining two Solids, with full context
A SolidAggregate feature referencing two Solid features by id in its plain
(non-directed) `references` array. Describes no boundary geometry of its own — a
renderer resolves the combined volume by resolving each referenced Solid. Wrapped
in a FeatureCollection together with its two member Solids so the references
resolve within the example's own graph closure.

#### json
```json
{
  "id": "uuid:1c2d3e4f-5a6b-4c7d-8e9f-0a1b2c3d4e5f",
  "type": "FeatureCollection",
  "features": [
    {
      "id": "uuid:2a9e6b1a-6a3e-4b8a-9b0a-1a2b3c4d5e6f",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Solid",
        "directed_references": [
          { "ref": "uuid:97a089af-4929-4d36-8e01-74f573343edb", "orientation": "+" }
        ]
      },
      "properties": {
        "description": "Member Solid A",
        "volume": 1000.0
      }
    },
    {
      "id": "uuid:3b8f7c2b-7b4f-4c9b-8c1b-2b3c4d5e6f70",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Solid",
        "directed_references": [
          { "ref": "uuid:e7bbe46f-e375-42b6-84aa-e284bc0b9568", "orientation": "+" }
        ]
      },
      "properties": {
        "description": "Member Solid B",
        "volume": 1000.0
      }
    },
    {
      "id": "uuid:4a5c6e8f-1b2d-4e3f-9a0b-c1d2e3f4a5b6",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "SolidAggregate",
        "references": [
          "uuid:2a9e6b1a-6a3e-4b8a-9b0a-1a2b3c4d5e6f",
          "uuid:3b8f7c2b-7b4f-4c9b-8c1b-2b3c4d5e6f70"
        ]
      },
      "properties": {
        "description": "Combined volume formed by aggregating Solid A and Solid B",
        "volume": 2000.0
      }
    }
  ]
}

```

#### jsonld
```jsonld
{
  "@context": "https://surroundaustralia.github.io/topo-feature/build/annotated/geo/topo/features/topo-solid-aggregate/context.jsonld",
  "id": "uuid:1c2d3e4f-5a6b-4c7d-8e9f-0a1b2c3d4e5f",
  "type": "FeatureCollection",
  "features": [
    {
      "id": "uuid:2a9e6b1a-6a3e-4b8a-9b0a-1a2b3c4d5e6f",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Solid",
        "directed_references": [
          {
            "ref": "uuid:97a089af-4929-4d36-8e01-74f573343edb",
            "orientation": "+"
          }
        ]
      },
      "properties": {
        "description": "Member Solid A",
        "volume": 1000.0
      }
    },
    {
      "id": "uuid:3b8f7c2b-7b4f-4c9b-8c1b-2b3c4d5e6f70",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Solid",
        "directed_references": [
          {
            "ref": "uuid:e7bbe46f-e375-42b6-84aa-e284bc0b9568",
            "orientation": "+"
          }
        ]
      },
      "properties": {
        "description": "Member Solid B",
        "volume": 1000.0
      }
    },
    {
      "id": "uuid:4a5c6e8f-1b2d-4e3f-9a0b-c1d2e3f4a5b6",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "SolidAggregate",
        "references": [
          "uuid:2a9e6b1a-6a3e-4b8a-9b0a-1a2b3c4d5e6f",
          "uuid:3b8f7c2b-7b4f-4c9b-8c1b-2b3c4d5e6f70"
        ]
      },
      "properties": {
        "description": "Combined volume formed by aggregating Solid A and Solid B",
        "volume": 2000.0
      }
    }
  ]
}
```

#### ttl
```ttl
@prefix geojson: <https://purl.org/geojson/vocab#> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix topo: <https://purl.org/geojson/topo#> .

<uuid:1c2d3e4f-5a6b-4c7d-8e9f-0a1b2c3d4e5f> a geojson:FeatureCollection ;
    geojson:features <uuid:2a9e6b1a-6a3e-4b8a-9b0a-1a2b3c4d5e6f>,
        <uuid:3b8f7c2b-7b4f-4c9b-8c1b-2b3c4d5e6f70>,
        <uuid:4a5c6e8f-1b2d-4e3f-9a0b-c1d2e3f4a5b6> .

<uuid:4a5c6e8f-1b2d-4e3f-9a0b-c1d2e3f4a5b6> a geojson:Feature ;
    geojson:topology [ a topo:SolidAggregate ;
            topo:relatedFeatures ( <uuid:2a9e6b1a-6a3e-4b8a-9b0a-1a2b3c4d5e6f> <uuid:3b8f7c2b-7b4f-4c9b-8c1b-2b3c4d5e6f70> ) ] .

<uuid:2a9e6b1a-6a3e-4b8a-9b0a-1a2b3c4d5e6f> a geojson:Feature ;
    geojson:topology [ a topo:Solid ;
            topo:directedReferences ( [ topo:orientation "+" ;
                        topo:ref <uuid:97a089af-4929-4d36-8e01-74f573343edb> ] ) ] .

<uuid:3b8f7c2b-7b4f-4c9b-8c1b-2b3c4d5e6f70> a geojson:Feature ;
    geojson:topology [ a topo:Solid ;
            topo:directedReferences ( [ topo:orientation "+" ;
                        topo:ref <uuid:e7bbe46f-e375-42b6-84aa-e284bc0b9568> ] ) ] .


```

## Schema

```yaml
$schema: https://json-schema.org/draft/2020-12/schema
description: 'A SolidAggregate feature: a single combined volumetric object formed
  by referencing a set of member Solid features by id, without describing any new
  boundary geometry of its own. geometry must be null.'
$defs:
  testCollection:
    $anchor: testCollection
    description: A convenience ref to a complete, testable collection objects and
      references
    $ref: https://surroundaustralia.github.io/topo-feature/build/annotated/geo/topo/features/topo-feature-collection/schema.yaml
allOf:
- $ref: https://surroundaustralia.github.io/topo-feature/build/annotated/geo/topo/features/topo-feature/schema.yaml
- properties:
    geometry:
      type: 'null'
    topology:
      properties:
        type:
          type: string
          const: SolidAggregate
        references:
          type: array
          description: Ids of the member Solid features aggregated into this combined
            volume.
          items:
            $ref: https://opengeospatial.github.io/bblocks/annotated-schemas/ogc-utils/iri-or-curie/schema.yaml
          minItems: 1
      required:
      - type
      - references
      not:
        required:
        - directed_references
  required:
  - topology

```

Links to the schema:

* YAML version: [schema.yaml](https://surroundaustralia.github.io/topo-feature/build/annotated/geo/topo/features/topo-solid-aggregate/schema.json)
* JSON version: [schema.json](https://surroundaustralia.github.io/topo-feature/build/annotated/geo/topo/features/topo-solid-aggregate/schema.yaml)


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
      "@context": {
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
    "Edge": "topo:Edge",
    "Face": "topo:Face",
    "Ring": "topo:Ring",
    "Shell": "topo:Shell",
    "Solid": "topo:Solid",
    "SolidAggregate": "topo:SolidAggregate",
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
[context.jsonld](https://surroundaustralia.github.io/topo-feature/build/annotated/geo/topo/features/topo-solid-aggregate/context.jsonld)


# For developers

The source code for this Building Block can be found in the following repository:

* URL: [https://github.com/surroundaustralia/topo-feature](https://github.com/surroundaustralia/topo-feature)
* Path: `_sources/features/topo-solid-aggregate`

