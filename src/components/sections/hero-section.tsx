import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

const images = [
  "https://cdn.poehali.dev/projects/aac6f84b-fd0e-4860-acfd-9e4603f6c423/bucket/107089fa-52ea-49c8-a600-24553e0b7100.jpg",
  "https://cdn.poehali.dev/projects/aac6f84b-fd0e-4860-acfd-9e4603f6c423/bucket/baf6faec-fc8e-42e9-828a-4475204ac31a.jpg",
  "https://cdn.poehali.dev/projects/aac6f84b-fd0e-4860-acfd-9e4603f6c423/bucket/901a921d-a8f9-4523-b058-f301c99ac411.jpg",
]

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, -15])
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, 0])
  const rotate3 = useTransform(scrollYProgress, [0, 1], [0, 15])
  const x1 = useTransform(scrollYProgress, [0, 1], [0, -200])
  const x3 = useTransform(scrollYProgress, [0, 1], [0, 200])
  const y = useTransform(scrollYProgress, [0, 1], [0, 100])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background px-6 py-24"
    >
      {/* Red noise grain overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0"
        style={{backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: "200px"}}
      />

      {/* Stacked images */}
      <div className="relative flex items-center justify-center">
        <motion.div
          className="absolute w-[280px] md:w-[320px] aspect-[3/4] overflow-hidden shadow-2xl"
          style={{ rotate: rotate1, x: x1, y, zIndex: 1, border: "2px solid hsl(0 85% 50%)" }}
          initial={{ clipPath: "inset(100% 0 0 0)" }}
          animate={{ clipPath: "inset(0 0 0 0)" }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <img
            src={images[0]}
            alt="SAR SWAGGIN WEAR"
            className="w-full h-full object-cover"
          />
        </motion.div>

        <motion.div
          className="relative w-[280px] md:w-[320px] aspect-[3/4] overflow-hidden shadow-2xl"
          style={{ rotate: rotate2, y, zIndex: 2, border: "2px solid hsl(0 85% 50%)" }}
          initial={{ clipPath: "inset(100% 0 0 0)" }}
          animate={{ clipPath: "inset(0 0 0 0)" }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <img
            src={images[1]}
            alt="SAR SWAGGIN WEAR"
            className="w-full h-full object-cover"
          />
        </motion.div>

        <motion.div
          className="absolute w-[280px] md:w-[320px] aspect-[3/4] overflow-hidden shadow-2xl"
          style={{ rotate: rotate3, x: x3, y, zIndex: 1, border: "2px solid hsl(0 85% 50%)" }}
          initial={{ clipPath: "inset(100% 0 0 0)" }}
          animate={{ clipPath: "inset(0 0 0 0)" }}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <img
            src={images[2]}
            alt="SAR SWAGGIN WEAR"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>

      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-center text-foreground mix-blend-difference leading-none tracking-tight">
          SAR<br /><em className="text-primary not-italic">SWAGGIN</em><br />WEAR
        </h1>
      </motion.div>

      {/* City tag — Saratov */}
      <motion.div
        className="absolute top-8 left-8 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <span className="text-xs font-sans uppercase tracking-[0.3em] text-primary border border-primary px-3 py-1">
          Саратов × Улица
        </span>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <a
          href="https://t.me/SarSwagginWear"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-primary text-primary-foreground px-8 py-3 font-bold text-sm uppercase tracking-widest hover:bg-primary/80 transition-colors"
        >
          Написать в Telegram
        </a>
        <motion.div
          className="w-6 h-10 rounded-full border-2 border-primary/50 flex items-start justify-center p-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="w-1 h-2 rounded-full bg-primary" />
        </motion.div>
      </motion.div>
    </section>
  )
}