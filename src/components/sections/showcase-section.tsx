import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

const showcaseImages = [
  "https://cdn.poehali.dev/projects/aac6f84b-fd0e-4860-acfd-9e4603f6c423/files/ca1818bf-9d31-4823-8782-f929f48fe0d8.jpg",
  "https://cdn.poehali.dev/projects/aac6f84b-fd0e-4860-acfd-9e4603f6c423/files/14df07d4-2479-49bc-a2a2-65419290acb4.jpg",
  "https://cdn.poehali.dev/projects/aac6f84b-fd0e-4860-acfd-9e4603f6c423/files/ce47e2d8-e1e1-4f31-9531-75a1f7b220ed.jpg",
]

const labels = ["DROP 001", "DROP 002", "DROP 003"]

export function ShowcaseSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100])
  const y2 = useTransform(scrollYProgress, [0, 1], [150, -150])
  const y3 = useTransform(scrollYProgress, [0, 1], [80, -80])

  const yValues = [y1, y2, y3]

  return (
    <section ref={containerRef} className="bg-background px-6 py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.p
          className="text-muted-foreground text-xs uppercase tracking-widest mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Коллекция
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {showcaseImages.map((src, i) => (
            <motion.div
              key={i}
              className="relative h-[400px] md:h-[500px] overflow-hidden group"
              style={{ y: yValues[i] }}
              initial={{ clipPath: "inset(100% 0 0 0)" }}
              whileInView={{ clipPath: "inset(0 0 0 0)" }}
              viewport={{ once: true }}
              transition={{
                duration: 1,
                delay: i * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              data-clickable
            >
              <motion.img
                src={src}
                alt={labels[i]}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <span className="text-xs font-sans font-bold tracking-[0.3em] text-primary">{labels[i]}</span>
              </div>
              <div className="absolute top-3 right-3 border border-primary px-2 py-0.5">
                <span className="text-xs text-primary font-sans font-bold">SAR</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
