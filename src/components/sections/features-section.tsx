import { useState, useEffect } from "react"
import { motion } from "framer-motion"

function PunkSymbol() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible((prev) => !prev)
    }, 1800)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center justify-center h-full">
      <motion.span
        className="font-serif text-7xl md:text-9xl text-primary select-none"
        animate={{ opacity: visible ? 1 : 0.15, rotate: visible ? 0 : 15 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        ⚡
      </motion.span>
    </div>
  )
}

function SizeBadges() {
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"]
  const [active, setActive] = useState(2)

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % sizes.length)
    }, 800)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="h-full flex items-center justify-center">
      <div className="flex flex-wrap gap-2 justify-center max-w-[160px]">
        {sizes.map((s, i) => (
          <motion.span
            key={s}
            className="px-3 py-1 text-xs font-sans font-bold border"
            animate={{
              borderColor: i === active ? "hsl(0 85% 50%)" : "hsl(0 0% 25%)",
              color: i === active ? "hsl(0 85% 50%)" : "hsl(0 0% 55%)",
            }}
            transition={{ duration: 0.2 }}
          >
            {s}
          </motion.span>
        ))}
      </div>
    </div>
  )
}

function LimitedBadge() {
  const [count, setCount] = useState(100)

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => (prev > 1 ? prev - 1 : 100))
    }, 80)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-full gap-2">
      <span className="text-4xl md:text-5xl font-serif text-foreground tabular-nums">{count}</span>
      <span className="text-xs text-muted-foreground uppercase tracking-widest">осталось единиц</span>
      <div className="w-full max-w-[120px] h-1 bg-foreground/10 overflow-hidden">
        <motion.div
          className="h-full bg-primary"
          animate={{ width: `${count}%` }}
          transition={{ duration: 0.08 }}
        />
      </div>
    </div>
  )
}

export function FeaturesSection() {
  return (
    <section className="bg-background px-6 py-24">
      <div className="max-w-6xl mx-auto">
        <motion.p
          className="text-muted-foreground text-xs uppercase tracking-widest mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Почему SAR SWAGGIN WEAR
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div
            className="bg-secondary p-8 min-h-[280px] flex flex-col border border-border"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 0.98 }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.2 }}
            data-clickable
          >
            <div className="flex-1">
              <PunkSymbol />
            </div>
            <div className="mt-4">
              <h3 className="font-serif text-lg text-foreground">Дерзкий стиль</h3>
              <p className="text-muted-foreground text-sm mt-1">Анархия, улица, Саратов — в каждом принте.</p>
            </div>
          </motion.div>

          <motion.div
            className="bg-secondary p-8 min-h-[280px] flex flex-col border border-border"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            whileHover={{ scale: 0.98 }}
            whileTap={{ scale: 0.96 }}
            data-clickable
          >
            <div className="flex-1">
              <SizeBadges />
            </div>
            <div className="mt-4">
              <h3 className="font-serif text-lg text-foreground">Все размеры</h3>
              <p className="text-muted-foreground text-sm mt-1">От XS до XXL — стиль для каждого.</p>
            </div>
          </motion.div>

          <motion.div
            className="bg-secondary p-8 min-h-[280px] flex flex-col border border-border"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 0.98 }}
            whileTap={{ scale: 0.96 }}
            data-clickable
          >
            <div className="flex-1">
              <LimitedBadge />
            </div>
            <div className="mt-4">
              <h3 className="font-serif text-lg text-foreground">Лимитированные дропы</h3>
              <p className="text-muted-foreground text-sm mt-1">Каждый релиз — ограниченный тираж. Успей первым.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
