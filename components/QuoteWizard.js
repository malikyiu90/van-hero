"use client";
import { useEffect, useRef, useState } from "react";
import { INVENTORY, EXTRAS, PROPERTY_TYPES, SIZES, FLOORS } from "@/lib/inventory";

const emptyProp = { type: "", size: "", floor: "Ground floor", lift: false, postcode: "" };

function useLeaflet() {
  const [L, setL] = useState(null);
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.L) { setL(window.L); return; }
    if (!document.getElementById("leaflet-css")) {
      const css = document.createElement("link");
      css.id = "leaflet-css"; css.rel = "stylesheet";
      css.href = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css";
      document.head.appendChild(css);
    }
    const s = document.createElement("script");
    s.src = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js";
    s.onload = () => setL(window.L);
    document.body.appendChild(s);
  }, []);
  return L;
}

async function pcCoords(pc) {
  try {
    const r = await fetch(`https://api.postcodes.io/postcodes/${encodeURIComponent(pc.trim())}`);
    const j = await r.json();
    if (j.status === 200) return { lat: j.result.latitude, lon: j.result.longitude };
  } catch {}
  return null;
}

export default function QuoteWizard() {
  const [step, setStep] = useState(1);
  const [pickup, setPickup] = useState({ ...emptyProp });
  const [delivery, setDelivery] = useState({ ...emptyProp });
  const [moveDate, setMoveDate] = useState("");
  const [noDate, setNoDate] = useState(false);
  const [inventory, setInventory] = useState({});
  const [activeRoom, setActiveRoom] = useState(INVENTORY[0].room);
  const [extras, setExtras] = useState([]);
  const [contact, setContact] = useState({ name: "", phone: "", email: "" });
  const [miles, setMiles] = useState(null);
  const [coords, setCoords] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const L = useLeaflet();
  const mapRef = useRef(null);
  const mapObj = useRef(null);

  const setP = (which) => (patch) => (which === "pickup" ? setPickup((s) => ({ ...s, ...patch })) : setDelivery((s) => ({ ...s, ...patch })));

  // fetch coords + distance when entering step 2
  useEffect(() => {
    if (step !== 2) return;
    let on = true;
    (async () => {
      const a = await pcCoords(pickup.postcode);
      const b = await pcCoords(delivery.postcode);
      if (!on) return;
      if (a && b) {
        setCoords({ a, b });
        const R = 3958.8, dLat = ((b.lat - a.lat) * Math.PI) / 180, dLon = ((b.lon - a.lon) * Math.PI) / 180;
        const la1 = (a.lat * Math.PI) / 180, la2 = (b.lat * Math.PI) / 180;
        const h = Math.sin(dLat / 2) ** 2 + Math.cos(la1) * Math.cos(la2) * Math.sin(dLon / 2) ** 2;
        setMiles(Math.round(2 * R * Math.asin(Math.sqrt(h)) * 1.3));
      }
    })();
    return () => { on = false; };
  }, [step, pickup.postcode, delivery.postcode]);

  // draw map
  useEffect(() => {
    if (!L || step !== 2 || !coords || !mapRef.current) return;
    if (mapObj.current) { mapObj.current.remove(); mapObj.current = null; }
    const map = L.map(mapRef.current, { scrollWheelZoom: false, attributionControl: false });
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);
    const yellow = L.divIcon({ className: "", html: '<div style="width:16px;height:16px;border-radius:50%;background:#ffd41c;border:3px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,.4)"></div>', iconSize: [16, 16] });
    const green = L.divIcon({ className: "", html: '<div style="width:16px;height:16px;border-radius:50%;background:#10b981;border:3px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,.4)"></div>', iconSize: [16, 16] });
    const p1 = [coords.a.lat, coords.a.lon], p2 = [coords.b.lat, coords.b.lon];
    L.marker(p1, { icon: yellow }).addTo(map);
    L.marker(p2, { icon: green }).addTo(map);
    L.polyline([p1, p2], { color: "#002496", weight: 3, dashArray: "6 8" }).addTo(map);
    map.fitBounds([p1, p2], { padding: [30, 30] });
    mapObj.current = map;
    return () => { if (mapObj.current) { mapObj.current.remove(); mapObj.current = null; } };
  }, [L, step, coords]);

  const bump = (id, delta) =>
    setInventory((inv) => {
      const n = Math.max(0, (inv[id] || 0) + delta);
      const next = { ...inv };
      if (n === 0) delete next[id]; else next[id] = n;
      return next;
    });

  const validStep1 = pickup.postcode && delivery.postcode && pickup.type && delivery.type && (pickup.type === "Studio" || pickup.size) && (delivery.type === "Studio" || delivery.size);
  const itemCount = Object.values(inventory).reduce((a, b) => a + b, 0);

  async function submit() {
    setError("");
    if (!contact.name || !contact.phone || !contact.email) { setError("Please fill in your name, phone and email."); return; }
    setLoading(true);
    try {
      const r = await fetch("/api/quote", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pickup, delivery, inventory, extras, contact, moveDate: noDate ? "flexible" : moveDate, mode: "quote" }),
      });
      const j = await r.json();
      if (j.ok) setResult(j); else setError(j.error || "Something went wrong.");
    } catch { setError("Could not reach the server. Please try again."); }
    setLoading(false);
  }

  const field = "w-full px-3 py-2.5 border border-line rounded-xl bg-white text-ink text-[.9rem] focus:outline-none focus:ring-2 focus:ring-brand-yellow";
  const lab = "block text-[.72rem] font-bold uppercase tracking-wide text-ink mb-1";

  if (result) {
    return (
      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-[0_40px_80px_-40px_rgba(0,0,0,.7)] text-center">
        <div className="text-3xl">✅</div>
        <h3 className="font-display font-bold text-ink text-[1.4rem] mt-2">Your quote is booked!</h3>
        <div className="font-display font-black text-brand-blue text-[3rem] leading-none my-3">£{result.quote}</div>
        <p className="text-muted text-[.9rem]">Estimated guide price{result.miles ? ` · ${result.miles} miles` : ""}. A Van Hero will be in touch shortly to confirm.</p>
        <div className="mt-5 text-left max-w-[320px] mx-auto">
          {result.breakdown?.map((b, i) => (
            <div key={i} className="flex justify-between text-[.85rem] py-1 border-b border-line last:border-0"><span className="text-muted">{b.label}</span><span className="font-semibold text-ink">£{b.amount}</span></div>
          ))}
        </div>
        <a href="tel:+447847117933" className="mt-6 inline-flex bg-brand-yellow text-ink font-display font-bold px-6 py-3 rounded-xl">Call to confirm →</a>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-5 md:p-6 shadow-[0_40px_80px_-40px_rgba(0,0,0,.7)]">
      {/* progress */}
      <div className="flex items-center gap-2 mb-5">
        {["Move", "Inventory", "Details"].map((label, i) => (
          <div key={label} className="flex items-center gap-2 flex-1">
            <span className={`w-7 h-7 shrink-0 rounded-full grid place-items-center text-[.8rem] font-bold ${step >= i + 1 ? "bg-brand-yellow text-ink" : "bg-soft text-muted"}`}>{i + 1}</span>
            <span className={`text-[.78rem] font-semibold ${step >= i + 1 ? "text-ink" : "text-muted"}`}>{label}</span>
            {i < 2 && <span className="flex-1 h-px bg-line" />}
          </div>
        ))}
      </div>

      {/* STEP 1 */}
      {step === 1 && (
        <div className="flex flex-col gap-4">
          {[{ key: "pickup", label: "Moving from", data: pickup }, { key: "delivery", label: "Moving to", data: delivery }].map(({ key, label, data }) => (
            <div key={key} className="bg-soft rounded-xl p-4 border border-line">
              <div className="font-display font-bold text-ink text-[.95rem] mb-2">{label}</div>
              <div className="grid grid-cols-2 gap-2">
                <div><label className={lab}>Postcode *</label><input className={field} placeholder={key === "pickup" ? "CV1 2WT" : "B1 1BB"} value={data.postcode} onChange={(e) => setP(key)({ postcode: e.target.value })} /></div>
                <div><label className={lab}>Property *</label>
                  <select className={field} value={data.type} onChange={(e) => setP(key)({ type: e.target.value, size: "" })}>
                    <option value="">Select</option>{PROPERTY_TYPES.map((t) => <option key={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              {data.type && data.type !== "Studio" && (
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div><label className={lab}>Size *</label>
                    <select className={field} value={data.size} onChange={(e) => setP(key)({ size: e.target.value })}>
                      <option value="">Select size</option>{(SIZES[data.type] || []).map((s) => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                  {data.type === "Flat" && (
                    <div><label className={lab}>Floor</label>
                      <select className={field} value={data.floor} onChange={(e) => setP(key)({ floor: e.target.value })}>{FLOORS.map((f) => <option key={f}>{f}</option>)}</select>
                    </div>
                  )}
                </div>
              )}
              {data.type === "Flat" && (
                <label className="mt-2 flex items-center gap-2 text-[.82rem] text-muted"><input type="checkbox" checked={data.lift} onChange={(e) => setP(key)({ lift: e.target.checked })} /> Lift available</label>
              )}
            </div>
          ))}
          <div>
            <label className={lab}>Move date</label>
            <input type="date" className={field} value={moveDate} disabled={noDate} onChange={(e) => setMoveDate(e.target.value)} />
            <label className="mt-2 flex items-center gap-2 text-[.82rem] text-muted"><input type="checkbox" checked={noDate} onChange={(e) => setNoDate(e.target.checked)} /> I don&apos;t have a move date yet</label>
          </div>
          <button disabled={!validStep1} onClick={() => setStep(2)} className="bg-brand-yellow text-ink font-display font-bold px-6 py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5 transition">Next: Inventory →</button>
        </div>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <div className="flex flex-col gap-4">
          <div className="rounded-xl overflow-hidden border border-line">
            <div ref={mapRef} className="w-full h-[180px] bg-softblue" />
            <div className="flex items-center justify-between px-4 py-2.5 bg-navy text-white text-[.85rem]">
              <span>{pickup.postcode?.toUpperCase()} → {delivery.postcode?.toUpperCase()}</span>
              <span className="font-bold text-brand-yellow">{miles != null ? `${miles} mi` : "…"}</span>
            </div>
          </div>

          <div>
            <div className="flex gap-1.5 overflow-x-auto pb-1 -mx-1 px-1">
              {INVENTORY.map((r) => (
                <button key={r.room} onClick={() => setActiveRoom(r.room)} className={`shrink-0 px-3 py-1.5 rounded-lg text-[.78rem] font-semibold whitespace-nowrap ${activeRoom === r.room ? "bg-navy text-white" : "bg-soft text-muted"}`}>{r.room}</button>
              ))}
            </div>
            <div className="mt-3 flex flex-col gap-1.5 max-h-[220px] overflow-y-auto pr-1">
              {INVENTORY.find((r) => r.room === activeRoom).items.map((it) => (
                <div key={it.id} className="flex items-center justify-between py-1.5 border-b border-line last:border-0">
                  <span className="text-[.9rem] text-ink">{it.label}</span>
                  <div className="flex items-center gap-2.5">
                    <button onClick={() => bump(it.id, -1)} className="w-7 h-7 rounded-lg bg-soft text-ink font-bold">−</button>
                    <span className="w-5 text-center font-semibold text-ink tabular-nums">{inventory[it.id] || 0}</span>
                    <button onClick={() => bump(it.id, 1)} className="w-7 h-7 rounded-lg bg-brand-yellow text-ink font-bold">+</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <button onClick={() => setStep(1)} className="flex-1 border-2 border-ink text-ink font-display font-bold px-4 py-3 rounded-xl">← Back</button>
            <button onClick={() => setStep(3)} className="flex-[2] bg-brand-yellow text-ink font-display font-bold px-4 py-3 rounded-xl hover:-translate-y-0.5 transition">Next: Your Details →</button>
          </div>
          <p className="text-[.74rem] text-muted text-center">{itemCount} item{itemCount === 1 ? "" : "s"} added · you can skip items you're unsure about</p>
        </div>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <div className="flex flex-col gap-3">
          <div><label className={lab}>Full name *</label><input className={field} value={contact.name} onChange={(e) => setContact((c) => ({ ...c, name: e.target.value }))} placeholder="Your name" /></div>
          <div className="grid grid-cols-2 gap-2">
            <div><label className={lab}>Phone *</label><input className={field} value={contact.phone} onChange={(e) => setContact((c) => ({ ...c, phone: e.target.value }))} placeholder="07123 456 789" /></div>
            <div><label className={lab}>Email *</label><input type="email" className={field} value={contact.email} onChange={(e) => setContact((c) => ({ ...c, email: e.target.value }))} placeholder="john@example.com" /></div>
          </div>
          <div>
            <div className={lab}>Add-ons (optional)</div>
            <div className="flex flex-col gap-1.5">
              {EXTRAS.map((p) => (
                <label key={p} className="flex items-center gap-2 text-[.88rem] text-muted"><input type="checkbox" checked={extras.includes(p)} onChange={(e) => setExtras((arr) => e.target.checked ? [...arr, p] : arr.filter((x) => x !== p))} /> {p}</label>
              ))}
            </div>
          </div>
          {error && <p className="text-[.85rem] text-red-600">{error}</p>}
          <div className="flex gap-2">
            <button onClick={() => setStep(2)} className="flex-1 border-2 border-ink text-ink font-display font-bold px-4 py-3 rounded-xl">← Back</button>
            <button onClick={submit} disabled={loading} className="flex-[2] bg-brand-yellow text-ink font-display font-bold px-4 py-3 rounded-xl disabled:opacity-60 hover:-translate-y-0.5 transition">{loading ? "Calculating…" : "Reveal My Quote →"}</button>
          </div>
          <p className="text-[.72rem] text-muted text-center">By submitting you agree to be contacted by Van Hero about your enquiry.</p>
        </div>
      )}
    </div>
  );
}
