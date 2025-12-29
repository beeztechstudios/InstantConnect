// import Link from "next/link";
// import { ArrowRight } from "lucide-react"; // Optional: for a cleaner CTA icon

// const categories = [
//   {
//     id: 1,
//     name: "NFC Cards",
//     tagline: "Tap once. Share everything.",
//     href: "/shop?category=nfc-cards",
//     cta: "Explore All",
//     bgColor: "bg-[#6243CC]", // Deep charcoal for premium feel
//     image: "/card1.png",
//   },
//   {
//     id: 2,
//     name: "AI Review QR & Cards",
//     tagline: "More reviews. More trust.",
//     href: "/ai-review-card",
//     cta: "Boost Reviews",
//     bgColor: "bg-[#FF8026]", // Matches your brand red from the screenshot
//     image: "/card2.png",
//   },
//   {
//     id: 3,
//     name: "The Smart Standees",
//     tagline: "Turn footfall into connections.",
//     href: "/shop?category=standees",
//     cta: "View Designs",
//     bgColor: "bg-[#FFBD40]", // Light contrast block
//     image: "/card3.png",
//     textDark: true,
//   },
//   {
//     id: 4,
//     name: "Keychains",
//     tagline: "ultimate networking tool on your keys.",
//     href: "/shop?category=keychains",
//     cta: "Shop Now",
//     bgColor: "bg-[#01A48D]",
//     image: "/card4.png",
//   },
// ];

// export function CategoryBlocks() {
//   return (
//     <section className="bg-pink-400 py-12  md:py-20">
//       <div className="container  mx-auto ">
//         <div className="grid grid-cols-1 md:grid-cols-5 gap-4 bg-amber-300 ">
//           {/* Item 1: NFC Cards (Large) */}
//           <Link
//             href={categories[0].href}
//             className={`group relative md:col-span-3 flex items-start md:items-center justify-between  overflow-hidden rounded-2xl ${categories[0].bgColor} p-8 min-h-[400px] border-none`}
//           >
//             <div className="z-10 md:max-w-[240px]">
//               <span className="text-white font-bold text-md uppercase tracking-widest">
//                 {categories[0].tagline}
//               </span>
//               <h3 className="mt-2 text-4xl md:text-4xl font-extrabold text-white leading-tight">
//                 {categories[0].name}
//               </h3>
//               <button className="mt-6 flex items-center gap-2 text-white font-semibold group-hover:underline">
//                 {categories[0].cta} <ArrowRight size={18} />
//               </button>
//             </div>
//             <div
//               className="absolute right-0 bottom-0 w-2/3 h-full bg-contain bg-right-bottom bg-no-repeat transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-2"
//               style={{ backgroundImage: `url('${categories[0].image}')` }}
//             />
//           </Link>

//           {/* Item 2: AI Review (Small) */}
//           <Link
//             href={categories[1].href}
//             className={`group relative md:col-span-2 flex flex-col justify-between overflow-hidden rounded-2xl ${categories[1].bgColor} p-8 min-h-[400px]`}
//           >
//             <div className="z-10">
//               <span className="text-white font-bold text-md uppercase tracking-widest">
//                 {categories[1].tagline}
//               </span>
//               <h3 className="mt-2 text-4xl font-extrabold text-white leading-tight">
//                 AI Review <br /> QR & Cards
//               </h3>
//             </div>
//             <div
//               className="absolute -right-10 -bottom-10 w-3/4 h-3/4 bg-contain bg-center bg-no-repeat transition-all duration-500 group-hover:scale-115"
//               style={{ backgroundImage: `url('${categories[1].image}')` }}
//             />
//             <div className="z-10">
//               <span className="inline-block bg-white text-black px-6 py-2 rounded-lg text-sm font-bold uppercase transition-transform group-hover:scale-105">
//                 {categories[1].cta}
//               </span>
//             </div>
//           </Link>

//           {/* Item 3: Standees (Small) */}
//           <Link
//             href={categories[2].href}
//             className={`group relative md:col-span-2 flex flex-col justify-between overflow-hidden rounded-2xl ${categories[2].bgColor} p-8 min-h-[400px] border-none`}
//           >
//             <div className="z-10">
//               <span className="text-white font-bold text-md uppercase tracking-widest">
//                 {categories[2].tagline}
//               </span>
//               <h3 className="mt-2 text-4xl font-extrabold text-black leading-tight">
//                 {categories[2].name}
//               </h3>
//             </div>
//             <div
//               className="absolute -right-4 -bottom-4 w-2/3 h-2/3 bg-contain bg-center bg-no-repeat transition-transform duration-500 group-hover:rotate-3"
//               style={{ backgroundImage: `url('${categories[2].image}')` }}
//             />
//             <div className="z-10">
//               <button className="text-zinc-900 font-bold border-b-2 border-zinc-900 pb-1">
//                 {categories[2].cta}
//               </button>
//             </div>
//           </Link>

//           {/* Item 4: Keychains (Large) */}

//           <Link
//             href={categories[3].href}
//             className={`group relative md:col-span-3 flex items-start md:items-center justify-between  overflow-hidden rounded-2xl ${categories[3].bgColor} p-8 min-h-[400px] border-none`}
//           >
//             <div className="z-10 md:max-w-[240px]">
//               <span className="text-white font-bold text-md uppercase tracking-widest">
//                 Ultimate networking tool
//               </span>
//               <span className="text-white font-bold text-md uppercase tracking-widest">
//                 on your keys.
//               </span>
//               <h3 className="mt-2 text-4xl md:text-4xl font-extrabold text-white leading-tight">
//                 {categories[3].name}
//               </h3>
//               <div className="z-10 mt-6">
//                 <span className="inline-block bg-white  text-black px-8 py-3 rounded-xl text-sm font-bold transition-colors">
//                   {categories[3].cta}
//                 </span>
//               </div>
//             </div>
//             <div
//               className="absolute right-0 bottom-0 w-2/3 h-full bg-contain bg-right-bottom bg-no-repeat transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-2"
//               style={{ backgroundImage: `url('${categories[3].image}')` }}
//             />
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// }


import Link from "next/link";
import { ArrowRight } from "lucide-react";

const categories = [
  {
    id: 1,
    name: "NFC Cards",
    tagline: "Tap once. Share everything.",
    href: "/shop?category=nfc-cards",
    cta: "Explore All",
    bgColor: "bg-[#6243CC]",
    image: "/card1.png",
  },
  {
    id: 2,
    name: "AI Review QR & Cards",
    tagline: "More reviews. More trust.",
    href: "/ai-review-card",
    cta: "Boost Reviews",
    bgColor: "bg-[#FF8026]",
    image: "/card2.png",
  },
  {
    id: 3,
    name: "The Smart Standees",
    tagline: "Turn footfall into connections.",
    href: "/shop?category=standees",
    cta: "View Designs",
    bgColor: "bg-[#FFBD40]",
    image: "/card3.png",
    textDark: true,
  },
  {
    id: 4,
    name: "Keychains",
    tagline: "Ultimate networking tool on your keys.",
    href: "/shop?category=keychains",
    cta: "Shop Now",
    bgColor: "bg-[#01A48D]",
    image: "/card4.png",
  },
];

export function CategoryBlocks() {
  return (
    <section className="py-12 md:py-20 w-full">
      {/* Ensure max-width matches your top product section */}
      <div className="container mx-auto px-4 md:px-6 w-full">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 w-full">
          {/* Item 1: NFC Cards (3/5 width) */}
          <Link
            href={categories[0].href}
            className={`group relative md:col-span-3 flex items-center overflow-hidden rounded-3xl ${categories[0].bgColor} p-8 md:p-12 min-h-[350px] md:min-h-[400px] transition-all hover:shadow-xl`}
          >
            <div className="relative z-10 max-w-[280px]">
              <p className="text-white/90 font-bold text-xs md:text-sm uppercase tracking-widest mb-2">
                {categories[0].tagline}
              </p>
              <h3 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
                {categories[0].name}
              </h3>
              <div className="mt-8 flex items-center gap-2 text-white font-bold group-hover:gap-4 transition-all">
                {categories[0].cta} <ArrowRight size={20} />
              </div>
            </div>
            <div
              className="absolute right-0 bottom-0 w-1/2 h-full bg-contain bg-right-bottom bg-no-repeat transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: `url('${categories[0].image}')` }}
            />
          </Link>

          {/* Item 2: AI Review (2/5 width) */}
          <Link
            href={categories[1].href}
            className={`group relative md:col-span-2 flex flex-col justify-between overflow-hidden rounded-3xl ${categories[1].bgColor} p-8 md:p-10 min-h-[350px] md:min-h-[400px] transition-all hover:shadow-xl`}
          >
            <div className="relative z-10">
              <p className="text-white/90 font-bold text-xs md:text-sm uppercase tracking-widest mb-2">
                {categories[1].tagline}
              </p>
              <h3 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
                AI Review <br /> QR & Cards
              </h3>
            </div>
            <div
              className="absolute right-0 bottom-12 w-3/4 h-1/2 bg-contain bg-right bg-no-repeat transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundImage: `url('${categories[1].image}')` }}
            />
            <div className="relative z-10">
              <span className="inline-block bg-white text-black px-6 py-3 rounded-xl text-sm font-bold uppercase shadow-lg transition-transform group-hover:scale-105">
                {categories[1].cta}
              </span>
            </div>
          </Link>

          {/* Item 3: Standees (2/5 width) */}
          <Link
            href={categories[2].href}
            className={`group relative md:col-span-2 flex flex-col justify-between overflow-hidden rounded-3xl ${categories[2].bgColor} p-8 md:p-10 min-h-[350px] md:min-h-[400px] transition-all hover:shadow-xl`}
          >
            <div className="relative z-10">
              <p className="text-black/70 font-bold text-xs md:text-sm uppercase tracking-widest mb-2">
                {categories[2].tagline}
              </p>
              <h3 className="text-3xl md:text-4xl font-extrabold text-black leading-tight">
                {categories[2].name}
              </h3>
            </div>
            <div
              className="absolute right-4 bottom-10 w-2/3 h-1/2 bg-contain bg-right bg-no-repeat transition-transform duration-700 group-hover:rotate-2 group-hover:scale-105"
              style={{ backgroundImage: `url('${categories[2].image}')` }}
            />
            <div className="relative z-10">
              <button className="text-black font-bold border-b-2 border-black pb-1 hover:pr-4 transition-all">
                {categories[2].cta}
              </button>
            </div>
          </Link>

          {/* Item 4: Keychains (3/5 width) */}
          <Link
            href={categories[3].href}
            className={`group relative md:col-span-3 flex items-center overflow-hidden rounded-3xl ${categories[3].bgColor} p-8 md:p-12 min-h-[350px] md:min-h-[400px] transition-all hover:shadow-xl`}
          >
            <div className="relative z-10 max-w-[300px]">
              <p className="text-white/90 font-bold text-xs md:text-sm uppercase tracking-widest mb-2">
                Ultimate networking tool
              </p>
              <h3 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
                {categories[3].name}
              </h3>
              <div className="mt-8">
                <span className="inline-block bg-white text-black px-8 py-3 rounded-xl text-sm font-bold shadow-lg transition-transform group-hover:scale-105">
                  {categories[3].cta}
                </span>
              </div>
            </div>
            <div
              className="absolute right-0 bottom-0 w-1/2 h-full bg-contain bg-right-bottom bg-no-repeat transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: `url('${categories[3].image}')` }}
            />
          </Link>
        </div>
      </div>
    </section>
  );
}

// import Link from "next/link";
// import { ArrowUpRight } from "lucide-react";

// const categories = [
//   {
//     id: 1,
//     name: "NFC Cards",
//     tagline: "The Gold Standard",
//     href: "/shop?category=nfc-cards",
//     cta: "Design Yours",
//     image: "/card1.png",
//     gridClass: "md:col-span-3",
//     theme: "dark",
//   },
//   {
//     id: 2,
//     name: "AI Review\nSolutions",
//     tagline: "5-Star Growth",
//     href: "/ai-review-card",
//     cta: "Get Started",
//     image: "/card2.png",
//     gridClass: "md:col-span-2",
//     theme: "sky",
//   },
//   {
//     id: 3,
//     name: "Business\nStandees",
//     tagline: "Physical to Digital",
//     href: "/shop?category=standees",
//     cta: "View Collection",
//     image: "/card3.png",
//     gridClass: "md:col-span-2",
//     theme: "white",
//   },
//   {
//     id: 4,
//     name: "Smart Keychains",
//     tagline: "Always Connected",
//     href: "/shop?category=keychains",
//     cta: "Shop Now",
//     image: "/card4.png",
//     gridClass: "md:col-span-3",
//     theme: "dark",
//   },
// ];

// export function CategoryBlocks() {
//   return (
//     <section className="bg-zinc-50 py-16">
//       <div className="container mx-auto px-4">
//         {/* Section Header to match your professional branding */}
//         <div className="mb-10 flex items-end justify-between">
//           <div>
//             <span className="text-sky-500 font-bold uppercase tracking-widest text-xs">
//               Categories
//             </span>
//             <h2 className="text-3xl font-black text-zinc-900 mt-2">
//               Elevate your networking.
//             </h2>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
//           {/* NFC CARDS - DARK THEME WITH SKY GLOW */}
//           <Link
//             href={categories[0].href}
//             className="group relative md:col-span-3 overflow-hidden rounded-[24px] bg-zinc-950 p-8 min-h-[420px] transition-all hover:shadow-2xl hover:shadow-sky-500/10 border border-zinc-800"
//           >
//             <div className="relative z-10 h-full flex flex-col justify-between">
//               <div>
//                 <span className="text-sky-400 font-bold text-xs uppercase tracking-tighter">
//                   {categories[0].tagline}
//                 </span>
//                 <h3 className="mt-2 text-4xl font-extrabold text-white">
//                   {categories[0].name}
//                 </h3>
//               </div>
//               <div className="flex items-center gap-2 text-white font-medium group-hover:text-sky-400 transition-colors">
//                 {categories[0].cta} <ArrowUpRight size={20} />
//               </div>
//             </div>
//             {/* Background Sky Glow */}
//             <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-sky-500/10 blur-[100px] rounded-full" />
//             <div
//               className="absolute right-0 bottom-0 w-3/4 h-full bg-contain bg-right-bottom bg-no-repeat transition-transform duration-700 group-hover:scale-105"
//               style={{ backgroundImage: `url('${categories[0].image}')` }}
//             />
//           </Link>

//           {/* AI REVIEW - SKY THEME */}
//           <Link
//             href={categories[1].href}
//             className="group relative md:col-span-2 overflow-hidden rounded-[24px] bg-sky-400 p-8 min-h-[420px]"
//           >
//             <div className="relative z-10">
//               <span className="text-sky-900/60 font-bold text-xs uppercase tracking-tighter">
//                 {categories[1].tagline}
//               </span>
//               <h3 className="mt-2 text-3xl font-black text-white leading-[1.1]">
//                 {categories[1].name}
//               </h3>
//             </div>
//             <div
//               className="absolute -right-12 -bottom-12 w-4/5 h-4/5 bg-contain bg-no-repeat transition-all duration-500 group-hover:rotate-6 group-hover:scale-110"
//               style={{ backgroundImage: `url('${categories[1].image}')` }}
//             />
//             <div className="absolute bottom-8 left-8">
//               <span className="bg-zinc-900 text-white px-5 py-2.5 rounded-full text-sm font-bold transition-transform group-hover:scale-105">
//                 {categories[1].cta}
//               </span>
//             </div>
//           </Link>

//           {/* STANDEES - LIGHT THEME */}
//           <Link
//             href={categories[2].href}
//             className="group relative md:col-span-2 overflow-hidden rounded-[24px] bg-white p-8 min-h-[420px] border border-zinc-200 shadow-sm transition-all hover:border-sky-400/50"
//           >
//             <div className="relative z-10">
//               <span className="text-zinc-400 font-bold text-xs uppercase tracking-tighter">
//                 {categories[2].tagline}
//               </span>
//               <h3 className="mt-2 text-3xl font-black text-zinc-900 leading-[1.1]">
//                 {categories[2].name}
//               </h3>
//             </div>
//             <div
//               className="absolute -right-4 bottom-0 w-2/3 h-2/3 bg-contain bg-bottom bg-no-repeat grayscale group-hover:grayscale-0 transition-all duration-500"
//               style={{ backgroundImage: `url('${categories[2].image}')` }}
//             />
//             <div className="absolute bottom-8 left-8">
//               <button className="text-zinc-900 font-black flex items-center gap-1 group-hover:gap-3 transition-all">
//                 {categories[2].cta}{" "}
//                 <ArrowUpRight size={18} className="text-sky-500" />
//               </button>
//             </div>
//           </Link>

//           {/* KEYCHAINS - DARK THEME WITH RED HIGHLIGHT */}
//           <Link
//             href={categories[3].href}
//             className="group relative md:col-span-3 overflow-hidden rounded-[24px] bg-zinc-900 p-8 min-h-[420px] border border-zinc-800"
//           >
//             <div className="relative z-10 flex h-full items-center">
//               <div className="w-1/2">
//                 <span className="text-red-500 font-bold text-xs uppercase tracking-tighter">
//                   {categories[3].tagline}
//                 </span>
//                 <h3 className="mt-2 text-4xl font-black text-white leading-[1.1]">
//                   {categories[3].name}
//                 </h3>
//                 <p className="text-zinc-500 mt-4 text-sm leading-relaxed">
//                   Miniaturized tech for your everyday carry.
//                 </p>
//                 <div className="mt-8">
//                   <span className="bg-sky-500 text-white px-8 py-3 rounded-lg text-sm font-bold hover:bg-sky-400 transition-colors">
//                     {categories[3].cta}
//                   </span>
//                 </div>
//               </div>
//               <div
//                 className="w-1/2 h-full bg-contain bg-center bg-no-repeat transition-transform duration-500 group-hover:scale-110"
//                 style={{ backgroundImage: `url('${categories[3].image}')` }}
//               />
//             </div>
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// }