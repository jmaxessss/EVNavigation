import { ArrowLeft, Car, Shield, Bell, Smartphone, HelpCircle, ChevronRight, LogOut, Trash2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

export default function SettingsPage() {
  const settingsGroups = [
    {
      title: "Vehicle",
      items: [
        { icon: Car, label: "Vehicle Profile", value: "2023 Tesla Model 3", href: "/onboarding" },
        { icon: Shield, label: "Battery Health", value: "98% Capacity" },
      ]
    },
    {
      title: "App Preferences",
      items: [
        { icon: Bell, label: "Push Notifications", toggle: true, defaultChecked: true },
        { icon: Smartphone, label: "Display Mode", value: "Always Dark" },
      ]
    },
    {
      title: "Support",
      items: [
        { icon: HelpCircle, label: "Help Center", href: "#" },
      ]
    }
  ];

  return (
    <main className="min-h-screen pb-24 px-6 pt-8 max-w-lg mx-auto">
      <header className="mb-8">
        <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground mb-6 hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-semibold">Dashboard</span>
        </Link>
        <h1 className="text-3xl font-bold font-headline">Settings</h1>
      </header>

      <div className="space-y-8">
        {settingsGroups.map((group, idx) => (
          <section key={idx}>
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4 ml-2">{group.title}</h3>
            <Card className="glass-card border-none overflow-hidden">
              <CardContent className="p-0">
                {group.items.map((item, i) => (
                  <div 
                    key={i} 
                    className={`flex items-center justify-between p-5 ${i !== group.items.length - 1 ? 'border-b border-white/5' : ''} hover:bg-white/5 transition-colors cursor-pointer group oversized-tap`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-xl bg-white/5 group-hover:bg-primary/20 transition-colors">
                        <item.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{item.label}</p>
                        {item.value && <p className="text-xs text-muted-foreground">{item.value}</p>}
                      </div>
                    </div>
                    {item.toggle ? (
                      <Switch defaultChecked={item.defaultChecked} />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </section>
        ))}

        <section className="space-y-4 pt-4">
          <Button variant="outline" className="w-full h-14 rounded-2xl border-white/10 bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground oversized-tap">
            <LogOut className="w-5 h-5 mr-2" />
            Sign Out
          </Button>
          <Button variant="ghost" className="w-full h-14 rounded-2xl text-destructive hover:bg-destructive/10 oversized-tap">
            <Trash2 className="w-5 h-5 mr-2" />
            Clear Trip History
          </Button>
        </section>
      </div>

      <footer className="mt-12 text-center text-[10px] text-muted-foreground opacity-40">
        EVPULSE MOBILE APP • v1.0.24-STABLE
      </footer>
    </main>
  );
}
