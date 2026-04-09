
# 3D (Polyhedron) using nested Polygons and Point topology (Schema)

`ogc.geo.topo.features.topo-polyhedron` *v0.1*

Defines options for describing 3D polyhedrons using features with Point geometry coordinates

[*Status*](http://www.opengis.net/def/status): Under development

## Description

## Topology defining Polyhedrons

A feature type using a topology property to reference points defining Polyhedrons as per the FG-JSON extended geometry model




## Examples

### Example GeoJSON feature using
3D Polyhedron example
#### json
```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "id": "P479816.67_5705861.672_100",
      "geometry": {
        "type": "Point",
        "coordinates": [
          479816.67,
          5705861.672,
          100
        ]
      },
      "properties": {}
    },
    {
      "type": "Feature",
      "id": "P479822.187_5705866.783_100",
      "geometry": {
        "type": "Point",
        "coordinates": [
          479822.187,
          5705866.783,
          100
        ]
      },
      "properties": {}
    },
    {
      "type": "Feature",
      "id": "P479829.666_5705858.785_100",
      "geometry": {
        "type": "Point",
        "coordinates": [
          479829.666,
          5705858.785,
          100
        ]
      },
      "properties": {}
    },
    {
      "type": "Feature",
      "id": "P479824.155_5705853.684_100",
      "geometry": {
        "type": "Point",
        "coordinates": [
          479824.155,
          5705853.684,
          100
        ]
      },
      "properties": {}
    },
    {
      "type": "Feature",
      "id": "P479816.67_5705861.672_110",
      "geometry": {
        "type": "Point",
        "coordinates": [
          479816.67,
          5705861.672,
          110
        ]
      },
      "properties": {}
    },
    {
      "type": "Feature",
      "id": "P479824.155_5705853.684_110",
      "geometry": {
        "type": "Point",
        "coordinates": [
          479824.155,
          5705853.684,
          110
        ]
      },
      "properties": {}
    },
    {
      "type": "Feature",
      "id": "P479829.666_5705858.785_120",
      "geometry": {
        "type": "Point",
        "coordinates": [
          479829.666,
          5705858.785,
          120
        ]
      },
      "properties": {}
    },
    {
      "type": "Feature",
      "id": "P479822.187_5705866.783_120",
      "geometry": {
        "type": "Point",
        "coordinates": [
          479822.187,
          5705866.783,
          120
        ]
      },
      "properties": {}
    },
    {
      "type": "Feature",
      "id": "DENW19AL0000giv5BL",
      "conformsTo": [
        "[ogc-json-fg-1-0.2:core]",
        "[ogc-json-fg-1-0.2:types-schemas]",
        "[ogc-json-fg-1-0.2:3d]"
      ],
      "featureType": "app:building",
      "featureSchema": "https://example.org/data/v1/collections/buildings/schema",
      "time": {
        "interval": [
          "2014-04-24T10:50:18Z",
          ".."
        ]
      },
      "coordRefSys": "http://www.opengis.net/def/crs/EPSG/0/5555",
      "place": {
        "type": "Polyhedron",
        "coordinates": [
          [
            [
              [
                [
                  479816.67,
                  5705861.672,
                  100
                ],
                [
                  479822.187,
                  5705866.783,
                  100
                ],
                [
                  479829.666,
                  5705858.785,
                  100
                ],
                [
                  479824.155,
                  5705853.684,
                  100
                ],
                [
                  479816.67,
                  5705861.672,
                  100
                ]
              ]
            ],
            [
              [
                [
                  479816.67,
                  5705861.672,
                  110
                ],
                [
                  479824.155,
                  5705853.684,
                  110
                ],
                [
                  479829.666,
                  5705858.785,
                  120
                ],
                [
                  479822.187,
                  5705866.783,
                  120
                ],
                [
                  479816.67,
                  5705861.672,
                  110
                ]
              ]
            ],
            [
              [
                [
                  479816.67,
                  5705861.672,
                  110
                ],
                [
                  479816.67,
                  5705861.672,
                  100
                ],
                [
                  479824.155,
                  5705853.684,
                  100
                ],
                [
                  479824.155,
                  5705853.684,
                  110
                ],
                [
                  479816.67,
                  5705861.672,
                  110
                ]
              ]
            ],
            [
              [
                [
                  479824.155,
                  5705853.684,
                  110
                ],
                [
                  479824.155,
                  5705853.684,
                  100
                ],
                [
                  479829.666,
                  5705858.785,
                  100
                ],
                [
                  479829.666,
                  5705858.785,
                  120
                ],
                [
                  479824.155,
                  5705853.684,
                  110
                ]
              ]
            ],
            [
              [
                [
                  479829.666,
                  5705858.785,
                  120
                ],
                [
                  479829.666,
                  5705858.785,
                  100
                ],
                [
                  479822.187,
                  5705866.783,
                  100
                ],
                [
                  479822.187,
                  5705866.783,
                  120
                ],
                [
                  479829.666,
                  5705858.785,
                  120
                ]
              ]
            ],
            [
              [
                [
                  479822.187,
                  5705866.783,
                  120
                ],
                [
                  479822.187,
                  5705866.783,
                  100
                ],
                [
                  479816.67,
                  5705861.672,
                  100
                ],
                [
                  479816.67,
                  5705861.672,
                  110
                ],
                [
                  479822.187,
                  5705866.783,
                  120
                ]
              ]
            ]
          ]
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              8.7092045,
              51.5035285,
              100
            ],
            [
              8.7093128,
              51.503457,
              100
            ],
            [
              8.7093919,
              51.503503,
              100
            ],
            [
              8.7092837,
              51.5035747,
              100
            ],
            [
              8.7092045,
              51.5035285,
              100
            ]
          ]
        ]
      },
      "links": [
        {
          "href": "https://example.org/data/v1/collections/cadastralparcel/items/05297001600313______",
          "rel": "http://www.opengis.net/def/rel/ogc/1.0/within",
          "title": "Cadastral parcel 313 in district W\u00c3\u00bcnnenberg (016)"
        },
        {
          "href": "https://inspire.ec.europa.eu/featureconcept/Building",
          "rel": "type",
          "title": "This feature is of type 'building'"
        }
      ],
      "properties": {
        "lastChange": "2014-04-24T10:50:18Z",
        "built": "2012-03",
        "function": "Agricultural building",
        "height_m": 20.0,
        "owners": [
          {
            "href": "https://example.org/john-doe",
            "title": "John Doe"
          },
          {
            "href": "https://example.org/jane-doe",
            "title": "Jane Doe"
          }
        ]
      },
      "topology": {
        "type": "Polyhedron",
        "references": [
          [
            [
              [
                "P479816.67_5705861.672_100",
                "P479822.187_5705866.783_100",
                "P479829.666_5705858.785_100",
                "P479824.155_5705853.684_100",
                "P479816.67_5705861.672_100"
              ]
            ],
            [
              [
                "P479816.67_5705861.672_110",
                "P479824.155_5705853.684_110",
                "P479829.666_5705858.785_120",
                "P479822.187_5705866.783_120",
                "P479816.67_5705861.672_110"
              ]
            ],
            [
              [
                "P479816.67_5705861.672_110",
                "P479816.67_5705861.672_100",
                "P479824.155_5705853.684_100",
                "P479824.155_5705853.684_110",
                "P479816.67_5705861.672_110"
              ]
            ],
            [
              [
                "P479824.155_5705853.684_110",
                "P479824.155_5705853.684_100",
                "P479829.666_5705858.785_100",
                "P479829.666_5705858.785_120",
                "P479824.155_5705853.684_110"
              ]
            ],
            [
              [
                "P479829.666_5705858.785_120",
                "P479829.666_5705858.785_100",
                "P479822.187_5705866.783_100",
                "P479822.187_5705866.783_120",
                "P479829.666_5705858.785_120"
              ]
            ],
            [
              [
                "P479822.187_5705866.783_120",
                "P479822.187_5705866.783_100",
                "P479816.67_5705861.672_100",
                "P479816.67_5705861.672_110",
                "P479822.187_5705866.783_120"
              ]
            ]
          ]
        ]
      }
    }
  ]
}
```

#### jsonld
```jsonld
{
  "@context": "https://surroundaustralia.github.io/topo-feature/build/annotated/geo/topo/features/topo-polyhedron/context.jsonld",
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "id": "P479816.67_5705861.672_100",
      "geometry": {
        "type": "Point",
        "coordinates": [
          479816.67,
          5705861.672,
          100
        ]
      },
      "properties": {}
    },
    {
      "type": "Feature",
      "id": "P479822.187_5705866.783_100",
      "geometry": {
        "type": "Point",
        "coordinates": [
          479822.187,
          5705866.783,
          100
        ]
      },
      "properties": {}
    },
    {
      "type": "Feature",
      "id": "P479829.666_5705858.785_100",
      "geometry": {
        "type": "Point",
        "coordinates": [
          479829.666,
          5705858.785,
          100
        ]
      },
      "properties": {}
    },
    {
      "type": "Feature",
      "id": "P479824.155_5705853.684_100",
      "geometry": {
        "type": "Point",
        "coordinates": [
          479824.155,
          5705853.684,
          100
        ]
      },
      "properties": {}
    },
    {
      "type": "Feature",
      "id": "P479816.67_5705861.672_110",
      "geometry": {
        "type": "Point",
        "coordinates": [
          479816.67,
          5705861.672,
          110
        ]
      },
      "properties": {}
    },
    {
      "type": "Feature",
      "id": "P479824.155_5705853.684_110",
      "geometry": {
        "type": "Point",
        "coordinates": [
          479824.155,
          5705853.684,
          110
        ]
      },
      "properties": {}
    },
    {
      "type": "Feature",
      "id": "P479829.666_5705858.785_120",
      "geometry": {
        "type": "Point",
        "coordinates": [
          479829.666,
          5705858.785,
          120
        ]
      },
      "properties": {}
    },
    {
      "type": "Feature",
      "id": "P479822.187_5705866.783_120",
      "geometry": {
        "type": "Point",
        "coordinates": [
          479822.187,
          5705866.783,
          120
        ]
      },
      "properties": {}
    },
    {
      "type": "Feature",
      "id": "DENW19AL0000giv5BL",
      "conformsTo": [
        "[ogc-json-fg-1-0.2:core]",
        "[ogc-json-fg-1-0.2:types-schemas]",
        "[ogc-json-fg-1-0.2:3d]"
      ],
      "featureType": "app:building",
      "featureSchema": "https://example.org/data/v1/collections/buildings/schema",
      "time": {
        "interval": [
          "2014-04-24T10:50:18Z",
          ".."
        ]
      },
      "coordRefSys": "http://www.opengis.net/def/crs/EPSG/0/5555",
      "place": {
        "type": "Polyhedron",
        "coordinates": [
          [
            [
              [
                [
                  479816.67,
                  5705861.672,
                  100
                ],
                [
                  479822.187,
                  5705866.783,
                  100
                ],
                [
                  479829.666,
                  5705858.785,
                  100
                ],
                [
                  479824.155,
                  5705853.684,
                  100
                ],
                [
                  479816.67,
                  5705861.672,
                  100
                ]
              ]
            ],
            [
              [
                [
                  479816.67,
                  5705861.672,
                  110
                ],
                [
                  479824.155,
                  5705853.684,
                  110
                ],
                [
                  479829.666,
                  5705858.785,
                  120
                ],
                [
                  479822.187,
                  5705866.783,
                  120
                ],
                [
                  479816.67,
                  5705861.672,
                  110
                ]
              ]
            ],
            [
              [
                [
                  479816.67,
                  5705861.672,
                  110
                ],
                [
                  479816.67,
                  5705861.672,
                  100
                ],
                [
                  479824.155,
                  5705853.684,
                  100
                ],
                [
                  479824.155,
                  5705853.684,
                  110
                ],
                [
                  479816.67,
                  5705861.672,
                  110
                ]
              ]
            ],
            [
              [
                [
                  479824.155,
                  5705853.684,
                  110
                ],
                [
                  479824.155,
                  5705853.684,
                  100
                ],
                [
                  479829.666,
                  5705858.785,
                  100
                ],
                [
                  479829.666,
                  5705858.785,
                  120
                ],
                [
                  479824.155,
                  5705853.684,
                  110
                ]
              ]
            ],
            [
              [
                [
                  479829.666,
                  5705858.785,
                  120
                ],
                [
                  479829.666,
                  5705858.785,
                  100
                ],
                [
                  479822.187,
                  5705866.783,
                  100
                ],
                [
                  479822.187,
                  5705866.783,
                  120
                ],
                [
                  479829.666,
                  5705858.785,
                  120
                ]
              ]
            ],
            [
              [
                [
                  479822.187,
                  5705866.783,
                  120
                ],
                [
                  479822.187,
                  5705866.783,
                  100
                ],
                [
                  479816.67,
                  5705861.672,
                  100
                ],
                [
                  479816.67,
                  5705861.672,
                  110
                ],
                [
                  479822.187,
                  5705866.783,
                  120
                ]
              ]
            ]
          ]
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              8.7092045,
              51.5035285,
              100
            ],
            [
              8.7093128,
              51.503457,
              100
            ],
            [
              8.7093919,
              51.503503,
              100
            ],
            [
              8.7092837,
              51.5035747,
              100
            ],
            [
              8.7092045,
              51.5035285,
              100
            ]
          ]
        ]
      },
      "links": [
        {
          "href": "https://example.org/data/v1/collections/cadastralparcel/items/05297001600313______",
          "rel": "http://www.opengis.net/def/rel/ogc/1.0/within",
          "title": "Cadastral parcel 313 in district W\u00c3\u00bcnnenberg (016)"
        },
        {
          "href": "https://inspire.ec.europa.eu/featureconcept/Building",
          "rel": "type",
          "title": "This feature is of type 'building'"
        }
      ],
      "properties": {
        "lastChange": "2014-04-24T10:50:18Z",
        "built": "2012-03",
        "function": "Agricultural building",
        "height_m": 20.0,
        "owners": [
          {
            "href": "https://example.org/john-doe",
            "title": "John Doe"
          },
          {
            "href": "https://example.org/jane-doe",
            "title": "Jane Doe"
          }
        ]
      },
      "topology": {
        "type": "Polyhedron",
        "references": [
          [
            [
              [
                "P479816.67_5705861.672_100",
                "P479822.187_5705866.783_100",
                "P479829.666_5705858.785_100",
                "P479824.155_5705853.684_100",
                "P479816.67_5705861.672_100"
              ]
            ],
            [
              [
                "P479816.67_5705861.672_110",
                "P479824.155_5705853.684_110",
                "P479829.666_5705858.785_120",
                "P479822.187_5705866.783_120",
                "P479816.67_5705861.672_110"
              ]
            ],
            [
              [
                "P479816.67_5705861.672_110",
                "P479816.67_5705861.672_100",
                "P479824.155_5705853.684_100",
                "P479824.155_5705853.684_110",
                "P479816.67_5705861.672_110"
              ]
            ],
            [
              [
                "P479824.155_5705853.684_110",
                "P479824.155_5705853.684_100",
                "P479829.666_5705858.785_100",
                "P479829.666_5705858.785_120",
                "P479824.155_5705853.684_110"
              ]
            ],
            [
              [
                "P479829.666_5705858.785_120",
                "P479829.666_5705858.785_100",
                "P479822.187_5705866.783_100",
                "P479822.187_5705866.783_120",
                "P479829.666_5705858.785_120"
              ]
            ],
            [
              [
                "P479822.187_5705866.783_120",
                "P479822.187_5705866.783_100",
                "P479816.67_5705861.672_100",
                "P479816.67_5705861.672_110",
                "P479822.187_5705866.783_120"
              ]
            ]
          ]
        ]
      }
    }
  ]
}
```

#### ttl
```ttl
@prefix dcterms: <http://purl.org/dc/terms/> .
@prefix geojson: <https://purl.org/geojson/vocab#> .
@prefix ns1: <http://www.opengis.net/def/glossary/term/> .
@prefix ns2: <http://www.iana.org/assignments/> .
@prefix oa: <http://www.w3.org/ns/oa#> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix time: <http://www.w3.org/2006/time#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

<http://www.example.com/features/DENW19AL0000giv5BL> a <app:building>,
        geojson:Feature ;
    dcterms:spatial [ a geojson:Polyhedron ;
            geojson:coordinates ( ( ( ( ( 4.798167e+05 5.705862e+06 100 ) ( 4.798222e+05 5.705867e+06 100 ) ( 4.798297e+05 5.705859e+06 100 ) ( 4.798242e+05 5.705854e+06 100 ) ( 4.798167e+05 5.705862e+06 100 ) ) ) ( ( ( 4.798167e+05 5.705862e+06 110 ) ( 4.798242e+05 5.705854e+06 110 ) ( 4.798297e+05 5.705859e+06 120 ) ( 4.798222e+05 5.705867e+06 120 ) ( 4.798167e+05 5.705862e+06 110 ) ) ) ( ( ( 4.798167e+05 5.705862e+06 110 ) ( 4.798167e+05 5.705862e+06 100 ) ( 4.798242e+05 5.705854e+06 100 ) ( 4.798242e+05 5.705854e+06 110 ) ( 4.798167e+05 5.705862e+06 110 ) ) ) ( ( ( 4.798242e+05 5.705854e+06 110 ) ( 4.798242e+05 5.705854e+06 100 ) ( 4.798297e+05 5.705859e+06 100 ) ( 4.798297e+05 5.705859e+06 120 ) ( 4.798242e+05 5.705854e+06 110 ) ) ) ( ( ( 4.798297e+05 5.705859e+06 120 ) ( 4.798297e+05 5.705859e+06 100 ) ( 4.798222e+05 5.705867e+06 100 ) ( 4.798222e+05 5.705867e+06 120 ) ( 4.798297e+05 5.705859e+06 120 ) ) ) ( ( ( 4.798222e+05 5.705867e+06 120 ) ( 4.798222e+05 5.705867e+06 100 ) ( 4.798167e+05 5.705862e+06 100 ) ( 4.798167e+05 5.705862e+06 110 ) ( 4.798222e+05 5.705867e+06 120 ) ) ) ) ) ] ;
    dcterms:time [ time:hasTime ( "2014-04-24T10:50:18Z" ".." ) ] ;
    ns1:CoordinateReferenceSystemCRS "http://www.opengis.net/def/crs/EPSG/0/5555" ;
    rdfs:seeAlso [ rdfs:label "Cadastral parcel 313 in district WÃ¼nnenberg (016)" ;
            ns2:relation <http://www.opengis.net/def/rel/ogc/1.0/within> ;
            oa:hasTarget <https://example.org/data/v1/collections/cadastralparcel/items/05297001600313______> ],
        [ rdfs:label "This feature is of type 'building'" ;
            ns2:relation <http://www.iana.org/assignments/relation/type> ;
            oa:hasTarget <https://inspire.ec.europa.eu/featureconcept/Building> ] ;
    geojson:geometry [ a geojson:Polygon ;
            geojson:coordinates ( ( ( 8.709205e+00 5.150353e+01 100 ) ( 8.709313e+00 5.150346e+01 100 ) ( 8.709392e+00 5.15035e+01 100 ) ( 8.709284e+00 5.150357e+01 100 ) ( 8.709205e+00 5.150353e+01 100 ) ) ) ] ;
    geojson:topology [ a geojson:Polyhedron ;
            geojson:relatedFeatures ( ( ( ( <http://www.example.com/features/P479816.67_5705861.672_100> <http://www.example.com/features/P479822.187_5705866.783_100> <http://www.example.com/features/P479829.666_5705858.785_100> <http://www.example.com/features/P479824.155_5705853.684_100> <http://www.example.com/features/P479816.67_5705861.672_100> ) ) ( ( <http://www.example.com/features/P479816.67_5705861.672_110> <http://www.example.com/features/P479824.155_5705853.684_110> <http://www.example.com/features/P479829.666_5705858.785_120> <http://www.example.com/features/P479822.187_5705866.783_120> <http://www.example.com/features/P479816.67_5705861.672_110> ) ) ( ( <http://www.example.com/features/P479816.67_5705861.672_110> <http://www.example.com/features/P479816.67_5705861.672_100> <http://www.example.com/features/P479824.155_5705853.684_100> <http://www.example.com/features/P479824.155_5705853.684_110> <http://www.example.com/features/P479816.67_5705861.672_110> ) ) ( ( <http://www.example.com/features/P479824.155_5705853.684_110> <http://www.example.com/features/P479824.155_5705853.684_100> <http://www.example.com/features/P479829.666_5705858.785_100> <http://www.example.com/features/P479829.666_5705858.785_120> <http://www.example.com/features/P479824.155_5705853.684_110> ) ) ( ( <http://www.example.com/features/P479829.666_5705858.785_120> <http://www.example.com/features/P479829.666_5705858.785_100> <http://www.example.com/features/P479822.187_5705866.783_100> <http://www.example.com/features/P479822.187_5705866.783_120> <http://www.example.com/features/P479829.666_5705858.785_120> ) ) ( ( <http://www.example.com/features/P479822.187_5705866.783_120> <http://www.example.com/features/P479822.187_5705866.783_100> <http://www.example.com/features/P479816.67_5705861.672_100> <http://www.example.com/features/P479816.67_5705861.672_110> <http://www.example.com/features/P479822.187_5705866.783_120> ) ) ) ) ] .

<http://www.example.com/features/P479822.187_5705866.783_100> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 4.798222e+05 5.705867e+06 100 ) ] .

<http://www.example.com/features/P479824.155_5705853.684_100> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 4.798242e+05 5.705854e+06 100 ) ] .

<http://www.example.com/features/P479829.666_5705858.785_100> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 4.798297e+05 5.705859e+06 100 ) ] .

<http://www.example.com/features/P479816.67_5705861.672_100> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 4.798167e+05 5.705862e+06 100 ) ] .

<http://www.example.com/features/P479822.187_5705866.783_120> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 4.798222e+05 5.705867e+06 120 ) ] .

<http://www.example.com/features/P479824.155_5705853.684_110> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 4.798242e+05 5.705854e+06 110 ) ] .

<http://www.example.com/features/P479829.666_5705858.785_120> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 4.798297e+05 5.705859e+06 120 ) ] .

<http://www.example.com/features/P479816.67_5705861.672_110> a geojson:Feature ;
    geojson:geometry [ a geojson:Point ;
            geojson:coordinates ( 4.798167e+05 5.705862e+06 110 ) ] .

[] a geojson:FeatureCollection ;
    geojson:features <http://www.example.com/features/DENW19AL0000giv5BL>,
        <http://www.example.com/features/P479816.67_5705861.672_100>,
        <http://www.example.com/features/P479816.67_5705861.672_110>,
        <http://www.example.com/features/P479822.187_5705866.783_100>,
        <http://www.example.com/features/P479822.187_5705866.783_120>,
        <http://www.example.com/features/P479824.155_5705853.684_100>,
        <http://www.example.com/features/P479824.155_5705853.684_110>,
        <http://www.example.com/features/P479829.666_5705858.785_100>,
        <http://www.example.com/features/P479829.666_5705858.785_120> .


```

## Schema

```yaml
$schema: https://json-schema.org/draft/2020-12/schema
description: Feature with Polyhedral geometry by reference
$defs:
  PolyhedralFeature:
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
                  const: Polyhedron
      required:
      - topology
  ContainedFeatureCollection:
    $ref: https://surroundaustralia.github.io/topo-feature/build/annotated/geo/topo/features/topo-feature-collection/schema.yaml
oneOf:
- $ref: '#/$defs/PolyhedralFeature'
- $ref: '#/$defs/ContainedFeatureCollection'

```

Links to the schema:

* YAML version: [schema.yaml](https://surroundaustralia.github.io/topo-feature/build/annotated/geo/topo/features/topo-polyhedron/schema.json)
* JSON version: [schema.json](https://surroundaustralia.github.io/topo-feature/build/annotated/geo/topo/features/topo-polyhedron/schema.yaml)


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
      "@id": "geojson:features",
      "@context": {
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
        "featureType": "@type"
      }
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
    "featureType": "geojson:collectionFeatureType",
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
[context.jsonld](https://surroundaustralia.github.io/topo-feature/build/annotated/geo/topo/features/topo-polyhedron/context.jsonld)


# For developers

The source code for this Building Block can be found in the following repository:

* URL: [https://github.com/surroundaustralia/topo-feature](https://github.com/surroundaustralia/topo-feature)
* Path: `_sources/features/topo-polyhedron`

