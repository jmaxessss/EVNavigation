"use client";

import { useState } from "react";
import { 
  ArrowLeft, 
  Search, 
  Battery, 
  Zap, 
  Coffee,
  Clock,
  Loader2,
  Sparkles,
  Mic
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { contextualChargingRecommendations } from "@/ai/flows/contextual-charging-recommendations-flow";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function NavigationPage() {
  const [destination, setDestination] = useState("");
  const [isPlanning, setIsPlanning] = useState(false);
  const [recommendations, setRecommendations] = useState<any>(null);
  const { toast } = useToast();

  const mapPlaceholder = PlaceHolderImages.find(img => img.id === 'map-bg');

  const handlePlanRoute = async () => {
    if (!destination) {
      toast({
        variant: "destructive",
        title: "Пункт назначения",
        description: "Пожалуйста, введите адрес.",
      });
      return;
    }
    
    setIsPlanning(true);
    try {
      const result = await contextualChargingRecommendations({
        routeDescription: `Поездка в ${destination}`,
        currentBatteryPercentage: 82,
        chargingPreferences: "Нужна быстрая зарядка Malanka с хорошим кофе."
      });
      setRecommendations(result);
      toast({
        title: "Маршрут оптимизирован",
        description: "ИИ подобрал лучшую станцию Malanka.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Ошибка планирования",
        description: "Не удалось связаться с сервером ИИ.",
      });
    } finally {
      setIsPlanning(false);
    }
  };

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-slate-50 max-w-lg mx-auto">
      {/* Visual Map Layer */}
      <div className="absolute inset-0 z-0">
        {mapPlaceholder && (
          <Image 
            src={mapPlaceholder.imageUrl}
            alt="Карта"
            fill
            className="object-cover opacity-30 grayscale-[0.5]"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white/60"></div>
      </div>

      {/* Header Search */}
      <header className="absolute top-0 left-0 right-0 p-6 z-10">
        <div className="flex gap-3">
          <Link href="/">
             <Button variant="outline" size="icon" className="rounded-2xl bg-white border-slate-100 shadow-sm oversized-tap">
               <ArrowLeft className="w-6 h-6 text-slate-600" />
             </Button>
          </Link>
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input 
              placeholder="Куда едем?" 
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="pl-12 h-14 bg-white border-slate-100 rounded-2xl text-lg font-medium shadow-sm focus-visible:ring-accent" 
            />
            <Button 
              onClick={handlePlanRoute}
              className="absolute right-2 top-2 h-10 px-4 rounded-xl bg-accent text-white"
              disabled={isPlanning}
            >
              {isPlanning ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Bottom Route Panel */}
      <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
        <Card className="minimal-card border-none shadow-2xl rounded-[2rem]">
          <CardContent className="p-6">
            <div className="flex justify-center mb-6">
              <div className="w-10 h-1 bg-slate-100 rounded-full"></div>
            </div>

            {!recommendations ? (
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-2xl bg-emerald-50">
                    <Battery className="w-8 h-8 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold font-headline">82%</h3>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">342 км до разряда</p>
                  </div>
                </div>
                <div className="text-right">
                  <Zap className="w-6 h-6 text-accent ml-auto mb-1" />
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Система готова</p>
                </div>
              </div>
            ) : (
              <div className="space-y-6 animate-in slide-in-from-bottom-8 duration-500">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-1.5 mb-1">
                      <Sparkles className="w-3.5 h-3.5 text-accent" />
                      <span className="text-[10px] font-bold text-accent uppercase tracking-widest">ИИ-выбор</span>
                    </div>
                    <h2 className="text-2xl font-bold font-headline text-slate-900">Malanka Supercharge</h2>
                    <p className="text-sm text-slate-500">Пр-т Победителей, 65</p>
                  </div>
                  <div className="bg-emerald-50 px-3 py-1 rounded-full">
                    <span className="text-sm font-bold text-emerald-600">+{recommendations.maxDetourTimeMinutes || 8}м</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                    <Zap className="w-5 h-5 text-accent" />
                    <span className="text-[10px] font-bold text-slate-600 uppercase">CCS Fast</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                    <Coffee className="w-5 h-5 text-slate-400" />
                    <span className="text-[10px] font-bold text-slate-600 uppercase">Кофе</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                    <Clock className="w-5 h-5 text-slate-400" />
                    <span className="text-[10px] font-bold text-slate-600 uppercase">~20 мин</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    <span>Остаток батареи</span>
                    <span className="text-slate-900">{recommendations.minBatteryArrivalPercentage || '20'}%</span>
                  </div>
                  <Progress value={recommendations.minBatteryArrivalPercentage || 20} className="h-1.5 bg-slate-100" />
                </div>

                <Button className="w-full h-14 bg-slate-950 text-white rounded-2xl text-lg font-headline oversized-tap">
                  Начать маршрут
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}