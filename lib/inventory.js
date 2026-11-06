// Inventory items shown in the quote wizard. These prices are the single
// source of truth: lib/rates.js derives its server-side price map from here,
// so the figures the customer sees always match what we charge.
// Mirrors the V.M.T Removals "Inventory" sheet exactly.
export const INVENTORY = [
  { room: "Living room", items: [
    { id: "sofa-2", label: "2-seater sofa", price: 15 }, { id: "sofa-3", label: "3-seater sofa", price: 20 }, { id: "corner-sofa", label: "Corner / L-shaped sofa", price: 30 },
    { id: "sofa-bed", label: "Sofa bed", price: 30 }, { id: "recliner", label: "Recliner", price: 20 }, { id: "armchair", label: "Armchair", price: 12 },
    { id: "coffee-table", label: "Coffee table", price: 8 }, { id: "tv", label: "TV", price: 10 }, { id: "tv-stand", label: "TV stand", price: 10 },
    { id: "bookcase", label: "Bookcase", price: 12 }, { id: "sideboard", label: "Sideboard", price: 15 },
  ]},
  { room: "Dining", items: [
    { id: "dining-small", label: "Dining table (small)", price: 15 }, { id: "dining-large", label: "Dining table (large)", price: 25 },
    { id: "dining-chair", label: "Dining chair", price: 4 }, { id: "display-cabinet", label: "Display cabinet", price: 18 },
  ]},
  { room: "Kitchen", items: [
    { id: "fridge", label: "Fridge", price: 20 }, { id: "freezer", label: "Freezer", price: 20 }, { id: "fridge-freezer", label: "Fridge-freezer", price: 25 },
    { id: "american-fridge", label: "American fridge-freezer", price: 75 }, { id: "washing-machine", label: "Washing machine", price: 25 },
    { id: "tumble-dryer", label: "Tumble dryer", price: 20 }, { id: "dishwasher", label: "Dishwasher", price: 25 }, { id: "cooker", label: "Cooker / oven", price: 30 },
  ]},
  { room: "Bedroom", items: [
    { id: "single-bed", label: "Single bed", price: 20 }, { id: "double-bed", label: "Double bed", price: 25 }, { id: "king-bed", label: "King / super king bed", price: 35 },
    { id: "bunk-bed", label: "Bunk bed", price: 30 }, { id: "single-mattress", label: "Single mattress", price: 10 }, { id: "double-mattress", label: "Double mattress", price: 15 },
    { id: "king-mattress", label: "King / super king mattress", price: 20 }, { id: "bedside-table", label: "Bedside table", price: 5 }, { id: "chest-drawers", label: "Chest of drawers", price: 12 },
    { id: "wardrobe-small", label: "Small wardrobe", price: 20 }, { id: "wardrobe-double", label: "Double wardrobe", price: 30 }, { id: "wardrobe-triple", label: "Triple / large wardrobe", price: 45 }, { id: "wardrobe-sliding", label: "Sliding-door wardrobe", price: 50 },
  ]},
  { room: "Office", items: [
    { id: "desk", label: "Office desk", price: 12 }, { id: "office-chair", label: "Office chair", price: 5 }, { id: "filing-cabinet", label: "Filing cabinet", price: 12 }, { id: "printer", label: "Printer / copier", price: 10 },
  ]},
  { room: "General", items: [
    { id: "general-box", label: "General box", price: 2 }, { id: "picture", label: "Large picture / artwork", price: 8 }, { id: "suitcase", label: "Suitcase", price: 4 }, { id: "mirror", label: "Mirror", price: 8 },
  ]},
  { room: "Garden / Garage", items: [
    { id: "garden-table", label: "Garden table", price: 15 }, { id: "garden-chair", label: "Garden chair", price: 4 }, { id: "bbq", label: "BBQ", price: 15 },
    { id: "lawnmower", label: "Lawn mower", price: 15 }, { id: "bicycle", label: "Bicycle", price: 10 }, { id: "tool-chest", label: "Tool chest", price: 20 },
    { id: "garage-shelving", label: "Garage shelving", price: 15 }, { id: "trampoline", label: "Trampoline", price: 30 },
    { id: "shed-small", label: "Shed contents - small", price: 50 }, { id: "shed-large", label: "Shed contents - large", price: 100 },
  ]},
  { room: "Nursery", items: [
    { id: "cot", label: "Cot / cot bed", price: 15 }, { id: "pushchair", label: "Pushchair / pram", price: 10 }, { id: "toy-box", label: "Toy box", price: 5 },
  ]},
  { room: "Gym / Hobby", items: [
    { id: "treadmill", label: "Treadmill", price: 50 }, { id: "exercise-bike", label: "Exercise bike", price: 30 }, { id: "cross-trainer", label: "Cross trainer", price: 40 },
    { id: "rowing-machine", label: "Rowing machine", price: 35 }, { id: "weight-bench", label: "Weight bench", price: 30 }, { id: "multi-gym", label: "Multi-gym", price: 75 }, { id: "drum-kit", label: "Drum kit", price: 40 },
  ]},
  { room: "Heavy / Specialist", items: [
    { id: "piano-upright", label: "Upright piano", price: 150 }, { id: "piano-baby-grand", label: "Baby grand piano", price: 300 }, { id: "piano-grand", label: "Grand piano", price: 450 },
    { id: "safe", label: "Large safe", price: 150 }, { id: "pool-table", label: "Pool / snooker table", price: 250 }, { id: "marble-table", label: "Marble / stone table", price: 100 },
    { id: "aquarium", label: "Large aquarium / fish tank", price: 100 }, { id: "hot-tub", label: "Hot tub / spa", price: 250 }, { id: "antique", label: "Large antique furniture", price: 75 },
    { id: "fine-art", label: "Fine art / valuable artwork", price: 50 }, { id: "commercial-gym", label: "Commercial gym machine", price: 100 }, { id: "workshop", label: "Heavy workshop equipment", price: 100 },
  ]},
  { room: "Boxes / Loft", items: [
    { id: "loft-box", label: "Loft box", price: 4 }, { id: "storage-crate", label: "Storage crate", price: 4 }, { id: "cellar-box", label: "Cellar box", price: 4 },
    { id: "small-box", label: "Small box", price: 1.5 }, { id: "medium-box", label: "Medium box", price: 3 }, { id: "large-box", label: "Large box", price: 4.25 },
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
