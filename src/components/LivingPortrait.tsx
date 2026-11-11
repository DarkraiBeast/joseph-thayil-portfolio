import React, { useEffect, useRef } from 'react';

const IMAGE_PATHS: Record<string, string> = {
  rest: '/assets/aistudio/3fadad54-e2be-42f1-900c-d39866980eb7_7c758035.png',
  shock: '/assets/aistudio/Gemini_Generated_Image_8q0aq18q0aq18q0a_5d8014ce.png',
  laugh: '/assets/aistudio/Gemini_Generated_Image_gig4b4gig4b4gig4_a0d6c749.png',
  cry: '/assets/aistudio/Gemini_Generated_Image_8a2heh8a2heh8a2h_61fd5492.png',
  angry: '/assets/aistudio/Gemini_Generated_Image_diqzlediqzlediqz_798fcf75.png',
  sad: '/assets/aistudio/Gemini_Generated_Image_ig8upiig8upiig8u_7faf889fw.png',
};

const EXPRESSION_MAP: Record<string, string> = {
  rest: 'rest',
  closed: 'cry',
  half: 'sad',
  shock: 'shock',
  scared: 'shock',
  angry: 'angry',
  laugh: 'laugh',
  grin: 'laugh',
  hearts: 'laugh',
  cry: 'cry',
  sad: 'sad',
  ouch: 'sad',
  scrunch: 'angry',
  dizzy: 'shock',
  sick: 'sad',
  deadpan: 'rest',
  smug: 'laugh',
  stars: 'laugh',
  wind: 'shock',
  yawn: 'shock',
  yawn1: 'shock',
  yawn2: 'shock',
  yawn4: 'shock',
  whistle1: 'laugh',
  whistle2: 'laugh',
  sneeze1: 'sad',
  sneeze2: 'shock',
  gum1: 'laugh',
  gum2: 'shock',
  gum3: 'shock',
  gumpop: 'shock',
  snore: 'sad',
  shy: 'sad',
  puff: 'angry',
  fish: 'sad',
  kiss: 'laugh',
};

export const LivingPortrait: React.FC = () => {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const wrap = document.getElementById('magnetWrap');
    const canvas = document.getElementById('faceGl') as HTMLCanvasElement | null;
    const fallback = document.getElementById('faceFallback') as HTMLImageElement | null;
    const fly = document.getElementById('faceFly') as HTMLElement | null;
    const hand = document.getElementById('faceHand') as HTMLElement | null;

    if (!wrap || !canvas) return;

    const gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: true, antialias: true }) as WebGLRenderingContext;
    if (!gl) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Shader with lean, skin deformation, smooth crossfade, and eye tracking
    const VS = `
      attribute vec2 a, d; 
      attribute float s; 
      varying vec2 vUv; 
      varying float vS;
      uniform vec2 lean; 
      uniform float overS;
      void main(){ 
        vUv = a; 
        vS = s; 
        vec2 p = a + d + lean; 
        gl_Position = vec4(vec2(p.x - .5, .5 - p.y) * 2. / overS, 0., 1.); 
      }
    `;

    const FS = `
      precision highp float; 
      varying vec2 vUv; 
      varying float vS;
      uniform sampler2D faceA, faceB;
      uniform float fade;
      uniform vec2 eyeOffset;
      uniform float eyeActive;

      void main(){
        vec2 uv = vUv;
        if (eyeActive > 0.001) {
          // Left pupil center: (0.415, 0.655), Right pupil center: (0.685, 0.655)
          float dL = length(vUv - vec2(0.415, 0.655));
          float dR = length(vUv - vec2(0.685, 0.655));
          float wL = smoothstep(0.082, 0.015, dL);
          float wR = smoothstep(0.082, 0.015, dR);
          float w = max(wL, wR) * eyeActive;
          uv = vUv - eyeOffset * w;
        }
        if(uv.x < 0. || uv.y < 0. || uv.x > 1. || uv.y > 1.){ 
          gl_FragColor = vec4(0.); 
          return; 
        }
        vec4 c = mix(texture2D(faceA, uv), texture2D(faceB, uv), fade);
        if(c.a < .004){ 
          gl_FragColor = vec4(0.); 
          return; 
        }
        gl_FragColor = vec4(c.rgb * vS, c.a);
      }
    `;

    const sh = (t: number, s: string) => {
      const o = gl.createShader(t)!;
      gl.shaderSource(o, s);
      gl.compileShader(o);
      if (!gl.getShaderParameter(o, gl.COMPILE_STATUS)) console.error(gl.getShaderInfoLog(o));
      return o;
    };

    const pr = gl.createProgram()!;
    gl.attachShader(pr, sh(gl.VERTEX_SHADER, VS));
    gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, FS));
    gl.linkProgram(pr);
    gl.useProgram(pr);

    const U: Record<string, WebGLUniformLocation | null> = {
      over_: gl.getUniformLocation(pr, 'overS'),
      lean: gl.getUniformLocation(pr, 'lean'),
      faceA: gl.getUniformLocation(pr, 'faceA'),
      faceB: gl.getUniformLocation(pr, 'faceB'),
      fade: gl.getUniformLocation(pr, 'fade'),
      eyeOffset: gl.getUniformLocation(pr, 'eyeOffset'),
      eyeActive: gl.getUniformLocation(pr, 'eyeActive'),
    };

    const OVER = 1.7, N = 72, M = N + 1, SPAN = OVER / N, ORIGIN = 0.5 - OVER / 2;
    const WOBBLE = 2.3 * 2 * Math.PI, REACH = 0.085 / SPAN, C = REACH * WOBBLE, GAMMA = 2 * 0.14 * WOBBLE, NU = 0.2 * C;

    gl.uniform1f(U.over_, OVER);
    gl.uniform1i(U.faceA, 0);
    gl.uniform1i(U.faceB, 1);
    gl.uniform2f(U.eyeOffset, 0, 0);
    gl.uniform1f(U.eyeActive, 1.0);

    // Mesh simulation
    const count = M * M;
    const ux = new Float32Array(count), uy = new Float32Array(count);
    const vx = new Float32Array(count), vy = new Float32Array(count);
    const rest = new Float32Array(count * 2), dyn = new Float32Array(count * 3);
    const sx = new Float32Array(count), sy = new Float32Array(count);

    for (let j = 0, k = 0; j < M; j++) {
      for (let i = 0; i < M; i++) {
        rest[k++] = ORIGIN + i * SPAN;
        rest[k++] = ORIGIN + j * SPAN;
      }
    }

    const idx = new Uint16Array(N * N * 6);
    for (let j = 0, k = 0; j < N; j++) {
      for (let i = 0; i < N; i++) {
        const a = j * M + i, b = a + 1, c = a + M, d = c + 1;
        idx[k++] = a; idx[k++] = c; idx[k++] = b;
        idx[k++] = b; idx[k++] = c; idx[k++] = d;
      }
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, rest, gl.STATIC_DRAW);
    const aa = gl.getAttribLocation(pr, 'a');
    gl.enableVertexAttribArray(aa);
    gl.vertexAttribPointer(aa, 2, gl.FLOAT, false, 0, 0);

    const dynBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, dynBuf);
    gl.bufferData(gl.ARRAY_BUFFER, dyn, gl.DYNAMIC_DRAW);
    const ad = gl.getAttribLocation(pr, 'd'), as = gl.getAttribLocation(pr, 's');
    gl.enableVertexAttribArray(ad);
    gl.vertexAttribPointer(ad, 2, gl.FLOAT, false, 12, 0);
    gl.enableVertexAttribArray(as);
    gl.vertexAttribPointer(as, 1, gl.FLOAT, false, 12, 8);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, idx, gl.STATIC_DRAW);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.clearColor(0, 0, 0, 0);

    // Brush for grabbing & pulling skin
    let brush: { u: number; v: number; list: [number, number, number, number][]; px: number; py: number } | null = null;
    function takeHold(u: number, v: number, radius = 0.22) {
      const list: [number, number, number, number][] = [];
      for (let k = 0; k < count; k++) {
        const dx = rest[k * 2] + ux[k] - u, dy = rest[k * 2 + 1] + uy[k] - v;
        const w = Math.exp(-(dx * dx + dy * dy) / (radius * radius));
        if (w > 0.02) list.push([k, w, ux[k], uy[k]]);
      }
      brush = { u, v, list, px: 0, py: 0 };
    }

    const GAP = SPAN * 0.34, lineA = new Float32Array(M), lineB = new Float32Array(M), lineP = new Float32Array(M);
    function order(start: number, stride: number, field: Float32Array, base: Float32Array) {
      for (let i = 0; i < M; i++) { const k = start + i * stride; lineP[i] = base[k] + field[k]; }
      lineA[0] = lineP[0]; for (let i = 1; i < M; i++) lineA[i] = Math.max(lineP[i], lineA[i - 1] + GAP);
      lineB[N] = lineP[N]; for (let i = N - 1; i >= 0; i--) lineB[i] = Math.min(lineP[i], lineB[i + 1] - GAP);
      for (let i = 0; i < M; i++) { const k = start + i * stride; field[k] = (lineA[i] + lineB[i]) / 2 - base[k]; }
    }

    const restX = new Float32Array(count), restY = new Float32Array(count);
    for (let k = 0; k < count; k++) { restX[k] = rest[k * 2]; restY[k] = rest[k * 2 + 1]; }

    function untangle() {
      for (let pass = 0; pass < 2; pass++) {
        for (let j = 0; j < M; j++) order(j * M, 1, sx, restX);
        for (let i = 0; i < M; i++) order(i, M, sy, restY);
      }
    }

    const H = 1 / 240;
    let simLeft = 0;
    function step(dt: number) {
      const c2 = C * C, wo2 = WOBBLE * WOBBLE;
      for (let j = 1; j < N; j++) {
        for (let i = 1; i < N; i++) {
          const k = j * M + i, l = k - 1, r = k + 1, t = k - M, b = k + M;
          const lx = ux[l] + ux[r] + ux[t] + ux[b] - 4 * ux[k], ly = uy[l] + uy[r] + uy[t] + uy[b] - 4 * uy[k];
          const lvx = vx[l] + vx[r] + vx[t] + vx[b] - 4 * vx[k], lvy = vy[l] + vy[r] + vy[t] + vy[b] - 4 * vy[k];
          vx[k] += (c2 * lx - wo2 * ux[k] - GAMMA * vx[k] + NU * lvx) * dt;
          vy[k] += (c2 * ly - wo2 * uy[k] - GAMMA * vy[k] + NU * lvy) * dt;
        }
      }
      if (brush) {
        for (const [k, w, u0, v0] of brush.list) {
          const K = 3000 * w, D = 90 * w;
          vx[k] += ((u0 + brush.px * w - ux[k]) * K - vx[k] * D) * dt;
          vy[k] += ((v0 + brush.py * w - uy[k]) * K - vy[k] * D) * dt;
        }
      }
      for (let k = 0; k < count; k++) { ux[k] += vx[k] * dt; uy[k] += vy[k] * dt; }
    }

    function poke(u: number, v: number, dx: number, dy: number, radius = 0.09) {
      for (let k = 0; k < count; k++) {
        const ax = rest[k * 2] - u, ay = rest[k * 2 + 1] - v;
        const w = Math.exp(-(ax * ax + ay * ay) / (radius * radius));
        vx[k] += dx * w; vy[k] += dy * w;
      }
    }

    // Texture management
    const tex: Record<string, WebGLTexture | null> = {};
    const param = () => {
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    };
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);

    const loadImg = (src: string): Promise<HTMLImageElement | null> =>
      new Promise(res => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => res(img);
        img.onerror = () => res(null);
        img.src = src;
      });

    function uploadTex(name: string, img: HTMLImageElement) {
      const t = gl.createTexture();
      gl.activeTexture(gl.TEXTURE5);
      gl.bindTexture(gl.TEXTURE_2D, t);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
      param();
      tex[name] = t;
    }

    let alphaMap: Uint8ClampedArray | null = null;
    function makeHitMap(img: HTMLImageElement) {
      const a = document.createElement('canvas');
      a.width = a.height = 128;
      const ac = a.getContext('2d', { willReadFrequently: true });
      if (ac) {
        ac.drawImage(img, 0, 0, 128, 128);
        alphaMap = ac.getImageData(0, 0, 128, 128).data;
      }
    }

    const zoneAt = (u: number, v: number) => {
      const a = (u - 0.505) / 0.225, b = (v - 0.485) / 0.33;
      if (a * a + b * b > 1 || v < 0.23) return 'hair';
      if (v < 0.40) return 'brow';
      if (Math.abs(v - 0.65) < 0.08 && u > 0.33 && u < 0.47) return 'eyeL';
      if (Math.abs(v - 0.65) < 0.08 && u > 0.58 && u < 0.72) return 'eyeR';
      if (Math.abs(u - 0.5) < 0.06 && v < 0.70) return 'nose';
      if (v > 0.70 && v < 0.82 && Math.abs(u - 0.5) < 0.12) return 'mouth';
      return v > 0.82 ? 'chin' : 'cheek';
    };

    // State
    let ready = false, tStart = 0, last = performance.now();
    let pu = 0.5, pv = 0.5, onHead = false, zone: string | null = null;
    let lastInput = -1e9, awake = true, pressed = false, downAt = 0, downU = 0, downV = 0;
    let lastX = 0, lastY = 0, speed = 0, shake = 0;
    let moodFace: string | null = null, moodUntil = 0, pulls: number[] = [];
    let faceA = 'rest', faceB = 'rest', fadeT = 0, fadeMs = 70;
    let logical = 'rest', logicalMs = 70;
    let leanX = 0, leanY = 0, lvX = 0, lvY = 0;

    // Eye Gaze Tracking variables
    const targetEyeOffset = [0, 0];
    const currentEyeOffset = [0, 0];

    const toUv = (x: number, y: number) => {
      const r = canvas.getBoundingClientRect();
      return [((x - r.left) / r.width - 0.5) * OVER + 0.5, ((y - r.top) / r.height - 0.5) * OVER + 0.5];
    };

    const solid = (u: number, v: number) => {
      if (!alphaMap || u < 0 || v < 0 || u >= 1 || v >= 1) return false;
      const idx = ((v * 128 | 0) * 128 + (u * 128 | 0)) * 4;
      const r = alphaMap[idx], g = alphaMap[idx + 1], b = alphaMap[idx + 2], a = alphaMap[idx + 3];
      return a > 40 && (r + g + b > 25);
    };

    function showFace(name: string, ms: number, now: number) {
      const resolved = EXPRESSION_MAP[name] || name;
      if (!tex[resolved] || resolved === faceB) return;
      faceA = (now - fadeT) / fadeMs > 0.5 ? faceB : faceA;
      faceB = resolved;
      fadeT = now;
      fadeMs = Math.min(110, Math.max(1, ms));
    }

    function setFace(name: string, ms: number) {
      logical = name;
      logicalMs = ms;
    }

    function updateEyeTracking(clientX: number, clientY: number) {
      const rect = canvas!.getBoundingClientRect();
      const headCenterX = rect.left + rect.width * 0.5;
      const headCenterY = rect.top + rect.height * 0.5;

      const dx = clientX - headCenterX;
      const dy = clientY - headCenterY;

      const screenRadiusX = Math.max(window.innerWidth * 0.5, 380);
      const screenRadiusY = Math.max(window.innerHeight * 0.5, 320);

      // Clamped to range [-1, 1]
      const normX = Math.max(-1, Math.min(1, dx / screenRadiusX));
      const normY = Math.max(-1, Math.min(1, dy / screenRadiusY));

      // Maximum offset in UV texture coordinates: +/- 0.025 horizontal, +/- 0.018 vertical
      targetEyeOffset[0] = normX * 0.025;
      targetEyeOffset[1] = normY * 0.018;
    }

    // Pointer event listeners
    const onPointerMove = (e: PointerEvent) => {
      const now = performance.now();
      const dx = e.clientX - lastX, dy = e.clientY - lastY;
      lastX = e.clientX; lastY = e.clientY;
      [pu, pv] = toUv(e.clientX, e.clientY);
      speed += Math.hypot(dx, dy) * 0.004;
      lastInput = now;

      // Update eye tracking anywhere on the screen!
      updateEyeTracking(e.clientX, e.clientY);

      onHead = solid(pu, pv);
      zone = onHead ? zoneAt(pu, pv) : null;
      wrap.style.cursor = pressed ? 'grabbing' : onHead ? 'grab' : '';

      // Rubbing the skin lightly
      if (onHead && !pressed) {
        poke(pu, pv, dx * 0.00035, dy * 0.00035, 0.07);
      }

      // Dragging on the face changes position & dynamically changes expression
      if (pressed && brush) {
        let px = pu - brush.u, py = pv - brush.v;
        const L = Math.hypot(px, py), lim = 0.24;
        if (L > 0) {
          const k = lim * (1 - Math.exp(-L / lim)) / L;
          px *= k; py *= k;
        }
        brush.px = px;
        brush.py = py;

        // Dynamic expression change while dragging:
        if (L > 0.16) {
          setFace('shock', 60);
        } else if (L > 0.07) {
          setFace('sad', 60);
        } else if (L > 0.02) {
          setFace('angry', 60);
        }
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      const now = performance.now();
      const [u, v] = toUv(e.clientX, e.clientY);
      if (!solid(u, v)) return;

      lastInput = now;
      pressed = true;
      downAt = now;
      downU = u;
      downV = v;
      takeHold(u, v);
      moodFace = null;
      wrap.setPointerCapture(e.pointerId);
      e.preventDefault();
    };

    const onPointerUp = () => {
      if (!pressed) return;
      const now = performance.now();
      const L = brush ? Math.hypot(brush.px, brush.py) : 0;
      const z = zoneAt(downU, downV);
      const held = now - downAt;

      pressed = false;
      brush = null;
      wrap.style.cursor = onHead ? 'grab' : '';
      pulls = pulls.filter(t => now - t < 14000);

      // Tap on face without long drag
      if (L < 0.03 && held < 380) {
        if (z === 'brow') {
          moodFace = 'angry';
          moodUntil = now + 1600;
        } else if (z === 'mouth' || z === 'chin') {
          moodFace = 'laugh';
          moodUntil = now + 1600;
        } else if (z === 'cheek' || z === 'eyeL' || z === 'eyeR') {
          moodFace = 'sad';
          moodUntil = now + 1500;
        } else {
          moodFace = 'shock';
          moodUntil = now + 1400;
        }
        poke(downU, downV, 0, 0.45, 0.06);
        return;
      }

      // Drag released: trigger expression based on drag distance and frequency
      pulls.push(now);
      const n = pulls.length;
      if (n >= 6) {
        moodFace = 'cry';
        moodUntil = now + 2800;
      } else if (n >= 3) {
        moodFace = 'angry';
        moodUntil = now + 2400;
      } else if (L > 0.18) {
        moodFace = 'shock';
        moodUntil = now + 2000;
      } else if (L > 0.08) {
        moodFace = 'sad';
        moodUntil = now + 1600;
      } else {
        moodFace = 'laugh';
        moodUntil = now + 1400;
      }
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    wrap.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);

    // Hover on Contact button
    document.querySelectorAll('.contact-btn, button').forEach(b => {
      b.addEventListener('pointerenter', () => {
        if (b.textContent?.toLowerCase().includes('contact')) {
          moodFace = 'laugh';
          moodUntil = performance.now() + 1e7;
        }
      });
      b.addEventListener('pointerleave', () => {
        if (b.textContent?.toLowerCase().includes('contact')) {
          moodFace = 'laugh';
          moodUntil = performance.now() + 600;
        }
      });
    });

    // Resize observer
    const ro = new ResizeObserver(() => {
      const r = Math.min(window.devicePixelRatio || 1, 2);
      const b = canvas.getBoundingClientRect();
      canvas.width = b.width * r;
      canvas.height = b.height * r;
      gl.viewport(0, 0, canvas.width, canvas.height);
    });
    ro.observe(canvas);

    let animId = 0;
    function frame(now: number) {
      animId = requestAnimationFrame(frame);
      const dt = Math.min(0.04, (now - last) / 1000);
      last = now;

      if (!ready) return;

      const f = (r: number) => 1 - Math.exp(-dt * r);
      speed *= Math.exp(-dt * 6);
      shake += ((speed > 1.5 ? 1 : 0) - shake) * f(speed > 1.5 ? 1.2 : 0.9);

      // Determine active expression
      let want = 'rest';
      const pull = brush ? Math.hypot(brush.px, brush.py) : 0;

      if (pressed) {
        want = pull > 0.16 ? 'shock' : pull > 0.07 ? 'sad' : pull > 0.02 ? 'angry' : 'rest';
      } else if (moodFace && now < moodUntil) {
        want = moodFace;
      } else if (shake > 0.55) {
        want = shake > 0.92 ? 'shock' : 'angry';
      }

      setFace(want, want === 'rest' ? 110 : 70);
      showFace(logical, logicalMs, now);

      // Eye Tracking smoothing
      const eyeLerp = 1 - Math.exp(-dt * 12);
      currentEyeOffset[0] += (targetEyeOffset[0] - currentEyeOffset[0]) * eyeLerp;
      currentEyeOffset[1] += (targetEyeOffset[1] - currentEyeOffset[1]) * eyeLerp;

      // Head lean toward cursor and pull
      const tx = (pressed && brush ? brush.px * 0.16 : (pu - 0.5) * 0.012) + Math.sin(now * 0.0009) * 0.0015;
      const ty = (pressed && brush ? brush.py * 0.16 : (pv - 0.46) * 0.008) + Math.sin(now * 0.0013) * 0.0022;
      lvX += ((tx - leanX) * 70 - lvX * 8) * dt;
      lvY += ((ty - leanY) * 70 - lvY * 8) * dt;
      leanX += lvX * dt;
      leanY += lvY * dt;

      // Mesh physics simulation
      simLeft += dt;
      let steps = 0;
      while (simLeft >= H && steps < 9) {
        step(H);
        simLeft -= H;
        steps++;
      }
      if (steps === 9) simLeft = 0;

      for (let j = 0; j < M; j++) {
        for (let i = 0; i < M; i++) {
          const k = j * M + i, edge = i === 0 || j === 0 || i === N || j === N;
          sx[k] = edge ? ux[k] : (ux[k] * 4 + ux[k - 1] + ux[k + 1] + ux[k - M] + ux[k + M]) / 8;
          sy[k] = edge ? uy[k] : (uy[k] * 4 + uy[k - 1] + uy[k + 1] + uy[k - M] + uy[k + M]) / 8;
        }
      }
      untangle();

      for (let k = 0, o = 0; k < count; k++) {
        dyn[o++] = sx[k];
        dyn[o++] = sy[k];
        const r = k % M, c = (k / M) | 0;
        let sh = 1;
        if (r > 0 && r < N && c > 0 && c < N) {
          sh = Math.max(0.86, Math.min(1.16, 1 - ((sx[k + 1] - sx[k - 1]) + (sy[k + M] - sy[k - M])) * 1.8));
        }
        dyn[o++] = sh;
      }

      gl.bindBuffer(gl.ARRAY_BUFFER, dynBuf);
      gl.bufferSubData(gl.ARRAY_BUFFER, 0, dyn);

      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, tex[faceA] || tex.rest);
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, tex[faceB] || tex.rest);

      const fadeVal = Math.min(1, (now - fadeT) / fadeMs);
      gl.uniform1f(U.fade, fadeVal);
      gl.uniform2f(U.lean, leanX, leanY);

      // Eye offset in WebGL
      gl.uniform2f(U.eyeOffset, currentEyeOffset[0], currentEyeOffset[1]);
      // Eyes are active when showing rest face
      const isRestFace = (faceA === 'rest' && faceB === 'rest');
      gl.uniform1f(U.eyeActive, isRestFace ? 1.0 : (faceB === 'rest' ? fadeVal : (1.0 - fadeVal)));

      gl.drawElements(gl.TRIANGLES, idx.length, gl.UNSIGNED_SHORT, 0);
    }

    // Load textures
    (async () => {
      const base = await loadImg(IMAGE_PATHS.rest);
      if (!base) return;

      uploadTex('rest', base);
      makeHitMap(base);

      if (fallback) fallback.style.visibility = 'hidden';
      ready = true;
      tStart = performance.now();
      animId = requestAnimationFrame(frame);

      // Load all other expressions in background
      const otherKeys = Object.keys(IMAGE_PATHS).filter(k => k !== 'rest');
      for (const k of otherKeys) {
        const img = await loadImg(IMAGE_PATHS[k]);
        if (img) uploadTex(k, img);
      }
    })();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('pointermove', onPointerMove);
      wrap.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);
      ro.disconnect();
    };
  }, []);

  return (
    <div className="hero-portrait-wrap select-none" id="magnetWrap">
      <div
        className="hero-portrait-inner fade-in"
        id="magnetInner"
        style={{ '--fade-y': '30px' } as React.CSSProperties}
        data-delay="600"
      >
        <img
          id="faceFallback"
          src={IMAGE_PATHS.rest}
          alt="Lively 3D Character Portrait"
          referrerPolicy="no-referrer"
        />
        <canvas id="faceGl" aria-hidden="true" />
        <div id="faceProps" aria-hidden="true">
          <svg id="faceFly" viewBox="0 0 32 32">
            <path className="wing" d="M15 15C12 9.500 4.500 8.500 2 13c2.500 4.500 10 4.500 13 2z" />
            <path className="wing r" d="M17 15c3-5.500 10.500-6.500 13-2-2.500 4.500-10 4.500-13 2z" />
            <ellipse cx="16" cy="19.500" rx="4" ry="6.500" />
            <circle cx="16" cy="11.500" r="3.300" />
          </svg>
          <svg id="faceHand" viewBox="0 0 32 32">
            <path
              className="open"
              d="M10.500 16.500V8.200a1.800 1.800 0 0 1 3.600 0V14v-8a1.800 1.800 0 0 1 3.600 0V14 7a1.800 1.800 0 0 1 3.600 0v8-5a1.800 1.800 0 0 1 3.600 0v10.500c0 5-3.400 8.500-8.400 8.500-3.600 0-5.700-1.600-7.600-4.600l-3.500-5.600c-.6-1 .1-2.200 1.200-2.400 1-.2 1.900.2 2.600 1z"
            />
            <path
              className="grab"
              d="M10.500 17v-3.300a1.800 1.800 0 0 1 3.600 0V14v-1.800a1.800 1.800 0 0 1 3.600 0V14v-1.300a1.800 1.800 0 0 1 3.600 0V14v-.3a1.800 1.800 0 0 1 3.600 0v6.800c0 5-3.400 8.500-8.400 8.500-3.600 0-5.700-1.600-7.600-4.600l-2.300-3.700c-.6-1 .1-2.200 1.200-2.400 1-.2 1.900.2 2.700 1z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default LivingPortrait;
