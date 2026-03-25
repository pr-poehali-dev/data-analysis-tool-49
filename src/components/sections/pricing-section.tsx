import { motion } from "framer-motion"
import Icon from "@/components/ui/icon"

const drops = [
  {
    name: "Базовый дроп",
    price: "2 900",
    period: " ₽",
    description: "Футболка или худи из текущей коллекции",
    features: ["Лимитированный тираж", "Оригинальный принт SSW", "100% хлопок", "Доставка по России"],
  },
  {
    name: "Эксклюзив",
    price: "5 900",
    period: " ₽",
    description: "Полный образ от SAR SWAGGIN WEAR",
    features: ["Номерной экземпляр", "Коллаборация с художниками Саратова", "Подписанная бирка", "Ранний доступ к следующим дропам", "Приоритетная доставка"],
    popular: true,
  },
]

export function PricingSection() {
  return (
    <section className="bg-secondary px-6 py-24">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-serif text-foreground tracking-tight">Дропы и цены</h2>
          <p className="text-muted-foreground mt-4 max-w-md mx-auto">Лимитированные выпуски. Кто успел — тот в образе.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {drops.map((plan, i) => (
            <motion.div
              key={i}
              className={`relative bg-background p-8 ticket-edge border ${plan.popular ? "border-primary" : "border-border"}`}
              style={plan.popular ? { boxShadow: "0 0 30px -5px hsl(0 85% 50% / 0.3)" } : {}}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              data-clickable
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 uppercase tracking-wider">
                  Хит дропа
                </span>
              )}

              <div className="text-center pb-6 border-b border-dashed border-border">
                <h3 className="font-serif text-xl text-foreground">{plan.name}</h3>
                <div className="mt-4 flex items-baseline justify-center gap-1">
                  <span className="text-4xl md:text-5xl font-serif text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <p className="text-muted-foreground text-sm mt-2">{plan.description}</p>
              </div>

              <ul className="mt-6 space-y-3">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-3 text-foreground">
                    <Icon name="Check" size={16} className="text-primary flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full mt-8 py-3 px-6 font-bold text-sm uppercase tracking-widest transition-all ${
                  plan.popular
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "bg-transparent border border-foreground/30 text-foreground hover:border-primary hover:text-primary"
                }`}
              >
                Заказать
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
