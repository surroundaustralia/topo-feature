
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

## Examples

### LineString topology (references style)
A topology object for an edge feature using plain string ID references.
The 'references' array names the two point features that form the line's endpoints.

#### json
```json
{
  "type": "LineString",
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
  "type": "LineString",
  "references": [
    "P1",
    "P2"
  ]
}
```

#### ttl
```ttl
@prefix geojson: <https://purl.org/geojson/vocab#> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .

[] a geojson:LineString ;
    geojson:relatedFeatures ( <http://www.example.com/features/P1> <http://www.example.com/features/P2> ) .


```


### Ring topology (directed_references style)
A Ring topology object using directed_references — each element has a 'ref' (Edge feature ID)
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


### Face topology (rings of directed_references)
A Face topology object. The 'rings' array contains Ring objects, each with
directed_references to Edge features. The first ring is the outer boundary.
'references' and 'directed_references' must not both be present.

#### json
```json
{
  "type": "Face",
  "rings": [
    {
      "type": "Ring",
      "directed_references": [
        { "ref": "uuid:c60507ba-226b-4e49-a702-e9afef899b23", "orientation": "+" },
        { "ref": "uuid:7dc1cc1c-8e7f-4666-9f52-4e6c2e6f57ac", "orientation": "+" },
        { "ref": "uuid:83ff2cdf-6c58-4e7b-ba55-e084eff8c569", "orientation": "+" },
        { "ref": "uuid:d69c596c-134e-4216-9bf6-d0f10e6886d8", "orientation": "+" }
      ]
    }
  ]
}

```

#### jsonld
```jsonld
{
  "@context": "https://surroundaustralia.github.io/topo-feature/build/annotated/geo/topo/datatypes/topology/context.jsonld",
  "type": "Face",
  "rings": [
    {
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
  ]
}
```

#### ttl
```ttl
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix topo: <https://purl.org/geojson/topo#> .

[] a topo:Face ;
    topo:rings ( [ a topo:Ring ;
                topo:directedReferences ( [ topo:orientation "+" ;
                            topo:ref <uuid:c60507ba-226b-4e49-a702-e9afef899b23> ] [ topo:orientation "+" ;
                            topo:ref <uuid:7dc1cc1c-8e7f-4666-9f52-4e6c2e6f57ac> ] [ topo:orientation "+" ;
                            topo:ref <uuid:83ff2cdf-6c58-4e7b-ba55-e084eff8c569> ] [ topo:orientation "+" ;
                            topo:ref <uuid:d69c596c-134e-4216-9bf6-d0f10e6886d8> ] ) ] ) .


```


### Solid topology (shells of directed_references)
A Solid topology object. The 'shells' array contains Shell objects, each with
directed_references to Face features forming the closed boundary surface.

#### json
```json
{
  "type": "Solid",
  "shells": [
    {
      "type": "Shell",
      "directed_references": [
        { "ref": "uuid:4ac3b91b-eeb7-428c-b5e9-7e8a3f0998ae", "orientation": "+" },
        { "ref": "uuid:4a294022-4864-49c7-8cee-f9e43360bc4e", "orientation": "+" },
        { "ref": "uuid:01947f47-ee13-44a9-85a4-2bcb4881982a", "orientation": "+" },
        { "ref": "uuid:607a3363-3eb7-4ce6-a633-86d2e565692b", "orientation": "+" },
        { "ref": "uuid:3c1f5c4b-d842-40b6-a332-99d50015fa8f", "orientation": "+" },
        { "ref": "uuid:2387ae98-9236-42fe-9414-c45b99954c41", "orientation": "+" }
      ]
    }
  ]
}

```

#### jsonld
```jsonld
{
  "@context": "https://surroundaustralia.github.io/topo-feature/build/annotated/geo/topo/datatypes/topology/context.jsonld",
  "type": "Solid",
  "shells": [
    {
      "type": "Shell",
      "directed_references": [
        {
          "ref": "uuid:4ac3b91b-eeb7-428c-b5e9-7e8a3f0998ae",
          "orientation": "+"
        },
        {
          "ref": "uuid:4a294022-4864-49c7-8cee-f9e43360bc4e",
          "orientation": "+"
        },
        {
          "ref": "uuid:01947f47-ee13-44a9-85a4-2bcb4881982a",
          "orientation": "+"
        },
        {
          "ref": "uuid:607a3363-3eb7-4ce6-a633-86d2e565692b",
          "orientation": "+"
        },
        {
          "ref": "uuid:3c1f5c4b-d842-40b6-a332-99d50015fa8f",
          "orientation": "+"
        },
        {
          "ref": "uuid:2387ae98-9236-42fe-9414-c45b99954c41",
          "orientation": "+"
        }
      ]
    }
  ]
}
```

#### ttl
```ttl
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix topo: <https://purl.org/geojson/topo#> .

[] a topo:Solid ;
    topo:shells ( [ a topo:Shell ;
                topo:directedReferences ( [ topo:orientation "+" ;
                            topo:ref <uuid:4ac3b91b-eeb7-428c-b5e9-7e8a3f0998ae> ] [ topo:orientation "+" ;
                            topo:ref <uuid:4a294022-4864-49c7-8cee-f9e43360bc4e> ] [ topo:orientation "+" ;
                            topo:ref <uuid:01947f47-ee13-44a9-85a4-2bcb4881982a> ] [ topo:orientation "+" ;
                            topo:ref <uuid:607a3363-3eb7-4ce6-a633-86d2e565692b> ] [ topo:orientation "+" ;
                            topo:ref <uuid:3c1f5c4b-d842-40b6-a332-99d50015fa8f> ] [ topo:orientation "+" ;
                            topo:ref <uuid:2387ae98-9236-42fe-9414-c45b99954c41> ] ) ] ) .


```

## Schema

```yaml
$schema: https://json-schema.org/draft/2020-12/schema
description: 'Topology datatype for topo-features. Supports two reference styles:
  ''references'' (array of string IDs) for simple positional references, and ''directed_references''
  (array of oriented object references with ref+orientation) for references where
  traversal direction matters. Exactly one of the two must be present.'
$defs:
  refOrNest:
    oneOf:
    - type: array
      items:
        $ref: '#/$defs/refOrNest'
    - $ref: https://opengeospatial.github.io/bblocks/annotated-schemas/ogc-utils/iri-or-curie/schema.yaml
    - $ref: https://surroundaustralia.github.io/topo-feature/build/annotated/geo/topo/datatypes/oriented-ref/schema.yaml
oneOf:
- description: Plain string ID references (e.g. LineString referencing point nodes)
  required:
  - references
  not:
    required:
    - directed_references
  properties:
    type:
      type: string
      x-jsonld-id: '@type'
    references:
      type: array
      items:
        $ref: '#/$defs/refOrNest'
      x-jsonld-id: https://purl.org/geojson/vocab#relatedFeatures
      x-jsonld-type: '@id'
      x-jsonld-container: '@list'
- description: "Oriented (directed) references \u2014 each with 'ref' and 'orientation'.
    Used for Ring, Shell."
  required:
  - directed_references
  not:
    required:
    - references
  properties:
    type:
      type: string
      x-jsonld-id: '@type'
    directed_references:
      type: array
      items:
        $ref: https://surroundaustralia.github.io/topo-feature/build/annotated/geo/topo/datatypes/oriented-ref/schema.yaml
      x-jsonld-id: https://purl.org/geojson/topo#directedReferences
      x-jsonld-container: '@list'
- description: "Face topology \u2014 rings of directed Edge references"
  required:
  - rings
  not:
    required:
    - references
    - directed_references
  properties:
    type:
      type: string
      const: Face
      x-jsonld-id: '@type'
    rings:
      type: array
      minItems: 1
      items:
        type: object
        required:
        - type
        - directed_references
        properties:
          type:
            type: string
            const: Ring
            x-jsonld-id: '@type'
          directed_references:
            type: array
            minItems: 3
            items:
              $ref: https://surroundaustralia.github.io/topo-feature/build/annotated/geo/topo/datatypes/oriented-ref/schema.yaml
            x-jsonld-id: https://purl.org/geojson/topo#directedReferences
            x-jsonld-container: '@list'
      x-jsonld-id: https://purl.org/geojson/topo#rings
      x-jsonld-container: '@list'
- description: "Solid topology \u2014 shells of directed Face references"
  required:
  - shells
  not:
    required:
    - references
    - directed_references
  properties:
    type:
      type: string
      const: Solid
      x-jsonld-id: '@type'
    shells:
      type: array
      minItems: 1
      items:
        type: object
        required:
        - type
        - directed_references
        properties:
          type:
            type: string
            const: Shell
            x-jsonld-id: '@type'
          directed_references:
            type: array
            minItems: 4
            items:
              $ref: https://surroundaustralia.github.io/topo-feature/build/annotated/geo/topo/datatypes/oriented-ref/schema.yaml
            x-jsonld-id: https://purl.org/geojson/topo#directedReferences
            x-jsonld-container: '@list'
      x-jsonld-id: https://purl.org/geojson/topo#shells
      x-jsonld-container: '@list'
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
    x-jsonld-id: topo:ref
  orientation: https://purl.org/geojson/topo#orientation
  Face: https://purl.org/geojson/topo#Face
  Ring: https://purl.org/geojson/topo#Ring
  Shell: https://purl.org/geojson/topo#Shell
  Solid: https://purl.org/geojson/topo#Solid
x-jsonld-prefixes:
  geojson: https://purl.org/geojson/vocab#
  csdm: https://linked.data.gov.au/def/csdm/
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
      "@context": {
        "ref": {
          "@type": "@id",
          "@id": "topo:ref"
        }
      },
      "@id": "geojson:relatedFeatures",
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
    "rings": {
      "@id": "topo:rings",
      "@container": "@list"
    },
    "shells": {
      "@id": "topo:shells",
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
    "Face": "topo:Face",
    "Ring": "topo:Ring",
    "Shell": "topo:Shell",
    "Solid": "topo:Solid",
    "geojson": "https://purl.org/geojson/vocab#",
    "csdm": "https://linked.data.gov.au/def/csdm/",
    "dct": "http://purl.org/dc/terms/",
    "topo": "https://purl.org/geojson/topo#",
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

