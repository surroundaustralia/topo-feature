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
