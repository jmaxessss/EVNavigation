import Link from "next/link";
import { 
  Battery, 
  MapPin, 
  Zap, 
  History, 
  Settings, 
  Navigation,
  ChevronRight,
  Car,
  TrendingUp,
  Clock
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  return (
    <main className="flex flex-col min-h-screen pb-24">
      {/* Header Section */}
      <header className="px-6 pt-8 pb-4 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-headline text-primary">EVPulse</h1>
          <p className="text-muted-foreground text-sm">Статус: Оптимизировано</p>
        </div>
        <div className="bg-primary/10 p-2 rounded-full border border-primary/20">
          <Car className="w-6 h-6 text-primary" />
        </div>
      </header>

      {/* Main Stats Card */}
      <section className="px-4 mb-6">
        <Card className="glass-card overflow-hidden border-none">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1">Запас хода</p>
                <h2 className="text-4xl font-bold font-headline">342<span className="text-xl text-accent ml-1">км</span></h2>
              </div>
              <div className="text-right">
                <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1">Заряд батареи</p>
                <div className="flex items-center justify-end gap-2">
                  <span className="text-2xl font-bold">82%</span>
                  <Battery className="w-6 h-6 text-emerald-500 fill-emerald-500/20" />
                </div>
              </div>
            </div>
            
            <Progress value={82} className="h-3 bg-secondary mb-2" />
            <div className="flex justify-between text-[10px] text-muted-foreground font-medium">
              <span>0%</span>
              <span>ПРИБЫТИЕ: 28%</span>
              <span>100%</span>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Action Grid */}
      <section className="px-4 grid grid-cols-2 gap-4 mb-8">
        <Link href="/navigation" className="col-span-2">
          <Button className="w-full h-20 text-lg font-headline flex justify-between px-6 rounded-2xl bg-primary hover:bg-primary/90 oversized-tap">
            <div className="flex items-center gap-3">
              <Navigation className="w-6 h-6" />
              <span>Начать навигацию</span>
            </div>
            <ChevronRight className="w-6 h-6 opacity-50" />
          </Button>
        </Link>
        
        <Link href="/onboarding">
          <Card className="glass-card border-none h-32 hover:bg-white/5 transition-colors cursor-pointer oversized-tap">
            <CardContent className="p-4 flex flex-col justify-between h-full">
              <Zap className="w-6 h-6 text-accent" />
              <p className="font-semibold text-sm">Профиль авто</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/navigation">
          <Card className="glass-card border-none h-32 hover:bg-white/5 transition-colors cursor-pointer oversized-tap">
            <CardContent className="p-4 flex flex-col justify-between h-full">
              <MapPin className="w-6 h-6 text-accent" />
              <p className="font-semibold text-sm">Зарядки (Malanka)</p>
            </CardContent>
          </Card>
        </Link>
      </section>

      {/* Trip Analytics */}
      <section className="px-4 mb-8">
        <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4 ml-2">Аналитика эффективности</h3>
        <Card className="glass-card border-none">
          <CardContent className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-white/5">
                  <TrendingUp className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Средний расход</p>
                  <p className="text-sm font-bold">14.2 кВтч/100км</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded-full">+12% к прошлой поездке</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-white/5">
                <Clock className="w-4 h-4 text-accent" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Время в пути</p>
                <p className="text-sm font-bold">4ч 22м сегодня</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Bottom Tab Bar */}
      <nav className="fixed bottom-0 left-0 right-0 h-20 glass-card border-t border-white/5 flex items-center justify-around px-4 z-50 rounded-t-3xl">
        <Link href="/" className="flex flex-col items-center gap-1 text-primary">
          <Zap className="w-6 h-6" />
          <span className="text-[10px] font-bold">Главная</span>
        </Link>
        <Link href="/navigation" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground">
          <Navigation className="w-6 h-6" />
          <span className="text-[10px] font-bold">Карта</span>
        </Link>
        <Link href="/history" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground">
          <History className="w-6 h-6" />
          <span className="text-[10px] font-bold">История</span>
        </Link>
        <Link href="/settings" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground">
          <Settings className="w-6 h-6" />
          <span className="text-[10px] font-bold">Настройки</span>
        </Link>
      </nav>
    </main>
  );
}
