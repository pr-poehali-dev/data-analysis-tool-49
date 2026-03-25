import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Icon from "@/components/ui/icon"

const articles = [
  {
    title: "История бренда: рождение из саратовских улиц",
    category: "О нас",
    image: "https://cdn.poehali.dev/projects/aac6f84b-fd0e-4860-acfd-9e4603f6c423/bucket/107089fa-52ea-49c8-a600-24553e0b7100.jpg",
  },
  {
    title: "Что вдохновляет: анархия, панк и городская идентичность",
    category: "Философия",
    image: "https://cdn.poehali.dev/projects/aac6f84b-fd0e-4860-acfd-9e4603f6c423/bucket/baf6faec-fc8e-42e9-828a-4475204ac31a.jpg",
  },
  {
    title: "Дроп 001 — разбор коллекции",
    category: "Коллекции",
    image: "https://cdn.poehali.dev/projects/aac6f84b-fd0e-4860-acfd-9e4603f6c423/bucket/901a921d-a8f9-4523-b058-f301c99ac411.jpg",
  },
  {
    title: "Символика Саратова в принтах SSW",
    category: "Дизайн",
    image: "https://cdn.poehali.dev/projects/aac6f84b-fd0e-4860-acfd-9e4603f6c423/bucket/315d5439-5cb3-471e-94ef-16eb8b40be47.jpg",
  },
]

export function InsightsSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY })
  }

  return (
    <section className="bg-background px-6 py-24" onMouseMove={handleMouseMove}>
      <div className="max-w-4xl mx-auto">
        <motion.p
          className="text-muted-foreground text-xs uppercase tracking-widest mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Блог / О бренде
        </motion.p>

        <div className="divide-y divide-border">
          {articles.map((article, i) => (
            <motion.a
              key={i}
              href="#"
              className="group flex items-center justify-between py-6 relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              whileHover={{ paddingLeft: 16, paddingRight: 16 }}
              data-clickable
            >
              <div className="flex-1">
                <span className="text-xs text-primary uppercase tracking-wider font-bold">{article.category}</span>
                <h3 className="font-serif text-xl md:text-2xl text-foreground mt-1 group-hover:text-primary transition-colors">
                  {article.title}
                </h3>
              </div>
              <Icon name="ArrowRight" size={20} className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </motion.a>
          ))}
        </div>

        <AnimatePresence>
          {hoveredIndex !== null && (
            <motion.div
              className="fixed pointer-events-none z-50 w-[200px] md:w-[300px] overflow-hidden shadow-2xl hidden md:block border border-primary"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: 1,
                scale: 1,
                x: mousePosition.x + 20,
                y: mousePosition.y - 100,
              }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              <img
                src={articles[hoveredIndex].image}
                alt={articles[hoveredIndex].title}
                className="w-full h-auto"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}