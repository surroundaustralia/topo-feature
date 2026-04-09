# WA 3D CSDM Topology Rules

The following is a summary of Section 4 Topology Rules extracted from NGSC Delivery 1, normalised into common topology rule names with short descriptions.
The summary forms the designing basis for a set of proof-of-concept tests implemented in `validator.py`, `test_validator.py`, and `conftest.py`.

## Terminology

In [ISO 19107:2019 Geographic Information - Spatial Schema](https://www.iso.org/standard/66175.html), a **Curve** is the general term for a one-dimensional primitive that supports various interpolation methods for defining the path that a curve follows from its start point to its end point.
Interpolation methods include linear, circular, clothoid, or parametric. 
For the 3D CSDM, with respect to Solids, a **Curve** is a boundary of a **Surface** of a **Solid**.

A **LineString** (or MultiLineString) is a specific type of curve that uses linear interpolation between its start and end points.

A **Ring** is a single closed oriented set of curves that define the boundary of a surface.

A **Surface** is a two- or three-dimensional bounded primitive, that is, a bounded area defined by at least one outer ring, and optionally a set of inner rings for holes. 
They can be planar or non-planar (curved). For most implementations, surfaces are planar (linear).

A **Face** is a topological collection of directed edges whose geometric realisation is a surface.

A **Shell** is a collection of oriented surfaces that form a closed 2-manifold. 
They do not have holes, they are watertight, and the surfaces are oriented outwards for Solids.
A 2-manifold is a surface where every point looks locally flat. 
For example, if you zoom-in anywhere on the earth, it appears flat. 
There are no pinch points, nor edges.
A sphere is a 2-manifold. 
A figure 8 is not.
A watertight Shell is closed so that it forms a well-defined interior that does not connect to the exterior.

A **Solid** is a bounded volume in 3D described by an exterior Shell and zero or more interior shells (for cavities). 
Shells must be watertight, with the surfaces oriented outwards. Intersection of shells is limited to edges and vertices.
There must be no volume overlap.
This ensures valid topology for volume computation.

## 3D CSDM Topology Rules: Test-Oriented Summary

Rules marked **✅ Implemented** have a corresponding validator function and unit tests.  Rules marked **— Not implemented** are in scope for future work.

| #  | Rule Category                | Common Rule Name                 | Short Description                                                              | Status                                                            |
|----|------------------------------|----------------------------------|--------------------------------------------------------------------------------|-------------------------------------------------------------------|
| 1  | **Point Rules**              | Unique cadastral points          | No duplicate points within tolerance                                           | ✅ TR-01                                                           |
| 2  |                              | Point fabric consistency         | All geometry vertices must reference cadastral points that are boundary points | TR-11: partially implemented; need to add boundary mark type test |
| 3  | **Curve Rules**              | Simple curve                     | Curves must not self-intersect except at endpoints                             | ✅ TR-02                                                           |
| 4  |                              | Minimum curve length             | Curves must exceed minimum length tolerance                                    | ✅ TR-12                                                           |
| 5  |                              | No duplicate curves              | Identical curves cannot exist in same dataset                                  | ✅ TR-13                                                           |
| 6  |                              | Curve orientation                | Curves must follow consistent direction when required                          | — Not implemented                                                 |
| 7  |                              | Curve intersection at nodes only | Curves may only meet at cadastral survey marks                                 | ✅ TR-14                                                           |
| 8  |                              | No dangling curves               | Curves must form boundaries or be explicitly flagged                           | TR-03: partially implemented; need to add flags                   |
| 9  |                              | Curve must bound surface         | Curves must belong to at least one surface unless flagged                      | TR-03: partially implemented; need to add flags                   |
| 10 | **Surface Rules**            | Closed surface rings             | Surface boundaries must be closed                                              | ✅ TR-04                                                           |
| 11 |                              | No surface self-intersection     | Surface rings must not intersect each other                                    | ✅ TR-15                                                           |
| 12 |                              | Connected interior               | Surface interior must be continuous                                            | — Not implemented                                                 |
| 13 |                              | No duplicate surfaces            | Identical surfaces not allowed                                                 | ✅ TR-16                                                           |
| 14 |                              | Surface-curve consistency        | Surface edges must reference known curves                                      | ✅ TR-17                                                           |
| 15 |                              | Shared edges consistency         | Adjacent surfaces must use opposite edge orientations                          | ✅ TR-05                                                           |
| 16 |                              | Surface form constraint          | Surfaces must meet model-specific form rules (optional)                        | — Not implemented                                                 |
| 17 | **Shell / Face Rules**       | Surfaces form shells             | Surfaces assemble into closed shells                                           | ✅ TR-06                                                           |
| 18 |                              | No shell gaps or overlaps        | Shell surfaces must meet perfectly                                             | ✅ TR-06                                                           |
| 19 |                              | No dangling faces                | Every face must participate in at least one shell                              | ✅ TR-18                                                           |
| 20 |                              | Two faces per edge               | Each shell edge shared by exactly two faces                                    | ✅ TR-06                                                           |
| 21 | **Solid Rules**              | Closed solid                     | Solid must be bounded by closed shell(s)                                       | ✅ TR-06                                                           |
| 22 |                              | Solid non self-intersection      | Solids must not intersect themselves                                           | — Not implemented                                                 |
| 23 |                              | Positive volume                  | Solid must have non-zero volume                                                | ✅ TR-07                                                           |
| 24 |                              | Minimum thickness                | Avoid sliver solids (thin AABB in any axis)                                    | ✅ TR-19                                                           |
| 25 |                              | Shell orientation                | Outer shell outward, inner shells inward                                       | — Not implemented                                                 |
| 26 | **Solid Relationship Rules** | Shared boundary consistency      | Adjacent solids share a common face                                            | ✅ TR-10                                                           |
| 27 |                              | Face adjacency limit             | Solid face adjacent to at most one neighbour solid                             | ✅ TR-10                                                           |
| 28 |                              | No overlapping solids            | Solids in same theme cannot overlap (by 3D AABB)                               | ✅ TR-08                                                           |
| 29 | **Containment Rules**        | Parent-child containment         | Child parcel bbox must lie within parent parcel bbox                           | ✅ TR-09                                                           |
| 30 |                              | Easement containment             | Easements must lie within their servient parcel                                | TR-20: partially implemented;                                     |
| 31 |                              | Thematic host relationship       | Thematic solids must reference a valid host parcel                             | TR-21: partially implemented;                                     |

---

## Implemented Rules — Detail

The following twenty-one rules are implemented (some partially) in `validator.py` and tested in `test_validator.py`. 

### Point Rules

#### TR-01 — UniquePoints
**Function:** `validate_unique_points(data, tol=1e-6)`
**Error code:** `DUPLICATE_POINT_PROXIMITY`
No two cadastral points may lie within `tol` metres of each other.  The tolerance guards against duplicate survey marks that would corrupt the geometry fabric.

#### TR-11 — PointFabricConsistency
**Function:** `validate_point_fabric_consistency(data)`
**Error code:** `UNKNOWN_POINT_REFERENCE`
Every vertex id referenced in a curve must exist in the `points` collection.  A broken link between the curve layer and the point layer indicates an incomplete or corrupt topology dataset.

---

### Curve Rules

#### TR-02 — CurveNoSelfIntersection
**Function:** `validate_curve_no_self_intersection(data)`
**Error code:** `CURVE_SELF_INTERSECTION`
Curves must not cross themselves except at their endpoints.  Only curves with four or more vertices (three or more segments) can self-intersect.  Non-adjacent segment pairs are tested using the 3D coplanarity and parametric intersection algorithm (`_segments_intersect_3d`): segments that are skew (at different elevations) are correctly identified as non-intersecting.

#### TR-12 — MinimumCurveLength
**Function:** `validate_minimum_curve_length(data, min_length=1e-3)`
**Error code:** `CURVE_BELOW_MINIMUM_LENGTH`
The total arc length of each curve must exceed `min_length` metres.  Curves shorter than the snapping tolerance produce degenerate topology and may indicate coincident survey marks.

#### TR-13 — NoDuplicateCurves
**Function:** `validate_no_duplicate_curves(data)`
**Error code:** `DUPLICATE_CURVE`
No two curves may connect the same sequence of vertices.  Two curves are considered duplicates when their vertex lists are identical or are exact reverses of each other (same geometry, opposite traversal direction).

#### TR-14 — CurveIntersectionAtNodesOnly
**Function:** `validate_curve_intersection_at_nodes_only(data)`
**Error code:** `CURVE_INTERSECTION_NOT_AT_NODE`
Two distinct curves may only meet at shared cadastral point nodes.  A crossing between the interiors of two curve segments (not at a shared vertex endpoint) is flagged.  The 3D coplanarity test ensures that curves on separate building levels whose XY projections overlap are not falsely reported — only genuinely coplanar, crossing segments are flagged.

#### TR-03 — NoDanglingCurves
**Function:** `validate_no_dangling_curves(data)`
**Error code:** `DANGLING_CURVE`
Every curve must be referenced by at least one surface ring.  A curve not used by any surface is topologically orphaned and cannot contribute to a valid solid boundary.

---

### Surface Rules

#### TR-04 — SurfaceClosedRing
**Function:** `validate_surface_closed_rings(data)`
**Error code:** `SURFACE_RING_NOT_CLOSED`
Every ring in a surface must form a closed chain.  The end-point of each ring member must equal the start-point of the next, and the ring must close back to its first start-point.

#### TR-15 — NoSurfaceSelfIntersection
**Function:** `validate_no_surface_self_intersection(data)`
**Error code:** `SURFACE_SELF_INTERSECTION`
The edges within a surface ring must not cross each other.  Non-adjacent segments of the same ring are tested using the 3D coplanarity and parametric intersection algorithm.  A self-intersecting ring defines an invalid (bowtie) polygon.  Segments that are skew (non-coplanar) are correctly treated as non-intersecting.

#### TR-16 — NoDuplicateSurfaces
**Function:** `validate_no_duplicate_surfaces(data)`
**Error code:** `DUPLICATE_SURFACE`
No two surfaces may reference the same set of curves.  Two surfaces are considered duplicates when the frozenset of all curve ids referenced in their rings is identical, regardless of ring or member order.

#### TR-17 — SurfaceCurveConsistency
**Function:** `validate_surface_curve_consistency(data)`
**Error code:** `UNKNOWN_CURVE_REFERENCE`
Every curve id referenced in a surface ring must exist in the `curves` collection.  A broken reference between the surface layer and the curve layer indicates an incomplete or corrupt topology dataset.

#### TR-05 — SharedSurfaceEdges
**Function:** `validate_shared_surface_edges(data)`
**Error code:** `SHARED_EDGE_SAME_ORIENTATION`
When a curve is used in two surfaces it must appear with opposite orientations (one `+` and one `−`).  A curve appearing with the same orientation in two faces indicates that the outward-normal convention is broken on the shared edge.

---

### Shell / Face Rules

#### TR-18 — NoDanglingFaces
**Function:** `validate_no_dangling_faces(data)`
**Error code:** `DANGLING_FACE`
Every surface must be referenced by at least one solid shell.  A face that no solid owns cannot form part of any closed shell and is topologically orphaned.

#### TR-06 — ClosedSolid
**Function:** `validate_closed_solid(data)`
**Error code:** `OPEN_SOLID_SHELL`
The shell of a solid must be a closed 2-manifold.  In a closed shell every curve is used by the solid's faces exactly twice (once in each direction).  A count other than 2 means the shell has a gap or a hole.

---

### Solid Rules

#### TR-07 — PositiveVolume
**Function:** `validate_positive_volume(data, tol=1e-9)`
**Error code:** `ZERO_OR_NEGATIVE_VOLUME`
Every solid must declare a strictly positive volume.  A zero or negative declared volume indicates a degenerate or inverted solid.

#### TR-19 — MinimumSolidThickness
**Function:** `validate_minimum_solid_thickness(data, min_thickness=1e-3)`
**Error code:** `SOLID_BELOW_MINIMUM_THICKNESS`
The bounding box of each solid must have a minimum extent of `min_thickness` metres in every axis direction.  Solids that are effectively flat in one or more directions (slivers) are numerically unstable.

---

### Solid Relationship Rules

#### TR-10 — SharedSolidFace
**Function:** `validate_shared_solid_face(data)`
**Error code:** `FACE_ADJACENCY_LIMIT_EXCEEDED`
Each face may be shared by at most two solids.  A face shared by three or more solids violates the rule that every face is adjacent to at most one neighbour solid.

#### TR-08 — NoSolidOverlap
**Function:** `validate_no_solid_overlap(data)`
**Error code:** `SOLID_OVERLAP`
Solids in the same theme must not overlap.  Overlap is detected by strict 3D AABB intersection.  Three categories of pair are exempt:
1. **Parent–child pairs** — containment is expected and verified by TR-09.
2. **Disjoint-level pairs** — solids that declare non-overlapping `levels` sets occupy separate storeys; an AABB overlap is a cross-level artefact.
3. **Topologically adjacent pairs** — solids that share a boundary face are properly connected neighbours whose AABBs naturally touch at the shared face.

---

### Containment Rules

#### TR-09 — ParentContainment
**Function:** `validate_parent_containment(data)`
**Error codes:** `CHILD_NOT_CONTAINED_IN_PARENT`, `UNKNOWN_PARENT_REFERENCE`
A child parcel bounding box must be fully contained within its parent parcel bounding box.  A solid declares its parent via the `parent_id` field.

#### TR-20 — EasementContainment
**Function:** `validate_easement_containment(data)`
**Error codes:** `EASEMENT_MISSING_SERVIENT`, `UNKNOWN_SERVIENT_REFERENCE`, `EASEMENT_NOT_CONTAINED_IN_SERVIENT`
Every easement solid (`parcel_type == "easement"`) must be fully contained within its declared servient parcel solid.  The easement must carry a `servient_id` that resolves to a known solid, and its bounding box must lie within the servient's bounding box.

#### TR-21 — ThematicHostRelationship
**Function:** `validate_thematic_host_relationship(data)`
**Error codes:** `THEMATIC_SOLID_MISSING_HOST`, `UNKNOWN_HOST_REFERENCE`
Every thematic solid (`parcel_type == "thematic"`) must reference a valid host parcel solid via the `host_id` field.  The `host_id` must resolve to a known solid in the same dataset.

---

## Data Model

The validator operates on a plain Python dict with four top-level lists:

```
{
  "points":   [{"id": str, "coordinates": [x, y, z]}, ...],
  "curves":   [{"id": str, "vertices": [pt_id, ...]}, ...],
  "surfaces": [{"id": str,
                "rings": [{"type": "outer"|"inner",
                           "members": [{"ref": curve_id,
                                        "orientation": "+"|"-"}, ...]
                          }, ...]
               }, ...],
  "solids":   [{"id": str,
                "faces": [surface_id, ...],
                "volume": float,
                "theme": str,
                "parcel_type": "primary"|"child"|"easement"|"thematic",
                "parent_id": str | null,
                "servient_id": str | null,
                "host_id": str | null,
                "levels": [str, ...]
               }, ...]
}
```

**Curve orientation convention:**
- `"+"` — traverse `vertices[0]` → `vertices[-1]`
- `"-"` — traverse `vertices[-1]` → `vertices[0]`

Topology JSON fixtures in the CSDM geometry schema (using `edges`/`faces`/`solids` with GeoJSON Feature wrappers) are converted to this format via `from_csdm_json()` in `validator.py`.

---

## Test Infrastructure

### `validator.py`
Core validation module.  Each TR-xx rule is a standalone function that accepts the topology dict and returns a list of issue dicts:
```python
{"code": str, "severity": "error"|"warning", "message": str,
 "object_id": str|None, "path": str|None, "extra": dict}
```
The top-level entry point `validate_topology(data, tol={})` runs all twenty-one rules and returns the combined issue list.  Optional tolerance overrides: `"point"` (TR-01), `"volume"` (TR-07), `"length"` (TR-12), `"thickness"` (TR-19).

**Key geometry helper — `_segments_intersect_3d`**

Rules TR-02, TR-14, and TR-15 all rely on a shared 3D segment intersection test.  The algorithm:

1. **Parallel guard** — computes `n = d1 × d2` (cross product of the two segment directions).  If `|n|² < tol²` the segments are parallel and cannot properly cross.
2. **Coplanarity guard** — the perpendicular distance between the two infinite lines is `|r · n| / |n|` where `r = p3 − p1`.  If this exceeds `tol` the segments are *skew* (non-coplanar) and cannot intersect.  This is the critical step for 3D geometry: curves on separate building levels that only appear to cross in the XY projection are correctly identified as skew and ignored.
3. **Parametric solve** — for coplanar segments, computes the intersection parameters `t` and `s` along each segment.  A proper interior crossing requires `0 < t < 1` and `0 < s < 1` (endpoints excluded).

The previous 2D implementation (`_segments_intersect_2d`) projected all geometry onto the XY plane and could generate false positives for legitimate 3D topology such as boundaries on different building storeys.

### `conftest.py`
Pytest fixtures and topology builders.

- **`cube_data(prefix, x0,y0,z0, x1,y1,z1, **kwargs)`** — factory that constructs a topologically valid axis-aligned cube with mathematically verified outward-normal ring orientations.  Accepts `theme`, `parcel_type`, `parent_id`, `servient_id`, `host_id`, `levels`, and `volume`.
- **`merge_datasets(*datasets)`** — combines multiple topology dicts into one, running a three-stage deduplication pipeline (points → curves → surfaces) that models the CSDM requirement that shared boundary elements are the same cadastral objects.
- **Pytest fixtures:** `unit_cube`, `two_adjacent_cubes`, `nested_cubes`
- **`--fixture <filename>`** CLI option — selects a JSON geometry fixture file for the `TestFixture` class (default: `tetrahedron.json`).

### `test_validator.py`
88 unit tests across 23 classes.  Each implemented rule has at least one valid (happy-path) test and one invalid (violation-injection) test.

| Class | Rule | Tests |
|-------|------|-------|
| `TestTR01UniquePoints` | TR-01 | 4 |
| `TestTR02CurveNoSelfIntersection` | TR-02 | 3 |
| `TestTR03NoDanglingCurves` | TR-03 | 2 |
| `TestTR04SurfaceClosedRing` | TR-04 | 3 |
| `TestTR05SharedSurfaceEdges` | TR-05 | 2 |
| `TestTR06ClosedSolid` | TR-06 | 3 |
| `TestTR07PositiveVolume` | TR-07 | 4 |
| `TestTR08NoSolidOverlap` | TR-08 | 4 |
| `TestTR09ParentContainment` | TR-09 | 4 |
| `TestTR10SharedSolidFace` | TR-10 | 3 |
| `TestTR11PointFabricConsistency` | TR-11 | 2 |
| `TestTR12MinimumCurveLength` | TR-12 | 3 |
| `TestTR13NoDuplicateCurves` | TR-13 | 3 |
| `TestTR14CurveIntersectionAtNodesOnly` | TR-14 | 3 |
| `TestTR15NoSurfaceSelfIntersection` | TR-15 | 2 |
| `TestTR16NoDuplicateSurfaces` | TR-16 | 2 |
| `TestTR17SurfaceCurveConsistency` | TR-17 | 2 |
| `TestTR18NoDanglingFaces` | TR-18 | 2 |
| `TestTR19MinimumSolidThickness` | TR-19 | 3 |
| `TestTR20EasementContainment` | TR-20 | 4 |
| `TestTR21ThematicHostRelationship` | TR-21 | 4 |
| `TestIntegration` | All | 4 |
| `TestFixture` | All (via JSON) | 22 |

`TestFixture` covers all 21 rules individually plus one combined `test_fixture_passes_all_tr_rules` test.  `TestTR14` includes a dedicated skew-segment test (`test_skew_curves_at_different_elevations_pass`) that confirms the 3D intersection upgrade does not generate false positives for curves on separate building levels.

---

## Rules Not Yet Implemented

The following rules from the full NGSC Delivery 1 specification are identified but not yet implemented in this POC:

| Rule | Description | Notes |
|------|-------------|-------|
| Curve orientation | Curves must follow consistent direction when required | Orientation convention is defined but not validated globally |
| Connected interior | Surface interior must be continuous | Requires planar graph connectivity analysis |
| Surface form constraint | Surfaces must meet model-specific form rules | Dataset-specific; out of scope for generic POC |
| Solid non self-intersection | Solids must not intersect themselves | Requires full mesh self-intersection test |
| Shell orientation | Outer shell outward, inner shells inward | Requires signed-volume / winding-order computation |
