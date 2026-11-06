// ============================================================================
//  VAN HERO / V.M.T REMOVALS — QUOTE RATE CARD (from VMT_Quote.xlsx)
//  Server-side only. Edit these to change prices.
// ============================================================================

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

  // Per-item inventory unit prices (exact from the Inventory sheet)
  items: {
    "sofa-2": 15, "sofa-3": 20, "corner-sofa": 30, "sofa-bed": 30, "recliner": 20, "armchair": 12, "coffee-table": 8, "tv": 10, "tv-stand": 10, "bookcase": 12, "sideboard": 15,
    "dining-small": 15, "dining-large": 25, "dining-chair": 4, "display-cabinet": 18,
    "fridge": 20, "freezer": 20, "fridge-freezer": 25, "american-fridge": 75, "washing-machine": 25, "tumble-dryer": 20, "dishwasher": 25, "cooker": 30,
    "single-bed": 20, "double-bed": 25, "king-bed": 35, "bunk-bed": 30, "single-mattress": 10, "double-mattress": 15, "king-mattress": 20, "bedside-table": 5, "chest-drawers": 12, "wardrobe-small": 20, "wardrobe-double": 30, "wardrobe-triple": 45, "wardrobe-sliding": 50,
    "desk": 12, "office-chair": 5, "filing-cabinet": 12, "printer": 10,
    "general-box": 2, "picture": 8, "suitcase": 4, "mirror": 8,
    "garden-table": 15, "garden-chair": 4, "bbq": 15, "lawnmower": 15, "bicycle": 10, "tool-chest": 20, "garage-shelving": 15, "trampoline": 30, "shed-small": 50, "shed-large": 100,
    "cot": 15, "pushchair": 10, "toy-box": 5,
    "treadmill": 50, "exercise-bike": 30, "cross-trainer": 40, "rowing-machine": 35, "weight-bench": 30, "multi-gym": 75, "drum-kit": 40,
    "piano-upright": 150, "piano-baby-grand": 300, "piano-grand": 450, "safe": 150, "pool-table": 250, "marble-table": 100, "aquarium": 100, "hot-tub": 250, "antique": 75, "fine-art": 50, "commercial-gym": 100, "workshop": 100,
    "loft-box": 4, "storage-crate": 4, "cellar-box": 4, "small-box": 1.5, "medium-box": 3, "large-box": 4.25,
  },
};
