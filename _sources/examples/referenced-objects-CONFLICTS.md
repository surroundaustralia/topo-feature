# Referenced-object ID conflicts

This file documents ID collisions found while building
[`referenced-objects.ttl`](referenced-objects.ttl), the shared lookup graph used by the
`topo2geojson` transform (and SHACL `shacl-closure` resolution) to resolve the point/edge/
ring/face IDs that example features reference but don't define inline.

The audit walked every generated example TTL under `build-local/tests/geo/topo/` (excluding
`*-fail` negative-test fixtures and the unrelated CityJSON alignment outputs) plus the existing
curated files (`topo-feature/examples/points.ttl`, `points2.ttl`, `lines.ttl`), and followed every
`topo:relatedFeatures` / `geojson:relatedFeatures` / `topo:directedReferences` chain to its
target. IDs listed below are **excluded** from `referenced-objects.ttl` because they resolve to
genuinely different data depending on which example is asking — merging them would have made the
lookup file self-contradictory (the exact problem it exists to avoid). Everything else that was
dangling but resolved consistently (114 objects) was merged.

## Conflicting IDs (same ID, different type or geometry)

These look like a shared JSON template's placeholder UUIDs that got reused across independent
examples without being made unique — each occurrence defines a *different* topology structure
under the same ID.

| ID | Defined differently in | Notes |
|---|---|---|
| `uuid:4ac3b91b-eeb7-428c-b5e9-7e8a3f0998ae` | topo-face (`4-edge-face`, `6-edge-face`), topo-feature (`face-feature`), topo-shell (`shell-with-context`), topo-solid (`solid-with-context`) | Defined as a Face with completely different Ring/Edge references in each. |
| `uuid:c60507ba-226b-4e49-a702-e9afef899b23` | topo-face (`4-edge-face`, `6-edge-face`), topo-feature (`edge-feature`), topo-feature-multi-collection (`edges`, `faces`, `solids`) | Defined as an Edge in topo-feature/multi-collection (consistent there), but expected to be a Ring by topo-face's examples. |
| `uuid:2c21efab-db80-4dd0-96c0-59a63f956d5b` | topo-face (`face`/"face-with-context"), topo-feature-multi-collection (`cube`) | Different Ring structure in each. |
| `uuid:4a294022-4864-49c7-8cee-f9e43360bc4e` | topo-shell (`shell-with-context`) vs topo-solid (`solid-with-context`) | Different Face structure. |
| `uuid:01947f47-ee13-44a9-85a4-2bcb4881982a` | topo-shell (`shell-with-context`) vs topo-solid (`solid-with-context`) | Different Face structure. |
| `uuid:607a3363-3eb7-4ce6-a633-86d2e565692b` | topo-shell (`shell-with-context`) vs topo-solid (`solid-with-context`) | Different Face structure. |
| `uuid:3c1f5c4b-d842-40b6-a332-99d50015fa8f` | topo-shell (`shell-with-context`) vs topo-solid (`solid-with-context`) | Different Face structure. |
| `uuid:fe522919-1421-4fd1-9930-8c6551e3f2a5` | topo-shell (`shell-with-context`) vs topo-solid (`solid-with-context`) | Different Face structure. |
| `uuid:2387ae98-9236-42fe-9414-c45b99954c41` | topo-shell (`shell-with-context`) vs topo-solid (`solid-with-context`) | Different Face structure. |
| `uuid:4ba85faa-3935-4e89-a9f8-dcd647a5dbed` | topo-shell (`shell-with-context`) vs topo-solid (`solid-with-context`) | Different Face structure. |

Also worth a look, though not a hard conflict (kept resolved via the curated source rather than
excluded): `uuid:ad6d8fcc-402c-482e-8f1a-7492ccaead38` and `uuid:8d2be28b-8f31-46de-99cb-4d8709502cd0`
are `xsd:integer`-typed coordinates in the curated `points2.ttl` but `xsd:double`-typed (same
numeric value) in the `topo-feature-multi-collection` examples — harmless today, but worth
normalizing on one literal type. Likewise `LineP1P2`/`LineP2P3`/`LineP3P1` are typed
`geojson:LineString` in the older curated `lines.ttl` but `topo:Edge` everywhere else — `lines.ttl`
looks like it predates that vocabulary change.

## Unresolved dangling references (no definition anywhere in the corpus)

These IDs are referenced by an example but never defined by any example in the register — most
look like single-character UUID typos of a nearby valid ID.

| ID | Referenced from | Likely cause |
|---|---|---|
| `uuid:23141631-470f-4c4b-981d-23ccb35d6a51` | topo-face (`6-edge-face`) | Typo — close to `uuid:23641631-470f-4c4b-981d-23ccb35d6a51`, which *is* defined. |
| `uuid:23641631-470f-4d4b-981d-23ccb35d6a51` | topo-face (`6-edge-face`) | Typo — `4d4b` vs the defined `4c4b` variant. |
| `uuid:4ac3b91b-eeb7-428c-b5e9-7e8a2f0998ae` | topo-shell/topo-solid (`datatypes/topology` shell example) | Typo — `7e8a2f` vs `7e8a3f`. |
| `uuid:4ac3b91b-eeb7-428c-b7e9-7e8a3f0998ae` | topo-shell/topo-solid (`datatypes/topology` shell example) | Typo — `b7e9` vs `b5e9`. |
| `uuid:4ac4b91b-eeb7-428c-b5e9-7e8a3f0998ae` | topo-shell/topo-solid (`datatypes/topology` shell example) | Typo — `4ac4b91b` vs `4ac3b91b`. |
| `uuid:0669e377-8200-4405-8e0a-151451189d9d` | topo-feature-multi-collection (`solids`) | No matching definition found. |
| `uuid:26bd463c-0433-4510-8ba8-074f5cdd1e64` | topo-feature-multi-collection (`four-unit`) | No matching definition found. |
| `uuid:31dcf84a-98c6-48b1-8ba6-14d7a5ff6749` | topo-feature-multi-collection (`four-unit`) | No matching definition found. |
| `uuid:3e5f9429-9bfb-498b-9624-e667f2e7b281` | topo-feature-multi-collection (`four-unit`) | No matching definition found. |
| `uuid:9d4e9985-3788-4e70-a2ec-a809aba7c7e8` | topo-feature-multi-collection (`four-unit`) | No matching definition found. |
| `uuid:f44d98c1-fc4e-45da-a233-6e63e58bd560` | topo-feature-multi-collection (`four-unit`) | No matching definition found. |

## Recommendation

None of the above IDs were edited as part of generating `referenced-objects.ttl` — fixing them
means assigning fresh unique IDs (or correcting typos) in the affected example JSON files across
`topo-face`, `topo-feature`, `topo-feature-multi-collection`, `topo-shell`, and `topo-solid`, which
is a separate change best made deliberately rather than as a side effect of building a lookup file.
