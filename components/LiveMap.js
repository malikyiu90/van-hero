"use client";
import { useEffect, useRef } from "react";

/**
 * LiveMap — the illustrated Coventry map with a yellow VH van fleet driving the
 * real roads, each showing an "N min" ETA pill, delivering at named stops with a
 * green pulse. Ported from the live vanhero.online canvas hero so the vans match
 * the client's site exactly. Self-contained <canvas>; fills its parent.
 */
export default function LiveMap({ className = "" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    // roundRect polyfill (older Safari)
    if (!ctx.roundRect && !CanvasRenderingContext2D.prototype.roundRect) {
      CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
        if (w < 2 * r) r = w / 2;
        if (h < 2 * r) r = h / 2;
        this.beginPath();
        this.moveTo(x + r, y);
        this.arcTo(x + w, y, x + w, y + h, r);
        this.arcTo(x + w, y + h, x, y + h, r);
        this.arcTo(x, y + h, x, y, r);
        this.arcTo(x, y, x + w, y, r);
        this.closePath();
        return this;
      };
    }

    // --- artwork plane (van paths are plotted in the artwork's native pixels) ---
    const MAP_W = 1672, MAP_H = 941;
    const MAP_ART_ZOOM = 1.06, MAP_ART_PAN_X = -0.015, MAP_ART_PAN_Y = -0.04;
    const isMobile = window.matchMedia && window.matchMedia("(max-width: 767px)").matches;
    const MAP_SRC = isMobile ? "/coventry-map-mobile.webp" : "/coventry-map-desktop.webp";

    const mapImg = new Image();
    let mapReady = false;
    mapImg.decoding = "async";
    mapImg.onload = () => { mapReady = true; };
    mapImg.src = MAP_SRC;

    // --- tunables ---
    const VAN_W = 30, VAN_H = 17;
    const DELIVERY_DWELL = 560, PULSE_DURATION = 1100, NODE_LIFETIME = 14000;
    const MIN_DELIVERY_GAP = 6400, ETA_MIN = 3, ETA_MAX = 14, FADE_MS = 750;
    const FLEET_SPEED_BOOST = 1.85;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let reducedMotionDrawn = false;
    const randomLifespan = () => 11000 + Math.random() * 9000;

    // --- routes along the artwork's yellow roads ---
    const ROUTES = [
      { crew: "Crew A", color: "#FFD60A", speed: 30, stops: [
        { name: "Allesley", x: 0, y: 365 },
        { x: 160, y: 392 },
        { name: "Coundon", x: 355, y: 428 },
        { x: 560, y: 450 },
        { name: "City Centre", x: 760, y: 442 },
        { x: 960, y: 410 },
      ]},
      { crew: "Crew B", color: "#FFD60A", speed: 34, stops: [
        { name: "Radford", x: 1005, y: 0 },
        { x: 1014, y: 110 },
        { name: "Coventry Cathedral", x: 1040, y: 230 },
        { x: 1025, y: 350 },
        { name: "City Centre", x: 980, y: 455 },
        { x: 930, y: 520 },
      ]},
      { crew: "Crew C", color: "#FFD60A", speed: 32, stops: [
        { name: "Whitley", x: 480, y: 940 },
        { x: 565, y: 880 },
        { name: "Cheylesmore", x: 650, y: 820 },
        { x: 735, y: 760 },
        { name: "War Memorial Park", x: 775, y: 700 },
        { x: 735, y: 620 },
        { name: "City Centre", x: 695, y: 535 },
        { x: 665, y: 470 },
      ]},
    ];

    let vans = [], pulses = [];
    let dpr = window.devicePixelRatio || 1;
    let mapScale = 1, mapDrawW = MAP_W, mapDrawH = MAP_H, mapOffX = 0, mapOffY = 0;
    let lastFrame = 0, rafId = 0;

    const randomEta = () => ETA_MIN + Math.floor(Math.random() * (ETA_MAX - ETA_MIN + 1));

    function computeMapTransform(w, h) {
      mapScale = Math.max(w / MAP_W, h / MAP_H) * MAP_ART_ZOOM;
      mapDrawW = MAP_W * mapScale;
      mapDrawH = MAP_H * mapScale;
      mapOffX = (w - mapDrawW) / 2 + w * MAP_ART_PAN_X;
      mapOffY = (h - mapDrawH) / 2 + h * MAP_ART_PAN_Y;
    }
    const mapPointToCanvas = (x, y) => ({ x: mapOffX + x * mapScale, y: mapOffY + y * mapScale });

    function buildRoutes() {
      ROUTES.forEach((rt) => {
        rt.pts = rt.stops.map((s) => mapPointToCanvas(s.x, s.y));
        rt.cum = [0];
        rt.total = 0;
        for (let i = 1; i < rt.pts.length; i++) {
          rt.total += Math.hypot(rt.pts[i].x - rt.pts[i - 1].x, rt.pts[i].y - rt.pts[i - 1].y);
          rt.cum.push(rt.total);
        }
      });
    }

    function makeVan(rt) {
      return {
        crew: rt.crew, color: rt.color, speed: rt.speed * FLEET_SPEED_BOOST, route: rt,
        dist: Math.random() * rt.total, prevDist: 0, dir: Math.random() < 0.5 ? 1 : -1,
        dwellUntil: 0, heading: 0, eta: randomEta(), lastStopIdx: -1, lastStopAt: 0,
        bornAt: 0, lifespan: randomLifespan(), opacity: 0,
      };
    }

    function resize() {
      const parent = canvas.parentElement;
      const w = parent.clientWidth, h = parent.clientHeight;
      if (!w || !h) return;
      dpr = window.devicePixelRatio || 1;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      computeMapTransform(w, h);
      buildRoutes();
      if (vans.length === 0) vans = ROUTES.map((rt) => makeVan(rt));
      else vans.forEach((v) => { v.dist = Math.min(v.dist, v.route.total); v.prevDist = v.dist; });
      if (prefersReducedMotion) { reducedMotionDrawn = false; draw(performance.now()); }
    }

    function posOnRoute(rt, dist) {
      if (!rt.pts || rt.pts.length < 2) return { x: rt.pts ? rt.pts[0].x : 0, y: rt.pts ? rt.pts[0].y : 0, heading: 0 };
      dist = Math.max(0, Math.min(rt.total, dist));
      let i = 1;
      while (i < rt.cum.length - 1 && rt.cum[i] < dist) i++;
      const a = rt.pts[i - 1], b = rt.pts[i];
      const seg = (rt.cum[i] - rt.cum[i - 1]) || 1;
      const t = (dist - rt.cum[i - 1]) / seg;
      return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t, heading: Math.atan2(b.y - a.y, b.x - a.x) };
    }

    function deliverAt(van, rt, idx, now) {
      const s = rt.stops[idx];
      s.visitedAt = now;
      const p = rt.pts[idx];
      pulses.push({ x: p.x, y: p.y, start: now });
      van.dwellUntil = now + DELIVERY_DWELL;
      van.eta = randomEta();
      van.lastStopIdx = idx;
      van.lastStopAt = now;
    }

    function respawnVan(van, now) {
      const rt = van.route;
      van.dist = Math.random() * rt.total;
      van.prevDist = van.dist;
      van.dir = Math.random() < 0.5 ? 1 : -1;
      van.dwellUntil = 0;
      van.eta = randomEta();
      van.lastStopIdx = -1;
      van.lastStopAt = 0;
      van.bornAt = now;
      van.lifespan = randomLifespan();
      van.opacity = 0;
    }

    function updateVan(van, now, dt) {
      if (!van.bornAt) van.bornAt = now;
      const age = now - van.bornAt;
      if (age < FADE_MS) van.opacity = age / FADE_MS;
      else if (age > van.lifespan) van.opacity = Math.max(0, 1 - (age - van.lifespan) / FADE_MS);
      else van.opacity = 1;
      if (age > van.lifespan + FADE_MS) { respawnVan(van, now); return; }

      const rt = van.route;
      if (now < van.dwellUntil) { van.prevDist = van.dist; return; }

      van.dist += van.dir * van.speed * dt;
      if (van.dist >= rt.total) { van.dist = rt.total; van.dir = -1; }
      else if (van.dist <= 0) { van.dist = 0; van.dir = 1; }

      const lo = Math.min(van.prevDist, van.dist), hi = Math.max(van.prevDist, van.dist);
      for (let idx = 0; idx < rt.stops.length; idx++) {
        if (!rt.stops[idx].name) continue;
        const c = rt.cum[idx];
        if (c >= lo && c <= hi) {
          if (now - van.lastStopAt > MIN_DELIVERY_GAP) deliverAt(van, rt, idx, now);
          break;
        }
      }
      van.prevDist = van.dist;
    }

    function drawMap(w, h) {
      ctx.fillStyle = "#EAF1FF";
      ctx.fillRect(0, 0, w, h);
      if (mapReady) {
        ctx.save();
        ctx.globalAlpha = 0.98;
        ctx.filter = "saturate(1.08) contrast(1.02) brightness(1.03)";
        ctx.drawImage(mapImg, mapOffX, mapOffY, mapDrawW, mapDrawH);
        ctx.restore();
      } else {
        const lp = ctx.createLinearGradient(0, 0, w, h);
        lp.addColorStop(0, "#EEF2FF");
        lp.addColorStop(1, "#FFF8D6");
        ctx.fillStyle = lp;
        ctx.fillRect(0, 0, w, h);
      }
      ctx.fillStyle = "rgba(238, 242, 255, 0.1)"; ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = "rgba(255, 255, 255, 0.055)"; ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = "rgba(255, 248, 214, 0.045)"; ctx.fillRect(0, 0, w, h);

      const focus = ctx.createRadialGradient(w * 0.58, h * 0.48, Math.min(w, h) * 0.08, w * 0.58, h * 0.48, Math.max(w, h) * 0.62);
      focus.addColorStop(0, "rgba(255,255,255,0)");
      focus.addColorStop(0.58, "rgba(255,255,255,0.02)");
      focus.addColorStop(1, "rgba(255,255,255,0.11)");
      ctx.fillStyle = focus; ctx.fillRect(0, 0, w, h);

      const vig = ctx.createRadialGradient(w * 0.58, h * 0.48, Math.min(w, h) * 0.12, w * 0.58, h * 0.48, Math.max(w, h) * 0.76);
      vig.addColorStop(0, "rgba(255,255,255,0)");
      vig.addColorStop(0.72, "rgba(255,255,255,0.02)");
      vig.addColorStop(1, "rgba(11,31,74,0.07)");
      ctx.fillStyle = vig; ctx.fillRect(0, 0, w, h);

      // fade the LEFT edge into the content panel (desktop bleed)
      const fadeW = Math.max(130, w * 0.24);
      const lg = ctx.createLinearGradient(0, 0, fadeW, 0);
      lg.addColorStop(0, "rgba(243, 246, 251, 0.98)");
      lg.addColorStop(0.55, "rgba(243, 246, 251, 0.5)");
      lg.addColorStop(1, "rgba(243, 246, 251, 0)");
      ctx.fillStyle = lg; ctx.fillRect(0, 0, fadeW, h);

      const sg = ctx.createLinearGradient(fadeW * 0.45, 0, fadeW * 1.3, 0);
      sg.addColorStop(0, "rgba(15,23,42,0)");
      sg.addColorStop(0.5, "rgba(15,23,42,0.06)");
      sg.addColorStop(1, "rgba(15,23,42,0)");
      ctx.fillStyle = sg; ctx.fillRect(0, 0, fadeW * 1.3, h);
    }

    function drawNodes(now) {
      ROUTES.forEach((rt) => {
        rt.stops.forEach((s, idx) => {
          if (!s.name || !s.visitedAt) return;
          const age = now - s.visitedAt;
          if (age >= NODE_LIFETIME) return;
          const p = rt.pts[idx];
          const k = 1 - age / NODE_LIFETIME;
          ctx.fillStyle = `rgba(16, 185, 129, ${0.4 + 0.6 * k})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 4.5, 0, Math.PI * 2);
          ctx.fill();
        });
      });
    }

    function drawPulses(now) {
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        const t = (now - p.start) / PULSE_DURATION;
        if (t >= 1) { pulses.splice(i, 1); continue; }
        ctx.strokeStyle = `rgba(16, 185, 129, ${0.6 * (1 - t)})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 5 + t * 22, 0, Math.PI * 2);
        ctx.stroke();
      }
    }

    function drawVanEtaBadge(van, vx, vy) {
      const text = van.eta + " min";
      ctx.font = '700 10px "Hanken Grotesk", system-ui, sans-serif';
      const pillH = 18;
      const pillW = ctx.measureText(text).width + 14;
      const pillX = vx - pillW / 2;
      const pillBottom = vy - 20;
      const pillY = pillBottom - pillH;

      ctx.strokeStyle = "rgba(255, 214, 10, 0.9)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(vx, pillBottom);
      ctx.lineTo(vx, vy - VAN_H / 2);
      ctx.stroke();

      ctx.save();
      ctx.shadowColor = "rgba(0,0,0,0.35)";
      ctx.shadowOffsetY = 1.5;
      ctx.shadowBlur = 4;
      ctx.fillStyle = "#FFF8D6";
      ctx.beginPath();
      ctx.roundRect(pillX, pillY, pillW, pillH, 9);
      ctx.fill();
      ctx.restore();

      ctx.strokeStyle = "rgba(255, 214, 10, 0.9)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(pillX, pillY, pillW, pillH, 9);
      ctx.stroke();

      ctx.fillStyle = "#0B1F4A";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(text, vx, pillY + pillH / 2 + 0.5);
    }

    function drawVan(van, now) {
      if (van.opacity <= 0.01) return;
      const pos = posOnRoute(van.route, van.dist);
      van.heading = pos.heading + (van.dir < 0 ? Math.PI : 0);

      ctx.save();
      ctx.globalAlpha = van.opacity;

      ctx.save();
      ctx.translate(pos.x, pos.y);
      ctx.rotate(van.heading);

      ctx.fillStyle = "rgba(15,23,42,0.22)";
      ctx.beginPath(); ctx.roundRect(-VAN_W / 2 + 1, -VAN_H / 2 + 2, VAN_W, VAN_H, 5); ctx.fill();

      ctx.fillStyle = van.color;
      ctx.beginPath(); ctx.roundRect(-VAN_W / 2, -VAN_H / 2, VAN_W, VAN_H, 5); ctx.fill();

      ctx.fillStyle = "rgba(255,255,255,0.62)";
      ctx.beginPath(); ctx.roundRect(-VAN_W / 2 + 4, -VAN_H / 2 + 3, VAN_W - 12, 3.5, 2); ctx.fill();

      ctx.strokeStyle = "rgba(11,31,74,0.62)";
      ctx.lineWidth = 1.2;
      ctx.beginPath(); ctx.roundRect(-VAN_W / 2, -VAN_H / 2, VAN_W, VAN_H, 5); ctx.stroke();

      ctx.fillStyle = "rgba(11,31,74,0.85)";
      ctx.beginPath(); ctx.roundRect(VAN_W / 2 - 6, -VAN_H / 2 + 2, 4, VAN_H - 4, 1.5); ctx.fill();

      ctx.fillStyle = "#081632";
      ctx.beginPath();
      ctx.arc(-VAN_W / 2 + 7, VAN_H / 2 - 1.5, 2.2, 0, Math.PI * 2);
      ctx.arc(VAN_W / 2 - 7, VAN_H / 2 - 1.5, 2.2, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      drawVanEtaBadge(van, pos.x, pos.y);
      ctx.restore();
    }

    function draw(now) {
      if (prefersReducedMotion && reducedMotionDrawn) return;
      if (!lastFrame) lastFrame = now;
      const dt = Math.min(0.05, (now - lastFrame) / 1000);
      lastFrame = now;

      const w = canvas.width / dpr, h = canvas.height / dpr;
      ctx.clearRect(0, 0, w, h);

      drawMap(w, h);
      drawNodes(now);
      if (!prefersReducedMotion) {
        vans.forEach((van) => updateVan(van, now, dt));
        drawPulses(now);
      } else {
        vans.forEach((van) => { van.opacity = 1; });
      }
      vans.forEach((van) => drawVan(van, now));

      if (prefersReducedMotion) reducedMotionDrawn = true;
      else rafId = requestAnimationFrame(draw);
    }

    const ro = new ResizeObserver(() => resize());
    ro.observe(canvas.parentElement);
    window.addEventListener("resize", resize);
    resize();
    if (!prefersReducedMotion) rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} role="img" aria-label="Animated illustrated Coventry map with Van Hero vans delivering across local routes" />;
}
