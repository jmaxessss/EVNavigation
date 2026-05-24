import { ArrowLeft, Navigation, Zap, Calendar, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export default function HistoryPage() {
  const historyItems = [
    {
      type: 'trip',
      title: 'NYC to Boston',
      date: 'Today, 2:40 PM',
      stats: '215km • 3h 12m',
      consumption: '14.2 kWh/100km'
    },
    {
      type: 'charge',
      title: 'Electrify America #42',
      date: 'Yesterday, 6:15 PM',
      stats: '45.2 kWh added',
      consumption: '32m charging time'
    },
    {
      type: 'trip',
      title: 'Work Commute',
      date: 'Apr 12, 8:30 AM',
      stats: '12km • 22m',
      consumption: '15.1 kWh/100km'
    },
    {
      type: 'trip',
      title: 'Grocery Run',
      date: 'Apr 11, 4:20 PM',
      stats: '4km • 10m',
      consumption: '16.8 kWh/100km'
    }
  ];

  return (
    <main className="min-h-screen pb-24 px-6 pt-8 max-w-lg mx-auto">
      <header className="mb-8">
        <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground mb-6 hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-semibold">Dashboard</span>
        </Link>
        <h1 className="text-3xl font-bold font-headline">Travel History</h1>
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
        <h4 className="font-headline font-bold text-primary mb-1">Monthly Insight</h4>
        <p className="text-xs text-muted-foreground">You saved approx. 142kg of CO2 emissions this month compared to a gas vehicle.</p>
      </section>
    </main>
  );
}
