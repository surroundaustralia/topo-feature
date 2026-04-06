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
