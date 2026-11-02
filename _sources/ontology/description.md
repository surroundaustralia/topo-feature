## Topo-Feature ontology

The classes and properties bound by the Topo-Feature JSON-LD contexts.

The value of a feature's `topology` property (`geojson:topology`) is typed with a topology class: `topo:Edge`,
`topo:Ring`, `topo:Face`, `topo:Shell`, `topo:Solid`, `topo:AggregateSolid` or `topo:AggregatePolygon` (all subclasses
of `topo:Topology`),
or one of the curve types `Arc`, `ArcWithCenter`, `ArcByChord`, `CircleByCenter` and `CubicSpline`.

| JSON property | RDF |
|---|---|
| `topology` | `geojson:topology` |
| `references`, `relationships` | `topo:relatedFeatures` (an ordered list) |
| `directed_references` | `topo:directedReferences` (an ordered list of `topo:OrientedReference`) |
| `ref`, `orientation` | `topo:ref`, `topo:orientation` |
| `points`, `edges`, `rings`, `faces`, `shells`, `solids` | `topo:points` ... `topo:solids` |
| `circumference` | `topo:circumference` |
| `radius`, `arcLength`, `startTangentVector`, `endTangentVector` | `geojson:radius` ... `geojson:endTangentVector` |

### Terms in the GeoJSON-LD namespace

The Topo-Feature contexts map `topology`, the curve types, `radius`, `arcLength` and the tangent vectors into the
GeoJSON-LD namespace (`https://purl.org/geojson/vocab#`), which does not define them. They are declared in this
ontology (with `rdfs:isDefinedBy` the Topo-Feature ontology) so that the existing bindings resolve, and may move to
a more suitable namespace when one is available (for example GeoSPARQL 1.3).

### Known binding issue

`references` (an ordered list of member references) and `relationships` (typed links with `rel` = `topology`) both
map to `topo:relatedFeatures`.
