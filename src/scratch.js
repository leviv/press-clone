import {_ as A, L as e} from "./index-1d7e59d1.js";
import {C as t, a as s} from "./App-f6f8758b.js";
import {L as n, a as i, F as o, C as r, S as a, P, D as c, M as h, b as l, V as v, s as g, T as w, I as u, c as d, d as Q, B as p, R as B, e as D, f as C, g as f, h as m, i as E, j as M, k as T, l as z, m as k, n as b, o as x, p as I, q as L, r as j, t as S, u as U, G as O, v as H, w as R, O as N, x as F, A as y, y as Y, z as G, E as J, H as K, J as X, K as q, N as V, Q as Z, U as W, W as _, X as$, Y as AA, Z as eA, _ as tA, $as sA, a0 as nA, a1 as iA, a2 as oA, a3 as rA, a4 as aA, a5 as PA, a6 as cA, a7 as hA, a8 as lA, a9 as vA, aa as gA, ab as wA, ac as uA, ad as dA, ae as QA} from "./three.module-cce081bf.js";
class pA extends n {
    constructor(A) {
        super(A),
        this.dracoLoader = null,
        this.ktx2Loader = null,
        this.meshoptDecoder = null,
        this.pluginCallbacks = [],
        this.register((function(A) {
            return new mA(A)
        }
        )),
        this.register((function(A) {
            return new kA(A)
        }
        )),
        this.register((function(A) {
            return new bA(A)
        }
        )),
        this.register((function(A) {
            return new EA(A)
        }
        )),
        this.register((function(A) {
            return new MA(A)
        }
        )),
        this.register((function(A) {
            return new TA(A)
        }
        )),
        this.register((function(A) {
            return new zA(A)
        }
        )),
        this.register((function(A) {
            return new CA(A)
        }
        )),
        this.register((function(A) {
            return new xA(A)
        }
        ))
    }
    load(A, e, t, s) {
        const n = this;
        let r;
        r = "" !== this.resourcePath ? this.resourcePath : "" !== this.path ? this.path : i.extractUrlBase(A),
        this.manager.itemStart(A);
        const a = function(e) {
            s ? s(e) : console.error(e),
            n.manager.itemError(A),
            n.manager.itemEnd(A)
        }
          , P = new o(this.manager);
        P.setPath(this.path),
        P.setResponseType("arraybuffer"),
        P.setRequestHeader(this.requestHeader),
        P.setWithCredentials(this.withCredentials),
        P.load(A, (function(t) {
            try {
                n.parse(t, r, (function(t) {
                    e(t),
                    n.manager.itemEnd(A)
                }
                ), a)
            } catch (A) {
                a(A)
            }
        }
        ), t, a)
    }
    setDRACOLoader(A) {
        return this.dracoLoader = A,
        this
    }
    setDDSLoader() {
        throw new Error('THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".')
    }
    setKTX2Loader(A) {
        return this.ktx2Loader = A,
        this
    }
    setMeshoptDecoder(A) {
        return this.meshoptDecoder = A,
        this
    }
    register(A) {
        return -1 === this.pluginCallbacks.indexOf(A) && this.pluginCallbacks.push(A),
        this
    }
    unregister(A) {
        return -1 !== this.pluginCallbacks.indexOf(A) && this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(A), 1),
        this
    }
    parse(A, e, t, s) {
        let n;
        const o = {}
          , r = {};
        if ("string" == typeof A)
            n = A;
        else {
            if (i.decodeText(new Uint8Array(A,0,4)) === IA) {
                try {
                    o[DA.KHR_BINARY_GLTF] = new SA(A)
                } catch (A) {
                    return void (s && s(A))
                }
                n = o[DA.KHR_BINARY_GLTF].content
            } else
                n = i.decodeText(new Uint8Array(A))
        }
        const a = JSON.parse(n);
        if (void 0 === a.asset || a.asset.version[0] < 2)
            return void (s && s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported.")));
        const P = new le(a,{
            path: e || this.resourcePath || "",
            crossOrigin: this.crossOrigin,
            requestHeader: this.requestHeader,
            manager: this.manager,
            ktx2Loader: this.ktx2Loader,
            meshoptDecoder: this.meshoptDecoder
        });
        P.fileLoader.setRequestHeader(this.requestHeader);
        for (let A = 0; A < this.pluginCallbacks.length; A++) {
            const e = this.pluginCallbacks[A](P);
            r[e.name] = e,
            o[e.name] = !0
        }
        if (a.extensionsUsed)
            for (let A = 0; A < a.extensionsUsed.length; ++A) {
                const e = a.extensionsUsed[A]
                  , t = a.extensionsRequired || [];
                switch (e) {
                case DA.KHR_MATERIALS_UNLIT:
                    o[e] = new fA;
                    break;
                case DA.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS:
                    o[e] = new RA;
                    break;
                case DA.KHR_DRACO_MESH_COMPRESSION:
                    o[e] = new UA(a,this.dracoLoader);
                    break;
                case DA.KHR_TEXTURE_TRANSFORM:
                    o[e] = new OA;
                    break;
                case DA.KHR_MESH_QUANTIZATION:
                    o[e] = new NA;
                    break;
                default:
                    t.indexOf(e) >= 0 && void 0 === r[e] && console.warn('THREE.GLTFLoader: Unknown extension "' + e + '".')
                }
            }
        P.setExtensions(o),
        P.setPlugins(r),
        P.parse(t, s)
    }
}
function BA() {
    let A = {};
    return {
        get: function(e) {
            return A[e]
        },
        add: function(e, t) {
            A[e] = t
        },
        remove: function(e) {
            delete A[e]
        },
        removeAll: function() {
            A = {}
        }
    }
}
const DA = {
    KHR_BINARY_GLTF: "KHR_binary_glTF",
    KHR_DRACO_MESH_COMPRESSION: "KHR_draco_mesh_compression",
    KHR_LIGHTS_PUNCTUAL: "KHR_lights_punctual",
    KHR_MATERIALS_CLEARCOAT: "KHR_materials_clearcoat",
    KHR_MATERIALS_IOR: "KHR_materials_ior",
    KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS: "KHR_materials_pbrSpecularGlossiness",
    KHR_MATERIALS_SPECULAR: "KHR_materials_specular",
    KHR_MATERIALS_TRANSMISSION: "KHR_materials_transmission",
    KHR_MATERIALS_UNLIT: "KHR_materials_unlit",
    KHR_MATERIALS_VOLUME: "KHR_materials_volume",
    KHR_TEXTURE_BASISU: "KHR_texture_basisu",
    KHR_TEXTURE_TRANSFORM: "KHR_texture_transform",
    KHR_MESH_QUANTIZATION: "KHR_mesh_quantization",
    EXT_TEXTURE_WEBP: "EXT_texture_webp",
    EXT_MESHOPT_COMPRESSION: "EXT_meshopt_compression"
};
class CA {
    constructor(A) {
        this.parser = A,
        this.name = DA.KHR_LIGHTS_PUNCTUAL,
        this.cache = {
            refs: {},
            uses: {}
        }
    }
    _markDefs() {
        const A = this.parser
          , e = this.parser.json.nodes || [];
        for (let t = 0, s = e.length; t < s; t++) {
            const s = e[t];
            s.extensions && s.extensions[this.name] && void 0 !== s.extensions[this.name].light && A._addNodeRef(this.cache, s.extensions[this.name].light)
        }
    }
    _loadLight(A) {
        const e = this.parser
          , t = "light:" + A;
        let s = e.cache.get(t);
        if (s)
            return s;
        const n = e.json
          , i = ((n.extensions && n.extensions[this.name] || {}).lights || [])[A];
        let o;
        const h = new r(16777215);
        void 0 !== i.color && h.fromArray(i.color);
        const l = void 0 !== i.range ? i.range : 0;
        switch (i.type) {
        case "directional":
            o = new c(h),
            o.target.position.set(0, 0, -1),
            o.add(o.target);
            break;
        case "point":
            o = new P(h),
            o.distance = l;
            break;
        case "spot":
            o = new a(h),
            o.distance = l,
            i.spot = i.spot || {},
            i.spot.innerConeAngle = void 0 !== i.spot.innerConeAngle ? i.spot.innerConeAngle : 0,
            i.spot.outerConeAngle = void 0 !== i.spot.outerConeAngle ? i.spot.outerConeAngle : Math.PI / 4,
            o.angle = i.spot.outerConeAngle,
            o.penumbra = 1 - i.spot.innerConeAngle / i.spot.outerConeAngle,
            o.target.position.set(0, 0, -1),
            o.add(o.target);
            break;
        default:
            throw new Error("THREE.GLTFLoader: Unexpected light type: " + i.type)
        }
        return o.position.set(0, 0, 0),
        o.decay = 2,
        void 0 !== i.intensity && (o.intensity = i.intensity),
        o.name = e.createUniqueName(i.name || "light_" + A),
        s = Promise.resolve(o),
        e.cache.add(t, s),
        s
    }
    createNodeAttachment(A) {
        const e = this
          , t = this.parser
          , s = t.json.nodes[A]
          , n = (s.extensions && s.extensions[this.name] || {}).light;
        return void 0 === n ? null : this._loadLight(n).then((function(A) {
            return t._getNodeRef(e.cache, n, A)
        }
        ))
    }
}
class fA {
    constructor() {
        this.name = DA.KHR_MATERIALS_UNLIT
    }
    getMaterialType() {
        return h
    }
    extendParams(A, e, t) {
        const s = [];
        A.color = new r(1,1,1),
        A.opacity = 1;
        const n = e.pbrMetallicRoughness;
        if (n) {
            if (Array.isArray(n.baseColorFactor)) {
                const e = n.baseColorFactor;
                A.color.fromArray(e),
                A.opacity = e[3]
            }
            void 0 !== n.baseColorTexture && s.push(t.assignTexture(A, "map", n.baseColorTexture))
        }
        return Promise.all(s)
    }
}
class mA {
    constructor(A) {
        this.parser = A,
        this.name = DA.KHR_MATERIALS_CLEARCOAT
    }
    getMaterialType(A) {
        const e = this.parser.json.materials[A];
        return e.extensions && e.extensions[this.name] ? l : null
    }
    extendMaterialParams(A, e) {
        const t = this.parser
          , s = t.json.materials[A];
        if (!s.extensions || !s.extensions[this.name])
            return Promise.resolve();
        const n = []
          , i = s.extensions[this.name];
        if (void 0 !== i.clearcoatFactor && (e.clearcoat = i.clearcoatFactor),
        void 0 !== i.clearcoatTexture && n.push(t.assignTexture(e, "clearcoatMap", i.clearcoatTexture)),
        void 0 !== i.clearcoatRoughnessFactor && (e.clearcoatRoughness = i.clearcoatRoughnessFactor),
        void 0 !== i.clearcoatRoughnessTexture && n.push(t.assignTexture(e, "clearcoatRoughnessMap", i.clearcoatRoughnessTexture)),
        void 0 !== i.clearcoatNormalTexture && (n.push(t.assignTexture(e, "clearcoatNormalMap", i.clearcoatNormalTexture)),
        void 0 !== i.clearcoatNormalTexture.scale)) {
            const A = i.clearcoatNormalTexture.scale;
            e.clearcoatNormalScale = new v(A,-A)
        }
        return Promise.all(n)
    }
}
class EA {
    constructor(A) {
        this.parser = A,
        this.name = DA.KHR_MATERIALS_TRANSMISSION
    }
    getMaterialType(A) {
        const e = this.parser.json.materials[A];
        return e.extensions && e.extensions[this.name] ? l : null
    }
    extendMaterialParams(A, e) {
        const t = this.parser
          , s = t.json.materials[A];
        if (!s.extensions || !s.extensions[this.name])
            return Promise.resolve();
        const n = []
          , i = s.extensions[this.name];
        return void 0 !== i.transmissionFactor && (e.transmission = i.transmissionFactor),
        void 0 !== i.transmissionTexture && n.push(t.assignTexture(e, "transmissionMap", i.transmissionTexture)),
        Promise.all(n)
    }
}
class MA {
    constructor(A) {
        this.parser = A,
        this.name = DA.KHR_MATERIALS_VOLUME
    }
    getMaterialType(A) {
        const e = this.parser.json.materials[A];
        return e.extensions && e.extensions[this.name] ? l : null
    }
    extendMaterialParams(A, e) {
        const t = this.parser
          , s = t.json.materials[A];
        if (!s.extensions || !s.extensions[this.name])
            return Promise.resolve();
        const n = []
          , i = s.extensions[this.name];
        e.thickness = void 0 !== i.thicknessFactor ? i.thicknessFactor : 0,
        void 0 !== i.thicknessTexture && n.push(t.assignTexture(e, "thicknessMap", i.thicknessTexture)),
        e.attenuationDistance = i.attenuationDistance || 0;
        const o = i.attenuationColor || [1, 1, 1];
        return e.attenuationTint = new r(o[0],o[1],o[2]),
        Promise.all(n)
    }
}
class TA {
    constructor(A) {
        this.parser = A,
        this.name = DA.KHR_MATERIALS_IOR
    }
    getMaterialType(A) {
        const e = this.parser.json.materials[A];
        return e.extensions && e.extensions[this.name] ? l : null
    }
    extendMaterialParams(A, e) {
        const t = this.parser.json.materials[A];
        if (!t.extensions || !t.extensions[this.name])
            return Promise.resolve();
        const s = t.extensions[this.name];
        return e.ior = void 0 !== s.ior ? s.ior : 1.5,
        Promise.resolve()
    }
}
class zA {
    constructor(A) {
        this.parser = A,
        this.name = DA.KHR_MATERIALS_SPECULAR
    }
    getMaterialType(A) {
        const e = this.parser.json.materials[A];
        return e.extensions && e.extensions[this.name] ? l : null
    }
    extendMaterialParams(A, e) {
        const t = this.parser
          , s = t.json.materials[A];
        if (!s.extensions || !s.extensions[this.name])
            return Promise.resolve();
        const n = []
          , i = s.extensions[this.name];
        e.specularIntensity = void 0 !== i.specularFactor ? i.specularFactor : 1,
        void 0 !== i.specularTexture && n.push(t.assignTexture(e, "specularIntensityMap", i.specularTexture));
        const o = i.specularColorFactor || [1, 1, 1];
        return e.specularTint = new r(o[0],o[1],o[2]),
        void 0 !== i.specularColorTexture && n.push(t.assignTexture(e, "specularTintMap", i.specularColorTexture).then((function(A) {
            A.encoding = g
        }
        ))),
        Promise.all(n)
    }
}
class kA {
    constructor(A) {
        this.parser = A,
        this.name = DA.KHR_TEXTURE_BASISU
    }
    loadTexture(A) {
        const e = this.parser
          , t = e.json
          , s = t.textures[A];
        if (!s.extensions || !s.extensions[this.name])
            return null;
        const n = s.extensions[this.name]
          , i = t.images[n.source]
          , o = e.options.ktx2Loader;
        if (!o) {
            if (t.extensionsRequired && t.extensionsRequired.indexOf(this.name) >= 0)
                throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");
            return null
        }
        return e.loadTextureImage(A, i, o)
    }
}
class bA {
    constructor(A) {
        this.parser = A,
        this.name = DA.EXT_TEXTURE_WEBP,
        this.isSupported = null
    }
    loadTexture(A) {
        const e = this.name
          , t = this.parser
          , s = t.json
          , n = s.textures[A];
        if (!n.extensions || !n.extensions[e])
            return null;
        const i = n.extensions[e]
          , o = s.images[i.source];
        let r = t.textureLoader;
        if (o.uri) {
            const A = t.options.manager.getHandler(o.uri);
            null !== A && (r = A)
        }
        return this.detectSupport().then((function(n) {
            if (n)
                return t.loadTextureImage(A, o, r);
            if (s.extensionsRequired && s.extensionsRequired.indexOf(e) >= 0)
                throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");
            return t.loadTexture(A)
        }
        ))
    }
    detectSupport() {
        return this.isSupported || (this.isSupported = new Promise((function(A) {
            const e = new Image;
            e.src = "data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",
            e.onload = e.onerror = function() {
                A(1 === e.height)
            }
        }
        ))),
        this.isSupported
    }
}
class xA {
    constructor(A) {
        this.name = DA.EXT_MESHOPT_COMPRESSION,
        this.parser = A
    }
    loadBufferView(A) {
        const e = this.parser.json
          , t = e.bufferViews[A];
        if (t.extensions && t.extensions[this.name]) {
            const A = t.extensions[this.name]
              , s = this.parser.getDependency("buffer", A.buffer)
              , n = this.parser.options.meshoptDecoder;
            if (!n || !n.supported) {
                if (e.extensionsRequired && e.extensionsRequired.indexOf(this.name) >= 0)
                    throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");
                return null
            }
            return Promise.all([s, n.ready]).then((function(e) {
                const t = A.byteOffset || 0
                  , s = A.byteLength || 0
                  , i = A.count
                  , o = A.byteStride
                  , r = new ArrayBuffer(i * o)
                  , a = new Uint8Array(e[0],t,s);
                return n.decodeGltfBuffer(new Uint8Array(r), i, o, a, A.mode, A.filter),
                r
            }
            ))
        }
        return null
    }
}
const IA = "glTF"
  , LA = 1313821514
  , jA = 5130562;
class SA {
    constructor(A) {
        this.name = DA.KHR_BINARY_GLTF,
        this.content = null,
        this.body = null;
        const e = new DataView(A,0,12);
        if (this.header = {
            magic: i.decodeText(new Uint8Array(A.slice(0, 4))),
            version: e.getUint32(4, !0),
            length: e.getUint32(8, !0)
        },
        this.header.magic !== IA)
            throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");
        if (this.header.version < 2)
            throw new Error("THREE.GLTFLoader: Legacy binary file detected.");
        const t = this.header.length - 12
          , s = new DataView(A,12);
        let n = 0;
        for (; n < t; ) {
            const e = s.getUint32(n, !0);
            n += 4;
            const t = s.getUint32(n, !0);
            if (n += 4,
            t === LA) {
                const t = new Uint8Array(A,12 + n,e);
                this.content = i.decodeText(t)
            } else if (t === jA) {
                const t = 12 + n;
                this.body = A.slice(t, t + e)
            }
            n += e
        }
        if (null === this.content)
            throw new Error("THREE.GLTFLoader: JSON content not found.")
    }
}
class UA {
    constructor(A, e) {
        if (!e)
            throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");
        this.name = DA.KHR_DRACO_MESH_COMPRESSION,
        this.json = A,
        this.dracoLoader = e,
        this.dracoLoader.preload()
    }
    decodePrimitive(A, e) {
        const t = this.json
          , s = this.dracoLoader
          , n = A.extensions[this.name].bufferView
          , i = A.extensions[this.name].attributes
          , o = {}
          , r = {}
          , a = {};
        for (const A in i) {
            const e = $A[A] || A.toLowerCase();
            o[e] = i[A]
        }
        for (const e in A.attributes) {
            const s = $A[e] || e.toLowerCase();
            if (void 0 !== i[e]) {
                const n = t.accessors[A.attributes[e]]
                  , i = VA[n.componentType];
                a[s] = i,
                r[s] = !0 === n.normalized
            }
        }
        return e.getDependency("bufferView", n).then((function(A) {
            return new Promise((function(e) {
                s.decodeDracoFile(A, (function(A) {
                    for (const e in A.attributes) {
                        const t = A.attributes[e]
                          , s = r[e];
                        void 0 !== s && (t.normalized = s)
                    }
                    e(A)
                }
                ), o, a)
            }
            ))
        }
        ))
    }
}
class OA {
    constructor() {
        this.name = DA.KHR_TEXTURE_TRANSFORM
    }
    extendTexture(A, e) {
        return void 0 !== e.texCoord && console.warn('THREE.GLTFLoader: Custom UV sets in "' + this.name + '" extension not yet supported.'),
        void 0 === e.offset && void 0 === e.rotation && void 0 === e.scale || (A = A.clone(),
        void 0 !== e.offset && A.offset.fromArray(e.offset),
        void 0 !== e.rotation && (A.rotation = e.rotation),
        void 0 !== e.scale && A.repeat.fromArray(e.scale),
        A.needsUpdate = !0),
        A
    }
}
class HA extends T {
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
class RA {
    constructor() {
        this.name = DA.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS,
        this.specularGlossinessParams = ["color", "map", "lightMap", "lightMapIntensity", "aoMap", "aoMapIntensity", "emissive", "emissiveIntensity", "emissiveMap", "bumpMap", "bumpScale", "normalMap", "normalMapType", "displacementMap", "displacementScale", "displacementBias", "specularMap", "specular", "glossinessMap", "glossiness", "alphaMap", "envMap", "envMapIntensity", "refractionRatio"]
    }
    getMaterialType() {
        return HA
    }
    extendParams(A, e, t) {
        const s = e.extensions[this.name];
        A.color = new r(1,1,1),
        A.opacity = 1;
        const n = [];
        if (Array.isArray(s.diffuseFactor)) {
            const e = s.diffuseFactor;
            A.color.fromArray(e),
            A.opacity = e[3]
        }
        if (void 0 !== s.diffuseTexture && n.push(t.assignTexture(A, "map", s.diffuseTexture)),
        A.emissive = new r(0,0,0),
        A.glossiness = void 0 !== s.glossinessFactor ? s.glossinessFactor : 1,
        A.specular = new r(1,1,1),
        Array.isArray(s.specularFactor) && A.specular.fromArray(s.specularFactor),
        void 0 !== s.specularGlossinessTexture) {
            const e = s.specularGlossinessTexture;
            n.push(t.assignTexture(A, "glossinessMap", e)),
            n.push(t.assignTexture(A, "specularMap", e))
        }
        return Promise.all(n)
    }
    createMaterial(A) {
        const e = new HA(A);
        return e.fog = !0,
        e.color = A.color,
        e.map = void 0 === A.map ? null : A.map,
        e.lightMap = null,
        e.lightMapIntensity = 1,
        e.aoMap = void 0 === A.aoMap ? null : A.aoMap,
        e.aoMapIntensity = 1,
        e.emissive = A.emissive,
        e.emissiveIntensity = 1,
        e.emissiveMap = void 0 === A.emissiveMap ? null : A.emissiveMap,
        e.bumpMap = void 0 === A.bumpMap ? null : A.bumpMap,
        e.bumpScale = 1,
        e.normalMap = void 0 === A.normalMap ? null : A.normalMap,
        e.normalMapType = w,
        A.normalScale && (e.normalScale = A.normalScale),
        e.displacementMap = null,
        e.displacementScale = 1,
        e.displacementBias = 0,
        e.specularMap = void 0 === A.specularMap ? null : A.specularMap,
        e.specular = A.specular,
        e.glossinessMap = void 0 === A.glossinessMap ? null : A.glossinessMap,
        e.glossiness = A.glossiness,
        e.alphaMap = null,
        e.envMap = void 0 === A.envMap ? null : A.envMap,
        e.envMapIntensity = 1,
        e.refractionRatio = .98,
        e
    }
}
class NA {
    constructor() {
        this.name = DA.KHR_MESH_QUANTIZATION
    }
}
class FA extends q {
    constructor(A, e, t, s) {
        super(A, e, t, s)
    }
    copySampleValue_(A) {
        const e = this.resultBuffer
          , t = this.sampleValues
          , s = this.valueSize
          , n = A * s * 3 + s;
        for (let A = 0; A !== s; A++)
            e[A] = t[n + A];
        return e
    }
}
FA.prototype.beforeStart_ = FA.prototype.copySampleValue_,
FA.prototype.afterEnd_ = FA.prototype.copySampleValue_,
FA.prototype.interpolate_ = function(A, e, t, s) {
    const n = this.resultBuffer
      , i = this.sampleValues
      , o = this.valueSize
      , r = 2 * o
      , a = 3 * o
      , P = s - e
      , c = (t - e) / P
      , h = c * c
      , l = h * c
      , v = A * a
      , g = v - a
      , w = -2 * l + 3 * h
      , u = l - h
      , d = 1 - w
      , Q = u - h + c;
    for (let A = 0; A !== o; A++) {
        const e = i[g + A + o]
          , t = i[g + A + r] * P
          , s = i[v + A + o]
          , a = i[v + A] * P;
        n[A] = d * e + Q * t + w * s + u * a
    }
    return n
}
;
const yA = 0
  , YA = 1
  , GA = 2
  , JA = 3
  , KA = 4
  , XA = 5
  , qA = 6
  , VA = {
    5120: Int8Array,
    5121: Uint8Array,
    5122: Int16Array,
    5123: Uint16Array,
    5125: Uint32Array,
    5126: Float32Array
}
  , ZA = {
    9728: V,
    9729: D,
    9984: Z,
    9985: W,
    9986: _,
    9987: C
}
  , WA = {
    33071: $,
    33648: AA,
    10497: f
}
  , _A = {
    SCALAR: 1,
    VEC2: 2,
    VEC3: 3,
    VEC4: 4,
    MAT2: 4,
    MAT3: 9,
    MAT4: 16
}
  , $A = {
    POSITION: "position",
    NORMAL: "normal",
    TANGENT: "tangent",
    TEXCOORD_0: "uv",
    TEXCOORD_1: "uv2",
    COLOR_0: "color",
    WEIGHTS_0: "skinWeight",
    JOINTS_0: "skinIndex"
}
  , Ae = {
    scale: "scale",
    translation: "position",
    rotation: "quaternion",
    weights: "morphTargetInfluences"
}
  , ee = {
    CUBICSPLINE: void 0,
    LINEAR: F,
    STEP: eA
}
  , te = "OPAQUE"
  , se = "MASK"
  , ne = "BLEND";
function ie(A, e) {
    return "string" != typeof A || "" === A ? "" : (/^https?:\/\//i.test(e) && /^\//.test(A) && (e = e.replace(/(^https?:\/\/[^\/]+).*/i, "$1")),
    /^(https?:)?\/\//i.test(A) || /^data:.*,.*$/i.test(A) || /^blob:.*$/i.test(A) ? A : e + A)
}
function oe(A, e, t) {
    for (const s in t.extensions)
        void 0 === A[s] && (e.userData.gltfExtensions = e.userData.gltfExtensions || {},
        e.userData.gltfExtensions[s] = t.extensions[s])
}
function re(A, e) {
    void 0 !== e.extras && ("object" == typeof e.extras ? Object.assign(A.userData, e.extras) : console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, " + e.extras))
}
function ae(A, e) {
    if (A.updateMorphTargets(),
    void 0 !== e.weights)
        for (let t = 0, s = e.weights.length; t < s; t++)
            A.morphTargetInfluences[t] = e.weights[t];
    if (e.extras && Array.isArray(e.extras.targetNames)) {
        const t = e.extras.targetNames;
        if (A.morphTargetInfluences.length === t.length) {
            A.morphTargetDictionary = {};
            for (let e = 0, s = t.length; e < s; e++)
                A.morphTargetDictionary[t[e]] = e
        } else
            console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")
    }
}
function Pe(A) {
    const e = A.extensions && A.extensions[DA.KHR_DRACO_MESH_COMPRESSION];
    let t;
    return t = e ? "draco:" + e.bufferView + ":" + e.indices + ":" + ce(e.attributes) : A.indices + ":" + ce(A.attributes) + ":" + A.mode,
    t
}
function ce(A) {
    let e = "";
    const t = Object.keys(A).sort();
    for (let s = 0, n = t.length; s < n; s++)
        e += t[s] + ":" + A[t[s]] + ";";
    return e
}
function he(A) {
    switch (A) {
    case Int8Array:
        return 1 / 127;
    case Uint8Array:
        return 1 / 255;
    case Int16Array:
        return 1 / 32767;
    case Uint16Array:
        return 1 / 65535;
    default:
        throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")
    }
}
class le {
    constructor(A={}, e={}) {
        this.json = A,
        this.extensions = {},
        this.plugins = {},
        this.options = e,
        this.cache = new BA,
        this.associations = new Map,
        this.primitiveCache = {},
        this.meshCache = {
            refs: {},
            uses: {}
        },
        this.cameraCache = {
            refs: {},
            uses: {}
        },
        this.lightCache = {
            refs: {},
            uses: {}
        },
        this.textureCache = {},
        this.nodeNamesUsed = {},
        "undefined" != typeof createImageBitmap && !1 === /Firefox/.test(navigator.userAgent) ? this.textureLoader = new u(this.options.manager) : this.textureLoader = new d(this.options.manager),
        this.textureLoader.setCrossOrigin(this.options.crossOrigin),
        this.textureLoader.setRequestHeader(this.options.requestHeader),
        this.fileLoader = new o(this.options.manager),
        this.fileLoader.setResponseType("arraybuffer"),
        "use-credentials" === this.options.crossOrigin && this.fileLoader.setWithCredentials(!0)
    }
    setExtensions(A) {
        this.extensions = A
    }
    setPlugins(A) {
        this.plugins = A
    }
    parse(A, e) {
        const t = this
          , s = this.json
          , n = this.extensions;
        this.cache.removeAll(),
        this._invokeAll((function(A) {
            return A._markDefs && A._markDefs()
        }
        )),
        Promise.all(this._invokeAll((function(A) {
            return A.beforeRoot && A.beforeRoot()
        }
        ))).then((function() {
            return Promise.all([t.getDependencies("scene"), t.getDependencies("animation"), t.getDependencies("camera")])
        }
        )).then((function(e) {
            const i = {
                scene: e[0][s.scene || 0],
                scenes: e[0],
                animations: e[1],
                cameras: e[2],
                asset: s.asset,
                parser: t,
                userData: {}
            };
            oe(n, i, s),
            re(i, s),
            Promise.all(t._invokeAll((function(A) {
                return A.afterRoot && A.afterRoot(i)
            }
            ))).then((function() {
                A(i)
            }
            ))
        }
        )).catch(e)
    }
    _markDefs() {
        const A = this.json.nodes || []
          , e = this.json.skins || []
          , t = this.json.meshes || [];
        for (let t = 0, s = e.length; t < s; t++) {
            const s = e[t].joints;
            for (let e = 0, t = s.length; e < t; e++)
                A[s[e]].isBone = !0
        }
        for (let e = 0, s = A.length; e < s; e++) {
            const s = A[e];
            void 0 !== s.mesh && (this._addNodeRef(this.meshCache, s.mesh),
            void 0 !== s.skin && (t[s.mesh].isSkinnedMesh = !0)),
            void 0 !== s.camera && this._addNodeRef(this.cameraCache, s.camera)
        }
    }
    _addNodeRef(A, e) {
        void 0 !== e && (void 0 === A.refs[e] && (A.refs[e] = A.uses[e] = 0),
        A.refs[e]++)
    }
    _getNodeRef(A, e, t) {
        if (A.refs[e] <= 1)
            return t;
        const s = t.clone();
        return s.name += "_instance_" + A.uses[e]++,
        s
    }
    _invokeOne(A) {
        const e = Object.values(this.plugins);
        e.push(this);
        for (let t = 0; t < e.length; t++) {
            const s = A(e[t]);
            if (s)
                return s
        }
        return null
    }
    _invokeAll(A) {
        const e = Object.values(this.plugins);
        e.unshift(this);
        const t = [];
        for (let s = 0; s < e.length; s++) {
            const n = A(e[s]);
            n && t.push(n)
        }
        return t
    }
    getDependency(A, e) {
        const t = A + ":" + e;
        let s = this.cache.get(t);
        if (!s) {
            switch (A) {
            case "scene":
                s = this.loadScene(e);
                break;
            case "node":
                s = this.loadNode(e);
                break;
            case "mesh":
                s = this._invokeOne((function(A) {
                    return A.loadMesh && A.loadMesh(e)
                }
                ));
                break;
            case "accessor":
                s = this.loadAccessor(e);
                break;
            case "bufferView":
                s = this._invokeOne((function(A) {
                    return A.loadBufferView && A.loadBufferView(e)
                }
                ));
                break;
            case "buffer":
                s = this.loadBuffer(e);
                break;
            case "material":
                s = this._invokeOne((function(A) {
                    return A.loadMaterial && A.loadMaterial(e)
                }
                ));
                break;
            case "texture":
                s = this._invokeOne((function(A) {
                    return A.loadTexture && A.loadTexture(e)
                }
                ));
                break;
            case "skin":
                s = this.loadSkin(e);
                break;
            case "animation":
                s = this.loadAnimation(e);
                break;
            case "camera":
                s = this.loadCamera(e);
                break;
            default:
                throw new Error("Unknown type: " + A)
            }
            this.cache.add(t, s)
        }
        return s
    }
    getDependencies(A) {
        let e = this.cache.get(A);
        if (!e) {
            const t = this
              , s = this.json[A + ("mesh" === A ? "es" : "s")] || [];
            e = Promise.all(s.map((function(e, s) {
                return t.getDependency(A, s)
            }
            ))),
            this.cache.add(A, e)
        }
        return e
    }
    loadBuffer(A) {
        const e = this.json.buffers[A]
          , t = this.fileLoader;
        if (e.type && "arraybuffer" !== e.type)
            throw new Error("THREE.GLTFLoader: " + e.type + " buffer type is not supported.");
        if (void 0 === e.uri && 0 === A)
            return Promise.resolve(this.extensions[DA.KHR_BINARY_GLTF].body);
        const s = this.options;
        return new Promise((function(A, n) {
            t.load(ie(e.uri, s.path), A, void 0, (function() {
                n(new Error('THREE.GLTFLoader: Failed to load buffer "' + e.uri + '".'))
            }
            ))
        }
        ))
    }
    loadBufferView(A) {
        const e = this.json.bufferViews[A];
        return this.getDependency("buffer", e.buffer).then((function(A) {
            const t = e.byteLength || 0
              , s = e.byteOffset || 0;
            return A.slice(s, s + t)
        }
        ))
    }
    loadAccessor(A) {
        const e = this
          , t = this.json
          , s = this.json.accessors[A];
        if (void 0 === s.bufferView && void 0 === s.sparse)
            return Promise.resolve(null);
        const n = [];
        return void 0 !== s.bufferView ? n.push(this.getDependency("bufferView", s.bufferView)) : n.push(null),
        void 0 !== s.sparse && (n.push(this.getDependency("bufferView", s.sparse.indices.bufferView)),
        n.push(this.getDependency("bufferView", s.sparse.values.bufferView))),
        Promise.all(n).then((function(A) {
            const n = A[0]
              , i = _A[s.type]
              , o = VA[s.componentType]
              , r = o.BYTES_PER_ELEMENT
              , a = r * i
              , P = s.byteOffset || 0
              , c = void 0 !== s.bufferView ? t.bufferViews[s.bufferView].byteStride : void 0
              , h = !0 === s.normalized;
            let l, v;
            if (c && c !== a) {
                const A = Math.floor(P / c)
                  , t = "InterleavedBuffer:" + s.bufferView + ":" + s.componentType + ":" + A + ":" + s.count;
                let a = e.cache.get(t);
                a || (l = new o(n,A * c,s.count * c / r),
                a = new Q(l,c / r),
                e.cache.add(t, a)),
                v = new sA(a,i,P % c / r,h)
            } else
                l = null === n ? new o(s.count * i) : new o(n,P,s.count * i),
                v = new p(l,i,h);
            if (void 0 !== s.sparse) {
                const e = _A.SCALAR
                  , t = VA[s.sparse.indices.componentType]
                  , r = s.sparse.indices.byteOffset || 0
                  , a = s.sparse.values.byteOffset || 0
                  , P = new t(A[1],r,s.sparse.count * e)
                  , c = new o(A[2],a,s.sparse.count * i);
                null !== n && (v = new p(v.array.slice(),v.itemSize,v.normalized));
                for (let A = 0, e = P.length; A < e; A++) {
                    const e = P[A];
                    if (v.setX(e, c[A * i]),
                    i >= 2 && v.setY(e, c[A * i + 1]),
                    i >= 3 && v.setZ(e, c[A * i + 2]),
                    i >= 4 && v.setW(e, c[A * i + 3]),
                    i >= 5)
                        throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")
                }
            }
            return v
        }
        ))
    }
    loadTexture(A) {
        const e = this.json
          , t = this.options
          , s = e.textures[A]
          , n = e.images[s.source];
        let i = this.textureLoader;
        if (n.uri) {
            const A = t.manager.getHandler(n.uri);
            null !== A && (i = A)
        }
        return this.loadTextureImage(A, n, i)
    }
    loadTextureImage(A, e, t) {
        const s = this
          , n = this.json
          , i = this.options
          , o = n.textures[A]
          , r = (e.uri || e.bufferView) + ":" + o.sampler;
        if (this.textureCache[r])
            return this.textureCache[r];
        const a = self.URL || self.webkitURL;
        let P = e.uri || ""
          , c = !1
          , h = !0;
        const l = P.search(/\.jpe?g($|\?)/i) > 0 || 0 === P.search(/^data\:image\/jpeg/);
        if (("image/jpeg" === e.mimeType || l) && (h = !1),
        void 0 !== e.bufferView)
            P = s.getDependency("bufferView", e.bufferView).then((function(A) {
                if ("image/png" === e.mimeType) {
                    const e = new DataView(A,25,1).getUint8(0, !1);
                    h = 6 === e || 4 === e || 3 === e
                }
                c = !0;
                const t = new Blob([A],{
                    type: e.mimeType
                });
                return P = a.createObjectURL(t),
                P
            }
            ));
        else if (void 0 === e.uri)
            throw new Error("THREE.GLTFLoader: Image " + A + " is missing URI and bufferView");
        const v = Promise.resolve(P).then((function(A) {
            return new Promise((function(e, s) {
                let n = e;
                !0 === t.isImageBitmapLoader && (n = function(A) {
                    const t = new nA(A);
                    t.needsUpdate = !0,
                    e(t)
                }
                ),
                t.load(ie(A, i.path), n, void 0, s)
            }
            ))
        }
        )).then((function(e) {
            !0 === c && a.revokeObjectURL(P),
            e.flipY = !1,
            o.name && (e.name = o.name),
            h || (e.format = B);
            const t = (n.samplers || {})[o.sampler] || {};
            return e.magFilter = ZA[t.magFilter] || D,
            e.minFilter = ZA[t.minFilter] || C,
            e.wrapS = WA[t.wrapS] || f,
            e.wrapT = WA[t.wrapT] || f,
            s.associations.set(e, {
                type: "textures",
                index: A
            }),
            e
        }
        )).catch((function() {
            return console.error("THREE.GLTFLoader: Couldn't load texture", P),
            null
        }
        ));
        return this.textureCache[r] = v,
        v
    }
    assignTexture(A, e, t) {
        const s = this;
        return this.getDependency("texture", t.index).then((function(n) {
            if (void 0 === t.texCoord || 0 == t.texCoord || "aoMap" === e && 1 == t.texCoord || console.warn("THREE.GLTFLoader: Custom UV set " + t.texCoord + " for texture " + e + " not yet supported."),
            s.extensions[DA.KHR_TEXTURE_TRANSFORM]) {
                const A = void 0 !== t.extensions ? t.extensions[DA.KHR_TEXTURE_TRANSFORM] : void 0;
                if (A) {
                    const e = s.associations.get(n);
                    n = s.extensions[DA.KHR_TEXTURE_TRANSFORM].extendTexture(n, A),
                    s.associations.set(n, e)
                }
            }
            return A[e] = n,
            n
        }
        ))
    }
    assignFinalMaterial(A) {
        const e = A.geometry;
        let t = A.material;
        const s = void 0 !== e.attributes.tangent
          , n = void 0 !== e.attributes.color
          , i = void 0 === e.attributes.normal;
        if (A.isPoints) {
            const A = "PointsMaterial:" + t.uuid;
            let e = this.cache.get(A);
            e || (e = new m,
            E.prototype.copy.call(e, t),
            e.color.copy(t.color),
            e.map = t.map,
            e.sizeAttenuation = !1,
            this.cache.add(A, e)),
            t = e
        } else if (A.isLine) {
            const A = "LineBasicMaterial:" + t.uuid;
            let e = this.cache.get(A);
            e || (e = new M,
            E.prototype.copy.call(e, t),
            e.color.copy(t.color),
            this.cache.add(A, e)),
            t = e
        }
        if (s || n || i) {
            let A = "ClonedMaterial:" + t.uuid + ":";
            t.isGLTFSpecularGlossinessMaterial && (A += "specular-glossiness:"),
            s && (A += "vertex-tangents:"),
            n && (A += "vertex-colors:"),
            i && (A += "flat-shading:");
            let e = this.cache.get(A);
            e || (e = t.clone(),
            n && (e.vertexColors = !0),
            i && (e.flatShading = !0),
            s && (e.normalScale && (e.normalScale.y *= -1),
            e.clearcoatNormalScale && (e.clearcoatNormalScale.y *= -1)),
            this.cache.add(A, e),
            this.associations.set(e, this.associations.get(t))),
            t = e
        }
        t.aoMap && void 0 === e.attributes.uv2 && void 0 !== e.attributes.uv && e.setAttribute("uv2", e.attributes.uv),
        A.material = t
    }
    getMaterialType() {
        return T
    }
    loadMaterial(A) {
        const e = this
          , t = this.json
          , s = this.extensions
          , n = t.materials[A];
        let i;
        const o = {}
          , a = n.extensions || {}
          , P = [];
        if (a[DA.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS]) {
            const A = s[DA.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS];
            i = A.getMaterialType(),
            P.push(A.extendParams(o, n, e))
        } else if (a[DA.KHR_MATERIALS_UNLIT]) {
            const A = s[DA.KHR_MATERIALS_UNLIT];
            i = A.getMaterialType(),
            P.push(A.extendParams(o, n, e))
        } else {
            const t = n.pbrMetallicRoughness || {};
            if (o.color = new r(1,1,1),
            o.opacity = 1,
            Array.isArray(t.baseColorFactor)) {
                const A = t.baseColorFactor;
                o.color.fromArray(A),
                o.opacity = A[3]
            }
            void 0 !== t.baseColorTexture && P.push(e.assignTexture(o, "map", t.baseColorTexture)),
            o.metalness = void 0 !== t.metallicFactor ? t.metallicFactor : 1,
            o.roughness = void 0 !== t.roughnessFactor ? t.roughnessFactor : 1,
            void 0 !== t.metallicRoughnessTexture && (P.push(e.assignTexture(o, "metalnessMap", t.metallicRoughnessTexture)),
            P.push(e.assignTexture(o, "roughnessMap", t.metallicRoughnessTexture))),
            i = this._invokeOne((function(e) {
                return e.getMaterialType && e.getMaterialType(A)
            }
            )),
            P.push(Promise.all(this._invokeAll((function(e) {
                return e.extendMaterialParams && e.extendMaterialParams(A, o)
            }
            ))))
        }
        !0 === n.doubleSided && (o.side = z);
        const c = n.alphaMode || te;
        return c === ne ? (o.transparent = !0,
        o.depthWrite = !1) : (o.transparent = !1,
        c === se && (o.alphaTest = void 0 !== n.alphaCutoff ? n.alphaCutoff : .5)),
        void 0 !== n.normalTexture && i !== h && (P.push(e.assignTexture(o, "normalMap", n.normalTexture)),
        o.normalScale = new v(1,-1),
        void 0 !== n.normalTexture.scale && o.normalScale.set(n.normalTexture.scale, -n.normalTexture.scale)),
        void 0 !== n.occlusionTexture && i !== h && (P.push(e.assignTexture(o, "aoMap", n.occlusionTexture)),
        void 0 !== n.occlusionTexture.strength && (o.aoMapIntensity = n.occlusionTexture.strength)),
        void 0 !== n.emissiveFactor && i !== h && (o.emissive = (new r).fromArray(n.emissiveFactor)),
        void 0 !== n.emissiveTexture && i !== h && P.push(e.assignTexture(o, "emissiveMap", n.emissiveTexture)),
        Promise.all(P).then((function() {
            let t;
            return t = i === HA ? s[DA.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS].createMaterial(o) : new i(o),
            n.name && (t.name = n.name),
            t.map && (t.map.encoding = g),
            t.emissiveMap && (t.emissiveMap.encoding = g),
            re(t, n),
            e.associations.set(t, {
                type: "materials",
                index: A
            }),
            n.extensions && oe(s, t, n),
            t
        }
        ))
    }
    createUniqueName(A) {
        const e = k.sanitizeNodeName(A || "");
        let t = e;
        for (let A = 1; this.nodeNamesUsed[t]; ++A)
            t = e + "_" + A;
        return this.nodeNamesUsed[t] = !0,
        t
    }
    loadGeometries(A) {
        const e = this
          , t = this.extensions
          , s = this.primitiveCache;
        function n(A) {
            return t[DA.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(A, e).then((function(t) {
                return ge(t, A, e)
            }
            ))
        }
        const i = [];
        for (let t = 0, o = A.length; t < o; t++) {
            const o = A[t]
              , r = Pe(o)
              , a = s[r];
            if (a)
                i.push(a.promise);
            else {
                let A;
                A = o.extensions && o.extensions[DA.KHR_DRACO_MESH_COMPRESSION] ? n(o) : ge(new b, o, e),
                s[r] = {
                    primitive: o,
                    promise: A
                },
                i.push(A)
            }
        }
        return Promise.all(i)
    }
    loadMesh(A) {
        const e = this
          , t = this.json
          , s = this.extensions
          , n = t.meshes[A]
          , i = n.primitives
          , o = [];
        for (let A = 0, e = i.length; A < e; A++) {
            const e = void 0 === i[A].material ? (void 0 === (r = this.cache).DefaultMaterial && (r.DefaultMaterial = new T({
                color: 16777215,
                emissive: 0,
                metalness: 1,
                roughness: 1,
                transparent: !1,
                depthTest: !0,
                side: tA
            })),
            r.DefaultMaterial) : this.getDependency("material", i[A].material);
            o.push(e)
        }
        var r;
        return o.push(e.loadGeometries(i)),
        Promise.all(o).then((function(t) {
            const o = t.slice(0, t.length - 1)
              , r = t[t.length - 1]
              , a = [];
            for (let t = 0, P = r.length; t < P; t++) {
                const P = r[t]
                  , c = i[t];
                let h;
                const l = o[t];
                if (c.mode === KA || c.mode === XA || c.mode === qA || void 0 === c.mode)
                    h = !0 === n.isSkinnedMesh ? new x(P,l) : new I(P,l),
                    !0 !== h.isSkinnedMesh || h.geometry.attributes.skinWeight.normalized || h.normalizeSkinWeights(),
                    c.mode === XA ? h.geometry = we(h.geometry, iA) : c.mode === qA && (h.geometry = we(h.geometry, X));
                else if (c.mode === YA)
                    h = new L(P,l);
                else if (c.mode === JA)
                    h = new j(P,l);
                else if (c.mode === GA)
                    h = new S(P,l);
                else {
                    if (c.mode !== yA)
                        throw new Error("THREE.GLTFLoader: Primitive mode unsupported: " + c.mode);
                    h = new U(P,l)
                }
                Object.keys(h.geometry.morphAttributes).length > 0 && ae(h, n),
                h.name = e.createUniqueName(n.name || "mesh_" + A),
                re(h, n),
                c.extensions && oe(s, h, c),
                e.assignFinalMaterial(h),
                a.push(h)
            }
            if (1 === a.length)
                return a[0];
            const P = new O;
            for (let A = 0, e = a.length; A < e; A++)
                P.add(a[A]);
            return P
        }
        ))
    }
    loadCamera(A) {
        let e;
        const t = this.json.cameras[A]
          , s = t[t.type];
        if (s)
            return "perspective" === t.type ? e = new H(R.radToDeg(s.yfov),s.aspectRatio || 1,s.znear || 1,s.zfar || 2e6) : "orthographic" === t.type && (e = new N(-s.xmag,s.xmag,s.ymag,-s.ymag,s.znear,s.zfar)),
            t.name && (e.name = this.createUniqueName(t.name)),
            re(e, t),
            Promise.resolve(e);
        console.warn("THREE.GLTFLoader: Missing camera parameters.")
    }
    loadSkin(A) {
        const e = this.json.skins[A]
          , t = {
            joints: e.joints
        };
        return void 0 === e.inverseBindMatrices ? Promise.resolve(t) : this.getDependency("accessor", e.inverseBindMatrices).then((function(A) {
            return t.inverseBindMatrices = A,
            t
        }
        ))
    }
    loadAnimation(A) {
        const e = this.json.animations[A]
          , t = []
          , s = []
          , n = []
          , i = []
          , o = [];
        for (let A = 0, r = e.channels.length; A < r; A++) {
            const r = e.channels[A]
              , a = e.samplers[r.sampler]
              , P = r.target
              , c = void 0 !== P.node ? P.node : P.id
              , h = void 0 !== e.parameters ? e.parameters[a.input] : a.input
              , l = void 0 !== e.parameters ? e.parameters[a.output] : a.output;
            t.push(this.getDependency("node", c)),
            s.push(this.getDependency("accessor", h)),
            n.push(this.getDependency("accessor", l)),
            i.push(a),
            o.push(P)
        }
        return Promise.all([Promise.all(t), Promise.all(s), Promise.all(n), Promise.all(i), Promise.all(o)]).then((function(t) {
            const s = t[0]
              , n = t[1]
              , i = t[2]
              , o = t[3]
              , r = t[4]
              , a = [];
            for (let A = 0, e = s.length; A < e; A++) {
                const e = s[A]
                  , t = n[A]
                  , P = i[A]
                  , c = o[A]
                  , h = r[A];
                if (void 0 === e)
                    continue;
                let l;
                switch (e.updateMatrix(),
                e.matrixAutoUpdate = !0,
                Ae[h.path]) {
                case Ae.weights:
                    l = aA;
                    break;
                case Ae.rotation:
                    l = rA;
                    break;
                case Ae.position:
                case Ae.scale:
                default:
                    l = oA
                }
                const v = e.name ? e.name : e.uuid
                  , g = void 0 !== c.interpolation ? ee[c.interpolation] : F
                  , w = [];
                Ae[h.path] === Ae.weights ? e.traverse((function(A) {
                    !0 === A.isMesh && A.morphTargetInfluences && w.push(A.name ? A.name : A.uuid)
                }
                )) : w.push(v);
                let u = P.array;
                if (P.normalized) {
                    const A = he(u.constructor)
                      , e = new Float32Array(u.length);
                    for (let t = 0, s = u.length; t < s; t++)
                        e[t] = u[t] * A;
                    u = e
                }
                for (let A = 0, e = w.length; A < e; A++) {
                    const e = new l(w[A] + "." + Ae[h.path],t.array,u,g);
                    "CUBICSPLINE" === c.interpolation && (e.createInterpolant = function(A) {
                        return new FA(this.times,this.values,this.getValueSize() / 3,A)
                    }
                    ,
                    e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline = !0),
                    a.push(e)
                }
            }
            const P = e.name ? e.name : "animation_" + A;
            return new y(P,void 0,a)
        }
        ))
    }
    createNodeMesh(A) {
        const e = this.json
          , t = this
          , s = e.nodes[A];
        return void 0 === s.mesh ? null : t.getDependency("mesh", s.mesh).then((function(A) {
            const e = t._getNodeRef(t.meshCache, s.mesh, A);
            return void 0 !== s.weights && e.traverse((function(A) {
                if (A.isMesh)
                    for (let e = 0, t = s.weights.length; e < t; e++)
                        A.morphTargetInfluences[e] = s.weights[e]
            }
            )),
            e
        }
        ))
    }
    loadNode(A) {
        const e = this.json
          , t = this.extensions
          , s = this
          , n = e.nodes[A]
          , i = n.name ? s.createUniqueName(n.name) : "";
        return function() {
            const e = []
              , t = s._invokeOne((function(e) {
                return e.createNodeMesh && e.createNodeMesh(A)
            }
            ));
            return t && e.push(t),
            void 0 !== n.camera && e.push(s.getDependency("camera", n.camera).then((function(A) {
                return s._getNodeRef(s.cameraCache, n.camera, A)
            }
            ))),
            s._invokeAll((function(e) {
                return e.createNodeAttachment && e.createNodeAttachment(A)
            }
            )).forEach((function(A) {
                e.push(A)
            }
            )),
            Promise.all(e)
        }().then((function(e) {
            let o;
            if (o = !0 === n.isBone ? new Y : e.length > 1 ? new O : 1 === e.length ? e[0] : new G,
            o !== e[0])
                for (let A = 0, t = e.length; A < t; A++)
                    o.add(e[A]);
            if (n.name && (o.userData.name = n.name,
            o.name = i),
            re(o, n),
            n.extensions && oe(t, o, n),
            void 0 !== n.matrix) {
                const A = new J;
                A.fromArray(n.matrix),
                o.applyMatrix4(A)
            } else
                void 0 !== n.translation && o.position.fromArray(n.translation),
                void 0 !== n.rotation && o.quaternion.fromArray(n.rotation),
                void 0 !== n.scale && o.scale.fromArray(n.scale);
            return s.associations.set(o, {
                type: "nodes",
                index: A
            }),
            o
        }
        ))
    }
    loadScene(A) {
        const e = this.json
          , t = this.extensions
          , s = this.json.scenes[A]
          , n = this
          , i = new O;
        s.name && (i.name = n.createUniqueName(s.name)),
        re(i, s),
        s.extensions && oe(t, i, s);
        const o = s.nodes || []
          , r = [];
        for (let A = 0, t = o.length; A < t; A++)
            r.push(ve(o[A], i, e, n));
        return Promise.all(r).then((function() {
            return i
        }
        ))
    }
}
function ve(A, e, t, s) {
    const n = t.nodes[A];
    return s.getDependency("node", A).then((function(A) {
        if (void 0 === n.skin)
            return A;
        let e;
        return s.getDependency("skin", n.skin).then((function(A) {
            e = A;
            const t = [];
            for (let A = 0, n = e.joints.length; A < n; A++)
                t.push(s.getDependency("node", e.joints[A]));
            return Promise.all(t)
        }
        )).then((function(t) {
            return A.traverse((function(A) {
                if (!A.isMesh)
                    return;
                const s = []
                  , n = [];
                for (let A = 0, i = t.length; A < i; A++) {
                    const i = t[A];
                    if (i) {
                        s.push(i);
                        const t = new J;
                        void 0 !== e.inverseBindMatrices && t.fromArray(e.inverseBindMatrices.array, 16 * A),
                        n.push(t)
                    } else
                        console.warn('THREE.GLTFLoader: Joint "%s" could not be found.', e.joints[A])
                }
                A.bind(new K(s,n), A.matrixWorld)
            }
            )),
            A
        }
        ))
    }
    )).then((function(A) {
        e.add(A);
        const i = [];
        if (n.children) {
            const e = n.children;
            for (let n = 0, o = e.length; n < o; n++) {
                const o = e[n];
                i.push(ve(o, A, t, s))
            }
        }
        return Promise.all(i)
    }
    ))
}
function ge(A, e, t) {
    const s = e.attributes
      , n = [];
    function i(e, s) {
        return t.getDependency("accessor", e).then((function(e) {
            A.setAttribute(s, e)
        }
        ))
    }
    for (const e in s) {
        const t = $A[e] || e.toLowerCase();
        t in A.attributes || n.push(i(s[e], t))
    }
    if (void 0 !== e.indices && !A.index) {
        const s = t.getDependency("accessor", e.indices).then((function(e) {
            A.setIndex(e)
        }
        ));
        n.push(s)
    }
    return re(A, e),
    function(A, e, t) {
        const s = e.attributes
          , n = new cA;
        if (void 0 === s.POSITION)
            return;
        {
            const A = t.json.accessors[s.POSITION]
              , e = A.min
              , i = A.max;
            if (void 0 === e || void 0 === i)
                return void console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");
            if (n.set(new PA(e[0],e[1],e[2]), new PA(i[0],i[1],i[2])),
            A.normalized) {
                const e = he(VA[A.componentType]);
                n.min.multiplyScalar(e),
                n.max.multiplyScalar(e)
            }
        }
        const i = e.targets;
        if (void 0 !== i) {
            const A = new PA
              , e = new PA;
            for (let s = 0, n = i.length; s < n; s++) {
                const n = i[s];
                if (void 0 !== n.POSITION) {
                    const s = t.json.accessors[n.POSITION]
                      , i = s.min
                      , o = s.max;
                    if (void 0 !== i && void 0 !== o) {
                        if (e.setX(Math.max(Math.abs(i[0]), Math.abs(o[0]))),
                        e.setY(Math.max(Math.abs(i[1]), Math.abs(o[1]))),
                        e.setZ(Math.max(Math.abs(i[2]), Math.abs(o[2]))),
                        s.normalized) {
                            const A = he(VA[s.componentType]);
                            e.multiplyScalar(A)
                        }
                        A.max(e)
                    } else
                        console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")
                }
            }
            n.expandByVector(A)
        }
        A.boundingBox = n;
        const o = new hA;
        n.getCenter(o.center),
        o.radius = n.min.distanceTo(n.max) / 2,
        A.boundingSphere = o
    }(A, e, t),
    Promise.all(n).then((function() {
        return void 0 !== e.targets ? function(A, e, t) {
            let s = !1
              , n = !1;
            for (let A = 0, t = e.length; A < t; A++) {
                const t = e[A];
                if (void 0 !== t.POSITION && (s = !0),
                void 0 !== t.NORMAL && (n = !0),
                s && n)
                    break
            }
            if (!s && !n)
                return Promise.resolve(A);
            const i = []
              , o = [];
            for (let r = 0, a = e.length; r < a; r++) {
                const a = e[r];
                if (s) {
                    const e = void 0 !== a.POSITION ? t.getDependency("accessor", a.POSITION) : A.attributes.position;
                    i.push(e)
                }
                if (n) {
                    const e = void 0 !== a.NORMAL ? t.getDependency("accessor", a.NORMAL) : A.attributes.normal;
                    o.push(e)
                }
            }
            return Promise.all([Promise.all(i), Promise.all(o)]).then((function(e) {
                const t = e[0]
                  , i = e[1];
                return s && (A.morphAttributes.position = t),
                n && (A.morphAttributes.normal = i),
                A.morphTargetsRelative = !0,
                A
            }
            ))
        }(A, e.targets, t) : A
    }
    ))
}
function we(A, e) {
    let t = A.getIndex();
    if (null === t) {
        const e = []
          , s = A.getAttribute("position");
        if (void 0 === s)
            return console.error("THREE.GLTFLoader.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),
            A;
        for (let A = 0; A < s.count; A++)
            e.push(A);
        A.setIndex(e),
        t = A.getIndex()
    }
    const s = t.count - 2
      , n = [];
    if (e === X)
        for (let A = 1; A <= s; A++)
            n.push(t.getX(0)),
            n.push(t.getX(A)),
            n.push(t.getX(A + 1));
    else
        for (let A = 0; A < s; A++)
            A % 2 == 0 ? (n.push(t.getX(A)),
            n.push(t.getX(A + 1)),
            n.push(t.getX(A + 2))) : (n.push(t.getX(A + 2)),
            n.push(t.getX(A + 1)),
            n.push(t.getX(A)));
    n.length / 3 !== s && console.error("THREE.GLTFLoader.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");
    const i = A.clone();
    return i.setIndex(n),
    i
}
const ue = {
    asset: {
        version: "2.0"
    },
    scenes: [{
        nodes: [0]
    }],
    nodes: [{
        name: "book",
        mesh: 0
    }],
    meshes: [{
        name: "book",
        primitives: [{
            attributes: {
                POSITION: 1,
                NORMAL: 2,
                TEXCOORD_0: 3
            },
            indices: 0,
            material: 0
        }]
    }],
    accessors: [{
        bufferView: 0,
        type: "SCALAR",
        componentType: 5123,
        count: 5934,
        byteOffset: 0,
        min: [0],
        max: [1137]
    }, {
        bufferView: 1,
        type: "VEC3",
        componentType: 5126,
        count: 1138,
        byteOffset: 0,
        min: [-1.687235951423645, -11.838970184326172, -7.947264194488525],
        max: [1.687235951423645, 11.838970184326172, 7.959763050079346]
    }, {
        bufferView: 1,
        type: "VEC3",
        componentType: 5126,
        count: 1138,
        byteOffset: 12,
        min: [-1, -1, -1],
        max: [1, 1, 1]
    }, {
        bufferView: 1,
        type: "VEC2",
        componentType: 5126,
        count: 1138,
        byteOffset: 24,
        min: [.001953125, .0019530998542904854],
        max: [.998046875, .998046875]
    }],
    bufferViews: [{
        buffer: 0,
        byteOffset: 0,
        byteLength: 11868,
        target: 34963
    }, {
        buffer: 0,
        byteOffset: 11868,
        byteLength: 36416,
        target: 34962,
        byteStride: 32
    }],
    buffers: [{
        uri: "data:application/octet-stream;base64,MAQxBC8EKwQqBCwEKQQnBCYE+QP6AxgE+AP5Ax0E9wP4AyUEJAT+Ax8E9QP2AxwEAgQBBBkE+wP6Aw8EAAQBBAsE/wMABAkE/gP/AwcE9wP2AwgE/AP9AwMEDQTqAwsECwToAwkECQTsAwcEBQTwAwgEBgTvAwMEDgTpAw8EDgQMBOkDDAQKBOcDCgQIBOsDBgQHBO8DBQQEBPADDQQQBOoDEAQNBAIEIgQeBAAEIwQiBP8DJAQjBP4DBwQGBP4DGgQfBPwDGwQhBPsDDAQOBPkDCgQMBPgDCAQKBPcDJQQgBPcDBAQFBPUD5wMSBOkD6wMTBOcD7QMUBOsD7gMUBO8D8gMWBPAD9AMXBOoD6APqAxIE7APoAxME7gPsAxQE7QPwAxQE8QPvAxYE8wPpAxcEvAPkA7YDuAPeA7cDuAPdA7kDugPhA7kDuwPlA7oDvAPjA7sDvAO2A+MDuAO3A90DuAO5A94DugO5A+IDuwO6A+YDvAO7A+QD1wPIA9gD1wOtA9YD1QPDA9YD1APBA9UD0wO/A9QD0wOsA9ID0AOuA9ED0APHA88DzgOqA88DzQOrA84DzAOvA80DzAPAA8sD2QO9A+MD2wPJA90D3wPGA94D4APFA+ID4gPDA+YD5gPBA+QD2gPkA74D3APeA8oD4APdA8UD3wPhA8YD4QPlA8QD5QPjA8IDxwPQA8oDyAPXA8UDxAPOA8YDwgPNA8QDwAPMA8IDvwPTA74DrwPMA7QDrQPXA7ED0APPA64DsAPVA6gDtQPUA7ADrAPTA7UDEgCUAwIABwCiAwEAAQCkAwAAAwCaAwUAAgCWAwQABACYAwMABQCcAwYABgCeAwgACACgAwcADwCEAwkACQCGAwoACgCIAw0ADACMAwsACwCOAxEADQCKAwwADgCAAxAAEACCAw8AEQCQAxMAEwCSAxIAEgACAJUDBwABAKMDAQAAAKUDAwAFAJsDAgAEAJcDBAADAJkDBQAGAJ0DBgAIAJ8DCAAHAKEDDwAJAIUDCQAKAIcDCgANAIkDDAALAI0DCwARAI8DDQAMAIsDDgAQAIEDEAAPAIMDEQATAJEDEwASAJMDPwMlAz4DPgMSAzsD5AImA9wCZQNTA/UC3AIRA9IB+gIeAzoDPAMTA0UDOwMUA9QBAANMA/wCOgMVAzgDOAMdA/gCDQNaA0QD+QIeA9gB6AIlA+QC9QInA0ADRAMrAyMDIwMuA2UEPwP2AiUDBgMHA/cCMQNkBDUD+gLUAR4DCwMKAyAD/wJMAwEDAQNOA/0C/QJPA9QB3wJTA0cDHwNbA0MDQwNVA2ID0gFWA3QDfgNcA8oBdANZAw0DDwNbA34DYgNdA9UC0gJ3A9YC1gJhAw4DDgNrA9YB1gFdBPECvgK/AtQCKABvA+UC/gICA+0C5QJwAzMDMwNyA9ACAgMAA+ECAAP8At0CZAQxA3wDHwNDA1oDMAMtA8gCNwP3Ah0DOQM3AxUDywFkA1QDxALDAtMC9ALYARQDOwPUARMD2ALTAs8CcQPbAm8D1wLDAvMC6gKVA3kDPANFA+YCPQM8A8cCeQPSAuoC0gLWAs4CywFUAzQDCQMIA1QD+QI5Ax4D3wJHAxEDLQMxA+ACMQM1A+kCIAPMAQsD/AJIAwsDNQPPAecCVANQAwkD+wL4AgkDzwFXBNkCQAM9A80C+gI6A/0C9QJAA8wCGgMGA1kEZQP1Au8C5QK9AigA+AIvAwgDGgMsAwYD3wL2AlMDOAP/AjoD9wLLAgYDywJgAwUDPgMYAz8DeAM3AL0CZQQuACMDcQRRAy4A+AL7AjgD0gEXAtwCSQNmAxcC3AIiA+QCZgNnAyID5AIWAugCZwNoAxYC6ALJAvICaANpA8kC8gIVAvQC9gLfAiYDaQNqAxUC2QETAvkC8gL0AhID6ALyAiUDXwMcA9kB0wESAkoD2AH0AtMBXgQuA9UCGwMZAxwDNwM5AxkDYAPLAhsD9wI3A8sC0AHRAVcDDQNEA9ABxALFAjID2QHTAV8D+QLYAdkB0QHKAigDYgQgA2QDRAMjA9EBCAMHA00DFwLOAUkDNANNA0ID0gF0AxcCDQPQAXQDVwNLA9AB0AKjA80BzQGlA3oD8wLCAlwEPQNAAxgDPAM9AxMDOwMTAz4D0ALNATMDZAPLAWEEzwE1A18EYAE0A3sDegN2A80BeQPPAtICRQP+AhQCMgPRAnIDcgNwAzIDwAKVANUC7gLAAm0DewDuAl0E9gI/AycD8wJcBGsD1wLzAmED0wLXAncDYwPUAl0DHwN/A1sDQwNiAysDfwMfA1kDfwNHA1wD/wL7AkwDRwN/A1YDQQNjA1UDDwNBA1sDZQPKAVMD/gJFA08DAgP+Ak4DAAMCA0wDNgNCAxoDvQIYAngD5QIzA70CygFlAyEDfgPKAX0DDwN+A+ICIANbBMwB1gIOA+wCDgPWAcYCQQMPA/AC/AILA94CYwNBA14D1AJjAwMD8QK+AtUB1gHxAikDBQMEA1kE2AKbA8UC0wLYAsQCMgPbAsQC2wJxA8MCcQNvA8IC7gJ7AMAC1QJuA8AC8QJtA74C1AIDA74CCQMKA/sCywE0A1oBlwOZA3kDmQObA88CnQOfA8UC0QKfA3MDoQOjA3MDkQKFA+YBhwOJA+YBkAKJA5wCkgKJAo8DkgKPA+ABuQEtAlYEEQJXAmYCpQJeAqMCogLsAaMCogLrAaECoAJTBKECbwQ1AZ8CnwLoAZ4CngKGAp0CnAKJAp0CiwONA5wCcARdAk0EsQJwAjgCpQKjArEC+wH2AV4CcQIgAvsBVQJWAoMCfwJSAnECOAKwApsCmwJTAnUCmQJVBLoC3AHbAX8CQAK8AtwBcgL0AUACpgIuAqQC4wGmAuEBNQIfAkcCCwJfAg0CCgJjAgsCBwIcAgoCAQK8AgYCBAIgAv4B/AH2AQQCAALaAQMCEQJmAg0CAQIaAv0B/wFCAgACMwL3ATYC/QHaAf4B6wGNAvwB+AGKAuIB7gFuAvgBbQSvAu4BNwIiAjoC7AFzAu0BogKhAuwBTwSgAowChgLpAS8C5gGQAucBdAJjAqoC4gGSAo8CpgLjAbkCHwItAlIEbAQsAt4BVgS7AlEEpgK5Ai4CSQJOAiMCSQIkAk4CNwIhAkkCbwSfAq8CgQODA98BgwOFA7kCuAIOArYCuAK2AuUBuALlAacCNQIMAh8CDgK4AhACNQJaAgwClwI+ArUCCQJBAvUBCAKXAjkCswKuAq0CDwKzAvoBkAKcAi8CtQIdArYCOQK1AgICSAIqApYCSAKWAkYCqwIoAkgCqwJIAkUC9wEzAowCrAJtArMC7wGsAg8CqwJFAq0CTwJvAjwCTQJtAk8CKAKrAmgCrALvAakCUAKCAjsCrAKpAm0CqQLwAZgCqQKYAm8CmALxAagCmAKoAnkCqALyAT8CqAI/An0CPwLzAacCPwKnAoUCYgJmAikClwIIAlEClwJRAj4CbgRKAqQCNwJJAiICXQL5AVwCXAKWAlsCYAJiAicCOgJrAgYCWgI1AlsCWgIyAlkCbgSkAkwElQJsAnICXAJbAk0ElAIhApUCYAInAmQCmgIkApQCfgKAAYgCWQJpAlgCVwIJAlgCiAK3AnoCVwIRAlYCVQK6AlYCegIsAngCeAIwAoECAwIaAlACTAIoAkMCDAJZAgUCDAIFAi0CdQKLApMCkwKPAncCewIlApoCqgIcAnsCkQOTA+ABnwKeAm4C6QGGAjUB4gGOApICBwKyAk4CPQKuAk0CigKeAo4CCQL1AQUCRAIqAkwCMgJqAkQCgQI0ApkCNgIeAv8BNAIwAnoBgwJlAoQChAJhAoAC5gHnAZEC5wHpAS4CgAJfAnQC6QE1AXwC6wGiAo0C7AHtAXACbQTuAbAC7gH4AVMC+AHiAYsC6wH8AYwC/QH+AdsB/wEAAlQCAQL9AbwCAAIDAuUB/AEEAvcBBAL+AR4CAQIGAhoCBwIKArICCgILAmQCCwINAmACCQJXAkECPQKyAkMCbATkASwCMgJaAmoCOwJrAjwCTwQzAiQBewLmAqoCMwI2Aj4CNwI6AiECOwI8An0CPQJDAq4CNgL/AR0CMgJEAmkCRAJMAikCEQINAmUCXgPwAvsBPQJNArICBwJOAhwCOAIpA7ECTAJDAicCAwJQArQCzgLsApMCOgIGAmwCUAI7AoUCTQJPAiYCTwI8AiMCxgHXAcUBfgLjAsYBiALZAn4CegLnAogCeALpAnoCgQLgAngCmQLIAoECugLMAZkCVQIMA7oCgwLeAlUChALdAoMCgALhAoQCdALtAoACFALtAqoCmgLHAnsClALNApoClQLMApQCcgLvApUCQAIhA3IC3AF9A0ACfwLiAtwBcQLwAn8CXgIDA/sBpQIZAl4CsQLVAaUCmwLGAjgCdQLsApsCdwLqApMCkwOVA3cCXAFvAYgBXgFcAYUBWwFwASYBcQGdAT8BoAFbARwAXwFoAYQBnAFdAY8BbgFeAR4AkgGWAUYBZwFfAYIBeQFnAUIBdQGkAY4BbgFoASIAcAFvAS4BdAFxAYoBeAF1AW0BSAR4AeoBcAFAAW8BeQFRAUEBagRLBH8BbgEeAGgBmgFUAWoBmAGWAUsBmQGYAUcBnAGZAR4AogGdAZEBnwGlAY0BpwGfAawBowGgAb4BogGmARQApAGjAVcBpgGlAcgBuAGnAR8BqwHBASABtQGrAVgBaQS1ASAAtwG2ATsBuAEJAR4BugErAi8BKwFMATcBvAG6AX0BvQG8ARoBJwFKASsBKAFGAScBdwF7AdoCdQGNAaQBKgF3ARIBeQFBAWcBZwGBAV8BmgGuAZ4BIQENAR0BbgEiAF4BnAEeAF0BwQEdARkBugElASsCDAENAT0BlgOUA8MBXgCPATABMAGGAREBGAEcATQBNgEgARgBlwGeAX4BlwFSAZ4BXwGDAWgBoAGRAVsBMwF7ASoBMQF/ATMBVgEWAFUBVAGSAVUBIwEZADEBVAGaAVMBUgFCAVMBLQFBBCMBEQGHARcBSwGEAUcBFwGKARYBTwFQAUIEFgE/ATkBawQHAUoEUQF5AVIBUQF2AVABcQFAAZ0BSwFJAYQBTwEVAVABTgGqAU8BdAFiAYkBawRJBAcBFAEbAm0BFAGbARsCSQFFAYIBbAFhACYBbAGwAWEAYABsAS4BYACxAWwBEwFgADIBEwGyAWAAXwATATwBXwCzARMBXABfAD4BWwEpAXABXAC0AV8AgwFdAEMBXgE+AVwBXAE8AW8BXQBmASMAtAFcAJQBXAA+AR0ArAF4AR8BXQBjAWYBXQCDAWMBYwEVAWUBYwGBARUBcgEbAKEBGwCOARoAGwEPAXwBlAEdAKkBHQAiACMAmwEUAXIBmgFqAa4BFAFtARsAdgFRAZcBlQEYAJMBdgGXAYwBGAC+AWEAGAAaAL4BGACVARoApAOiAxcApwOkA8QBZwQMAUQEdAGKAWIBYgGHAV0BYgFdAYgBYgAXAH0BvwEVAEYEagR/AUUEjAF+AYcCYgDAARcAwQEZARwBNwFIAV4AvQEbAbwBJQG6AXwBSAQLAR8BCQEKAbcBtwE4AbYBdAGJAXEBaQREBLUBtQE9AasBqwEhAcEBuAEeAacBpgHJAaUBeAGsAXUBpAFpAaMBogGRAaYBkgFFAZYBowHJAaABpwGtAZ8BnwGLAaUBogEUAJ0BnAGPAZkBmQFIAZgBmAFMAZYBdgGMAWQBwAFiAMIBYgB9AQcBOQGvAWsBawEUAMcBxwHIASwBEgFDBBYAEAFYATYBcwEgABABLAFZAToBVgFVASgBOgGLAagBqAGtAU0BYwAIAR8AHwA7AXMBaAROAUIEnAOaAw8BDwEiAQ4BDQElAQ4BDAG7AQ0BZwQrAgwBCwEhAAoBCQG4AQoBCQG3AQgBYwBNAQgBkgFUAUUBkAF+Ab8BGQGYA8MBIgGaAxkBGwGeAw8BoAOeA70BGgGiA70BhgOEAzAA2gCIAzAAigOIA+YAjAPTAI4DkAOOAyoABQF3ADgEogChALAA1wCoAO0AugA2AO0A1gA1AOsAvQA+BOsAMgAzBOkA0AAyAOgAeQDQAOcA2ADTAOcA0wCMA+YApgCnADQE+gC6AIIAugDtAPsA1wBAAKgAQABqAEUArwCgAM0AagCcALsAnQD6AOUA1QCdAL8AiwA8BAQBnAAlAMkAJQAGASYABgE+AIoAxgB4AO4A7gDwACsAOwRpAJEAqwCpAFcAqQCtAFUArQBmAFQAPgAGAVAAnABqAEgAagBAAE4AZAAkAE0ArACwAFcAJABkAEcAJACMAEoAaABBAIAAjAAkAEgAQADXAEYA2ADUACwA1AC4AEIAuAD5ADgAtQBsAIQAPgS9ADIEvQDrADYA6wA6BNYAMQAzAHkAeQDaADEAZgCtAPQAKgDcANkAKQAtAAMBPwR3ADkEAQF2AOsCPwAFATcE2wADAXgAcACYAG0AbwBuAJgAbgBrAJMAuADpAPkAAwGCAykA2wCEAwMBTABYAAABngAAAS8A/gAvAPEAdwBWAGkA8QACAVoAowCkAFYAZwCIAP8ASwKLAD8A/wDhAIMAsgD4APcA9wD9AEQA5wDmAHkAngBnAAABAAH/AEwAtAB0AOAAQwDgAJAAdAByAJIAkACSAI8ANAB9ANYA+AC3AP0A/QD2AFkARACPAPcAwwC5AIYAuQC3AJkA9wD1ALIAOgA5APMAtQDMAIUAuQDzALcAOwA6AOIAwwDiALkAPAA7APIAxwDyAMMAPQA8AIkAzwCJAMcAWgA9APEA/gDxAM8AswCwAHMAZgRSADYE0QA2BIgAKwCUAO4AbQCTAGwA4ABDAKYAtADgAKUAcwCsAHEAzAC1AFAAkQB/AKUAswB8AKMAxgDuADUEPgC2ALwAkQClADQEtgBrAN8AsQBxAK4AawBuAN4AAQEQA9IAsACzAKIATwBTAKIAdgABAcQArwBbAKAAiwAEAaAAegB2AMIAfgB6AMsAzABkAJoAsgByAI0AogCjAE8ABQFPAHcA2QDVAN0AKgDZAMEAbgBvAOQAbwBmAMUAwQCSAyoA1ADoALgAMgDQADME0wDYANwAcAD8AJgAtwD4AJcA5wDoANgABQE/AE8AcgB0AJYAdAC0AI4AQAR+AOMAjABoAEkAFgN6ACcAqwCvAM4AqQCrAMoAeAAxANsAxgAzAHgArQCpAL4ANQQzBMYA7QDsANcA+gAyBLoAnQA4APoA1QBCAJ0A2QAsANUAQQBGANYAnABIACUALwBKAJ4AJQBHAAYB/gBNAC8AaABOAEEAjABIAGgAzABQAGQArgBUAPwAqgBVAK4ArABXAKoAoAChAIsAsQD8AI0AegAWA3YApQCkALQAbAC1AIYAiAB9ANEAXgAwAfQAZwCAAIgAtgCEAGsAwwCGAMcAsgCNAPgAngBJAGcAcwCOALMAcQCWAHMAqwBXAK8AuwA6AUUAcACXAPwAbwCYAGYAHwBzAfsAsQCNAHEAzwCaAP4AvwA2Ad0APgBQALYAxwCFAM8AbQCZAHAAbACGAG0AFwNGA3UDRgMtAWwDLQEjAcgAIwExAdIAMQEzAcQAMwEqAcIAKgESAcsAEgEWAOMAFgBWAQQBVgEoAZ8AKAEnAc0AJwErAc4AKwE3AcoAvgA3AfQAMAERAcUAEQEXAeQAFwEWAd4AFgE5Ad8AOQFrAbwAawHHAYoAxwEsASYALAE6AckAqAFNAUUATQFjAKgAYwAfAO8AcwEQAYIAEAE2AeUAGAE0Ad0ANAGUA8EAMQQuBC8EKgQtBCwEJwQoBCYE+gMhBBgE+QMYBB0E+AMdBCUE/gP9Ax8E9gMgBBwEAQQeBBkE+gMOBA8EAQQNBAsEAAQLBAkE/wMJBAcE9gMFBAgE/QMGBAME6gPoAwsE6APsAwkE7APuAwcE8APtAwgE7wPxAwME6QPzAw8EDATnA+kDCgTrA+cDCATtA+sDBwTuA+8DBATyA/ADEAT0A+oDDQQBBAIEHgQBBAAEIgQABP8DIwT/A/4DBgT9A/4DHwT9A/wDIQT6A/sDDgT6A/kDDAT5A/gDCgT4A/cDIAT2A/cDBQT2A/UDEgQRBOkDEwQSBOcDFAQTBOsDFAQVBO8DFgQVBPADFwQRBOoD6gMRBBIE6AMSBBME7AMTBBQE8AMVBBQE7wMVBBYE6QMRBBcE5APaA7YD3gPcA7cD3QPgA7kD4QPfA7kD5QPhA7oD4wPlA7sDtgPZA+MDtwPbA90DuQPfA94DuQPgA+IDugPiA+YDuwPmA+QDyAPJA9gDrQOoA9YDwwPFA9YDwQPDA9UDvwPBA9QDrAOyA9IDrgOzA9EDxwPGA88DqgOpA88DqwOqA84DrwOrA80DwAO9A8sDvQPAA+MDyQPIA90DxgPHA94DxQPDA+IDwwPBA+YDwQO/A+QD5AO/A74D3gPHA8oD3QPIA8UD4QPEA8YD5QPCA8QD4wPAA8ID0APRA8oD1wPWA8UDzgPPA8YDzQPOA8QDzAPNA8ID0wPSA74DzAPLA7QD1wPYA7EDzwOpA64D1QPWA6gD1APVA7AD0wPUA7UDlAOWAwIAogOkAwEApAOnAwAAmgOcAwUAlgOYAwQAmAOaAwMAnAOeAwYAngOgAwgAoAOiAwcAhAOGAwkAhgOIAwoAiAOKAw0AjAOOAwsAjgOQAxEAigOMAwwAgAOCAxAAggOEAw8AkAOSAxMAkgOUAxIAAgCXA5UDAQClA6MDAACmA6UDBQCdA5sDBACZA5cDAwCbA5kDBgCfA50DCAChA58DBwCjA6EDCQCHA4UDCgCJA4cDDQCLA4kDCwCPA40DEQCRA48DDACNA4sDEACDA4EDDwCFA4MDEwCTA5EDEgCVA5MDJQMSAz4DEgMUAzsDJgMRA9wCUwMnA/UCEQNWA9IBHgMVAzoDEwNSA0UDFAMkA9QBTANIA/wCFQMdAzgDHQMvA/gCWgMrA0QDHgMkA9gBJQMmA+QCJwMqA0ADKwMuAyMDLgNeBGUE9gImAyUDBwMvA/cCZARgBDUD1AEkAx4DCgNQAyADTANOAwEDTgNPA/0CTwNSA9QBUwNYA0cDWwNVA0MDVQNdA2IDVgNZA3QDXANYA8oBWQNaAw0DWwNcA34DXQNuA9UCdwNhA9YCYQNrAw4DawN1ANYBXQRtA/ECvwJuA9QCbwNwA+UCAgPhAu0CcANyAzMDcgNzA9ACAAPdAuEC/ALeAt0CzwFfBFcEMQMtA3wDQwMrA1oDLQPgAsgC9wIvAx0DNwMdAxUDZANQA1QDwwLXAtMC2AEkAxQD1AFSAxMD0wJ3A88C2wJwA28DwwLCAvMClQOXA3kDRQMUAuYCPAPmAscC0gLOAuoC1gLsAs4CVANNAzQDCANNA1QDOQMVAx4DRwNWAxEDMQPpAuACNQPnAukCzAEMAwsDSAMKAwsDzwHZAucCUAMKAwkD+AIIAwkDVwTjAtkCPQPHAs0COgMBA/0CQAPNAswCBgMFA1kE9QLMAu8CvQJjBCgALwMHAwgDLAMHAwYD9gInA1MD/wIBAzoDywIFAwYDYAMEAwUDGAMqAz8DNwBjBL0CLgDKAiMDUQPKAi4A+wL/AjgDFwIiA9wCZgMiAxcCIgMWAuQCZwMWAiIDFgLJAugCaAPJAhYCyQIVAvICaQMVAskCFQISAvQC3wIRAyYDagMSAhUCEwI5A/kC/QLUAfoC9AIUAxID8gISAyUDHAMTAtkBEgJqA0oD9AISAtMBLgNiA9UCGQMTAhwDOQMTAhkDywIZAxsDNwMZA8sC0QEoA1cDRAPRAdABxQLRAjID0wFKA18D2AHTAdkBygJRAygDIANQA2QDIwPKAtEBBwMsA00DzgFLA0kDTQMsA0IDdAPOARcC0AHOAXQDSwPOAdABowOlA80BpQOmA3oDwgJYBFwEQAMqAxgDPQMYAxMDEwMYAz4DZANhBGIEzQEYAjMDywFaAWEENQNgBF8ENANCA3sDdgMYAs0BzwJ3A9IC/gLtAhQC0QJzA3IDcAPbAjIDlQBeBNUCwAK/Am0D7gJtA10EPwMqAycDXAR1AGsD8wJrA2ED1wJhA3cD1AJuA10DfwNcA1sDYgMuAysDHwNaA1kDRwNYA1wD+wJIA0wDfwNZA1YDYwNdA1UDQQNVA1sDygFYA1MDRQNSA08D/gJPA04DAgNOA0wDQgMsAxoDGAJ2A3gDMwMYAr0CZQPvAiEDGgNZBDYDygEhA30DfgN9A+ICWwTIAswBDgPGAuwC1gEpA8YCDwPiAvACCwMMA94CQQPwAl4DYwNeAwMDvgIZAtUB8QLVASkDBANaBFkEmwOdA8UC2ALFAsQC2wLDAsQCcQPCAsMCbwNYBMICewCVAMACbgO/AsACbQO/Ar4CAwMZAr4CCgNIA/sCNANgAVoBmQPPAnkDmwPYAs8CnwPRAsUCnwOhA3MDowPQAnMDVwTXAeMCQgM2A3sDLQMwA3wDwAA0AnoBVAQfAlIExgGAAX4ChQOHA+YBiQOQAuYBiQOLA5wCiQKNA48DjwORA+ABLQK7AlYEVwJYAmYCXgKNAqMC7AFwAqMC6wGMAqECUwRzAqECNQHoAZ8C6AGGAp4ChgIvAp0CiQKOAp0CjQOJApwCXQJcAk0EcAKwAjgCowJwArEC9gGNAl4CIAL2AfsBVgJlAoMCUgIgAnECsAJTApsCUwKLAnUCVQRBAroC2wFSAn8CvALbAdwBTQRHAlQE9AG8AkACLgJ8AqQCpgKkAuEBHwJUBEcCXwJhAg0CYwJfAgsCHAJjAgoCvAL0AQYCIAJSAv4B9gEgAgQC2gEaAgMCZgJiAg0CGgLaAf0BQgLaAQAC9wEeAjYC2gFCAv4BjQL2AfwBigKOAuIBbgKKAvgBrwJuAu4BIgJrAjoCcwJTBO0BoQJzAuwBoAKhAowC6QHnAS8CkAIvAucBYwIcAqoCkgLgAY8C4wHfAbkCLQK5AVIELAK3At4BuwL1AVEEuQKRAi4CUQT1AVAETgImAiMCJAIlAk4CIQIkAkkCnwJuAq8CgwO5At8BhQORArkCDgICArYCtgJUAuUB5QG0AqcCDAItAh8CuAKnAhACWgJZAgwCPgIdArUCQQJQBPUBlwK1AjkCrgJoAq0CswKtAvoBnAKdAi8CHQJUArYCtQK2AgICKgJqApYClgL5AUYCKAIqAkgCSAJGAkUCMwJPBIwCbQKuArMCrAKzAg8CRQL6Aa0CbwJ5AjwCbQJvAk8CsgJkAmcCqwKtAmgC7wHwAakCggJrAjsCqQJvAm0C8AHxAZgCmAJ5Am8C8QHyAagCqAJ9AnkC8gHzAT8CPwKFAn0C8wEQAqcCpwK0AoUCZgJpAikCCAJOBFECUQIkAT4CSgLhAaQCSQIjAiIC+QGWAlwClgJqAlsCYgIpAicCawKCAgYCNQJHAlsCMgJpAlkCpAJ8AkwEbAL0AXICWwJHAk0EIQJsApUCJwJnAmQCJAIhApQCgAG3AogCaQJmAlgCCQIFAlgCtwIsAnoCEQJlAlYCugJBAlYCLAIwAngCMAI0AoECGgKCAlACKAJoAkMCWQJYAgUCBQK7Ai0CiwKPApMCjwLgAXcCJQIkApoCHAIlAnsCkwN3AuABngKKAm4ChgLoATUBjgKJApICsgImAk4CrgJtAk0CngKdAo4C9QG7AgUCKgIoAkwCagIqAkQCNALAAJkCHgJCAv8BMALkAXoB3gG3AoABZQJhAoQCYQJfAoAC5wEuApEC6QF8Ai4CXwJjAnQCNQFMBHwCogKjAo0C7QGwAnAC7gFTArAC+AGLAlMC4gGPAosC/AH3AYwC/gFSAtsBAALlAVQC/QHbAbwCAwK0AuUBBAIeAvcB/gFCAh4CBgKCAhoCCgJkArICCwJgAmQCDQJiAmACVwJWAkECsgJnAkMC5AEwAiwCWgJbAmoCawIiAjwCMwI+AiQB5gIUAqoCNgIdAj4COgJsAiECPAJ5An0CQwJoAq4C/wFUAh0CRAIpAmkCTAInAikCDQJhAmUC8AJxAvsBTQImArICTgIlAhwCKQPVAbECQwJnAicCUAKFArQC7AJ1ApMCBgL0AWwCOwJ9AoUCTwIjAiYCPAIiAiMC1wHdAcUB4wLXAcYB2QLjAn4C5wLZAogC6QLnAnoC4ALpAngCyALgAoECzAHIApkCDAPMAboC3gIMA1UC3QLeAoMC4QLdAoQC7QLhAoAC7QJ0AqoCxwLmAnsCzQLHApoCzALNApQC7wLMApUCIQPvAnICfQMhA0AC4gJ9A9wB8ALiAn8CAwNeA/sBGQIDA14C1QEZAqUCxgIpAzgC7ALGApsC6gLOApMClQPqAncCbwGJAYgBXAGIAYUBcAEuASYBnQGvAT8BWwEmARwAaAFEAYQBXQGGAY8BXgGFAR4AlgFKAUYBXwGEAYIBZwGCAUIBpAFXAY4BaAFDASIAbwEyAS4BcQE/AYoBdQGOAW0BeAFtAeoBQAGJAW8BUQFQAUEBSwR7AX8BHgBEAWgBVAFVAWoBlgFJAUsBmAFLAUcBmQFHAR4AnQEpAZEBpQFpAY0BnwGNAawBoAEcAL4BpgHIARQAowG+AVcBpQFZAcgBpwGsAR8BwQEcASABqwEgAVgBtQFYASAAtgEgADsBCQEIAR4BKwJKBC8BTAFIATcBugEvAX0BvAF9ARoBSgFMASsBRgFKAScBRQQZAEEEewFLBNoCjQFpAaQBdwExAhIBQQGBAWcBgQGDAV8BrgEVAJ4BDQEOAR0BIgA+AV4BHgCFAV0BHQEiARkBJQG7ASsCDQEhAT0BlAM0AcMBjwGGATABhgGHAREBHAHDATQBIAEcARgBngEVAH4BUgFTAZ4BgwFDAWgBkQEpAVsBewF3ASoBfwF7ATMBFgBqAVUBkgFGAVUBGQB/ATEBmgGeAVMBQgFFAVMBQQQZACMBhwGKARcBhAFEAUcBigE/ARYBUAFkAUIEPwGvATkBBwEvAUoEeQFCAVIBdgFkAVABQAEpAZ0BSQGCAYQBFQFBAVABqgEVAU8BYgGIAYkBSQTCAQcBGwLqAW0BmwFhARsCRQFCAYIBYQAcACYBsAGTAWEAbAEmAS4BsQGwAWwBYAAuATIBsgGxAWAAEwEyATwBswGyARMBXwA8AT4BKQFAAXABtAGzAV8AXQAjAEMBHgBHAUQBPgE8AVwBPAEyAW8BZgGpASMAXAAdAJQBPgEiAB0AeAFIBB8BYwFlAWYBgwGBAWMBFQGqAWUBgQFBARUBGwAaAKEBjgFXARoADwEOAXwBHQAjAKkBIgBDASMAFAEbAHIBagFHBK4BbQGOARsAUQFSAZcBGABhAJMBlwF+AYwBvgEcAGEAGgBXAb4BlQGhARoAogMaARcApAMXAMQBDAE9AUQEigGHAWIBhwGGAV0BXQGFAYgBRgSuAUcEFwAaAX0BFQCuAUYEfwEZAEUEfgGQAYcCwAHEARcAGQHDARwBSAGPAV4AGwF8AbwBugG8AXwBCwEKAR8BCgE4AbcBOAEhALYBiQFAAXEBRAQ9AbUBPQEhAasBIQEdAcEBHgGtAacByQFpAaUBrAGNAXUBaQHJAaMBkQHJAaYBRQFJAZYByQGRAaABrQGLAZ8BiwFZAaUBFACvAZ0BjwFIAZkBSAFMAZgBTAFKAZYBjAHBAmQBYgAHAcIBfQEvAQcBrwEUAGsBQgRkAcECFADIAccByAFZASwBQwRqARYAWAEgATYBIABYARABWQGLAToBVQFGASgBiwGtAagBrQEeAU0BCAE7AR8AOwEgAHMBTgFPAUIEmgMiAQ8BIgEdAQ4BJQF8AQ4BuwElAQ0BKwK7AQwBIQA4AQoBuAEfAQoBtwE7AQgBTQEeAQgBVAFTAUUBfgEVAL8BmAOWA8MBmgOYAxkBngOcAw8BngMbAb0BogOgA70BRgNBBC0BwQKMAYcCMQJ3AdoCfgBABCcAaQA7BDkEEANsA8gAhAPbADAAiAOGAzAAiAPaAOYA0wDcAI4DjgPcACoAdwA/BDgEoQBbALAAqADvAO0ANgDsAO0ANQDsAOsAPgQ6BOsAMwTqAOkAMgDpAOgA0ADoAOcA0wDmAOcAjAOKA+YApwA9BDQEugD7AIIA7QDvAPsAQABFAKgAagC7AEUAoACfAM0AnADJALsA+gCCAOUAnQDlAL8APATjAAQBJQAmAMkABgGKACYAkQA0BDsEPgC8AIoAeADwAO4A8AAtACsAaQB/AJEAqQBVAFcArQBUAFUAZgBRAFQABgFLAFAAagBOAEgAQABGAE4AJABKAE0AsABbAFcAZABLAEcAjABJAEoAQQB9AIAAJABHAEgA1wA1AEYA1ABCACwAuAA4AEIA+QB2AjgAbACBAIQAvQA2ADIE6wDsADYAOgQ0ANYAMwDQAHkA2gAwADEArQC+APQA3AAsANkALQDwAAMBdwBpADkEdgBlAOsCBQE4BDcEAwHwAHgAPwA3BEsCmACTAG0AbgCTAJgAawCBAJMA6QDqAPkAggOAAykAhAOCAwMBWAACAQABAAECAS8ALwACAfEAVgB/AGkAAgFYAFoApAB/AFYAiADhAP8AiwBTAD8A4QBSAIMA+AD9APcA/QBZAEQA5gDaAHkAZwD/AAAB/wCDAEwAdACSAOAA4ACSAJAAcgD1AJIAkgD1AI8AfQBBANYAtwD2AP0A9gA5AFkAjwD1APcAuQCZAIYAtwCXAJkArgD8ALEA9QByALIAOQD2APMAzACaAIUA8wD2ALcAOgDzAOIA4gDzALkAOwDiAPIA8gDiAMMAPADyAIkAiQDyAMcAPQCJAPEA8QCJAM8AsACsAHMAUgDhADYENgThAIgAlACbAO4AkwCBAGwAQwCnAKYA4ACmAKUArACqAHEAtQCEAFAAfwCkAKUAfACkAKMA7gCbADUEtgDfALwApQCmADQEawDeAN8AcQCqAK4AbgDkAN4AEAPIANIAswCjAKIAUwChAKIAAQHSAMQAWwChAKAABAGfAKAAdgDEAMIAegDCAMsAZABNAJoAcgCWAI0AowBWAE8ATwBWAHcA1QC/AN0A2QDdAMEAbwDFAOQAZgD0AMUAkgOQAyoA6ADpALgA0AAzADME2AAsANwA/ABRAJgA+ACHAJcA6ADUANgAPwBTAE8AdACOAJYAtAB8AI4AfgDLAOMAaACAAEkAegB+ACcAAQHrAhADrwDNAM4AqwDOAMoAMQAwANsAMwAxAHgAqQDKAL4AMwQzAMYA7AA1ANcAMgQ2ALoAOAB2AvoAQgA4AJ0ALABCANUARgA1ANYASABHACUASgBJAJ4ARwBLAAYBTQBKAC8ATgBGAEEASABOAGgAUABLAGQAVABRAPwAVQBUAK4AVwBVAKoAoQBTAIsA/ACHAI0AFgNlAHYApAB8ALQAtQCFAIYAfQA0ANEAMAHFAPQAgAB9AIgAhACBAGsAhgCFAMcAjQCHAPgASQCAAGcAjgB8ALMAlgCOAHMAVwBbAK8AOgGoAUUAlwCHAPwAmABRAGYAcwGCAPsAjQCWAHEAmgBNAP4ANgEYAd0AUACEALYAhQCaAM8AmQCXAHAAhgCZAG0ARgNsA3UD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",
        byteLength: 48284
    }],
    materials: [{
        pbrMetallicRoughness: {
            baseColorFactor: [.5, .5, .5, 1],
            metallicFactor: .5,
            roughnessFactor: .5
        }
    }]
};
let de = "webp"
  , Qe = "1920";
(navigator.userAgent.includes("Version/13") || navigator.userAgent.includes("Version/14")) && navigator.userAgent.includes("Safari") && !navigator.userAgent.includes("Chrome") && (de = "jpg",
Qe = "2000");
const pe = [{
    name: "WIMFC_diffuse",
    path: "https://images.ctfassets.net/fzn2n1nzq965/48bjCo7hZ07iMN45fVi0XW/154fa1ab150db2de6585ea1ea0c40ab3/WIMFC_diffuse.png?w=" + Qe
}, {
    name: "WIMFC_bump",
    path: "https://images.ctfassets.net/fzn2n1nzq965/1BP6fmkh8YJQGnVPFrZ5Hj/cc61d1947d2f1a91c9c9d45376d50cc5/WIMFC_bump.jpg?w=" + Qe
}, {
    name: "WIMFC_foil",
    path: "https://images.ctfassets.net/fzn2n1nzq965/1WghVN4OzScMvJlXtCD71S/a2908a652953f2040a2771905767a49e/WIMFC_foil.png?w=" + Qe
}, {
    name: "TBS_bump",
    path: "https://images.ctfassets.net/fzn2n1nzq965/3pAkRz3rZgntldyi6LEZmO/cacdc7e810f36979d85974fe876d4933/TBS_bump.png?w=" + Qe
}, {
    name: "TBS_foil",
    path: "https://images.ctfassets.net/fzn2n1nzq965/7xj5cH3oztgXLBi8Gl51DU/253a2b79fc048876e6238822ab4b44c5/TBS_foil__3_.png?w=" + Qe
}, {
    name: "TBS_diffuse",
    path: `https://images.ctfassets.net/fzn2n1nzq965/3UIFMwh9irrX147Pef5xnO/9e08761b3b69f56c3e2861603bed43de/TBS_diffuse.png?fm=${de}&q=60&w=${Qe}`
}, {
    name: "SF_diffuse",
    path: `https://images.ctfassets.net/fzn2n1nzq965/5x3yOcmVNMssgNJbAkl2jY/426a20f158a4682cd3ff44d566de4da8/SF_diffuse.png?fm=${de}&q=60&w=${Qe}`
}, {
    name: "shared_bump_buckram",
    path: "https://images.ctfassets.net/fzn2n1nzq965/2a7739fCj3KI5KYTV6RqSU/9c18f7bdbd82b496a66357430357e922/shared_bump_buckram.jpg?w=" + Qe
}, {
    name: "shared_bump_paper",
    path: "https://images.ctfassets.net/fzn2n1nzq965/5hofqL08noCppsPsdxjvso/de26fe8a37a37f6c79e39fc8be160fcd/shared_bump_paper.jpg?w=" + Qe
}, {
    name: "shared_diffuse_overlay",
    path: `https://images.ctfassets.net/fzn2n1nzq965/5kON77i1wHLP73SOBDNlJV/51e1684d6650038bc2ce70da92b53f3f/shared_diffuse_overlay.jpg?fm=${de}&q=60&w=${Qe}`
}, {
    name: "shared_diffuse_none",
    path: `https://images.ctfassets.net/fzn2n1nzq965/4AA678nVT05ZSq4ibzOUsQ/2922c45b2b649ec42d560c81c1e30106/shared_diffuse_none.jpg?fm=${de}&q=60&w=${Qe}`
}, {
    name: "shared_bump_none",
    path: `https://images.ctfassets.net/fzn2n1nzq965/5NL8NZRoh8by6UR8ZLDJZD/148a9c962eb4545a50a80b557c3e4a2f/shared_bump_none.jpg?fm=${de}&q=60&w=${Qe}`
}, {
    name: "SF_bump",
    path: `https://images.ctfassets.net/fzn2n1nzq965/2UxGW08BEH706ppN3GE1qR/6691bf729bc1344ecbc2a084f61073b8/SF_bump.png?fm=${de}&q=60&w=${Qe}`
}, {
    name: "SF_foil",
    path: `https://images.ctfassets.net/fzn2n1nzq965/4gGpwmX9KhcRMyMDWSsIko/c9b9739f55a4dec320a8bf78d56c252a/SF_foil.png?fm=${de}&q=60&w=${Qe}`
}, {
    name: "shared_foil_none",
    path: `https://images.ctfassets.net/fzn2n1nzq965/3KEDi9TMrfBkGSkWzEOtdh/bedb0c1eb3028f04159833f6f7fbfdc5/shared_foil_none.png?fm=${de}&q=60&w=${Qe}`
}, {
    name: "AEP_bump",
    path: `https://images.ctfassets.net/fzn2n1nzq965/6ofvxdT98sQkSGQVsNwvCw/7ec263469b68cfb79b258223ff584d05/AEP_bump.jpg?fm=${de}&q=60&w=${Qe}`
}, {
    name: "AEP_diffuse",
    path: `https://images.ctfassets.net/fzn2n1nzq965/7nAMwiShXZ1ZseQv9izipm/2dfc29aa312ee847de992eb00bf32919/AEP_diffuse.png?fm=${de}&q=60&w=${Qe}`
}, {
    name: "AEP_foil",
    path: "https://images.ctfassets.net/fzn2n1nzq965/6ERCAPptgpsH5jfCr1rEYO/6d7a12f79bd2af28c3efadd3a2dad2e9/AEP_foil.png?w=" + Qe
}, {
    name: "GT_bump",
    path: `https://images.ctfassets.net/fzn2n1nzq965/165Ql0VyUmqJrvek8BzP9M/8d8ef6bee43bbdb42f8c2e34c93a90a5/GT_bump.jpg?fm=${de}&q=60&w=${Qe}`
}, {
    name: "GT_diffuse",
    path: `https://images.ctfassets.net/fzn2n1nzq965/7oJ7kReVTiseh5o8rfuNEd/263ac13f97b2839aee7f1ef52119b20a/GT_diffuse.jpg?fm=${de}&q=60&w=${Qe}`
}, {
    name: "GT_foil",
    path: `https://images.ctfassets.net/fzn2n1nzq965/5e9DBYelRDQaXlBqLKvKIP/6838e04381e6c9f37927cf1dfcd9c3dd/GT_foil.png?fm=${de}&q=60&w=${Qe}`
}, {
    name: "HGH_bump",
    path: `https://images.ctfassets.net/fzn2n1nzq965/6lCgWYRcJ8RdUb3jD5GahZ/b3e29520cb2bd40fbbdc95196c5e7dbf/HGH_bump.png?fm=${de}&q=60&w=${Qe}`
}, {
    name: "HGH_diffuse",
    path: `https://images.ctfassets.net/fzn2n1nzq965/1Mu5x9yVhG5Bk4h58EV7sT/16e6fee37e30b9c28d77c7c020517a51/HGH_diffuse.png?fm=${de}&q=60&w=${Qe}`
}, {
    name: "POP_bump",
    path: `https://images.ctfassets.net/fzn2n1nzq965/5IAAo6yjRgsQWvHz2oN7T2/65b82130bd2347711821ed12b012a372/POP_bump.png?fm=${de}&q=60&w=${Qe}`
}, {
    name: "POP_diffuse",
    path: `https://images.ctfassets.net/fzn2n1nzq965/2lSAXeOJLSmdtkRSUDOs8Y/8dbcd8979a937c60002d7c51cc9e4b40/POP_diffuse.jpg?fm=${de}&q=60&w=${Qe}`
}, {
    name: "ROTP_bump",
    path: "https://images.ctfassets.net/fzn2n1nzq965/4Ca5Hhny1HtnJT8gZL83aV/3854b93ca218dca64f80f847446f777b/ROTP_bump.png?w=" + Qe
}, {
    name: "ROTP_diffuse",
    path: "https://images.ctfassets.net/fzn2n1nzq965/4VISloTqMRbo2YTMcKY3lf/9b449c95271477356c414eeb407cfae4/ROTP_diffuse.png?w=" + Qe
}, {
    name: "ROTP_foil",
    path: "https://images.ctfassets.net/fzn2n1nzq965/46jf1aRXKht6nh6N9GblL/ac1081f5d857cdc68535075491dc64e1/ROTP_foil__1_.png?w=" + Qe
}, {
    name: "SA_bump",
    path: "https://images.ctfassets.net/fzn2n1nzq965/bTOGPaootCfudD3UyCCrw/5dbdad700a8bf2a27e3985a318a2b20a/SA_bump.png?w=" + Qe
}, {
    name: "SA_diffuse",
    path: `https://images.ctfassets.net/fzn2n1nzq965/2CGmRH2GstW66s5KNTW2B5/c4f90da5ae1d4e6c19255736e7caf14b/SA_diffuse.png?fm=${de}&q=60&w=${Qe}`
}, {
    name: "SA_foil",
    path: `https://images.ctfassets.net/fzn2n1nzq965/kbRE3NhvjI0SFrPAXyEh6/b6325415ccf3a7656da18c303878ec30/SA_foil.png?fm=${de}&q=60&w=${Qe}`
}, {
    name: "TADSE_bump",
    path: `https://images.ctfassets.net/fzn2n1nzq965/4Z9N9aTPc89LYZX8vKcBLO/022240091852875588b56e8cbcd280e5/TADSE_bump.png?fm=${de}&q=60&w=${Qe}`
}, {
    name: "TADSE_diffuse",
    path: `https://images.ctfassets.net/fzn2n1nzq965/56OcExXFKWH5ibDzmGmhNT/0f77e825e04633c8bef0dd57e3f879c0/TADSE_diffuse.png?fm=${de}&q=60&w=${Qe}`
}, {
    name: "TADSE_foil",
    path: `https://images.ctfassets.net/fzn2n1nzq965/4NJ9u7zEiHd8a2kjAK6JGs/456bfbef7c6d1d7bb1e223eefe68f988/TADSE_foil.png?fm=${de}&q=60&w=${Qe}`
}, {
    name: "TDM_bump",
    path: `https://images.ctfassets.net/fzn2n1nzq965/3rg6VJWaMO4rrz0m1Rpz4g/dee54e716c40e89849982a85ea6e1512/TDM_bump.jpg?fm=${de}&q=60&w=${Qe}`
}, {
    name: "TDM_diffuse",
    path: `https://images.ctfassets.net/fzn2n1nzq965/7itLc708oUSntS10BARYE/c086759323b20781959feecf13808ab5/TDM_diffuse.jpg?fm=${de}&q=60&w=${Qe}`
}, {
    name: "TDM_foil",
    path: `https://images.ctfassets.net/fzn2n1nzq965/1UEFL6ze2ortMaoPIJH4y8/a557300ee8519d4fcf846a7310074588/TDM_foil.png?fm=${de}&q=60&w=${Qe}`
}, {
    name: "WIP_bump",
    path: `https://images.ctfassets.net/fzn2n1nzq965/5su1CiUZFjwfGEEVnG90yB/2af1e8595ea55cc2073ae605da845423/WIP_bump.png?fm=${de}&q=60&w=${Qe}`
}, {
    name: "WIP_diffuse",
    path: `https://images.ctfassets.net/fzn2n1nzq965/4yQnbUm2Lwj3uYDuSn2grX/1b65d40af95583e1f7487a84306e13a3/WIP_diffuse.png?fm=${de}&q=60&w=${Qe}`
}]
  , Be = new d
  , De = .5 * Math.PI
  , Ce = 2 * Math.PI;
class fe extends t {
    constructor(...t) {
        super(...t),
        A(this, "el", void 0),
        A(this, "isScrolling", !1),
        A(this, "isCanvasInitialized", !1),
        A(this, "isDragging", !1),
        A(this, "wasDragging", !1),
        A(this, "isWindowBlurred", !1),
        A(this, "isTransitioning", !1),
        A(this, "isPosterVisible", !1),
        A(this, "screenWidth", window.innerWidth),
        A(this, "canvasWidth", Math.min(1400, this.screenWidth)),
        A(this, "canvasHeight", window.innerHeight),
        A(this, "canvasCenterX", .5 * window.innerWidth),
        A(this, "canvasCenterY", .5 * this.canvasHeight),
        A(this, "canvasHeightScalar", 1),
        A(this, "canvasScale", 1),
        A(this, "scrollHeightArray", []),
        A(this, "maxAnisotropy", void 0),
        A(this, "isTwirling", !1),
        A(this, "isSmallScreen", document.documentElement.clientWidth < 720),
        A(this, "isXSmallScreen", document.documentElement.clientWidth < 600),
        A(this, "materialsArray", void 0),
        A(this, "bookMeshList", []),
        A(this, "bookCount", void 0),
        A(this, "activeProduct", null),
        A(this, "activeProductIndex", null),
        A(this, "oldActiveProductIndex", null),
        A(this, "centerProductIndex", 0),
        A(this, "hoveredBookSpine", null),
        A(this, "hoveredBookSpineIndex", null),
        A(this, "bookCoverMaterials", void 0),
        A(this, "filmMeshList", []),
        A(this, "productMeshList", []),
        A(this, "productCount", 0),
        A(this, "scrollY", 0),
        A(this, "oldScrollY", 0),
        A(this, "activeScrollY", 0),
        A(this, "scrollHeight", 0),
        A(this, "scrollTimeout", void 0),
        A(this, "scrollTicking", !1),
        A(this, "scrollTarget", 0),
        A(this, "scrollVelocity", 0),
        A(this, "mouseY", this.canvasCenterX),
        A(this, "mouseX", this.canvasCenterY),
        A(this, "mouseDownX", 0),
        A(this, "mouseDownY", 0),
        A(this, "dragStartRotationX", 0),
        A(this, "dragStartRotationY", 0),
        A(this, "dragEndRotationX", 0),
        A(this, "dragEndRotationY", 0),
        A(this, "bookCoverDragRotationX", 0),
        A(this, "bookCoverDragRotationY", 0),
        A(this, "mouseRotationX", void 0),
        A(this, "mouseRotationY", void 0),
        A(this, "oldMouseRotationX", void 0),
        A(this, "oldMouseRotationY", void 0),
        A(this, "bookTwirlX", 0),
        A(this, "bookTwirlY", 0),
        A(this, "yAxisDirection", 1),
        A(this, "screenHeightRatio", 1),
        A(this, "bookTriggerPercent", .5),
        A(this, "activeScrollRotationForce", 8e-4),
        A(this, "activeScrollRatio", void 0),
        A(this, "mainScrollRatio", void 0),
        A(this, "cameraScrollRatio", .0222),
        A(this, "currentTransitionSpeed", 0),
        A(this, "canvasProperties", {
            exposure: 1,
            camera: {
                position: {
                    x: 0,
                    y: 6.5,
                    z: 100,
                    startY: 6.5
                },
                rotation: {
                    x: -.06
                },
                fov: this.isXSmallScreen ? 15 : 12
            },
            bookSpine: {
                gap: -6,
                gap_small_screen: -7,
                draggingGap: 30,
                position: {
                    x: 0,
                    y: -.1,
                    z: -3
                },
                rotation: {
                    x: -De,
                    y: 0,
                    z: De
                },
                cover: {
                    position: {
                        x: 11
                    },
                    rotation: {
                        x: 0,
                        y: -De,
                        z: 0,
                        order: "ZYX"
                    }
                }
            },
            hoveredBookSpine: {
                position: {
                    z: 6
                },
                rotation: {
                    x: .45 * -Math.PI
                }
            },
            activeBook: {
                position: {
                    x: -13,
                    y: -4,
                    z: -56
                },
                rotation: {
                    x: -.5,
                    y: .35,
                    z: .15
                },
                cover: {
                    position: {
                        x: 0
                    },
                    rotation: {
                        x: 0,
                        y: -De,
                        z: 0,
                        order: "XYZ"
                    }
                }
            },
            inactiveBook: {
                position: {
                    x: -13,
                    y: -4,
                    z: -50
                },
                rotation: {
                    x: 0,
                    y: 0,
                    z: 0
                },
                cover: {
                    position: {
                        x: 0
                    },
                    rotation: {
                        x: 0,
                        y: -De,
                        z: 0,
                        order: "XYZ"
                    }
                }
            },
            filmPoster: {
                active: {
                    position: {
                        z: -113,
                        y: -85,
                        y_small_screen: -100
                    }
                },
                inactive: {
                    position: {
                        z: -200,
                        y: -125,
                        y_small_screen: -141
                    }
                }
            },
            ambientLight: {
                color: 16777215,
                intensity: .52
            },
            backLight: {
                color: 16770764,
                intensity: .5,
                position: {
                    x: -32,
                    y: 12,
                    z: -16
                }
            },
            leftLight: {
                color: 16777215,
                intensity: .6,
                position: {
                    x: 4,
                    y: 9.5,
                    z: 4.5
                }
            },
            spotlight: {
                color: 13430476,
                angle: .36,
                position: {
                    x: 24,
                    y: 5.4,
                    z: 1
                },
                intensity: .75,
                activeIntensity: .05,
                penumbra: 1,
                target: {
                    position: {
                        x: -6,
                        activeX: -14.3,
                        y: -4,
                        z: -6.5,
                        activeZ: -61,
                        posterZ: -85
                    }
                }
            }
        }),
        A(this, "scene", new lA),
        A(this, "camera", new H(this.canvasProperties.camera.fov,this.canvasWidth / this.canvasHeight,1,650)),
        A(this, "renderer", new vA({
            antialias: !1,
            alpha: !0,
            preserveDrawingBuffer: !this.isSmallScreen
        })),
        A(this, "ambientLight", new gA(this.canvasProperties.ambientLight.color)),
        A(this, "backLight", new c(2168853)),
        A(this, "leftLight", new c(this.canvasProperties.leftLight.color)),
        A(this, "spotlight", new a(this.canvasProperties.spotlight.color)),
        A(this, "bookTextures", []),
        A(this, "bookTextureLoader", new d),
        A(this, "bookTextureCount", 0),
        A(this, "preInitialization", ()=>{
            var A, e;
            null !== (A = this.materialsArray) && void 0 !== A && A.innerText && (this.bookCoverMaterials = JSON.parse(null === (e = this.materialsArray) || void 0 === e ? void 0 : e.innerText).filter(A=>!!A.material).map(A=>({
                material: A.material,
                palette: A.palette
            })),
            this.bookCount = this.bookCoverMaterials.length,
            this.initializeCamera(),
            this.initializeLights(),
            this.bookTextures = this.loadBookTextures(),
            this.loadBooks(),
            setTimeout(()=>{
                this.initialize()
            }
            , 1e3))
        }
        ),
        A(this, "initialize", ()=>{
            this.isCanvasInitialized = !0
        }
        ),
        A(this, "initializeCamera", ()=>{
            this.camera.position.set(this.canvasProperties.camera.position.x, this.canvasProperties.camera.position.y, this.canvasProperties.camera.position.z),
            this.camera.rotation.x = this.canvasProperties.camera.rotation.x,
            this.camera.aspect = this.canvasWidth / this.canvasHeight,
            this.renderer.setPixelRatio(window.devicePixelRatio),
            this.renderer.setSize(this.canvasWidth, this.canvasHeight),
            this.renderer.setClearColor(2168853, 0),
            this.renderer.powerPreference = "high-performance",
            this.renderer.domElement.classList.add("PressHomepageCanvas"),
            this.el.appendChild(this.renderer.domElement),
            this.maxAnisotropy = this.renderer.capabilities.getMaxAnisotropy()
        }
        ),
        A(this, "initializeLights", ()=>{
            this.ambientLight.intensity = this.canvasProperties.ambientLight.intensity,
            this.scene.add(this.ambientLight),
            this.backLight.position.set(this.canvasProperties.backLight.position.x, this.canvasProperties.backLight.position.y, this.canvasProperties.backLight.position.z),
            this.backLight.intensity = this.canvasProperties.backLight.intensity,
            this.scene.add(this.backLight),
            this.leftLight.position.set(this.canvasProperties.leftLight.position.x, this.canvasProperties.leftLight.position.y, this.canvasProperties.leftLight.position.z),
            this.leftLight.intensity = this.canvasProperties.leftLight.intensity,
            this.scene.add(this.leftLight),
            this.spotlight.angle = this.canvasProperties.spotlight.angle,
            this.spotlight.position.set(this.canvasProperties.spotlight.position.x, this.canvasProperties.spotlight.position.y, this.canvasProperties.spotlight.position.z),
            this.spotlight.intensity = this.canvasProperties.spotlight.intensity,
            this.spotlight.penumbra = this.canvasProperties.spotlight.penumbra,
            this.spotlight.target.position.set(this.canvasProperties.spotlight.target.position.x, this.canvasProperties.spotlight.target.position.y, this.canvasProperties.spotlight.target.position.z),
            this.scene.add(this.spotlight),
            this.scene.add(this.spotlight.target)
        }
        ),
        A(this, "paintWithBooks", ()=>{
            this.renderer.autoClearColor = !1
        }
        ),
        A(this, "updateLights", ()=>{
            this.updateSpotlight(),
            this.updateBackLight()
        }
        ),
        A(this, "updateBackLight", ()=>{
            const A = this.backLight.color;
            let e = this.activeProduct ? this.activeProduct.backgroundColor : new r(2168853);
            null !== this.hoveredBookSpineIndex && this.isDragging && (e = this.bookMeshList[this.hoveredBookSpineIndex].backgroundColor),
            A.r += this.currentTransitionSpeed * (e.r - A.r),
            A.g += this.currentTransitionSpeed * (e.g - A.g),
            A.b += this.currentTransitionSpeed * (e.b - A.b),
            this.backLight.color = A
        }
        ),
        A(this, "updateSpotlight", ()=>{
            this.spotlight.position.x = this.canvasProperties.spotlight.position.x,
            this.spotlight.position.y = this.canvasProperties.camera.position.y,
            this.spotlight.target.position.y = this.canvasProperties.camera.position.y - 6.5,
            this.activeProduct ? (this.spotlight.intensity = this.canvasProperties.spotlight.activeIntensity * this.canvasProperties.exposure,
            this.spotlight.target.position.x = this.canvasProperties.spotlight.target.position.activeX,
            this.spotlight.target.position.z = this.canvasProperties.spotlight.target.position.activeZ) : (this.spotlight.intensity = this.canvasProperties.spotlight.intensity * this.canvasProperties.exposure,
            this.spotlight.target.position.x = this.canvasProperties.spotlight.target.position.x,
            this.spotlight.target.position.z = this.canvasProperties.spotlight.target.position.z)
        }
        ),
        A(this, "loadBookTextures", ()=>pe.reduce((A,e)=>(A[e.name] = this.bookTextureLoader.load(e.path, A=>(this.bookTextureCount += 1,
        this.bookTextureCount === pe.length && this.el.dispatchEvent(new CustomEvent("Page:movement",{
            bubbles: !0
        })),
        A)),
        A[e.name].name = e,
        A[e.name].anisotropy = 8,
        A), {})),
        A(this, "loadBooks", ()=>{
            for (let A = 0; A < this.bookCoverMaterials.length; A += 1)
                this.loadBook(A)
        }
        ),
        A(this, "loadBook", A=>{
            const e = new wA({
                vertexShader: "\n\nvarying vec2 vUv;\nvarying vec3 vViewPosition;\nvarying vec3 vNormal;\n\nuniform float thickness;\n\n// Thickness of the base mesh in centimeters\nconst float modelThickness = 3.374;\n\nvoid main() {\n  vUv = vec2(uv.x, 1.0 - uv.y);\n\n  // Normals\n\n  vec3 objectNormal = vec3( normal );\n  vec3 transformedNormal = normalMatrix * objectNormal;\n  vNormal = normalize( transformedNormal );\n\n  // Book thickness\n\n  vec3 transformed = vec3( position );\n  float thicknessDelta = (thickness - modelThickness) / 2.0;\n\n  if (transformed.x > 1.0) transformed.x += thicknessDelta;\n  else if (transformed.x < -1.0) transformed.x -= thicknessDelta;\n\n  // Projection\n\n  vec4 mvPosition = vec4( transformed, 1.0 );\n  mvPosition = modelViewMatrix * mvPosition;\n\n  gl_Position = projectionMatrix * mvPosition;\n\n  vViewPosition = - mvPosition.xyz;\n}",
                fragmentShader: "\n\n#define PHONG\n\nvarying vec2 vUv;\n\nuniform vec3 specular;\nuniform float shininess;\nuniform float reflectiveness;\n\nuniform sampler2D diffuseMapBase;\nuniform sampler2D diffuseMapCustom;\nuniform vec3 diffuseBaseColor;\n\nuniform sampler2D bumpMapBase;\nuniform sampler2D bumpMapCustom;\nuniform float bumpScaleBase;\nuniform float bumpScaleCustom;\n\nuniform sampler2D foilMap;\nuniform float foilDetail;\nuniform float foilOpacity;\nuniform float foilSpecular;\nuniform float foilEmissive;\nconst vec2 foilUvSize = vec2(0.14, -0.19);\n\n#include <common>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <lights_phong_pars_fragment>\n\n//\n// Utils\n//\n\nfloat blendOverlay(float base, float blend) {\n  return base < 0.5\n    ? 2.0 * base * blend\n    : 1.0 - 2.0 * (1.0 - base) * (1.0 - blend);\n}\n\nfloat blendOverlay(float base, float blend, float opacity) {\n  return blendOverlay(base, blend) * opacity + base * (1.0 - opacity);\n}\n\nvec4 blendOverlay(vec4 base, vec4 blend) {\n  return vec4(\n    blendOverlay(base.r, blend.r),\n    blendOverlay(base.g, blend.g),\n    blendOverlay(base.b, blend.b),\n    (base.a + blend.a) / 2.0\n  );\n}\n\nvec4 blendOverlay(vec4 base, vec4 blend, float opacity) {\n  return vec4(\n    blendOverlay(base.r, blend.r, opacity),\n    blendOverlay(base.g, blend.g, opacity),\n    blendOverlay(base.b, blend.b, opacity),\n    (base.a + blend.a) / 2.0\n  );\n}\n\n//\n// Bump map functions\n//\n\nvec2 dHdxy_fwd() {\n\n  vec2 dSTdx = dFdx( vUv );\n  vec2 dSTdy = dFdy( vUv );\n\n  float inverseFoilCoverage = 1.0 - texture2D( foilMap, vUv ).r * foilOpacity;\n\n  float scaleMax = max(bumpScaleBase, bumpScaleCustom);\n  float scaleBaseNorm = bumpScaleBase / scaleMax;\n  float scaleCustomNorm = bumpScaleCustom / scaleMax;\n\n  float Hll = scaleMax * blendOverlay(\n    0.5 + (texture2D( bumpMapBase,   vUv ).x - 0.5) * scaleBaseNorm * inverseFoilCoverage,\n    0.5 + (texture2D( bumpMapCustom, vUv ).x - 0.5) * scaleCustomNorm\n  );\n  float dBx = scaleMax * blendOverlay(\n    0.5 + (texture2D( bumpMapBase,   vUv + dSTdx ).x - 0.5) * scaleBaseNorm * inverseFoilCoverage,\n    0.5 + (texture2D( bumpMapCustom, vUv + dSTdx ).x - 0.5) * scaleCustomNorm\n  ) - Hll;\n  float dBy = scaleMax * blendOverlay(\n    0.5 + (texture2D( bumpMapBase,   vUv + dSTdy ).x - 0.5) * scaleBaseNorm * inverseFoilCoverage,\n    0.5 + (texture2D( bumpMapCustom, vUv + dSTdy ).x - 0.5) * scaleCustomNorm\n  ) - Hll;\n\n  return vec2( dBx, dBy );\n\n}\n\nvec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {\n\n  // Workaround for Adreno 3XX dFd*( vec3 ) bug. See #9988\n\n  vec3 vSigmaX = vec3( dFdx( surf_pos.x ), dFdx( surf_pos.y ), dFdx( surf_pos.z ) );\n  vec3 vSigmaY = vec3( dFdy( surf_pos.x ), dFdy( surf_pos.y ), dFdy( surf_pos.z ) );\n  vec3 vN = surf_norm;\t\t// normalized\n\n  vec3 R1 = cross( vSigmaY, vN );\n  vec3 R2 = cross( vN, vSigmaX );\n\n  float fDet = dot( vSigmaX, R1 ) * faceDirection;\n\n  vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );\n  return normalize( abs( fDet ) * surf_norm - vGrad );\n\n}\n\n//\n// Main\n//\n\nvoid main() {\n\n  vec3 normal = perturbNormalArb( -vViewPosition, vNormal, dHdxy_fwd(), 1.0 );\n\n  // Combine diffuse textures\n\n  vec4 diffuseColor = blendOverlay(\n    texture2D( diffuseMapBase, vUv ),\n    texture2D( diffuseMapCustom, vUv )\n  );\n\n  if (diffuseColor.rgb == vec3(0.0, 0.0, 0.0)) {\n    diffuseColor = vec4(diffuseBaseColor, 1.0);\n  }\n\n  // Foil\n\n  vec2 foilIndex = vec2(\n    sin(-normal.y * foilDetail  +  vViewPosition.y * foilDetail / 10.0),\n    cos(-normal.x * foilDetail  +  vViewPosition.x * foilDetail / 10.0)\n  ) / 2.0;\n  foilIndex = vec2(0.0, 1.0) + foilUvSize / 2.0 + foilIndex * foilUvSize;\n\n  vec4 foilColor = texture2D( diffuseMapCustom, foilIndex );\n  float foilCoverage = texture2D( foilMap, vUv ).r;\n\n  if (foilColor.rgb == vec3(0.0, 0.0, 0.0)) {\n    foilColor = vec4(diffuseBaseColor, 1.0);\n    foilCoverage = foilColor.r;\n  }\n\n  diffuseColor = mix(diffuseColor, foilColor, foilCoverage * foilOpacity);\n\n  // Lighting\n\n  float specularStrength = reflectiveness + foilCoverage * foilSpecular;\n\n  ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\n  #include <lights_phong_fragment>\n  #include <lights_fragment_begin>\n  #include <lights_fragment_maps>\n  #include <lights_fragment_end>\n\n  vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse\n                      + reflectedLight.directSpecular + reflectedLight.indirectSpecular;\n\n  outgoingLight = mix(outgoingLight, foilColor.rgb, foilCoverage * foilEmissive * foilOpacity);\n\n  gl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\n}",
                uniforms: {
                    specular: {
                        type: "c",
                        value: new r(16777215)
                    },
                    shininess: {
                        value: 10
                    },
                    reflectiveness: {
                        value: .1
                    },
                    thickness: {
                        value: 1.4
                    },
                    diffuseMapBase: {
                        type: "t",
                        value: this.bookTextures.shared_diffuse_overlay
                    },
                    diffuseBaseColor: {
                        type: "vec3"
                    },
                    diffuseMapCustom: {
                        type: "t"
                    },
                    bumpMapBase: {
                        type: "t",
                        value: this.bookTextures.shared_bump_buckram
                    },
                    bumpMapCustom: {
                        type: "t"
                    },
                    bumpScaleBase: {
                        value: .05
                    },
                    bumpScaleCustom: {
                        value: .1
                    },
                    foilMap: {
                        type: "t"
                    },
                    foilDetail: {
                        value: .5
                    },
                    foilEmissive: {
                        value: 0
                    },
                    foilOpacity: {
                        value: 1
                    },
                    foilSpecular: {
                        value: .1
                    },
                    ...uA.lights
                },
                lights: !0,
                defines: {
                    USE_UV: "",
                    USE_MAP: "",
                    USE_BUMPMAP: ""
                },
                extensions: {
                    derivatives: !0
                }
            });
            (new pA).parse(JSON.stringify(ue), "", t=>{
                const s = t.scene;
                s.matrixWorldNeedsUpdate = !0;
                const n = this.bookCoverMaterials[A];
                s.children[0].material = e,
                s.cover = s.getObjectByName("book");
                const i = null === this.activeProductIndex ? this.canvasProperties.bookSpine : this.canvasProperties.inactiveBook;
                s.cover.rotation.order = i.cover.rotation.order,
                this.scene.add(s),
                Object.entries(n.material).forEach(([A,t])=>{
                    let s = t;
                    "diffuseMapCustom" !== A && "bumpMapBase" !== A && "bumpMapCustom" !== A && "foilMap" !== A || (s = this.bookTextures[t]),
                    e.uniforms[A].value = s
                }
                ),
                s.backgroundColor = new r(n.palette.backgroundColor),
                s.color = new r(n.palette.color),
                s.position.set(i.position.x, i.position.y, -1e3),
                this.setActiveBookRotationOrder(),
                s.cover.rotation.set(i.cover.rotation.x, i.cover.rotation.y, i.cover.rotation.z),
                s.rotation.set(i.rotation.x, i.rotation.y, i.rotation.z),
                this.bookMeshList[A] = s;
                this.bookMeshList.reduce((A,e)=>e ? A + 1 : A, 0) === this.bookCount && (this.productMeshList.push(...this.bookMeshList),
                this.initScene())
            }
            )
        }
        ),
        A(this, "loadFilmPoster", ()=>{
            const A = Be.load("https://images.ctfassets.net/fzn2n1nzq965/2bVqdjWtT4vYI9svLddJvY/b8a28464406a5a37a2ad8d4a81512f19/WAAG_poster.png?fm=jpg&q=55&w=1000");
            A.anisotrophy = this.maxAnisotropy;
            const e = new dA(22,30,99,99)
              , t = new QA({
                map: A,
                side: z,
                transparent: !0
            })
              , s = new I(e,t);
            s.position.z = -200,
            s.position.y = -200,
            s.material.opacity = 0,
            e.initialAttributes = JSON.parse(JSON.stringify(e.attributes)),
            s.color = new r(16767299),
            s.backgroundColor = new r(1579032),
            this.filmMeshList.push(s),
            this.productMeshList.push(...this.filmMeshList),
            this.productCount = this.productMeshList.length,
            this.scene.add(s),
            this.el.dispatchEvent(new CustomEvent("Page:canvasFinishedLoading",{
                bubbles: !0
            }))
        }
        ),
        A(this, "initScene", ()=>{
            if (e.info("Initializing scene attempt", performance.now()),
            !this.isCanvasInitialized)
                return void requestAnimationFrame(this.initScene);
            e.info("All books loaded initializing scene", performance.now());
            const A = null === this.activeProductIndex ? 3 : -4
              , t = null === this.activeProductIndex ? 3 : 100
              , s = null === this.activeProductIndex ? this.canvasProperties.bookSpine : this.canvasProperties.inactiveBook;
            this.bookMeshList.forEach((e,n)=>{
                const i = -n * t + A;
                e.position.set(s.position.x, i, -50 - 150 * Math.sin(n / 8))
            }
            ),
            requestAnimationFrame(()=>{
                this.el.dispatchEvent(new CustomEvent("Page:canvasReady",{
                    bubbles: !0
                })),
                this.loadFilmPoster()
            }
            )
        }
        ),
        A(this, "render", ()=>{
            this.scrollVelocity *= .4,
            this.el.dispatchEvent(new CustomEvent("Page:canvasCameraMoved",{
                bubbles: !0
            })),
            this.updateCameraY(),
            this.isWindowBlurred || this.isTransitioning || (this.updateLights(),
            this.transformBooks(),
            this.transformFilmPoster(),
            this.currentTransitionSpeed = Math.min(.15, this.currentTransitionSpeed + .006),
            this.renderer.render(this.scene, this.camera))
        }
        ),
        A(this, "transformResetBookList", ()=>{
            if (!this.oldActiveProductIndex)
                return;
            let A = this.canvasProperties.activeBook.position.y;
            const e = this.canvasProperties.bookSpine
              , t = this.isXSmallScreen ? e.gap_small_screen : e.gap;
            for (let s = 0; s < this.bookMeshList.length; s += 1) {
                const n = this.bookMeshList[s]
                  , i = A + 100 * (this.oldActiveProductIndex - s);
                let o = n.cover.rotation.x
                  , r = n.cover.rotation.y;
                n.position.y = i,
                A += t,
                o += this.currentTransitionSpeed * (e.cover.rotation.x - n.cover.rotation.x),
                r += this.currentTransitionSpeed * (e.cover.rotation.y - n.cover.rotation.y),
                n.cover.rotation.x = o,
                n.cover.rotation.y = r,
                this.transformBook(n, e)
            }
        }
        ),
        A(this, "transformBooks", ()=>{
            this.activeProduct ? this.transformBookDetailsList() : this.transformBookList()
        }
        ),
        A(this, "transformBookList", ()=>{
            let A = 0;
            const e = this.canvasProperties.bookSpine
              , t = this.isXSmallScreen ? e.gap_small_screen : e.gap
              , s = e.cover.position.x;
            for (let n = 0; n < this.bookMeshList.length; n += 1) {
                const i = this.bookMeshList[n];
                let o = A
                  , r = i.cover.rotation.x
                  , a = i.cover.rotation.y;
                this.isDragging && null !== this.hoveredBookSpineIndex && (o += (this.hoveredBookSpineIndex - n) * e.draggingGap),
                A += t,
                i.position.y += this.currentTransitionSpeed * (o - i.position.y),
                r += this.currentTransitionSpeed * (this.canvasProperties.bookSpine.cover.rotation.x - i.cover.rotation.x),
                a += this.currentTransitionSpeed * (this.canvasProperties.bookSpine.cover.rotation.y - i.cover.rotation.y),
                null !== this.hoveredBookSpineIndex && n === this.hoveredBookSpineIndex && (this.hoveredBookSpine.position.z += .1 * (this.canvasProperties.hoveredBookSpine.position.z - i.position.z),
                this.isDragging && (r = this.bookCoverDragRotationX,
                a = this.bookCoverDragRotationY)),
                this.updateCoverRotation(n, r, a),
                i.cover.position.x += this.currentTransitionSpeed * (s - i.cover.position.x),
                this.transformBook(i, e)
            }
        }
        ),
        A(this, "transformBookDetailsList", ()=>{
            let A = this.canvasProperties.activeBook.position.y;
            for (let e = 0; e < this.bookMeshList.length; e += 1) {
                const t = this.bookMeshList[e]
                  , s = this.activeProduct === t ? this.canvasProperties.activeBook : this.canvasProperties.inactiveBook
                  , n = this.scrollHeightArray[e] * -this.cameraScrollRatio
                  , i = A
                  , o = s.cover.position.x;
                let r = t.cover.rotation.x
                  , a = t.cover.rotation.y;
                t.position.y = i,
                A += n,
                this.activeProduct === t ? (this.bookTwirlX || this.bookTwirlY) && (r -= this.bookTwirlX,
                a -= this.bookTwirlY) : (r += this.currentTransitionSpeed * (this.canvasProperties.bookSpine.cover.rotation.x - t.cover.rotation.x),
                a += this.currentTransitionSpeed * (this.canvasProperties.bookSpine.cover.rotation.y - t.cover.rotation.y)),
                t.cover.rotation.x = r % Ce,
                t.cover.rotation.y = a % Ce,
                t.cover.position.x += this.currentTransitionSpeed * (o - t.cover.position.x),
                this.transformBook(t, s)
            }
        }
        ),
        A(this, "transformBook", (A,e)=>{
            const t = A === this.activeProduct ? this.activeScrollY * this.activeScrollRotationForce : 0
              , s = this.isXSmallScreen ? e.rotation.x + .16 : e.rotation.x;
            A.position.x += this.currentTransitionSpeed * (e.position.x - A.position.x),
            A.position.z += this.currentTransitionSpeed * (e.position.z - A.position.z),
            A.rotation.x += this.currentTransitionSpeed * (s - A.rotation.x + this.scrollVelocity),
            A.rotation.y += this.currentTransitionSpeed * (e.rotation.y + t - A.rotation.y),
            A.rotation.z += this.currentTransitionSpeed * (e.rotation.z - A.rotation.z)
        }
        ),
        A(this, "updateCoverRotation", (A,e,t)=>{
            this.bookMeshList[A].cover.rotation.x = e % Ce,
            this.bookMeshList[A].cover.rotation.y = t % Ce
        }
        ),
        A(this, "setSpineRotation", (A,e)=>{
            this.bookCoverDragRotationX = A % Ce,
            this.bookCoverDragRotationY = e % Ce
        }
        ),
        A(this, "setActiveBookRotationOrder", ()=>{
            null === this.activeProductIndex || this.activeProductIndex > this.bookMeshList.length - 1 || (this.bookMeshList[this.activeProductIndex].cover.rotation.order = this.canvasProperties.activeBook.cover.rotation.order)
        }
        ),
        A(this, "setSpineRotationOrder", ()=>{
            null === this.activeProductIndex || this.activeProductIndex > this.bookMeshList.length - 1 || (this.productMeshList[this.activeProductIndex].cover.rotation.order = this.canvasProperties.bookSpine.cover.rotation.order)
        }
        ),
        A(this, "setDragging", A=>{
            this.isDragging = A,
            this.isDragging || (this.currentTransitionSpeed = 0)
        }
        ),
        A(this, "setTransitioning", A=>{
            this.isTransitioning = A
        }
        ),
        A(this, "dragStartBook", (A,e,t,s,n,i,o,r)=>{
            this.mouseX = A,
            this.mouseY = e,
            this.mouseDownX = t,
            this.mouseDownY = s,
            this.dragEndRotationX = n,
            this.dragEndRotationY = i,
            this.dragStartRotationX = o,
            this.dragStartRotationY = r
        }
        ),
        A(this, "dragStartBookSpine", (A,e,t,s,n,i,o,r,a,P)=>{
            this.mouseX = A,
            this.mouseY = e,
            this.mouseDownX = t,
            this.mouseDownY = s,
            this.dragEndRotationX = n,
            this.dragEndRotationY = i,
            this.dragStartRotationX = o,
            this.dragStartRotationY = r,
            this.bookCoverDragRotationX = a,
            this.bookCoverDragRotationY = P
        }
        ),
        A(this, "activateDeeplink", ()=>{
            this.activeProduct && null !== this.activeProductIndex ? (this.setActiveBookRotationOrder(),
            this.activeProduct.cover.position.x = this.canvasProperties.inactiveBook.cover.position.x,
            this.activeProduct.cover.rotation.set(this.canvasProperties.inactiveBook.cover.rotation.x, this.canvasProperties.inactiveBook.cover.rotation.y, this.canvasProperties.inactiveBook.cover.rotation.z),
            this.activeProduct.position.x = this.canvasProperties.inactiveBook.position.x,
            this.activeProduct.rotation.set(this.canvasProperties.inactiveBook.rotation.x, this.canvasProperties.inactiveBook.rotation.y, this.canvasProperties.inactiveBook.rotation.z)) : requestAnimationFrame(this.activateDeeplink)
        }
        ),
        A(this, "setActiveProduct", A=>{
            this.productMeshList[A] ? (this.hideFilmPoster(),
            this.setHoveredSpine(null),
            this.currentTransitionSpeed = 0,
            this.setSpineRotationOrder(),
            this.activeProductIndex = A,
            this.setActiveBookRotationOrder(),
            this.activeProduct = this.productMeshList[A],
            this.clearRenderBuffer()) : requestAnimationFrame(()=>{
                this.setActiveProduct(A)
            }
            )
        }
        ),
        A(this, "activateProductList", ()=>{
            this.clearRenderBuffer(),
            this.setSpineRotationOrder(),
            this.oldActiveProductIndex = this.activeProductIndex,
            this.activeProductIndex = null,
            this.activeProduct = null,
            this.currentTransitionSpeed = 0,
            this.isTransitioning = !0,
            this.transformResetBookList(),
            this.updateLights(),
            this.showFilmPoster()
        }
        ),
        A(this, "clearRenderBuffer", ()=>{
            this.renderer.autoClearColor = !0
        }
        ),
        A(this, "hideFilmPoster", ()=>{
            this.filmMeshList[0] && (this.filmMeshList[0].material.opacity = 0)
        }
        ),
        A(this, "showFilmPoster", ()=>{
            null === this.activeProductIndex && (this.filmMeshList[0].material.opacity = 1)
        }
        ),
        A(this, "updateFilmPoster", (A,e)=>{
            const t = Math.min(1.4, .0017 * (e + .5 * this.canvasHeight - this.scrollY));
            if (this.isPosterVisible = null === this.activeProductIndex && this.filmMeshList.length > 0,
            null === this.activeProductIndex && t < 1.4 ? A.classList.add("PressHomepage--isFilmPoster") : A.classList.remove("PressHomepage--isFilmPoster"),
            !this.isPosterVisible)
                return;
            if (t < .08)
                return;
            let s = 1
              , n = 1
              , i = 0;
            let o;
            const r = this.filmMeshList[0].geometry.attributes
              , a = this.filmMeshList[0].geometry.initialAttributes
              , P = this.isSmallScreen ? -60 : -18;
            this.filmMeshList[0].position.z = P - 50 * (1 - t),
            this.filmMeshList[0].material.opacity = 1,
            this.filmMeshList[0].rotation.z = t / 25;
            for (let A = 0; A < 100; A += 1) {
                const e = Math.abs(A / 2 % 20 - 10);
                i += Math.cos(Math.atan(e / A)) / 5,
                (e >= 10 || e <= 0) && (s *= -1);
                for (let P = 0; P < 100; P += 1) {
                    const c = P % 50 == 0
                      , h = A % 20 == 0;
                    c && (n *= -1),
                    o = c || h ? .2 * n : 0;
                    const l = .07 * (Math.sin(Math.abs(P / 100 * 8 % 8) - 4) + Math.sin(Math.abs(A / 100 * 16 % 16) - 8 - A / 1.5)) * s
                      , v = 3 * P + 100 * A * 3
                      , g = v + 1
                      , w = v + 2;
                    r.position.array[w] = a.position.array[w] + (e + 4 * l + o) * t,
                    r.position.array[g] = a.position.array[g] + i * t,
                    r.normal.array[v] = a.normal.array[v] + (e / 10 * s + l + o) * t * 3,
                    r.normal.array[g] = a.normal.array[g] + (e / 10 * s * l + o) * t * 3,
                    r.normal.array[w] = a.normal.array[w] + (e / 10 * s + l + o) * t * 3
                }
            }
            r.position.needsUpdate = !0,
            r.normal.needsUpdate = !0
        }
        ),
        A(this, "transformFilmPoster", ()=>{
            if (!this.filmMeshList[0])
                return;
            const A = this.activeProduct ? this.canvasProperties.filmPoster.inactive : this.canvasProperties.filmPoster.active
              , e = this.isSmallScreen ? A.position.y_small_screen : A.position.y;
            this.filmMeshList[0].position.y += this.currentTransitionSpeed * (e - this.filmMeshList[0].position.y)
        }
        ),
        A(this, "resize", (A,e,t,s,n,i,o)=>{
            this.canvasHeight = A,
            this.canvasWidth = e,
            this.canvasHeightScalar = t,
            this.canvasScale = s,
            this.isSmallScreen = n,
            this.isXSmallScreen = i,
            this.activeScrollRotationForce = o,
            this.setCameraPosition()
        }
        ),
        A(this, "setCameraPosition", ()=>{
            this.camera.position.z = this.isXSmallScreen ? 100 : 100 * this.canvasHeightScalar * this.canvasScale,
            this.canvasProperties.bookSpine.position.z = -3,
            this.camera.aspect = this.canvasWidth / this.canvasHeight,
            this.camera.updateProjectionMatrix(),
            this.renderer.setSize(this.canvasWidth, this.canvasHeight)
        }
        ),
        A(this, "setCameraY", A=>{
            const e = A * this.cameraScrollRatio;
            this.canvasProperties.camera.position.y = this.canvasProperties.camera.position.startY - e
        }
        ),
        A(this, "setCameraScrollRatio", A=>{
            this.cameraScrollRatio = A
        }
        ),
        A(this, "setScrollY", (A,e)=>{
            this.scrollVelocity = this.isSmallScreen || null !== this.activeProductIndex ? 0 : .003 * e,
            this.scrollY = A
        }
        ),
        A(this, "updateCameraY", ()=>{
            this.camera.position.y = this.canvasProperties.camera.position.y
        }
        ),
        A(this, "setBookPosition", A=>{
            this.isSmallScreen ? (this.canvasProperties.activeBook.position.z = -90,
            this.canvasProperties.activeBook.position.y = -4,
            this.canvasProperties.activeBook.position.x = 0,
            this.canvasProperties.inactiveBook.position.x = 0) : (this.canvasProperties.activeBook.position.z = -56,
            this.canvasProperties.activeBook.position.x = Math.max(-13, -13 * A),
            this.canvasProperties.inactiveBook.position.x = Math.max(-13, -13 * A))
        }
        ),
        A(this, "setDetailsScrollHeightArray", A=>{
            this.scrollHeightArray = A
        }
        ),
        A(this, "setHoveredSpine", A=>{
            this.hoveredBookSpineIndex = A;
            const e = null !== A ? this.bookMeshList[A] : null;
            this.hoveredBookSpine = e
        }
        ),
        A(this, "getHoveredSpine", ()=>{
            if (null !== this.hoveredBookSpineIndex)
                return {
                    book: this.bookMeshList[this.hoveredBookSpineIndex],
                    cover: this.bookMeshList[this.hoveredBookSpineIndex].cover
                }
        }
        ),
        A(this, "updateTwirl", (A,e)=>{
            this.bookTwirlX = A,
            this.bookTwirlY = e
        }
        ),
        A(this, "rotatePoster", (A,e)=>{
            this.filmMeshList[0].rotation.y = A / this.canvasWidth * .3,
            this.filmMeshList[0].rotation.x = e / this.canvasHeight * .3
        }
        )
    }
}
A(fe, "dependencies", []),
s.register("PressHomepageCanvas", fe);
export {fe as Canvas};
