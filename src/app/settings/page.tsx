
"use client";

import { ArrowLeft, Car, Shield, Bell, Smartphone, HelpCircle, ChevronRight, LogOut, Trash2, Cpu, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const { toast } = useToast();
  const router = useRouter();

  const handleLogout = () => {
    toast({ title: "Выход выполнен", description: "До скорой встречи!" });
    setTimeout(() => router.push('/'), 1000);
  };

  const settingsGroups = [
    {
      title: "Транспорт",
      items: [
        { icon: Car, label: "Мой автомобиль", value: "Tesla Model 3", href: "/onboarding" },
        { icon: Shield, label: "Состояние батареи", value: "SOH: 98%" },
      ]
    },
    {
      title: "Интеллект и Алгоритмы",
      items: [
        { icon: Cpu, label: "Ядро ИИ", value: "Gemini 2.5 Flash" },
        { icon: Sparkles, label: "Контекстный анализ", value: "Активен" },
      ]
    },
    {
      title: "Система",
      items: [
        { icon: Bell, label: "Уведомления", toggle: true, defaultChecked: true },
        { icon: Smartphone, label: "Интерфейс", value: "Светлая тема" },
      ]
    }
  ];

  return (
    <main className="min-h-screen pb-24 px-6 pt-12 max-w-lg mx-auto bg-slate-50">
      <header className="mb-10">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-400 mb-6 hover:text-slate-900 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-xs font-bold uppercase tracking-widest">Назад</span>
        </Link>
        <h1 className="text-4xl font-bold font-headline text-slate-950">Инфо</h1>
      </header>

      <div className="space-y-10">
        {settingsGroups.map((group, idx) => (
          <section key={idx}>
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4 ml-2">{group.title}</h3>
            <Card className="minimal-card border-none overflow-hidden shadow-none bg-white">
              <CardContent className="p-0">
                {group.items.map((item, i) => (
                  <div 
                    key={i} 
                    onClick={() => item.href && router.push(item.href)}
                    className={`flex items-center justify-between p-5 ${i !== group.items.length - 1 ? 'border-b border-slate-50' : ''} hover:bg-slate-50/50 cursor-pointer group`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-slate-50 rounded-lg">
                        <item.icon className="w-5 h-5 text-slate-600" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">{item.label}</p>
                        {item.value && <p className="text-[10px] font-bold text-slate-400 uppercase">{item.value}</p>}
                      </div>
                    </div>
                    {item.toggle ? (
                      <Switch defaultChecked={item.defaultChecked} className="data-[state=checked]:bg-accent" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-slate-300" />
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </section>
        ))}

        <div className="space-y-3 pt-6">
          <Button 
            onClick={handleLogout}
            variant="ghost" 
            className="w-full h-14 rounded-2xl text-slate-500 hover:text-slate-900 hover:bg-white shadow-none"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Выйти из аккаунта
          </Button>
          <Button 
            variant="ghost" 
            className="w-full h-14 rounded-2xl text-destructive hover:bg-red-50 shadow-none"
          >
            <HelpCircle className="w-5 h-5 mr-3" />
            Поддержка EVPulse
          </Button>
        </div>
      </div>
    </main>
  );
}
