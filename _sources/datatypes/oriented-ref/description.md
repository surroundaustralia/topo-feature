# Oriented Object Reference

A datatype representing an oriented reference to a topological object — the atomic element used in `directed_references` arrays.

## Usage

`directed_references` arrays appear in:

- **Ring** topology — each element references an **Edge** feature with an orientation
- **Shell** topology — each element references a **Face** feature with an orientation
- **Solid** topology (inline in shells array) — same pattern

This is distinct from plain `references`, which is an array of simple string IDs used for positional references (e.g. a LineString referencing point nodes by ID).

## Orientation Semantics

| Value | Meaning |
|---|---|
| `"+"` | Forward/positive: the object is used in its natural direction |
| `"-"` | Reverse/negative: the object is traversed in the opposite direction |

Sharing edges between faces (and faces between shells) without duplication is achieved by varying orientation.

## Example

```json
{
  "ref": "uuid:4ac3b91b-eeb7-428c-b5e9-7e8a3f0998ae",
  "orientation": "+"
}
```
