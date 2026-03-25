import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Icon from "@/components/ui/icon"

const products = [
  {
    id: 1,
    name: "Худи SSW. Чёрная",
    description: "Фрунзенский район × SAR SWAGGIN WEAR",
    price: 2400,
    images: [
      "https://cdn.poehali.dev/projects/aac6f84b-fd0e-4860-acfd-9e4603f6c423/bucket/0e301fa1-2844-486a-ba1e-87ede3b46129.jpg",
      "https://cdn.poehali.dev/projects/aac6f84b-fd0e-4860-acfd-9e4603f6c423/bucket/dbc4b8f8-23de-4820-98ab-d82f89998ee4.jpg",
    ],
    tag: "Хит",
    color: "Чёрный",
  },
  {
    id: 2,
    name: "Худи SSW. Белая",
    description: "Фрунзенский район × SAR SWAGGIN WEAR",
    price: 2400,
    images: [
      "https://cdn.poehali.dev/projects/aac6f84b-fd0e-4860-acfd-9e4603f6c423/bucket/011c9461-57a0-44c0-b7c9-aa0fda63ec55.jpg",
      "https://cdn.poehali.dev/projects/aac6f84b-fd0e-4860-acfd-9e4603f6c423/bucket/75ea205a-e005-48f0-af5c-76cb6b101994.jpg",
    ],
    tag: "Новинка",
    color: "Белый",
  },
]

function ProductCard({ product }: { product: typeof products[0] }) {
  const [imgIndex, setImgIndex] = useState(0)

  return (
    <motion.div
      className="group relative flex flex-col"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div
        className="relative overflow-hidden bg-secondary aspect-[3/4] cursor-pointer"
        onMouseEnter={() => setImgIndex(1)}
        onMouseLeave={() => setImgIndex(0)}
      >
        <AnimatePresence mode="crossfade">
          <motion.img
            key={imgIndex}
            src={product.images[imgIndex]}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover object-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        </AnimatePresence>

        {product.tag && (
          <div className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest px-3 py-1">
            {product.tag}
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/80 to-transparent">
          <a
            href="https://t.me/espanolafantasma"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground py-3 text-sm font-bold uppercase tracking-widest hover:bg-primary/80 transition-colors"
            data-clickable
          >
            <Icon name="Send" size={16} />
            Заказать в Telegram
          </a>
        </div>
      </div>

      <div className="pt-4 flex flex-col gap-1">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-foreground font-bold uppercase tracking-wide text-sm">{product.name}</h3>
            <p className="text-muted-foreground text-xs mt-0.5 uppercase tracking-wider">{product.description}</p>
          </div>
          <span className="text-foreground font-bold text-sm whitespace-nowrap">{product.price.toLocaleString("ru-RU")} ₽</span>
        </div>

        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs text-muted-foreground uppercase tracking-wider">Цвет:</span>
          <span className="text-xs text-foreground uppercase tracking-wider">{product.color}</span>
        </div>
      </div>
    </motion.div>
  )
}

export function CatalogSection() {
  return (
    <section id="catalog" className="px-6 py-24 bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="flex items-end justify-between mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div>
            <p className="text-muted-foreground text-xs uppercase tracking-widest mb-2">Коллекция 2025</p>
            <h2 className="text-4xl md:text-6xl font-serif text-foreground tracking-tight leading-none">
              Каталог<span className="text-primary">.</span>
            </h2>
          </div>
          <a
            href="https://t.me/espanolafantasma"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-xs uppercase tracking-widest"
            data-clickable
          >
            Все вопросы в Telegram
            <Icon name="ArrowRight" size={14} />
          </a>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12 max-w-3xl mx-auto">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-muted-foreground text-sm mb-4">Хочешь заказать? Пиши напрямую в Telegram</p>
          <a
            href="https://t.me/espanolafantasma"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-primary/80 transition-colors"
            data-clickable
          >
            <Icon name="Send" size={16} />
            @espanolafantasma
          </a>
        </motion.div>
      </div>
    </section>
  )
}
