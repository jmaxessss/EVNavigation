
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
  Loader2,
  CheckCircle2,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { contextualChargingRecommendations } from "@/ai/flows/contextual-charging-recommendations-flow";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function NavigationPage() {
  const [destination, setDestination] = useState("");
  const [isPlanning, setIsPlanning] = useState(false);
  const [recommendations, setRecommendations] = useState<any>(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const mapPlaceholder = PlaceHolderImages.find(img => img.id === 'map-bg');

  const handlePlanRoute = async () => {
    if (!destination) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Пожалуйста, введите пункт назначения.",
      });
      return;
    }
    
    setIsPlanning(true);
    setRecommendations(null);
    
    try {
      const result = await contextualChargingRecommendations({
        routeDescription: `Поездка в ${destination}`,
        currentBatteryPercentage: 82,
        chargingPreferences: "Я предпочитаю быстрые зарядки Malanka рядом с кафе и хочу приехать с остатком не менее 20%."
      });
      setRecommendations(result);
      toast({
        title: "ИИ проанализировал маршрут",
        description: "Найдена оптимальная точка зарядки с учетом ваших предпочтений.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Ошибка ИИ",
        description: "Не удалось построить оптимальный маршрут. Попробуйте позже.",
      });
    } finally {
      setIsPlanning(false);
    }
  };

  const handleStartNavigation = () => {
    setIsNavigating(true);
    setTimeout(() => {
      toast({
        title: "Маршрут построен",
        description: `Следуйте указаниям навигатора до ${destination}.`,
      });
      router.push('/');
    }, 1500);
  };

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-[#0A0A0F]">
      {/* Map Background Layer */}
      <div className="absolute inset-0 z-0">
        {mapPlaceholder && (
          <Image 
            src={mapPlaceholder.imageUrl}
            alt={mapPlaceholder.description}
            fill
            className="object-cover opacity-40 contrast-125 brightness-75"
            data-ai-hint={mapPlaceholder.imageHint}
            priority
          />
        )}
        
        {/* Map Overlays: Grid and Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0F]/60 via-transparent to-[#0A0A0F]"></div>
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        
        {/* Interactive Route Elements */}
        {recommendations && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <svg width="100%" height="100%" className="absolute inset-0">
              <path 
                d="M 150 400 Q 300 250 500 350 T 800 200" 
                fill="none" 
                stroke="hsl(var(--primary))" 
                strokeWidth="4" 
                strokeDasharray="12 8"
                className="animate-[dash_20s_linear_infinite]"
              />
              <circle cx="150" cy="400" r="6" fill="white" className="animate-pulse" />
              <circle cx="800" cy="200" r="8" fill="hsl(var(--accent))" />
            </svg>
            
            {/* Pulsing Location Indicator */}
            <div className="absolute top-[350px] left-[500px]">
              <div className="relative">
                <div className="absolute -inset-4 bg-primary/30 rounded-full animate-ping"></div>
                <div className="p-2 bg-primary rounded-full shadow-[0_0_20px_rgba(94,94,237,0.6)] border-2 border-white/20">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-card/90 backdrop-blur px-3 py-1 rounded-lg border border-white/10 whitespace-nowrap shadow-xl">
                  <p className="text-[10px] font-bold text-white uppercase tracking-tighter">Malanka Supercharge</p>
                </div>
              </div>
            </div>
          </div>
        )}
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
              placeholder="Введите пункт назначения..." 
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="pl-12 h-14 bg-card/80 backdrop-blur-xl border-white/5 rounded-2xl text-lg font-headline shadow-2xl focus-visible:ring-primary oversized-tap" 
            />
            <Button 
              onClick={handlePlanRoute}
              className="absolute right-2 top-2 h-10 px-6 rounded-xl bg-primary oversized-tap"
              disabled={isPlanning || isNavigating}
            >
              {isPlanning ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
            </Button>
          </div>
          <Button variant="ghost" size="icon" className="glass-card rounded-2xl oversized-tap">
            <Mic className="w-6 h-6 text-accent" />
          </Button>
        </div>
      </header>

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
                  <p className="text-sm font-bold">EVPulse AI</p>
                  <p className="text-xs text-muted-foreground">Беларусь • Готов</p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Sparkles className="w-4 h-4 text-primary" />
                      <span className="text-[10px] font-bold text-primary uppercase tracking-widest">ИИ-Рекомендация</span>
                    </div>
                    <h2 className="text-2xl font-bold font-headline">Malanka Supercharge</h2>
                    <p className="text-sm text-muted-foreground">Оптимальная точка • +{recommendations.maxDetourTimeMinutes || 8} мин в пути</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold font-headline text-accent">12 мин</p>
                    <p className="text-xs text-muted-foreground">До зарядки</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-white/5 border border-white/5">
                    <Zap className="w-5 h-5 text-primary" />
                    <span className="text-xs font-bold">{recommendations.preferredChargerTypes?.[0] || 'CCS / 150кВт'}</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-white/5 border border-white/5">
                    <Coffee className="w-5 h-5 text-accent" />
                    <span className="text-xs font-bold">Кафе рядом</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-white/5 border border-white/5">
                    <Clock className="w-5 h-5 text-emerald-500" />
                    <span className="text-xs font-bold">~20м стоп</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-muted-foreground px-1">
                    <span>Прогноз батареи</span>
                    <span>Прибытие: {recommendations.minBatteryArrivalPercentage || '20'}%</span>
                  </div>
                  <Progress value={recommendations.minBatteryArrivalPercentage || 20} className="h-2 bg-secondary" />
                </div>

                <Button 
                  onClick={handleStartNavigation}
                  disabled={isNavigating}
                  className="w-full h-14 bg-primary rounded-2xl text-lg font-headline oversized-tap flex items-center justify-center gap-2"
                >
                  {isNavigating ? <Loader2 className="w-6 h-6 animate-spin" /> : "Начать навигацию"}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <style jsx global>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -1000;
          }
        }
      `}</style>
    </main>
  );
}
