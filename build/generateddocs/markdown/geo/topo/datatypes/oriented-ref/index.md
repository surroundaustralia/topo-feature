
# Oriented Object Reference (Datatype)

`ogc.geo.topo.datatypes.oriented-ref` *v0.1*

A datatype for referencing a topological object with an orientation indicator ('+' or '-'), used to define the sense (direction/orientation) of boundary elements such as edges in rings or faces in shells.

[*Status*](http://www.opengis.net/def/status): Under development

## Description

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

## Examples

### Oriented edge reference (forward)
An oriented reference to an edge feature, used as an element of a Ring's directed_references array.
The '+' orientation means the edge is traversed in its natural direction.

#### json
```json
{
  "ref": "uuid:4ac3b91b-eeb7-428c-b5e9-7e8a3f0998ae",
  "orientation": "+"
}

```

#### jsonld
```jsonld
{
  "@context": "https://surroundaustralia.github.io/topo-feature/build/annotated/geo/topo/datatypes/oriented-ref/context.jsonld",
  "ref": "uuid:4ac3b91b-eeb7-428c-b5e9-7e8a3f0998ae",
  "orientation": "+"
}
```

#### ttl
```ttl
@prefix topo: <https://purl.org/geojson/topo#> .

<uuid:4ac3b91b-eeb7-428c-b5e9-7e8a3f0998ae> topo:orientation "+" .


```


### Oriented edge reference (reverse)
An oriented reference to an edge feature traversed in reverse.
The '-' orientation means the edge is used in the opposite direction to its definition.
This allows the same edge to serve as a boundary of two adjacent faces without duplication.

#### json
```json
{
  "ref": "uuid:83ff2cdf-6c58-4e7b-ba55-e084eff8c569",
  "orientation": "-"
}

```

#### jsonld
```jsonld
{
  "@context": "https://surroundaustralia.github.io/topo-feature/build/annotated/geo/topo/datatypes/oriented-ref/context.jsonld",
  "ref": "uuid:83ff2cdf-6c58-4e7b-ba55-e084eff8c569",
  "orientation": "-"
}
```

#### ttl
```ttl
@prefix topo: <https://purl.org/geojson/topo#> .

<uuid:83ff2cdf-6c58-4e7b-ba55-e084eff8c569> topo:orientation "-" .


```

## Schema

```yaml
$schema: https://json-schema.org/draft/2020-12/schema
description: An oriented reference to a topological object, combining a reference
  identifier with an orientation indicator ('+' for forward/positive, '-' for reverse/negative).
  Used in Ring members (referencing edges) and Shell members (referencing faces).
type: object
properties:
  ref:
    $ref: https://opengeospatial.github.io/bblocks/annotated-schemas/ogc-utils/iri-or-curie/schema.yaml
    description: 'Identifier of the referenced topological object (e.g. a uuid: URI
      or local id)'
    x-jsonld-id: '@id'
  orientation:
    type: string
    enum:
    - +
    - '-'
    description: 'Orientation of the reference: ''+'' for forward/positive direction,
      ''-'' for reverse/negative direction'
    x-jsonld-id: https://purl.org/geojson/topo#orientation
required:
- ref
- orientation
x-jsonld-prefixes:
  topo: https://purl.org/geojson/topo#

```

Links to the schema:

* YAML version: [schema.yaml](https://surroundaustralia.github.io/topo-feature/build/annotated/geo/topo/datatypes/oriented-ref/schema.json)
* JSON version: [schema.json](https://surroundaustralia.github.io/topo-feature/build/annotated/geo/topo/datatypes/oriented-ref/schema.yaml)


# JSON-LD Context

```jsonld
{
  "@context": {
    "ref": "@id",
    "orientation": "topo:orientation",
    "topo": "https://purl.org/geojson/topo#",
    "@version": 1.1
  }
}
```

You can find the full JSON-LD context here:
[context.jsonld](https://surroundaustralia.github.io/topo-feature/build/annotated/geo/topo/datatypes/oriented-ref/context.jsonld)


# For developers

The source code for this Building Block can be found in the following repository:

* URL: [https://github.com/surroundaustralia/topo-feature](https://github.com/surroundaustralia/topo-feature)
* Path: `_sources/datatypes/oriented-ref`

