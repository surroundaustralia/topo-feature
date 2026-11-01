
# Topo-Feature Ontology (Model)

`ogc.geo.topo.ontology` *v0.1*

Classes and properties for features whose geometry is defined by topological references to other features: the topology types (Edge, Ring, Face, Shell, Solid, AggregateSolid and curve types), plain and oriented references, and the multi-collection groupings. Provides the definitions for the terms bound by the Topo-Feature JSON-LD contexts.

[*Status*](http://www.opengis.net/def/status): Under development

## Description

## Topo-Feature ontology

The classes and properties bound by the Topo-Feature JSON-LD contexts.

The value of a feature's `topology` property (`geojson:topology`) is typed with a topology class: `topo:Edge`,
`topo:Ring`, `topo:Face`, `topo:Shell`, `topo:Solid`, `topo:AggregateSolid` or `topo:AggregatePolygon` (all subclasses
of `topo:Topology`),
or one of the curve types `Arc`, `ArcWithCenter`, `ArcByChord`, `CircleByCenter` and `CubicSpline`.

| JSON property | RDF |
|---|---|
| `topology` | `geojson:topology` |
| `references`, `relationships` | `topo:relatedFeatures` (an ordered list) |
| `directed_references` | `topo:directedReferences` (an ordered list of `topo:OrientedReference`) |
| `ref`, `orientation` | `topo:ref`, `topo:orientation` |
| `points`, `edges`, `rings`, `faces`, `shells`, `solids` | `topo:points` ... `topo:solids` |
| `circumference` | `topo:circumference` |
| `radius`, `arcLength`, `startTangentVector`, `endTangentVector` | `geojson:radius` ... `geojson:endTangentVector` |

### Terms in the GeoJSON-LD namespace

The Topo-Feature contexts map `topology`, the curve types, `radius`, `arcLength` and the tangent vectors into the
GeoJSON-LD namespace (`https://purl.org/geojson/vocab#`), which does not define them. They are declared in this
ontology (with `rdfs:isDefinedBy` the Topo-Feature ontology) so that the existing bindings resolve, and may move to
a more suitable namespace when one is available (for example GeoSPARQL 1.3).

### Known binding issue

`references` (an ordered list of member references) and `relationships` (typed links with `rel` = `topology`) both
map to `topo:relatedFeatures`.

## Examples

### Ring, Solid, Edge and arc topologies
The RDF form of the topology examples in the Topo-Feature block descriptions: a Ring of oriented Edge
references, a Solid with an interior void, an Edge referencing two Points, and an arc with centre
(from the `topo-arc` example `arc_by_center.json`).
#### turtle
```turtle
@prefix geojson: <https://purl.org/geojson/vocab#> .
@prefix topo:    <https://purl.org/geojson/topo#> .
@prefix ex:      <http://www.example.com/features/> .

# A Ring feature, from the topo-ring block description: a closed loop of four oriented Edge references.
<urn:uuid:5f0d9a2e-ring-example>
  a geojson:Feature ;
  geojson:topology [
      a topo:Ring ;
      topo:directedReferences (
          [ topo:ref <urn:uuid:c60507ba-226b-4e49-a702-e9afef899b23> ; topo:orientation "+" ]
          [ topo:ref <urn:uuid:7dc1cc1c-8e7f-4666-9f52-4e6c2e6f57ac> ; topo:orientation "+" ]
          [ topo:ref <urn:uuid:83ff2cdf-6c58-4e7b-ba55-e084eff8c569> ; topo:orientation "+" ]
          [ topo:ref <urn:uuid:d69c596c-134e-4216-9bf6-d0f10e6886d8> ; topo:orientation "+" ]
        ) ;
    ] ;
.

# A Solid with an interior void, from the topo-solid block description.
<urn:uuid:5f0d9a2e-solid-example>
  a geojson:Feature ;
  geojson:topology [
      a topo:Solid ;
      topo:directedReferences (
          [ topo:ref <urn:uuid:e7bbe46f-e375-42b6-84aa-e284bc0b9568> ; topo:orientation "+" ]
          [ topo:ref <urn:uuid:97a089af-4929-4d36-8e01-74f573343edb> ; topo:orientation "-" ]
        ) ;
    ] ;
.

# An Edge referencing its two vertex Points, from the topology datatype description.
<urn:uuid:5f0d9a2e-edge-example>
  a geojson:Feature ;
  geojson:topology [
      a topo:Edge ;
      topo:relatedFeatures ( <urn:uuid:point-a> <urn:uuid:point-b> ) ;
    ] ;
.

# An arc with centre, from the topo-arc example arc_by_center.json (start, end, centre).
ex:arcWithCentre
  a geojson:Feature ;
  geojson:topology [
      a geojson:ArcWithCenter ;
      topo:relatedFeatures ( ex:arcP1 ex:arcP2 ex:PC ) ;
      topo:orientation "ccw" ;
    ] ;
  geojson:radius 105.438 ;
  geojson:arcLength 25.615 ;
.

```

## Sources

* [Topo-Feature building block descriptions and schemas](https://github.com/ogcincubator/topo-feature/tree/master/_sources)

# For developers

The source code for this Building Block can be found in the following repository:

* URL: [https://github.com/surroundaustralia/topo-feature](https://github.com/surroundaustralia/topo-feature)
* Path: `_sources/ontology`

