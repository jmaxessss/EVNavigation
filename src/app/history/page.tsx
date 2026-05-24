import { ArrowLeft, Navigation, Zap, Calendar, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export default function HistoryPage() {
  const historyItems = [
    {
      type: 'trip',
      title: 'Минск — Брест (М1)',
      date: 'Сегодня, 14:40',
      stats: '345км • 3ч 45м',
      consumption: '15.8 кВтч/100км'
    },
    {
      type: 'charge',
      title: 'Malanka #21 (ТЦ "Замок")',
      date: 'Вчера, 18:15',
      stats: '45.2 кВтч добавлено',
      consumption: '32м время зарядки'
    },
    {
      type: 'trip',
      title: 'Поездка в офис',
      date: '12 Апр, 08:30',
      stats: '12км • 22м',
      consumption: '15.1 кВтч/100км'
    },
    {
      type: 'trip',
      title: 'В магазин (Грин Сити)',
      date: '11 Апр, 16:20',
      stats: '4км • 10м',
      consumption: '16.8 кВтч/100км'
    }
  ];

  return (
    <main className="min-h-screen pb-24 px-6 pt-8 max-w-lg mx-auto">
      <header className="mb-8">
        <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground mb-6 hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-semibold">Дашборд</span>
        </Link>
        <h1 className="text-3xl font-bold font-headline">История поездок</h1>
      </header>

      <div className="space-y-4">
        {historyItems.map((item, idx) => (
          <Card key={idx} className="glass-card border-none hover:bg-white/5 transition-colors cursor-pointer group oversized-tap">
            <CardContent className="p-5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-2xl ${item.type === 'charge' ? 'bg-accent/20 text-accent' : 'bg-primary/20 text-primary'}`}>
                  {item.type === 'charge' ? <Zap className="w-6 h-6" /> : <Navigation className="w-6 h-6" />}
                </div>
                <div>
                  <h3 className="font-bold text-sm">{item.title}</h3>
                  <div className="flex items-center gap-2 text-[10px] text-muted-foreground mt-0.5">
                    <Calendar className="w-3 h-3" />
                    <span>{item.date}</span>
                  </div>
                  <p className="text-xs font-semibold text-muted-foreground mt-2">
                    {item.stats} • <span className="text-accent/80">{item.consumption}</span>
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground opacity-30 group-hover:opacity-100 transition-opacity" />
            </CardContent>
          </Card>
        ))}
      </div>

      <section className="mt-12 p-6 rounded-3xl bg-primary/10 border border-primary/20 text-center">
        <h4 className="font-headline font-bold text-primary mb-1">Эко-вклад месяца</h4>
        <p className="text-xs text-muted-foreground">Вы сэкономили около 142 кг выбросов CO2 в этом месяце по сравнению с ДВС.</p>
      </section>
    </main>
  );
}
