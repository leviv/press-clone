// Pretty sure that this is the data for the book geometry
// found in Canvas-d48e4796.js in the assets folder of the stripe press website
// line 1871 when pretty printed
const ue = {}

function A(e, r, n) {
  return r in e ? Object.defineProperty(e, r, {
      value: n,
      enumerable: !0,
      configurable: !0,
      writable: !0
  }) : e[r] = n,
  e
}

new pA().parse(JSON.stringify(gltf), "", (t) => {
  const scene = t.scene;
  scene.matrixWorldNeedsUpdate = true;
  const n = this.bookCoverMaterials[A];
  (scene.children[0].material = e),
    (scene.cover = scene.getObjectByName("book"));
  const i =
    this.activeProductIndex === null
      ? this.canvasProperties.bookSpine
      : this.canvasProperties.inactiveBook;
  (scene.cover.rotation.order = i.cover.rotation.order),
    this.scene.add(scene),
    Object.entries(n.material).forEach(([A, t]) => {
      let scene = t;
      ("diffuseMapCustom" !== A &&
        "bumpMapBase" !== A &&
        "bumpMapCustom" !== A &&
        "foilMap" !== A) ||
        (scene = this.bookTextures[t]),
        (e.uniforms[A].value = scene);
    }),
    (scene.backgroundColor = new r(n.palette.backgroundColor)),
    (scene.color = new r(n.palette.color)),
    scene.position.set(i.position.x, i.position.y, -1e3),
    this.setActiveBookRotationOrder(),
    scene.cover.rotation.set(
      i.cover.rotation.x,
      i.cover.rotation.y,
      i.cover.rotation.z
    ),
    scene.rotation.set(i.rotation.x, i.rotation.y, i.rotation.z),
    (this.bookMeshList[A] = scene);
  this.bookMeshList.reduce((A, e) => (e ? A + 1 : A), 0) === this.bookCount &&
    (this.productMeshList.push(...this.bookMeshList), this.initScene());
});


constructor(A) {
  super(),
  this.isGLTFSpecularGlossinessMaterial = !0;
  const e = ["#ifdef USE_SPECULARMAP", "\tuniform sampler2D specularMap;", "#endif"].join("\n")
    , t = ["#ifdef USE_GLOSSINESSMAP", "\tuniform sampler2D glossinessMap;", "#endif"].join("\n")
    , s = ["vec3 specularFactor = specular;", "#ifdef USE_SPECULARMAP", "\tvec4 texelSpecular = texture2D( specularMap, vUv );", "\ttexelSpecular = sRGBToLinear( texelSpecular );", "\t// reads channel RGB, compatible with a glTF Specular-Glossiness (RGBA) texture", "\tspecularFactor *= texelSpecular.rgb;", "#endif"].join("\n")
    , n = ["float glossinessFactor = glossiness;", "#ifdef USE_GLOSSINESSMAP", "\tvec4 texelGlossiness = texture2D( glossinessMap, vUv );", "\t// reads channel A, compatible with a glTF Specular-Glossiness (RGBA) texture", "\tglossinessFactor *= texelGlossiness.a;", "#endif"].join("\n")
    , i = ["PhysicalMaterial material;", "material.diffuseColor = diffuseColor.rgb * ( 1. - max( specularFactor.r, max( specularFactor.g, specularFactor.b ) ) );", "vec3 dxy = max( abs( dFdx( geometryNormal ) ), abs( dFdy( geometryNormal ) ) );", "float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );", "material.specularRoughness = max( 1.0 - glossinessFactor, 0.0525 ); // 0.0525 corresponds to the base mip of a 256 cubemap.", "material.specularRoughness += geometryRoughness;", "material.specularRoughness = min( material.specularRoughness, 1.0 );", "material.specularColor = specularFactor;"].join("\n")
    , o = {
      specular: {
          value: (new r).setHex(16777215)
      },
      glossiness: {
          value: 1
      },
      specularMap: {
          value: null
      },
      glossinessMap: {
          value: null
      }
  };
  this._extraUniforms = o,
  this.onBeforeCompile = function(A) {
      for (const e in o)
          A.uniforms[e] = o[e];
      A.fragmentShader = A.fragmentShader.replace("uniform float roughness;", "uniform vec3 specular;").replace("uniform float metalness;", "uniform float glossiness;").replace("#include <roughnessmap_pars_fragment>", e).replace("#include <metalnessmap_pars_fragment>", t).replace("#include <roughnessmap_fragment>", s).replace("#include <metalnessmap_fragment>", n).replace("#include <lights_physical_fragment>", i)
  }
  ,
  Object.defineProperties(this, {
      specular: {
          get: function() {
              return o.specular.value
          },
          set: function(A) {
              o.specular.value = A
          }
      },
      specularMap: {
          get: function() {
              return o.specularMap.value
          },
          set: function(A) {
              o.specularMap.value = A,
              A ? this.defines.USE_SPECULARMAP = "" : delete this.defines.USE_SPECULARMAP
          }
      },
      glossiness: {
          get: function() {
              return o.glossiness.value
          },
          set: function(A) {
              o.glossiness.value = A
          }
      },
      glossinessMap: {
          get: function() {
              return o.glossinessMap.value
          },
          set: function(A) {
              o.glossinessMap.value = A,
              A ? (this.defines.USE_GLOSSINESSMAP = "",
              this.defines.USE_UV = "") : (delete this.defines.USE_GLOSSINESSMAP,
              delete this.defines.USE_UV)
          }
      }
  }),
  delete this.metalness,
  delete this.roughness,
  delete this.metalnessMap,
  delete this.roughnessMap,
  this.setValues(A)
}
copy(A) {
  return super.copy(A),
  this.specularMap = A.specularMap,
  this.specular.copy(A.specular),
  this.glossinessMap = A.glossinessMap,
  this.glossiness = A.glossiness,
  delete this.metalness,
  delete this.roughness,
  delete this.metalnessMap,
  delete this.roughnessMap,
  this
}
}