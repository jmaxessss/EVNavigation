import Link from "next/link";
import { 
  Battery, 
  Zap, 
  History, 
  Settings, 
  Navigation,
  ChevronRight,
  Car,
  TrendingUp,
  Sparkles,
  MapPin
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  return (
    <main className="flex flex-col min-h-screen pb-24 max-w-lg mx-auto bg-white md:shadow-xl">
      {/* Header */}
      <header className="px-6 pt-10 pb-6 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold font-headline text-slate-950">EVPulse</h1>
          <p className="text-slate-500 text-sm font-medium">Добрый день, Александр</p>
        </div>
        <div className="bg-slate-100 p-3 rounded-full">
          <Car className="w-6 h-6 text-slate-600" />
        </div>
      </header>

      {/* Main Status */}
      <section className="px-6 mb-8">
        <Card className="minimal-card overflow-hidden">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">Запас хода</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-bold font-headline">342</span>
                  <span className="text-lg text-accent font-bold">км</span>
                </div>
              </div>
              <div className="text-right">
                <Battery className="w-10 h-10 text-emerald-500 mb-1 ml-auto" />
                <span className="text-2xl font-bold">82%</span>
              </div>
            </div>
            
            <Progress value={82} className="h-2 bg-slate-100 mb-2" />
            <div className="flex justify-between text-[10px] text-slate-400 font-bold uppercase">
              <span>0%</span>
              <span className="text-emerald-500">Заряд в норме</span>
              <span>100%</span>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Quick Actions */}
      <section className="px-6 grid grid-cols-2 gap-4 mb-8">
        <Link href="/navigation" className="col-span-2">
          <Button className="w-full h-16 text-lg font-headline flex items-center justify-center gap-3 rounded-2xl bg-accent hover:bg-accent/90 shadow-blue-200 shadow-lg text-white">
            <MapPin className="w-6 h-6" />
            <span>Найти зарядку</span>
          </Button>
        </Link>
        
        <Link href="/onboarding">
          <Card className="minimal-card h-32 hover:border-accent/30 cursor-pointer">
            <CardContent className="p-4 flex flex-col justify-between h-full">
              <div className="p-2 bg-slate-100 rounded-xl w-fit">
                <Sparkles className="w-5 h-5 text-slate-600" />
              </div>
              <div>
                <p className="font-bold text-sm">ИИ-Профиль</p>
                <p className="text-[10px] text-slate-400 font-medium">Настройка авто</p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/history">
          <Card className="minimal-card h-32 hover:border-accent/30 cursor-pointer">
            <CardContent className="p-4 flex flex-col justify-between h-full">
              <div className="p-2 bg-slate-100 rounded-xl w-fit">
                <History className="w-5 h-5 text-slate-600" />
              </div>
              <div>
                <p className="font-bold text-sm">Статистика</p>
                <p className="text-[10px] text-slate-400 font-medium">Мои поездки</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      </section>

      {/* Analytics Brief */}
      <section className="px-6 mb-8">
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4">Эффективность</h3>
        <Card className="minimal-card">
          <CardContent className="p-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-emerald-50 rounded-xl">
                <TrendingUp className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">Средний расход</p>
                <p className="text-sm font-bold">14.2 кВтч/100км</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-300" />
          </CardContent>
        </Card>
      </section>

      {/* Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 h-20 bg-white/80 backdrop-blur-lg border-t border-slate-100 flex items-center justify-around px-8 z-50 max-w-lg mx-auto">
        <Link href="/" className="flex flex-col items-center gap-1 text-accent">
          <Zap className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-tighter">Главная</span>
        </Link>
        <Link href="/navigation" className="flex flex-col items-center gap-1 text-slate-400 hover:text-slate-600 transition-colors">
          <Navigation className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-tighter">Карта</span>
        </Link>
        <Link href="/history" className="flex flex-col items-center gap-1 text-slate-400 hover:text-slate-600 transition-colors">
          <History className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-tighter">Архив</span>
        </Link>
        <Link href="/settings" className="flex flex-col items-center gap-1 text-slate-400 hover:text-slate-600 transition-colors">
          <Settings className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-tighter">Инфо</span>
        </Link>
      </nav>
    </main>
  );
}