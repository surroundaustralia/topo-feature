
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

| Lower dimension                                            | Face dimension                                    | Higher dimension                                    |
|:-----------------------------------------------------------|---------------------------------------------------|:----------------------------------------------------|
| **Edge** <br/>(referenced in **Ring** directed_references) | **Face** <br/> (directed_references to **Rings**) | **Shell** <br/>(directed_references to  **Faces** ) |

Note **directed references** are required for 3D, whereas 2D may use **ordered references**, and directions can be calculated if required. For 3D this calculation burden is much greater and explicit directions are required.
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
          10.0,
          0.0,
          0.0
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
          10.0,
          10.0,
          0.0
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
          10.0,
          10.0,
          10.0
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
          0.0,
          10.0
        ]
      },
      "properties": null
    }
  ],
  "edges": [
    {
      "id": "uuid:3af6ffd3-355f-48a4-badf-dcc136d547f3",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Edge",
        "references": [
          "uuid:ad6d8fcc-402c-482e-8f1a-7492ccaead38",
          "uuid:8d2be28b-8f31-46de-99cb-4d8709502cd0"
        ]
      },
      "properties": {
        "length": 10.0
      }
    },
    {
      "id": "uuid:cdf01952-2518-4523-a3a7-363be4b8bc3f",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Edge",
        "references": [
          "uuid:8d2be28b-8f31-46de-99cb-4d8709502cd0",
          "uuid:c611f840-2829-44b2-b367-3915ca7875a4"
        ]
      },
      "properties": {
        "length": 10.0
      }
    },
    {
      "id": "uuid:47d12439-8724-4a64-b43b-5f2f7ff9ce1a",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Edge",
        "references": [
          "uuid:c611f840-2829-44b2-b367-3915ca7875a4",
          "uuid:fad324b9-801f-40f4-b65b-91f8753e9698"
        ]
      },
      "properties": {
        "length": 10.0
      }
    },
    {
      "id": "uuid:23641631-470f-4c4b-981d-23ccb35d6a51",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Edge",
        "references": [
          "uuid:fad324b9-801f-40f4-b65b-91f8753e9698",
          "uuid:ad6d8fcc-402c-482e-8f1a-7492ccaead38"
        ]
      },
      "properties": {
        "length": 10.0
      }
    }
  ],
  "rings": [
    {
      "id": "uuid:fbcc1a1e-5e9a-47c4-b3b0-d7812f585ab8",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Ring",
        "directed_references": [
          {
            "ref": "uuid:3af6ffd3-355f-48a4-badf-dcc136d547f3",
            "orientation": "+"
          },
          {
            "ref": "uuid:cdf01952-2518-4523-a3a7-363be4b8bc3f",
            "orientation": "+"
          },
          {
            "ref": "uuid:47d12439-8724-4a64-b43b-5f2f7ff9ce1a",
            "orientation": "+"
          },
          {
            "ref": "uuid:23641631-470f-4c4b-981d-23ccb35d6a51",
            "orientation": "+"
          }
        ]
      },
      "properties": {
        "circumference": 40.00
      }
    }
  ],
  "faces": [
    {
      "id": "uuid:2c21efab-db80-4dd0-96c0-59a63f956d5b",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "directed_references": [
          {
            "ref": "uuid:fbcc1a1e-5e9a-47c4-b3b0-d7812f585ab8",
            "orientation": "+"
          }
        ]
      },
      "properties": {
        "normal": [
          1.0,
          0.0,
          0.0
        ],
        "area": 100.0,
        "description": "East-facing boundary face, [Cube]"
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
          10.0,
          0.0,
          0.0
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
          10.0,
          10.0,
          0.0
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
          10.0,
          10.0,
          10.0
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
          0.0,
          10.0
        ]
      },
      "properties": null
    }
  ],
  "edges": [
    {
      "id": "uuid:3af6ffd3-355f-48a4-badf-dcc136d547f3",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Edge",
        "references": [
          "uuid:ad6d8fcc-402c-482e-8f1a-7492ccaead38",
          "uuid:8d2be28b-8f31-46de-99cb-4d8709502cd0"
        ]
      },
      "properties": {
        "length": 10.0
      }
    },
    {
      "id": "uuid:cdf01952-2518-4523-a3a7-363be4b8bc3f",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Edge",
        "references": [
          "uuid:8d2be28b-8f31-46de-99cb-4d8709502cd0",
          "uuid:c611f840-2829-44b2-b367-3915ca7875a4"
        ]
      },
      "properties": {
        "length": 10.0
      }
    },
    {
      "id": "uuid:47d12439-8724-4a64-b43b-5f2f7ff9ce1a",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Edge",
        "references": [
          "uuid:c611f840-2829-44b2-b367-3915ca7875a4",
          "uuid:fad324b9-801f-40f4-b65b-91f8753e9698"
        ]
      },
      "properties": {
        "length": 10.0
      }
    },
    {
      "id": "uuid:23641631-470f-4c4b-981d-23ccb35d6a51",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Edge",
        "references": [
          "uuid:fad324b9-801f-40f4-b65b-91f8753e9698",
          "uuid:ad6d8fcc-402c-482e-8f1a-7492ccaead38"
        ]
      },
      "properties": {
        "length": 10.0
      }
    }
  ],
  "rings": [
    {
      "id": "uuid:fbcc1a1e-5e9a-47c4-b3b0-d7812f585ab8",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Ring",
        "directed_references": [
          {
            "ref": "uuid:3af6ffd3-355f-48a4-badf-dcc136d547f3",
            "orientation": "+"
          },
          {
            "ref": "uuid:cdf01952-2518-4523-a3a7-363be4b8bc3f",
            "orientation": "+"
          },
          {
            "ref": "uuid:47d12439-8724-4a64-b43b-5f2f7ff9ce1a",
            "orientation": "+"
          },
          {
            "ref": "uuid:23641631-470f-4c4b-981d-23ccb35d6a51",
            "orientation": "+"
          }
        ]
      },
      "properties": {
        "circumference": 40.0
      }
    }
  ],
  "faces": [
    {
      "id": "uuid:2c21efab-db80-4dd0-96c0-59a63f956d5b",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "directed_references": [
          {
            "ref": "uuid:fbcc1a1e-5e9a-47c4-b3b0-d7812f585ab8",
            "orientation": "+"
          }
        ]
      },
      "properties": {
        "normal": [
          1.0,
          0.0,
          0.0
        ],
        "area": 100.0,
        "description": "East-facing boundary face, [Cube]"
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

<uuid:2c21efab-db80-4dd0-96c0-59a63f956d5b> a geojson:Feature ;
    geojson:topology [ a topo:Face ;
            topo:directedReferences ( [ topo:orientation "+" ;
                        topo:ref <uuid:fbcc1a1e-5e9a-47c4-b3b0-d7812f585ab8> ] ) ] .

<uuid:fbcc1a1e-5e9a-47c4-b3b0-d7812f585ab8> a geojson:Feature ;
    geojson:topology [ a topo:Ring ;
            topo:directedReferences ( [ topo:orientation "+" ;
                        topo:ref <uuid:3af6ffd3-355f-48a4-badf-dcc136d547f3> ] [ topo:orientation "+" ;
                        topo:ref <uuid:cdf01952-2518-4523-a3a7-363be4b8bc3f> ] [ topo:orientation "+" ;
                        topo:ref <uuid:47d12439-8724-4a64-b43b-5f2f7ff9ce1a> ] [ topo:orientation "+" ;
                        topo:ref <uuid:23641631-470f-4c4b-981d-23ccb35d6a51> ] ) ] .

[] a geojson:FeatureCollection ;
    topo:faces ( <uuid:2c21efab-db80-4dd0-96c0-59a63f956d5b> ) ;
    topo:rings ( <uuid:fbcc1a1e-5e9a-47c4-b3b0-d7812f585ab8> ) .


```


### Simple Face (4-edge rectangular face)
A Face feature with a single outer Ring containing four oriented Edge references.
The Ring feature is referenced from the Face via directed_references. All edges are
traversed in the '+' (forward) direction, closing the loop. Face geometry is null —
coordinates are derived from the referenced edges and points.

#### json
```json
{
  "type": "FeatureCollection",
  "features": [],
  "rings": [
    {
      "id": "uuid:c60507ba-226b-4e49-a702-e9afef899b23",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Ring",
        "directed_references": [
          {
            "ref": "uuid:3af6ffd3-355f-48a4-badf-dcc136d547f3",
            "orientation": "+"
          },
          {
            "ref": "uuid:cdf01952-2518-4523-a3a7-363be4b8bc3f",
            "orientation": "+"
          },
          {
            "ref": "uuid:47d12439-8724-4a64-b43b-5f2f7ff9ce1a",
            "orientation": "+"
          },
          {
            "ref": "uuid:23641631-470f-4c4b-981d-23ccb35d6a51",
            "orientation": "+"
          }
        ]
      },
      "properties": {
        "circumference": 40.0
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
        "directed_references": [
          {
            "ref": "uuid:c60507ba-226b-4e49-a702-e9afef899b23",
            "orientation": "+"
          }
        ]
      },
      "properties": {
        "normal": [
          1.0,
          0.0,
          0.0
        ],
        "area": 100.0
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
  "features": [],
  "rings": [
    {
      "id": "uuid:c60507ba-226b-4e49-a702-e9afef899b23",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Ring",
        "directed_references": [
          {
            "ref": "uuid:3af6ffd3-355f-48a4-badf-dcc136d547f3",
            "orientation": "+"
          },
          {
            "ref": "uuid:cdf01952-2518-4523-a3a7-363be4b8bc3f",
            "orientation": "+"
          },
          {
            "ref": "uuid:47d12439-8724-4a64-b43b-5f2f7ff9ce1a",
            "orientation": "+"
          },
          {
            "ref": "uuid:23641631-470f-4c4b-981d-23ccb35d6a51",
            "orientation": "+"
          }
        ]
      },
      "properties": {
        "circumference": 40.0
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
        "directed_references": [
          {
            "ref": "uuid:c60507ba-226b-4e49-a702-e9afef899b23",
            "orientation": "+"
          }
        ]
      },
      "properties": {
        "normal": [
          1.0,
          0.0,
          0.0
        ],
        "area": 100.0
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

<uuid:4ac3b91b-eeb7-428c-b5e9-7e8a3f0998ae> a geojson:Feature ;
    geojson:topology [ a topo:Face ;
            topo:directedReferences ( [ topo:orientation "+" ;
                        topo:ref <uuid:c60507ba-226b-4e49-a702-e9afef899b23> ] ) ] .

<uuid:c60507ba-226b-4e49-a702-e9afef899b23> a geojson:Feature ;
    geojson:topology [ a topo:Ring ;
            topo:directedReferences ( [ topo:orientation "+" ;
                        topo:ref <uuid:3af6ffd3-355f-48a4-badf-dcc136d547f3> ] [ topo:orientation "+" ;
                        topo:ref <uuid:cdf01952-2518-4523-a3a7-363be4b8bc3f> ] [ topo:orientation "+" ;
                        topo:ref <uuid:47d12439-8724-4a64-b43b-5f2f7ff9ce1a> ] [ topo:orientation "+" ;
                        topo:ref <uuid:23641631-470f-4c4b-981d-23ccb35d6a51> ] ) ] .

[] a geojson:FeatureCollection ;
    topo:faces ( <uuid:4ac3b91b-eeb7-428c-b5e9-7e8a3f0998ae> ) ;
    topo:rings ( <uuid:c60507ba-226b-4e49-a702-e9afef899b23> ) .


```


### Face with 6 edges and mixed orientations
A hexagonal-shaped Face with 6 edges in its outer Ring directed_references. Some edges are
shared with adjacent faces and therefore appear with '-' (reverse) orientation,
reflecting the shared boundary convention.

#### json
```json
{
  "type": "FeatureCollection",
  "features": [],
  "rings": [
    {
      "id": "uuid:c60507ba-226b-4e49-a702-e9afef899b23",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Ring",
        "directed_references": [
          {
            "ref": "uuid:3af6ffd3-355f-48a4-badf-dcc136d547f3",
            "orientation": "+"
          },
          {
            "ref": "uuid:cdf01952-2518-4523-a3a7-363be4b8bc3f",
            "orientation": "+"
          },
          {
            "ref": "uuid:47d12439-8724-4a64-b43b-5f2f7ff9ce1a",
            "orientation": "+"
          },
          {
            "ref": "uuid:23641631-470f-4c4b-981d-23ccb35d6a51",
            "orientation": "+"
          },
          {
            "ref": "uuid:23141631-470f-4c4b-981d-23ccb35d6a51",
            "orientation": "-"
          },
          {
            "ref": "uuid:23641631-470f-4d4b-981d-23ccb35d6a51",
            "orientation": "-"
          }
        ]
      },
      "properties": {
        "circumference": 60.0
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
        "directed_references": [
          {
            "ref": "uuid:c60507ba-226b-4e49-a702-e9afef899b23",
            "orientation": "+"
          }
        ]
      },
      "properties": {
        "normal": [
          1.0,
          0.0,
          0.0
        ],
        "area": 260.0
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
  "features": [],
  "rings": [
    {
      "id": "uuid:c60507ba-226b-4e49-a702-e9afef899b23",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Ring",
        "directed_references": [
          {
            "ref": "uuid:3af6ffd3-355f-48a4-badf-dcc136d547f3",
            "orientation": "+"
          },
          {
            "ref": "uuid:cdf01952-2518-4523-a3a7-363be4b8bc3f",
            "orientation": "+"
          },
          {
            "ref": "uuid:47d12439-8724-4a64-b43b-5f2f7ff9ce1a",
            "orientation": "+"
          },
          {
            "ref": "uuid:23641631-470f-4c4b-981d-23ccb35d6a51",
            "orientation": "+"
          },
          {
            "ref": "uuid:23141631-470f-4c4b-981d-23ccb35d6a51",
            "orientation": "-"
          },
          {
            "ref": "uuid:23641631-470f-4d4b-981d-23ccb35d6a51",
            "orientation": "-"
          }
        ]
      },
      "properties": {
        "circumference": 60.0
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
        "directed_references": [
          {
            "ref": "uuid:c60507ba-226b-4e49-a702-e9afef899b23",
            "orientation": "+"
          }
        ]
      },
      "properties": {
        "normal": [
          1.0,
          0.0,
          0.0
        ],
        "area": 260.0
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

<uuid:4ac3b91b-eeb7-428c-b5e9-7e8a3f0998ae> a geojson:Feature ;
    geojson:topology [ a topo:Face ;
            topo:directedReferences ( [ topo:orientation "+" ;
                        topo:ref <uuid:c60507ba-226b-4e49-a702-e9afef899b23> ] ) ] .

<uuid:c60507ba-226b-4e49-a702-e9afef899b23> a geojson:Feature ;
    geojson:topology [ a topo:Ring ;
            topo:directedReferences ( [ topo:orientation "+" ;
                        topo:ref <uuid:3af6ffd3-355f-48a4-badf-dcc136d547f3> ] [ topo:orientation "+" ;
                        topo:ref <uuid:cdf01952-2518-4523-a3a7-363be4b8bc3f> ] [ topo:orientation "+" ;
                        topo:ref <uuid:47d12439-8724-4a64-b43b-5f2f7ff9ce1a> ] [ topo:orientation "+" ;
                        topo:ref <uuid:23641631-470f-4c4b-981d-23ccb35d6a51> ] [ topo:orientation "-" ;
                        topo:ref <uuid:23141631-470f-4c4b-981d-23ccb35d6a51> ] [ topo:orientation "-" ;
                        topo:ref <uuid:23641631-470f-4d4b-981d-23ccb35d6a51> ] ) ] .

[] a geojson:FeatureCollection ;
    topo:faces ( <uuid:4ac3b91b-eeb7-428c-b5e9-7e8a3f0998ae> ) ;
    topo:rings ( <uuid:c60507ba-226b-4e49-a702-e9afef899b23> ) .


```

## Schema

```yaml
$schema: https://json-schema.org/draft/2020-12/schema
description: 'A Face feature: a bounded planar surface referencing Ring features via
  directed_references. geometry must be null.'
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
          const: Face
      required:
      - type
      - directed_references
      x-jsonld-type: '@id'
      x-jsonld-id: https://purl.org/geojson/vocab#topology
  required:
  - topology
x-jsonld-extra-terms:
  Face: https://purl.org/geojson/topo#Face
  Ring: https://purl.org/geojson/topo#Ring
  rings:
    x-jsonld-id: https://purl.org/geojson/topo#rings
    x-jsonld-container: '@list'
  directed_references:
    x-jsonld-id: https://purl.org/geojson/topo#directedReferences
    x-jsonld-container: '@list'
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
        "ref": "topo:ref"
      },
      "@type": "@id",
      "@id": "geojson:topology"
    },
    "Face": "topo:Face",
    "Ring": "topo:Ring",
    "rings": {
      "@id": "topo:rings",
      "@container": "@list"
    },
    "directed_references": {
      "@id": "topo:directedReferences",
      "@container": "@list"
    },
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
    "Edge": "topo:Edge",
    "Shell": "topo:Shell",
    "Solid": "topo:Solid",
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
[context.jsonld](https://surroundaustralia.github.io/topo-feature/build/annotated/geo/topo/features/topo-face/context.jsonld)


# For developers

The source code for this Building Block can be found in the following repository:

* URL: [https://github.com/surroundaustralia/topo-feature](https://github.com/surroundaustralia/topo-feature)
* Path: `_sources/features/topo-face`

