# Topology Boundary-Block Validator

`topo-validator` validates `topo-feature` / WA 3D CSDM topology data against a set of boundary-block topology rules. It checks whether points, curves, surfaces, shells, solids, and solid relationships form a coherent 3D topological model.

The validator can be used:

- from the command line,
- from Python code,
- in automated tests or CI,
- to generate text, JSON, or HTML validation reports.

## What this tool validates

The validator runs structural checks first, then topology conformance checks grouped into conformance classes.

| Conformance class | Name                          | Rules                                                |
|-------------------|-------------------------------|------------------------------------------------------|
| `CC-01`           | Point topology                | `TR-01`, `TR-11`                                     |
| `CC-02`           | Curve topology                | `TR-02`, `TR-03`, `TR-12`, `TR-13`, `TR-14`, `TR-22` |
| `CC-03`           | Surface topology              | `TR-04`, `TR-05`, `TR-15`, `TR-16`, `TR-17`, `TR-23` |
| `CC-04`           | Shell topology                | `TR-06`, `TR-18`                                     |
| `CC-05`           | Solid topology                | `TR-07`, `TR-19`, `TR-24`, `TR-25`                   |
| `CC-06`           | Solid relationship topology   | `TR-08`, `TR-10`                                     |
| `CC-07`           | Containment and host topology | `TR-09`, `TR-20`, `TR-21`                            |

Structural validation checks that required collections and fields are present and safe to process. If structural errors are found, topology rules are not run.

## Supported input

The command-line validator accepts Topo Feature / 3D CSDM JSON files and converts them into the internal topology model before validation.

Expected CSDM-style top-level collections include:

- `points`
- `edges`
- `rings`
- `faces`
- `shells`
- `solids`
- optional `observedVectors`
- optional `vectorObservations`

The loader maps CSDM feature collections into the validator's internal model:

| CSDM JSON                                                         | Internal topology model      |
|-------------------------------------------------------------------|------------------------------|
| `points[].features[].place.coordinates` or `geometry.coordinates` | `points[].coordinates`       |
| `edges[].features[].topology.references`                          | `curves[].vertices`          |
| `rings[].features[].topology.directed_references`                 | `surfaces[].rings[].members` |
| `faces[].features[].topology.directed_references`                 | `surfaces[]` via ring lookup |
| `shells[].features[].topology.directed_references`                | `solids[].shells[].faces`    |
| `solids[].features[].topology.shells`                             | `solids[]` via shell lookup  |

You can also validate an "internal" topology dictionary by using the `--raw-internal` CLI flag or calling `validate_topology()` directly.

## Internal topology model

Internally, validation operates on a plain Python dictionary with these collections:

```text 
python { "points": , "curves": , "surfaces": , "solids": , "observation_curves": , }
```

### Orientation convention

Curve and face orientations use:

- `+` — forward direction
- `-` — reverse direction

For curves:

- `+` traverses `vertices[0] → vertices[-1]`
- `-` traverses `vertices[-1] → vertices[0]`

For shells:

- outer shells should have outward-facing orientation,
- inner shells should have inward-facing orientation.



## Installation / setup

From the repository root, ensure Python can import the `topo_validator` package.

For local development, run commands from the repository root, for example:

```bash 
python -m topo_validator.cli topo-validator/tests/tetrahedron.json
```

If your environment requires dependencies, install the project/test requirements used by the wider repository before running validation.


## Command-line usage

### Validate a CSDM JSON file and print a text report

```bash 
python -m topo_validator.cli path/to/model.json
```

By default, the CLI:

1. reads the JSON file,
2. converts Topo Feature / 3D CSDM JSON to internal topology data,
3. validates all conformance classes,
4. prints a text report,
5. exits with:
   - `0` when no errors are found,
   - `1` when validation errors are found,
   - `2` when input/CLI processing fails.



### Choose report format

Supported formats are:

- `text`
- `json`
- `html`

```bash 
python -m topo_validator.cli path/to/model.json --format text 
python -m topo_validator.cli path/to/model.json --format json 
python -m topo_validator.cli path/to/model.json --format html
```

### Save a report to a file

```bash 
python -m topo_validator.cli path/to/model.json
--format html
--output reports/model-validation-report.html
```

For HTML reports, if `--output` is omitted, the CLI writes to the package's default reports directory using the input filename stem.



### Validate already-converted internal topology data

Use `--raw-internal` when the input JSON is already in the internal `points` / `curves` / `surfaces` / `solids` format.

```bash 
python -m topo_validator.cli path/to/internal-topology.json --raw-internal
```

## Python API usage

### Validate a CSDM JSON file

```python 
from pathlib import Path
from topo_validator import from_csdm_json, load_json, validate_topology 
from topo_validator.model import errors_only
raw = load_json(Path("path/to/model.json")) 
topology = from_csdm_json(raw)
issues = validate_topology(topology) 
errors = errors_only(issues)
if errors: print(f"Validation failed with {len(errors)} error(s)") 
for issue in errors: print(issue["code"], issue["object_id"], issue["message"]) 
else: print("Validation passed")
```

### Generate reports programmatically

```python 
from pathlib import Path
from topo_validator import from_csdm_json, load_json, validate_topology 
from topo_validator.report import to_text_report, to_html_report, to_json_report
raw = load_json("path/to/model.json") 
topology = from_csdm_json(raw) 
issues = validate_topology(topology)
text_report = to_text_report(issues) 
json_report = to_json_report(issues) 
html_report = to_html_report(issues)
Path("validation-report.txt").write_text(text_report, encoding="utf-8") 
Path("validation-report.json").write_text(json_report, encoding="utf-8") 
Path("validation-report.html").write_text(html_report, encoding="utf-8")
```

### Override tolerances

Validation tolerances can be passed as a dictionary:

```python 
from topo_validator import validate_topology
issues = validate_topology
```

Or as a `Tolerances` object:

```python 
from topo_validator import Tolerances, validate_topology
tolerances = Tolerances
issues = validate_topology(topology, tol=tolerances)
```

Default tolerances are:

| Tolerance   | Default | Used by                                      |
|-------------|--------:|----------------------------------------------|
| `point`     |  `1e-6` | duplicate point proximity                    |
| `volume`    |  `1e-9` | positive volume and shell orientation checks |
| `length`    |  `1e-3` | minimum curve length                         |
| `thickness` |  `1e-3` | minimum solid thickness                      |


## Understanding validation results

Each issue is a dictionary with this shape:

```json
{ "code": "UNKNOWN_POINT_REFERENCE", 
  "severity": "error", 
  "message": "Curve e0 references unknown point 'p9'", 
  "object_id": "e0", 
  "path": None, 
  "extra": { 
    "vertex_id": "p9", 
  },
}
```

Important fields:

| Field       | Meaning                                         |
|-------------|-------------------------------------------------|
| `code`      | Stable machine-readable issue code              |
| `severity`  | `error` or `warning`                            |
| `message`   | Human-readable explanation                      |
| `object_id` | Affected topology object, when available        |
| `path`      | Data path for structural issues, when available |
| `extra`     | Additional machine-readable metadata            |

Use `errors_only()` to ignore warnings:

```python 
from topo_validator.model import errors_only
errors = errors_only(issues)
```

Use `has_error()` to check for a specific issue code:

```python 
from topo_validator.model import has_error
if has_error(issues, "DUPLICATE_POINT_PROXIMITY"): print("Duplicate points detected")
```

## Report formats

### Text report

For terminals and CI logs.

```bash 
python -m topo_validator.cli path/to/model.json --format text
```

The text report includes:

- validation status,
- issue and error counts,
- grouped rule results,
- issue details.

### JSON report

For automation, pipelines, or downstream tooling.

```bash 
python -m topo_validator.cli path/to/model.json --format json
```

The JSON report includes:

- `valid`
- `issueCount`
- `errorCount`
- `ruleResults`
- raw `issues`

### HTML report

For review.

```bash 
python -m topo_validator.cli path/to/model.json
--format html
--output validation-report.html
```

The HTML report includes:

- summary cards,
- rule results grouped by rule category,
- issue details table,
- visual status indicators for pass/fail/warn.

## Rule summary

### Structure checks

Before topology validation runs, the validator checks:

- required collections exist,
- collections are lists,
- objects have string ids,
- ids are unique within collections,
- coordinates are numeric,
- curve vertices are string ids,
- ring members have valid references and orientations,
- solid faces, shells, volume, levels, and relationship ids are well-formed,
- observation curve exemptions are well-formed.

If structural errors exist, topology validation stops early.



### Point topology — `CC-01`

| Rule | Name | Checks |
|---|---|---|
| `TR-01` | UniquePoints | Points are not coincident within tolerance |
| `TR-11` | PointFabricConsistency | Curve vertices reference known points |

Common issue codes:

- `DUPLICATE_POINT_PROXIMITY`
- `UNKNOWN_POINT_REFERENCE`



### Curve topology — `CC-02`

| Rule | Name | Checks |
|---|---|---|
| `TR-02` | CurveNoSelfIntersection | Curves do not cross themselves |
| `TR-03` | NoDanglingCurves | Curves are referenced by surface rings unless exempt as observations |
| `TR-12` | MinimumCurveLength | Curves exceed the minimum length tolerance |
| `TR-13` | NoDuplicateCurves | Curves are not duplicate forward/reverse vertex sequences |
| `TR-14` | CurveIntersectionAtNodesOnly | Curves only intersect at shared point nodes |
| `TR-22` | CurveOrientation | Curves are not repeated within the same ring |

Common issue codes:

- `CURVE_SELF_INTERSECTION`
- `DANGLING_CURVE`
- `CURVE_BELOW_MINIMUM_LENGTH`
- `DUPLICATE_CURVE`
- `CURVE_INTERSECTION_NOT_AT_NODE`
- `CURVE_REPEATED_IN_RING`



### Surface topology — `CC-03`

| Rule | Name | Checks |
|---|---|---|
| `TR-04` | SurfaceClosedRing | Ring members connect end-to-start and close |
| `TR-05` | SharedSurfaceEdges | Shared curves use opposite orientations |
| `TR-15` | NoSurfaceSelfIntersection | Surface rings do not self-intersect |
| `TR-16` | NoDuplicateSurfaces | Surfaces do not reference identical curve sets |
| `TR-17` | SurfaceCurveConsistency | Surface ring members reference known curves |
| `TR-23` | ConnectedInterior | Rings do not revisit directed start vertices |

Common issue codes:

- `SURFACE_RING_NOT_CLOSED`
- `SHARED_EDGE_SAME_ORIENTATION`
- `SURFACE_SELF_INTERSECTION`
- `DUPLICATE_SURFACE`
- `UNKNOWN_CURVE_REFERENCE`
- `SURFACE_RING_REPEATED_VERTEX`



### Shell topology — `CC-04`

| Rule | Name | Checks |
|---|---|---|
| `TR-06` | ClosedSolid | Shell curves appear exactly twice |
| `TR-18` | NoDanglingFaces | Surfaces are referenced by at least one solid |

Common issue codes:

- `OPEN_SOLID_SHELL`
- `DANGLING_FACE`



### Solid topology — `CC-05`

| Rule | Name | Checks |
|---|---|---|
| `TR-07` | PositiveVolume | Declared solid volume is positive |
| `TR-19` | MinimumSolidThickness | Solid bounding box exceeds minimum thickness |
| `TR-24` | SolidNonSelfIntersection | Cross-face segments do not intersect |
| `TR-25` | ShellOrientation | Outer shells are outward; inner shells are inward |

Common issue codes:

- `ZERO_OR_NEGATIVE_VOLUME`
- `SOLID_BELOW_MINIMUM_THICKNESS`
- `SOLID_SELF_INTERSECTION`
- `SHELL_ORIENTATION_REVERSED`
- `INNER_SHELL_ORIENTATION_REVERSED`



### Solid relationship topology — `CC-06`

| Rule | Name | Checks |
|---|---|---|
| `TR-08` | NoSolidOverlap | Solids in the same theme do not overlap, with allowed exemptions |
| `TR-10` | SharedSolidFace | A face is referenced by no more than two solids |

Common issue codes:

- `SOLID_OVERLAP`
- `FACE_ADJACENCY_LIMIT_EXCEEDED`

`TR-08` exempts:

1. parent-child pairs,
2. solids on disjoint levels,
3. topologically adjacent solids that share boundary faces.



### Containment and host topology — `CC-07`

| Rule | Name | Checks |
|---|---|---|
| `TR-09` | ParentContainment | Child solids are contained in their parent |
| `TR-20` | EasementContainment | Secondary/easement solids are contained in their burdened parcel |
| `TR-21` | ThematicHostRelationship | Thematic solids reference a known host |

Common issue codes:

- `UNKNOWN_PARENT_REFERENCE`
- `CHILD_NOT_CONTAINED_IN_PARENT`
- `EASEMENT_MISSING_BURDENED`
- `UNKNOWN_BURDENED_REFERENCE`
- `EASEMENT_NOT_CONTAINED_IN_BURDENED`
- `THEMATIC_SOLID_MISSING_HOST`
- `UNKNOWN_HOST_REFERENCE`



## Best practices for effective validation

### 1. Validate structure first

The tool does this automatically. If you see structural issues, fix those before investigating topology issues. Invalid structure can hide or distort topology rule results.

### 2. Use HTML reports for manual review

HTML reports are easiest to scan because they group results by rule category and show pass/fail status visually.

### 3. Use JSON reports for automation

Use JSON output in CI or scripts so issue codes can be parsed reliably.

### 4. Pay attention to object ids

Most topology issues include `object_id`. Use this to locate the affected point, curve, surface, or solid in your source model.

### 5. Treat cascading errors carefully

A single missing point can cause multiple downstream issues, such as:

- unknown point references,
- zero-length curves,
- open shells,
- surface closure issues.

Fix the earliest/root issue first, then re-run validation.

### 6. Use observation curve exemptions intentionally

Curves used only as supporting survey observations can be exempt from dangling-curve validation when they are represented through `observedVectors` or `vectorObservations`.

### 7. Keep shared boundaries topological

Adjacent solids should share boundary topology rather than duplicate equivalent points, curves, and surfaces. Duplicate shared geometry can cause duplicate point, duplicate curve, duplicate surface, or overlap issues.

### 8. Check levels for multi-storey models

For stacked parcels or building-level solids, populate `levels` consistently. Solids with disjoint levels are exempt from some overlap checks.

### 9. Use `burdened_id` for secondary/easement containment

For secondary/easement parcels, prefer `burdened_id` to identify the burdened parcel. Legacy `servient_id` is also recognised by the containment check.

### 10. Validate after every transformation

Run the validator after generating, converting, simplifying, or deduplicating topology. Many topology errors are introduced during conversion rather than manual modelling.



## Running tests

The package includes fixtures and report examples under `topo_validator/tests`.

Run package tests from the repository root:

```bash 
pytest topo_validator/tests -v
```

Validate a specific fixture through the CLI:

```bash 
python -m topo_validator.cli
topo_validator/tests/tetrahedron.json
--format html
--output topo_validator/tests/reports/tetrahedron-validation-report.html
```

Example fixtures include:

- `tetrahedron.json` — expected to pass,
- `4-unit-up-down.json` — multi-solid example,
- `tr01-duplicate-point-fail.json` — duplicate point failure example,
- `tr11-point-missing-fail.json` — missing point reference failure example.

### pytest fixtures

`conftest.py` has two kinds of data sources: normal helper functions like `cube_data(...)`, and pytest fixtures like `unit_cube`.
The normal builder names are `cube_data`, `merge_datasets`, and `hollow_cube_data`; the named pytest fixtures are `unit_cube`, `two_adjacent_cubes`, `nested_cubes`, and `hollow_cube`. 
`pytest` can be used to validate the pytest named fixtures.

Run pytest as follows:

```bash
cd tools/topo-validator
python -m pytest
```

## Exit codes

The CLI returns:

| Exit code | Meaning                                                |
|----------:|--------------------------------------------------------|
|       `0` | Validation completed and no errors were found          |
|       `1` | Validation completed and one or more errors were found |
|       `2` | Input, file, JSON, or CLI processing failed            |

This makes the CLI suitable for CI pipelines.

Example:

```bash 
python -m topo_validator.cli model.json --format json --output report.json
```

In CI, a non-zero exit code should fail the job.

## Troubleshooting

### `Input error: Expected JSON object`

The input file is valid JSON but the top-level value is not an object. The validator expects a JSON object, not an array or scalar.

### Many rules fail at once

Look for structural errors or early reference errors first. For example, one missing point can cause multiple curve, surface, and shell issues.

### HTML report was written somewhere unexpected

If `--format html` is used without `--output`, the CLI writes to the package default reports directory. Pass `--output` explicitly to control the path.

### CSDM input produces empty topology collections

Check that the input uses the expected feature collection names:

- `points`
- `edges`
- `rings`
- `faces`
- `shells`
- `solids`

Also ensure features have string `id` values and topology references in the expected fields.

### Curves on different levels are reported as intersecting

The validator uses a 3D segment intersection test with a coplanarity guard. If an intersection is reported, check whether the coordinates are actually coplanar or whether level/elevation values were lost during conversion.

## Developer notes

The package is organised as follows:

```text 
topo_validator/ 
   conformance/ 
      cc01_points.py 
      cc02_curves.py 
      cc03_surfaces.py 
      cc04_shells.py 
      cc05_solids.py 
      cc06_relationships.py 
      cc07_containment.py 
   cli.py 
   geometry.py 
   loader.py 
   model.py 
   report.py 
   validator.py
```

Key modules:

| Module          | Purpose                                                     |
|-----------------|-------------------------------------------------------------|
| `cli.py`        | Command-line interface                                      |
| `loader.py`     | Loads JSON and converts CSDM JSON to internal topology data |
| `model.py`      | Typed data model, tolerances, issue helpers, indexes        |
| `geometry.py`   | Geometry helper functions                                   |
| `validator.py`  | Structure validation and orchestration                      |
| `report.py`     | Text, JSON, and HTML report generation                      |
| `conformance/*` | Rule implementations grouped by conformance class           |

To add a new conformance class:

1. Add a new module under `conformance/`.
2. Define `CONFORMANCE_CLASS_ID`, `CONFORMANCE_CLASS_NAME`, and `RULE_IDS`.
3. Implement `validate(data, tolerances) -> list[Issue]`.
4. Register the module in `conformance/__init__.py`.
5. Add report mapping entries in `report.py` if new issue codes should appear in rule summaries.
6. Add tests and fixtures.


## Limitations

The validator focuses on topological consistency and selected geometric checks for 3D CSDM encodings. 
It does not replace full cadastral legal review, schema validation, or domain-specific business-rule validation.

Known areas for future extension include:

- richer parcel type classification,
- 2D / 2.5D parcel fabric gap and overlap checks,
- additional shell duplicate checks,
- dataset-specific surface form constraints.

## Quick command reference

```bash
Text report to stdout
python -m topo_validator.cli model.json
JSON report to file
python -m topo_validator.cli model.json
--format json
--output validation-report.json
HTML report to file
python -m topo_validator.cli model.json
--format html
--output validation-report.html
Validate internal topology JSON directly
python -m topo_validator.cli internal-topology.json
--raw-internal
```