# Topo Feature Multi-Collection

A **Topo Feature Multi-Collection** is a structured dataset that organises topological features into typed named collections, one for each topological dimension. 
This enables representation of a full topology hierarchy — from point nodes to volumetric solids — in a single, self-describing document.

## Structure

| Collection key | Feature type                    | Building block                   | Topology property                                  |
|----------------|---------------------------------|----------------------------------|----------------------------------------------------|
| `points`       | Point geometry nodes            | GeoJSON Feature (Point geometry) | — (explicit coordinates)                           |
| `edges`        | Edge (line) topology            | `topo-line`                      | `references`: ordered (string) point IDs           |
| `rings`        | Ring (closed curve) topology    | `topo-ring`                      | `edge[].directed_references`: oriented Edge refs   |
| `faces`        | Face (polygon surface) topology | `topo-face`                      | `rings[].directed_references`: oriented Ring refs  |
| `shells`       | Shell (closed surface) topology | `topo-shell`                     | `face[].directed_references`: oriented Face refs   |
| `solids`       | Solid (volumetric) topology     | `topo-feature` (Solid/Shell)     | `shells[].directed_references`: oriented Face refs |

## Reference models

Two reference styles are used, each appropriate to the relationship type:

- **`references`** — a plain ordered array of string feature IDs. Used for edges referencing point nodes, where position (not direction) is what matters.
- **`directed_references`** — an ordered array of oriented object references `{ "ref": "...", "orientation": "+"|"-" }`. 
Used for Rings referencing Edges, Faces referencing Edges, Shells referencing Faces, and Solids referencing Shells, where traversal direction determines the sense of the boundary.

The two styles must not coexist within the same topology object.

Orientation is needed where the same primitive can be reused in opposite directions or on opposite sides of a higher-dimensional object. 
A point has no direction, so an edge does not need to reference an “oriented point” in the same way that a ring references an oriented edge or a shell references an oriented face.
Edges orientation is defined by an edges `startPoint` and `endPoint`. 

Orientation is important because it defines which side of a face is inside or outside A solid.
Shells bound a solid; shells are made from faces; faces are bounded by rings; rings use edges. 
To know whether the solid is valid, closed, and consistently formed, it is important to understand which way each face is pointing.

While for 2D polygons, orientation can be optional as exterior and interior boundaries can be readily identified. 
For 3D solids orientation should be explicit, as interpreting unoriented 3D solids is harder and riskier because reversing a face can invert the local meaning of a solid boundary.

## Referential integrity chain

```
solids
  └─ topology.shells[].directed_references → Face IDs
       └─ topology.faces[].directed_references → Ring IDs
            └─ topology.rings[].directed_references → Edge IDs   
                └─ topology.edges[].references → Point IDs
                    └─ points.geometry.coordinates (actual 3D coordinates)
```

`geometry` is `null` on all feature types except Points — coordinates are derived by following the reference chain.

## Example skeleton

```json
{
  "type": "FeatureCollection",
  "points": [ { "type": "Feature", "geometry": { "type": "Point", "coordinates": [...] }, ... } ],
  "edges":  [ { "type": "Feature", "geometry": null, "topology": { "type": "Edge", "references": ["uuid:...", "uuid:..."] }, ... } ],
  "rings":  [ { "type": "Feature", "geometry": null, "topology": { "type": "Ring", "directed_references": [{ "ref": "uuid:...", "orientation": "+" }, ... ] }, ... } ],
  "faces":  [ { "type": "Feature", "geometry": null, "topology": { "type": "Face", "directed_references": [{ "ref": "uuid:...", "orientation": "+" }, ... ] }, ... } ],
  "shells": [ { "type": "Feature", "geometry": null, "topology": { "type": "Shell", "directed_references": [{ "ref": "uuid:...", "orientation": "-" }, ... ] }, ... } ],
  "solids": [ { "type": "Feature", "geometry": null, "topology": { "type": "Solid", "directed_references": [{ "ref": "uuid:...", "orientation": "+" }, ... ] }, ... } ]
}
```
