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
} from "lucide-react";

function App() {
  const [name, setName] = useState("Hero");
  const [level, setLevel] = useState(1);
  const [health, setHealth] = useState(85);

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white p-4 md:p-8 selection:bg-primary selection:text-white retro">
      {/* Navigation Header */}
      <header className="max-w-6xl mx-auto flex items-center justify-between mb-12 border-b-4 border-foreground/10 pb-4">
        <div className="flex items-center gap-4">
          <Gamepad2 className="size-8 text-primary animate-pulse" />
          <h1 className="text-xl md:text-2xl font-bold tracking-tighter">
            8-BIT ADVENTURE
          </h1>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm uppercase">
          <a href="#" className="hover:text-primary transition-colors">
            Quests
          </a>
          <a href="#" className="hover:text-primary transition-colors">
            Inventory
          </a>
          <a href="#" className="hover:text-primary transition-colors">
            Shop
          </a>
          <Badge variant="default" className="animate-bounce">
            NEW DLC
          </Badge>
        </nav>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <User className="size-6" />
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="size-6" />
          </Button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Profile Section */}
        <aside className="lg:col-span-4 space-y-6">
          <Card className="bg-[#1a1a1e] border-none">
            <CardHeader className="text-center">
              <div className="mx-auto w-32 h-32 bg-primary/20 p-2 mb-4 relative">
                <img
                  src={`https://api.dicebear.com/9.x/pixel-art/svg?seed=${name}`}
                  alt="Avatar"
                  className="w-full h-full pixelated"
                />
                <div className="absolute -bottom-2 -right-2 bg-primary px-2 py-1 text-[10px] font-bold">
                  LVL {level}
                </div>
              </div>
              <CardTitle className="text-lg uppercase">{name}</CardTitle>
              <CardDescription className="text-xs">
                Paladin of the Digital Realm
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] uppercase">
                  <span>Health</span>
                  <span>{health}/100</span>
                </div>
                <div className="h-4 bg-muted border-2 border-foreground/20">
                  <div
                    className="h-full bg-red-500 transition-all duration-500"
                    style={{ width: `${health}%` }}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] uppercase">
                  <span>Experience</span>
                  <span>65%</span>
                </div>
                <div className="h-4 bg-muted border-2 border-foreground/20">
                  <div className="h-full bg-primary w-[65%]" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button
                onClick={() => setHealth(Math.min(100, health + 10))}
                className="flex-1 text-[10px] py-1"
                variant="secondary">
                <Heart className="size-3 mr-1" /> HEAL
              </Button>
              <Button
                onClick={() => setLevel(level + 1)}
                className="flex-1 text-[10px] py-1">
                <Zap className="size-3 mr-1" /> LEVEL UP
              </Button>
            </CardFooter>
          </Card>

          <Card className="bg-[#1a1a1e] border-none">
            <CardHeader>
              <CardTitle className="text-xs flex items-center gap-2 uppercase">
                <Trophy className="size-4 text-yellow-500" /> Recent
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className={`aspect-square bg-muted/20 border-2 border-dashed border-muted flex items-center justify-center ${i < 4 ? "opacity-100" : "opacity-20"}`}>
                  <Trophy className="size-4" />
                </div>
              ))}
            </CardContent>
          </Card>
        </aside>

        {/* Content Section */}
        <section className="lg:col-span-8 space-y-8">
          <div className="flex flex-col md:flex-row gap-4 items-end bg-[#1a1a1e] p-6 rounded-none">
            <div className="space-y-2 flex-1">
              <label className="text-[10px] uppercase font-bold text-primary/80">
                Change Character Name
              </label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter new name..."
                className="bg-background border-4 h-12 text-sm"
              />
            </div>
            <Button className="h-12 px-8 uppercase text-xs">
              Update Profile
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-[#1a1a1e] border-none hover:bg-muted/10 transition-colors pointer-cursor">
              <CardHeader>
                <div className="size-8 bg-blue-500/20 text-blue-500 flex items-center justify-center mb-2">
                  <Sword className="size-5" />
                </div>
                <CardTitle className="text-sm uppercase">Quick Match</CardTitle>
                <CardDescription className="text-[10px]">
                  Find an arena opponent instantly.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-[#1a1a1e] border-none hover:bg-muted/10 transition-colors pointer-cursor">
              <CardHeader>
                <div className="size-8 bg-green-500/20 text-green-500 flex items-center justify-center mb-2">
                  <Shield className="size-5" />
                </div>
                <CardTitle className="text-sm uppercase">
                  Train Defense
                </CardTitle>
                <CardDescription className="text-[10px]">
                  Improve your block rate by 5%.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          <div className="bg-primary/10 border-4 border-primary p-8 text-center space-y-4">
            <h2 className="text-2xl font-bold uppercase tracking-widest text-primary">
              Limited Event!
            </h2>
            <p className="text-sm opacity-80 uppercase tracking-tighter">
              The Dragon Cave is open for 48 hours.
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" className="px-12 py-6 text-sm">
                ENTER CAVE
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="max-w-6xl mx-auto mt-24 text-center text-muted-foreground text-[8px] uppercase tracking-[0.2em] border-t-4 border-foreground/10 pt-8 pb-12">
        <p>&copy; 2026 8-BIT UI PROJECT // MADE WITH PIXELS AND PASSION</p>
      </footer>
    </div>
  );
}

export default App;
