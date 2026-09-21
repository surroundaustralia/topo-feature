# Aggregate Solid Topology Feature

An **AggregateSolid** is a topological feature representing a single combined volumetric object
formed by aggregating a set of existing Solid features, referenced by id.

Unlike a Solid — which is bounded by an ordered, oriented set of Shell references
(`directed_references`) describing its own boundary — an AggregateSolid describes no boundary
geometry of its own. It is a plain, unordered list of member Solid ids in its `references`
array, mirroring how [AggregatePolygon](../../../features/topo-feature-multi-collection/) combines
Polygon-topology parcels one dimension down.

## Topology Model

An AggregateSolid's topology consists of:

- `type`: `"AggregateSolid"`
- `references`: an array of feature ids, each referencing a member Solid feature

The `geometry` property is `null` — a renderer resolves the aggregate's extent by resolving each
referenced Solid in turn, the same as it would for those Solids individually.

## Relationship to other types

| Lower dimension                          | AggregateSolid       | Higher dimension |
|-------------------------------------------|----------------------|-------------------|
| Solid (referenced in `references`)        | **AggregateSolid**   | — |

## Example

```json
{
  "topology": {
    "type": "AggregateSolid",
    "references": [
      "uuid:758590d2-8cc6-4ff7-8fcc-d7ecd01b3498",
      "uuid:e7bbe46f-e375-42b6-84aa-e284bc0b9568"
    ]
  }
}
```
