## Feature with explicit Topology

A feature type that defines its geometry through topological references to other features, rather than inline coordinates.

The `topology` property references an ordered list of other features by ID. The `geometry` property is `null` when geometry is fully defined by topology — actual coordinates are resolved from the referenced features (ultimately from Point features with explicit coordinates).

### Reference styles

The topology object uses exactly one of two reference styles (they must not coexist):

- **`references`**: an ordered array of plain string feature IDs. Used for positional relationships, e.g. a LineString edge referencing its two vertex Point features.

- **`directed_references`**: an ordered array of oriented object references `{ "ref": "...", "orientation": "+"|"-" }`. Used when traversal direction matters — Ring boundaries (referencing Edges) and Shell boundaries (referencing Faces).

### Topology hierarchy

Higher-order topology types use structured containers:

- **Face** uses `rings` — each ring is `{ type: "Ring", directed_references: [...edge refs...] }`
- **Solid** uses `shells` — each shell is `{ type: "Shell", directed_references: [...face refs...] }`

This is a generalisation of the TopoJSON concept using identified features rather than inline coordinate compaction. It supports explicit CRS and is not limited to LineStrings — topologically defined objects can be surfaces, solids, swept volumes, or any other concept where geometry is derivable from referenced elements.
