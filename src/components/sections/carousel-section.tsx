import { motion } from "framer-motion"

const slogans = [
  "SAR SWAGGIN WEAR",
  "САРАТОВ НА СПИНЕ",
  "АНАРХИЯ В СТИЛЕ",
  "УЛИЦА ДИКТУЕТ",
  "ПРОТИВ СИСТЕМЫ",
  "НАШ ГОРОД — НАШ ДРОП",
]

export function CarouselSection() {
  const items = [...slogans, ...slogans]

  return (
    <section className="bg-primary py-16 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 mb-10">
        <motion.h2
          className="text-3xl md:text-5xl font-serif text-primary-foreground tracking-tight leading-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Сделано в Саратове.<br />
          <span className="text-black/40">Носят везде.</span>
        </motion.h2>
      </div>

      <div className="relative">
        <motion.div
          className="flex gap-8 items-center"
          animate={{ x: [0, "-50%"] }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {items.map((slogan, i) => (
            <div key={i} className="flex-shrink-0 flex items-center gap-8">
              <span className="font-serif text-2xl md:text-3xl text-primary-foreground whitespace-nowrap tracking-tight">
                {slogan}
              </span>
              <span className="text-black/30 text-3xl select-none">✕</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
