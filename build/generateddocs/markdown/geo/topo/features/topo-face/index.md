
# Face Topology Feature (Schema)

`ogc.geo.topo.features.topo-face` *v0.1*

A feature representing a Face in topology: a bounded planar region described by an outer boundary Ring and zero or more inner boundary (hole) Rings. Faces are used as the surfaces of a Shell/Solid.

[*Status*](http://www.opengis.net/def/status): Under development

## Description

# Face Topology Feature

A **Face** is a topological feature representing a bounded planar region (a polygon surface) described by an outer boundary Ring and zero or more inner boundary Rings (holes).

## Topology Model

A Face's topology consists of:

- `type`: `"Face"`
- `rings`: an ordered array of Ring topology objects
  - The **first** ring is the **outer boundary**
  - Any **subsequent** rings are **inner boundaries** (holes)

Each Ring contains a `directed_references` array — an ordered list of [Oriented Object References](../../datatypes/oriented-ref/) that reference Edge features, with orientation (`+` or `-`) indicating direction of traversal.

The `geometry` property is `null` — actual coordinates are derived from the referenced Edge and Point features.

## Relationship to other types

| Lower dimension | Face | Higher dimension |
|---|---|---|
| Edge (referenced in Ring directed_references) | **Face** | Shell (references Faces via directed_references) |

## Example

```json
{
  "id": "uuid:4ac3b91b-eeb7-428c-b5e9-7e8a3f0998ae",
  "type": "Feature",
  "geometry": null,
  "topology": {
    "type": "Face",
    "rings": [
      {
        "type": "Ring",
        "directed_references": [
          { "ref": "uuid:c60507ba-226b-4e49-a702-e9afef899b23", "orientation": "+" },
          { "ref": "uuid:7dc1cc1c-8e7f-4666-9f52-4e6c2e6f57ac", "orientation": "+" },
          { "ref": "uuid:83ff2cdf-6c58-4e7b-ba55-e084eff8c569", "orientation": "+" },
          { "ref": "uuid:d69c596c-134e-4216-9bf6-d0f10e6886d8", "orientation": "+" }
        ]
      }
    ]
  },
  "properties": {
    "normal": [1.0, 0.0, 0.0],
    "area": 24.0
  }
}
```

## Examples

### Face with full topological context (points + edges + face)
A self-contained example showing a single Face feature alongside all the supporting
Edge and Point features it references. The face outer Ring has 4 oriented Edge references
in its directed_references array. Point geometry provides actual coordinates;
edge and face geometry are null (topology-only).

#### json
```json
{
  "type": "FeatureCollection",
  "comment": "Self-contained example: a single Face with all supporting edges and points included",
  "features": [],
  "points": [
    {
      "id": "uuid:ad6d8fcc-402c-482e-8f1a-7492ccaead38",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          18.0,
          10.0,
          3.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:8d2be28b-8f31-46de-99cb-4d8709502cd0",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          18.0,
          10.0,
          6.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:c611f840-2829-44b2-b367-3915ca7875a4",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          18.0,
          2.0,
          6.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:fad324b9-801f-40f4-b65b-91f8753e9698",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          18.0,
          2.0,
          3.0
        ]
      },
      "properties": null
    }
  ],
  "edges": [
    {
      "id": "uuid:c60507ba-226b-4e49-a702-e9afef899b23",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:ad6d8fcc-402c-482e-8f1a-7492ccaead38",
          "uuid:8d2be28b-8f31-46de-99cb-4d8709502cd0"
        ]
      },
      "properties": {
        "length": 3.0
      }
    },
    {
      "id": "uuid:7dc1cc1c-8e7f-4666-9f52-4e6c2e6f57ac",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:8d2be28b-8f31-46de-99cb-4d8709502cd0",
          "uuid:c611f840-2829-44b2-b367-3915ca7875a4"
        ]
      },
      "properties": {
        "length": 8.0
      }
    },
    {
      "id": "uuid:83ff2cdf-6c58-4e7b-ba55-e084eff8c569",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:c611f840-2829-44b2-b367-3915ca7875a4",
          "uuid:fad324b9-801f-40f4-b65b-91f8753e9698"
        ]
      },
      "properties": {
        "length": 3.0
      }
    },
    {
      "id": "uuid:d69c596c-134e-4216-9bf6-d0f10e6886d8",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:fad324b9-801f-40f4-b65b-91f8753e9698",
          "uuid:ad6d8fcc-402c-482e-8f1a-7492ccaead38"
        ]
      },
      "properties": {
        "length": 8.0
      }
    }
  ],
  "faces": [
    {
      "id": "uuid:4ac3b91b-eeb7-428c-b5e9-7e8a3f0998ae",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:c60507ba-226b-4e49-a702-e9afef899b23",
                "orientation": "+"
              },
              {
                "ref": "uuid:7dc1cc1c-8e7f-4666-9f52-4e6c2e6f57ac",
                "orientation": "+"
              },
              {
                "ref": "uuid:83ff2cdf-6c58-4e7b-ba55-e084eff8c569",
                "orientation": "+"
              },
              {
                "ref": "uuid:d69c596c-134e-4216-9bf6-d0f10e6886d8",
                "orientation": "+"
              }
            ]
          }
        ]
      },
      "properties": {
        "normal": [
          1.0,
          0.0,
          -0.0
        ],
        "area": 24.0
      }
    }
  ]
}
```

#### jsonld
```jsonld
{
  "@context": "https://surroundaustralia.github.io/topo-feature/build/annotated/geo/topo/features/topo-face/context.jsonld",
  "type": "FeatureCollection",
  "comment": "Self-contained example: a single Face with all supporting edges and points included",
  "features": [],
  "points": [
    {
      "id": "uuid:ad6d8fcc-402c-482e-8f1a-7492ccaead38",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          18.0,
          10.0,
          3.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:8d2be28b-8f31-46de-99cb-4d8709502cd0",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          18.0,
          10.0,
          6.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:c611f840-2829-44b2-b367-3915ca7875a4",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          18.0,
          2.0,
          6.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:fad324b9-801f-40f4-b65b-91f8753e9698",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          18.0,
          2.0,
          3.0
        ]
      },
      "properties": null
    }
  ],
  "edges": [
    {
      "id": "uuid:c60507ba-226b-4e49-a702-e9afef899b23",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:ad6d8fcc-402c-482e-8f1a-7492ccaead38",
          "uuid:8d2be28b-8f31-46de-99cb-4d8709502cd0"
        ]
      },
      "properties": {
        "length": 3.0
      }
    },
    {
      "id": "uuid:7dc1cc1c-8e7f-4666-9f52-4e6c2e6f57ac",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:8d2be28b-8f31-46de-99cb-4d8709502cd0",
          "uuid:c611f840-2829-44b2-b367-3915ca7875a4"
        ]
      },
      "properties": {
        "length": 8.0
      }
    },
    {
      "id": "uuid:83ff2cdf-6c58-4e7b-ba55-e084eff8c569",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:c611f840-2829-44b2-b367-3915ca7875a4",
          "uuid:fad324b9-801f-40f4-b65b-91f8753e9698"
        ]
      },
      "properties": {
        "length": 3.0
      }
    },
    {
      "id": "uuid:d69c596c-134e-4216-9bf6-d0f10e6886d8",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:fad324b9-801f-40f4-b65b-91f8753e9698",
          "uuid:ad6d8fcc-402c-482e-8f1a-7492ccaead38"
        ]
      },
      "properties": {
        "length": 8.0
      }
    }
  ],
  "faces": [
    {
      "id": "uuid:4ac3b91b-eeb7-428c-b5e9-7e8a3f0998ae",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:c60507ba-226b-4e49-a702-e9afef899b23",
                "orientation": "+"
              },
              {
                "ref": "uuid:7dc1cc1c-8e7f-4666-9f52-4e6c2e6f57ac",
                "orientation": "+"
              },
              {
                "ref": "uuid:83ff2cdf-6c58-4e7b-ba55-e084eff8c569",
                "orientation": "+"
              },
              {
                "ref": "uuid:d69c596c-134e-4216-9bf6-d0f10e6886d8",
                "orientation": "+"
              }
            ]
          }
        ]
      },
      "properties": {
        "normal": [
          1.0,
          0.0,
          -0.0
        ],
        "area": 24.0
      }
    }
  ]
}
```

#### ttl
```ttl
@prefix geojson: <https://purl.org/geojson/vocab#> .

[] a geojson:FeatureCollection .


```


### Simple Face (4-edge rectangular face)
A Face feature with a single outer Ring containing four oriented Edge references
in directed_references. All edges are traversed in the '+' (forward) direction,
closing the loop. geometry is null — coordinates are derived from the referenced edges and points.

#### json
```json
{
  "id": "uuid:4ac3b91b-eeb7-428c-b5e9-7e8a3f0998ae",
  "type": "Feature",
  "geometry": null,
  "topology": {
    "type": "Face",
    "rings": [
      {
        "type": "Ring",
        "directed_references": [
          {
            "ref": "uuid:c60507ba-226b-4e49-a702-e9afef899b23",
            "orientation": "+"
          },
          {
            "ref": "uuid:7dc1cc1c-8e7f-4666-9f52-4e6c2e6f57ac",
            "orientation": "+"
          },
          {
            "ref": "uuid:83ff2cdf-6c58-4e7b-ba55-e084eff8c569",
            "orientation": "+"
          },
          {
            "ref": "uuid:d69c596c-134e-4216-9bf6-d0f10e6886d8",
            "orientation": "+"
          }
        ]
      }
    ]
  },
  "properties": {
    "normal": [
      1.0,
      0.0,
      0.0
    ],
    "area": 24.0
  }
}
```

#### jsonld
```jsonld
{
  "@context": "https://surroundaustralia.github.io/topo-feature/build/annotated/geo/topo/features/topo-face/context.jsonld",
  "id": "uuid:4ac3b91b-eeb7-428c-b5e9-7e8a3f0998ae",
  "type": "Feature",
  "geometry": null,
  "topology": {
    "type": "Face",
    "rings": [
      {
        "type": "Ring",
        "directed_references": [
          {
            "ref": "uuid:c60507ba-226b-4e49-a702-e9afef899b23",
            "orientation": "+"
          },
          {
            "ref": "uuid:7dc1cc1c-8e7f-4666-9f52-4e6c2e6f57ac",
            "orientation": "+"
          },
          {
            "ref": "uuid:83ff2cdf-6c58-4e7b-ba55-e084eff8c569",
            "orientation": "+"
          },
          {
            "ref": "uuid:d69c596c-134e-4216-9bf6-d0f10e6886d8",
            "orientation": "+"
          }
        ]
      }
    ]
  },
  "properties": {
    "normal": [
      1.0,
      0.0,
      0.0
    ],
    "area": 24.0
  }
}
```

#### ttl
```ttl
@prefix geojson: <https://purl.org/geojson/vocab#> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix topo: <https://purl.org/geojson/topo#> .

<uuid:4ac3b91b-eeb7-428c-b5e9-7e8a3f0998ae> a geojson:Feature ;
    geojson:topology [ a topo:Face ;
            topo:rings ( [ a topo:Ring ;
                        topo:directedReferences ( [ topo:orientation "+" ;
                                    topo:ref <uuid:c60507ba-226b-4e49-a702-e9afef899b23> ] [ topo:orientation "+" ;
                                    topo:ref <uuid:7dc1cc1c-8e7f-4666-9f52-4e6c2e6f57ac> ] [ topo:orientation "+" ;
                                    topo:ref <uuid:83ff2cdf-6c58-4e7b-ba55-e084eff8c569> ] [ topo:orientation "+" ;
                                    topo:ref <uuid:d69c596c-134e-4216-9bf6-d0f10e6886d8> ] ) ] ) ] .


```


### Face with 6 edges and mixed orientations
An L-shaped Face with 6 edges in its outer Ring directed_references. Some edges are
shared with adjacent faces and therefore appear with '-' (reverse) orientation,
reflecting the shared boundary convention.

#### json
```json
{
  "id": "uuid:607a3363-3eb7-4ce6-a633-86d2e565692b",
  "type": "Feature",
  "geometry": null,
  "topology": {
    "type": "Face",
    "rings": [
      {
        "type": "Ring",
        "directed_references": [
          {
            "ref": "uuid:8582d9c2-6053-495a-8413-f5493691c0de",
            "orientation": "-"
          },
          {
            "ref": "uuid:7dc1cc1c-8e7f-4666-9f52-4e6c2e6f57ac",
            "orientation": "-"
          },
          {
            "ref": "uuid:4c2a6434-03b0-4aa2-85ea-a9fcaea41555",
            "orientation": "-"
          },
          {
            "ref": "uuid:921e2351-efbf-48be-85d3-eedc0dc2ddc0",
            "orientation": "+"
          },
          {
            "ref": "uuid:73f88b47-78ab-474d-9c62-73dfefd0dd5d",
            "orientation": "+"
          },
          {
            "ref": "uuid:7aa2a76d-9d5c-4540-9f2e-d8bcf36fadb5",
            "orientation": "+"
          }
        ]
      }
    ]
  },
  "properties": {
    "normal": [
      0.0,
      0.0,
      1.0
    ],
    "area": 56.0
  }
}
```

#### jsonld
```jsonld
{
  "@context": "https://surroundaustralia.github.io/topo-feature/build/annotated/geo/topo/features/topo-face/context.jsonld",
  "id": "uuid:607a3363-3eb7-4ce6-a633-86d2e565692b",
  "type": "Feature",
  "geometry": null,
  "topology": {
    "type": "Face",
    "rings": [
      {
        "type": "Ring",
        "directed_references": [
          {
            "ref": "uuid:8582d9c2-6053-495a-8413-f5493691c0de",
            "orientation": "-"
          },
          {
            "ref": "uuid:7dc1cc1c-8e7f-4666-9f52-4e6c2e6f57ac",
            "orientation": "-"
          },
          {
            "ref": "uuid:4c2a6434-03b0-4aa2-85ea-a9fcaea41555",
            "orientation": "-"
          },
          {
            "ref": "uuid:921e2351-efbf-48be-85d3-eedc0dc2ddc0",
            "orientation": "+"
          },
          {
            "ref": "uuid:73f88b47-78ab-474d-9c62-73dfefd0dd5d",
            "orientation": "+"
          },
          {
            "ref": "uuid:7aa2a76d-9d5c-4540-9f2e-d8bcf36fadb5",
            "orientation": "+"
          }
        ]
      }
    ]
  },
  "properties": {
    "normal": [
      0.0,
      0.0,
      1.0
    ],
    "area": 56.0
  }
}
```

#### ttl
```ttl
@prefix geojson: <https://purl.org/geojson/vocab#> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix topo: <https://purl.org/geojson/topo#> .

<uuid:607a3363-3eb7-4ce6-a633-86d2e565692b> a geojson:Feature ;
    geojson:topology [ a topo:Face ;
            topo:rings ( [ a topo:Ring ;
                        topo:directedReferences ( [ topo:orientation "-" ;
                                    topo:ref <uuid:8582d9c2-6053-495a-8413-f5493691c0de> ] [ topo:orientation "-" ;
                                    topo:ref <uuid:7dc1cc1c-8e7f-4666-9f52-4e6c2e6f57ac> ] [ topo:orientation "-" ;
                                    topo:ref <uuid:4c2a6434-03b0-4aa2-85ea-a9fcaea41555> ] [ topo:orientation "+" ;
                                    topo:ref <uuid:921e2351-efbf-48be-85d3-eedc0dc2ddc0> ] [ topo:orientation "+" ;
                                    topo:ref <uuid:73f88b47-78ab-474d-9c62-73dfefd0dd5d> ] [ topo:orientation "+" ;
                                    topo:ref <uuid:7aa2a76d-9d5c-4540-9f2e-d8bcf36fadb5> ] ) ] ) ] .


```

## Schema

```yaml
$schema: https://json-schema.org/draft/2020-12/schema
description: 'A Face feature: a bounded planar surface described by an outer Ring
  and optional inner (hole) Rings. geometry must be null. Each Ring uses directed_references
  to oriented Edge features.'
$defs:
  testCollection:
    $anchor: testCollection
    description: A convienence ref to a complete, testable collection objects and
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
          const: Face
        rings:
          type: array
          description: Ordered list of Ring topology objects. First ring is the outer
            boundary; any subsequent rings are inner boundaries (holes).
          items:
            type: object
            required:
            - type
            - directed_references
            properties:
              type:
                type: string
                const: Ring
              directed_references:
                type: array
                description: Ordered oriented Edge references forming the ring boundary
                items:
                  $ref: https://surroundaustralia.github.io/topo-feature/build/annotated/geo/topo/datatypes/oriented-ref/schema.yaml
                minItems: 3
                x-jsonld-id: https://purl.org/geojson/topo#directedReferences
                x-jsonld-container: '@list'
          minItems: 1
          x-jsonld-id: https://purl.org/geojson/topo#rings
          x-jsonld-container: '@list'
      required:
      - type
      - rings
      not:
        required:
        - references
        - directed_references
      x-jsonld-type: '@id'
      x-jsonld-id: https://purl.org/geojson/vocab#topology
  required:
  - topology
x-jsonld-extra-terms:
  Face: https://purl.org/geojson/topo#Face
  Ring: https://purl.org/geojson/topo#Ring
  ref: '@id'
  orientation: https://purl.org/geojson/topo#orientation
x-jsonld-prefixes:
  geojson: https://purl.org/geojson/vocab#
  topo: https://purl.org/geojson/topo#

```

Links to the schema:

* YAML version: [schema.yaml](https://surroundaustralia.github.io/topo-feature/build/annotated/geo/topo/features/topo-face/schema.json)
* JSON version: [schema.json](https://surroundaustralia.github.io/topo-feature/build/annotated/geo/topo/features/topo-face/schema.yaml)


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
        },
        "ref": "topo:ref"
      },
      "@type": "@id",
      "@id": "geojson:topology"
    },
    "Face": "topo:Face",
    "Ring": "topo:Ring",
    "ref": "@id",
    "orientation": "topo:orientation",
    "Arc": "geojson:Arc",
    "ArcWithCenter": "geojson:ArcWithCenter",
    "ArcByChord": "geojson:ArcByChord",
    "CircleByCenter": "geojson:CircleByCenter",
    "CubicSpline": "geojson:CubicSpline",
    "radius": "geojson:radius",
    "arcLength": "geojson:arcLength",
    "startTangentVector": "geojson:startTangentVector",
    "endTangentVector": "geojson:endTangentVector",
    "Shell": "topo:Shell",
    "Solid": "topo:Solid",
    "geojson": "https://purl.org/geojson/vocab#",
    "rdfs": "http://www.w3.org/2000/01/rdf-schema#",
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
[context.jsonld](https://surroundaustralia.github.io/topo-feature/build/annotated/geo/topo/features/topo-face/context.jsonld)


# For developers

The source code for this Building Block can be found in the following repository:

* URL: [https://github.com/surroundaustralia/topo-feature](https://github.com/surroundaustralia/topo-feature)
* Path: `_sources/features/topo-face`

