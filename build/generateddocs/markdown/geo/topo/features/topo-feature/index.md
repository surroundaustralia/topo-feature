
# Feature with topology (Schema)

`ogc.geo.topo.features.topo-feature` *v0.1*

This building block defines a GeoJSON feature with topological relationships to point nodes, or other to TopoFeatures

[*Status*](http://www.opengis.net/def/status): Under development

## Description

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

## Examples

### Example of a LineString
#### json
```json
{
  "type": "Feature",
  "id": "LineP1P2",
  "geometry": null,
  "topology": {
    "type": "LineString",
    "references": [
      "P1",
      "P2"
    ]
  },
  "properties": null
}
```

#### jsonld
```jsonld
{
  "@context": "https://surroundaustralia.github.io/topo-feature/build/annotated/geo/topo/features/topo-feature/context.jsonld",
  "type": "Feature",
  "id": "LineP1P2",
  "geometry": null,
  "topology": {
    "type": "LineString",
    "references": [
      "P1",
      "P2"
    ]
  },
  "properties": null
}
```

#### ttl
```ttl
@prefix geojson: <https://purl.org/geojson/vocab#> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .

<http://www.example.com/features/LineP1P2> a geojson:Feature ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <http://www.example.com/features/P1> <http://www.example.com/features/P2> ) ] .


```


### Example of a Polygon
#### json
```json
{
  "type": "Feature",
  "id": "TriangleP1P2P3",
  "geometry": null,
  "topology": {
    "type": "Polygon",
    "references": [
      [
        "LineP1P2",
        "LineP2P3",
        "LineP3P1"
      ]
    ]
  },
  "properties": null
}
```

#### jsonld
```jsonld
{
  "@context": "https://surroundaustralia.github.io/topo-feature/build/annotated/geo/topo/features/topo-feature/context.jsonld",
  "type": "Feature",
  "id": "TriangleP1P2P3",
  "geometry": null,
  "topology": {
    "type": "Polygon",
    "references": [
      [
        "LineP1P2",
        "LineP2P3",
        "LineP3P1"
      ]
    ]
  },
  "properties": null
}
```

#### ttl
```ttl
@prefix geojson: <https://purl.org/geojson/vocab#> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .

<http://www.example.com/features/TriangleP1P2P3> a geojson:Feature ;
    geojson:topology [ a geojson:Polygon ;
            geojson:relatedFeatures ( ( <http://www.example.com/features/LineP1P2> <http://www.example.com/features/LineP2P3> <http://www.example.com/features/LineP3P1> ) ) ] .


```


### Edge Feature (references model — two Point IDs)
An Edge feature referencing two Point features by their IDs via the 'references'
topology array (type LineString). geometry is null — actual coordinates are resolved
from the referenced point features at render time.

#### json
```json
{
  "type": "Feature",
  "id": "uuid:c60507ba-226b-4e49-a702-e9afef899b23",
  "geometry": null,
  "topology": {
    "type": "LineString",
    "references": [
      "uuid:ad6d8fcc-402c-482e-8f1a-7492ccaead38",
      "uuid:8d2be28b-8f31-46de-99cb-4d8709502cd0"
    ]
  },
  "properties": {
    "length": 3.0
  }
}
```

#### jsonld
```jsonld
{
  "@context": "https://surroundaustralia.github.io/topo-feature/build/annotated/geo/topo/features/topo-feature/context.jsonld",
  "type": "Feature",
  "id": "uuid:c60507ba-226b-4e49-a702-e9afef899b23",
  "geometry": null,
  "topology": {
    "type": "LineString",
    "references": [
      "uuid:ad6d8fcc-402c-482e-8f1a-7492ccaead38",
      "uuid:8d2be28b-8f31-46de-99cb-4d8709502cd0"
    ]
  },
  "properties": {
    "length": 3.0
  }
}
```

#### ttl
```ttl
@prefix geojson: <https://purl.org/geojson/vocab#> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .

<uuid:c60507ba-226b-4e49-a702-e9afef899b23> a geojson:Feature ;
    geojson:topology [ a geojson:LineString ;
            geojson:relatedFeatures ( <uuid:ad6d8fcc-402c-482e-8f1a-7492ccaead38> <uuid:8d2be28b-8f31-46de-99cb-4d8709502cd0> ) ] .


```


### Face Feature (Ring/directed_references model)
A Face feature whose boundary is defined via Ring topology. Each Ring contains a
directed_references array of oriented Edge references, each with a 'ref' (Edge feature ID)
and 'orientation' ('+' or '-'). geometry is null — geometry is fully defined by the topology.

#### json
```json
{
  "type": "Feature",
  "id": "uuid:4ac3b91b-eeb7-428c-b5e9-7e8a3f0998ae",
  "geometry": null,
  "topology": {
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
  },
  "properties": {
    "normal": [
      1.0,
      0.0,
      0.0
    ],
    "area": 24.0
  }
}
```

#### jsonld
```jsonld
{
  "@context": "https://surroundaustralia.github.io/topo-feature/build/annotated/geo/topo/features/topo-feature/context.jsonld",
  "type": "Feature",
  "id": "uuid:4ac3b91b-eeb7-428c-b5e9-7e8a3f0998ae",
  "geometry": null,
  "topology": {
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
  },
  "properties": {
    "normal": [
      1.0,
      0.0,
      0.0
    ],
    "area": 24.0
  }
}
```

#### ttl
```ttl
@prefix geojson: <https://purl.org/geojson/vocab#> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix topo: <https://purl.org/geojson/topo#> .

<uuid:4ac3b91b-eeb7-428c-b5e9-7e8a3f0998ae> a geojson:Feature ;
    geojson:topology [ a topo:Face ;
            topo:rings ( [ a topo:Ring ;
                        topo:directedReferences ( <uuid:c60507ba-226b-4e49-a702-e9afef899b23> <uuid:7dc1cc1c-8e7f-4666-9f52-4e6c2e6f57ac> <uuid:83ff2cdf-6c58-4e7b-ba55-e084eff8c569> <uuid:d69c596c-134e-4216-9bf6-d0f10e6886d8> ) ] ) ] .

<uuid:7dc1cc1c-8e7f-4666-9f52-4e6c2e6f57ac> topo:orientation "+" .

<uuid:83ff2cdf-6c58-4e7b-ba55-e084eff8c569> topo:orientation "+" .

<uuid:c60507ba-226b-4e49-a702-e9afef899b23> topo:orientation "+" .

<uuid:d69c596c-134e-4216-9bf6-d0f10e6886d8> topo:orientation "+" .


```

## Schema

```yaml
$schema: https://json-schema.org/draft/2020-12/schema
description: Feature with defined topology for bounding elements. When topology is
  used to define geometry, the 'geometry' property should be null (coordinates are
  derived from referenced features). The 'topology' property uses either 'references'
  (plain string IDs) or 'directed_references' (oriented refs with '+'/'-'), but not
  both.
allOf:
- $ref: https://surroundaustralia.github.io/topo-feature/build/annotated/geo/topo/features/topo-feature-collection/schema.yaml#FeatureOptions
- type: object
  properties:
    id:
      type: string
    geometry:
      description: Null when geometry is fully defined by topology references; a GeoJSON
        geometry object otherwise
      oneOf:
      - type: 'null'
      - type: object
        required:
        - type
        properties:
          type:
            type: string
    topology:
      $ref: https://surroundaustralia.github.io/topo-feature/build/annotated/geo/topo/datatypes/topology/schema.yaml
      x-jsonld-type: '@id'
      x-jsonld-id: https://purl.org/geojson/vocab#topology
  required:
  - topology
x-jsonld-prefixes:
  geojson: https://purl.org/geojson/vocab#

```

Links to the schema:

* YAML version: [schema.yaml](https://surroundaustralia.github.io/topo-feature/build/annotated/geo/topo/features/topo-feature/schema.json)
* JSON version: [schema.json](https://surroundaustralia.github.io/topo-feature/build/annotated/geo/topo/features/topo-feature/schema.yaml)


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
          "@id": "geojson:relatedFeatures",
          "@type": "@id",
          "@container": "@list"
        },
        "directed_references": {
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
        }
      },
      "@type": "@id",
      "@id": "geojson:topology"
    },
    "Arc": "geojson:Arc",
    "ArcWithCenter": "geojson:ArcWithCenter",
    "ArcByChord": "geojson:ArcByChord",
    "CircleByCenter": "geojson:CircleByCenter",
    "CubicSpline": "geojson:CubicSpline",
    "radius": "geojson:radius",
    "arcLength": "geojson:arcLength",
    "startTangentVector": "geojson:startTangentVector",
    "endTangentVector": "geojson:endTangentVector",
    "ref": "@id",
    "orientation": "topo:orientation",
    "Face": "topo:Face",
    "Ring": "topo:Ring",
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
[context.jsonld](https://surroundaustralia.github.io/topo-feature/build/annotated/geo/topo/features/topo-feature/context.jsonld)


# For developers

The source code for this Building Block can be found in the following repository:

* URL: [https://github.com/surroundaustralia/topo-feature](https://github.com/surroundaustralia/topo-feature)
* Path: `_sources/features/topo-feature`

