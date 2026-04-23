
# Topo Feature Multi-Collection (Schema)

`ogc.geo.topo.features.topo-feature-multi-collection` *v0.1*

A schema for a structured topology dataset containing typed Feature Collections for each topological dimension: points, edges (Line features), faces (Face features), and solids (Polyhedron features). Each collection is restricted to its specific building block type, enabling referential integrity across the topology hierarchy.

[*Status*](http://www.opengis.net/def/status): Under development

## Description

# Topo Feature Multi-Collection

A **Topo Feature Multi-Collection** is a structured dataset that organises topological features into typed named collections, one for each topological dimension. This enables representation of a full topology hierarchy — from point nodes to volumetric solids — in a single, self-describing document.

## Structure

| Collection key | Feature type | Building block | Topology property |
|---|---|---|---|
| `points` | Point geometry nodes | GeoJSON Feature (Point geometry) | — (explicit coordinates) |
| `edges` | Edge (line) topology | `topo-line` | `references`: ordered string IDs |
| `faces` | Face (polygon surface) topology | `topo-face` | `rings[].directed_references`: oriented Edge refs |
| `shells` | Shell (closed surface) topology | `topo-shell` | `directed_references`: oriented Face refs |
| `solids` | Solid (volumetric) topology | `topo-feature` (Solid/Shell) | `shells[].directed_references`: oriented Face refs |

## Reference models

Two reference styles are used, each appropriate to the relationship type:

- **`references`** — a plain ordered array of string feature IDs. Used for edges referencing point nodes, where position (not direction) is what matters.
- **`directed_references`** — an ordered array of oriented object references `{ "ref": "...", "orientation": "+"|"-" }`. Used for Rings referencing Edges, and Shells referencing Faces, where traversal direction determines the sense of the boundary.

The two styles must not coexist within the same topology object.

## Referential integrity chain

```
solids
  └─ topology.shells[].directed_references → Face IDs
       └─ topology.rings[].directed_references → Edge IDs
            └─ topology.references → Point IDs
                 └─ geometry.coordinates (actual 3D coordinates)
```

`geometry` is `null` on all feature types except Points — coordinates are derived by following the reference chain.

## Example skeleton

```json
{
  "type": "FeatureCollection",
  "points": [ { "type": "Feature", "geometry": { "type": "Point", "coordinates": [...] }, ... } ],
  "edges":  [ { "type": "Feature", "geometry": null, "topology": { "type": "LineString", "references": ["uuid:...", "uuid:..."] }, ... } ],
  "faces":  [ { "type": "Feature", "geometry": null, "topology": { "type": "Face",   "rings": [{ "type": "Ring", "directed_references": [...] }] }, ... } ],
  "solids": [ { "type": "Feature", "geometry": null, "topology": { "type": "Solid",  "shells": [{ "type": "Shell", "directed_references": [...] }] }, ... } ]
}
```

## Examples

### Cube example
Self-contained collection of topology objects defining a Cube
![Cube Example](https://github.com/surroundaustralia/topo-feature/blob/master/_sources/features/topo-feature-multi-collection/assets/cube.png)

#### json
```json
{
  "@context": {
    "vocabs": "https://linked.data.gov.au/def/csdm/",
    "wa-surveypoint-purpose": "https://linked.data.gov.au/def/csdm/wa-surveypoint-purpose/",
    "wa-survey-purpose": "https://linked.data.gov.au/def/csdm/wa-survey-purpose/",
    "wa-survey-type": "https://linked.data.gov.au/def/csdm/wa-survey-type/",
    "wa-procedure-used": "https://linked.data.gov.au/def/csdm/wa-procedure-used/",
    "wa-survey-documentation-type": "https://linked.data.gov.au/def/csdm/wa-survey-documentation-type/",
    "wa-annotation-role": "https://linked.data.gov.au/def/csdm/wa-annotation/",
    "wa-parcel-purpose": "https://linked.data.gov.au/def/csdm/wa-parcel-purpose/",
    "wa-parcel-type": "https://linked.data.gov.au/def/csdm/wa-parcel-type/",
    "wa-parcel-state": "https://linked.data.gov.au/def/csdm/wa-parcel-state/",
    "wa-nonprimary-parcel-type": "https://linked.data.gov.au/def/csdm/wa-secondary-parcel-type/",
    "wa-monument-form": "https://linked.data.gov.au/def/csdm/wa-monument-form/",
    "wa-monument-condition": "https://linked.data.gov.au/def/csdm/wa-monument-condition/",
    "wa-monument-state": "https://linked.data.gov.au/def/csdm/wa-monument-state/",
    "wa-vector-purpose": "https://linked.data.gov.au/def/csdm/wa-vector-purpose/",
    "wa-vector-type": "https://linked.data.gov.au/def/csdm/wa-vector-type/",
    "wa-secondary-parcel-purpose": "https://linked.data.gov.au/def/csdm/wa-secondary-parcel-purpose/",
    "wa-secondary-parcel-type": "https://linked.data.gov.au/def/csdm/wa-secondary-parcel-type/",
    "wa-secondary-purpose": "https://linked.data.gov.au/def/csdm/wa-secondary-purpose/",
    "wa-interest-type": "https://linked.data.gov.au/def/csdm/wa-interest-type/",
    "wa-interest": "https://linked.data.gov.au/def/csdm/wa-interest/",
    "wa-locality": "https://linked.data.gov.au/def/csdm/wa-locality/",
    "wa-local-government": "https://linked.data.gov.au/def/csdm/wa-local-government/",
    "registered-surveyors": "https://wa.gov.au/surveyors/",
    "foaf": "https://xmlns.com/foaf/0.1/",
    "activityType": "@type"
  },
  "id": "uuid:072c13c8-0521-4b01-b929-ad92a78c1753",
  "name": "DP 12345",
  "description": "Cube test dataset for Solid validation",
  "type": "FeatureCollection",
  "featureType": "CSD",
  "tenureType": "wa-parcel-type:freehold",
  "planType": "wa-survey-type:deposited-plan",
  "purpose": "wa-survey-purpose:subdivision",
  "surveyType": "wa-survey-type:SSA",
  "time": {
    "date": "2026-04-22"
  },
  "horizontalCRS": "epsg:7850",
  "verticalCRS": "epsg:5711",
  "bearingRotation": 0.0,
  "surveyTitle": "Cube",
  "adminUnit": [],
  "hasProvenance": [],
  "wasGeneratedBy": {
    "id": "uuid:46ef6d76-a6af-4eb6-bbbd-89708ab49b49",
    "endedAtTime": "2026-04-23T02:31:48.777689+00:00"
  },
  "features": [],
  "referencedCSDs": [],
  "points": [
    {
      "id": "uuid:1321646f-1085-4c57-a8f7-2b18d68571a8",
      "type": "FeatureCollection",
      "featureType": "CadastralMark",
      "features": [
        {
          "id": "uuid:d6c2351d-183a-43da-82f8-202e3c4293f8",
          "type": "Feature",
          "featureType": "BoundaryMark",
          "time": "2026-04-23T02:31:48.773690+00:00",
          "geometry": {
            "type": "Point",
            "coordinates": [
              115.99404848179692,
              -31.88799411030673,
              2.5
            ]
          },
          "place": {
            "type": "Point",
            "coordinates": [
              404865.0,
              6471538.0,
              2.5
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
          "id": "uuid:4ad04fc2-b383-4211-aa78-231b343f46ef",
          "type": "Feature",
          "featureType": "BoundaryMark",
          "time": "2026-04-23T02:31:48.773690+00:00",
          "geometry": {
            "type": "Point",
            "coordinates": [
              115.99404838372895,
              -31.888003130884595,
              2.5
            ]
          },
          "place": {
            "type": "Point",
            "coordinates": [
              404865.0,
              6471537.0,
              2.5
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
          "id": "uuid:3f19ff7d-dccd-46aa-a58f-83c0057baead",
          "type": "Feature",
          "featureType": "BoundaryMark",
          "time": "2026-04-23T02:31:48.773690+00:00",
          "geometry": {
            "type": "Point",
            "coordinates": [
              115.99403781118421,
              -31.88800304721178,
              2.5
            ]
          },
          "place": {
            "type": "Point",
            "coordinates": [
              404864.0,
              6471537.0,
              2.5
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
          "id": "uuid:edbb46a5-e6e7-4532-8342-e2797bde99ec",
          "type": "Feature",
          "featureType": "BoundaryMark",
          "time": "2026-04-23T02:31:48.773690+00:00",
          "geometry": {
            "type": "Point",
            "coordinates": [
              115.9940379092532,
              -31.88799402663394,
              2.5
            ]
          },
          "place": {
            "type": "Point",
            "coordinates": [
              404864.0,
              6471538.0,
              2.5
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
          "id": "uuid:ec00c452-e145-4c76-bdc9-df6a9822e0ea",
          "type": "Feature",
          "featureType": "BoundaryMark",
          "time": "2026-04-23T02:31:48.773690+00:00",
          "geometry": {
            "type": "Point",
            "coordinates": [
              115.99404848179692,
              -31.88799411030673,
              3.5
            ]
          },
          "place": {
            "type": "Point",
            "coordinates": [
              404865.0,
              6471538.0,
              3.5
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
          "id": "uuid:857ffbb0-59e5-45e7-929d-d7bae83ea338",
          "type": "Feature",
          "featureType": "BoundaryMark",
          "time": "2026-04-23T02:31:48.773690+00:00",
          "geometry": {
            "type": "Point",
            "coordinates": [
              115.99404838372895,
              -31.888003130884595,
              3.5
            ]
          },
          "place": {
            "type": "Point",
            "coordinates": [
              404865.0,
              6471537.0,
              3.5
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
          "id": "uuid:c868b242-d6b3-497b-8dc1-59af00080716",
          "type": "Feature",
          "featureType": "BoundaryMark",
          "time": "2026-04-23T02:31:48.773690+00:00",
          "geometry": {
            "type": "Point",
            "coordinates": [
              115.9940379092532,
              -31.88799402663394,
              3.5
            ]
          },
          "place": {
            "type": "Point",
            "coordinates": [
              404864.0,
              6471538.0,
              3.5
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
          "id": "uuid:2ca58b57-9953-4468-894e-8b31d63de92f",
          "type": "Feature",
          "featureType": "BoundaryMark",
          "time": "2026-04-23T02:31:48.773690+00:00",
          "geometry": {
            "type": "Point",
            "coordinates": [
              115.99403781118421,
              -31.88800304721178,
              3.5
            ]
          },
          "place": {
            "type": "Point",
            "coordinates": [
              404864.0,
              6471537.0,
              3.5
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
      ]
    }
  ],
  "vectorObservations": [],
  "observedVectors": [],
  "parcels": [],
  "edges": [
    {
      "id": "uuid:13738894-d45f-4b20-8678-2e9ba3d650a2",
      "type": "FeatureCollection",
      "featureType": "Edge",
      "features": [
        {
          "id": "uuid:d70b94e2-8ac8-4c79-9a41-e9b849bd1db7",
          "type": "Feature",
          "geometry": null,
          "topology": {
            "type": "Edge",
            "vertices": [
              [
                "uuid:d6c2351d-183a-43da-82f8-202e3c4293f8",
                "uuid:4ad04fc2-b383-4211-aa78-231b343f46ef"
              ]
            ]
          },
          "properties": {
            "vectorPurpose": "wa-vector-purpose:3D-Construct",
            "comment": null,
            "length": 1.0
          }
        },
        {
          "id": "uuid:22f1df1a-2200-4127-a42a-907643d0558a",
          "type": "Feature",
          "geometry": null,
          "topology": {
            "type": "Edge",
            "vertices": [
              [
                "uuid:4ad04fc2-b383-4211-aa78-231b343f46ef",
                "uuid:3f19ff7d-dccd-46aa-a58f-83c0057baead"
              ]
            ]
          },
          "properties": {
            "vectorPurpose": "wa-vector-purpose:3D-Construct",
            "comment": null,
            "length": 1.0
          }
        },
        {
          "id": "uuid:053709f2-6ada-42da-b006-f63069000646",
          "type": "Feature",
          "geometry": null,
          "topology": {
            "type": "Edge",
            "vertices": [
              [
                "uuid:3f19ff7d-dccd-46aa-a58f-83c0057baead",
                "uuid:edbb46a5-e6e7-4532-8342-e2797bde99ec"
              ]
            ]
          },
          "properties": {
            "vectorPurpose": "wa-vector-purpose:3D-Construct",
            "comment": null,
            "length": 1.0
          }
        },
        {
          "id": "uuid:3a09e957-4587-4c2c-8542-e9e96027b32c",
          "type": "Feature",
          "geometry": null,
          "topology": {
            "type": "Edge",
            "vertices": [
              [
                "uuid:edbb46a5-e6e7-4532-8342-e2797bde99ec",
                "uuid:d6c2351d-183a-43da-82f8-202e3c4293f8"
              ]
            ]
          },
          "properties": {
            "vectorPurpose": "wa-vector-purpose:3D-Construct",
            "comment": null,
            "length": 1.0
          }
        },
        {
          "id": "uuid:99bd225d-a4e4-40cd-b287-e40b49cdb469",
          "type": "Feature",
          "geometry": null,
          "topology": {
            "type": "Edge",
            "vertices": [
              [
                "uuid:d6c2351d-183a-43da-82f8-202e3c4293f8",
                "uuid:ec00c452-e145-4c76-bdc9-df6a9822e0ea"
              ]
            ]
          },
          "properties": {
            "vectorPurpose": "wa-vector-purpose:3D-Construct",
            "comment": null,
            "length": 1.0
          }
        },
        {
          "id": "uuid:1dbffc02-a95f-4768-bec6-fed1a9c7895e",
          "type": "Feature",
          "geometry": null,
          "topology": {
            "type": "Edge",
            "vertices": [
              [
                "uuid:857ffbb0-59e5-45e7-929d-d7bae83ea338",
                "uuid:ec00c452-e145-4c76-bdc9-df6a9822e0ea"
              ]
            ]
          },
          "properties": {
            "vectorPurpose": "wa-vector-purpose:3D-Construct",
            "comment": null,
            "length": 1.0
          }
        },
        {
          "id": "uuid:06138d02-992b-4f9b-8177-e3da461b09a1",
          "type": "Feature",
          "geometry": null,
          "topology": {
            "type": "Edge",
            "vertices": [
              [
                "uuid:857ffbb0-59e5-45e7-929d-d7bae83ea338",
                "uuid:4ad04fc2-b383-4211-aa78-231b343f46ef"
              ]
            ]
          },
          "properties": {
            "vectorPurpose": "wa-vector-purpose:3D-Construct",
            "comment": null,
            "length": 1.0
          }
        },
        {
          "id": "uuid:7c1cb403-d59a-4c03-b879-45e5423fd804",
          "type": "Feature",
          "geometry": null,
          "topology": {
            "type": "Edge",
            "vertices": [
              [
                "uuid:ec00c452-e145-4c76-bdc9-df6a9822e0ea",
                "uuid:c868b242-d6b3-497b-8dc1-59af00080716"
              ]
            ]
          },
          "properties": {
            "vectorPurpose": "wa-vector-purpose:3D-Construct",
            "comment": null,
            "length": 1.0
          }
        },
        {
          "id": "uuid:9b8587bc-ef19-4214-b4f7-532bf0b83d49",
          "type": "Feature",
          "geometry": null,
          "topology": {
            "type": "Edge",
            "vertices": [
              [
                "uuid:c868b242-d6b3-497b-8dc1-59af00080716",
                "uuid:2ca58b57-9953-4468-894e-8b31d63de92f"
              ]
            ]
          },
          "properties": {
            "vectorPurpose": "wa-vector-purpose:3D-Construct",
            "comment": null,
            "length": 1.0
          }
        },
        {
          "id": "uuid:4c6608e2-5b6b-486e-be8a-f1935b6e5fe8",
          "type": "Feature",
          "geometry": null,
          "topology": {
            "type": "Edge",
            "vertices": [
              [
                "uuid:2ca58b57-9953-4468-894e-8b31d63de92f",
                "uuid:857ffbb0-59e5-45e7-929d-d7bae83ea338"
              ]
            ]
          },
          "properties": {
            "vectorPurpose": "wa-vector-purpose:3D-Construct",
            "comment": null,
            "length": 1.0
          }
        },
        {
          "id": "uuid:9df5cd2e-da96-4b77-8c80-3c1e0dadca37",
          "type": "Feature",
          "geometry": null,
          "topology": {
            "type": "Edge",
            "vertices": [
              [
                "uuid:edbb46a5-e6e7-4532-8342-e2797bde99ec",
                "uuid:c868b242-d6b3-497b-8dc1-59af00080716"
              ]
            ]
          },
          "properties": {
            "vectorPurpose": "wa-vector-purpose:3D-Construct",
            "comment": null,
            "length": 1.0
          }
        },
        {
          "id": "uuid:66ec7651-dcdf-47d2-a180-1101535e44b8",
          "type": "Feature",
          "geometry": null,
          "topology": {
            "type": "Edge",
            "vertices": [
              [
                "uuid:3f19ff7d-dccd-46aa-a58f-83c0057baead",
                "uuid:2ca58b57-9953-4468-894e-8b31d63de92f"
              ]
            ]
          },
          "properties": {
            "vectorPurpose": "wa-vector-purpose:3D-Construct",
            "comment": null,
            "length": 1.0
          }
        }
      ]
    }
  ],
  "rings": [
    {
      "id": "uuid:5549fb5a-3ebe-40c3-84fe-90064b444d35",
      "type": "FeatureCollection",
      "featureType": "Ring",
      "features": [
        {
          "id": "uuid:57baadaf-2878-412a-84a8-188a7e49ab06",
          "type": "Feature",
          "geometry": null,
          "topology": {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:d70b94e2-8ac8-4c79-9a41-e9b849bd1db7",
                "orientation": "+"
              },
              {
                "ref": "uuid:22f1df1a-2200-4127-a42a-907643d0558a",
                "orientation": "+"
              },
              {
                "ref": "uuid:053709f2-6ada-42da-b006-f63069000646",
                "orientation": "+"
              },
              {
                "ref": "uuid:3a09e957-4587-4c2c-8542-e9e96027b32c",
                "orientation": "+"
              }
            ]
          },
          "properties": {
            "circumference": 4.0
          }
        },
        {
          "id": "uuid:2cc1da54-1c76-49fd-8a46-08e2add20d2d",
          "type": "Feature",
          "geometry": null,
          "topology": {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:d70b94e2-8ac8-4c79-9a41-e9b849bd1db7",
                "orientation": "-"
              },
              {
                "ref": "uuid:99bd225d-a4e4-40cd-b287-e40b49cdb469",
                "orientation": "+"
              },
              {
                "ref": "uuid:1dbffc02-a95f-4768-bec6-fed1a9c7895e",
                "orientation": "-"
              },
              {
                "ref": "uuid:06138d02-992b-4f9b-8177-e3da461b09a1",
                "orientation": "+"
              }
            ]
          },
          "properties": {
            "circumference": 4.0
          }
        },
        {
          "id": "uuid:47306d6b-f936-4527-a7ab-0bca9cfad360",
          "type": "Feature",
          "geometry": null,
          "topology": {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:1dbffc02-a95f-4768-bec6-fed1a9c7895e",
                "orientation": "+"
              },
              {
                "ref": "uuid:7c1cb403-d59a-4c03-b879-45e5423fd804",
                "orientation": "+"
              },
              {
                "ref": "uuid:9b8587bc-ef19-4214-b4f7-532bf0b83d49",
                "orientation": "+"
              },
              {
                "ref": "uuid:4c6608e2-5b6b-486e-be8a-f1935b6e5fe8",
                "orientation": "+"
              }
            ]
          },
          "properties": {
            "circumference": 4.0
          }
        },
        {
          "id": "uuid:0e8b2075-0ab8-46c6-b3bd-8db9b62329ba",
          "type": "Feature",
          "geometry": null,
          "topology": {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:3a09e957-4587-4c2c-8542-e9e96027b32c",
                "orientation": "-"
              },
              {
                "ref": "uuid:9df5cd2e-da96-4b77-8c80-3c1e0dadca37",
                "orientation": "+"
              },
              {
                "ref": "uuid:7c1cb403-d59a-4c03-b879-45e5423fd804",
                "orientation": "-"
              },
              {
                "ref": "uuid:99bd225d-a4e4-40cd-b287-e40b49cdb469",
                "orientation": "-"
              }
            ]
          },
          "properties": {
            "circumference": 4.0
          }
        },
        {
          "id": "uuid:f4448e60-7693-4fef-963f-5810c057af82",
          "type": "Feature",
          "geometry": null,
          "topology": {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:053709f2-6ada-42da-b006-f63069000646",
                "orientation": "-"
              },
              {
                "ref": "uuid:66ec7651-dcdf-47d2-a180-1101535e44b8",
                "orientation": "+"
              },
              {
                "ref": "uuid:9b8587bc-ef19-4214-b4f7-532bf0b83d49",
                "orientation": "-"
              },
              {
                "ref": "uuid:9df5cd2e-da96-4b77-8c80-3c1e0dadca37",
                "orientation": "-"
              }
            ]
          },
          "properties": {
            "circumference": 4.0
          }
        },
        {
          "id": "uuid:bc632620-ff40-4ec9-95a6-7f406a4f8aa5",
          "type": "Feature",
          "geometry": null,
          "topology": {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:22f1df1a-2200-4127-a42a-907643d0558a",
                "orientation": "-"
              },
              {
                "ref": "uuid:06138d02-992b-4f9b-8177-e3da461b09a1",
                "orientation": "-"
              },
              {
                "ref": "uuid:4c6608e2-5b6b-486e-be8a-f1935b6e5fe8",
                "orientation": "-"
              },
              {
                "ref": "uuid:66ec7651-dcdf-47d2-a180-1101535e44b8",
                "orientation": "-"
              }
            ]
          },
          "properties": {
            "circumference": 4.0
          }
        }
      ]
    }
  ],
  "faces": [
    {
      "id": "uuid:f649758e-6970-45bc-b92d-4a84e23bb7cb",
      "type": "FeatureCollection",
      "featureType": "Face",
      "features": [
        {
          "id": "uuid:ae7d3198-4182-4bbe-9156-cc9ae501eee6",
          "type": "Feature",
          "geometry": null,
          "topology": {
            "type": "Face",
            "rings": [
              {
                "ref": "uuid:57baadaf-2878-412a-84a8-188a7e49ab06",
                "orientation": "+"
              }
            ]
          },
          "properties": {
            "normal": [
              7.871928619655954e-08,
              7.965122040524951e-08,
              -0.9999999999999939
            ],
            "area": 1.0,
            "description": "Bottom boundary face, [Cube]"
          }
        },
        {
          "id": "uuid:13f2d5e8-c7a3-4512-98c8-f9b354ffab5f",
          "type": "Feature",
          "geometry": null,
          "topology": {
            "type": "Face",
            "rings": [
              {
                "ref": "uuid:2cc1da54-1c76-49fd-8a46-08e2add20d2d",
                "orientation": "+"
              }
            ]
          },
          "properties": {
            "normal": [
              0.9999999999976411,
              2.166532005989222e-06,
              1.5506552378674436e-07
            ],
            "area": 1.0,
            "description": "East-facing boundary face, [Cube]"
          }
        },
        {
          "id": "uuid:3b95ecfd-3511-4ace-8f27-cc8f6ef2f8d9",
          "type": "Feature",
          "geometry": null,
          "topology": {
            "type": "Face",
            "rings": [
              {
                "ref": "uuid:47306d6b-f936-4527-a7ab-0bca9cfad360",
                "orientation": "+"
              }
            ]
          },
          "properties": {
            "normal": [
              -7.778770701032952e-08,
              -7.965123094508951e-08,
              0.9999999999999939
            ],
            "area": 1.0,
            "description": "Top boundary face, [Cube]"
          }
        },
        {
          "id": "uuid:8c2d4f94-09ea-436a-a4d4-bd438be638a2",
          "type": "Feature",
          "geometry": null,
          "topology": {
            "type": "Face",
            "rings": [
              {
                "ref": "uuid:0e8b2075-0ab8-46c6-b3bd-8db9b62329ba",
                "orientation": "+"
              }
            ]
          },
          "properties": {
            "normal": [
              -2.1664155874261927e-06,
              0.9999999999976275,
              2.2770819199911514e-07
            ],
            "area": 1.0,
            "description": "North-facing boundary face, [Cube]"
          }
        },
        {
          "id": "uuid:f66773e5-36a9-4d4d-b219-d3bdc7440db6",
          "type": "Feature",
          "geometry": null,
          "topology": {
            "type": "Face",
            "rings": [
              {
                "ref": "uuid:f4448e60-7693-4fef-963f-5810c057af82",
                "orientation": "+"
              }
            ]
          },
          "properties": {
            "normal": [
              -0.9999999999976532,
              -2.166473790733249e-06,
              1.7430014560283957e-10
            ],
            "area": 1.0,
            "description": "West-facing boundary face, [Cube]"
          }
        },
        {
          "id": "uuid:0fc4033a-1527-47a7-afed-9d7f2c8a3bb5",
          "type": "Feature",
          "geometry": null,
          "topology": {
            "type": "Face",
            "rings": [
              {
                "ref": "uuid:bc632620-ff40-4ec9-95a6-7f406a4f8aa5",
                "orientation": "+"
              }
            ]
          },
          "properties": {
            "normal": [
              2.1678129619522367e-06,
              -0.999999999997648,
              -6.98490218992554e-08
            ],
            "area": 1.0,
            "description": "South-facing boundary face, [Cube]"
          }
        }
      ]
    }
  ],
  "shells": [
    {
      "id": "uuid:424f4bea-9e5d-4e98-9d3d-1dbbcf1163ae",
      "type": "FeatureCollection",
      "featureType": "Shell",
      "features": [
        {
          "id": "uuid:ac94d228-f7c1-4d96-b535-35a7114eb500",
          "type": "Feature",
          "geometry": null,
          "topology": {
            "type": "Shell",
            "directed_references": [
              {
                "ref": "uuid:ae7d3198-4182-4bbe-9156-cc9ae501eee6",
                "orientation": "+"
              },
              {
                "ref": "uuid:13f2d5e8-c7a3-4512-98c8-f9b354ffab5f",
                "orientation": "+"
              },
              {
                "ref": "uuid:3b95ecfd-3511-4ace-8f27-cc8f6ef2f8d9",
                "orientation": "+"
              },
              {
                "ref": "uuid:8c2d4f94-09ea-436a-a4d4-bd438be638a2",
                "orientation": "+"
              },
              {
                "ref": "uuid:f66773e5-36a9-4d4d-b219-d3bdc7440db6",
                "orientation": "+"
              },
              {
                "ref": "uuid:0fc4033a-1527-47a7-afed-9d7f2c8a3bb5",
                "orientation": "+"
              }
            ]
          },
          "properties": {
            "description": "Exterior Shell of Cube"
          }
        }
      ]
    }
  ],
  "solids": [
    {
      "id": "uuid:9db80688-607c-437e-80e6-fc6ac0b0a7ca",
      "type": "FeatureCollection",
      "featureType": "Solid",
      "features": [
        {
          "id": "uuid:28ec4ab0-ddd3-4eec-8158-c4e89b435a00",
          "type": "Feature",
          "geometry": null,
          "topology": {
            "type": "Solid",
            "shells": [
              {
                "ref": "uuid:ac94d228-f7c1-4d96-b535-35a7114eb500",
                "orientation": "+"
              }
            ]
          },
          "properties": {
            "name": "Cube",
            "floors": [
              1
            ],
            "volume": 0.999
          }
        }
      ]
    }
  ],
  "supportingDocuments": [],
  "annotations": [],
  "statistics": {
    "point_count": 8,
    "edge_count": 12,
    "ring_count": 6,
    "face_count": 6,
    "shell_count": 1,
    "solid_count": 1
  }
}
```

#### jsonld
```jsonld
{
  "@context": [
    "https://surroundaustralia.github.io/topo-feature/build/annotated/geo/topo/features/topo-feature-multi-collection/context.jsonld",
    {
      "vocabs": "https://linked.data.gov.au/def/csdm/",
      "wa-surveypoint-purpose": "https://linked.data.gov.au/def/csdm/wa-surveypoint-purpose/",
      "wa-survey-purpose": "https://linked.data.gov.au/def/csdm/wa-survey-purpose/",
      "wa-survey-type": "https://linked.data.gov.au/def/csdm/wa-survey-type/",
      "wa-procedure-used": "https://linked.data.gov.au/def/csdm/wa-procedure-used/",
      "wa-survey-documentation-type": "https://linked.data.gov.au/def/csdm/wa-survey-documentation-type/",
      "wa-annotation-role": "https://linked.data.gov.au/def/csdm/wa-annotation/",
      "wa-parcel-purpose": "https://linked.data.gov.au/def/csdm/wa-parcel-purpose/",
      "wa-parcel-type": "https://linked.data.gov.au/def/csdm/wa-parcel-type/",
      "wa-parcel-state": "https://linked.data.gov.au/def/csdm/wa-parcel-state/",
      "wa-nonprimary-parcel-type": "https://linked.data.gov.au/def/csdm/wa-secondary-parcel-type/",
      "wa-monument-form": "https://linked.data.gov.au/def/csdm/wa-monument-form/",
      "wa-monument-condition": "https://linked.data.gov.au/def/csdm/wa-monument-condition/",
      "wa-monument-state": "https://linked.data.gov.au/def/csdm/wa-monument-state/",
      "wa-vector-purpose": "https://linked.data.gov.au/def/csdm/wa-vector-purpose/",
      "wa-vector-type": "https://linked.data.gov.au/def/csdm/wa-vector-type/",
      "wa-secondary-parcel-purpose": "https://linked.data.gov.au/def/csdm/wa-secondary-parcel-purpose/",
      "wa-secondary-parcel-type": "https://linked.data.gov.au/def/csdm/wa-secondary-parcel-type/",
      "wa-secondary-purpose": "https://linked.data.gov.au/def/csdm/wa-secondary-purpose/",
      "wa-interest-type": "https://linked.data.gov.au/def/csdm/wa-interest-type/",
      "wa-interest": "https://linked.data.gov.au/def/csdm/wa-interest/",
      "wa-locality": "https://linked.data.gov.au/def/csdm/wa-locality/",
      "wa-local-government": "https://linked.data.gov.au/def/csdm/wa-local-government/",
      "registered-surveyors": "https://wa.gov.au/surveyors/",
      "foaf": "https://xmlns.com/foaf/0.1/",
      "activityType": "@type"
    }
  ],
  "id": "uuid:072c13c8-0521-4b01-b929-ad92a78c1753",
  "name": "DP 12345",
  "description": "Cube test dataset for Solid validation",
  "type": "FeatureCollection",
  "featureType": "CSD",
  "tenureType": "wa-parcel-type:freehold",
  "planType": "wa-survey-type:deposited-plan",
  "purpose": "wa-survey-purpose:subdivision",
  "surveyType": "wa-survey-type:SSA",
  "time": {
    "date": "2026-04-22"
  },
  "horizontalCRS": "epsg:7850",
  "verticalCRS": "epsg:5711",
  "bearingRotation": 0.0,
  "surveyTitle": "Cube",
  "adminUnit": [],
  "hasProvenance": [],
  "wasGeneratedBy": {
    "id": "uuid:46ef6d76-a6af-4eb6-bbbd-89708ab49b49",
    "endedAtTime": "2026-04-23T02:31:48.777689+00:00"
  },
  "features": [],
  "referencedCSDs": [],
  "points": [
    {
      "id": "uuid:1321646f-1085-4c57-a8f7-2b18d68571a8",
      "type": "FeatureCollection",
      "featureType": "CadastralMark",
      "features": [
        {
          "id": "uuid:d6c2351d-183a-43da-82f8-202e3c4293f8",
          "type": "Feature",
          "featureType": "BoundaryMark",
          "time": "2026-04-23T02:31:48.773690+00:00",
          "geometry": {
            "type": "Point",
            "coordinates": [
              115.99404848179692,
              -31.88799411030673,
              2.5
            ]
          },
          "place": {
            "type": "Point",
            "coordinates": [
              404865.0,
              6471538.0,
              2.5
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
          "id": "uuid:4ad04fc2-b383-4211-aa78-231b343f46ef",
          "type": "Feature",
          "featureType": "BoundaryMark",
          "time": "2026-04-23T02:31:48.773690+00:00",
          "geometry": {
            "type": "Point",
            "coordinates": [
              115.99404838372895,
              -31.888003130884595,
              2.5
            ]
          },
          "place": {
            "type": "Point",
            "coordinates": [
              404865.0,
              6471537.0,
              2.5
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
          "id": "uuid:3f19ff7d-dccd-46aa-a58f-83c0057baead",
          "type": "Feature",
          "featureType": "BoundaryMark",
          "time": "2026-04-23T02:31:48.773690+00:00",
          "geometry": {
            "type": "Point",
            "coordinates": [
              115.99403781118421,
              -31.88800304721178,
              2.5
            ]
          },
          "place": {
            "type": "Point",
            "coordinates": [
              404864.0,
              6471537.0,
              2.5
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
          "id": "uuid:edbb46a5-e6e7-4532-8342-e2797bde99ec",
          "type": "Feature",
          "featureType": "BoundaryMark",
          "time": "2026-04-23T02:31:48.773690+00:00",
          "geometry": {
            "type": "Point",
            "coordinates": [
              115.9940379092532,
              -31.88799402663394,
              2.5
            ]
          },
          "place": {
            "type": "Point",
            "coordinates": [
              404864.0,
              6471538.0,
              2.5
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
          "id": "uuid:ec00c452-e145-4c76-bdc9-df6a9822e0ea",
          "type": "Feature",
          "featureType": "BoundaryMark",
          "time": "2026-04-23T02:31:48.773690+00:00",
          "geometry": {
            "type": "Point",
            "coordinates": [
              115.99404848179692,
              -31.88799411030673,
              3.5
            ]
          },
          "place": {
            "type": "Point",
            "coordinates": [
              404865.0,
              6471538.0,
              3.5
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
          "id": "uuid:857ffbb0-59e5-45e7-929d-d7bae83ea338",
          "type": "Feature",
          "featureType": "BoundaryMark",
          "time": "2026-04-23T02:31:48.773690+00:00",
          "geometry": {
            "type": "Point",
            "coordinates": [
              115.99404838372895,
              -31.888003130884595,
              3.5
            ]
          },
          "place": {
            "type": "Point",
            "coordinates": [
              404865.0,
              6471537.0,
              3.5
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
          "id": "uuid:c868b242-d6b3-497b-8dc1-59af00080716",
          "type": "Feature",
          "featureType": "BoundaryMark",
          "time": "2026-04-23T02:31:48.773690+00:00",
          "geometry": {
            "type": "Point",
            "coordinates": [
              115.9940379092532,
              -31.88799402663394,
              3.5
            ]
          },
          "place": {
            "type": "Point",
            "coordinates": [
              404864.0,
              6471538.0,
              3.5
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
          "id": "uuid:2ca58b57-9953-4468-894e-8b31d63de92f",
          "type": "Feature",
          "featureType": "BoundaryMark",
          "time": "2026-04-23T02:31:48.773690+00:00",
          "geometry": {
            "type": "Point",
            "coordinates": [
              115.99403781118421,
              -31.88800304721178,
              3.5
            ]
          },
          "place": {
            "type": "Point",
            "coordinates": [
              404864.0,
              6471537.0,
              3.5
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
      ]
    }
  ],
  "vectorObservations": [],
  "observedVectors": [],
  "parcels": [],
  "edges": [
    {
      "id": "uuid:13738894-d45f-4b20-8678-2e9ba3d650a2",
      "type": "FeatureCollection",
      "featureType": "Edge",
      "features": [
        {
          "id": "uuid:d70b94e2-8ac8-4c79-9a41-e9b849bd1db7",
          "type": "Feature",
          "geometry": null,
          "topology": {
            "type": "Edge",
            "vertices": [
              [
                "uuid:d6c2351d-183a-43da-82f8-202e3c4293f8",
                "uuid:4ad04fc2-b383-4211-aa78-231b343f46ef"
              ]
            ]
          },
          "properties": {
            "vectorPurpose": "wa-vector-purpose:3D-Construct",
            "comment": null,
            "length": 1.0
          }
        },
        {
          "id": "uuid:22f1df1a-2200-4127-a42a-907643d0558a",
          "type": "Feature",
          "geometry": null,
          "topology": {
            "type": "Edge",
            "vertices": [
              [
                "uuid:4ad04fc2-b383-4211-aa78-231b343f46ef",
                "uuid:3f19ff7d-dccd-46aa-a58f-83c0057baead"
              ]
            ]
          },
          "properties": {
            "vectorPurpose": "wa-vector-purpose:3D-Construct",
            "comment": null,
            "length": 1.0
          }
        },
        {
          "id": "uuid:053709f2-6ada-42da-b006-f63069000646",
          "type": "Feature",
          "geometry": null,
          "topology": {
            "type": "Edge",
            "vertices": [
              [
                "uuid:3f19ff7d-dccd-46aa-a58f-83c0057baead",
                "uuid:edbb46a5-e6e7-4532-8342-e2797bde99ec"
              ]
            ]
          },
          "properties": {
            "vectorPurpose": "wa-vector-purpose:3D-Construct",
            "comment": null,
            "length": 1.0
          }
        },
        {
          "id": "uuid:3a09e957-4587-4c2c-8542-e9e96027b32c",
          "type": "Feature",
          "geometry": null,
          "topology": {
            "type": "Edge",
            "vertices": [
              [
                "uuid:edbb46a5-e6e7-4532-8342-e2797bde99ec",
                "uuid:d6c2351d-183a-43da-82f8-202e3c4293f8"
              ]
            ]
          },
          "properties": {
            "vectorPurpose": "wa-vector-purpose:3D-Construct",
            "comment": null,
            "length": 1.0
          }
        },
        {
          "id": "uuid:99bd225d-a4e4-40cd-b287-e40b49cdb469",
          "type": "Feature",
          "geometry": null,
          "topology": {
            "type": "Edge",
            "vertices": [
              [
                "uuid:d6c2351d-183a-43da-82f8-202e3c4293f8",
                "uuid:ec00c452-e145-4c76-bdc9-df6a9822e0ea"
              ]
            ]
          },
          "properties": {
            "vectorPurpose": "wa-vector-purpose:3D-Construct",
            "comment": null,
            "length": 1.0
          }
        },
        {
          "id": "uuid:1dbffc02-a95f-4768-bec6-fed1a9c7895e",
          "type": "Feature",
          "geometry": null,
          "topology": {
            "type": "Edge",
            "vertices": [
              [
                "uuid:857ffbb0-59e5-45e7-929d-d7bae83ea338",
                "uuid:ec00c452-e145-4c76-bdc9-df6a9822e0ea"
              ]
            ]
          },
          "properties": {
            "vectorPurpose": "wa-vector-purpose:3D-Construct",
            "comment": null,
            "length": 1.0
          }
        },
        {
          "id": "uuid:06138d02-992b-4f9b-8177-e3da461b09a1",
          "type": "Feature",
          "geometry": null,
          "topology": {
            "type": "Edge",
            "vertices": [
              [
                "uuid:857ffbb0-59e5-45e7-929d-d7bae83ea338",
                "uuid:4ad04fc2-b383-4211-aa78-231b343f46ef"
              ]
            ]
          },
          "properties": {
            "vectorPurpose": "wa-vector-purpose:3D-Construct",
            "comment": null,
            "length": 1.0
          }
        },
        {
          "id": "uuid:7c1cb403-d59a-4c03-b879-45e5423fd804",
          "type": "Feature",
          "geometry": null,
          "topology": {
            "type": "Edge",
            "vertices": [
              [
                "uuid:ec00c452-e145-4c76-bdc9-df6a9822e0ea",
                "uuid:c868b242-d6b3-497b-8dc1-59af00080716"
              ]
            ]
          },
          "properties": {
            "vectorPurpose": "wa-vector-purpose:3D-Construct",
            "comment": null,
            "length": 1.0
          }
        },
        {
          "id": "uuid:9b8587bc-ef19-4214-b4f7-532bf0b83d49",
          "type": "Feature",
          "geometry": null,
          "topology": {
            "type": "Edge",
            "vertices": [
              [
                "uuid:c868b242-d6b3-497b-8dc1-59af00080716",
                "uuid:2ca58b57-9953-4468-894e-8b31d63de92f"
              ]
            ]
          },
          "properties": {
            "vectorPurpose": "wa-vector-purpose:3D-Construct",
            "comment": null,
            "length": 1.0
          }
        },
        {
          "id": "uuid:4c6608e2-5b6b-486e-be8a-f1935b6e5fe8",
          "type": "Feature",
          "geometry": null,
          "topology": {
            "type": "Edge",
            "vertices": [
              [
                "uuid:2ca58b57-9953-4468-894e-8b31d63de92f",
                "uuid:857ffbb0-59e5-45e7-929d-d7bae83ea338"
              ]
            ]
          },
          "properties": {
            "vectorPurpose": "wa-vector-purpose:3D-Construct",
            "comment": null,
            "length": 1.0
          }
        },
        {
          "id": "uuid:9df5cd2e-da96-4b77-8c80-3c1e0dadca37",
          "type": "Feature",
          "geometry": null,
          "topology": {
            "type": "Edge",
            "vertices": [
              [
                "uuid:edbb46a5-e6e7-4532-8342-e2797bde99ec",
                "uuid:c868b242-d6b3-497b-8dc1-59af00080716"
              ]
            ]
          },
          "properties": {
            "vectorPurpose": "wa-vector-purpose:3D-Construct",
            "comment": null,
            "length": 1.0
          }
        },
        {
          "id": "uuid:66ec7651-dcdf-47d2-a180-1101535e44b8",
          "type": "Feature",
          "geometry": null,
          "topology": {
            "type": "Edge",
            "vertices": [
              [
                "uuid:3f19ff7d-dccd-46aa-a58f-83c0057baead",
                "uuid:2ca58b57-9953-4468-894e-8b31d63de92f"
              ]
            ]
          },
          "properties": {
            "vectorPurpose": "wa-vector-purpose:3D-Construct",
            "comment": null,
            "length": 1.0
          }
        }
      ]
    }
  ],
  "rings": [
    {
      "id": "uuid:5549fb5a-3ebe-40c3-84fe-90064b444d35",
      "type": "FeatureCollection",
      "featureType": "Ring",
      "features": [
        {
          "id": "uuid:57baadaf-2878-412a-84a8-188a7e49ab06",
          "type": "Feature",
          "geometry": null,
          "topology": {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:d70b94e2-8ac8-4c79-9a41-e9b849bd1db7",
                "orientation": "+"
              },
              {
                "ref": "uuid:22f1df1a-2200-4127-a42a-907643d0558a",
                "orientation": "+"
              },
              {
                "ref": "uuid:053709f2-6ada-42da-b006-f63069000646",
                "orientation": "+"
              },
              {
                "ref": "uuid:3a09e957-4587-4c2c-8542-e9e96027b32c",
                "orientation": "+"
              }
            ]
          },
          "properties": {
            "circumference": 4.0
          }
        },
        {
          "id": "uuid:2cc1da54-1c76-49fd-8a46-08e2add20d2d",
          "type": "Feature",
          "geometry": null,
          "topology": {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:d70b94e2-8ac8-4c79-9a41-e9b849bd1db7",
                "orientation": "-"
              },
              {
                "ref": "uuid:99bd225d-a4e4-40cd-b287-e40b49cdb469",
                "orientation": "+"
              },
              {
                "ref": "uuid:1dbffc02-a95f-4768-bec6-fed1a9c7895e",
                "orientation": "-"
              },
              {
                "ref": "uuid:06138d02-992b-4f9b-8177-e3da461b09a1",
                "orientation": "+"
              }
            ]
          },
          "properties": {
            "circumference": 4.0
          }
        },
        {
          "id": "uuid:47306d6b-f936-4527-a7ab-0bca9cfad360",
          "type": "Feature",
          "geometry": null,
          "topology": {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:1dbffc02-a95f-4768-bec6-fed1a9c7895e",
                "orientation": "+"
              },
              {
                "ref": "uuid:7c1cb403-d59a-4c03-b879-45e5423fd804",
                "orientation": "+"
              },
              {
                "ref": "uuid:9b8587bc-ef19-4214-b4f7-532bf0b83d49",
                "orientation": "+"
              },
              {
                "ref": "uuid:4c6608e2-5b6b-486e-be8a-f1935b6e5fe8",
                "orientation": "+"
              }
            ]
          },
          "properties": {
            "circumference": 4.0
          }
        },
        {
          "id": "uuid:0e8b2075-0ab8-46c6-b3bd-8db9b62329ba",
          "type": "Feature",
          "geometry": null,
          "topology": {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:3a09e957-4587-4c2c-8542-e9e96027b32c",
                "orientation": "-"
              },
              {
                "ref": "uuid:9df5cd2e-da96-4b77-8c80-3c1e0dadca37",
                "orientation": "+"
              },
              {
                "ref": "uuid:7c1cb403-d59a-4c03-b879-45e5423fd804",
                "orientation": "-"
              },
              {
                "ref": "uuid:99bd225d-a4e4-40cd-b287-e40b49cdb469",
                "orientation": "-"
              }
            ]
          },
          "properties": {
            "circumference": 4.0
          }
        },
        {
          "id": "uuid:f4448e60-7693-4fef-963f-5810c057af82",
          "type": "Feature",
          "geometry": null,
          "topology": {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:053709f2-6ada-42da-b006-f63069000646",
                "orientation": "-"
              },
              {
                "ref": "uuid:66ec7651-dcdf-47d2-a180-1101535e44b8",
                "orientation": "+"
              },
              {
                "ref": "uuid:9b8587bc-ef19-4214-b4f7-532bf0b83d49",
                "orientation": "-"
              },
              {
                "ref": "uuid:9df5cd2e-da96-4b77-8c80-3c1e0dadca37",
                "orientation": "-"
              }
            ]
          },
          "properties": {
            "circumference": 4.0
          }
        },
        {
          "id": "uuid:bc632620-ff40-4ec9-95a6-7f406a4f8aa5",
          "type": "Feature",
          "geometry": null,
          "topology": {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:22f1df1a-2200-4127-a42a-907643d0558a",
                "orientation": "-"
              },
              {
                "ref": "uuid:06138d02-992b-4f9b-8177-e3da461b09a1",
                "orientation": "-"
              },
              {
                "ref": "uuid:4c6608e2-5b6b-486e-be8a-f1935b6e5fe8",
                "orientation": "-"
              },
              {
                "ref": "uuid:66ec7651-dcdf-47d2-a180-1101535e44b8",
                "orientation": "-"
              }
            ]
          },
          "properties": {
            "circumference": 4.0
          }
        }
      ]
    }
  ],
  "faces": [
    {
      "id": "uuid:f649758e-6970-45bc-b92d-4a84e23bb7cb",
      "type": "FeatureCollection",
      "featureType": "Face",
      "features": [
        {
          "id": "uuid:ae7d3198-4182-4bbe-9156-cc9ae501eee6",
          "type": "Feature",
          "geometry": null,
          "topology": {
            "type": "Face",
            "rings": [
              {
                "ref": "uuid:57baadaf-2878-412a-84a8-188a7e49ab06",
                "orientation": "+"
              }
            ]
          },
          "properties": {
            "normal": [
              7.871928619655954e-08,
              7.965122040524951e-08,
              -0.9999999999999939
            ],
            "area": 1.0,
            "description": "Bottom boundary face, [Cube]"
          }
        },
        {
          "id": "uuid:13f2d5e8-c7a3-4512-98c8-f9b354ffab5f",
          "type": "Feature",
          "geometry": null,
          "topology": {
            "type": "Face",
            "rings": [
              {
                "ref": "uuid:2cc1da54-1c76-49fd-8a46-08e2add20d2d",
                "orientation": "+"
              }
            ]
          },
          "properties": {
            "normal": [
              0.9999999999976411,
              2.166532005989222e-06,
              1.5506552378674436e-07
            ],
            "area": 1.0,
            "description": "East-facing boundary face, [Cube]"
          }
        },
        {
          "id": "uuid:3b95ecfd-3511-4ace-8f27-cc8f6ef2f8d9",
          "type": "Feature",
          "geometry": null,
          "topology": {
            "type": "Face",
            "rings": [
              {
                "ref": "uuid:47306d6b-f936-4527-a7ab-0bca9cfad360",
                "orientation": "+"
              }
            ]
          },
          "properties": {
            "normal": [
              -7.778770701032952e-08,
              -7.965123094508951e-08,
              0.9999999999999939
            ],
            "area": 1.0,
            "description": "Top boundary face, [Cube]"
          }
        },
        {
          "id": "uuid:8c2d4f94-09ea-436a-a4d4-bd438be638a2",
          "type": "Feature",
          "geometry": null,
          "topology": {
            "type": "Face",
            "rings": [
              {
                "ref": "uuid:0e8b2075-0ab8-46c6-b3bd-8db9b62329ba",
                "orientation": "+"
              }
            ]
          },
          "properties": {
            "normal": [
              -2.1664155874261927e-06,
              0.9999999999976275,
              2.2770819199911514e-07
            ],
            "area": 1.0,
            "description": "North-facing boundary face, [Cube]"
          }
        },
        {
          "id": "uuid:f66773e5-36a9-4d4d-b219-d3bdc7440db6",
          "type": "Feature",
          "geometry": null,
          "topology": {
            "type": "Face",
            "rings": [
              {
                "ref": "uuid:f4448e60-7693-4fef-963f-5810c057af82",
                "orientation": "+"
              }
            ]
          },
          "properties": {
            "normal": [
              -0.9999999999976532,
              -2.166473790733249e-06,
              1.7430014560283957e-10
            ],
            "area": 1.0,
            "description": "West-facing boundary face, [Cube]"
          }
        },
        {
          "id": "uuid:0fc4033a-1527-47a7-afed-9d7f2c8a3bb5",
          "type": "Feature",
          "geometry": null,
          "topology": {
            "type": "Face",
            "rings": [
              {
                "ref": "uuid:bc632620-ff40-4ec9-95a6-7f406a4f8aa5",
                "orientation": "+"
              }
            ]
          },
          "properties": {
            "normal": [
              2.1678129619522367e-06,
              -0.999999999997648,
              -6.98490218992554e-08
            ],
            "area": 1.0,
            "description": "South-facing boundary face, [Cube]"
          }
        }
      ]
    }
  ],
  "shells": [
    {
      "id": "uuid:424f4bea-9e5d-4e98-9d3d-1dbbcf1163ae",
      "type": "FeatureCollection",
      "featureType": "Shell",
      "features": [
        {
          "id": "uuid:ac94d228-f7c1-4d96-b535-35a7114eb500",
          "type": "Feature",
          "geometry": null,
          "topology": {
            "type": "Shell",
            "directed_references": [
              {
                "ref": "uuid:ae7d3198-4182-4bbe-9156-cc9ae501eee6",
                "orientation": "+"
              },
              {
                "ref": "uuid:13f2d5e8-c7a3-4512-98c8-f9b354ffab5f",
                "orientation": "+"
              },
              {
                "ref": "uuid:3b95ecfd-3511-4ace-8f27-cc8f6ef2f8d9",
                "orientation": "+"
              },
              {
                "ref": "uuid:8c2d4f94-09ea-436a-a4d4-bd438be638a2",
                "orientation": "+"
              },
              {
                "ref": "uuid:f66773e5-36a9-4d4d-b219-d3bdc7440db6",
                "orientation": "+"
              },
              {
                "ref": "uuid:0fc4033a-1527-47a7-afed-9d7f2c8a3bb5",
                "orientation": "+"
              }
            ]
          },
          "properties": {
            "description": "Exterior Shell of Cube"
          }
        }
      ]
    }
  ],
  "solids": [
    {
      "id": "uuid:9db80688-607c-437e-80e6-fc6ac0b0a7ca",
      "type": "FeatureCollection",
      "featureType": "Solid",
      "features": [
        {
          "id": "uuid:28ec4ab0-ddd3-4eec-8158-c4e89b435a00",
          "type": "Feature",
          "geometry": null,
          "topology": {
            "type": "Solid",
            "shells": [
              {
                "ref": "uuid:ac94d228-f7c1-4d96-b535-35a7114eb500",
                "orientation": "+"
              }
            ]
          },
          "properties": {
            "name": "Cube",
            "floors": [
              1
            ],
            "volume": 0.999
          }
        }
      ]
    }
  ],
  "supportingDocuments": [],
  "annotations": [],
  "statistics": {
    "point_count": 8,
    "edge_count": 12,
    "ring_count": 6,
    "face_count": 6,
    "shell_count": 1,
    "solid_count": 1
  }
}
```

#### ttl
```ttl
@prefix dct: <http://purl.org/dc/terms/> .
@prefix geojson: <https://purl.org/geojson/vocab#> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix time: <http://www.w3.org/2006/time#> .
@prefix topo: <https://purl.org/geojson/topo#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

<uuid:1321646f-1085-4c57-a8f7-2b18d68571a8> a <file:///github/workspace/CadastralMark>,
        geojson:FeatureCollection ;
    geojson:features <uuid:2ca58b57-9953-4468-894e-8b31d63de92f>,
        <uuid:3f19ff7d-dccd-46aa-a58f-83c0057baead>,
        <uuid:4ad04fc2-b383-4211-aa78-231b343f46ef>,
        <uuid:857ffbb0-59e5-45e7-929d-d7bae83ea338>,
        <uuid:c868b242-d6b3-497b-8dc1-59af00080716>,
        <uuid:d6c2351d-183a-43da-82f8-202e3c4293f8>,
        <uuid:ec00c452-e145-4c76-bdc9-df6a9822e0ea>,
        <uuid:edbb46a5-e6e7-4532-8342-e2797bde99ec> .

<uuid:13738894-d45f-4b20-8678-2e9ba3d650a2> a <file:///github/workspace/Edge>,
        geojson:FeatureCollection ;
    geojson:features <uuid:053709f2-6ada-42da-b006-f63069000646>,
        <uuid:06138d02-992b-4f9b-8177-e3da461b09a1>,
        <uuid:1dbffc02-a95f-4768-bec6-fed1a9c7895e>,
        <uuid:22f1df1a-2200-4127-a42a-907643d0558a>,
        <uuid:3a09e957-4587-4c2c-8542-e9e96027b32c>,
        <uuid:4c6608e2-5b6b-486e-be8a-f1935b6e5fe8>,
        <uuid:66ec7651-dcdf-47d2-a180-1101535e44b8>,
        <uuid:7c1cb403-d59a-4c03-b879-45e5423fd804>,
        <uuid:99bd225d-a4e4-40cd-b287-e40b49cdb469>,
        <uuid:9b8587bc-ef19-4214-b4f7-532bf0b83d49>,
        <uuid:9df5cd2e-da96-4b77-8c80-3c1e0dadca37>,
        <uuid:d70b94e2-8ac8-4c79-9a41-e9b849bd1db7> .

<uuid:28ec4ab0-ddd3-4eec-8158-c4e89b435a00> a geojson:Feature ;
    geojson:topology [ a topo:Solid ;
            topo:shells ( <uuid:ac94d228-f7c1-4d96-b535-35a7114eb500> ) ] .

<uuid:2ca58b57-9953-4468-894e-8b31d63de92f> a <file:///github/workspace/BoundaryMark>,
        geojson:Feature ;
    dct:spatial [ a geojson:Point ;
            geojson:coordinates ( 4.04864e+05 6.471537e+06 3.5e+00 ) ] ;
    dct:time "2026-04-23T02:31:48.773690+00:00" ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 1.15994e+02 -3.1888e+01 3.5e+00 ) ] .

<uuid:3f19ff7d-dccd-46aa-a58f-83c0057baead> a <file:///github/workspace/BoundaryMark>,
        geojson:Feature ;
    dct:spatial [ a geojson:Point ;
            geojson:coordinates ( 4.04864e+05 6.471537e+06 2.5e+00 ) ] ;
    dct:time "2026-04-23T02:31:48.773690+00:00" ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 1.15994e+02 -3.1888e+01 2.5e+00 ) ] .

<uuid:424f4bea-9e5d-4e98-9d3d-1dbbcf1163ae> a topo:Shell,
        geojson:FeatureCollection ;
    geojson:features <uuid:ac94d228-f7c1-4d96-b535-35a7114eb500> .

<uuid:4ad04fc2-b383-4211-aa78-231b343f46ef> a <file:///github/workspace/BoundaryMark>,
        geojson:Feature ;
    dct:spatial [ a geojson:Point ;
            geojson:coordinates ( 4.04865e+05 6.471537e+06 2.5e+00 ) ] ;
    dct:time "2026-04-23T02:31:48.773690+00:00" ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 1.15994e+02 -3.1888e+01 2.5e+00 ) ] .

<uuid:5549fb5a-3ebe-40c3-84fe-90064b444d35> a topo:Ring,
        geojson:FeatureCollection ;
    geojson:features <uuid:0e8b2075-0ab8-46c6-b3bd-8db9b62329ba>,
        <uuid:2cc1da54-1c76-49fd-8a46-08e2add20d2d>,
        <uuid:47306d6b-f936-4527-a7ab-0bca9cfad360>,
        <uuid:57baadaf-2878-412a-84a8-188a7e49ab06>,
        <uuid:bc632620-ff40-4ec9-95a6-7f406a4f8aa5>,
        <uuid:f4448e60-7693-4fef-963f-5810c057af82> .

<uuid:857ffbb0-59e5-45e7-929d-d7bae83ea338> a <file:///github/workspace/BoundaryMark>,
        geojson:Feature ;
    dct:spatial [ a geojson:Point ;
            geojson:coordinates ( 4.04865e+05 6.471537e+06 3.5e+00 ) ] ;
    dct:time "2026-04-23T02:31:48.773690+00:00" ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 1.15994e+02 -3.1888e+01 3.5e+00 ) ] .

<uuid:9db80688-607c-437e-80e6-fc6ac0b0a7ca> a topo:Solid,
        geojson:FeatureCollection ;
    geojson:features <uuid:28ec4ab0-ddd3-4eec-8158-c4e89b435a00> .

<uuid:c868b242-d6b3-497b-8dc1-59af00080716> a <file:///github/workspace/BoundaryMark>,
        geojson:Feature ;
    dct:spatial [ a geojson:Point ;
            geojson:coordinates ( 4.04864e+05 6.471538e+06 3.5e+00 ) ] ;
    dct:time "2026-04-23T02:31:48.773690+00:00" ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 1.15994e+02 -3.188799e+01 3.5e+00 ) ] .

<uuid:d6c2351d-183a-43da-82f8-202e3c4293f8> a <file:///github/workspace/BoundaryMark>,
        geojson:Feature ;
    dct:spatial [ a geojson:Point ;
            geojson:coordinates ( 4.04865e+05 6.471538e+06 2.5e+00 ) ] ;
    dct:time "2026-04-23T02:31:48.773690+00:00" ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 1.15994e+02 -3.188799e+01 2.5e+00 ) ] .

<uuid:ec00c452-e145-4c76-bdc9-df6a9822e0ea> a <file:///github/workspace/BoundaryMark>,
        geojson:Feature ;
    dct:spatial [ a geojson:Point ;
            geojson:coordinates ( 4.04865e+05 6.471538e+06 3.5e+00 ) ] ;
    dct:time "2026-04-23T02:31:48.773690+00:00" ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 1.15994e+02 -3.188799e+01 3.5e+00 ) ] .

<uuid:edbb46a5-e6e7-4532-8342-e2797bde99ec> a <file:///github/workspace/BoundaryMark>,
        geojson:Feature ;
    dct:spatial [ a geojson:Point ;
            geojson:coordinates ( 4.04864e+05 6.471538e+06 2.5e+00 ) ] ;
    dct:time "2026-04-23T02:31:48.773690+00:00" ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 1.15994e+02 -3.188799e+01 2.5e+00 ) ] .

<uuid:f649758e-6970-45bc-b92d-4a84e23bb7cb> a topo:Face,
        geojson:FeatureCollection ;
    geojson:features <uuid:0fc4033a-1527-47a7-afed-9d7f2c8a3bb5>,
        <uuid:13f2d5e8-c7a3-4512-98c8-f9b354ffab5f>,
        <uuid:3b95ecfd-3511-4ace-8f27-cc8f6ef2f8d9>,
        <uuid:8c2d4f94-09ea-436a-a4d4-bd438be638a2>,
        <uuid:ae7d3198-4182-4bbe-9156-cc9ae501eee6>,
        <uuid:f66773e5-36a9-4d4d-b219-d3bdc7440db6> .

<uuid:0e8b2075-0ab8-46c6-b3bd-8db9b62329ba> a geojson:Feature ;
    topo:orientation "+" ;
    geojson:topology [ a topo:Ring ;
            topo:directedReferences ( [ topo:orientation "-" ;
                        topo:ref <uuid:3a09e957-4587-4c2c-8542-e9e96027b32c> ] [ topo:orientation "+" ;
                        topo:ref <uuid:9df5cd2e-da96-4b77-8c80-3c1e0dadca37> ] [ topo:orientation "-" ;
                        topo:ref <uuid:7c1cb403-d59a-4c03-b879-45e5423fd804> ] [ topo:orientation "-" ;
                        topo:ref <uuid:99bd225d-a4e4-40cd-b287-e40b49cdb469> ] ) ] .

<uuid:0fc4033a-1527-47a7-afed-9d7f2c8a3bb5> a geojson:Feature ;
    geojson:topology [ a topo:Face ;
            topo:rings ( <uuid:bc632620-ff40-4ec9-95a6-7f406a4f8aa5> ) ] .

<uuid:13f2d5e8-c7a3-4512-98c8-f9b354ffab5f> a geojson:Feature ;
    geojson:topology [ a topo:Face ;
            topo:rings ( <uuid:2cc1da54-1c76-49fd-8a46-08e2add20d2d> ) ] .

<uuid:2cc1da54-1c76-49fd-8a46-08e2add20d2d> a geojson:Feature ;
    topo:orientation "+" ;
    geojson:topology [ a topo:Ring ;
            topo:directedReferences ( [ topo:orientation "-" ;
                        topo:ref <uuid:d70b94e2-8ac8-4c79-9a41-e9b849bd1db7> ] [ topo:orientation "+" ;
                        topo:ref <uuid:99bd225d-a4e4-40cd-b287-e40b49cdb469> ] [ topo:orientation "-" ;
                        topo:ref <uuid:1dbffc02-a95f-4768-bec6-fed1a9c7895e> ] [ topo:orientation "+" ;
                        topo:ref <uuid:06138d02-992b-4f9b-8177-e3da461b09a1> ] ) ] .

<uuid:3b95ecfd-3511-4ace-8f27-cc8f6ef2f8d9> a geojson:Feature ;
    geojson:topology [ a topo:Face ;
            topo:rings ( <uuid:47306d6b-f936-4527-a7ab-0bca9cfad360> ) ] .

<uuid:47306d6b-f936-4527-a7ab-0bca9cfad360> a geojson:Feature ;
    topo:orientation "+" ;
    geojson:topology [ a topo:Ring ;
            topo:directedReferences ( [ topo:orientation "+" ;
                        topo:ref <uuid:1dbffc02-a95f-4768-bec6-fed1a9c7895e> ] [ topo:orientation "+" ;
                        topo:ref <uuid:7c1cb403-d59a-4c03-b879-45e5423fd804> ] [ topo:orientation "+" ;
                        topo:ref <uuid:9b8587bc-ef19-4214-b4f7-532bf0b83d49> ] [ topo:orientation "+" ;
                        topo:ref <uuid:4c6608e2-5b6b-486e-be8a-f1935b6e5fe8> ] ) ] .

<uuid:57baadaf-2878-412a-84a8-188a7e49ab06> a geojson:Feature ;
    topo:orientation "+" ;
    geojson:topology [ a topo:Ring ;
            topo:directedReferences ( [ topo:orientation "+" ;
                        topo:ref <uuid:d70b94e2-8ac8-4c79-9a41-e9b849bd1db7> ] [ topo:orientation "+" ;
                        topo:ref <uuid:22f1df1a-2200-4127-a42a-907643d0558a> ] [ topo:orientation "+" ;
                        topo:ref <uuid:053709f2-6ada-42da-b006-f63069000646> ] [ topo:orientation "+" ;
                        topo:ref <uuid:3a09e957-4587-4c2c-8542-e9e96027b32c> ] ) ] .

<uuid:8c2d4f94-09ea-436a-a4d4-bd438be638a2> a geojson:Feature ;
    geojson:topology [ a topo:Face ;
            topo:rings ( <uuid:0e8b2075-0ab8-46c6-b3bd-8db9b62329ba> ) ] .

<uuid:ac94d228-f7c1-4d96-b535-35a7114eb500> a geojson:Feature ;
    topo:orientation "+" ;
    geojson:topology [ a topo:Shell ;
            topo:directedReferences ( [ topo:orientation "+" ;
                        topo:ref <uuid:ae7d3198-4182-4bbe-9156-cc9ae501eee6> ] [ topo:orientation "+" ;
                        topo:ref <uuid:13f2d5e8-c7a3-4512-98c8-f9b354ffab5f> ] [ topo:orientation "+" ;
                        topo:ref <uuid:3b95ecfd-3511-4ace-8f27-cc8f6ef2f8d9> ] [ topo:orientation "+" ;
                        topo:ref <uuid:8c2d4f94-09ea-436a-a4d4-bd438be638a2> ] [ topo:orientation "+" ;
                        topo:ref <uuid:f66773e5-36a9-4d4d-b219-d3bdc7440db6> ] [ topo:orientation "+" ;
                        topo:ref <uuid:0fc4033a-1527-47a7-afed-9d7f2c8a3bb5> ] ) ] .

<uuid:ae7d3198-4182-4bbe-9156-cc9ae501eee6> a geojson:Feature ;
    geojson:topology [ a topo:Face ;
            topo:rings ( <uuid:57baadaf-2878-412a-84a8-188a7e49ab06> ) ] .

<uuid:bc632620-ff40-4ec9-95a6-7f406a4f8aa5> a geojson:Feature ;
    topo:orientation "+" ;
    geojson:topology [ a topo:Ring ;
            topo:directedReferences ( [ topo:orientation "-" ;
                        topo:ref <uuid:22f1df1a-2200-4127-a42a-907643d0558a> ] [ topo:orientation "-" ;
                        topo:ref <uuid:06138d02-992b-4f9b-8177-e3da461b09a1> ] [ topo:orientation "-" ;
                        topo:ref <uuid:4c6608e2-5b6b-486e-be8a-f1935b6e5fe8> ] [ topo:orientation "-" ;
                        topo:ref <uuid:66ec7651-dcdf-47d2-a180-1101535e44b8> ] ) ] .

<uuid:f4448e60-7693-4fef-963f-5810c057af82> a geojson:Feature ;
    topo:orientation "+" ;
    geojson:topology [ a topo:Ring ;
            topo:directedReferences ( [ topo:orientation "-" ;
                        topo:ref <uuid:053709f2-6ada-42da-b006-f63069000646> ] [ topo:orientation "+" ;
                        topo:ref <uuid:66ec7651-dcdf-47d2-a180-1101535e44b8> ] [ topo:orientation "-" ;
                        topo:ref <uuid:9b8587bc-ef19-4214-b4f7-532bf0b83d49> ] [ topo:orientation "-" ;
                        topo:ref <uuid:9df5cd2e-da96-4b77-8c80-3c1e0dadca37> ] ) ] .

<uuid:f66773e5-36a9-4d4d-b219-d3bdc7440db6> a geojson:Feature ;
    geojson:topology [ a topo:Face ;
            topo:rings ( <uuid:f4448e60-7693-4fef-963f-5810c057af82> ) ] .

<uuid:053709f2-6ada-42da-b006-f63069000646> a geojson:Feature ;
    geojson:topology [ a <file:///github/workspace/Edge> ] .

<uuid:06138d02-992b-4f9b-8177-e3da461b09a1> a geojson:Feature ;
    geojson:topology [ a <file:///github/workspace/Edge> ] .

<uuid:1dbffc02-a95f-4768-bec6-fed1a9c7895e> a geojson:Feature ;
    geojson:topology [ a <file:///github/workspace/Edge> ] .

<uuid:22f1df1a-2200-4127-a42a-907643d0558a> a geojson:Feature ;
    geojson:topology [ a <file:///github/workspace/Edge> ] .

<uuid:3a09e957-4587-4c2c-8542-e9e96027b32c> a geojson:Feature ;
    geojson:topology [ a <file:///github/workspace/Edge> ] .

<uuid:4c6608e2-5b6b-486e-be8a-f1935b6e5fe8> a geojson:Feature ;
    geojson:topology [ a <file:///github/workspace/Edge> ] .

<uuid:66ec7651-dcdf-47d2-a180-1101535e44b8> a geojson:Feature ;
    geojson:topology [ a <file:///github/workspace/Edge> ] .

<uuid:7c1cb403-d59a-4c03-b879-45e5423fd804> a geojson:Feature ;
    geojson:topology [ a <file:///github/workspace/Edge> ] .

<uuid:99bd225d-a4e4-40cd-b287-e40b49cdb469> a geojson:Feature ;
    geojson:topology [ a <file:///github/workspace/Edge> ] .

<uuid:9b8587bc-ef19-4214-b4f7-532bf0b83d49> a geojson:Feature ;
    geojson:topology [ a <file:///github/workspace/Edge> ] .

<uuid:9df5cd2e-da96-4b77-8c80-3c1e0dadca37> a geojson:Feature ;
    geojson:topology [ a <file:///github/workspace/Edge> ] .

<uuid:d70b94e2-8ac8-4c79-9a41-e9b849bd1db7> a geojson:Feature ;
    geojson:topology [ a <file:///github/workspace/Edge> ] .

[] time: [ ] ;
    topo:edges ( <uuid:13738894-d45f-4b20-8678-2e9ba3d650a2> ) ;
    topo:faces ( <uuid:f649758e-6970-45bc-b92d-4a84e23bb7cb> ) ;
    topo:points ( <uuid:1321646f-1085-4c57-a8f7-2b18d68571a8> ) ;
    topo:rings ( <uuid:5549fb5a-3ebe-40c3-84fe-90064b444d35> ) ;
    topo:shells ( <uuid:424f4bea-9e5d-4e98-9d3d-1dbbcf1163ae> ),
        ( <uuid:9db80688-607c-437e-80e6-fc6ac0b0a7ca> ) .


```


### Tetrahedron example
Self-contained collection of topology objects defining a Tetrahedron
![Cube Example](https://github.com/surroundaustralia/topo-feature/blob/master/_sources/features/topo-feature-multi-collection/assets/tetrahedron.png)

#### json
```json
{
  "@context": {
    "vocabs": "https://linked.data.gov.au/def/csdm/",
    "wa-surveypoint-purpose": "https://linked.data.gov.au/def/csdm/wa-surveypoint-purpose/",
    "wa-survey-purpose": "https://linked.data.gov.au/def/csdm/wa-survey-purpose/",
    "wa-survey-type": "https://linked.data.gov.au/def/csdm/wa-survey-type/",
    "wa-procedure-used": "https://linked.data.gov.au/def/csdm/wa-procedure-used/",
    "wa-survey-documentation-type": "https://linked.data.gov.au/def/csdm/wa-survey-documentation-type/",
    "wa-annotation-role": "https://linked.data.gov.au/def/csdm/wa-annotation/",
    "wa-parcel-purpose": "https://linked.data.gov.au/def/csdm/wa-parcel-purpose/",
    "wa-parcel-type": "https://linked.data.gov.au/def/csdm/wa-parcel-type/",
    "wa-parcel-state": "https://linked.data.gov.au/def/csdm/wa-parcel-state/",
    "wa-nonprimary-parcel-type": "https://linked.data.gov.au/def/csdm/wa-secondary-parcel-type/",
    "wa-monument-form": "https://linked.data.gov.au/def/csdm/wa-monument-form/",
    "wa-monument-condition": "https://linked.data.gov.au/def/csdm/wa-monument-condition/",
    "wa-monument-state": "https://linked.data.gov.au/def/csdm/wa-monument-state/",
    "wa-vector-purpose": "https://linked.data.gov.au/def/csdm/wa-vector-purpose/",
    "wa-vector-type": "https://linked.data.gov.au/def/csdm/wa-vector-type/",
    "wa-secondary-parcel-purpose": "https://linked.data.gov.au/def/csdm/wa-secondary-parcel-purpose/",
    "wa-secondary-parcel-type": "https://linked.data.gov.au/def/csdm/wa-secondary-parcel-type/",
    "wa-secondary-purpose": "https://linked.data.gov.au/def/csdm/wa-secondary-purpose/",
    "wa-interest-type": "https://linked.data.gov.au/def/csdm/wa-interest-type/",
    "wa-interest": "https://linked.data.gov.au/def/csdm/wa-interest/",
    "wa-locality": "https://linked.data.gov.au/def/csdm/wa-locality/",
    "wa-local-government": "https://linked.data.gov.au/def/csdm/wa-local-government/",
    "registered-surveyors": "https://wa.gov.au/surveyors/",
    "foaf": "https://xmlns.com/foaf/0.1/",
    "activityType": "@type"
  },
  "id": "uuid:1c780b54-8829-46a7-86fc-003fbd7ec26c",
  "name": "DP 12346",
  "description": "Tetrahedron test dataset for Solid validation",
  "type": "FeatureCollection",
  "featureType": "CSD",
  "tenureType": "wa-parcel-type:freehold",
  "planType": "wa-survey-type:deposited-plan",
  "purpose": "wa-survey-purpose:subdivision",
  "surveyType": "wa-survey-type:SSA",
  "time": {
    "date": "2026-04-22"
  },
  "horizontalCRS": "epsg:7850",
  "verticalCRS": "epsg:5711",
  "bearingRotation": 0.0,
  "surveyTitle": "Tetrahedron",
  "adminUnit": [],
  "hasProvenance": [],
  "wasGeneratedBy": {
    "id": "uuid:5fd2ee5e-7eaf-4fd2-82b0-1555ba90c94d",
    "endedAtTime": "2026-04-23T02:33:49.029876+00:00"
  },
  "features": [],
  "referencedCSDs": [],
  "points": [
    {
      "id": "uuid:28411f0c-6f1c-496e-a993-a4d6f5abc01a",
      "type": "FeatureCollection",
      "featureType": "CadastralMark",
      "features": [
        {
          "id": "uuid:a461ffa9-b391-42c1-80fb-37061ccc128a",
          "type": "Feature",
          "featureType": "BoundaryMark",
          "time": "2026-04-23T02:33:49.027878+00:00",
          "geometry": {
            "type": "Point",
            "coordinates": [
              115.99397649268003,
              -31.884890194077606,
              7.0
            ]
          },
          "place": {
            "type": "Point",
            "coordinates": [
              404855.0,
              6471882.0,
              7.0
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
          "id": "uuid:55f7a374-db52-4ab9-9346-b16b81878ee7",
          "type": "Feature",
          "featureType": "BoundaryMark",
          "time": "2026-04-23T02:33:49.027878+00:00",
          "geometry": {
            "type": "Point",
            "coordinates": [
              115.99396592049114,
              -31.88489011040608,
              7.0
            ]
          },
          "place": {
            "type": "Point",
            "coordinates": [
              404854.0,
              6471882.0,
              7.0
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
          "id": "uuid:292b501a-5c12-4146-9af6-4597eb05ec8a",
          "type": "Feature",
          "featureType": "BoundaryMark",
          "time": "2026-04-23T02:33:49.027878+00:00",
          "geometry": {
            "type": "Point",
            "coordinates": [
              115.99397129150869,
              -31.88488234041787,
              7.0
            ]
          },
          "place": {
            "type": "Point",
            "coordinates": [
              404854.5,
              6471882.866,
              7.0
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
          "id": "uuid:37cecce2-4f99-4ad8-beab-51eb69bc5c71",
          "type": "Feature",
          "featureType": "BoundaryMark",
          "time": "2026-04-23T02:33:49.027878+00:00",
          "geometry": {
            "type": "Point",
            "coordinates": [
              115.99397123492597,
              -31.884887545293733,
              7.816
            ]
          },
          "place": {
            "type": "Point",
            "coordinates": [
              404854.5,
              6471882.289,
              7.816
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
      ]
    }
  ],
  "vectorObservations": [],
  "observedVectors": [],
  "parcels": [],
  "edges": [
    {
      "id": "uuid:12b8746a-ba8c-45ad-92a3-94e99180e4ec",
      "type": "FeatureCollection",
      "featureType": "Edge",
      "features": [
        {
          "id": "uuid:b26bbbf7-0852-4e23-9eb3-ec9c0a074a8d",
          "type": "Feature",
          "geometry": null,
          "topology": {
            "type": "Edge",
            "vertices": [
              [
                "uuid:a461ffa9-b391-42c1-80fb-37061ccc128a",
                "uuid:55f7a374-db52-4ab9-9346-b16b81878ee7"
              ]
            ]
          },
          "properties": {
            "vectorPurpose": "wa-vector-purpose:3D-Construct",
            "comment": null,
            "length": 1.0
          }
        },
        {
          "id": "uuid:144d47d4-2d20-490b-ab4d-4577d35eed7c",
          "type": "Feature",
          "geometry": null,
          "topology": {
            "type": "Edge",
            "vertices": [
              [
                "uuid:55f7a374-db52-4ab9-9346-b16b81878ee7",
                "uuid:292b501a-5c12-4146-9af6-4597eb05ec8a"
              ]
            ]
          },
          "properties": {
            "vectorPurpose": "wa-vector-purpose:3D-Construct",
            "comment": null,
            "length": 1.0
          }
        },
        {
          "id": "uuid:737375ac-5f47-4c55-94c1-328d8ff4eb8b",
          "type": "Feature",
          "geometry": null,
          "topology": {
            "type": "Edge",
            "vertices": [
              [
                "uuid:292b501a-5c12-4146-9af6-4597eb05ec8a",
                "uuid:a461ffa9-b391-42c1-80fb-37061ccc128a"
              ]
            ]
          },
          "properties": {
            "vectorPurpose": "wa-vector-purpose:3D-Construct",
            "comment": null,
            "length": 1.0
          }
        },
        {
          "id": "uuid:0ffea858-215f-4055-98a0-9e7e7fd2eafd",
          "type": "Feature",
          "geometry": null,
          "topology": {
            "type": "Edge",
            "vertices": [
              [
                "uuid:a461ffa9-b391-42c1-80fb-37061ccc128a",
                "uuid:37cecce2-4f99-4ad8-beab-51eb69bc5c71"
              ]
            ]
          },
          "properties": {
            "vectorPurpose": "wa-vector-purpose:3D-Construct",
            "comment": null,
            "length": 1.0
          }
        },
        {
          "id": "uuid:a7355cfd-1646-45ec-bee8-8e1a0f03f487",
          "type": "Feature",
          "geometry": null,
          "topology": {
            "type": "Edge",
            "vertices": [
              [
                "uuid:37cecce2-4f99-4ad8-beab-51eb69bc5c71",
                "uuid:55f7a374-db52-4ab9-9346-b16b81878ee7"
              ]
            ]
          },
          "properties": {
            "vectorPurpose": "wa-vector-purpose:3D-Construct",
            "comment": null,
            "length": 1.0
          }
        },
        {
          "id": "uuid:7964ba19-27a7-48d1-8a11-4d223f8bc4cd",
          "type": "Feature",
          "geometry": null,
          "topology": {
            "type": "Edge",
            "vertices": [
              [
                "uuid:292b501a-5c12-4146-9af6-4597eb05ec8a",
                "uuid:37cecce2-4f99-4ad8-beab-51eb69bc5c71"
              ]
            ]
          },
          "properties": {
            "vectorPurpose": "wa-vector-purpose:3D-Construct",
            "comment": null,
            "length": 0.999
          }
        }
      ]
    }
  ],
  "rings": [
    {
      "id": "uuid:68209c33-b08c-4642-b5bf-5fed70d97990",
      "type": "FeatureCollection",
      "featureType": "Ring",
      "features": [
        {
          "id": "uuid:c7d69e55-8384-46b1-9265-c1d655117e56",
          "type": "Feature",
          "geometry": null,
          "topology": {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:b26bbbf7-0852-4e23-9eb3-ec9c0a074a8d",
                "orientation": "+"
              },
              {
                "ref": "uuid:144d47d4-2d20-490b-ab4d-4577d35eed7c",
                "orientation": "+"
              },
              {
                "ref": "uuid:737375ac-5f47-4c55-94c1-328d8ff4eb8b",
                "orientation": "+"
              }
            ]
          },
          "properties": {
            "circumference": 3.0
          }
        },
        {
          "id": "uuid:73aa8ed2-3329-4c61-be6d-45a351b580eb",
          "type": "Feature",
          "geometry": null,
          "topology": {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:b26bbbf7-0852-4e23-9eb3-ec9c0a074a8d",
                "orientation": "-"
              },
              {
                "ref": "uuid:0ffea858-215f-4055-98a0-9e7e7fd2eafd",
                "orientation": "+"
              },
              {
                "ref": "uuid:a7355cfd-1646-45ec-bee8-8e1a0f03f487",
                "orientation": "+"
              }
            ]
          },
          "properties": {
            "circumference": 3.0
          }
        },
        {
          "id": "uuid:e53bac18-648e-4e36-9b17-83af1828160b",
          "type": "Feature",
          "geometry": null,
          "topology": {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:737375ac-5f47-4c55-94c1-328d8ff4eb8b",
                "orientation": "-"
              },
              {
                "ref": "uuid:7964ba19-27a7-48d1-8a11-4d223f8bc4cd",
                "orientation": "+"
              },
              {
                "ref": "uuid:0ffea858-215f-4055-98a0-9e7e7fd2eafd",
                "orientation": "-"
              }
            ]
          },
          "properties": {
            "circumference": 2.999
          }
        },
        {
          "id": "uuid:ee43fd9a-8036-44dd-867d-f5255692d333",
          "type": "Feature",
          "geometry": null,
          "topology": {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:144d47d4-2d20-490b-ab4d-4577d35eed7c",
                "orientation": "-"
              },
              {
                "ref": "uuid:a7355cfd-1646-45ec-bee8-8e1a0f03f487",
                "orientation": "-"
              },
              {
                "ref": "uuid:7964ba19-27a7-48d1-8a11-4d223f8bc4cd",
                "orientation": "-"
              }
            ]
          },
          "properties": {
            "circumference": 2.999
          }
        }
      ]
    }
  ],
  "faces": [
    {
      "id": "uuid:1ad71b78-a201-4ed7-ab2b-ea916492374d",
      "type": "FeatureCollection",
      "featureType": "Face",
      "features": [
        {
          "id": "uuid:3ffe6f50-1f4a-43e9-8141-378e23418203",
          "type": "Feature",
          "geometry": null,
          "topology": {
            "type": "Face",
            "rings": [
              {
                "ref": "uuid:c7d69e55-8384-46b1-9265-c1d655117e56",
                "orientation": "+"
              }
            ]
          },
          "properties": {
            "normal": [
              7.91851532433997e-08,
              4.571779838137982e-08,
              -0.9999999999999959
            ],
            "area": 0.433,
            "description": "Bottom boundary face, [Tetrahedron]"
          }
        },
        {
          "id": "uuid:4876439a-e836-4219-b7d0-b8476d5bd955",
          "type": "Feature",
          "geometry": null,
          "topology": {
            "type": "Face",
            "rings": [
              {
                "ref": "uuid:73aa8ed2-3329-4c61-be6d-45a351b580eb",
                "orientation": "+"
              }
            ]
          },
          "properties": {
            "normal": [
              2.0175106918245977e-06,
              -0.942839282949812,
              0.3332477854729335
            ],
            "area": 0.433,
            "description": "South-facing boundary face, [Tetrahedron]"
          }
        },
        {
          "id": "uuid:8e0d9fe4-cb54-4f80-9be5-8475b0f15238",
          "type": "Feature",
          "geometry": null,
          "topology": {
            "type": "Face",
            "rings": [
              {
                "ref": "uuid:e53bac18-648e-4e36-9b17-83af1828160b",
                "orientation": "+"
              }
            ]
          },
          "properties": {
            "normal": [
              0.8165216825252691,
              0.4714213729051553,
              0.33324800244610975
            ],
            "area": 0.433,
            "description": "East-facing boundary face, [Tetrahedron]"
          }
        },
        {
          "id": "uuid:d85783e4-a304-41ec-bda7-5ceb84c29d28",
          "type": "Feature",
          "geometry": null,
          "topology": {
            "type": "Face",
            "rings": [
              {
                "ref": "uuid:ee43fd9a-8036-44dd-867d-f5255692d333",
                "orientation": "+"
              }
            ]
          },
          "properties": {
            "normal": [
              -0.8165237782321394,
              0.4714178338960805,
              0.3332478739110569
            ],
            "area": 0.433,
            "description": "West-facing boundary face, [Tetrahedron]"
          }
        }
      ]
    }
  ],
  "shells": [
    {
      "id": "uuid:faa835c8-e477-4b2d-90d1-3bc263c7e75c",
      "type": "FeatureCollection",
      "featureType": "Shell",
      "features": [
        {
          "id": "uuid:a685d0ee-729d-4c35-a733-f46e9c542a71",
          "type": "Feature",
          "geometry": null,
          "topology": {
            "type": "Shell",
            "directed_references": [
              {
                "ref": "uuid:3ffe6f50-1f4a-43e9-8141-378e23418203",
                "orientation": "+"
              },
              {
                "ref": "uuid:4876439a-e836-4219-b7d0-b8476d5bd955",
                "orientation": "+"
              },
              {
                "ref": "uuid:8e0d9fe4-cb54-4f80-9be5-8475b0f15238",
                "orientation": "+"
              },
              {
                "ref": "uuid:d85783e4-a304-41ec-bda7-5ceb84c29d28",
                "orientation": "+"
              }
            ]
          },
          "properties": {
            "description": "Exterior Shell of Tetrahedron"
          }
        }
      ]
    }
  ],
  "solids": [
    {
      "id": "uuid:b2457ff9-c4d7-41a8-a024-9582370b67ae",
      "type": "FeatureCollection",
      "featureType": "Solid",
      "features": [
        {
          "id": "uuid:9ab66506-6334-4bed-8124-4da025060f6f",
          "type": "Feature",
          "geometry": null,
          "topology": {
            "type": "Solid",
            "shells": [
              {
                "ref": "uuid:a685d0ee-729d-4c35-a733-f46e9c542a71",
                "orientation": "+"
              }
            ]
          },
          "properties": {
            "name": "Tetrahedron",
            "floors": [
              1
            ],
            "volume": 0.118
          }
        }
      ]
    }
  ],
  "supportingDocuments": [],
  "annotations": [],
  "statistics": {
    "point_count": 4,
    "edge_count": 6,
    "ring_count": 4,
    "face_count": 4,
    "shell_count": 1,
    "solid_count": 1
  }
}
```

#### jsonld
```jsonld
{
  "@context": [
    "https://surroundaustralia.github.io/topo-feature/build/annotated/geo/topo/features/topo-feature-multi-collection/context.jsonld",
    {
      "vocabs": "https://linked.data.gov.au/def/csdm/",
      "wa-surveypoint-purpose": "https://linked.data.gov.au/def/csdm/wa-surveypoint-purpose/",
      "wa-survey-purpose": "https://linked.data.gov.au/def/csdm/wa-survey-purpose/",
      "wa-survey-type": "https://linked.data.gov.au/def/csdm/wa-survey-type/",
      "wa-procedure-used": "https://linked.data.gov.au/def/csdm/wa-procedure-used/",
      "wa-survey-documentation-type": "https://linked.data.gov.au/def/csdm/wa-survey-documentation-type/",
      "wa-annotation-role": "https://linked.data.gov.au/def/csdm/wa-annotation/",
      "wa-parcel-purpose": "https://linked.data.gov.au/def/csdm/wa-parcel-purpose/",
      "wa-parcel-type": "https://linked.data.gov.au/def/csdm/wa-parcel-type/",
      "wa-parcel-state": "https://linked.data.gov.au/def/csdm/wa-parcel-state/",
      "wa-nonprimary-parcel-type": "https://linked.data.gov.au/def/csdm/wa-secondary-parcel-type/",
      "wa-monument-form": "https://linked.data.gov.au/def/csdm/wa-monument-form/",
      "wa-monument-condition": "https://linked.data.gov.au/def/csdm/wa-monument-condition/",
      "wa-monument-state": "https://linked.data.gov.au/def/csdm/wa-monument-state/",
      "wa-vector-purpose": "https://linked.data.gov.au/def/csdm/wa-vector-purpose/",
      "wa-vector-type": "https://linked.data.gov.au/def/csdm/wa-vector-type/",
      "wa-secondary-parcel-purpose": "https://linked.data.gov.au/def/csdm/wa-secondary-parcel-purpose/",
      "wa-secondary-parcel-type": "https://linked.data.gov.au/def/csdm/wa-secondary-parcel-type/",
      "wa-secondary-purpose": "https://linked.data.gov.au/def/csdm/wa-secondary-purpose/",
      "wa-interest-type": "https://linked.data.gov.au/def/csdm/wa-interest-type/",
      "wa-interest": "https://linked.data.gov.au/def/csdm/wa-interest/",
      "wa-locality": "https://linked.data.gov.au/def/csdm/wa-locality/",
      "wa-local-government": "https://linked.data.gov.au/def/csdm/wa-local-government/",
      "registered-surveyors": "https://wa.gov.au/surveyors/",
      "foaf": "https://xmlns.com/foaf/0.1/",
      "activityType": "@type"
    }
  ],
  "id": "uuid:1c780b54-8829-46a7-86fc-003fbd7ec26c",
  "name": "DP 12346",
  "description": "Tetrahedron test dataset for Solid validation",
  "type": "FeatureCollection",
  "featureType": "CSD",
  "tenureType": "wa-parcel-type:freehold",
  "planType": "wa-survey-type:deposited-plan",
  "purpose": "wa-survey-purpose:subdivision",
  "surveyType": "wa-survey-type:SSA",
  "time": {
    "date": "2026-04-22"
  },
  "horizontalCRS": "epsg:7850",
  "verticalCRS": "epsg:5711",
  "bearingRotation": 0.0,
  "surveyTitle": "Tetrahedron",
  "adminUnit": [],
  "hasProvenance": [],
  "wasGeneratedBy": {
    "id": "uuid:5fd2ee5e-7eaf-4fd2-82b0-1555ba90c94d",
    "endedAtTime": "2026-04-23T02:33:49.029876+00:00"
  },
  "features": [],
  "referencedCSDs": [],
  "points": [
    {
      "id": "uuid:28411f0c-6f1c-496e-a993-a4d6f5abc01a",
      "type": "FeatureCollection",
      "featureType": "CadastralMark",
      "features": [
        {
          "id": "uuid:a461ffa9-b391-42c1-80fb-37061ccc128a",
          "type": "Feature",
          "featureType": "BoundaryMark",
          "time": "2026-04-23T02:33:49.027878+00:00",
          "geometry": {
            "type": "Point",
            "coordinates": [
              115.99397649268003,
              -31.884890194077606,
              7.0
            ]
          },
          "place": {
            "type": "Point",
            "coordinates": [
              404855.0,
              6471882.0,
              7.0
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
          "id": "uuid:55f7a374-db52-4ab9-9346-b16b81878ee7",
          "type": "Feature",
          "featureType": "BoundaryMark",
          "time": "2026-04-23T02:33:49.027878+00:00",
          "geometry": {
            "type": "Point",
            "coordinates": [
              115.99396592049114,
              -31.88489011040608,
              7.0
            ]
          },
          "place": {
            "type": "Point",
            "coordinates": [
              404854.0,
              6471882.0,
              7.0
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
          "id": "uuid:292b501a-5c12-4146-9af6-4597eb05ec8a",
          "type": "Feature",
          "featureType": "BoundaryMark",
          "time": "2026-04-23T02:33:49.027878+00:00",
          "geometry": {
            "type": "Point",
            "coordinates": [
              115.99397129150869,
              -31.88488234041787,
              7.0
            ]
          },
          "place": {
            "type": "Point",
            "coordinates": [
              404854.5,
              6471882.866,
              7.0
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
          "id": "uuid:37cecce2-4f99-4ad8-beab-51eb69bc5c71",
          "type": "Feature",
          "featureType": "BoundaryMark",
          "time": "2026-04-23T02:33:49.027878+00:00",
          "geometry": {
            "type": "Point",
            "coordinates": [
              115.99397123492597,
              -31.884887545293733,
              7.816
            ]
          },
          "place": {
            "type": "Point",
            "coordinates": [
              404854.5,
              6471882.289,
              7.816
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
      ]
    }
  ],
  "vectorObservations": [],
  "observedVectors": [],
  "parcels": [],
  "edges": [
    {
      "id": "uuid:12b8746a-ba8c-45ad-92a3-94e99180e4ec",
      "type": "FeatureCollection",
      "featureType": "Edge",
      "features": [
        {
          "id": "uuid:b26bbbf7-0852-4e23-9eb3-ec9c0a074a8d",
          "type": "Feature",
          "geometry": null,
          "topology": {
            "type": "Edge",
            "vertices": [
              [
                "uuid:a461ffa9-b391-42c1-80fb-37061ccc128a",
                "uuid:55f7a374-db52-4ab9-9346-b16b81878ee7"
              ]
            ]
          },
          "properties": {
            "vectorPurpose": "wa-vector-purpose:3D-Construct",
            "comment": null,
            "length": 1.0
          }
        },
        {
          "id": "uuid:144d47d4-2d20-490b-ab4d-4577d35eed7c",
          "type": "Feature",
          "geometry": null,
          "topology": {
            "type": "Edge",
            "vertices": [
              [
                "uuid:55f7a374-db52-4ab9-9346-b16b81878ee7",
                "uuid:292b501a-5c12-4146-9af6-4597eb05ec8a"
              ]
            ]
          },
          "properties": {
            "vectorPurpose": "wa-vector-purpose:3D-Construct",
            "comment": null,
            "length": 1.0
          }
        },
        {
          "id": "uuid:737375ac-5f47-4c55-94c1-328d8ff4eb8b",
          "type": "Feature",
          "geometry": null,
          "topology": {
            "type": "Edge",
            "vertices": [
              [
                "uuid:292b501a-5c12-4146-9af6-4597eb05ec8a",
                "uuid:a461ffa9-b391-42c1-80fb-37061ccc128a"
              ]
            ]
          },
          "properties": {
            "vectorPurpose": "wa-vector-purpose:3D-Construct",
            "comment": null,
            "length": 1.0
          }
        },
        {
          "id": "uuid:0ffea858-215f-4055-98a0-9e7e7fd2eafd",
          "type": "Feature",
          "geometry": null,
          "topology": {
            "type": "Edge",
            "vertices": [
              [
                "uuid:a461ffa9-b391-42c1-80fb-37061ccc128a",
                "uuid:37cecce2-4f99-4ad8-beab-51eb69bc5c71"
              ]
            ]
          },
          "properties": {
            "vectorPurpose": "wa-vector-purpose:3D-Construct",
            "comment": null,
            "length": 1.0
          }
        },
        {
          "id": "uuid:a7355cfd-1646-45ec-bee8-8e1a0f03f487",
          "type": "Feature",
          "geometry": null,
          "topology": {
            "type": "Edge",
            "vertices": [
              [
                "uuid:37cecce2-4f99-4ad8-beab-51eb69bc5c71",
                "uuid:55f7a374-db52-4ab9-9346-b16b81878ee7"
              ]
            ]
          },
          "properties": {
            "vectorPurpose": "wa-vector-purpose:3D-Construct",
            "comment": null,
            "length": 1.0
          }
        },
        {
          "id": "uuid:7964ba19-27a7-48d1-8a11-4d223f8bc4cd",
          "type": "Feature",
          "geometry": null,
          "topology": {
            "type": "Edge",
            "vertices": [
              [
                "uuid:292b501a-5c12-4146-9af6-4597eb05ec8a",
                "uuid:37cecce2-4f99-4ad8-beab-51eb69bc5c71"
              ]
            ]
          },
          "properties": {
            "vectorPurpose": "wa-vector-purpose:3D-Construct",
            "comment": null,
            "length": 0.999
          }
        }
      ]
    }
  ],
  "rings": [
    {
      "id": "uuid:68209c33-b08c-4642-b5bf-5fed70d97990",
      "type": "FeatureCollection",
      "featureType": "Ring",
      "features": [
        {
          "id": "uuid:c7d69e55-8384-46b1-9265-c1d655117e56",
          "type": "Feature",
          "geometry": null,
          "topology": {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:b26bbbf7-0852-4e23-9eb3-ec9c0a074a8d",
                "orientation": "+"
              },
              {
                "ref": "uuid:144d47d4-2d20-490b-ab4d-4577d35eed7c",
                "orientation": "+"
              },
              {
                "ref": "uuid:737375ac-5f47-4c55-94c1-328d8ff4eb8b",
                "orientation": "+"
              }
            ]
          },
          "properties": {
            "circumference": 3.0
          }
        },
        {
          "id": "uuid:73aa8ed2-3329-4c61-be6d-45a351b580eb",
          "type": "Feature",
          "geometry": null,
          "topology": {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:b26bbbf7-0852-4e23-9eb3-ec9c0a074a8d",
                "orientation": "-"
              },
              {
                "ref": "uuid:0ffea858-215f-4055-98a0-9e7e7fd2eafd",
                "orientation": "+"
              },
              {
                "ref": "uuid:a7355cfd-1646-45ec-bee8-8e1a0f03f487",
                "orientation": "+"
              }
            ]
          },
          "properties": {
            "circumference": 3.0
          }
        },
        {
          "id": "uuid:e53bac18-648e-4e36-9b17-83af1828160b",
          "type": "Feature",
          "geometry": null,
          "topology": {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:737375ac-5f47-4c55-94c1-328d8ff4eb8b",
                "orientation": "-"
              },
              {
                "ref": "uuid:7964ba19-27a7-48d1-8a11-4d223f8bc4cd",
                "orientation": "+"
              },
              {
                "ref": "uuid:0ffea858-215f-4055-98a0-9e7e7fd2eafd",
                "orientation": "-"
              }
            ]
          },
          "properties": {
            "circumference": 2.999
          }
        },
        {
          "id": "uuid:ee43fd9a-8036-44dd-867d-f5255692d333",
          "type": "Feature",
          "geometry": null,
          "topology": {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:144d47d4-2d20-490b-ab4d-4577d35eed7c",
                "orientation": "-"
              },
              {
                "ref": "uuid:a7355cfd-1646-45ec-bee8-8e1a0f03f487",
                "orientation": "-"
              },
              {
                "ref": "uuid:7964ba19-27a7-48d1-8a11-4d223f8bc4cd",
                "orientation": "-"
              }
            ]
          },
          "properties": {
            "circumference": 2.999
          }
        }
      ]
    }
  ],
  "faces": [
    {
      "id": "uuid:1ad71b78-a201-4ed7-ab2b-ea916492374d",
      "type": "FeatureCollection",
      "featureType": "Face",
      "features": [
        {
          "id": "uuid:3ffe6f50-1f4a-43e9-8141-378e23418203",
          "type": "Feature",
          "geometry": null,
          "topology": {
            "type": "Face",
            "rings": [
              {
                "ref": "uuid:c7d69e55-8384-46b1-9265-c1d655117e56",
                "orientation": "+"
              }
            ]
          },
          "properties": {
            "normal": [
              7.91851532433997e-08,
              4.571779838137982e-08,
              -0.9999999999999959
            ],
            "area": 0.433,
            "description": "Bottom boundary face, [Tetrahedron]"
          }
        },
        {
          "id": "uuid:4876439a-e836-4219-b7d0-b8476d5bd955",
          "type": "Feature",
          "geometry": null,
          "topology": {
            "type": "Face",
            "rings": [
              {
                "ref": "uuid:73aa8ed2-3329-4c61-be6d-45a351b580eb",
                "orientation": "+"
              }
            ]
          },
          "properties": {
            "normal": [
              2.0175106918245977e-06,
              -0.942839282949812,
              0.3332477854729335
            ],
            "area": 0.433,
            "description": "South-facing boundary face, [Tetrahedron]"
          }
        },
        {
          "id": "uuid:8e0d9fe4-cb54-4f80-9be5-8475b0f15238",
          "type": "Feature",
          "geometry": null,
          "topology": {
            "type": "Face",
            "rings": [
              {
                "ref": "uuid:e53bac18-648e-4e36-9b17-83af1828160b",
                "orientation": "+"
              }
            ]
          },
          "properties": {
            "normal": [
              0.8165216825252691,
              0.4714213729051553,
              0.33324800244610975
            ],
            "area": 0.433,
            "description": "East-facing boundary face, [Tetrahedron]"
          }
        },
        {
          "id": "uuid:d85783e4-a304-41ec-bda7-5ceb84c29d28",
          "type": "Feature",
          "geometry": null,
          "topology": {
            "type": "Face",
            "rings": [
              {
                "ref": "uuid:ee43fd9a-8036-44dd-867d-f5255692d333",
                "orientation": "+"
              }
            ]
          },
          "properties": {
            "normal": [
              -0.8165237782321394,
              0.4714178338960805,
              0.3332478739110569
            ],
            "area": 0.433,
            "description": "West-facing boundary face, [Tetrahedron]"
          }
        }
      ]
    }
  ],
  "shells": [
    {
      "id": "uuid:faa835c8-e477-4b2d-90d1-3bc263c7e75c",
      "type": "FeatureCollection",
      "featureType": "Shell",
      "features": [
        {
          "id": "uuid:a685d0ee-729d-4c35-a733-f46e9c542a71",
          "type": "Feature",
          "geometry": null,
          "topology": {
            "type": "Shell",
            "directed_references": [
              {
                "ref": "uuid:3ffe6f50-1f4a-43e9-8141-378e23418203",
                "orientation": "+"
              },
              {
                "ref": "uuid:4876439a-e836-4219-b7d0-b8476d5bd955",
                "orientation": "+"
              },
              {
                "ref": "uuid:8e0d9fe4-cb54-4f80-9be5-8475b0f15238",
                "orientation": "+"
              },
              {
                "ref": "uuid:d85783e4-a304-41ec-bda7-5ceb84c29d28",
                "orientation": "+"
              }
            ]
          },
          "properties": {
            "description": "Exterior Shell of Tetrahedron"
          }
        }
      ]
    }
  ],
  "solids": [
    {
      "id": "uuid:b2457ff9-c4d7-41a8-a024-9582370b67ae",
      "type": "FeatureCollection",
      "featureType": "Solid",
      "features": [
        {
          "id": "uuid:9ab66506-6334-4bed-8124-4da025060f6f",
          "type": "Feature",
          "geometry": null,
          "topology": {
            "type": "Solid",
            "shells": [
              {
                "ref": "uuid:a685d0ee-729d-4c35-a733-f46e9c542a71",
                "orientation": "+"
              }
            ]
          },
          "properties": {
            "name": "Tetrahedron",
            "floors": [
              1
            ],
            "volume": 0.118
          }
        }
      ]
    }
  ],
  "supportingDocuments": [],
  "annotations": [],
  "statistics": {
    "point_count": 4,
    "edge_count": 6,
    "ring_count": 4,
    "face_count": 4,
    "shell_count": 1,
    "solid_count": 1
  }
}
```

#### ttl
```ttl
@prefix dct: <http://purl.org/dc/terms/> .
@prefix geojson: <https://purl.org/geojson/vocab#> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix time: <http://www.w3.org/2006/time#> .
@prefix topo: <https://purl.org/geojson/topo#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

<uuid:12b8746a-ba8c-45ad-92a3-94e99180e4ec> a <file:///github/workspace/Edge>,
        geojson:FeatureCollection ;
    geojson:features <uuid:0ffea858-215f-4055-98a0-9e7e7fd2eafd>,
        <uuid:144d47d4-2d20-490b-ab4d-4577d35eed7c>,
        <uuid:737375ac-5f47-4c55-94c1-328d8ff4eb8b>,
        <uuid:7964ba19-27a7-48d1-8a11-4d223f8bc4cd>,
        <uuid:a7355cfd-1646-45ec-bee8-8e1a0f03f487>,
        <uuid:b26bbbf7-0852-4e23-9eb3-ec9c0a074a8d> .

<uuid:1ad71b78-a201-4ed7-ab2b-ea916492374d> a topo:Face,
        geojson:FeatureCollection ;
    geojson:features <uuid:3ffe6f50-1f4a-43e9-8141-378e23418203>,
        <uuid:4876439a-e836-4219-b7d0-b8476d5bd955>,
        <uuid:8e0d9fe4-cb54-4f80-9be5-8475b0f15238>,
        <uuid:d85783e4-a304-41ec-bda7-5ceb84c29d28> .

<uuid:28411f0c-6f1c-496e-a993-a4d6f5abc01a> a <file:///github/workspace/CadastralMark>,
        geojson:FeatureCollection ;
    geojson:features <uuid:292b501a-5c12-4146-9af6-4597eb05ec8a>,
        <uuid:37cecce2-4f99-4ad8-beab-51eb69bc5c71>,
        <uuid:55f7a374-db52-4ab9-9346-b16b81878ee7>,
        <uuid:a461ffa9-b391-42c1-80fb-37061ccc128a> .

<uuid:292b501a-5c12-4146-9af6-4597eb05ec8a> a <file:///github/workspace/BoundaryMark>,
        geojson:Feature ;
    dct:spatial [ a geojson:Point ;
            geojson:coordinates ( 4.048545e+05 6.471883e+06 7e+00 ) ] ;
    dct:time "2026-04-23T02:33:49.027878+00:00" ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 1.15994e+02 -3.188488e+01 7e+00 ) ] .

<uuid:37cecce2-4f99-4ad8-beab-51eb69bc5c71> a <file:///github/workspace/BoundaryMark>,
        geojson:Feature ;
    dct:spatial [ a geojson:Point ;
            geojson:coordinates ( 4.048545e+05 6.471882e+06 7.816e+00 ) ] ;
    dct:time "2026-04-23T02:33:49.027878+00:00" ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 1.15994e+02 -3.188489e+01 7.816e+00 ) ] .

<uuid:55f7a374-db52-4ab9-9346-b16b81878ee7> a <file:///github/workspace/BoundaryMark>,
        geojson:Feature ;
    dct:spatial [ a geojson:Point ;
            geojson:coordinates ( 4.04854e+05 6.471882e+06 7e+00 ) ] ;
    dct:time "2026-04-23T02:33:49.027878+00:00" ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 1.15994e+02 -3.188489e+01 7e+00 ) ] .

<uuid:68209c33-b08c-4642-b5bf-5fed70d97990> a topo:Ring,
        geojson:FeatureCollection ;
    geojson:features <uuid:73aa8ed2-3329-4c61-be6d-45a351b580eb>,
        <uuid:c7d69e55-8384-46b1-9265-c1d655117e56>,
        <uuid:e53bac18-648e-4e36-9b17-83af1828160b>,
        <uuid:ee43fd9a-8036-44dd-867d-f5255692d333> .

<uuid:9ab66506-6334-4bed-8124-4da025060f6f> a geojson:Feature ;
    geojson:topology [ a topo:Solid ;
            topo:shells ( <uuid:a685d0ee-729d-4c35-a733-f46e9c542a71> ) ] .

<uuid:a461ffa9-b391-42c1-80fb-37061ccc128a> a <file:///github/workspace/BoundaryMark>,
        geojson:Feature ;
    dct:spatial [ a geojson:Point ;
            geojson:coordinates ( 4.04855e+05 6.471882e+06 7e+00 ) ] ;
    dct:time "2026-04-23T02:33:49.027878+00:00" ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 1.15994e+02 -3.188489e+01 7e+00 ) ] .

<uuid:b2457ff9-c4d7-41a8-a024-9582370b67ae> a topo:Solid,
        geojson:FeatureCollection ;
    geojson:features <uuid:9ab66506-6334-4bed-8124-4da025060f6f> .

<uuid:faa835c8-e477-4b2d-90d1-3bc263c7e75c> a topo:Shell,
        geojson:FeatureCollection ;
    geojson:features <uuid:a685d0ee-729d-4c35-a733-f46e9c542a71> .

<uuid:3ffe6f50-1f4a-43e9-8141-378e23418203> a geojson:Feature ;
    geojson:topology [ a topo:Face ;
            topo:rings ( <uuid:c7d69e55-8384-46b1-9265-c1d655117e56> ) ] .

<uuid:4876439a-e836-4219-b7d0-b8476d5bd955> a geojson:Feature ;
    geojson:topology [ a topo:Face ;
            topo:rings ( <uuid:73aa8ed2-3329-4c61-be6d-45a351b580eb> ) ] .

<uuid:73aa8ed2-3329-4c61-be6d-45a351b580eb> a geojson:Feature ;
    topo:orientation "+" ;
    geojson:topology [ a topo:Ring ;
            topo:directedReferences ( [ topo:orientation "-" ;
                        topo:ref <uuid:b26bbbf7-0852-4e23-9eb3-ec9c0a074a8d> ] [ topo:orientation "+" ;
                        topo:ref <uuid:0ffea858-215f-4055-98a0-9e7e7fd2eafd> ] [ topo:orientation "+" ;
                        topo:ref <uuid:a7355cfd-1646-45ec-bee8-8e1a0f03f487> ] ) ] .

<uuid:8e0d9fe4-cb54-4f80-9be5-8475b0f15238> a geojson:Feature ;
    geojson:topology [ a topo:Face ;
            topo:rings ( <uuid:e53bac18-648e-4e36-9b17-83af1828160b> ) ] .

<uuid:a685d0ee-729d-4c35-a733-f46e9c542a71> a geojson:Feature ;
    topo:orientation "+" ;
    geojson:topology [ a topo:Shell ;
            topo:directedReferences ( [ topo:orientation "+" ;
                        topo:ref <uuid:3ffe6f50-1f4a-43e9-8141-378e23418203> ] [ topo:orientation "+" ;
                        topo:ref <uuid:4876439a-e836-4219-b7d0-b8476d5bd955> ] [ topo:orientation "+" ;
                        topo:ref <uuid:8e0d9fe4-cb54-4f80-9be5-8475b0f15238> ] [ topo:orientation "+" ;
                        topo:ref <uuid:d85783e4-a304-41ec-bda7-5ceb84c29d28> ] ) ] .

<uuid:c7d69e55-8384-46b1-9265-c1d655117e56> a geojson:Feature ;
    topo:orientation "+" ;
    geojson:topology [ a topo:Ring ;
            topo:directedReferences ( [ topo:orientation "+" ;
                        topo:ref <uuid:b26bbbf7-0852-4e23-9eb3-ec9c0a074a8d> ] [ topo:orientation "+" ;
                        topo:ref <uuid:144d47d4-2d20-490b-ab4d-4577d35eed7c> ] [ topo:orientation "+" ;
                        topo:ref <uuid:737375ac-5f47-4c55-94c1-328d8ff4eb8b> ] ) ] .

<uuid:d85783e4-a304-41ec-bda7-5ceb84c29d28> a geojson:Feature ;
    geojson:topology [ a topo:Face ;
            topo:rings ( <uuid:ee43fd9a-8036-44dd-867d-f5255692d333> ) ] .

<uuid:e53bac18-648e-4e36-9b17-83af1828160b> a geojson:Feature ;
    topo:orientation "+" ;
    geojson:topology [ a topo:Ring ;
            topo:directedReferences ( [ topo:orientation "-" ;
                        topo:ref <uuid:737375ac-5f47-4c55-94c1-328d8ff4eb8b> ] [ topo:orientation "+" ;
                        topo:ref <uuid:7964ba19-27a7-48d1-8a11-4d223f8bc4cd> ] [ topo:orientation "-" ;
                        topo:ref <uuid:0ffea858-215f-4055-98a0-9e7e7fd2eafd> ] ) ] .

<uuid:ee43fd9a-8036-44dd-867d-f5255692d333> a geojson:Feature ;
    topo:orientation "+" ;
    geojson:topology [ a topo:Ring ;
            topo:directedReferences ( [ topo:orientation "-" ;
                        topo:ref <uuid:144d47d4-2d20-490b-ab4d-4577d35eed7c> ] [ topo:orientation "-" ;
                        topo:ref <uuid:a7355cfd-1646-45ec-bee8-8e1a0f03f487> ] [ topo:orientation "-" ;
                        topo:ref <uuid:7964ba19-27a7-48d1-8a11-4d223f8bc4cd> ] ) ] .

<uuid:0ffea858-215f-4055-98a0-9e7e7fd2eafd> a geojson:Feature ;
    geojson:topology [ a <file:///github/workspace/Edge> ] .

<uuid:144d47d4-2d20-490b-ab4d-4577d35eed7c> a geojson:Feature ;
    geojson:topology [ a <file:///github/workspace/Edge> ] .

<uuid:737375ac-5f47-4c55-94c1-328d8ff4eb8b> a geojson:Feature ;
    geojson:topology [ a <file:///github/workspace/Edge> ] .

<uuid:7964ba19-27a7-48d1-8a11-4d223f8bc4cd> a geojson:Feature ;
    geojson:topology [ a <file:///github/workspace/Edge> ] .

<uuid:a7355cfd-1646-45ec-bee8-8e1a0f03f487> a geojson:Feature ;
    geojson:topology [ a <file:///github/workspace/Edge> ] .

<uuid:b26bbbf7-0852-4e23-9eb3-ec9c0a074a8d> a geojson:Feature ;
    geojson:topology [ a <file:///github/workspace/Edge> ] .

[] time: [ ] ;
    topo:edges ( <uuid:12b8746a-ba8c-45ad-92a3-94e99180e4ec> ) ;
    topo:faces ( <uuid:1ad71b78-a201-4ed7-ab2b-ea916492374d> ) ;
    topo:points ( <uuid:28411f0c-6f1c-496e-a993-a4d6f5abc01a> ) ;
    topo:rings ( <uuid:68209c33-b08c-4642-b5bf-5fed70d97990> ) ;
    topo:shells ( <uuid:faa835c8-e477-4b2d-90d1-3bc263c7e75c> ),
        ( <uuid:b2457ff9-c4d7-41a8-a024-9582370b67ae> ) .


```


### Points collection (topology nodes)
A minimal example showing 5 Point features used as topology nodes.
Points have explicit 3D coordinates and serve as the base geometry for all higher-order topology.
All other feature types reference these points (directly or transitively) to resolve coordinates.

#### json
```json
{
  "type": "FeatureCollection",
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
    },
    {
      "id": "uuid:a0ec1bfd-0f7a-4c42-bc71-bacdcd44071d",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          12.0,
          2.0,
          3.0
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
  "@context": "https://surroundaustralia.github.io/topo-feature/build/annotated/geo/topo/features/topo-feature-multi-collection/context.jsonld",
  "type": "FeatureCollection",
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
    },
    {
      "id": "uuid:a0ec1bfd-0f7a-4c42-bc71-bacdcd44071d",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          12.0,
          2.0,
          3.0
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
@prefix topo: <https://purl.org/geojson/topo#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

<uuid:8d2be28b-8f31-46de-99cb-4d8709502cd0> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 1.8e+01 1e+01 6e+00 ) ] .

<uuid:a0ec1bfd-0f7a-4c42-bc71-bacdcd44071d> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 1.2e+01 2e+00 3e+00 ) ] .

<uuid:ad6d8fcc-402c-482e-8f1a-7492ccaead38> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 1.8e+01 1e+01 3e+00 ) ] .

<uuid:c611f840-2829-44b2-b367-3915ca7875a4> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 1.8e+01 2e+00 6e+00 ) ] .

<uuid:fad324b9-801f-40f4-b65b-91f8753e9698> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 1.8e+01 2e+00 3e+00 ) ] .

[] topo:points ( <uuid:ad6d8fcc-402c-482e-8f1a-7492ccaead38> <uuid:8d2be28b-8f31-46de-99cb-4d8709502cd0> <uuid:c611f840-2829-44b2-b367-3915ca7875a4> <uuid:fad324b9-801f-40f4-b65b-91f8753e9698> <uuid:a0ec1bfd-0f7a-4c42-bc71-bacdcd44071d> ) .


```


### Edges collection (LineString topology referencing points)
Edge features using the 'references' model of topology — each edge has type 'LineString'
and references two Point feature IDs in its topology.references array.
geometry is null; actual coordinates are resolved from the referenced points.

#### json
```json
{
  "type": "FeatureCollection",
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
    },
    {
      "id": "uuid:a0ec1bfd-0f7a-4c42-bc71-bacdcd44071d",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          12.0,
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
  ]
}
```

#### jsonld
```jsonld
{
  "@context": "https://surroundaustralia.github.io/topo-feature/build/annotated/geo/topo/features/topo-feature-multi-collection/context.jsonld",
  "type": "FeatureCollection",
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
    },
    {
      "id": "uuid:a0ec1bfd-0f7a-4c42-bc71-bacdcd44071d",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          12.0,
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
  ]
}
```

#### ttl
```ttl
@prefix geojson: <https://purl.org/geojson/vocab#> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix topo: <https://purl.org/geojson/topo#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

<uuid:7dc1cc1c-8e7f-4666-9f52-4e6c2e6f57ac> a geojson:Feature ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:8d2be28b-8f31-46de-99cb-4d8709502cd0> <uuid:c611f840-2829-44b2-b367-3915ca7875a4> ) ] .

<uuid:83ff2cdf-6c58-4e7b-ba55-e084eff8c569> a geojson:Feature ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:c611f840-2829-44b2-b367-3915ca7875a4> <uuid:fad324b9-801f-40f4-b65b-91f8753e9698> ) ] .

<uuid:a0ec1bfd-0f7a-4c42-bc71-bacdcd44071d> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 1.2e+01 2e+00 3e+00 ) ] .

<uuid:c60507ba-226b-4e49-a702-e9afef899b23> a geojson:Feature ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:ad6d8fcc-402c-482e-8f1a-7492ccaead38> <uuid:8d2be28b-8f31-46de-99cb-4d8709502cd0> ) ] .

<uuid:d69c596c-134e-4216-9bf6-d0f10e6886d8> a geojson:Feature ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:fad324b9-801f-40f4-b65b-91f8753e9698> <uuid:ad6d8fcc-402c-482e-8f1a-7492ccaead38> ) ] .

<uuid:8d2be28b-8f31-46de-99cb-4d8709502cd0> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 1.8e+01 1e+01 6e+00 ) ] .

<uuid:ad6d8fcc-402c-482e-8f1a-7492ccaead38> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 1.8e+01 1e+01 3e+00 ) ] .

<uuid:c611f840-2829-44b2-b367-3915ca7875a4> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 1.8e+01 2e+00 6e+00 ) ] .

<uuid:fad324b9-801f-40f4-b65b-91f8753e9698> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 1.8e+01 2e+00 3e+00 ) ] .

[] topo:edges ( <uuid:c60507ba-226b-4e49-a702-e9afef899b23> <uuid:7dc1cc1c-8e7f-4666-9f52-4e6c2e6f57ac> <uuid:83ff2cdf-6c58-4e7b-ba55-e084eff8c569> <uuid:d69c596c-134e-4216-9bf6-d0f10e6886d8> ) ;
    topo:points ( <uuid:ad6d8fcc-402c-482e-8f1a-7492ccaead38> <uuid:8d2be28b-8f31-46de-99cb-4d8709502cd0> <uuid:c611f840-2829-44b2-b367-3915ca7875a4> <uuid:fad324b9-801f-40f4-b65b-91f8753e9698> <uuid:a0ec1bfd-0f7a-4c42-bc71-bacdcd44071d> ) .


```


### Faces collection (faces referencing edges via Ring directed_references)
Face features referencing edges via Ring topology with directed_references.
Each face has one or more Rings; each Ring's directed_references is an ordered array
of oriented Edge references with 'ref' and 'orientation' ('+' or '-') indicating
direction of traversal. geometry is null on all non-point features — coordinates
are derived from the topological reference chain.

#### json
```json
{
  "type": "FeatureCollection",
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
    },
    {
      "id": "uuid:a0ec1bfd-0f7a-4c42-bc71-bacdcd44071d",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          12.0,
          2.0,
          3.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:11caaac5-b631-4bd8-a6af-f82cb6371071",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          12.0,
          2.0,
          6.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:5e08b82a-8efb-447c-b5c2-54f8ff5788b3",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          10.0,
          10.0,
          6.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:22138e52-65ef-4773-b69d-5ea2628fad7b",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          10.0,
          10.0,
          3.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:62a26df3-3e19-49bf-9ee4-24dbeb814a70",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          10.0,
          6.0,
          6.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:8087116e-84cc-44d1-8047-78dc3837d7e8",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          12.0,
          6.0,
          6.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:f34d9f2e-4180-41de-a613-46f78f4c178f",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          10.0,
          6.0,
          3.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:87373f95-ee4b-4471-9980-f4a8258ee1e3",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          12.0,
          6.0,
          3.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:e7300a01-f8c1-4351-9511-02790a5376b0",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          2.0,
          10.0,
          3.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:1e20237c-9dfa-4251-9f3f-cc5e56a5becd",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          2.0,
          10.0,
          6.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:307b7db6-8014-4628-b80e-ff925bf71168",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          2.0,
          2.0,
          3.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:3c08ae4e-7b27-4e95-8bfb-6b42451be8f6",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          2.0,
          2.0,
          6.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:b8412dad-b40a-4e35-9f42-f983e0fce39d",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          8.0,
          2.0,
          3.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:9a1d8124-ca37-4abd-b07e-bff4c8eaa2f9",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          8.0,
          2.0,
          6.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:caa6045e-4189-4571-8914-1189e51ac71e",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          8.0,
          6.0,
          6.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:1d2a5d01-8547-4de6-abea-8f9ab994d35e",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          8.0,
          6.0,
          3.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:ff685e16-64f8-4f41-8a9e-7d8e83312fd6",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          12.0,
          0.0,
          0.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:92bd9ed9-c138-45c3-b72c-a9ecb7f7cfe9",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          20.0,
          0.0,
          0.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:c060c1dc-6544-4595-b583-72ecf603fd6d",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          20.0,
          0.0,
          3.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:7fe8cb9b-976e-4344-bf72-f3721d878ba4",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          12.0,
          0.0,
          3.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:20d3c864-4a8c-4440-b600-a1d424e92f51",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          20.0,
          10.0,
          0.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:2b34e214-cba7-4a66-8443-ceb932c5ef09",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          20.0,
          10.0,
          3.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:16c35df5-bc63-4edd-8da5-dbcc5548a61e",
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
      "id": "uuid:206806a4-a2f8-4c04-858e-99d289858a40",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          12.0,
          6.0,
          0.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:d8d136c6-604c-4ad3-adf7-b0a7e04d034a",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          10.0,
          6.0,
          0.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:b6d10150-f9d4-4f7e-b028-c4bbee8e7717",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          0.0,
          0.0,
          0.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:a3b19f96-9bca-4c31-ac7e-4cb1615878df",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          8.0,
          0.0,
          0.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:793997c5-bcc4-4610-984b-6cf2c2997348",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          8.0,
          0.0,
          3.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:8e503e04-ad51-423b-8102-708a845189b6",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          0.0,
          0.0,
          3.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:ca62577e-8e24-4af2-88bf-33b34e25e606",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          0.0,
          10.0,
          0.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:8cda5c68-9c82-43b4-84d7-979efa36dfe1",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          0.0,
          10.0,
          3.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:9ef3d2ea-acea-4365-8bd5-2f8ef3036ed0",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          8.0,
          6.0,
          0.0
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
    },
    {
      "id": "uuid:32e82eb1-93a4-4387-8cd0-9616ebf1e39b",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:a0ec1bfd-0f7a-4c42-bc71-bacdcd44071d",
          "uuid:fad324b9-801f-40f4-b65b-91f8753e9698"
        ]
      },
      "properties": {
        "length": 6.0
      }
    },
    {
      "id": "uuid:8582d9c2-6053-495a-8413-f5493691c0de",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:c611f840-2829-44b2-b367-3915ca7875a4",
          "uuid:11caaac5-b631-4bd8-a6af-f82cb6371071"
        ]
      },
      "properties": {
        "length": 6.0
      }
    },
    {
      "id": "uuid:120defbd-2e05-4ec3-ba3c-ffee086d2add",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:11caaac5-b631-4bd8-a6af-f82cb6371071",
          "uuid:a0ec1bfd-0f7a-4c42-bc71-bacdcd44071d"
        ]
      },
      "properties": {
        "length": 3.0
      }
    },
    {
      "id": "uuid:4c2a6434-03b0-4aa2-85ea-a9fcaea41555",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:5e08b82a-8efb-447c-b5c2-54f8ff5788b3",
          "uuid:8d2be28b-8f31-46de-99cb-4d8709502cd0"
        ]
      },
      "properties": {
        "length": 8.0
      }
    },
    {
      "id": "uuid:830b9098-d914-4e8b-869d-4d20f1eb5c81",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:ad6d8fcc-402c-482e-8f1a-7492ccaead38",
          "uuid:22138e52-65ef-4773-b69d-5ea2628fad7b"
        ]
      },
      "properties": {
        "length": 8.0
      }
    },
    {
      "id": "uuid:3b72e45d-d351-46e4-a5b7-9ac9bc339d03",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:22138e52-65ef-4773-b69d-5ea2628fad7b",
          "uuid:5e08b82a-8efb-447c-b5c2-54f8ff5788b3"
        ]
      },
      "properties": {
        "length": 3.0
      }
    },
    {
      "id": "uuid:921e2351-efbf-48be-85d3-eedc0dc2ddc0",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:5e08b82a-8efb-447c-b5c2-54f8ff5788b3",
          "uuid:62a26df3-3e19-49bf-9ee4-24dbeb814a70"
        ]
      },
      "properties": {
        "length": 4.0
      }
    },
    {
      "id": "uuid:73f88b47-78ab-474d-9c62-73dfefd0dd5d",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:62a26df3-3e19-49bf-9ee4-24dbeb814a70",
          "uuid:8087116e-84cc-44d1-8047-78dc3837d7e8"
        ]
      },
      "properties": {
        "length": 2.0
      }
    },
    {
      "id": "uuid:7aa2a76d-9d5c-4540-9f2e-d8bcf36fadb5",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:8087116e-84cc-44d1-8047-78dc3837d7e8",
          "uuid:11caaac5-b631-4bd8-a6af-f82cb6371071"
        ]
      },
      "properties": {
        "length": 4.0
      }
    },
    {
      "id": "uuid:ed6b8b1c-7030-4d70-ab61-94cb3aa904a7",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:22138e52-65ef-4773-b69d-5ea2628fad7b",
          "uuid:f34d9f2e-4180-41de-a613-46f78f4c178f"
        ]
      },
      "properties": {
        "length": 4.0
      }
    },
    {
      "id": "uuid:5f17e211-e8b5-4a7c-85e4-798787fd82a5",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:f34d9f2e-4180-41de-a613-46f78f4c178f",
          "uuid:62a26df3-3e19-49bf-9ee4-24dbeb814a70"
        ]
      },
      "properties": {
        "length": 3.0
      }
    },
    {
      "id": "uuid:7da1c2fe-f798-43cc-af44-ac63f968139c",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:f34d9f2e-4180-41de-a613-46f78f4c178f",
          "uuid:87373f95-ee4b-4471-9980-f4a8258ee1e3"
        ]
      },
      "properties": {
        "length": 2.0
      }
    },
    {
      "id": "uuid:46fd1def-a93e-4c99-9868-172cf1b40ff1",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:87373f95-ee4b-4471-9980-f4a8258ee1e3",
          "uuid:8087116e-84cc-44d1-8047-78dc3837d7e8"
        ]
      },
      "properties": {
        "length": 3.0
      }
    },
    {
      "id": "uuid:856e43bc-ee35-44d0-b25e-ea94a53e1db6",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:a0ec1bfd-0f7a-4c42-bc71-bacdcd44071d",
          "uuid:87373f95-ee4b-4471-9980-f4a8258ee1e3"
        ]
      },
      "properties": {
        "length": 4.0
      }
    },
    {
      "id": "uuid:a5ed4867-4011-4db7-8425-cbe61a6d3a2d",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:22138e52-65ef-4773-b69d-5ea2628fad7b",
          "uuid:e7300a01-f8c1-4351-9511-02790a5376b0"
        ]
      },
      "properties": {
        "length": 8.0
      }
    },
    {
      "id": "uuid:745aa367-94b6-4949-a856-5271ec6672e9",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:e7300a01-f8c1-4351-9511-02790a5376b0",
          "uuid:1e20237c-9dfa-4251-9f3f-cc5e56a5becd"
        ]
      },
      "properties": {
        "length": 3.0
      }
    },
    {
      "id": "uuid:f921656a-58e3-4375-bdff-ac8019f524cf",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:1e20237c-9dfa-4251-9f3f-cc5e56a5becd",
          "uuid:5e08b82a-8efb-447c-b5c2-54f8ff5788b3"
        ]
      },
      "properties": {
        "length": 8.0
      }
    },
    {
      "id": "uuid:6aab9ba2-327e-40df-96c2-0ea43c538c24",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:e7300a01-f8c1-4351-9511-02790a5376b0",
          "uuid:307b7db6-8014-4628-b80e-ff925bf71168"
        ]
      },
      "properties": {
        "length": 8.0
      }
    },
    {
      "id": "uuid:fb28f3f2-8ea7-4c03-bff5-7352addba8b3",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:3c08ae4e-7b27-4e95-8bfb-6b42451be8f6",
          "uuid:307b7db6-8014-4628-b80e-ff925bf71168"
        ]
      },
      "properties": {
        "length": 3.0
      }
    },
    {
      "id": "uuid:e0416983-f0db-4c99-8a72-3f8b4615ab05",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:3c08ae4e-7b27-4e95-8bfb-6b42451be8f6",
          "uuid:1e20237c-9dfa-4251-9f3f-cc5e56a5becd"
        ]
      },
      "properties": {
        "length": 8.0
      }
    },
    {
      "id": "uuid:07093c51-5d4e-42ad-941f-8eeb89e5ae78",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:307b7db6-8014-4628-b80e-ff925bf71168",
          "uuid:b8412dad-b40a-4e35-9f42-f983e0fce39d"
        ]
      },
      "properties": {
        "length": 6.0
      }
    },
    {
      "id": "uuid:fb03276b-4250-4d52-81e1-035a0bd92895",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:b8412dad-b40a-4e35-9f42-f983e0fce39d",
          "uuid:9a1d8124-ca37-4abd-b07e-bff4c8eaa2f9"
        ]
      },
      "properties": {
        "length": 3.0
      }
    },
    {
      "id": "uuid:c97ac36d-9cf3-48ca-bb8f-c36cb335bebf",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:9a1d8124-ca37-4abd-b07e-bff4c8eaa2f9",
          "uuid:3c08ae4e-7b27-4e95-8bfb-6b42451be8f6"
        ]
      },
      "properties": {
        "length": 6.0
      }
    },
    {
      "id": "uuid:af347f25-a547-477c-b246-cb810756d4dc",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:9a1d8124-ca37-4abd-b07e-bff4c8eaa2f9",
          "uuid:caa6045e-4189-4571-8914-1189e51ac71e"
        ]
      },
      "properties": {
        "length": 4.0
      }
    },
    {
      "id": "uuid:21388b1b-dcba-46c0-8166-8ffc9c07e50b",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:caa6045e-4189-4571-8914-1189e51ac71e",
          "uuid:62a26df3-3e19-49bf-9ee4-24dbeb814a70"
        ]
      },
      "properties": {
        "length": 2.0
      }
    },
    {
      "id": "uuid:fc8ba01d-faa7-4407-ae92-32b584c8a6a3",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:1d2a5d01-8547-4de6-abea-8f9ab994d35e",
          "uuid:f34d9f2e-4180-41de-a613-46f78f4c178f"
        ]
      },
      "properties": {
        "length": 2.0
      }
    },
    {
      "id": "uuid:8601e9ea-c48f-4c00-a066-f950ed6b0724",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:caa6045e-4189-4571-8914-1189e51ac71e",
          "uuid:1d2a5d01-8547-4de6-abea-8f9ab994d35e"
        ]
      },
      "properties": {
        "length": 3.0
      }
    },
    {
      "id": "uuid:242a8400-a076-4817-86c6-acd56087cec6",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:1d2a5d01-8547-4de6-abea-8f9ab994d35e",
          "uuid:b8412dad-b40a-4e35-9f42-f983e0fce39d"
        ]
      },
      "properties": {
        "length": 4.0
      }
    },
    {
      "id": "uuid:4ad210b7-5de5-4732-af7c-978de28f988b",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:ff685e16-64f8-4f41-8a9e-7d8e83312fd6",
          "uuid:92bd9ed9-c138-45c3-b72c-a9ecb7f7cfe9"
        ]
      },
      "properties": {
        "length": 8.0
      }
    },
    {
      "id": "uuid:c12882ea-089f-4616-942c-ceb8fb4ac05e",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:92bd9ed9-c138-45c3-b72c-a9ecb7f7cfe9",
          "uuid:c060c1dc-6544-4595-b583-72ecf603fd6d"
        ]
      },
      "properties": {
        "length": 3.0
      }
    },
    {
      "id": "uuid:4406e3f5-89dc-463b-84e4-487490f71f1a",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:c060c1dc-6544-4595-b583-72ecf603fd6d",
          "uuid:7fe8cb9b-976e-4344-bf72-f3721d878ba4"
        ]
      },
      "properties": {
        "length": 8.0
      }
    },
    {
      "id": "uuid:511c6e7d-728b-4f1f-9763-9461eb628586",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:7fe8cb9b-976e-4344-bf72-f3721d878ba4",
          "uuid:ff685e16-64f8-4f41-8a9e-7d8e83312fd6"
        ]
      },
      "properties": {
        "length": 3.0
      }
    },
    {
      "id": "uuid:79205d80-72e5-4bd8-9c03-9503e4e690cc",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:92bd9ed9-c138-45c3-b72c-a9ecb7f7cfe9",
          "uuid:20d3c864-4a8c-4440-b600-a1d424e92f51"
        ]
      },
      "properties": {
        "length": 10.0
      }
    },
    {
      "id": "uuid:06babc8d-f0d6-43eb-bfad-931055bae084",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:20d3c864-4a8c-4440-b600-a1d424e92f51",
          "uuid:2b34e214-cba7-4a66-8443-ceb932c5ef09"
        ]
      },
      "properties": {
        "length": 3.0
      }
    },
    {
      "id": "uuid:fc877bbe-72a8-4e59-b959-010e6660984a",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:2b34e214-cba7-4a66-8443-ceb932c5ef09",
          "uuid:c060c1dc-6544-4595-b583-72ecf603fd6d"
        ]
      },
      "properties": {
        "length": 10.0
      }
    },
    {
      "id": "uuid:aafd209b-cd13-401a-83f5-26751a02cffe",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:20d3c864-4a8c-4440-b600-a1d424e92f51",
          "uuid:16c35df5-bc63-4edd-8da5-dbcc5548a61e"
        ]
      },
      "properties": {
        "length": 10.0
      }
    },
    {
      "id": "uuid:2f3bbe39-01e3-4c96-8dea-377e38729a03",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:16c35df5-bc63-4edd-8da5-dbcc5548a61e",
          "uuid:22138e52-65ef-4773-b69d-5ea2628fad7b"
        ]
      },
      "properties": {
        "length": 3.0
      }
    },
    {
      "id": "uuid:9238cbda-d019-4b57-8319-0cc355656802",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:ad6d8fcc-402c-482e-8f1a-7492ccaead38",
          "uuid:2b34e214-cba7-4a66-8443-ceb932c5ef09"
        ]
      },
      "properties": {
        "length": 2.0
      }
    },
    {
      "id": "uuid:91cdc345-f745-4643-bc88-a24f8e2216b0",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:a0ec1bfd-0f7a-4c42-bc71-bacdcd44071d",
          "uuid:7fe8cb9b-976e-4344-bf72-f3721d878ba4"
        ]
      },
      "properties": {
        "length": 2.0
      }
    },
    {
      "id": "uuid:fe0704c2-5d2a-49a8-b507-e98c4047d8c4",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:206806a4-a2f8-4c04-858e-99d289858a40",
          "uuid:ff685e16-64f8-4f41-8a9e-7d8e83312fd6"
        ]
      },
      "properties": {
        "length": 6.0
      }
    },
    {
      "id": "uuid:651bb558-f6d6-439f-a8e0-dd5c3385dc94",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:d8d136c6-604c-4ad3-adf7-b0a7e04d034a",
          "uuid:206806a4-a2f8-4c04-858e-99d289858a40"
        ]
      },
      "properties": {
        "length": 2.0
      }
    },
    {
      "id": "uuid:61f99921-a94d-4e0d-8353-f027d76227c5",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:16c35df5-bc63-4edd-8da5-dbcc5548a61e",
          "uuid:d8d136c6-604c-4ad3-adf7-b0a7e04d034a"
        ]
      },
      "properties": {
        "length": 4.0
      }
    },
    {
      "id": "uuid:474fef44-eb6e-4e19-a871-433f9bac5650",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:f34d9f2e-4180-41de-a613-46f78f4c178f",
          "uuid:d8d136c6-604c-4ad3-adf7-b0a7e04d034a"
        ]
      },
      "properties": {
        "length": 3.0
      }
    },
    {
      "id": "uuid:736411fb-67f0-47c0-bf77-bf4f9048bcda",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:87373f95-ee4b-4471-9980-f4a8258ee1e3",
          "uuid:206806a4-a2f8-4c04-858e-99d289858a40"
        ]
      },
      "properties": {
        "length": 3.0
      }
    },
    {
      "id": "uuid:3fef75ce-8c4c-4d89-a47f-65977debaee0",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:b6d10150-f9d4-4f7e-b028-c4bbee8e7717",
          "uuid:a3b19f96-9bca-4c31-ac7e-4cb1615878df"
        ]
      },
      "properties": {
        "length": 8.0
      }
    },
    {
      "id": "uuid:48b52144-aaa0-42a1-8e7a-40bebfcf9985",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:a3b19f96-9bca-4c31-ac7e-4cb1615878df",
          "uuid:793997c5-bcc4-4610-984b-6cf2c2997348"
        ]
      },
      "properties": {
        "length": 3.0
      }
    },
    {
      "id": "uuid:71af0dde-7fc9-4290-9624-119e91f422ea",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:793997c5-bcc4-4610-984b-6cf2c2997348",
          "uuid:8e503e04-ad51-423b-8102-708a845189b6"
        ]
      },
      "properties": {
        "length": 8.0
      }
    },
    {
      "id": "uuid:ad13a84c-df97-4b75-9dc1-1ce452249964",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:8e503e04-ad51-423b-8102-708a845189b6",
          "uuid:b6d10150-f9d4-4f7e-b028-c4bbee8e7717"
        ]
      },
      "properties": {
        "length": 3.0
      }
    },
    {
      "id": "uuid:c2a00070-f12b-42f9-b78c-b33daa500873",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:ca62577e-8e24-4af2-88bf-33b34e25e606",
          "uuid:b6d10150-f9d4-4f7e-b028-c4bbee8e7717"
        ]
      },
      "properties": {
        "length": 10.0
      }
    },
    {
      "id": "uuid:13dd8184-f73e-4d9f-9977-3e573274fccc",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:8e503e04-ad51-423b-8102-708a845189b6",
          "uuid:8cda5c68-9c82-43b4-84d7-979efa36dfe1"
        ]
      },
      "properties": {
        "length": 10.0
      }
    },
    {
      "id": "uuid:7355081e-9fa3-4fb5-ab10-c4efaa41d61f",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:ca62577e-8e24-4af2-88bf-33b34e25e606",
          "uuid:8cda5c68-9c82-43b4-84d7-979efa36dfe1"
        ]
      },
      "properties": {
        "length": 3.0
      }
    },
    {
      "id": "uuid:ed666061-98c5-439d-ab0d-5a792437a873",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:16c35df5-bc63-4edd-8da5-dbcc5548a61e",
          "uuid:ca62577e-8e24-4af2-88bf-33b34e25e606"
        ]
      },
      "properties": {
        "length": 10.0
      }
    },
    {
      "id": "uuid:5a36c75b-053b-4d7b-b512-6777786d6180",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:8cda5c68-9c82-43b4-84d7-979efa36dfe1",
          "uuid:e7300a01-f8c1-4351-9511-02790a5376b0"
        ]
      },
      "properties": {
        "length": 2.0
      }
    },
    {
      "id": "uuid:b4c7d3ff-cf1f-40c1-8ea0-2cd2c09cc0e0",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:793997c5-bcc4-4610-984b-6cf2c2997348",
          "uuid:b8412dad-b40a-4e35-9f42-f983e0fce39d"
        ]
      },
      "properties": {
        "length": 2.0
      }
    },
    {
      "id": "uuid:36b10bf3-9e3a-49cb-9dc5-7e31ade26d17",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:9ef3d2ea-acea-4365-8bd5-2f8ef3036ed0",
          "uuid:d8d136c6-604c-4ad3-adf7-b0a7e04d034a"
        ]
      },
      "properties": {
        "length": 2.0
      }
    },
    {
      "id": "uuid:ec374b67-eb42-4c53-b5cc-0f919edb2635",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:a3b19f96-9bca-4c31-ac7e-4cb1615878df",
          "uuid:9ef3d2ea-acea-4365-8bd5-2f8ef3036ed0"
        ]
      },
      "properties": {
        "length": 6.0
      }
    },
    {
      "id": "uuid:f0249395-1d12-42d1-bdaf-08c5cc29b2d4",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:9ef3d2ea-acea-4365-8bd5-2f8ef3036ed0",
          "uuid:1d2a5d01-8547-4de6-abea-8f9ab994d35e"
        ]
      },
      "properties": {
        "length": 3.0
      }
    },
    {
      "id": "uuid:a604828d-a36b-4fac-ba6f-6160ade95301",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:a3b19f96-9bca-4c31-ac7e-4cb1615878df",
          "uuid:ff685e16-64f8-4f41-8a9e-7d8e83312fd6"
        ]
      },
      "properties": {
        "length": 4.0
      }
    },
    {
      "id": "uuid:508f66b5-e0cb-489c-ae24-21bfb7c09280",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:7fe8cb9b-976e-4344-bf72-f3721d878ba4",
          "uuid:793997c5-bcc4-4610-984b-6cf2c2997348"
        ]
      },
      "properties": {
        "length": 4.0
      }
    },
    {
      "id": "uuid:38499704-81f7-4d47-965f-435e0b7b0850",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:b8412dad-b40a-4e35-9f42-f983e0fce39d",
          "uuid:a0ec1bfd-0f7a-4c42-bc71-bacdcd44071d"
        ]
      },
      "properties": {
        "length": 4.0
      }
    },
    {
      "id": "uuid:b6e30631-9768-4020-8947-c32137328216",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:9a1d8124-ca37-4abd-b07e-bff4c8eaa2f9",
          "uuid:11caaac5-b631-4bd8-a6af-f82cb6371071"
        ]
      },
      "properties": {
        "length": 4.0
      }
    },
    {
      "id": "uuid:90e3950e-40b2-4d9d-a135-1a4b708305aa",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:1d2a5d01-8547-4de6-abea-8f9ab994d35e",
          "uuid:87373f95-ee4b-4471-9980-f4a8258ee1e3"
        ]
      },
      "properties": {
        "length": 4.0
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
    },
    {
      "id": "uuid:4a294022-4864-49c7-8cee-f9e43360bc4e",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:32e82eb1-93a4-4387-8cd0-9616ebf1e39b",
                "orientation": "+"
              },
              {
                "ref": "uuid:83ff2cdf-6c58-4e7b-ba55-e084eff8c569",
                "orientation": "-"
              },
              {
                "ref": "uuid:8582d9c2-6053-495a-8413-f5493691c0de",
                "orientation": "+"
              },
              {
                "ref": "uuid:120defbd-2e05-4ec3-ba3c-ffee086d2add",
                "orientation": "+"
              }
            ]
          }
        ]
      },
      "properties": {
        "normal": [
          0.0,
          -1.0,
          3.007964248051e-16
        ],
        "area": 18.0
      }
    }
  ]
}
```

#### jsonld
```jsonld
{
  "@context": "https://surroundaustralia.github.io/topo-feature/build/annotated/geo/topo/features/topo-feature-multi-collection/context.jsonld",
  "type": "FeatureCollection",
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
    },
    {
      "id": "uuid:a0ec1bfd-0f7a-4c42-bc71-bacdcd44071d",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          12.0,
          2.0,
          3.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:11caaac5-b631-4bd8-a6af-f82cb6371071",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          12.0,
          2.0,
          6.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:5e08b82a-8efb-447c-b5c2-54f8ff5788b3",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          10.0,
          10.0,
          6.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:22138e52-65ef-4773-b69d-5ea2628fad7b",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          10.0,
          10.0,
          3.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:62a26df3-3e19-49bf-9ee4-24dbeb814a70",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          10.0,
          6.0,
          6.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:8087116e-84cc-44d1-8047-78dc3837d7e8",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          12.0,
          6.0,
          6.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:f34d9f2e-4180-41de-a613-46f78f4c178f",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          10.0,
          6.0,
          3.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:87373f95-ee4b-4471-9980-f4a8258ee1e3",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          12.0,
          6.0,
          3.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:e7300a01-f8c1-4351-9511-02790a5376b0",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          2.0,
          10.0,
          3.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:1e20237c-9dfa-4251-9f3f-cc5e56a5becd",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          2.0,
          10.0,
          6.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:307b7db6-8014-4628-b80e-ff925bf71168",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          2.0,
          2.0,
          3.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:3c08ae4e-7b27-4e95-8bfb-6b42451be8f6",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          2.0,
          2.0,
          6.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:b8412dad-b40a-4e35-9f42-f983e0fce39d",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          8.0,
          2.0,
          3.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:9a1d8124-ca37-4abd-b07e-bff4c8eaa2f9",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          8.0,
          2.0,
          6.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:caa6045e-4189-4571-8914-1189e51ac71e",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          8.0,
          6.0,
          6.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:1d2a5d01-8547-4de6-abea-8f9ab994d35e",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          8.0,
          6.0,
          3.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:ff685e16-64f8-4f41-8a9e-7d8e83312fd6",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          12.0,
          0.0,
          0.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:92bd9ed9-c138-45c3-b72c-a9ecb7f7cfe9",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          20.0,
          0.0,
          0.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:c060c1dc-6544-4595-b583-72ecf603fd6d",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          20.0,
          0.0,
          3.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:7fe8cb9b-976e-4344-bf72-f3721d878ba4",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          12.0,
          0.0,
          3.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:20d3c864-4a8c-4440-b600-a1d424e92f51",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          20.0,
          10.0,
          0.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:2b34e214-cba7-4a66-8443-ceb932c5ef09",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          20.0,
          10.0,
          3.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:16c35df5-bc63-4edd-8da5-dbcc5548a61e",
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
      "id": "uuid:206806a4-a2f8-4c04-858e-99d289858a40",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          12.0,
          6.0,
          0.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:d8d136c6-604c-4ad3-adf7-b0a7e04d034a",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          10.0,
          6.0,
          0.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:b6d10150-f9d4-4f7e-b028-c4bbee8e7717",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          0.0,
          0.0,
          0.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:a3b19f96-9bca-4c31-ac7e-4cb1615878df",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          8.0,
          0.0,
          0.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:793997c5-bcc4-4610-984b-6cf2c2997348",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          8.0,
          0.0,
          3.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:8e503e04-ad51-423b-8102-708a845189b6",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          0.0,
          0.0,
          3.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:ca62577e-8e24-4af2-88bf-33b34e25e606",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          0.0,
          10.0,
          0.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:8cda5c68-9c82-43b4-84d7-979efa36dfe1",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          0.0,
          10.0,
          3.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:9ef3d2ea-acea-4365-8bd5-2f8ef3036ed0",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          8.0,
          6.0,
          0.0
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
    },
    {
      "id": "uuid:32e82eb1-93a4-4387-8cd0-9616ebf1e39b",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:a0ec1bfd-0f7a-4c42-bc71-bacdcd44071d",
          "uuid:fad324b9-801f-40f4-b65b-91f8753e9698"
        ]
      },
      "properties": {
        "length": 6.0
      }
    },
    {
      "id": "uuid:8582d9c2-6053-495a-8413-f5493691c0de",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:c611f840-2829-44b2-b367-3915ca7875a4",
          "uuid:11caaac5-b631-4bd8-a6af-f82cb6371071"
        ]
      },
      "properties": {
        "length": 6.0
      }
    },
    {
      "id": "uuid:120defbd-2e05-4ec3-ba3c-ffee086d2add",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:11caaac5-b631-4bd8-a6af-f82cb6371071",
          "uuid:a0ec1bfd-0f7a-4c42-bc71-bacdcd44071d"
        ]
      },
      "properties": {
        "length": 3.0
      }
    },
    {
      "id": "uuid:4c2a6434-03b0-4aa2-85ea-a9fcaea41555",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:5e08b82a-8efb-447c-b5c2-54f8ff5788b3",
          "uuid:8d2be28b-8f31-46de-99cb-4d8709502cd0"
        ]
      },
      "properties": {
        "length": 8.0
      }
    },
    {
      "id": "uuid:830b9098-d914-4e8b-869d-4d20f1eb5c81",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:ad6d8fcc-402c-482e-8f1a-7492ccaead38",
          "uuid:22138e52-65ef-4773-b69d-5ea2628fad7b"
        ]
      },
      "properties": {
        "length": 8.0
      }
    },
    {
      "id": "uuid:3b72e45d-d351-46e4-a5b7-9ac9bc339d03",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:22138e52-65ef-4773-b69d-5ea2628fad7b",
          "uuid:5e08b82a-8efb-447c-b5c2-54f8ff5788b3"
        ]
      },
      "properties": {
        "length": 3.0
      }
    },
    {
      "id": "uuid:921e2351-efbf-48be-85d3-eedc0dc2ddc0",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:5e08b82a-8efb-447c-b5c2-54f8ff5788b3",
          "uuid:62a26df3-3e19-49bf-9ee4-24dbeb814a70"
        ]
      },
      "properties": {
        "length": 4.0
      }
    },
    {
      "id": "uuid:73f88b47-78ab-474d-9c62-73dfefd0dd5d",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:62a26df3-3e19-49bf-9ee4-24dbeb814a70",
          "uuid:8087116e-84cc-44d1-8047-78dc3837d7e8"
        ]
      },
      "properties": {
        "length": 2.0
      }
    },
    {
      "id": "uuid:7aa2a76d-9d5c-4540-9f2e-d8bcf36fadb5",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:8087116e-84cc-44d1-8047-78dc3837d7e8",
          "uuid:11caaac5-b631-4bd8-a6af-f82cb6371071"
        ]
      },
      "properties": {
        "length": 4.0
      }
    },
    {
      "id": "uuid:ed6b8b1c-7030-4d70-ab61-94cb3aa904a7",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:22138e52-65ef-4773-b69d-5ea2628fad7b",
          "uuid:f34d9f2e-4180-41de-a613-46f78f4c178f"
        ]
      },
      "properties": {
        "length": 4.0
      }
    },
    {
      "id": "uuid:5f17e211-e8b5-4a7c-85e4-798787fd82a5",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:f34d9f2e-4180-41de-a613-46f78f4c178f",
          "uuid:62a26df3-3e19-49bf-9ee4-24dbeb814a70"
        ]
      },
      "properties": {
        "length": 3.0
      }
    },
    {
      "id": "uuid:7da1c2fe-f798-43cc-af44-ac63f968139c",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:f34d9f2e-4180-41de-a613-46f78f4c178f",
          "uuid:87373f95-ee4b-4471-9980-f4a8258ee1e3"
        ]
      },
      "properties": {
        "length": 2.0
      }
    },
    {
      "id": "uuid:46fd1def-a93e-4c99-9868-172cf1b40ff1",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:87373f95-ee4b-4471-9980-f4a8258ee1e3",
          "uuid:8087116e-84cc-44d1-8047-78dc3837d7e8"
        ]
      },
      "properties": {
        "length": 3.0
      }
    },
    {
      "id": "uuid:856e43bc-ee35-44d0-b25e-ea94a53e1db6",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:a0ec1bfd-0f7a-4c42-bc71-bacdcd44071d",
          "uuid:87373f95-ee4b-4471-9980-f4a8258ee1e3"
        ]
      },
      "properties": {
        "length": 4.0
      }
    },
    {
      "id": "uuid:a5ed4867-4011-4db7-8425-cbe61a6d3a2d",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:22138e52-65ef-4773-b69d-5ea2628fad7b",
          "uuid:e7300a01-f8c1-4351-9511-02790a5376b0"
        ]
      },
      "properties": {
        "length": 8.0
      }
    },
    {
      "id": "uuid:745aa367-94b6-4949-a856-5271ec6672e9",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:e7300a01-f8c1-4351-9511-02790a5376b0",
          "uuid:1e20237c-9dfa-4251-9f3f-cc5e56a5becd"
        ]
      },
      "properties": {
        "length": 3.0
      }
    },
    {
      "id": "uuid:f921656a-58e3-4375-bdff-ac8019f524cf",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:1e20237c-9dfa-4251-9f3f-cc5e56a5becd",
          "uuid:5e08b82a-8efb-447c-b5c2-54f8ff5788b3"
        ]
      },
      "properties": {
        "length": 8.0
      }
    },
    {
      "id": "uuid:6aab9ba2-327e-40df-96c2-0ea43c538c24",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:e7300a01-f8c1-4351-9511-02790a5376b0",
          "uuid:307b7db6-8014-4628-b80e-ff925bf71168"
        ]
      },
      "properties": {
        "length": 8.0
      }
    },
    {
      "id": "uuid:fb28f3f2-8ea7-4c03-bff5-7352addba8b3",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:3c08ae4e-7b27-4e95-8bfb-6b42451be8f6",
          "uuid:307b7db6-8014-4628-b80e-ff925bf71168"
        ]
      },
      "properties": {
        "length": 3.0
      }
    },
    {
      "id": "uuid:e0416983-f0db-4c99-8a72-3f8b4615ab05",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:3c08ae4e-7b27-4e95-8bfb-6b42451be8f6",
          "uuid:1e20237c-9dfa-4251-9f3f-cc5e56a5becd"
        ]
      },
      "properties": {
        "length": 8.0
      }
    },
    {
      "id": "uuid:07093c51-5d4e-42ad-941f-8eeb89e5ae78",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:307b7db6-8014-4628-b80e-ff925bf71168",
          "uuid:b8412dad-b40a-4e35-9f42-f983e0fce39d"
        ]
      },
      "properties": {
        "length": 6.0
      }
    },
    {
      "id": "uuid:fb03276b-4250-4d52-81e1-035a0bd92895",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:b8412dad-b40a-4e35-9f42-f983e0fce39d",
          "uuid:9a1d8124-ca37-4abd-b07e-bff4c8eaa2f9"
        ]
      },
      "properties": {
        "length": 3.0
      }
    },
    {
      "id": "uuid:c97ac36d-9cf3-48ca-bb8f-c36cb335bebf",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:9a1d8124-ca37-4abd-b07e-bff4c8eaa2f9",
          "uuid:3c08ae4e-7b27-4e95-8bfb-6b42451be8f6"
        ]
      },
      "properties": {
        "length": 6.0
      }
    },
    {
      "id": "uuid:af347f25-a547-477c-b246-cb810756d4dc",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:9a1d8124-ca37-4abd-b07e-bff4c8eaa2f9",
          "uuid:caa6045e-4189-4571-8914-1189e51ac71e"
        ]
      },
      "properties": {
        "length": 4.0
      }
    },
    {
      "id": "uuid:21388b1b-dcba-46c0-8166-8ffc9c07e50b",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:caa6045e-4189-4571-8914-1189e51ac71e",
          "uuid:62a26df3-3e19-49bf-9ee4-24dbeb814a70"
        ]
      },
      "properties": {
        "length": 2.0
      }
    },
    {
      "id": "uuid:fc8ba01d-faa7-4407-ae92-32b584c8a6a3",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:1d2a5d01-8547-4de6-abea-8f9ab994d35e",
          "uuid:f34d9f2e-4180-41de-a613-46f78f4c178f"
        ]
      },
      "properties": {
        "length": 2.0
      }
    },
    {
      "id": "uuid:8601e9ea-c48f-4c00-a066-f950ed6b0724",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:caa6045e-4189-4571-8914-1189e51ac71e",
          "uuid:1d2a5d01-8547-4de6-abea-8f9ab994d35e"
        ]
      },
      "properties": {
        "length": 3.0
      }
    },
    {
      "id": "uuid:242a8400-a076-4817-86c6-acd56087cec6",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:1d2a5d01-8547-4de6-abea-8f9ab994d35e",
          "uuid:b8412dad-b40a-4e35-9f42-f983e0fce39d"
        ]
      },
      "properties": {
        "length": 4.0
      }
    },
    {
      "id": "uuid:4ad210b7-5de5-4732-af7c-978de28f988b",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:ff685e16-64f8-4f41-8a9e-7d8e83312fd6",
          "uuid:92bd9ed9-c138-45c3-b72c-a9ecb7f7cfe9"
        ]
      },
      "properties": {
        "length": 8.0
      }
    },
    {
      "id": "uuid:c12882ea-089f-4616-942c-ceb8fb4ac05e",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:92bd9ed9-c138-45c3-b72c-a9ecb7f7cfe9",
          "uuid:c060c1dc-6544-4595-b583-72ecf603fd6d"
        ]
      },
      "properties": {
        "length": 3.0
      }
    },
    {
      "id": "uuid:4406e3f5-89dc-463b-84e4-487490f71f1a",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:c060c1dc-6544-4595-b583-72ecf603fd6d",
          "uuid:7fe8cb9b-976e-4344-bf72-f3721d878ba4"
        ]
      },
      "properties": {
        "length": 8.0
      }
    },
    {
      "id": "uuid:511c6e7d-728b-4f1f-9763-9461eb628586",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:7fe8cb9b-976e-4344-bf72-f3721d878ba4",
          "uuid:ff685e16-64f8-4f41-8a9e-7d8e83312fd6"
        ]
      },
      "properties": {
        "length": 3.0
      }
    },
    {
      "id": "uuid:79205d80-72e5-4bd8-9c03-9503e4e690cc",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:92bd9ed9-c138-45c3-b72c-a9ecb7f7cfe9",
          "uuid:20d3c864-4a8c-4440-b600-a1d424e92f51"
        ]
      },
      "properties": {
        "length": 10.0
      }
    },
    {
      "id": "uuid:06babc8d-f0d6-43eb-bfad-931055bae084",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:20d3c864-4a8c-4440-b600-a1d424e92f51",
          "uuid:2b34e214-cba7-4a66-8443-ceb932c5ef09"
        ]
      },
      "properties": {
        "length": 3.0
      }
    },
    {
      "id": "uuid:fc877bbe-72a8-4e59-b959-010e6660984a",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:2b34e214-cba7-4a66-8443-ceb932c5ef09",
          "uuid:c060c1dc-6544-4595-b583-72ecf603fd6d"
        ]
      },
      "properties": {
        "length": 10.0
      }
    },
    {
      "id": "uuid:aafd209b-cd13-401a-83f5-26751a02cffe",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:20d3c864-4a8c-4440-b600-a1d424e92f51",
          "uuid:16c35df5-bc63-4edd-8da5-dbcc5548a61e"
        ]
      },
      "properties": {
        "length": 10.0
      }
    },
    {
      "id": "uuid:2f3bbe39-01e3-4c96-8dea-377e38729a03",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:16c35df5-bc63-4edd-8da5-dbcc5548a61e",
          "uuid:22138e52-65ef-4773-b69d-5ea2628fad7b"
        ]
      },
      "properties": {
        "length": 3.0
      }
    },
    {
      "id": "uuid:9238cbda-d019-4b57-8319-0cc355656802",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:ad6d8fcc-402c-482e-8f1a-7492ccaead38",
          "uuid:2b34e214-cba7-4a66-8443-ceb932c5ef09"
        ]
      },
      "properties": {
        "length": 2.0
      }
    },
    {
      "id": "uuid:91cdc345-f745-4643-bc88-a24f8e2216b0",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:a0ec1bfd-0f7a-4c42-bc71-bacdcd44071d",
          "uuid:7fe8cb9b-976e-4344-bf72-f3721d878ba4"
        ]
      },
      "properties": {
        "length": 2.0
      }
    },
    {
      "id": "uuid:fe0704c2-5d2a-49a8-b507-e98c4047d8c4",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:206806a4-a2f8-4c04-858e-99d289858a40",
          "uuid:ff685e16-64f8-4f41-8a9e-7d8e83312fd6"
        ]
      },
      "properties": {
        "length": 6.0
      }
    },
    {
      "id": "uuid:651bb558-f6d6-439f-a8e0-dd5c3385dc94",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:d8d136c6-604c-4ad3-adf7-b0a7e04d034a",
          "uuid:206806a4-a2f8-4c04-858e-99d289858a40"
        ]
      },
      "properties": {
        "length": 2.0
      }
    },
    {
      "id": "uuid:61f99921-a94d-4e0d-8353-f027d76227c5",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:16c35df5-bc63-4edd-8da5-dbcc5548a61e",
          "uuid:d8d136c6-604c-4ad3-adf7-b0a7e04d034a"
        ]
      },
      "properties": {
        "length": 4.0
      }
    },
    {
      "id": "uuid:474fef44-eb6e-4e19-a871-433f9bac5650",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:f34d9f2e-4180-41de-a613-46f78f4c178f",
          "uuid:d8d136c6-604c-4ad3-adf7-b0a7e04d034a"
        ]
      },
      "properties": {
        "length": 3.0
      }
    },
    {
      "id": "uuid:736411fb-67f0-47c0-bf77-bf4f9048bcda",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:87373f95-ee4b-4471-9980-f4a8258ee1e3",
          "uuid:206806a4-a2f8-4c04-858e-99d289858a40"
        ]
      },
      "properties": {
        "length": 3.0
      }
    },
    {
      "id": "uuid:3fef75ce-8c4c-4d89-a47f-65977debaee0",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:b6d10150-f9d4-4f7e-b028-c4bbee8e7717",
          "uuid:a3b19f96-9bca-4c31-ac7e-4cb1615878df"
        ]
      },
      "properties": {
        "length": 8.0
      }
    },
    {
      "id": "uuid:48b52144-aaa0-42a1-8e7a-40bebfcf9985",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:a3b19f96-9bca-4c31-ac7e-4cb1615878df",
          "uuid:793997c5-bcc4-4610-984b-6cf2c2997348"
        ]
      },
      "properties": {
        "length": 3.0
      }
    },
    {
      "id": "uuid:71af0dde-7fc9-4290-9624-119e91f422ea",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:793997c5-bcc4-4610-984b-6cf2c2997348",
          "uuid:8e503e04-ad51-423b-8102-708a845189b6"
        ]
      },
      "properties": {
        "length": 8.0
      }
    },
    {
      "id": "uuid:ad13a84c-df97-4b75-9dc1-1ce452249964",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:8e503e04-ad51-423b-8102-708a845189b6",
          "uuid:b6d10150-f9d4-4f7e-b028-c4bbee8e7717"
        ]
      },
      "properties": {
        "length": 3.0
      }
    },
    {
      "id": "uuid:c2a00070-f12b-42f9-b78c-b33daa500873",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:ca62577e-8e24-4af2-88bf-33b34e25e606",
          "uuid:b6d10150-f9d4-4f7e-b028-c4bbee8e7717"
        ]
      },
      "properties": {
        "length": 10.0
      }
    },
    {
      "id": "uuid:13dd8184-f73e-4d9f-9977-3e573274fccc",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:8e503e04-ad51-423b-8102-708a845189b6",
          "uuid:8cda5c68-9c82-43b4-84d7-979efa36dfe1"
        ]
      },
      "properties": {
        "length": 10.0
      }
    },
    {
      "id": "uuid:7355081e-9fa3-4fb5-ab10-c4efaa41d61f",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:ca62577e-8e24-4af2-88bf-33b34e25e606",
          "uuid:8cda5c68-9c82-43b4-84d7-979efa36dfe1"
        ]
      },
      "properties": {
        "length": 3.0
      }
    },
    {
      "id": "uuid:ed666061-98c5-439d-ab0d-5a792437a873",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:16c35df5-bc63-4edd-8da5-dbcc5548a61e",
          "uuid:ca62577e-8e24-4af2-88bf-33b34e25e606"
        ]
      },
      "properties": {
        "length": 10.0
      }
    },
    {
      "id": "uuid:5a36c75b-053b-4d7b-b512-6777786d6180",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:8cda5c68-9c82-43b4-84d7-979efa36dfe1",
          "uuid:e7300a01-f8c1-4351-9511-02790a5376b0"
        ]
      },
      "properties": {
        "length": 2.0
      }
    },
    {
      "id": "uuid:b4c7d3ff-cf1f-40c1-8ea0-2cd2c09cc0e0",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:793997c5-bcc4-4610-984b-6cf2c2997348",
          "uuid:b8412dad-b40a-4e35-9f42-f983e0fce39d"
        ]
      },
      "properties": {
        "length": 2.0
      }
    },
    {
      "id": "uuid:36b10bf3-9e3a-49cb-9dc5-7e31ade26d17",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:9ef3d2ea-acea-4365-8bd5-2f8ef3036ed0",
          "uuid:d8d136c6-604c-4ad3-adf7-b0a7e04d034a"
        ]
      },
      "properties": {
        "length": 2.0
      }
    },
    {
      "id": "uuid:ec374b67-eb42-4c53-b5cc-0f919edb2635",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:a3b19f96-9bca-4c31-ac7e-4cb1615878df",
          "uuid:9ef3d2ea-acea-4365-8bd5-2f8ef3036ed0"
        ]
      },
      "properties": {
        "length": 6.0
      }
    },
    {
      "id": "uuid:f0249395-1d12-42d1-bdaf-08c5cc29b2d4",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:9ef3d2ea-acea-4365-8bd5-2f8ef3036ed0",
          "uuid:1d2a5d01-8547-4de6-abea-8f9ab994d35e"
        ]
      },
      "properties": {
        "length": 3.0
      }
    },
    {
      "id": "uuid:a604828d-a36b-4fac-ba6f-6160ade95301",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:a3b19f96-9bca-4c31-ac7e-4cb1615878df",
          "uuid:ff685e16-64f8-4f41-8a9e-7d8e83312fd6"
        ]
      },
      "properties": {
        "length": 4.0
      }
    },
    {
      "id": "uuid:508f66b5-e0cb-489c-ae24-21bfb7c09280",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:7fe8cb9b-976e-4344-bf72-f3721d878ba4",
          "uuid:793997c5-bcc4-4610-984b-6cf2c2997348"
        ]
      },
      "properties": {
        "length": 4.0
      }
    },
    {
      "id": "uuid:38499704-81f7-4d47-965f-435e0b7b0850",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:b8412dad-b40a-4e35-9f42-f983e0fce39d",
          "uuid:a0ec1bfd-0f7a-4c42-bc71-bacdcd44071d"
        ]
      },
      "properties": {
        "length": 4.0
      }
    },
    {
      "id": "uuid:b6e30631-9768-4020-8947-c32137328216",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:9a1d8124-ca37-4abd-b07e-bff4c8eaa2f9",
          "uuid:11caaac5-b631-4bd8-a6af-f82cb6371071"
        ]
      },
      "properties": {
        "length": 4.0
      }
    },
    {
      "id": "uuid:90e3950e-40b2-4d9d-a135-1a4b708305aa",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:1d2a5d01-8547-4de6-abea-8f9ab994d35e",
          "uuid:87373f95-ee4b-4471-9980-f4a8258ee1e3"
        ]
      },
      "properties": {
        "length": 4.0
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
    },
    {
      "id": "uuid:4a294022-4864-49c7-8cee-f9e43360bc4e",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:32e82eb1-93a4-4387-8cd0-9616ebf1e39b",
                "orientation": "+"
              },
              {
                "ref": "uuid:83ff2cdf-6c58-4e7b-ba55-e084eff8c569",
                "orientation": "-"
              },
              {
                "ref": "uuid:8582d9c2-6053-495a-8413-f5493691c0de",
                "orientation": "+"
              },
              {
                "ref": "uuid:120defbd-2e05-4ec3-ba3c-ffee086d2add",
                "orientation": "+"
              }
            ]
          }
        ]
      },
      "properties": {
        "normal": [
          0.0,
          -1.0,
          3.007964248051e-16
        ],
        "area": 18.0
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
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

<uuid:06babc8d-f0d6-43eb-bfad-931055bae084> a geojson:Feature ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:20d3c864-4a8c-4440-b600-a1d424e92f51> <uuid:2b34e214-cba7-4a66-8443-ceb932c5ef09> ) ] .

<uuid:07093c51-5d4e-42ad-941f-8eeb89e5ae78> a geojson:Feature ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:307b7db6-8014-4628-b80e-ff925bf71168> <uuid:b8412dad-b40a-4e35-9f42-f983e0fce39d> ) ] .

<uuid:13dd8184-f73e-4d9f-9977-3e573274fccc> a geojson:Feature ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:8e503e04-ad51-423b-8102-708a845189b6> <uuid:8cda5c68-9c82-43b4-84d7-979efa36dfe1> ) ] .

<uuid:21388b1b-dcba-46c0-8166-8ffc9c07e50b> a geojson:Feature ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:caa6045e-4189-4571-8914-1189e51ac71e> <uuid:62a26df3-3e19-49bf-9ee4-24dbeb814a70> ) ] .

<uuid:242a8400-a076-4817-86c6-acd56087cec6> a geojson:Feature ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:1d2a5d01-8547-4de6-abea-8f9ab994d35e> <uuid:b8412dad-b40a-4e35-9f42-f983e0fce39d> ) ] .

<uuid:2f3bbe39-01e3-4c96-8dea-377e38729a03> a geojson:Feature ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:16c35df5-bc63-4edd-8da5-dbcc5548a61e> <uuid:22138e52-65ef-4773-b69d-5ea2628fad7b> ) ] .

<uuid:36b10bf3-9e3a-49cb-9dc5-7e31ade26d17> a geojson:Feature ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:9ef3d2ea-acea-4365-8bd5-2f8ef3036ed0> <uuid:d8d136c6-604c-4ad3-adf7-b0a7e04d034a> ) ] .

<uuid:38499704-81f7-4d47-965f-435e0b7b0850> a geojson:Feature ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:b8412dad-b40a-4e35-9f42-f983e0fce39d> <uuid:a0ec1bfd-0f7a-4c42-bc71-bacdcd44071d> ) ] .

<uuid:3b72e45d-d351-46e4-a5b7-9ac9bc339d03> a geojson:Feature ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:22138e52-65ef-4773-b69d-5ea2628fad7b> <uuid:5e08b82a-8efb-447c-b5c2-54f8ff5788b3> ) ] .

<uuid:3fef75ce-8c4c-4d89-a47f-65977debaee0> a geojson:Feature ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:b6d10150-f9d4-4f7e-b028-c4bbee8e7717> <uuid:a3b19f96-9bca-4c31-ac7e-4cb1615878df> ) ] .

<uuid:4406e3f5-89dc-463b-84e4-487490f71f1a> a geojson:Feature ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:c060c1dc-6544-4595-b583-72ecf603fd6d> <uuid:7fe8cb9b-976e-4344-bf72-f3721d878ba4> ) ] .

<uuid:46fd1def-a93e-4c99-9868-172cf1b40ff1> a geojson:Feature ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:87373f95-ee4b-4471-9980-f4a8258ee1e3> <uuid:8087116e-84cc-44d1-8047-78dc3837d7e8> ) ] .

<uuid:474fef44-eb6e-4e19-a871-433f9bac5650> a geojson:Feature ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:f34d9f2e-4180-41de-a613-46f78f4c178f> <uuid:d8d136c6-604c-4ad3-adf7-b0a7e04d034a> ) ] .

<uuid:48b52144-aaa0-42a1-8e7a-40bebfcf9985> a geojson:Feature ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:a3b19f96-9bca-4c31-ac7e-4cb1615878df> <uuid:793997c5-bcc4-4610-984b-6cf2c2997348> ) ] .

<uuid:4a294022-4864-49c7-8cee-f9e43360bc4e> a geojson:Feature ;
    geojson:topology [ a topo:Face ;
            topo:rings ( [ a topo:Ring ;
                        topo:directedReferences ( <uuid:32e82eb1-93a4-4387-8cd0-9616ebf1e39b> <uuid:83ff2cdf-6c58-4e7b-ba55-e084eff8c569> <uuid:8582d9c2-6053-495a-8413-f5493691c0de> <uuid:120defbd-2e05-4ec3-ba3c-ffee086d2add> ) ] ) ] .

<uuid:4ac3b91b-eeb7-428c-b5e9-7e8a3f0998ae> a geojson:Feature ;
    geojson:topology [ a topo:Face ;
            topo:rings ( [ a topo:Ring ;
                        topo:directedReferences ( <uuid:c60507ba-226b-4e49-a702-e9afef899b23> <uuid:7dc1cc1c-8e7f-4666-9f52-4e6c2e6f57ac> <uuid:83ff2cdf-6c58-4e7b-ba55-e084eff8c569> <uuid:d69c596c-134e-4216-9bf6-d0f10e6886d8> ) ] ) ] .

<uuid:4ad210b7-5de5-4732-af7c-978de28f988b> a geojson:Feature ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:ff685e16-64f8-4f41-8a9e-7d8e83312fd6> <uuid:92bd9ed9-c138-45c3-b72c-a9ecb7f7cfe9> ) ] .

<uuid:4c2a6434-03b0-4aa2-85ea-a9fcaea41555> a geojson:Feature ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:5e08b82a-8efb-447c-b5c2-54f8ff5788b3> <uuid:8d2be28b-8f31-46de-99cb-4d8709502cd0> ) ] .

<uuid:508f66b5-e0cb-489c-ae24-21bfb7c09280> a geojson:Feature ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:7fe8cb9b-976e-4344-bf72-f3721d878ba4> <uuid:793997c5-bcc4-4610-984b-6cf2c2997348> ) ] .

<uuid:511c6e7d-728b-4f1f-9763-9461eb628586> a geojson:Feature ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:7fe8cb9b-976e-4344-bf72-f3721d878ba4> <uuid:ff685e16-64f8-4f41-8a9e-7d8e83312fd6> ) ] .

<uuid:5a36c75b-053b-4d7b-b512-6777786d6180> a geojson:Feature ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:8cda5c68-9c82-43b4-84d7-979efa36dfe1> <uuid:e7300a01-f8c1-4351-9511-02790a5376b0> ) ] .

<uuid:5f17e211-e8b5-4a7c-85e4-798787fd82a5> a geojson:Feature ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:f34d9f2e-4180-41de-a613-46f78f4c178f> <uuid:62a26df3-3e19-49bf-9ee4-24dbeb814a70> ) ] .

<uuid:61f99921-a94d-4e0d-8353-f027d76227c5> a geojson:Feature ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:16c35df5-bc63-4edd-8da5-dbcc5548a61e> <uuid:d8d136c6-604c-4ad3-adf7-b0a7e04d034a> ) ] .

<uuid:651bb558-f6d6-439f-a8e0-dd5c3385dc94> a geojson:Feature ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:d8d136c6-604c-4ad3-adf7-b0a7e04d034a> <uuid:206806a4-a2f8-4c04-858e-99d289858a40> ) ] .

<uuid:6aab9ba2-327e-40df-96c2-0ea43c538c24> a geojson:Feature ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:e7300a01-f8c1-4351-9511-02790a5376b0> <uuid:307b7db6-8014-4628-b80e-ff925bf71168> ) ] .

<uuid:71af0dde-7fc9-4290-9624-119e91f422ea> a geojson:Feature ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:793997c5-bcc4-4610-984b-6cf2c2997348> <uuid:8e503e04-ad51-423b-8102-708a845189b6> ) ] .

<uuid:7355081e-9fa3-4fb5-ab10-c4efaa41d61f> a geojson:Feature ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:ca62577e-8e24-4af2-88bf-33b34e25e606> <uuid:8cda5c68-9c82-43b4-84d7-979efa36dfe1> ) ] .

<uuid:736411fb-67f0-47c0-bf77-bf4f9048bcda> a geojson:Feature ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:87373f95-ee4b-4471-9980-f4a8258ee1e3> <uuid:206806a4-a2f8-4c04-858e-99d289858a40> ) ] .

<uuid:73f88b47-78ab-474d-9c62-73dfefd0dd5d> a geojson:Feature ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:62a26df3-3e19-49bf-9ee4-24dbeb814a70> <uuid:8087116e-84cc-44d1-8047-78dc3837d7e8> ) ] .

<uuid:745aa367-94b6-4949-a856-5271ec6672e9> a geojson:Feature ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:e7300a01-f8c1-4351-9511-02790a5376b0> <uuid:1e20237c-9dfa-4251-9f3f-cc5e56a5becd> ) ] .

<uuid:79205d80-72e5-4bd8-9c03-9503e4e690cc> a geojson:Feature ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:92bd9ed9-c138-45c3-b72c-a9ecb7f7cfe9> <uuid:20d3c864-4a8c-4440-b600-a1d424e92f51> ) ] .

<uuid:7aa2a76d-9d5c-4540-9f2e-d8bcf36fadb5> a geojson:Feature ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:8087116e-84cc-44d1-8047-78dc3837d7e8> <uuid:11caaac5-b631-4bd8-a6af-f82cb6371071> ) ] .

<uuid:7da1c2fe-f798-43cc-af44-ac63f968139c> a geojson:Feature ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:f34d9f2e-4180-41de-a613-46f78f4c178f> <uuid:87373f95-ee4b-4471-9980-f4a8258ee1e3> ) ] .

<uuid:830b9098-d914-4e8b-869d-4d20f1eb5c81> a geojson:Feature ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:ad6d8fcc-402c-482e-8f1a-7492ccaead38> <uuid:22138e52-65ef-4773-b69d-5ea2628fad7b> ) ] .

<uuid:856e43bc-ee35-44d0-b25e-ea94a53e1db6> a geojson:Feature ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:a0ec1bfd-0f7a-4c42-bc71-bacdcd44071d> <uuid:87373f95-ee4b-4471-9980-f4a8258ee1e3> ) ] .

<uuid:8601e9ea-c48f-4c00-a066-f950ed6b0724> a geojson:Feature ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:caa6045e-4189-4571-8914-1189e51ac71e> <uuid:1d2a5d01-8547-4de6-abea-8f9ab994d35e> ) ] .

<uuid:90e3950e-40b2-4d9d-a135-1a4b708305aa> a geojson:Feature ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:1d2a5d01-8547-4de6-abea-8f9ab994d35e> <uuid:87373f95-ee4b-4471-9980-f4a8258ee1e3> ) ] .

<uuid:91cdc345-f745-4643-bc88-a24f8e2216b0> a geojson:Feature ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:a0ec1bfd-0f7a-4c42-bc71-bacdcd44071d> <uuid:7fe8cb9b-976e-4344-bf72-f3721d878ba4> ) ] .

<uuid:921e2351-efbf-48be-85d3-eedc0dc2ddc0> a geojson:Feature ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:5e08b82a-8efb-447c-b5c2-54f8ff5788b3> <uuid:62a26df3-3e19-49bf-9ee4-24dbeb814a70> ) ] .

<uuid:9238cbda-d019-4b57-8319-0cc355656802> a geojson:Feature ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:ad6d8fcc-402c-482e-8f1a-7492ccaead38> <uuid:2b34e214-cba7-4a66-8443-ceb932c5ef09> ) ] .

<uuid:a5ed4867-4011-4db7-8425-cbe61a6d3a2d> a geojson:Feature ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:22138e52-65ef-4773-b69d-5ea2628fad7b> <uuid:e7300a01-f8c1-4351-9511-02790a5376b0> ) ] .

<uuid:a604828d-a36b-4fac-ba6f-6160ade95301> a geojson:Feature ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:a3b19f96-9bca-4c31-ac7e-4cb1615878df> <uuid:ff685e16-64f8-4f41-8a9e-7d8e83312fd6> ) ] .

<uuid:aafd209b-cd13-401a-83f5-26751a02cffe> a geojson:Feature ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:20d3c864-4a8c-4440-b600-a1d424e92f51> <uuid:16c35df5-bc63-4edd-8da5-dbcc5548a61e> ) ] .

<uuid:ad13a84c-df97-4b75-9dc1-1ce452249964> a geojson:Feature ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:8e503e04-ad51-423b-8102-708a845189b6> <uuid:b6d10150-f9d4-4f7e-b028-c4bbee8e7717> ) ] .

<uuid:af347f25-a547-477c-b246-cb810756d4dc> a geojson:Feature ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:9a1d8124-ca37-4abd-b07e-bff4c8eaa2f9> <uuid:caa6045e-4189-4571-8914-1189e51ac71e> ) ] .

<uuid:b4c7d3ff-cf1f-40c1-8ea0-2cd2c09cc0e0> a geojson:Feature ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:793997c5-bcc4-4610-984b-6cf2c2997348> <uuid:b8412dad-b40a-4e35-9f42-f983e0fce39d> ) ] .

<uuid:b6e30631-9768-4020-8947-c32137328216> a geojson:Feature ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:9a1d8124-ca37-4abd-b07e-bff4c8eaa2f9> <uuid:11caaac5-b631-4bd8-a6af-f82cb6371071> ) ] .

<uuid:c12882ea-089f-4616-942c-ceb8fb4ac05e> a geojson:Feature ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:92bd9ed9-c138-45c3-b72c-a9ecb7f7cfe9> <uuid:c060c1dc-6544-4595-b583-72ecf603fd6d> ) ] .

<uuid:c2a00070-f12b-42f9-b78c-b33daa500873> a geojson:Feature ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:ca62577e-8e24-4af2-88bf-33b34e25e606> <uuid:b6d10150-f9d4-4f7e-b028-c4bbee8e7717> ) ] .

<uuid:c97ac36d-9cf3-48ca-bb8f-c36cb335bebf> a geojson:Feature ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:9a1d8124-ca37-4abd-b07e-bff4c8eaa2f9> <uuid:3c08ae4e-7b27-4e95-8bfb-6b42451be8f6> ) ] .

<uuid:e0416983-f0db-4c99-8a72-3f8b4615ab05> a geojson:Feature ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:3c08ae4e-7b27-4e95-8bfb-6b42451be8f6> <uuid:1e20237c-9dfa-4251-9f3f-cc5e56a5becd> ) ] .

<uuid:ec374b67-eb42-4c53-b5cc-0f919edb2635> a geojson:Feature ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:a3b19f96-9bca-4c31-ac7e-4cb1615878df> <uuid:9ef3d2ea-acea-4365-8bd5-2f8ef3036ed0> ) ] .

<uuid:ed666061-98c5-439d-ab0d-5a792437a873> a geojson:Feature ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:16c35df5-bc63-4edd-8da5-dbcc5548a61e> <uuid:ca62577e-8e24-4af2-88bf-33b34e25e606> ) ] .

<uuid:ed6b8b1c-7030-4d70-ab61-94cb3aa904a7> a geojson:Feature ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:22138e52-65ef-4773-b69d-5ea2628fad7b> <uuid:f34d9f2e-4180-41de-a613-46f78f4c178f> ) ] .

<uuid:f0249395-1d12-42d1-bdaf-08c5cc29b2d4> a geojson:Feature ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:9ef3d2ea-acea-4365-8bd5-2f8ef3036ed0> <uuid:1d2a5d01-8547-4de6-abea-8f9ab994d35e> ) ] .

<uuid:f921656a-58e3-4375-bdff-ac8019f524cf> a geojson:Feature ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:1e20237c-9dfa-4251-9f3f-cc5e56a5becd> <uuid:5e08b82a-8efb-447c-b5c2-54f8ff5788b3> ) ] .

<uuid:fb03276b-4250-4d52-81e1-035a0bd92895> a geojson:Feature ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:b8412dad-b40a-4e35-9f42-f983e0fce39d> <uuid:9a1d8124-ca37-4abd-b07e-bff4c8eaa2f9> ) ] .

<uuid:fb28f3f2-8ea7-4c03-bff5-7352addba8b3> a geojson:Feature ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:3c08ae4e-7b27-4e95-8bfb-6b42451be8f6> <uuid:307b7db6-8014-4628-b80e-ff925bf71168> ) ] .

<uuid:fc877bbe-72a8-4e59-b959-010e6660984a> a geojson:Feature ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:2b34e214-cba7-4a66-8443-ceb932c5ef09> <uuid:c060c1dc-6544-4595-b583-72ecf603fd6d> ) ] .

<uuid:fc8ba01d-faa7-4407-ae92-32b584c8a6a3> a geojson:Feature ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:1d2a5d01-8547-4de6-abea-8f9ab994d35e> <uuid:f34d9f2e-4180-41de-a613-46f78f4c178f> ) ] .

<uuid:fe0704c2-5d2a-49a8-b507-e98c4047d8c4> a geojson:Feature ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:206806a4-a2f8-4c04-858e-99d289858a40> <uuid:ff685e16-64f8-4f41-8a9e-7d8e83312fd6> ) ] .

<uuid:120defbd-2e05-4ec3-ba3c-ffee086d2add> a geojson:Feature ;
    topo:orientation "+" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:11caaac5-b631-4bd8-a6af-f82cb6371071> <uuid:a0ec1bfd-0f7a-4c42-bc71-bacdcd44071d> ) ] .

<uuid:32e82eb1-93a4-4387-8cd0-9616ebf1e39b> a geojson:Feature ;
    topo:orientation "+" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:a0ec1bfd-0f7a-4c42-bc71-bacdcd44071d> <uuid:fad324b9-801f-40f4-b65b-91f8753e9698> ) ] .

<uuid:7dc1cc1c-8e7f-4666-9f52-4e6c2e6f57ac> a geojson:Feature ;
    topo:orientation "+" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:8d2be28b-8f31-46de-99cb-4d8709502cd0> <uuid:c611f840-2829-44b2-b367-3915ca7875a4> ) ] .

<uuid:8582d9c2-6053-495a-8413-f5493691c0de> a geojson:Feature ;
    topo:orientation "+" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:c611f840-2829-44b2-b367-3915ca7875a4> <uuid:11caaac5-b631-4bd8-a6af-f82cb6371071> ) ] .

<uuid:c60507ba-226b-4e49-a702-e9afef899b23> a geojson:Feature ;
    topo:orientation "+" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:ad6d8fcc-402c-482e-8f1a-7492ccaead38> <uuid:8d2be28b-8f31-46de-99cb-4d8709502cd0> ) ] .

<uuid:d69c596c-134e-4216-9bf6-d0f10e6886d8> a geojson:Feature ;
    topo:orientation "+" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:fad324b9-801f-40f4-b65b-91f8753e9698> <uuid:ad6d8fcc-402c-482e-8f1a-7492ccaead38> ) ] .

<uuid:83ff2cdf-6c58-4e7b-ba55-e084eff8c569> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:c611f840-2829-44b2-b367-3915ca7875a4> <uuid:fad324b9-801f-40f4-b65b-91f8753e9698> ) ] .

<uuid:1e20237c-9dfa-4251-9f3f-cc5e56a5becd> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 2e+00 1e+01 6e+00 ) ] .

<uuid:206806a4-a2f8-4c04-858e-99d289858a40> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 1.2e+01 6e+00 0e+00 ) ] .

<uuid:20d3c864-4a8c-4440-b600-a1d424e92f51> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 2e+01 1e+01 0e+00 ) ] .

<uuid:2b34e214-cba7-4a66-8443-ceb932c5ef09> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 2e+01 1e+01 3e+00 ) ] .

<uuid:307b7db6-8014-4628-b80e-ff925bf71168> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 2e+00 2e+00 3e+00 ) ] .

<uuid:3c08ae4e-7b27-4e95-8bfb-6b42451be8f6> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 2e+00 2e+00 6e+00 ) ] .

<uuid:8087116e-84cc-44d1-8047-78dc3837d7e8> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 1.2e+01 6e+00 6e+00 ) ] .

<uuid:8cda5c68-9c82-43b4-84d7-979efa36dfe1> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 0e+00 1e+01 3e+00 ) ] .

<uuid:8d2be28b-8f31-46de-99cb-4d8709502cd0> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 1.8e+01 1e+01 6e+00 ) ] .

<uuid:8e503e04-ad51-423b-8102-708a845189b6> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 0e+00 0e+00 3e+00 ) ] .

<uuid:92bd9ed9-c138-45c3-b72c-a9ecb7f7cfe9> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 2e+01 0e+00 0e+00 ) ] .

<uuid:9ef3d2ea-acea-4365-8bd5-2f8ef3036ed0> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 8e+00 6e+00 0e+00 ) ] .

<uuid:b6d10150-f9d4-4f7e-b028-c4bbee8e7717> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 0e+00 0e+00 0e+00 ) ] .

<uuid:c060c1dc-6544-4595-b583-72ecf603fd6d> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 2e+01 0e+00 3e+00 ) ] .

<uuid:c611f840-2829-44b2-b367-3915ca7875a4> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 1.8e+01 2e+00 6e+00 ) ] .

<uuid:ca62577e-8e24-4af2-88bf-33b34e25e606> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 0e+00 1e+01 0e+00 ) ] .

<uuid:caa6045e-4189-4571-8914-1189e51ac71e> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 8e+00 6e+00 6e+00 ) ] .

<uuid:fad324b9-801f-40f4-b65b-91f8753e9698> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 1.8e+01 2e+00 3e+00 ) ] .

<uuid:11caaac5-b631-4bd8-a6af-f82cb6371071> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 1.2e+01 2e+00 6e+00 ) ] .

<uuid:16c35df5-bc63-4edd-8da5-dbcc5548a61e> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 1e+01 1e+01 0e+00 ) ] .

<uuid:5e08b82a-8efb-447c-b5c2-54f8ff5788b3> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 1e+01 1e+01 6e+00 ) ] .

<uuid:62a26df3-3e19-49bf-9ee4-24dbeb814a70> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 1e+01 6e+00 6e+00 ) ] .

<uuid:793997c5-bcc4-4610-984b-6cf2c2997348> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 8e+00 0e+00 3e+00 ) ] .

<uuid:7fe8cb9b-976e-4344-bf72-f3721d878ba4> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 1.2e+01 0e+00 3e+00 ) ] .

<uuid:9a1d8124-ca37-4abd-b07e-bff4c8eaa2f9> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 8e+00 2e+00 6e+00 ) ] .

<uuid:a3b19f96-9bca-4c31-ac7e-4cb1615878df> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 8e+00 0e+00 0e+00 ) ] .

<uuid:ad6d8fcc-402c-482e-8f1a-7492ccaead38> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 1.8e+01 1e+01 3e+00 ) ] .

<uuid:d8d136c6-604c-4ad3-adf7-b0a7e04d034a> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 1e+01 6e+00 0e+00 ) ] .

<uuid:e7300a01-f8c1-4351-9511-02790a5376b0> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 2e+00 1e+01 3e+00 ) ] .

<uuid:ff685e16-64f8-4f41-8a9e-7d8e83312fd6> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 1.2e+01 0e+00 0e+00 ) ] .

<uuid:1d2a5d01-8547-4de6-abea-8f9ab994d35e> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 8e+00 6e+00 3e+00 ) ] .

<uuid:22138e52-65ef-4773-b69d-5ea2628fad7b> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 1e+01 1e+01 3e+00 ) ] .

<uuid:87373f95-ee4b-4471-9980-f4a8258ee1e3> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 1.2e+01 6e+00 3e+00 ) ] .

<uuid:a0ec1bfd-0f7a-4c42-bc71-bacdcd44071d> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 1.2e+01 2e+00 3e+00 ) ] .

<uuid:b8412dad-b40a-4e35-9f42-f983e0fce39d> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 8e+00 2e+00 3e+00 ) ] .

<uuid:f34d9f2e-4180-41de-a613-46f78f4c178f> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 1e+01 6e+00 3e+00 ) ] .

[] topo:edges ( <uuid:c60507ba-226b-4e49-a702-e9afef899b23> <uuid:7dc1cc1c-8e7f-4666-9f52-4e6c2e6f57ac> <uuid:83ff2cdf-6c58-4e7b-ba55-e084eff8c569> <uuid:d69c596c-134e-4216-9bf6-d0f10e6886d8> <uuid:32e82eb1-93a4-4387-8cd0-9616ebf1e39b> <uuid:8582d9c2-6053-495a-8413-f5493691c0de> <uuid:120defbd-2e05-4ec3-ba3c-ffee086d2add> <uuid:4c2a6434-03b0-4aa2-85ea-a9fcaea41555> <uuid:830b9098-d914-4e8b-869d-4d20f1eb5c81> <uuid:3b72e45d-d351-46e4-a5b7-9ac9bc339d03> <uuid:921e2351-efbf-48be-85d3-eedc0dc2ddc0> <uuid:73f88b47-78ab-474d-9c62-73dfefd0dd5d> <uuid:7aa2a76d-9d5c-4540-9f2e-d8bcf36fadb5> <uuid:ed6b8b1c-7030-4d70-ab61-94cb3aa904a7> <uuid:5f17e211-e8b5-4a7c-85e4-798787fd82a5> <uuid:7da1c2fe-f798-43cc-af44-ac63f968139c> <uuid:46fd1def-a93e-4c99-9868-172cf1b40ff1> <uuid:856e43bc-ee35-44d0-b25e-ea94a53e1db6> <uuid:a5ed4867-4011-4db7-8425-cbe61a6d3a2d> <uuid:745aa367-94b6-4949-a856-5271ec6672e9> <uuid:f921656a-58e3-4375-bdff-ac8019f524cf> <uuid:6aab9ba2-327e-40df-96c2-0ea43c538c24> <uuid:fb28f3f2-8ea7-4c03-bff5-7352addba8b3> <uuid:e0416983-f0db-4c99-8a72-3f8b4615ab05> <uuid:07093c51-5d4e-42ad-941f-8eeb89e5ae78> <uuid:fb03276b-4250-4d52-81e1-035a0bd92895> <uuid:c97ac36d-9cf3-48ca-bb8f-c36cb335bebf> <uuid:af347f25-a547-477c-b246-cb810756d4dc> <uuid:21388b1b-dcba-46c0-8166-8ffc9c07e50b> <uuid:fc8ba01d-faa7-4407-ae92-32b584c8a6a3> <uuid:8601e9ea-c48f-4c00-a066-f950ed6b0724> <uuid:242a8400-a076-4817-86c6-acd56087cec6> <uuid:4ad210b7-5de5-4732-af7c-978de28f988b> <uuid:c12882ea-089f-4616-942c-ceb8fb4ac05e> <uuid:4406e3f5-89dc-463b-84e4-487490f71f1a> <uuid:511c6e7d-728b-4f1f-9763-9461eb628586> <uuid:79205d80-72e5-4bd8-9c03-9503e4e690cc> <uuid:06babc8d-f0d6-43eb-bfad-931055bae084> <uuid:fc877bbe-72a8-4e59-b959-010e6660984a> <uuid:aafd209b-cd13-401a-83f5-26751a02cffe> <uuid:2f3bbe39-01e3-4c96-8dea-377e38729a03> <uuid:9238cbda-d019-4b57-8319-0cc355656802> <uuid:91cdc345-f745-4643-bc88-a24f8e2216b0> <uuid:fe0704c2-5d2a-49a8-b507-e98c4047d8c4> <uuid:651bb558-f6d6-439f-a8e0-dd5c3385dc94> <uuid:61f99921-a94d-4e0d-8353-f027d76227c5> <uuid:474fef44-eb6e-4e19-a871-433f9bac5650> <uuid:736411fb-67f0-47c0-bf77-bf4f9048bcda> <uuid:3fef75ce-8c4c-4d89-a47f-65977debaee0> <uuid:48b52144-aaa0-42a1-8e7a-40bebfcf9985> <uuid:71af0dde-7fc9-4290-9624-119e91f422ea> <uuid:ad13a84c-df97-4b75-9dc1-1ce452249964> <uuid:c2a00070-f12b-42f9-b78c-b33daa500873> <uuid:13dd8184-f73e-4d9f-9977-3e573274fccc> <uuid:7355081e-9fa3-4fb5-ab10-c4efaa41d61f> <uuid:ed666061-98c5-439d-ab0d-5a792437a873> <uuid:5a36c75b-053b-4d7b-b512-6777786d6180> <uuid:b4c7d3ff-cf1f-40c1-8ea0-2cd2c09cc0e0> <uuid:36b10bf3-9e3a-49cb-9dc5-7e31ade26d17> <uuid:ec374b67-eb42-4c53-b5cc-0f919edb2635> <uuid:f0249395-1d12-42d1-bdaf-08c5cc29b2d4> <uuid:a604828d-a36b-4fac-ba6f-6160ade95301> <uuid:508f66b5-e0cb-489c-ae24-21bfb7c09280> <uuid:38499704-81f7-4d47-965f-435e0b7b0850> <uuid:b6e30631-9768-4020-8947-c32137328216> <uuid:90e3950e-40b2-4d9d-a135-1a4b708305aa> ) ;
    topo:faces ( <uuid:4ac3b91b-eeb7-428c-b5e9-7e8a3f0998ae> <uuid:4a294022-4864-49c7-8cee-f9e43360bc4e> ) ;
    topo:points ( <uuid:ad6d8fcc-402c-482e-8f1a-7492ccaead38> <uuid:8d2be28b-8f31-46de-99cb-4d8709502cd0> <uuid:c611f840-2829-44b2-b367-3915ca7875a4> <uuid:fad324b9-801f-40f4-b65b-91f8753e9698> <uuid:a0ec1bfd-0f7a-4c42-bc71-bacdcd44071d> <uuid:11caaac5-b631-4bd8-a6af-f82cb6371071> <uuid:5e08b82a-8efb-447c-b5c2-54f8ff5788b3> <uuid:22138e52-65ef-4773-b69d-5ea2628fad7b> <uuid:62a26df3-3e19-49bf-9ee4-24dbeb814a70> <uuid:8087116e-84cc-44d1-8047-78dc3837d7e8> <uuid:f34d9f2e-4180-41de-a613-46f78f4c178f> <uuid:87373f95-ee4b-4471-9980-f4a8258ee1e3> <uuid:e7300a01-f8c1-4351-9511-02790a5376b0> <uuid:1e20237c-9dfa-4251-9f3f-cc5e56a5becd> <uuid:307b7db6-8014-4628-b80e-ff925bf71168> <uuid:3c08ae4e-7b27-4e95-8bfb-6b42451be8f6> <uuid:b8412dad-b40a-4e35-9f42-f983e0fce39d> <uuid:9a1d8124-ca37-4abd-b07e-bff4c8eaa2f9> <uuid:caa6045e-4189-4571-8914-1189e51ac71e> <uuid:1d2a5d01-8547-4de6-abea-8f9ab994d35e> <uuid:ff685e16-64f8-4f41-8a9e-7d8e83312fd6> <uuid:92bd9ed9-c138-45c3-b72c-a9ecb7f7cfe9> <uuid:c060c1dc-6544-4595-b583-72ecf603fd6d> <uuid:7fe8cb9b-976e-4344-bf72-f3721d878ba4> <uuid:20d3c864-4a8c-4440-b600-a1d424e92f51> <uuid:2b34e214-cba7-4a66-8443-ceb932c5ef09> <uuid:16c35df5-bc63-4edd-8da5-dbcc5548a61e> <uuid:206806a4-a2f8-4c04-858e-99d289858a40> <uuid:d8d136c6-604c-4ad3-adf7-b0a7e04d034a> <uuid:b6d10150-f9d4-4f7e-b028-c4bbee8e7717> <uuid:a3b19f96-9bca-4c31-ac7e-4cb1615878df> <uuid:793997c5-bcc4-4610-984b-6cf2c2997348> <uuid:8e503e04-ad51-423b-8102-708a845189b6> <uuid:ca62577e-8e24-4af2-88bf-33b34e25e606> <uuid:8cda5c68-9c82-43b4-84d7-979efa36dfe1> <uuid:9ef3d2ea-acea-4365-8bd5-2f8ef3036ed0> ) .


```


### Solid (Polyhedron) referencing faces via Shell directed_references
A Solid feature referencing faces via a Shell topology. The solid's topology contains
a 'shells' array; each Shell has a directed_references array of oriented Face references.
All supporting points, edges and faces are included to make the example self-contained.

#### json
```json
{
  "type": "FeatureCollection",
    "features": [],
  "metadata": {
    "units": "meters",
    "coordinate_precision": 3,
    "conversion_factor": 0.0254
  },
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
    },
    {
      "id": "uuid:a0ec1bfd-0f7a-4c42-bc71-bacdcd44071d",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          12.0,
          2.0,
          3.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:11caaac5-b631-4bd8-a6af-f82cb6371071",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          12.0,
          2.0,
          6.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:5e08b82a-8efb-447c-b5c2-54f8ff5788b3",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          10.0,
          10.0,
          6.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:22138e52-65ef-4773-b69d-5ea2628fad7b",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          10.0,
          10.0,
          3.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:62a26df3-3e19-49bf-9ee4-24dbeb814a70",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          10.0,
          6.0,
          6.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:8087116e-84cc-44d1-8047-78dc3837d7e8",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          12.0,
          6.0,
          6.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:f34d9f2e-4180-41de-a613-46f78f4c178f",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          10.0,
          6.0,
          3.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:87373f95-ee4b-4471-9980-f4a8258ee1e3",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          12.0,
          6.0,
          3.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:e7300a01-f8c1-4351-9511-02790a5376b0",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          2.0,
          10.0,
          3.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:1e20237c-9dfa-4251-9f3f-cc5e56a5becd",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          2.0,
          10.0,
          6.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:307b7db6-8014-4628-b80e-ff925bf71168",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          2.0,
          2.0,
          3.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:3c08ae4e-7b27-4e95-8bfb-6b42451be8f6",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          2.0,
          2.0,
          6.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:b8412dad-b40a-4e35-9f42-f983e0fce39d",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          8.0,
          2.0,
          3.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:9a1d8124-ca37-4abd-b07e-bff4c8eaa2f9",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          8.0,
          2.0,
          6.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:caa6045e-4189-4571-8914-1189e51ac71e",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          8.0,
          6.0,
          6.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:1d2a5d01-8547-4de6-abea-8f9ab994d35e",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          8.0,
          6.0,
          3.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:ff685e16-64f8-4f41-8a9e-7d8e83312fd6",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          12.0,
          0.0,
          0.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:92bd9ed9-c138-45c3-b72c-a9ecb7f7cfe9",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          20.0,
          0.0,
          0.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:c060c1dc-6544-4595-b583-72ecf603fd6d",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          20.0,
          0.0,
          3.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:7fe8cb9b-976e-4344-bf72-f3721d878ba4",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          12.0,
          0.0,
          3.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:20d3c864-4a8c-4440-b600-a1d424e92f51",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          20.0,
          10.0,
          0.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:2b34e214-cba7-4a66-8443-ceb932c5ef09",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          20.0,
          10.0,
          3.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:16c35df5-bc63-4edd-8da5-dbcc5548a61e",
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
      "id": "uuid:206806a4-a2f8-4c04-858e-99d289858a40",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          12.0,
          6.0,
          0.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:d8d136c6-604c-4ad3-adf7-b0a7e04d034a",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          10.0,
          6.0,
          0.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:b6d10150-f9d4-4f7e-b028-c4bbee8e7717",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          0.0,
          0.0,
          0.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:a3b19f96-9bca-4c31-ac7e-4cb1615878df",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          8.0,
          0.0,
          0.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:793997c5-bcc4-4610-984b-6cf2c2997348",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          8.0,
          0.0,
          3.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:8e503e04-ad51-423b-8102-708a845189b6",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          0.0,
          0.0,
          3.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:ca62577e-8e24-4af2-88bf-33b34e25e606",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          0.0,
          10.0,
          0.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:8cda5c68-9c82-43b4-84d7-979efa36dfe1",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          0.0,
          10.0,
          3.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:9ef3d2ea-acea-4365-8bd5-2f8ef3036ed0",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          8.0,
          6.0,
          0.0
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
    },
    {
      "id": "uuid:32e82eb1-93a4-4387-8cd0-9616ebf1e39b",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:a0ec1bfd-0f7a-4c42-bc71-bacdcd44071d",
          "uuid:fad324b9-801f-40f4-b65b-91f8753e9698"
        ]
      },
      "properties": {
        "length": 6.0
      }
    },
    {
      "id": "uuid:8582d9c2-6053-495a-8413-f5493691c0de",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:c611f840-2829-44b2-b367-3915ca7875a4",
          "uuid:11caaac5-b631-4bd8-a6af-f82cb6371071"
        ]
      },
      "properties": {
        "length": 6.0
      }
    },
    {
      "id": "uuid:120defbd-2e05-4ec3-ba3c-ffee086d2add",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:11caaac5-b631-4bd8-a6af-f82cb6371071",
          "uuid:a0ec1bfd-0f7a-4c42-bc71-bacdcd44071d"
        ]
      },
      "properties": {
        "length": 3.0
      }
    },
    {
      "id": "uuid:4c2a6434-03b0-4aa2-85ea-a9fcaea41555",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:5e08b82a-8efb-447c-b5c2-54f8ff5788b3",
          "uuid:8d2be28b-8f31-46de-99cb-4d8709502cd0"
        ]
      },
      "properties": {
        "length": 8.0
      }
    },
    {
      "id": "uuid:830b9098-d914-4e8b-869d-4d20f1eb5c81",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:ad6d8fcc-402c-482e-8f1a-7492ccaead38",
          "uuid:22138e52-65ef-4773-b69d-5ea2628fad7b"
        ]
      },
      "properties": {
        "length": 8.0
      }
    },
    {
      "id": "uuid:3b72e45d-d351-46e4-a5b7-9ac9bc339d03",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:22138e52-65ef-4773-b69d-5ea2628fad7b",
          "uuid:5e08b82a-8efb-447c-b5c2-54f8ff5788b3"
        ]
      },
      "properties": {
        "length": 3.0
      }
    },
    {
      "id": "uuid:921e2351-efbf-48be-85d3-eedc0dc2ddc0",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:5e08b82a-8efb-447c-b5c2-54f8ff5788b3",
          "uuid:62a26df3-3e19-49bf-9ee4-24dbeb814a70"
        ]
      },
      "properties": {
        "length": 4.0
      }
    },
    {
      "id": "uuid:73f88b47-78ab-474d-9c62-73dfefd0dd5d",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:62a26df3-3e19-49bf-9ee4-24dbeb814a70",
          "uuid:8087116e-84cc-44d1-8047-78dc3837d7e8"
        ]
      },
      "properties": {
        "length": 2.0
      }
    },
    {
      "id": "uuid:7aa2a76d-9d5c-4540-9f2e-d8bcf36fadb5",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:8087116e-84cc-44d1-8047-78dc3837d7e8",
          "uuid:11caaac5-b631-4bd8-a6af-f82cb6371071"
        ]
      },
      "properties": {
        "length": 4.0
      }
    },
    {
      "id": "uuid:ed6b8b1c-7030-4d70-ab61-94cb3aa904a7",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:22138e52-65ef-4773-b69d-5ea2628fad7b",
          "uuid:f34d9f2e-4180-41de-a613-46f78f4c178f"
        ]
      },
      "properties": {
        "length": 4.0
      }
    },
    {
      "id": "uuid:5f17e211-e8b5-4a7c-85e4-798787fd82a5",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:f34d9f2e-4180-41de-a613-46f78f4c178f",
          "uuid:62a26df3-3e19-49bf-9ee4-24dbeb814a70"
        ]
      },
      "properties": {
        "length": 3.0
      }
    },
    {
      "id": "uuid:7da1c2fe-f798-43cc-af44-ac63f968139c",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:f34d9f2e-4180-41de-a613-46f78f4c178f",
          "uuid:87373f95-ee4b-4471-9980-f4a8258ee1e3"
        ]
      },
      "properties": {
        "length": 2.0
      }
    },
    {
      "id": "uuid:46fd1def-a93e-4c99-9868-172cf1b40ff1",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:87373f95-ee4b-4471-9980-f4a8258ee1e3",
          "uuid:8087116e-84cc-44d1-8047-78dc3837d7e8"
        ]
      },
      "properties": {
        "length": 3.0
      }
    },
    {
      "id": "uuid:856e43bc-ee35-44d0-b25e-ea94a53e1db6",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:a0ec1bfd-0f7a-4c42-bc71-bacdcd44071d",
          "uuid:87373f95-ee4b-4471-9980-f4a8258ee1e3"
        ]
      },
      "properties": {
        "length": 4.0
      }
    },
    {
      "id": "uuid:a5ed4867-4011-4db7-8425-cbe61a6d3a2d",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:22138e52-65ef-4773-b69d-5ea2628fad7b",
          "uuid:e7300a01-f8c1-4351-9511-02790a5376b0"
        ]
      },
      "properties": {
        "length": 8.0
      }
    },
    {
      "id": "uuid:745aa367-94b6-4949-a856-5271ec6672e9",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:e7300a01-f8c1-4351-9511-02790a5376b0",
          "uuid:1e20237c-9dfa-4251-9f3f-cc5e56a5becd"
        ]
      },
      "properties": {
        "length": 3.0
      }
    },
    {
      "id": "uuid:f921656a-58e3-4375-bdff-ac8019f524cf",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:1e20237c-9dfa-4251-9f3f-cc5e56a5becd",
          "uuid:5e08b82a-8efb-447c-b5c2-54f8ff5788b3"
        ]
      },
      "properties": {
        "length": 8.0
      }
    },
    {
      "id": "uuid:6aab9ba2-327e-40df-96c2-0ea43c538c24",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:e7300a01-f8c1-4351-9511-02790a5376b0",
          "uuid:307b7db6-8014-4628-b80e-ff925bf71168"
        ]
      },
      "properties": {
        "length": 8.0
      }
    },
    {
      "id": "uuid:fb28f3f2-8ea7-4c03-bff5-7352addba8b3",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:3c08ae4e-7b27-4e95-8bfb-6b42451be8f6",
          "uuid:307b7db6-8014-4628-b80e-ff925bf71168"
        ]
      },
      "properties": {
        "length": 3.0
      }
    },
    {
      "id": "uuid:e0416983-f0db-4c99-8a72-3f8b4615ab05",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:3c08ae4e-7b27-4e95-8bfb-6b42451be8f6",
          "uuid:1e20237c-9dfa-4251-9f3f-cc5e56a5becd"
        ]
      },
      "properties": {
        "length": 8.0
      }
    },
    {
      "id": "uuid:07093c51-5d4e-42ad-941f-8eeb89e5ae78",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:307b7db6-8014-4628-b80e-ff925bf71168",
          "uuid:b8412dad-b40a-4e35-9f42-f983e0fce39d"
        ]
      },
      "properties": {
        "length": 6.0
      }
    },
    {
      "id": "uuid:fb03276b-4250-4d52-81e1-035a0bd92895",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:b8412dad-b40a-4e35-9f42-f983e0fce39d",
          "uuid:9a1d8124-ca37-4abd-b07e-bff4c8eaa2f9"
        ]
      },
      "properties": {
        "length": 3.0
      }
    },
    {
      "id": "uuid:c97ac36d-9cf3-48ca-bb8f-c36cb335bebf",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:9a1d8124-ca37-4abd-b07e-bff4c8eaa2f9",
          "uuid:3c08ae4e-7b27-4e95-8bfb-6b42451be8f6"
        ]
      },
      "properties": {
        "length": 6.0
      }
    },
    {
      "id": "uuid:af347f25-a547-477c-b246-cb810756d4dc",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:9a1d8124-ca37-4abd-b07e-bff4c8eaa2f9",
          "uuid:caa6045e-4189-4571-8914-1189e51ac71e"
        ]
      },
      "properties": {
        "length": 4.0
      }
    },
    {
      "id": "uuid:21388b1b-dcba-46c0-8166-8ffc9c07e50b",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:caa6045e-4189-4571-8914-1189e51ac71e",
          "uuid:62a26df3-3e19-49bf-9ee4-24dbeb814a70"
        ]
      },
      "properties": {
        "length": 2.0
      }
    },
    {
      "id": "uuid:fc8ba01d-faa7-4407-ae92-32b584c8a6a3",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:1d2a5d01-8547-4de6-abea-8f9ab994d35e",
          "uuid:f34d9f2e-4180-41de-a613-46f78f4c178f"
        ]
      },
      "properties": {
        "length": 2.0
      }
    },
    {
      "id": "uuid:8601e9ea-c48f-4c00-a066-f950ed6b0724",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:caa6045e-4189-4571-8914-1189e51ac71e",
          "uuid:1d2a5d01-8547-4de6-abea-8f9ab994d35e"
        ]
      },
      "properties": {
        "length": 3.0
      }
    },
    {
      "id": "uuid:242a8400-a076-4817-86c6-acd56087cec6",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:1d2a5d01-8547-4de6-abea-8f9ab994d35e",
          "uuid:b8412dad-b40a-4e35-9f42-f983e0fce39d"
        ]
      },
      "properties": {
        "length": 4.0
      }
    },
    {
      "id": "uuid:4ad210b7-5de5-4732-af7c-978de28f988b",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:ff685e16-64f8-4f41-8a9e-7d8e83312fd6",
          "uuid:92bd9ed9-c138-45c3-b72c-a9ecb7f7cfe9"
        ]
      },
      "properties": {
        "length": 8.0
      }
    },
    {
      "id": "uuid:c12882ea-089f-4616-942c-ceb8fb4ac05e",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:92bd9ed9-c138-45c3-b72c-a9ecb7f7cfe9",
          "uuid:c060c1dc-6544-4595-b583-72ecf603fd6d"
        ]
      },
      "properties": {
        "length": 3.0
      }
    },
    {
      "id": "uuid:4406e3f5-89dc-463b-84e4-487490f71f1a",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:c060c1dc-6544-4595-b583-72ecf603fd6d",
          "uuid:7fe8cb9b-976e-4344-bf72-f3721d878ba4"
        ]
      },
      "properties": {
        "length": 8.0
      }
    },
    {
      "id": "uuid:511c6e7d-728b-4f1f-9763-9461eb628586",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:7fe8cb9b-976e-4344-bf72-f3721d878ba4",
          "uuid:ff685e16-64f8-4f41-8a9e-7d8e83312fd6"
        ]
      },
      "properties": {
        "length": 3.0
      }
    },
    {
      "id": "uuid:79205d80-72e5-4bd8-9c03-9503e4e690cc",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:92bd9ed9-c138-45c3-b72c-a9ecb7f7cfe9",
          "uuid:20d3c864-4a8c-4440-b600-a1d424e92f51"
        ]
      },
      "properties": {
        "length": 10.0
      }
    },
    {
      "id": "uuid:06babc8d-f0d6-43eb-bfad-931055bae084",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:20d3c864-4a8c-4440-b600-a1d424e92f51",
          "uuid:2b34e214-cba7-4a66-8443-ceb932c5ef09"
        ]
      },
      "properties": {
        "length": 3.0
      }
    },
    {
      "id": "uuid:fc877bbe-72a8-4e59-b959-010e6660984a",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:2b34e214-cba7-4a66-8443-ceb932c5ef09",
          "uuid:c060c1dc-6544-4595-b583-72ecf603fd6d"
        ]
      },
      "properties": {
        "length": 10.0
      }
    },
    {
      "id": "uuid:aafd209b-cd13-401a-83f5-26751a02cffe",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:20d3c864-4a8c-4440-b600-a1d424e92f51",
          "uuid:16c35df5-bc63-4edd-8da5-dbcc5548a61e"
        ]
      },
      "properties": {
        "length": 10.0
      }
    },
    {
      "id": "uuid:2f3bbe39-01e3-4c96-8dea-377e38729a03",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:16c35df5-bc63-4edd-8da5-dbcc5548a61e",
          "uuid:22138e52-65ef-4773-b69d-5ea2628fad7b"
        ]
      },
      "properties": {
        "length": 3.0
      }
    },
    {
      "id": "uuid:9238cbda-d019-4b57-8319-0cc355656802",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:ad6d8fcc-402c-482e-8f1a-7492ccaead38",
          "uuid:2b34e214-cba7-4a66-8443-ceb932c5ef09"
        ]
      },
      "properties": {
        "length": 2.0
      }
    },
    {
      "id": "uuid:91cdc345-f745-4643-bc88-a24f8e2216b0",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:a0ec1bfd-0f7a-4c42-bc71-bacdcd44071d",
          "uuid:7fe8cb9b-976e-4344-bf72-f3721d878ba4"
        ]
      },
      "properties": {
        "length": 2.0
      }
    },
    {
      "id": "uuid:fe0704c2-5d2a-49a8-b507-e98c4047d8c4",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:206806a4-a2f8-4c04-858e-99d289858a40",
          "uuid:ff685e16-64f8-4f41-8a9e-7d8e83312fd6"
        ]
      },
      "properties": {
        "length": 6.0
      }
    },
    {
      "id": "uuid:651bb558-f6d6-439f-a8e0-dd5c3385dc94",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:d8d136c6-604c-4ad3-adf7-b0a7e04d034a",
          "uuid:206806a4-a2f8-4c04-858e-99d289858a40"
        ]
      },
      "properties": {
        "length": 2.0
      }
    },
    {
      "id": "uuid:61f99921-a94d-4e0d-8353-f027d76227c5",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:16c35df5-bc63-4edd-8da5-dbcc5548a61e",
          "uuid:d8d136c6-604c-4ad3-adf7-b0a7e04d034a"
        ]
      },
      "properties": {
        "length": 4.0
      }
    },
    {
      "id": "uuid:474fef44-eb6e-4e19-a871-433f9bac5650",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:f34d9f2e-4180-41de-a613-46f78f4c178f",
          "uuid:d8d136c6-604c-4ad3-adf7-b0a7e04d034a"
        ]
      },
      "properties": {
        "length": 3.0
      }
    },
    {
      "id": "uuid:736411fb-67f0-47c0-bf77-bf4f9048bcda",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:87373f95-ee4b-4471-9980-f4a8258ee1e3",
          "uuid:206806a4-a2f8-4c04-858e-99d289858a40"
        ]
      },
      "properties": {
        "length": 3.0
      }
    },
    {
      "id": "uuid:3fef75ce-8c4c-4d89-a47f-65977debaee0",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:b6d10150-f9d4-4f7e-b028-c4bbee8e7717",
          "uuid:a3b19f96-9bca-4c31-ac7e-4cb1615878df"
        ]
      },
      "properties": {
        "length": 8.0
      }
    },
    {
      "id": "uuid:48b52144-aaa0-42a1-8e7a-40bebfcf9985",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:a3b19f96-9bca-4c31-ac7e-4cb1615878df",
          "uuid:793997c5-bcc4-4610-984b-6cf2c2997348"
        ]
      },
      "properties": {
        "length": 3.0
      }
    },
    {
      "id": "uuid:71af0dde-7fc9-4290-9624-119e91f422ea",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:793997c5-bcc4-4610-984b-6cf2c2997348",
          "uuid:8e503e04-ad51-423b-8102-708a845189b6"
        ]
      },
      "properties": {
        "length": 8.0
      }
    },
    {
      "id": "uuid:ad13a84c-df97-4b75-9dc1-1ce452249964",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:8e503e04-ad51-423b-8102-708a845189b6",
          "uuid:b6d10150-f9d4-4f7e-b028-c4bbee8e7717"
        ]
      },
      "properties": {
        "length": 3.0
      }
    },
    {
      "id": "uuid:c2a00070-f12b-42f9-b78c-b33daa500873",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:ca62577e-8e24-4af2-88bf-33b34e25e606",
          "uuid:b6d10150-f9d4-4f7e-b028-c4bbee8e7717"
        ]
      },
      "properties": {
        "length": 10.0
      }
    },
    {
      "id": "uuid:13dd8184-f73e-4d9f-9977-3e573274fccc",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:8e503e04-ad51-423b-8102-708a845189b6",
          "uuid:8cda5c68-9c82-43b4-84d7-979efa36dfe1"
        ]
      },
      "properties": {
        "length": 10.0
      }
    },
    {
      "id": "uuid:7355081e-9fa3-4fb5-ab10-c4efaa41d61f",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:ca62577e-8e24-4af2-88bf-33b34e25e606",
          "uuid:8cda5c68-9c82-43b4-84d7-979efa36dfe1"
        ]
      },
      "properties": {
        "length": 3.0
      }
    },
    {
      "id": "uuid:ed666061-98c5-439d-ab0d-5a792437a873",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:16c35df5-bc63-4edd-8da5-dbcc5548a61e",
          "uuid:ca62577e-8e24-4af2-88bf-33b34e25e606"
        ]
      },
      "properties": {
        "length": 10.0
      }
    },
    {
      "id": "uuid:5a36c75b-053b-4d7b-b512-6777786d6180",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:8cda5c68-9c82-43b4-84d7-979efa36dfe1",
          "uuid:e7300a01-f8c1-4351-9511-02790a5376b0"
        ]
      },
      "properties": {
        "length": 2.0
      }
    },
    {
      "id": "uuid:b4c7d3ff-cf1f-40c1-8ea0-2cd2c09cc0e0",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:793997c5-bcc4-4610-984b-6cf2c2997348",
          "uuid:b8412dad-b40a-4e35-9f42-f983e0fce39d"
        ]
      },
      "properties": {
        "length": 2.0
      }
    },
    {
      "id": "uuid:36b10bf3-9e3a-49cb-9dc5-7e31ade26d17",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:9ef3d2ea-acea-4365-8bd5-2f8ef3036ed0",
          "uuid:d8d136c6-604c-4ad3-adf7-b0a7e04d034a"
        ]
      },
      "properties": {
        "length": 2.0
      }
    },
    {
      "id": "uuid:ec374b67-eb42-4c53-b5cc-0f919edb2635",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:a3b19f96-9bca-4c31-ac7e-4cb1615878df",
          "uuid:9ef3d2ea-acea-4365-8bd5-2f8ef3036ed0"
        ]
      },
      "properties": {
        "length": 6.0
      }
    },
    {
      "id": "uuid:f0249395-1d12-42d1-bdaf-08c5cc29b2d4",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:9ef3d2ea-acea-4365-8bd5-2f8ef3036ed0",
          "uuid:1d2a5d01-8547-4de6-abea-8f9ab994d35e"
        ]
      },
      "properties": {
        "length": 3.0
      }
    },
    {
      "id": "uuid:a604828d-a36b-4fac-ba6f-6160ade95301",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:a3b19f96-9bca-4c31-ac7e-4cb1615878df",
          "uuid:ff685e16-64f8-4f41-8a9e-7d8e83312fd6"
        ]
      },
      "properties": {
        "length": 4.0
      }
    },
    {
      "id": "uuid:508f66b5-e0cb-489c-ae24-21bfb7c09280",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:7fe8cb9b-976e-4344-bf72-f3721d878ba4",
          "uuid:793997c5-bcc4-4610-984b-6cf2c2997348"
        ]
      },
      "properties": {
        "length": 4.0
      }
    },
    {
      "id": "uuid:38499704-81f7-4d47-965f-435e0b7b0850",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:b8412dad-b40a-4e35-9f42-f983e0fce39d",
          "uuid:a0ec1bfd-0f7a-4c42-bc71-bacdcd44071d"
        ]
      },
      "properties": {
        "length": 4.0
      }
    },
    {
      "id": "uuid:b6e30631-9768-4020-8947-c32137328216",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:9a1d8124-ca37-4abd-b07e-bff4c8eaa2f9",
          "uuid:11caaac5-b631-4bd8-a6af-f82cb6371071"
        ]
      },
      "properties": {
        "length": 4.0
      }
    },
    {
      "id": "uuid:90e3950e-40b2-4d9d-a135-1a4b708305aa",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:1d2a5d01-8547-4de6-abea-8f9ab994d35e",
          "uuid:87373f95-ee4b-4471-9980-f4a8258ee1e3"
        ]
      },
      "properties": {
        "length": 4.0
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
    },
    {
      "id": "uuid:4a294022-4864-49c7-8cee-f9e43360bc4e",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:32e82eb1-93a4-4387-8cd0-9616ebf1e39b",
                "orientation": "+"
              },
              {
                "ref": "uuid:83ff2cdf-6c58-4e7b-ba55-e084eff8c569",
                "orientation": "-"
              },
              {
                "ref": "uuid:8582d9c2-6053-495a-8413-f5493691c0de",
                "orientation": "+"
              },
              {
                "ref": "uuid:120defbd-2e05-4ec3-ba3c-ffee086d2add",
                "orientation": "+"
              }
            ]
          }
        ]
      },
      "properties": {
        "normal": [
          0.0,
          -1.0,
          3.007964248051e-16
        ],
        "area": 18.0
      }
    },
    {
      "id": "uuid:01947f47-ee13-44a9-85a4-2bcb4881982a",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:4c2a6434-03b0-4aa2-85ea-a9fcaea41555",
                "orientation": "+"
              },
              {
                "ref": "uuid:c60507ba-226b-4e49-a702-e9afef899b23",
                "orientation": "-"
              },
              {
                "ref": "uuid:830b9098-d914-4e8b-869d-4d20f1eb5c81",
                "orientation": "+"
              },
              {
                "ref": "uuid:3b72e45d-d351-46e4-a5b7-9ac9bc339d03",
                "orientation": "+"
              }
            ]
          }
        ]
      },
      "properties": {
        "normal": [
          0.0,
          1.0,
          0.0
        ],
        "area": 24.0
      }
    },
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
    },
    {
      "id": "uuid:3c1f5c4b-d842-40b6-a332-99d50015fa8f",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:ed6b8b1c-7030-4d70-ab61-94cb3aa904a7",
                "orientation": "+"
              },
              {
                "ref": "uuid:5f17e211-e8b5-4a7c-85e4-798787fd82a5",
                "orientation": "+"
              },
              {
                "ref": "uuid:921e2351-efbf-48be-85d3-eedc0dc2ddc0",
                "orientation": "-"
              },
              {
                "ref": "uuid:3b72e45d-d351-46e4-a5b7-9ac9bc339d03",
                "orientation": "-"
              }
            ]
          }
        ]
      },
      "properties": {
        "normal": [
          -1.0,
          -0.0,
          -0.0
        ],
        "area": 12.0
      }
    },
    {
      "id": "uuid:fe522919-1421-4fd1-9930-8c6551e3f2a5",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:7da1c2fe-f798-43cc-af44-ac63f968139c",
                "orientation": "+"
              },
              {
                "ref": "uuid:46fd1def-a93e-4c99-9868-172cf1b40ff1",
                "orientation": "+"
              },
              {
                "ref": "uuid:73f88b47-78ab-474d-9c62-73dfefd0dd5d",
                "orientation": "-"
              },
              {
                "ref": "uuid:5f17e211-e8b5-4a7c-85e4-798787fd82a5",
                "orientation": "-"
              }
            ]
          }
        ]
      },
      "properties": {
        "normal": [
          0.0,
          -1.0,
          0.0
        ],
        "area": 6.0
      }
    },
    {
      "id": "uuid:2387ae98-9236-42fe-9414-c45b99954c41",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:856e43bc-ee35-44d0-b25e-ea94a53e1db6",
                "orientation": "+"
              },
              {
                "ref": "uuid:7da1c2fe-f798-43cc-af44-ac63f968139c",
                "orientation": "-"
              },
              {
                "ref": "uuid:ed6b8b1c-7030-4d70-ab61-94cb3aa904a7",
                "orientation": "-"
              },
              {
                "ref": "uuid:830b9098-d914-4e8b-869d-4d20f1eb5c81",
                "orientation": "-"
              },
              {
                "ref": "uuid:d69c596c-134e-4216-9bf6-d0f10e6886d8",
                "orientation": "-"
              },
              {
                "ref": "uuid:32e82eb1-93a4-4387-8cd0-9616ebf1e39b",
                "orientation": "-"
              }
            ]
          }
        ]
      },
      "properties": {
        "normal": [
          0.0,
          0.0,
          -1.0
        ],
        "area": 56.0
      }
    },
    {
      "id": "uuid:4ba85faa-3935-4e89-a9f8-dcd647a5dbed",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:856e43bc-ee35-44d0-b25e-ea94a53e1db6",
                "orientation": "-"
              },
              {
                "ref": "uuid:120defbd-2e05-4ec3-ba3c-ffee086d2add",
                "orientation": "-"
              },
              {
                "ref": "uuid:7aa2a76d-9d5c-4540-9f2e-d8bcf36fadb5",
                "orientation": "-"
              },
              {
                "ref": "uuid:46fd1def-a93e-4c99-9868-172cf1b40ff1",
                "orientation": "-"
              }
            ]
          }
        ]
      },
      "properties": {
        "normal": [
          -1.0,
          -0.0,
          -0.0
        ],
        "area": 12.0
      }
    },
    {
      "id": "uuid:c55c88db-d187-4d7e-9aaa-b9d3dce52663",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:a5ed4867-4011-4db7-8425-cbe61a6d3a2d",
                "orientation": "+"
              },
              {
                "ref": "uuid:745aa367-94b6-4949-a856-5271ec6672e9",
                "orientation": "+"
              },
              {
                "ref": "uuid:f921656a-58e3-4375-bdff-ac8019f524cf",
                "orientation": "+"
              },
              {
                "ref": "uuid:3b72e45d-d351-46e4-a5b7-9ac9bc339d03",
                "orientation": "-"
              }
            ]
          }
        ]
      },
      "properties": {
        "normal": [
          0.0,
          1.0,
          0.0
        ],
        "area": 24.0
      }
    },
    {
      "id": "uuid:dbd99467-ea83-4dff-b03f-eef2aad2687c",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:745aa367-94b6-4949-a856-5271ec6672e9",
                "orientation": "-"
              },
              {
                "ref": "uuid:6aab9ba2-327e-40df-96c2-0ea43c538c24",
                "orientation": "+"
              },
              {
                "ref": "uuid:fb28f3f2-8ea7-4c03-bff5-7352addba8b3",
                "orientation": "-"
              },
              {
                "ref": "uuid:e0416983-f0db-4c99-8a72-3f8b4615ab05",
                "orientation": "+"
              }
            ]
          }
        ]
      },
      "properties": {
        "normal": [
          -1.0,
          -0.0,
          -3.007964248051e-16
        ],
        "area": 24.0
      }
    },
    {
      "id": "uuid:0e55e87d-8475-4c92-89e7-d62f97ce9ec2",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:fb28f3f2-8ea7-4c03-bff5-7352addba8b3",
                "orientation": "+"
              },
              {
                "ref": "uuid:07093c51-5d4e-42ad-941f-8eeb89e5ae78",
                "orientation": "+"
              },
              {
                "ref": "uuid:fb03276b-4250-4d52-81e1-035a0bd92895",
                "orientation": "+"
              },
              {
                "ref": "uuid:c97ac36d-9cf3-48ca-bb8f-c36cb335bebf",
                "orientation": "+"
              }
            ]
          }
        ]
      },
      "properties": {
        "normal": [
          0.0,
          -1.0,
          0.0
        ],
        "area": 18.0
      }
    },
    {
      "id": "uuid:6a5ff199-56a7-4e65-94b5-bfdf2ae3449d",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:f921656a-58e3-4375-bdff-ac8019f524cf",
                "orientation": "-"
              },
              {
                "ref": "uuid:e0416983-f0db-4c99-8a72-3f8b4615ab05",
                "orientation": "-"
              },
              {
                "ref": "uuid:c97ac36d-9cf3-48ca-bb8f-c36cb335bebf",
                "orientation": "-"
              },
              {
                "ref": "uuid:af347f25-a547-477c-b246-cb810756d4dc",
                "orientation": "+"
              },
              {
                "ref": "uuid:21388b1b-dcba-46c0-8166-8ffc9c07e50b",
                "orientation": "+"
              },
              {
                "ref": "uuid:921e2351-efbf-48be-85d3-eedc0dc2ddc0",
                "orientation": "-"
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
    },
    {
      "id": "uuid:e499fea3-19f7-4863-8a58-751caff7d884",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:fc8ba01d-faa7-4407-ae92-32b584c8a6a3",
                "orientation": "+"
              },
              {
                "ref": "uuid:5f17e211-e8b5-4a7c-85e4-798787fd82a5",
                "orientation": "+"
              },
              {
                "ref": "uuid:21388b1b-dcba-46c0-8166-8ffc9c07e50b",
                "orientation": "-"
              },
              {
                "ref": "uuid:8601e9ea-c48f-4c00-a066-f950ed6b0724",
                "orientation": "+"
              }
            ]
          }
        ]
      },
      "properties": {
        "normal": [
          0.0,
          -1.0,
          0.0
        ],
        "area": 6.0
      }
    },
    {
      "id": "uuid:9e4c0c0e-6acf-401b-b35e-0e917ce3a5fc",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:242a8400-a076-4817-86c6-acd56087cec6",
                "orientation": "+"
              },
              {
                "ref": "uuid:07093c51-5d4e-42ad-941f-8eeb89e5ae78",
                "orientation": "-"
              },
              {
                "ref": "uuid:6aab9ba2-327e-40df-96c2-0ea43c538c24",
                "orientation": "-"
              },
              {
                "ref": "uuid:a5ed4867-4011-4db7-8425-cbe61a6d3a2d",
                "orientation": "-"
              },
              {
                "ref": "uuid:ed6b8b1c-7030-4d70-ab61-94cb3aa904a7",
                "orientation": "+"
              },
              {
                "ref": "uuid:fc8ba01d-faa7-4407-ae92-32b584c8a6a3",
                "orientation": "-"
              }
            ]
          }
        ]
      },
      "properties": {
        "normal": [
          0.0,
          0.0,
          -1.0
        ],
        "area": 56.0
      }
    },
    {
      "id": "uuid:3f5c452f-9815-4b21-9b2d-0127ae80c385",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:242a8400-a076-4817-86c6-acd56087cec6",
                "orientation": "-"
              },
              {
                "ref": "uuid:8601e9ea-c48f-4c00-a066-f950ed6b0724",
                "orientation": "-"
              },
              {
                "ref": "uuid:af347f25-a547-477c-b246-cb810756d4dc",
                "orientation": "-"
              },
              {
                "ref": "uuid:fb03276b-4250-4d52-81e1-035a0bd92895",
                "orientation": "-"
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
        "area": 12.0
      }
    },
    {
      "id": "uuid:66a430c0-123f-42df-9d11-64347362bcb3",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:4ad210b7-5de5-4732-af7c-978de28f988b",
                "orientation": "+"
              },
              {
                "ref": "uuid:c12882ea-089f-4616-942c-ceb8fb4ac05e",
                "orientation": "+"
              },
              {
                "ref": "uuid:4406e3f5-89dc-463b-84e4-487490f71f1a",
                "orientation": "+"
              },
              {
                "ref": "uuid:511c6e7d-728b-4f1f-9763-9461eb628586",
                "orientation": "+"
              }
            ]
          }
        ]
      },
      "properties": {
        "normal": [
          0.0,
          -1.0,
          0.0
        ],
        "area": 24.0
      }
    },
    {
      "id": "uuid:31d8f2b5-cc74-4f72-b230-d27dad0fd589",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:79205d80-72e5-4bd8-9c03-9503e4e690cc",
                "orientation": "+"
              },
              {
                "ref": "uuid:06babc8d-f0d6-43eb-bfad-931055bae084",
                "orientation": "+"
              },
              {
                "ref": "uuid:fc877bbe-72a8-4e59-b959-010e6660984a",
                "orientation": "+"
              },
              {
                "ref": "uuid:c12882ea-089f-4616-942c-ceb8fb4ac05e",
                "orientation": "-"
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
        "area": 30.0
      }
    },
    {
      "id": "uuid:65959e29-11cb-4568-904d-61c4a7c17b98",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:aafd209b-cd13-401a-83f5-26751a02cffe",
                "orientation": "+"
              },
              {
                "ref": "uuid:2f3bbe39-01e3-4c96-8dea-377e38729a03",
                "orientation": "+"
              },
              {
                "ref": "uuid:830b9098-d914-4e8b-869d-4d20f1eb5c81",
                "orientation": "-"
              },
              {
                "ref": "uuid:9238cbda-d019-4b57-8319-0cc355656802",
                "orientation": "+"
              },
              {
                "ref": "uuid:06babc8d-f0d6-43eb-bfad-931055bae084",
                "orientation": "-"
              }
            ]
          }
        ]
      },
      "properties": {
        "normal": [
          0.0,
          1.0,
          0.0
        ],
        "area": 30.0
      }
    },
    {
      "id": "uuid:e2efe498-c6d5-4f9c-ac07-4c1c9e406675",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:d69c596c-134e-4216-9bf6-d0f10e6886d8",
                "orientation": "-"
              },
              {
                "ref": "uuid:32e82eb1-93a4-4387-8cd0-9616ebf1e39b",
                "orientation": "-"
              },
              {
                "ref": "uuid:91cdc345-f745-4643-bc88-a24f8e2216b0",
                "orientation": "+"
              },
              {
                "ref": "uuid:4406e3f5-89dc-463b-84e4-487490f71f1a",
                "orientation": "-"
              },
              {
                "ref": "uuid:fc877bbe-72a8-4e59-b959-010e6660984a",
                "orientation": "-"
              },
              {
                "ref": "uuid:9238cbda-d019-4b57-8319-0cc355656802",
                "orientation": "-"
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
        "area": 32.0
      }
    },
    {
      "id": "uuid:5bcee2b5-be9b-47d6-9a8b-35dac021f661",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:4ad210b7-5de5-4732-af7c-978de28f988b",
                "orientation": "-"
              },
              {
                "ref": "uuid:fe0704c2-5d2a-49a8-b507-e98c4047d8c4",
                "orientation": "-"
              },
              {
                "ref": "uuid:651bb558-f6d6-439f-a8e0-dd5c3385dc94",
                "orientation": "-"
              },
              {
                "ref": "uuid:61f99921-a94d-4e0d-8353-f027d76227c5",
                "orientation": "-"
              },
              {
                "ref": "uuid:aafd209b-cd13-401a-83f5-26751a02cffe",
                "orientation": "-"
              },
              {
                "ref": "uuid:79205d80-72e5-4bd8-9c03-9503e4e690cc",
                "orientation": "-"
              }
            ]
          }
        ]
      },
      "properties": {
        "normal": [
          -0.0,
          -0.0,
          -1.0
        ],
        "area": 88.0
      }
    },
    {
      "id": "uuid:91ce0c52-11c3-4e32-8bcc-dea958a3969e",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:474fef44-eb6e-4e19-a871-433f9bac5650",
                "orientation": "-"
              },
              {
                "ref": "uuid:ed6b8b1c-7030-4d70-ab61-94cb3aa904a7",
                "orientation": "-"
              },
              {
                "ref": "uuid:2f3bbe39-01e3-4c96-8dea-377e38729a03",
                "orientation": "-"
              },
              {
                "ref": "uuid:61f99921-a94d-4e0d-8353-f027d76227c5",
                "orientation": "+"
              }
            ]
          }
        ]
      },
      "properties": {
        "normal": [
          -1.0,
          -0.0,
          0.0
        ],
        "area": 12.0
      }
    },
    {
      "id": "uuid:56283886-1f4c-448c-b785-80fb9740a9cc",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:736411fb-67f0-47c0-bf77-bf4f9048bcda",
                "orientation": "+"
              },
              {
                "ref": "uuid:fe0704c2-5d2a-49a8-b507-e98c4047d8c4",
                "orientation": "+"
              },
              {
                "ref": "uuid:511c6e7d-728b-4f1f-9763-9461eb628586",
                "orientation": "-"
              },
              {
                "ref": "uuid:91cdc345-f745-4643-bc88-a24f8e2216b0",
                "orientation": "-"
              },
              {
                "ref": "uuid:856e43bc-ee35-44d0-b25e-ea94a53e1db6",
                "orientation": "+"
              }
            ]
          }
        ]
      },
      "properties": {
        "normal": [
          -1.0,
          -0.0,
          -0.0
        ],
        "area": 18.0
      }
    },
    {
      "id": "uuid:f3338301-b0e3-401c-af23-41ac2ae8e969",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:736411fb-67f0-47c0-bf77-bf4f9048bcda",
                "orientation": "-"
              },
              {
                "ref": "uuid:7da1c2fe-f798-43cc-af44-ac63f968139c",
                "orientation": "-"
              },
              {
                "ref": "uuid:474fef44-eb6e-4e19-a871-433f9bac5650",
                "orientation": "+"
              },
              {
                "ref": "uuid:651bb558-f6d6-439f-a8e0-dd5c3385dc94",
                "orientation": "+"
              }
            ]
          }
        ]
      },
      "properties": {
        "normal": [
          0.0,
          -1.0,
          0.0
        ],
        "area": 6.0
      }
    },
    {
      "id": "uuid:a2117d6b-4621-4a6b-9809-9fab3dfc4ff0",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:3fef75ce-8c4c-4d89-a47f-65977debaee0",
                "orientation": "+"
              },
              {
                "ref": "uuid:48b52144-aaa0-42a1-8e7a-40bebfcf9985",
                "orientation": "+"
              },
              {
                "ref": "uuid:71af0dde-7fc9-4290-9624-119e91f422ea",
                "orientation": "+"
              },
              {
                "ref": "uuid:ad13a84c-df97-4b75-9dc1-1ce452249964",
                "orientation": "+"
              }
            ]
          }
        ]
      },
      "properties": {
        "normal": [
          0.0,
          -1.0,
          0.0
        ],
        "area": 24.0
      }
    },
    {
      "id": "uuid:9d67557a-e130-4a47-b63d-c6a2bdf21fa2",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:c2a00070-f12b-42f9-b78c-b33daa500873",
                "orientation": "+"
              },
              {
                "ref": "uuid:ad13a84c-df97-4b75-9dc1-1ce452249964",
                "orientation": "-"
              },
              {
                "ref": "uuid:13dd8184-f73e-4d9f-9977-3e573274fccc",
                "orientation": "+"
              },
              {
                "ref": "uuid:7355081e-9fa3-4fb5-ab10-c4efaa41d61f",
                "orientation": "-"
              }
            ]
          }
        ]
      },
      "properties": {
        "normal": [
          -1.0,
          -0.0,
          -0.0
        ],
        "area": 30.0
      }
    },
    {
      "id": "uuid:d45fca44-8685-4146-92a5-b84d82fdc838",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:ed666061-98c5-439d-ab0d-5a792437a873",
                "orientation": "+"
              },
              {
                "ref": "uuid:7355081e-9fa3-4fb5-ab10-c4efaa41d61f",
                "orientation": "+"
              },
              {
                "ref": "uuid:5a36c75b-053b-4d7b-b512-6777786d6180",
                "orientation": "+"
              },
              {
                "ref": "uuid:a5ed4867-4011-4db7-8425-cbe61a6d3a2d",
                "orientation": "-"
              },
              {
                "ref": "uuid:2f3bbe39-01e3-4c96-8dea-377e38729a03",
                "orientation": "-"
              }
            ]
          }
        ]
      },
      "properties": {
        "normal": [
          0.0,
          1.0,
          0.0
        ],
        "area": 30.0
      }
    },
    {
      "id": "uuid:2497a842-0932-4fe5-ac1a-2f773473f338",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:b4c7d3ff-cf1f-40c1-8ea0-2cd2c09cc0e0",
                "orientation": "+"
              },
              {
                "ref": "uuid:07093c51-5d4e-42ad-941f-8eeb89e5ae78",
                "orientation": "-"
              },
              {
                "ref": "uuid:6aab9ba2-327e-40df-96c2-0ea43c538c24",
                "orientation": "-"
              },
              {
                "ref": "uuid:5a36c75b-053b-4d7b-b512-6777786d6180",
                "orientation": "-"
              },
              {
                "ref": "uuid:13dd8184-f73e-4d9f-9977-3e573274fccc",
                "orientation": "-"
              },
              {
                "ref": "uuid:71af0dde-7fc9-4290-9624-119e91f422ea",
                "orientation": "-"
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
        "area": 32.0
      }
    },
    {
      "id": "uuid:04ea47e9-b4dd-4bed-a8f4-4802d1735c74",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:ed666061-98c5-439d-ab0d-5a792437a873",
                "orientation": "-"
              },
              {
                "ref": "uuid:61f99921-a94d-4e0d-8353-f027d76227c5",
                "orientation": "+"
              },
              {
                "ref": "uuid:36b10bf3-9e3a-49cb-9dc5-7e31ade26d17",
                "orientation": "-"
              },
              {
                "ref": "uuid:ec374b67-eb42-4c53-b5cc-0f919edb2635",
                "orientation": "-"
              },
              {
                "ref": "uuid:3fef75ce-8c4c-4d89-a47f-65977debaee0",
                "orientation": "-"
              },
              {
                "ref": "uuid:c2a00070-f12b-42f9-b78c-b33daa500873",
                "orientation": "-"
              }
            ]
          }
        ]
      },
      "properties": {
        "normal": [
          -0.0,
          -0.0,
          -1.0
        ],
        "area": 88.0
      }
    },
    {
      "id": "uuid:b5fd960f-0d14-4257-9182-40de738a7e50",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:f0249395-1d12-42d1-bdaf-08c5cc29b2d4",
                "orientation": "+"
              },
              {
                "ref": "uuid:242a8400-a076-4817-86c6-acd56087cec6",
                "orientation": "+"
              },
              {
                "ref": "uuid:b4c7d3ff-cf1f-40c1-8ea0-2cd2c09cc0e0",
                "orientation": "-"
              },
              {
                "ref": "uuid:48b52144-aaa0-42a1-8e7a-40bebfcf9985",
                "orientation": "-"
              },
              {
                "ref": "uuid:ec374b67-eb42-4c53-b5cc-0f919edb2635",
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
        "area": 18.0
      }
    },
    {
      "id": "uuid:e119b096-e589-49bd-b1db-a1182dc2dade",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:474fef44-eb6e-4e19-a871-433f9bac5650",
                "orientation": "-"
              },
              {
                "ref": "uuid:fc8ba01d-faa7-4407-ae92-32b584c8a6a3",
                "orientation": "-"
              },
              {
                "ref": "uuid:f0249395-1d12-42d1-bdaf-08c5cc29b2d4",
                "orientation": "-"
              },
              {
                "ref": "uuid:36b10bf3-9e3a-49cb-9dc5-7e31ade26d17",
                "orientation": "+"
              }
            ]
          }
        ]
      },
      "properties": {
        "normal": [
          0.0,
          -1.0,
          0.0
        ],
        "area": 6.0
      }
    },
    {
      "id": "uuid:67842d3a-7c79-4f2a-8630-744711071e93",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:a604828d-a36b-4fac-ba6f-6160ade95301",
                "orientation": "-"
              },
              {
                "ref": "uuid:ec374b67-eb42-4c53-b5cc-0f919edb2635",
                "orientation": "+"
              },
              {
                "ref": "uuid:36b10bf3-9e3a-49cb-9dc5-7e31ade26d17",
                "orientation": "+"
              },
              {
                "ref": "uuid:651bb558-f6d6-439f-a8e0-dd5c3385dc94",
                "orientation": "+"
              },
              {
                "ref": "uuid:fe0704c2-5d2a-49a8-b507-e98c4047d8c4",
                "orientation": "+"
              }
            ]
          }
        ]
      },
      "properties": {
        "normal": [
          -0.0,
          -0.0,
          -1.0
        ],
        "area": 24.0
      }
    },
    {
      "id": "uuid:f1c1a636-d6ab-414c-a0aa-855fc7e85e1f",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:508f66b5-e0cb-489c-ae24-21bfb7c09280",
                "orientation": "+"
              },
              {
                "ref": "uuid:48b52144-aaa0-42a1-8e7a-40bebfcf9985",
                "orientation": "-"
              },
              {
                "ref": "uuid:a604828d-a36b-4fac-ba6f-6160ade95301",
                "orientation": "+"
              },
              {
                "ref": "uuid:511c6e7d-728b-4f1f-9763-9461eb628586",
                "orientation": "-"
              }
            ]
          }
        ]
      },
      "properties": {
        "normal": [
          0.0,
          -1.0,
          0.0
        ],
        "area": 12.0
      }
    },
    {
      "id": "uuid:a22a6c54-306e-44bc-9b94-6c32c705e63e",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:508f66b5-e0cb-489c-ae24-21bfb7c09280",
                "orientation": "-"
              },
              {
                "ref": "uuid:91cdc345-f745-4643-bc88-a24f8e2216b0",
                "orientation": "-"
              },
              {
                "ref": "uuid:38499704-81f7-4d47-965f-435e0b7b0850",
                "orientation": "-"
              },
              {
                "ref": "uuid:b4c7d3ff-cf1f-40c1-8ea0-2cd2c09cc0e0",
                "orientation": "-"
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
        "area": 8.0
      }
    },
    {
      "id": "uuid:9ed21e0a-b062-4000-88e2-50bd9153e417",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:b6e30631-9768-4020-8947-c32137328216",
                "orientation": "+"
              },
              {
                "ref": "uuid:7aa2a76d-9d5c-4540-9f2e-d8bcf36fadb5",
                "orientation": "-"
              },
              {
                "ref": "uuid:73f88b47-78ab-474d-9c62-73dfefd0dd5d",
                "orientation": "-"
              },
              {
                "ref": "uuid:21388b1b-dcba-46c0-8166-8ffc9c07e50b",
                "orientation": "-"
              },
              {
                "ref": "uuid:af347f25-a547-477c-b246-cb810756d4dc",
                "orientation": "-"
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
        "area": 16.0
      }
    },
    {
      "id": "uuid:802ff3d8-b8da-423f-8a02-7b2288485edd",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:38499704-81f7-4d47-965f-435e0b7b0850",
                "orientation": "+"
              },
              {
                "ref": "uuid:120defbd-2e05-4ec3-ba3c-ffee086d2add",
                "orientation": "-"
              },
              {
                "ref": "uuid:b6e30631-9768-4020-8947-c32137328216",
                "orientation": "-"
              },
              {
                "ref": "uuid:fb03276b-4250-4d52-81e1-035a0bd92895",
                "orientation": "-"
              }
            ]
          }
        ]
      },
      "properties": {
        "normal": [
          3.609557097661e-16,
          -1.0,
          0.0
        ],
        "area": 12.0
      }
    },
    {
      "id": "uuid:16c13b7b-aeda-4130-a793-d63f62bcc75b",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:f0249395-1d12-42d1-bdaf-08c5cc29b2d4",
                "orientation": "+"
              },
              {
                "ref": "uuid:90e3950e-40b2-4d9d-a135-1a4b708305aa",
                "orientation": "+"
              },
              {
                "ref": "uuid:736411fb-67f0-47c0-bf77-bf4f9048bcda",
                "orientation": "+"
              },
              {
                "ref": "uuid:651bb558-f6d6-439f-a8e0-dd5c3385dc94",
                "orientation": "-"
              },
              {
                "ref": "uuid:36b10bf3-9e3a-49cb-9dc5-7e31ade26d17",
                "orientation": "-"
              }
            ]
          }
        ]
      },
      "properties": {
        "normal": [
          0.0,
          1.0,
          0.0
        ],
        "area": 12.0
      }
    },
    {
      "id": "uuid:786e8738-1690-426d-8e2f-f5e734336a67",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:8601e9ea-c48f-4c00-a066-f950ed6b0724",
                "orientation": "-"
              },
              {
                "ref": "uuid:21388b1b-dcba-46c0-8166-8ffc9c07e50b",
                "orientation": "+"
              },
              {
                "ref": "uuid:73f88b47-78ab-474d-9c62-73dfefd0dd5d",
                "orientation": "+"
              },
              {
                "ref": "uuid:46fd1def-a93e-4c99-9868-172cf1b40ff1",
                "orientation": "-"
              },
              {
                "ref": "uuid:90e3950e-40b2-4d9d-a135-1a4b708305aa",
                "orientation": "-"
              }
            ]
          }
        ]
      },
      "properties": {
        "normal": [
          0.0,
          1.0,
          0.0
        ],
        "area": 12.0
      }
    }
  ],
  "solids": [
    {
      "id": "uuid:758590d2-8cc6-4ff7-8fcc-d7ecd01b3498",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Solid",
        "shells": [
          {
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
          }
        ]
      },
      "properties": {
        "name": "Upper East",
        "levels": [
          2
        ],
        "volume": 168.0
      }
    }
  ]
}
```

#### jsonld
```jsonld
{
  "@context": "https://surroundaustralia.github.io/topo-feature/build/annotated/geo/topo/features/topo-feature-multi-collection/context.jsonld",
  "type": "FeatureCollection",
  "features": [],
  "metadata": {
    "units": "meters",
    "coordinate_precision": 3,
    "conversion_factor": 0.0254
  },
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
    },
    {
      "id": "uuid:a0ec1bfd-0f7a-4c42-bc71-bacdcd44071d",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          12.0,
          2.0,
          3.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:11caaac5-b631-4bd8-a6af-f82cb6371071",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          12.0,
          2.0,
          6.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:5e08b82a-8efb-447c-b5c2-54f8ff5788b3",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          10.0,
          10.0,
          6.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:22138e52-65ef-4773-b69d-5ea2628fad7b",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          10.0,
          10.0,
          3.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:62a26df3-3e19-49bf-9ee4-24dbeb814a70",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          10.0,
          6.0,
          6.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:8087116e-84cc-44d1-8047-78dc3837d7e8",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          12.0,
          6.0,
          6.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:f34d9f2e-4180-41de-a613-46f78f4c178f",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          10.0,
          6.0,
          3.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:87373f95-ee4b-4471-9980-f4a8258ee1e3",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          12.0,
          6.0,
          3.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:e7300a01-f8c1-4351-9511-02790a5376b0",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          2.0,
          10.0,
          3.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:1e20237c-9dfa-4251-9f3f-cc5e56a5becd",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          2.0,
          10.0,
          6.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:307b7db6-8014-4628-b80e-ff925bf71168",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          2.0,
          2.0,
          3.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:3c08ae4e-7b27-4e95-8bfb-6b42451be8f6",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          2.0,
          2.0,
          6.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:b8412dad-b40a-4e35-9f42-f983e0fce39d",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          8.0,
          2.0,
          3.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:9a1d8124-ca37-4abd-b07e-bff4c8eaa2f9",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          8.0,
          2.0,
          6.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:caa6045e-4189-4571-8914-1189e51ac71e",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          8.0,
          6.0,
          6.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:1d2a5d01-8547-4de6-abea-8f9ab994d35e",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          8.0,
          6.0,
          3.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:ff685e16-64f8-4f41-8a9e-7d8e83312fd6",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          12.0,
          0.0,
          0.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:92bd9ed9-c138-45c3-b72c-a9ecb7f7cfe9",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          20.0,
          0.0,
          0.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:c060c1dc-6544-4595-b583-72ecf603fd6d",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          20.0,
          0.0,
          3.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:7fe8cb9b-976e-4344-bf72-f3721d878ba4",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          12.0,
          0.0,
          3.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:20d3c864-4a8c-4440-b600-a1d424e92f51",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          20.0,
          10.0,
          0.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:2b34e214-cba7-4a66-8443-ceb932c5ef09",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          20.0,
          10.0,
          3.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:16c35df5-bc63-4edd-8da5-dbcc5548a61e",
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
      "id": "uuid:206806a4-a2f8-4c04-858e-99d289858a40",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          12.0,
          6.0,
          0.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:d8d136c6-604c-4ad3-adf7-b0a7e04d034a",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          10.0,
          6.0,
          0.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:b6d10150-f9d4-4f7e-b028-c4bbee8e7717",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          0.0,
          0.0,
          0.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:a3b19f96-9bca-4c31-ac7e-4cb1615878df",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          8.0,
          0.0,
          0.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:793997c5-bcc4-4610-984b-6cf2c2997348",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          8.0,
          0.0,
          3.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:8e503e04-ad51-423b-8102-708a845189b6",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          0.0,
          0.0,
          3.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:ca62577e-8e24-4af2-88bf-33b34e25e606",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          0.0,
          10.0,
          0.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:8cda5c68-9c82-43b4-84d7-979efa36dfe1",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          0.0,
          10.0,
          3.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:9ef3d2ea-acea-4365-8bd5-2f8ef3036ed0",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          8.0,
          6.0,
          0.0
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
    },
    {
      "id": "uuid:32e82eb1-93a4-4387-8cd0-9616ebf1e39b",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:a0ec1bfd-0f7a-4c42-bc71-bacdcd44071d",
          "uuid:fad324b9-801f-40f4-b65b-91f8753e9698"
        ]
      },
      "properties": {
        "length": 6.0
      }
    },
    {
      "id": "uuid:8582d9c2-6053-495a-8413-f5493691c0de",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:c611f840-2829-44b2-b367-3915ca7875a4",
          "uuid:11caaac5-b631-4bd8-a6af-f82cb6371071"
        ]
      },
      "properties": {
        "length": 6.0
      }
    },
    {
      "id": "uuid:120defbd-2e05-4ec3-ba3c-ffee086d2add",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:11caaac5-b631-4bd8-a6af-f82cb6371071",
          "uuid:a0ec1bfd-0f7a-4c42-bc71-bacdcd44071d"
        ]
      },
      "properties": {
        "length": 3.0
      }
    },
    {
      "id": "uuid:4c2a6434-03b0-4aa2-85ea-a9fcaea41555",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:5e08b82a-8efb-447c-b5c2-54f8ff5788b3",
          "uuid:8d2be28b-8f31-46de-99cb-4d8709502cd0"
        ]
      },
      "properties": {
        "length": 8.0
      }
    },
    {
      "id": "uuid:830b9098-d914-4e8b-869d-4d20f1eb5c81",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:ad6d8fcc-402c-482e-8f1a-7492ccaead38",
          "uuid:22138e52-65ef-4773-b69d-5ea2628fad7b"
        ]
      },
      "properties": {
        "length": 8.0
      }
    },
    {
      "id": "uuid:3b72e45d-d351-46e4-a5b7-9ac9bc339d03",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:22138e52-65ef-4773-b69d-5ea2628fad7b",
          "uuid:5e08b82a-8efb-447c-b5c2-54f8ff5788b3"
        ]
      },
      "properties": {
        "length": 3.0
      }
    },
    {
      "id": "uuid:921e2351-efbf-48be-85d3-eedc0dc2ddc0",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:5e08b82a-8efb-447c-b5c2-54f8ff5788b3",
          "uuid:62a26df3-3e19-49bf-9ee4-24dbeb814a70"
        ]
      },
      "properties": {
        "length": 4.0
      }
    },
    {
      "id": "uuid:73f88b47-78ab-474d-9c62-73dfefd0dd5d",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:62a26df3-3e19-49bf-9ee4-24dbeb814a70",
          "uuid:8087116e-84cc-44d1-8047-78dc3837d7e8"
        ]
      },
      "properties": {
        "length": 2.0
      }
    },
    {
      "id": "uuid:7aa2a76d-9d5c-4540-9f2e-d8bcf36fadb5",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:8087116e-84cc-44d1-8047-78dc3837d7e8",
          "uuid:11caaac5-b631-4bd8-a6af-f82cb6371071"
        ]
      },
      "properties": {
        "length": 4.0
      }
    },
    {
      "id": "uuid:ed6b8b1c-7030-4d70-ab61-94cb3aa904a7",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:22138e52-65ef-4773-b69d-5ea2628fad7b",
          "uuid:f34d9f2e-4180-41de-a613-46f78f4c178f"
        ]
      },
      "properties": {
        "length": 4.0
      }
    },
    {
      "id": "uuid:5f17e211-e8b5-4a7c-85e4-798787fd82a5",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:f34d9f2e-4180-41de-a613-46f78f4c178f",
          "uuid:62a26df3-3e19-49bf-9ee4-24dbeb814a70"
        ]
      },
      "properties": {
        "length": 3.0
      }
    },
    {
      "id": "uuid:7da1c2fe-f798-43cc-af44-ac63f968139c",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:f34d9f2e-4180-41de-a613-46f78f4c178f",
          "uuid:87373f95-ee4b-4471-9980-f4a8258ee1e3"
        ]
      },
      "properties": {
        "length": 2.0
      }
    },
    {
      "id": "uuid:46fd1def-a93e-4c99-9868-172cf1b40ff1",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:87373f95-ee4b-4471-9980-f4a8258ee1e3",
          "uuid:8087116e-84cc-44d1-8047-78dc3837d7e8"
        ]
      },
      "properties": {
        "length": 3.0
      }
    },
    {
      "id": "uuid:856e43bc-ee35-44d0-b25e-ea94a53e1db6",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:a0ec1bfd-0f7a-4c42-bc71-bacdcd44071d",
          "uuid:87373f95-ee4b-4471-9980-f4a8258ee1e3"
        ]
      },
      "properties": {
        "length": 4.0
      }
    },
    {
      "id": "uuid:a5ed4867-4011-4db7-8425-cbe61a6d3a2d",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:22138e52-65ef-4773-b69d-5ea2628fad7b",
          "uuid:e7300a01-f8c1-4351-9511-02790a5376b0"
        ]
      },
      "properties": {
        "length": 8.0
      }
    },
    {
      "id": "uuid:745aa367-94b6-4949-a856-5271ec6672e9",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:e7300a01-f8c1-4351-9511-02790a5376b0",
          "uuid:1e20237c-9dfa-4251-9f3f-cc5e56a5becd"
        ]
      },
      "properties": {
        "length": 3.0
      }
    },
    {
      "id": "uuid:f921656a-58e3-4375-bdff-ac8019f524cf",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:1e20237c-9dfa-4251-9f3f-cc5e56a5becd",
          "uuid:5e08b82a-8efb-447c-b5c2-54f8ff5788b3"
        ]
      },
      "properties": {
        "length": 8.0
      }
    },
    {
      "id": "uuid:6aab9ba2-327e-40df-96c2-0ea43c538c24",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:e7300a01-f8c1-4351-9511-02790a5376b0",
          "uuid:307b7db6-8014-4628-b80e-ff925bf71168"
        ]
      },
      "properties": {
        "length": 8.0
      }
    },
    {
      "id": "uuid:fb28f3f2-8ea7-4c03-bff5-7352addba8b3",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:3c08ae4e-7b27-4e95-8bfb-6b42451be8f6",
          "uuid:307b7db6-8014-4628-b80e-ff925bf71168"
        ]
      },
      "properties": {
        "length": 3.0
      }
    },
    {
      "id": "uuid:e0416983-f0db-4c99-8a72-3f8b4615ab05",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:3c08ae4e-7b27-4e95-8bfb-6b42451be8f6",
          "uuid:1e20237c-9dfa-4251-9f3f-cc5e56a5becd"
        ]
      },
      "properties": {
        "length": 8.0
      }
    },
    {
      "id": "uuid:07093c51-5d4e-42ad-941f-8eeb89e5ae78",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:307b7db6-8014-4628-b80e-ff925bf71168",
          "uuid:b8412dad-b40a-4e35-9f42-f983e0fce39d"
        ]
      },
      "properties": {
        "length": 6.0
      }
    },
    {
      "id": "uuid:fb03276b-4250-4d52-81e1-035a0bd92895",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:b8412dad-b40a-4e35-9f42-f983e0fce39d",
          "uuid:9a1d8124-ca37-4abd-b07e-bff4c8eaa2f9"
        ]
      },
      "properties": {
        "length": 3.0
      }
    },
    {
      "id": "uuid:c97ac36d-9cf3-48ca-bb8f-c36cb335bebf",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:9a1d8124-ca37-4abd-b07e-bff4c8eaa2f9",
          "uuid:3c08ae4e-7b27-4e95-8bfb-6b42451be8f6"
        ]
      },
      "properties": {
        "length": 6.0
      }
    },
    {
      "id": "uuid:af347f25-a547-477c-b246-cb810756d4dc",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:9a1d8124-ca37-4abd-b07e-bff4c8eaa2f9",
          "uuid:caa6045e-4189-4571-8914-1189e51ac71e"
        ]
      },
      "properties": {
        "length": 4.0
      }
    },
    {
      "id": "uuid:21388b1b-dcba-46c0-8166-8ffc9c07e50b",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:caa6045e-4189-4571-8914-1189e51ac71e",
          "uuid:62a26df3-3e19-49bf-9ee4-24dbeb814a70"
        ]
      },
      "properties": {
        "length": 2.0
      }
    },
    {
      "id": "uuid:fc8ba01d-faa7-4407-ae92-32b584c8a6a3",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:1d2a5d01-8547-4de6-abea-8f9ab994d35e",
          "uuid:f34d9f2e-4180-41de-a613-46f78f4c178f"
        ]
      },
      "properties": {
        "length": 2.0
      }
    },
    {
      "id": "uuid:8601e9ea-c48f-4c00-a066-f950ed6b0724",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:caa6045e-4189-4571-8914-1189e51ac71e",
          "uuid:1d2a5d01-8547-4de6-abea-8f9ab994d35e"
        ]
      },
      "properties": {
        "length": 3.0
      }
    },
    {
      "id": "uuid:242a8400-a076-4817-86c6-acd56087cec6",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:1d2a5d01-8547-4de6-abea-8f9ab994d35e",
          "uuid:b8412dad-b40a-4e35-9f42-f983e0fce39d"
        ]
      },
      "properties": {
        "length": 4.0
      }
    },
    {
      "id": "uuid:4ad210b7-5de5-4732-af7c-978de28f988b",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:ff685e16-64f8-4f41-8a9e-7d8e83312fd6",
          "uuid:92bd9ed9-c138-45c3-b72c-a9ecb7f7cfe9"
        ]
      },
      "properties": {
        "length": 8.0
      }
    },
    {
      "id": "uuid:c12882ea-089f-4616-942c-ceb8fb4ac05e",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:92bd9ed9-c138-45c3-b72c-a9ecb7f7cfe9",
          "uuid:c060c1dc-6544-4595-b583-72ecf603fd6d"
        ]
      },
      "properties": {
        "length": 3.0
      }
    },
    {
      "id": "uuid:4406e3f5-89dc-463b-84e4-487490f71f1a",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:c060c1dc-6544-4595-b583-72ecf603fd6d",
          "uuid:7fe8cb9b-976e-4344-bf72-f3721d878ba4"
        ]
      },
      "properties": {
        "length": 8.0
      }
    },
    {
      "id": "uuid:511c6e7d-728b-4f1f-9763-9461eb628586",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:7fe8cb9b-976e-4344-bf72-f3721d878ba4",
          "uuid:ff685e16-64f8-4f41-8a9e-7d8e83312fd6"
        ]
      },
      "properties": {
        "length": 3.0
      }
    },
    {
      "id": "uuid:79205d80-72e5-4bd8-9c03-9503e4e690cc",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:92bd9ed9-c138-45c3-b72c-a9ecb7f7cfe9",
          "uuid:20d3c864-4a8c-4440-b600-a1d424e92f51"
        ]
      },
      "properties": {
        "length": 10.0
      }
    },
    {
      "id": "uuid:06babc8d-f0d6-43eb-bfad-931055bae084",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:20d3c864-4a8c-4440-b600-a1d424e92f51",
          "uuid:2b34e214-cba7-4a66-8443-ceb932c5ef09"
        ]
      },
      "properties": {
        "length": 3.0
      }
    },
    {
      "id": "uuid:fc877bbe-72a8-4e59-b959-010e6660984a",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:2b34e214-cba7-4a66-8443-ceb932c5ef09",
          "uuid:c060c1dc-6544-4595-b583-72ecf603fd6d"
        ]
      },
      "properties": {
        "length": 10.0
      }
    },
    {
      "id": "uuid:aafd209b-cd13-401a-83f5-26751a02cffe",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:20d3c864-4a8c-4440-b600-a1d424e92f51",
          "uuid:16c35df5-bc63-4edd-8da5-dbcc5548a61e"
        ]
      },
      "properties": {
        "length": 10.0
      }
    },
    {
      "id": "uuid:2f3bbe39-01e3-4c96-8dea-377e38729a03",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:16c35df5-bc63-4edd-8da5-dbcc5548a61e",
          "uuid:22138e52-65ef-4773-b69d-5ea2628fad7b"
        ]
      },
      "properties": {
        "length": 3.0
      }
    },
    {
      "id": "uuid:9238cbda-d019-4b57-8319-0cc355656802",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:ad6d8fcc-402c-482e-8f1a-7492ccaead38",
          "uuid:2b34e214-cba7-4a66-8443-ceb932c5ef09"
        ]
      },
      "properties": {
        "length": 2.0
      }
    },
    {
      "id": "uuid:91cdc345-f745-4643-bc88-a24f8e2216b0",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:a0ec1bfd-0f7a-4c42-bc71-bacdcd44071d",
          "uuid:7fe8cb9b-976e-4344-bf72-f3721d878ba4"
        ]
      },
      "properties": {
        "length": 2.0
      }
    },
    {
      "id": "uuid:fe0704c2-5d2a-49a8-b507-e98c4047d8c4",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:206806a4-a2f8-4c04-858e-99d289858a40",
          "uuid:ff685e16-64f8-4f41-8a9e-7d8e83312fd6"
        ]
      },
      "properties": {
        "length": 6.0
      }
    },
    {
      "id": "uuid:651bb558-f6d6-439f-a8e0-dd5c3385dc94",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:d8d136c6-604c-4ad3-adf7-b0a7e04d034a",
          "uuid:206806a4-a2f8-4c04-858e-99d289858a40"
        ]
      },
      "properties": {
        "length": 2.0
      }
    },
    {
      "id": "uuid:61f99921-a94d-4e0d-8353-f027d76227c5",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:16c35df5-bc63-4edd-8da5-dbcc5548a61e",
          "uuid:d8d136c6-604c-4ad3-adf7-b0a7e04d034a"
        ]
      },
      "properties": {
        "length": 4.0
      }
    },
    {
      "id": "uuid:474fef44-eb6e-4e19-a871-433f9bac5650",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:f34d9f2e-4180-41de-a613-46f78f4c178f",
          "uuid:d8d136c6-604c-4ad3-adf7-b0a7e04d034a"
        ]
      },
      "properties": {
        "length": 3.0
      }
    },
    {
      "id": "uuid:736411fb-67f0-47c0-bf77-bf4f9048bcda",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:87373f95-ee4b-4471-9980-f4a8258ee1e3",
          "uuid:206806a4-a2f8-4c04-858e-99d289858a40"
        ]
      },
      "properties": {
        "length": 3.0
      }
    },
    {
      "id": "uuid:3fef75ce-8c4c-4d89-a47f-65977debaee0",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:b6d10150-f9d4-4f7e-b028-c4bbee8e7717",
          "uuid:a3b19f96-9bca-4c31-ac7e-4cb1615878df"
        ]
      },
      "properties": {
        "length": 8.0
      }
    },
    {
      "id": "uuid:48b52144-aaa0-42a1-8e7a-40bebfcf9985",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:a3b19f96-9bca-4c31-ac7e-4cb1615878df",
          "uuid:793997c5-bcc4-4610-984b-6cf2c2997348"
        ]
      },
      "properties": {
        "length": 3.0
      }
    },
    {
      "id": "uuid:71af0dde-7fc9-4290-9624-119e91f422ea",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:793997c5-bcc4-4610-984b-6cf2c2997348",
          "uuid:8e503e04-ad51-423b-8102-708a845189b6"
        ]
      },
      "properties": {
        "length": 8.0
      }
    },
    {
      "id": "uuid:ad13a84c-df97-4b75-9dc1-1ce452249964",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:8e503e04-ad51-423b-8102-708a845189b6",
          "uuid:b6d10150-f9d4-4f7e-b028-c4bbee8e7717"
        ]
      },
      "properties": {
        "length": 3.0
      }
    },
    {
      "id": "uuid:c2a00070-f12b-42f9-b78c-b33daa500873",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:ca62577e-8e24-4af2-88bf-33b34e25e606",
          "uuid:b6d10150-f9d4-4f7e-b028-c4bbee8e7717"
        ]
      },
      "properties": {
        "length": 10.0
      }
    },
    {
      "id": "uuid:13dd8184-f73e-4d9f-9977-3e573274fccc",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:8e503e04-ad51-423b-8102-708a845189b6",
          "uuid:8cda5c68-9c82-43b4-84d7-979efa36dfe1"
        ]
      },
      "properties": {
        "length": 10.0
      }
    },
    {
      "id": "uuid:7355081e-9fa3-4fb5-ab10-c4efaa41d61f",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:ca62577e-8e24-4af2-88bf-33b34e25e606",
          "uuid:8cda5c68-9c82-43b4-84d7-979efa36dfe1"
        ]
      },
      "properties": {
        "length": 3.0
      }
    },
    {
      "id": "uuid:ed666061-98c5-439d-ab0d-5a792437a873",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:16c35df5-bc63-4edd-8da5-dbcc5548a61e",
          "uuid:ca62577e-8e24-4af2-88bf-33b34e25e606"
        ]
      },
      "properties": {
        "length": 10.0
      }
    },
    {
      "id": "uuid:5a36c75b-053b-4d7b-b512-6777786d6180",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:8cda5c68-9c82-43b4-84d7-979efa36dfe1",
          "uuid:e7300a01-f8c1-4351-9511-02790a5376b0"
        ]
      },
      "properties": {
        "length": 2.0
      }
    },
    {
      "id": "uuid:b4c7d3ff-cf1f-40c1-8ea0-2cd2c09cc0e0",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:793997c5-bcc4-4610-984b-6cf2c2997348",
          "uuid:b8412dad-b40a-4e35-9f42-f983e0fce39d"
        ]
      },
      "properties": {
        "length": 2.0
      }
    },
    {
      "id": "uuid:36b10bf3-9e3a-49cb-9dc5-7e31ade26d17",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:9ef3d2ea-acea-4365-8bd5-2f8ef3036ed0",
          "uuid:d8d136c6-604c-4ad3-adf7-b0a7e04d034a"
        ]
      },
      "properties": {
        "length": 2.0
      }
    },
    {
      "id": "uuid:ec374b67-eb42-4c53-b5cc-0f919edb2635",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:a3b19f96-9bca-4c31-ac7e-4cb1615878df",
          "uuid:9ef3d2ea-acea-4365-8bd5-2f8ef3036ed0"
        ]
      },
      "properties": {
        "length": 6.0
      }
    },
    {
      "id": "uuid:f0249395-1d12-42d1-bdaf-08c5cc29b2d4",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:9ef3d2ea-acea-4365-8bd5-2f8ef3036ed0",
          "uuid:1d2a5d01-8547-4de6-abea-8f9ab994d35e"
        ]
      },
      "properties": {
        "length": 3.0
      }
    },
    {
      "id": "uuid:a604828d-a36b-4fac-ba6f-6160ade95301",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:a3b19f96-9bca-4c31-ac7e-4cb1615878df",
          "uuid:ff685e16-64f8-4f41-8a9e-7d8e83312fd6"
        ]
      },
      "properties": {
        "length": 4.0
      }
    },
    {
      "id": "uuid:508f66b5-e0cb-489c-ae24-21bfb7c09280",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:7fe8cb9b-976e-4344-bf72-f3721d878ba4",
          "uuid:793997c5-bcc4-4610-984b-6cf2c2997348"
        ]
      },
      "properties": {
        "length": 4.0
      }
    },
    {
      "id": "uuid:38499704-81f7-4d47-965f-435e0b7b0850",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:b8412dad-b40a-4e35-9f42-f983e0fce39d",
          "uuid:a0ec1bfd-0f7a-4c42-bc71-bacdcd44071d"
        ]
      },
      "properties": {
        "length": 4.0
      }
    },
    {
      "id": "uuid:b6e30631-9768-4020-8947-c32137328216",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:9a1d8124-ca37-4abd-b07e-bff4c8eaa2f9",
          "uuid:11caaac5-b631-4bd8-a6af-f82cb6371071"
        ]
      },
      "properties": {
        "length": 4.0
      }
    },
    {
      "id": "uuid:90e3950e-40b2-4d9d-a135-1a4b708305aa",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:1d2a5d01-8547-4de6-abea-8f9ab994d35e",
          "uuid:87373f95-ee4b-4471-9980-f4a8258ee1e3"
        ]
      },
      "properties": {
        "length": 4.0
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
    },
    {
      "id": "uuid:4a294022-4864-49c7-8cee-f9e43360bc4e",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:32e82eb1-93a4-4387-8cd0-9616ebf1e39b",
                "orientation": "+"
              },
              {
                "ref": "uuid:83ff2cdf-6c58-4e7b-ba55-e084eff8c569",
                "orientation": "-"
              },
              {
                "ref": "uuid:8582d9c2-6053-495a-8413-f5493691c0de",
                "orientation": "+"
              },
              {
                "ref": "uuid:120defbd-2e05-4ec3-ba3c-ffee086d2add",
                "orientation": "+"
              }
            ]
          }
        ]
      },
      "properties": {
        "normal": [
          0.0,
          -1.0,
          3.007964248051e-16
        ],
        "area": 18.0
      }
    },
    {
      "id": "uuid:01947f47-ee13-44a9-85a4-2bcb4881982a",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:4c2a6434-03b0-4aa2-85ea-a9fcaea41555",
                "orientation": "+"
              },
              {
                "ref": "uuid:c60507ba-226b-4e49-a702-e9afef899b23",
                "orientation": "-"
              },
              {
                "ref": "uuid:830b9098-d914-4e8b-869d-4d20f1eb5c81",
                "orientation": "+"
              },
              {
                "ref": "uuid:3b72e45d-d351-46e4-a5b7-9ac9bc339d03",
                "orientation": "+"
              }
            ]
          }
        ]
      },
      "properties": {
        "normal": [
          0.0,
          1.0,
          0.0
        ],
        "area": 24.0
      }
    },
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
    },
    {
      "id": "uuid:3c1f5c4b-d842-40b6-a332-99d50015fa8f",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:ed6b8b1c-7030-4d70-ab61-94cb3aa904a7",
                "orientation": "+"
              },
              {
                "ref": "uuid:5f17e211-e8b5-4a7c-85e4-798787fd82a5",
                "orientation": "+"
              },
              {
                "ref": "uuid:921e2351-efbf-48be-85d3-eedc0dc2ddc0",
                "orientation": "-"
              },
              {
                "ref": "uuid:3b72e45d-d351-46e4-a5b7-9ac9bc339d03",
                "orientation": "-"
              }
            ]
          }
        ]
      },
      "properties": {
        "normal": [
          -1.0,
          -0.0,
          -0.0
        ],
        "area": 12.0
      }
    },
    {
      "id": "uuid:fe522919-1421-4fd1-9930-8c6551e3f2a5",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:7da1c2fe-f798-43cc-af44-ac63f968139c",
                "orientation": "+"
              },
              {
                "ref": "uuid:46fd1def-a93e-4c99-9868-172cf1b40ff1",
                "orientation": "+"
              },
              {
                "ref": "uuid:73f88b47-78ab-474d-9c62-73dfefd0dd5d",
                "orientation": "-"
              },
              {
                "ref": "uuid:5f17e211-e8b5-4a7c-85e4-798787fd82a5",
                "orientation": "-"
              }
            ]
          }
        ]
      },
      "properties": {
        "normal": [
          0.0,
          -1.0,
          0.0
        ],
        "area": 6.0
      }
    },
    {
      "id": "uuid:2387ae98-9236-42fe-9414-c45b99954c41",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:856e43bc-ee35-44d0-b25e-ea94a53e1db6",
                "orientation": "+"
              },
              {
                "ref": "uuid:7da1c2fe-f798-43cc-af44-ac63f968139c",
                "orientation": "-"
              },
              {
                "ref": "uuid:ed6b8b1c-7030-4d70-ab61-94cb3aa904a7",
                "orientation": "-"
              },
              {
                "ref": "uuid:830b9098-d914-4e8b-869d-4d20f1eb5c81",
                "orientation": "-"
              },
              {
                "ref": "uuid:d69c596c-134e-4216-9bf6-d0f10e6886d8",
                "orientation": "-"
              },
              {
                "ref": "uuid:32e82eb1-93a4-4387-8cd0-9616ebf1e39b",
                "orientation": "-"
              }
            ]
          }
        ]
      },
      "properties": {
        "normal": [
          0.0,
          0.0,
          -1.0
        ],
        "area": 56.0
      }
    },
    {
      "id": "uuid:4ba85faa-3935-4e89-a9f8-dcd647a5dbed",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:856e43bc-ee35-44d0-b25e-ea94a53e1db6",
                "orientation": "-"
              },
              {
                "ref": "uuid:120defbd-2e05-4ec3-ba3c-ffee086d2add",
                "orientation": "-"
              },
              {
                "ref": "uuid:7aa2a76d-9d5c-4540-9f2e-d8bcf36fadb5",
                "orientation": "-"
              },
              {
                "ref": "uuid:46fd1def-a93e-4c99-9868-172cf1b40ff1",
                "orientation": "-"
              }
            ]
          }
        ]
      },
      "properties": {
        "normal": [
          -1.0,
          -0.0,
          -0.0
        ],
        "area": 12.0
      }
    },
    {
      "id": "uuid:c55c88db-d187-4d7e-9aaa-b9d3dce52663",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:a5ed4867-4011-4db7-8425-cbe61a6d3a2d",
                "orientation": "+"
              },
              {
                "ref": "uuid:745aa367-94b6-4949-a856-5271ec6672e9",
                "orientation": "+"
              },
              {
                "ref": "uuid:f921656a-58e3-4375-bdff-ac8019f524cf",
                "orientation": "+"
              },
              {
                "ref": "uuid:3b72e45d-d351-46e4-a5b7-9ac9bc339d03",
                "orientation": "-"
              }
            ]
          }
        ]
      },
      "properties": {
        "normal": [
          0.0,
          1.0,
          0.0
        ],
        "area": 24.0
      }
    },
    {
      "id": "uuid:dbd99467-ea83-4dff-b03f-eef2aad2687c",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:745aa367-94b6-4949-a856-5271ec6672e9",
                "orientation": "-"
              },
              {
                "ref": "uuid:6aab9ba2-327e-40df-96c2-0ea43c538c24",
                "orientation": "+"
              },
              {
                "ref": "uuid:fb28f3f2-8ea7-4c03-bff5-7352addba8b3",
                "orientation": "-"
              },
              {
                "ref": "uuid:e0416983-f0db-4c99-8a72-3f8b4615ab05",
                "orientation": "+"
              }
            ]
          }
        ]
      },
      "properties": {
        "normal": [
          -1.0,
          -0.0,
          -3.007964248051e-16
        ],
        "area": 24.0
      }
    },
    {
      "id": "uuid:0e55e87d-8475-4c92-89e7-d62f97ce9ec2",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:fb28f3f2-8ea7-4c03-bff5-7352addba8b3",
                "orientation": "+"
              },
              {
                "ref": "uuid:07093c51-5d4e-42ad-941f-8eeb89e5ae78",
                "orientation": "+"
              },
              {
                "ref": "uuid:fb03276b-4250-4d52-81e1-035a0bd92895",
                "orientation": "+"
              },
              {
                "ref": "uuid:c97ac36d-9cf3-48ca-bb8f-c36cb335bebf",
                "orientation": "+"
              }
            ]
          }
        ]
      },
      "properties": {
        "normal": [
          0.0,
          -1.0,
          0.0
        ],
        "area": 18.0
      }
    },
    {
      "id": "uuid:6a5ff199-56a7-4e65-94b5-bfdf2ae3449d",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:f921656a-58e3-4375-bdff-ac8019f524cf",
                "orientation": "-"
              },
              {
                "ref": "uuid:e0416983-f0db-4c99-8a72-3f8b4615ab05",
                "orientation": "-"
              },
              {
                "ref": "uuid:c97ac36d-9cf3-48ca-bb8f-c36cb335bebf",
                "orientation": "-"
              },
              {
                "ref": "uuid:af347f25-a547-477c-b246-cb810756d4dc",
                "orientation": "+"
              },
              {
                "ref": "uuid:21388b1b-dcba-46c0-8166-8ffc9c07e50b",
                "orientation": "+"
              },
              {
                "ref": "uuid:921e2351-efbf-48be-85d3-eedc0dc2ddc0",
                "orientation": "-"
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
    },
    {
      "id": "uuid:e499fea3-19f7-4863-8a58-751caff7d884",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:fc8ba01d-faa7-4407-ae92-32b584c8a6a3",
                "orientation": "+"
              },
              {
                "ref": "uuid:5f17e211-e8b5-4a7c-85e4-798787fd82a5",
                "orientation": "+"
              },
              {
                "ref": "uuid:21388b1b-dcba-46c0-8166-8ffc9c07e50b",
                "orientation": "-"
              },
              {
                "ref": "uuid:8601e9ea-c48f-4c00-a066-f950ed6b0724",
                "orientation": "+"
              }
            ]
          }
        ]
      },
      "properties": {
        "normal": [
          0.0,
          -1.0,
          0.0
        ],
        "area": 6.0
      }
    },
    {
      "id": "uuid:9e4c0c0e-6acf-401b-b35e-0e917ce3a5fc",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:242a8400-a076-4817-86c6-acd56087cec6",
                "orientation": "+"
              },
              {
                "ref": "uuid:07093c51-5d4e-42ad-941f-8eeb89e5ae78",
                "orientation": "-"
              },
              {
                "ref": "uuid:6aab9ba2-327e-40df-96c2-0ea43c538c24",
                "orientation": "-"
              },
              {
                "ref": "uuid:a5ed4867-4011-4db7-8425-cbe61a6d3a2d",
                "orientation": "-"
              },
              {
                "ref": "uuid:ed6b8b1c-7030-4d70-ab61-94cb3aa904a7",
                "orientation": "+"
              },
              {
                "ref": "uuid:fc8ba01d-faa7-4407-ae92-32b584c8a6a3",
                "orientation": "-"
              }
            ]
          }
        ]
      },
      "properties": {
        "normal": [
          0.0,
          0.0,
          -1.0
        ],
        "area": 56.0
      }
    },
    {
      "id": "uuid:3f5c452f-9815-4b21-9b2d-0127ae80c385",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:242a8400-a076-4817-86c6-acd56087cec6",
                "orientation": "-"
              },
              {
                "ref": "uuid:8601e9ea-c48f-4c00-a066-f950ed6b0724",
                "orientation": "-"
              },
              {
                "ref": "uuid:af347f25-a547-477c-b246-cb810756d4dc",
                "orientation": "-"
              },
              {
                "ref": "uuid:fb03276b-4250-4d52-81e1-035a0bd92895",
                "orientation": "-"
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
        "area": 12.0
      }
    },
    {
      "id": "uuid:66a430c0-123f-42df-9d11-64347362bcb3",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:4ad210b7-5de5-4732-af7c-978de28f988b",
                "orientation": "+"
              },
              {
                "ref": "uuid:c12882ea-089f-4616-942c-ceb8fb4ac05e",
                "orientation": "+"
              },
              {
                "ref": "uuid:4406e3f5-89dc-463b-84e4-487490f71f1a",
                "orientation": "+"
              },
              {
                "ref": "uuid:511c6e7d-728b-4f1f-9763-9461eb628586",
                "orientation": "+"
              }
            ]
          }
        ]
      },
      "properties": {
        "normal": [
          0.0,
          -1.0,
          0.0
        ],
        "area": 24.0
      }
    },
    {
      "id": "uuid:31d8f2b5-cc74-4f72-b230-d27dad0fd589",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:79205d80-72e5-4bd8-9c03-9503e4e690cc",
                "orientation": "+"
              },
              {
                "ref": "uuid:06babc8d-f0d6-43eb-bfad-931055bae084",
                "orientation": "+"
              },
              {
                "ref": "uuid:fc877bbe-72a8-4e59-b959-010e6660984a",
                "orientation": "+"
              },
              {
                "ref": "uuid:c12882ea-089f-4616-942c-ceb8fb4ac05e",
                "orientation": "-"
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
        "area": 30.0
      }
    },
    {
      "id": "uuid:65959e29-11cb-4568-904d-61c4a7c17b98",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:aafd209b-cd13-401a-83f5-26751a02cffe",
                "orientation": "+"
              },
              {
                "ref": "uuid:2f3bbe39-01e3-4c96-8dea-377e38729a03",
                "orientation": "+"
              },
              {
                "ref": "uuid:830b9098-d914-4e8b-869d-4d20f1eb5c81",
                "orientation": "-"
              },
              {
                "ref": "uuid:9238cbda-d019-4b57-8319-0cc355656802",
                "orientation": "+"
              },
              {
                "ref": "uuid:06babc8d-f0d6-43eb-bfad-931055bae084",
                "orientation": "-"
              }
            ]
          }
        ]
      },
      "properties": {
        "normal": [
          0.0,
          1.0,
          0.0
        ],
        "area": 30.0
      }
    },
    {
      "id": "uuid:e2efe498-c6d5-4f9c-ac07-4c1c9e406675",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:d69c596c-134e-4216-9bf6-d0f10e6886d8",
                "orientation": "-"
              },
              {
                "ref": "uuid:32e82eb1-93a4-4387-8cd0-9616ebf1e39b",
                "orientation": "-"
              },
              {
                "ref": "uuid:91cdc345-f745-4643-bc88-a24f8e2216b0",
                "orientation": "+"
              },
              {
                "ref": "uuid:4406e3f5-89dc-463b-84e4-487490f71f1a",
                "orientation": "-"
              },
              {
                "ref": "uuid:fc877bbe-72a8-4e59-b959-010e6660984a",
                "orientation": "-"
              },
              {
                "ref": "uuid:9238cbda-d019-4b57-8319-0cc355656802",
                "orientation": "-"
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
        "area": 32.0
      }
    },
    {
      "id": "uuid:5bcee2b5-be9b-47d6-9a8b-35dac021f661",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:4ad210b7-5de5-4732-af7c-978de28f988b",
                "orientation": "-"
              },
              {
                "ref": "uuid:fe0704c2-5d2a-49a8-b507-e98c4047d8c4",
                "orientation": "-"
              },
              {
                "ref": "uuid:651bb558-f6d6-439f-a8e0-dd5c3385dc94",
                "orientation": "-"
              },
              {
                "ref": "uuid:61f99921-a94d-4e0d-8353-f027d76227c5",
                "orientation": "-"
              },
              {
                "ref": "uuid:aafd209b-cd13-401a-83f5-26751a02cffe",
                "orientation": "-"
              },
              {
                "ref": "uuid:79205d80-72e5-4bd8-9c03-9503e4e690cc",
                "orientation": "-"
              }
            ]
          }
        ]
      },
      "properties": {
        "normal": [
          -0.0,
          -0.0,
          -1.0
        ],
        "area": 88.0
      }
    },
    {
      "id": "uuid:91ce0c52-11c3-4e32-8bcc-dea958a3969e",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:474fef44-eb6e-4e19-a871-433f9bac5650",
                "orientation": "-"
              },
              {
                "ref": "uuid:ed6b8b1c-7030-4d70-ab61-94cb3aa904a7",
                "orientation": "-"
              },
              {
                "ref": "uuid:2f3bbe39-01e3-4c96-8dea-377e38729a03",
                "orientation": "-"
              },
              {
                "ref": "uuid:61f99921-a94d-4e0d-8353-f027d76227c5",
                "orientation": "+"
              }
            ]
          }
        ]
      },
      "properties": {
        "normal": [
          -1.0,
          -0.0,
          0.0
        ],
        "area": 12.0
      }
    },
    {
      "id": "uuid:56283886-1f4c-448c-b785-80fb9740a9cc",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:736411fb-67f0-47c0-bf77-bf4f9048bcda",
                "orientation": "+"
              },
              {
                "ref": "uuid:fe0704c2-5d2a-49a8-b507-e98c4047d8c4",
                "orientation": "+"
              },
              {
                "ref": "uuid:511c6e7d-728b-4f1f-9763-9461eb628586",
                "orientation": "-"
              },
              {
                "ref": "uuid:91cdc345-f745-4643-bc88-a24f8e2216b0",
                "orientation": "-"
              },
              {
                "ref": "uuid:856e43bc-ee35-44d0-b25e-ea94a53e1db6",
                "orientation": "+"
              }
            ]
          }
        ]
      },
      "properties": {
        "normal": [
          -1.0,
          -0.0,
          -0.0
        ],
        "area": 18.0
      }
    },
    {
      "id": "uuid:f3338301-b0e3-401c-af23-41ac2ae8e969",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:736411fb-67f0-47c0-bf77-bf4f9048bcda",
                "orientation": "-"
              },
              {
                "ref": "uuid:7da1c2fe-f798-43cc-af44-ac63f968139c",
                "orientation": "-"
              },
              {
                "ref": "uuid:474fef44-eb6e-4e19-a871-433f9bac5650",
                "orientation": "+"
              },
              {
                "ref": "uuid:651bb558-f6d6-439f-a8e0-dd5c3385dc94",
                "orientation": "+"
              }
            ]
          }
        ]
      },
      "properties": {
        "normal": [
          0.0,
          -1.0,
          0.0
        ],
        "area": 6.0
      }
    },
    {
      "id": "uuid:a2117d6b-4621-4a6b-9809-9fab3dfc4ff0",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:3fef75ce-8c4c-4d89-a47f-65977debaee0",
                "orientation": "+"
              },
              {
                "ref": "uuid:48b52144-aaa0-42a1-8e7a-40bebfcf9985",
                "orientation": "+"
              },
              {
                "ref": "uuid:71af0dde-7fc9-4290-9624-119e91f422ea",
                "orientation": "+"
              },
              {
                "ref": "uuid:ad13a84c-df97-4b75-9dc1-1ce452249964",
                "orientation": "+"
              }
            ]
          }
        ]
      },
      "properties": {
        "normal": [
          0.0,
          -1.0,
          0.0
        ],
        "area": 24.0
      }
    },
    {
      "id": "uuid:9d67557a-e130-4a47-b63d-c6a2bdf21fa2",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:c2a00070-f12b-42f9-b78c-b33daa500873",
                "orientation": "+"
              },
              {
                "ref": "uuid:ad13a84c-df97-4b75-9dc1-1ce452249964",
                "orientation": "-"
              },
              {
                "ref": "uuid:13dd8184-f73e-4d9f-9977-3e573274fccc",
                "orientation": "+"
              },
              {
                "ref": "uuid:7355081e-9fa3-4fb5-ab10-c4efaa41d61f",
                "orientation": "-"
              }
            ]
          }
        ]
      },
      "properties": {
        "normal": [
          -1.0,
          -0.0,
          -0.0
        ],
        "area": 30.0
      }
    },
    {
      "id": "uuid:d45fca44-8685-4146-92a5-b84d82fdc838",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:ed666061-98c5-439d-ab0d-5a792437a873",
                "orientation": "+"
              },
              {
                "ref": "uuid:7355081e-9fa3-4fb5-ab10-c4efaa41d61f",
                "orientation": "+"
              },
              {
                "ref": "uuid:5a36c75b-053b-4d7b-b512-6777786d6180",
                "orientation": "+"
              },
              {
                "ref": "uuid:a5ed4867-4011-4db7-8425-cbe61a6d3a2d",
                "orientation": "-"
              },
              {
                "ref": "uuid:2f3bbe39-01e3-4c96-8dea-377e38729a03",
                "orientation": "-"
              }
            ]
          }
        ]
      },
      "properties": {
        "normal": [
          0.0,
          1.0,
          0.0
        ],
        "area": 30.0
      }
    },
    {
      "id": "uuid:2497a842-0932-4fe5-ac1a-2f773473f338",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:b4c7d3ff-cf1f-40c1-8ea0-2cd2c09cc0e0",
                "orientation": "+"
              },
              {
                "ref": "uuid:07093c51-5d4e-42ad-941f-8eeb89e5ae78",
                "orientation": "-"
              },
              {
                "ref": "uuid:6aab9ba2-327e-40df-96c2-0ea43c538c24",
                "orientation": "-"
              },
              {
                "ref": "uuid:5a36c75b-053b-4d7b-b512-6777786d6180",
                "orientation": "-"
              },
              {
                "ref": "uuid:13dd8184-f73e-4d9f-9977-3e573274fccc",
                "orientation": "-"
              },
              {
                "ref": "uuid:71af0dde-7fc9-4290-9624-119e91f422ea",
                "orientation": "-"
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
        "area": 32.0
      }
    },
    {
      "id": "uuid:04ea47e9-b4dd-4bed-a8f4-4802d1735c74",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:ed666061-98c5-439d-ab0d-5a792437a873",
                "orientation": "-"
              },
              {
                "ref": "uuid:61f99921-a94d-4e0d-8353-f027d76227c5",
                "orientation": "+"
              },
              {
                "ref": "uuid:36b10bf3-9e3a-49cb-9dc5-7e31ade26d17",
                "orientation": "-"
              },
              {
                "ref": "uuid:ec374b67-eb42-4c53-b5cc-0f919edb2635",
                "orientation": "-"
              },
              {
                "ref": "uuid:3fef75ce-8c4c-4d89-a47f-65977debaee0",
                "orientation": "-"
              },
              {
                "ref": "uuid:c2a00070-f12b-42f9-b78c-b33daa500873",
                "orientation": "-"
              }
            ]
          }
        ]
      },
      "properties": {
        "normal": [
          -0.0,
          -0.0,
          -1.0
        ],
        "area": 88.0
      }
    },
    {
      "id": "uuid:b5fd960f-0d14-4257-9182-40de738a7e50",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:f0249395-1d12-42d1-bdaf-08c5cc29b2d4",
                "orientation": "+"
              },
              {
                "ref": "uuid:242a8400-a076-4817-86c6-acd56087cec6",
                "orientation": "+"
              },
              {
                "ref": "uuid:b4c7d3ff-cf1f-40c1-8ea0-2cd2c09cc0e0",
                "orientation": "-"
              },
              {
                "ref": "uuid:48b52144-aaa0-42a1-8e7a-40bebfcf9985",
                "orientation": "-"
              },
              {
                "ref": "uuid:ec374b67-eb42-4c53-b5cc-0f919edb2635",
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
        "area": 18.0
      }
    },
    {
      "id": "uuid:e119b096-e589-49bd-b1db-a1182dc2dade",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:474fef44-eb6e-4e19-a871-433f9bac5650",
                "orientation": "-"
              },
              {
                "ref": "uuid:fc8ba01d-faa7-4407-ae92-32b584c8a6a3",
                "orientation": "-"
              },
              {
                "ref": "uuid:f0249395-1d12-42d1-bdaf-08c5cc29b2d4",
                "orientation": "-"
              },
              {
                "ref": "uuid:36b10bf3-9e3a-49cb-9dc5-7e31ade26d17",
                "orientation": "+"
              }
            ]
          }
        ]
      },
      "properties": {
        "normal": [
          0.0,
          -1.0,
          0.0
        ],
        "area": 6.0
      }
    },
    {
      "id": "uuid:67842d3a-7c79-4f2a-8630-744711071e93",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:a604828d-a36b-4fac-ba6f-6160ade95301",
                "orientation": "-"
              },
              {
                "ref": "uuid:ec374b67-eb42-4c53-b5cc-0f919edb2635",
                "orientation": "+"
              },
              {
                "ref": "uuid:36b10bf3-9e3a-49cb-9dc5-7e31ade26d17",
                "orientation": "+"
              },
              {
                "ref": "uuid:651bb558-f6d6-439f-a8e0-dd5c3385dc94",
                "orientation": "+"
              },
              {
                "ref": "uuid:fe0704c2-5d2a-49a8-b507-e98c4047d8c4",
                "orientation": "+"
              }
            ]
          }
        ]
      },
      "properties": {
        "normal": [
          -0.0,
          -0.0,
          -1.0
        ],
        "area": 24.0
      }
    },
    {
      "id": "uuid:f1c1a636-d6ab-414c-a0aa-855fc7e85e1f",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:508f66b5-e0cb-489c-ae24-21bfb7c09280",
                "orientation": "+"
              },
              {
                "ref": "uuid:48b52144-aaa0-42a1-8e7a-40bebfcf9985",
                "orientation": "-"
              },
              {
                "ref": "uuid:a604828d-a36b-4fac-ba6f-6160ade95301",
                "orientation": "+"
              },
              {
                "ref": "uuid:511c6e7d-728b-4f1f-9763-9461eb628586",
                "orientation": "-"
              }
            ]
          }
        ]
      },
      "properties": {
        "normal": [
          0.0,
          -1.0,
          0.0
        ],
        "area": 12.0
      }
    },
    {
      "id": "uuid:a22a6c54-306e-44bc-9b94-6c32c705e63e",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:508f66b5-e0cb-489c-ae24-21bfb7c09280",
                "orientation": "-"
              },
              {
                "ref": "uuid:91cdc345-f745-4643-bc88-a24f8e2216b0",
                "orientation": "-"
              },
              {
                "ref": "uuid:38499704-81f7-4d47-965f-435e0b7b0850",
                "orientation": "-"
              },
              {
                "ref": "uuid:b4c7d3ff-cf1f-40c1-8ea0-2cd2c09cc0e0",
                "orientation": "-"
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
        "area": 8.0
      }
    },
    {
      "id": "uuid:9ed21e0a-b062-4000-88e2-50bd9153e417",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:b6e30631-9768-4020-8947-c32137328216",
                "orientation": "+"
              },
              {
                "ref": "uuid:7aa2a76d-9d5c-4540-9f2e-d8bcf36fadb5",
                "orientation": "-"
              },
              {
                "ref": "uuid:73f88b47-78ab-474d-9c62-73dfefd0dd5d",
                "orientation": "-"
              },
              {
                "ref": "uuid:21388b1b-dcba-46c0-8166-8ffc9c07e50b",
                "orientation": "-"
              },
              {
                "ref": "uuid:af347f25-a547-477c-b246-cb810756d4dc",
                "orientation": "-"
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
        "area": 16.0
      }
    },
    {
      "id": "uuid:802ff3d8-b8da-423f-8a02-7b2288485edd",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:38499704-81f7-4d47-965f-435e0b7b0850",
                "orientation": "+"
              },
              {
                "ref": "uuid:120defbd-2e05-4ec3-ba3c-ffee086d2add",
                "orientation": "-"
              },
              {
                "ref": "uuid:b6e30631-9768-4020-8947-c32137328216",
                "orientation": "-"
              },
              {
                "ref": "uuid:fb03276b-4250-4d52-81e1-035a0bd92895",
                "orientation": "-"
              }
            ]
          }
        ]
      },
      "properties": {
        "normal": [
          3.609557097661e-16,
          -1.0,
          0.0
        ],
        "area": 12.0
      }
    },
    {
      "id": "uuid:16c13b7b-aeda-4130-a793-d63f62bcc75b",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:f0249395-1d12-42d1-bdaf-08c5cc29b2d4",
                "orientation": "+"
              },
              {
                "ref": "uuid:90e3950e-40b2-4d9d-a135-1a4b708305aa",
                "orientation": "+"
              },
              {
                "ref": "uuid:736411fb-67f0-47c0-bf77-bf4f9048bcda",
                "orientation": "+"
              },
              {
                "ref": "uuid:651bb558-f6d6-439f-a8e0-dd5c3385dc94",
                "orientation": "-"
              },
              {
                "ref": "uuid:36b10bf3-9e3a-49cb-9dc5-7e31ade26d17",
                "orientation": "-"
              }
            ]
          }
        ]
      },
      "properties": {
        "normal": [
          0.0,
          1.0,
          0.0
        ],
        "area": 12.0
      }
    },
    {
      "id": "uuid:786e8738-1690-426d-8e2f-f5e734336a67",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:8601e9ea-c48f-4c00-a066-f950ed6b0724",
                "orientation": "-"
              },
              {
                "ref": "uuid:21388b1b-dcba-46c0-8166-8ffc9c07e50b",
                "orientation": "+"
              },
              {
                "ref": "uuid:73f88b47-78ab-474d-9c62-73dfefd0dd5d",
                "orientation": "+"
              },
              {
                "ref": "uuid:46fd1def-a93e-4c99-9868-172cf1b40ff1",
                "orientation": "-"
              },
              {
                "ref": "uuid:90e3950e-40b2-4d9d-a135-1a4b708305aa",
                "orientation": "-"
              }
            ]
          }
        ]
      },
      "properties": {
        "normal": [
          0.0,
          1.0,
          0.0
        ],
        "area": 12.0
      }
    }
  ],
  "solids": [
    {
      "id": "uuid:758590d2-8cc6-4ff7-8fcc-d7ecd01b3498",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Solid",
        "shells": [
          {
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
          }
        ]
      },
      "properties": {
        "name": "Upper East",
        "levels": [
          2
        ],
        "volume": 168.0
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
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

<uuid:04ea47e9-b4dd-4bed-a8f4-4802d1735c74> a geojson:Feature ;
    geojson:topology [ a topo:Face ;
            topo:rings ( [ a topo:Ring ;
                        topo:directedReferences ( <uuid:ed666061-98c5-439d-ab0d-5a792437a873> <uuid:61f99921-a94d-4e0d-8353-f027d76227c5> <uuid:36b10bf3-9e3a-49cb-9dc5-7e31ade26d17> <uuid:ec374b67-eb42-4c53-b5cc-0f919edb2635> <uuid:3fef75ce-8c4c-4d89-a47f-65977debaee0> <uuid:c2a00070-f12b-42f9-b78c-b33daa500873> ) ] ) ] .

<uuid:0e55e87d-8475-4c92-89e7-d62f97ce9ec2> a geojson:Feature ;
    geojson:topology [ a topo:Face ;
            topo:rings ( [ a topo:Ring ;
                        topo:directedReferences ( <uuid:fb28f3f2-8ea7-4c03-bff5-7352addba8b3> <uuid:07093c51-5d4e-42ad-941f-8eeb89e5ae78> <uuid:fb03276b-4250-4d52-81e1-035a0bd92895> <uuid:c97ac36d-9cf3-48ca-bb8f-c36cb335bebf> ) ] ) ] .

<uuid:16c13b7b-aeda-4130-a793-d63f62bcc75b> a geojson:Feature ;
    geojson:topology [ a topo:Face ;
            topo:rings ( [ a topo:Ring ;
                        topo:directedReferences ( <uuid:f0249395-1d12-42d1-bdaf-08c5cc29b2d4> <uuid:90e3950e-40b2-4d9d-a135-1a4b708305aa> <uuid:736411fb-67f0-47c0-bf77-bf4f9048bcda> <uuid:651bb558-f6d6-439f-a8e0-dd5c3385dc94> <uuid:36b10bf3-9e3a-49cb-9dc5-7e31ade26d17> ) ] ) ] .

<uuid:2497a842-0932-4fe5-ac1a-2f773473f338> a geojson:Feature ;
    geojson:topology [ a topo:Face ;
            topo:rings ( [ a topo:Ring ;
                        topo:directedReferences ( <uuid:b4c7d3ff-cf1f-40c1-8ea0-2cd2c09cc0e0> <uuid:07093c51-5d4e-42ad-941f-8eeb89e5ae78> <uuid:6aab9ba2-327e-40df-96c2-0ea43c538c24> <uuid:5a36c75b-053b-4d7b-b512-6777786d6180> <uuid:13dd8184-f73e-4d9f-9977-3e573274fccc> <uuid:71af0dde-7fc9-4290-9624-119e91f422ea> ) ] ) ] .

<uuid:31d8f2b5-cc74-4f72-b230-d27dad0fd589> a geojson:Feature ;
    geojson:topology [ a topo:Face ;
            topo:rings ( [ a topo:Ring ;
                        topo:directedReferences ( <uuid:79205d80-72e5-4bd8-9c03-9503e4e690cc> <uuid:06babc8d-f0d6-43eb-bfad-931055bae084> <uuid:fc877bbe-72a8-4e59-b959-010e6660984a> <uuid:c12882ea-089f-4616-942c-ceb8fb4ac05e> ) ] ) ] .

<uuid:3f5c452f-9815-4b21-9b2d-0127ae80c385> a geojson:Feature ;
    geojson:topology [ a topo:Face ;
            topo:rings ( [ a topo:Ring ;
                        topo:directedReferences ( <uuid:242a8400-a076-4817-86c6-acd56087cec6> <uuid:8601e9ea-c48f-4c00-a066-f950ed6b0724> <uuid:af347f25-a547-477c-b246-cb810756d4dc> <uuid:fb03276b-4250-4d52-81e1-035a0bd92895> ) ] ) ] .

<uuid:56283886-1f4c-448c-b785-80fb9740a9cc> a geojson:Feature ;
    geojson:topology [ a topo:Face ;
            topo:rings ( [ a topo:Ring ;
                        topo:directedReferences ( <uuid:736411fb-67f0-47c0-bf77-bf4f9048bcda> <uuid:fe0704c2-5d2a-49a8-b507-e98c4047d8c4> <uuid:511c6e7d-728b-4f1f-9763-9461eb628586> <uuid:91cdc345-f745-4643-bc88-a24f8e2216b0> <uuid:856e43bc-ee35-44d0-b25e-ea94a53e1db6> ) ] ) ] .

<uuid:5bcee2b5-be9b-47d6-9a8b-35dac021f661> a geojson:Feature ;
    geojson:topology [ a topo:Face ;
            topo:rings ( [ a topo:Ring ;
                        topo:directedReferences ( <uuid:4ad210b7-5de5-4732-af7c-978de28f988b> <uuid:fe0704c2-5d2a-49a8-b507-e98c4047d8c4> <uuid:651bb558-f6d6-439f-a8e0-dd5c3385dc94> <uuid:61f99921-a94d-4e0d-8353-f027d76227c5> <uuid:aafd209b-cd13-401a-83f5-26751a02cffe> <uuid:79205d80-72e5-4bd8-9c03-9503e4e690cc> ) ] ) ] .

<uuid:65959e29-11cb-4568-904d-61c4a7c17b98> a geojson:Feature ;
    geojson:topology [ a topo:Face ;
            topo:rings ( [ a topo:Ring ;
                        topo:directedReferences ( <uuid:aafd209b-cd13-401a-83f5-26751a02cffe> <uuid:2f3bbe39-01e3-4c96-8dea-377e38729a03> <uuid:830b9098-d914-4e8b-869d-4d20f1eb5c81> <uuid:9238cbda-d019-4b57-8319-0cc355656802> <uuid:06babc8d-f0d6-43eb-bfad-931055bae084> ) ] ) ] .

<uuid:66a430c0-123f-42df-9d11-64347362bcb3> a geojson:Feature ;
    geojson:topology [ a topo:Face ;
            topo:rings ( [ a topo:Ring ;
                        topo:directedReferences ( <uuid:4ad210b7-5de5-4732-af7c-978de28f988b> <uuid:c12882ea-089f-4616-942c-ceb8fb4ac05e> <uuid:4406e3f5-89dc-463b-84e4-487490f71f1a> <uuid:511c6e7d-728b-4f1f-9763-9461eb628586> ) ] ) ] .

<uuid:67842d3a-7c79-4f2a-8630-744711071e93> a geojson:Feature ;
    geojson:topology [ a topo:Face ;
            topo:rings ( [ a topo:Ring ;
                        topo:directedReferences ( <uuid:a604828d-a36b-4fac-ba6f-6160ade95301> <uuid:ec374b67-eb42-4c53-b5cc-0f919edb2635> <uuid:36b10bf3-9e3a-49cb-9dc5-7e31ade26d17> <uuid:651bb558-f6d6-439f-a8e0-dd5c3385dc94> <uuid:fe0704c2-5d2a-49a8-b507-e98c4047d8c4> ) ] ) ] .

<uuid:6a5ff199-56a7-4e65-94b5-bfdf2ae3449d> a geojson:Feature ;
    geojson:topology [ a topo:Face ;
            topo:rings ( [ a topo:Ring ;
                        topo:directedReferences ( <uuid:f921656a-58e3-4375-bdff-ac8019f524cf> <uuid:e0416983-f0db-4c99-8a72-3f8b4615ab05> <uuid:c97ac36d-9cf3-48ca-bb8f-c36cb335bebf> <uuid:af347f25-a547-477c-b246-cb810756d4dc> <uuid:21388b1b-dcba-46c0-8166-8ffc9c07e50b> <uuid:921e2351-efbf-48be-85d3-eedc0dc2ddc0> ) ] ) ] .

<uuid:758590d2-8cc6-4ff7-8fcc-d7ecd01b3498> a geojson:Feature ;
    geojson:topology [ a topo:Solid ;
            topo:shells ( [ a topo:Shell ;
                        topo:directedReferences ( [ topo:orientation "+" ;
                                    topo:ref <uuid:4ac3b91b-eeb7-428c-b5e9-7e8a3f0998ae> ] [ topo:orientation "+" ;
                                    topo:ref <uuid:4a294022-4864-49c7-8cee-f9e43360bc4e> ] [ topo:orientation "+" ;
                                    topo:ref <uuid:01947f47-ee13-44a9-85a4-2bcb4881982a> ] [ topo:orientation "+" ;
                                    topo:ref <uuid:607a3363-3eb7-4ce6-a633-86d2e565692b> ] [ topo:orientation "+" ;
                                    topo:ref <uuid:3c1f5c4b-d842-40b6-a332-99d50015fa8f> ] [ topo:orientation "+" ;
                                    topo:ref <uuid:fe522919-1421-4fd1-9930-8c6551e3f2a5> ] [ topo:orientation "+" ;
                                    topo:ref <uuid:2387ae98-9236-42fe-9414-c45b99954c41> ] [ topo:orientation "+" ;
                                    topo:ref <uuid:4ba85faa-3935-4e89-a9f8-dcd647a5dbed> ] ) ] ) ] .

<uuid:786e8738-1690-426d-8e2f-f5e734336a67> a geojson:Feature ;
    geojson:topology [ a topo:Face ;
            topo:rings ( [ a topo:Ring ;
                        topo:directedReferences ( <uuid:8601e9ea-c48f-4c00-a066-f950ed6b0724> <uuid:21388b1b-dcba-46c0-8166-8ffc9c07e50b> <uuid:73f88b47-78ab-474d-9c62-73dfefd0dd5d> <uuid:46fd1def-a93e-4c99-9868-172cf1b40ff1> <uuid:90e3950e-40b2-4d9d-a135-1a4b708305aa> ) ] ) ] .

<uuid:802ff3d8-b8da-423f-8a02-7b2288485edd> a geojson:Feature ;
    geojson:topology [ a topo:Face ;
            topo:rings ( [ a topo:Ring ;
                        topo:directedReferences ( <uuid:38499704-81f7-4d47-965f-435e0b7b0850> <uuid:120defbd-2e05-4ec3-ba3c-ffee086d2add> <uuid:b6e30631-9768-4020-8947-c32137328216> <uuid:fb03276b-4250-4d52-81e1-035a0bd92895> ) ] ) ] .

<uuid:91ce0c52-11c3-4e32-8bcc-dea958a3969e> a geojson:Feature ;
    geojson:topology [ a topo:Face ;
            topo:rings ( [ a topo:Ring ;
                        topo:directedReferences ( <uuid:474fef44-eb6e-4e19-a871-433f9bac5650> <uuid:ed6b8b1c-7030-4d70-ab61-94cb3aa904a7> <uuid:2f3bbe39-01e3-4c96-8dea-377e38729a03> <uuid:61f99921-a94d-4e0d-8353-f027d76227c5> ) ] ) ] .

<uuid:9d67557a-e130-4a47-b63d-c6a2bdf21fa2> a geojson:Feature ;
    geojson:topology [ a topo:Face ;
            topo:rings ( [ a topo:Ring ;
                        topo:directedReferences ( <uuid:c2a00070-f12b-42f9-b78c-b33daa500873> <uuid:ad13a84c-df97-4b75-9dc1-1ce452249964> <uuid:13dd8184-f73e-4d9f-9977-3e573274fccc> <uuid:7355081e-9fa3-4fb5-ab10-c4efaa41d61f> ) ] ) ] .

<uuid:9e4c0c0e-6acf-401b-b35e-0e917ce3a5fc> a geojson:Feature ;
    geojson:topology [ a topo:Face ;
            topo:rings ( [ a topo:Ring ;
                        topo:directedReferences ( <uuid:242a8400-a076-4817-86c6-acd56087cec6> <uuid:07093c51-5d4e-42ad-941f-8eeb89e5ae78> <uuid:6aab9ba2-327e-40df-96c2-0ea43c538c24> <uuid:a5ed4867-4011-4db7-8425-cbe61a6d3a2d> <uuid:ed6b8b1c-7030-4d70-ab61-94cb3aa904a7> <uuid:fc8ba01d-faa7-4407-ae92-32b584c8a6a3> ) ] ) ] .

<uuid:9ed21e0a-b062-4000-88e2-50bd9153e417> a geojson:Feature ;
    geojson:topology [ a topo:Face ;
            topo:rings ( [ a topo:Ring ;
                        topo:directedReferences ( <uuid:b6e30631-9768-4020-8947-c32137328216> <uuid:7aa2a76d-9d5c-4540-9f2e-d8bcf36fadb5> <uuid:73f88b47-78ab-474d-9c62-73dfefd0dd5d> <uuid:21388b1b-dcba-46c0-8166-8ffc9c07e50b> <uuid:af347f25-a547-477c-b246-cb810756d4dc> ) ] ) ] .

<uuid:a2117d6b-4621-4a6b-9809-9fab3dfc4ff0> a geojson:Feature ;
    geojson:topology [ a topo:Face ;
            topo:rings ( [ a topo:Ring ;
                        topo:directedReferences ( <uuid:3fef75ce-8c4c-4d89-a47f-65977debaee0> <uuid:48b52144-aaa0-42a1-8e7a-40bebfcf9985> <uuid:71af0dde-7fc9-4290-9624-119e91f422ea> <uuid:ad13a84c-df97-4b75-9dc1-1ce452249964> ) ] ) ] .

<uuid:a22a6c54-306e-44bc-9b94-6c32c705e63e> a geojson:Feature ;
    geojson:topology [ a topo:Face ;
            topo:rings ( [ a topo:Ring ;
                        topo:directedReferences ( <uuid:508f66b5-e0cb-489c-ae24-21bfb7c09280> <uuid:91cdc345-f745-4643-bc88-a24f8e2216b0> <uuid:38499704-81f7-4d47-965f-435e0b7b0850> <uuid:b4c7d3ff-cf1f-40c1-8ea0-2cd2c09cc0e0> ) ] ) ] .

<uuid:b5fd960f-0d14-4257-9182-40de738a7e50> a geojson:Feature ;
    geojson:topology [ a topo:Face ;
            topo:rings ( [ a topo:Ring ;
                        topo:directedReferences ( <uuid:f0249395-1d12-42d1-bdaf-08c5cc29b2d4> <uuid:242a8400-a076-4817-86c6-acd56087cec6> <uuid:b4c7d3ff-cf1f-40c1-8ea0-2cd2c09cc0e0> <uuid:48b52144-aaa0-42a1-8e7a-40bebfcf9985> <uuid:ec374b67-eb42-4c53-b5cc-0f919edb2635> ) ] ) ] .

<uuid:c55c88db-d187-4d7e-9aaa-b9d3dce52663> a geojson:Feature ;
    geojson:topology [ a topo:Face ;
            topo:rings ( [ a topo:Ring ;
                        topo:directedReferences ( <uuid:a5ed4867-4011-4db7-8425-cbe61a6d3a2d> <uuid:745aa367-94b6-4949-a856-5271ec6672e9> <uuid:f921656a-58e3-4375-bdff-ac8019f524cf> <uuid:3b72e45d-d351-46e4-a5b7-9ac9bc339d03> ) ] ) ] .

<uuid:d45fca44-8685-4146-92a5-b84d82fdc838> a geojson:Feature ;
    geojson:topology [ a topo:Face ;
            topo:rings ( [ a topo:Ring ;
                        topo:directedReferences ( <uuid:ed666061-98c5-439d-ab0d-5a792437a873> <uuid:7355081e-9fa3-4fb5-ab10-c4efaa41d61f> <uuid:5a36c75b-053b-4d7b-b512-6777786d6180> <uuid:a5ed4867-4011-4db7-8425-cbe61a6d3a2d> <uuid:2f3bbe39-01e3-4c96-8dea-377e38729a03> ) ] ) ] .

<uuid:dbd99467-ea83-4dff-b03f-eef2aad2687c> a geojson:Feature ;
    geojson:topology [ a topo:Face ;
            topo:rings ( [ a topo:Ring ;
                        topo:directedReferences ( <uuid:745aa367-94b6-4949-a856-5271ec6672e9> <uuid:6aab9ba2-327e-40df-96c2-0ea43c538c24> <uuid:fb28f3f2-8ea7-4c03-bff5-7352addba8b3> <uuid:e0416983-f0db-4c99-8a72-3f8b4615ab05> ) ] ) ] .

<uuid:e119b096-e589-49bd-b1db-a1182dc2dade> a geojson:Feature ;
    geojson:topology [ a topo:Face ;
            topo:rings ( [ a topo:Ring ;
                        topo:directedReferences ( <uuid:474fef44-eb6e-4e19-a871-433f9bac5650> <uuid:fc8ba01d-faa7-4407-ae92-32b584c8a6a3> <uuid:f0249395-1d12-42d1-bdaf-08c5cc29b2d4> <uuid:36b10bf3-9e3a-49cb-9dc5-7e31ade26d17> ) ] ) ] .

<uuid:e2efe498-c6d5-4f9c-ac07-4c1c9e406675> a geojson:Feature ;
    geojson:topology [ a topo:Face ;
            topo:rings ( [ a topo:Ring ;
                        topo:directedReferences ( <uuid:d69c596c-134e-4216-9bf6-d0f10e6886d8> <uuid:32e82eb1-93a4-4387-8cd0-9616ebf1e39b> <uuid:91cdc345-f745-4643-bc88-a24f8e2216b0> <uuid:4406e3f5-89dc-463b-84e4-487490f71f1a> <uuid:fc877bbe-72a8-4e59-b959-010e6660984a> <uuid:9238cbda-d019-4b57-8319-0cc355656802> ) ] ) ] .

<uuid:e499fea3-19f7-4863-8a58-751caff7d884> a geojson:Feature ;
    geojson:topology [ a topo:Face ;
            topo:rings ( [ a topo:Ring ;
                        topo:directedReferences ( <uuid:fc8ba01d-faa7-4407-ae92-32b584c8a6a3> <uuid:5f17e211-e8b5-4a7c-85e4-798787fd82a5> <uuid:21388b1b-dcba-46c0-8166-8ffc9c07e50b> <uuid:8601e9ea-c48f-4c00-a066-f950ed6b0724> ) ] ) ] .

<uuid:f1c1a636-d6ab-414c-a0aa-855fc7e85e1f> a geojson:Feature ;
    geojson:topology [ a topo:Face ;
            topo:rings ( [ a topo:Ring ;
                        topo:directedReferences ( <uuid:508f66b5-e0cb-489c-ae24-21bfb7c09280> <uuid:48b52144-aaa0-42a1-8e7a-40bebfcf9985> <uuid:a604828d-a36b-4fac-ba6f-6160ade95301> <uuid:511c6e7d-728b-4f1f-9763-9461eb628586> ) ] ) ] .

<uuid:f3338301-b0e3-401c-af23-41ac2ae8e969> a geojson:Feature ;
    geojson:topology [ a topo:Face ;
            topo:rings ( [ a topo:Ring ;
                        topo:directedReferences ( <uuid:736411fb-67f0-47c0-bf77-bf4f9048bcda> <uuid:7da1c2fe-f798-43cc-af44-ac63f968139c> <uuid:474fef44-eb6e-4e19-a871-433f9bac5650> <uuid:651bb558-f6d6-439f-a8e0-dd5c3385dc94> ) ] ) ] .

<uuid:01947f47-ee13-44a9-85a4-2bcb4881982a> a geojson:Feature ;
    geojson:topology [ a topo:Face ;
            topo:rings ( [ a topo:Ring ;
                        topo:directedReferences ( <uuid:4c2a6434-03b0-4aa2-85ea-a9fcaea41555> <uuid:c60507ba-226b-4e49-a702-e9afef899b23> <uuid:830b9098-d914-4e8b-869d-4d20f1eb5c81> <uuid:3b72e45d-d351-46e4-a5b7-9ac9bc339d03> ) ] ) ] .

<uuid:2387ae98-9236-42fe-9414-c45b99954c41> a geojson:Feature ;
    geojson:topology [ a topo:Face ;
            topo:rings ( [ a topo:Ring ;
                        topo:directedReferences ( <uuid:856e43bc-ee35-44d0-b25e-ea94a53e1db6> <uuid:7da1c2fe-f798-43cc-af44-ac63f968139c> <uuid:ed6b8b1c-7030-4d70-ab61-94cb3aa904a7> <uuid:830b9098-d914-4e8b-869d-4d20f1eb5c81> <uuid:d69c596c-134e-4216-9bf6-d0f10e6886d8> <uuid:32e82eb1-93a4-4387-8cd0-9616ebf1e39b> ) ] ) ] .

<uuid:3c1f5c4b-d842-40b6-a332-99d50015fa8f> a geojson:Feature ;
    geojson:topology [ a topo:Face ;
            topo:rings ( [ a topo:Ring ;
                        topo:directedReferences ( <uuid:ed6b8b1c-7030-4d70-ab61-94cb3aa904a7> <uuid:5f17e211-e8b5-4a7c-85e4-798787fd82a5> <uuid:921e2351-efbf-48be-85d3-eedc0dc2ddc0> <uuid:3b72e45d-d351-46e4-a5b7-9ac9bc339d03> ) ] ) ] .

<uuid:4a294022-4864-49c7-8cee-f9e43360bc4e> a geojson:Feature ;
    geojson:topology [ a topo:Face ;
            topo:rings ( [ a topo:Ring ;
                        topo:directedReferences ( <uuid:32e82eb1-93a4-4387-8cd0-9616ebf1e39b> <uuid:83ff2cdf-6c58-4e7b-ba55-e084eff8c569> <uuid:8582d9c2-6053-495a-8413-f5493691c0de> <uuid:120defbd-2e05-4ec3-ba3c-ffee086d2add> ) ] ) ] .

<uuid:4ac3b91b-eeb7-428c-b5e9-7e8a3f0998ae> a geojson:Feature ;
    geojson:topology [ a topo:Face ;
            topo:rings ( [ a topo:Ring ;
                        topo:directedReferences ( <uuid:c60507ba-226b-4e49-a702-e9afef899b23> <uuid:7dc1cc1c-8e7f-4666-9f52-4e6c2e6f57ac> <uuid:83ff2cdf-6c58-4e7b-ba55-e084eff8c569> <uuid:d69c596c-134e-4216-9bf6-d0f10e6886d8> ) ] ) ] .

<uuid:4ba85faa-3935-4e89-a9f8-dcd647a5dbed> a geojson:Feature ;
    geojson:topology [ a topo:Face ;
            topo:rings ( [ a topo:Ring ;
                        topo:directedReferences ( <uuid:856e43bc-ee35-44d0-b25e-ea94a53e1db6> <uuid:120defbd-2e05-4ec3-ba3c-ffee086d2add> <uuid:7aa2a76d-9d5c-4540-9f2e-d8bcf36fadb5> <uuid:46fd1def-a93e-4c99-9868-172cf1b40ff1> ) ] ) ] .

<uuid:607a3363-3eb7-4ce6-a633-86d2e565692b> a geojson:Feature ;
    geojson:topology [ a topo:Face ;
            topo:rings ( [ a topo:Ring ;
                        topo:directedReferences ( <uuid:8582d9c2-6053-495a-8413-f5493691c0de> <uuid:7dc1cc1c-8e7f-4666-9f52-4e6c2e6f57ac> <uuid:4c2a6434-03b0-4aa2-85ea-a9fcaea41555> <uuid:921e2351-efbf-48be-85d3-eedc0dc2ddc0> <uuid:73f88b47-78ab-474d-9c62-73dfefd0dd5d> <uuid:7aa2a76d-9d5c-4540-9f2e-d8bcf36fadb5> ) ] ) ] .

<uuid:fe522919-1421-4fd1-9930-8c6551e3f2a5> a geojson:Feature ;
    geojson:topology [ a topo:Face ;
            topo:rings ( [ a topo:Ring ;
                        topo:directedReferences ( <uuid:7da1c2fe-f798-43cc-af44-ac63f968139c> <uuid:46fd1def-a93e-4c99-9868-172cf1b40ff1> <uuid:73f88b47-78ab-474d-9c62-73dfefd0dd5d> <uuid:5f17e211-e8b5-4a7c-85e4-798787fd82a5> ) ] ) ] .

<uuid:06babc8d-f0d6-43eb-bfad-931055bae084> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:20d3c864-4a8c-4440-b600-a1d424e92f51> <uuid:2b34e214-cba7-4a66-8443-ceb932c5ef09> ) ] .

<uuid:13dd8184-f73e-4d9f-9977-3e573274fccc> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:8e503e04-ad51-423b-8102-708a845189b6> <uuid:8cda5c68-9c82-43b4-84d7-979efa36dfe1> ) ] .

<uuid:38499704-81f7-4d47-965f-435e0b7b0850> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:b8412dad-b40a-4e35-9f42-f983e0fce39d> <uuid:a0ec1bfd-0f7a-4c42-bc71-bacdcd44071d> ) ] .

<uuid:3fef75ce-8c4c-4d89-a47f-65977debaee0> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:b6d10150-f9d4-4f7e-b028-c4bbee8e7717> <uuid:a3b19f96-9bca-4c31-ac7e-4cb1615878df> ) ] .

<uuid:4406e3f5-89dc-463b-84e4-487490f71f1a> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:c060c1dc-6544-4595-b583-72ecf603fd6d> <uuid:7fe8cb9b-976e-4344-bf72-f3721d878ba4> ) ] .

<uuid:4ad210b7-5de5-4732-af7c-978de28f988b> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:ff685e16-64f8-4f41-8a9e-7d8e83312fd6> <uuid:92bd9ed9-c138-45c3-b72c-a9ecb7f7cfe9> ) ] .

<uuid:4c2a6434-03b0-4aa2-85ea-a9fcaea41555> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:5e08b82a-8efb-447c-b5c2-54f8ff5788b3> <uuid:8d2be28b-8f31-46de-99cb-4d8709502cd0> ) ] .

<uuid:508f66b5-e0cb-489c-ae24-21bfb7c09280> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:7fe8cb9b-976e-4344-bf72-f3721d878ba4> <uuid:793997c5-bcc4-4610-984b-6cf2c2997348> ) ] .

<uuid:5a36c75b-053b-4d7b-b512-6777786d6180> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:8cda5c68-9c82-43b4-84d7-979efa36dfe1> <uuid:e7300a01-f8c1-4351-9511-02790a5376b0> ) ] .

<uuid:71af0dde-7fc9-4290-9624-119e91f422ea> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:793997c5-bcc4-4610-984b-6cf2c2997348> <uuid:8e503e04-ad51-423b-8102-708a845189b6> ) ] .

<uuid:7355081e-9fa3-4fb5-ab10-c4efaa41d61f> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:ca62577e-8e24-4af2-88bf-33b34e25e606> <uuid:8cda5c68-9c82-43b4-84d7-979efa36dfe1> ) ] .

<uuid:745aa367-94b6-4949-a856-5271ec6672e9> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:e7300a01-f8c1-4351-9511-02790a5376b0> <uuid:1e20237c-9dfa-4251-9f3f-cc5e56a5becd> ) ] .

<uuid:79205d80-72e5-4bd8-9c03-9503e4e690cc> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:92bd9ed9-c138-45c3-b72c-a9ecb7f7cfe9> <uuid:20d3c864-4a8c-4440-b600-a1d424e92f51> ) ] .

<uuid:7dc1cc1c-8e7f-4666-9f52-4e6c2e6f57ac> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:8d2be28b-8f31-46de-99cb-4d8709502cd0> <uuid:c611f840-2829-44b2-b367-3915ca7875a4> ) ] .

<uuid:83ff2cdf-6c58-4e7b-ba55-e084eff8c569> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:c611f840-2829-44b2-b367-3915ca7875a4> <uuid:fad324b9-801f-40f4-b65b-91f8753e9698> ) ] .

<uuid:8582d9c2-6053-495a-8413-f5493691c0de> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:c611f840-2829-44b2-b367-3915ca7875a4> <uuid:11caaac5-b631-4bd8-a6af-f82cb6371071> ) ] .

<uuid:90e3950e-40b2-4d9d-a135-1a4b708305aa> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:1d2a5d01-8547-4de6-abea-8f9ab994d35e> <uuid:87373f95-ee4b-4471-9980-f4a8258ee1e3> ) ] .

<uuid:9238cbda-d019-4b57-8319-0cc355656802> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:ad6d8fcc-402c-482e-8f1a-7492ccaead38> <uuid:2b34e214-cba7-4a66-8443-ceb932c5ef09> ) ] .

<uuid:a604828d-a36b-4fac-ba6f-6160ade95301> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:a3b19f96-9bca-4c31-ac7e-4cb1615878df> <uuid:ff685e16-64f8-4f41-8a9e-7d8e83312fd6> ) ] .

<uuid:aafd209b-cd13-401a-83f5-26751a02cffe> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:20d3c864-4a8c-4440-b600-a1d424e92f51> <uuid:16c35df5-bc63-4edd-8da5-dbcc5548a61e> ) ] .

<uuid:ad13a84c-df97-4b75-9dc1-1ce452249964> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:8e503e04-ad51-423b-8102-708a845189b6> <uuid:b6d10150-f9d4-4f7e-b028-c4bbee8e7717> ) ] .

<uuid:b6e30631-9768-4020-8947-c32137328216> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:9a1d8124-ca37-4abd-b07e-bff4c8eaa2f9> <uuid:11caaac5-b631-4bd8-a6af-f82cb6371071> ) ] .

<uuid:c12882ea-089f-4616-942c-ceb8fb4ac05e> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:92bd9ed9-c138-45c3-b72c-a9ecb7f7cfe9> <uuid:c060c1dc-6544-4595-b583-72ecf603fd6d> ) ] .

<uuid:c2a00070-f12b-42f9-b78c-b33daa500873> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:ca62577e-8e24-4af2-88bf-33b34e25e606> <uuid:b6d10150-f9d4-4f7e-b028-c4bbee8e7717> ) ] .

<uuid:c60507ba-226b-4e49-a702-e9afef899b23> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:ad6d8fcc-402c-482e-8f1a-7492ccaead38> <uuid:8d2be28b-8f31-46de-99cb-4d8709502cd0> ) ] .

<uuid:c97ac36d-9cf3-48ca-bb8f-c36cb335bebf> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:9a1d8124-ca37-4abd-b07e-bff4c8eaa2f9> <uuid:3c08ae4e-7b27-4e95-8bfb-6b42451be8f6> ) ] .

<uuid:e0416983-f0db-4c99-8a72-3f8b4615ab05> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:3c08ae4e-7b27-4e95-8bfb-6b42451be8f6> <uuid:1e20237c-9dfa-4251-9f3f-cc5e56a5becd> ) ] .

<uuid:ed666061-98c5-439d-ab0d-5a792437a873> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:16c35df5-bc63-4edd-8da5-dbcc5548a61e> <uuid:ca62577e-8e24-4af2-88bf-33b34e25e606> ) ] .

<uuid:f921656a-58e3-4375-bdff-ac8019f524cf> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:1e20237c-9dfa-4251-9f3f-cc5e56a5becd> <uuid:5e08b82a-8efb-447c-b5c2-54f8ff5788b3> ) ] .

<uuid:fb28f3f2-8ea7-4c03-bff5-7352addba8b3> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:3c08ae4e-7b27-4e95-8bfb-6b42451be8f6> <uuid:307b7db6-8014-4628-b80e-ff925bf71168> ) ] .

<uuid:fc877bbe-72a8-4e59-b959-010e6660984a> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:2b34e214-cba7-4a66-8443-ceb932c5ef09> <uuid:c060c1dc-6544-4595-b583-72ecf603fd6d> ) ] .

<uuid:07093c51-5d4e-42ad-941f-8eeb89e5ae78> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:307b7db6-8014-4628-b80e-ff925bf71168> <uuid:b8412dad-b40a-4e35-9f42-f983e0fce39d> ) ] .

<uuid:120defbd-2e05-4ec3-ba3c-ffee086d2add> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:11caaac5-b631-4bd8-a6af-f82cb6371071> <uuid:a0ec1bfd-0f7a-4c42-bc71-bacdcd44071d> ) ] .

<uuid:1e20237c-9dfa-4251-9f3f-cc5e56a5becd> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 2e+00 1e+01 6e+00 ) ] .

<uuid:206806a4-a2f8-4c04-858e-99d289858a40> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 1.2e+01 6e+00 0e+00 ) ] .

<uuid:20d3c864-4a8c-4440-b600-a1d424e92f51> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 2e+01 1e+01 0e+00 ) ] .

<uuid:242a8400-a076-4817-86c6-acd56087cec6> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:1d2a5d01-8547-4de6-abea-8f9ab994d35e> <uuid:b8412dad-b40a-4e35-9f42-f983e0fce39d> ) ] .

<uuid:2b34e214-cba7-4a66-8443-ceb932c5ef09> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 2e+01 1e+01 3e+00 ) ] .

<uuid:2f3bbe39-01e3-4c96-8dea-377e38729a03> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:16c35df5-bc63-4edd-8da5-dbcc5548a61e> <uuid:22138e52-65ef-4773-b69d-5ea2628fad7b> ) ] .

<uuid:307b7db6-8014-4628-b80e-ff925bf71168> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 2e+00 2e+00 3e+00 ) ] .

<uuid:32e82eb1-93a4-4387-8cd0-9616ebf1e39b> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:a0ec1bfd-0f7a-4c42-bc71-bacdcd44071d> <uuid:fad324b9-801f-40f4-b65b-91f8753e9698> ) ] .

<uuid:3b72e45d-d351-46e4-a5b7-9ac9bc339d03> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:22138e52-65ef-4773-b69d-5ea2628fad7b> <uuid:5e08b82a-8efb-447c-b5c2-54f8ff5788b3> ) ] .

<uuid:3c08ae4e-7b27-4e95-8bfb-6b42451be8f6> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 2e+00 2e+00 6e+00 ) ] .

<uuid:46fd1def-a93e-4c99-9868-172cf1b40ff1> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:87373f95-ee4b-4471-9980-f4a8258ee1e3> <uuid:8087116e-84cc-44d1-8047-78dc3837d7e8> ) ] .

<uuid:474fef44-eb6e-4e19-a871-433f9bac5650> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:f34d9f2e-4180-41de-a613-46f78f4c178f> <uuid:d8d136c6-604c-4ad3-adf7-b0a7e04d034a> ) ] .

<uuid:48b52144-aaa0-42a1-8e7a-40bebfcf9985> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:a3b19f96-9bca-4c31-ac7e-4cb1615878df> <uuid:793997c5-bcc4-4610-984b-6cf2c2997348> ) ] .

<uuid:511c6e7d-728b-4f1f-9763-9461eb628586> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:7fe8cb9b-976e-4344-bf72-f3721d878ba4> <uuid:ff685e16-64f8-4f41-8a9e-7d8e83312fd6> ) ] .

<uuid:5f17e211-e8b5-4a7c-85e4-798787fd82a5> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:f34d9f2e-4180-41de-a613-46f78f4c178f> <uuid:62a26df3-3e19-49bf-9ee4-24dbeb814a70> ) ] .

<uuid:61f99921-a94d-4e0d-8353-f027d76227c5> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:16c35df5-bc63-4edd-8da5-dbcc5548a61e> <uuid:d8d136c6-604c-4ad3-adf7-b0a7e04d034a> ) ] .

<uuid:6aab9ba2-327e-40df-96c2-0ea43c538c24> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:e7300a01-f8c1-4351-9511-02790a5376b0> <uuid:307b7db6-8014-4628-b80e-ff925bf71168> ) ] .

<uuid:736411fb-67f0-47c0-bf77-bf4f9048bcda> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:87373f95-ee4b-4471-9980-f4a8258ee1e3> <uuid:206806a4-a2f8-4c04-858e-99d289858a40> ) ] .

<uuid:7aa2a76d-9d5c-4540-9f2e-d8bcf36fadb5> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:8087116e-84cc-44d1-8047-78dc3837d7e8> <uuid:11caaac5-b631-4bd8-a6af-f82cb6371071> ) ] .

<uuid:7da1c2fe-f798-43cc-af44-ac63f968139c> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:f34d9f2e-4180-41de-a613-46f78f4c178f> <uuid:87373f95-ee4b-4471-9980-f4a8258ee1e3> ) ] .

<uuid:8087116e-84cc-44d1-8047-78dc3837d7e8> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 1.2e+01 6e+00 6e+00 ) ] .

<uuid:830b9098-d914-4e8b-869d-4d20f1eb5c81> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:ad6d8fcc-402c-482e-8f1a-7492ccaead38> <uuid:22138e52-65ef-4773-b69d-5ea2628fad7b> ) ] .

<uuid:856e43bc-ee35-44d0-b25e-ea94a53e1db6> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:a0ec1bfd-0f7a-4c42-bc71-bacdcd44071d> <uuid:87373f95-ee4b-4471-9980-f4a8258ee1e3> ) ] .

<uuid:8601e9ea-c48f-4c00-a066-f950ed6b0724> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:caa6045e-4189-4571-8914-1189e51ac71e> <uuid:1d2a5d01-8547-4de6-abea-8f9ab994d35e> ) ] .

<uuid:8cda5c68-9c82-43b4-84d7-979efa36dfe1> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 0e+00 1e+01 3e+00 ) ] .

<uuid:8d2be28b-8f31-46de-99cb-4d8709502cd0> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 1.8e+01 1e+01 6e+00 ) ] .

<uuid:8e503e04-ad51-423b-8102-708a845189b6> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 0e+00 0e+00 3e+00 ) ] .

<uuid:91cdc345-f745-4643-bc88-a24f8e2216b0> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:a0ec1bfd-0f7a-4c42-bc71-bacdcd44071d> <uuid:7fe8cb9b-976e-4344-bf72-f3721d878ba4> ) ] .

<uuid:921e2351-efbf-48be-85d3-eedc0dc2ddc0> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:5e08b82a-8efb-447c-b5c2-54f8ff5788b3> <uuid:62a26df3-3e19-49bf-9ee4-24dbeb814a70> ) ] .

<uuid:92bd9ed9-c138-45c3-b72c-a9ecb7f7cfe9> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 2e+01 0e+00 0e+00 ) ] .

<uuid:9ef3d2ea-acea-4365-8bd5-2f8ef3036ed0> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 8e+00 6e+00 0e+00 ) ] .

<uuid:a5ed4867-4011-4db7-8425-cbe61a6d3a2d> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:22138e52-65ef-4773-b69d-5ea2628fad7b> <uuid:e7300a01-f8c1-4351-9511-02790a5376b0> ) ] .

<uuid:af347f25-a547-477c-b246-cb810756d4dc> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:9a1d8124-ca37-4abd-b07e-bff4c8eaa2f9> <uuid:caa6045e-4189-4571-8914-1189e51ac71e> ) ] .

<uuid:b4c7d3ff-cf1f-40c1-8ea0-2cd2c09cc0e0> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:793997c5-bcc4-4610-984b-6cf2c2997348> <uuid:b8412dad-b40a-4e35-9f42-f983e0fce39d> ) ] .

<uuid:b6d10150-f9d4-4f7e-b028-c4bbee8e7717> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 0e+00 0e+00 0e+00 ) ] .

<uuid:c060c1dc-6544-4595-b583-72ecf603fd6d> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 2e+01 0e+00 3e+00 ) ] .

<uuid:c611f840-2829-44b2-b367-3915ca7875a4> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 1.8e+01 2e+00 6e+00 ) ] .

<uuid:ca62577e-8e24-4af2-88bf-33b34e25e606> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 0e+00 1e+01 0e+00 ) ] .

<uuid:caa6045e-4189-4571-8914-1189e51ac71e> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 8e+00 6e+00 6e+00 ) ] .

<uuid:d69c596c-134e-4216-9bf6-d0f10e6886d8> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:fad324b9-801f-40f4-b65b-91f8753e9698> <uuid:ad6d8fcc-402c-482e-8f1a-7492ccaead38> ) ] .

<uuid:ec374b67-eb42-4c53-b5cc-0f919edb2635> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:a3b19f96-9bca-4c31-ac7e-4cb1615878df> <uuid:9ef3d2ea-acea-4365-8bd5-2f8ef3036ed0> ) ] .

<uuid:f0249395-1d12-42d1-bdaf-08c5cc29b2d4> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:9ef3d2ea-acea-4365-8bd5-2f8ef3036ed0> <uuid:1d2a5d01-8547-4de6-abea-8f9ab994d35e> ) ] .

<uuid:fad324b9-801f-40f4-b65b-91f8753e9698> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 1.8e+01 2e+00 3e+00 ) ] .

<uuid:fb03276b-4250-4d52-81e1-035a0bd92895> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:b8412dad-b40a-4e35-9f42-f983e0fce39d> <uuid:9a1d8124-ca37-4abd-b07e-bff4c8eaa2f9> ) ] .

<uuid:fc8ba01d-faa7-4407-ae92-32b584c8a6a3> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:1d2a5d01-8547-4de6-abea-8f9ab994d35e> <uuid:f34d9f2e-4180-41de-a613-46f78f4c178f> ) ] .

<uuid:fe0704c2-5d2a-49a8-b507-e98c4047d8c4> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:206806a4-a2f8-4c04-858e-99d289858a40> <uuid:ff685e16-64f8-4f41-8a9e-7d8e83312fd6> ) ] .

<uuid:11caaac5-b631-4bd8-a6af-f82cb6371071> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 1.2e+01 2e+00 6e+00 ) ] .

<uuid:16c35df5-bc63-4edd-8da5-dbcc5548a61e> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 1e+01 1e+01 0e+00 ) ] .

<uuid:21388b1b-dcba-46c0-8166-8ffc9c07e50b> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:caa6045e-4189-4571-8914-1189e51ac71e> <uuid:62a26df3-3e19-49bf-9ee4-24dbeb814a70> ) ] .

<uuid:36b10bf3-9e3a-49cb-9dc5-7e31ade26d17> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:9ef3d2ea-acea-4365-8bd5-2f8ef3036ed0> <uuid:d8d136c6-604c-4ad3-adf7-b0a7e04d034a> ) ] .

<uuid:5e08b82a-8efb-447c-b5c2-54f8ff5788b3> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 1e+01 1e+01 6e+00 ) ] .

<uuid:62a26df3-3e19-49bf-9ee4-24dbeb814a70> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 1e+01 6e+00 6e+00 ) ] .

<uuid:651bb558-f6d6-439f-a8e0-dd5c3385dc94> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:d8d136c6-604c-4ad3-adf7-b0a7e04d034a> <uuid:206806a4-a2f8-4c04-858e-99d289858a40> ) ] .

<uuid:73f88b47-78ab-474d-9c62-73dfefd0dd5d> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:62a26df3-3e19-49bf-9ee4-24dbeb814a70> <uuid:8087116e-84cc-44d1-8047-78dc3837d7e8> ) ] .

<uuid:793997c5-bcc4-4610-984b-6cf2c2997348> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 8e+00 0e+00 3e+00 ) ] .

<uuid:7fe8cb9b-976e-4344-bf72-f3721d878ba4> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 1.2e+01 0e+00 3e+00 ) ] .

<uuid:9a1d8124-ca37-4abd-b07e-bff4c8eaa2f9> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 8e+00 2e+00 6e+00 ) ] .

<uuid:a3b19f96-9bca-4c31-ac7e-4cb1615878df> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 8e+00 0e+00 0e+00 ) ] .

<uuid:ad6d8fcc-402c-482e-8f1a-7492ccaead38> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 1.8e+01 1e+01 3e+00 ) ] .

<uuid:d8d136c6-604c-4ad3-adf7-b0a7e04d034a> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 1e+01 6e+00 0e+00 ) ] .

<uuid:e7300a01-f8c1-4351-9511-02790a5376b0> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 2e+00 1e+01 3e+00 ) ] .

<uuid:ed6b8b1c-7030-4d70-ab61-94cb3aa904a7> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:22138e52-65ef-4773-b69d-5ea2628fad7b> <uuid:f34d9f2e-4180-41de-a613-46f78f4c178f> ) ] .

<uuid:ff685e16-64f8-4f41-8a9e-7d8e83312fd6> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 1.2e+01 0e+00 0e+00 ) ] .

<uuid:1d2a5d01-8547-4de6-abea-8f9ab994d35e> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 8e+00 6e+00 3e+00 ) ] .

<uuid:22138e52-65ef-4773-b69d-5ea2628fad7b> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 1e+01 1e+01 3e+00 ) ] .

<uuid:87373f95-ee4b-4471-9980-f4a8258ee1e3> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 1.2e+01 6e+00 3e+00 ) ] .

<uuid:a0ec1bfd-0f7a-4c42-bc71-bacdcd44071d> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 1.2e+01 2e+00 3e+00 ) ] .

<uuid:b8412dad-b40a-4e35-9f42-f983e0fce39d> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 8e+00 2e+00 3e+00 ) ] .

<uuid:f34d9f2e-4180-41de-a613-46f78f4c178f> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 1e+01 6e+00 3e+00 ) ] .

[] topo:edges ( <uuid:c60507ba-226b-4e49-a702-e9afef899b23> <uuid:7dc1cc1c-8e7f-4666-9f52-4e6c2e6f57ac> <uuid:83ff2cdf-6c58-4e7b-ba55-e084eff8c569> <uuid:d69c596c-134e-4216-9bf6-d0f10e6886d8> <uuid:32e82eb1-93a4-4387-8cd0-9616ebf1e39b> <uuid:8582d9c2-6053-495a-8413-f5493691c0de> <uuid:120defbd-2e05-4ec3-ba3c-ffee086d2add> <uuid:4c2a6434-03b0-4aa2-85ea-a9fcaea41555> <uuid:830b9098-d914-4e8b-869d-4d20f1eb5c81> <uuid:3b72e45d-d351-46e4-a5b7-9ac9bc339d03> <uuid:921e2351-efbf-48be-85d3-eedc0dc2ddc0> <uuid:73f88b47-78ab-474d-9c62-73dfefd0dd5d> <uuid:7aa2a76d-9d5c-4540-9f2e-d8bcf36fadb5> <uuid:ed6b8b1c-7030-4d70-ab61-94cb3aa904a7> <uuid:5f17e211-e8b5-4a7c-85e4-798787fd82a5> <uuid:7da1c2fe-f798-43cc-af44-ac63f968139c> <uuid:46fd1def-a93e-4c99-9868-172cf1b40ff1> <uuid:856e43bc-ee35-44d0-b25e-ea94a53e1db6> <uuid:a5ed4867-4011-4db7-8425-cbe61a6d3a2d> <uuid:745aa367-94b6-4949-a856-5271ec6672e9> <uuid:f921656a-58e3-4375-bdff-ac8019f524cf> <uuid:6aab9ba2-327e-40df-96c2-0ea43c538c24> <uuid:fb28f3f2-8ea7-4c03-bff5-7352addba8b3> <uuid:e0416983-f0db-4c99-8a72-3f8b4615ab05> <uuid:07093c51-5d4e-42ad-941f-8eeb89e5ae78> <uuid:fb03276b-4250-4d52-81e1-035a0bd92895> <uuid:c97ac36d-9cf3-48ca-bb8f-c36cb335bebf> <uuid:af347f25-a547-477c-b246-cb810756d4dc> <uuid:21388b1b-dcba-46c0-8166-8ffc9c07e50b> <uuid:fc8ba01d-faa7-4407-ae92-32b584c8a6a3> <uuid:8601e9ea-c48f-4c00-a066-f950ed6b0724> <uuid:242a8400-a076-4817-86c6-acd56087cec6> <uuid:4ad210b7-5de5-4732-af7c-978de28f988b> <uuid:c12882ea-089f-4616-942c-ceb8fb4ac05e> <uuid:4406e3f5-89dc-463b-84e4-487490f71f1a> <uuid:511c6e7d-728b-4f1f-9763-9461eb628586> <uuid:79205d80-72e5-4bd8-9c03-9503e4e690cc> <uuid:06babc8d-f0d6-43eb-bfad-931055bae084> <uuid:fc877bbe-72a8-4e59-b959-010e6660984a> <uuid:aafd209b-cd13-401a-83f5-26751a02cffe> <uuid:2f3bbe39-01e3-4c96-8dea-377e38729a03> <uuid:9238cbda-d019-4b57-8319-0cc355656802> <uuid:91cdc345-f745-4643-bc88-a24f8e2216b0> <uuid:fe0704c2-5d2a-49a8-b507-e98c4047d8c4> <uuid:651bb558-f6d6-439f-a8e0-dd5c3385dc94> <uuid:61f99921-a94d-4e0d-8353-f027d76227c5> <uuid:474fef44-eb6e-4e19-a871-433f9bac5650> <uuid:736411fb-67f0-47c0-bf77-bf4f9048bcda> <uuid:3fef75ce-8c4c-4d89-a47f-65977debaee0> <uuid:48b52144-aaa0-42a1-8e7a-40bebfcf9985> <uuid:71af0dde-7fc9-4290-9624-119e91f422ea> <uuid:ad13a84c-df97-4b75-9dc1-1ce452249964> <uuid:c2a00070-f12b-42f9-b78c-b33daa500873> <uuid:13dd8184-f73e-4d9f-9977-3e573274fccc> <uuid:7355081e-9fa3-4fb5-ab10-c4efaa41d61f> <uuid:ed666061-98c5-439d-ab0d-5a792437a873> <uuid:5a36c75b-053b-4d7b-b512-6777786d6180> <uuid:b4c7d3ff-cf1f-40c1-8ea0-2cd2c09cc0e0> <uuid:36b10bf3-9e3a-49cb-9dc5-7e31ade26d17> <uuid:ec374b67-eb42-4c53-b5cc-0f919edb2635> <uuid:f0249395-1d12-42d1-bdaf-08c5cc29b2d4> <uuid:a604828d-a36b-4fac-ba6f-6160ade95301> <uuid:508f66b5-e0cb-489c-ae24-21bfb7c09280> <uuid:38499704-81f7-4d47-965f-435e0b7b0850> <uuid:b6e30631-9768-4020-8947-c32137328216> <uuid:90e3950e-40b2-4d9d-a135-1a4b708305aa> ) ;
    topo:faces ( <uuid:4ac3b91b-eeb7-428c-b5e9-7e8a3f0998ae> <uuid:4a294022-4864-49c7-8cee-f9e43360bc4e> <uuid:01947f47-ee13-44a9-85a4-2bcb4881982a> <uuid:607a3363-3eb7-4ce6-a633-86d2e565692b> <uuid:3c1f5c4b-d842-40b6-a332-99d50015fa8f> <uuid:fe522919-1421-4fd1-9930-8c6551e3f2a5> <uuid:2387ae98-9236-42fe-9414-c45b99954c41> <uuid:4ba85faa-3935-4e89-a9f8-dcd647a5dbed> <uuid:c55c88db-d187-4d7e-9aaa-b9d3dce52663> <uuid:dbd99467-ea83-4dff-b03f-eef2aad2687c> <uuid:0e55e87d-8475-4c92-89e7-d62f97ce9ec2> <uuid:6a5ff199-56a7-4e65-94b5-bfdf2ae3449d> <uuid:e499fea3-19f7-4863-8a58-751caff7d884> <uuid:9e4c0c0e-6acf-401b-b35e-0e917ce3a5fc> <uuid:3f5c452f-9815-4b21-9b2d-0127ae80c385> <uuid:66a430c0-123f-42df-9d11-64347362bcb3> <uuid:31d8f2b5-cc74-4f72-b230-d27dad0fd589> <uuid:65959e29-11cb-4568-904d-61c4a7c17b98> <uuid:e2efe498-c6d5-4f9c-ac07-4c1c9e406675> <uuid:5bcee2b5-be9b-47d6-9a8b-35dac021f661> <uuid:91ce0c52-11c3-4e32-8bcc-dea958a3969e> <uuid:56283886-1f4c-448c-b785-80fb9740a9cc> <uuid:f3338301-b0e3-401c-af23-41ac2ae8e969> <uuid:a2117d6b-4621-4a6b-9809-9fab3dfc4ff0> <uuid:9d67557a-e130-4a47-b63d-c6a2bdf21fa2> <uuid:d45fca44-8685-4146-92a5-b84d82fdc838> <uuid:2497a842-0932-4fe5-ac1a-2f773473f338> <uuid:04ea47e9-b4dd-4bed-a8f4-4802d1735c74> <uuid:b5fd960f-0d14-4257-9182-40de738a7e50> <uuid:e119b096-e589-49bd-b1db-a1182dc2dade> <uuid:67842d3a-7c79-4f2a-8630-744711071e93> <uuid:f1c1a636-d6ab-414c-a0aa-855fc7e85e1f> <uuid:a22a6c54-306e-44bc-9b94-6c32c705e63e> <uuid:9ed21e0a-b062-4000-88e2-50bd9153e417> <uuid:802ff3d8-b8da-423f-8a02-7b2288485edd> <uuid:16c13b7b-aeda-4130-a793-d63f62bcc75b> <uuid:786e8738-1690-426d-8e2f-f5e734336a67> ) ;
    topo:points ( <uuid:ad6d8fcc-402c-482e-8f1a-7492ccaead38> <uuid:8d2be28b-8f31-46de-99cb-4d8709502cd0> <uuid:c611f840-2829-44b2-b367-3915ca7875a4> <uuid:fad324b9-801f-40f4-b65b-91f8753e9698> <uuid:a0ec1bfd-0f7a-4c42-bc71-bacdcd44071d> <uuid:11caaac5-b631-4bd8-a6af-f82cb6371071> <uuid:5e08b82a-8efb-447c-b5c2-54f8ff5788b3> <uuid:22138e52-65ef-4773-b69d-5ea2628fad7b> <uuid:62a26df3-3e19-49bf-9ee4-24dbeb814a70> <uuid:8087116e-84cc-44d1-8047-78dc3837d7e8> <uuid:f34d9f2e-4180-41de-a613-46f78f4c178f> <uuid:87373f95-ee4b-4471-9980-f4a8258ee1e3> <uuid:e7300a01-f8c1-4351-9511-02790a5376b0> <uuid:1e20237c-9dfa-4251-9f3f-cc5e56a5becd> <uuid:307b7db6-8014-4628-b80e-ff925bf71168> <uuid:3c08ae4e-7b27-4e95-8bfb-6b42451be8f6> <uuid:b8412dad-b40a-4e35-9f42-f983e0fce39d> <uuid:9a1d8124-ca37-4abd-b07e-bff4c8eaa2f9> <uuid:caa6045e-4189-4571-8914-1189e51ac71e> <uuid:1d2a5d01-8547-4de6-abea-8f9ab994d35e> <uuid:ff685e16-64f8-4f41-8a9e-7d8e83312fd6> <uuid:92bd9ed9-c138-45c3-b72c-a9ecb7f7cfe9> <uuid:c060c1dc-6544-4595-b583-72ecf603fd6d> <uuid:7fe8cb9b-976e-4344-bf72-f3721d878ba4> <uuid:20d3c864-4a8c-4440-b600-a1d424e92f51> <uuid:2b34e214-cba7-4a66-8443-ceb932c5ef09> <uuid:16c35df5-bc63-4edd-8da5-dbcc5548a61e> <uuid:206806a4-a2f8-4c04-858e-99d289858a40> <uuid:d8d136c6-604c-4ad3-adf7-b0a7e04d034a> <uuid:b6d10150-f9d4-4f7e-b028-c4bbee8e7717> <uuid:a3b19f96-9bca-4c31-ac7e-4cb1615878df> <uuid:793997c5-bcc4-4610-984b-6cf2c2997348> <uuid:8e503e04-ad51-423b-8102-708a845189b6> <uuid:ca62577e-8e24-4af2-88bf-33b34e25e606> <uuid:8cda5c68-9c82-43b4-84d7-979efa36dfe1> <uuid:9ef3d2ea-acea-4365-8bd5-2f8ef3036ed0> ) ;
    topo:shells ( <uuid:758590d2-8cc6-4ff7-8fcc-d7ecd01b3498> ) .


```


### Complete 2D Sections Topology (all feature types)
The full 2D sections topology dataset derived from a building floor plan,
expressed in the multi-collection model. All geometry is null except on Point features;
topology is encoded via references and directed_references. Contains:
- 36 point features (3D coordinate geometry nodes)
- 66 edge features (LineString topology via references to point IDs)
- 37 face features (Face topology via rings of directed_references to Edge IDs)
- 5 solid features (Solid topology via shells of directed_references to Face IDs)

#### json
```json
{
  "type": "FeatureCollection",
  "metadata": {
    "units": "meters",
    "coordinate_precision": 3,
    "conversion_factor": 0.0254
  },
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
    },
    {
      "id": "uuid:a0ec1bfd-0f7a-4c42-bc71-bacdcd44071d",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          12.0,
          2.0,
          3.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:11caaac5-b631-4bd8-a6af-f82cb6371071",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          12.0,
          2.0,
          6.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:5e08b82a-8efb-447c-b5c2-54f8ff5788b3",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          10.0,
          10.0,
          6.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:22138e52-65ef-4773-b69d-5ea2628fad7b",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          10.0,
          10.0,
          3.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:62a26df3-3e19-49bf-9ee4-24dbeb814a70",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          10.0,
          6.0,
          6.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:8087116e-84cc-44d1-8047-78dc3837d7e8",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          12.0,
          6.0,
          6.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:f34d9f2e-4180-41de-a613-46f78f4c178f",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          10.0,
          6.0,
          3.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:87373f95-ee4b-4471-9980-f4a8258ee1e3",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          12.0,
          6.0,
          3.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:e7300a01-f8c1-4351-9511-02790a5376b0",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          2.0,
          10.0,
          3.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:1e20237c-9dfa-4251-9f3f-cc5e56a5becd",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          2.0,
          10.0,
          6.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:307b7db6-8014-4628-b80e-ff925bf71168",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          2.0,
          2.0,
          3.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:3c08ae4e-7b27-4e95-8bfb-6b42451be8f6",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          2.0,
          2.0,
          6.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:b8412dad-b40a-4e35-9f42-f983e0fce39d",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          8.0,
          2.0,
          3.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:9a1d8124-ca37-4abd-b07e-bff4c8eaa2f9",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          8.0,
          2.0,
          6.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:caa6045e-4189-4571-8914-1189e51ac71e",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          8.0,
          6.0,
          6.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:1d2a5d01-8547-4de6-abea-8f9ab994d35e",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          8.0,
          6.0,
          3.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:ff685e16-64f8-4f41-8a9e-7d8e83312fd6",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          12.0,
          0.0,
          0.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:92bd9ed9-c138-45c3-b72c-a9ecb7f7cfe9",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          20.0,
          0.0,
          0.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:c060c1dc-6544-4595-b583-72ecf603fd6d",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          20.0,
          0.0,
          3.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:7fe8cb9b-976e-4344-bf72-f3721d878ba4",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          12.0,
          0.0,
          3.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:20d3c864-4a8c-4440-b600-a1d424e92f51",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          20.0,
          10.0,
          0.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:2b34e214-cba7-4a66-8443-ceb932c5ef09",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          20.0,
          10.0,
          3.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:16c35df5-bc63-4edd-8da5-dbcc5548a61e",
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
      "id": "uuid:206806a4-a2f8-4c04-858e-99d289858a40",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          12.0,
          6.0,
          0.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:d8d136c6-604c-4ad3-adf7-b0a7e04d034a",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          10.0,
          6.0,
          0.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:b6d10150-f9d4-4f7e-b028-c4bbee8e7717",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          0.0,
          0.0,
          0.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:a3b19f96-9bca-4c31-ac7e-4cb1615878df",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          8.0,
          0.0,
          0.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:793997c5-bcc4-4610-984b-6cf2c2997348",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          8.0,
          0.0,
          3.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:8e503e04-ad51-423b-8102-708a845189b6",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          0.0,
          0.0,
          3.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:ca62577e-8e24-4af2-88bf-33b34e25e606",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          0.0,
          10.0,
          0.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:8cda5c68-9c82-43b4-84d7-979efa36dfe1",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          0.0,
          10.0,
          3.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:9ef3d2ea-acea-4365-8bd5-2f8ef3036ed0",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          8.0,
          6.0,
          0.0
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
    },
    {
      "id": "uuid:32e82eb1-93a4-4387-8cd0-9616ebf1e39b",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:a0ec1bfd-0f7a-4c42-bc71-bacdcd44071d",
          "uuid:fad324b9-801f-40f4-b65b-91f8753e9698"
        ]
      },
      "properties": {
        "length": 6.0
      }
    },
    {
      "id": "uuid:8582d9c2-6053-495a-8413-f5493691c0de",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:c611f840-2829-44b2-b367-3915ca7875a4",
          "uuid:11caaac5-b631-4bd8-a6af-f82cb6371071"
        ]
      },
      "properties": {
        "length": 6.0
      }
    },
    {
      "id": "uuid:120defbd-2e05-4ec3-ba3c-ffee086d2add",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:11caaac5-b631-4bd8-a6af-f82cb6371071",
          "uuid:a0ec1bfd-0f7a-4c42-bc71-bacdcd44071d"
        ]
      },
      "properties": {
        "length": 3.0
      }
    },
    {
      "id": "uuid:4c2a6434-03b0-4aa2-85ea-a9fcaea41555",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:5e08b82a-8efb-447c-b5c2-54f8ff5788b3",
          "uuid:8d2be28b-8f31-46de-99cb-4d8709502cd0"
        ]
      },
      "properties": {
        "length": 8.0
      }
    },
    {
      "id": "uuid:830b9098-d914-4e8b-869d-4d20f1eb5c81",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:ad6d8fcc-402c-482e-8f1a-7492ccaead38",
          "uuid:22138e52-65ef-4773-b69d-5ea2628fad7b"
        ]
      },
      "properties": {
        "length": 8.0
      }
    },
    {
      "id": "uuid:3b72e45d-d351-46e4-a5b7-9ac9bc339d03",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:22138e52-65ef-4773-b69d-5ea2628fad7b",
          "uuid:5e08b82a-8efb-447c-b5c2-54f8ff5788b3"
        ]
      },
      "properties": {
        "length": 3.0
      }
    },
    {
      "id": "uuid:921e2351-efbf-48be-85d3-eedc0dc2ddc0",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:5e08b82a-8efb-447c-b5c2-54f8ff5788b3",
          "uuid:62a26df3-3e19-49bf-9ee4-24dbeb814a70"
        ]
      },
      "properties": {
        "length": 4.0
      }
    },
    {
      "id": "uuid:73f88b47-78ab-474d-9c62-73dfefd0dd5d",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:62a26df3-3e19-49bf-9ee4-24dbeb814a70",
          "uuid:8087116e-84cc-44d1-8047-78dc3837d7e8"
        ]
      },
      "properties": {
        "length": 2.0
      }
    },
    {
      "id": "uuid:7aa2a76d-9d5c-4540-9f2e-d8bcf36fadb5",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:8087116e-84cc-44d1-8047-78dc3837d7e8",
          "uuid:11caaac5-b631-4bd8-a6af-f82cb6371071"
        ]
      },
      "properties": {
        "length": 4.0
      }
    },
    {
      "id": "uuid:ed6b8b1c-7030-4d70-ab61-94cb3aa904a7",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:22138e52-65ef-4773-b69d-5ea2628fad7b",
          "uuid:f34d9f2e-4180-41de-a613-46f78f4c178f"
        ]
      },
      "properties": {
        "length": 4.0
      }
    },
    {
      "id": "uuid:5f17e211-e8b5-4a7c-85e4-798787fd82a5",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:f34d9f2e-4180-41de-a613-46f78f4c178f",
          "uuid:62a26df3-3e19-49bf-9ee4-24dbeb814a70"
        ]
      },
      "properties": {
        "length": 3.0
      }
    },
    {
      "id": "uuid:7da1c2fe-f798-43cc-af44-ac63f968139c",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:f34d9f2e-4180-41de-a613-46f78f4c178f",
          "uuid:87373f95-ee4b-4471-9980-f4a8258ee1e3"
        ]
      },
      "properties": {
        "length": 2.0
      }
    },
    {
      "id": "uuid:46fd1def-a93e-4c99-9868-172cf1b40ff1",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:87373f95-ee4b-4471-9980-f4a8258ee1e3",
          "uuid:8087116e-84cc-44d1-8047-78dc3837d7e8"
        ]
      },
      "properties": {
        "length": 3.0
      }
    },
    {
      "id": "uuid:856e43bc-ee35-44d0-b25e-ea94a53e1db6",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:a0ec1bfd-0f7a-4c42-bc71-bacdcd44071d",
          "uuid:87373f95-ee4b-4471-9980-f4a8258ee1e3"
        ]
      },
      "properties": {
        "length": 4.0
      }
    },
    {
      "id": "uuid:a5ed4867-4011-4db7-8425-cbe61a6d3a2d",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:22138e52-65ef-4773-b69d-5ea2628fad7b",
          "uuid:e7300a01-f8c1-4351-9511-02790a5376b0"
        ]
      },
      "properties": {
        "length": 8.0
      }
    },
    {
      "id": "uuid:745aa367-94b6-4949-a856-5271ec6672e9",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:e7300a01-f8c1-4351-9511-02790a5376b0",
          "uuid:1e20237c-9dfa-4251-9f3f-cc5e56a5becd"
        ]
      },
      "properties": {
        "length": 3.0
      }
    },
    {
      "id": "uuid:f921656a-58e3-4375-bdff-ac8019f524cf",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:1e20237c-9dfa-4251-9f3f-cc5e56a5becd",
          "uuid:5e08b82a-8efb-447c-b5c2-54f8ff5788b3"
        ]
      },
      "properties": {
        "length": 8.0
      }
    },
    {
      "id": "uuid:6aab9ba2-327e-40df-96c2-0ea43c538c24",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:e7300a01-f8c1-4351-9511-02790a5376b0",
          "uuid:307b7db6-8014-4628-b80e-ff925bf71168"
        ]
      },
      "properties": {
        "length": 8.0
      }
    },
    {
      "id": "uuid:fb28f3f2-8ea7-4c03-bff5-7352addba8b3",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:3c08ae4e-7b27-4e95-8bfb-6b42451be8f6",
          "uuid:307b7db6-8014-4628-b80e-ff925bf71168"
        ]
      },
      "properties": {
        "length": 3.0
      }
    },
    {
      "id": "uuid:e0416983-f0db-4c99-8a72-3f8b4615ab05",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:3c08ae4e-7b27-4e95-8bfb-6b42451be8f6",
          "uuid:1e20237c-9dfa-4251-9f3f-cc5e56a5becd"
        ]
      },
      "properties": {
        "length": 8.0
      }
    },
    {
      "id": "uuid:07093c51-5d4e-42ad-941f-8eeb89e5ae78",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:307b7db6-8014-4628-b80e-ff925bf71168",
          "uuid:b8412dad-b40a-4e35-9f42-f983e0fce39d"
        ]
      },
      "properties": {
        "length": 6.0
      }
    },
    {
      "id": "uuid:fb03276b-4250-4d52-81e1-035a0bd92895",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:b8412dad-b40a-4e35-9f42-f983e0fce39d",
          "uuid:9a1d8124-ca37-4abd-b07e-bff4c8eaa2f9"
        ]
      },
      "properties": {
        "length": 3.0
      }
    },
    {
      "id": "uuid:c97ac36d-9cf3-48ca-bb8f-c36cb335bebf",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:9a1d8124-ca37-4abd-b07e-bff4c8eaa2f9",
          "uuid:3c08ae4e-7b27-4e95-8bfb-6b42451be8f6"
        ]
      },
      "properties": {
        "length": 6.0
      }
    },
    {
      "id": "uuid:af347f25-a547-477c-b246-cb810756d4dc",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:9a1d8124-ca37-4abd-b07e-bff4c8eaa2f9",
          "uuid:caa6045e-4189-4571-8914-1189e51ac71e"
        ]
      },
      "properties": {
        "length": 4.0
      }
    },
    {
      "id": "uuid:21388b1b-dcba-46c0-8166-8ffc9c07e50b",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:caa6045e-4189-4571-8914-1189e51ac71e",
          "uuid:62a26df3-3e19-49bf-9ee4-24dbeb814a70"
        ]
      },
      "properties": {
        "length": 2.0
      }
    },
    {
      "id": "uuid:fc8ba01d-faa7-4407-ae92-32b584c8a6a3",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:1d2a5d01-8547-4de6-abea-8f9ab994d35e",
          "uuid:f34d9f2e-4180-41de-a613-46f78f4c178f"
        ]
      },
      "properties": {
        "length": 2.0
      }
    },
    {
      "id": "uuid:8601e9ea-c48f-4c00-a066-f950ed6b0724",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:caa6045e-4189-4571-8914-1189e51ac71e",
          "uuid:1d2a5d01-8547-4de6-abea-8f9ab994d35e"
        ]
      },
      "properties": {
        "length": 3.0
      }
    },
    {
      "id": "uuid:242a8400-a076-4817-86c6-acd56087cec6",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:1d2a5d01-8547-4de6-abea-8f9ab994d35e",
          "uuid:b8412dad-b40a-4e35-9f42-f983e0fce39d"
        ]
      },
      "properties": {
        "length": 4.0
      }
    },
    {
      "id": "uuid:4ad210b7-5de5-4732-af7c-978de28f988b",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:ff685e16-64f8-4f41-8a9e-7d8e83312fd6",
          "uuid:92bd9ed9-c138-45c3-b72c-a9ecb7f7cfe9"
        ]
      },
      "properties": {
        "length": 8.0
      }
    },
    {
      "id": "uuid:c12882ea-089f-4616-942c-ceb8fb4ac05e",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:92bd9ed9-c138-45c3-b72c-a9ecb7f7cfe9",
          "uuid:c060c1dc-6544-4595-b583-72ecf603fd6d"
        ]
      },
      "properties": {
        "length": 3.0
      }
    },
    {
      "id": "uuid:4406e3f5-89dc-463b-84e4-487490f71f1a",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:c060c1dc-6544-4595-b583-72ecf603fd6d",
          "uuid:7fe8cb9b-976e-4344-bf72-f3721d878ba4"
        ]
      },
      "properties": {
        "length": 8.0
      }
    },
    {
      "id": "uuid:511c6e7d-728b-4f1f-9763-9461eb628586",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:7fe8cb9b-976e-4344-bf72-f3721d878ba4",
          "uuid:ff685e16-64f8-4f41-8a9e-7d8e83312fd6"
        ]
      },
      "properties": {
        "length": 3.0
      }
    },
    {
      "id": "uuid:79205d80-72e5-4bd8-9c03-9503e4e690cc",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:92bd9ed9-c138-45c3-b72c-a9ecb7f7cfe9",
          "uuid:20d3c864-4a8c-4440-b600-a1d424e92f51"
        ]
      },
      "properties": {
        "length": 10.0
      }
    },
    {
      "id": "uuid:06babc8d-f0d6-43eb-bfad-931055bae084",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:20d3c864-4a8c-4440-b600-a1d424e92f51",
          "uuid:2b34e214-cba7-4a66-8443-ceb932c5ef09"
        ]
      },
      "properties": {
        "length": 3.0
      }
    },
    {
      "id": "uuid:fc877bbe-72a8-4e59-b959-010e6660984a",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:2b34e214-cba7-4a66-8443-ceb932c5ef09",
          "uuid:c060c1dc-6544-4595-b583-72ecf603fd6d"
        ]
      },
      "properties": {
        "length": 10.0
      }
    },
    {
      "id": "uuid:aafd209b-cd13-401a-83f5-26751a02cffe",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:20d3c864-4a8c-4440-b600-a1d424e92f51",
          "uuid:16c35df5-bc63-4edd-8da5-dbcc5548a61e"
        ]
      },
      "properties": {
        "length": 10.0
      }
    },
    {
      "id": "uuid:2f3bbe39-01e3-4c96-8dea-377e38729a03",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:16c35df5-bc63-4edd-8da5-dbcc5548a61e",
          "uuid:22138e52-65ef-4773-b69d-5ea2628fad7b"
        ]
      },
      "properties": {
        "length": 3.0
      }
    },
    {
      "id": "uuid:9238cbda-d019-4b57-8319-0cc355656802",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:ad6d8fcc-402c-482e-8f1a-7492ccaead38",
          "uuid:2b34e214-cba7-4a66-8443-ceb932c5ef09"
        ]
      },
      "properties": {
        "length": 2.0
      }
    },
    {
      "id": "uuid:91cdc345-f745-4643-bc88-a24f8e2216b0",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:a0ec1bfd-0f7a-4c42-bc71-bacdcd44071d",
          "uuid:7fe8cb9b-976e-4344-bf72-f3721d878ba4"
        ]
      },
      "properties": {
        "length": 2.0
      }
    },
    {
      "id": "uuid:fe0704c2-5d2a-49a8-b507-e98c4047d8c4",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:206806a4-a2f8-4c04-858e-99d289858a40",
          "uuid:ff685e16-64f8-4f41-8a9e-7d8e83312fd6"
        ]
      },
      "properties": {
        "length": 6.0
      }
    },
    {
      "id": "uuid:651bb558-f6d6-439f-a8e0-dd5c3385dc94",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:d8d136c6-604c-4ad3-adf7-b0a7e04d034a",
          "uuid:206806a4-a2f8-4c04-858e-99d289858a40"
        ]
      },
      "properties": {
        "length": 2.0
      }
    },
    {
      "id": "uuid:61f99921-a94d-4e0d-8353-f027d76227c5",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:16c35df5-bc63-4edd-8da5-dbcc5548a61e",
          "uuid:d8d136c6-604c-4ad3-adf7-b0a7e04d034a"
        ]
      },
      "properties": {
        "length": 4.0
      }
    },
    {
      "id": "uuid:474fef44-eb6e-4e19-a871-433f9bac5650",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:f34d9f2e-4180-41de-a613-46f78f4c178f",
          "uuid:d8d136c6-604c-4ad3-adf7-b0a7e04d034a"
        ]
      },
      "properties": {
        "length": 3.0
      }
    },
    {
      "id": "uuid:736411fb-67f0-47c0-bf77-bf4f9048bcda",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:87373f95-ee4b-4471-9980-f4a8258ee1e3",
          "uuid:206806a4-a2f8-4c04-858e-99d289858a40"
        ]
      },
      "properties": {
        "length": 3.0
      }
    },
    {
      "id": "uuid:3fef75ce-8c4c-4d89-a47f-65977debaee0",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:b6d10150-f9d4-4f7e-b028-c4bbee8e7717",
          "uuid:a3b19f96-9bca-4c31-ac7e-4cb1615878df"
        ]
      },
      "properties": {
        "length": 8.0
      }
    },
    {
      "id": "uuid:48b52144-aaa0-42a1-8e7a-40bebfcf9985",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:a3b19f96-9bca-4c31-ac7e-4cb1615878df",
          "uuid:793997c5-bcc4-4610-984b-6cf2c2997348"
        ]
      },
      "properties": {
        "length": 3.0
      }
    },
    {
      "id": "uuid:71af0dde-7fc9-4290-9624-119e91f422ea",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:793997c5-bcc4-4610-984b-6cf2c2997348",
          "uuid:8e503e04-ad51-423b-8102-708a845189b6"
        ]
      },
      "properties": {
        "length": 8.0
      }
    },
    {
      "id": "uuid:ad13a84c-df97-4b75-9dc1-1ce452249964",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:8e503e04-ad51-423b-8102-708a845189b6",
          "uuid:b6d10150-f9d4-4f7e-b028-c4bbee8e7717"
        ]
      },
      "properties": {
        "length": 3.0
      }
    },
    {
      "id": "uuid:c2a00070-f12b-42f9-b78c-b33daa500873",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:ca62577e-8e24-4af2-88bf-33b34e25e606",
          "uuid:b6d10150-f9d4-4f7e-b028-c4bbee8e7717"
        ]
      },
      "properties": {
        "length": 10.0
      }
    },
    {
      "id": "uuid:13dd8184-f73e-4d9f-9977-3e573274fccc",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:8e503e04-ad51-423b-8102-708a845189b6",
          "uuid:8cda5c68-9c82-43b4-84d7-979efa36dfe1"
        ]
      },
      "properties": {
        "length": 10.0
      }
    },
    {
      "id": "uuid:7355081e-9fa3-4fb5-ab10-c4efaa41d61f",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:ca62577e-8e24-4af2-88bf-33b34e25e606",
          "uuid:8cda5c68-9c82-43b4-84d7-979efa36dfe1"
        ]
      },
      "properties": {
        "length": 3.0
      }
    },
    {
      "id": "uuid:ed666061-98c5-439d-ab0d-5a792437a873",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:16c35df5-bc63-4edd-8da5-dbcc5548a61e",
          "uuid:ca62577e-8e24-4af2-88bf-33b34e25e606"
        ]
      },
      "properties": {
        "length": 10.0
      }
    },
    {
      "id": "uuid:5a36c75b-053b-4d7b-b512-6777786d6180",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:8cda5c68-9c82-43b4-84d7-979efa36dfe1",
          "uuid:e7300a01-f8c1-4351-9511-02790a5376b0"
        ]
      },
      "properties": {
        "length": 2.0
      }
    },
    {
      "id": "uuid:b4c7d3ff-cf1f-40c1-8ea0-2cd2c09cc0e0",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:793997c5-bcc4-4610-984b-6cf2c2997348",
          "uuid:b8412dad-b40a-4e35-9f42-f983e0fce39d"
        ]
      },
      "properties": {
        "length": 2.0
      }
    },
    {
      "id": "uuid:36b10bf3-9e3a-49cb-9dc5-7e31ade26d17",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:9ef3d2ea-acea-4365-8bd5-2f8ef3036ed0",
          "uuid:d8d136c6-604c-4ad3-adf7-b0a7e04d034a"
        ]
      },
      "properties": {
        "length": 2.0
      }
    },
    {
      "id": "uuid:ec374b67-eb42-4c53-b5cc-0f919edb2635",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:a3b19f96-9bca-4c31-ac7e-4cb1615878df",
          "uuid:9ef3d2ea-acea-4365-8bd5-2f8ef3036ed0"
        ]
      },
      "properties": {
        "length": 6.0
      }
    },
    {
      "id": "uuid:f0249395-1d12-42d1-bdaf-08c5cc29b2d4",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:9ef3d2ea-acea-4365-8bd5-2f8ef3036ed0",
          "uuid:1d2a5d01-8547-4de6-abea-8f9ab994d35e"
        ]
      },
      "properties": {
        "length": 3.0
      }
    },
    {
      "id": "uuid:a604828d-a36b-4fac-ba6f-6160ade95301",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:a3b19f96-9bca-4c31-ac7e-4cb1615878df",
          "uuid:ff685e16-64f8-4f41-8a9e-7d8e83312fd6"
        ]
      },
      "properties": {
        "length": 4.0
      }
    },
    {
      "id": "uuid:508f66b5-e0cb-489c-ae24-21bfb7c09280",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:7fe8cb9b-976e-4344-bf72-f3721d878ba4",
          "uuid:793997c5-bcc4-4610-984b-6cf2c2997348"
        ]
      },
      "properties": {
        "length": 4.0
      }
    },
    {
      "id": "uuid:38499704-81f7-4d47-965f-435e0b7b0850",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:b8412dad-b40a-4e35-9f42-f983e0fce39d",
          "uuid:a0ec1bfd-0f7a-4c42-bc71-bacdcd44071d"
        ]
      },
      "properties": {
        "length": 4.0
      }
    },
    {
      "id": "uuid:b6e30631-9768-4020-8947-c32137328216",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:9a1d8124-ca37-4abd-b07e-bff4c8eaa2f9",
          "uuid:11caaac5-b631-4bd8-a6af-f82cb6371071"
        ]
      },
      "properties": {
        "length": 4.0
      }
    },
    {
      "id": "uuid:90e3950e-40b2-4d9d-a135-1a4b708305aa",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:1d2a5d01-8547-4de6-abea-8f9ab994d35e",
          "uuid:87373f95-ee4b-4471-9980-f4a8258ee1e3"
        ]
      },
      "properties": {
        "length": 4.0
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
    },
    {
      "id": "uuid:4a294022-4864-49c7-8cee-f9e43360bc4e",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:32e82eb1-93a4-4387-8cd0-9616ebf1e39b",
                "orientation": "+"
              },
              {
                "ref": "uuid:83ff2cdf-6c58-4e7b-ba55-e084eff8c569",
                "orientation": "-"
              },
              {
                "ref": "uuid:8582d9c2-6053-495a-8413-f5493691c0de",
                "orientation": "+"
              },
              {
                "ref": "uuid:120defbd-2e05-4ec3-ba3c-ffee086d2add",
                "orientation": "+"
              }
            ]
          }
        ]
      },
      "properties": {
        "normal": [
          0.0,
          -1.0,
          3.007964248051e-16
        ],
        "area": 18.0
      }
    },
    {
      "id": "uuid:01947f47-ee13-44a9-85a4-2bcb4881982a",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:4c2a6434-03b0-4aa2-85ea-a9fcaea41555",
                "orientation": "+"
              },
              {
                "ref": "uuid:c60507ba-226b-4e49-a702-e9afef899b23",
                "orientation": "-"
              },
              {
                "ref": "uuid:830b9098-d914-4e8b-869d-4d20f1eb5c81",
                "orientation": "+"
              },
              {
                "ref": "uuid:3b72e45d-d351-46e4-a5b7-9ac9bc339d03",
                "orientation": "+"
              }
            ]
          }
        ]
      },
      "properties": {
        "normal": [
          0.0,
          1.0,
          0.0
        ],
        "area": 24.0
      }
    },
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
    },
    {
      "id": "uuid:3c1f5c4b-d842-40b6-a332-99d50015fa8f",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:ed6b8b1c-7030-4d70-ab61-94cb3aa904a7",
                "orientation": "+"
              },
              {
                "ref": "uuid:5f17e211-e8b5-4a7c-85e4-798787fd82a5",
                "orientation": "+"
              },
              {
                "ref": "uuid:921e2351-efbf-48be-85d3-eedc0dc2ddc0",
                "orientation": "-"
              },
              {
                "ref": "uuid:3b72e45d-d351-46e4-a5b7-9ac9bc339d03",
                "orientation": "-"
              }
            ]
          }
        ]
      },
      "properties": {
        "normal": [
          -1.0,
          -0.0,
          -0.0
        ],
        "area": 12.0
      }
    },
    {
      "id": "uuid:fe522919-1421-4fd1-9930-8c6551e3f2a5",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:7da1c2fe-f798-43cc-af44-ac63f968139c",
                "orientation": "+"
              },
              {
                "ref": "uuid:46fd1def-a93e-4c99-9868-172cf1b40ff1",
                "orientation": "+"
              },
              {
                "ref": "uuid:73f88b47-78ab-474d-9c62-73dfefd0dd5d",
                "orientation": "-"
              },
              {
                "ref": "uuid:5f17e211-e8b5-4a7c-85e4-798787fd82a5",
                "orientation": "-"
              }
            ]
          }
        ]
      },
      "properties": {
        "normal": [
          0.0,
          -1.0,
          0.0
        ],
        "area": 6.0
      }
    },
    {
      "id": "uuid:2387ae98-9236-42fe-9414-c45b99954c41",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:856e43bc-ee35-44d0-b25e-ea94a53e1db6",
                "orientation": "+"
              },
              {
                "ref": "uuid:7da1c2fe-f798-43cc-af44-ac63f968139c",
                "orientation": "-"
              },
              {
                "ref": "uuid:ed6b8b1c-7030-4d70-ab61-94cb3aa904a7",
                "orientation": "-"
              },
              {
                "ref": "uuid:830b9098-d914-4e8b-869d-4d20f1eb5c81",
                "orientation": "-"
              },
              {
                "ref": "uuid:d69c596c-134e-4216-9bf6-d0f10e6886d8",
                "orientation": "-"
              },
              {
                "ref": "uuid:32e82eb1-93a4-4387-8cd0-9616ebf1e39b",
                "orientation": "-"
              }
            ]
          }
        ]
      },
      "properties": {
        "normal": [
          0.0,
          0.0,
          -1.0
        ],
        "area": 56.0
      }
    },
    {
      "id": "uuid:4ba85faa-3935-4e89-a9f8-dcd647a5dbed",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:856e43bc-ee35-44d0-b25e-ea94a53e1db6",
                "orientation": "-"
              },
              {
                "ref": "uuid:120defbd-2e05-4ec3-ba3c-ffee086d2add",
                "orientation": "-"
              },
              {
                "ref": "uuid:7aa2a76d-9d5c-4540-9f2e-d8bcf36fadb5",
                "orientation": "-"
              },
              {
                "ref": "uuid:46fd1def-a93e-4c99-9868-172cf1b40ff1",
                "orientation": "-"
              }
            ]
          }
        ]
      },
      "properties": {
        "normal": [
          -1.0,
          -0.0,
          -0.0
        ],
        "area": 12.0
      }
    },
    {
      "id": "uuid:c55c88db-d187-4d7e-9aaa-b9d3dce52663",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:a5ed4867-4011-4db7-8425-cbe61a6d3a2d",
                "orientation": "+"
              },
              {
                "ref": "uuid:745aa367-94b6-4949-a856-5271ec6672e9",
                "orientation": "+"
              },
              {
                "ref": "uuid:f921656a-58e3-4375-bdff-ac8019f524cf",
                "orientation": "+"
              },
              {
                "ref": "uuid:3b72e45d-d351-46e4-a5b7-9ac9bc339d03",
                "orientation": "-"
              }
            ]
          }
        ]
      },
      "properties": {
        "normal": [
          0.0,
          1.0,
          0.0
        ],
        "area": 24.0
      }
    },
    {
      "id": "uuid:dbd99467-ea83-4dff-b03f-eef2aad2687c",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:745aa367-94b6-4949-a856-5271ec6672e9",
                "orientation": "-"
              },
              {
                "ref": "uuid:6aab9ba2-327e-40df-96c2-0ea43c538c24",
                "orientation": "+"
              },
              {
                "ref": "uuid:fb28f3f2-8ea7-4c03-bff5-7352addba8b3",
                "orientation": "-"
              },
              {
                "ref": "uuid:e0416983-f0db-4c99-8a72-3f8b4615ab05",
                "orientation": "+"
              }
            ]
          }
        ]
      },
      "properties": {
        "normal": [
          -1.0,
          -0.0,
          -3.007964248051e-16
        ],
        "area": 24.0
      }
    },
    {
      "id": "uuid:0e55e87d-8475-4c92-89e7-d62f97ce9ec2",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:fb28f3f2-8ea7-4c03-bff5-7352addba8b3",
                "orientation": "+"
              },
              {
                "ref": "uuid:07093c51-5d4e-42ad-941f-8eeb89e5ae78",
                "orientation": "+"
              },
              {
                "ref": "uuid:fb03276b-4250-4d52-81e1-035a0bd92895",
                "orientation": "+"
              },
              {
                "ref": "uuid:c97ac36d-9cf3-48ca-bb8f-c36cb335bebf",
                "orientation": "+"
              }
            ]
          }
        ]
      },
      "properties": {
        "normal": [
          0.0,
          -1.0,
          0.0
        ],
        "area": 18.0
      }
    },
    {
      "id": "uuid:6a5ff199-56a7-4e65-94b5-bfdf2ae3449d",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:f921656a-58e3-4375-bdff-ac8019f524cf",
                "orientation": "-"
              },
              {
                "ref": "uuid:e0416983-f0db-4c99-8a72-3f8b4615ab05",
                "orientation": "-"
              },
              {
                "ref": "uuid:c97ac36d-9cf3-48ca-bb8f-c36cb335bebf",
                "orientation": "-"
              },
              {
                "ref": "uuid:af347f25-a547-477c-b246-cb810756d4dc",
                "orientation": "+"
              },
              {
                "ref": "uuid:21388b1b-dcba-46c0-8166-8ffc9c07e50b",
                "orientation": "+"
              },
              {
                "ref": "uuid:921e2351-efbf-48be-85d3-eedc0dc2ddc0",
                "orientation": "-"
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
    },
    {
      "id": "uuid:e499fea3-19f7-4863-8a58-751caff7d884",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:fc8ba01d-faa7-4407-ae92-32b584c8a6a3",
                "orientation": "+"
              },
              {
                "ref": "uuid:5f17e211-e8b5-4a7c-85e4-798787fd82a5",
                "orientation": "+"
              },
              {
                "ref": "uuid:21388b1b-dcba-46c0-8166-8ffc9c07e50b",
                "orientation": "-"
              },
              {
                "ref": "uuid:8601e9ea-c48f-4c00-a066-f950ed6b0724",
                "orientation": "+"
              }
            ]
          }
        ]
      },
      "properties": {
        "normal": [
          0.0,
          -1.0,
          0.0
        ],
        "area": 6.0
      }
    },
    {
      "id": "uuid:9e4c0c0e-6acf-401b-b35e-0e917ce3a5fc",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:242a8400-a076-4817-86c6-acd56087cec6",
                "orientation": "+"
              },
              {
                "ref": "uuid:07093c51-5d4e-42ad-941f-8eeb89e5ae78",
                "orientation": "-"
              },
              {
                "ref": "uuid:6aab9ba2-327e-40df-96c2-0ea43c538c24",
                "orientation": "-"
              },
              {
                "ref": "uuid:a5ed4867-4011-4db7-8425-cbe61a6d3a2d",
                "orientation": "-"
              },
              {
                "ref": "uuid:ed6b8b1c-7030-4d70-ab61-94cb3aa904a7",
                "orientation": "+"
              },
              {
                "ref": "uuid:fc8ba01d-faa7-4407-ae92-32b584c8a6a3",
                "orientation": "-"
              }
            ]
          }
        ]
      },
      "properties": {
        "normal": [
          0.0,
          0.0,
          -1.0
        ],
        "area": 56.0
      }
    },
    {
      "id": "uuid:3f5c452f-9815-4b21-9b2d-0127ae80c385",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:242a8400-a076-4817-86c6-acd56087cec6",
                "orientation": "-"
              },
              {
                "ref": "uuid:8601e9ea-c48f-4c00-a066-f950ed6b0724",
                "orientation": "-"
              },
              {
                "ref": "uuid:af347f25-a547-477c-b246-cb810756d4dc",
                "orientation": "-"
              },
              {
                "ref": "uuid:fb03276b-4250-4d52-81e1-035a0bd92895",
                "orientation": "-"
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
        "area": 12.0
      }
    },
    {
      "id": "uuid:66a430c0-123f-42df-9d11-64347362bcb3",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:4ad210b7-5de5-4732-af7c-978de28f988b",
                "orientation": "+"
              },
              {
                "ref": "uuid:c12882ea-089f-4616-942c-ceb8fb4ac05e",
                "orientation": "+"
              },
              {
                "ref": "uuid:4406e3f5-89dc-463b-84e4-487490f71f1a",
                "orientation": "+"
              },
              {
                "ref": "uuid:511c6e7d-728b-4f1f-9763-9461eb628586",
                "orientation": "+"
              }
            ]
          }
        ]
      },
      "properties": {
        "normal": [
          0.0,
          -1.0,
          0.0
        ],
        "area": 24.0
      }
    },
    {
      "id": "uuid:31d8f2b5-cc74-4f72-b230-d27dad0fd589",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:79205d80-72e5-4bd8-9c03-9503e4e690cc",
                "orientation": "+"
              },
              {
                "ref": "uuid:06babc8d-f0d6-43eb-bfad-931055bae084",
                "orientation": "+"
              },
              {
                "ref": "uuid:fc877bbe-72a8-4e59-b959-010e6660984a",
                "orientation": "+"
              },
              {
                "ref": "uuid:c12882ea-089f-4616-942c-ceb8fb4ac05e",
                "orientation": "-"
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
        "area": 30.0
      }
    },
    {
      "id": "uuid:65959e29-11cb-4568-904d-61c4a7c17b98",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:aafd209b-cd13-401a-83f5-26751a02cffe",
                "orientation": "+"
              },
              {
                "ref": "uuid:2f3bbe39-01e3-4c96-8dea-377e38729a03",
                "orientation": "+"
              },
              {
                "ref": "uuid:830b9098-d914-4e8b-869d-4d20f1eb5c81",
                "orientation": "-"
              },
              {
                "ref": "uuid:9238cbda-d019-4b57-8319-0cc355656802",
                "orientation": "+"
              },
              {
                "ref": "uuid:06babc8d-f0d6-43eb-bfad-931055bae084",
                "orientation": "-"
              }
            ]
          }
        ]
      },
      "properties": {
        "normal": [
          0.0,
          1.0,
          0.0
        ],
        "area": 30.0
      }
    },
    {
      "id": "uuid:e2efe498-c6d5-4f9c-ac07-4c1c9e406675",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:d69c596c-134e-4216-9bf6-d0f10e6886d8",
                "orientation": "-"
              },
              {
                "ref": "uuid:32e82eb1-93a4-4387-8cd0-9616ebf1e39b",
                "orientation": "-"
              },
              {
                "ref": "uuid:91cdc345-f745-4643-bc88-a24f8e2216b0",
                "orientation": "+"
              },
              {
                "ref": "uuid:4406e3f5-89dc-463b-84e4-487490f71f1a",
                "orientation": "-"
              },
              {
                "ref": "uuid:fc877bbe-72a8-4e59-b959-010e6660984a",
                "orientation": "-"
              },
              {
                "ref": "uuid:9238cbda-d019-4b57-8319-0cc355656802",
                "orientation": "-"
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
        "area": 32.0
      }
    },
    {
      "id": "uuid:5bcee2b5-be9b-47d6-9a8b-35dac021f661",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:4ad210b7-5de5-4732-af7c-978de28f988b",
                "orientation": "-"
              },
              {
                "ref": "uuid:fe0704c2-5d2a-49a8-b507-e98c4047d8c4",
                "orientation": "-"
              },
              {
                "ref": "uuid:651bb558-f6d6-439f-a8e0-dd5c3385dc94",
                "orientation": "-"
              },
              {
                "ref": "uuid:61f99921-a94d-4e0d-8353-f027d76227c5",
                "orientation": "-"
              },
              {
                "ref": "uuid:aafd209b-cd13-401a-83f5-26751a02cffe",
                "orientation": "-"
              },
              {
                "ref": "uuid:79205d80-72e5-4bd8-9c03-9503e4e690cc",
                "orientation": "-"
              }
            ]
          }
        ]
      },
      "properties": {
        "normal": [
          -0.0,
          -0.0,
          -1.0
        ],
        "area": 88.0
      }
    },
    {
      "id": "uuid:91ce0c52-11c3-4e32-8bcc-dea958a3969e",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:474fef44-eb6e-4e19-a871-433f9bac5650",
                "orientation": "-"
              },
              {
                "ref": "uuid:ed6b8b1c-7030-4d70-ab61-94cb3aa904a7",
                "orientation": "-"
              },
              {
                "ref": "uuid:2f3bbe39-01e3-4c96-8dea-377e38729a03",
                "orientation": "-"
              },
              {
                "ref": "uuid:61f99921-a94d-4e0d-8353-f027d76227c5",
                "orientation": "+"
              }
            ]
          }
        ]
      },
      "properties": {
        "normal": [
          -1.0,
          -0.0,
          0.0
        ],
        "area": 12.0
      }
    },
    {
      "id": "uuid:56283886-1f4c-448c-b785-80fb9740a9cc",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:736411fb-67f0-47c0-bf77-bf4f9048bcda",
                "orientation": "+"
              },
              {
                "ref": "uuid:fe0704c2-5d2a-49a8-b507-e98c4047d8c4",
                "orientation": "+"
              },
              {
                "ref": "uuid:511c6e7d-728b-4f1f-9763-9461eb628586",
                "orientation": "-"
              },
              {
                "ref": "uuid:91cdc345-f745-4643-bc88-a24f8e2216b0",
                "orientation": "-"
              },
              {
                "ref": "uuid:856e43bc-ee35-44d0-b25e-ea94a53e1db6",
                "orientation": "+"
              }
            ]
          }
        ]
      },
      "properties": {
        "normal": [
          -1.0,
          -0.0,
          -0.0
        ],
        "area": 18.0
      }
    },
    {
      "id": "uuid:f3338301-b0e3-401c-af23-41ac2ae8e969",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:736411fb-67f0-47c0-bf77-bf4f9048bcda",
                "orientation": "-"
              },
              {
                "ref": "uuid:7da1c2fe-f798-43cc-af44-ac63f968139c",
                "orientation": "-"
              },
              {
                "ref": "uuid:474fef44-eb6e-4e19-a871-433f9bac5650",
                "orientation": "+"
              },
              {
                "ref": "uuid:651bb558-f6d6-439f-a8e0-dd5c3385dc94",
                "orientation": "+"
              }
            ]
          }
        ]
      },
      "properties": {
        "normal": [
          0.0,
          -1.0,
          0.0
        ],
        "area": 6.0
      }
    },
    {
      "id": "uuid:a2117d6b-4621-4a6b-9809-9fab3dfc4ff0",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:3fef75ce-8c4c-4d89-a47f-65977debaee0",
                "orientation": "+"
              },
              {
                "ref": "uuid:48b52144-aaa0-42a1-8e7a-40bebfcf9985",
                "orientation": "+"
              },
              {
                "ref": "uuid:71af0dde-7fc9-4290-9624-119e91f422ea",
                "orientation": "+"
              },
              {
                "ref": "uuid:ad13a84c-df97-4b75-9dc1-1ce452249964",
                "orientation": "+"
              }
            ]
          }
        ]
      },
      "properties": {
        "normal": [
          0.0,
          -1.0,
          0.0
        ],
        "area": 24.0
      }
    },
    {
      "id": "uuid:9d67557a-e130-4a47-b63d-c6a2bdf21fa2",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:c2a00070-f12b-42f9-b78c-b33daa500873",
                "orientation": "+"
              },
              {
                "ref": "uuid:ad13a84c-df97-4b75-9dc1-1ce452249964",
                "orientation": "-"
              },
              {
                "ref": "uuid:13dd8184-f73e-4d9f-9977-3e573274fccc",
                "orientation": "+"
              },
              {
                "ref": "uuid:7355081e-9fa3-4fb5-ab10-c4efaa41d61f",
                "orientation": "-"
              }
            ]
          }
        ]
      },
      "properties": {
        "normal": [
          -1.0,
          -0.0,
          -0.0
        ],
        "area": 30.0
      }
    },
    {
      "id": "uuid:d45fca44-8685-4146-92a5-b84d82fdc838",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:ed666061-98c5-439d-ab0d-5a792437a873",
                "orientation": "+"
              },
              {
                "ref": "uuid:7355081e-9fa3-4fb5-ab10-c4efaa41d61f",
                "orientation": "+"
              },
              {
                "ref": "uuid:5a36c75b-053b-4d7b-b512-6777786d6180",
                "orientation": "+"
              },
              {
                "ref": "uuid:a5ed4867-4011-4db7-8425-cbe61a6d3a2d",
                "orientation": "-"
              },
              {
                "ref": "uuid:2f3bbe39-01e3-4c96-8dea-377e38729a03",
                "orientation": "-"
              }
            ]
          }
        ]
      },
      "properties": {
        "normal": [
          0.0,
          1.0,
          0.0
        ],
        "area": 30.0
      }
    },
    {
      "id": "uuid:2497a842-0932-4fe5-ac1a-2f773473f338",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:b4c7d3ff-cf1f-40c1-8ea0-2cd2c09cc0e0",
                "orientation": "+"
              },
              {
                "ref": "uuid:07093c51-5d4e-42ad-941f-8eeb89e5ae78",
                "orientation": "-"
              },
              {
                "ref": "uuid:6aab9ba2-327e-40df-96c2-0ea43c538c24",
                "orientation": "-"
              },
              {
                "ref": "uuid:5a36c75b-053b-4d7b-b512-6777786d6180",
                "orientation": "-"
              },
              {
                "ref": "uuid:13dd8184-f73e-4d9f-9977-3e573274fccc",
                "orientation": "-"
              },
              {
                "ref": "uuid:71af0dde-7fc9-4290-9624-119e91f422ea",
                "orientation": "-"
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
        "area": 32.0
      }
    },
    {
      "id": "uuid:04ea47e9-b4dd-4bed-a8f4-4802d1735c74",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:ed666061-98c5-439d-ab0d-5a792437a873",
                "orientation": "-"
              },
              {
                "ref": "uuid:61f99921-a94d-4e0d-8353-f027d76227c5",
                "orientation": "+"
              },
              {
                "ref": "uuid:36b10bf3-9e3a-49cb-9dc5-7e31ade26d17",
                "orientation": "-"
              },
              {
                "ref": "uuid:ec374b67-eb42-4c53-b5cc-0f919edb2635",
                "orientation": "-"
              },
              {
                "ref": "uuid:3fef75ce-8c4c-4d89-a47f-65977debaee0",
                "orientation": "-"
              },
              {
                "ref": "uuid:c2a00070-f12b-42f9-b78c-b33daa500873",
                "orientation": "-"
              }
            ]
          }
        ]
      },
      "properties": {
        "normal": [
          -0.0,
          -0.0,
          -1.0
        ],
        "area": 88.0
      }
    },
    {
      "id": "uuid:b5fd960f-0d14-4257-9182-40de738a7e50",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:f0249395-1d12-42d1-bdaf-08c5cc29b2d4",
                "orientation": "+"
              },
              {
                "ref": "uuid:242a8400-a076-4817-86c6-acd56087cec6",
                "orientation": "+"
              },
              {
                "ref": "uuid:b4c7d3ff-cf1f-40c1-8ea0-2cd2c09cc0e0",
                "orientation": "-"
              },
              {
                "ref": "uuid:48b52144-aaa0-42a1-8e7a-40bebfcf9985",
                "orientation": "-"
              },
              {
                "ref": "uuid:ec374b67-eb42-4c53-b5cc-0f919edb2635",
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
        "area": 18.0
      }
    },
    {
      "id": "uuid:e119b096-e589-49bd-b1db-a1182dc2dade",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:474fef44-eb6e-4e19-a871-433f9bac5650",
                "orientation": "-"
              },
              {
                "ref": "uuid:fc8ba01d-faa7-4407-ae92-32b584c8a6a3",
                "orientation": "-"
              },
              {
                "ref": "uuid:f0249395-1d12-42d1-bdaf-08c5cc29b2d4",
                "orientation": "-"
              },
              {
                "ref": "uuid:36b10bf3-9e3a-49cb-9dc5-7e31ade26d17",
                "orientation": "+"
              }
            ]
          }
        ]
      },
      "properties": {
        "normal": [
          0.0,
          -1.0,
          0.0
        ],
        "area": 6.0
      }
    },
    {
      "id": "uuid:67842d3a-7c79-4f2a-8630-744711071e93",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:a604828d-a36b-4fac-ba6f-6160ade95301",
                "orientation": "-"
              },
              {
                "ref": "uuid:ec374b67-eb42-4c53-b5cc-0f919edb2635",
                "orientation": "+"
              },
              {
                "ref": "uuid:36b10bf3-9e3a-49cb-9dc5-7e31ade26d17",
                "orientation": "+"
              },
              {
                "ref": "uuid:651bb558-f6d6-439f-a8e0-dd5c3385dc94",
                "orientation": "+"
              },
              {
                "ref": "uuid:fe0704c2-5d2a-49a8-b507-e98c4047d8c4",
                "orientation": "+"
              }
            ]
          }
        ]
      },
      "properties": {
        "normal": [
          -0.0,
          -0.0,
          -1.0
        ],
        "area": 24.0
      }
    },
    {
      "id": "uuid:f1c1a636-d6ab-414c-a0aa-855fc7e85e1f",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:508f66b5-e0cb-489c-ae24-21bfb7c09280",
                "orientation": "+"
              },
              {
                "ref": "uuid:48b52144-aaa0-42a1-8e7a-40bebfcf9985",
                "orientation": "-"
              },
              {
                "ref": "uuid:a604828d-a36b-4fac-ba6f-6160ade95301",
                "orientation": "+"
              },
              {
                "ref": "uuid:511c6e7d-728b-4f1f-9763-9461eb628586",
                "orientation": "-"
              }
            ]
          }
        ]
      },
      "properties": {
        "normal": [
          0.0,
          -1.0,
          0.0
        ],
        "area": 12.0
      }
    },
    {
      "id": "uuid:a22a6c54-306e-44bc-9b94-6c32c705e63e",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:508f66b5-e0cb-489c-ae24-21bfb7c09280",
                "orientation": "-"
              },
              {
                "ref": "uuid:91cdc345-f745-4643-bc88-a24f8e2216b0",
                "orientation": "-"
              },
              {
                "ref": "uuid:38499704-81f7-4d47-965f-435e0b7b0850",
                "orientation": "-"
              },
              {
                "ref": "uuid:b4c7d3ff-cf1f-40c1-8ea0-2cd2c09cc0e0",
                "orientation": "-"
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
        "area": 8.0
      }
    },
    {
      "id": "uuid:9ed21e0a-b062-4000-88e2-50bd9153e417",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:b6e30631-9768-4020-8947-c32137328216",
                "orientation": "+"
              },
              {
                "ref": "uuid:7aa2a76d-9d5c-4540-9f2e-d8bcf36fadb5",
                "orientation": "-"
              },
              {
                "ref": "uuid:73f88b47-78ab-474d-9c62-73dfefd0dd5d",
                "orientation": "-"
              },
              {
                "ref": "uuid:21388b1b-dcba-46c0-8166-8ffc9c07e50b",
                "orientation": "-"
              },
              {
                "ref": "uuid:af347f25-a547-477c-b246-cb810756d4dc",
                "orientation": "-"
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
        "area": 16.0
      }
    },
    {
      "id": "uuid:802ff3d8-b8da-423f-8a02-7b2288485edd",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:38499704-81f7-4d47-965f-435e0b7b0850",
                "orientation": "+"
              },
              {
                "ref": "uuid:120defbd-2e05-4ec3-ba3c-ffee086d2add",
                "orientation": "-"
              },
              {
                "ref": "uuid:b6e30631-9768-4020-8947-c32137328216",
                "orientation": "-"
              },
              {
                "ref": "uuid:fb03276b-4250-4d52-81e1-035a0bd92895",
                "orientation": "-"
              }
            ]
          }
        ]
      },
      "properties": {
        "normal": [
          3.609557097661e-16,
          -1.0,
          0.0
        ],
        "area": 12.0
      }
    },
    {
      "id": "uuid:16c13b7b-aeda-4130-a793-d63f62bcc75b",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:f0249395-1d12-42d1-bdaf-08c5cc29b2d4",
                "orientation": "+"
              },
              {
                "ref": "uuid:90e3950e-40b2-4d9d-a135-1a4b708305aa",
                "orientation": "+"
              },
              {
                "ref": "uuid:736411fb-67f0-47c0-bf77-bf4f9048bcda",
                "orientation": "+"
              },
              {
                "ref": "uuid:651bb558-f6d6-439f-a8e0-dd5c3385dc94",
                "orientation": "-"
              },
              {
                "ref": "uuid:36b10bf3-9e3a-49cb-9dc5-7e31ade26d17",
                "orientation": "-"
              }
            ]
          }
        ]
      },
      "properties": {
        "normal": [
          0.0,
          1.0,
          0.0
        ],
        "area": 12.0
      }
    },
    {
      "id": "uuid:786e8738-1690-426d-8e2f-f5e734336a67",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:8601e9ea-c48f-4c00-a066-f950ed6b0724",
                "orientation": "-"
              },
              {
                "ref": "uuid:21388b1b-dcba-46c0-8166-8ffc9c07e50b",
                "orientation": "+"
              },
              {
                "ref": "uuid:73f88b47-78ab-474d-9c62-73dfefd0dd5d",
                "orientation": "+"
              },
              {
                "ref": "uuid:46fd1def-a93e-4c99-9868-172cf1b40ff1",
                "orientation": "-"
              },
              {
                "ref": "uuid:90e3950e-40b2-4d9d-a135-1a4b708305aa",
                "orientation": "-"
              }
            ]
          }
        ]
      },
      "properties": {
        "normal": [
          0.0,
          1.0,
          0.0
        ],
        "area": 12.0
      }
    }
  ],
  "solids": [
    {
      "id": "uuid:758590d2-8cc6-4ff7-8fcc-d7ecd01b3498",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Solid",
        "shells": [
          {
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
          }
        ]
      },
      "properties": {
        "name": "Upper East",
        "levels": [
          2
        ],
        "volume": 168.0
      }
    },
    {
      "id": "uuid:82ce9302-e51d-48ff-a119-79bb5501ed1c",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Solid",
        "shells": [
          {
            "type": "Shell",
            "directed_references": [
              {
                "ref": "uuid:c55c88db-d187-4d7e-9aaa-b9d3dce52663",
                "orientation": "+"
              },
              {
                "ref": "uuid:dbd99467-ea83-4dff-b03f-eef2aad2687c",
                "orientation": "+"
              },
              {
                "ref": "uuid:0e55e87d-8475-4c92-89e7-d62f97ce9ec2",
                "orientation": "+"
              },
              {
                "ref": "uuid:6a5ff199-56a7-4e65-94b5-bfdf2ae3449d",
                "orientation": "+"
              },
              {
                "ref": "uuid:3c1f5c4b-d842-40b6-a332-99d50015fa8f",
                "orientation": "-"
              },
              {
                "ref": "uuid:e499fea3-19f7-4863-8a58-751caff7d884",
                "orientation": "+"
              },
              {
                "ref": "uuid:9e4c0c0e-6acf-401b-b35e-0e917ce3a5fc",
                "orientation": "+"
              },
              {
                "ref": "uuid:3f5c452f-9815-4b21-9b2d-0127ae80c385",
                "orientation": "+"
              }
            ]
          }
        ]
      },
      "properties": {
        "name": "Upper West",
        "levels": [
          2
        ],
        "volume": 168.0
      }
    },
    {
      "id": "uuid:1070811c-70bd-4698-a08f-92c62e41aafc",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Solid",
        "shells": [
          {
            "type": "Shell",
            "directed_references": [
              {
                "ref": "uuid:66a430c0-123f-42df-9d11-64347362bcb3",
                "orientation": "+"
              },
              {
                "ref": "uuid:31d8f2b5-cc74-4f72-b230-d27dad0fd589",
                "orientation": "+"
              },
              {
                "ref": "uuid:65959e29-11cb-4568-904d-61c4a7c17b98",
                "orientation": "+"
              },
              {
                "ref": "uuid:e2efe498-c6d5-4f9c-ac07-4c1c9e406675",
                "orientation": "+"
              },
              {
                "ref": "uuid:5bcee2b5-be9b-47d6-9a8b-35dac021f661",
                "orientation": "+"
              },
              {
                "ref": "uuid:91ce0c52-11c3-4e32-8bcc-dea958a3969e",
                "orientation": "+"
              },
              {
                "ref": "uuid:56283886-1f4c-448c-b785-80fb9740a9cc",
                "orientation": "+"
              },
              {
                "ref": "uuid:f3338301-b0e3-401c-af23-41ac2ae8e969",
                "orientation": "+"
              },
              {
                "ref": "uuid:2387ae98-9236-42fe-9414-c45b99954c41",
                "orientation": "-"
              }
            ]
          }
        ]
      },
      "properties": {
        "name": "Lower East",
        "levels": [
          1
        ],
        "volume": 264.0
      }
    },
    {
      "id": "uuid:74618bd4-0bbe-4490-92b3-27a4da496c39",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Solid",
        "shells": [
          {
            "type": "Shell",
            "directed_references": [
              {
                "ref": "uuid:a2117d6b-4621-4a6b-9809-9fab3dfc4ff0",
                "orientation": "+"
              },
              {
                "ref": "uuid:9d67557a-e130-4a47-b63d-c6a2bdf21fa2",
                "orientation": "+"
              },
              {
                "ref": "uuid:d45fca44-8685-4146-92a5-b84d82fdc838",
                "orientation": "+"
              },
              {
                "ref": "uuid:2497a842-0932-4fe5-ac1a-2f773473f338",
                "orientation": "+"
              },
              {
                "ref": "uuid:04ea47e9-b4dd-4bed-a8f4-4802d1735c74",
                "orientation": "+"
              },
              {
                "ref": "uuid:b5fd960f-0d14-4257-9182-40de738a7e50",
                "orientation": "+"
              },
              {
                "ref": "uuid:e119b096-e589-49bd-b1db-a1182dc2dade",
                "orientation": "+"
              },
              {
                "ref": "uuid:91ce0c52-11c3-4e32-8bcc-dea958a3969e",
                "orientation": "-"
              },
              {
                "ref": "uuid:9e4c0c0e-6acf-401b-b35e-0e917ce3a5fc",
                "orientation": "-"
              }
            ]
          }
        ]
      },
      "properties": {
        "name": "Lower West",
        "levels": [
          1
        ],
        "volume": 264.0
      }
    },
    {
      "id": "uuid:50453cb2-89bd-4432-8c7c-fdc2318febc2",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Solid",
        "shells": [
          {
            "type": "Shell",
            "directed_references": [
              {
                "ref": "uuid:67842d3a-7c79-4f2a-8630-744711071e93",
                "orientation": "+"
              },
              {
                "ref": "uuid:f1c1a636-d6ab-414c-a0aa-855fc7e85e1f",
                "orientation": "+"
              },
              {
                "ref": "uuid:a22a6c54-306e-44bc-9b94-6c32c705e63e",
                "orientation": "+"
              },
              {
                "ref": "uuid:9ed21e0a-b062-4000-88e2-50bd9153e417",
                "orientation": "+"
              },
              {
                "ref": "uuid:802ff3d8-b8da-423f-8a02-7b2288485edd",
                "orientation": "+"
              },
              {
                "ref": "uuid:4ba85faa-3935-4e89-a9f8-dcd647a5dbed",
                "orientation": "-"
              },
              {
                "ref": "uuid:56283886-1f4c-448c-b785-80fb9740a9cc",
                "orientation": "-"
              },
              {
                "ref": "uuid:3f5c452f-9815-4b21-9b2d-0127ae80c385",
                "orientation": "-"
              },
              {
                "ref": "uuid:b5fd960f-0d14-4257-9182-40de738a7e50",
                "orientation": "-"
              },
              {
                "ref": "uuid:16c13b7b-aeda-4130-a793-d63f62bcc75b",
                "orientation": "+"
              },
              {
                "ref": "uuid:786e8738-1690-426d-8e2f-f5e734336a67",
                "orientation": "+"
              }
            ]
          }
        ]
      },
      "properties": {
        "name": "Stairwell",
        "levels": [
          1,
          2
        ],
        "volume": 120.0
      }
    }
  ]
}
```

#### jsonld
```jsonld
{
  "@context": "https://surroundaustralia.github.io/topo-feature/build/annotated/geo/topo/features/topo-feature-multi-collection/context.jsonld",
  "type": "FeatureCollection",
  "metadata": {
    "units": "meters",
    "coordinate_precision": 3,
    "conversion_factor": 0.0254
  },
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
    },
    {
      "id": "uuid:a0ec1bfd-0f7a-4c42-bc71-bacdcd44071d",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          12.0,
          2.0,
          3.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:11caaac5-b631-4bd8-a6af-f82cb6371071",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          12.0,
          2.0,
          6.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:5e08b82a-8efb-447c-b5c2-54f8ff5788b3",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          10.0,
          10.0,
          6.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:22138e52-65ef-4773-b69d-5ea2628fad7b",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          10.0,
          10.0,
          3.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:62a26df3-3e19-49bf-9ee4-24dbeb814a70",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          10.0,
          6.0,
          6.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:8087116e-84cc-44d1-8047-78dc3837d7e8",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          12.0,
          6.0,
          6.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:f34d9f2e-4180-41de-a613-46f78f4c178f",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          10.0,
          6.0,
          3.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:87373f95-ee4b-4471-9980-f4a8258ee1e3",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          12.0,
          6.0,
          3.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:e7300a01-f8c1-4351-9511-02790a5376b0",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          2.0,
          10.0,
          3.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:1e20237c-9dfa-4251-9f3f-cc5e56a5becd",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          2.0,
          10.0,
          6.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:307b7db6-8014-4628-b80e-ff925bf71168",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          2.0,
          2.0,
          3.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:3c08ae4e-7b27-4e95-8bfb-6b42451be8f6",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          2.0,
          2.0,
          6.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:b8412dad-b40a-4e35-9f42-f983e0fce39d",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          8.0,
          2.0,
          3.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:9a1d8124-ca37-4abd-b07e-bff4c8eaa2f9",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          8.0,
          2.0,
          6.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:caa6045e-4189-4571-8914-1189e51ac71e",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          8.0,
          6.0,
          6.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:1d2a5d01-8547-4de6-abea-8f9ab994d35e",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          8.0,
          6.0,
          3.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:ff685e16-64f8-4f41-8a9e-7d8e83312fd6",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          12.0,
          0.0,
          0.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:92bd9ed9-c138-45c3-b72c-a9ecb7f7cfe9",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          20.0,
          0.0,
          0.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:c060c1dc-6544-4595-b583-72ecf603fd6d",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          20.0,
          0.0,
          3.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:7fe8cb9b-976e-4344-bf72-f3721d878ba4",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          12.0,
          0.0,
          3.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:20d3c864-4a8c-4440-b600-a1d424e92f51",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          20.0,
          10.0,
          0.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:2b34e214-cba7-4a66-8443-ceb932c5ef09",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          20.0,
          10.0,
          3.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:16c35df5-bc63-4edd-8da5-dbcc5548a61e",
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
      "id": "uuid:206806a4-a2f8-4c04-858e-99d289858a40",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          12.0,
          6.0,
          0.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:d8d136c6-604c-4ad3-adf7-b0a7e04d034a",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          10.0,
          6.0,
          0.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:b6d10150-f9d4-4f7e-b028-c4bbee8e7717",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          0.0,
          0.0,
          0.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:a3b19f96-9bca-4c31-ac7e-4cb1615878df",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          8.0,
          0.0,
          0.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:793997c5-bcc4-4610-984b-6cf2c2997348",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          8.0,
          0.0,
          3.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:8e503e04-ad51-423b-8102-708a845189b6",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          0.0,
          0.0,
          3.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:ca62577e-8e24-4af2-88bf-33b34e25e606",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          0.0,
          10.0,
          0.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:8cda5c68-9c82-43b4-84d7-979efa36dfe1",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          0.0,
          10.0,
          3.0
        ]
      },
      "properties": null
    },
    {
      "id": "uuid:9ef3d2ea-acea-4365-8bd5-2f8ef3036ed0",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          8.0,
          6.0,
          0.0
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
    },
    {
      "id": "uuid:32e82eb1-93a4-4387-8cd0-9616ebf1e39b",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:a0ec1bfd-0f7a-4c42-bc71-bacdcd44071d",
          "uuid:fad324b9-801f-40f4-b65b-91f8753e9698"
        ]
      },
      "properties": {
        "length": 6.0
      }
    },
    {
      "id": "uuid:8582d9c2-6053-495a-8413-f5493691c0de",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:c611f840-2829-44b2-b367-3915ca7875a4",
          "uuid:11caaac5-b631-4bd8-a6af-f82cb6371071"
        ]
      },
      "properties": {
        "length": 6.0
      }
    },
    {
      "id": "uuid:120defbd-2e05-4ec3-ba3c-ffee086d2add",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:11caaac5-b631-4bd8-a6af-f82cb6371071",
          "uuid:a0ec1bfd-0f7a-4c42-bc71-bacdcd44071d"
        ]
      },
      "properties": {
        "length": 3.0
      }
    },
    {
      "id": "uuid:4c2a6434-03b0-4aa2-85ea-a9fcaea41555",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:5e08b82a-8efb-447c-b5c2-54f8ff5788b3",
          "uuid:8d2be28b-8f31-46de-99cb-4d8709502cd0"
        ]
      },
      "properties": {
        "length": 8.0
      }
    },
    {
      "id": "uuid:830b9098-d914-4e8b-869d-4d20f1eb5c81",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:ad6d8fcc-402c-482e-8f1a-7492ccaead38",
          "uuid:22138e52-65ef-4773-b69d-5ea2628fad7b"
        ]
      },
      "properties": {
        "length": 8.0
      }
    },
    {
      "id": "uuid:3b72e45d-d351-46e4-a5b7-9ac9bc339d03",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:22138e52-65ef-4773-b69d-5ea2628fad7b",
          "uuid:5e08b82a-8efb-447c-b5c2-54f8ff5788b3"
        ]
      },
      "properties": {
        "length": 3.0
      }
    },
    {
      "id": "uuid:921e2351-efbf-48be-85d3-eedc0dc2ddc0",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:5e08b82a-8efb-447c-b5c2-54f8ff5788b3",
          "uuid:62a26df3-3e19-49bf-9ee4-24dbeb814a70"
        ]
      },
      "properties": {
        "length": 4.0
      }
    },
    {
      "id": "uuid:73f88b47-78ab-474d-9c62-73dfefd0dd5d",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:62a26df3-3e19-49bf-9ee4-24dbeb814a70",
          "uuid:8087116e-84cc-44d1-8047-78dc3837d7e8"
        ]
      },
      "properties": {
        "length": 2.0
      }
    },
    {
      "id": "uuid:7aa2a76d-9d5c-4540-9f2e-d8bcf36fadb5",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:8087116e-84cc-44d1-8047-78dc3837d7e8",
          "uuid:11caaac5-b631-4bd8-a6af-f82cb6371071"
        ]
      },
      "properties": {
        "length": 4.0
      }
    },
    {
      "id": "uuid:ed6b8b1c-7030-4d70-ab61-94cb3aa904a7",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:22138e52-65ef-4773-b69d-5ea2628fad7b",
          "uuid:f34d9f2e-4180-41de-a613-46f78f4c178f"
        ]
      },
      "properties": {
        "length": 4.0
      }
    },
    {
      "id": "uuid:5f17e211-e8b5-4a7c-85e4-798787fd82a5",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:f34d9f2e-4180-41de-a613-46f78f4c178f",
          "uuid:62a26df3-3e19-49bf-9ee4-24dbeb814a70"
        ]
      },
      "properties": {
        "length": 3.0
      }
    },
    {
      "id": "uuid:7da1c2fe-f798-43cc-af44-ac63f968139c",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:f34d9f2e-4180-41de-a613-46f78f4c178f",
          "uuid:87373f95-ee4b-4471-9980-f4a8258ee1e3"
        ]
      },
      "properties": {
        "length": 2.0
      }
    },
    {
      "id": "uuid:46fd1def-a93e-4c99-9868-172cf1b40ff1",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:87373f95-ee4b-4471-9980-f4a8258ee1e3",
          "uuid:8087116e-84cc-44d1-8047-78dc3837d7e8"
        ]
      },
      "properties": {
        "length": 3.0
      }
    },
    {
      "id": "uuid:856e43bc-ee35-44d0-b25e-ea94a53e1db6",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:a0ec1bfd-0f7a-4c42-bc71-bacdcd44071d",
          "uuid:87373f95-ee4b-4471-9980-f4a8258ee1e3"
        ]
      },
      "properties": {
        "length": 4.0
      }
    },
    {
      "id": "uuid:a5ed4867-4011-4db7-8425-cbe61a6d3a2d",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:22138e52-65ef-4773-b69d-5ea2628fad7b",
          "uuid:e7300a01-f8c1-4351-9511-02790a5376b0"
        ]
      },
      "properties": {
        "length": 8.0
      }
    },
    {
      "id": "uuid:745aa367-94b6-4949-a856-5271ec6672e9",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:e7300a01-f8c1-4351-9511-02790a5376b0",
          "uuid:1e20237c-9dfa-4251-9f3f-cc5e56a5becd"
        ]
      },
      "properties": {
        "length": 3.0
      }
    },
    {
      "id": "uuid:f921656a-58e3-4375-bdff-ac8019f524cf",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:1e20237c-9dfa-4251-9f3f-cc5e56a5becd",
          "uuid:5e08b82a-8efb-447c-b5c2-54f8ff5788b3"
        ]
      },
      "properties": {
        "length": 8.0
      }
    },
    {
      "id": "uuid:6aab9ba2-327e-40df-96c2-0ea43c538c24",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:e7300a01-f8c1-4351-9511-02790a5376b0",
          "uuid:307b7db6-8014-4628-b80e-ff925bf71168"
        ]
      },
      "properties": {
        "length": 8.0
      }
    },
    {
      "id": "uuid:fb28f3f2-8ea7-4c03-bff5-7352addba8b3",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:3c08ae4e-7b27-4e95-8bfb-6b42451be8f6",
          "uuid:307b7db6-8014-4628-b80e-ff925bf71168"
        ]
      },
      "properties": {
        "length": 3.0
      }
    },
    {
      "id": "uuid:e0416983-f0db-4c99-8a72-3f8b4615ab05",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:3c08ae4e-7b27-4e95-8bfb-6b42451be8f6",
          "uuid:1e20237c-9dfa-4251-9f3f-cc5e56a5becd"
        ]
      },
      "properties": {
        "length": 8.0
      }
    },
    {
      "id": "uuid:07093c51-5d4e-42ad-941f-8eeb89e5ae78",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:307b7db6-8014-4628-b80e-ff925bf71168",
          "uuid:b8412dad-b40a-4e35-9f42-f983e0fce39d"
        ]
      },
      "properties": {
        "length": 6.0
      }
    },
    {
      "id": "uuid:fb03276b-4250-4d52-81e1-035a0bd92895",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:b8412dad-b40a-4e35-9f42-f983e0fce39d",
          "uuid:9a1d8124-ca37-4abd-b07e-bff4c8eaa2f9"
        ]
      },
      "properties": {
        "length": 3.0
      }
    },
    {
      "id": "uuid:c97ac36d-9cf3-48ca-bb8f-c36cb335bebf",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:9a1d8124-ca37-4abd-b07e-bff4c8eaa2f9",
          "uuid:3c08ae4e-7b27-4e95-8bfb-6b42451be8f6"
        ]
      },
      "properties": {
        "length": 6.0
      }
    },
    {
      "id": "uuid:af347f25-a547-477c-b246-cb810756d4dc",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:9a1d8124-ca37-4abd-b07e-bff4c8eaa2f9",
          "uuid:caa6045e-4189-4571-8914-1189e51ac71e"
        ]
      },
      "properties": {
        "length": 4.0
      }
    },
    {
      "id": "uuid:21388b1b-dcba-46c0-8166-8ffc9c07e50b",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:caa6045e-4189-4571-8914-1189e51ac71e",
          "uuid:62a26df3-3e19-49bf-9ee4-24dbeb814a70"
        ]
      },
      "properties": {
        "length": 2.0
      }
    },
    {
      "id": "uuid:fc8ba01d-faa7-4407-ae92-32b584c8a6a3",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:1d2a5d01-8547-4de6-abea-8f9ab994d35e",
          "uuid:f34d9f2e-4180-41de-a613-46f78f4c178f"
        ]
      },
      "properties": {
        "length": 2.0
      }
    },
    {
      "id": "uuid:8601e9ea-c48f-4c00-a066-f950ed6b0724",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:caa6045e-4189-4571-8914-1189e51ac71e",
          "uuid:1d2a5d01-8547-4de6-abea-8f9ab994d35e"
        ]
      },
      "properties": {
        "length": 3.0
      }
    },
    {
      "id": "uuid:242a8400-a076-4817-86c6-acd56087cec6",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:1d2a5d01-8547-4de6-abea-8f9ab994d35e",
          "uuid:b8412dad-b40a-4e35-9f42-f983e0fce39d"
        ]
      },
      "properties": {
        "length": 4.0
      }
    },
    {
      "id": "uuid:4ad210b7-5de5-4732-af7c-978de28f988b",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:ff685e16-64f8-4f41-8a9e-7d8e83312fd6",
          "uuid:92bd9ed9-c138-45c3-b72c-a9ecb7f7cfe9"
        ]
      },
      "properties": {
        "length": 8.0
      }
    },
    {
      "id": "uuid:c12882ea-089f-4616-942c-ceb8fb4ac05e",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:92bd9ed9-c138-45c3-b72c-a9ecb7f7cfe9",
          "uuid:c060c1dc-6544-4595-b583-72ecf603fd6d"
        ]
      },
      "properties": {
        "length": 3.0
      }
    },
    {
      "id": "uuid:4406e3f5-89dc-463b-84e4-487490f71f1a",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:c060c1dc-6544-4595-b583-72ecf603fd6d",
          "uuid:7fe8cb9b-976e-4344-bf72-f3721d878ba4"
        ]
      },
      "properties": {
        "length": 8.0
      }
    },
    {
      "id": "uuid:511c6e7d-728b-4f1f-9763-9461eb628586",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:7fe8cb9b-976e-4344-bf72-f3721d878ba4",
          "uuid:ff685e16-64f8-4f41-8a9e-7d8e83312fd6"
        ]
      },
      "properties": {
        "length": 3.0
      }
    },
    {
      "id": "uuid:79205d80-72e5-4bd8-9c03-9503e4e690cc",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:92bd9ed9-c138-45c3-b72c-a9ecb7f7cfe9",
          "uuid:20d3c864-4a8c-4440-b600-a1d424e92f51"
        ]
      },
      "properties": {
        "length": 10.0
      }
    },
    {
      "id": "uuid:06babc8d-f0d6-43eb-bfad-931055bae084",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:20d3c864-4a8c-4440-b600-a1d424e92f51",
          "uuid:2b34e214-cba7-4a66-8443-ceb932c5ef09"
        ]
      },
      "properties": {
        "length": 3.0
      }
    },
    {
      "id": "uuid:fc877bbe-72a8-4e59-b959-010e6660984a",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:2b34e214-cba7-4a66-8443-ceb932c5ef09",
          "uuid:c060c1dc-6544-4595-b583-72ecf603fd6d"
        ]
      },
      "properties": {
        "length": 10.0
      }
    },
    {
      "id": "uuid:aafd209b-cd13-401a-83f5-26751a02cffe",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:20d3c864-4a8c-4440-b600-a1d424e92f51",
          "uuid:16c35df5-bc63-4edd-8da5-dbcc5548a61e"
        ]
      },
      "properties": {
        "length": 10.0
      }
    },
    {
      "id": "uuid:2f3bbe39-01e3-4c96-8dea-377e38729a03",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:16c35df5-bc63-4edd-8da5-dbcc5548a61e",
          "uuid:22138e52-65ef-4773-b69d-5ea2628fad7b"
        ]
      },
      "properties": {
        "length": 3.0
      }
    },
    {
      "id": "uuid:9238cbda-d019-4b57-8319-0cc355656802",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:ad6d8fcc-402c-482e-8f1a-7492ccaead38",
          "uuid:2b34e214-cba7-4a66-8443-ceb932c5ef09"
        ]
      },
      "properties": {
        "length": 2.0
      }
    },
    {
      "id": "uuid:91cdc345-f745-4643-bc88-a24f8e2216b0",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:a0ec1bfd-0f7a-4c42-bc71-bacdcd44071d",
          "uuid:7fe8cb9b-976e-4344-bf72-f3721d878ba4"
        ]
      },
      "properties": {
        "length": 2.0
      }
    },
    {
      "id": "uuid:fe0704c2-5d2a-49a8-b507-e98c4047d8c4",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:206806a4-a2f8-4c04-858e-99d289858a40",
          "uuid:ff685e16-64f8-4f41-8a9e-7d8e83312fd6"
        ]
      },
      "properties": {
        "length": 6.0
      }
    },
    {
      "id": "uuid:651bb558-f6d6-439f-a8e0-dd5c3385dc94",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:d8d136c6-604c-4ad3-adf7-b0a7e04d034a",
          "uuid:206806a4-a2f8-4c04-858e-99d289858a40"
        ]
      },
      "properties": {
        "length": 2.0
      }
    },
    {
      "id": "uuid:61f99921-a94d-4e0d-8353-f027d76227c5",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:16c35df5-bc63-4edd-8da5-dbcc5548a61e",
          "uuid:d8d136c6-604c-4ad3-adf7-b0a7e04d034a"
        ]
      },
      "properties": {
        "length": 4.0
      }
    },
    {
      "id": "uuid:474fef44-eb6e-4e19-a871-433f9bac5650",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:f34d9f2e-4180-41de-a613-46f78f4c178f",
          "uuid:d8d136c6-604c-4ad3-adf7-b0a7e04d034a"
        ]
      },
      "properties": {
        "length": 3.0
      }
    },
    {
      "id": "uuid:736411fb-67f0-47c0-bf77-bf4f9048bcda",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:87373f95-ee4b-4471-9980-f4a8258ee1e3",
          "uuid:206806a4-a2f8-4c04-858e-99d289858a40"
        ]
      },
      "properties": {
        "length": 3.0
      }
    },
    {
      "id": "uuid:3fef75ce-8c4c-4d89-a47f-65977debaee0",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:b6d10150-f9d4-4f7e-b028-c4bbee8e7717",
          "uuid:a3b19f96-9bca-4c31-ac7e-4cb1615878df"
        ]
      },
      "properties": {
        "length": 8.0
      }
    },
    {
      "id": "uuid:48b52144-aaa0-42a1-8e7a-40bebfcf9985",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:a3b19f96-9bca-4c31-ac7e-4cb1615878df",
          "uuid:793997c5-bcc4-4610-984b-6cf2c2997348"
        ]
      },
      "properties": {
        "length": 3.0
      }
    },
    {
      "id": "uuid:71af0dde-7fc9-4290-9624-119e91f422ea",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:793997c5-bcc4-4610-984b-6cf2c2997348",
          "uuid:8e503e04-ad51-423b-8102-708a845189b6"
        ]
      },
      "properties": {
        "length": 8.0
      }
    },
    {
      "id": "uuid:ad13a84c-df97-4b75-9dc1-1ce452249964",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:8e503e04-ad51-423b-8102-708a845189b6",
          "uuid:b6d10150-f9d4-4f7e-b028-c4bbee8e7717"
        ]
      },
      "properties": {
        "length": 3.0
      }
    },
    {
      "id": "uuid:c2a00070-f12b-42f9-b78c-b33daa500873",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:ca62577e-8e24-4af2-88bf-33b34e25e606",
          "uuid:b6d10150-f9d4-4f7e-b028-c4bbee8e7717"
        ]
      },
      "properties": {
        "length": 10.0
      }
    },
    {
      "id": "uuid:13dd8184-f73e-4d9f-9977-3e573274fccc",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:8e503e04-ad51-423b-8102-708a845189b6",
          "uuid:8cda5c68-9c82-43b4-84d7-979efa36dfe1"
        ]
      },
      "properties": {
        "length": 10.0
      }
    },
    {
      "id": "uuid:7355081e-9fa3-4fb5-ab10-c4efaa41d61f",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:ca62577e-8e24-4af2-88bf-33b34e25e606",
          "uuid:8cda5c68-9c82-43b4-84d7-979efa36dfe1"
        ]
      },
      "properties": {
        "length": 3.0
      }
    },
    {
      "id": "uuid:ed666061-98c5-439d-ab0d-5a792437a873",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:16c35df5-bc63-4edd-8da5-dbcc5548a61e",
          "uuid:ca62577e-8e24-4af2-88bf-33b34e25e606"
        ]
      },
      "properties": {
        "length": 10.0
      }
    },
    {
      "id": "uuid:5a36c75b-053b-4d7b-b512-6777786d6180",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:8cda5c68-9c82-43b4-84d7-979efa36dfe1",
          "uuid:e7300a01-f8c1-4351-9511-02790a5376b0"
        ]
      },
      "properties": {
        "length": 2.0
      }
    },
    {
      "id": "uuid:b4c7d3ff-cf1f-40c1-8ea0-2cd2c09cc0e0",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:793997c5-bcc4-4610-984b-6cf2c2997348",
          "uuid:b8412dad-b40a-4e35-9f42-f983e0fce39d"
        ]
      },
      "properties": {
        "length": 2.0
      }
    },
    {
      "id": "uuid:36b10bf3-9e3a-49cb-9dc5-7e31ade26d17",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:9ef3d2ea-acea-4365-8bd5-2f8ef3036ed0",
          "uuid:d8d136c6-604c-4ad3-adf7-b0a7e04d034a"
        ]
      },
      "properties": {
        "length": 2.0
      }
    },
    {
      "id": "uuid:ec374b67-eb42-4c53-b5cc-0f919edb2635",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:a3b19f96-9bca-4c31-ac7e-4cb1615878df",
          "uuid:9ef3d2ea-acea-4365-8bd5-2f8ef3036ed0"
        ]
      },
      "properties": {
        "length": 6.0
      }
    },
    {
      "id": "uuid:f0249395-1d12-42d1-bdaf-08c5cc29b2d4",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:9ef3d2ea-acea-4365-8bd5-2f8ef3036ed0",
          "uuid:1d2a5d01-8547-4de6-abea-8f9ab994d35e"
        ]
      },
      "properties": {
        "length": 3.0
      }
    },
    {
      "id": "uuid:a604828d-a36b-4fac-ba6f-6160ade95301",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:a3b19f96-9bca-4c31-ac7e-4cb1615878df",
          "uuid:ff685e16-64f8-4f41-8a9e-7d8e83312fd6"
        ]
      },
      "properties": {
        "length": 4.0
      }
    },
    {
      "id": "uuid:508f66b5-e0cb-489c-ae24-21bfb7c09280",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:7fe8cb9b-976e-4344-bf72-f3721d878ba4",
          "uuid:793997c5-bcc4-4610-984b-6cf2c2997348"
        ]
      },
      "properties": {
        "length": 4.0
      }
    },
    {
      "id": "uuid:38499704-81f7-4d47-965f-435e0b7b0850",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:b8412dad-b40a-4e35-9f42-f983e0fce39d",
          "uuid:a0ec1bfd-0f7a-4c42-bc71-bacdcd44071d"
        ]
      },
      "properties": {
        "length": 4.0
      }
    },
    {
      "id": "uuid:b6e30631-9768-4020-8947-c32137328216",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:9a1d8124-ca37-4abd-b07e-bff4c8eaa2f9",
          "uuid:11caaac5-b631-4bd8-a6af-f82cb6371071"
        ]
      },
      "properties": {
        "length": 4.0
      }
    },
    {
      "id": "uuid:90e3950e-40b2-4d9d-a135-1a4b708305aa",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "LineString",
        "references": [
          "uuid:1d2a5d01-8547-4de6-abea-8f9ab994d35e",
          "uuid:87373f95-ee4b-4471-9980-f4a8258ee1e3"
        ]
      },
      "properties": {
        "length": 4.0
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
    },
    {
      "id": "uuid:4a294022-4864-49c7-8cee-f9e43360bc4e",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:32e82eb1-93a4-4387-8cd0-9616ebf1e39b",
                "orientation": "+"
              },
              {
                "ref": "uuid:83ff2cdf-6c58-4e7b-ba55-e084eff8c569",
                "orientation": "-"
              },
              {
                "ref": "uuid:8582d9c2-6053-495a-8413-f5493691c0de",
                "orientation": "+"
              },
              {
                "ref": "uuid:120defbd-2e05-4ec3-ba3c-ffee086d2add",
                "orientation": "+"
              }
            ]
          }
        ]
      },
      "properties": {
        "normal": [
          0.0,
          -1.0,
          3.007964248051e-16
        ],
        "area": 18.0
      }
    },
    {
      "id": "uuid:01947f47-ee13-44a9-85a4-2bcb4881982a",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:4c2a6434-03b0-4aa2-85ea-a9fcaea41555",
                "orientation": "+"
              },
              {
                "ref": "uuid:c60507ba-226b-4e49-a702-e9afef899b23",
                "orientation": "-"
              },
              {
                "ref": "uuid:830b9098-d914-4e8b-869d-4d20f1eb5c81",
                "orientation": "+"
              },
              {
                "ref": "uuid:3b72e45d-d351-46e4-a5b7-9ac9bc339d03",
                "orientation": "+"
              }
            ]
          }
        ]
      },
      "properties": {
        "normal": [
          0.0,
          1.0,
          0.0
        ],
        "area": 24.0
      }
    },
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
    },
    {
      "id": "uuid:3c1f5c4b-d842-40b6-a332-99d50015fa8f",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:ed6b8b1c-7030-4d70-ab61-94cb3aa904a7",
                "orientation": "+"
              },
              {
                "ref": "uuid:5f17e211-e8b5-4a7c-85e4-798787fd82a5",
                "orientation": "+"
              },
              {
                "ref": "uuid:921e2351-efbf-48be-85d3-eedc0dc2ddc0",
                "orientation": "-"
              },
              {
                "ref": "uuid:3b72e45d-d351-46e4-a5b7-9ac9bc339d03",
                "orientation": "-"
              }
            ]
          }
        ]
      },
      "properties": {
        "normal": [
          -1.0,
          -0.0,
          -0.0
        ],
        "area": 12.0
      }
    },
    {
      "id": "uuid:fe522919-1421-4fd1-9930-8c6551e3f2a5",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:7da1c2fe-f798-43cc-af44-ac63f968139c",
                "orientation": "+"
              },
              {
                "ref": "uuid:46fd1def-a93e-4c99-9868-172cf1b40ff1",
                "orientation": "+"
              },
              {
                "ref": "uuid:73f88b47-78ab-474d-9c62-73dfefd0dd5d",
                "orientation": "-"
              },
              {
                "ref": "uuid:5f17e211-e8b5-4a7c-85e4-798787fd82a5",
                "orientation": "-"
              }
            ]
          }
        ]
      },
      "properties": {
        "normal": [
          0.0,
          -1.0,
          0.0
        ],
        "area": 6.0
      }
    },
    {
      "id": "uuid:2387ae98-9236-42fe-9414-c45b99954c41",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:856e43bc-ee35-44d0-b25e-ea94a53e1db6",
                "orientation": "+"
              },
              {
                "ref": "uuid:7da1c2fe-f798-43cc-af44-ac63f968139c",
                "orientation": "-"
              },
              {
                "ref": "uuid:ed6b8b1c-7030-4d70-ab61-94cb3aa904a7",
                "orientation": "-"
              },
              {
                "ref": "uuid:830b9098-d914-4e8b-869d-4d20f1eb5c81",
                "orientation": "-"
              },
              {
                "ref": "uuid:d69c596c-134e-4216-9bf6-d0f10e6886d8",
                "orientation": "-"
              },
              {
                "ref": "uuid:32e82eb1-93a4-4387-8cd0-9616ebf1e39b",
                "orientation": "-"
              }
            ]
          }
        ]
      },
      "properties": {
        "normal": [
          0.0,
          0.0,
          -1.0
        ],
        "area": 56.0
      }
    },
    {
      "id": "uuid:4ba85faa-3935-4e89-a9f8-dcd647a5dbed",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:856e43bc-ee35-44d0-b25e-ea94a53e1db6",
                "orientation": "-"
              },
              {
                "ref": "uuid:120defbd-2e05-4ec3-ba3c-ffee086d2add",
                "orientation": "-"
              },
              {
                "ref": "uuid:7aa2a76d-9d5c-4540-9f2e-d8bcf36fadb5",
                "orientation": "-"
              },
              {
                "ref": "uuid:46fd1def-a93e-4c99-9868-172cf1b40ff1",
                "orientation": "-"
              }
            ]
          }
        ]
      },
      "properties": {
        "normal": [
          -1.0,
          -0.0,
          -0.0
        ],
        "area": 12.0
      }
    },
    {
      "id": "uuid:c55c88db-d187-4d7e-9aaa-b9d3dce52663",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:a5ed4867-4011-4db7-8425-cbe61a6d3a2d",
                "orientation": "+"
              },
              {
                "ref": "uuid:745aa367-94b6-4949-a856-5271ec6672e9",
                "orientation": "+"
              },
              {
                "ref": "uuid:f921656a-58e3-4375-bdff-ac8019f524cf",
                "orientation": "+"
              },
              {
                "ref": "uuid:3b72e45d-d351-46e4-a5b7-9ac9bc339d03",
                "orientation": "-"
              }
            ]
          }
        ]
      },
      "properties": {
        "normal": [
          0.0,
          1.0,
          0.0
        ],
        "area": 24.0
      }
    },
    {
      "id": "uuid:dbd99467-ea83-4dff-b03f-eef2aad2687c",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:745aa367-94b6-4949-a856-5271ec6672e9",
                "orientation": "-"
              },
              {
                "ref": "uuid:6aab9ba2-327e-40df-96c2-0ea43c538c24",
                "orientation": "+"
              },
              {
                "ref": "uuid:fb28f3f2-8ea7-4c03-bff5-7352addba8b3",
                "orientation": "-"
              },
              {
                "ref": "uuid:e0416983-f0db-4c99-8a72-3f8b4615ab05",
                "orientation": "+"
              }
            ]
          }
        ]
      },
      "properties": {
        "normal": [
          -1.0,
          -0.0,
          -3.007964248051e-16
        ],
        "area": 24.0
      }
    },
    {
      "id": "uuid:0e55e87d-8475-4c92-89e7-d62f97ce9ec2",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:fb28f3f2-8ea7-4c03-bff5-7352addba8b3",
                "orientation": "+"
              },
              {
                "ref": "uuid:07093c51-5d4e-42ad-941f-8eeb89e5ae78",
                "orientation": "+"
              },
              {
                "ref": "uuid:fb03276b-4250-4d52-81e1-035a0bd92895",
                "orientation": "+"
              },
              {
                "ref": "uuid:c97ac36d-9cf3-48ca-bb8f-c36cb335bebf",
                "orientation": "+"
              }
            ]
          }
        ]
      },
      "properties": {
        "normal": [
          0.0,
          -1.0,
          0.0
        ],
        "area": 18.0
      }
    },
    {
      "id": "uuid:6a5ff199-56a7-4e65-94b5-bfdf2ae3449d",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:f921656a-58e3-4375-bdff-ac8019f524cf",
                "orientation": "-"
              },
              {
                "ref": "uuid:e0416983-f0db-4c99-8a72-3f8b4615ab05",
                "orientation": "-"
              },
              {
                "ref": "uuid:c97ac36d-9cf3-48ca-bb8f-c36cb335bebf",
                "orientation": "-"
              },
              {
                "ref": "uuid:af347f25-a547-477c-b246-cb810756d4dc",
                "orientation": "+"
              },
              {
                "ref": "uuid:21388b1b-dcba-46c0-8166-8ffc9c07e50b",
                "orientation": "+"
              },
              {
                "ref": "uuid:921e2351-efbf-48be-85d3-eedc0dc2ddc0",
                "orientation": "-"
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
    },
    {
      "id": "uuid:e499fea3-19f7-4863-8a58-751caff7d884",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:fc8ba01d-faa7-4407-ae92-32b584c8a6a3",
                "orientation": "+"
              },
              {
                "ref": "uuid:5f17e211-e8b5-4a7c-85e4-798787fd82a5",
                "orientation": "+"
              },
              {
                "ref": "uuid:21388b1b-dcba-46c0-8166-8ffc9c07e50b",
                "orientation": "-"
              },
              {
                "ref": "uuid:8601e9ea-c48f-4c00-a066-f950ed6b0724",
                "orientation": "+"
              }
            ]
          }
        ]
      },
      "properties": {
        "normal": [
          0.0,
          -1.0,
          0.0
        ],
        "area": 6.0
      }
    },
    {
      "id": "uuid:9e4c0c0e-6acf-401b-b35e-0e917ce3a5fc",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:242a8400-a076-4817-86c6-acd56087cec6",
                "orientation": "+"
              },
              {
                "ref": "uuid:07093c51-5d4e-42ad-941f-8eeb89e5ae78",
                "orientation": "-"
              },
              {
                "ref": "uuid:6aab9ba2-327e-40df-96c2-0ea43c538c24",
                "orientation": "-"
              },
              {
                "ref": "uuid:a5ed4867-4011-4db7-8425-cbe61a6d3a2d",
                "orientation": "-"
              },
              {
                "ref": "uuid:ed6b8b1c-7030-4d70-ab61-94cb3aa904a7",
                "orientation": "+"
              },
              {
                "ref": "uuid:fc8ba01d-faa7-4407-ae92-32b584c8a6a3",
                "orientation": "-"
              }
            ]
          }
        ]
      },
      "properties": {
        "normal": [
          0.0,
          0.0,
          -1.0
        ],
        "area": 56.0
      }
    },
    {
      "id": "uuid:3f5c452f-9815-4b21-9b2d-0127ae80c385",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:242a8400-a076-4817-86c6-acd56087cec6",
                "orientation": "-"
              },
              {
                "ref": "uuid:8601e9ea-c48f-4c00-a066-f950ed6b0724",
                "orientation": "-"
              },
              {
                "ref": "uuid:af347f25-a547-477c-b246-cb810756d4dc",
                "orientation": "-"
              },
              {
                "ref": "uuid:fb03276b-4250-4d52-81e1-035a0bd92895",
                "orientation": "-"
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
        "area": 12.0
      }
    },
    {
      "id": "uuid:66a430c0-123f-42df-9d11-64347362bcb3",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:4ad210b7-5de5-4732-af7c-978de28f988b",
                "orientation": "+"
              },
              {
                "ref": "uuid:c12882ea-089f-4616-942c-ceb8fb4ac05e",
                "orientation": "+"
              },
              {
                "ref": "uuid:4406e3f5-89dc-463b-84e4-487490f71f1a",
                "orientation": "+"
              },
              {
                "ref": "uuid:511c6e7d-728b-4f1f-9763-9461eb628586",
                "orientation": "+"
              }
            ]
          }
        ]
      },
      "properties": {
        "normal": [
          0.0,
          -1.0,
          0.0
        ],
        "area": 24.0
      }
    },
    {
      "id": "uuid:31d8f2b5-cc74-4f72-b230-d27dad0fd589",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:79205d80-72e5-4bd8-9c03-9503e4e690cc",
                "orientation": "+"
              },
              {
                "ref": "uuid:06babc8d-f0d6-43eb-bfad-931055bae084",
                "orientation": "+"
              },
              {
                "ref": "uuid:fc877bbe-72a8-4e59-b959-010e6660984a",
                "orientation": "+"
              },
              {
                "ref": "uuid:c12882ea-089f-4616-942c-ceb8fb4ac05e",
                "orientation": "-"
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
        "area": 30.0
      }
    },
    {
      "id": "uuid:65959e29-11cb-4568-904d-61c4a7c17b98",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:aafd209b-cd13-401a-83f5-26751a02cffe",
                "orientation": "+"
              },
              {
                "ref": "uuid:2f3bbe39-01e3-4c96-8dea-377e38729a03",
                "orientation": "+"
              },
              {
                "ref": "uuid:830b9098-d914-4e8b-869d-4d20f1eb5c81",
                "orientation": "-"
              },
              {
                "ref": "uuid:9238cbda-d019-4b57-8319-0cc355656802",
                "orientation": "+"
              },
              {
                "ref": "uuid:06babc8d-f0d6-43eb-bfad-931055bae084",
                "orientation": "-"
              }
            ]
          }
        ]
      },
      "properties": {
        "normal": [
          0.0,
          1.0,
          0.0
        ],
        "area": 30.0
      }
    },
    {
      "id": "uuid:e2efe498-c6d5-4f9c-ac07-4c1c9e406675",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:d69c596c-134e-4216-9bf6-d0f10e6886d8",
                "orientation": "-"
              },
              {
                "ref": "uuid:32e82eb1-93a4-4387-8cd0-9616ebf1e39b",
                "orientation": "-"
              },
              {
                "ref": "uuid:91cdc345-f745-4643-bc88-a24f8e2216b0",
                "orientation": "+"
              },
              {
                "ref": "uuid:4406e3f5-89dc-463b-84e4-487490f71f1a",
                "orientation": "-"
              },
              {
                "ref": "uuid:fc877bbe-72a8-4e59-b959-010e6660984a",
                "orientation": "-"
              },
              {
                "ref": "uuid:9238cbda-d019-4b57-8319-0cc355656802",
                "orientation": "-"
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
        "area": 32.0
      }
    },
    {
      "id": "uuid:5bcee2b5-be9b-47d6-9a8b-35dac021f661",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:4ad210b7-5de5-4732-af7c-978de28f988b",
                "orientation": "-"
              },
              {
                "ref": "uuid:fe0704c2-5d2a-49a8-b507-e98c4047d8c4",
                "orientation": "-"
              },
              {
                "ref": "uuid:651bb558-f6d6-439f-a8e0-dd5c3385dc94",
                "orientation": "-"
              },
              {
                "ref": "uuid:61f99921-a94d-4e0d-8353-f027d76227c5",
                "orientation": "-"
              },
              {
                "ref": "uuid:aafd209b-cd13-401a-83f5-26751a02cffe",
                "orientation": "-"
              },
              {
                "ref": "uuid:79205d80-72e5-4bd8-9c03-9503e4e690cc",
                "orientation": "-"
              }
            ]
          }
        ]
      },
      "properties": {
        "normal": [
          -0.0,
          -0.0,
          -1.0
        ],
        "area": 88.0
      }
    },
    {
      "id": "uuid:91ce0c52-11c3-4e32-8bcc-dea958a3969e",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:474fef44-eb6e-4e19-a871-433f9bac5650",
                "orientation": "-"
              },
              {
                "ref": "uuid:ed6b8b1c-7030-4d70-ab61-94cb3aa904a7",
                "orientation": "-"
              },
              {
                "ref": "uuid:2f3bbe39-01e3-4c96-8dea-377e38729a03",
                "orientation": "-"
              },
              {
                "ref": "uuid:61f99921-a94d-4e0d-8353-f027d76227c5",
                "orientation": "+"
              }
            ]
          }
        ]
      },
      "properties": {
        "normal": [
          -1.0,
          -0.0,
          0.0
        ],
        "area": 12.0
      }
    },
    {
      "id": "uuid:56283886-1f4c-448c-b785-80fb9740a9cc",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:736411fb-67f0-47c0-bf77-bf4f9048bcda",
                "orientation": "+"
              },
              {
                "ref": "uuid:fe0704c2-5d2a-49a8-b507-e98c4047d8c4",
                "orientation": "+"
              },
              {
                "ref": "uuid:511c6e7d-728b-4f1f-9763-9461eb628586",
                "orientation": "-"
              },
              {
                "ref": "uuid:91cdc345-f745-4643-bc88-a24f8e2216b0",
                "orientation": "-"
              },
              {
                "ref": "uuid:856e43bc-ee35-44d0-b25e-ea94a53e1db6",
                "orientation": "+"
              }
            ]
          }
        ]
      },
      "properties": {
        "normal": [
          -1.0,
          -0.0,
          -0.0
        ],
        "area": 18.0
      }
    },
    {
      "id": "uuid:f3338301-b0e3-401c-af23-41ac2ae8e969",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:736411fb-67f0-47c0-bf77-bf4f9048bcda",
                "orientation": "-"
              },
              {
                "ref": "uuid:7da1c2fe-f798-43cc-af44-ac63f968139c",
                "orientation": "-"
              },
              {
                "ref": "uuid:474fef44-eb6e-4e19-a871-433f9bac5650",
                "orientation": "+"
              },
              {
                "ref": "uuid:651bb558-f6d6-439f-a8e0-dd5c3385dc94",
                "orientation": "+"
              }
            ]
          }
        ]
      },
      "properties": {
        "normal": [
          0.0,
          -1.0,
          0.0
        ],
        "area": 6.0
      }
    },
    {
      "id": "uuid:a2117d6b-4621-4a6b-9809-9fab3dfc4ff0",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:3fef75ce-8c4c-4d89-a47f-65977debaee0",
                "orientation": "+"
              },
              {
                "ref": "uuid:48b52144-aaa0-42a1-8e7a-40bebfcf9985",
                "orientation": "+"
              },
              {
                "ref": "uuid:71af0dde-7fc9-4290-9624-119e91f422ea",
                "orientation": "+"
              },
              {
                "ref": "uuid:ad13a84c-df97-4b75-9dc1-1ce452249964",
                "orientation": "+"
              }
            ]
          }
        ]
      },
      "properties": {
        "normal": [
          0.0,
          -1.0,
          0.0
        ],
        "area": 24.0
      }
    },
    {
      "id": "uuid:9d67557a-e130-4a47-b63d-c6a2bdf21fa2",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:c2a00070-f12b-42f9-b78c-b33daa500873",
                "orientation": "+"
              },
              {
                "ref": "uuid:ad13a84c-df97-4b75-9dc1-1ce452249964",
                "orientation": "-"
              },
              {
                "ref": "uuid:13dd8184-f73e-4d9f-9977-3e573274fccc",
                "orientation": "+"
              },
              {
                "ref": "uuid:7355081e-9fa3-4fb5-ab10-c4efaa41d61f",
                "orientation": "-"
              }
            ]
          }
        ]
      },
      "properties": {
        "normal": [
          -1.0,
          -0.0,
          -0.0
        ],
        "area": 30.0
      }
    },
    {
      "id": "uuid:d45fca44-8685-4146-92a5-b84d82fdc838",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:ed666061-98c5-439d-ab0d-5a792437a873",
                "orientation": "+"
              },
              {
                "ref": "uuid:7355081e-9fa3-4fb5-ab10-c4efaa41d61f",
                "orientation": "+"
              },
              {
                "ref": "uuid:5a36c75b-053b-4d7b-b512-6777786d6180",
                "orientation": "+"
              },
              {
                "ref": "uuid:a5ed4867-4011-4db7-8425-cbe61a6d3a2d",
                "orientation": "-"
              },
              {
                "ref": "uuid:2f3bbe39-01e3-4c96-8dea-377e38729a03",
                "orientation": "-"
              }
            ]
          }
        ]
      },
      "properties": {
        "normal": [
          0.0,
          1.0,
          0.0
        ],
        "area": 30.0
      }
    },
    {
      "id": "uuid:2497a842-0932-4fe5-ac1a-2f773473f338",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:b4c7d3ff-cf1f-40c1-8ea0-2cd2c09cc0e0",
                "orientation": "+"
              },
              {
                "ref": "uuid:07093c51-5d4e-42ad-941f-8eeb89e5ae78",
                "orientation": "-"
              },
              {
                "ref": "uuid:6aab9ba2-327e-40df-96c2-0ea43c538c24",
                "orientation": "-"
              },
              {
                "ref": "uuid:5a36c75b-053b-4d7b-b512-6777786d6180",
                "orientation": "-"
              },
              {
                "ref": "uuid:13dd8184-f73e-4d9f-9977-3e573274fccc",
                "orientation": "-"
              },
              {
                "ref": "uuid:71af0dde-7fc9-4290-9624-119e91f422ea",
                "orientation": "-"
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
        "area": 32.0
      }
    },
    {
      "id": "uuid:04ea47e9-b4dd-4bed-a8f4-4802d1735c74",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:ed666061-98c5-439d-ab0d-5a792437a873",
                "orientation": "-"
              },
              {
                "ref": "uuid:61f99921-a94d-4e0d-8353-f027d76227c5",
                "orientation": "+"
              },
              {
                "ref": "uuid:36b10bf3-9e3a-49cb-9dc5-7e31ade26d17",
                "orientation": "-"
              },
              {
                "ref": "uuid:ec374b67-eb42-4c53-b5cc-0f919edb2635",
                "orientation": "-"
              },
              {
                "ref": "uuid:3fef75ce-8c4c-4d89-a47f-65977debaee0",
                "orientation": "-"
              },
              {
                "ref": "uuid:c2a00070-f12b-42f9-b78c-b33daa500873",
                "orientation": "-"
              }
            ]
          }
        ]
      },
      "properties": {
        "normal": [
          -0.0,
          -0.0,
          -1.0
        ],
        "area": 88.0
      }
    },
    {
      "id": "uuid:b5fd960f-0d14-4257-9182-40de738a7e50",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:f0249395-1d12-42d1-bdaf-08c5cc29b2d4",
                "orientation": "+"
              },
              {
                "ref": "uuid:242a8400-a076-4817-86c6-acd56087cec6",
                "orientation": "+"
              },
              {
                "ref": "uuid:b4c7d3ff-cf1f-40c1-8ea0-2cd2c09cc0e0",
                "orientation": "-"
              },
              {
                "ref": "uuid:48b52144-aaa0-42a1-8e7a-40bebfcf9985",
                "orientation": "-"
              },
              {
                "ref": "uuid:ec374b67-eb42-4c53-b5cc-0f919edb2635",
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
        "area": 18.0
      }
    },
    {
      "id": "uuid:e119b096-e589-49bd-b1db-a1182dc2dade",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:474fef44-eb6e-4e19-a871-433f9bac5650",
                "orientation": "-"
              },
              {
                "ref": "uuid:fc8ba01d-faa7-4407-ae92-32b584c8a6a3",
                "orientation": "-"
              },
              {
                "ref": "uuid:f0249395-1d12-42d1-bdaf-08c5cc29b2d4",
                "orientation": "-"
              },
              {
                "ref": "uuid:36b10bf3-9e3a-49cb-9dc5-7e31ade26d17",
                "orientation": "+"
              }
            ]
          }
        ]
      },
      "properties": {
        "normal": [
          0.0,
          -1.0,
          0.0
        ],
        "area": 6.0
      }
    },
    {
      "id": "uuid:67842d3a-7c79-4f2a-8630-744711071e93",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:a604828d-a36b-4fac-ba6f-6160ade95301",
                "orientation": "-"
              },
              {
                "ref": "uuid:ec374b67-eb42-4c53-b5cc-0f919edb2635",
                "orientation": "+"
              },
              {
                "ref": "uuid:36b10bf3-9e3a-49cb-9dc5-7e31ade26d17",
                "orientation": "+"
              },
              {
                "ref": "uuid:651bb558-f6d6-439f-a8e0-dd5c3385dc94",
                "orientation": "+"
              },
              {
                "ref": "uuid:fe0704c2-5d2a-49a8-b507-e98c4047d8c4",
                "orientation": "+"
              }
            ]
          }
        ]
      },
      "properties": {
        "normal": [
          -0.0,
          -0.0,
          -1.0
        ],
        "area": 24.0
      }
    },
    {
      "id": "uuid:f1c1a636-d6ab-414c-a0aa-855fc7e85e1f",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:508f66b5-e0cb-489c-ae24-21bfb7c09280",
                "orientation": "+"
              },
              {
                "ref": "uuid:48b52144-aaa0-42a1-8e7a-40bebfcf9985",
                "orientation": "-"
              },
              {
                "ref": "uuid:a604828d-a36b-4fac-ba6f-6160ade95301",
                "orientation": "+"
              },
              {
                "ref": "uuid:511c6e7d-728b-4f1f-9763-9461eb628586",
                "orientation": "-"
              }
            ]
          }
        ]
      },
      "properties": {
        "normal": [
          0.0,
          -1.0,
          0.0
        ],
        "area": 12.0
      }
    },
    {
      "id": "uuid:a22a6c54-306e-44bc-9b94-6c32c705e63e",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:508f66b5-e0cb-489c-ae24-21bfb7c09280",
                "orientation": "-"
              },
              {
                "ref": "uuid:91cdc345-f745-4643-bc88-a24f8e2216b0",
                "orientation": "-"
              },
              {
                "ref": "uuid:38499704-81f7-4d47-965f-435e0b7b0850",
                "orientation": "-"
              },
              {
                "ref": "uuid:b4c7d3ff-cf1f-40c1-8ea0-2cd2c09cc0e0",
                "orientation": "-"
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
        "area": 8.0
      }
    },
    {
      "id": "uuid:9ed21e0a-b062-4000-88e2-50bd9153e417",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:b6e30631-9768-4020-8947-c32137328216",
                "orientation": "+"
              },
              {
                "ref": "uuid:7aa2a76d-9d5c-4540-9f2e-d8bcf36fadb5",
                "orientation": "-"
              },
              {
                "ref": "uuid:73f88b47-78ab-474d-9c62-73dfefd0dd5d",
                "orientation": "-"
              },
              {
                "ref": "uuid:21388b1b-dcba-46c0-8166-8ffc9c07e50b",
                "orientation": "-"
              },
              {
                "ref": "uuid:af347f25-a547-477c-b246-cb810756d4dc",
                "orientation": "-"
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
        "area": 16.0
      }
    },
    {
      "id": "uuid:802ff3d8-b8da-423f-8a02-7b2288485edd",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:38499704-81f7-4d47-965f-435e0b7b0850",
                "orientation": "+"
              },
              {
                "ref": "uuid:120defbd-2e05-4ec3-ba3c-ffee086d2add",
                "orientation": "-"
              },
              {
                "ref": "uuid:b6e30631-9768-4020-8947-c32137328216",
                "orientation": "-"
              },
              {
                "ref": "uuid:fb03276b-4250-4d52-81e1-035a0bd92895",
                "orientation": "-"
              }
            ]
          }
        ]
      },
      "properties": {
        "normal": [
          3.609557097661e-16,
          -1.0,
          0.0
        ],
        "area": 12.0
      }
    },
    {
      "id": "uuid:16c13b7b-aeda-4130-a793-d63f62bcc75b",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:f0249395-1d12-42d1-bdaf-08c5cc29b2d4",
                "orientation": "+"
              },
              {
                "ref": "uuid:90e3950e-40b2-4d9d-a135-1a4b708305aa",
                "orientation": "+"
              },
              {
                "ref": "uuid:736411fb-67f0-47c0-bf77-bf4f9048bcda",
                "orientation": "+"
              },
              {
                "ref": "uuid:651bb558-f6d6-439f-a8e0-dd5c3385dc94",
                "orientation": "-"
              },
              {
                "ref": "uuid:36b10bf3-9e3a-49cb-9dc5-7e31ade26d17",
                "orientation": "-"
              }
            ]
          }
        ]
      },
      "properties": {
        "normal": [
          0.0,
          1.0,
          0.0
        ],
        "area": 12.0
      }
    },
    {
      "id": "uuid:786e8738-1690-426d-8e2f-f5e734336a67",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "rings": [
          {
            "type": "Ring",
            "directed_references": [
              {
                "ref": "uuid:8601e9ea-c48f-4c00-a066-f950ed6b0724",
                "orientation": "-"
              },
              {
                "ref": "uuid:21388b1b-dcba-46c0-8166-8ffc9c07e50b",
                "orientation": "+"
              },
              {
                "ref": "uuid:73f88b47-78ab-474d-9c62-73dfefd0dd5d",
                "orientation": "+"
              },
              {
                "ref": "uuid:46fd1def-a93e-4c99-9868-172cf1b40ff1",
                "orientation": "-"
              },
              {
                "ref": "uuid:90e3950e-40b2-4d9d-a135-1a4b708305aa",
                "orientation": "-"
              }
            ]
          }
        ]
      },
      "properties": {
        "normal": [
          0.0,
          1.0,
          0.0
        ],
        "area": 12.0
      }
    }
  ],
  "solids": [
    {
      "id": "uuid:758590d2-8cc6-4ff7-8fcc-d7ecd01b3498",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Solid",
        "shells": [
          {
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
          }
        ]
      },
      "properties": {
        "name": "Upper East",
        "levels": [
          2
        ],
        "volume": 168.0
      }
    },
    {
      "id": "uuid:82ce9302-e51d-48ff-a119-79bb5501ed1c",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Solid",
        "shells": [
          {
            "type": "Shell",
            "directed_references": [
              {
                "ref": "uuid:c55c88db-d187-4d7e-9aaa-b9d3dce52663",
                "orientation": "+"
              },
              {
                "ref": "uuid:dbd99467-ea83-4dff-b03f-eef2aad2687c",
                "orientation": "+"
              },
              {
                "ref": "uuid:0e55e87d-8475-4c92-89e7-d62f97ce9ec2",
                "orientation": "+"
              },
              {
                "ref": "uuid:6a5ff199-56a7-4e65-94b5-bfdf2ae3449d",
                "orientation": "+"
              },
              {
                "ref": "uuid:3c1f5c4b-d842-40b6-a332-99d50015fa8f",
                "orientation": "-"
              },
              {
                "ref": "uuid:e499fea3-19f7-4863-8a58-751caff7d884",
                "orientation": "+"
              },
              {
                "ref": "uuid:9e4c0c0e-6acf-401b-b35e-0e917ce3a5fc",
                "orientation": "+"
              },
              {
                "ref": "uuid:3f5c452f-9815-4b21-9b2d-0127ae80c385",
                "orientation": "+"
              }
            ]
          }
        ]
      },
      "properties": {
        "name": "Upper West",
        "levels": [
          2
        ],
        "volume": 168.0
      }
    },
    {
      "id": "uuid:1070811c-70bd-4698-a08f-92c62e41aafc",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Solid",
        "shells": [
          {
            "type": "Shell",
            "directed_references": [
              {
                "ref": "uuid:66a430c0-123f-42df-9d11-64347362bcb3",
                "orientation": "+"
              },
              {
                "ref": "uuid:31d8f2b5-cc74-4f72-b230-d27dad0fd589",
                "orientation": "+"
              },
              {
                "ref": "uuid:65959e29-11cb-4568-904d-61c4a7c17b98",
                "orientation": "+"
              },
              {
                "ref": "uuid:e2efe498-c6d5-4f9c-ac07-4c1c9e406675",
                "orientation": "+"
              },
              {
                "ref": "uuid:5bcee2b5-be9b-47d6-9a8b-35dac021f661",
                "orientation": "+"
              },
              {
                "ref": "uuid:91ce0c52-11c3-4e32-8bcc-dea958a3969e",
                "orientation": "+"
              },
              {
                "ref": "uuid:56283886-1f4c-448c-b785-80fb9740a9cc",
                "orientation": "+"
              },
              {
                "ref": "uuid:f3338301-b0e3-401c-af23-41ac2ae8e969",
                "orientation": "+"
              },
              {
                "ref": "uuid:2387ae98-9236-42fe-9414-c45b99954c41",
                "orientation": "-"
              }
            ]
          }
        ]
      },
      "properties": {
        "name": "Lower East",
        "levels": [
          1
        ],
        "volume": 264.0
      }
    },
    {
      "id": "uuid:74618bd4-0bbe-4490-92b3-27a4da496c39",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Solid",
        "shells": [
          {
            "type": "Shell",
            "directed_references": [
              {
                "ref": "uuid:a2117d6b-4621-4a6b-9809-9fab3dfc4ff0",
                "orientation": "+"
              },
              {
                "ref": "uuid:9d67557a-e130-4a47-b63d-c6a2bdf21fa2",
                "orientation": "+"
              },
              {
                "ref": "uuid:d45fca44-8685-4146-92a5-b84d82fdc838",
                "orientation": "+"
              },
              {
                "ref": "uuid:2497a842-0932-4fe5-ac1a-2f773473f338",
                "orientation": "+"
              },
              {
                "ref": "uuid:04ea47e9-b4dd-4bed-a8f4-4802d1735c74",
                "orientation": "+"
              },
              {
                "ref": "uuid:b5fd960f-0d14-4257-9182-40de738a7e50",
                "orientation": "+"
              },
              {
                "ref": "uuid:e119b096-e589-49bd-b1db-a1182dc2dade",
                "orientation": "+"
              },
              {
                "ref": "uuid:91ce0c52-11c3-4e32-8bcc-dea958a3969e",
                "orientation": "-"
              },
              {
                "ref": "uuid:9e4c0c0e-6acf-401b-b35e-0e917ce3a5fc",
                "orientation": "-"
              }
            ]
          }
        ]
      },
      "properties": {
        "name": "Lower West",
        "levels": [
          1
        ],
        "volume": 264.0
      }
    },
    {
      "id": "uuid:50453cb2-89bd-4432-8c7c-fdc2318febc2",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Solid",
        "shells": [
          {
            "type": "Shell",
            "directed_references": [
              {
                "ref": "uuid:67842d3a-7c79-4f2a-8630-744711071e93",
                "orientation": "+"
              },
              {
                "ref": "uuid:f1c1a636-d6ab-414c-a0aa-855fc7e85e1f",
                "orientation": "+"
              },
              {
                "ref": "uuid:a22a6c54-306e-44bc-9b94-6c32c705e63e",
                "orientation": "+"
              },
              {
                "ref": "uuid:9ed21e0a-b062-4000-88e2-50bd9153e417",
                "orientation": "+"
              },
              {
                "ref": "uuid:802ff3d8-b8da-423f-8a02-7b2288485edd",
                "orientation": "+"
              },
              {
                "ref": "uuid:4ba85faa-3935-4e89-a9f8-dcd647a5dbed",
                "orientation": "-"
              },
              {
                "ref": "uuid:56283886-1f4c-448c-b785-80fb9740a9cc",
                "orientation": "-"
              },
              {
                "ref": "uuid:3f5c452f-9815-4b21-9b2d-0127ae80c385",
                "orientation": "-"
              },
              {
                "ref": "uuid:b5fd960f-0d14-4257-9182-40de738a7e50",
                "orientation": "-"
              },
              {
                "ref": "uuid:16c13b7b-aeda-4130-a793-d63f62bcc75b",
                "orientation": "+"
              },
              {
                "ref": "uuid:786e8738-1690-426d-8e2f-f5e734336a67",
                "orientation": "+"
              }
            ]
          }
        ]
      },
      "properties": {
        "name": "Stairwell",
        "levels": [
          1,
          2
        ],
        "volume": 120.0
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
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

<uuid:1070811c-70bd-4698-a08f-92c62e41aafc> a geojson:Feature ;
    geojson:topology [ a topo:Solid ;
            topo:shells ( [ a topo:Shell ;
                        topo:directedReferences ( [ topo:orientation "+" ;
                                    topo:ref <uuid:66a430c0-123f-42df-9d11-64347362bcb3> ] [ topo:orientation "+" ;
                                    topo:ref <uuid:31d8f2b5-cc74-4f72-b230-d27dad0fd589> ] [ topo:orientation "+" ;
                                    topo:ref <uuid:65959e29-11cb-4568-904d-61c4a7c17b98> ] [ topo:orientation "+" ;
                                    topo:ref <uuid:e2efe498-c6d5-4f9c-ac07-4c1c9e406675> ] [ topo:orientation "+" ;
                                    topo:ref <uuid:5bcee2b5-be9b-47d6-9a8b-35dac021f661> ] [ topo:orientation "+" ;
                                    topo:ref <uuid:91ce0c52-11c3-4e32-8bcc-dea958a3969e> ] [ topo:orientation "+" ;
                                    topo:ref <uuid:56283886-1f4c-448c-b785-80fb9740a9cc> ] [ topo:orientation "+" ;
                                    topo:ref <uuid:f3338301-b0e3-401c-af23-41ac2ae8e969> ] [ topo:orientation "-" ;
                                    topo:ref <uuid:2387ae98-9236-42fe-9414-c45b99954c41> ] ) ] ) ] .

<uuid:50453cb2-89bd-4432-8c7c-fdc2318febc2> a geojson:Feature ;
    geojson:topology [ a topo:Solid ;
            topo:shells ( [ a topo:Shell ;
                        topo:directedReferences ( [ topo:orientation "+" ;
                                    topo:ref <uuid:67842d3a-7c79-4f2a-8630-744711071e93> ] [ topo:orientation "+" ;
                                    topo:ref <uuid:f1c1a636-d6ab-414c-a0aa-855fc7e85e1f> ] [ topo:orientation "+" ;
                                    topo:ref <uuid:a22a6c54-306e-44bc-9b94-6c32c705e63e> ] [ topo:orientation "+" ;
                                    topo:ref <uuid:9ed21e0a-b062-4000-88e2-50bd9153e417> ] [ topo:orientation "+" ;
                                    topo:ref <uuid:802ff3d8-b8da-423f-8a02-7b2288485edd> ] [ topo:orientation "-" ;
                                    topo:ref <uuid:4ba85faa-3935-4e89-a9f8-dcd647a5dbed> ] [ topo:orientation "-" ;
                                    topo:ref <uuid:56283886-1f4c-448c-b785-80fb9740a9cc> ] [ topo:orientation "-" ;
                                    topo:ref <uuid:3f5c452f-9815-4b21-9b2d-0127ae80c385> ] [ topo:orientation "-" ;
                                    topo:ref <uuid:b5fd960f-0d14-4257-9182-40de738a7e50> ] [ topo:orientation "+" ;
                                    topo:ref <uuid:16c13b7b-aeda-4130-a793-d63f62bcc75b> ] [ topo:orientation "+" ;
                                    topo:ref <uuid:786e8738-1690-426d-8e2f-f5e734336a67> ] ) ] ) ] .

<uuid:74618bd4-0bbe-4490-92b3-27a4da496c39> a geojson:Feature ;
    geojson:topology [ a topo:Solid ;
            topo:shells ( [ a topo:Shell ;
                        topo:directedReferences ( [ topo:orientation "+" ;
                                    topo:ref <uuid:a2117d6b-4621-4a6b-9809-9fab3dfc4ff0> ] [ topo:orientation "+" ;
                                    topo:ref <uuid:9d67557a-e130-4a47-b63d-c6a2bdf21fa2> ] [ topo:orientation "+" ;
                                    topo:ref <uuid:d45fca44-8685-4146-92a5-b84d82fdc838> ] [ topo:orientation "+" ;
                                    topo:ref <uuid:2497a842-0932-4fe5-ac1a-2f773473f338> ] [ topo:orientation "+" ;
                                    topo:ref <uuid:04ea47e9-b4dd-4bed-a8f4-4802d1735c74> ] [ topo:orientation "+" ;
                                    topo:ref <uuid:b5fd960f-0d14-4257-9182-40de738a7e50> ] [ topo:orientation "+" ;
                                    topo:ref <uuid:e119b096-e589-49bd-b1db-a1182dc2dade> ] [ topo:orientation "-" ;
                                    topo:ref <uuid:91ce0c52-11c3-4e32-8bcc-dea958a3969e> ] [ topo:orientation "-" ;
                                    topo:ref <uuid:9e4c0c0e-6acf-401b-b35e-0e917ce3a5fc> ] ) ] ) ] .

<uuid:758590d2-8cc6-4ff7-8fcc-d7ecd01b3498> a geojson:Feature ;
    geojson:topology [ a topo:Solid ;
            topo:shells ( [ a topo:Shell ;
                        topo:directedReferences ( [ topo:orientation "+" ;
                                    topo:ref <uuid:4ac3b91b-eeb7-428c-b5e9-7e8a3f0998ae> ] [ topo:orientation "+" ;
                                    topo:ref <uuid:4a294022-4864-49c7-8cee-f9e43360bc4e> ] [ topo:orientation "+" ;
                                    topo:ref <uuid:01947f47-ee13-44a9-85a4-2bcb4881982a> ] [ topo:orientation "+" ;
                                    topo:ref <uuid:607a3363-3eb7-4ce6-a633-86d2e565692b> ] [ topo:orientation "+" ;
                                    topo:ref <uuid:3c1f5c4b-d842-40b6-a332-99d50015fa8f> ] [ topo:orientation "+" ;
                                    topo:ref <uuid:fe522919-1421-4fd1-9930-8c6551e3f2a5> ] [ topo:orientation "+" ;
                                    topo:ref <uuid:2387ae98-9236-42fe-9414-c45b99954c41> ] [ topo:orientation "+" ;
                                    topo:ref <uuid:4ba85faa-3935-4e89-a9f8-dcd647a5dbed> ] ) ] ) ] .

<uuid:82ce9302-e51d-48ff-a119-79bb5501ed1c> a geojson:Feature ;
    geojson:topology [ a topo:Solid ;
            topo:shells ( [ a topo:Shell ;
                        topo:directedReferences ( [ topo:orientation "+" ;
                                    topo:ref <uuid:c55c88db-d187-4d7e-9aaa-b9d3dce52663> ] [ topo:orientation "+" ;
                                    topo:ref <uuid:dbd99467-ea83-4dff-b03f-eef2aad2687c> ] [ topo:orientation "+" ;
                                    topo:ref <uuid:0e55e87d-8475-4c92-89e7-d62f97ce9ec2> ] [ topo:orientation "+" ;
                                    topo:ref <uuid:6a5ff199-56a7-4e65-94b5-bfdf2ae3449d> ] [ topo:orientation "-" ;
                                    topo:ref <uuid:3c1f5c4b-d842-40b6-a332-99d50015fa8f> ] [ topo:orientation "+" ;
                                    topo:ref <uuid:e499fea3-19f7-4863-8a58-751caff7d884> ] [ topo:orientation "+" ;
                                    topo:ref <uuid:9e4c0c0e-6acf-401b-b35e-0e917ce3a5fc> ] [ topo:orientation "+" ;
                                    topo:ref <uuid:3f5c452f-9815-4b21-9b2d-0127ae80c385> ] ) ] ) ] .

<uuid:01947f47-ee13-44a9-85a4-2bcb4881982a> a geojson:Feature ;
    geojson:topology [ a topo:Face ;
            topo:rings ( [ a topo:Ring ;
                        topo:directedReferences ( <uuid:4c2a6434-03b0-4aa2-85ea-a9fcaea41555> <uuid:c60507ba-226b-4e49-a702-e9afef899b23> <uuid:830b9098-d914-4e8b-869d-4d20f1eb5c81> <uuid:3b72e45d-d351-46e4-a5b7-9ac9bc339d03> ) ] ) ] .

<uuid:04ea47e9-b4dd-4bed-a8f4-4802d1735c74> a geojson:Feature ;
    geojson:topology [ a topo:Face ;
            topo:rings ( [ a topo:Ring ;
                        topo:directedReferences ( <uuid:ed666061-98c5-439d-ab0d-5a792437a873> <uuid:61f99921-a94d-4e0d-8353-f027d76227c5> <uuid:36b10bf3-9e3a-49cb-9dc5-7e31ade26d17> <uuid:ec374b67-eb42-4c53-b5cc-0f919edb2635> <uuid:3fef75ce-8c4c-4d89-a47f-65977debaee0> <uuid:c2a00070-f12b-42f9-b78c-b33daa500873> ) ] ) ] .

<uuid:0e55e87d-8475-4c92-89e7-d62f97ce9ec2> a geojson:Feature ;
    geojson:topology [ a topo:Face ;
            topo:rings ( [ a topo:Ring ;
                        topo:directedReferences ( <uuid:fb28f3f2-8ea7-4c03-bff5-7352addba8b3> <uuid:07093c51-5d4e-42ad-941f-8eeb89e5ae78> <uuid:fb03276b-4250-4d52-81e1-035a0bd92895> <uuid:c97ac36d-9cf3-48ca-bb8f-c36cb335bebf> ) ] ) ] .

<uuid:16c13b7b-aeda-4130-a793-d63f62bcc75b> a geojson:Feature ;
    geojson:topology [ a topo:Face ;
            topo:rings ( [ a topo:Ring ;
                        topo:directedReferences ( <uuid:f0249395-1d12-42d1-bdaf-08c5cc29b2d4> <uuid:90e3950e-40b2-4d9d-a135-1a4b708305aa> <uuid:736411fb-67f0-47c0-bf77-bf4f9048bcda> <uuid:651bb558-f6d6-439f-a8e0-dd5c3385dc94> <uuid:36b10bf3-9e3a-49cb-9dc5-7e31ade26d17> ) ] ) ] .

<uuid:2497a842-0932-4fe5-ac1a-2f773473f338> a geojson:Feature ;
    geojson:topology [ a topo:Face ;
            topo:rings ( [ a topo:Ring ;
                        topo:directedReferences ( <uuid:b4c7d3ff-cf1f-40c1-8ea0-2cd2c09cc0e0> <uuid:07093c51-5d4e-42ad-941f-8eeb89e5ae78> <uuid:6aab9ba2-327e-40df-96c2-0ea43c538c24> <uuid:5a36c75b-053b-4d7b-b512-6777786d6180> <uuid:13dd8184-f73e-4d9f-9977-3e573274fccc> <uuid:71af0dde-7fc9-4290-9624-119e91f422ea> ) ] ) ] .

<uuid:31d8f2b5-cc74-4f72-b230-d27dad0fd589> a geojson:Feature ;
    geojson:topology [ a topo:Face ;
            topo:rings ( [ a topo:Ring ;
                        topo:directedReferences ( <uuid:79205d80-72e5-4bd8-9c03-9503e4e690cc> <uuid:06babc8d-f0d6-43eb-bfad-931055bae084> <uuid:fc877bbe-72a8-4e59-b959-010e6660984a> <uuid:c12882ea-089f-4616-942c-ceb8fb4ac05e> ) ] ) ] .

<uuid:4a294022-4864-49c7-8cee-f9e43360bc4e> a geojson:Feature ;
    geojson:topology [ a topo:Face ;
            topo:rings ( [ a topo:Ring ;
                        topo:directedReferences ( <uuid:32e82eb1-93a4-4387-8cd0-9616ebf1e39b> <uuid:83ff2cdf-6c58-4e7b-ba55-e084eff8c569> <uuid:8582d9c2-6053-495a-8413-f5493691c0de> <uuid:120defbd-2e05-4ec3-ba3c-ffee086d2add> ) ] ) ] .

<uuid:4ac3b91b-eeb7-428c-b5e9-7e8a3f0998ae> a geojson:Feature ;
    geojson:topology [ a topo:Face ;
            topo:rings ( [ a topo:Ring ;
                        topo:directedReferences ( <uuid:c60507ba-226b-4e49-a702-e9afef899b23> <uuid:7dc1cc1c-8e7f-4666-9f52-4e6c2e6f57ac> <uuid:83ff2cdf-6c58-4e7b-ba55-e084eff8c569> <uuid:d69c596c-134e-4216-9bf6-d0f10e6886d8> ) ] ) ] .

<uuid:5bcee2b5-be9b-47d6-9a8b-35dac021f661> a geojson:Feature ;
    geojson:topology [ a topo:Face ;
            topo:rings ( [ a topo:Ring ;
                        topo:directedReferences ( <uuid:4ad210b7-5de5-4732-af7c-978de28f988b> <uuid:fe0704c2-5d2a-49a8-b507-e98c4047d8c4> <uuid:651bb558-f6d6-439f-a8e0-dd5c3385dc94> <uuid:61f99921-a94d-4e0d-8353-f027d76227c5> <uuid:aafd209b-cd13-401a-83f5-26751a02cffe> <uuid:79205d80-72e5-4bd8-9c03-9503e4e690cc> ) ] ) ] .

<uuid:607a3363-3eb7-4ce6-a633-86d2e565692b> a geojson:Feature ;
    geojson:topology [ a topo:Face ;
            topo:rings ( [ a topo:Ring ;
                        topo:directedReferences ( <uuid:8582d9c2-6053-495a-8413-f5493691c0de> <uuid:7dc1cc1c-8e7f-4666-9f52-4e6c2e6f57ac> <uuid:4c2a6434-03b0-4aa2-85ea-a9fcaea41555> <uuid:921e2351-efbf-48be-85d3-eedc0dc2ddc0> <uuid:73f88b47-78ab-474d-9c62-73dfefd0dd5d> <uuid:7aa2a76d-9d5c-4540-9f2e-d8bcf36fadb5> ) ] ) ] .

<uuid:65959e29-11cb-4568-904d-61c4a7c17b98> a geojson:Feature ;
    geojson:topology [ a topo:Face ;
            topo:rings ( [ a topo:Ring ;
                        topo:directedReferences ( <uuid:aafd209b-cd13-401a-83f5-26751a02cffe> <uuid:2f3bbe39-01e3-4c96-8dea-377e38729a03> <uuid:830b9098-d914-4e8b-869d-4d20f1eb5c81> <uuid:9238cbda-d019-4b57-8319-0cc355656802> <uuid:06babc8d-f0d6-43eb-bfad-931055bae084> ) ] ) ] .

<uuid:66a430c0-123f-42df-9d11-64347362bcb3> a geojson:Feature ;
    geojson:topology [ a topo:Face ;
            topo:rings ( [ a topo:Ring ;
                        topo:directedReferences ( <uuid:4ad210b7-5de5-4732-af7c-978de28f988b> <uuid:c12882ea-089f-4616-942c-ceb8fb4ac05e> <uuid:4406e3f5-89dc-463b-84e4-487490f71f1a> <uuid:511c6e7d-728b-4f1f-9763-9461eb628586> ) ] ) ] .

<uuid:67842d3a-7c79-4f2a-8630-744711071e93> a geojson:Feature ;
    geojson:topology [ a topo:Face ;
            topo:rings ( [ a topo:Ring ;
                        topo:directedReferences ( <uuid:a604828d-a36b-4fac-ba6f-6160ade95301> <uuid:ec374b67-eb42-4c53-b5cc-0f919edb2635> <uuid:36b10bf3-9e3a-49cb-9dc5-7e31ade26d17> <uuid:651bb558-f6d6-439f-a8e0-dd5c3385dc94> <uuid:fe0704c2-5d2a-49a8-b507-e98c4047d8c4> ) ] ) ] .

<uuid:6a5ff199-56a7-4e65-94b5-bfdf2ae3449d> a geojson:Feature ;
    geojson:topology [ a topo:Face ;
            topo:rings ( [ a topo:Ring ;
                        topo:directedReferences ( <uuid:f921656a-58e3-4375-bdff-ac8019f524cf> <uuid:e0416983-f0db-4c99-8a72-3f8b4615ab05> <uuid:c97ac36d-9cf3-48ca-bb8f-c36cb335bebf> <uuid:af347f25-a547-477c-b246-cb810756d4dc> <uuid:21388b1b-dcba-46c0-8166-8ffc9c07e50b> <uuid:921e2351-efbf-48be-85d3-eedc0dc2ddc0> ) ] ) ] .

<uuid:786e8738-1690-426d-8e2f-f5e734336a67> a geojson:Feature ;
    geojson:topology [ a topo:Face ;
            topo:rings ( [ a topo:Ring ;
                        topo:directedReferences ( <uuid:8601e9ea-c48f-4c00-a066-f950ed6b0724> <uuid:21388b1b-dcba-46c0-8166-8ffc9c07e50b> <uuid:73f88b47-78ab-474d-9c62-73dfefd0dd5d> <uuid:46fd1def-a93e-4c99-9868-172cf1b40ff1> <uuid:90e3950e-40b2-4d9d-a135-1a4b708305aa> ) ] ) ] .

<uuid:802ff3d8-b8da-423f-8a02-7b2288485edd> a geojson:Feature ;
    geojson:topology [ a topo:Face ;
            topo:rings ( [ a topo:Ring ;
                        topo:directedReferences ( <uuid:38499704-81f7-4d47-965f-435e0b7b0850> <uuid:120defbd-2e05-4ec3-ba3c-ffee086d2add> <uuid:b6e30631-9768-4020-8947-c32137328216> <uuid:fb03276b-4250-4d52-81e1-035a0bd92895> ) ] ) ] .

<uuid:9d67557a-e130-4a47-b63d-c6a2bdf21fa2> a geojson:Feature ;
    geojson:topology [ a topo:Face ;
            topo:rings ( [ a topo:Ring ;
                        topo:directedReferences ( <uuid:c2a00070-f12b-42f9-b78c-b33daa500873> <uuid:ad13a84c-df97-4b75-9dc1-1ce452249964> <uuid:13dd8184-f73e-4d9f-9977-3e573274fccc> <uuid:7355081e-9fa3-4fb5-ab10-c4efaa41d61f> ) ] ) ] .

<uuid:9ed21e0a-b062-4000-88e2-50bd9153e417> a geojson:Feature ;
    geojson:topology [ a topo:Face ;
            topo:rings ( [ a topo:Ring ;
                        topo:directedReferences ( <uuid:b6e30631-9768-4020-8947-c32137328216> <uuid:7aa2a76d-9d5c-4540-9f2e-d8bcf36fadb5> <uuid:73f88b47-78ab-474d-9c62-73dfefd0dd5d> <uuid:21388b1b-dcba-46c0-8166-8ffc9c07e50b> <uuid:af347f25-a547-477c-b246-cb810756d4dc> ) ] ) ] .

<uuid:a2117d6b-4621-4a6b-9809-9fab3dfc4ff0> a geojson:Feature ;
    geojson:topology [ a topo:Face ;
            topo:rings ( [ a topo:Ring ;
                        topo:directedReferences ( <uuid:3fef75ce-8c4c-4d89-a47f-65977debaee0> <uuid:48b52144-aaa0-42a1-8e7a-40bebfcf9985> <uuid:71af0dde-7fc9-4290-9624-119e91f422ea> <uuid:ad13a84c-df97-4b75-9dc1-1ce452249964> ) ] ) ] .

<uuid:a22a6c54-306e-44bc-9b94-6c32c705e63e> a geojson:Feature ;
    geojson:topology [ a topo:Face ;
            topo:rings ( [ a topo:Ring ;
                        topo:directedReferences ( <uuid:508f66b5-e0cb-489c-ae24-21bfb7c09280> <uuid:91cdc345-f745-4643-bc88-a24f8e2216b0> <uuid:38499704-81f7-4d47-965f-435e0b7b0850> <uuid:b4c7d3ff-cf1f-40c1-8ea0-2cd2c09cc0e0> ) ] ) ] .

<uuid:c55c88db-d187-4d7e-9aaa-b9d3dce52663> a geojson:Feature ;
    geojson:topology [ a topo:Face ;
            topo:rings ( [ a topo:Ring ;
                        topo:directedReferences ( <uuid:a5ed4867-4011-4db7-8425-cbe61a6d3a2d> <uuid:745aa367-94b6-4949-a856-5271ec6672e9> <uuid:f921656a-58e3-4375-bdff-ac8019f524cf> <uuid:3b72e45d-d351-46e4-a5b7-9ac9bc339d03> ) ] ) ] .

<uuid:d45fca44-8685-4146-92a5-b84d82fdc838> a geojson:Feature ;
    geojson:topology [ a topo:Face ;
            topo:rings ( [ a topo:Ring ;
                        topo:directedReferences ( <uuid:ed666061-98c5-439d-ab0d-5a792437a873> <uuid:7355081e-9fa3-4fb5-ab10-c4efaa41d61f> <uuid:5a36c75b-053b-4d7b-b512-6777786d6180> <uuid:a5ed4867-4011-4db7-8425-cbe61a6d3a2d> <uuid:2f3bbe39-01e3-4c96-8dea-377e38729a03> ) ] ) ] .

<uuid:dbd99467-ea83-4dff-b03f-eef2aad2687c> a geojson:Feature ;
    geojson:topology [ a topo:Face ;
            topo:rings ( [ a topo:Ring ;
                        topo:directedReferences ( <uuid:745aa367-94b6-4949-a856-5271ec6672e9> <uuid:6aab9ba2-327e-40df-96c2-0ea43c538c24> <uuid:fb28f3f2-8ea7-4c03-bff5-7352addba8b3> <uuid:e0416983-f0db-4c99-8a72-3f8b4615ab05> ) ] ) ] .

<uuid:e119b096-e589-49bd-b1db-a1182dc2dade> a geojson:Feature ;
    geojson:topology [ a topo:Face ;
            topo:rings ( [ a topo:Ring ;
                        topo:directedReferences ( <uuid:474fef44-eb6e-4e19-a871-433f9bac5650> <uuid:fc8ba01d-faa7-4407-ae92-32b584c8a6a3> <uuid:f0249395-1d12-42d1-bdaf-08c5cc29b2d4> <uuid:36b10bf3-9e3a-49cb-9dc5-7e31ade26d17> ) ] ) ] .

<uuid:e2efe498-c6d5-4f9c-ac07-4c1c9e406675> a geojson:Feature ;
    geojson:topology [ a topo:Face ;
            topo:rings ( [ a topo:Ring ;
                        topo:directedReferences ( <uuid:d69c596c-134e-4216-9bf6-d0f10e6886d8> <uuid:32e82eb1-93a4-4387-8cd0-9616ebf1e39b> <uuid:91cdc345-f745-4643-bc88-a24f8e2216b0> <uuid:4406e3f5-89dc-463b-84e4-487490f71f1a> <uuid:fc877bbe-72a8-4e59-b959-010e6660984a> <uuid:9238cbda-d019-4b57-8319-0cc355656802> ) ] ) ] .

<uuid:e499fea3-19f7-4863-8a58-751caff7d884> a geojson:Feature ;
    geojson:topology [ a topo:Face ;
            topo:rings ( [ a topo:Ring ;
                        topo:directedReferences ( <uuid:fc8ba01d-faa7-4407-ae92-32b584c8a6a3> <uuid:5f17e211-e8b5-4a7c-85e4-798787fd82a5> <uuid:21388b1b-dcba-46c0-8166-8ffc9c07e50b> <uuid:8601e9ea-c48f-4c00-a066-f950ed6b0724> ) ] ) ] .

<uuid:f1c1a636-d6ab-414c-a0aa-855fc7e85e1f> a geojson:Feature ;
    geojson:topology [ a topo:Face ;
            topo:rings ( [ a topo:Ring ;
                        topo:directedReferences ( <uuid:508f66b5-e0cb-489c-ae24-21bfb7c09280> <uuid:48b52144-aaa0-42a1-8e7a-40bebfcf9985> <uuid:a604828d-a36b-4fac-ba6f-6160ade95301> <uuid:511c6e7d-728b-4f1f-9763-9461eb628586> ) ] ) ] .

<uuid:f3338301-b0e3-401c-af23-41ac2ae8e969> a geojson:Feature ;
    geojson:topology [ a topo:Face ;
            topo:rings ( [ a topo:Ring ;
                        topo:directedReferences ( <uuid:736411fb-67f0-47c0-bf77-bf4f9048bcda> <uuid:7da1c2fe-f798-43cc-af44-ac63f968139c> <uuid:474fef44-eb6e-4e19-a871-433f9bac5650> <uuid:651bb558-f6d6-439f-a8e0-dd5c3385dc94> ) ] ) ] .

<uuid:fe522919-1421-4fd1-9930-8c6551e3f2a5> a geojson:Feature ;
    geojson:topology [ a topo:Face ;
            topo:rings ( [ a topo:Ring ;
                        topo:directedReferences ( <uuid:7da1c2fe-f798-43cc-af44-ac63f968139c> <uuid:46fd1def-a93e-4c99-9868-172cf1b40ff1> <uuid:73f88b47-78ab-474d-9c62-73dfefd0dd5d> <uuid:5f17e211-e8b5-4a7c-85e4-798787fd82a5> ) ] ) ] .

<uuid:06babc8d-f0d6-43eb-bfad-931055bae084> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:20d3c864-4a8c-4440-b600-a1d424e92f51> <uuid:2b34e214-cba7-4a66-8443-ceb932c5ef09> ) ] .

<uuid:13dd8184-f73e-4d9f-9977-3e573274fccc> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:8e503e04-ad51-423b-8102-708a845189b6> <uuid:8cda5c68-9c82-43b4-84d7-979efa36dfe1> ) ] .

<uuid:2387ae98-9236-42fe-9414-c45b99954c41> a geojson:Feature ;
    geojson:topology [ a topo:Face ;
            topo:rings ( [ a topo:Ring ;
                        topo:directedReferences ( <uuid:856e43bc-ee35-44d0-b25e-ea94a53e1db6> <uuid:7da1c2fe-f798-43cc-af44-ac63f968139c> <uuid:ed6b8b1c-7030-4d70-ab61-94cb3aa904a7> <uuid:830b9098-d914-4e8b-869d-4d20f1eb5c81> <uuid:d69c596c-134e-4216-9bf6-d0f10e6886d8> <uuid:32e82eb1-93a4-4387-8cd0-9616ebf1e39b> ) ] ) ] .

<uuid:38499704-81f7-4d47-965f-435e0b7b0850> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:b8412dad-b40a-4e35-9f42-f983e0fce39d> <uuid:a0ec1bfd-0f7a-4c42-bc71-bacdcd44071d> ) ] .

<uuid:3c1f5c4b-d842-40b6-a332-99d50015fa8f> a geojson:Feature ;
    geojson:topology [ a topo:Face ;
            topo:rings ( [ a topo:Ring ;
                        topo:directedReferences ( <uuid:ed6b8b1c-7030-4d70-ab61-94cb3aa904a7> <uuid:5f17e211-e8b5-4a7c-85e4-798787fd82a5> <uuid:921e2351-efbf-48be-85d3-eedc0dc2ddc0> <uuid:3b72e45d-d351-46e4-a5b7-9ac9bc339d03> ) ] ) ] .

<uuid:3f5c452f-9815-4b21-9b2d-0127ae80c385> a geojson:Feature ;
    geojson:topology [ a topo:Face ;
            topo:rings ( [ a topo:Ring ;
                        topo:directedReferences ( <uuid:242a8400-a076-4817-86c6-acd56087cec6> <uuid:8601e9ea-c48f-4c00-a066-f950ed6b0724> <uuid:af347f25-a547-477c-b246-cb810756d4dc> <uuid:fb03276b-4250-4d52-81e1-035a0bd92895> ) ] ) ] .

<uuid:3fef75ce-8c4c-4d89-a47f-65977debaee0> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:b6d10150-f9d4-4f7e-b028-c4bbee8e7717> <uuid:a3b19f96-9bca-4c31-ac7e-4cb1615878df> ) ] .

<uuid:4406e3f5-89dc-463b-84e4-487490f71f1a> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:c060c1dc-6544-4595-b583-72ecf603fd6d> <uuid:7fe8cb9b-976e-4344-bf72-f3721d878ba4> ) ] .

<uuid:4ad210b7-5de5-4732-af7c-978de28f988b> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:ff685e16-64f8-4f41-8a9e-7d8e83312fd6> <uuid:92bd9ed9-c138-45c3-b72c-a9ecb7f7cfe9> ) ] .

<uuid:4ba85faa-3935-4e89-a9f8-dcd647a5dbed> a geojson:Feature ;
    geojson:topology [ a topo:Face ;
            topo:rings ( [ a topo:Ring ;
                        topo:directedReferences ( <uuid:856e43bc-ee35-44d0-b25e-ea94a53e1db6> <uuid:120defbd-2e05-4ec3-ba3c-ffee086d2add> <uuid:7aa2a76d-9d5c-4540-9f2e-d8bcf36fadb5> <uuid:46fd1def-a93e-4c99-9868-172cf1b40ff1> ) ] ) ] .

<uuid:4c2a6434-03b0-4aa2-85ea-a9fcaea41555> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:5e08b82a-8efb-447c-b5c2-54f8ff5788b3> <uuid:8d2be28b-8f31-46de-99cb-4d8709502cd0> ) ] .

<uuid:508f66b5-e0cb-489c-ae24-21bfb7c09280> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:7fe8cb9b-976e-4344-bf72-f3721d878ba4> <uuid:793997c5-bcc4-4610-984b-6cf2c2997348> ) ] .

<uuid:56283886-1f4c-448c-b785-80fb9740a9cc> a geojson:Feature ;
    geojson:topology [ a topo:Face ;
            topo:rings ( [ a topo:Ring ;
                        topo:directedReferences ( <uuid:736411fb-67f0-47c0-bf77-bf4f9048bcda> <uuid:fe0704c2-5d2a-49a8-b507-e98c4047d8c4> <uuid:511c6e7d-728b-4f1f-9763-9461eb628586> <uuid:91cdc345-f745-4643-bc88-a24f8e2216b0> <uuid:856e43bc-ee35-44d0-b25e-ea94a53e1db6> ) ] ) ] .

<uuid:5a36c75b-053b-4d7b-b512-6777786d6180> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:8cda5c68-9c82-43b4-84d7-979efa36dfe1> <uuid:e7300a01-f8c1-4351-9511-02790a5376b0> ) ] .

<uuid:71af0dde-7fc9-4290-9624-119e91f422ea> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:793997c5-bcc4-4610-984b-6cf2c2997348> <uuid:8e503e04-ad51-423b-8102-708a845189b6> ) ] .

<uuid:7355081e-9fa3-4fb5-ab10-c4efaa41d61f> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:ca62577e-8e24-4af2-88bf-33b34e25e606> <uuid:8cda5c68-9c82-43b4-84d7-979efa36dfe1> ) ] .

<uuid:745aa367-94b6-4949-a856-5271ec6672e9> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:e7300a01-f8c1-4351-9511-02790a5376b0> <uuid:1e20237c-9dfa-4251-9f3f-cc5e56a5becd> ) ] .

<uuid:79205d80-72e5-4bd8-9c03-9503e4e690cc> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:92bd9ed9-c138-45c3-b72c-a9ecb7f7cfe9> <uuid:20d3c864-4a8c-4440-b600-a1d424e92f51> ) ] .

<uuid:7dc1cc1c-8e7f-4666-9f52-4e6c2e6f57ac> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:8d2be28b-8f31-46de-99cb-4d8709502cd0> <uuid:c611f840-2829-44b2-b367-3915ca7875a4> ) ] .

<uuid:83ff2cdf-6c58-4e7b-ba55-e084eff8c569> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:c611f840-2829-44b2-b367-3915ca7875a4> <uuid:fad324b9-801f-40f4-b65b-91f8753e9698> ) ] .

<uuid:8582d9c2-6053-495a-8413-f5493691c0de> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:c611f840-2829-44b2-b367-3915ca7875a4> <uuid:11caaac5-b631-4bd8-a6af-f82cb6371071> ) ] .

<uuid:90e3950e-40b2-4d9d-a135-1a4b708305aa> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:1d2a5d01-8547-4de6-abea-8f9ab994d35e> <uuid:87373f95-ee4b-4471-9980-f4a8258ee1e3> ) ] .

<uuid:91ce0c52-11c3-4e32-8bcc-dea958a3969e> a geojson:Feature ;
    geojson:topology [ a topo:Face ;
            topo:rings ( [ a topo:Ring ;
                        topo:directedReferences ( <uuid:474fef44-eb6e-4e19-a871-433f9bac5650> <uuid:ed6b8b1c-7030-4d70-ab61-94cb3aa904a7> <uuid:2f3bbe39-01e3-4c96-8dea-377e38729a03> <uuid:61f99921-a94d-4e0d-8353-f027d76227c5> ) ] ) ] .

<uuid:9238cbda-d019-4b57-8319-0cc355656802> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:ad6d8fcc-402c-482e-8f1a-7492ccaead38> <uuid:2b34e214-cba7-4a66-8443-ceb932c5ef09> ) ] .

<uuid:9e4c0c0e-6acf-401b-b35e-0e917ce3a5fc> a geojson:Feature ;
    geojson:topology [ a topo:Face ;
            topo:rings ( [ a topo:Ring ;
                        topo:directedReferences ( <uuid:242a8400-a076-4817-86c6-acd56087cec6> <uuid:07093c51-5d4e-42ad-941f-8eeb89e5ae78> <uuid:6aab9ba2-327e-40df-96c2-0ea43c538c24> <uuid:a5ed4867-4011-4db7-8425-cbe61a6d3a2d> <uuid:ed6b8b1c-7030-4d70-ab61-94cb3aa904a7> <uuid:fc8ba01d-faa7-4407-ae92-32b584c8a6a3> ) ] ) ] .

<uuid:a604828d-a36b-4fac-ba6f-6160ade95301> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:a3b19f96-9bca-4c31-ac7e-4cb1615878df> <uuid:ff685e16-64f8-4f41-8a9e-7d8e83312fd6> ) ] .

<uuid:aafd209b-cd13-401a-83f5-26751a02cffe> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:20d3c864-4a8c-4440-b600-a1d424e92f51> <uuid:16c35df5-bc63-4edd-8da5-dbcc5548a61e> ) ] .

<uuid:ad13a84c-df97-4b75-9dc1-1ce452249964> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:8e503e04-ad51-423b-8102-708a845189b6> <uuid:b6d10150-f9d4-4f7e-b028-c4bbee8e7717> ) ] .

<uuid:b5fd960f-0d14-4257-9182-40de738a7e50> a geojson:Feature ;
    geojson:topology [ a topo:Face ;
            topo:rings ( [ a topo:Ring ;
                        topo:directedReferences ( <uuid:f0249395-1d12-42d1-bdaf-08c5cc29b2d4> <uuid:242a8400-a076-4817-86c6-acd56087cec6> <uuid:b4c7d3ff-cf1f-40c1-8ea0-2cd2c09cc0e0> <uuid:48b52144-aaa0-42a1-8e7a-40bebfcf9985> <uuid:ec374b67-eb42-4c53-b5cc-0f919edb2635> ) ] ) ] .

<uuid:b6e30631-9768-4020-8947-c32137328216> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:9a1d8124-ca37-4abd-b07e-bff4c8eaa2f9> <uuid:11caaac5-b631-4bd8-a6af-f82cb6371071> ) ] .

<uuid:c12882ea-089f-4616-942c-ceb8fb4ac05e> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:92bd9ed9-c138-45c3-b72c-a9ecb7f7cfe9> <uuid:c060c1dc-6544-4595-b583-72ecf603fd6d> ) ] .

<uuid:c2a00070-f12b-42f9-b78c-b33daa500873> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:ca62577e-8e24-4af2-88bf-33b34e25e606> <uuid:b6d10150-f9d4-4f7e-b028-c4bbee8e7717> ) ] .

<uuid:c60507ba-226b-4e49-a702-e9afef899b23> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:ad6d8fcc-402c-482e-8f1a-7492ccaead38> <uuid:8d2be28b-8f31-46de-99cb-4d8709502cd0> ) ] .

<uuid:c97ac36d-9cf3-48ca-bb8f-c36cb335bebf> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:9a1d8124-ca37-4abd-b07e-bff4c8eaa2f9> <uuid:3c08ae4e-7b27-4e95-8bfb-6b42451be8f6> ) ] .

<uuid:e0416983-f0db-4c99-8a72-3f8b4615ab05> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:3c08ae4e-7b27-4e95-8bfb-6b42451be8f6> <uuid:1e20237c-9dfa-4251-9f3f-cc5e56a5becd> ) ] .

<uuid:ed666061-98c5-439d-ab0d-5a792437a873> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:16c35df5-bc63-4edd-8da5-dbcc5548a61e> <uuid:ca62577e-8e24-4af2-88bf-33b34e25e606> ) ] .

<uuid:f921656a-58e3-4375-bdff-ac8019f524cf> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:1e20237c-9dfa-4251-9f3f-cc5e56a5becd> <uuid:5e08b82a-8efb-447c-b5c2-54f8ff5788b3> ) ] .

<uuid:fb28f3f2-8ea7-4c03-bff5-7352addba8b3> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:3c08ae4e-7b27-4e95-8bfb-6b42451be8f6> <uuid:307b7db6-8014-4628-b80e-ff925bf71168> ) ] .

<uuid:fc877bbe-72a8-4e59-b959-010e6660984a> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:2b34e214-cba7-4a66-8443-ceb932c5ef09> <uuid:c060c1dc-6544-4595-b583-72ecf603fd6d> ) ] .

<uuid:07093c51-5d4e-42ad-941f-8eeb89e5ae78> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:307b7db6-8014-4628-b80e-ff925bf71168> <uuid:b8412dad-b40a-4e35-9f42-f983e0fce39d> ) ] .

<uuid:120defbd-2e05-4ec3-ba3c-ffee086d2add> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:11caaac5-b631-4bd8-a6af-f82cb6371071> <uuid:a0ec1bfd-0f7a-4c42-bc71-bacdcd44071d> ) ] .

<uuid:1e20237c-9dfa-4251-9f3f-cc5e56a5becd> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 2e+00 1e+01 6e+00 ) ] .

<uuid:206806a4-a2f8-4c04-858e-99d289858a40> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 1.2e+01 6e+00 0e+00 ) ] .

<uuid:20d3c864-4a8c-4440-b600-a1d424e92f51> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 2e+01 1e+01 0e+00 ) ] .

<uuid:242a8400-a076-4817-86c6-acd56087cec6> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:1d2a5d01-8547-4de6-abea-8f9ab994d35e> <uuid:b8412dad-b40a-4e35-9f42-f983e0fce39d> ) ] .

<uuid:2b34e214-cba7-4a66-8443-ceb932c5ef09> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 2e+01 1e+01 3e+00 ) ] .

<uuid:2f3bbe39-01e3-4c96-8dea-377e38729a03> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:16c35df5-bc63-4edd-8da5-dbcc5548a61e> <uuid:22138e52-65ef-4773-b69d-5ea2628fad7b> ) ] .

<uuid:307b7db6-8014-4628-b80e-ff925bf71168> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 2e+00 2e+00 3e+00 ) ] .

<uuid:32e82eb1-93a4-4387-8cd0-9616ebf1e39b> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:a0ec1bfd-0f7a-4c42-bc71-bacdcd44071d> <uuid:fad324b9-801f-40f4-b65b-91f8753e9698> ) ] .

<uuid:3b72e45d-d351-46e4-a5b7-9ac9bc339d03> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:22138e52-65ef-4773-b69d-5ea2628fad7b> <uuid:5e08b82a-8efb-447c-b5c2-54f8ff5788b3> ) ] .

<uuid:3c08ae4e-7b27-4e95-8bfb-6b42451be8f6> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 2e+00 2e+00 6e+00 ) ] .

<uuid:46fd1def-a93e-4c99-9868-172cf1b40ff1> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:87373f95-ee4b-4471-9980-f4a8258ee1e3> <uuid:8087116e-84cc-44d1-8047-78dc3837d7e8> ) ] .

<uuid:474fef44-eb6e-4e19-a871-433f9bac5650> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:f34d9f2e-4180-41de-a613-46f78f4c178f> <uuid:d8d136c6-604c-4ad3-adf7-b0a7e04d034a> ) ] .

<uuid:48b52144-aaa0-42a1-8e7a-40bebfcf9985> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:a3b19f96-9bca-4c31-ac7e-4cb1615878df> <uuid:793997c5-bcc4-4610-984b-6cf2c2997348> ) ] .

<uuid:511c6e7d-728b-4f1f-9763-9461eb628586> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:7fe8cb9b-976e-4344-bf72-f3721d878ba4> <uuid:ff685e16-64f8-4f41-8a9e-7d8e83312fd6> ) ] .

<uuid:5f17e211-e8b5-4a7c-85e4-798787fd82a5> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:f34d9f2e-4180-41de-a613-46f78f4c178f> <uuid:62a26df3-3e19-49bf-9ee4-24dbeb814a70> ) ] .

<uuid:61f99921-a94d-4e0d-8353-f027d76227c5> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:16c35df5-bc63-4edd-8da5-dbcc5548a61e> <uuid:d8d136c6-604c-4ad3-adf7-b0a7e04d034a> ) ] .

<uuid:6aab9ba2-327e-40df-96c2-0ea43c538c24> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:e7300a01-f8c1-4351-9511-02790a5376b0> <uuid:307b7db6-8014-4628-b80e-ff925bf71168> ) ] .

<uuid:736411fb-67f0-47c0-bf77-bf4f9048bcda> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:87373f95-ee4b-4471-9980-f4a8258ee1e3> <uuid:206806a4-a2f8-4c04-858e-99d289858a40> ) ] .

<uuid:7aa2a76d-9d5c-4540-9f2e-d8bcf36fadb5> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:8087116e-84cc-44d1-8047-78dc3837d7e8> <uuid:11caaac5-b631-4bd8-a6af-f82cb6371071> ) ] .

<uuid:7da1c2fe-f798-43cc-af44-ac63f968139c> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:f34d9f2e-4180-41de-a613-46f78f4c178f> <uuid:87373f95-ee4b-4471-9980-f4a8258ee1e3> ) ] .

<uuid:8087116e-84cc-44d1-8047-78dc3837d7e8> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 1.2e+01 6e+00 6e+00 ) ] .

<uuid:830b9098-d914-4e8b-869d-4d20f1eb5c81> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:ad6d8fcc-402c-482e-8f1a-7492ccaead38> <uuid:22138e52-65ef-4773-b69d-5ea2628fad7b> ) ] .

<uuid:856e43bc-ee35-44d0-b25e-ea94a53e1db6> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:a0ec1bfd-0f7a-4c42-bc71-bacdcd44071d> <uuid:87373f95-ee4b-4471-9980-f4a8258ee1e3> ) ] .

<uuid:8601e9ea-c48f-4c00-a066-f950ed6b0724> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:caa6045e-4189-4571-8914-1189e51ac71e> <uuid:1d2a5d01-8547-4de6-abea-8f9ab994d35e> ) ] .

<uuid:8cda5c68-9c82-43b4-84d7-979efa36dfe1> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 0e+00 1e+01 3e+00 ) ] .

<uuid:8d2be28b-8f31-46de-99cb-4d8709502cd0> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 1.8e+01 1e+01 6e+00 ) ] .

<uuid:8e503e04-ad51-423b-8102-708a845189b6> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 0e+00 0e+00 3e+00 ) ] .

<uuid:91cdc345-f745-4643-bc88-a24f8e2216b0> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:a0ec1bfd-0f7a-4c42-bc71-bacdcd44071d> <uuid:7fe8cb9b-976e-4344-bf72-f3721d878ba4> ) ] .

<uuid:921e2351-efbf-48be-85d3-eedc0dc2ddc0> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:5e08b82a-8efb-447c-b5c2-54f8ff5788b3> <uuid:62a26df3-3e19-49bf-9ee4-24dbeb814a70> ) ] .

<uuid:92bd9ed9-c138-45c3-b72c-a9ecb7f7cfe9> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 2e+01 0e+00 0e+00 ) ] .

<uuid:9ef3d2ea-acea-4365-8bd5-2f8ef3036ed0> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 8e+00 6e+00 0e+00 ) ] .

<uuid:a5ed4867-4011-4db7-8425-cbe61a6d3a2d> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:22138e52-65ef-4773-b69d-5ea2628fad7b> <uuid:e7300a01-f8c1-4351-9511-02790a5376b0> ) ] .

<uuid:af347f25-a547-477c-b246-cb810756d4dc> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:9a1d8124-ca37-4abd-b07e-bff4c8eaa2f9> <uuid:caa6045e-4189-4571-8914-1189e51ac71e> ) ] .

<uuid:b4c7d3ff-cf1f-40c1-8ea0-2cd2c09cc0e0> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:793997c5-bcc4-4610-984b-6cf2c2997348> <uuid:b8412dad-b40a-4e35-9f42-f983e0fce39d> ) ] .

<uuid:b6d10150-f9d4-4f7e-b028-c4bbee8e7717> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 0e+00 0e+00 0e+00 ) ] .

<uuid:c060c1dc-6544-4595-b583-72ecf603fd6d> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 2e+01 0e+00 3e+00 ) ] .

<uuid:c611f840-2829-44b2-b367-3915ca7875a4> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 1.8e+01 2e+00 6e+00 ) ] .

<uuid:ca62577e-8e24-4af2-88bf-33b34e25e606> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 0e+00 1e+01 0e+00 ) ] .

<uuid:caa6045e-4189-4571-8914-1189e51ac71e> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 8e+00 6e+00 6e+00 ) ] .

<uuid:d69c596c-134e-4216-9bf6-d0f10e6886d8> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:fad324b9-801f-40f4-b65b-91f8753e9698> <uuid:ad6d8fcc-402c-482e-8f1a-7492ccaead38> ) ] .

<uuid:ec374b67-eb42-4c53-b5cc-0f919edb2635> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:a3b19f96-9bca-4c31-ac7e-4cb1615878df> <uuid:9ef3d2ea-acea-4365-8bd5-2f8ef3036ed0> ) ] .

<uuid:f0249395-1d12-42d1-bdaf-08c5cc29b2d4> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:9ef3d2ea-acea-4365-8bd5-2f8ef3036ed0> <uuid:1d2a5d01-8547-4de6-abea-8f9ab994d35e> ) ] .

<uuid:fad324b9-801f-40f4-b65b-91f8753e9698> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 1.8e+01 2e+00 3e+00 ) ] .

<uuid:fb03276b-4250-4d52-81e1-035a0bd92895> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:b8412dad-b40a-4e35-9f42-f983e0fce39d> <uuid:9a1d8124-ca37-4abd-b07e-bff4c8eaa2f9> ) ] .

<uuid:fc8ba01d-faa7-4407-ae92-32b584c8a6a3> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:1d2a5d01-8547-4de6-abea-8f9ab994d35e> <uuid:f34d9f2e-4180-41de-a613-46f78f4c178f> ) ] .

<uuid:fe0704c2-5d2a-49a8-b507-e98c4047d8c4> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:206806a4-a2f8-4c04-858e-99d289858a40> <uuid:ff685e16-64f8-4f41-8a9e-7d8e83312fd6> ) ] .

<uuid:11caaac5-b631-4bd8-a6af-f82cb6371071> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 1.2e+01 2e+00 6e+00 ) ] .

<uuid:16c35df5-bc63-4edd-8da5-dbcc5548a61e> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 1e+01 1e+01 0e+00 ) ] .

<uuid:21388b1b-dcba-46c0-8166-8ffc9c07e50b> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:caa6045e-4189-4571-8914-1189e51ac71e> <uuid:62a26df3-3e19-49bf-9ee4-24dbeb814a70> ) ] .

<uuid:36b10bf3-9e3a-49cb-9dc5-7e31ade26d17> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:9ef3d2ea-acea-4365-8bd5-2f8ef3036ed0> <uuid:d8d136c6-604c-4ad3-adf7-b0a7e04d034a> ) ] .

<uuid:5e08b82a-8efb-447c-b5c2-54f8ff5788b3> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 1e+01 1e+01 6e+00 ) ] .

<uuid:62a26df3-3e19-49bf-9ee4-24dbeb814a70> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 1e+01 6e+00 6e+00 ) ] .

<uuid:651bb558-f6d6-439f-a8e0-dd5c3385dc94> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:d8d136c6-604c-4ad3-adf7-b0a7e04d034a> <uuid:206806a4-a2f8-4c04-858e-99d289858a40> ) ] .

<uuid:73f88b47-78ab-474d-9c62-73dfefd0dd5d> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:62a26df3-3e19-49bf-9ee4-24dbeb814a70> <uuid:8087116e-84cc-44d1-8047-78dc3837d7e8> ) ] .

<uuid:793997c5-bcc4-4610-984b-6cf2c2997348> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 8e+00 0e+00 3e+00 ) ] .

<uuid:7fe8cb9b-976e-4344-bf72-f3721d878ba4> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 1.2e+01 0e+00 3e+00 ) ] .

<uuid:9a1d8124-ca37-4abd-b07e-bff4c8eaa2f9> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 8e+00 2e+00 6e+00 ) ] .

<uuid:a3b19f96-9bca-4c31-ac7e-4cb1615878df> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 8e+00 0e+00 0e+00 ) ] .

<uuid:ad6d8fcc-402c-482e-8f1a-7492ccaead38> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 1.8e+01 1e+01 3e+00 ) ] .

<uuid:d8d136c6-604c-4ad3-adf7-b0a7e04d034a> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 1e+01 6e+00 0e+00 ) ] .

<uuid:e7300a01-f8c1-4351-9511-02790a5376b0> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 2e+00 1e+01 3e+00 ) ] .

<uuid:ed6b8b1c-7030-4d70-ab61-94cb3aa904a7> a geojson:Feature ;
    topo:orientation "+",
        "-" ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:22138e52-65ef-4773-b69d-5ea2628fad7b> <uuid:f34d9f2e-4180-41de-a613-46f78f4c178f> ) ] .

<uuid:ff685e16-64f8-4f41-8a9e-7d8e83312fd6> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 1.2e+01 0e+00 0e+00 ) ] .

<uuid:1d2a5d01-8547-4de6-abea-8f9ab994d35e> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 8e+00 6e+00 3e+00 ) ] .

<uuid:22138e52-65ef-4773-b69d-5ea2628fad7b> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 1e+01 1e+01 3e+00 ) ] .

<uuid:87373f95-ee4b-4471-9980-f4a8258ee1e3> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 1.2e+01 6e+00 3e+00 ) ] .

<uuid:a0ec1bfd-0f7a-4c42-bc71-bacdcd44071d> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 1.2e+01 2e+00 3e+00 ) ] .

<uuid:b8412dad-b40a-4e35-9f42-f983e0fce39d> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 8e+00 2e+00 3e+00 ) ] .

<uuid:f34d9f2e-4180-41de-a613-46f78f4c178f> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 1e+01 6e+00 3e+00 ) ] .

[] topo:edges ( <uuid:c60507ba-226b-4e49-a702-e9afef899b23> <uuid:7dc1cc1c-8e7f-4666-9f52-4e6c2e6f57ac> <uuid:83ff2cdf-6c58-4e7b-ba55-e084eff8c569> <uuid:d69c596c-134e-4216-9bf6-d0f10e6886d8> <uuid:32e82eb1-93a4-4387-8cd0-9616ebf1e39b> <uuid:8582d9c2-6053-495a-8413-f5493691c0de> <uuid:120defbd-2e05-4ec3-ba3c-ffee086d2add> <uuid:4c2a6434-03b0-4aa2-85ea-a9fcaea41555> <uuid:830b9098-d914-4e8b-869d-4d20f1eb5c81> <uuid:3b72e45d-d351-46e4-a5b7-9ac9bc339d03> <uuid:921e2351-efbf-48be-85d3-eedc0dc2ddc0> <uuid:73f88b47-78ab-474d-9c62-73dfefd0dd5d> <uuid:7aa2a76d-9d5c-4540-9f2e-d8bcf36fadb5> <uuid:ed6b8b1c-7030-4d70-ab61-94cb3aa904a7> <uuid:5f17e211-e8b5-4a7c-85e4-798787fd82a5> <uuid:7da1c2fe-f798-43cc-af44-ac63f968139c> <uuid:46fd1def-a93e-4c99-9868-172cf1b40ff1> <uuid:856e43bc-ee35-44d0-b25e-ea94a53e1db6> <uuid:a5ed4867-4011-4db7-8425-cbe61a6d3a2d> <uuid:745aa367-94b6-4949-a856-5271ec6672e9> <uuid:f921656a-58e3-4375-bdff-ac8019f524cf> <uuid:6aab9ba2-327e-40df-96c2-0ea43c538c24> <uuid:fb28f3f2-8ea7-4c03-bff5-7352addba8b3> <uuid:e0416983-f0db-4c99-8a72-3f8b4615ab05> <uuid:07093c51-5d4e-42ad-941f-8eeb89e5ae78> <uuid:fb03276b-4250-4d52-81e1-035a0bd92895> <uuid:c97ac36d-9cf3-48ca-bb8f-c36cb335bebf> <uuid:af347f25-a547-477c-b246-cb810756d4dc> <uuid:21388b1b-dcba-46c0-8166-8ffc9c07e50b> <uuid:fc8ba01d-faa7-4407-ae92-32b584c8a6a3> <uuid:8601e9ea-c48f-4c00-a066-f950ed6b0724> <uuid:242a8400-a076-4817-86c6-acd56087cec6> <uuid:4ad210b7-5de5-4732-af7c-978de28f988b> <uuid:c12882ea-089f-4616-942c-ceb8fb4ac05e> <uuid:4406e3f5-89dc-463b-84e4-487490f71f1a> <uuid:511c6e7d-728b-4f1f-9763-9461eb628586> <uuid:79205d80-72e5-4bd8-9c03-9503e4e690cc> <uuid:06babc8d-f0d6-43eb-bfad-931055bae084> <uuid:fc877bbe-72a8-4e59-b959-010e6660984a> <uuid:aafd209b-cd13-401a-83f5-26751a02cffe> <uuid:2f3bbe39-01e3-4c96-8dea-377e38729a03> <uuid:9238cbda-d019-4b57-8319-0cc355656802> <uuid:91cdc345-f745-4643-bc88-a24f8e2216b0> <uuid:fe0704c2-5d2a-49a8-b507-e98c4047d8c4> <uuid:651bb558-f6d6-439f-a8e0-dd5c3385dc94> <uuid:61f99921-a94d-4e0d-8353-f027d76227c5> <uuid:474fef44-eb6e-4e19-a871-433f9bac5650> <uuid:736411fb-67f0-47c0-bf77-bf4f9048bcda> <uuid:3fef75ce-8c4c-4d89-a47f-65977debaee0> <uuid:48b52144-aaa0-42a1-8e7a-40bebfcf9985> <uuid:71af0dde-7fc9-4290-9624-119e91f422ea> <uuid:ad13a84c-df97-4b75-9dc1-1ce452249964> <uuid:c2a00070-f12b-42f9-b78c-b33daa500873> <uuid:13dd8184-f73e-4d9f-9977-3e573274fccc> <uuid:7355081e-9fa3-4fb5-ab10-c4efaa41d61f> <uuid:ed666061-98c5-439d-ab0d-5a792437a873> <uuid:5a36c75b-053b-4d7b-b512-6777786d6180> <uuid:b4c7d3ff-cf1f-40c1-8ea0-2cd2c09cc0e0> <uuid:36b10bf3-9e3a-49cb-9dc5-7e31ade26d17> <uuid:ec374b67-eb42-4c53-b5cc-0f919edb2635> <uuid:f0249395-1d12-42d1-bdaf-08c5cc29b2d4> <uuid:a604828d-a36b-4fac-ba6f-6160ade95301> <uuid:508f66b5-e0cb-489c-ae24-21bfb7c09280> <uuid:38499704-81f7-4d47-965f-435e0b7b0850> <uuid:b6e30631-9768-4020-8947-c32137328216> <uuid:90e3950e-40b2-4d9d-a135-1a4b708305aa> ) ;
    topo:faces ( <uuid:4ac3b91b-eeb7-428c-b5e9-7e8a3f0998ae> <uuid:4a294022-4864-49c7-8cee-f9e43360bc4e> <uuid:01947f47-ee13-44a9-85a4-2bcb4881982a> <uuid:607a3363-3eb7-4ce6-a633-86d2e565692b> <uuid:3c1f5c4b-d842-40b6-a332-99d50015fa8f> <uuid:fe522919-1421-4fd1-9930-8c6551e3f2a5> <uuid:2387ae98-9236-42fe-9414-c45b99954c41> <uuid:4ba85faa-3935-4e89-a9f8-dcd647a5dbed> <uuid:c55c88db-d187-4d7e-9aaa-b9d3dce52663> <uuid:dbd99467-ea83-4dff-b03f-eef2aad2687c> <uuid:0e55e87d-8475-4c92-89e7-d62f97ce9ec2> <uuid:6a5ff199-56a7-4e65-94b5-bfdf2ae3449d> <uuid:e499fea3-19f7-4863-8a58-751caff7d884> <uuid:9e4c0c0e-6acf-401b-b35e-0e917ce3a5fc> <uuid:3f5c452f-9815-4b21-9b2d-0127ae80c385> <uuid:66a430c0-123f-42df-9d11-64347362bcb3> <uuid:31d8f2b5-cc74-4f72-b230-d27dad0fd589> <uuid:65959e29-11cb-4568-904d-61c4a7c17b98> <uuid:e2efe498-c6d5-4f9c-ac07-4c1c9e406675> <uuid:5bcee2b5-be9b-47d6-9a8b-35dac021f661> <uuid:91ce0c52-11c3-4e32-8bcc-dea958a3969e> <uuid:56283886-1f4c-448c-b785-80fb9740a9cc> <uuid:f3338301-b0e3-401c-af23-41ac2ae8e969> <uuid:a2117d6b-4621-4a6b-9809-9fab3dfc4ff0> <uuid:9d67557a-e130-4a47-b63d-c6a2bdf21fa2> <uuid:d45fca44-8685-4146-92a5-b84d82fdc838> <uuid:2497a842-0932-4fe5-ac1a-2f773473f338> <uuid:04ea47e9-b4dd-4bed-a8f4-4802d1735c74> <uuid:b5fd960f-0d14-4257-9182-40de738a7e50> <uuid:e119b096-e589-49bd-b1db-a1182dc2dade> <uuid:67842d3a-7c79-4f2a-8630-744711071e93> <uuid:f1c1a636-d6ab-414c-a0aa-855fc7e85e1f> <uuid:a22a6c54-306e-44bc-9b94-6c32c705e63e> <uuid:9ed21e0a-b062-4000-88e2-50bd9153e417> <uuid:802ff3d8-b8da-423f-8a02-7b2288485edd> <uuid:16c13b7b-aeda-4130-a793-d63f62bcc75b> <uuid:786e8738-1690-426d-8e2f-f5e734336a67> ) ;
    topo:points ( <uuid:ad6d8fcc-402c-482e-8f1a-7492ccaead38> <uuid:8d2be28b-8f31-46de-99cb-4d8709502cd0> <uuid:c611f840-2829-44b2-b367-3915ca7875a4> <uuid:fad324b9-801f-40f4-b65b-91f8753e9698> <uuid:a0ec1bfd-0f7a-4c42-bc71-bacdcd44071d> <uuid:11caaac5-b631-4bd8-a6af-f82cb6371071> <uuid:5e08b82a-8efb-447c-b5c2-54f8ff5788b3> <uuid:22138e52-65ef-4773-b69d-5ea2628fad7b> <uuid:62a26df3-3e19-49bf-9ee4-24dbeb814a70> <uuid:8087116e-84cc-44d1-8047-78dc3837d7e8> <uuid:f34d9f2e-4180-41de-a613-46f78f4c178f> <uuid:87373f95-ee4b-4471-9980-f4a8258ee1e3> <uuid:e7300a01-f8c1-4351-9511-02790a5376b0> <uuid:1e20237c-9dfa-4251-9f3f-cc5e56a5becd> <uuid:307b7db6-8014-4628-b80e-ff925bf71168> <uuid:3c08ae4e-7b27-4e95-8bfb-6b42451be8f6> <uuid:b8412dad-b40a-4e35-9f42-f983e0fce39d> <uuid:9a1d8124-ca37-4abd-b07e-bff4c8eaa2f9> <uuid:caa6045e-4189-4571-8914-1189e51ac71e> <uuid:1d2a5d01-8547-4de6-abea-8f9ab994d35e> <uuid:ff685e16-64f8-4f41-8a9e-7d8e83312fd6> <uuid:92bd9ed9-c138-45c3-b72c-a9ecb7f7cfe9> <uuid:c060c1dc-6544-4595-b583-72ecf603fd6d> <uuid:7fe8cb9b-976e-4344-bf72-f3721d878ba4> <uuid:20d3c864-4a8c-4440-b600-a1d424e92f51> <uuid:2b34e214-cba7-4a66-8443-ceb932c5ef09> <uuid:16c35df5-bc63-4edd-8da5-dbcc5548a61e> <uuid:206806a4-a2f8-4c04-858e-99d289858a40> <uuid:d8d136c6-604c-4ad3-adf7-b0a7e04d034a> <uuid:b6d10150-f9d4-4f7e-b028-c4bbee8e7717> <uuid:a3b19f96-9bca-4c31-ac7e-4cb1615878df> <uuid:793997c5-bcc4-4610-984b-6cf2c2997348> <uuid:8e503e04-ad51-423b-8102-708a845189b6> <uuid:ca62577e-8e24-4af2-88bf-33b34e25e606> <uuid:8cda5c68-9c82-43b4-84d7-979efa36dfe1> <uuid:9ef3d2ea-acea-4365-8bd5-2f8ef3036ed0> ) ;
    topo:shells ( <uuid:758590d2-8cc6-4ff7-8fcc-d7ecd01b3498> <uuid:82ce9302-e51d-48ff-a119-79bb5501ed1c> <uuid:1070811c-70bd-4698-a08f-92c62e41aafc> <uuid:74618bd4-0bbe-4490-92b3-27a4da496c39> <uuid:50453cb2-89bd-4432-8c7c-fdc2318febc2> ) .


```

## Schema

```yaml
$schema: https://json-schema.org/draft/2020-12/schema
description: A structured topology dataset with named arrays for each topological
  dimension. Points carry explicit coordinates; all higher-order features (edges,
  faces, shells, solids) use null geometry with topology defined via references or
  directed_references. Each array is restricted to its corresponding building block
  schema.
type: object
required:
- type
properties:
  type:
    type: string
    const: FeatureCollection
  metadata:
    type: object
    description: Optional dataset metadata (units, coordinate precision, source info,
      etc.)
    additionalProperties: true
  points:
    type: array
    description: Point features providing base coordinate geometry for the topology
    items:
      allOf:
      - $ref: https://surroundaustralia.github.io/topo-feature/build/annotated/geo/topo/features/topo-feature-collection/schema.yaml#FeatureOptions
      - properties:
          geometry:
            type: object
            required:
            - type
            - coordinates
            properties:
              type:
                type: string
                const: Point
              coordinates:
                type: array
                minItems: 2
        required:
        - geometry
    x-jsonld-id: https://purl.org/geojson/topo#points
    x-jsonld-container: '@list'
  edges:
    type: array
    description: Edge (LineString) features referencing two point nodes via topology.references.
    items:
      allOf:
      - $ref: https://surroundaustralia.github.io/topo-feature/build/annotated/geo/topo/features/topo-line/schema.yaml
      - properties:
          topology:
            properties:
              type:
                type: string
                enum:
                - LineString
              references:
                minItems: 2
                maxItems: 2
    x-jsonld-id: https://purl.org/geojson/topo#edges
    x-jsonld-container: '@list'
  rings:
    type: array
    description: Rings connect edges in a directed
    items:
      $ref: https://surroundaustralia.github.io/topo-feature/build/annotated/geo/topo/features/topo-ring/schema.yaml
    x-jsonld-id: https://purl.org/geojson/topo#rings
    x-jsonld-container: '@list'
  faces:
    type: array
    description: Face features whose boundary rings reference edges via directed_references.
      geometry is null.
    items:
      $ref: https://surroundaustralia.github.io/topo-feature/build/annotated/geo/topo/features/topo-face/schema.yaml
    x-jsonld-id: https://purl.org/geojson/topo#faces
    x-jsonld-container: '@list'
  shells:
    type: array
    description: Shell features referencing faces via directed_references. geometry
      is null.
    items:
      $ref: https://surroundaustralia.github.io/topo-feature/build/annotated/geo/topo/features/topo-shell/schema.yaml
    x-jsonld-id: https://purl.org/geojson/topo#shells
    x-jsonld-container: '@list'
  solids:
    type: array
    description: Solid features whose shells reference faces via directed_references.
      geometry is null.
    items:
      allOf:
      - $ref: https://surroundaustralia.github.io/topo-feature/build/annotated/geo/topo/features/topo-feature/schema.yaml
      - properties:
          geometry:
            type: 'null'
          topology:
            properties:
              type:
                type: string
                const: Solid
            required:
            - type
            - shells
    x-jsonld-id: https://purl.org/geojson/topo#shells
    x-jsonld-container: '@list'
x-jsonld-extra-terms:
  Face: https://purl.org/geojson/topo#Face
  Ring: https://purl.org/geojson/topo#Ring
  Shell: https://purl.org/geojson/topo#Shell
  Solid: https://purl.org/geojson/topo#Solid
x-jsonld-prefixes:
  topo: https://purl.org/geojson/topo#
  geojson: https://purl.org/geojson/vocab#

```

Links to the schema:

* YAML version: [schema.yaml](https://surroundaustralia.github.io/topo-feature/build/annotated/geo/topo/features/topo-feature-multi-collection/schema.json)
* JSON version: [schema.json](https://surroundaustralia.github.io/topo-feature/build/annotated/geo/topo/features/topo-feature-multi-collection/schema.yaml)


# JSON-LD Context

```jsonld
{
  "@context": {
    "Face": "topo:Face",
    "Ring": "topo:Ring",
    "Shell": "topo:Shell",
    "Solid": "topo:Solid",
    "points": {
      "@context": {
        "type": "@type",
        "id": "@id",
        "geometry": "geojson:geometry",
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
        "place": "dct:spatial"
      },
      "@id": "topo:points",
      "@container": "@list"
    },
    "edges": {
      "@context": {
        "type": "@type",
        "id": "@id",
        "geometry": "geojson:geometry",
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
            }
          },
          "@type": "@id",
          "@id": "geojson:topology"
        }
      },
      "@id": "topo:edges",
      "@container": "@list"
    },
    "rings": {
      "@context": {
        "type": "@type",
        "id": "@id",
        "geometry": "geojson:geometry",
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
            }
          },
          "@type": "@id",
          "@id": "geojson:topology"
        },
        "ref": "@id"
      },
      "@id": "topo:rings",
      "@container": "@list"
    },
    "faces": {
      "@context": {
        "type": "@type",
        "id": "@id",
        "geometry": "geojson:geometry",
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
            }
          },
          "@type": "@id",
          "@id": "geojson:topology"
        },
        "ref": "@id"
      },
      "@id": "topo:faces",
      "@container": "@list"
    },
    "shells": {
      "@context": {
        "type": "@type",
        "id": "@id",
        "geometry": "geojson:geometry",
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
            }
          },
          "@type": "@id",
          "@id": "geojson:topology"
        },
        "ref": "@id"
      },
      "@id": "topo:shells",
      "@container": "@list"
    },
    "solids": {
      "@context": {
        "type": "@type",
        "id": "@id",
        "geometry": "geojson:geometry",
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
            }
          },
          "@type": "@id",
          "@id": "geojson:topology"
        }
      },
      "@id": "topo:shells",
      "@container": "@list"
    },
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
    "properties": "@nest",
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
    "bbox": {
      "@container": "@list",
      "@id": "geojson:bbox"
    },
    "coordinates": {
      "@container": "@list",
      "@id": "geojson:coordinates"
    },
    "geometries": {
      "@id": "geojson:geometry",
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
    "topo": "https://purl.org/geojson/topo#",
    "geojson": "https://purl.org/geojson/vocab#",
    "rdfs": "http://www.w3.org/2000/01/rdf-schema#",
    "oa": "http://www.w3.org/ns/oa#",
    "dct": "http://purl.org/dc/terms/",
    "owlTime": "http://www.w3.org/2006/time#",
    "time": "http://www.w3.org/2006/time#",
    "xsd": "http://www.w3.org/2001/XMLSchema#",
    "csdm": "https://linked.data.gov.au/def/csdm/",
    "@version": 1.1
  }
}
```

You can find the full JSON-LD context here:
[context.jsonld](https://surroundaustralia.github.io/topo-feature/build/annotated/geo/topo/features/topo-feature-multi-collection/context.jsonld)


# For developers

The source code for this Building Block can be found in the following repository:

* URL: [https://github.com/surroundaustralia/topo-feature](https://github.com/surroundaustralia/topo-feature)
* Path: `_sources/features/topo-feature-multi-collection`

