# Tool Support for Referenced Local / Engineering CRS Data

The 3D CSDM requires authoritative survey observations and cadastral geometry to be supplied using a jurisdictionally recognised coordinate reference system (CRS). 
However, supporting datasets referenced during preparation, review, validation, or visualisation may originate from BIM, CAD, engineering, architectural, or project-local coordinate systems.

This note describes a tool-support capability for documenting and using those local coordinate systems so that supporting data can be transformed, visualised, and compared against 3D CSDM content in a recognised CRS. 
The intent is not to permit authoritative 3D CSDM survey observations or cadastral geometry to be delivered in a local Engineering CRS. 
Rather, it is to allow software tools to understand how externally referenced local-grid datasets can be positioned relative to a jurisdictional CRS used by a 3D CSDM package.

A tool consuming a 3D CSDM package, or associated supporting data, should be able to identify the source local CRS, identify the target jurisdictional CRS, and apply a documented coordinate operation where such information is available. 
This may support visualisation of BIM or CAD context, comparison with survey geometry, quality assurance, and transformation of non-authoritative supporting data such as referenced Occupation Information, into a map-ready coordinate space.

## Background

Local or Engineering CRSs are commonly used in BIM, CAD, engineering, architectural, and construction datasets. 
These systems are often defined relative to a project origin, building grid, site control point, or BIM Project Base Point. 
They may also use project-specific axis directions, rotations, scales, or vertical references.

[OGC WKT2:2019](https://docs.ogc.org/is/18-010r7/18-010r7.html) recognises Local or Engineering CRSs. 
It is also aligned with [ISO 19111:2019 Geographic Information - Referencing by Coordinates](https://www.iso.org/obp/ui/en/#iso:std:iso:19111:ed-3:v1:en), and [ISO 19162:2019 Geographic Information - Well-known text representation of coordinate reference systems](https://www.iso.org/obp/ui/en/#iso:std:iso:19162:ed-2:v1:en). 
[PROJJSON](https://proj.org/en/stable/specifications/projjson.html) provides a JSON encoding of [OGC WKT2:2019](https://docs.ogc.org/is/18-010r7/18-010r7.html) / [ISO 19162](https://www.iso.org/obp/ui/en/#iso:std:iso:19162:ed-2:v1:en) CRS concepts and can be converted to and from [WKT2:2019](https://docs.ogc.org/is/18-010r7/18-010r7.html). 
This makes [PROJJSON](https://proj.org/en/stable/specifications/projjson.html) suitable for JSON-based tooling where a machine-readable CRS or coordinate operation definition is required.

BIM adopts a similar concept. In [IFC, `IfcMapConversion`](https://ifc43-docs.standards.buildingsmart.org/IFC/RELEASE/IFC4x3/HTML/lexical/IfcMapConversion.htm) is used to transform a local engineering coordinate system into a defined map CRS. 
It is useful for 3D CSDM tooling to be broadly compatible with standards such as [IFC](https://ifc43-docs.standards.buildingsmart.org/), because BIM data is expected to become a common supporting data format in 3D CSDM workflows.

The 3D CSDM need not adopt BIM terminology directly. 
For example, a BIM Project Base Point may be represented more generally as a `localOrigin`, `sourceControlPoint`, or similar transformation reference. 
The important requirement is that tooling can understand the local origin, axis definitions, rotations, scale, vertical reference, and target CRS needed to position the supporting data correctly.

## Tool Capability

Where supporting data referenced by a 3D CSDM package is supplied in a local, engineering, BIM, CAD, or project coordinate system, tools should be able to read or receive metadata describing that local coordinate system and its relationship to a recognised target CRS.

The transformation metadata should be sufficient to allow the supporting data to be positioned, visualised, or compared against 3D CSDM survey and cadastral content expressed in the required jurisdictional CRS. 
The transformation metadata should not be interpreted as replacing the CRS requirements for authoritative 3D CSDM survey observations or cadastral geometry.

## Example Local CRS and Transformation Metadata

An example of local CRS and coordinate operation metadata using a JSON structure suitable for tool support might look like the following:

```json
{
  "coordinateReferenceSystems": [
    {
      "id": "crs:local",
      "type": "EngineeringCRS",
      "name": "Building A BIM Local Engineering CRS",
      "description": "Local BIM coordinate system based on the project base point.",
      "axis": [
        {
          "name": "local X",
          "abbreviation": "X",
          "direction": "east",
          "unit": "metre"
        },
        {
          "name": "local Y",
          "abbreviation": "Y",
          "direction": "north",
          "unit": "metre"
        },
        {
          "name": "local Z",
          "abbreviation": "Z",
          "direction": "up",
          "unit": "metre"
        }
      ]
    },
    {
      "id": "crs:target",
      "type": "ProjectedCRS",
      "authority": "EPSG",
      "code": "7850",
      "name": "GDA2020 / MGA zone 50"
    }
  ],
  "coordinateOperations": [
    {
      "id": "op:local-to-map",
      "type": "CoordinateOperation",
      "sourceCRS": "crs:local",
      "targetCRS": "crs:target",
      "method": "3D affine transformation",
      "localOrigin": {
        "x": 392000.0,
        "y": 6465000.0,
        "z": 12.4,
        "crs": "crs:target"
      },
      "rotation": {
        "xAxisDegrees": 0.0,
        "yAxisDegrees": 0.0,
        "zAxisDegrees": 34.46031,
        "rotationConvention": "right-handed, applied X then Y then Z"
      },
      "scale": {
        "x": 1.0,
        "y": 1.0,
        "z": 1.0
      },
      "operationEncoding": {
        "format": "PROJJSON or WKT2",
        "definition": {
          "...": "authoritative CRS or coordinate operation definition"
        }
      }
    }
  ]
}
```

This provides both a human-readable description and a machine-transformable definition. 
The simplified fields support inspection and validation by users. 
The `operationEncoding.definition` field may contain, or reference, the authoritative machine-readable CRS or coordinate operation definition.

For tooling, the authoritative CRS or coordinate operation definition should preferably be one of:

1. an EPSG URI or code, where the CRS is already known;
2. WKT2:2019, where a complete custom CRS or coordinate operation must be defined; or
3. PROJJSON, where a native JSON representation of WKT2 / ISO 19111 concepts is required.

[PROJ4](https://proj4js.org/) strings may be useful for compatibility with some software, but should not be treated as the authoritative definition for custom local, engineering, vertical, or affine transformation metadata.

## Helmert vs Affine Transformations

A Helmert or similarity transformation is often sufficient for transforming BIM or CAD coordinates into a known CRS where the supporting dataset has a limited geographic footprint. 
A typical [3D Helmert transformation](https://proj.org/en/stable/operations/transformations/helmert.html) uses:

```
translation in X, Y, Z
rotation about X, Y, Z
one common scale factor
```

However, some supporting data may require an affine transformation. 
The main difference is that a Helmert transformation applies one common scale factor, whereas an affine transformation can support different scale factors for each axis (common with Cadastral Survey data) and, where required, a full transformation matrix.

A [3D Affine transformation](https://proj.org/en/stable/operations/transformations/affine.html) may use:

```
translation in X, Y, Z
rotation about X, Y, Z
scale factor of X, Y, Z
```

## Suggested Tool Support Requirement

Tools supporting 3D CSDM preparation, validation, review, or visualisation should be able to use transformation metadata for supporting datasets supplied in local, engineering, BIM, CAD, or project coordinate systems.

Where such supporting data is referenced, the tool should be able to identify the source local CRS and apply a documented coordinate operation to a recognised target CRS, such as the jurisdictional CRS used by the 3D CSDM package. 
The coordinate operation should include, as required, the local origin expressed in the target CRS, axis definitions, units, rotation convention, scale factor or transformation matrix, vertical reference, accuracy information, and provenance.

This requirement supports visualisation and comparison of referenced supporting data. 
It does not permit authoritative 3D CSDM survey observations or cadastral geometry to be supplied in a non-jurisdictional CRS unless allowed by the relevant jurisdiction.

## Suggested Capability Levels

The following capability levels could be used by tools to support referenced local CRS data.

### Level 1: Known CRS Only

Use where the supporting dataset is already supplied in a recognised CRS.

```json
{
  "horizontalCRS": "EPSG:7850",
  "verticalCRS": "EPSG:5711"
}
```
### Level 2: Local Engineering CRS with Simple Map Conversion

Use where the supporting BIM or CAD data is supplied in a local coordinate system and can be positioned using a local origin, rotation about the vertical axis, and a single scale factor.

```json
{
  "sourceCRS": "crs:local",
  "targetCRS": "EPSG:7850",
  "originInTargetCRS": [392000.0, 6465000.0, 12.4],
  "rotationAboutZDegrees": 34.46031,
  "scale": 1.0
}
```

This is similar to IFC `ifcMapConversion`.

### Level 3: Full 3D Affine Operation

Use where the supporting data requires rotations about X, Y, and Z, axis-specific scale factors, or a more rigorous 3D transformation.

```json
{
  "sourceCRS": "crs:local",
  "targetCRS": "EPSG:4979",
  "operationMethod": "3D affine",
  "matrix": [
    [0.8241, -0.5664, 0.0000, 115.23],
    [0.5664,  0.8241, 0.0000, 604.87],
    [0.0000,  0.0000, 1.0000,  12.40],
    [0.0000,  0.0000, 0.0000,   1.00]
  ],
  "operationEncoding": {
    "format": "PROJJSON",
    "definition": {}
  }
}
```

The matrix form is often the least ambiguous computational representation, provided the matrix convention, coordinate order, units, and transformation direction are explicitly stated.

## Information Required to Avoid Ambiguity

Where local CRS transformation metadata is used for supporting data, the following information should be provided where relevant:

1. Source CRS: the local or Engineering CRS, including units, axis order, and axis orientation. 
2. Target CRS: preferably an EPSG-coded jurisdictional or recognised CRS.
3. Origin point: the local origin expressed in the target CRS.
4. Rotation convention: axis order, sign convention, angular units, and whether the system is right-handed or left-handed.
5. Scale convention: single scale factor, per-axis scale factors, or full matrix.
6. Vertical reference: ellipsoidal height, Australian Height Datum, chart datum, building datum, floor datum, or other relevant vertical reference.
7. Transformation direction: local-to-target or target-to-local.
8. Authoritative operation encoding: EPSG, WKT2:2019, or PROJJSON, where available.
9. Accuracy and uncertainty: expected transformation accuracy, source method, procedure, responsible agent, and limitations.
10. Provenance: whether the transformation was derived from BIM Project Base Point metadata, survey control, IFC `IfcMapConversion`, manual georeferencing, or another process.

## Summary:

The 3D CSDM should continue to require authoritative survey observations and cadastral geometry to be supplied in the jurisdictionally required CRS. 
However, tools that support 3D CSDM workflows should be able to work with referenced BIM, CAD, engineering, and other local-grid datasets.

Where such supporting data is supplied in a local or Engineering CRS, tooling should be able to use local CRS metadata and a documented coordinate operation to transform or display that data in a recognised target CRS. 
[EPSG](https://epsg.io/) identifiers should be used where the CRS is already known. 
[WKT2:2019](https://docs.ogc.org/is/18-010r7/18-010r7.html) or [PROJJSON](https://proj.org/en/stable/specifications/projjson.html) should be used where a custom Engineering CRS or coordinate operation must be defined. 
[PROJ4](https://proj4js.org/) strings may be included for software compatibility, but should not be treated as the authoritative definition.

This pattern allows local-grid supporting data to be visualised and compared with 3D CSDM content without weakening the CRS requirements for authoritative cadastral and survey data.