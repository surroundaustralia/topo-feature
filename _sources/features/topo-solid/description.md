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
