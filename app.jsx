/* global React, ReactDOM */
const { useState, useEffect, useRef, useMemo } = React;

// ─── Original stylized macaw mark — geometric primitives only ─────────────
function MacawMark({ className = "", stroke = "#C9A24A" }) {
  return (
    <svg viewBox="0 0 200 240" className={className} fill="none" stroke={stroke} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      {/* perch branch */}
      <line x1="30" y1="200" x2="175" y2="190" />
      <line x1="55" y1="205" x2="170" y2="196" />
      <line x1="150" y1="190" x2="168" y2="178" />
      <line x1="160" y1="192" x2="178" y2="184" />
      {/* body - stylized teardrop */}
      <path d="M108 60 C78 64, 62 92, 64 130 C66 160, 82 185, 108 195 L120 195 C118 180, 122 162, 130 148 C138 134, 140 120, 134 104 C128 88, 120 74, 108 60 Z" />
      {/* head curve */}
      <path d="M108 60 C96 54, 84 58, 78 70 C74 78, 76 86, 82 92" />
      {/* beak */}
      <path d="M78 70 C70 72, 66 78, 68 86 C72 84, 76 82, 82 82" />
      {/* eye */}
      <circle cx="88" cy="76" r="1.6" fill={stroke} stroke="none" />
      <circle cx="88" cy="76" r="4" />
      {/* wing feathers (layered arcs) */}
      <path d="M92 104 C104 102, 118 108, 126 120" />
      <path d="M86 120 C102 118, 120 124, 130 138" />
      <path d="M82 138 C100 136, 120 142, 132 156" />
      <path d="M80 156 C98 156, 118 162, 130 174" />
      {/* tail */}
      <path d="M120 190 C128 200, 134 214, 136 226" />
      <path d="M112 192 C116 206, 118 218, 118 228" />
      {/* feet suggestion */}
      <path d="M104 195 L104 202 M112 195 L112 202" />
      {/* crest hint */}
      <path d="M110 58 C112 50, 116 46, 122 48" />
    </svg>
  );
}

// ─── L-shaped gold corner brackets ────────────────────────────────────────
function CornerFrame({ children, className = "", size = 28, inset = 0 }) {
  const c = "absolute border-[#C9A24A]/70";
  const s = { width: size, height: size };
  return (
    <div className={`relative ${className}`}>
      <span className={`${c} border-t border-l`} style={{ ...s, top: inset, left: inset }} />
      <span className={`${c} border-t border-r`} style={{ ...s, top: inset, right: inset }} />
      <span className={`${c} border-b border-l`} style={{ ...s, bottom: inset, left: inset }} />
      <span className={`${c} border-b border-r`} style={{ ...s, bottom: inset, right: inset }} />
      {children}
    </div>
  );
}

// ─── Fade-up on scroll ────────────────────────────────────────────────────
function Reveal({ children, delay = 0, className = "", as: Tag = "div" }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setShown(true); io.disconnect(); } },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 900ms cubic-bezier(.2,.7,.2,1) ${delay}ms, transform 900ms cubic-bezier(.2,.7,.2,1) ${delay}ms`,
      }}
    >
      {children}
    </Tag>
  );
}

// ─── Tiny icon set (original, minimalist strokes) ─────────────────────────
const Ico = {
  Leaf: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M4 20c10 0 16-6 16-16-10 0-16 6-16 16z"/><path d="M4 20l9-9"/></svg>),
  Hand:  (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M6 11V6a1.5 1.5 0 013 0v5"/><path d="M9 10V4.5a1.5 1.5 0 013 0V10"/><path d="M12 10V5.5a1.5 1.5 0 013 0V11"/><path d="M15 10.5V8a1.5 1.5 0 013 0v7c0 3.5-2.5 6-6 6s-6-2-7-5l-2-4.5c-.4-.9.1-2 1.2-2.2 .9-.2 1.7.3 2 1.1L7 13"/></svg>),
  Flame: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 3c1.5 3 4.5 5 4.5 9a4.5 4.5 0 11-9 0c0-2 1-3 2-4-1 2 0 3 1 3 0-3 1-5 1.5-8z"/></svg>),
  Bag:   (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M5 8h14l-1 12H6L5 8z"/><path d="M9 8V6a3 3 0 016 0v2"/></svg>),
  Search:(p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="11" cy="11" r="6"/><path d="M20 20l-4-4"/></svg>),
  Menu:  (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" {...p}><path d="M4 7h16M4 12h16M4 17h16"/></svg>),
  Arrow: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M5 12h14"/><path d="M13 5l7 7-7 7"/></svg>),
  Mountain:(p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 20l6-11 4 6 3-4 5 9z"/></svg>),
  Plus:  (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" {...p}><path d="M12 5v14M5 12h14"/></svg>),
  IG:    (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" {...p}><rect x="3.5" y="3.5" width="17" height="17" rx="4"/><circle cx="12" cy="12" r="4"/><circle cx="17" cy="7" r=".8" fill="currentColor"/></svg>),
  X:     (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" {...p}><path d="M4 4l16 16M20 4L4 20"/></svg>),
  Pin:   (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" {...p}><path d="M12 22s7-7.5 7-13a7 7 0 10-14 0c0 5.5 7 13 7 13z"/><circle cx="12" cy="9" r="2.5"/></svg>),
};

// ─── Shimmer gold button ──────────────────────────────────────────────────
function GoldButton({ children, onClick, as: Tag = "button", href, className = "", variant = "solid" }) {
  const base = "group relative inline-flex items-center justify-center gap-3 px-8 py-4 text-[11px] tracking-[0.32em] uppercase overflow-hidden transition-all duration-500";
  const solid = "text-[#14201C] bg-[#C9A24A] hover:bg-[#D6B15C]";
  const outline = "text-[#E8CE8C] border border-[#C9A24A]/70 hover:border-[#E8CE8C] hover:text-[#F2E9D8]";
  const cls = `${base} ${variant === "solid" ? solid : outline} ${className}`;
  const Inner = (
    <>
      <span className="relative z-10 flex items-center gap-3">{children}</span>
      {/* Shimmer sweep */}
      <span aria-hidden className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-[1400ms] ease-out"
        style={{ background: "linear-gradient(100deg, transparent 35%, rgba(255,245,210,.55) 50%, transparent 65%)" }}/>
      {/* Corner ticks on outline */}
      {variant === "outline" && (
        <>
          <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#E8CE8C]" />
          <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#E8CE8C]" />
          <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#E8CE8C]" />
          <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#E8CE8C]" />
        </>
      )}
    </>
  );
  if (Tag === "a") return <a href={href} className={cls} onClick={onClick}>{Inner}</a>;
  return <button onClick={onClick} className={cls}>{Inner}</button>;
}

// ─── Hairline divider with center ornament ────────────────────────────────
function Divider({ ornament = true }) {
  return (
    <div className="flex items-center gap-6 w-full text-[#C9A24A]/50">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#C9A24A]/40 to-[#C9A24A]/40" />
      {ornament && (
        <svg width="28" height="10" viewBox="0 0 28 10" className="text-[#C9A24A]/70">
          <path d="M0 5 L10 5 M18 5 L28 5" stroke="currentColor" strokeWidth="1"/>
          <rect x="12" y="3" width="4" height="4" transform="rotate(45 14 5)" fill="none" stroke="currentColor" strokeWidth="1"/>
        </svg>
      )}
      <div className="flex-1 h-px bg-gradient-to-l from-transparent via-[#C9A24A]/40 to-[#C9A24A]/40" />
    </div>
  );
}

// ─── Nav ──────────────────────────────────────────────────────────────────
function Nav({ onCart }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onS = () => setScrolled(window.scrollY > 40);
    onS();
    window.addEventListener("scroll", onS, { passive: true });
    return () => window.removeEventListener("scroll", onS);
  }, []);
  const links = [
    ["Inicio", "#home"], ["Nuestro Origen", "#origin"], ["Proceso", "#process"], ["Tienda", "#shop"], ["Contacto", "#contact"]
  ];
  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-[#14201C]/92 backdrop-blur-md border-b border-[#C9A24A]/20" : "bg-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex items-center justify-between h-[72px]">
        <a href="#home" className="flex items-center gap-3 group">
          <MacawMark className="w-7 h-8" />
          <div className="flex flex-col">
            <span className="font-display tracking-[0.28em] text-[11px] text-[#E8CE8C] leading-tight">NATURAL WAY</span>
            <span className="text-[#C9A24A]/70 text-[7px] tracking-[0.45em] uppercase leading-tight">COFFEE</span>
          </div>
        </a>
        <nav className="hidden md:flex items-center gap-10">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="relative text-[11px] tracking-[0.28em] uppercase text-[#F2E9D8]/80 hover:text-[#E8CE8C] transition-colors">
              <span>{label}</span>
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-px bg-[#C9A24A] transition-all duration-500 group-hover:w-full" />
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-5 text-[#F2E9D8]/80">
          <button aria-label="Search" className="hidden md:block hover:text-[#E8CE8C] transition-colors"><Ico.Search className="w-[18px] h-[18px]"/></button>
          <button aria-label="Cart" onClick={onCart} className="relative hover:text-[#E8CE8C] transition-colors">
            <Ico.Bag className="w-[18px] h-[18px]"/>
            <span className="absolute -top-1.5 -right-2 w-4 h-4 rounded-full bg-[#C9A24A] text-[#14201C] text-[9px] font-semibold flex items-center justify-center">0</span>
          </button>
          <button aria-label="Menu" onClick={() => setOpen(o => !o)} className="md:hidden"><Ico.Menu className="w-5 h-5"/></button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-[#C9A24A]/20 bg-[#14201C]/95 backdrop-blur-md">
          <div className="px-6 py-4 flex flex-col gap-4">
            {links.map(([label, href]) => (
              <a key={href} href={href} onClick={() => setOpen(false)} className="text-[11px] tracking-[0.28em] uppercase text-[#F2E9D8]/80">{label}</a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────
function Hero() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 10;
    const y = ((e.clientY - r.top) / r.height - 0.5) * -10;
    setTilt({ x, y });
  };
  return (
    <section id="home" className="relative min-h-screen pt-[72px] overflow-hidden">
      {/* subtle texture */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{
        backgroundImage: `radial-gradient(circle at 20% 30%, #C9A24A 0%, transparent 40%), radial-gradient(circle at 80% 70%, #C9A24A 0%, transparent 40%)`
      }}/>
      <div className="absolute inset-0 opacity-[0.12] pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' seed='5'/><feColorMatrix values='0 0 0 0 0.8  0 0 0 0 0.63  0 0 0 0 0.29  0 0 0 0.6 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/></svg>")`
      }}/>

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 pt-14 md:pt-20 pb-20 grid md:grid-cols-12 gap-10 items-center">
        {/* LEFT — copy */}
        <div className="md:col-span-6 lg:col-span-5 relative">
          <Reveal delay={50}>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-10 h-px bg-[#C9A24A]"/>
              <span className="text-[10px] tracking-[0.4em] uppercase text-[#C9A24A]">Natural Way Coffee · Cosecha 2026</span>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="font-display text-[#F2E9D8] leading-[0.95] tracking-[0.04em] text-[clamp(44px,6.2vw,92px)]">
              Desde las <em className="italic text-[#E8CE8C] font-light">tierras altas</em>,<br/>
              vertido en<br/>
              tu mañana.
            </h1>
          </Reveal>
          <Reveal delay={280}>
            <p className="mt-8 max-w-lg text-[#F2E9D8]/70 text-[15px] leading-[1.7] tracking-[0.01em]">
              Natural Way Coffee presenta <em className="text-[#E8CE8C] not-italic">Blend Natuwa</em> — un café costarricense de origen único, cosechado a mano a 1,600&nbsp;metros en las
              tierras altas de Guanacaste. Secado lento, tostado en lotes pequeños y sellado en oro.
            </p>
          </Reveal>
          <Reveal delay={420}>
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <GoldButton as="a" href="#shop" variant="solid">
                Pre-ordenar <Ico.Arrow className="w-3.5 h-3.5"/>
              </GoldButton>
              <GoldButton as="a" href="#origin" variant="outline">
                Nuestro Origen
              </GoldButton>
            </div>
          </Reveal>
          <Reveal delay={600}>
            <div className="mt-14 pt-8 border-t border-[#C9A24A]/20 grid grid-cols-3 gap-6 max-w-md">
              {[
                ["01", "Altitud", "1,600m"],
                ["02", "Varietal", "Geisha"],
                ["03", "Tueste", "Medio"],
              ].map(([n, k, v]) => (
                <div key={n}>
                  <div className="text-[#C9A24A] text-[10px] tracking-[0.3em]">{n}</div>
                  <div className="mt-2 text-[#F2E9D8]/60 text-[10px] tracking-[0.3em] uppercase">{k}</div>
                  <div className="mt-1 font-display text-[#F2E9D8] text-[22px] tracking-wide">{v}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* RIGHT — product frame */}
        <div className="md:col-span-6 lg:col-span-7 relative" onMouseMove={onMove} onMouseLeave={() => setTilt({x:0,y:0})}>
          <Reveal delay={200}>
            <div className="relative mx-auto w-full max-w-[560px] aspect-[4/5]">
              <CornerFrame className="absolute inset-0" size={44} inset={-2} />
              {/* Inner hairline */}
              <div className="absolute inset-8 border border-[#C9A24A]/15" />
              {/* Product */}
              <div
                className="absolute inset-8 flex items-center justify-center transition-transform duration-300 ease-out will-change-transform"
                style={{ transform: `perspective(900px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)` }}
              >
                <img src="assets/bag-mockup.png" alt="Natural Way Coffee — Blend Natuwa" className="w-full h-full object-cover" style={{ filter: "contrast(1.02) saturate(1.05)"}}/>
                {/* shimmer overlay */}
                <div className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-60"
                  style={{ background: "linear-gradient(115deg, transparent 40%, rgba(255,240,200,.22) 50%, transparent 60%)"}}/>
              </div>
              {/* Price badge */}
              <div className="absolute -bottom-6 -right-2 md:-right-8 bg-[#14201C] border border-[#C9A24A]/60 px-5 py-4 text-right">
                <div className="text-[10px] tracking-[0.3em] uppercase text-[#C9A24A]">250g · Edición</div>
                <div className="mt-1 font-display text-[#F2E9D8] text-[28px] tracking-wide">$38<span className="text-[#C9A24A] text-base align-top">.00</span></div>
              </div>
              {/* scroll cue */}
              <div className="hidden lg:flex absolute -left-16 top-1/2 -translate-y-1/2 flex-col items-center gap-3 text-[#C9A24A]/60">
                <span className="text-[10px] tracking-[0.4em] uppercase rotate-180" style={{ writingMode: "vertical-rl"}}>Explorar</span>
                <span className="w-px h-16 bg-gradient-to-b from-[#C9A24A]/60 to-transparent"/>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* marquee ticker */}
      <div className="relative border-y border-[#C9A24A]/20 py-4 overflow-hidden">
        <div className="flex gap-16 whitespace-nowrap animate-[marquee_40s_linear_infinite] text-[#C9A24A]/70 text-[11px] tracking-[0.4em] uppercase">
          {Array.from({ length: 2 }).flatMap((_, i) => [
            "Natural Way Coffee", "◆", "Blend Natuwa", "◆", "Cosechado a mano", "◆", "Tierras Altas de Guanacaste", "◆", "Tostado en lotes pequeños", "◆", "Origen único", "◆", "Hecho en Costa Rica", "◆",
          ].map((t, j) => <span key={`${i}-${j}`}>{t}</span>))}
        </div>
      </div>
    </section>
  );
}

// ─── Origin (Macaw section) ───────────────────────────────────────────────
function Origin() {
  return (
    <section id="origin" className="relative py-28 md:py-40 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <Reveal>
          <div className="flex flex-col items-center text-center mb-16">
            <span className="text-[10px] tracking-[0.5em] uppercase text-[#C9A24A]">— La Guacamaya · El Alma del Blend —</span>
            <h2 className="mt-6 font-display text-[#F2E9D8] text-[clamp(38px,5.2vw,72px)] leading-[1.05] tracking-[0.03em] max-w-4xl">
              <em className="italic text-[#E8CE8C] font-light">Natuwa</em> — palabra chorotega para las aves psitácidas,
              <em className="italic text-[#E8CE8C] font-light"> la lapa dorada.</em>
            </h2>
            <p className="mt-6 max-w-2xl text-[#F2E9D8]/65 text-[15px] leading-[1.8]">
              El alma e inspiración detrás de cada grano. Natural Way Coffee rinde homenaje a este guardián alado
              en su línea de café de origen: <em className="text-[#E8CE8C] not-italic">Blend Natuwa</em>.
            </p>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-12 gap-10 items-center">
          {/* Large framed macaw emblem */}
          <Reveal className="lg:col-span-5" delay={100}>
            <CornerFrame className="aspect-[4/5] p-8 bg-gradient-to-b from-[#1B2621] to-[#14201C]" size={40}>
              <div className="absolute inset-6 border border-[#C9A24A]/15"/>
              <div className="relative h-full flex items-center justify-center">
                <MacawMark className="w-3/5 h-auto" />
              </div>
              <div className="absolute bottom-5 left-0 right-0 text-center">
                <div className="text-[#C9A24A] text-[10px] tracking-[0.45em] uppercase">Guacamaya Verde</div>
              </div>
            </CornerFrame>
          </Reveal>

          {/* Text blocks */}
          <div className="lg:col-span-7 space-y-10">
            <Reveal delay={150}>
              <div className="border-l border-[#C9A24A]/40 pl-8">
                <div className="text-[#C9A24A] text-[10px] tracking-[0.4em] uppercase mb-3">I. El Bosque</div>
                <p className="text-[#F2E9D8]/80 text-[16px] leading-[1.85] max-w-xl">
                  Nuestros árboles crecen bajo el dosel del bosque de Guanacaste, a la sombra de
                  laureles y cecropias nativos. El suelo es volcánico. La lluvia es constante. El
                  café es paciente.
                </p>
              </div>
            </Reveal>
            <Reveal delay={280}>
              <div className="border-l border-[#C9A24A]/40 pl-8">
                <div className="text-[#C9A24A] text-[10px] tracking-[0.4em] uppercase mb-3">II. El Guardián</div>
                <p className="text-[#F2E9D8]/80 text-[16px] leading-[1.85] max-w-xl">
                  La gran guacamaya verde es nuestra brújula. Donde regresa a anidar, el ecosistema
                  está completo. El diez por ciento de cada bolsa replanta su hábitat.
                </p>
              </div>
            </Reveal>
            <Reveal delay={410}>
              <div className="flex items-center gap-6 pt-4">
                <div className="w-16 h-px bg-[#C9A24A]/60"/>
                <a href="#process" className="text-[#E8CE8C] text-[11px] tracking-[0.35em] uppercase hover:text-[#F2E9D8] transition-colors flex items-center gap-3 group">
                  Continuar el viaje
                  <Ico.Arrow className="w-4 h-4 transition-transform group-hover:translate-x-1"/>
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Process — Cosecha, Selección, Maestría ───────────────────────────────
function Process() {
  const steps = [
    { n: "I", es: "Cosecha", en: "La Recolecta", Icon: Ico.Hand,
      body: "Cada cereza se recoge a mano en su punto exacto de madurez entre noviembre y febrero. Nada se cae, nada se apresura." },
    { n: "II", es: "Selección", en: "El Escogido", Icon: Ico.Leaf,
      body: "Los granos se seleccionan a mano sobre mesas de cedro. Solo aquellos con color y densidad impecables sobreviven la segunda pasada." },
    { n: "III", es: "Maestría", en: "El Dominio", Icon: Ico.Flame,
      body: "Tostados en pequeños tambores durante doce minutos. Nuestro maestro tostador tiene cuarenta años de oficio — y escucha un crujido particular." },
  ];
  return (
    <section id="process" className="relative py-28 md:py-40 bg-[#111915]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <Reveal>
          <div className="mb-16 md:mb-24">
            <Divider />
            <div className="mt-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h2 className="font-display text-[#F2E9D8] text-[clamp(36px,4.8vw,64px)] leading-[1.05] tracking-[0.03em] max-w-2xl">
                  Tres actos de <em className="italic text-[#E8CE8C] font-light">disciplina.</em>
                </h2>
                <div className="mt-4 text-[#C9A24A]/80 text-[11px] tracking-[0.4em] uppercase">Cosecha, Selección y Maestría — El Camino Natural del Café</div>
              </div>
              <p className="text-[#F2E9D8]/60 text-[14px] leading-[1.8] max-w-sm">
                Cada bolsa pasa por tres manos antes de llegar a las tuyas. No tomamos atajos.
              </p>
            </div>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-px bg-[#C9A24A]/20">
          {steps.map(({ n, es, en, body, Icon }, i) => (
            <Reveal key={es} delay={i * 160}>
              <div className="relative h-full bg-[#111915] p-10 md:p-12 group hover:bg-[#14201C] transition-colors duration-700">
                {/* top tag */}
                <div className="flex items-center justify-between mb-12">
                  <span className="text-[#C9A24A] text-[10px] tracking-[0.5em]">{n}</span>
                  <Icon className="w-6 h-6 text-[#C9A24A] transition-transform duration-700 group-hover:scale-110"/>
                </div>
                <h3 className="font-display text-[#E8CE8C] text-[clamp(34px,3.4vw,46px)] tracking-[0.04em]">{es}</h3>
                <div className="mt-2 text-[#F2E9D8]/40 text-[11px] tracking-[0.35em] uppercase">{en}</div>
                <div className="mt-8 w-10 h-px bg-[#C9A24A]/60 transition-all duration-500 group-hover:w-20"/>
                <p className="mt-8 text-[#F2E9D8]/75 text-[15px] leading-[1.85]">{body}</p>
                {/* corner ticks */}
                <span className="absolute top-4 left-4 w-3 h-3 border-t border-l border-[#C9A24A]/50"/>
                <span className="absolute bottom-4 right-4 w-3 h-3 border-b border-r border-[#C9A24A]/50"/>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Tasting Notes strip ──────────────────────────────────────────────────
function Notes() {
  const items = [
    { k: "Aroma", v: "Cacao, jazmín, cedro fresco" },
    { k: "Cuerpo",  v: "Aterciopelado, medio-pleno" },
    { k: "Acidez", v: "Brillante — fruta de hueso" },
    { k: "Final", v: "Largo, miel oscura" },
  ];
  return (
    <section className="relative py-24 border-y border-[#C9A24A]/20">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <Reveal>
          <div className="flex items-baseline justify-between mb-10">
            <div className="text-[10px] tracking-[0.5em] uppercase text-[#C9A24A]">— Notas de Cata —</div>
            <div className="text-[#F2E9D8]/40 text-[11px] tracking-[0.3em] uppercase">Lote / 0427</div>
          </div>
        </Reveal>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#C9A24A]/20">
          {items.map(({ k, v }, i) => (
            <Reveal key={k} delay={i*90}>
              <div className="bg-[#14201C] p-8">
                <div className="font-display text-[#E8CE8C] text-[28px] tracking-[0.04em]">{k}</div>
                <div className="mt-3 text-[#F2E9D8]/70 text-[14px] leading-[1.7]">{v}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Shop ─────────────────────────────────────────────────────────────────
function Shop({ onAdd }) {
  const products = [
    { id: "reserva", name: "Reserva del Bosque", sub: "Medio · 250g", price: 38, tag: "Limitado" },
    { id: "cosecha", name: "Cosecha Dorada",      sub: "Ligero · 250g",  price: 36, tag: "Firma" },
    { id: "oscura",  name: "Luna Oscura",         sub: "Oscuro · 250g",   price: 34, tag: "Casa" },
  ];
  const [hover, setHover] = useState(null);
  return (
    <section id="shop" className="relative py-28 md:py-40">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <Reveal>
          <div className="text-center mb-16">
            <span className="text-[10px] tracking-[0.5em] uppercase text-[#C9A24A]">— La Colección —</span>
            <h2 className="mt-6 font-display text-[#F2E9D8] text-[clamp(36px,4.8vw,64px)] tracking-[0.03em]">
              Tres tuestes, <em className="italic text-[#E8CE8C] font-light">un solo bosque.</em>
            </h2>
          </div>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {products.map((p, i) => (
            <Reveal key={p.id} delay={i*120}>
              <div
                className="relative group"
                onMouseEnter={() => setHover(p.id)}
                onMouseLeave={() => setHover(null)}
              >
                <CornerFrame className="aspect-[3/4] bg-gradient-to-b from-[#1B2621] to-[#111915]" size={26}>
                  <div className="absolute inset-6 border border-[#C9A24A]/10"/>
                  {/* product silhouette */}
                  <div className="relative h-full flex items-center justify-center p-10">
                    <div className="relative w-[62%] aspect-[3/5]">
                      {/* bag body */}
                      <div className="absolute inset-0 bg-gradient-to-b from-[#2A3932] to-[#111915] shadow-2xl"
                        style={{ clipPath: "polygon(8% 0, 92% 0, 98% 12%, 100% 100%, 0 100%, 2% 12%)"}}/>
                      {/* macaw emblem */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                        <MacawMark className="w-[58%] h-auto transition-transform duration-700 group-hover:scale-105" />
                        <div className="mt-4 text-center">
                          <div className="font-display text-[#C9A24A] text-[9px] tracking-[0.3em]">NATURAL WAY</div>
                          <div className="font-display text-[#C9A24A] text-[11px] tracking-[0.3em] mt-0.5">NATUWA</div>
                          <div className="text-[#C9A24A]/70 text-[7px] tracking-[0.3em] mt-1">{p.sub.split(" · ")[0].toUpperCase()}</div>
                        </div>
                      </div>
                      {/* corner ticks on bag */}
                      <span className="absolute top-3 left-3 w-4 h-4 border-t border-l border-[#C9A24A]/70"/>
                      <span className="absolute top-3 right-3 w-4 h-4 border-t border-r border-[#C9A24A]/70"/>
                      <span className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-[#C9A24A]/70"/>
                      <span className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-[#C9A24A]/70"/>
                    </div>
                  </div>
                  {/* Tag */}
                  <div className="absolute top-5 left-5 text-[#C9A24A] text-[9px] tracking-[0.35em] uppercase">{p.tag}</div>
                  <div className="absolute top-5 right-5 font-display text-[#F2E9D8] text-[16px]">${p.price}</div>
                </CornerFrame>
                <div className="mt-6 flex items-end justify-between gap-4">
                  <div>
                    <div className="font-display text-[#F2E9D8] text-[22px] tracking-[0.03em]">{p.name}</div>
                    <div className="mt-1 text-[#F2E9D8]/55 text-[11px] tracking-[0.3em] uppercase">{p.sub}</div>
                  </div>
                  <button
                    onClick={() => onAdd(p)}
                    className="relative overflow-hidden flex items-center gap-2 text-[#E8CE8C] text-[10px] tracking-[0.35em] uppercase border-b border-[#C9A24A]/60 pb-1 hover:text-[#F2E9D8] transition-colors"
                  >
                    <span>Añadir</span>
                    <Ico.Plus className="w-3.5 h-3.5"/>
                  </button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Journal (editorial strip) ────────────────────────────────────────────
function Journal() {
  const items = [
    { k: "Nota de Campo", t: "Una mañana con Don Eliseo en la finca de Guanacaste.", d: "Mar 12" },
    { k: "Registro de Tueste",  t: "Por qué doce minutos, y no once.", d: "Feb 28" },
    { k: "Nota de Campo", t: "Los conteos de guacamayas que hacemos antes de cada cosecha.", d: "Ene 05" },
  ];
  return (
    <section className="relative py-28 bg-[#111915]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <Reveal>
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-[10px] tracking-[0.5em] uppercase text-[#C9A24A]">— Diario —</span>
              <h3 className="mt-4 font-display text-[#F2E9D8] text-[clamp(30px,3.4vw,44px)] tracking-[0.03em]">
                Desde la <em className="italic text-[#E8CE8C] font-light">finca.</em>
              </h3>
            </div>
            <a href="#" className="hidden md:inline-flex items-center gap-3 text-[#E8CE8C] text-[10px] tracking-[0.35em] uppercase border-b border-[#C9A24A]/60 pb-1">Todas las entradas <Ico.Arrow className="w-3.5 h-3.5"/></a>
          </div>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-10">
          {items.map((it, i) => (
            <Reveal key={it.t} delay={i*140}>
              <a href="#" className="block group">
                <div className="aspect-[16/10] border border-[#C9A24A]/20 relative overflow-hidden bg-[#14201C]">
                  <div className="absolute inset-0 opacity-30" style={{
                    backgroundImage: `repeating-linear-gradient(45deg, #C9A24A 0 1px, transparent 1px 14px)`,
                  }}/>
                  <div className="absolute inset-6 border border-[#C9A24A]/15"/>
                  <div className="absolute bottom-4 left-4 text-[#C9A24A]/70 text-[9px] tracking-[0.3em] uppercase">Imagen · {it.k}</div>
                </div>
                <div className="mt-6 flex items-center justify-between text-[10px] tracking-[0.35em] uppercase text-[#C9A24A]">
                  <span>{it.k}</span><span className="text-[#F2E9D8]/40">{it.d}</span>
                </div>
                <div className="mt-3 font-display text-[#F2E9D8] text-[20px] leading-[1.35] tracking-[0.02em] group-hover:text-[#E8CE8C] transition-colors">
                  {it.t}
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA ──────────────────────────────────────────────────────────────────
function CTA() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  return (
    <section className="relative py-28 md:py-36 overflow-hidden">
      <div className="max-w-[1100px] mx-auto px-6 md:px-10">
        <CornerFrame className="p-12 md:p-20" size={38}>
          <div className="absolute inset-6 border border-[#C9A24A]/10"/>
          <Reveal>
            <div className="relative text-center">
              <div className="text-[10px] tracking-[0.5em] uppercase text-[#C9A24A]">— Edición Cosecha 2026 —</div>
              <h2 className="mt-6 font-display text-[#F2E9D8] text-[clamp(38px,5.6vw,76px)] leading-[1] tracking-[0.03em]">
                Reserva tu <em className="italic text-[#E8CE8C] font-light">primera taza.</em>
              </h2>
              <p className="mt-6 max-w-xl mx-auto text-[#F2E9D8]/70 text-[15px] leading-[1.8]">
                Tostamos una vez por trimestre. Las pre-órdenes se envían desde San José el primer lunes de cada lanzamiento.
              </p>
              {!sent ? (
                <form
                  onSubmit={(e) => { e.preventDefault(); if (email) setSent(true); }}
                  className="mt-10 flex flex-col sm:flex-row items-stretch gap-3 max-w-lg mx-auto"
                >
                  <input
                    type="email" required value={email} onChange={e => setEmail(e.target.value)}
                    placeholder="tu@correo.com"
                    className="flex-1 bg-transparent border border-[#C9A24A]/40 focus:border-[#E8CE8C] px-5 py-4 text-[#F2E9D8] placeholder:text-[#F2E9D8]/35 text-[13px] tracking-[0.1em] outline-none transition-colors"
                  />
                  <GoldButton variant="solid">
                    Reservar <Ico.Arrow className="w-3.5 h-3.5"/>
                  </GoldButton>
                </form>
              ) : (
                <div className="mt-10 max-w-lg mx-auto border border-[#C9A24A]/50 px-6 py-5 text-[#E8CE8C] text-[11px] tracking-[0.3em] uppercase">
                  ✦ Reservado — una confirmación va en camino.
                </div>
              )}
              <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[10px] tracking-[0.35em] uppercase text-[#F2E9D8]/50">
                <span className="flex items-center gap-2"><Ico.Leaf className="w-3.5 h-3.5 text-[#C9A24A]"/>Rainforest Alliance</span>
                <span className="flex items-center gap-2"><Ico.Mountain className="w-3.5 h-3.5 text-[#C9A24A]"/>1,600m de Altitud</span>
                <span className="flex items-center gap-2"><Ico.Pin className="w-3.5 h-3.5 text-[#C9A24A]"/>Guanacaste, CR</span>
              </div>
            </div>
          </Reveal>
        </CornerFrame>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer id="contact" className="relative border-t border-[#C9A24A]/20 pt-20 pb-10 bg-[#0F1713]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 grid md:grid-cols-12 gap-10">
        <div className="md:col-span-5">
          <div className="flex items-center gap-4">
            <MacawMark className="w-10 h-12"/>
            <div>
              <div className="font-display text-[#E8CE8C] text-[14px] tracking-[0.28em] leading-tight">NATURAL WAY</div>
              <div className="text-[#C9A24A]/70 text-[9px] tracking-[0.45em] uppercase leading-tight">COFFEE · Costa Rica</div>
            </div>
          </div>
          <p className="mt-6 text-[#F2E9D8]/55 text-[13px] leading-[1.85] max-w-sm">
            Natural Way Coffee — una familia de caficultores, tostadores y guardianes del bosque trabajando desde las
            tierras altas de Guanacaste desde 2019.
          </p>
          {/* Domain justification */}
          <div className="mt-5 border border-[#C9A24A]/20 px-4 py-3 max-w-sm">
            <p className="text-[#F2E9D8]/45 text-[11px] leading-[1.7] italic">
              Nuestra casa digital <span className="text-[#E8CE8C] not-italic">natuwacr.com</span> es el espacio donde el camino natural y la esencia ancestral se encuentran.
            </p>
          </div>
          <div className="mt-6 flex items-center gap-4 text-[#F2E9D8]/70">
            <a href="#" aria-label="Instagram" className="w-9 h-9 border border-[#C9A24A]/40 hover:border-[#E8CE8C] hover:text-[#E8CE8C] flex items-center justify-center transition-colors"><Ico.IG className="w-4 h-4"/></a>
            <a href="#" aria-label="X" className="w-9 h-9 border border-[#C9A24A]/40 hover:border-[#E8CE8C] hover:text-[#E8CE8C] flex items-center justify-center transition-colors"><Ico.X className="w-4 h-4"/></a>
            <a href="#" aria-label="Location" className="w-9 h-9 border border-[#C9A24A]/40 hover:border-[#E8CE8C] hover:text-[#E8CE8C] flex items-center justify-center transition-colors"><Ico.Pin className="w-4 h-4"/></a>
          </div>
        </div>
        <div className="md:col-span-2">
          <div className="text-[#C9A24A] text-[10px] tracking-[0.4em] uppercase mb-4">Tienda</div>
          <ul className="space-y-2 text-[#F2E9D8]/60 text-[13px]">
            <li><a href="#" className="hover:text-[#E8CE8C]">Reserva del Bosque</a></li>
            <li><a href="#" className="hover:text-[#E8CE8C]">Cosecha Dorada</a></li>
            <li><a href="#" className="hover:text-[#E8CE8C]">Luna Oscura</a></li>
            <li><a href="#" className="hover:text-[#E8CE8C]">Sets de regalo</a></li>
          </ul>
        </div>
        <div className="md:col-span-2">
          <div className="text-[#C9A24A] text-[10px] tracking-[0.4em] uppercase mb-4">Empresa</div>
          <ul className="space-y-2 text-[#F2E9D8]/60 text-[13px]">
            <li><a href="#origin" className="hover:text-[#E8CE8C]">Nuestro Origen</a></li>
            <li><a href="#process" className="hover:text-[#E8CE8C]">Proceso</a></li>
            <li><a href="#" className="hover:text-[#E8CE8C]">Diario</a></li>
            <li><a href="#" className="hover:text-[#E8CE8C]">Mayoreo</a></li>
          </ul>
        </div>
        <div className="md:col-span-3">
          <div className="text-[#C9A24A] text-[10px] tracking-[0.4em] uppercase mb-4">Visítanos</div>
          <address className="not-italic text-[#F2E9D8]/60 text-[13px] leading-[1.85]">
            Tostería y Sala de Cata<br/>
            Barrio Escalante, Calle 33<br/>
            San José, Costa Rica<br/>
            <a href="mailto:hola@natuwa.cr" className="text-[#E8CE8C] border-b border-[#C9A24A]/40 hover:border-[#E8CE8C] pb-0.5 mt-2 inline-block">hola@natuwa.cr</a>
          </address>
        </div>
      </div>
      {/* Legal transparency bar */}
      <div className="mt-10 max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="border border-[#C9A24A]/15 px-6 py-3 text-center">
          <p className="text-[#F2E9D8]/40 text-[10px] tracking-[0.25em] leading-[1.7]">
            Natural Way Coffee es la marca oficial operada bajo el dominio <span className="text-[#E8CE8C]">natuwacr.com</span>
          </p>
        </div>
      </div>
      <div className="mt-8 pt-6 border-t border-[#C9A24A]/15 max-w-[1400px] mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-[10px] tracking-[0.35em] uppercase text-[#F2E9D8]/45">
          <span>©</span><span>2026 Natural Way Coffee, S.A.</span>
          <span className="text-[#C9A24A]">◆</span>
          <span>Todos los derechos reservados</span>
        </div>
        <div className="flex items-center gap-2 text-[10px] tracking-[0.4em] uppercase">
          <span className="text-[#C9A24A]">✦</span>
          <span className="text-[#E8CE8C]">Hecho en Costa Rica</span>
          <span className="text-[#C9A24A]">✦</span>
        </div>
      </div>
    </footer>
  );
}

// ─── Cart drawer (tiny) ───────────────────────────────────────────────────
function CartDrawer({ open, onClose, items, onRemove }) {
  const total = items.reduce((a, b) => a + b.price, 0);
  return (
    <div className={`fixed inset-0 z-[60] transition-opacity duration-500 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
      <div className="absolute inset-0 bg-black/60" onClick={onClose}/>
      <aside className={`absolute top-0 right-0 h-full w-full max-w-md bg-[#0F1713] border-l border-[#C9A24A]/25 p-8 transition-transform duration-500 ${open ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex items-center justify-between">
          <div className="text-[#C9A24A] text-[11px] tracking-[0.4em] uppercase">Tu Reserva</div>
          <button onClick={onClose} className="text-[#F2E9D8]/70 hover:text-[#E8CE8C]"><Ico.X className="w-5 h-5"/></button>
        </div>
        <div className="mt-10 space-y-6">
          {items.length === 0 && (
            <div className="text-[#F2E9D8]/40 text-[13px] leading-relaxed border border-[#C9A24A]/20 p-6">
              Tu reserva está vacía. Elige un tueste de la colección.
            </div>
          )}
          {items.map((p, idx) => (
            <div key={idx} className="flex items-start justify-between gap-4 border-b border-[#C9A24A]/15 pb-5">
              <div>
                <div className="font-display text-[#F2E9D8] text-[18px]">{p.name}</div>
                <div className="text-[#F2E9D8]/50 text-[11px] tracking-[0.3em] uppercase mt-1">{p.sub}</div>
              </div>
              <div className="text-right">
                <div className="font-display text-[#E8CE8C] text-[18px]">${p.price}</div>
                <button onClick={() => onRemove(idx)} className="mt-1 text-[#F2E9D8]/50 text-[10px] tracking-[0.3em] uppercase hover:text-[#E8CE8C]">Quitar</button>
              </div>
            </div>
          ))}
        </div>
        <div className="absolute bottom-8 left-8 right-8 border-t border-[#C9A24A]/30 pt-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-[#F2E9D8]/60 text-[11px] tracking-[0.3em] uppercase">Subtotal</div>
            <div className="font-display text-[#F2E9D8] text-[22px]">${total}.00</div>
          </div>
          <GoldButton className="w-full" variant="solid">Pagar <Ico.Arrow className="w-3.5 h-3.5"/></GoldButton>
        </div>
      </aside>
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────
function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState([]);
  return (
    <div className="relative">
      <Nav onCart={() => setCartOpen(true)} />
      <Hero />
      <Origin />
      <Process />
      <Notes />
      <Shop onAdd={(p) => { setCart(c => [...c, p]); setCartOpen(true); }} />
      <Journal />
      <CTA />
      <Footer />
      <CartDrawer
        open={cartOpen} onClose={() => setCartOpen(false)}
        items={cart} onRemove={(i) => setCart(c => c.filter((_, idx) => idx !== i))}
      />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
