
"use client";

import { useEffect, useState, type FormEvent } from "react";

type MenuItem = {
  id: number;
  name: string;
  price: number | string;
  description: string;
};

export default function Home() {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [deleting, setDeleting] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function fetchMenu() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/menu", {
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to load menu.");
      }

      setMenu(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Database connection failed."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMenu();
  }, []);

  async function addItem(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setAdding(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch("/api/menu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          price: Number(price),
          description: description.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Could not add item.");
      }

      setMenu((old) => [data, ...old]);
      setName("");
      setPrice("");
      setDescription("");
      setMessage("Your new dish has been added successfully.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setAdding(false);
    }
  }

  async function deleteItem(id: number) {
    if (!window.confirm("Remove this dish from your restaurant menu?")) return;

    setDeleting(id);
    setError("");
    setMessage("");

    try {
      const response = await fetch(`/api/menu?id=${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Could not delete item.");
      }

      setMenu((old) => old.filter((item) => item.id !== id));
      setMessage("Dish successfully removed from the menu.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setDeleting(null);
    }
  }

  function getFoodIcon(name: string) {
    const food = name.toLowerCase();

    if (food.includes("burger")) return "🍔";
    if (food.includes("pizza")) return "🍕";
    if (food.includes("biryani") || food.includes("rice")) return "🍚";
    if (food.includes("chicken")) return "🍗";
    if (food.includes("drink") || food.includes("juice")) return "🥤";
    if (food.includes("cake") || food.includes("dessert")) return "🍰";
    if (food.includes("bbq") || food.includes("kebab")) return "🍢";

    return "🍽️";
  }

  return (
    <main className="min-h-screen bg-[#101010] text-[#f2ebdd]">

      {/* NAVIGATION */}
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#101010]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <a href="#home" className="group">
            <div className="text-xl font-bold tracking-[0.22em]">
              NOIR <span className="text-[#b87345]">&</span> SPICE
            </div>
            <p className="mt-1 text-[9px] tracking-[0.38em] text-gray-500">
              THE ART OF BOLD FLAVOUR
            </p>
          </a>

          <div className="hidden items-center gap-9 text-xs tracking-widest text-gray-400 md:flex">
            <a href="#home" className="transition hover:text-[#d49a6b]">HOME</a>
            <a href="#story" className="transition hover:text-[#d49a6b]">OUR STORY</a>
            <a href="#menu" className="transition hover:text-[#d49a6b]">MENU</a>
            <a href="#contact" className="transition hover:text-[#d49a6b]">CONTACT</a>
          </div>

          <a
            href="#menu"
            className="border border-[#b87345] px-5 py-3 text-[10px] font-bold tracking-widest text-[#d49a6b] transition hover:bg-[#b87345] hover:text-white"
          >
            EXPLORE MENU ↗
          </a>

        </div>
      </nav>

      {/* HERO */}
      <section id="home" className="relative overflow-hidden border-b border-white/10">

        <div className="absolute -right-40 -top-40 h-[550px] w-[550px] rounded-full bg-[#8d4e2d]/10 blur-[130px]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 py-24 md:grid-cols-2 md:py-32">

          <div className="relative z-10">

            <p className="mb-8 text-xs font-semibold tracking-[0.4em] text-[#c18457]">
              ✦ A NEW KIND OF DINING EXPERIENCE
            </p>

            <h1 className="text-6xl leading-[1.08] font-light tracking-tight sm:text-7xl lg:text-[88px]">
              Beyond
              <span className="block font-serif italic text-[#c18457]">
                Ordinary.
              </span>
              <span className="block">Into Flavour.</span>
            </h1>

            <p className="mt-8 max-w-md text-sm leading-8 text-gray-400">
              Where bold spices meet refined taste. Discover an experience
              crafted around unforgettable flavours, beautiful food and
              the art of dining.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-6">

              <a
                href="#menu"
                className="bg-[#b87345] px-8 py-4 text-xs font-bold tracking-widest text-white transition duration-300 hover:-translate-y-1 hover:bg-[#cb8b60]"
              >
                DISCOVER THE MENU ↗
              </a>

              <a
                href="#story"
                className="border-b border-white/30 pb-2 text-xs tracking-widest text-gray-300 transition hover:border-[#b87345] hover:text-[#c18457]"
              >
                OUR PHILOSOPHY
              </a>

            </div>

            <div className="mt-16 flex gap-12 border-t border-white/10 pt-8">
              <div>
                <p className="font-serif text-2xl text-[#c18457]">01</p>
                <p className="mt-2 text-[9px] tracking-[0.2em] text-gray-500">BOLD FLAVOURS</p>
              </div>
              <div>
                <p className="font-serif text-2xl text-[#c18457]">02</p>
                <p className="mt-2 text-[9px] tracking-[0.2em] text-gray-500">FRESH INGREDIENTS</p>
              </div>
              <div>
                <p className="font-serif text-2xl text-[#c18457]">03</p>
                <p className="mt-2 text-[9px] tracking-[0.2em] text-gray-500">MODERN DINING</p>
              </div>
            </div>

          </div>

          {/* HERO VISUAL */}
          <div className="relative mx-auto w-full max-w-lg">

            <div className="absolute -inset-5 border border-[#b87345]/30" />

            <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden bg-gradient-to-br from-[#4a3024] via-[#201b18] to-[#090909]">

              <div className="absolute inset-0 opacity-40"
                style={{
                  backgroundImage: "radial-gradient(circle at 70% 25%, #c18457 0%, transparent 35%), radial-gradient(circle at 20% 80%, #8b452b 0%, transparent 40%)"
                }}
              />

              <div className="relative text-center">
                <div className="mb-5 text-9xl drop-shadow-2xl sm:text-[150px]">
                  🍲
                </div>
                <p className="font-serif text-3xl italic text-[#e1b28b]">
                  Crafted to be remembered.
                </p>
                <p className="mt-4 text-[9px] tracking-[0.5em] text-white/50">
                  NOIR & SPICE · SARGODHA
                </p>
              </div>

              <div className="absolute bottom-5 left-5 text-[9px] tracking-[0.3em] text-white/60">
                THE SIGNATURE EXPERIENCE
              </div>

              <div className="absolute right-5 top-5 border border-white/20 px-4 py-2 text-[9px] tracking-widest">
                EST. 2026
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* STORY */}
      <section id="story" className="mx-auto max-w-7xl px-6 py-28">

        <div className="grid gap-12 md:grid-cols-2 md:items-center">

          <div>
            <p className="mb-5 text-[10px] tracking-[0.4em] text-[#c18457]">
              THE NOIR PHILOSOPHY
            </p>

            <h2 className="font-serif text-5xl leading-tight sm:text-6xl">
              A little mystery.
              <span className="block italic text-[#c18457]">
                A lot of flavour.
              </span>
            </h2>
          </div>

          <div>
            <p className="text-sm leading-8 text-gray-400">
              At NOIR & SPICE, food is more than a meal. It is an expression
              of culture, creativity and passion. We bring together
              familiar flavours and a contemporary dining identity to
              create something worth coming back for.
            </p>

            <p className="mt-6 text-xs tracking-widest text-[#c18457]">
              OUR WORLD. OUR FLAVOUR. OUR SIGNATURE.
            </p>
          </div>

        </div>

      </section>

      {/* MENU */}
      <section id="menu" className="border-y border-white/10 bg-[#171614] px-6 py-28">

        <div className="mx-auto max-w-7xl">

          <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">

            <div>
              <p className="mb-5 text-[10px] tracking-[0.4em] text-[#c18457]">
                THE COLLECTION
              </p>

              <h2 className="font-serif text-5xl sm:text-6xl">
                Our <span className="italic text-[#c18457]">Menu.</span>
              </h2>

              <p className="mt-5 text-sm text-gray-500">
                Explore our selection of flavours and favourites.
              </p>
            </div>

            <div className="text-xs tracking-widest text-gray-500">
              <span className="text-[#c18457]">●</span> LIVE DATABASE MENU
              <span className="ml-3 text-[#c18457]">{menu.length} ITEMS</span>
            </div>

          </div>

          {message && (
            <div className="mb-6 border border-green-800 bg-green-950/40 p-4 text-sm text-green-300">
              ✓ {message}
            </div>
          )}

          {error && (
            <div className="mb-6 border border-red-800 bg-red-950/40 p-4 text-sm text-red-300">
              ⚠ {error}
            </div>
          )}

          {loading && (
            <div className="py-24 text-center">
              <div className="mx-auto mb-5 h-10 w-10 animate-spin rounded-full border-2 border-[#b87345]/20 border-t-[#b87345]" />
              <p className="text-xs tracking-widest text-gray-500">
                PREPARING YOUR MENU...
              </p>
            </div>
          )}

          {!loading && menu.length === 0 && !error && (
            <div className="border border-dashed border-white/20 py-24 text-center">
              <div className="mb-6 text-5xl">🍽️</div>
              <h3 className="font-serif text-3xl">A blank canvas.</h3>
              <p className="mt-4 text-sm text-gray-500">
                Our menu is waiting for its first signature dish.
              </p>
              <a
                href="#manage"
                className="mt-8 inline-block border border-[#b87345] px-7 py-3 text-xs tracking-widest text-[#d49a6b] hover:bg-[#b87345] hover:text-white"
              >
                ADD YOUR FIRST DISH ↗
              </a>
            </div>
          )}

          {!loading && menu.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

              {menu.map((item) => (
                <article
                  key={item.id}
                  className="group border border-white/10 bg-[#101010] transition duration-500 hover:-translate-y-2 hover:border-[#b87345]/60"
                >

                  <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-gradient-to-br from-[#38271f] to-[#171412]">

                    <div className="absolute inset-0 bg-[#b87345]/0 transition duration-500 group-hover:bg-[#b87345]/10" />

                    <span className="relative text-7xl transition duration-500 group-hover:scale-110">
                      {getFoodIcon(item.name)}
                    </span>

                    <span className="absolute bottom-4 left-4 text-[9px] tracking-[0.3em] text-white/50">
                      NOIR SIGNATURE · #{item.id}
                    </span>

                  </div>

                  <div className="p-7">

                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-serif text-2xl">{item.name}</h3>

                      <span className="shrink-0 text-sm font-semibold text-[#c18457]">
                        Rs. {Number(item.price).toLocaleString("en-PK")}
                      </span>
                    </div>

                    <p className="mt-5 min-h-12 text-xs leading-7 text-gray-500">
                      {item.description}
                    </p>

                    <div className="mt-7 flex items-center justify-between border-t border-white/10 pt-5">

                      <span className="text-[9px] tracking-widest text-gray-600">
                        FRESHLY LISTED
                      </span>

                      <button
                        onClick={() => deleteItem(item.id)}
                        disabled={deleting === item.id}
                        className="text-[10px] tracking-widest text-red-400 transition hover:text-red-300 disabled:opacity-40"
                      >
                        {deleting === item.id ? "REMOVING..." : "REMOVE ITEM ×"}
                      </button>

                    </div>

                  </div>
                </article>
              ))}

            </div>
          )}

          <div className="mt-12 text-center">
            <button
              onClick={fetchMenu}
              disabled={loading}
              className="border border-white/20 px-8 py-4 text-[10px] tracking-widest text-gray-300 transition hover:border-[#b87345] hover:text-[#c18457] disabled:opacity-50"
            >
              ↻ REFRESH MENU
            </button>
          </div>

        </div>

      </section>

      {/* MANAGEMENT SECTION */}
      <section id="manage" className="mx-auto max-w-7xl px-6 py-28">

        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">

          <div>
            <p className="mb-5 text-[10px] tracking-[0.4em] text-[#c18457]">
              BEHIND THE SCENES
            </p>

            <h2 className="font-serif text-5xl leading-tight sm:text-6xl">
              Your menu.
              <span className="block italic text-[#c18457]">
                Your creation.
              </span>
            </h2>

            <p className="mt-7 max-w-md text-sm leading-8 text-gray-400">
              Introduce a new dish to the NOIR & SPICE collection.
              Every addition is stored in your NeonDB database and
              automatically appears in the live restaurant menu.
            </p>

            <div className="mt-10 space-y-5 text-xs tracking-wide text-gray-400">
              <p><span className="mr-3 text-[#c18457]">✦</span> Direct NeonDB integration</p>
              <p><span className="mr-3 text-[#c18457]">✦</span> Automatic menu updates</p>
              <p><span className="mr-3 text-[#c18457]">✦</span> Persistent food records</p>
            </div>

          </div>

          <div className="border border-white/10 bg-[#171614] p-7 sm:p-10">

            <p className="text-[10px] tracking-[0.3em] text-[#c18457]">
              RESTAURANT MANAGEMENT
            </p>

            <h3 className="mt-4 font-serif text-3xl">
              Introduce a Dish.
            </h3>

            <p className="mt-3 text-xs leading-6 text-gray-500">
              Complete the details below to add a new menu item.
            </p>

            <form onSubmit={addItem} className="mt-9 space-y-6">

              <div>
                <label className="mb-3 block text-[10px] tracking-widest text-gray-400">
                  DISH NAME
                </label>

                <input
                  required
                  maxLength={150}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter food name"
                  className="w-full border border-white/10 bg-[#101010] px-5 py-4 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-[#b87345]"
                />
              </div>

              <div>
                <label className="mb-3 block text-[10px] tracking-widest text-gray-400">
                  PRICE (PKR)
                </label>

                <input
                  type="number"
                  required
                  min="0.01"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="e.g. 850"
                  className="w-full border border-white/10 bg-[#101010] px-5 py-4 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-[#b87345]"
                />
              </div>

              <div>
                <label className="mb-3 block text-[10px] tracking-widest text-gray-400">
                  DISH DESCRIPTION
                </label>

                <textarea
                  required
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your signature dish..."
                  className="w-full resize-none border border-white/10 bg-[#101010] px-5 py-4 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-[#b87345]"
                />
              </div>

              <button
                type="submit"
                disabled={adding}
                className="w-full bg-[#b87345] py-5 text-xs font-bold tracking-[0.2em] text-white transition duration-300 hover:bg-[#ca895e] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {adding ? "SAVING TO DATABASE..." : "＋ ADD TO COLLECTION"}
              </button>

            </form>

          </div>

        </div>

      </section>

      {/* FOOTER */}
      <footer id="contact" className="border-t border-white/10 bg-[#0b0b0b] px-6 py-16">

        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-3">

          <div>
            <h2 className="text-xl font-bold tracking-[0.2em]">
              NOIR <span className="text-[#b87345]">&</span> SPICE
            </h2>
            <p className="mt-5 max-w-xs text-xs leading-7 text-gray-500">
              An expression of flavour, culture and contemporary dining.
              Made to be experienced.
            </p>
          </div>

          <div>
            <p className="text-[10px] tracking-[0.3em] text-[#c18457]">
              EXPLORE
            </p>

            <div className="mt-6 flex flex-col gap-4 text-xs text-gray-400">
              <a href="#home" className="hover:text-[#c18457]">Home</a>
              <a href="#story" className="hover:text-[#c18457]">Our Story</a>
              <a href="#menu" className="hover:text-[#c18457]">Our Menu</a>
              <a href="#manage" className="hover:text-[#c18457]">Manage Menu</a>
            </div>
          </div>

          <div>
            <p className="text-[10px] tracking-[0.3em] text-[#c18457]">
              FIND US
            </p>

            <p className="mt-6 text-sm leading-8 text-gray-400">
              Sargodha
              <br />
              Punjab, Pakistan
            </p>
            <p className="mt-4 text-xs text-gray-500">
              THE ART OF BOLD FLAVOUR.
            </p>
          </div>

        </div>

        <div className="mx-auto mt-14 flex max-w-7xl flex-col justify-between gap-4 border-t border-white/10 pt-8 text-[10px] tracking-widest text-gray-600 sm:flex-row">
          <p>© 2026 NOIR & SPICE. ALL RIGHTS RESERVED.</p>
          <p>CRAFTED WITH PASSION.</p>
        </div>

      </footer>

    </main>
  );
}
