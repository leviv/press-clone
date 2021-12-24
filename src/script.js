import "./style.scss";
import * as THREE from "three";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as lil from "lil-gui";

/**
 * Debug
 */
const gui = new lil.GUI();

// Canvas
const canvas = document.querySelector(".webgl");
const scene = new THREE.Scene();

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 0.5);
pointLight.position.x = 10;
pointLight.position.y = 3;
pointLight.position.z = 100;
scene.add(pointLight);

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const diffuseTexture = textureLoader.load("/textures/WIMFC_diffuse.png");
const bumpTexture = textureLoader.load("/textures/WIMFC_bump.jpg");
const metalnessTexture = textureLoader.load("/textures/WIMFC_foil.png");

const sharedDiffuseTexture = textureLoader.load(
  "/textures/shared_diffuse_overlay.jpeg"
);
const sharedBumpTexture = textureLoader.load(
  "/textures/shared_bump_buckram.jpeg"
);

// diffuseTexture.flipY = false;
// metalnessTexture.flipY = false;

/**
 * Materials
 */
const material = new THREE.MeshPhongMaterial({
  map: diffuseTexture,
});
material.metalness = 0.5;
material.roughness = 0.5;
material.metalnessMap = metalnessTexture;
material.bumpMap = bumpTexture;
gui.add(material, "metalness").min(0).max(1).step(0.0001);
gui.add(material, "roughness").min(0).max(1).step(0.0001);

const material121 = {
  shininess: 8,
  thickness: 2.85,
  diffuseMapCustom: "WIMFC_diffuse",
  diffuseBaseColor: [0.471, 0.467, 0.467],
  bumpMapBase: "shared_bump_buckram",
  bumpScaleBase: 0.04,
  bumpMapCustom: "WIMFC_bump",
  bumpScaleCustom: 0.1,
  foilMap: "WIMFC_foil",
  foilDetail: 1,
  foilSpecular: 0.3,
  foilOpacity: 0.85,
  reflectiveness: 0.1,
};

const shaderMaterial = new THREE.ShaderMaterial({
  vertexShader: `
  varying vec2 vUv;
  varying vec3 vViewPosition;
  varying vec3 vNormal;

  uniform float thickness;

  // Thickness of the base mesh in centimeters
  const float modelThickness = 3.374;

  void main() {
    vUv = vec2(uv.x, 1.0 - uv.y);

    // Normals

    vec3 objectNormal = vec3( normal );
    vec3 transformedNormal = normalMatrix * objectNormal;
    vNormal = normalize( transformedNormal );

    // Book thickness

    vec3 transformed = vec3( position );
    float thicknessDelta = (thickness - modelThickness) / 2.0;

    if (transformed.x > 1.0) transformed.x += thicknessDelta;
    else if (transformed.x < -1.0) transformed.x -= thicknessDelta;

    // Projection

    vec4 mvPosition = vec4( transformed, 1.0 );
    mvPosition = modelViewMatrix * mvPosition;

    gl_Position = projectionMatrix * mvPosition;

    vViewPosition = - mvPosition.xyz;
  }
  `,
  fragmentShader: `
  #define PHONG

  varying vec2 vUv;

  uniform vec3 specular;
  uniform float shininess;
  uniform float reflectiveness;

  uniform sampler2D diffuseMapBase;
  uniform sampler2D diffuseMapCustom;
  uniform vec3 diffuseBaseColor;

  uniform sampler2D bumpMapBase;
  uniform sampler2D bumpMapCustom;
  uniform float bumpScaleBase;
  uniform float bumpScaleCustom;

  uniform sampler2D foilMap;
  uniform float foilDetail;
  uniform float foilOpacity;
  uniform float foilSpecular;
  uniform float foilEmissive;
  const vec2 foilUvSize = vec2(0.14, -0.19);

  #include <common>
  #include <bsdfs>
  #include <lights_pars_begin>
  #include <lights_phong_pars_fragment>

  //
  // Utils
  //

  float blendOverlay(float base, float blend) {
    return base < 0.5
      ? 2.0 * base * blend
      : 1.0 - 2.0 * (1.0 - base) * (1.0 - blend);
  }

  float blendOverlay(float base, float blend, float opacity) {
    return blendOverlay(base, blend) * opacity + base * (1.0 - opacity);
  }

  vec4 blendOverlay(vec4 base, vec4 blend) {
    return vec4(
      blendOverlay(base.r, blend.r),
      blendOverlay(base.g, blend.g),
      blendOverlay(base.b, blend.b),
      (base.a + blend.a) / 2.0
    );
  }

  vec4 blendOverlay(vec4 base, vec4 blend, float opacity) {
    return vec4(
      blendOverlay(base.r, blend.r, opacity),
      blendOverlay(base.g, blend.g, opacity),
      blendOverlay(base.b, blend.b, opacity),
      (base.a + blend.a) / 2.0
    );
  }

  //
  // Bump map functions
  //

  vec2 dHdxy_fwd() {

    vec2 dSTdx = dFdx( vUv );
    vec2 dSTdy = dFdy( vUv );

    float inverseFoilCoverage = 1.0 - texture2D( foilMap, vUv ).r * foilOpacity;

    float scaleMax = max(bumpScaleBase, bumpScaleCustom);
    float scaleBaseNorm = bumpScaleBase / scaleMax;
    float scaleCustomNorm = bumpScaleCustom / scaleMax;

    float Hll = scaleMax * blendOverlay(
      0.5 + (texture2D( bumpMapBase,   vUv ).x - 0.5) * scaleBaseNorm * inverseFoilCoverage,
      0.5 + (texture2D( bumpMapCustom, vUv ).x - 0.5) * scaleCustomNorm
    );
    float dBx = scaleMax * blendOverlay(
      0.5 + (texture2D( bumpMapBase,   vUv + dSTdx ).x - 0.5) * scaleBaseNorm * inverseFoilCoverage,
      0.5 + (texture2D( bumpMapCustom, vUv + dSTdx ).x - 0.5) * scaleCustomNorm
    ) - Hll;
    float dBy = scaleMax * blendOverlay(
      0.5 + (texture2D( bumpMapBase,   vUv + dSTdy ).x - 0.5) * scaleBaseNorm * inverseFoilCoverage,
      0.5 + (texture2D( bumpMapCustom, vUv + dSTdy ).x - 0.5) * scaleCustomNorm
    ) - Hll;

    return vec2( dBx, dBy );

  }

  vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {

    // Workaround for Adreno 3XX dFd*( vec3 ) bug. See #9988

    vec3 vSigmaX = vec3( dFdx( surf_pos.x ), dFdx( surf_pos.y ), dFdx( surf_pos.z ) );
    vec3 vSigmaY = vec3( dFdy( surf_pos.x ), dFdy( surf_pos.y ), dFdy( surf_pos.z ) );
    vec3 vN = surf_norm;		// normalized

    vec3 R1 = cross( vSigmaY, vN );
    vec3 R2 = cross( vN, vSigmaX );

    float fDet = dot( vSigmaX, R1 ) * faceDirection;

    vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
    return normalize( abs( fDet ) * surf_norm - vGrad );

  }

  //
  // Main
  //

  void main() {

    vec3 normal = perturbNormalArb( -vViewPosition, vNormal, dHdxy_fwd(), 1.0 );

    // Combine diffuse textures

    vec4 diffuseColor = blendOverlay(
      texture2D( diffuseMapBase, vUv ),
      texture2D( diffuseMapCustom, vUv )
    );

    if (diffuseColor.rgb == vec3(0.0, 0.0, 0.0)) {
      diffuseColor = vec4(diffuseBaseColor, 1.0);
    }

    // Foil

    vec2 foilIndex = vec2(
      sin(-normal.y * foilDetail  +  vViewPosition.y * foilDetail / 10.0),
      cos(-normal.x * foilDetail  +  vViewPosition.x * foilDetail / 10.0)
    ) / 2.0;
    foilIndex = vec2(0.0, 1.0) + foilUvSize / 2.0 + foilIndex * foilUvSize;

    vec4 foilColor = texture2D( diffuseMapCustom, foilIndex );
    float foilCoverage = texture2D( foilMap, vUv ).r;

    if (foilColor.rgb == vec3(0.0, 0.0, 0.0)) {
      foilColor = vec4(diffuseBaseColor, 1.0);
      foilCoverage = foilColor.r;
    }

    diffuseColor = mix(diffuseColor, foilColor, foilCoverage * foilOpacity);

    // Lighting

    float specularStrength = reflectiveness + foilCoverage * foilSpecular;

    ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );

    #include <lights_phong_fragment>
    #include <lights_fragment_begin>
    #include <lights_fragment_maps>
    #include <lights_fragment_end>

    vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse
                        + reflectedLight.directSpecular + reflectedLight.indirectSpecular;

    outgoingLight = mix(outgoingLight, foilColor.rgb, foilCoverage * foilEmissive * foilOpacity);

    gl_FragColor = vec4( outgoingLight, diffuseColor.a );

  }
  `,
  uniforms: {
    specular: {
      value: new THREE.Color().setHex(16777215),
    },
    shininess: {
      value: 8,
    },
    glossiness: {
      value: 1,
    },
    specularMap: {
      value: null,
    },
    glossinessMap: {
      value: null,
    },
    reflectiveness: {
      value: 0.1,
    },
    thickness: {
      value: 2.85,
    },
    diffuseMapBase: {
      type: "t",
      value: sharedDiffuseTexture,
    },
    diffuseBaseColor: {
      type: "vec3",
      value: [0.471, 0.467, 0.467],
    },
    diffuseMapCustom: {
      type: "t",
      value: diffuseTexture,
    },
    bumpMapBase: {
      type: "t",
      value: sharedBumpTexture,
    },
    bumpMapCustom: {
      type: "t",
      value: bumpTexture,
    },
    bumpScaleBase: {
      value: 0.04,
    },
    bumpScaleCustom: {
      value: 0.1,
    },
    foilMap: {
      type: "t",
      value: metalnessTexture,
    },
    foilDetail: {
      value: 1,
    },
    foilEmissive: {
      value: 0,
    },
    foilOpacity: {
      value: 0.85,
    },
    foilSpecular: {
      value: 0.3,
    },
    ...THREE.UniformsLib.lights,
  },
  lights: !0,
  defines: {
    USE_UV: "",
    USE_MAP: "",
    USE_BUMPMAP: "",
  },
  extensions: {
    derivatives: !0,
  },
});

/**
 * Load the Book as GLTF
 */
const loader = new GLTFLoader();
loader.load("./models/book.gltf", (gltf) => {
  console.log(gltf);
  const bookScene = gltf.scene;
  bookScene.matrixWorldNeedsUpdate = true;
  bookScene.cover = bookScene.getObjectByName("book"); // ???

  const bookMesh = bookScene.children[0];
  bookMesh.material = shaderMaterial;

  scene.add(gltf.scene);
});

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height); // FOV (in degrees - 55 max for most objects), Aspect Ratio - width/height
// Move the camera backwards or else it will be inside of the cube

// Conrols
const controls = new TrackballControls(camera, canvas);
controls.enableDamping = true;
camera.position.z = 25;
gui.add(camera.position, "z", -100, 100, 0.1);

// camera.lookAt(mesh.position);
scene.add(camera);

// Renderer - Result is drawn into a canvas
const renderer = new THREE.WebGLRenderer({
  canvas: canvas, // could remove duplicate canvas because they are the same name
  alpha: true, // Set the background of the canvas element to transparent
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

// Animate
const clock = new THREE.Clock();

const tick = () => {
  // const elapsedTime = clock.getElapsedTime();
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
