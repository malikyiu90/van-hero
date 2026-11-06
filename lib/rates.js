// ============================================================================
//  VAN HERO / V.M.T REMOVALS — QUOTE RATE CARD (from VMT_Quote.xlsx)
//  Server-side only. Edit these to change prices.
// ============================================================================
import { INVENTORY } from "@/lib/inventory";

const ITEM_PRICES = Object.fromEntries(
  INVENTORY.flatMap((room) => room.items.map((it) => [it.id, it.price]))
);

export const RATES = {
  baseCallout: 40, // £ applied to every quote

  // Labour: hours × crew hourly rate
  crewHourly: { 1: 15, 2: 30, 3: 45, 4: 60 }, // £/hour by crew size
  mileageRate: 1.5, // £ per mile (all miles charged)
  freeMiles: 0,

  // Access surcharges
  stairsPerFloor: 30,   // £ per floor above ground (each address, when no usable lift)
  noLiftSurcharge: 50,  // £ per affected address (lift unavailable)
  loftSurcharge: 75,
  cellarSurcharge: 75,
  longCarry: 40,        // £ each (collection / delivery)
  parking: 40,          // £ per affected address
  extraTrip: 300,       // £ per additional trip
  storageHandling: 50,

  // Optional extras (packing + furniture work) — keyed by the EXTRAS labels
  extras: {
    "Full packing service": 180,
    "Fragile items only": 75,
    "Dismantling + reassembly": 90,
    "Dismantling": 50,
    "Reassembly": 50,
    "Storage handling": 50,
  },

  vat: 0.2, // 20%

  // Website auto-quote only: estimate crew + job hours from property size
  // (the Excel takes these as manual inputs; we estimate them for customers).
  estimate: {
    "Studio": { crew: 2, hours: 3 },
    "1 Bed Flat": { crew: 2, hours: 3 }, "2 Bed Flat": { crew: 2, hours: 4 }, "3 Bed Flat": { crew: 3, hours: 5 }, "4+ Bed Flat": { crew: 3, hours: 6 },
    "1 Bed Bungalow": { crew: 2, hours: 3 }, "2 Bed Bungalow": { crew: 2, hours: 4 }, "3 Bed Bungalow": { crew: 3, hours: 5 }, "4+ Bed Bungalow": { crew: 4, hours: 6 },
    "1 Bed House": { crew: 2, hours: 3 }, "2 Bed House": { crew: 2, hours: 4 }, "3 Bed House": { crew: 3, hours: 5 }, "4 Bed House": { crew: 4, hours: 6 }, "5+ Bed House": { crew: 4, hours: 8 },
  },
  defaultEstimate: { crew: 2, hours: 4 },

  // Per-item inventory unit prices — derived from lib/inventory.js so the
  // prices the customer sees in the wizard are exactly what we charge.
  items: ITEM_PRICES,
};
