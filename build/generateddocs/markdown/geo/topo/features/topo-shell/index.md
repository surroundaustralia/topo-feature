
# Shell Topology Feature (Schema)

`ogc.geo.topo.features.topo-shell` *v0.1*

A feature representing a Shell in topology: a closed set of oriented Face references forming the boundary surface of a Solid. A Shell is the 3D analog of a Ring — it bounds a volumetric region.

[*Status*](http://www.opengis.net/def/status): Under development

## Description

# Shell Topology Feature

A **Shell** is a topological feature representing a closed surface — the boundary of a volumetric Solid. 
It is composed of an ordered set of oriented Face references in its `directed_references` array.

A Shell is the 3D analog of a Ring: just as a Ring closes a 2D boundary from Edges, a Shell closes a 3D boundary from Faces.

## Topology Model

A Shell's topology consists of:

- `type`: `"Shell"`
- `directed_references`: an ordered array of [Oriented Object References](../../datatypes/oriented-ref/), each referencing a Face feature with a `ref` (feature ID) and `orientation` (`+` or `-`)

The `geometry` property is `null` — actual coordinates are derived from the referenced Face, Edge and Point features.

## Orientation

The orientation of each Face reference (`+` or `-`) indicates the outward normal direction with respect to the enclosed solid volume. 
Faces shared between adjacent solids appear with opposite orientations in each solid's shell.

## Relationship to other types

| Lower dimension                                | Shell     | Higher dimension                                     |
|------------------------------------------------|-----------|------------------------------------------------------|
| Face (referenced in Shell directed_references) | **Shell** | Solid (contains Shell objects in its `shells` array) |

## Example

```json
{
  "topology": {
    "type": "Shell",
    "directed_references": [
      { "ref": "uuid:4ac3b91b-eeb7-428c-b5e9-7e8a3f0998ae", "orientation": "+" },
      { "ref": "uuid:4a294022-4864-49c7-8cee-f9e43360bc4e", "orientation": "+" },
      { "ref": "uuid:01947f47-ee13-44a9-85a4-2bcb4881982a", "orientation": "+" },
      { "ref": "uuid:607a3363-3eb7-4ce6-a633-86d2e565692b", "orientation": "+" },
      { "ref": "uuid:3c1f5c4b-d842-40b6-a332-99d50015fa8f", "orientation": "+" },
      { "ref": "uuid:2387ae98-9236-42fe-9414-c45b99954c41", "orientation": "+" }
    ]
  }
}
```

## Examples

### Shell with full topological context (points + edges + faces + solid)
A self-contained example of a Solid with its Shell, all 8 bounding Face features,
and all supporting Edge and Point features. Demonstrates the full topology hierarchy:
solids → shells (directed_references to Faces) → faces → rings (directed_references to Edges) → edges → references to points → points.
All geometry properties are null except on Point features.

#### json
```json
{
  "type": "FeatureCollection",
  "features": [],
  "comment": "Self-contained example: the 'Upper East' Solid from 4-unit-up-down.json with its Shell and all supporting faces, rings, edges and points",
  "points": [
    {
      "id": "uuid:32acfb36-f3d3-47fe-9400-eec9b06d781e",
      "type": "Feature",
      "featureType": "BoundaryMark",
      "time": "2026-05-27T05:58:56.914093+00:00",
      "geometry": {
        "type": "Point",
        "coordinates": [
          116.00779818303263,
          -31.88703552343606,
          23.0
        ]
      },
      "place": {
        "type": "Point",
        "coordinates": [
          406164.425,
          6471656.237,
          23.0
        ]
      },
      "properties": {
        "purpose": "wa-surveypoint-purpose:boundary",
        "ptQualityMeasure": 0.1,
        "comment": null,
        "monumentedBy": {
          "form": "wa-monument-form:cadastral-point-unmarked",
          "condition": "wa-monument-condition:ok",
          "state": "wa-monument-state:unmarked"
        }
      }
    },
    {
      "id": "uuid:fa551002-6466-46f1-a2f3-f433334447e6",
      "type": "Feature",
      "featureType": "BoundaryMark",
      "time": "2026-05-27T05:58:56.914093+00:00",
      "geometry": {
        "type": "Point",
        "coordinates": [
          116.00779818303263,
          -31.88703552343606,
          26.0
        ]
      },
      "place": {
        "type": "Point",
        "coordinates": [
          406164.425,
          6471656.237,
          26.0
        ]
      },
      "properties": {
        "purpose": "wa-surveypoint-purpose:boundary",
        "ptQualityMeasure": 0.1,
        "comment": null,
        "monumentedBy": {
          "form": "wa-monument-form:cadastral-point-unmarked",
          "condition": "wa-monument-condition:ok",
          "state": "wa-monument-state:unmarked"
        }
      }
    },
    {
      "id": "uuid:83d45b42-d9bb-48cb-9777-fbb2525083f9",
      "type": "Feature",
      "featureType": "BoundaryMark",
      "time": "2026-05-27T05:58:56.914093+00:00",
      "geometry": {
        "type": "Point",
        "coordinates": [
          116.00779740952903,
          -31.887107661310704,
          26.0
        ]
      },
      "place": {
        "type": "Point",
        "coordinates": [
          406164.425,
          6471648.24,
          26.0
        ]
      },
      "properties": {
        "purpose": "wa-surveypoint-purpose:boundary",
        "ptQualityMeasure": 0.1,
        "comment": null,
        "monumentedBy": {
          "form": "wa-monument-form:cadastral-point-unmarked",
          "condition": "wa-monument-condition:ok",
          "state": "wa-monument-state:unmarked"
        }
      }
    },
    {
      "id": "uuid:fa94e00a-24f0-4133-bd78-8a6d28be410d",
      "type": "Feature",
      "featureType": "BoundaryMark",
      "time": "2026-05-27T05:58:56.914093+00:00",
      "geometry": {
        "type": "Point",
        "coordinates": [
          116.00779740952903,
          -31.887107661310704,
          23.0
        ]
      },
      "place": {
        "type": "Point",
        "coordinates": [
          406164.425,
          6471648.24,
          23.0
        ]
      },
      "properties": {
        "purpose": "wa-surveypoint-purpose:boundary",
        "ptQualityMeasure": 0.1,
        "comment": null,
        "monumentedBy": {
          "form": "wa-monument-form:cadastral-point-unmarked",
          "condition": "wa-monument-condition:ok",
          "state": "wa-monument-state:unmarked"
        }
      }
    },
    {
      "id": "uuid:2f1070ed-9bae-47f5-a856-7f4db788c010",
      "type": "Feature",
      "featureType": "BoundaryMark",
      "time": "2026-05-27T05:58:56.914093+00:00",
      "geometry": {
        "type": "Point",
        "coordinates": [
          116.00773398518112,
          -31.88710716621648,
          23.0
        ]
      },
      "place": {
        "type": "Point",
        "coordinates": [
          406158.426,
          6471648.24,
          23.0
        ]
      },
      "properties": {
        "purpose": "wa-surveypoint-purpose:boundary",
        "ptQualityMeasure": 0.1,
        "comment": null,
        "monumentedBy": {
          "form": "wa-monument-form:cadastral-point-unmarked",
          "condition": "wa-monument-condition:ok",
          "state": "wa-monument-state:unmarked"
        }
      }
    },
    {
      "id": "uuid:bce88da3-5cda-4af9-a494-4d4b319ed2c1",
      "type": "Feature",
      "featureType": "BoundaryMark",
      "time": "2026-05-27T05:58:56.914093+00:00",
      "geometry": {
        "type": "Point",
        "coordinates": [
          116.00773398518112,
          -31.88710716621648,
          26.0
        ]
      },
      "place": {
        "type": "Point",
        "coordinates": [
          406158.426,
          6471648.24,
          26.0
        ]
      },
      "properties": {
        "purpose": "wa-surveypoint-purpose:boundary",
        "ptQualityMeasure": 0.1,
        "comment": null,
        "monumentedBy": {
          "form": "wa-monument-form:cadastral-point-unmarked",
          "condition": "wa-monument-condition:ok",
          "state": "wa-monument-state:unmarked"
        }
      }
    },
    {
      "id": "uuid:e7478b99-0d1e-4a1f-b958-c6a4b1719e96",
      "type": "Feature",
      "featureType": "BoundaryMark",
      "time": "2026-05-27T05:58:56.914093+00:00",
      "geometry": {
        "type": "Point",
        "coordinates": [
          116.00771362434999,
          -31.88703486336026,
          26.0
        ]
      },
      "place": {
        "type": "Point",
        "coordinates": [
          406156.427,
          6471656.237,
          26.0
        ]
      },
      "properties": {
        "purpose": "wa-surveypoint-purpose:boundary",
        "ptQualityMeasure": 0.1,
        "comment": null,
        "monumentedBy": {
          "form": "wa-monument-form:cadastral-point-unmarked",
          "condition": "wa-monument-condition:ok",
          "state": "wa-monument-state:unmarked"
        }
      }
    },
    {
      "id": "uuid:3e40bf74-9619-426b-8b5e-58ebe480a92b",
      "type": "Feature",
      "featureType": "BoundaryMark",
      "time": "2026-05-27T05:58:56.914093+00:00",
      "geometry": {
        "type": "Point",
        "coordinates": [
          116.00771362434999,
          -31.88703486336026,
          23.0
        ]
      },
      "place": {
        "type": "Point",
        "coordinates": [
          406156.427,
          6471656.237,
          23.0
        ]
      },
      "properties": {
        "purpose": "wa-surveypoint-purpose:boundary",
        "ptQualityMeasure": 0.1,
        "comment": null,
        "monumentedBy": {
          "form": "wa-monument-form:cadastral-point-unmarked",
          "condition": "wa-monument-condition:ok",
          "state": "wa-monument-state:unmarked"
        }
      }
    },
    {
      "id": "uuid:e0d36194-78e8-4255-b6b7-4f59b79544db",
      "type": "Feature",
      "featureType": "BoundaryMark",
      "time": "2026-05-27T05:58:56.914093+00:00",
      "geometry": {
        "type": "Point",
        "coordinates": [
          116.00771323751721,
          -31.887070936807078,
          26.0
        ]
      },
      "place": {
        "type": "Point",
        "coordinates": [
          406156.427,
          6471652.238,
          26.0
        ]
      },
      "properties": {
        "purpose": "wa-surveypoint-purpose:boundary",
        "ptQualityMeasure": 0.1,
        "comment": null,
        "monumentedBy": {
          "form": "wa-monument-form:cadastral-point-unmarked",
          "condition": "wa-monument-condition:ok",
          "state": "wa-monument-state:unmarked"
        }
      }
    },
    {
      "id": "uuid:5228ad62-0730-416f-89b0-5042da216efb",
      "type": "Feature",
      "featureType": "BoundaryMark",
      "time": "2026-05-27T05:58:56.914093+00:00",
      "geometry": {
        "type": "Point",
        "coordinates": [
          116.00773437190962,
          -31.88707110179026,
          26.0
        ]
      },
      "place": {
        "type": "Point",
        "coordinates": [
          406158.426,
          6471652.238,
          26.0
        ]
      },
      "properties": {
        "purpose": "wa-surveypoint-purpose:boundary",
        "ptQualityMeasure": 0.1,
        "comment": null,
        "monumentedBy": {
          "form": "wa-monument-form:cadastral-point-unmarked",
          "condition": "wa-monument-condition:ok",
          "state": "wa-monument-state:unmarked"
        }
      }
    },
    {
      "id": "uuid:d75d9704-aeb3-4dc7-b2f0-a3fb62f44dd4",
      "type": "Feature",
      "featureType": "BoundaryMark",
      "time": "2026-05-27T05:58:56.914093+00:00",
      "geometry": {
        "type": "Point",
        "coordinates": [
          116.00771323751721,
          -31.887070936807078,
          23.0
        ]
      },
      "place": {
        "type": "Point",
        "coordinates": [
          406156.427,
          6471652.238,
          23.0
        ]
      },
      "properties": {
        "purpose": "wa-surveypoint-purpose:boundary",
        "ptQualityMeasure": 0.1,
        "comment": null,
        "monumentedBy": {
          "form": "wa-monument-form:cadastral-point-unmarked",
          "condition": "wa-monument-condition:ok",
          "state": "wa-monument-state:unmarked"
        }
      }
    },
    {
      "id": "uuid:f84d09ba-e7af-48a7-bd47-30ca9265214c",
      "type": "Feature",
      "featureType": "BoundaryMark",
      "time": "2026-05-27T05:58:56.914093+00:00",
      "geometry": {
        "type": "Point",
        "coordinates": [
          116.00773437190962,
          -31.88707110179026,
          23.0
        ]
      },
      "place": {
        "type": "Point",
        "coordinates": [
          406158.426,
          6471652.238,
          23.0
        ]
      },
      "properties": {
        "purpose": "wa-surveypoint-purpose:boundary",
        "ptQualityMeasure": 0.1,
        "comment": null,
        "monumentedBy": {
          "form": "wa-monument-form:cadastral-point-unmarked",
          "condition": "wa-monument-condition:ok",
          "state": "wa-monument-state:unmarked"
        }
      }
    }
  ],
  "edges": [
    {
      "id": "uuid:cc9ce047-61a1-4bf9-a366-bfc5b43092c2",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Edge",
        "references": [
          "uuid:32acfb36-f3d3-47fe-9400-eec9b06d781e",
          "uuid:fa551002-6466-46f1-a2f3-f433334447e6"
        ]
      },
      "properties": {
        "vectorPurpose": "wa-vector-purpose:3D-Construct",
        "comment": null,
        "length": 3.0
      }
    },
    {
      "id": "uuid:c795e6d9-0f44-4b1c-bc01-686d5e2acaa3",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Edge",
        "references": [
          "uuid:fa551002-6466-46f1-a2f3-f433334447e6",
          "uuid:83d45b42-d9bb-48cb-9777-fbb2525083f9"
        ]
      },
      "properties": {
        "vectorPurpose": "wa-vector-purpose:3D-Construct",
        "comment": null,
        "length": 7.997
      }
    },
    {
      "id": "uuid:f0aa8d02-1aa3-4f44-be28-d135c94de497",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Edge",
        "references": [
          "uuid:83d45b42-d9bb-48cb-9777-fbb2525083f9",
          "uuid:fa94e00a-24f0-4133-bd78-8a6d28be410d"
        ]
      },
      "properties": {
        "vectorPurpose": "wa-vector-purpose:3D-Construct",
        "comment": null,
        "length": 3.0
      }
    },
    {
      "id": "uuid:06e882da-e914-4ff8-a279-13c1b16b7646",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Edge",
        "references": [
          "uuid:fa94e00a-24f0-4133-bd78-8a6d28be410d",
          "uuid:32acfb36-f3d3-47fe-9400-eec9b06d781e"
        ]
      },
      "properties": {
        "vectorPurpose": "wa-vector-purpose:3D-Construct",
        "comment": null,
        "length": 7.997
      }
    },
    {
      "id": "uuid:5f1fd4be-c4ba-4387-9d7d-6e26b8299dc9",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Edge",
        "references": [
          "uuid:2f1070ed-9bae-47f5-a856-7f4db788c010",
          "uuid:fa94e00a-24f0-4133-bd78-8a6d28be410d"
        ]
      },
      "properties": {
        "vectorPurpose": "wa-vector-purpose:3D-Construct",
        "comment": null,
        "length": 5.999
      }
    },
    {
      "id": "uuid:d27bfb1b-ffd5-4fb3-9594-6f04ad66aa81",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Edge",
        "references": [
          "uuid:83d45b42-d9bb-48cb-9777-fbb2525083f9",
          "uuid:bce88da3-5cda-4af9-a494-4d4b319ed2c1"
        ]
      },
      "properties": {
        "vectorPurpose": "wa-vector-purpose:3D-Construct",
        "comment": null,
        "length": 5.999
      }
    },
    {
      "id": "uuid:9257083c-e11a-4914-a120-fbb11f0c10c8",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Edge",
        "references": [
          "uuid:bce88da3-5cda-4af9-a494-4d4b319ed2c1",
          "uuid:2f1070ed-9bae-47f5-a856-7f4db788c010"
        ]
      },
      "properties": {
        "vectorPurpose": "wa-vector-purpose:3D-Construct",
        "comment": null,
        "length": 3.0
      }
    },
    {
      "id": "uuid:725ebfd6-7c75-44fa-b917-94381bddef5f",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Edge",
        "references": [
          "uuid:e7478b99-0d1e-4a1f-b958-c6a4b1719e96",
          "uuid:fa551002-6466-46f1-a2f3-f433334447e6"
        ]
      },
      "properties": {
        "vectorPurpose": "wa-vector-purpose:3D-Construct",
        "comment": null,
        "length": 7.998
      }
    },
    {
      "id": "uuid:b42f27c9-d0e6-4cfb-9ea3-7e2517426428",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Edge",
        "references": [
          "uuid:32acfb36-f3d3-47fe-9400-eec9b06d781e",
          "uuid:3e40bf74-9619-426b-8b5e-58ebe480a92b"
        ]
      },
      "properties": {
        "vectorPurpose": "wa-vector-purpose:3D-Construct",
        "comment": null,
        "length": 7.998
      }
    },
    {
      "id": "uuid:5367fe8d-79c0-4161-a4ce-3b7f42afad3e",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Edge",
        "references": [
          "uuid:3e40bf74-9619-426b-8b5e-58ebe480a92b",
          "uuid:e7478b99-0d1e-4a1f-b958-c6a4b1719e96"
        ]
      },
      "properties": {
        "vectorPurpose": "wa-vector-purpose:3D-Construct",
        "comment": null,
        "length": 3.0
      }
    },
    {
      "id": "uuid:9a5a3eef-7ddb-40bf-ae2a-111b4623fb08",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Edge",
        "references": [
          "uuid:e7478b99-0d1e-4a1f-b958-c6a4b1719e96",
          "uuid:e0d36194-78e8-4255-b6b7-4f59b79544db"
        ]
      },
      "properties": {
        "vectorPurpose": "wa-vector-purpose:3D-Construct",
        "comment": null,
        "length": 3.999
      }
    },
    {
      "id": "uuid:0795c157-5fcb-4d01-b0f0-fedf92b1d41f",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Edge",
        "references": [
          "uuid:e0d36194-78e8-4255-b6b7-4f59b79544db",
          "uuid:5228ad62-0730-416f-89b0-5042da216efb"
        ]
      },
      "properties": {
        "vectorPurpose": "wa-vector-purpose:3D-Construct",
        "comment": null,
        "length": 1.999
      }
    },
    {
      "id": "uuid:21935dcb-8634-4e57-abf4-4585eba35018",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Edge",
        "references": [
          "uuid:5228ad62-0730-416f-89b0-5042da216efb",
          "uuid:bce88da3-5cda-4af9-a494-4d4b319ed2c1"
        ]
      },
      "properties": {
        "vectorPurpose": "wa-vector-purpose:3D-Construct",
        "comment": null,
        "length": 3.998
      }
    },
    {
      "id": "uuid:b179ed08-b3a8-492c-8642-b76fb67bdd64",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Edge",
        "references": [
          "uuid:3e40bf74-9619-426b-8b5e-58ebe480a92b",
          "uuid:d75d9704-aeb3-4dc7-b2f0-a3fb62f44dd4"
        ]
      },
      "properties": {
        "vectorPurpose": "wa-vector-purpose:3D-Construct",
        "comment": null,
        "length": 3.999
      }
    },
    {
      "id": "uuid:a51db565-6909-4151-ad98-9c7fbeb85c19",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Edge",
        "references": [
          "uuid:d75d9704-aeb3-4dc7-b2f0-a3fb62f44dd4",
          "uuid:e0d36194-78e8-4255-b6b7-4f59b79544db"
        ]
      },
      "properties": {
        "vectorPurpose": "wa-vector-purpose:3D-Construct",
        "comment": null,
        "length": 3.0
      }
    },
    {
      "id": "uuid:e8b25b9d-346c-4cdf-985b-c742fd7c3a34",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Edge",
        "references": [
          "uuid:d75d9704-aeb3-4dc7-b2f0-a3fb62f44dd4",
          "uuid:f84d09ba-e7af-48a7-bd47-30ca9265214c"
        ]
      },
      "properties": {
        "vectorPurpose": "wa-vector-purpose:3D-Construct",
        "comment": null,
        "length": 1.999
      }
    },
    {
      "id": "uuid:aa458878-e72e-454e-9921-bfbf14315787",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Edge",
        "references": [
          "uuid:f84d09ba-e7af-48a7-bd47-30ca9265214c",
          "uuid:5228ad62-0730-416f-89b0-5042da216efb"
        ]
      },
      "properties": {
        "vectorPurpose": "wa-vector-purpose:3D-Construct",
        "comment": null,
        "length": 3.0
      }
    },
    {
      "id": "uuid:791da2a3-ee19-44a1-b604-5f379ab00bb1",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Edge",
        "references": [
          "uuid:2f1070ed-9bae-47f5-a856-7f4db788c010",
          "uuid:f84d09ba-e7af-48a7-bd47-30ca9265214c"
        ]
      },
      "properties": {
        "vectorPurpose": "wa-vector-purpose:3D-Construct",
        "comment": null,
        "length": 3.998
      }
    }
  ],
  "rings": [
    {
      "id": "uuid:bec0f9d8-0d77-46ba-8941-f884943ac3d8",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Ring",
        "directed_references": [
          {
            "ref": "uuid:cc9ce047-61a1-4bf9-a366-bfc5b43092c2",
            "orientation": "+"
          },
          {
            "ref": "uuid:c795e6d9-0f44-4b1c-bc01-686d5e2acaa3",
            "orientation": "+"
          },
          {
            "ref": "uuid:f0aa8d02-1aa3-4f44-be28-d135c94de497",
            "orientation": "+"
          },
          {
            "ref": "uuid:06e882da-e914-4ff8-a279-13c1b16b7646",
            "orientation": "+"
          }
        ]
      },
      "properties": {
        "circumference": 21.994
      }
    },
    {
      "id": "uuid:6642ea7b-0b5e-474c-95ef-fe5a15be551b",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Ring",
        "directed_references": [
          {
            "ref": "uuid:5f1fd4be-c4ba-4387-9d7d-6e26b8299dc9",
            "orientation": "+"
          },
          {
            "ref": "uuid:f0aa8d02-1aa3-4f44-be28-d135c94de497",
            "orientation": "-"
          },
          {
            "ref": "uuid:d27bfb1b-ffd5-4fb3-9594-6f04ad66aa81",
            "orientation": "+"
          },
          {
            "ref": "uuid:9257083c-e11a-4914-a120-fbb11f0c10c8",
            "orientation": "+"
          }
        ]
      },
      "properties": {
        "circumference": 17.998
      }
    },
    {
      "id": "uuid:10ebd12b-36b6-4db0-b43e-b742e05540ce",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Ring",
        "directed_references": [
          {
            "ref": "uuid:725ebfd6-7c75-44fa-b917-94381bddef5f",
            "orientation": "+"
          },
          {
            "ref": "uuid:cc9ce047-61a1-4bf9-a366-bfc5b43092c2",
            "orientation": "-"
          },
          {
            "ref": "uuid:b42f27c9-d0e6-4cfb-9ea3-7e2517426428",
            "orientation": "+"
          },
          {
            "ref": "uuid:5367fe8d-79c0-4161-a4ce-3b7f42afad3e",
            "orientation": "+"
          }
        ]
      },
      "properties": {
        "circumference": 21.996
      }
    },
    {
      "id": "uuid:f8c1f3d2-aeb6-4b33-b6f8-7d01a5e8ae59",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Ring",
        "directed_references": [
          {
            "ref": "uuid:d27bfb1b-ffd5-4fb3-9594-6f04ad66aa81",
            "orientation": "-"
          },
          {
            "ref": "uuid:c795e6d9-0f44-4b1c-bc01-686d5e2acaa3",
            "orientation": "-"
          },
          {
            "ref": "uuid:725ebfd6-7c75-44fa-b917-94381bddef5f",
            "orientation": "-"
          },
          {
            "ref": "uuid:9a5a3eef-7ddb-40bf-ae2a-111b4623fb08",
            "orientation": "+"
          },
          {
            "ref": "uuid:0795c157-5fcb-4d01-b0f0-fedf92b1d41f",
            "orientation": "+"
          },
          {
            "ref": "uuid:21935dcb-8634-4e57-abf4-4585eba35018",
            "orientation": "+"
          }
        ]
      },
      "properties": {
        "circumference": 31.99
      }
    },
    {
      "id": "uuid:72d54df4-b018-4897-a96d-7d62cb9d8c4a",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Ring",
        "directed_references": [
          {
            "ref": "uuid:b179ed08-b3a8-492c-8642-b76fb67bdd64",
            "orientation": "+"
          },
          {
            "ref": "uuid:a51db565-6909-4151-ad98-9c7fbeb85c19",
            "orientation": "+"
          },
          {
            "ref": "uuid:9a5a3eef-7ddb-40bf-ae2a-111b4623fb08",
            "orientation": "-"
          },
          {
            "ref": "uuid:5367fe8d-79c0-4161-a4ce-3b7f42afad3e",
            "orientation": "-"
          }
        ]
      },
      "properties": {
        "circumference": 13.998
      }
    },
    {
      "id": "uuid:d7b9eb80-93ca-4ee5-adcb-ab1cfda75d4f",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Ring",
        "directed_references": [
          {
            "ref": "uuid:e8b25b9d-346c-4cdf-985b-c742fd7c3a34",
            "orientation": "+"
          },
          {
            "ref": "uuid:aa458878-e72e-454e-9921-bfbf14315787",
            "orientation": "+"
          },
          {
            "ref": "uuid:0795c157-5fcb-4d01-b0f0-fedf92b1d41f",
            "orientation": "-"
          },
          {
            "ref": "uuid:a51db565-6909-4151-ad98-9c7fbeb85c19",
            "orientation": "-"
          }
        ]
      },
      "properties": {
        "circumference": 9.998
      }
    },
    {
      "id": "uuid:79e3d840-7da3-4380-8288-6c2db4ac8b06",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Ring",
        "directed_references": [
          {
            "ref": "uuid:5f1fd4be-c4ba-4387-9d7d-6e26b8299dc9",
            "orientation": "-"
          },
          {
            "ref": "uuid:791da2a3-ee19-44a1-b604-5f379ab00bb1",
            "orientation": "+"
          },
          {
            "ref": "uuid:e8b25b9d-346c-4cdf-985b-c742fd7c3a34",
            "orientation": "-"
          },
          {
            "ref": "uuid:b179ed08-b3a8-492c-8642-b76fb67bdd64",
            "orientation": "-"
          },
          {
            "ref": "uuid:b42f27c9-d0e6-4cfb-9ea3-7e2517426428",
            "orientation": "-"
          },
          {
            "ref": "uuid:06e882da-e914-4ff8-a279-13c1b16b7646",
            "orientation": "-"
          }
        ]
      },
      "properties": {
        "circumference": 31.99
      }
    },
    {
      "id": "uuid:7472a7e9-efcf-49a8-a19f-4a14c3e6f86e",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Ring",
        "directed_references": [
          {
            "ref": "uuid:791da2a3-ee19-44a1-b604-5f379ab00bb1",
            "orientation": "-"
          },
          {
            "ref": "uuid:9257083c-e11a-4914-a120-fbb11f0c10c8",
            "orientation": "-"
          },
          {
            "ref": "uuid:21935dcb-8634-4e57-abf4-4585eba35018",
            "orientation": "-"
          },
          {
            "ref": "uuid:aa458878-e72e-454e-9921-bfbf14315787",
            "orientation": "-"
          }
        ]
      },
      "properties": {
        "circumference": 13.996
      }
    }
  ],
  "faces": [
    {
      "id": "uuid:649a326e-bb1e-4492-943a-39aa35806c64",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "directed_references": [
          {
            "ref": "uuid:bec0f9d8-0d77-46ba-8941-f884943ac3d8",
            "orientation": "+"
          }
        ]
      },
      "properties": {
        "normal": [
          0.9999999999937695,
          2.1252341604305102e-06,
          2.818552790910351e-06
        ],
        "area": 23.991,
        "description": "East-facing boundary face, [Upper East]"
      }
    },
    {
      "id": "uuid:4fe850d8-d729-4851-b7d9-0f9e7ed39468",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "directed_references": [
          {
            "ref": "uuid:6642ea7b-0b5e-474c-95ef-fe5a15be551b",
            "orientation": "+"
          }
        ]
      },
      "properties": {
        "normal": [
          2.1347501594712472e-06,
          -0.9999999999976475,
          -3.8463119361166447e-07
        ],
        "area": 17.997,
        "description": "South-facing boundary face, [Upper East]"
      }
    },
    {
      "id": "uuid:0523e3be-6777-40f9-9e14-523e128647c0",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "directed_references": [
          {
            "ref": "uuid:10ebd12b-36b6-4db0-b43e-b742e05540ce",
            "orientation": "+"
          }
        ]
      },
      "properties": {
        "normal": [
          -2.1160627370878684e-06,
          0.9999999999964104,
          1.6436244147846745e-06
        ],
        "area": 23.994,
        "description": "North-facing boundary face, [Upper East]"
      }
    },
    {
      "id": "uuid:4def3698-95e1-486f-9588-a69a73640e5c",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "directed_references": [
          {
            "ref": "uuid:f8c1f3d2-aeb6-4b33-b6f8-7d01a5e8ae59",
            "orientation": "+"
          }
        ]
      },
      "properties": {
        "normal": [
          0.0,
          0.0,
          1.0
        ],
        "area": 55.969,
        "description": "Top boundary face, [Upper East]"
      }
    },
    {
      "id": "uuid:fa7823a2-8ed7-43f0-9912-e7ade12c966a",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "directed_references": [
          {
            "ref": "uuid:72d54df4-b018-4897-a96d-7d62cb9d8c4a",
            "orientation": "+"
          }
        ]
      },
      "properties": {
        "normal": [
          -0.9999999999965267,
          -2.120773346758996e-06,
          -1.5650321292142593e-06
        ],
        "area": 11.997,
        "description": "West-facing boundary face, [Upper East, Upper West]"
      }
    },
    {
      "id": "uuid:f45d1ba5-ecfe-4b0b-b315-2dc71cfe2b3b",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "directed_references": [
          {
            "ref": "uuid:d7b9eb80-93ca-4ee5-adcb-ab1cfda75d4f",
            "orientation": "+"
          }
        ]
      },
      "properties": {
        "normal": [
          2.124969241213484e-06,
          -0.9999999999972277,
          -1.0145170209822307e-06
        ],
        "area": 5.997,
        "description": "South-facing boundary face, [Upper East, Stairwell]"
      }
    },
    {
      "id": "uuid:d0ddc512-0c81-43bb-a000-bf5017ff64a7",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "directed_references": [
          {
            "ref": "uuid:79e3d840-7da3-4380-8288-6c2db4ac8b06",
            "orientation": "+"
          }
        ]
      },
      "properties": {
        "normal": [
          -0.0,
          -0.0,
          -1.0
        ],
        "area": 55.969,
        "description": "Bottom boundary face, [Upper East, Lower East]"
      }
    },
    {
      "id": "uuid:fbe45af6-b334-4500-97e3-3c4cd177db90",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "directed_references": [
          {
            "ref": "uuid:7472a7e9-efcf-49a8-a19f-4a14c3e6f86e",
            "orientation": "+"
          }
        ]
      },
      "properties": {
        "normal": [
          -0.9999999999959679,
          -2.1300537012889316e-06,
          -1.8780230806249394e-06
        ],
        "area": 11.994,
        "description": "West-facing boundary face, [Upper East, Stairwell]"
      }
    }
  ],
  "shells": [
    {
      "id": "uuid:31dcf84a-98c6-48b1-8ba6-14d7a5ff6749",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Shell",
        "directed_references": [
          {
            "ref": "uuid:649a326e-bb1e-4492-943a-39aa35806c64",
            "orientation": "+"
          },
          {
            "ref": "uuid:4fe850d8-d729-4851-b7d9-0f9e7ed39468",
            "orientation": "+"
          },
          {
            "ref": "uuid:0523e3be-6777-40f9-9e14-523e128647c0",
            "orientation": "+"
          },
          {
            "ref": "uuid:4def3698-95e1-486f-9588-a69a73640e5c",
            "orientation": "+"
          },
          {
            "ref": "uuid:fa7823a2-8ed7-43f0-9912-e7ade12c966a",
            "orientation": "+"
          },
          {
            "ref": "uuid:f45d1ba5-ecfe-4b0b-b315-2dc71cfe2b3b",
            "orientation": "+"
          },
          {
            "ref": "uuid:d0ddc512-0c81-43bb-a000-bf5017ff64a7",
            "orientation": "+"
          },
          {
            "ref": "uuid:fbe45af6-b334-4500-97e3-3c4cd177db90",
            "orientation": "+"
          }
        ]
      },
      "properties": {
        "description": "Exterior Shell of Upper East"
      }
    }
  ]
}

```

#### jsonld
```jsonld
{
  "@context": "https://surroundaustralia.github.io/topo-feature/build/annotated/geo/topo/features/topo-shell/context.jsonld",
  "type": "FeatureCollection",
  "features": [],
  "comment": "Self-contained example: the 'Upper East' Solid from 4-unit-up-down.json with its Shell and all supporting faces, rings, edges and points",
  "points": [
    {
      "id": "uuid:32acfb36-f3d3-47fe-9400-eec9b06d781e",
      "type": "Feature",
      "featureType": "BoundaryMark",
      "time": "2026-05-27T05:58:56.914093+00:00",
      "geometry": {
        "type": "Point",
        "coordinates": [
          116.00779818303263,
          -31.88703552343606,
          23.0
        ]
      },
      "place": {
        "type": "Point",
        "coordinates": [
          406164.425,
          6471656.237,
          23.0
        ]
      },
      "properties": {
        "purpose": "wa-surveypoint-purpose:boundary",
        "ptQualityMeasure": 0.1,
        "comment": null,
        "monumentedBy": {
          "form": "wa-monument-form:cadastral-point-unmarked",
          "condition": "wa-monument-condition:ok",
          "state": "wa-monument-state:unmarked"
        }
      }
    },
    {
      "id": "uuid:fa551002-6466-46f1-a2f3-f433334447e6",
      "type": "Feature",
      "featureType": "BoundaryMark",
      "time": "2026-05-27T05:58:56.914093+00:00",
      "geometry": {
        "type": "Point",
        "coordinates": [
          116.00779818303263,
          -31.88703552343606,
          26.0
        ]
      },
      "place": {
        "type": "Point",
        "coordinates": [
          406164.425,
          6471656.237,
          26.0
        ]
      },
      "properties": {
        "purpose": "wa-surveypoint-purpose:boundary",
        "ptQualityMeasure": 0.1,
        "comment": null,
        "monumentedBy": {
          "form": "wa-monument-form:cadastral-point-unmarked",
          "condition": "wa-monument-condition:ok",
          "state": "wa-monument-state:unmarked"
        }
      }
    },
    {
      "id": "uuid:83d45b42-d9bb-48cb-9777-fbb2525083f9",
      "type": "Feature",
      "featureType": "BoundaryMark",
      "time": "2026-05-27T05:58:56.914093+00:00",
      "geometry": {
        "type": "Point",
        "coordinates": [
          116.00779740952903,
          -31.887107661310704,
          26.0
        ]
      },
      "place": {
        "type": "Point",
        "coordinates": [
          406164.425,
          6471648.24,
          26.0
        ]
      },
      "properties": {
        "purpose": "wa-surveypoint-purpose:boundary",
        "ptQualityMeasure": 0.1,
        "comment": null,
        "monumentedBy": {
          "form": "wa-monument-form:cadastral-point-unmarked",
          "condition": "wa-monument-condition:ok",
          "state": "wa-monument-state:unmarked"
        }
      }
    },
    {
      "id": "uuid:fa94e00a-24f0-4133-bd78-8a6d28be410d",
      "type": "Feature",
      "featureType": "BoundaryMark",
      "time": "2026-05-27T05:58:56.914093+00:00",
      "geometry": {
        "type": "Point",
        "coordinates": [
          116.00779740952903,
          -31.887107661310704,
          23.0
        ]
      },
      "place": {
        "type": "Point",
        "coordinates": [
          406164.425,
          6471648.24,
          23.0
        ]
      },
      "properties": {
        "purpose": "wa-surveypoint-purpose:boundary",
        "ptQualityMeasure": 0.1,
        "comment": null,
        "monumentedBy": {
          "form": "wa-monument-form:cadastral-point-unmarked",
          "condition": "wa-monument-condition:ok",
          "state": "wa-monument-state:unmarked"
        }
      }
    },
    {
      "id": "uuid:2f1070ed-9bae-47f5-a856-7f4db788c010",
      "type": "Feature",
      "featureType": "BoundaryMark",
      "time": "2026-05-27T05:58:56.914093+00:00",
      "geometry": {
        "type": "Point",
        "coordinates": [
          116.00773398518112,
          -31.88710716621648,
          23.0
        ]
      },
      "place": {
        "type": "Point",
        "coordinates": [
          406158.426,
          6471648.24,
          23.0
        ]
      },
      "properties": {
        "purpose": "wa-surveypoint-purpose:boundary",
        "ptQualityMeasure": 0.1,
        "comment": null,
        "monumentedBy": {
          "form": "wa-monument-form:cadastral-point-unmarked",
          "condition": "wa-monument-condition:ok",
          "state": "wa-monument-state:unmarked"
        }
      }
    },
    {
      "id": "uuid:bce88da3-5cda-4af9-a494-4d4b319ed2c1",
      "type": "Feature",
      "featureType": "BoundaryMark",
      "time": "2026-05-27T05:58:56.914093+00:00",
      "geometry": {
        "type": "Point",
        "coordinates": [
          116.00773398518112,
          -31.88710716621648,
          26.0
        ]
      },
      "place": {
        "type": "Point",
        "coordinates": [
          406158.426,
          6471648.24,
          26.0
        ]
      },
      "properties": {
        "purpose": "wa-surveypoint-purpose:boundary",
        "ptQualityMeasure": 0.1,
        "comment": null,
        "monumentedBy": {
          "form": "wa-monument-form:cadastral-point-unmarked",
          "condition": "wa-monument-condition:ok",
          "state": "wa-monument-state:unmarked"
        }
      }
    },
    {
      "id": "uuid:e7478b99-0d1e-4a1f-b958-c6a4b1719e96",
      "type": "Feature",
      "featureType": "BoundaryMark",
      "time": "2026-05-27T05:58:56.914093+00:00",
      "geometry": {
        "type": "Point",
        "coordinates": [
          116.00771362434999,
          -31.88703486336026,
          26.0
        ]
      },
      "place": {
        "type": "Point",
        "coordinates": [
          406156.427,
          6471656.237,
          26.0
        ]
      },
      "properties": {
        "purpose": "wa-surveypoint-purpose:boundary",
        "ptQualityMeasure": 0.1,
        "comment": null,
        "monumentedBy": {
          "form": "wa-monument-form:cadastral-point-unmarked",
          "condition": "wa-monument-condition:ok",
          "state": "wa-monument-state:unmarked"
        }
      }
    },
    {
      "id": "uuid:3e40bf74-9619-426b-8b5e-58ebe480a92b",
      "type": "Feature",
      "featureType": "BoundaryMark",
      "time": "2026-05-27T05:58:56.914093+00:00",
      "geometry": {
        "type": "Point",
        "coordinates": [
          116.00771362434999,
          -31.88703486336026,
          23.0
        ]
      },
      "place": {
        "type": "Point",
        "coordinates": [
          406156.427,
          6471656.237,
          23.0
        ]
      },
      "properties": {
        "purpose": "wa-surveypoint-purpose:boundary",
        "ptQualityMeasure": 0.1,
        "comment": null,
        "monumentedBy": {
          "form": "wa-monument-form:cadastral-point-unmarked",
          "condition": "wa-monument-condition:ok",
          "state": "wa-monument-state:unmarked"
        }
      }
    },
    {
      "id": "uuid:e0d36194-78e8-4255-b6b7-4f59b79544db",
      "type": "Feature",
      "featureType": "BoundaryMark",
      "time": "2026-05-27T05:58:56.914093+00:00",
      "geometry": {
        "type": "Point",
        "coordinates": [
          116.00771323751721,
          -31.887070936807078,
          26.0
        ]
      },
      "place": {
        "type": "Point",
        "coordinates": [
          406156.427,
          6471652.238,
          26.0
        ]
      },
      "properties": {
        "purpose": "wa-surveypoint-purpose:boundary",
        "ptQualityMeasure": 0.1,
        "comment": null,
        "monumentedBy": {
          "form": "wa-monument-form:cadastral-point-unmarked",
          "condition": "wa-monument-condition:ok",
          "state": "wa-monument-state:unmarked"
        }
      }
    },
    {
      "id": "uuid:5228ad62-0730-416f-89b0-5042da216efb",
      "type": "Feature",
      "featureType": "BoundaryMark",
      "time": "2026-05-27T05:58:56.914093+00:00",
      "geometry": {
        "type": "Point",
        "coordinates": [
          116.00773437190962,
          -31.88707110179026,
          26.0
        ]
      },
      "place": {
        "type": "Point",
        "coordinates": [
          406158.426,
          6471652.238,
          26.0
        ]
      },
      "properties": {
        "purpose": "wa-surveypoint-purpose:boundary",
        "ptQualityMeasure": 0.1,
        "comment": null,
        "monumentedBy": {
          "form": "wa-monument-form:cadastral-point-unmarked",
          "condition": "wa-monument-condition:ok",
          "state": "wa-monument-state:unmarked"
        }
      }
    },
    {
      "id": "uuid:d75d9704-aeb3-4dc7-b2f0-a3fb62f44dd4",
      "type": "Feature",
      "featureType": "BoundaryMark",
      "time": "2026-05-27T05:58:56.914093+00:00",
      "geometry": {
        "type": "Point",
        "coordinates": [
          116.00771323751721,
          -31.887070936807078,
          23.0
        ]
      },
      "place": {
        "type": "Point",
        "coordinates": [
          406156.427,
          6471652.238,
          23.0
        ]
      },
      "properties": {
        "purpose": "wa-surveypoint-purpose:boundary",
        "ptQualityMeasure": 0.1,
        "comment": null,
        "monumentedBy": {
          "form": "wa-monument-form:cadastral-point-unmarked",
          "condition": "wa-monument-condition:ok",
          "state": "wa-monument-state:unmarked"
        }
      }
    },
    {
      "id": "uuid:f84d09ba-e7af-48a7-bd47-30ca9265214c",
      "type": "Feature",
      "featureType": "BoundaryMark",
      "time": "2026-05-27T05:58:56.914093+00:00",
      "geometry": {
        "type": "Point",
        "coordinates": [
          116.00773437190962,
          -31.88707110179026,
          23.0
        ]
      },
      "place": {
        "type": "Point",
        "coordinates": [
          406158.426,
          6471652.238,
          23.0
        ]
      },
      "properties": {
        "purpose": "wa-surveypoint-purpose:boundary",
        "ptQualityMeasure": 0.1,
        "comment": null,
        "monumentedBy": {
          "form": "wa-monument-form:cadastral-point-unmarked",
          "condition": "wa-monument-condition:ok",
          "state": "wa-monument-state:unmarked"
        }
      }
    }
  ],
  "edges": [
    {
      "id": "uuid:cc9ce047-61a1-4bf9-a366-bfc5b43092c2",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Edge",
        "references": [
          "uuid:32acfb36-f3d3-47fe-9400-eec9b06d781e",
          "uuid:fa551002-6466-46f1-a2f3-f433334447e6"
        ]
      },
      "properties": {
        "vectorPurpose": "wa-vector-purpose:3D-Construct",
        "comment": null,
        "length": 3.0
      }
    },
    {
      "id": "uuid:c795e6d9-0f44-4b1c-bc01-686d5e2acaa3",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Edge",
        "references": [
          "uuid:fa551002-6466-46f1-a2f3-f433334447e6",
          "uuid:83d45b42-d9bb-48cb-9777-fbb2525083f9"
        ]
      },
      "properties": {
        "vectorPurpose": "wa-vector-purpose:3D-Construct",
        "comment": null,
        "length": 7.997
      }
    },
    {
      "id": "uuid:f0aa8d02-1aa3-4f44-be28-d135c94de497",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Edge",
        "references": [
          "uuid:83d45b42-d9bb-48cb-9777-fbb2525083f9",
          "uuid:fa94e00a-24f0-4133-bd78-8a6d28be410d"
        ]
      },
      "properties": {
        "vectorPurpose": "wa-vector-purpose:3D-Construct",
        "comment": null,
        "length": 3.0
      }
    },
    {
      "id": "uuid:06e882da-e914-4ff8-a279-13c1b16b7646",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Edge",
        "references": [
          "uuid:fa94e00a-24f0-4133-bd78-8a6d28be410d",
          "uuid:32acfb36-f3d3-47fe-9400-eec9b06d781e"
        ]
      },
      "properties": {
        "vectorPurpose": "wa-vector-purpose:3D-Construct",
        "comment": null,
        "length": 7.997
      }
    },
    {
      "id": "uuid:5f1fd4be-c4ba-4387-9d7d-6e26b8299dc9",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Edge",
        "references": [
          "uuid:2f1070ed-9bae-47f5-a856-7f4db788c010",
          "uuid:fa94e00a-24f0-4133-bd78-8a6d28be410d"
        ]
      },
      "properties": {
        "vectorPurpose": "wa-vector-purpose:3D-Construct",
        "comment": null,
        "length": 5.999
      }
    },
    {
      "id": "uuid:d27bfb1b-ffd5-4fb3-9594-6f04ad66aa81",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Edge",
        "references": [
          "uuid:83d45b42-d9bb-48cb-9777-fbb2525083f9",
          "uuid:bce88da3-5cda-4af9-a494-4d4b319ed2c1"
        ]
      },
      "properties": {
        "vectorPurpose": "wa-vector-purpose:3D-Construct",
        "comment": null,
        "length": 5.999
      }
    },
    {
      "id": "uuid:9257083c-e11a-4914-a120-fbb11f0c10c8",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Edge",
        "references": [
          "uuid:bce88da3-5cda-4af9-a494-4d4b319ed2c1",
          "uuid:2f1070ed-9bae-47f5-a856-7f4db788c010"
        ]
      },
      "properties": {
        "vectorPurpose": "wa-vector-purpose:3D-Construct",
        "comment": null,
        "length": 3.0
      }
    },
    {
      "id": "uuid:725ebfd6-7c75-44fa-b917-94381bddef5f",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Edge",
        "references": [
          "uuid:e7478b99-0d1e-4a1f-b958-c6a4b1719e96",
          "uuid:fa551002-6466-46f1-a2f3-f433334447e6"
        ]
      },
      "properties": {
        "vectorPurpose": "wa-vector-purpose:3D-Construct",
        "comment": null,
        "length": 7.998
      }
    },
    {
      "id": "uuid:b42f27c9-d0e6-4cfb-9ea3-7e2517426428",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Edge",
        "references": [
          "uuid:32acfb36-f3d3-47fe-9400-eec9b06d781e",
          "uuid:3e40bf74-9619-426b-8b5e-58ebe480a92b"
        ]
      },
      "properties": {
        "vectorPurpose": "wa-vector-purpose:3D-Construct",
        "comment": null,
        "length": 7.998
      }
    },
    {
      "id": "uuid:5367fe8d-79c0-4161-a4ce-3b7f42afad3e",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Edge",
        "references": [
          "uuid:3e40bf74-9619-426b-8b5e-58ebe480a92b",
          "uuid:e7478b99-0d1e-4a1f-b958-c6a4b1719e96"
        ]
      },
      "properties": {
        "vectorPurpose": "wa-vector-purpose:3D-Construct",
        "comment": null,
        "length": 3.0
      }
    },
    {
      "id": "uuid:9a5a3eef-7ddb-40bf-ae2a-111b4623fb08",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Edge",
        "references": [
          "uuid:e7478b99-0d1e-4a1f-b958-c6a4b1719e96",
          "uuid:e0d36194-78e8-4255-b6b7-4f59b79544db"
        ]
      },
      "properties": {
        "vectorPurpose": "wa-vector-purpose:3D-Construct",
        "comment": null,
        "length": 3.999
      }
    },
    {
      "id": "uuid:0795c157-5fcb-4d01-b0f0-fedf92b1d41f",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Edge",
        "references": [
          "uuid:e0d36194-78e8-4255-b6b7-4f59b79544db",
          "uuid:5228ad62-0730-416f-89b0-5042da216efb"
        ]
      },
      "properties": {
        "vectorPurpose": "wa-vector-purpose:3D-Construct",
        "comment": null,
        "length": 1.999
      }
    },
    {
      "id": "uuid:21935dcb-8634-4e57-abf4-4585eba35018",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Edge",
        "references": [
          "uuid:5228ad62-0730-416f-89b0-5042da216efb",
          "uuid:bce88da3-5cda-4af9-a494-4d4b319ed2c1"
        ]
      },
      "properties": {
        "vectorPurpose": "wa-vector-purpose:3D-Construct",
        "comment": null,
        "length": 3.998
      }
    },
    {
      "id": "uuid:b179ed08-b3a8-492c-8642-b76fb67bdd64",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Edge",
        "references": [
          "uuid:3e40bf74-9619-426b-8b5e-58ebe480a92b",
          "uuid:d75d9704-aeb3-4dc7-b2f0-a3fb62f44dd4"
        ]
      },
      "properties": {
        "vectorPurpose": "wa-vector-purpose:3D-Construct",
        "comment": null,
        "length": 3.999
      }
    },
    {
      "id": "uuid:a51db565-6909-4151-ad98-9c7fbeb85c19",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Edge",
        "references": [
          "uuid:d75d9704-aeb3-4dc7-b2f0-a3fb62f44dd4",
          "uuid:e0d36194-78e8-4255-b6b7-4f59b79544db"
        ]
      },
      "properties": {
        "vectorPurpose": "wa-vector-purpose:3D-Construct",
        "comment": null,
        "length": 3.0
      }
    },
    {
      "id": "uuid:e8b25b9d-346c-4cdf-985b-c742fd7c3a34",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Edge",
        "references": [
          "uuid:d75d9704-aeb3-4dc7-b2f0-a3fb62f44dd4",
          "uuid:f84d09ba-e7af-48a7-bd47-30ca9265214c"
        ]
      },
      "properties": {
        "vectorPurpose": "wa-vector-purpose:3D-Construct",
        "comment": null,
        "length": 1.999
      }
    },
    {
      "id": "uuid:aa458878-e72e-454e-9921-bfbf14315787",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Edge",
        "references": [
          "uuid:f84d09ba-e7af-48a7-bd47-30ca9265214c",
          "uuid:5228ad62-0730-416f-89b0-5042da216efb"
        ]
      },
      "properties": {
        "vectorPurpose": "wa-vector-purpose:3D-Construct",
        "comment": null,
        "length": 3.0
      }
    },
    {
      "id": "uuid:791da2a3-ee19-44a1-b604-5f379ab00bb1",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Edge",
        "references": [
          "uuid:2f1070ed-9bae-47f5-a856-7f4db788c010",
          "uuid:f84d09ba-e7af-48a7-bd47-30ca9265214c"
        ]
      },
      "properties": {
        "vectorPurpose": "wa-vector-purpose:3D-Construct",
        "comment": null,
        "length": 3.998
      }
    }
  ],
  "rings": [
    {
      "id": "uuid:bec0f9d8-0d77-46ba-8941-f884943ac3d8",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Ring",
        "directed_references": [
          {
            "ref": "uuid:cc9ce047-61a1-4bf9-a366-bfc5b43092c2",
            "orientation": "+"
          },
          {
            "ref": "uuid:c795e6d9-0f44-4b1c-bc01-686d5e2acaa3",
            "orientation": "+"
          },
          {
            "ref": "uuid:f0aa8d02-1aa3-4f44-be28-d135c94de497",
            "orientation": "+"
          },
          {
            "ref": "uuid:06e882da-e914-4ff8-a279-13c1b16b7646",
            "orientation": "+"
          }
        ]
      },
      "properties": {
        "circumference": 21.994
      }
    },
    {
      "id": "uuid:6642ea7b-0b5e-474c-95ef-fe5a15be551b",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Ring",
        "directed_references": [
          {
            "ref": "uuid:5f1fd4be-c4ba-4387-9d7d-6e26b8299dc9",
            "orientation": "+"
          },
          {
            "ref": "uuid:f0aa8d02-1aa3-4f44-be28-d135c94de497",
            "orientation": "-"
          },
          {
            "ref": "uuid:d27bfb1b-ffd5-4fb3-9594-6f04ad66aa81",
            "orientation": "+"
          },
          {
            "ref": "uuid:9257083c-e11a-4914-a120-fbb11f0c10c8",
            "orientation": "+"
          }
        ]
      },
      "properties": {
        "circumference": 17.998
      }
    },
    {
      "id": "uuid:10ebd12b-36b6-4db0-b43e-b742e05540ce",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Ring",
        "directed_references": [
          {
            "ref": "uuid:725ebfd6-7c75-44fa-b917-94381bddef5f",
            "orientation": "+"
          },
          {
            "ref": "uuid:cc9ce047-61a1-4bf9-a366-bfc5b43092c2",
            "orientation": "-"
          },
          {
            "ref": "uuid:b42f27c9-d0e6-4cfb-9ea3-7e2517426428",
            "orientation": "+"
          },
          {
            "ref": "uuid:5367fe8d-79c0-4161-a4ce-3b7f42afad3e",
            "orientation": "+"
          }
        ]
      },
      "properties": {
        "circumference": 21.996
      }
    },
    {
      "id": "uuid:f8c1f3d2-aeb6-4b33-b6f8-7d01a5e8ae59",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Ring",
        "directed_references": [
          {
            "ref": "uuid:d27bfb1b-ffd5-4fb3-9594-6f04ad66aa81",
            "orientation": "-"
          },
          {
            "ref": "uuid:c795e6d9-0f44-4b1c-bc01-686d5e2acaa3",
            "orientation": "-"
          },
          {
            "ref": "uuid:725ebfd6-7c75-44fa-b917-94381bddef5f",
            "orientation": "-"
          },
          {
            "ref": "uuid:9a5a3eef-7ddb-40bf-ae2a-111b4623fb08",
            "orientation": "+"
          },
          {
            "ref": "uuid:0795c157-5fcb-4d01-b0f0-fedf92b1d41f",
            "orientation": "+"
          },
          {
            "ref": "uuid:21935dcb-8634-4e57-abf4-4585eba35018",
            "orientation": "+"
          }
        ]
      },
      "properties": {
        "circumference": 31.99
      }
    },
    {
      "id": "uuid:72d54df4-b018-4897-a96d-7d62cb9d8c4a",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Ring",
        "directed_references": [
          {
            "ref": "uuid:b179ed08-b3a8-492c-8642-b76fb67bdd64",
            "orientation": "+"
          },
          {
            "ref": "uuid:a51db565-6909-4151-ad98-9c7fbeb85c19",
            "orientation": "+"
          },
          {
            "ref": "uuid:9a5a3eef-7ddb-40bf-ae2a-111b4623fb08",
            "orientation": "-"
          },
          {
            "ref": "uuid:5367fe8d-79c0-4161-a4ce-3b7f42afad3e",
            "orientation": "-"
          }
        ]
      },
      "properties": {
        "circumference": 13.998
      }
    },
    {
      "id": "uuid:d7b9eb80-93ca-4ee5-adcb-ab1cfda75d4f",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Ring",
        "directed_references": [
          {
            "ref": "uuid:e8b25b9d-346c-4cdf-985b-c742fd7c3a34",
            "orientation": "+"
          },
          {
            "ref": "uuid:aa458878-e72e-454e-9921-bfbf14315787",
            "orientation": "+"
          },
          {
            "ref": "uuid:0795c157-5fcb-4d01-b0f0-fedf92b1d41f",
            "orientation": "-"
          },
          {
            "ref": "uuid:a51db565-6909-4151-ad98-9c7fbeb85c19",
            "orientation": "-"
          }
        ]
      },
      "properties": {
        "circumference": 9.998
      }
    },
    {
      "id": "uuid:79e3d840-7da3-4380-8288-6c2db4ac8b06",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Ring",
        "directed_references": [
          {
            "ref": "uuid:5f1fd4be-c4ba-4387-9d7d-6e26b8299dc9",
            "orientation": "-"
          },
          {
            "ref": "uuid:791da2a3-ee19-44a1-b604-5f379ab00bb1",
            "orientation": "+"
          },
          {
            "ref": "uuid:e8b25b9d-346c-4cdf-985b-c742fd7c3a34",
            "orientation": "-"
          },
          {
            "ref": "uuid:b179ed08-b3a8-492c-8642-b76fb67bdd64",
            "orientation": "-"
          },
          {
            "ref": "uuid:b42f27c9-d0e6-4cfb-9ea3-7e2517426428",
            "orientation": "-"
          },
          {
            "ref": "uuid:06e882da-e914-4ff8-a279-13c1b16b7646",
            "orientation": "-"
          }
        ]
      },
      "properties": {
        "circumference": 31.99
      }
    },
    {
      "id": "uuid:7472a7e9-efcf-49a8-a19f-4a14c3e6f86e",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Ring",
        "directed_references": [
          {
            "ref": "uuid:791da2a3-ee19-44a1-b604-5f379ab00bb1",
            "orientation": "-"
          },
          {
            "ref": "uuid:9257083c-e11a-4914-a120-fbb11f0c10c8",
            "orientation": "-"
          },
          {
            "ref": "uuid:21935dcb-8634-4e57-abf4-4585eba35018",
            "orientation": "-"
          },
          {
            "ref": "uuid:aa458878-e72e-454e-9921-bfbf14315787",
            "orientation": "-"
          }
        ]
      },
      "properties": {
        "circumference": 13.996
      }
    }
  ],
  "faces": [
    {
      "id": "uuid:649a326e-bb1e-4492-943a-39aa35806c64",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "directed_references": [
          {
            "ref": "uuid:bec0f9d8-0d77-46ba-8941-f884943ac3d8",
            "orientation": "+"
          }
        ]
      },
      "properties": {
        "normal": [
          0.9999999999937695,
          2.1252341604305102e-06,
          2.818552790910351e-06
        ],
        "area": 23.991,
        "description": "East-facing boundary face, [Upper East]"
      }
    },
    {
      "id": "uuid:4fe850d8-d729-4851-b7d9-0f9e7ed39468",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "directed_references": [
          {
            "ref": "uuid:6642ea7b-0b5e-474c-95ef-fe5a15be551b",
            "orientation": "+"
          }
        ]
      },
      "properties": {
        "normal": [
          2.1347501594712472e-06,
          -0.9999999999976475,
          -3.8463119361166447e-07
        ],
        "area": 17.997,
        "description": "South-facing boundary face, [Upper East]"
      }
    },
    {
      "id": "uuid:0523e3be-6777-40f9-9e14-523e128647c0",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "directed_references": [
          {
            "ref": "uuid:10ebd12b-36b6-4db0-b43e-b742e05540ce",
            "orientation": "+"
          }
        ]
      },
      "properties": {
        "normal": [
          -2.1160627370878684e-06,
          0.9999999999964104,
          1.6436244147846745e-06
        ],
        "area": 23.994,
        "description": "North-facing boundary face, [Upper East]"
      }
    },
    {
      "id": "uuid:4def3698-95e1-486f-9588-a69a73640e5c",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "directed_references": [
          {
            "ref": "uuid:f8c1f3d2-aeb6-4b33-b6f8-7d01a5e8ae59",
            "orientation": "+"
          }
        ]
      },
      "properties": {
        "normal": [
          0.0,
          0.0,
          1.0
        ],
        "area": 55.969,
        "description": "Top boundary face, [Upper East]"
      }
    },
    {
      "id": "uuid:fa7823a2-8ed7-43f0-9912-e7ade12c966a",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "directed_references": [
          {
            "ref": "uuid:72d54df4-b018-4897-a96d-7d62cb9d8c4a",
            "orientation": "+"
          }
        ]
      },
      "properties": {
        "normal": [
          -0.9999999999965267,
          -2.120773346758996e-06,
          -1.5650321292142593e-06
        ],
        "area": 11.997,
        "description": "West-facing boundary face, [Upper East, Upper West]"
      }
    },
    {
      "id": "uuid:f45d1ba5-ecfe-4b0b-b315-2dc71cfe2b3b",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "directed_references": [
          {
            "ref": "uuid:d7b9eb80-93ca-4ee5-adcb-ab1cfda75d4f",
            "orientation": "+"
          }
        ]
      },
      "properties": {
        "normal": [
          2.124969241213484e-06,
          -0.9999999999972277,
          -1.0145170209822307e-06
        ],
        "area": 5.997,
        "description": "South-facing boundary face, [Upper East, Stairwell]"
      }
    },
    {
      "id": "uuid:d0ddc512-0c81-43bb-a000-bf5017ff64a7",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "directed_references": [
          {
            "ref": "uuid:79e3d840-7da3-4380-8288-6c2db4ac8b06",
            "orientation": "+"
          }
        ]
      },
      "properties": {
        "normal": [
          -0.0,
          -0.0,
          -1.0
        ],
        "area": 55.969,
        "description": "Bottom boundary face, [Upper East, Lower East]"
      }
    },
    {
      "id": "uuid:fbe45af6-b334-4500-97e3-3c4cd177db90",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "directed_references": [
          {
            "ref": "uuid:7472a7e9-efcf-49a8-a19f-4a14c3e6f86e",
            "orientation": "+"
          }
        ]
      },
      "properties": {
        "normal": [
          -0.9999999999959679,
          -2.1300537012889316e-06,
          -1.8780230806249394e-06
        ],
        "area": 11.994,
        "description": "West-facing boundary face, [Upper East, Stairwell]"
      }
    }
  ],
  "shells": [
    {
      "id": "uuid:31dcf84a-98c6-48b1-8ba6-14d7a5ff6749",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Shell",
        "directed_references": [
          {
            "ref": "uuid:649a326e-bb1e-4492-943a-39aa35806c64",
            "orientation": "+"
          },
          {
            "ref": "uuid:4fe850d8-d729-4851-b7d9-0f9e7ed39468",
            "orientation": "+"
          },
          {
            "ref": "uuid:0523e3be-6777-40f9-9e14-523e128647c0",
            "orientation": "+"
          },
          {
            "ref": "uuid:4def3698-95e1-486f-9588-a69a73640e5c",
            "orientation": "+"
          },
          {
            "ref": "uuid:fa7823a2-8ed7-43f0-9912-e7ade12c966a",
            "orientation": "+"
          },
          {
            "ref": "uuid:f45d1ba5-ecfe-4b0b-b315-2dc71cfe2b3b",
            "orientation": "+"
          },
          {
            "ref": "uuid:d0ddc512-0c81-43bb-a000-bf5017ff64a7",
            "orientation": "+"
          },
          {
            "ref": "uuid:fbe45af6-b334-4500-97e3-3c4cd177db90",
            "orientation": "+"
          }
        ]
      },
      "properties": {
        "description": "Exterior Shell of Upper East"
      }
    }
  ]
}
```

#### ttl
```ttl
@prefix dct: <http://purl.org/dc/terms/> .
@prefix geojson: <https://purl.org/geojson/vocab#> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix topo: <https://purl.org/geojson/topo#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

<uuid:31dcf84a-98c6-48b1-8ba6-14d7a5ff6749> a geojson:Feature ;
    geojson:topology [ a topo:Shell ;
            topo:directedReferences ( [ topo:orientation "+" ;
                        topo:ref <uuid:649a326e-bb1e-4492-943a-39aa35806c64> ] [ topo:orientation "+" ;
                        topo:ref <uuid:4fe850d8-d729-4851-b7d9-0f9e7ed39468> ] [ topo:orientation "+" ;
                        topo:ref <uuid:0523e3be-6777-40f9-9e14-523e128647c0> ] [ topo:orientation "+" ;
                        topo:ref <uuid:4def3698-95e1-486f-9588-a69a73640e5c> ] [ topo:orientation "+" ;
                        topo:ref <uuid:fa7823a2-8ed7-43f0-9912-e7ade12c966a> ] [ topo:orientation "+" ;
                        topo:ref <uuid:f45d1ba5-ecfe-4b0b-b315-2dc71cfe2b3b> ] [ topo:orientation "+" ;
                        topo:ref <uuid:d0ddc512-0c81-43bb-a000-bf5017ff64a7> ] [ topo:orientation "+" ;
                        topo:ref <uuid:fbe45af6-b334-4500-97e3-3c4cd177db90> ] ) ] .

<uuid:0523e3be-6777-40f9-9e14-523e128647c0> a geojson:Feature ;
    geojson:topology [ a topo:Face ;
            topo:directedReferences ( [ topo:orientation "+" ;
                        topo:ref <uuid:10ebd12b-36b6-4db0-b43e-b742e05540ce> ] ) ] .

<uuid:10ebd12b-36b6-4db0-b43e-b742e05540ce> a geojson:Feature ;
    geojson:topology [ a topo:Ring ;
            topo:directedReferences ( [ topo:orientation "+" ;
                        topo:ref <uuid:725ebfd6-7c75-44fa-b917-94381bddef5f> ] [ topo:orientation "-" ;
                        topo:ref <uuid:cc9ce047-61a1-4bf9-a366-bfc5b43092c2> ] [ topo:orientation "+" ;
                        topo:ref <uuid:b42f27c9-d0e6-4cfb-9ea3-7e2517426428> ] [ topo:orientation "+" ;
                        topo:ref <uuid:5367fe8d-79c0-4161-a4ce-3b7f42afad3e> ] ) ] .

<uuid:4def3698-95e1-486f-9588-a69a73640e5c> a geojson:Feature ;
    geojson:topology [ a topo:Face ;
            topo:directedReferences ( [ topo:orientation "+" ;
                        topo:ref <uuid:f8c1f3d2-aeb6-4b33-b6f8-7d01a5e8ae59> ] ) ] .

<uuid:4fe850d8-d729-4851-b7d9-0f9e7ed39468> a geojson:Feature ;
    geojson:topology [ a topo:Face ;
            topo:directedReferences ( [ topo:orientation "+" ;
                        topo:ref <uuid:6642ea7b-0b5e-474c-95ef-fe5a15be551b> ] ) ] .

<uuid:649a326e-bb1e-4492-943a-39aa35806c64> a geojson:Feature ;
    geojson:topology [ a topo:Face ;
            topo:directedReferences ( [ topo:orientation "+" ;
                        topo:ref <uuid:bec0f9d8-0d77-46ba-8941-f884943ac3d8> ] ) ] .

<uuid:6642ea7b-0b5e-474c-95ef-fe5a15be551b> a geojson:Feature ;
    geojson:topology [ a topo:Ring ;
            topo:directedReferences ( [ topo:orientation "+" ;
                        topo:ref <uuid:5f1fd4be-c4ba-4387-9d7d-6e26b8299dc9> ] [ topo:orientation "-" ;
                        topo:ref <uuid:f0aa8d02-1aa3-4f44-be28-d135c94de497> ] [ topo:orientation "+" ;
                        topo:ref <uuid:d27bfb1b-ffd5-4fb3-9594-6f04ad66aa81> ] [ topo:orientation "+" ;
                        topo:ref <uuid:9257083c-e11a-4914-a120-fbb11f0c10c8> ] ) ] .

<uuid:72d54df4-b018-4897-a96d-7d62cb9d8c4a> a geojson:Feature ;
    geojson:topology [ a topo:Ring ;
            topo:directedReferences ( [ topo:orientation "+" ;
                        topo:ref <uuid:b179ed08-b3a8-492c-8642-b76fb67bdd64> ] [ topo:orientation "+" ;
                        topo:ref <uuid:a51db565-6909-4151-ad98-9c7fbeb85c19> ] [ topo:orientation "-" ;
                        topo:ref <uuid:9a5a3eef-7ddb-40bf-ae2a-111b4623fb08> ] [ topo:orientation "-" ;
                        topo:ref <uuid:5367fe8d-79c0-4161-a4ce-3b7f42afad3e> ] ) ] .

<uuid:7472a7e9-efcf-49a8-a19f-4a14c3e6f86e> a geojson:Feature ;
    geojson:topology [ a topo:Ring ;
            topo:directedReferences ( [ topo:orientation "-" ;
                        topo:ref <uuid:791da2a3-ee19-44a1-b604-5f379ab00bb1> ] [ topo:orientation "-" ;
                        topo:ref <uuid:9257083c-e11a-4914-a120-fbb11f0c10c8> ] [ topo:orientation "-" ;
                        topo:ref <uuid:21935dcb-8634-4e57-abf4-4585eba35018> ] [ topo:orientation "-" ;
                        topo:ref <uuid:aa458878-e72e-454e-9921-bfbf14315787> ] ) ] .

<uuid:79e3d840-7da3-4380-8288-6c2db4ac8b06> a geojson:Feature ;
    geojson:topology [ a topo:Ring ;
            topo:directedReferences ( [ topo:orientation "-" ;
                        topo:ref <uuid:5f1fd4be-c4ba-4387-9d7d-6e26b8299dc9> ] [ topo:orientation "+" ;
                        topo:ref <uuid:791da2a3-ee19-44a1-b604-5f379ab00bb1> ] [ topo:orientation "-" ;
                        topo:ref <uuid:e8b25b9d-346c-4cdf-985b-c742fd7c3a34> ] [ topo:orientation "-" ;
                        topo:ref <uuid:b179ed08-b3a8-492c-8642-b76fb67bdd64> ] [ topo:orientation "-" ;
                        topo:ref <uuid:b42f27c9-d0e6-4cfb-9ea3-7e2517426428> ] [ topo:orientation "-" ;
                        topo:ref <uuid:06e882da-e914-4ff8-a279-13c1b16b7646> ] ) ] .

<uuid:bec0f9d8-0d77-46ba-8941-f884943ac3d8> a geojson:Feature ;
    geojson:topology [ a topo:Ring ;
            topo:directedReferences ( [ topo:orientation "+" ;
                        topo:ref <uuid:cc9ce047-61a1-4bf9-a366-bfc5b43092c2> ] [ topo:orientation "+" ;
                        topo:ref <uuid:c795e6d9-0f44-4b1c-bc01-686d5e2acaa3> ] [ topo:orientation "+" ;
                        topo:ref <uuid:f0aa8d02-1aa3-4f44-be28-d135c94de497> ] [ topo:orientation "+" ;
                        topo:ref <uuid:06e882da-e914-4ff8-a279-13c1b16b7646> ] ) ] .

<uuid:d0ddc512-0c81-43bb-a000-bf5017ff64a7> a geojson:Feature ;
    geojson:topology [ a topo:Face ;
            topo:directedReferences ( [ topo:orientation "+" ;
                        topo:ref <uuid:79e3d840-7da3-4380-8288-6c2db4ac8b06> ] ) ] .

<uuid:d7b9eb80-93ca-4ee5-adcb-ab1cfda75d4f> a geojson:Feature ;
    geojson:topology [ a topo:Ring ;
            topo:directedReferences ( [ topo:orientation "+" ;
                        topo:ref <uuid:e8b25b9d-346c-4cdf-985b-c742fd7c3a34> ] [ topo:orientation "+" ;
                        topo:ref <uuid:aa458878-e72e-454e-9921-bfbf14315787> ] [ topo:orientation "-" ;
                        topo:ref <uuid:0795c157-5fcb-4d01-b0f0-fedf92b1d41f> ] [ topo:orientation "-" ;
                        topo:ref <uuid:a51db565-6909-4151-ad98-9c7fbeb85c19> ] ) ] .

<uuid:f45d1ba5-ecfe-4b0b-b315-2dc71cfe2b3b> a geojson:Feature ;
    geojson:topology [ a topo:Face ;
            topo:directedReferences ( [ topo:orientation "+" ;
                        topo:ref <uuid:d7b9eb80-93ca-4ee5-adcb-ab1cfda75d4f> ] ) ] .

<uuid:f8c1f3d2-aeb6-4b33-b6f8-7d01a5e8ae59> a geojson:Feature ;
    geojson:topology [ a topo:Ring ;
            topo:directedReferences ( [ topo:orientation "-" ;
                        topo:ref <uuid:d27bfb1b-ffd5-4fb3-9594-6f04ad66aa81> ] [ topo:orientation "-" ;
                        topo:ref <uuid:c795e6d9-0f44-4b1c-bc01-686d5e2acaa3> ] [ topo:orientation "-" ;
                        topo:ref <uuid:725ebfd6-7c75-44fa-b917-94381bddef5f> ] [ topo:orientation "+" ;
                        topo:ref <uuid:9a5a3eef-7ddb-40bf-ae2a-111b4623fb08> ] [ topo:orientation "+" ;
                        topo:ref <uuid:0795c157-5fcb-4d01-b0f0-fedf92b1d41f> ] [ topo:orientation "+" ;
                        topo:ref <uuid:21935dcb-8634-4e57-abf4-4585eba35018> ] ) ] .

<uuid:fa7823a2-8ed7-43f0-9912-e7ade12c966a> a geojson:Feature ;
    geojson:topology [ a topo:Face ;
            topo:directedReferences ( [ topo:orientation "+" ;
                        topo:ref <uuid:72d54df4-b018-4897-a96d-7d62cb9d8c4a> ] ) ] .

<uuid:fbe45af6-b334-4500-97e3-3c4cd177db90> a geojson:Feature ;
    geojson:topology [ a topo:Face ;
            topo:directedReferences ( [ topo:orientation "+" ;
                        topo:ref <uuid:7472a7e9-efcf-49a8-a19f-4a14c3e6f86e> ] ) ] .

<uuid:06e882da-e914-4ff8-a279-13c1b16b7646> a geojson:Feature ;
    geojson:topology [ a topo:Edge ;
            topo:relatedFeatures ( <uuid:fa94e00a-24f0-4133-bd78-8a6d28be410d> <uuid:32acfb36-f3d3-47fe-9400-eec9b06d781e> ) ] .

<uuid:0795c157-5fcb-4d01-b0f0-fedf92b1d41f> a geojson:Feature ;
    geojson:topology [ a topo:Edge ;
            topo:relatedFeatures ( <uuid:e0d36194-78e8-4255-b6b7-4f59b79544db> <uuid:5228ad62-0730-416f-89b0-5042da216efb> ) ] .

<uuid:21935dcb-8634-4e57-abf4-4585eba35018> a geojson:Feature ;
    geojson:topology [ a topo:Edge ;
            topo:relatedFeatures ( <uuid:5228ad62-0730-416f-89b0-5042da216efb> <uuid:bce88da3-5cda-4af9-a494-4d4b319ed2c1> ) ] .

<uuid:5367fe8d-79c0-4161-a4ce-3b7f42afad3e> a geojson:Feature ;
    geojson:topology [ a topo:Edge ;
            topo:relatedFeatures ( <uuid:3e40bf74-9619-426b-8b5e-58ebe480a92b> <uuid:e7478b99-0d1e-4a1f-b958-c6a4b1719e96> ) ] .

<uuid:5f1fd4be-c4ba-4387-9d7d-6e26b8299dc9> a geojson:Feature ;
    geojson:topology [ a topo:Edge ;
            topo:relatedFeatures ( <uuid:2f1070ed-9bae-47f5-a856-7f4db788c010> <uuid:fa94e00a-24f0-4133-bd78-8a6d28be410d> ) ] .

<uuid:725ebfd6-7c75-44fa-b917-94381bddef5f> a geojson:Feature ;
    geojson:topology [ a topo:Edge ;
            topo:relatedFeatures ( <uuid:e7478b99-0d1e-4a1f-b958-c6a4b1719e96> <uuid:fa551002-6466-46f1-a2f3-f433334447e6> ) ] .

<uuid:791da2a3-ee19-44a1-b604-5f379ab00bb1> a geojson:Feature ;
    geojson:topology [ a topo:Edge ;
            topo:relatedFeatures ( <uuid:2f1070ed-9bae-47f5-a856-7f4db788c010> <uuid:f84d09ba-e7af-48a7-bd47-30ca9265214c> ) ] .

<uuid:9257083c-e11a-4914-a120-fbb11f0c10c8> a geojson:Feature ;
    geojson:topology [ a topo:Edge ;
            topo:relatedFeatures ( <uuid:bce88da3-5cda-4af9-a494-4d4b319ed2c1> <uuid:2f1070ed-9bae-47f5-a856-7f4db788c010> ) ] .

<uuid:9a5a3eef-7ddb-40bf-ae2a-111b4623fb08> a geojson:Feature ;
    geojson:topology [ a topo:Edge ;
            topo:relatedFeatures ( <uuid:e7478b99-0d1e-4a1f-b958-c6a4b1719e96> <uuid:e0d36194-78e8-4255-b6b7-4f59b79544db> ) ] .

<uuid:a51db565-6909-4151-ad98-9c7fbeb85c19> a geojson:Feature ;
    geojson:topology [ a topo:Edge ;
            topo:relatedFeatures ( <uuid:d75d9704-aeb3-4dc7-b2f0-a3fb62f44dd4> <uuid:e0d36194-78e8-4255-b6b7-4f59b79544db> ) ] .

<uuid:aa458878-e72e-454e-9921-bfbf14315787> a geojson:Feature ;
    geojson:topology [ a topo:Edge ;
            topo:relatedFeatures ( <uuid:f84d09ba-e7af-48a7-bd47-30ca9265214c> <uuid:5228ad62-0730-416f-89b0-5042da216efb> ) ] .

<uuid:b179ed08-b3a8-492c-8642-b76fb67bdd64> a geojson:Feature ;
    geojson:topology [ a topo:Edge ;
            topo:relatedFeatures ( <uuid:3e40bf74-9619-426b-8b5e-58ebe480a92b> <uuid:d75d9704-aeb3-4dc7-b2f0-a3fb62f44dd4> ) ] .

<uuid:b42f27c9-d0e6-4cfb-9ea3-7e2517426428> a geojson:Feature ;
    geojson:topology [ a topo:Edge ;
            topo:relatedFeatures ( <uuid:32acfb36-f3d3-47fe-9400-eec9b06d781e> <uuid:3e40bf74-9619-426b-8b5e-58ebe480a92b> ) ] .

<uuid:c795e6d9-0f44-4b1c-bc01-686d5e2acaa3> a geojson:Feature ;
    geojson:topology [ a topo:Edge ;
            topo:relatedFeatures ( <uuid:fa551002-6466-46f1-a2f3-f433334447e6> <uuid:83d45b42-d9bb-48cb-9777-fbb2525083f9> ) ] .

<uuid:cc9ce047-61a1-4bf9-a366-bfc5b43092c2> a geojson:Feature ;
    geojson:topology [ a topo:Edge ;
            topo:relatedFeatures ( <uuid:32acfb36-f3d3-47fe-9400-eec9b06d781e> <uuid:fa551002-6466-46f1-a2f3-f433334447e6> ) ] .

<uuid:d27bfb1b-ffd5-4fb3-9594-6f04ad66aa81> a geojson:Feature ;
    geojson:topology [ a topo:Edge ;
            topo:relatedFeatures ( <uuid:83d45b42-d9bb-48cb-9777-fbb2525083f9> <uuid:bce88da3-5cda-4af9-a494-4d4b319ed2c1> ) ] .

<uuid:e8b25b9d-346c-4cdf-985b-c742fd7c3a34> a geojson:Feature ;
    geojson:topology [ a topo:Edge ;
            topo:relatedFeatures ( <uuid:d75d9704-aeb3-4dc7-b2f0-a3fb62f44dd4> <uuid:f84d09ba-e7af-48a7-bd47-30ca9265214c> ) ] .

<uuid:f0aa8d02-1aa3-4f44-be28-d135c94de497> a geojson:Feature ;
    geojson:topology [ a topo:Edge ;
            topo:relatedFeatures ( <uuid:83d45b42-d9bb-48cb-9777-fbb2525083f9> <uuid:fa94e00a-24f0-4133-bd78-8a6d28be410d> ) ] .

<uuid:2f1070ed-9bae-47f5-a856-7f4db788c010> a <file:///github/workspace/BoundaryMark>,
        geojson:Feature ;
    dct:spatial [ a geojson:Point ;
            geojson:coordinates ( 4.061584e+05 6.471648e+06 2.3e+01 ) ] ;
    dct:time "2026-05-27T05:58:56.914093+00:00" ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 1.160077e+02 -3.188711e+01 2.3e+01 ) ] .

<uuid:32acfb36-f3d3-47fe-9400-eec9b06d781e> a <file:///github/workspace/BoundaryMark>,
        geojson:Feature ;
    dct:spatial [ a geojson:Point ;
            geojson:coordinates ( 4.061644e+05 6.471656e+06 2.3e+01 ) ] ;
    dct:time "2026-05-27T05:58:56.914093+00:00" ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 1.160078e+02 -3.188704e+01 2.3e+01 ) ] .

<uuid:3e40bf74-9619-426b-8b5e-58ebe480a92b> a <file:///github/workspace/BoundaryMark>,
        geojson:Feature ;
    dct:spatial [ a geojson:Point ;
            geojson:coordinates ( 4.061564e+05 6.471656e+06 2.3e+01 ) ] ;
    dct:time "2026-05-27T05:58:56.914093+00:00" ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 1.160077e+02 -3.188703e+01 2.3e+01 ) ] .

<uuid:5228ad62-0730-416f-89b0-5042da216efb> a <file:///github/workspace/BoundaryMark>,
        geojson:Feature ;
    dct:spatial [ a geojson:Point ;
            geojson:coordinates ( 4.061584e+05 6.471652e+06 2.6e+01 ) ] ;
    dct:time "2026-05-27T05:58:56.914093+00:00" ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 1.160077e+02 -3.188707e+01 2.6e+01 ) ] .

<uuid:83d45b42-d9bb-48cb-9777-fbb2525083f9> a <file:///github/workspace/BoundaryMark>,
        geojson:Feature ;
    dct:spatial [ a geojson:Point ;
            geojson:coordinates ( 4.061644e+05 6.471648e+06 2.6e+01 ) ] ;
    dct:time "2026-05-27T05:58:56.914093+00:00" ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 1.160078e+02 -3.188711e+01 2.6e+01 ) ] .

<uuid:bce88da3-5cda-4af9-a494-4d4b319ed2c1> a <file:///github/workspace/BoundaryMark>,
        geojson:Feature ;
    dct:spatial [ a geojson:Point ;
            geojson:coordinates ( 4.061584e+05 6.471648e+06 2.6e+01 ) ] ;
    dct:time "2026-05-27T05:58:56.914093+00:00" ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 1.160077e+02 -3.188711e+01 2.6e+01 ) ] .

<uuid:d75d9704-aeb3-4dc7-b2f0-a3fb62f44dd4> a <file:///github/workspace/BoundaryMark>,
        geojson:Feature ;
    dct:spatial [ a geojson:Point ;
            geojson:coordinates ( 4.061564e+05 6.471652e+06 2.3e+01 ) ] ;
    dct:time "2026-05-27T05:58:56.914093+00:00" ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 1.160077e+02 -3.188707e+01 2.3e+01 ) ] .

<uuid:e0d36194-78e8-4255-b6b7-4f59b79544db> a <file:///github/workspace/BoundaryMark>,
        geojson:Feature ;
    dct:spatial [ a geojson:Point ;
            geojson:coordinates ( 4.061564e+05 6.471652e+06 2.6e+01 ) ] ;
    dct:time "2026-05-27T05:58:56.914093+00:00" ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 1.160077e+02 -3.188707e+01 2.6e+01 ) ] .

<uuid:e7478b99-0d1e-4a1f-b958-c6a4b1719e96> a <file:///github/workspace/BoundaryMark>,
        geojson:Feature ;
    dct:spatial [ a geojson:Point ;
            geojson:coordinates ( 4.061564e+05 6.471656e+06 2.6e+01 ) ] ;
    dct:time "2026-05-27T05:58:56.914093+00:00" ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 1.160077e+02 -3.188703e+01 2.6e+01 ) ] .

<uuid:f84d09ba-e7af-48a7-bd47-30ca9265214c> a <file:///github/workspace/BoundaryMark>,
        geojson:Feature ;
    dct:spatial [ a geojson:Point ;
            geojson:coordinates ( 4.061584e+05 6.471652e+06 2.3e+01 ) ] ;
    dct:time "2026-05-27T05:58:56.914093+00:00" ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 1.160077e+02 -3.188707e+01 2.3e+01 ) ] .

<uuid:fa551002-6466-46f1-a2f3-f433334447e6> a <file:///github/workspace/BoundaryMark>,
        geojson:Feature ;
    dct:spatial [ a geojson:Point ;
            geojson:coordinates ( 4.061644e+05 6.471656e+06 2.6e+01 ) ] ;
    dct:time "2026-05-27T05:58:56.914093+00:00" ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 1.160078e+02 -3.188704e+01 2.6e+01 ) ] .

<uuid:fa94e00a-24f0-4133-bd78-8a6d28be410d> a <file:///github/workspace/BoundaryMark>,
        geojson:Feature ;
    dct:spatial [ a geojson:Point ;
            geojson:coordinates ( 4.061644e+05 6.471648e+06 2.3e+01 ) ] ;
    dct:time "2026-05-27T05:58:56.914093+00:00" ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 1.160078e+02 -3.188711e+01 2.3e+01 ) ] .

[] a geojson:FeatureCollection ;
    topo:edges ( <uuid:cc9ce047-61a1-4bf9-a366-bfc5b43092c2> <uuid:c795e6d9-0f44-4b1c-bc01-686d5e2acaa3> <uuid:f0aa8d02-1aa3-4f44-be28-d135c94de497> <uuid:06e882da-e914-4ff8-a279-13c1b16b7646> <uuid:5f1fd4be-c4ba-4387-9d7d-6e26b8299dc9> <uuid:d27bfb1b-ffd5-4fb3-9594-6f04ad66aa81> <uuid:9257083c-e11a-4914-a120-fbb11f0c10c8> <uuid:725ebfd6-7c75-44fa-b917-94381bddef5f> <uuid:b42f27c9-d0e6-4cfb-9ea3-7e2517426428> <uuid:5367fe8d-79c0-4161-a4ce-3b7f42afad3e> <uuid:9a5a3eef-7ddb-40bf-ae2a-111b4623fb08> <uuid:0795c157-5fcb-4d01-b0f0-fedf92b1d41f> <uuid:21935dcb-8634-4e57-abf4-4585eba35018> <uuid:b179ed08-b3a8-492c-8642-b76fb67bdd64> <uuid:a51db565-6909-4151-ad98-9c7fbeb85c19> <uuid:e8b25b9d-346c-4cdf-985b-c742fd7c3a34> <uuid:aa458878-e72e-454e-9921-bfbf14315787> <uuid:791da2a3-ee19-44a1-b604-5f379ab00bb1> ) ;
    topo:faces ( <uuid:649a326e-bb1e-4492-943a-39aa35806c64> <uuid:4fe850d8-d729-4851-b7d9-0f9e7ed39468> <uuid:0523e3be-6777-40f9-9e14-523e128647c0> <uuid:4def3698-95e1-486f-9588-a69a73640e5c> <uuid:fa7823a2-8ed7-43f0-9912-e7ade12c966a> <uuid:f45d1ba5-ecfe-4b0b-b315-2dc71cfe2b3b> <uuid:d0ddc512-0c81-43bb-a000-bf5017ff64a7> <uuid:fbe45af6-b334-4500-97e3-3c4cd177db90> ) ;
    topo:points ( <uuid:32acfb36-f3d3-47fe-9400-eec9b06d781e> <uuid:fa551002-6466-46f1-a2f3-f433334447e6> <uuid:83d45b42-d9bb-48cb-9777-fbb2525083f9> <uuid:fa94e00a-24f0-4133-bd78-8a6d28be410d> <uuid:2f1070ed-9bae-47f5-a856-7f4db788c010> <uuid:bce88da3-5cda-4af9-a494-4d4b319ed2c1> <uuid:e7478b99-0d1e-4a1f-b958-c6a4b1719e96> <uuid:3e40bf74-9619-426b-8b5e-58ebe480a92b> <uuid:e0d36194-78e8-4255-b6b7-4f59b79544db> <uuid:5228ad62-0730-416f-89b0-5042da216efb> <uuid:d75d9704-aeb3-4dc7-b2f0-a3fb62f44dd4> <uuid:f84d09ba-e7af-48a7-bd47-30ca9265214c> ) ;
    topo:rings ( <uuid:bec0f9d8-0d77-46ba-8941-f884943ac3d8> <uuid:6642ea7b-0b5e-474c-95ef-fe5a15be551b> <uuid:10ebd12b-36b6-4db0-b43e-b742e05540ce> <uuid:f8c1f3d2-aeb6-4b33-b6f8-7d01a5e8ae59> <uuid:72d54df4-b018-4897-a96d-7d62cb9d8c4a> <uuid:d7b9eb80-93ca-4ee5-adcb-ab1cfda75d4f> <uuid:79e3d840-7da3-4380-8288-6c2db4ac8b06> <uuid:7472a7e9-efcf-49a8-a19f-4a14c3e6f86e> ) ;
    topo:shells ( <uuid:31dcf84a-98c6-48b1-8ba6-14d7a5ff6749> ) .


```


### Shell bounding a simple rectangular solid
A Shell feature referencing 8 Face features via directed_references.
The '+' orientation on each face indicates the face normal points outward from the enclosed volume.
Faces shared with adjacent solids would appear with '-' orientation in those solids' shells.

#### json
```json
{
  "id": "uuid:shell-upper-east",
  "type": "Feature",
  "geometry": null,
  "topology": {
    "type": "Shell",
    "directed_references": [
      {
        "ref": "uuid:4ac3b91b-eeb7-428c-b5e9-7e8a3f0998ae",
        "orientation": "+"
      },
      {
        "ref": "uuid:4a294022-4864-49c7-8cee-f9e43360bc4e",
        "orientation": "+"
      },
      {
        "ref": "uuid:01947f47-ee13-44a9-85a4-2bcb4881982a",
        "orientation": "+"
      },
      {
        "ref": "uuid:607a3363-3eb7-4ce6-a633-86d2e565692b",
        "orientation": "+"
      },
      {
        "ref": "uuid:3c1f5c4b-d842-40b6-a332-99d50015fa8f",
        "orientation": "+"
      },
      {
        "ref": "uuid:fe522919-1421-4fd1-9930-8c6551e3f2a5",
        "orientation": "+"
      },
      {
        "ref": "uuid:2387ae98-9236-42fe-9414-c45b99954c41",
        "orientation": "+"
      },
      {
        "ref": "uuid:4ba85faa-3935-4e89-a9f8-dcd647a5dbed",
        "orientation": "+"
      }
    ]
  },
  "properties": {
    "description": "Outer shell of Upper East solid volume"
  }
}
```

#### jsonld
```jsonld
{
  "@context": "https://surroundaustralia.github.io/topo-feature/build/annotated/geo/topo/features/topo-shell/context.jsonld",
  "id": "uuid:shell-upper-east",
  "type": "Feature",
  "geometry": null,
  "topology": {
    "type": "Shell",
    "directed_references": [
      {
        "ref": "uuid:4ac3b91b-eeb7-428c-b5e9-7e8a3f0998ae",
        "orientation": "+"
      },
      {
        "ref": "uuid:4a294022-4864-49c7-8cee-f9e43360bc4e",
        "orientation": "+"
      },
      {
        "ref": "uuid:01947f47-ee13-44a9-85a4-2bcb4881982a",
        "orientation": "+"
      },
      {
        "ref": "uuid:607a3363-3eb7-4ce6-a633-86d2e565692b",
        "orientation": "+"
      },
      {
        "ref": "uuid:3c1f5c4b-d842-40b6-a332-99d50015fa8f",
        "orientation": "+"
      },
      {
        "ref": "uuid:fe522919-1421-4fd1-9930-8c6551e3f2a5",
        "orientation": "+"
      },
      {
        "ref": "uuid:2387ae98-9236-42fe-9414-c45b99954c41",
        "orientation": "+"
      },
      {
        "ref": "uuid:4ba85faa-3935-4e89-a9f8-dcd647a5dbed",
        "orientation": "+"
      }
    ]
  },
  "properties": {
    "description": "Outer shell of Upper East solid volume"
  }
}
```

#### ttl
```ttl
@prefix geojson: <https://purl.org/geojson/vocab#> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix topo: <https://purl.org/geojson/topo#> .

<uuid:shell-upper-east> a geojson:Feature ;
    geojson:topology [ a topo:Shell ;
            topo:directedReferences ( [ topo:orientation "+" ;
                        topo:ref <uuid:4ac3b91b-eeb7-428c-b5e9-7e8a3f0998ae> ] [ topo:orientation "+" ;
                        topo:ref <uuid:4a294022-4864-49c7-8cee-f9e43360bc4e> ] [ topo:orientation "+" ;
                        topo:ref <uuid:01947f47-ee13-44a9-85a4-2bcb4881982a> ] [ topo:orientation "+" ;
                        topo:ref <uuid:607a3363-3eb7-4ce6-a633-86d2e565692b> ] [ topo:orientation "+" ;
                        topo:ref <uuid:3c1f5c4b-d842-40b6-a332-99d50015fa8f> ] [ topo:orientation "+" ;
                        topo:ref <uuid:fe522919-1421-4fd1-9930-8c6551e3f2a5> ] [ topo:orientation "+" ;
                        topo:ref <uuid:2387ae98-9236-42fe-9414-c45b99954c41> ] [ topo:orientation "+" ;
                        topo:ref <uuid:4ba85faa-3935-4e89-a9f8-dcd647a5dbed> ] ) ] .


```

## Schema

```yaml
$schema: https://json-schema.org/draft/2020-12/schema
description: 'A Shell feature: a closed surface boundary of a Solid, described as
  an ordered set of directed (oriented) Face references. geometry must be null.'
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
          const: Shell
        directed_references:
          type: array
          description: Ordered list of oriented Face references forming the closed
            shell surface
          items:
            $ref: https://surroundaustralia.github.io/topo-feature/build/annotated/geo/topo/datatypes/oriented-ref/schema.yaml
          minItems: 4
          x-jsonld-id: https://purl.org/geojson/topo#directedReferences
          x-jsonld-container: '@list'
      required:
      - type
      - directed_references
      not:
        required:
        - references
      x-jsonld-type: '@id'
      x-jsonld-id: https://purl.org/geojson/vocab#topology
  required:
  - topology
x-jsonld-extra-terms:
  Point: https://purl.org/geojson/topo#Point
  Edge: https://purl.org/geojson/topo#Edge
  Ring: https://purl.org/geojson/topo#Ring
  Face: https://purl.org/geojson/topo#Face
  Shell: https://purl.org/geojson/topo#Shell
  ref: '@id'
  orientation: https://purl.org/geojson/topo#orientation
x-jsonld-prefixes:
  geojson: https://purl.org/geojson/vocab#
  topo: https://purl.org/geojson/topo#

```

Links to the schema:

* YAML version: [schema.yaml](https://surroundaustralia.github.io/topo-feature/build/annotated/geo/topo/features/topo-shell/schema.json)
* JSON version: [schema.json](https://surroundaustralia.github.io/topo-feature/build/annotated/geo/topo/features/topo-shell/schema.yaml)


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
    "Edge": "topo:Edge",
    "Ring": "topo:Ring",
    "Face": "topo:Face",
    "Shell": "topo:Shell",
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
    "Solid": "topo:Solid",
    "AggregateSolid": "topo:AggregateSolid",
    "points": {
      "@id": "topo:points",
      "@container": "@list"
    },
    "edges": {
      "@id": "topo:edges",
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
    "faces": {
      "@id": "topo:faces",
      "@container": "@list"
    },
    "solids": {
      "@id": "topo:solids",
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
[context.jsonld](https://surroundaustralia.github.io/topo-feature/build/annotated/geo/topo/features/topo-shell/context.jsonld)


# For developers

The source code for this Building Block can be found in the following repository:

* URL: [https://github.com/surroundaustralia/topo-feature](https://github.com/surroundaustralia/topo-feature)
* Path: `_sources/features/topo-shell`

