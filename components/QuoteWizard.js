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
  const [roomIdx, setRoomIdx] = useState(0);
  const [otherItems, setOtherItems] = useState("");
  const [extras, setExtras] = useState([]);
  const [contact, setContact] = useState({ name: "", phone: "", email: "" });
  const [notes, setNotes] = useState("");
  const [miles, setMiles] = useState(null);
  const [coords, setCoords] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const rootRef = useRef(null);

  // When the step changes, bring the top of the wizard into view. Without this
  // you tap "Next" and land somewhere in the middle of the next step.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top;
    if (top < 0 || top > window.innerHeight * 0.5) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [step]);

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
  const ALL_ITEMS = INVENTORY.flatMap((r) => r.items);
  const itemsTotal = Object.entries(inventory).reduce((sum, [id, q]) => {
    const it = ALL_ITEMS.find((x) => x.id === id);
    return sum + (it ? it.price * q : 0);
  }, 0);
  const room = INVENTORY[roomIdx];
  const roomCount = (r) => r.items.reduce((n, it) => n + (inventory[it.id] || 0), 0);
  const money = (n) => String(Number(n.toFixed(2)));

  async function submit() {
    setError("");
    if (!contact.name || !contact.phone || !contact.email) { setError("Please fill in your name, phone and email."); return; }
    setLoading(true);
    try {
      const r = await fetch("/api/quote", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pickup, delivery, inventory, extras, contact, notes, otherItems, moveDate: noDate ? "flexible" : moveDate, mode: "quote" }),
      });
      const j = await r.json();
      if (j.ok) setResult(j); else setError(j.error || "Something went wrong.");
    } catch { setError("Could not reach the server. Please try again."); }
    setLoading(false);
  }

  // text-[16px] on mobile stops iOS Safari auto-zooming the page on focus
  // Tapping anywhere on a date field should open the picker (browsers only do
  // that for the tiny calendar icon), and a move date can't be in the past.
  const today = new Date().toISOString().split("T")[0];
  const openPicker = (e) => { try { e.currentTarget.showPicker?.(); } catch {} };

  const field = "w-full px-3 py-3 sm:py-2.5 border border-line rounded-xl bg-white text-ink text-[16px] sm:text-[.9rem] focus:outline-none focus:ring-2 focus:ring-brand-yellow";
  const lab = "block text-[.72rem] font-bold uppercase tracking-wide text-ink mb-1";

  if (result) {
    return (
      <div className="min-w-0 bg-white rounded-2xl p-6 md:p-8 shadow-[0_40px_80px_-40px_rgba(0,0,0,.7)] text-center">
        <div className="text-3xl">✅</div>
        <h3 className="font-display font-bold text-ink text-[1.4rem] mt-2">Your quote is booked!</h3>
        {result.reference && (
          <div className="mt-2">
            <div className="text-[.75rem] uppercase tracking-wide text-muted">Your reference</div>
            <div className="inline-block mt-1 bg-brand-yellow text-ink font-display font-bold px-4 py-1.5 rounded-lg">{result.reference}</div>
          </div>
        )}
        <div className="font-display font-black text-brand-blue text-[3rem] leading-none my-3">£{Number(result.quote).toFixed(2)}</div>
        <p className="text-muted text-[.9rem]">Estimated guide price{result.miles ? ` · ${result.miles} miles` : ""}. A Van Hero will be in touch shortly to confirm. Quote your reference when you call.</p>
        <div className="mt-5 text-left max-w-[320px] mx-auto">
          {result.breakdown?.map((b, i) => (
            <div key={i} className="flex justify-between text-[.85rem] py-1 border-b border-line last:border-0"><span className="text-muted">{b.label}</span><span className="font-semibold text-ink">£{Number(b.amount).toFixed(2)}</span></div>
          ))}
        </div>
        <a href="tel:+447847117933" className="mt-6 inline-flex bg-brand-yellow text-ink font-display font-bold px-6 py-3 rounded-xl">Call to confirm →</a>
      </div>
    );
  }

  // min-w-0: as a grid item this must be allowed to shrink, otherwise the
  // scrollable room-tab row stretches the whole section on mobile.
  return (
    <div ref={rootRef} className="min-w-0 scroll-mt-24 bg-white rounded-2xl p-5 md:p-6 shadow-[0_40px_80px_-40px_rgba(0,0,0,.7)]">
      {/* progress */}
      <div className="flex items-center gap-1.5 sm:gap-2 mb-5">
        {["Move", "Inventory", "Details"].map((label, i) => (
          <div key={label} className="flex items-center gap-1.5 sm:gap-2 flex-1 min-w-0">
            <span className={`w-7 h-7 shrink-0 rounded-full grid place-items-center text-[.8rem] font-bold ${step >= i + 1 ? "bg-brand-yellow text-ink" : "bg-soft text-muted"}`}>{i + 1}</span>
            <span className={`text-[.72rem] sm:text-[.78rem] font-semibold whitespace-nowrap ${step >= i + 1 ? "text-ink" : "text-muted"}`}>{label}</span>
            {i < 2 && <span className="flex-1 min-w-[8px] h-px bg-line" />}
          </div>
        ))}
      </div>

      {/* STEP 1 */}
      {step === 1 && (
        <div className="flex flex-col gap-4">
          {[{ key: "pickup", label: "Moving from", data: pickup }, { key: "delivery", label: "Moving to", data: delivery }].map(({ key, label, data }) => (
            <div key={key} className="bg-soft rounded-xl p-4 border border-line">
              <div className="font-display font-bold text-ink text-[.95rem] mb-2">{label}</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div><label className={lab}>Postcode *</label><input className={field} placeholder={key === "pickup" ? "CV1 2WT" : "B1 1BB"} value={data.postcode} onChange={(e) => setP(key)({ postcode: e.target.value })} /></div>
                <div><label className={lab}>Property *</label>
                  <select className={field} value={data.type} onChange={(e) => setP(key)({ type: e.target.value, size: "" })}>
                    <option value="">Select</option>{PROPERTY_TYPES.map((t) => <option key={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              {data.type && data.type !== "Studio" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
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
                <label className="mt-2 flex items-center gap-2.5 text-[.82rem] text-muted py-1.5 cursor-pointer"><input type="checkbox" className="w-[18px] h-[18px] shrink-0 accent-[#ffd41c]" checked={data.lift} onChange={(e) => setP(key)({ lift: e.target.checked })} /> Lift available</label>
              )}
            </div>
          ))}
          <div>
            <label className={lab}>Move date</label>
            <input type="date" min={today} className={`${field} cursor-pointer`} value={moveDate} disabled={noDate} onClick={openPicker} onFocus={openPicker} onChange={(e) => setMoveDate(e.target.value)} />
            <label className="mt-2 flex items-center gap-2.5 text-[.82rem] text-muted py-1.5 cursor-pointer"><input type="checkbox" className="w-[18px] h-[18px] shrink-0 accent-[#ffd41c]" checked={noDate} onChange={(e) => setNoDate(e.target.checked)} /> I don&apos;t have a move date yet</label>
          </div>
          <button disabled={!validStep1} onClick={() => setStep(2)} className="bg-brand-yellow text-ink font-display font-bold px-6 py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5 transition">Next: Inventory →</button>
        </div>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <div className="flex flex-col gap-4">
          <div className="rounded-xl overflow-hidden border border-line">
            <div ref={mapRef} className="w-full h-[210px] sm:h-[180px] bg-softblue" />
            <div className="flex items-center justify-between px-4 py-2.5 bg-navy text-white text-[.85rem]">
              <span>{pickup.postcode?.toUpperCase()} → {delivery.postcode?.toUpperCase()}</span>
              <span className="font-bold text-brand-yellow">{miles != null ? `${miles} mi` : "…"}</span>
            </div>
          </div>

          {/* room tabs — jump around; badge shows what's already added */}
          <div className="flex gap-1.5 overflow-x-auto pb-1 -mx-1 px-1">
            {INVENTORY.map((r, i) => {
              const n = roomCount(r);
              return (
                <button
                  key={r.room}
                  onClick={() => setRoomIdx(i)}
                  className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[.78rem] font-semibold whitespace-nowrap transition ${i === roomIdx ? "bg-navy text-white" : "bg-soft text-muted hover:bg-softblue"}`}
                >
                  {r.room}
                  {n > 0 && <span className="px-1.5 rounded bg-brand-yellow text-ink text-[.68rem]">{n}</span>}
                </button>
              );
            })}
          </div>

          {/* current room, with each item's own price */}
          <div>
            <div className="flex items-baseline justify-between mb-1">
              <h4 className="font-display font-bold text-ink text-[1.05rem]">{room.room}</h4>
              <span className="text-[.74rem] text-muted">Room {roomIdx + 1} of {INVENTORY.length}</span>
            </div>
            <p className="text-[.76rem] text-muted mb-2">Tap an item to add it, or use + / −.</p>

            <div className="flex flex-col gap-1">
              {room.items.map((it) => {
                const qty = inventory[it.id] || 0;
                return (
                  <div
                    key={it.id}
                    className={`flex items-center justify-between gap-3 min-h-[56px] py-2 px-2 -mx-1 rounded-lg border-b border-line/70 last:border-0 transition ${qty ? "bg-brand-yellow/15" : ""}`}
                  >
                    <button
                      type="button"
                      onClick={() => bump(it.id, 1)}
                      className="min-w-0 flex-1 text-left"
                      aria-label={`Add one ${it.label}`}
                    >
                      <span className="block text-[.9rem] text-ink leading-tight">{it.label}</span>
                      <span className="block text-[.78rem] text-muted whitespace-nowrap">
                        £{money(it.price)} each{qty > 1 ? ` · £${money(it.price * qty)}` : ""}
                      </span>
                    </button>
                    <div className="flex items-center gap-2 shrink-0">
                      <button aria-label={`Remove one ${it.label}`} onClick={() => bump(it.id, -1)} className="w-9 h-9 sm:w-8 sm:h-8 rounded-lg bg-soft text-ink font-bold text-[1.05rem] active:scale-95 transition">−</button>
                      <span className="w-6 text-center font-semibold text-ink tabular-nums">{qty}</span>
                      <button aria-label={`Add another ${it.label}`} onClick={() => bump(it.id, 1)} className="w-9 h-9 sm:w-8 sm:h-8 rounded-lg bg-brand-yellow text-ink font-bold text-[1.05rem] active:scale-95 transition">+</button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* walk them through every room */}
            <div className="flex items-center gap-2 mt-3">
              <button
                onClick={() => setRoomIdx((i) => Math.max(0, i - 1))}
                disabled={roomIdx === 0}
                className="flex-1 border-2 border-line text-ink font-display font-bold px-3 py-2.5 rounded-xl text-[.9rem] disabled:opacity-40"
              >
                ← Previous
              </button>
              <button
                onClick={() => setRoomIdx((i) => Math.min(INVENTORY.length - 1, i + 1))}
                disabled={roomIdx === INVENTORY.length - 1}
                className="flex-[1.4] bg-navy text-white font-display font-bold px-3 py-2.5 rounded-xl text-[.9rem] disabled:opacity-40"
              >
                Next room →
              </button>
            </div>
          </div>

          {/* anything that isn't on the list */}
          <div>
            <label className={lab}>Any other items?</label>
            <textarea
              rows={2}
              className={field}
              placeholder="Not on the list? Tell us here — e.g. fish tank, gym rack, 2 bikes…"
              value={otherItems}
              onChange={(e) => setOtherItems(e.target.value)}
            />
            <span className="block text-[.74rem] text-muted mt-1">We&apos;ll price these when we confirm your quote.</span>
          </div>

          {/* running total of what they've picked */}
          <div className="flex items-center justify-between bg-softblue rounded-xl px-4 py-3">
            <span className="text-[.85rem] text-muted">{itemCount} item{itemCount === 1 ? "" : "s"} selected</span>
            <span className="font-display font-bold text-ink">£{money(itemsTotal)}</span>
          </div>

          <div className="flex gap-2">
            <button onClick={() => setStep(1)} className="flex-1 border-2 border-ink text-ink font-display font-bold px-4 py-3 rounded-xl">← Back</button>
            <button onClick={() => setStep(3)} className="flex-[2] bg-brand-yellow text-ink font-display font-bold px-4 py-3 rounded-xl hover:-translate-y-0.5 transition">Next: Your Details →</button>
          </div>
          <p className="text-[.74rem] text-muted text-center">Go through each room — skip anything you&apos;re unsure about.</p>
        </div>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <div className="flex flex-col gap-3">
          <div><label className={lab}>Full name *</label><input className={field} value={contact.name} onChange={(e) => setContact((c) => ({ ...c, name: e.target.value }))} placeholder="Your name" /></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div><label className={lab}>Phone *</label><input className={field} inputMode="tel" value={contact.phone} onChange={(e) => setContact((c) => ({ ...c, phone: e.target.value }))} placeholder="07123 456 789" /></div>
            <div><label className={lab}>Email *</label><input type="email" className={field} value={contact.email} onChange={(e) => setContact((c) => ({ ...c, email: e.target.value }))} placeholder="john@example.com" /></div>
          </div>
          <div>
            <label className={lab}>Anything else we should know?</label>
            <textarea
              rows={3}
              className={field}
              placeholder="Stairs, lift, parking, heavy or fragile items, access problems — tell us as much as you can."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
          <div>
            <div className={lab}>Add-ons (optional)</div>
            <div className="flex flex-col gap-1.5">
              {EXTRAS.map((p) => (
                <label key={p} className="flex items-center gap-2.5 text-[.88rem] text-muted py-1.5 cursor-pointer"><input type="checkbox" className="w-[18px] h-[18px] shrink-0 accent-[#ffd41c]" checked={extras.includes(p)} onChange={(e) => setExtras((arr) => e.target.checked ? [...arr, p] : arr.filter((x) => x !== p))} /> {p}</label>
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
