// Client-safe inventory labels (prices live server-side in lib/rates.js).
// Mirrors the V.M.T Removals "Inventory" sheet exactly.
export const INVENTORY = [
  { room: "Living room", items: [
    { id: "sofa-2", label: "2-seater sofa" }, { id: "sofa-3", label: "3-seater sofa" }, { id: "corner-sofa", label: "Corner / L-shaped sofa" },
    { id: "sofa-bed", label: "Sofa bed" }, { id: "recliner", label: "Recliner" }, { id: "armchair", label: "Armchair" },
    { id: "coffee-table", label: "Coffee table" }, { id: "tv", label: "TV" }, { id: "tv-stand", label: "TV stand" },
    { id: "bookcase", label: "Bookcase" }, { id: "sideboard", label: "Sideboard" },
  ]},
  { room: "Dining", items: [
    { id: "dining-small", label: "Dining table (small)" }, { id: "dining-large", label: "Dining table (large)" },
    { id: "dining-chair", label: "Dining chair" }, { id: "display-cabinet", label: "Display cabinet" },
  ]},
  { room: "Kitchen", items: [
    { id: "fridge", label: "Fridge" }, { id: "freezer", label: "Freezer" }, { id: "fridge-freezer", label: "Fridge-freezer" },
    { id: "american-fridge", label: "American fridge-freezer" }, { id: "washing-machine", label: "Washing machine" },
    { id: "tumble-dryer", label: "Tumble dryer" }, { id: "dishwasher", label: "Dishwasher" }, { id: "cooker", label: "Cooker / oven" },
  ]},
  { room: "Bedroom", items: [
    { id: "single-bed", label: "Single bed" }, { id: "double-bed", label: "Double bed" }, { id: "king-bed", label: "King / super king bed" },
    { id: "bunk-bed", label: "Bunk bed" }, { id: "single-mattress", label: "Single mattress" }, { id: "double-mattress", label: "Double mattress" },
    { id: "king-mattress", label: "King / super king mattress" }, { id: "bedside-table", label: "Bedside table" }, { id: "chest-drawers", label: "Chest of drawers" },
    { id: "wardrobe-small", label: "Small wardrobe" }, { id: "wardrobe-double", label: "Double wardrobe" }, { id: "wardrobe-triple", label: "Triple / large wardrobe" }, { id: "wardrobe-sliding", label: "Sliding-door wardrobe" },
  ]},
  { room: "Office", items: [
    { id: "desk", label: "Office desk" }, { id: "office-chair", label: "Office chair" }, { id: "filing-cabinet", label: "Filing cabinet" }, { id: "printer", label: "Printer / copier" },
  ]},
  { room: "General", items: [
    { id: "general-box", label: "General box" }, { id: "picture", label: "Large picture / artwork" }, { id: "suitcase", label: "Suitcase" }, { id: "mirror", label: "Mirror" },
  ]},
  { room: "Garden / Garage", items: [
    { id: "garden-table", label: "Garden table" }, { id: "garden-chair", label: "Garden chair" }, { id: "bbq", label: "BBQ" },
    { id: "lawnmower", label: "Lawn mower" }, { id: "bicycle", label: "Bicycle" }, { id: "tool-chest", label: "Tool chest" },
    { id: "garage-shelving", label: "Garage shelving" }, { id: "trampoline", label: "Trampoline" },
    { id: "shed-small", label: "Shed contents - small" }, { id: "shed-large", label: "Shed contents - large" },
  ]},
  { room: "Nursery", items: [
    { id: "cot", label: "Cot / cot bed" }, { id: "pushchair", label: "Pushchair / pram" }, { id: "toy-box", label: "Toy box" },
  ]},
  { room: "Gym / Hobby", items: [
    { id: "treadmill", label: "Treadmill" }, { id: "exercise-bike", label: "Exercise bike" }, { id: "cross-trainer", label: "Cross trainer" },
    { id: "rowing-machine", label: "Rowing machine" }, { id: "weight-bench", label: "Weight bench" }, { id: "multi-gym", label: "Multi-gym" }, { id: "drum-kit", label: "Drum kit" },
  ]},
  { room: "Heavy / Specialist", items: [
    { id: "piano-upright", label: "Upright piano" }, { id: "piano-baby-grand", label: "Baby grand piano" }, { id: "piano-grand", label: "Grand piano" },
    { id: "safe", label: "Large safe" }, { id: "pool-table", label: "Pool / snooker table" }, { id: "marble-table", label: "Marble / stone table" },
    { id: "aquarium", label: "Large aquarium / fish tank" }, { id: "hot-tub", label: "Hot tub / spa" }, { id: "antique", label: "Large antique furniture" },
    { id: "fine-art", label: "Fine art / valuable artwork" }, { id: "commercial-gym", label: "Commercial gym machine" }, { id: "workshop", label: "Heavy workshop equipment" },
  ]},
  { room: "Boxes / Loft", items: [
    { id: "loft-box", label: "Loft box" }, { id: "storage-crate", label: "Storage crate" }, { id: "cellar-box", label: "Cellar box" },
    { id: "small-box", label: "Small box" }, { id: "medium-box", label: "Medium box" }, { id: "large-box", label: "Large box" },
  ]},
];

// Optional add-ons (packing + furniture work) shown in step 3
export const EXTRAS = [
  "Full packing service",
  "Fragile items only",
  "Dismantling + reassembly",
  "Storage handling",
];

export const PROPERTY_TYPES = ["Studio", "Flat", "Bungalow", "House"];
export const SIZES = {
  Studio: ["Studio"],
  Flat: ["1 Bed Flat", "2 Bed Flat", "3 Bed Flat", "4+ Bed Flat"],
  Bungalow: ["1 Bed Bungalow", "2 Bed Bungalow", "3 Bed Bungalow", "4+ Bed Bungalow"],
  House: ["1 Bed House", "2 Bed House", "3 Bed House", "4 Bed House", "5+ Bed House"],
};
export const FLOORS = ["Ground floor", "1st floor", "2nd floor", "3rd floor", "4th+ floor"];
