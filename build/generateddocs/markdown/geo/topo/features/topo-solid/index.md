
# Solid Topology Feature (Schema)

`ogc.geo.topo.features.topo-solid` *v0.1*

A feature representing a Solid in topology: a volumetric region bounded by one or more oriented Shell references. The first Shell is the outer boundary; any additional Shells describe interior voids. A Solid is the 3D analog of a Face — it is bounded by Shells the way a Face is bounded by Rings.

[*Status*](http://www.opengis.net/def/status): Under development

## Description

# Solid Topology Feature

A **Solid** is a topological feature representing a volumetric region.
It is composed of an ordered set of oriented Shell references in its `directed_references` array.

A Solid is the 3D analog of a Face: just as a Face is bounded by an outer Ring (and optional interior hole Rings),
a Solid is bounded by an outer Shell (and optional interior void Shells).

## Topology Model

A Solid's topology consists of:

- `type`: `"Solid"`
- `directed_references`: an ordered array of [Oriented Object References](../../datatypes/oriented-ref/), each referencing a Shell feature with a `ref` (feature ID) and `orientation` (`+` or `-`)

The `geometry` property is `null` — actual coordinates are derived from the referenced Shell, Face, Edge and Point features.

## Orientation and voids

The first entry in `directed_references` is the outer bounding Shell, oriented `+` (its Face normals point outward from the solid).
Any additional entries describe interior voids — Shells enclosing a cavity within the solid — typically oriented `-` so their Face normals point into the void (i.e. away from solid material).

## Relationship to other types

| Lower dimension                                    | Solid     | Higher dimension                                  |
|-----------------------------------------------------|-----------|----------------------------------------------------|
| Shell (referenced in Solid directed_references)     | **Solid** | — (Solid is the top of the topology hierarchy)     |

## Example

```json
{
  "topology": {
    "type": "Solid",
    "directed_references": [
      { "ref": "uuid:758590d2-8cc6-4ff7-8fcc-d7ecd01b3498", "orientation": "+" }
    ]
  }
}
```

### Solid with an interior void

```json
{
  "topology": {
    "type": "Solid",
    "directed_references": [
      { "ref": "uuid:e7bbe46f-e375-42b6-84aa-e284bc0b9568", "orientation": "+" },
      { "ref": "uuid:97a089af-4929-4d36-8e01-74f573343edb", "orientation": "-" }
    ]
  }
}
```

## Examples

### Solid with full topological context (points + edges + rings + faces + shell)
A self-contained example of a Solid with its outer Shell, all 8 bounding Face features
(each with a Ring), and all supporting Edge and Point features. Demonstrates the full
topology hierarchy: solid → shell (directed_references to Faces) → faces (directed_references
to Rings) → rings (directed_references to Edges) → edges (references to Points) → points.
All geometry properties are null except on Point features.

#### json
```json
{
  "type": "FeatureCollection",
  "features": [],
  "comment": "Self-contained example: a Solid with its Shell and all supporting faces, edges and points",
  "points": [
    {
      "id": "uuid:ad6d8fcc-402c-482e-8f1a-7492ccaead38",
      "type": "Feature",
      "geometry": { "type": "Point", "coordinates": [18.0, 10.0, 3.0] },
      "properties": null
    },
    {
      "id": "uuid:8d2be28b-8f31-46de-99cb-4d8709502cd0",
      "type": "Feature",
      "geometry": { "type": "Point", "coordinates": [18.0, 10.0, 6.0] },
      "properties": null
    },
    {
      "id": "uuid:c611f840-2829-44b2-b367-3915ca7875a4",
      "type": "Feature",
      "geometry": { "type": "Point", "coordinates": [18.0, 2.0, 6.0] },
      "properties": null
    },
    {
      "id": "uuid:fad324b9-801f-40f4-b65b-91f8753e9698",
      "type": "Feature",
      "geometry": { "type": "Point", "coordinates": [18.0, 2.0, 3.0] },
      "properties": null
    },
    {
      "id": "uuid:a0ec1bfd-0f7a-4c42-bc71-bacdcd44071d",
      "type": "Feature",
      "geometry": { "type": "Point", "coordinates": [12.0, 2.0, 3.0] },
      "properties": null
    },
    {
      "id": "uuid:11caaac5-b631-4bd8-a6af-f82cb6371071",
      "type": "Feature",
      "geometry": { "type": "Point", "coordinates": [12.0, 2.0, 6.0] },
      "properties": null
    },
    {
      "id": "uuid:5e08b82a-8efb-447c-b5c2-54f8ff5788b3",
      "type": "Feature",
      "geometry": { "type": "Point", "coordinates": [10.0, 10.0, 6.0] },
      "properties": null
    },
    {
      "id": "uuid:22138e52-65ef-4773-b69d-5ea2628fad7b",
      "type": "Feature",
      "geometry": { "type": "Point", "coordinates": [10.0, 10.0, 3.0] },
      "properties": null
    },
    {
      "id": "uuid:62a26df3-3e19-49bf-9ee4-24dbeb814a70",
      "type": "Feature",
      "geometry": { "type": "Point", "coordinates": [10.0, 6.0, 6.0] },
      "properties": null
    },
    {
      "id": "uuid:8087116e-84cc-44d1-8047-78dc3837d7e8",
      "type": "Feature",
      "geometry": { "type": "Point", "coordinates": [12.0, 6.0, 6.0] },
      "properties": null
    },
    {
      "id": "uuid:f34d9f2e-4180-41de-a613-46f78f4c178f",
      "type": "Feature",
      "geometry": { "type": "Point", "coordinates": [10.0, 6.0, 3.0] },
      "properties": null
    },
    {
      "id": "uuid:87373f95-ee4b-4471-9980-f4a8258ee1e3",
      "type": "Feature",
      "geometry": { "type": "Point", "coordinates": [12.0, 6.0, 3.0] },
      "properties": null
    }
  ],
  "edges": [
    {
      "id": "uuid:c60507ba-226b-4e49-a702-e9afef899b23",
      "type": "Feature",
      "geometry": null,
      "topology": { "type": "Edge", "references": ["uuid:ad6d8fcc-402c-482e-8f1a-7492ccaead38", "uuid:8d2be28b-8f31-46de-99cb-4d8709502cd0"] },
      "properties": { "length": 3.0 }
    },
    {
      "id": "uuid:7dc1cc1c-8e7f-4666-9f52-4e6c2e6f57ac",
      "type": "Feature",
      "geometry": null,
      "topology": { "type": "Edge", "references": ["uuid:8d2be28b-8f31-46de-99cb-4d8709502cd0", "uuid:c611f840-2829-44b2-b367-3915ca7875a4"] },
      "properties": { "length": 8.0 }
    },
    {
      "id": "uuid:83ff2cdf-6c58-4e7b-ba55-e084eff8c569",
      "type": "Feature",
      "geometry": null,
      "topology": { "type": "Edge", "references": ["uuid:c611f840-2829-44b2-b367-3915ca7875a4", "uuid:fad324b9-801f-40f4-b65b-91f8753e9698"] },
      "properties": { "length": 3.0 }
    },
    {
      "id": "uuid:d69c596c-134e-4216-9bf6-d0f10e6886d8",
      "type": "Feature",
      "geometry": null,
      "topology": { "type": "Edge", "references": ["uuid:fad324b9-801f-40f4-b65b-91f8753e9698", "uuid:ad6d8fcc-402c-482e-8f1a-7492ccaead38"] },
      "properties": { "length": 8.0 }
    },
    {
      "id": "uuid:32e82eb1-93a4-4387-8cd0-9616ebf1e39b",
      "type": "Feature",
      "geometry": null,
      "topology": { "type": "Edge", "references": ["uuid:a0ec1bfd-0f7a-4c42-bc71-bacdcd44071d", "uuid:fad324b9-801f-40f4-b65b-91f8753e9698"] },
      "properties": { "length": 6.0 }
    },
    {
      "id": "uuid:8582d9c2-6053-495a-8413-f5493691c0de",
      "type": "Feature",
      "geometry": null,
      "topology": { "type": "Edge", "references": ["uuid:c611f840-2829-44b2-b367-3915ca7875a4", "uuid:11caaac5-b631-4bd8-a6af-f82cb6371071"] },
      "properties": { "length": 6.0 }
    },
    {
      "id": "uuid:120defbd-2e05-4ec3-ba3c-ffee086d2add",
      "type": "Feature",
      "geometry": null,
      "topology": { "type": "Edge", "references": ["uuid:11caaac5-b631-4bd8-a6af-f82cb6371071", "uuid:a0ec1bfd-0f7a-4c42-bc71-bacdcd44071d"] },
      "properties": { "length": 3.0 }
    },
    {
      "id": "uuid:4c2a6434-03b0-4aa2-85ea-a9fcaea41555",
      "type": "Feature",
      "geometry": null,
      "topology": { "type": "Edge", "references": ["uuid:5e08b82a-8efb-447c-b5c2-54f8ff5788b3", "uuid:8d2be28b-8f31-46de-99cb-4d8709502cd0"] },
      "properties": { "length": 8.0 }
    },
    {
      "id": "uuid:830b9098-d914-4e8b-869d-4d20f1eb5c81",
      "type": "Feature",
      "geometry": null,
      "topology": { "type": "Edge", "references": ["uuid:ad6d8fcc-402c-482e-8f1a-7492ccaead38", "uuid:22138e52-65ef-4773-b69d-5ea2628fad7b"] },
      "properties": { "length": 8.0 }
    },
    {
      "id": "uuid:3b72e45d-d351-46e4-a5b7-9ac9bc339d03",
      "type": "Feature",
      "geometry": null,
      "topology": { "type": "Edge", "references": ["uuid:22138e52-65ef-4773-b69d-5ea2628fad7b", "uuid:5e08b82a-8efb-447c-b5c2-54f8ff5788b3"] },
      "properties": { "length": 3.0 }
    },
    {
      "id": "uuid:921e2351-efbf-48be-85d3-eedc0dc2ddc0",
      "type": "Feature",
      "geometry": null,
      "topology": { "type": "Edge", "references": ["uuid:5e08b82a-8efb-447c-b5c2-54f8ff5788b3", "uuid:62a26df3-3e19-49bf-9ee4-24dbeb814a70"] },
      "properties": { "length": 4.0 }
    },
    {
      "id": "uuid:73f88b47-78ab-474d-9c62-73dfefd0dd5d",
      "type": "Feature",
      "geometry": null,
      "topology": { "type": "Edge", "references": ["uuid:62a26df3-3e19-49bf-9ee4-24dbeb814a70", "uuid:8087116e-84cc-44d1-8047-78dc3837d7e8"] },
      "properties": { "length": 2.0 }
    },
    {
      "id": "uuid:7aa2a76d-9d5c-4540-9f2e-d8bcf36fadb5",
      "type": "Feature",
      "geometry": null,
      "topology": { "type": "Edge", "references": ["uuid:8087116e-84cc-44d1-8047-78dc3837d7e8", "uuid:11caaac5-b631-4bd8-a6af-f82cb6371071"] },
      "properties": { "length": 4.0 }
    },
    {
      "id": "uuid:ed6b8b1c-7030-4d70-ab61-94cb3aa904a7",
      "type": "Feature",
      "geometry": null,
      "topology": { "type": "Edge", "references": ["uuid:22138e52-65ef-4773-b69d-5ea2628fad7b", "uuid:f34d9f2e-4180-41de-a613-46f78f4c178f"] },
      "properties": { "length": 4.0 }
    },
    {
      "id": "uuid:5f17e211-e8b5-4a7c-85e4-798787fd82a5",
      "type": "Feature",
      "geometry": null,
      "topology": { "type": "Edge", "references": ["uuid:f34d9f2e-4180-41de-a613-46f78f4c178f", "uuid:62a26df3-3e19-49bf-9ee4-24dbeb814a70"] },
      "properties": { "length": 3.0 }
    },
    {
      "id": "uuid:7da1c2fe-f798-43cc-af44-ac63f968139c",
      "type": "Feature",
      "geometry": null,
      "topology": { "type": "Edge", "references": ["uuid:f34d9f2e-4180-41de-a613-46f78f4c178f", "uuid:87373f95-ee4b-4471-9980-f4a8258ee1e3"] },
      "properties": { "length": 2.0 }
    },
    {
      "id": "uuid:46fd1def-a93e-4c99-9868-172cf1b40ff1",
      "type": "Feature",
      "geometry": null,
      "topology": { "type": "Edge", "references": ["uuid:87373f95-ee4b-4471-9980-f4a8258ee1e3", "uuid:8087116e-84cc-44d1-8047-78dc3837d7e8"] },
      "properties": { "length": 3.0 }
    },
    {
      "id": "uuid:856e43bc-ee35-44d0-b25e-ea94a53e1db6",
      "type": "Feature",
      "geometry": null,
      "topology": { "type": "Edge", "references": ["uuid:a0ec1bfd-0f7a-4c42-bc71-bacdcd44071d", "uuid:87373f95-ee4b-4471-9980-f4a8258ee1e3"] },
      "properties": { "length": 4.0 }
    }
  ],
  "rings": [
    {
      "id": "uuid:a1a1a1a1-0001-4a1a-8a1a-a1a1a1a10001",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Ring",
        "directed_references": [
          { "ref": "uuid:c60507ba-226b-4e49-a702-e9afef899b23", "orientation": "+" },
          { "ref": "uuid:7dc1cc1c-8e7f-4666-9f52-4e6c2e6f57ac", "orientation": "+" },
          { "ref": "uuid:83ff2cdf-6c58-4e7b-ba55-e084eff8c569", "orientation": "+" },
          { "ref": "uuid:d69c596c-134e-4216-9bf6-d0f10e6886d8", "orientation": "+" }
        ]
      },
      "properties": { "circumference": 22.0 }
    },
    {
      "id": "uuid:a1a1a1a1-0002-4a1a-8a1a-a1a1a1a10002",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Ring",
        "directed_references": [
          { "ref": "uuid:32e82eb1-93a4-4387-8cd0-9616ebf1e39b", "orientation": "+" },
          { "ref": "uuid:83ff2cdf-6c58-4e7b-ba55-e084eff8c569", "orientation": "-" },
          { "ref": "uuid:8582d9c2-6053-495a-8413-f5493691c0de", "orientation": "+" },
          { "ref": "uuid:120defbd-2e05-4ec3-ba3c-ffee086d2add", "orientation": "+" }
        ]
      },
      "properties": { "circumference": 18.0 }
    },
    {
      "id": "uuid:a1a1a1a1-0003-4a1a-8a1a-a1a1a1a10003",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Ring",
        "directed_references": [
          { "ref": "uuid:4c2a6434-03b0-4aa2-85ea-a9fcaea41555", "orientation": "+" },
          { "ref": "uuid:c60507ba-226b-4e49-a702-e9afef899b23", "orientation": "-" },
          { "ref": "uuid:830b9098-d914-4e8b-869d-4d20f1eb5c81", "orientation": "+" },
          { "ref": "uuid:3b72e45d-d351-46e4-a5b7-9ac9bc339d03", "orientation": "+" }
        ]
      },
      "properties": { "circumference": 22.0 }
    },
    {
      "id": "uuid:a1a1a1a1-0004-4a1a-8a1a-a1a1a1a10004",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Ring",
        "directed_references": [
          { "ref": "uuid:8582d9c2-6053-495a-8413-f5493691c0de", "orientation": "-" },
          { "ref": "uuid:7dc1cc1c-8e7f-4666-9f52-4e6c2e6f57ac", "orientation": "-" },
          { "ref": "uuid:4c2a6434-03b0-4aa2-85ea-a9fcaea41555", "orientation": "-" },
          { "ref": "uuid:921e2351-efbf-48be-85d3-eedc0dc2ddc0", "orientation": "+" },
          { "ref": "uuid:73f88b47-78ab-474d-9c62-73dfefd0dd5d", "orientation": "+" },
          { "ref": "uuid:7aa2a76d-9d5c-4540-9f2e-d8bcf36fadb5", "orientation": "+" }
        ]
      },
      "properties": { "circumference": 30.0 }
    },
    {
      "id": "uuid:a1a1a1a1-0005-4a1a-8a1a-a1a1a1a10005",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Ring",
        "directed_references": [
          { "ref": "uuid:ed6b8b1c-7030-4d70-ab61-94cb3aa904a7", "orientation": "+" },
          { "ref": "uuid:5f17e211-e8b5-4a7c-85e4-798787fd82a5", "orientation": "+" },
          { "ref": "uuid:921e2351-efbf-48be-85d3-eedc0dc2ddc0", "orientation": "-" },
          { "ref": "uuid:3b72e45d-d351-46e4-a5b7-9ac9bc339d03", "orientation": "-" }
        ]
      },
      "properties": { "circumference": 14.0 }
    },
    {
      "id": "uuid:a1a1a1a1-0006-4a1a-8a1a-a1a1a1a10006",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Ring",
        "directed_references": [
          { "ref": "uuid:7da1c2fe-f798-43cc-af44-ac63f968139c", "orientation": "+" },
          { "ref": "uuid:46fd1def-a93e-4c99-9868-172cf1b40ff1", "orientation": "+" },
          { "ref": "uuid:73f88b47-78ab-474d-9c62-73dfefd0dd5d", "orientation": "-" },
          { "ref": "uuid:5f17e211-e8b5-4a7c-85e4-798787fd82a5", "orientation": "-" }
        ]
      },
      "properties": { "circumference": 10.0 }
    },
    {
      "id": "uuid:a1a1a1a1-0007-4a1a-8a1a-a1a1a1a10007",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Ring",
        "directed_references": [
          { "ref": "uuid:856e43bc-ee35-44d0-b25e-ea94a53e1db6", "orientation": "+" },
          { "ref": "uuid:7da1c2fe-f798-43cc-af44-ac63f968139c", "orientation": "-" },
          { "ref": "uuid:ed6b8b1c-7030-4d70-ab61-94cb3aa904a7", "orientation": "-" },
          { "ref": "uuid:830b9098-d914-4e8b-869d-4d20f1eb5c81", "orientation": "-" },
          { "ref": "uuid:d69c596c-134e-4216-9bf6-d0f10e6886d8", "orientation": "-" },
          { "ref": "uuid:32e82eb1-93a4-4387-8cd0-9616ebf1e39b", "orientation": "-" }
        ]
      },
      "properties": { "circumference": 30.0 }
    },
    {
      "id": "uuid:a1a1a1a1-0008-4a1a-8a1a-a1a1a1a10008",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Ring",
        "directed_references": [
          { "ref": "uuid:856e43bc-ee35-44d0-b25e-ea94a53e1db6", "orientation": "-" },
          { "ref": "uuid:120defbd-2e05-4ec3-ba3c-ffee086d2add", "orientation": "-" },
          { "ref": "uuid:7aa2a76d-9d5c-4540-9f2e-d8bcf36fadb5", "orientation": "-" },
          { "ref": "uuid:46fd1def-a93e-4c99-9868-172cf1b40ff1", "orientation": "-" }
        ]
      },
      "properties": { "circumference": 14.0 }
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
          { "ref": "uuid:a1a1a1a1-0001-4a1a-8a1a-a1a1a1a10001", "orientation": "+" }
        ]
      },
      "properties": { "normal": [1.0, 0.0, -0.0], "area": 24.0 }
    },
    {
      "id": "uuid:4a294022-4864-49c7-8cee-f9e43360bc4e",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "directed_references": [
          { "ref": "uuid:a1a1a1a1-0002-4a1a-8a1a-a1a1a1a10002", "orientation": "+" }
        ]
      },
      "properties": { "normal": [0.0, -1.0, 3.007964248051e-16], "area": 18.0 }
    },
    {
      "id": "uuid:01947f47-ee13-44a9-85a4-2bcb4881982a",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "directed_references": [
          { "ref": "uuid:a1a1a1a1-0003-4a1a-8a1a-a1a1a1a10003", "orientation": "+" }
        ]
      },
      "properties": { "normal": [0.0, 1.0, 0.0], "area": 24.0 }
    },
    {
      "id": "uuid:607a3363-3eb7-4ce6-a633-86d2e565692b",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "directed_references": [
          { "ref": "uuid:a1a1a1a1-0004-4a1a-8a1a-a1a1a1a10004", "orientation": "+" }
        ]
      },
      "properties": { "normal": [0.0, 0.0, 1.0], "area": 56.0 }
    },
    {
      "id": "uuid:3c1f5c4b-d842-40b6-a332-99d50015fa8f",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "directed_references": [
          { "ref": "uuid:a1a1a1a1-0005-4a1a-8a1a-a1a1a1a10005", "orientation": "+" }
        ]
      },
      "properties": { "normal": [-1.0, -0.0, -0.0], "area": 12.0 }
    },
    {
      "id": "uuid:fe522919-1421-4fd1-9930-8c6551e3f2a5",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "directed_references": [
          { "ref": "uuid:a1a1a1a1-0006-4a1a-8a1a-a1a1a1a10006", "orientation": "+" }
        ]
      },
      "properties": { "normal": [0.0, -1.0, 0.0], "area": 6.0 }
    },
    {
      "id": "uuid:2387ae98-9236-42fe-9414-c45b99954c41",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "directed_references": [
          { "ref": "uuid:a1a1a1a1-0007-4a1a-8a1a-a1a1a1a10007", "orientation": "+" }
        ]
      },
      "properties": { "normal": [0.0, 0.0, -1.0], "area": 56.0 }
    },
    {
      "id": "uuid:4ba85faa-3935-4e89-a9f8-dcd647a5dbed",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "directed_references": [
          { "ref": "uuid:a1a1a1a1-0008-4a1a-8a1a-a1a1a1a10008", "orientation": "+" }
        ]
      },
      "properties": { "normal": [-1.0, -0.0, -0.0], "area": 12.0 }
    }
  ],
  "shells": [
    {
      "id": "uuid:758590d2-8cc6-4ff7-8fcc-d7ecd01b3498",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Shell",
        "directed_references": [
          { "ref": "uuid:4ac3b91b-eeb7-428c-b5e9-7e8a3f0998ae", "orientation": "+" },
          { "ref": "uuid:4a294022-4864-49c7-8cee-f9e43360bc4e", "orientation": "+" },
          { "ref": "uuid:01947f47-ee13-44a9-85a4-2bcb4881982a", "orientation": "+" },
          { "ref": "uuid:607a3363-3eb7-4ce6-a633-86d2e565692b", "orientation": "+" },
          { "ref": "uuid:3c1f5c4b-d842-40b6-a332-99d50015fa8f", "orientation": "+" },
          { "ref": "uuid:fe522919-1421-4fd1-9930-8c6551e3f2a5", "orientation": "+" },
          { "ref": "uuid:2387ae98-9236-42fe-9414-c45b99954c41", "orientation": "+" },
          { "ref": "uuid:4ba85faa-3935-4e89-a9f8-dcd647a5dbed", "orientation": "+" }
        ]
      },
      "properties": {
        "description": "Outer shell of Upper East solid volume"
      }
    }
  ],
  "solids": [
    {
      "id": "uuid:d1f0a4b0-1f0f-4d2b-9a6a-6f7bd6b2c7e1",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Solid",
        "directed_references": [
          { "ref": "uuid:758590d2-8cc6-4ff7-8fcc-d7ecd01b3498", "orientation": "+" }
        ]
      },
      "properties": {
        "name": "Upper East",
        "levels": [2],
        "volume": 168.0
      }
    }
  ]
}

```

#### jsonld
```jsonld
{
  "@context": "https://surroundaustralia.github.io/topo-feature/build/annotated/geo/topo/features/topo-solid/context.jsonld",
  "type": "FeatureCollection",
  "features": [],
  "comment": "Self-contained example: a Solid with its Shell and all supporting faces, edges and points",
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
    }
  ],
  "edges": [
    {
      "id": "uuid:c60507ba-226b-4e49-a702-e9afef899b23",
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
        "length": 3.0
      }
    },
    {
      "id": "uuid:7dc1cc1c-8e7f-4666-9f52-4e6c2e6f57ac",
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
        "length": 8.0
      }
    },
    {
      "id": "uuid:83ff2cdf-6c58-4e7b-ba55-e084eff8c569",
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
        "length": 3.0
      }
    },
    {
      "id": "uuid:d69c596c-134e-4216-9bf6-d0f10e6886d8",
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
        "length": 8.0
      }
    },
    {
      "id": "uuid:32e82eb1-93a4-4387-8cd0-9616ebf1e39b",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Edge",
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
        "type": "Edge",
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
        "type": "Edge",
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
        "type": "Edge",
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
        "type": "Edge",
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
        "type": "Edge",
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
        "type": "Edge",
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
        "type": "Edge",
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
        "type": "Edge",
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
        "type": "Edge",
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
        "type": "Edge",
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
        "type": "Edge",
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
        "type": "Edge",
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
        "type": "Edge",
        "references": [
          "uuid:a0ec1bfd-0f7a-4c42-bc71-bacdcd44071d",
          "uuid:87373f95-ee4b-4471-9980-f4a8258ee1e3"
        ]
      },
      "properties": {
        "length": 4.0
      }
    }
  ],
  "rings": [
    {
      "id": "uuid:a1a1a1a1-0001-4a1a-8a1a-a1a1a1a10001",
      "type": "Feature",
      "geometry": null,
      "topology": {
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
      },
      "properties": {
        "circumference": 22.0
      }
    },
    {
      "id": "uuid:a1a1a1a1-0002-4a1a-8a1a-a1a1a1a10002",
      "type": "Feature",
      "geometry": null,
      "topology": {
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
      },
      "properties": {
        "circumference": 18.0
      }
    },
    {
      "id": "uuid:a1a1a1a1-0003-4a1a-8a1a-a1a1a1a10003",
      "type": "Feature",
      "geometry": null,
      "topology": {
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
      },
      "properties": {
        "circumference": 22.0
      }
    },
    {
      "id": "uuid:a1a1a1a1-0004-4a1a-8a1a-a1a1a1a10004",
      "type": "Feature",
      "geometry": null,
      "topology": {
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
      },
      "properties": {
        "circumference": 30.0
      }
    },
    {
      "id": "uuid:a1a1a1a1-0005-4a1a-8a1a-a1a1a1a10005",
      "type": "Feature",
      "geometry": null,
      "topology": {
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
      },
      "properties": {
        "circumference": 14.0
      }
    },
    {
      "id": "uuid:a1a1a1a1-0006-4a1a-8a1a-a1a1a1a10006",
      "type": "Feature",
      "geometry": null,
      "topology": {
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
      },
      "properties": {
        "circumference": 10.0
      }
    },
    {
      "id": "uuid:a1a1a1a1-0007-4a1a-8a1a-a1a1a1a10007",
      "type": "Feature",
      "geometry": null,
      "topology": {
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
      },
      "properties": {
        "circumference": 30.0
      }
    },
    {
      "id": "uuid:a1a1a1a1-0008-4a1a-8a1a-a1a1a1a10008",
      "type": "Feature",
      "geometry": null,
      "topology": {
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
      },
      "properties": {
        "circumference": 14.0
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
            "ref": "uuid:a1a1a1a1-0001-4a1a-8a1a-a1a1a1a10001",
            "orientation": "+"
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
        "directed_references": [
          {
            "ref": "uuid:a1a1a1a1-0002-4a1a-8a1a-a1a1a1a10002",
            "orientation": "+"
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
        "directed_references": [
          {
            "ref": "uuid:a1a1a1a1-0003-4a1a-8a1a-a1a1a1a10003",
            "orientation": "+"
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
        "directed_references": [
          {
            "ref": "uuid:a1a1a1a1-0004-4a1a-8a1a-a1a1a1a10004",
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
        "area": 56.0
      }
    },
    {
      "id": "uuid:3c1f5c4b-d842-40b6-a332-99d50015fa8f",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Face",
        "directed_references": [
          {
            "ref": "uuid:a1a1a1a1-0005-4a1a-8a1a-a1a1a1a10005",
            "orientation": "+"
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
        "directed_references": [
          {
            "ref": "uuid:a1a1a1a1-0006-4a1a-8a1a-a1a1a1a10006",
            "orientation": "+"
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
        "directed_references": [
          {
            "ref": "uuid:a1a1a1a1-0007-4a1a-8a1a-a1a1a1a10007",
            "orientation": "+"
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
        "directed_references": [
          {
            "ref": "uuid:a1a1a1a1-0008-4a1a-8a1a-a1a1a1a10008",
            "orientation": "+"
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
    }
  ],
  "shells": [
    {
      "id": "uuid:758590d2-8cc6-4ff7-8fcc-d7ecd01b3498",
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
  ],
  "solids": [
    {
      "id": "uuid:d1f0a4b0-1f0f-4d2b-9a6a-6f7bd6b2c7e1",
      "type": "Feature",
      "geometry": null,
      "topology": {
        "type": "Solid",
        "directed_references": [
          {
            "ref": "uuid:758590d2-8cc6-4ff7-8fcc-d7ecd01b3498",
            "orientation": "+"
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

<uuid:758590d2-8cc6-4ff7-8fcc-d7ecd01b3498> a geojson:Feature ;
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

<uuid:01947f47-ee13-44a9-85a4-2bcb4881982a> a geojson:Feature ;
    geojson:topology [ a topo:Face ;
            topo:directedReferences ( [ topo:orientation "+" ;
                        topo:ref <uuid:a1a1a1a1-0003-4a1a-8a1a-a1a1a1a10003> ] ) ] .

<uuid:2387ae98-9236-42fe-9414-c45b99954c41> a geojson:Feature ;
    geojson:topology [ a topo:Face ;
            topo:directedReferences ( [ topo:orientation "+" ;
                        topo:ref <uuid:a1a1a1a1-0007-4a1a-8a1a-a1a1a1a10007> ] ) ] .

<uuid:3c1f5c4b-d842-40b6-a332-99d50015fa8f> a geojson:Feature ;
    geojson:topology [ a topo:Face ;
            topo:directedReferences ( [ topo:orientation "+" ;
                        topo:ref <uuid:a1a1a1a1-0005-4a1a-8a1a-a1a1a1a10005> ] ) ] .

<uuid:4a294022-4864-49c7-8cee-f9e43360bc4e> a geojson:Feature ;
    geojson:topology [ a topo:Face ;
            topo:directedReferences ( [ topo:orientation "+" ;
                        topo:ref <uuid:a1a1a1a1-0002-4a1a-8a1a-a1a1a1a10002> ] ) ] .

<uuid:4ac3b91b-eeb7-428c-b5e9-7e8a3f0998ae> a geojson:Feature ;
    geojson:topology [ a topo:Face ;
            topo:directedReferences ( [ topo:orientation "+" ;
                        topo:ref <uuid:a1a1a1a1-0001-4a1a-8a1a-a1a1a1a10001> ] ) ] .

<uuid:4ba85faa-3935-4e89-a9f8-dcd647a5dbed> a geojson:Feature ;
    geojson:topology [ a topo:Face ;
            topo:directedReferences ( [ topo:orientation "+" ;
                        topo:ref <uuid:a1a1a1a1-0008-4a1a-8a1a-a1a1a1a10008> ] ) ] .

<uuid:607a3363-3eb7-4ce6-a633-86d2e565692b> a geojson:Feature ;
    geojson:topology [ a topo:Face ;
            topo:directedReferences ( [ topo:orientation "+" ;
                        topo:ref <uuid:a1a1a1a1-0004-4a1a-8a1a-a1a1a1a10004> ] ) ] .

<uuid:a1a1a1a1-0001-4a1a-8a1a-a1a1a1a10001> a geojson:Feature ;
    geojson:topology [ a topo:Ring ;
            topo:directedReferences ( [ topo:orientation "+" ;
                        topo:ref <uuid:c60507ba-226b-4e49-a702-e9afef899b23> ] [ topo:orientation "+" ;
                        topo:ref <uuid:7dc1cc1c-8e7f-4666-9f52-4e6c2e6f57ac> ] [ topo:orientation "+" ;
                        topo:ref <uuid:83ff2cdf-6c58-4e7b-ba55-e084eff8c569> ] [ topo:orientation "+" ;
                        topo:ref <uuid:d69c596c-134e-4216-9bf6-d0f10e6886d8> ] ) ] .

<uuid:a1a1a1a1-0002-4a1a-8a1a-a1a1a1a10002> a geojson:Feature ;
    geojson:topology [ a topo:Ring ;
            topo:directedReferences ( [ topo:orientation "+" ;
                        topo:ref <uuid:32e82eb1-93a4-4387-8cd0-9616ebf1e39b> ] [ topo:orientation "-" ;
                        topo:ref <uuid:83ff2cdf-6c58-4e7b-ba55-e084eff8c569> ] [ topo:orientation "+" ;
                        topo:ref <uuid:8582d9c2-6053-495a-8413-f5493691c0de> ] [ topo:orientation "+" ;
                        topo:ref <uuid:120defbd-2e05-4ec3-ba3c-ffee086d2add> ] ) ] .

<uuid:a1a1a1a1-0003-4a1a-8a1a-a1a1a1a10003> a geojson:Feature ;
    geojson:topology [ a topo:Ring ;
            topo:directedReferences ( [ topo:orientation "+" ;
                        topo:ref <uuid:4c2a6434-03b0-4aa2-85ea-a9fcaea41555> ] [ topo:orientation "-" ;
                        topo:ref <uuid:c60507ba-226b-4e49-a702-e9afef899b23> ] [ topo:orientation "+" ;
                        topo:ref <uuid:830b9098-d914-4e8b-869d-4d20f1eb5c81> ] [ topo:orientation "+" ;
                        topo:ref <uuid:3b72e45d-d351-46e4-a5b7-9ac9bc339d03> ] ) ] .

<uuid:a1a1a1a1-0004-4a1a-8a1a-a1a1a1a10004> a geojson:Feature ;
    geojson:topology [ a topo:Ring ;
            topo:directedReferences ( [ topo:orientation "-" ;
                        topo:ref <uuid:8582d9c2-6053-495a-8413-f5493691c0de> ] [ topo:orientation "-" ;
                        topo:ref <uuid:7dc1cc1c-8e7f-4666-9f52-4e6c2e6f57ac> ] [ topo:orientation "-" ;
                        topo:ref <uuid:4c2a6434-03b0-4aa2-85ea-a9fcaea41555> ] [ topo:orientation "+" ;
                        topo:ref <uuid:921e2351-efbf-48be-85d3-eedc0dc2ddc0> ] [ topo:orientation "+" ;
                        topo:ref <uuid:73f88b47-78ab-474d-9c62-73dfefd0dd5d> ] [ topo:orientation "+" ;
                        topo:ref <uuid:7aa2a76d-9d5c-4540-9f2e-d8bcf36fadb5> ] ) ] .

<uuid:a1a1a1a1-0005-4a1a-8a1a-a1a1a1a10005> a geojson:Feature ;
    geojson:topology [ a topo:Ring ;
            topo:directedReferences ( [ topo:orientation "+" ;
                        topo:ref <uuid:ed6b8b1c-7030-4d70-ab61-94cb3aa904a7> ] [ topo:orientation "+" ;
                        topo:ref <uuid:5f17e211-e8b5-4a7c-85e4-798787fd82a5> ] [ topo:orientation "-" ;
                        topo:ref <uuid:921e2351-efbf-48be-85d3-eedc0dc2ddc0> ] [ topo:orientation "-" ;
                        topo:ref <uuid:3b72e45d-d351-46e4-a5b7-9ac9bc339d03> ] ) ] .

<uuid:a1a1a1a1-0006-4a1a-8a1a-a1a1a1a10006> a geojson:Feature ;
    geojson:topology [ a topo:Ring ;
            topo:directedReferences ( [ topo:orientation "+" ;
                        topo:ref <uuid:7da1c2fe-f798-43cc-af44-ac63f968139c> ] [ topo:orientation "+" ;
                        topo:ref <uuid:46fd1def-a93e-4c99-9868-172cf1b40ff1> ] [ topo:orientation "-" ;
                        topo:ref <uuid:73f88b47-78ab-474d-9c62-73dfefd0dd5d> ] [ topo:orientation "-" ;
                        topo:ref <uuid:5f17e211-e8b5-4a7c-85e4-798787fd82a5> ] ) ] .

<uuid:a1a1a1a1-0007-4a1a-8a1a-a1a1a1a10007> a geojson:Feature ;
    geojson:topology [ a topo:Ring ;
            topo:directedReferences ( [ topo:orientation "+" ;
                        topo:ref <uuid:856e43bc-ee35-44d0-b25e-ea94a53e1db6> ] [ topo:orientation "-" ;
                        topo:ref <uuid:7da1c2fe-f798-43cc-af44-ac63f968139c> ] [ topo:orientation "-" ;
                        topo:ref <uuid:ed6b8b1c-7030-4d70-ab61-94cb3aa904a7> ] [ topo:orientation "-" ;
                        topo:ref <uuid:830b9098-d914-4e8b-869d-4d20f1eb5c81> ] [ topo:orientation "-" ;
                        topo:ref <uuid:d69c596c-134e-4216-9bf6-d0f10e6886d8> ] [ topo:orientation "-" ;
                        topo:ref <uuid:32e82eb1-93a4-4387-8cd0-9616ebf1e39b> ] ) ] .

<uuid:a1a1a1a1-0008-4a1a-8a1a-a1a1a1a10008> a geojson:Feature ;
    geojson:topology [ a topo:Ring ;
            topo:directedReferences ( [ topo:orientation "-" ;
                        topo:ref <uuid:856e43bc-ee35-44d0-b25e-ea94a53e1db6> ] [ topo:orientation "-" ;
                        topo:ref <uuid:120defbd-2e05-4ec3-ba3c-ffee086d2add> ] [ topo:orientation "-" ;
                        topo:ref <uuid:7aa2a76d-9d5c-4540-9f2e-d8bcf36fadb5> ] [ topo:orientation "-" ;
                        topo:ref <uuid:46fd1def-a93e-4c99-9868-172cf1b40ff1> ] ) ] .

<uuid:fe522919-1421-4fd1-9930-8c6551e3f2a5> a geojson:Feature ;
    geojson:topology [ a topo:Face ;
            topo:directedReferences ( [ topo:orientation "+" ;
                        topo:ref <uuid:a1a1a1a1-0006-4a1a-8a1a-a1a1a1a10006> ] ) ] .

[] a geojson:FeatureCollection ;
    topo:faces ( <uuid:4ac3b91b-eeb7-428c-b5e9-7e8a3f0998ae> <uuid:4a294022-4864-49c7-8cee-f9e43360bc4e> <uuid:01947f47-ee13-44a9-85a4-2bcb4881982a> <uuid:607a3363-3eb7-4ce6-a633-86d2e565692b> <uuid:3c1f5c4b-d842-40b6-a332-99d50015fa8f> <uuid:fe522919-1421-4fd1-9930-8c6551e3f2a5> <uuid:2387ae98-9236-42fe-9414-c45b99954c41> <uuid:4ba85faa-3935-4e89-a9f8-dcd647a5dbed> ) ;
    topo:rings ( <uuid:a1a1a1a1-0001-4a1a-8a1a-a1a1a1a10001> <uuid:a1a1a1a1-0002-4a1a-8a1a-a1a1a1a10002> <uuid:a1a1a1a1-0003-4a1a-8a1a-a1a1a1a10003> <uuid:a1a1a1a1-0004-4a1a-8a1a-a1a1a1a10004> <uuid:a1a1a1a1-0005-4a1a-8a1a-a1a1a1a10005> <uuid:a1a1a1a1-0006-4a1a-8a1a-a1a1a1a10006> <uuid:a1a1a1a1-0007-4a1a-8a1a-a1a1a1a10007> <uuid:a1a1a1a1-0008-4a1a-8a1a-a1a1a1a10008> ) ;
    topo:shells ( <uuid:758590d2-8cc6-4ff7-8fcc-d7ecd01b3498> ) .


```


### Solid bounding a volume with an interior void
A Solid feature referencing two Shells via directed_references. The first ('+') is the
outer boundary Shell; the second ('-') is an interior Shell enclosing a void within the
solid.

#### json
```json
{
  "id": "uuid:7c9bc347-8ba2-48fb-97e6-cc3e223e1ae9",
  "type": "Feature",
  "geometry": null,
  "topology": {
    "type": "Solid",
    "directed_references": [
      {
        "ref": "uuid:e7bbe46f-e375-42b6-84aa-e284bc0b9568",
        "orientation": "+"
      },
      {
        "ref": "uuid:97a089af-4929-4d36-8e01-74f573343edb",
        "orientation": "-"
      }
    ]
  },
  "properties": {
    "description": "Cube with a void: outer Shell ('+') bounds the solid, inner Shell ('-') bounds the interior cavity",
    "volume": 487.765
  }
}

```

#### jsonld
```jsonld
{
  "@context": "https://surroundaustralia.github.io/topo-feature/build/annotated/geo/topo/features/topo-solid/context.jsonld",
  "id": "uuid:7c9bc347-8ba2-48fb-97e6-cc3e223e1ae9",
  "type": "Feature",
  "geometry": null,
  "topology": {
    "type": "Solid",
    "directed_references": [
      {
        "ref": "uuid:e7bbe46f-e375-42b6-84aa-e284bc0b9568",
        "orientation": "+"
      },
      {
        "ref": "uuid:97a089af-4929-4d36-8e01-74f573343edb",
        "orientation": "-"
      }
    ]
  },
  "properties": {
    "description": "Cube with a void: outer Shell ('+') bounds the solid, inner Shell ('-') bounds the interior cavity",
    "volume": 487.765
  }
}
```

#### ttl
```ttl
@prefix geojson: <https://purl.org/geojson/vocab#> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix topo: <https://purl.org/geojson/topo#> .

<uuid:7c9bc347-8ba2-48fb-97e6-cc3e223e1ae9> a geojson:Feature ;
    geojson:topology [ a topo:Solid ;
            topo:directedReferences ( [ topo:orientation "+" ;
                        topo:ref <uuid:e7bbe46f-e375-42b6-84aa-e284bc0b9568> ] [ topo:orientation "-" ;
                        topo:ref <uuid:97a089af-4929-4d36-8e01-74f573343edb> ] ) ] .


```

## Schema

```yaml
$schema: https://json-schema.org/draft/2020-12/schema
description: 'A Solid feature: a volumetric region bounded by one or more oriented
  Shell references. geometry must be null.'
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
          const: Solid
        directed_references:
          type: array
          description: Ordered list of oriented Shell references bounding the solid.
            The first entry is the outer boundary Shell; any additional entries describe
            interior void Shells.
          items:
            $ref: https://surroundaustralia.github.io/topo-feature/build/annotated/geo/topo/datatypes/oriented-ref/schema.yaml
          minItems: 1
      required:
      - type
      - directed_references
      not:
        required:
        - references
  required:
  - topology

```

Links to the schema:

* YAML version: [schema.yaml](https://surroundaustralia.github.io/topo-feature/build/annotated/geo/topo/features/topo-solid/schema.json)
* JSON version: [schema.json](https://surroundaustralia.github.io/topo-feature/build/annotated/geo/topo/features/topo-solid/schema.yaml)


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
[context.jsonld](https://surroundaustralia.github.io/topo-feature/build/annotated/geo/topo/features/topo-solid/context.jsonld)


# For developers

The source code for this Building Block can be found in the following repository:

* URL: [https://github.com/surroundaustralia/topo-feature](https://github.com/surroundaustralia/topo-feature)
* Path: `_sources/features/topo-solid`

