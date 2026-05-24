"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { smartVehicleOnboarding, type EVPulseVehicleOutput } from "@/ai/flows/smart-vehicle-onboarding-flow";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Car, Loader2, Sparkles, CheckCircle2, AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function OnboardingPage() {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<EVPulseVehicleOutput | null>(null);
  const router = useRouter();

  const handleOnboard = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;

    setIsLoading(true);
    setResult(null);
    try {
      const data = await smartVehicleOnboarding(query);
      setResult(data);
    } catch (error) {
      setResult({ error: "Не удалось подключиться к ИИ-сервису. Попробуйте еще раз." });
    } finally {
      setIsLoading(false);
    }
  };

  const isSuccess = result && !('error' in result);

  return (
    <main className="min-h-screen p-6 max-w-lg mx-auto flex flex-col">
      <header className="mb-8 pt-4">
        <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground mb-6 hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-semibold">На главную</span>
        </Link>
        <h1 className="text-3xl font-bold font-headline mb-2">Настройка авто</h1>
        <p className="text-muted-foreground text-sm">Просто напишите марку и модель вашего авто, и мы загрузим все технические данные.</p>
      </header>

      <section className="space-y-6 flex-1">
        <form onSubmit={handleOnboard} className="space-y-4">
          <div className="relative">
            <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
            <Input 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Напр.: Моя машина Tesla Model 3 2023" 
              className="pl-12 h-14 bg-secondary border-none rounded-2xl font-medium placeholder:text-muted-foreground focus-visible:ring-primary oversized-tap"
            />
          </div>
          <Button 
            disabled={isLoading || !query} 
            className="w-full h-14 rounded-2xl text-lg font-headline bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all disabled:opacity-50 oversized-tap"
          >
            {isLoading ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              "Определить автомобиль"
            )}
          </Button>
        </form>

        {result && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {isSuccess ? (
              <Card className="glass-card border-none">
                <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                  <div className="p-3 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                    <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-headline">{result.make} {result.model}</CardTitle>
                    <CardDescription>Модель {result.year} года определена</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                    <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Батарея</p>
                    <p className="text-lg font-bold font-headline">{result.batteryCapacityKWh}<span className="text-xs ml-1 font-normal opacity-60">кВтч</span></p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                    <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Разъем</p>
                    <p className="text-lg font-bold font-headline">{result.chargingPortType}</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5 col-span-2">
                    <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Расход энергии</p>
                    <p className="text-lg font-bold font-headline">{result.averageConsumptionWhPerKm}<span className="text-xs ml-1 font-normal opacity-60">Втч/км</span></p>
                  </div>
                  <Button 
                    onClick={() => router.push('/')}
                    className="col-span-2 mt-4 bg-emerald-500 hover:bg-emerald-600 rounded-2xl h-12 font-headline"
                  >
                    Все верно, продолжить
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card className="glass-card border-none bg-destructive/10">
                <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                  <div className="p-3 rounded-full bg-destructive/20">
                    <AlertCircle className="w-6 h-6 text-destructive" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-headline">Ошибка поиска</CardTitle>
                    <CardDescription className="text-destructive/80">{(result as any).error}</CardDescription>
                  </div>
                </CardHeader>
              </Card>
            )}
          </div>
        )}
      </section>

      <footer className="mt-auto pt-8 text-center text-xs text-muted-foreground opacity-60">
        EVPulse AI Engine v2.4 • Беларусь
      </footer>
    </main>
  );
}
