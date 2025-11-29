import { useEffect, useRef } from "react";

import { Link } from "react-router-dom";

import { motion, AnimatePresence } from "framer-motion";

import { Rocket, Eye, ArrowRight } from "lucide-react";



interface HeroItem {

  slogan: string;

  short1: string;

  short2: string;

  short3: string;

  url: string;

}



interface Props {

  heroList: HeroItem[];

  currentHeroIndex: number;

  setCurrentHeroIndex: React.Dispatch<React.SetStateAction<number>>;

  isPlaying: boolean;

  setIsPlaying: (v: boolean) => void;

}



export default function HeroSection({

  heroList,

  currentHeroIndex,

  setCurrentHeroIndex,

  isPlaying,

  setIsPlaying,

}: Props) {

  const DURATION = 8000;

  const progressRef = useRef<HTMLDivElement>(null);
  const startTimeRef = useRef<number>(performance.now());

  const clamp = (i: number, l: number) => ((i % l) + l) % l;

  const current = heroList[currentHeroIndex];

  /** autoplay */
  useEffect(() => {
    if (!isPlaying || !heroList.length || heroList.length <= 1) return;

    startTimeRef.current = performance.now();
    if (progressRef.current) {
      progressRef.current.style.setProperty("--p", "0");
    }

    let raf: number;

    const tick = (now: number) => {
      const elapsed = now - startTimeRef.current;
      const t = Math.min(1, elapsed / DURATION);

      if (progressRef.current) {
        progressRef.current.style.setProperty("--p", t.toString());
      }

      if (t >= 1) {
        setCurrentHeroIndex((p) => clamp(p + 1, heroList.length));
      } else {
        raf = requestAnimationFrame(tick);
      }
    };

    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
  }, [isPlaying, currentHeroIndex, heroList.length, setCurrentHeroIndex]);



  if (!current || !heroList.length) {
    return null;
  }

  return (

    <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">

      <AnimatePresence mode="wait">

        <motion.img

          key={current.url}

          src={current.url}

          className="absolute inset-0 w-full h-full object-cover opacity-70"

          initial={{ opacity: 0, scale: 1.05 }}

          animate={{ opacity: 1, scale: 1 }}

          exit={{ opacity: 0, scale: 1.02 }}

          transition={{ duration: 0.8 }}

        />

      </AnimatePresence>



      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black/90" />



      {/* text */}

      <motion.div

        className="relative z-10 text-center max-w-5xl px-6"

        initial={{ opacity: 0, y: 40 }}

        animate={{ opacity: 1, y: 0 }}

        transition={{ duration: 1 }}

      >

        <h1 className="text-6xl md:text-7xl font-extrabold text-white tracking-tight drop-shadow-[0_0_30px_rgba(251,191,36,0.4)]">

          {current.slogan}

        </h1>

        <p className="mt-5 text-lg font-semibold text-amber-300/90">

          {[current.short1, current.short2, current.short3].filter(Boolean).join(" • ")}

        </p>



        <div className="flex justify-center gap-5 mt-10 flex-wrap">

          <Link

            to="/oyunlar"

            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-black bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 shadow-[0_0_30px_rgba(251,191,36,0.5)] hover:shadow-[0_0_50px_rgba(251,191,36,0.7)] transition-all"

          >

            <Rocket className="h-5 w-5 group-hover:rotate-12 transition-transform" />

            Keşfet

            <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />

          </Link>

          <Link

            to="/iletisim"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl border border-white/30 bg-white/10 backdrop-blur-md text-white font-bold hover:bg-white/20 transition"

          >

            <Eye className="h-5 w-5" />

            Nasıl Çalışır

          </Link>

        </div>

      </motion.div>



      {/* progress glow */}

      <div

        ref={progressRef}

        className="absolute bottom-0 left-0 h-[3px] w-full bg-gradient-to-r from-transparent via-amber-400 to-transparent animate-pulse"

        style={{ width: "calc(var(--p,0)*100%)" }}

      />

    </section>

  );

}