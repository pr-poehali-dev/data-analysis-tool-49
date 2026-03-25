import { useState } from "react"
import { motion } from "framer-motion"
import Icon from "@/components/ui/icon"

const footerLinks = [
  { label: "Коллекции", href: "#" },
  { label: "О бренде", href: "#" },
  { label: "Дропы", href: "#" },
  { label: "Контакты", href: "#" },
]

export function FooterSection() {
  const [email, setEmail] = useState("")

  return (
    <footer className="relative bg-background px-6 py-24 overflow-hidden">
      {/* Red glow blob */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-tr from-red-900 via-red-800/30 to-transparent opacity-30 blur-3xl rounded-full" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-end">
          <div>
            <motion.h2
              className="text-6xl md:text-8xl font-serif text-foreground tracking-tight leading-none"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              SSW<span className="text-primary">.</span>
            </motion.h2>
            <p className="text-muted-foreground text-sm mt-3 uppercase tracking-widest">SAR SWAGGIN WEAR × САРАТОВ</p>

            <nav className="flex flex-wrap gap-6 mt-8">
              {footerLinks.map((link, i) => (
                <motion.a
                  key={i}
                  href={link.href}
                  className="text-muted-foreground hover:text-primary transition-colors text-sm uppercase tracking-wider"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  data-clickable
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
          </div>

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-muted-foreground text-sm mb-4 uppercase tracking-wider">Узнай о следующем дропе первым</p>
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Введите email"
                className="flex-1 bg-secondary border border-border px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors text-sm"
              />
              <button
                type="submit"
                className="bg-primary text-primary-foreground p-3 hover:bg-primary/80 transition-colors"
                data-clickable
              >
                <Icon name="ArrowRight" size={20} />
              </button>
            </form>
          </motion.div>
        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-xs uppercase tracking-wider">2025 SAR SWAGGIN WEAR. Саратов, Россия.</p>
          <div className="flex gap-6">
            <a href="#" className="text-muted-foreground hover:text-primary text-xs uppercase tracking-wider transition-colors" data-clickable>
              Instagram
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary text-xs uppercase tracking-wider transition-colors" data-clickable>
              Telegram
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary text-xs uppercase tracking-wider transition-colors" data-clickable>
              VK
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
