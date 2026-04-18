
# Ring Topology Feature (Schema)

`ogc.geo.topo.features.topo-ring` *v0.1*

A feature representing a Ring in topology: an ordered, closed sequence of oriented Edge references that form a boundary loop. A Ring is used as the boundary of a Face.

[*Status*](http://www.opengis.net/def/status): Under development

## Description

# Ring Topology Feature

A **Ring** is a topological feature representing an ordered, closed loop of oriented Edge references. It forms the boundary of a Face.

## Topology Model

A Ring's topology consists of:

- `type`: `"Ring"`
- `directed_references`: an ordered array of [Oriented Object References](../../datatypes/oriented-ref/), each referencing an Edge feature with a `ref` (feature ID) and `orientation` (`+` or `-`)

The `directed_references` form a closed loop: the end vertex of each edge (considering orientation) must equal the start vertex of the next.

## Orientation

Each directed reference specifies an orientation (`+` or `-`) indicating whether the referenced Edge is traversed in its natural or reversed direction. This allows edges to be shared between adjacent faces.

## Example

```json
{
  "topology": {
    "type": "Ring",
    "directed_references": [
      { "ref": "uuid:c60507ba-226b-4e49-a702-e9afef899b23", "orientation": "+" },
      { "ref": "uuid:7dc1cc1c-8e7f-4666-9f52-4e6c2e6f57ac", "orientation": "+" },
      { "ref": "uuid:83ff2cdf-6c58-4e7b-ba55-e084eff8c569", "orientation": "+" },
      { "ref": "uuid:d69c596c-134e-4216-9bf6-d0f10e6886d8", "orientation": "+" }
    ]
  }
}
```

## Examples

### Simple Ring (4-edge boundary loop)
A Ring feature forming a rectangular boundary from four oriented Edge references
in its directed_references array. All edges are traversed in the '+' (forward) direction,
closing the loop. geometry is null — a Ring has no independent coordinate geometry.

#### json
```json
{
  "id": "uuid:ring-east-face-outer",
  "type": "Feature",
  "geometry": null,
  "topology": {
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
  },
  "properties": {
    "description": "Outer boundary ring of east face of upper section"
  }
}
```

#### jsonld
```jsonld
{
  "@context": "https://surroundaustralia.github.io/topo-feature/build/annotated/geo/topo/features/topo-ring/context.jsonld",
  "id": "uuid:ring-east-face-outer",
  "type": "Feature",
  "geometry": null,
  "topology": {
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
  },
  "properties": {
    "description": "Outer boundary ring of east face of upper section"
  }
}
```

#### ttl
```ttl
@prefix geojson: <https://purl.org/geojson/vocab#> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix topo: <https://purl.org/geojson/topo#> .

<uuid:ring-east-face-outer> a geojson:Feature ;
    geojson:topology [ a topo:Ring ;
            topo:directedReferences ( [ topo:orientation "+" ;
                        topo:ref <uuid:c60507ba-226b-4e49-a702-e9afef899b23> ] [ topo:orientation "+" ;
                        topo:ref <uuid:7dc1cc1c-8e7f-4666-9f52-4e6c2e6f57ac> ] [ topo:orientation "+" ;
                        topo:ref <uuid:83ff2cdf-6c58-4e7b-ba55-e084eff8c569> ] [ topo:orientation "+" ;
                        topo:ref <uuid:d69c596c-134e-4216-9bf6-d0f10e6886d8> ] ) ] .


```

## Schema

```yaml
$schema: https://json-schema.org/draft/2020-12/schema
description: 'A Ring feature: an ordered closed loop of directed (oriented) Edge references
  forming a boundary. geometry must be null. Uses directed_references (not references)
  in its topology.'
$defs:
  testCollection:
    $anchor: testCollection
    description: A convienence ref to a complete, testable collection objects and
      references
    $ref: https://surroundaustralia.github.io/topo-feature/build/annotated/geo/topo/features/topo-feature-collection/schema.yaml
allOf:
- $ref: https://surroundaustralia.github.io/topo-feature/build/annotated/geo/topo/features/topo-feature/schema.yaml
- properties:
    geometry:
      type: 'null'
    topology:
      properties:
        type:
          type: string
          const: Ring
        directed_references:
          type: array
          description: Ordered list of oriented Edge references forming the closed
            ring boundary
          items:
            $ref: https://surroundaustralia.github.io/topo-feature/build/annotated/geo/topo/datatypes/oriented-ref/schema.yaml
          minItems: 3
          x-jsonld-id: https://purl.org/geojson/topo#directedReferences
          x-jsonld-container: '@list'
      required:
      - type
      - directed_references
      not:
        required:
        - references
      x-jsonld-type: '@id'
      x-jsonld-id: https://purl.org/geojson/vocab#topology
  required:
  - topology
x-jsonld-extra-terms:
  Ring: https://purl.org/geojson/topo#Ring
  ref: '@id'
  orientation: https://purl.org/geojson/topo#orientation
x-jsonld-prefixes:
  geojson: https://purl.org/geojson/vocab#
  topo: https://purl.org/geojson/topo#

```

Links to the schema:

* YAML version: [schema.yaml](https://surroundaustralia.github.io/topo-feature/build/annotated/geo/topo/features/topo-ring/schema.json)
* JSON version: [schema.json](https://surroundaustralia.github.io/topo-feature/build/annotated/geo/topo/features/topo-ring/schema.yaml)


# JSON-LD Context

```jsonld
{
  "@context": {
    "Feature": "geojson:Feature",
    "FeatureCollection": "geojson:FeatureCollection",
    "GeometryCollection": "geojson:GeometryCollection",
    "LineString": "geojson:LineString",
    "MultiLineString": "geojson:MultiLineString",
    "MultiPoint": "geojson:MultiPoint",
    "MultiPolygon": "geojson:MultiPolygon",
    "Point": "geojson:Point",
    "Polygon": "geojson:Polygon",
    "features": {
      "@container": "@set",
      "@id": "geojson:features"
    },
    "type": "@type",
    "id": "@id",
    "properties": "@nest",
    "geometry": "geojson:geometry",
    "bbox": {
      "@container": "@list",
      "@id": "geojson:bbox"
    },
    "links": {
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
        "length": "dct:extent"
      },
      "@id": "rdfs:seeAlso"
    },
    "featureType": "@type",
    "time": {
      "@context": {
        "date": {
          "@id": "owlTime:hasTime",
          "@type": "xsd:date"
        },
        "timestamp": {
          "@id": "owlTime:hasTime",
          "@type": "xsd:dateTime"
        },
        "interval": {
          "@id": "owlTime:hasTime",
          "@container": "@list"
        }
      },
      "@id": "dct:time"
    },
    "coordRefSys": "http://www.opengis.net/def/glossary/term/CoordinateReferenceSystemCRS",
    "place": "dct:spatial",
    "Polyhedron": "geojson:Polyhedron",
    "MultiPolyhedron": "geojson:MultiPolyhedron",
    "Prism": {
      "@id": "geojson:Prism",
      "@context": {
        "base": "geojson:prismBase",
        "lower": "geojson:prismLower",
        "upper": "geojson:prismUpper"
      }
    },
    "MultiPrism": {
      "@id": "geojson:MultiPrism",
      "@context": {
        "prisms": "geojson:prisms"
      }
    },
    "coordinates": {
      "@container": "@list",
      "@id": "geojson:coordinates"
    },
    "geometries": {
      "@id": "geojson:geometry",
      "@container": "@list"
    },
    "topology": {
      "@context": {
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
        "ref": "topo:ref"
      },
      "@type": "@id",
      "@id": "geojson:topology"
    },
    "Ring": "topo:Ring",
    "ref": "@id",
    "orientation": "topo:orientation",
    "Arc": "geojson:Arc",
    "ArcWithCenter": "geojson:ArcWithCenter",
    "ArcByChord": "geojson:ArcByChord",
    "CircleByCenter": "geojson:CircleByCenter",
    "CubicSpline": "geojson:CubicSpline",
    "radius": "geojson:radius",
    "arcLength": "geojson:arcLength",
    "startTangentVector": "geojson:startTangentVector",
    "endTangentVector": "geojson:endTangentVector",
    "Face": "topo:Face",
    "Shell": "topo:Shell",
    "Solid": "topo:Solid",
    "geojson": "https://purl.org/geojson/vocab#",
    "rdfs": "http://www.w3.org/2000/01/rdf-schema#",
    "oa": "http://www.w3.org/ns/oa#",
    "dct": "http://purl.org/dc/terms/",
    "owlTime": "http://www.w3.org/2006/time#",
    "xsd": "http://www.w3.org/2001/XMLSchema#",
    "csdm": "https://linked.data.gov.au/def/csdm/",
    "topo": "https://purl.org/geojson/topo#",
    "@version": 1.1
  }
}
```

You can find the full JSON-LD context here:
[context.jsonld](https://surroundaustralia.github.io/topo-feature/build/annotated/geo/topo/features/topo-ring/context.jsonld)


# For developers

The source code for this Building Block can be found in the following repository:

* URL: [https://github.com/surroundaustralia/topo-feature](https://github.com/surroundaustralia/topo-feature)
* Path: `_sources/features/topo-ring`

