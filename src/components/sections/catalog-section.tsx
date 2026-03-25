import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Icon from "@/components/ui/icon"

const sizes = ["XS", "S", "M", "L", "XL", "XXL"]

const sizeTable = [
  { size: "XS", chest: "84–88", waist: "66–70", hips: "90–94", height: "158–164" },
  { size: "S",  chest: "88–92", waist: "70–74", hips: "94–98", height: "164–170" },
  { size: "M",  chest: "92–96", waist: "74–78", hips: "98–102", height: "170–176" },
  { size: "L",  chest: "96–100", waist: "78–82", hips: "102–106", height: "176–182" },
  { size: "XL", chest: "100–104", waist: "82–86", hips: "106–110", height: "182–188" },
  { size: "XXL", chest: "104–108", waist: "86–90", hips: "110–114", height: "188–194" },
]

function SizeModal({ onClose }: { onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
        <motion.div
          className="relative bg-background border border-border w-full max-w-lg z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.25 }}
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <h3 className="text-foreground font-bold uppercase tracking-widest text-sm">Таблица размеров</h3>
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors" data-clickable>
              <Icon name="X" size={18} />
            </button>
          </div>

          <div className="px-6 py-4">
            <p className="text-muted-foreground text-xs uppercase tracking-wider mb-4">Все размеры указаны в сантиметрах (обхват тела)</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left text-muted-foreground font-medium uppercase tracking-wider text-xs pb-3 pr-4">Размер</th>
                    <th className="text-left text-muted-foreground font-medium uppercase tracking-wider text-xs pb-3 pr-4">Грудь</th>
                    <th className="text-left text-muted-foreground font-medium uppercase tracking-wider text-xs pb-3 pr-4">Талия</th>
                    <th className="text-left text-muted-foreground font-medium uppercase tracking-wider text-xs pb-3 pr-4">Бёдра</th>
                    <th className="text-left text-muted-foreground font-medium uppercase tracking-wider text-xs pb-3">Рост</th>
                  </tr>
                </thead>
                <tbody>
                  {sizeTable.map((row, i) => (
                    <tr key={row.size} className={i < sizeTable.length - 1 ? "border-b border-border/40" : ""}>
                      <td className="py-3 pr-4 font-bold text-foreground uppercase tracking-wide">{row.size}</td>
                      <td className="py-3 pr-4 text-foreground">{row.chest}</td>
                      <td className="py-3 pr-4 text-foreground">{row.waist}</td>
                      <td className="py-3 pr-4 text-foreground">{row.hips}</td>
                      <td className="py-3 text-foreground">{row.height}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-muted-foreground text-xs mt-5 leading-relaxed">
              Худи оверсайз — рекомендуем брать свой размер или на один меньше для более приталенного силуэта.
              Если сомневаешься — пиши в Telegram, поможем подобрать.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

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

function ProductCard({ product, onSizeGuide }: { product: typeof products[0]; onSizeGuide: () => void }) {
  const [imgIndex, setImgIndex] = useState(0)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)

  const telegramUrl = selectedSize
    ? `https://t.me/espanolafantasma?text=${encodeURIComponent(`Хочу заказать: ${product.name}, размер ${selectedSize}`)}`
    : "https://t.me/espanolafantasma"

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
            href={telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground py-3 text-sm font-bold uppercase tracking-widest hover:bg-primary/80 transition-colors"
            data-clickable
          >
            <Icon name="Send" size={16} />
            {selectedSize ? `Заказать размер ${selectedSize}` : "Заказать в Telegram"}
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

        <div className="mt-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground uppercase tracking-wider">Размер:</span>
            <button
              onClick={onSizeGuide}
              className="text-xs text-muted-foreground hover:text-primary transition-colors uppercase tracking-wider underline underline-offset-2"
              data-clickable
            >
              Таблица размеров
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(selectedSize === size ? null : size)}
                className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider border transition-colors ${
                  selectedSize === size
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-transparent text-foreground border-border hover:border-primary hover:text-primary"
                }`}
                data-clickable
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function CatalogSection() {
  const [showSizeGuide, setShowSizeGuide] = useState(false)

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
            <ProductCard key={product.id} product={product} onSizeGuide={() => setShowSizeGuide(true)} />
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

      {showSizeGuide && <SizeModal onClose={() => setShowSizeGuide(false)} />}
    </section>
  )
}
