"use client";

import React, { useState } from "react";
import {
  ArrowRight,
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  ShoppingCart,
  X,
  Plus,
  Minus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { menuItems, menuCategories, type MenuItem } from "@/data/menu";

// ── Social / contact links ────────────────────────────────────────────────────
const facebook    = "https://www.facebook.com/marjoriescakesandcookies";
const facebookDM  = "https://m.me/marjoriescakesandcookies";
const instagram   = "https://www.instagram.com/marjoriescakes";
const whatsappBase = "https://wa.me/639988400396";

// ── Page-level data ───────────────────────────────────────────────────────────
const orderSteps = [
  {
    title: "Browse",
    text: "Check our menu and add items to your cart.",
  },
  {
    title: "Send Your Order",
    text: "Tap 'Order via WhatsApp' — your cart details are pre-filled for you.",
  },
  {
    title: "We Confirm",
    text: "We'll confirm availability, prep time, and arrange payment.",
  },
  {
    title: "Pick Up or Delivery",
    text: "Freshly baked and ready for you in Parañaque and nearby areas.",
  },
];

// ── Inline SVG icons (Facebook and Instagram removed from lucide-react) ───────
function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.885v2.268h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073Z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5Zm8.75 2a1 1 0 1 1 0 2 1 1 0 0 1 0-2ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.5A3.5 3.5 0 1 0 12 15.5 3.5 3.5 0 0 0 12 8.5Z" />
    </svg>
  );
}

// ── Image placeholder — removed once real photos are added ───────────────────
function PhotoPlaceholder({ className, label }: { className?: string; label?: string }) {
  return (
    <div className={`flex items-center justify-center bg-[#f0e6cc] ${className ?? ""}`}>
      <p className="px-4 text-center text-xs text-[#2f241d]/30">
        [PHOTO PLACEHOLDER]
        {label && <><br /><span className="text-[10px]">{label}</span></>}
      </p>
    </div>
  );
}

// ── Cart type ─────────────────────────────────────────────────────────────────
type CartItem = { id: string; name: string; price: string; quantity: number };

export default function MarjoriesCakes() {
  const [cart, setCart]         = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [fbCopied, setFbCopied] = useState(false);

  // Cart helpers
  const addToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === item.id);
      if (existing) {
        return prev.map((c) => c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c);
      }
      return [...prev, { id: item.id, name: item.title, price: item.price, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const increase = (id: string) =>
    setCart((prev) => prev.map((c) => c.id === id ? { ...c, quantity: c.quantity + 1 } : c));

  const decrease = (id: string) =>
    setCart((prev) =>
      prev.map((c) => c.id === id ? { ...c, quantity: c.quantity - 1 } : c)
          .filter((c) => c.quantity > 0)
    );

  const totalItems = cart.reduce((sum, c) => sum + c.quantity, 0);

  // Pre-filled order message (name / contact / address / date left blank for customer)
  const orderText = cart.length > 0
    ? `Hi M's by Marjorie's! I'd like to place an order:\n\n${cart.map((c) => `- ${c.quantity}x ${c.name}`).join("\n")}\n\nName:\nContact number:\nAddress / Delivery area:\nPreferred date:\nNotes:`
    : "";

  const whatsappOrder  = `${whatsappBase}?text=${encodeURIComponent(orderText)}`;

  const openFacebook = async () => {
    try {
      await navigator.clipboard.writeText(orderText);
      setFbCopied(true);
      setTimeout(() => setFbCopied(false), 4000);
    } catch {
      // clipboard not available — just open FB
    }
    window.open(facebookDM, "_blank", "noopener,noreferrer");
  };

  // Cheese rolls item — needed for the spotlight section's Add to Cart button
  const cheeseRollsItem = menuItems.find((m) => m.id === "cheese-rolls")!;

  return (
    <main className="min-h-screen bg-[#f7f1e8] text-[#2f241d]">

      {/* ── HEADER ─────────────────────────────────────────────────────────── */}
      <header className="fixed top-0 z-50 w-full border-b border-[#2f241d]/10 bg-[#f7f1e8]/85 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <a href="#top" className="flex items-center">
            {/* TODO: Replace with real logo:
                <img src="/logo.png" alt="M's by Marjorie's" className="h-10 w-auto" /> */}
            <span className="font-heading text-xl font-black tracking-tight text-[#2f241d]">
              M&apos;s by Marjorie&apos;s
            </span>
          </a>

          <nav className="hidden items-center gap-7 text-sm font-semibold text-[#2f241d]/70 md:flex">
            <a href="#story"   className="hover:text-[#2f241d]">Story</a>
            <a href="#menu"    className="hover:text-[#2f241d]">Menu</a>
            <a href="#gallery" className="hover:text-[#2f241d]">Gallery</a>
            <a href="#order"   className="hover:text-[#2f241d]">Order</a>
            <a href="#contact" className="hover:text-[#2f241d]">Contact</a>
          </nav>

          <div className="flex items-center gap-2">
            {/* Cart toggle in header */}
            <button
              onClick={() => setCartOpen((o) => !o)}
              className="relative flex h-9 w-9 items-center justify-center rounded-full border border-[#2f241d]/15 bg-white text-[#2f241d] transition hover:bg-[#f0e6cc]"
              aria-label="Open cart"
            >
              <ShoppingCart className="h-4 w-4" />
              {totalItems > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#c8860a] text-[10px] font-bold text-white">
                  {totalItems}
                </span>
              )}
            </button>

            <a href="#menu">
              <Button className="rounded-full bg-[#c8860a] px-6 text-white hover:bg-[#b07508]">
                Order Now
              </Button>
            </a>
            <a href={instagram} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="hidden rounded-full border-[#2f241d]/20 sm:inline-flex">
                Instagram
              </Button>
            </a>
          </div>
        </div>
      </header>

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <section id="top" className="relative min-h-screen overflow-hidden">
        {/* TODO: Add a hero photo once available — replace gradient with:
            <img src="/hero.jpg" alt="M's by Marjorie's freshly baked goods"
                 className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-black/40" />
            Then change text colors to text-white. */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#f7f1e8] via-[#f0e6d0] to-[#e8d4a8]" />

        <div className="relative mx-auto flex min-h-screen max-w-7xl items-center px-5 pt-20">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.4em] text-[#2f241d]/50">
              Parañaque, Philippines
            </p>

            <h1 className="mt-4 font-heading text-6xl font-black leading-none text-[#2f241d] md:text-8xl">
              M&apos;s by
              <br />
              Marjorie&apos;s
            </h1>

            <p className="mt-6 text-sm font-bold uppercase tracking-[0.3em] text-[#c8860a]">
              Freshly baked home-made pastries and breads
            </p>

            <p className="mt-6 max-w-xl text-xl leading-9 text-[#2f241d]/70">
              Made at home. Baked with care. Add to cart and order via WhatsApp or Facebook.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a href="#menu">
                <Button size="lg" className="rounded-full bg-[#c8860a] px-7 text-white hover:bg-[#b07508]">
                  Browse Menu <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
              <a href="#story">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full border-[#2f241d]/25 bg-white/60 px-7 text-[#2f241d] hover:bg-white/80"
                >
                  Our Story
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── STORY ──────────────────────────────────────────────────────────── */}
      <section id="story" className="py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 md:grid-cols-2">
          <div className="rounded-[2rem] bg-white p-3 shadow-2xl shadow-[#2f241d]/10">
            {/* TODO: <img src="/marjorie.jpg" alt="Marjorie" className="aspect-[4/5] w-full rounded-[1.5rem] object-cover" /> */}
            <PhotoPlaceholder className="aspect-[4/5] w-full rounded-[1.5rem]" label="Add founder / bakery photo here" />
          </div>

          <div>
            {/* TODO: Update name if different */}
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#2f241d]/50">Meet Marjorie</p>

            <h2 className="mt-4 font-heading text-6xl font-black leading-none md:text-7xl">
              Behind
              <br />
              The Bakery
            </h2>

            {/* TODO: Replace both paragraphs with the real founder story */}
            <p className="mt-8 text-lg leading-9 text-[#2f241d]/70">
              [PLACEHOLDER — replace with real story]
              What started as a love for baking at home has grown into something
              shared with the whole neighborhood. Every roll, cake, and pastry
              that leaves this kitchen is made the same way it always has been —
              by hand, with care, and with the best ingredients available.
            </p>

            <p className="mt-6 text-lg leading-9 text-[#2f241d]/65">
              [PLACEHOLDER — replace with real story]
              M&apos;s by Marjorie&apos;s is a home bakery rooted in Parañaque.
              Small batches, thoughtful recipes, and food made for the people and
              tables worth gathering around.
            </p>
          </div>
        </div>
      </section>

      {/* ── CHEESE ROLLS SPOTLIGHT ─────────────────────────────────────────── */}
      <section className="bg-[#2f241d] py-24 text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 md:grid-cols-[1.2fr_0.8fr]">
          <div className="overflow-hidden rounded-[2rem] bg-white/10 p-3">
            {/* TODO: Add 3–5 cheese rolls photos — replace each PhotoPlaceholder with:
                <img src="/cheese-rolls-1.jpg" alt="Cheese Rolls"
                     className="aspect-[4/5] w-72 shrink-0 snap-start rounded-[1.5rem] object-cover md:w-80" /> */}
            <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-3">
              {[1, 2, 3].map((i) => (
                <PhotoPlaceholder
                  key={i}
                  className="aspect-[4/5] w-72 shrink-0 snap-start rounded-[1.5rem] md:w-80"
                  label={`Add cheese rolls photo ${i}`}
                />
              ))}
            </div>
            <p className="mt-3 text-center text-xs uppercase tracking-[0.25em] text-white/45">
              Scroll for more →
            </p>
          </div>

          <div>
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-white/50">Signature Bake</p>

            <h2 className="mt-4 font-heading text-6xl font-black leading-none md:text-7xl">
              Cheese
              <br />
              Rolls
            </h2>

            <p className="mt-8 text-2xl leading-9 text-white/80">
              Fluffy pastry. Sliced cheese. Buttercream and sugar topping.
            </p>

            <p className="mt-4 text-lg leading-8 text-white/65">
              Our most-loved bake — soft, buttery, and impossible to eat just one.
              Available in a box of 6 or 12.
            </p>

            <p className="mt-3 text-sm font-bold uppercase tracking-[0.2em] text-[#c8860a]">
              ₱275 / box of 6  ·  ₱500 / box of 12
            </p>

            <Button
              onClick={() => addToCart(cheeseRollsItem)}
              className="mt-8 rounded-full bg-[#c8860a] px-7 text-white hover:bg-[#b07508]"
            >
              {cart.find((c) => c.id === "cheese-rolls")
                ? `In cart (${cart.find((c) => c.id === "cheese-rolls")!.quantity}) — Add more`
                : "Add to Cart"}
            </Button>
          </div>
        </div>
      </section>

      {/* ── MENU ───────────────────────────────────────────────────────────── */}
      <section id="menu" className="bg-[#fffaf2] py-24">
        <div className="mx-auto max-w-7xl px-5">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#2f241d]/50">Menu</p>
            <h2 className="mt-4 font-heading text-5xl font-black leading-tight md:text-7xl">Our Bakes.</h2>
            <p className="mt-4 text-lg text-[#2f241d]/60">
              Add items to your cart, then send your order via WhatsApp or Facebook.
            </p>
          </div>

          {menuCategories.map((category) => {
            const items = menuItems.filter((item) => item.category === category);
            return (
              <div key={category} className="mt-16">
                <div className="flex items-center gap-4 border-b border-[#2f241d]/10 pb-4">
                  <h3 className="font-heading text-2xl font-black">{category}</h3>
                  <div className="h-px flex-1 bg-[#2f241d]/10" />
                </div>

                <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((item) => {
                    const inCart = cart.find((c) => c.id === item.id);
                    return (
                      <div key={item.id} className="flex flex-col overflow-hidden rounded-[1.75rem] bg-white shadow-sm">
                        {item.image ? (
                          <img src={item.image} alt={item.title} className="aspect-[4/3] w-full object-cover" />
                        ) : (
                          // TODO: Replace with <img> once photo added to /public
                          <PhotoPlaceholder
                            className="aspect-[4/3] w-full"
                            label={`Add photo: /public/${item.id}.jpg`}
                          />
                        )}

                        <div className="flex h-full flex-col p-5">
                          <h4 className="text-lg font-black leading-snug">{item.title}</h4>
                          <p className="mt-1 text-sm font-semibold text-[#c8860a]">{item.price}</p>
                          <p className="mt-2 text-sm leading-6 text-[#2f241d]/60">{item.description}</p>

                          {inCart ? (
                            <p className="mt-3 text-sm font-semibold text-green-600">
                              ✓ {inCart.quantity} in cart
                            </p>
                          ) : null}

                          <Button
                            onClick={() => addToCart(item)}
                            className="mt-auto mt-4 rounded-full bg-[#2f241d] text-white hover:bg-[#46362c]"
                          >
                            {inCart ? "Add More" : "Add to Cart"}
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

          <div className="mt-16 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              size="lg"
              onClick={() => setCartOpen(true)}
              className="rounded-full bg-[#c8860a] px-8 text-white hover:bg-[#b07508]"
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              View Cart {totalItems > 0 && `(${totalItems})`}
            </Button>
          </div>
        </div>
      </section>

      {/* ── PHILOSOPHY QUOTE ───────────────────────────────────────────────── */}
      <section className="py-32">
        <div className="mx-auto max-w-5xl px-5 text-center">
          <p className="mb-8 text-sm font-bold uppercase tracking-[0.35em] text-[#2f241d]/40">How We Bake</p>
          {/* TODO: Replace with a real quote from Marjorie if available */}
          <blockquote className="font-heading text-5xl font-black leading-tight md:text-7xl">
            Made at home.
            <br />
            Baked with care.
            <br />
            Shared with love.
          </blockquote>
        </div>
      </section>

      {/* ── GALLERY ────────────────────────────────────────────────────────── */}
      <section id="gallery" className="bg-[#f7f1e8] py-24">
        <div className="mx-auto max-w-7xl px-5">
          <div className="grid items-end gap-8 md:grid-cols-2">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#2f241d]/50">Gallery</p>
              <h2 className="mt-4 font-heading text-5xl font-black leading-tight md:text-7xl">
                Fresh from
                <br />
                the Kitchen.
              </h2>
            </div>
            <p className="text-lg leading-8 text-[#2f241d]/65 md:text-right">
              {/* TODO: Update when real photos are added */}
              Follow us on Facebook and Instagram for the latest bakes, seasonal specials, and behind-the-scenes.
            </p>
          </div>

          {/* TODO: Replace each PhotoPlaceholder with a real photo:
              <img src="/your-photo.jpg" alt="..." className="h-full w-full object-cover" />
              Suggested: cheese rolls, ensaymada, cakes, packaging, kitchen. */}
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Cheese rolls or signature bake",
              "Ensaymada or pastries",
              "Cake or celebration item",
              "Gift packaging or polvoron",
              "Behind-the-scenes / kitchen",
              "Seasonal special or new item",
            ].map((label, i) => (
              <PhotoPlaceholder key={i} className="aspect-square overflow-hidden rounded-[2rem]" label={label} />
            ))}
          </div>

          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a href={facebook} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="rounded-full bg-[#c8860a] px-8 text-white hover:bg-[#b07508]">
                <FacebookIcon className="mr-2 h-5 w-5" /> Follow on Facebook
              </Button>
            </a>
            <a href={instagram} target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="rounded-full border-[#2f241d]/20">
                <InstagramIcon className="mr-2 h-5 w-5" /> Follow on Instagram
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* ── HOW TO ORDER ───────────────────────────────────────────────────── */}
      <section id="order" className="bg-[#fffaf2] py-24">
        <div className="mx-auto max-w-7xl px-5">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#2f241d]/50">How To Order</p>
            <h2 className="mt-4 font-heading text-5xl font-black leading-tight md:text-7xl">Simple as can be.</h2>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-4">
            {orderSteps.map((step, index) => (
              <div key={step.title} className="rounded-[2rem] bg-white p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#c8860a] font-bold text-white">
                  {index + 1}
                </div>
                <h3 className="mt-5 text-xl font-black">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#2f241d]/60">{step.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href="#menu">
              <Button size="lg" className="rounded-full bg-[#c8860a] px-8 text-white hover:bg-[#b07508]">
                <ShoppingCart className="mr-2 h-5 w-5" /> Start Your Order
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* ── CONTACT ────────────────────────────────────────────────────────── */}
      <section id="contact" className="py-24">
        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[2rem] bg-[#2f241d] text-white lg:grid-cols-[2fr_1fr]">
          <div className="p-8 md:p-12">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-white/50">Get in Touch</p>
            <h2 className="mt-4 font-heading text-5xl font-black leading-tight">
              Baked in Parañaque.
              <br />
              Made to share.
            </h2>

            <div className="mt-8 space-y-4 text-white/75">
              <p className="flex items-start gap-3">
                <MapPin className="mt-1 h-5 w-5 shrink-0" />
                <span>Parañaque City<br />Metro Manila, Philippines</span>
              </p>
              <p className="flex items-center gap-3">
                <Phone className="h-5 w-5 shrink-0" />
                <a href="tel:+639988400396" className="hover:text-white">+63 998 840 0396</a>
              </p>
              <p className="flex items-center gap-3">
                <Mail className="h-5 w-5 shrink-0" />
                <a href="mailto:marjoriescandc@gmail.com" className="hover:text-white">marjoriescandc@gmail.com</a>
              </p>
            </div>

            <p className="mt-8 text-sm font-bold uppercase tracking-[0.2em] text-white/40">
              Orders via WhatsApp or DM — no online checkout
            </p>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <a href={whatsappBase} target="_blank" rel="noopener noreferrer">
                <Button className="rounded-full bg-[#c8860a] px-7 text-white hover:bg-[#b07508]">
                  <MessageCircle className="mr-2 h-5 w-5" /> WhatsApp
                </Button>
              </a>
              <a href={facebookDM} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="rounded-full border-white/20 bg-white/10 text-white hover:bg-white/20 hover:text-white">
                  <FacebookIcon className="mr-2 h-5 w-5" /> Facebook DM
                </Button>
              </a>
            </div>
          </div>

          <div className="bg-[#fffaf2] p-8 text-[#2f241d] md:p-12">
            <p className="text-center text-sm font-bold uppercase tracking-[0.3em] text-[#c8860a]">Follow Along</p>
            <div className="mx-auto mt-4 h-px w-24 bg-[#c8860a]/40" />

            <p className="mx-auto mt-8 max-w-xs text-center font-heading text-xl font-black leading-relaxed">
              {/* TODO: Update with real social messaging if desired */}
              Follow us for new bakes, seasonal specials, and ordering updates.
            </p>

            {/* TODO: Add a product photo or bakery sketch here */}
            <PhotoPlaceholder className="mx-auto my-10 aspect-square w-full max-w-[260px] rounded-[1.5rem]" label="Add bakery photo or sketch" />

            <div className="flex flex-col gap-3">
              <a href={facebook} target="_blank" rel="noopener noreferrer">
                <Button className="w-full rounded-full bg-[#c8860a] px-8 py-6 text-white hover:bg-[#b07508]">
                  <FacebookIcon className="mr-3 h-5 w-5" />
                  marjoriescakesandcookies
                </Button>
              </a>
              <a href={instagram} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="w-full rounded-full border-[#2f241d]/20 px-8 py-6">
                  <InstagramIcon className="mr-3 h-5 w-5" />
                  @marjoriescakes
                </Button>
              </a>
            </div>

            <div className="mt-10 flex items-center justify-center gap-4 text-[#c8860a]/50">
              <div className="h-px w-16 bg-current" />
              <span>♡</span>
              <div className="h-px w-16 bg-current" />
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
      <footer className="border-t border-[#2f241d]/10 py-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 px-5 text-sm text-[#2f241d]/50 md:flex-row">
          <p>© {new Date().getFullYear()} M&apos;s by Marjorie&apos;s.</p>
          <div className="flex gap-5">
            <a href={facebook}  target="_blank" rel="noopener noreferrer" className="hover:text-[#2f241d]">Facebook</a>
            <a href={instagram} target="_blank" rel="noopener noreferrer" className="hover:text-[#2f241d]">Instagram</a>
          </div>
          <p>Freshly baked home-made pastries and breads.</p>
        </div>
      </footer>

      {/* ── FLOATING CART PANEL ────────────────────────────────────────────── */}
      {cartOpen && (
        <div className="fixed bottom-24 right-5 z-50 w-80 rounded-[1.5rem] bg-white p-5 text-[#2f241d] shadow-2xl shadow-[#2f241d]/20">
          <div className="flex items-center justify-between">
            <p className="font-black">
              Your Cart {totalItems > 0 && <span className="text-[#c8860a]">({totalItems})</span>}
            </p>
            <button
              onClick={() => setCartOpen(false)}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-[#f0e6cc] text-[#2f241d] hover:bg-[#e8d4a8]"
              aria-label="Close cart"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {cart.length === 0 ? (
            <div className="mt-4 text-center">
              <p className="text-sm text-[#2f241d]/50">Your cart is empty.</p>
              <a href="#menu" onClick={() => setCartOpen(false)}>
                <Button className="mt-3 w-full rounded-full bg-[#c8860a] text-white hover:bg-[#b07508]">
                  Browse Menu
                </Button>
              </a>
            </div>
          ) : (
            <>
              <div className="mt-4 max-h-52 space-y-3 overflow-y-auto">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold">{item.name}</p>
                      <p className="mt-0.5 text-xs text-[#2f241d]/45 leading-snug">{item.price}</p>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      <button
                        onClick={() => decrease(item.id)}
                        className="flex h-7 w-7 items-center justify-center rounded-full bg-[#f0e6cc] text-[#2f241d] hover:bg-[#e8d4a8]"
                        aria-label={`Remove one ${item.name}`}
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-5 text-center text-sm font-bold">{item.quantity}</span>
                      <button
                        onClick={() => increase(item.id)}
                        className="flex h-7 w-7 items-center justify-center rounded-full bg-[#2f241d] text-white hover:bg-[#46362c]"
                        aria-label={`Add one more ${item.name}`}
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 space-y-2 border-t border-[#2f241d]/10 pt-4">
                {/* WhatsApp — pre-filled message */}
                <a href={whatsappOrder} target="_blank" rel="noopener noreferrer">
                  <Button className="w-full rounded-full bg-green-600 text-white hover:bg-green-700">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Order via WhatsApp
                  </Button>
                </a>

                {/* Facebook — copies order to clipboard, opens Messenger */}
                <Button
                  variant="outline"
                  onClick={openFacebook}
                  className="w-full rounded-full border-[#2f241d]/20"
                >
                  <FacebookIcon className="mr-2 h-4 w-4" />
                  {fbCopied ? "Copied! Opening Facebook…" : "Order via Facebook"}
                </Button>

                {fbCopied && (
                  <p className="text-center text-xs text-[#2f241d]/50">
                    Order details copied — paste them in your message.
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      )}

      {/* ── FLOATING FABs ──────────────────────────────────────────────────── */}
      {/* Cart FAB */}
      <button
        onClick={() => setCartOpen((o) => !o)}
        className="fixed bottom-5 right-[10.5rem] z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#c8860a] text-white shadow-xl transition hover:scale-105"
        aria-label="Open cart"
      >
        <ShoppingCart className="h-6 w-6" />
        {totalItems > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[11px] font-black text-[#c8860a]">
            {totalItems}
          </span>
        )}
      </button>

      {/* Facebook FAB */}
      <a
        href={facebookDM}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-24 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#2f241d] text-white shadow-xl transition hover:scale-105"
        aria-label="Order via Facebook"
      >
        <FacebookIcon className="h-6 w-6" />
      </a>

      {/* Instagram FAB */}
      <a
        href={instagram}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#2f241d] text-white shadow-xl transition hover:scale-105"
        aria-label="Follow on Instagram"
      >
        <InstagramIcon className="h-7 w-7" />
      </a>
    </main>
  );
}
