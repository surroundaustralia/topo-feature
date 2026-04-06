# Ring Topology Feature

A **Ring** is a topological feature representing an ordered, closed loop of oriented Edge references. It forms the boundary of a Face.

## Topology Model

A Ring's topology consists of:

- `type`: `"Ring"`
- `directed_references`: an ordered array of [Oriented Object References](../../datatypes/oriented-ref/), each referencing an Edge feature with a `ref` (feature ID) and `orientation` (`+` or `-`)

The `directed_references` form a closed loop: the end vertex of each edge (considering orientation) must equal the start vertex of the next.

## Orientation

Each directed reference specifies an orientation (`+` or `-`) indicating whether the referenced Edge is traversed in its natural or reversed direction. This allows edges to be shared between adjacent faces.

## Example

```json
{
  "topology": {
    "type": "Ring",
    "directed_references": [
      { "ref": "uuid:c60507ba-226b-4e49-a702-e9afef899b23", "orientation": "+" },
      { "ref": "uuid:7dc1cc1c-8e7f-4666-9f52-4e6c2e6f57ac", "orientation": "+" },
      { "ref": "uuid:83ff2cdf-6c58-4e7b-ba55-e084eff8c569", "orientation": "+" },
      { "ref": "uuid:d69c596c-134e-4216-9bf6-d0f10e6886d8", "orientation": "+" }
    ]
  }
}
```
