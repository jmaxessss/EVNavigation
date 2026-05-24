import { ArrowLeft, Navigation, Zap, Calendar, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export default function HistoryPage() {
  const historyItems = [
    {
      type: 'trip',
      title: 'Минск — Брест (М1)',
      date: 'Сегодня, 14:40',
      stats: '345 км • 3ч 45м',
      consumption: '15.8 кВтч/100км'
    },
    {
      type: 'charge',
      title: 'Malanka #21 (Замок)',
      date: 'Вчера, 18:15',
      stats: '+45.2 кВтч',
      consumption: '32 мин зарядка'
    },
    {
      type: 'trip',
      title: 'Поездка в офис',
      date: '12 Апр, 08:30',
      stats: '12 км • 22м',
      consumption: '15.1 кВтч/100км'
    }
  ];

  return (
    <main className="min-h-screen pb-24 px-6 pt-12 max-w-lg mx-auto bg-white">
      <header className="mb-10">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-400 mb-6 hover:text-slate-900 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-xs font-bold uppercase tracking-widest">Назад</span>
        </Link>
        <h1 className="text-4xl font-bold font-headline text-slate-950">История</h1>
        <p className="text-slate-500 text-sm">Ваша активность за последние 30 дней</p>
      </header>

      <div className="space-y-4">
        {historyItems.map((item, idx) => (
          <Card key={idx} className="minimal-card border-none bg-slate-50/50 hover:bg-slate-50 cursor-pointer">
            <CardContent className="p-5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-2xl ${item.type === 'charge' ? 'bg-accent/10 text-accent' : 'bg-slate-200 text-slate-600'}`}>
                  {item.type === 'charge' ? <Zap className="w-5 h-5" /> : <Navigation className="w-5 h-5" />}
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900">{item.title}</h3>
                  <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase mt-1">
                    <Calendar className="w-3 h-3" />
                    <span>{item.date}</span>
                  </div>
                  <p className="text-xs font-medium text-slate-500 mt-2">
                    {item.stats} • <span className="text-accent">{item.consumption}</span>
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300" />
            </CardContent>
          </Card>
        ))}
      </div>

      <section className="mt-12 p-6 rounded-3xl bg-slate-50 border border-slate-100 text-center">
        <h4 className="font-bold text-slate-900 mb-2">Экологический след</h4>
        <p className="text-xs text-slate-500 leading-relaxed">Вы сэкономили 142 кг CO2 в этом месяце. Это эквивалентно посадке 7 деревьев.</p>
      </section>
    </main>
  );
}