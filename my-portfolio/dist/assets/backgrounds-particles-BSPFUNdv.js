var He=Object.defineProperty;var xe=s=>{throw TypeError(s)};var qe=(s,e,t)=>e in s?He(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var g=(s,e,t)=>qe(s,typeof e!="symbol"?e+"":e,t),re=(s,e,t)=>e.has(s)||xe("Cannot "+t);var d=(s,e,t)=>(re(s,e,"read from private field"),t?t.call(s):e.get(s)),_=(s,e,t)=>e.has(s)?xe("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(s):e.set(s,t),L=(s,e,t,i)=>(re(s,e,"write to private field"),i?i.call(s,t):e.set(s,t),t),y=(s,e,t)=>(re(s,e,"access private method"),t);import{S as _e,B as $e,M as we,a as Ze,P as Ae,b as B,I as Ce,O as Re,c as Je,j as ue,A as Ke,R as Qe,d as et,V as b,C as tt,e as it,W as st,f as ot,g as X,h as he,i as nt,k as at,l as rt,m as ce,n as ct,o as lt,p as Se,q as ht,G as mt,r as Le,s as Ee,T as dt,t as Me}from"./backgrounds-3d-B3tyhDLL.js";import{a as D}from"./vendor-BiYCeH42.js";class ft extends _e{constructor(){super();const e=new $e;e.deleteAttribute("uv");const t=new we({side:Ze}),i=new we,n=new Ae(16777215,900,28,2);n.position.set(.418,16.199,.3),this.add(n);const f=new B(e,t);f.position.set(-.757,13.219,.717),f.scale.set(31.713,28.305,28.591),this.add(f);const m=new Ce(e,i,6),o=new Re;o.position.set(-10.906,2.009,1.846),o.rotation.set(0,-.195,0),o.scale.set(2.328,7.905,4.651),o.updateMatrix(),m.setMatrixAt(0,o.matrix),o.position.set(-5.607,-.754,-.758),o.rotation.set(0,.994,0),o.scale.set(1.97,1.534,3.955),o.updateMatrix(),m.setMatrixAt(1,o.matrix),o.position.set(6.167,.857,7.803),o.rotation.set(0,.561,0),o.scale.set(3.927,6.285,3.687),o.updateMatrix(),m.setMatrixAt(2,o.matrix),o.position.set(-2.017,.018,6.124),o.rotation.set(0,.333,0),o.scale.set(2.002,4.566,2.064),o.updateMatrix(),m.setMatrixAt(3,o.matrix),o.position.set(2.291,-.756,-2.621),o.rotation.set(0,-.286,0),o.scale.set(1.546,1.552,1.496),o.updateMatrix(),m.setMatrixAt(4,o.matrix),o.position.set(-2.193,-.369,-5.547),o.rotation.set(0,.516,0),o.scale.set(3.875,3.487,2.986),o.updateMatrix(),m.setMatrixAt(5,o.matrix),this.add(m);const h=new B(e,U(50));h.position.set(-16.116,14.37,8.208),h.scale.set(.1,2.428,2.739),this.add(h);const a=new B(e,U(50));a.position.set(-16.109,18.021,-8.207),a.scale.set(.1,2.425,2.751),this.add(a);const r=new B(e,U(17));r.position.set(14.904,12.198,-1.832),r.scale.set(.15,4.265,6.331),this.add(r);const c=new B(e,U(43));c.position.set(-.462,8.89,14.52),c.scale.set(4.38,5.441,.088),this.add(c);const p=new B(e,U(20));p.position.set(3.235,11.486,-12.541),p.scale.set(2.5,2,.1),this.add(p);const x=new B(e,U(100));x.position.set(0,20,0),x.scale.set(1,.1,1),this.add(x)}dispose(){const e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(const t of e)t.dispose()}}function U(s){const e=new Je;return e.color.setScalar(s),e}var z,O,G,H,q,J,$,k,Z,N,l,De,Fe,ke,Te,ee,Be,me,Ie,Oe,de,fe,te,Ne,Ve;class ut{constructor(e){_(this,l);_(this,z);_(this,O);_(this,G);_(this,H);_(this,q);_(this,J,0);_(this,$,new tt);_(this,k,{elapsed:0,delta:0});_(this,Z,!1);_(this,N,!1);g(this,"canvas");g(this,"camera");g(this,"cameraMinAspect");g(this,"cameraMaxAspect");g(this,"cameraFov");g(this,"maxPixelRatio");g(this,"minPixelRatio");g(this,"scene");g(this,"renderer");g(this,"size",{width:0,height:0,wWidth:0,wHeight:0,ratio:0,pixelRatio:0});g(this,"render",y(this,l,Ne).bind(this));g(this,"onBeforeRender",()=>{});g(this,"onAfterRender",()=>{});g(this,"onAfterResize",()=>{});g(this,"isDisposed",!1);L(this,z,{...e}),y(this,l,De).call(this),y(this,l,Fe).call(this),y(this,l,ke).call(this),this.resize(),y(this,l,Te).call(this)}resize(){let e,t;d(this,z).size instanceof Object?(e=d(this,z).size.width,t=d(this,z).size.height):d(this,z).size==="parent"&&this.canvas.parentNode?(e=this.canvas.parentNode.offsetWidth,t=this.canvas.parentNode.offsetHeight):(e=window.innerWidth,t=window.innerHeight),this.size.width=e,this.size.height=t,this.size.ratio=e/t,y(this,l,Be).call(this),y(this,l,Ie).call(this),this.onAfterResize(this.size)}updateWorldSize(){if(this.camera.isPerspectiveCamera){const e=this.camera.fov*Math.PI/180;this.size.wHeight=2*Math.tan(e/2)*this.camera.position.length(),this.size.wWidth=this.size.wHeight*this.camera.aspect}else if(this.camera.isOrthographicCamera){const e=this.camera;this.size.wHeight=e.top-e.bottom,this.size.wWidth=e.right-e.left}}get postprocessing(){return d(this,O)}set postprocessing(e){L(this,O,e),this.render=e.render.bind(e)}clear(){this.scene.traverse(e=>{e.isMesh&&typeof e.material=="object"&&e.material!==null&&(Object.keys(e.material).forEach(t=>{const i=e.material[t];i&&typeof i=="object"&&typeof i.dispose=="function"&&i.dispose()}),e.material.dispose(),e.geometry.dispose())}),this.scene.clear()}dispose(){var e;y(this,l,Ve).call(this),y(this,l,te).call(this),this.clear(),(e=d(this,O))==null||e.dispose(),this.renderer.dispose(),this.isDisposed=!0}}z=new WeakMap,O=new WeakMap,G=new WeakMap,H=new WeakMap,q=new WeakMap,J=new WeakMap,$=new WeakMap,k=new WeakMap,Z=new WeakMap,N=new WeakMap,l=new WeakSet,De=function(){this.camera=new it,this.cameraFov=this.camera.fov},Fe=function(){this.scene=new _e},ke=function(){if(d(this,z).canvas)this.canvas=d(this,z).canvas;else if(d(this,z).id){const t=document.getElementById(d(this,z).id);t instanceof HTMLCanvasElement?this.canvas=t:console.error("Three: Missing canvas or id parameter")}else console.error("Three: Missing canvas or id parameter");this.canvas.style.display="block";const e={canvas:this.canvas,powerPreference:"high-performance",...d(this,z).rendererOptions??{}};this.renderer=new st(e),this.renderer.outputColorSpace=ot},Te=function(){d(this,z).size instanceof Object||(window.addEventListener("resize",y(this,l,ee).bind(this)),d(this,z).size==="parent"&&this.canvas.parentNode&&(L(this,G,new ResizeObserver(y(this,l,ee).bind(this))),d(this,G).observe(this.canvas.parentNode))),L(this,H,new IntersectionObserver(y(this,l,Oe).bind(this),{root:null,rootMargin:"0px",threshold:0})),d(this,H).observe(this.canvas),document.addEventListener("visibilitychange",y(this,l,de).bind(this))},ee=function(){d(this,q)&&clearTimeout(d(this,q)),L(this,q,window.setTimeout(this.resize.bind(this),100))},Be=function(){this.camera.aspect=this.size.width/this.size.height,this.camera.isPerspectiveCamera&&this.cameraFov&&(this.cameraMinAspect&&this.camera.aspect<this.cameraMinAspect?y(this,l,me).call(this,this.cameraMinAspect):this.cameraMaxAspect&&this.camera.aspect>this.cameraMaxAspect?y(this,l,me).call(this,this.cameraMaxAspect):this.camera.fov=this.cameraFov),this.camera.updateProjectionMatrix(),this.updateWorldSize()},me=function(e){const i=Math.tan(X.degToRad(this.cameraFov/2))/(this.camera.aspect/e);this.camera.fov=2*X.radToDeg(Math.atan(i))},Ie=function(){var t;this.renderer.setSize(this.size.width,this.size.height),(t=d(this,O))==null||t.setSize(this.size.width,this.size.height);let e=window.devicePixelRatio;this.maxPixelRatio&&e>this.maxPixelRatio?e=this.maxPixelRatio:this.minPixelRatio&&e<this.minPixelRatio&&(e=this.minPixelRatio),this.renderer.setPixelRatio(e),this.size.pixelRatio=e},Oe=function(e){L(this,Z,e[0].isIntersecting),d(this,Z)?y(this,l,fe).call(this):y(this,l,te).call(this)},de=function(){d(this,Z)&&(document.hidden?y(this,l,te).call(this):y(this,l,fe).call(this))},fe=function(){if(d(this,N))return;const e=()=>{L(this,J,requestAnimationFrame(e)),d(this,k).delta=d(this,$).getDelta(),d(this,k).elapsed+=d(this,k).delta,this.onBeforeRender(d(this,k)),this.render(),this.onAfterRender(d(this,k))};L(this,N,!0),d(this,$).start(),e()},te=function(){d(this,N)&&(cancelAnimationFrame(d(this,J)),L(this,N,!1),d(this,$).stop())},Ne=function(){this.renderer.render(this.scene,this.camera)},Ve=function(){var e,t;window.removeEventListener("resize",y(this,l,ee).bind(this)),(e=d(this,G))==null||e.disconnect(),(t=d(this,H))==null||t.disconnect(),document.removeEventListener("visibilitychange",y(this,l,de).bind(this))};var ie,je;class pt{constructor(e){_(this,ie);g(this,"config");g(this,"positionData");g(this,"velocityData");g(this,"sizeData");g(this,"center",new b);this.config=e,this.positionData=new Float32Array(3*e.count).fill(0),this.velocityData=new Float32Array(3*e.count).fill(0),this.sizeData=new Float32Array(e.count).fill(1),this.center=new b,y(this,ie,je).call(this),this.setSizes()}setSizes(){const{config:e,sizeData:t}=this;t[0]=e.size0;for(let i=1;i<e.count;i++)t[i]=X.randFloat(e.minSize,e.maxSize)}update(e){const{config:t,center:i,positionData:n,sizeData:f,velocityData:m}=this;let o=0;t.controlSphere0&&(o=1,new b().fromArray(n,0).lerp(i,.1).toArray(n,0),new b(0,0,0).toArray(m,0));for(let h=o;h<t.count;h++){const a=3*h,r=new b().fromArray(n,a),c=new b().fromArray(m,a);c.y-=e.delta*t.gravity*f[h],c.multiplyScalar(t.friction),c.clampLength(0,t.maxVelocity),r.add(c),r.toArray(n,a),c.toArray(m,a)}for(let h=o;h<t.count;h++){const a=3*h,r=new b().fromArray(n,a),c=new b().fromArray(m,a),p=f[h];for(let u=h+1;u<t.count;u++){const P=3*u,v=new b().fromArray(n,P),A=new b().fromArray(m,P),S=new b().copy(v).sub(r),w=S.length(),M=p+f[u];if(w<M){const V=M-w,E=S.normalize().multiplyScalar(.5*V),K=E.clone().multiplyScalar(Math.max(c.length(),1));r.sub(E),c.sub(K),r.toArray(n,a),c.toArray(m,a),v.add(E),A.add(E.clone().multiplyScalar(Math.max(A.length(),1))),v.toArray(n,P),A.toArray(m,P)}}if(t.controlSphere0){const u=new b().copy(new b().fromArray(n,0)).sub(r),P=u.length(),v=p+f[0];if(P<v){const A=u.normalize().multiplyScalar(v-P),S=A.clone().multiplyScalar(Math.max(c.length(),2));r.sub(A),c.sub(S)}}Math.abs(r.x)+p>t.maxX&&(r.x=Math.sign(r.x)*(t.maxX-p),c.x=-c.x*t.wallBounce),t.gravity===0?Math.abs(r.y)+p>t.maxY&&(r.y=Math.sign(r.y)*(t.maxY-p),c.y=-c.y*t.wallBounce):r.y-p<-t.maxY&&(r.y=-t.maxY+p,c.y=-c.y*t.wallBounce);const x=Math.max(t.maxZ,t.maxSize);Math.abs(r.z)+p>x&&(r.z=Math.sign(r.z)*(t.maxZ-p),c.z=-c.z*t.wallBounce),r.toArray(n,a),c.toArray(m,a)}}}ie=new WeakSet,je=function(){const{config:e,positionData:t}=this;this.center.toArray(t,0);for(let i=1;i<e.count;i++){const n=3*i;t[n]=X.randFloatSpread(2*e.maxX),t[n+1]=X.randFloatSpread(2*e.maxY),t[n+2]=X.randFloatSpread(2*e.maxZ)}};class vt extends ct{constructor(t){super(t);g(this,"uniforms",{thicknessDistortion:{value:.1},thicknessAmbient:{value:0},thicknessAttenuation:{value:.1},thicknessPower:{value:2},thicknessScale:{value:10}});g(this,"onBeforeCompile2");this.defines={USE_UV:""},this.onBeforeCompile=i=>{Object.assign(i.uniforms,this.uniforms),i.fragmentShader=`
        uniform float thicknessPower;
        uniform float thicknessScale;
        uniform float thicknessDistortion;
        uniform float thicknessAmbient;
        uniform float thicknessAttenuation;
        `+i.fragmentShader,i.fragmentShader=i.fragmentShader.replace("void main() {",`
        void RE_Direct_Scattering(const in IncidentLight directLight, const in vec2 uv, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, inout ReflectedLight reflectedLight) {
          vec3 scatteringHalf = normalize(directLight.direction + (geometryNormal * thicknessDistortion));
          float scatteringDot = pow(saturate(dot(geometryViewDir, -scatteringHalf)), thicknessPower) * thicknessScale;
          #ifdef USE_COLOR
            vec3 scatteringIllu = (scatteringDot + thicknessAmbient) * vColor;
          #else
            vec3 scatteringIllu = (scatteringDot + thicknessAmbient) * diffuse;
          #endif
          reflectedLight.directDiffuse += scatteringIllu * thicknessAttenuation * directLight.color;
        }

        void main() {
        `);const n=lt.lights_fragment_begin.replace(/RE_Direct\( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight \);/g,`
          RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
          RE_Direct_Scattering(directLight, vUv, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, reflectedLight);
        `);i.fragmentShader=i.fragmentShader.replace("#include <lights_fragment_begin>",n),this.onBeforeCompile2&&this.onBeforeCompile2(i)}}}const gt={count:200,colors:[0,0,0],ambientColor:16777215,ambientIntensity:1,lightIntensity:200,materialParams:{metalness:.5,roughness:.5,clearcoat:1,clearcoatRoughness:.15},minSize:.5,maxSize:1,size0:1,gravity:.5,friction:.9975,wallBounce:.95,maxVelocity:.15,maxX:5,maxY:5,maxZ:2,controlSphere0:!1,followCursor:!0},Y=new Re;let le=!1;const T=new he,I=new Map;function yt(s){const e={position:new he,nPosition:new he,hover:!1,onEnter:()=>{},onMove:()=>{},onClick:()=>{},onLeave:()=>{},...s};return I.has(s.domElement)||(I.set(s.domElement,e),le||(document.body.addEventListener("pointermove",Pe),document.body.addEventListener("pointerleave",ze),document.body.addEventListener("click",be),le=!0)),e.dispose=()=>{I.delete(s.domElement),I.size===0&&(document.body.removeEventListener("pointermove",Pe),document.body.removeEventListener("pointerleave",ze),document.body.removeEventListener("click",be),le=!1)},e}function Pe(s){T.set(s.clientX,s.clientY);for(const[e,t]of I){const i=e.getBoundingClientRect();Ue(i)?(We(t,i),t.hover||(t.hover=!0,t.onEnter(t)),t.onMove(t)):t.hover&&(t.hover=!1,t.onLeave(t))}}function be(s){T.set(s.clientX,s.clientY);for(const[e,t]of I){const i=e.getBoundingClientRect();We(t,i),Ue(i)&&t.onClick(t)}}function ze(){for(const s of I.values())s.hover&&(s.hover=!1,s.onLeave(s))}function We(s,e){s.position.set(T.x-e.left,T.y-e.top),s.nPosition.set(s.position.x/e.width*2-1,-s.position.y/e.height*2+1)}function Ue(s){return T.x>=s.left&&T.x<=s.left+s.width&&T.y>=s.top&&T.y<=s.top+s.height}var se,Ye;class xt extends Ce{constructor(t,i={}){const n={...gt,...i},f=new ft,o=new nt(t).fromScene(f).texture,h=new at,a=new vt({envMap:o,...n.materialParams});a.envMapRotation.x=-Math.PI/2;super(h,a,n.count);_(this,se);g(this,"config");g(this,"physics");g(this,"ambientLight");g(this,"light");this.config=n,this.physics=new pt(n),y(this,se,Ye).call(this),this.setColors(n.colors)}setColors(t){if(Array.isArray(t)&&t.length>1){const i=function(n){let f=n,m=[];return f.forEach(o=>{m.push(new ce(o))}),{setColors:o=>{f=o,m=[],f.forEach(h=>{m.push(new ce(h))})},getColorAt:(o,h=new ce)=>{const r=Math.max(0,Math.min(1,o))*(f.length-1),c=Math.floor(r),p=m[c];if(c>=f.length-1)return p.clone();const x=r-c,u=m[c+1];return h.r=p.r+x*(u.r-p.r),h.g=p.g+x*(u.g-p.g),h.b=p.b+x*(u.b-p.b),h}}}(t);for(let n=0;n<this.count;n++)this.setColorAt(n,i.getColorAt(n/this.count)),n===0&&this.light.color.copy(i.getColorAt(n/this.count));if(!this.instanceColor)return;this.instanceColor.needsUpdate=!0}}update(t){this.physics.update(t);for(let i=0;i<this.count;i++)Y.position.fromArray(this.physics.positionData,3*i),i===0&&this.config.followCursor===!1?Y.scale.setScalar(0):Y.scale.setScalar(this.physics.sizeData[i]),Y.updateMatrix(),this.setMatrixAt(i,Y.matrix),i===0&&this.light.position.copy(Y.position);this.instanceMatrix.needsUpdate=!0}}se=new WeakSet,Ye=function(){this.ambientLight=new rt(this.config.ambientColor,this.config.ambientIntensity),this.add(this.ambientLight),this.light=new Ae(this.config.colors[0],this.config.lightIntensity),this.add(this.light)};function wt(s,e={}){const t=new ut({canvas:s,size:"parent",rendererOptions:{antialias:!0,alpha:!0}});let i;t.renderer.toneMapping=Ke,t.camera.position.set(0,0,20),t.camera.lookAt(0,0,0),t.cameraMaxAspect=1.5,t.resize(),a(e);const n=new Qe,f=new et(new b(0,0,1),0),m=new b;let o=!1;const h=yt({domElement:s,onMove(){n.setFromCamera(h.nPosition,t.camera),t.camera.getWorldDirection(f.normal),n.ray.intersectPlane(f,m),i.physics.center.copy(m),i.config.controlSphere0=!0},onLeave(){i.config.controlSphere0=!1}});function a(r){i&&(t.clear(),t.scene.remove(i)),i=new xt(t.renderer,r),t.scene.add(i)}return t.onBeforeRender=r=>{o||i.update(r)},t.onAfterResize=r=>{i.config.maxX=r.wWidth/2,i.config.maxY=r.wHeight/2},{three:t,get spheres(){return i},setCount(r){a({...i.config,count:r})},togglePause(){o=!o},dispose(){var r;(r=h.dispose)==null||r.call(h),t.dispose()}}}const Mt=({className:s="",followCursor:e=!0,...t})=>{const i=D.useRef(null),n=D.useRef(null);return D.useEffect(()=>{const f=i.current;if(f)return n.current=wt(f,{followCursor:e,...t}),()=>{n.current&&n.current.dispose()}},[]),ue.jsx("canvas",{className:`${s} w-full h-full`,ref:i})},Ft=Object.freeze(Object.defineProperty({__proto__:null,default:Mt},Symbol.toStringTag,{value:"Module"})),Pt=["#ffffff","#ffffff","#ffffff"],bt=s=>{s=s.replace(/^#/,""),s.length===3&&(s=s.split("").map(f=>f+f).join(""));const e=parseInt(s,16),t=(e>>16&255)/255,i=(e>>8&255)/255,n=(e&255)/255;return[t,i,n]},zt=`
  attribute vec3 position;
  attribute vec4 random;
  attribute vec3 color;
  
  uniform mat4 modelMatrix;
  uniform mat4 viewMatrix;
  uniform mat4 projectionMatrix;
  uniform float uTime;
  uniform float uSpread;
  uniform float uBaseSize;
  uniform float uSizeRandomness;
  
  varying vec4 vRandom;
  varying vec3 vColor;
  
  void main() {
    vRandom = random;
    vColor = color;
    
    vec3 pos = position * uSpread;
    pos.z *= 10.0;
    
    vec4 mPos = modelMatrix * vec4(pos, 1.0);
    float t = uTime;
    mPos.x += sin(t * random.z + 6.28 * random.w) * mix(0.1, 1.5, random.x);
    mPos.y += sin(t * random.y + 6.28 * random.x) * mix(0.1, 1.5, random.w);
    mPos.z += sin(t * random.w + 6.28 * random.y) * mix(0.1, 1.5, random.z);
    
    vec4 mvPos = viewMatrix * mPos;
    gl_PointSize = (uBaseSize * (1.0 + uSizeRandomness * (random.x - 0.5))) / length(mvPos.xyz);
    gl_Position = projectionMatrix * mvPos;
  }
`,_t=`
  precision highp float;
  
  uniform float uTime;
  uniform float uAlphaParticles;
  varying vec4 vRandom;
  varying vec3 vColor;
  
  void main() {
    vec2 uv = gl_PointCoord.xy;
    float d = length(uv - vec2(0.5));
    
    if(uAlphaParticles < 0.5) {
      if(d > 0.5) {
        discard;
      }
      gl_FragColor = vec4(vColor + 0.2 * sin(uv.yxx + uTime + vRandom.y * 6.28), 1.0);
    } else {
      float circle = smoothstep(0.5, 0.4, d) * 0.8;
      gl_FragColor = vec4(vColor + 0.2 * sin(uv.yxx + uTime + vRandom.y * 6.28), circle);
    }
  }
`,At=({particleCount:s=200,particleSpread:e=10,speed:t=.1,particleColors:i,moveParticlesOnHover:n=!1,particleHoverFactor:f=1,alphaParticles:m=!1,particleBaseSize:o=100,sizeRandomness:h=1,cameraDistance:a=20,disableRotation:r=!1,className:c})=>{const p=D.useRef(null),x=D.useRef({x:0,y:0});return D.useEffect(()=>{const u=p.current;if(!u)return;const P=new Se({depth:!1,alpha:!0}),v=P.gl;u.appendChild(v.canvas),v.clearColor(0,0,0,0),v.canvas.style.width="100%",v.canvas.style.height="100%",v.canvas.style.display="block",v.canvas.style.position="absolute",v.canvas.style.top="0",v.canvas.style.left="0";const A=new ht(v,{fov:15});A.position.set(0,0,a);const S=()=>{const C=u.clientWidth,R=u.clientHeight;P.setSize(C,R),A.perspective({aspect:v.canvas.width/v.canvas.height})};window.addEventListener("resize",S,!1),S();const w=C=>{const R=u.getBoundingClientRect(),j=(C.clientX-R.left)/R.width*2-1,W=-((C.clientY-R.top)/R.height*2-1);x.current={x:j,y:W}};n&&u.addEventListener("mousemove",w);const M=s,V=new Float32Array(M*3),E=new Float32Array(M*4),K=new Float32Array(M*3),pe=i&&i.length>0?i:Pt;for(let C=0;C<M;C++){let R,j,W,ne;do R=Math.random()*2-1,j=Math.random()*2-1,W=Math.random()*2-1,ne=R*R+j*j+W*W;while(ne>1||ne===0);const ae=Math.cbrt(Math.random());V.set([R*ae,j*ae,W*ae],C*3),E.set([Math.random(),Math.random(),Math.random(),Math.random()],C*4);const Ge=bt(pe[Math.floor(Math.random()*pe.length)]);K.set(Ge,C*3)}const Xe=new mt(v,{position:{size:3,data:V},random:{size:4,data:E},color:{size:3,data:K}}),ve=new Le(v,{vertex:zt,fragment:_t,uniforms:{uTime:{value:0},uSpread:{value:e},uBaseSize:{value:o},uSizeRandomness:{value:h},uAlphaParticles:{value:m?1:0}},transparent:!0,depthTest:!1}),F=new Ee(v,{mode:v.POINTS,geometry:Xe,program:ve});let oe,ge=performance.now(),Q=0;const ye=C=>{oe=requestAnimationFrame(ye);const R=C-ge;ge=C,Q+=R*t,ve.uniforms.uTime.value=Q*.001,n?(F.position.x=-x.current.x*f,F.position.y=-x.current.y*f):(F.position.x=0,F.position.y=0),r||(F.rotation.x=Math.sin(Q*2e-4)*.1,F.rotation.y=Math.cos(Q*5e-4)*.15,F.rotation.z+=.01*t),P.render({scene:F,camera:A})};return oe=requestAnimationFrame(ye),()=>{window.removeEventListener("resize",S),n&&u.removeEventListener("mousemove",w),cancelAnimationFrame(oe),u.contains(v.canvas)&&u.removeChild(v.canvas)}},[s,e,t,n,f,m,o,h,a,r]),ue.jsx("div",{ref:p,className:`relative w-full h-full ${c}`,style:{width:"100%",height:"100%",position:"absolute",top:0,left:0,overflow:"hidden",pointerEvents:n?"auto":"none"}})},kt=Object.freeze(Object.defineProperty({__proto__:null,default:At},Symbol.toStringTag,{value:"Module"})),Ct=`
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`,Rt=`
precision highp float;

uniform float iTime;
uniform vec3 iResolution;
uniform vec3 uColor;
uniform float uAmplitude;
uniform float uDistance;
uniform vec2 uMouse;

#define PI 3.1415926538

const int u_line_count = 40;
const float u_line_width = 7.0;
const float u_line_blur = 10.0;

float Perlin2D(vec2 P) {
    vec2 Pi = floor(P);
    vec4 Pf_Pfmin1 = P.xyxy - vec4(Pi, Pi + 1.0);
    vec4 Pt = vec4(Pi.xy, Pi.xy + 1.0);
    Pt = Pt - floor(Pt * (1.0 / 71.0)) * 71.0;
    Pt += vec2(26.0, 161.0).xyxy;
    Pt *= Pt;
    Pt = Pt.xzxz * Pt.yyww;
    vec4 hash_x = fract(Pt * (1.0 / 951.135664));
    vec4 hash_y = fract(Pt * (1.0 / 642.949883));
    vec4 grad_x = hash_x - 0.49999;
    vec4 grad_y = hash_y - 0.49999;
    vec4 grad_results = inversesqrt(grad_x * grad_x + grad_y * grad_y)
        * (grad_x * Pf_Pfmin1.xzxz + grad_y * Pf_Pfmin1.yyww);
    grad_results *= 1.4142135623730950;
    vec2 blend = Pf_Pfmin1.xy * Pf_Pfmin1.xy * Pf_Pfmin1.xy
               * (Pf_Pfmin1.xy * (Pf_Pfmin1.xy * 6.0 - 15.0) + 10.0);
    vec4 blend2 = vec4(blend, vec2(1.0 - blend));
    return dot(grad_results, blend2.zxzx * blend2.wwyy);
}

float pixel(float count, vec2 resolution) {
    return (1.0 / max(resolution.x, resolution.y)) * count;
}

float lineFn(vec2 st, float width, float perc, float offset, vec2 mouse, float time, float amplitude, float distance) {
    float split_offset = (perc * 0.4);
    float split_point = 0.1 + split_offset;

    float amplitude_normal = smoothstep(split_point, 0.7, st.x);
    float amplitude_strength = 0.5;
    float finalAmplitude = amplitude_normal * amplitude_strength
                           * amplitude * (1.0 + (mouse.y - 0.5) * 0.2);

    float time_scaled = time / 10.0 + (mouse.x - 0.5) * 1.0;
    float blur = smoothstep(split_point, split_point + 0.05, st.x) * perc;

    float xnoise = mix(
        Perlin2D(vec2(time_scaled, st.x + perc) * 2.5),
        Perlin2D(vec2(time_scaled, st.x + time_scaled) * 3.5) / 1.5,
        st.x * 0.3
    );

    float y = 0.5 + (perc - 0.5) * distance + xnoise / 2.0 * finalAmplitude;

    float line_start = smoothstep(
        y + (width / 2.0) + (u_line_blur * pixel(1.0, iResolution.xy) * blur),
        y,
        st.y
    );

    float line_end = smoothstep(
        y,
        y - (width / 2.0) - (u_line_blur * pixel(1.0, iResolution.xy) * blur),
        st.y
    );

    return clamp(
        (line_start - line_end) * (1.0 - smoothstep(0.0, 1.0, pow(perc, 0.3))),
        0.0,
        1.0
    );
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = fragCoord / iResolution.xy;

    float line_strength = 1.0;
    for (int i = 0; i < u_line_count; i++) {
        float p = float(i) / float(u_line_count);
        line_strength *= (1.0 - lineFn(
            uv,
            u_line_width * pixel(1.0, iResolution.xy) * (1.0 - p),
            p,
            (PI * 1.0) * p,
            uMouse,
            iTime,
            uAmplitude,
            uDistance
        ));
    }

    float colorVal = 1.0 - line_strength;
    fragColor = vec4(uColor * colorVal, colorVal);
}

void main() {
    mainImage(gl_FragColor, gl_FragCoord.xy);
}
`,St=({color:s=[1,1,1],amplitude:e=1,distance:t=0,enableMouseInteraction:i=!1,...n})=>{const f=D.useRef(null),m=D.useRef(void 0);return D.useEffect(()=>{if(!f.current)return;const o=f.current,h=new Se({alpha:!0}),a=h.gl;a.clearColor(0,0,0,0),a.enable(a.BLEND),a.blendFunc(a.SRC_ALPHA,a.ONE_MINUS_SRC_ALPHA),a.canvas.style.width="100%",a.canvas.style.height="100%",a.canvas.style.display="block",a.canvas.style.position="absolute",a.canvas.style.top="0",a.canvas.style.left="0",o.appendChild(a.canvas);const r=new dt(a),c=new Le(a,{vertex:Ct,fragment:Rt,uniforms:{iTime:{value:0},iResolution:{value:new Me(a.canvas.width,a.canvas.height,a.canvas.width/a.canvas.height)},uColor:{value:new Me(...s)},uAmplitude:{value:e},uDistance:{value:t},uMouse:{value:new Float32Array([.5,.5])}}}),p=new Ee(a,{geometry:r,program:c});function x(){const{clientWidth:w,clientHeight:M}=o;h.setSize(w,M),c.uniforms.iResolution.value.r=w,c.uniforms.iResolution.value.g=M,c.uniforms.iResolution.value.b=w/M}window.addEventListener("resize",x),x();let u=[.5,.5],P=[.5,.5];function v(w){const M=o.getBoundingClientRect(),V=(w.clientX-M.left)/M.width,E=1-(w.clientY-M.top)/M.height;P=[V,E]}function A(){P=[.5,.5]}i&&(o.addEventListener("mousemove",v),o.addEventListener("mouseleave",A));function S(w){i?(u[0]+=.05*(P[0]-u[0]),u[1]+=.05*(P[1]-u[1]),c.uniforms.uMouse.value[0]=u[0],c.uniforms.uMouse.value[1]=u[1]):(c.uniforms.uMouse.value[0]=.5,c.uniforms.uMouse.value[1]=.5),c.uniforms.iTime.value=w*.001,h.render({scene:p}),m.current=requestAnimationFrame(S)}return m.current=requestAnimationFrame(S),()=>{var w;m.current&&cancelAnimationFrame(m.current),window.removeEventListener("resize",x),i&&(o.removeEventListener("mousemove",v),o.removeEventListener("mouseleave",A)),o.contains(a.canvas)&&o.removeChild(a.canvas),(w=a.getExtension("WEBGL_lose_context"))==null||w.loseContext()}},[s,e,t,i]),ue.jsx("div",{ref:f,className:"w-full h-full relative",style:{width:"100%",height:"100%",position:"absolute",top:0,left:0,overflow:"hidden",pointerEvents:i?"auto":"none"},...n})},Tt=Object.freeze(Object.defineProperty({__proto__:null,default:St},Symbol.toStringTag,{value:"Module"}));export{kt as a,Tt as b,Ft as i};
