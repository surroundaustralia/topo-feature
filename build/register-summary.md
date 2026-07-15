# Topo-Feature

Features with 2 or 3D geometry defined via generalised topology between identified objects (Features).

Defines Feature (object) topology using a _topology_ property containing an ordered list of references to other features. \n\nOther features may be either features with topology properties or GeoJSON (or FG-JSON) geometry properties.\n\nTopo-Feature defined objects can be solids, swept volumes or any other concept. \n\nTopo-Feature allows for general topology to be described between independent features (objects) with any geometry dimensions. \n\nTopo-Feature-Collections define a self-contained set of such objects with referential integrity (all elements are present to fully define geometry coordinates.\n\nNote: This is a generalisation of the TopoJSON concept using inline, nested arrays of coordinates - but not limited to self-contained geometries per feature, duplicated between topologically related features..

Using JSON-FG allows for explicit CRS.

Supports transformation "smoke tests" from 2 and 3D topology to simple geojson views.

If desired coordinate compaction transformations could be defined as per TopoJSON functionality, using specialised CRS definition._


## Building Blocks

### `ogc.geo.topo.alignments.cityjson-transform` — CityJSON to TopoFeature transform

**Type:** schema

Demonstration of a transform from CityJSON to TopoFeature

### `ogc.geo.topo.datatypes.oriented-ref` — Oriented Object Reference

**Type:** datatype

A datatype for referencing a topological object with an orientation indicator ('+' or '-'), used to define the sense (direction/orientation) of boundary elements such as edges in rings or faces in shells.

### `ogc.geo.topo.datatypes.topology` — Geometry using references

**Type:** schema

Demonstration of a schema using coordinates of points, withpout duplication

### `ogc.geo.topo.features.topo-feature` — Feature with topology

**Type:** schema

This building block defines a GeoJSON feature with topological relationships to point nodes, or other to TopoFeatures

### `ogc.geo.topo.features.topo-arc` — Non-linear Arc and Spline Descriptions using Point topology

**Type:** schema

Defines options for describing Arcs, Circles, Splines using point features as canonical source of geometry coordinates

### `ogc.geo.topo.features.topo-feature-collection` — TopoFeatureCollection

**Type:** schema

This building block defines a GeoJSON (or FG-JSON) Feature Collection for a set of features with geometries defined by topological relationships. From these it is possible to derive simplified geometries using coordinates for each feature.

### `ogc.geo.topo.features.topo-line` — Line using Point References

**Type:** schema

Demonstration of a schema using coordinates of points, without duplication. Reuses context but constrains to Line types

### `ogc.geo.topo.features.topo-ring` — Ring Topology Feature

**Type:** schema

A feature representing a Ring in topology: an ordered, closed sequence of oriented Edge references that form a boundary loop. A Ring is used as the boundary of a Face.

### `ogc.geo.topo.features.topo-face` — Face Topology Feature

**Type:** schema

A feature representing a Face in topology: a bounded planar region described by an outer boundary Ring and zero or more inner boundary (hole) Rings. Faces are used as the surfaces of a Shell/Solid.

### `ogc.geo.topo.features.topo-polyhedron` — 3D (Polyhedron) using nested Polygons and Point topology

**Type:** schema

Typical 3D polyhedrons using features with Point geometry coordinates - note this does not support full topology of shared faces but matches many simplified geometry models.

### `ogc.geo.topo.features.topo-shell` — Shell Topology Feature

**Type:** schema

A feature representing a Shell in topology: a closed set of oriented Face references forming the boundary surface of a Solid. A Shell is the 3D analog of a Ring — it bounds a volumetric region.

### `ogc.geo.topo.features.topo-feature-multi-collection` — Topo Feature Multi-Collection

**Type:** schema

A schema for a structured topology dataset containing typed Feature Collections for each topological dimension: points, edges (Line features), faces (Face features), and solids (Polyhedron features). Each collection is restricted to its specific building block type, enabling referential integrity across the topology hierarchy.

