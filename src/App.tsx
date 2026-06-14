import { Button } from "@/components/ui/8bit/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/8bit/card";
import { Input } from "@/components/ui/8bit/input";
import { Badge } from "@/components/ui/8bit/badge";
import { useState } from "react";
import {
  Trophy,
  Sword,
  Shield,
  Heart,
  Zap,
  Gamepad2,
  Settings,
  User,
  Loader2
} from "lucide-react";

export default function App() {
  const [nameInput, setNameInput] = useState("Hero");
  const [name, setName] = useState("Hero");
  const [level, setLevel] = useState(1);
  const [health, setHealth] = useState(85);
  const [experience, setExperience] = useState(65);
  const [defense, setDefense] = useState(10);
  
  const [isMatching, setIsMatching] = useState(false);
  const [toasts, setToasts] = useState<{id: number, msg: string, type: string}[]>([]);

  // Toast Notification Helper
  const showToast = (msg: string, type: 'info' | 'success' | 'warning' | 'error' = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, msg, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  // Level Up Helper
  const addExperience = (amount: number) => {
    setExperience(prev => {
      const newExp = prev + amount;
      if (newExp >= 100) {
        setLevel(l => l + 1);
        setHealth(100);
        setTimeout(() => showToast("LEVEL UP! Health fully restored.", "success"), 0);
        return newExp - 100;
      }
      return newExp;
    });
  };

  // Button Handlers
  const handleUpdateProfile = () => {
    if (!nameInput.trim()) {
      showToast("Name cannot be empty!", "error");
      return;
    }
    setName(nameInput);
    showToast(`Profile name updated to ${nameInput}`, "success");
  };

  const handleQuickMatch = () => {
    if (isMatching) return;
    if (health <= 0) {
      showToast("You are too weak to fight! Heal first.", "error");
      return;
    }
    
    setIsMatching(true);
    showToast("Searching for opponent...", "info");
    
    setTimeout(() => {
      setIsMatching(false);
      const won = Math.random() > 0.4; // 60% win rate
      if (won) {
        showToast("Match Won! +25 XP", "success");
        addExperience(25);
        setHealth(prev => Math.max(0, prev - 10));
      } else {
        showToast("Match Lost! You took heavy damage.", "error");
        setHealth(prev => Math.max(0, prev - 35));
      }
    }, 2000);
  };

  const handleTrainDefense = () => {
    if (health <= 10) {
      showToast("Too exhausted to train.", "error");
      return;
    }
    setDefense(prev => prev + 5);
    setHealth(prev => Math.max(0, prev - 10));
    showToast(`Defense increased to ${defense + 5}! (-10 HP)`, "success");
  };

  const handleEnterCave = () => {
    if (level < 5) {
      showToast("You must be Level 5 to enter the Dragon Cave!", "warning");
      return;
    }
    if (health < 50) {
      showToast("You need at least 50 HP to survive the cave!", "error");
      return;
    }
    showToast("You survived the Dragon Cave! +80 XP", "success");
    setHealth(prev => Math.max(0, prev - 45));
    addExperience(80);
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8 font-body crt selection:bg-primary selection:text-white">
      {/* Toast Container */}
      <div className="fixed top-4 right-4 z-50 space-y-2 pointer-events-none">
        {toasts.map(toast => (
          <div key={toast.id} className={`p-4 border-4 bg-background pixel-shadow-primary animate-in slide-in-from-right-8 fade-in duration-300 font-heading text-sm ${
            toast.type === 'error' ? 'text-destructive border-destructive pixel-shadow-accent' :
            toast.type === 'success' ? 'text-accent border-accent pixel-shadow-accent' :
            toast.type === 'warning' ? 'text-yellow-500 border-yellow-500 pixel-shadow-primary' :
            'text-primary border-primary pixel-shadow-primary'
          }`}>
            {toast.msg}
          </div>
        ))}
      </div>

      {/* Navigation Header */}
      <header className="max-w-6xl mx-auto flex items-center justify-between mb-12 border-b-4 border-foreground/20 pb-4">
        <div className="flex items-center gap-4 hover:animate-glitch">
          <Gamepad2 className="size-8 text-primary animate-pulse" />
          <h1 className="text-xl md:text-3xl font-heading text-primary pixel-shadow-primary tracking-tighter">
            8-BIT ADVENTURE
          </h1>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-xl uppercase tracking-wider font-body">
          <a href="#" onClick={(e) => { e.preventDefault(); showToast("Quests feature coming soon!"); }} className="hover:text-primary transition-colors hover:pixel-shadow-primary">
            Quests
          </a>
          <a href="#" onClick={(e) => { e.preventDefault(); showToast("Inventory is empty."); }} className="hover:text-secondary transition-colors hover:pixel-shadow-secondary">
            Inventory
          </a>
          <a href="#" onClick={(e) => { e.preventDefault(); showToast("Not enough gold for the shop!"); }} className="hover:text-accent transition-colors hover:pixel-shadow-accent">
            Shop
          </a>
          <Badge variant="default" className="animate-bounce bg-primary text-primary-foreground text-lg border-2 border-primary-foreground pixel-shadow-primary">
            NEW DLC
          </Badge>
        </nav>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => showToast("Profile Menu Opened")} className="arcade-btn hover:text-secondary">
            <User className="size-6" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => showToast("Settings Menu Opened")} className="arcade-btn hover:text-accent">
            <Settings className="size-6" />
          </Button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Profile Section */}
        <aside className="lg:col-span-4 space-y-6">
          <Card className="bg-card border-4 border-foreground pixel-shadow-secondary">
            <CardHeader className="text-center">
              <div className="mx-auto w-32 h-32 bg-secondary/20 p-2 mb-4 relative border-4 border-secondary">
                <img
                  src={`https://api.dicebear.com/9.x/pixel-art/svg?seed=${encodeURIComponent(name)}`}
                  alt="Avatar"
                  className="w-full h-full pixelated"
                />
                <div className="absolute -bottom-4 -right-4 bg-secondary text-secondary-foreground px-3 py-1 text-lg font-heading border-2 border-foreground pixel-shadow-secondary">
                  LVL {level}
                </div>
              </div>
              <CardTitle className="text-xl font-heading text-secondary mt-4">{name}</CardTitle>
              <CardDescription className="text-lg font-body mt-2">
                Paladin of the Digital Realm
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-xl font-body uppercase">
                  <span className="text-primary">Health</span>
                  <span>{health}/100</span>
                </div>
                <div className="h-6 bg-background border-4 border-foreground relative">
                  <div
                    className="h-full bg-primary pixel-bar-fill transition-all duration-300"
                    style={{ width: `${health}%` }}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xl font-body uppercase">
                  <span className="text-accent">Experience</span>
                  <span>{experience}%</span>
                </div>
                <div className="h-6 bg-background border-4 border-foreground relative">
                  <div 
                    className="h-full bg-accent pixel-bar-fill transition-all duration-300" 
                    style={{ width: `${experience}%` }} 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xl font-body uppercase">
                  <span className="text-secondary">Defense</span>
                  <span>{defense}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex gap-4">
              <Button
                onClick={() => {
                  if (health >= 100) {
                    showToast("Health is already full!", "info");
                  } else {
                    setHealth(Math.min(100, health + 25));
                    showToast("Healed for 25 HP!", "success");
                  }
                }}
                className="flex-1 text-sm font-heading py-4 bg-primary text-primary-foreground border-4 border-foreground arcade-btn hover:bg-primary/90 pixel-shadow-primary"
              >
                <Heart className="size-4 mr-2" /> HEAL
              </Button>
              <Button
                onClick={() => {
                  addExperience(25);
                  showToast("Gained 25 XP via cheat code!", "warning");
                }}
                className="flex-1 text-sm font-heading py-4 bg-secondary text-secondary-foreground border-4 border-foreground arcade-btn hover:bg-secondary/90 pixel-shadow-secondary"
              >
                <Zap className="size-4 mr-2" /> XP HACK
              </Button>
            </CardFooter>
          </Card>

          <Card className="bg-card border-4 border-foreground pixel-shadow-accent">
            <CardHeader>
              <CardTitle className="text-lg font-heading text-accent flex items-center gap-2">
                <Trophy className="size-5" /> RECENT ACHIEVEMENTS
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  onClick={() => showToast(i < 4 ? `Achievement #${i} details...` : `Achievement Locked!`, i < 4 ? "info" : "warning")}
                  className={`aspect-square bg-background border-4 border-accent/50 flex items-center justify-center hover:bg-accent/20 transition-colors cursor-pointer arcade-btn ${i < 4 ? "opacity-100 pixel-shadow-accent" : "opacity-30"}`}
                >
                  <Trophy className={`size-6 ${i < 4 ? "text-accent" : "text-muted-foreground"}`} />
                </div>
              ))}
            </CardContent>
          </Card>
        </aside>

        {/* Content Section */}
        <section className="lg:col-span-8 space-y-8">
          <div className="flex flex-col md:flex-row gap-6 items-end bg-card p-8 border-4 border-foreground pixel-shadow-primary">
            <div className="space-y-4 flex-1 w-full">
              <label className="text-xl font-body uppercase tracking-wider text-primary">
                Change Character Name
              </label>
              <Input
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleUpdateProfile()}
                placeholder="Enter new name..."
                className="bg-background border-4 border-foreground h-16 text-2xl font-body focus-visible:ring-primary focus-visible:pixel-shadow-primary transition-shadow"
              />
            </div>
            <Button 
              onClick={handleUpdateProfile}
              className="h-16 px-8 text-sm font-heading bg-primary text-primary-foreground border-4 border-foreground arcade-btn hover:bg-primary/90 pixel-shadow-primary w-full md:w-auto">
              UPDATE
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card onClick={handleQuickMatch} className={`bg-card border-4 border-foreground hover:pixel-shadow-secondary transition-all cursor-pointer group arcade-btn ${isMatching ? 'opacity-50 pointer-events-none' : ''}`}>
              <CardHeader>
                <div className="size-12 bg-secondary/20 text-secondary flex items-center justify-center mb-4 border-4 border-secondary group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors">
                  {isMatching ? <Loader2 className="size-6 animate-spin" /> : <Sword className="size-6 group-hover:animate-bounce" />}
                </div>
                <CardTitle className="text-xl font-heading group-hover:animate-glitch text-secondary">
                  {isMatching ? 'SEARCHING...' : 'QUICK MATCH'}
                </CardTitle>
                <CardDescription className="text-xl font-body mt-2">
                  Find an arena opponent instantly.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card onClick={handleTrainDefense} className="bg-card border-4 border-foreground hover:pixel-shadow-accent transition-all cursor-pointer group arcade-btn">
              <CardHeader>
                <div className="size-12 bg-accent/20 text-accent flex items-center justify-center mb-4 border-4 border-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                  <Shield className="size-6 group-hover:animate-bounce" />
                </div>
                <CardTitle className="text-xl font-heading group-hover:animate-glitch text-accent">
                  TRAIN DEFENSE
                </CardTitle>
                <CardDescription className="text-xl font-body mt-2">
                  Improve defense by 5 (Costs 10 HP).
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          <div className="bg-background border-4 border-primary p-12 text-center space-y-6 relative overflow-hidden group hover:pixel-shadow-primary transition-shadow">
            <div className="absolute inset-0 bg-primary/5 pointer-events-none group-hover:bg-primary/10 transition-colors" />
            <h2 className="text-3xl md:text-4xl font-heading tracking-widest text-primary group-hover:animate-glitch relative z-10">
              LIMITED EVENT!
            </h2>
            <p className="text-2xl font-body uppercase text-foreground/90 relative z-10">
              The Dragon Cave is open for 48 hours. Requires Level 5.
            </p>
            <div className="flex justify-center gap-4 relative z-10 pt-4">
              <Button onClick={handleEnterCave} size="lg" className="px-12 py-8 text-xl font-heading bg-destructive text-destructive-foreground border-4 border-foreground arcade-btn hover:bg-destructive/90 pixel-shadow-primary">
                ENTER CAVE
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="max-w-6xl mx-auto mt-24 text-center text-muted-foreground text-xl font-body uppercase tracking-[0.2em] border-t-4 border-foreground/20 pt-8 pb-12">
        <p>&copy; 2026 8-BIT UI PROJECT // MADE WITH PIXELS AND PASSION</p>
      </footer>
    </div>
  );
}
