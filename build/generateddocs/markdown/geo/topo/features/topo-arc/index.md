
# Non-linear Arc and Spline Descriptions using Point topology (Schema)

`ogc.geo.topo.features.topo-arc` *v0.1*

Defines options for describing Arcs, Circles, Splines using point features as canonical source of geometry coordinates

[*Status*](http://www.opengis.net/def/status): Under development

## Description

## Topology defining Arcs, Circles, Splines

A feature type using a topology property to reference points defining non-linear curves.

Each geometry type has a specific number of references to "features" defining point geometries.

![Example](assets/arc.png)

Where additional properties are required to define the geometry these are included as sub-properties of the topology property.

Additional properties "radius" and "arcLength" are defined for optional use as feature properties.

Note: the geojson: namespace is used for semantic annotations - this may be replaced with a more suitable namespace when a target ontology is available (such as the planned Geosparql version 1.3)



## Examples

### Example GeoJSON feature using ArcWithCenter topology
Arc with Center example.

Topology defined by 2 end points and a centre that are references to features with point geometry.

![Example](assets/arc-by-center.png)

radius and arcLength are implicit but may be provided as optional properties of the feature.
#### json
```json
{
  "id": "1853004",
  "type": "Feature",
  "featureType": "my:ArcFeature",
  "geometry": null,
  "topology": {
    "type": "ArcWithCenter",
    "x-description": "References is an ordered list of features with point geometries Start,End,Center",
    "references": [
      "P1",
      "P2",
      "PC"
    ],
    "orientation": "ccw"
  },
  "properties": {
    "arcLength": 25.615,
    "radius": 105.438
  }
}
```

#### jsonld
```jsonld
{
  "@context": "https://surroundaustralia.github.io/topo-feature/build/annotated/geo/topo/features/topo-arc/context.jsonld",
  "id": "1853004",
  "type": "Feature",
  "featureType": "my:ArcFeature",
  "geometry": null,
  "topology": {
    "type": "ArcWithCenter",
    "x-description": "References is an ordered list of features with point geometries Start,End,Center",
    "references": [
      "P1",
      "P2",
      "PC"
    ],
    "orientation": "ccw"
  },
  "properties": {
    "arcLength": 25.615,
    "radius": 105.438
  }
}
```

#### ttl
```ttl
@prefix geojson: <https://purl.org/geojson/vocab#> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix topo: <https://purl.org/geojson/topo#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

<http://www.example.com/features/1853004> a geojson:Feature,
        <my:ArcFeature> ;
    geojson:arcLength 2.5615e+01 ;
    geojson:radius 1.05438e+02 ;
    geojson:topology [ a geojson:ArcWithCenter ;
            topo:orientation "ccw" ;
            geojson:relatedFeatures ( <http://www.example.com/features/P1> <http://www.example.com/features/P2> <http://www.example.com/features/PC> ) ] .


```


### Example GeoJSON feature using Arc topology
Arc example (3 points).

Note that properties "radius" and "arcLength" are not required in the containing feature but defined for convenience.

![Example](assets/arc.png)
#### json
```json
{
  "id": "arc1",
  "type": "Feature",
  "featureType": "my:ArcFeature",
  "geometry": null,
  "topology": {
    "type": "Arc",
    "x-description": "References is an ordered list of 3 features with point geometries defining Arc",
    "references": [
      "P1",
      "P3",
      "P2"
    ]
  },
  "properties": {
    "arcLength": 25.615,
    "radius": 105.438
  }
}
```

#### jsonld
```jsonld
{
  "@context": "https://surroundaustralia.github.io/topo-feature/build/annotated/geo/topo/features/topo-arc/context.jsonld",
  "id": "arc1",
  "type": "Feature",
  "featureType": "my:ArcFeature",
  "geometry": null,
  "topology": {
    "type": "Arc",
    "x-description": "References is an ordered list of 3 features with point geometries defining Arc",
    "references": [
      "P1",
      "P3",
      "P2"
    ]
  },
  "properties": {
    "arcLength": 25.615,
    "radius": 105.438
  }
}
```

#### ttl
```ttl
@prefix geojson: <https://purl.org/geojson/vocab#> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

<http://www.example.com/features/arc1> a geojson:Feature,
        <my:ArcFeature> ;
    geojson:arcLength 2.5615e+01 ;
    geojson:radius 1.05438e+02 ;
    geojson:topology [ a geojson:Arc ;
            geojson:relatedFeatures ( <http://www.example.com/features/P1> <http://www.example.com/features/P3> <http://www.example.com/features/P2> ) ] .


```


### Example GeoJSON feature using ArcByChord topology
Arc by Chord example.

![Example](assets/arc-by-chord.png)
#### json
```json
{
  "id": "chord1",
  "type": "Feature",
  "featureType": "my:ArcChordFeature",
  "geometry": null,
  "topology": {
    "type": "ArcByChord",
    "x-description": "References is an ordered list of features with for an Arc Chord, radius and length determine geometry",
    "references": [
      "P1",
      "P2"
    ],
    "radius": 105.438,
    "orientation": "cw"
  },
  "properties": {
    "arcLength": 25.615
  }
}
```

#### jsonld
```jsonld
{
  "@context": "https://surroundaustralia.github.io/topo-feature/build/annotated/geo/topo/features/topo-arc/context.jsonld",
  "id": "chord1",
  "type": "Feature",
  "featureType": "my:ArcChordFeature",
  "geometry": null,
  "topology": {
    "type": "ArcByChord",
    "x-description": "References is an ordered list of features with for an Arc Chord, radius and length determine geometry",
    "references": [
      "P1",
      "P2"
    ],
    "radius": 105.438,
    "orientation": "cw"
  },
  "properties": {
    "arcLength": 25.615
  }
}
```

#### ttl
```ttl
@prefix geojson: <https://purl.org/geojson/vocab#> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix topo: <https://purl.org/geojson/topo#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

<http://www.example.com/features/chord1> a geojson:Feature,
        <my:ArcChordFeature> ;
    geojson:arcLength 2.5615e+01 ;
    geojson:topology [ a geojson:ArcByChord ;
            topo:orientation "cw" ;
            geojson:radius 1.05438e+02 ;
            geojson:relatedFeatures ( <http://www.example.com/features/P1> <http://www.example.com/features/P2> ) ] .


```


### Example GeoJSON feature using  CircleWithCenter topology
Circle with Center example.

![Example](assets/circle-with-center.png)

### Example 5
#### json
```json
{
  "id": "1853004",
  "type": "Feature",
  "featureType": "my:CircleFeature",
  "geometry": null,
  "topology": {
    "type": "CircleByCenter",
    "x-description": "Reference is the feature defining the centre point of a circle - it must have a Point geometry.",
    "references": [
      "PC"
    ],
    "radius": 10
  },
  "properties": null
}
```

#### jsonld
```jsonld
{
  "@context": "https://surroundaustralia.github.io/topo-feature/build/annotated/geo/topo/features/topo-arc/context.jsonld",
  "id": "1853004",
  "type": "Feature",
  "featureType": "my:CircleFeature",
  "geometry": null,
  "topology": {
    "type": "CircleByCenter",
    "x-description": "Reference is the feature defining the centre point of a circle - it must have a Point geometry.",
    "references": [
      "PC"
    ],
    "radius": 10
  },
  "properties": null
}
```

#### ttl
```ttl
@prefix geojson: <https://purl.org/geojson/vocab#> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

<http://www.example.com/features/1853004> a geojson:Feature,
        <my:CircleFeature> ;
    geojson:topology [ a geojson:CircleByCenter ;
            geojson:radius 10 ;
            geojson:relatedFeatures ( <http://www.example.com/features/PC> ) ] .


```


### Example GeoJSON feature using Cubic Spline topology
Cubic Spline example.

![Example](assets/spline.png)

### Example 7
#### json
```json
{
  "id": "1853004",
  "type": "Feature",
  "featureType": "my:SplineFeature",
  "geometry": null,
  "topology": {
    "type": "CubicSpline",
    "x-description": "References is an ordered list of features with point geometries",
    "references": [
      "P1",
      "Px1",
      "Px2",
      "P2"
    ]
  },
  "properties": null
}
```

#### jsonld
```jsonld
{
  "@context": "https://surroundaustralia.github.io/topo-feature/build/annotated/geo/topo/features/topo-arc/context.jsonld",
  "id": "1853004",
  "type": "Feature",
  "featureType": "my:SplineFeature",
  "geometry": null,
  "topology": {
    "type": "CubicSpline",
    "x-description": "References is an ordered list of features with point geometries",
    "references": [
      "P1",
      "Px1",
      "Px2",
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

<http://www.example.com/features/1853004> a geojson:Feature,
        <my:SplineFeature> ;
    geojson:topology [ a geojson:CubicSpline ;
            geojson:relatedFeatures ( <http://www.example.com/features/P1> <http://www.example.com/features/Px1> <http://www.example.com/features/Px2> <http://www.example.com/features/P2> ) ] .


```


### Example GeoJSON feature using Cubic Spline topology with start and end tangents
Cubic Spline with Tangents example.
#### json
```json
{
  "id": "1853004",
  "type": "Feature",
  "featureType": "my:SplineFeature",
  "geometry": null,
  "topology": {
    "type": "CubicSpline",
    "x-description": "References is an ordered list of features with point geometries, with tangent vectors defining entry and exit angles",
    "startTangentVector": {
      "references": [
        "PVS",
        "P1"
      ]
    },
    "endTangentVector": {
      "references": [
        "P2",
        "PVE"
      ]
    },
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
  "@context": "https://surroundaustralia.github.io/topo-feature/build/annotated/geo/topo/features/topo-arc/context.jsonld",
  "id": "1853004",
  "type": "Feature",
  "featureType": "my:SplineFeature",
  "geometry": null,
  "topology": {
    "type": "CubicSpline",
    "x-description": "References is an ordered list of features with point geometries, with tangent vectors defining entry and exit angles",
    "startTangentVector": {
      "references": [
        "PVS",
        "P1"
      ]
    },
    "endTangentVector": {
      "references": [
        "P2",
        "PVE"
      ]
    },
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

<http://www.example.com/features/1853004> a geojson:Feature,
        <my:SplineFeature> ;
    geojson:topology [ a geojson:CubicSpline ;
            geojson:endTangentVector [ geojson:relatedFeatures ( <http://www.example.com/features/P2> <http://www.example.com/features/PVE> ) ] ;
            geojson:relatedFeatures ( <http://www.example.com/features/P1> <http://www.example.com/features/P2> ) ;
            geojson:startTangentVector [ geojson:relatedFeatures ( <http://www.example.com/features/PVS> <http://www.example.com/features/P1> ) ] ] .


```

## Schema

```yaml
$schema: https://json-schema.org/draft/2020-12/schema
description: Arc Feature with geometry by reference
allOf:
- $ref: https://surroundaustralia.github.io/topo-feature/build/annotated/geo/topo/features/topo-feature/schema.yaml
- properties:
    topology:
      allOf:
      - $ref: https://surroundaustralia.github.io/topo-feature/build/annotated/geo/topo/datatypes/topology/schema.yaml
      - oneOf:
        - properties:
            type:
              type: string
              const: Arc
            references:
              minItems: 3
              maxItems: 3
        - properties:
            type:
              type: string
              const: ArcWithCenter
            references:
              minItems: 3
              maxItems: 3
            orientation:
              type: string
              enum:
              - cw
              - ccw
          required:
          - orientation
        - properties:
            type:
              type: string
              const: ArcByChord
            references:
              minItems: 2
              maxItems: 2
            radius:
              type: number
            orientation:
              type: string
              enum:
              - cw
              - ccw
          required:
          - radius
          - orientation
        - properties:
            type:
              type: string
              const: CircleByCenter
            references:
              minItems: 1
              maxItems: 1
            radius:
              type: number
          required:
          - radius
        - properties:
            type:
              type: string
              const: CubicSpline
            references:
              minItems: 3
          not:
            required:
            - startTangentVector
            - endTangentVector
        - properties:
            type:
              type: string
              const: CubicSpline
            references:
              minItems: 2
            startTangentVector:
              properties:
                references:
                  minItems: 2
            endTangentVector:
              properties:
                references:
                  minItems: 2
          required:
          - startTangentVector
          - endTangentVector
    radius:
      type: number
      description: optional property of the feature defining radius according to coordinate
        reference system of the referenced geometry. Note where necessary to define
        geometry this is a mandatory sub-property of the topology property.
    arcLength:
      type: number
      description: optional property of the feature defining arcLength according to
        coordinate reference system of the referenced geometry.
  required:
  - topology

```

Links to the schema:

* YAML version: [schema.yaml](https://surroundaustralia.github.io/topo-feature/build/annotated/geo/topo/features/topo-arc/schema.json)
* JSON version: [schema.json](https://surroundaustralia.github.io/topo-feature/build/annotated/geo/topo/features/topo-arc/schema.yaml)


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
      "@type": "@id",
      "@id": "geojson:topology"
    },
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
[context.jsonld](https://surroundaustralia.github.io/topo-feature/build/annotated/geo/topo/features/topo-arc/context.jsonld)


# For developers

The source code for this Building Block can be found in the following repository:

* URL: [https://github.com/surroundaustralia/topo-feature](https://github.com/surroundaustralia/topo-feature)
* Path: `_sources/features/topo-arc`

