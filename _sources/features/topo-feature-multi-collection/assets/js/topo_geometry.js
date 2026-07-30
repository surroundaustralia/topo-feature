import * as THREE from 'three';
const earcut = globalThis.earcut.default;

// ─── Geometry and topology constants ──────────────────────────────────────────

const COORDINATE_DIMENSIONS = 3;
const NORMAL_X_AXIS_THRESHOLD = 0.9;
const POSITION_ATTRIBUTE = 'position';
const NORMAL_ATTRIBUTE = 'normal';
const REVERSED_ORIENTATION = '-';

// ─── Rendering style constants ────────────────────────────────────────────────

const EDGE_LINE_COLOR = 0xffffff;
const EDGE_LINE_WIDTH = 1;
const VERTEX_MARKER_SEGMENTS = 12;
const VERTEX_MARKER_COLOR = 0xffff00;
const VERTEX_KEY_PRECISION = 6;
const VERTEX_RADIUS_SCALE = 0.05;
const MESH_SHININESS = 30;
const MESH_OPACITY_SOLID = 1.0;
const POLYGON_OFFSET_FACTOR = 1;
const POLYGON_OFFSET_UNITS = 1;

const SOLID_COLORS = [
    0x3388ff, 0xff8833, 0x33ff88, 0xff3388, 0x8833ff,
    0x33ffff, 0xffff33, 0xff33ff, 0x88ff33, 0x3388aa
];

// ─── Topology data utilities ──────────────────────────────────────────────────

/**
 * Builds and returns a collection of maps representing different geometric and topological features.
 *
 * @param {Object} data - The input data containing arrays of geometric and topological features.
 * @param {Array} data.points - The array of point features with geometry or place data.
 * @param {Array} data.edges - The array of edge features with topology references.
 * @param {Array} data.rings - The array of ring features.
 * @param {Array} data.faces - The array of face features.
 * @param {Array} data.shells - The array of shell features.
 * @return {Object} An object containing the generated maps:
 *                  - `pointMap`: A map of points indexed by ID.
 *                  - `edgeMap`: A map of edges indexed by ID.
 *                  - `ringMap`: A map of rings indexed by ID.
 *                  - `faceMap`: A map of faces indexed by ID.
 *                  - `shellMap`: A map of shells indexed by ID.
 */
export function buildMaps(data) {
    const pointMap = _mapFeaturesById(data.points, pointFeature =>
        (pointFeature.place || pointFeature.geometry).coordinates.slice()
    );

    _centerCoordinatesAroundOrigin(Object.values(pointMap));

    const edgeMap = _mapFeaturesById(data.edges, edgeFeature =>
        edgeFeature.topology.references
    );
    const ringMap = _mapFeaturesById(data.rings);
    const faceMap = _mapFeaturesById(data.faces);
    const shellMap = _mapFeaturesById(data.shells);

    return {pointMap, edgeMap, ringMap, faceMap, shellMap};
}

/**
 * Maps features from an array of feature collections by their unique IDs.
 *
 * @param {Array} featureCollections - An array of feature collections, where each collection contains a `features` array.
 * @param {Function} [getValue=feature => feature] - A function to extract or transform the value to be mapped by feature ID. Defaults to returning the feature itself.
 * @return {Object} An object where each key is a feature ID and the value is determined by the `getValue` function.
 */
function _mapFeaturesById(featureCollections = [], getValue = feature => feature) {
    const featureMap = {};

    featureCollections.forEach(featureCollection => {
        featureCollection.features.forEach(feature => {
            featureMap[feature.id] = getValue(feature);
        });
    });

    return featureMap;
}

/**
 * Adjusts a set of coordinates so that their centroid is moved to the origin (0, 0).
 *
 * @param {number[][]} coordinates - A 2D array of coordinates, where each inner array represents a coordinate in n-dimensional space.
 * @return {void} Does not return a value. The input array is modified in place.
 */
function _centerCoordinatesAroundOrigin(coordinates) {
    if (coordinates.length === 0) {
        return;
    }

    const centroid = _calculateCentroid(coordinates);

    coordinates.forEach(coordinate => {
        coordinate.forEach((value, dimensionIndex) => {
            coordinate[dimensionIndex] = value - centroid[dimensionIndex];
        });
    });
}

/**
 * Calculates the centroid of a set of coordinates in an n-dimensional space.
 *
 * @param {number[][]} coordinates An array of points where each point is an array of numbers representing its position in n-dimensional space.
 * @return {number[]} An array representing the coordinates of the centroid in n-dimensional space.
 */
function _calculateCentroid(coordinates) {
    const totals = coordinates.reduce(
        (sumByDimension, coordinate) => {
            coordinate.forEach((value, dimensionIndex) => {
                sumByDimension[dimensionIndex] += value;
            });

            return sumByDimension;
        },
        Array(COORDINATE_DIMENSIONS).fill(0)
    );

    return totals.map(total => total / coordinates.length);
}

/**
 * Extracts and combines all features from an array of feature collections.
 *
 * @param {Array<Object>} featureCollections - An array of feature collection objects.
 * Each object is expected to have a `features` property containing an array of features.
 * @return {Array<Object>} An array of features extracted from the provided feature collections.
 */
export function getFeatures(featureCollections = []) {
    return featureCollections.flatMap(featureCollection => featureCollection.features);
}

/**
 * Computes the counts of different topology features from the given data object.
 *
 * @param {Object} data - The input data object containing topology features.
 * @param {Array} data.points - An array representing the points in the topology.
 * @param {Array} data.edges - An array representing the edges in the topology.
 * @param {Array} data.faces - An array representing the faces in the topology.
 * @param {Array} data.shells - An array representing the shells in the topology.
 * @return {Object} An object containing the counts of various topology features.
 */
export function getTopologyFeatureCounts(data) {
    return {
        points: _countFeatures(data.points),
        edges: _countFeatures(data.edges),
        faces: _countFeatures(data.faces),
        shells: _countFeatures(data.shells),
    };
}

function _countFeatures(featureCollections = []) {
    return featureCollections.reduce(
        (total, featureCollection) => total + featureCollection.features.length,
        0
    );
}

/**
 * Returns true when the dataset contains any geometry that requires transparency
 * to remain visible: a face with an inner ring (hole) or a solid with more than
 * one shell (void/protrusion topology).
 *
 * @param {Object} data - The topology dataset (faces, solids arrays).
 * @return {boolean}
 */
export function needsTransparency(data) {
    const faceHasHole = getFeatures(data.faces || [])
        .some(face => face.topology.directed_references.length > 1);

    const solidHasVoid = getFeatures(data.solids || [])
        .some(solid => solid.topology.directed_references.length > 1);

    return faceHasHole || solidHasVoid;
}

// ─── Coordinate geometry ──────────────────────────────────────────────────────

/**
 * Converts a ring feature into an ordered array of [x,y,z] coordinates by resolving references
 * based on the provided edge and point maps.
 *
 * For orientation "+": add the edge's start point.
 * For orientation "-": add the edge's end point (traversed in reverse).
 *
 * @param {Object} ringFeature - The ring feature containing topology and references.
 * @param {Object} edgeMap - A map where keys are edge references and values are arrays of IDs representing edge endpoints.
 * @param {Object} pointMap - A map where keys are point IDs and values are coordinate arrays or objects.
 * @return {Array} An array of coordinates resolved from the ring feature's directed references.
 */
function _ringToCoords(ringFeature, edgeMap, pointMap) {
    return ringFeature.topology.directed_references.map(member => {
        const [startId, endId] = edgeMap[member.ref];
        const pointId = member.orientation === '+' ? startId : endId;
        return pointMap[pointId];
    });
}

/**
 * Creates an orthonormal basis for a plane defined by its normal vector.
 * The method computes two perpendicular vectors (axisU and axisV) that
 * lie on the plane whose normal is specified, forming a local coordinate
 * system for the plane.
 *
 * @param {number[]} normal - The normal vector of the plane as an array of three numbers [x, y, z].
 * @return {Object} An object containing two perpendicular normalised vectors:
 *                  `axisU` - A normalised vector perpendicular to the plane normal.
 *                  `axisV` - A normalised vector perpendicular to both the plane normal and `axisU`.
 */
function _createPlaneBasis(normal) {
    const planeNormal = new THREE.Vector3(...normal).normalize();

    // Choose a stable reference axis that is not almost parallel to the plane normal.
    const referenceAxis = Math.abs(planeNormal.x) < NORMAL_X_AXIS_THRESHOLD
        ? new THREE.Vector3(1, 0, 0)
        : new THREE.Vector3(0, 1, 0);

    const axisU = new THREE.Vector3().crossVectors(referenceAxis, planeNormal).normalize();
    const axisV = new THREE.Vector3().crossVectors(planeNormal, axisU);

    return {axisU, axisV};
}

/**
 * Triangulates a 3D planar polygon (convex or concave) with optional holes using earcut.
 *
 * All rings (outer boundary and holes) are projected onto the same 2D plane using the
 * outer ring's first vertex as the shared origin, then passed to earcut with hole start
 * indices so that the hole regions are excluded from the triangulation.
 *
 * @param {Array<Array<number>>} outerCoords - Ordered 3D vertices of the outer boundary.
 * @param {Array<Array<Array<number>>>} holeCoordsList - Zero or more arrays of 3D vertices,
 *   each describing one hole boundary.
 * @param {Array<number>} normal - A 3D normal vector [nx, ny, nz] for the polygon's plane.
 * @return {Object} An object containing:
 *                  - `positions`: Flat array of 3D vertex positions for the output triangles.
 *                  - `normals`: Flat array of normals, one per triangle vertex.
 */
function _triangulatePolygon(outerCoords, holeCoordsList, normal) {
    const positions = [];
    const normals = [];
    if (outerCoords.length < 3) return { positions, normals };

    const {axisU, axisV} = _createPlaneBasis(normal);
    const origin = new THREE.Vector3(...outerCoords[0]);

    const projectPoint = coord => {
        const rel = new THREE.Vector3(...coord).sub(origin);
        return [rel.dot(axisU), rel.dot(axisV)];
    };

    // Build flat 2D vertex array and record where each hole starts.
    const allCoords3D = [...outerCoords];
    const flat2D = outerCoords.flatMap(projectPoint);
    const holeIndices = [];

    for (const holeCoords of holeCoordsList) {
        if (holeCoords.length < 3) continue;
        holeIndices.push(allCoords3D.length);
        allCoords3D.push(...holeCoords);
        flat2D.push(...holeCoords.flatMap(projectPoint));
    }

    const indices = earcut(flat2D, holeIndices.length ? holeIndices : null);

    for (let i = 0; i < indices.length; i += 3) {
        positions.push(
            ...allCoords3D[indices[i]],
            ...allCoords3D[indices[i + 1]],
            ...allCoords3D[indices[i + 2]]
        );
        normals.push(...normal, ...normal, ...normal);
    }
    return {positions, normals};
}

// ─── Edge geometry ────────────────────────────────────────────────────────────

/**
 * Collects unique solid edge IDs from the provided solid structure and its associated maps.
 *
 * @param {Object} solid - The solid object containing the topology and references.
 * @param {Object} shellMap - A mapping of shell references to shell objects.
 * @param {Object} faceMap - A mapping of face references to face objects.
 * @param {Object} ringMap - A mapping of ring references to ring objects.
 * @return {Set<string>} A set of unique edge IDs extracted from the solid hierarchy.
 */
function _collectUniqueSolidEdgeIds(solid, shellMap, faceMap, ringMap) {
    const edgeIds = new Set();

    solid.topology.directed_references.forEach(shellRef => {
        const shell = shellMap[shellRef.ref];
        if (!shell) return;

        shell.topology.directed_references.forEach(faceRef => {
            const face = faceMap[faceRef.ref];
            if (!face) return;

            face.topology.directed_references.forEach(ringRef => {
                const ring = ringMap[ringRef.ref];
                if (!ring) return;

                ring.topology.directed_references.forEach(edgeRef => {
                    edgeIds.add(edgeRef.ref);
                });
            });
        });
    });

    return edgeIds;
}

/**
 * Constructs and returns a THREE.LineSegments object representing the solid's edge lines.
 * The edges are determined based on the provided solid and mapping structures.
 *
 * @param {Object} solid - The solid structure containing information about the geometry.
 * @param {Object} shellMap - A map describing the relationship between solid shells.
 * @param {Object} faceMap - A map describing the relationship between faces and shells.
 * @param {Object} ringMap - A map relating face rings to edges.
 * @param {Object} edgeMap - A map connecting edge IDs to point IDs.
 * @param {Object} pointMap - A map containing point information indexed by point IDs.
 * @return {THREE.LineSegments} A THREE.LineSegments object representing the edges of the solid.
 */
export function buildSolidEdgeLines(solid, shellMap, faceMap, ringMap, edgeMap, pointMap) {
    const positions = [];
    const edgeIds = _collectUniqueSolidEdgeIds(solid, shellMap, faceMap, ringMap);

    edgeIds.forEach(edgeId => {
        const edgePointIds = edgeMap[edgeId];
        if (!edgePointIds) return;

        const [startPointId, endPointId] = edgePointIds;
        const startPoint = pointMap[startPointId];
        const endPoint = pointMap[endPointId];

        if (!startPoint || !endPoint) return;

        positions.push(...startPoint, ...endPoint);
    });

    const geometry = new THREE.BufferGeometry();
    const positionAttribute = new THREE.BufferAttribute(new Float32Array(positions), COORDINATE_DIMENSIONS);
    geometry.setAttribute(POSITION_ATTRIBUTE, positionAttribute);

    const material = new THREE.LineBasicMaterial({
        color: EDGE_LINE_COLOR,
        linewidth: EDGE_LINE_WIDTH,
    });

    return new THREE.LineSegments(geometry, material);
}

// ─── Solid geometry ───────────────────────────────────────────────────────────

/**
 * Computes the oriented normal of a face based on its reference orientation.
 *
 * @param {Object} face - The face object containing its properties including the normal vector.
 * @param {Object} faceRef - Reference object containing orientation information for the face.
 * @return {number[]} The oriented normal vector, possibly inverted depending on the face reference orientation.
 */
function _getOrientedNormal(face, faceRef) {
    const rawNormal = face.properties.normal;

    return faceRef.orientation === REVERSED_ORIENTATION
        ? [-rawNormal[0], -rawNormal[1], -rawNormal[2]]
        : rawNormal;
}

/**
 * Triangulates a given face based on its reference, topology, and geometric data.
 *
 * @param {Object} faceRef - The reference object for the face, containing metadata and identifiers.
 * @param {Object} faceMap - A mapping of all faces, where keys are face references, and values are face objects.
 * @param {Object} ringMap - A mapping of rings, where keys are ring references, and values are ring objects.
 * @param {Object} edgeMap - A mapping of edges, where keys are edge references, and values are edge objects.
 * @param {Object} pointMap - A mapping of points, where keys are point references, and values are point objects.
 * @return {Array|null} An array of triangles representing the triangulated face, or null if triangulation is not possible.
 */
function _triangulateFaceReference(faceRef, faceMap, ringMap, edgeMap, pointMap) {
    const face = faceMap[faceRef.ref];
    if (!face) return null;

    const normal = _getOrientedNormal(face, faceRef);
    const ringRefs = face.topology.directed_references;

    const outerRing = ringMap[ringRefs[0]?.ref];
    if (!outerRing) return null;

    const outerCoords = _ringToCoords(outerRing, edgeMap, pointMap);
    if (outerCoords.length < 3) return null;

    // Collect inner rings (holes) — all directed_references after the first.
    const holeCoordsList = ringRefs.slice(1)
        .map(ringRef => ringMap[ringRef.ref])
        .filter(ring => ring != null)
        .map(ring => _ringToCoords(ring, edgeMap, pointMap))
        .filter(coords => coords.length >= 3);

    return _triangulatePolygon(outerCoords, holeCoordsList, normal);
}

/**
 * Creates a BufferGeometry instance with provided vertex positions and normals.
 *
 * @param {Array<number>} vertexPositions - An array of numbers representing the vertex positions.
 * @param {Array<number>} vertexNormals - An array of numbers representing the vertex normals.
 * @return {THREE.BufferGeometry} The constructed BufferGeometry object with attributes and computed bounding data.
 */
function _createBufferGeometry(vertexPositions, vertexNormals) {
    const geometry = new THREE.BufferGeometry();

    geometry.setAttribute(
        POSITION_ATTRIBUTE,
        new THREE.BufferAttribute(new Float32Array(vertexPositions), COORDINATE_DIMENSIONS)
    );
    geometry.setAttribute(
        NORMAL_ATTRIBUTE,
        new THREE.BufferAttribute(new Float32Array(vertexNormals), COORDINATE_DIMENSIONS)
    );

    geometry.computeBoundingBox();
    geometry.computeBoundingSphere();

    return geometry;
}

/**
 * Builds a solid geometry representation by processing the topology and mapping data from the provided solid object.
 *
 * @param {Object} solid - The solid object containing topology information for constructing the geometry.
 * @param {Object} shellMap - A mapping of shell references to their respective shell objects.
 * @param {Object} faceMap - A mapping of face references to their respective face objects.
 * @param {Object} ringMap - A mapping of ring references to their respective ring objects.
 * @param {Object} edgeMap - A mapping of edge references to their respective edge objects.
 * @param {Object} pointMap - A mapping of point references to their respective point objects.
 * @return {Object} Contains the generated geometry as a buffer and the count of faces processed.
 */
export function buildSolidGeometry(solid, shellMap, faceMap, ringMap, edgeMap, pointMap) {
    const vertexPositions = [];
    const vertexNormals = [];
    let faceCount = 0;

    for (const shellRef of solid.topology.directed_references) {
        const shell = shellMap[shellRef.ref];
        if (!shell) continue;

        for (const faceRef of shell.topology.directed_references) {
            const triangulatedFace = _triangulateFaceReference(faceRef, faceMap, ringMap, edgeMap, pointMap);
            if (!triangulatedFace) continue;

            vertexPositions.push(...triangulatedFace.positions);
            vertexNormals.push(...triangulatedFace.normals);
            faceCount++;
        }
    }

    const geometry = _createBufferGeometry(vertexPositions, vertexNormals);

    return {geometry, faceCount};
}

// ─── Solid mesh ───────────────────────────────────────────────────────────────

/**
 * Creates a solid mesh using the provided solid data, index, and geometry.
 *
 * @param {Object} solid - The solid object containing properties and identifiers.
 * @param {number} index - The index number used to determine the material's color.
 * @param {THREE.Geometry | THREE.BufferGeometry} geometry - The geometry to be used for the mesh.
 * @return {THREE.Mesh} The created 3D mesh object with associated material and user data.
 */
export function createSolidMesh(solid, index, geometry, opacity = MESH_OPACITY_SOLID) {
    const material = new THREE.MeshPhongMaterial({
        color: SOLID_COLORS[index % SOLID_COLORS.length],
        side: THREE.DoubleSide,
        flatShading: false,
        shininess: MESH_SHININESS,
        transparent: opacity < 1.0,
        opacity,
        polygonOffset: true,
        polygonOffsetFactor: POLYGON_OFFSET_FACTOR,
        polygonOffsetUnits: POLYGON_OFFSET_UNITS,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.userData.solidName = solid.properties?.name || solid.id;

    return mesh;
}

// ─── Vertex markers ───────────────────────────────────────────────────────────

/**
 * Creates a group of vertex markers for the given geometry. Each marker represents a unique vertex
 * in the geometry using a spherical mesh at the vertex position.
 *
 * @param {THREE.BufferGeometry} geometry - The geometry from which to create vertex markers. The geometry must have a position attribute defining vertex positions.
 * @return {THREE.Group} A group containing the spherical vertex marker meshes. Each mesh corresponds to a unique vertex in the geometry.
 */
export function createVertexMarkers(geometry) {
    const vertexRadius = geometry.boundingSphere.radius * VERTEX_RADIUS_SCALE;
    const markerGeometry = new THREE.SphereGeometry(
        vertexRadius,
        VERTEX_MARKER_SEGMENTS,
        VERTEX_MARKER_SEGMENTS
    );
    const markerMaterial = new THREE.MeshBasicMaterial({color: VERTEX_MARKER_COLOR});
    const vertexMarkers = new THREE.Group();
    const positionAttribute = geometry.getAttribute(POSITION_ATTRIBUTE);
    const seenVertexKeys = new Set();

    for (let index = 0; index < positionAttribute.count; index++) {
        if (!_isUniqueVertex(positionAttribute, index, seenVertexKeys)) {
            continue;
        }

        vertexMarkers.add(_createVertexMarker(markerGeometry, markerMaterial, positionAttribute, index));
    }

    return vertexMarkers;
}

function _createVertexMarker(markerGeometry, markerMaterial, positionAttribute, index) {
    const marker = new THREE.Mesh(markerGeometry, markerMaterial);

    marker.position.set(
        positionAttribute.getX(index),
        positionAttribute.getY(index),
        positionAttribute.getZ(index)
    );

    return marker;
}

function _isUniqueVertex(positionAttribute, index, seenVertexKeys) {
    const vertexKey = _getVertexKey(positionAttribute, index);

    if (seenVertexKeys.has(vertexKey)) {
        return false;
    }

    seenVertexKeys.add(vertexKey);
    return true;
}

function _getVertexKey(positionAttribute, index) {
    return [
        positionAttribute.getX(index).toFixed(VERTEX_KEY_PRECISION),
        positionAttribute.getY(index).toFixed(VERTEX_KEY_PRECISION),
        positionAttribute.getZ(index).toFixed(VERTEX_KEY_PRECISION),
    ].join(',');
}
