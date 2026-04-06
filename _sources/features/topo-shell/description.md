# Shell Topology Feature

A **Shell** is a topological feature representing a closed surface — the boundary of a volumetric Solid. It is composed of an ordered set of oriented Face references in its `directed_references` array.

A Shell is the 3D analog of a Ring: just as a Ring closes a 2D boundary from Edges, a Shell closes a 3D boundary from Faces.

## Topology Model

A Shell's topology consists of:

- `type`: `"Shell"`
- `directed_references`: an ordered array of [Oriented Object References](../../datatypes/oriented-ref/), each referencing a Face feature with a `ref` (feature ID) and `orientation` (`+` or `-`)

The `geometry` property is `null` — actual coordinates are derived from the referenced Face, Edge and Point features.

## Orientation

The orientation of each Face reference (`+` or `-`) indicates the outward normal direction with respect to the enclosed solid volume. Faces shared between adjacent solids appear with opposite orientations in each solid's shell.

## Relationship to other types

| Lower dimension | Shell | Higher dimension |
|---|---|---|
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
