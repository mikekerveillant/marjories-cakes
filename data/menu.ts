// All menu items sourced from the official M's by Marjorie's menu (Jun 2026).
// Descriptions are approximate — update as needed.
// TODO: Add product photos to /public/ and fill in each item's image field.
// Note: additional items visible in the product list (sandwiches, plain breads,
// garlic/cinnamon sticks, etc.) are not yet priced — add them here when ready.

export type MenuCategory = "Pastry" | "Cakes" | "Gift Ideas" | "Special Orders";

export type MenuItem = {
  id: string;
  title: string;
  category: MenuCategory;
  price: string;
  description: string;
  image: string; // path relative to /public — leave empty until photo is ready
};

export const menuItems: MenuItem[] = [
  // ── PASTRY ──────────────────────────────────────────────────────────────────
  {
    id: "cheese-rolls",
    title: "Cheese Rolls",
    category: "Pastry",
    price: "₱275 / box of 6  ·  ₱500 / box of 12",
    description: "Fluffy pastry, sliced cheese, buttercream and sugar topping.",
    image: "", // TODO: /public/cheese-rolls.jpg
  },
  {
    id: "cheese-ensaymada",
    title: "Cheese Ensaymada",
    category: "Pastry",
    price: "₱275 / box of 6  ·  ₱500 / box of 12", // TODO: verify price
    description: "Soft, buttery ensaymada generously topped with cheese.",
    image: "", // TODO: /public/cheese-ensaymada.jpg
  },
  {
    id: "assorted-cheese-rolls-ensaymada",
    title: "Assorted Cheese Rolls & Ensaymada",
    category: "Pastry",
    price: "₱300 / box of 8  ·  ₱550 / box of 12",
    description: "A mixed box of cheese rolls and ensaymada — the best of both.",
    image: "", // TODO: /public/assorted.jpg
  },
  {
    id: "ube-cheese-ensaymada",
    title: "Ube Cheese Ensaymada",
    category: "Pastry",
    price: "₱300 / box of 6  ·  ₱750 / box of 12", // TODO: verify box size
    description: "Ube-flavoured ensaymada topped with cheese — a colorful favourite.",
    image: "", // TODO: /public/ube-cheese-ensaymada.jpg
  },
  {
    id: "turtle-fudge-brownies",
    title: "Turtle Fudge Brownies",
    category: "Pastry",
    price: "₱230 / box of 4  ·  ₱450 / box of 8",
    description: "Rich, dense fudge brownies. A must-try from the kitchen.",
    image: "", // TODO: /public/turtle-fudge-brownies.jpg
  },
  {
    id: "chocolate-crinkles",
    title: "Chocolate Crinkles",
    category: "Pastry",
    price: "₱250 / box of 10",
    description: "Chewy chocolate cookies dusted in powdered sugar.",
    image: "", // TODO: /public/chocolate-crinkles.jpg
  },
  {
    id: "white-loaf-pandesal",
    title: "White Loaf / Pandesal",
    category: "Pastry",
    price: "₱75 / loaf  ·  ₱85 / pack of 12", // TODO: verify loaf vs pack pricing
    description: "Freshly baked white loaf or soft, pillowy pandesal rolls.",
    image: "", // TODO: /public/pandesal.jpg
  },

  // ── CAKES ────────────────────────────────────────────────────────────────────
  {
    id: "decadent-chocolate-cake",
    title: "Decadent Chocolate Cake",
    category: "Cakes",
    price: "₱800 (6\")  ·  ₱1,100 (8\")",
    description: "Rich layered chocolate cake — made for celebrations.",
    image: "", // TODO: /public/chocolate-cake.jpg
  },
  {
    id: "cashew-sansrival",
    title: "Cashew Sans Rival",
    category: "Cakes",
    price: "₱800 (6\")  ·  ₱1,100 (8\")",
    description: "Layers of crisp meringue, buttercream, and roasted cashews.",
    image: "", // TODO: /public/sansrival.jpg
  },
  {
    id: "special-carrot-cake",
    title: "Special Carrot Cake",
    category: "Cakes",
    price: "₱850 (6\")  ·  ₱1,050 (8\")", // TODO: verify 8" price
    description: "Moist, spiced carrot cake with cream cheese frosting.",
    image: "", // TODO: /public/carrot-cake.jpg
  },
  {
    id: "apple-pie",
    title: "Apple Pie",
    category: "Cakes",
    price: "₱950 (9\" round)",
    description: "Classic homemade apple pie, freshly baked and perfect for sharing.",
    image: "", // TODO: /public/apple-pie.jpg
  },
  {
    id: "mini-chocolate-cupcakes",
    title: "Hershey's Mini Chocolate Cupcakes",
    category: "Cakes",
    price: "₱450 / 10 pcs  ·  ₱900 / 20 pcs",
    description: "Mini chocolate cupcakes made with Hershey's — great for parties and giveaways.",
    image: "", // TODO: /public/mini-cupcakes.jpg
  },
  {
    id: "banana-cake-bars",
    title: "Banana Cake Bars",
    category: "Cakes",
    price: "₱400 / 10 pcs",
    description: "Soft, moist banana cake cut into easy-to-share bars.",
    image: "", // TODO: /public/banana-cake-bars.jpg
  },

  // ── GIFT IDEAS ───────────────────────────────────────────────────────────────
  {
    id: "chicken-empanada",
    title: "Chicken Empanada",
    category: "Gift Ideas",
    price: "₱75 / pc  ·  ₱425 / box of 8",
    description: "Flaky golden pastry filled with savoury chicken — great for pasalubong.",
    image: "", // TODO: /public/chicken-empanada.jpg
  },
  {
    id: "lengua-de-gato",
    title: "Lengua de Gato",
    category: "Gift Ideas",
    price: "₱300",
    description: "Delicate butter cookies — a classic Filipino treat perfect for gifting.",
    image: "", // TODO: /public/lengua-de-gato.jpg
  },
  {
    id: "barquillos",
    title: "Barquillos",
    category: "Gift Ideas",
    price: "₱250",
    description: "Light, crispy rolled wafer cookies.",
    image: "", // TODO: /public/barquillos.jpg
  },
  {
    id: "polvoron-cookies",
    title: "Polvoron Cookies / Uraro Cookies",
    category: "Gift Ideas",
    price: "₱250",
    description: "Crumbly, melt-in-your-mouth cookies — beautiful for giving.",
    image: "", // TODO: /public/polvoron-cookies.jpg
  },
  {
    id: "polvoron",
    title: "Polvoron",
    category: "Gift Ideas",
    price: "₱200 / pack of 10",
    description: "Classic Filipino polvoron — powdery-sweet and wrapped in coloured cellophane.",
    image: "", // TODO: /public/polvoron.jpg
  },

  // ── SPECIAL ORDERS ───────────────────────────────────────────────────────────
  {
    id: "queso-de-bola-ensaymada",
    title: "Queso de Bola Ensaymada",
    category: "Special Orders",
    price: "₱500 / box of 6  ·  ₱980 / box of 12",
    description: "Ensaymada topped with premium Queso de Bola — a holiday favourite.",
    image: "", // TODO: /public/queso-de-bola-ensaymada.jpg
  },
  {
    id: "ube-cheese-rolls",
    title: "Ube Cheese Rolls",
    category: "Special Orders",
    price: "₱500 / box of 6  ·  ₱980 / box of 12",
    description: "Purple ube cheese rolls — a colourful, crowd-pleasing twist on the classic.",
    image: "", // TODO: /public/ube-cheese-rolls.jpg
  },
  {
    id: "ube-cheese-pandesal",
    title: "Ube Cheese Pandesal",
    category: "Special Orders",
    price: "₱350 / pack of 12",
    description: "Soft ube pandesal stuffed with cream cheese.",
    image: "", // TODO: /public/ube-cheese-pandesal.jpg
  },
  {
    id: "raisin-loaf",
    title: "Raisin Loaf",
    category: "Special Orders",
    price: "₱370",
    description: "Soft loaf bread studded with sweet raisins throughout.",
    image: "", // TODO: /public/raisin-loaf.jpg
  },
  {
    id: "cinnamon-raisin-clusters",
    title: "Cinnamon Raisin Clusters",
    category: "Special Orders",
    price: "₱400 / 9 rolls",
    description: "Pull-apart cinnamon rolls with raisins — warm, fragrant, and made for sharing.",
    image: "", // TODO: /public/cinnamon-raisin-clusters.jpg
  },
  {
    id: "food-for-the-gods",
    title: "Food for the Gods",
    category: "Special Orders",
    price: "₱550 / pack of 10",
    description: "Chewy date and walnut bars — a Filipino classic that lives up to its name.",
    image: "", // TODO: /public/food-for-the-gods.jpg
  },
];

export const menuCategories: MenuCategory[] = [
  "Pastry",
  "Cakes",
  "Gift Ideas",
  "Special Orders",
];
