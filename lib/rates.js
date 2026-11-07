// ============================================================================
//  VAN HERO / V.M.T REMOVALS — QUOTE RATE CARD (from VMT_Quote.xlsx)
//  Server-side only. Edit these to change prices.
// ============================================================================
import { INVENTORY } from "@/lib/inventory";

const ITEM_PRICES = Object.fromEntries(
  INVENTORY.flatMap((room) => room.items.map((it) => [it.id, it.price]))
);

export const RATES = {
  baseCallout: 40,      // £ call-out, on every quote
  // What the £40 call-out buys before anything is charged on top:
  freeLabourHours: 2,   // the first 2 hours
  freeCrew: 2,          // the driver and one more
  perPersonHourly: 15,  // £/hour for anyone beyond that, and for extra time
  minJobSubtotal: 50,   // no job is quoted below this before VAT

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

  // The sheet takes "Estimated job hours" and "Crew size" as manual inputs.
  // The website can't ask a customer those, so it works them out:
  //   hours = driving time to the address + handling time for the property
  //   crew  = from the property size
  // Anything the office passes in explicitly still wins over these.
  minJobHours: 2,     // nobody turns a van out for less; floors an estimate
  avgSpeedMph: 60,     // realistic UK average for a loaded van, motorway + towns

  // hours spent loading and unloading, by property size
  handling: {
    "Studio": 2,
    "1 Bed Flat": 2, "2 Bed Flat": 3, "3 Bed Flat": 4, "4+ Bed Flat": 5,
    "1 Bed Bungalow": 2, "2 Bed Bungalow": 3, "3 Bed Bungalow": 4, "4+ Bed Bungalow": 5,
    "1 Bed House": 2.5, "2 Bed House": 3, "3 Bed House": 4, "4 Bed House": 5, "5+ Bed House": 6,
  },
  defaultHandling: 3,

  // crew size by property size
  crewFor: {
    "Studio": 2,
    "1 Bed Flat": 2, "2 Bed Flat": 2, "3 Bed Flat": 3, "4+ Bed Flat": 3,
    "1 Bed Bungalow": 2, "2 Bed Bungalow": 2, "3 Bed Bungalow": 3, "4+ Bed Bungalow": 4,
    "1 Bed House": 2, "2 Bed House": 2, "3 Bed House": 3, "4 Bed House": 4, "5+ Bed House": 4,
  },
  defaultCrew: 2,


  // Per-item inventory unit prices — derived from lib/inventory.js so the
  // prices the customer sees in the wizard are exactly what we charge.
  items: ITEM_PRICES,
};
