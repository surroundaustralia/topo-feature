
# Geometry using references (Schema)

`ogc.geo.topo.datatypes.topology` *v0.1*

Demonstration of a schema using coordinates of points, withpout duplication

[*Status*](http://www.opengis.net/def/status): Under development

## Description

## Topology

A datatype defining topological relationships between features using references (IDs) rather than inline coordinates.

### Reference Styles

Two mutually exclusive reference styles are supported — exactly one must be present in each topology object:

**`references`** — a plain ordered array of string feature IDs (or nested arrays thereof). Used for positional references where traversal direction is not meaningful, e.g. a LineString naming its vertex point features:

```json
{ "type": "Edge", "references": ["uuid:point-a", "uuid:point-b"] }
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

## Examples

### LineString topology (references style)
A topology object for an edge feature using plain string ID references.
The 'references' array names the two point features that form the line's endpoints.

#### json
```json
{
  "type": "Edge",
  "references": [
    "P1",
    "P2"
  ]
}
```

#### jsonld
```jsonld
{
  "@context": "https://surroundaustralia.github.io/topo-feature/build/annotated/geo/topo/datatypes/topology/context.jsonld",
  "type": "Edge",
  "references": [
    "P1",
    "P2"
  ]
}
```

#### ttl
```ttl
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix topo: <https://purl.org/geojson/topo#> .

[] a topo:Edge ;
    topo:relatedFeatures ( <http://www.example.com/features/P1> <http://www.example.com/features/P2> ) .


```


### Topology Relationships
A topology object for an edge feature using plain string ID references.
The 'references' array names the two point features that form the line's endpoints.

#### json
```json
{
  "type": "Edge",
  "references": [
    "P1",
    "P2"
  ],
  "relationships": [
    {
      "rel": "topology",
      "href": "L2",
      "role": "geof:sfTouches"
    }
  ]
}
```

#### jsonld
```jsonld
{
  "@context": "https://surroundaustralia.github.io/topo-feature/build/annotated/geo/topo/datatypes/topology/context.jsonld",
  "type": "Edge",
  "references": [
    "P1",
    "P2"
  ],
  "relationships": [
    {
      "rel": "topology",
      "href": "L2",
      "role": "geof:sfTouches"
    }
  ]
}
```

#### ttl
```ttl
@prefix ns1: <http://www.iana.org/assignments/> .
@prefix oa: <http://www.w3.org/ns/oa#> .
@prefix prof: <http://www.w3.org/ns/dx/prof/> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix topo: <https://purl.org/geojson/topo#> .

[] a topo:Edge ;
    topo:relatedFeatures ( <http://www.example.com/features/P1> <http://www.example.com/features/P2> ),
        ( [ ns1:relation <http://www.iana.org/assignments/relation/topology> ;
                prof:hasRole <geof:sfTouches> ;
                oa:hasTarget <http://www.example.com/features/L2> ] ) .


```


### Ring topology (directed_references style)
A Ring topology object uses directed_references — each element has a 'ref' (Edge feature ID)
and an 'orientation' ('+' or '-'). Mutually exclusive with 'references'.

#### json
```json
{
  "type": "Ring",
  "directed_references": [
    { "ref": "uuid:c60507ba-226b-4e49-a702-e9afef899b23", "orientation": "+" },
    { "ref": "uuid:7dc1cc1c-8e7f-4666-9f52-4e6c2e6f57ac", "orientation": "+" },
    { "ref": "uuid:83ff2cdf-6c58-4e7b-ba55-e084eff8c569", "orientation": "+" },
    { "ref": "uuid:d69c596c-134e-4216-9bf6-d0f10e6886d8", "orientation": "+" }
  ]
}

```

#### jsonld
```jsonld
{
  "@context": "https://surroundaustralia.github.io/topo-feature/build/annotated/geo/topo/datatypes/topology/context.jsonld",
  "type": "Ring",
  "directed_references": [
    {
      "ref": "uuid:c60507ba-226b-4e49-a702-e9afef899b23",
      "orientation": "+"
    },
    {
      "ref": "uuid:7dc1cc1c-8e7f-4666-9f52-4e6c2e6f57ac",
      "orientation": "+"
    },
    {
      "ref": "uuid:83ff2cdf-6c58-4e7b-ba55-e084eff8c569",
      "orientation": "+"
    },
    {
      "ref": "uuid:d69c596c-134e-4216-9bf6-d0f10e6886d8",
      "orientation": "+"
    }
  ]
}
```

#### ttl
```ttl
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix topo: <https://purl.org/geojson/topo#> .

[] a topo:Ring ;
    topo:directedReferences ( [ topo:orientation "+" ;
                topo:ref <uuid:c60507ba-226b-4e49-a702-e9afef899b23> ] [ topo:orientation "+" ;
                topo:ref <uuid:7dc1cc1c-8e7f-4666-9f52-4e6c2e6f57ac> ] [ topo:orientation "+" ;
                topo:ref <uuid:83ff2cdf-6c58-4e7b-ba55-e084eff8c569> ] [ topo:orientation "+" ;
                topo:ref <uuid:d69c596c-134e-4216-9bf6-d0f10e6886d8> ] ) .


```


### Face topology (directed_references to Ring features)
A Face topology object uses directed_references to reference Ring features.
Each element has a 'ref' (Ring feature ID) and an 'orientation' ('+' or '-').
Mutually exclusive with 'references'.

#### json
```json
{
  "type": "Face",
  "directed_references": [
    { "ref": "uuid:c60507ba-226b-4e49-a702-e9afef899b23", "orientation": "+" }
  ]
}

```

#### jsonld
```jsonld
{
  "@context": "https://surroundaustralia.github.io/topo-feature/build/annotated/geo/topo/datatypes/topology/context.jsonld",
  "type": "Face",
  "directed_references": [
    {
      "ref": "uuid:c60507ba-226b-4e49-a702-e9afef899b23",
      "orientation": "+"
    }
  ]
}
```

#### ttl
```ttl
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix topo: <https://purl.org/geojson/topo#> .

[] a topo:Face ;
    topo:directedReferences ( [ topo:orientation "+" ;
                topo:ref <uuid:c60507ba-226b-4e49-a702-e9afef899b23> ] ) .


```


### Shell topology (directed_references to Face features)
A Shell topology object uses directed_references to reference Face features.
Each element has a 'ref' (Face feature ID) and an 'orientation' ('+' or '-').
Mutually exclusive with 'references'.

#### json
```json
{
  "type": "Shell",
  "directed_references": [
    { "ref": "uuid:4ac3b91b-eeb7-428c-b5e9-7e8a2f0998ae", "orientation": "+" },
    { "ref": "uuid:4ac3b91b-eeb7-428c-b5e9-7e8a3f0998ae", "orientation": "+" },
    { "ref": "uuid:4ac3b91b-eeb7-428c-b7e9-7e8a3f0998ae", "orientation": "-" },
    { "ref": "uuid:4ac4b91b-eeb7-428c-b5e9-7e8a3f0998ae", "orientation": "+" }
  ]
}

```

#### jsonld
```jsonld
{
  "@context": "https://surroundaustralia.github.io/topo-feature/build/annotated/geo/topo/datatypes/topology/context.jsonld",
  "type": "Shell",
  "directed_references": [
    {
      "ref": "uuid:4ac3b91b-eeb7-428c-b5e9-7e8a2f0998ae",
      "orientation": "+"
    },
    {
      "ref": "uuid:4ac3b91b-eeb7-428c-b5e9-7e8a3f0998ae",
      "orientation": "+"
    },
    {
      "ref": "uuid:4ac3b91b-eeb7-428c-b7e9-7e8a3f0998ae",
      "orientation": "-"
    },
    {
      "ref": "uuid:4ac4b91b-eeb7-428c-b5e9-7e8a3f0998ae",
      "orientation": "+"
    }
  ]
}
```

#### ttl
```ttl
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix topo: <https://purl.org/geojson/topo#> .

[] a topo:Shell ;
    topo:directedReferences ( [ topo:orientation "+" ;
                topo:ref <uuid:4ac3b91b-eeb7-428c-b5e9-7e8a2f0998ae> ] [ topo:orientation "+" ;
                topo:ref <uuid:4ac3b91b-eeb7-428c-b5e9-7e8a3f0998ae> ] [ topo:orientation "-" ;
                topo:ref <uuid:4ac3b91b-eeb7-428c-b7e9-7e8a3f0998ae> ] [ topo:orientation "+" ;
                topo:ref <uuid:4ac4b91b-eeb7-428c-b5e9-7e8a3f0998ae> ] ) .


```


### Solid topology (directed_references to Shell features)
A Solid topology object uses directed_references to reference Shell features.
Each element has a 'ref' (Shell feature ID) and an 'orientation' ('+' or '-').
Mutually exclusive with 'references'.

#### json
```json
{
  "type": "Solid",
  "directed_references": [
    { "ref": "uuid:4ac3b91b-eeb7-428c-b5e9-7e8a3f0998ae", "orientation": "+" }
  ]
}

```

#### jsonld
```jsonld
{
  "@context": "https://surroundaustralia.github.io/topo-feature/build/annotated/geo/topo/datatypes/topology/context.jsonld",
  "type": "Solid",
  "directed_references": [
    {
      "ref": "uuid:4ac3b91b-eeb7-428c-b5e9-7e8a3f0998ae",
      "orientation": "+"
    }
  ]
}
```

#### ttl
```ttl
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix topo: <https://purl.org/geojson/topo#> .

[] a topo:Solid ;
    topo:directedReferences ( [ topo:orientation "+" ;
                topo:ref <uuid:4ac3b91b-eeb7-428c-b5e9-7e8a3f0998ae> ] ) .


```

## Schema

```yaml
$schema: https://json-schema.org/draft/2020-12/schema
description: 'Topology datatype for topo-features. Supports two reference styles:
  ''references'' (array of string IDs) for simple positional references, and ''directed_references''
  (array of oriented object references with ref+orientation) for references where
  traversal direction matters. Exactly one of the two must be present.'
$defs:
  simpleRefs:
    description: Plain string ID references (e.g. LineString referencing point nodes)
    properties:
      type:
        not:
          enum:
          - Face
          - Ring
          - Shell
          - Solid
        x-jsonld-id: '@type'
      references:
        type: array
        items:
          $ref: https://opengeospatial.github.io/bblocks/annotated-schemas/ogc-utils/iri-or-curie/schema.yaml
        x-jsonld-id: https://purl.org/geojson/topo#relatedFeatures
        x-jsonld-type: '@id'
        x-jsonld-container: '@list'
    required:
    - references
    not:
      required:
      - directed_references
  nestedRefs:
    description: Plain string ID references (e.g. LineString referencing point nodes)
    properties:
      type:
        enum:
        - MultiLineString
        - Polygon
        - Polyhedron
        - Solid
        x-jsonld-id: '@type'
      references:
        type: array
        items:
          type: array
          items:
            oneOf:
            - $ref: https://opengeospatial.github.io/bblocks/annotated-schemas/ogc-utils/iri-or-curie/schema.yaml
            - description: wont check contents deeper
              type: array
        x-jsonld-id: https://purl.org/geojson/topo#relatedFeatures
        x-jsonld-type: '@id'
        x-jsonld-container: '@list'
    required:
    - references
    not:
      required:
      - directed_references
  directedRefs:
    description: "Oriented (directed) references \u2014 each with 'ref' and 'orientation'.
      Used for Ring, Shell."
    properties:
      type:
        enum:
        - Face
        - Ring
        - Shell
        - Solid
        x-jsonld-id: '@type'
      directed_references:
        type: array
        items:
          $ref: https://surroundaustralia.github.io/topo-feature/build/annotated/geo/topo/datatypes/oriented-ref/schema.yaml
        x-jsonld-id: https://purl.org/geojson/topo#directedReferences
        x-jsonld-container: '@list'
    required:
    - directed_references
    not:
      required:
      - references
allOf:
- oneOf:
  - $ref: '#/$defs/simpleRefs'
  - $ref: '#/$defs/nestedRefs'
  - $ref: '#/$defs/directedRefs'
- properties:
    type:
      type: string
      x-jsonld-id: '@type'
    relationships:
      type: array
      items:
        allOf:
        - $ref: https://opengeospatial.github.io/bblocks/annotated-schemas/geo/json-fg/link-role/schema.yaml
        - properties:
            rel:
              const: topology
          required:
          - rel
      x-jsonld-id: https://purl.org/geojson/topo#relatedFeatures
      x-jsonld-type: '@id'
      x-jsonld-container: '@list'
  required:
  - type
x-jsonld-extra-terms:
  LineString: https://purl.org/geojson/vocab#LineString
  MultiLineString: https://purl.org/geojson/vocab#MultiLineString
  MultiPolygon: https://purl.org/geojson/vocab#MultiPolygon
  Polygon: https://purl.org/geojson/vocab#Polygon
  Arc: https://purl.org/geojson/vocab#Arc
  ArcWithCenter: https://purl.org/geojson/vocab#ArcWithCenter
  ArcByChord: https://purl.org/geojson/vocab#ArcByChord
  CircleByCenter: https://purl.org/geojson/vocab#CircleByCenter
  CubicSpline: https://purl.org/geojson/vocab#CubicSpline
  radius: https://purl.org/geojson/vocab#radius
  arcLength: https://purl.org/geojson/vocab#arcLength
  startTangentVector: https://purl.org/geojson/vocab#startTangentVector
  endTangentVector: https://purl.org/geojson/vocab#endTangentVector
  ref:
    x-jsonld-id: https://purl.org/geojson/topo#ref
  orientation: https://purl.org/geojson/topo#orientation
  Edge: https://purl.org/geojson/topo#Edge
  Face: https://purl.org/geojson/topo#Face
  Ring: https://purl.org/geojson/topo#Ring
  Shell: https://purl.org/geojson/topo#Shell
  Solid: https://purl.org/geojson/topo#Solid
  rings:
    x-jsonld-id: https://purl.org/geojson/topo#rings
    x-jsonld-container: '@list'
  shells:
    x-jsonld-id: https://purl.org/geojson/topo#shells
    x-jsonld-container: '@list'
  faces:
    x-jsonld-id: https://purl.org/geojson/topo#faces
    x-jsonld-container: '@list'
x-jsonld-prefixes:
  geojson: https://purl.org/geojson/vocab#
  topo: https://purl.org/geojson/topo#
  dct: http://purl.org/dc/terms/

```

Links to the schema:

* YAML version: [schema.yaml](https://surroundaustralia.github.io/topo-feature/build/annotated/geo/topo/datatypes/topology/schema.json)
* JSON version: [schema.json](https://surroundaustralia.github.io/topo-feature/build/annotated/geo/topo/datatypes/topology/schema.yaml)


# JSON-LD Context

```jsonld
{
  "@context": {
    "type": "@type",
    "references": {
      "@id": "topo:relatedFeatures",
      "@type": "@id",
      "@container": "@list"
    },
    "directed_references": {
      "@context": {
        "ref": {
          "@type": "@id",
          "@id": "topo:ref"
        }
      },
      "@id": "topo:directedReferences",
      "@container": "@list"
    },
    "relationships": {
      "@context": {
        "href": {
          "@type": "@id",
          "@id": "oa:hasTarget"
        },
        "rel": {
          "@context": {
            "@base": "http://www.iana.org/assignments/relation/"
          },
          "@id": "http://www.iana.org/assignments/relation",
          "@type": "@id"
        },
        "type": "dct:type",
        "hreflang": "dct:language",
        "title": "rdfs:label",
        "length": "dct:extent",
        "role": {
          "@id": "prof:hasRole",
          "@type": "@id"
        },
        "conformsTo": {
          "@id": "dct:conformsTo",
          "@type": "@id"
        }
      },
      "@id": "topo:relatedFeatures",
      "@type": "@id",
      "@container": "@list"
    },
    "LineString": "geojson:LineString",
    "MultiLineString": "geojson:MultiLineString",
    "MultiPolygon": "geojson:MultiPolygon",
    "Polygon": "geojson:Polygon",
    "Arc": "geojson:Arc",
    "ArcWithCenter": "geojson:ArcWithCenter",
    "ArcByChord": "geojson:ArcByChord",
    "CircleByCenter": "geojson:CircleByCenter",
    "CubicSpline": "geojson:CubicSpline",
    "radius": "geojson:radius",
    "arcLength": "geojson:arcLength",
    "startTangentVector": "geojson:startTangentVector",
    "endTangentVector": "geojson:endTangentVector",
    "ref": "topo:ref",
    "orientation": "topo:orientation",
    "Edge": "topo:Edge",
    "Face": "topo:Face",
    "Ring": "topo:Ring",
    "Shell": "topo:Shell",
    "Solid": "topo:Solid",
    "rings": {
      "@id": "topo:rings",
      "@container": "@list"
    },
    "shells": {
      "@id": "topo:shells",
      "@container": "@list"
    },
    "faces": {
      "@id": "topo:faces",
      "@container": "@list"
    },
    "geojson": "https://purl.org/geojson/vocab#",
    "topo": "https://purl.org/geojson/topo#",
    "dct": "http://purl.org/dc/terms/",
    "oa": "http://www.w3.org/ns/oa#",
    "rdfs": "http://www.w3.org/2000/01/rdf-schema#",
    "prof": "http://www.w3.org/ns/dx/prof/",
    "@version": 1.1
  }
}
```

You can find the full JSON-LD context here:
[context.jsonld](https://surroundaustralia.github.io/topo-feature/build/annotated/geo/topo/datatypes/topology/context.jsonld)


# For developers

The source code for this Building Block can be found in the following repository:

* URL: [https://github.com/surroundaustralia/topo-feature](https://github.com/surroundaustralia/topo-feature)
* Path: `_sources/datatypes/topology`

