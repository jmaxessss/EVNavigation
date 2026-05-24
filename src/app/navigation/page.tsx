"use client";

import { useState } from "react";
import { 
  Navigation, 
  Search, 
  Battery, 
  Map as MapIcon, 
  Menu, 
  Mic, 
  ChevronUp, 
  Zap, 
  Coffee,
  Clock,
  ArrowLeft,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { contextualChargingRecommendations } from "@/ai/flows/contextual-charging-recommendations-flow";
import Link from "next/link";

export default function NavigationPage() {
  const [destination, setDestination] = useState("");
  const [isPlanning, setIsPlanning] = useState(false);
  const [recommendations, setRecommendations] = useState<any>(null);

  const handlePlanRoute = async () => {
    if (!destination) return;
    setIsPlanning(true);
    try {
      const result = await contextualChargingRecommendations({
        routeDescription: `Поездка в ${destination}`,
        currentBatteryPercentage: 82,
        chargingPreferences: "Я предпочитаю быстрые зарядки Malanka рядом с кафе и хочу приехать с остатком не менее 20%."
      });
      setRecommendations(result);
    } catch (error) {
      console.error(error);
    } finally {
      setIsPlanning(false);
    }
  };

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-[#0F0F14]">
      {/* Background Map Placeholder */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-background to-background">
          {/* Simulated grid for map feel */}
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
          
          {/* Simulated Route Path */}
          {recommendations && (
            <div className="absolute top-1/2 left-1/4 right-1/4 h-1 bg-primary/40 rounded-full blur-[1px] animate-pulse">
               <div className="absolute -top-1 left-0 w-3 h-3 bg-primary rounded-full shadow-[0_0_15px_rgba(94,94,237,1)]"></div>
               <div className="absolute -top-2 left-1/2 w-5 h-5 bg-accent rounded-full border-4 border-background flex items-center justify-center">
                 <Zap className="w-3 h-3 text-white" />
               </div>
               <div className="absolute -top-1 right-0 w-3 h-3 bg-emerald-500 rounded-full"></div>
            </div>
          )}
        </div>
      </div>

      {/* Top Search Bar Overlay */}
      <header className="absolute top-0 left-0 right-0 p-6 z-10">
        <div className="max-w-xl mx-auto flex gap-3">
          <Link href="/">
             <Button variant="ghost" size="icon" className="glass-card rounded-2xl oversized-tap">
               <ArrowLeft className="w-6 h-6" />
             </Button>
          </Link>
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input 
              placeholder="Куда едем?" 
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="pl-12 h-14 bg-card/80 backdrop-blur-xl border-white/5 rounded-2xl text-lg font-headline shadow-2xl focus-visible:ring-primary oversized-tap" 
            />
            <Button 
              onClick={handlePlanRoute}
              className="absolute right-2 top-2 h-10 px-6 rounded-xl bg-primary oversized-tap"
              disabled={isPlanning}
            >
              {isPlanning ? <Loader2 className="w-5 h-5 animate-spin" /> : "ОК"}
            </Button>
          </div>
          <Button variant="ghost" size="icon" className="glass-card rounded-2xl oversized-tap">
            <Mic className="w-6 h-6 text-accent" />
          </Button>
        </div>
      </header>

      {/* Side HUD Elements */}
      <div className="absolute left-6 bottom-32 flex flex-col gap-4 z-10 hidden sm:flex">
        <Button size="icon" className="glass-card h-14 w-14 rounded-2xl oversized-tap">
          <MapIcon className="w-6 h-6" />
        </Button>
        <Button size="icon" className="glass-card h-14 w-14 rounded-2xl oversized-tap">
          <Menu className="w-6 h-6" />
        </Button>
      </div>

      {/* Bottom Route Panel Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
        <Card className="max-w-xl mx-auto glass-card border-none rounded-[2.5rem] shadow-2xl">
          <CardContent className="p-6">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-1.5 bg-white/10 rounded-full"></div>
            </div>

            {!recommendations ? (
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-2xl bg-primary/10 border border-primary/20">
                    <Battery className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-headline">82% <span className="text-sm font-normal text-muted-foreground ml-1">Заряда</span></h3>
                    <p className="text-sm text-accent font-semibold">342 км доступно</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold">ГОТОВ</p>
                  <p className="text-xs text-muted-foreground">Система в норме</p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold font-headline">Malanka Supercharge</h2>
                    <p className="text-sm text-muted-foreground">Оптимальная точка • +{recommendations.maxDetourTimeMinutes || 8} мин в пути</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold font-headline text-accent">12 мин</p>
                    <p className="text-xs text-muted-foreground">Прибытие через</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-white/5 border border-white/5">
                    <Zap className="w-5 h-5 text-primary" />
                    <span className="text-xs font-bold">{recommendations.preferredChargerTypes?.[0] || 'CCS / 150kW'}</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-white/5 border border-white/5">
                    <Coffee className="w-5 h-5 text-accent" />
                    <span className="text-xs font-bold">Кафе</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-white/5 border border-white/5">
                    <Clock className="w-5 h-5 text-emerald-500" />
                    <span className="text-xs font-bold">20м стоп</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-muted-foreground px-1">
                    <span>Прогноз батареи</span>
                    <span>Прибытие: {recommendations.minBatteryArrivalPercentage || '20'}%</span>
                  </div>
                  <Progress value={20} className="h-2 bg-secondary" />
                </div>

                <Button className="w-full h-14 bg-primary rounded-2xl text-lg font-headline oversized-tap">
                  Построить маршрут
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
