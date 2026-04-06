## Topology

A datatype defining topological relationships between features using references (IDs) rather than inline coordinates.

### Reference Styles

Two mutually exclusive reference styles are supported — exactly one must be present in each topology object:

**`references`** — a plain ordered array of string feature IDs (or nested arrays thereof). Used for positional references where traversal direction is not meaningful, e.g. a LineString naming its vertex point features:

```json
{ "type": "LineString", "references": ["uuid:point-a", "uuid:point-b"] }
```

**`directed_references`** — an ordered array of oriented object references, each with `ref` (feature ID) and `orientation` (`"+"` or `"-"`). Used where traversal direction matters, e.g. Ring boundaries and Shell boundaries:

```json
{
  "type": "Ring",
  "directed_references": [
    { "ref": "uuid:edge-1", "orientation": "+" },
    { "ref": "uuid:edge-2", "orientation": "-" }
  ]
}
```

### Structured sub-object styles

For higher-order topology, structured arrays group directed_references:

- **Face** topology uses a `rings` array, each ring being a `{ type: "Ring", directed_references: [...] }` object
- **Solid** topology uses a `shells` array, each shell being a `{ type: "Shell", directed_references: [...] }` object

### geometry is null

When topology is used, the feature's `geometry` property should be `null`. Actual coordinates are resolved by following the reference chain from the feature down to Point features that carry explicit coordinates.

### Hierarchy

```
Solid  → shells[].directed_references → Face IDs
Face   → rings[].directed_references  → Edge IDs
Edge   → references                   → Point IDs
Point  → geometry.coordinates         → [x, y, z]
```
