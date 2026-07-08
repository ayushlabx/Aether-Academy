import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import StarBackground from './components/StarBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WorldMap from './components/WorldMap';
import QuestCards from './components/QuestCards';
import CommunityChat from './components/CommunityChat';
import EventCalendar from './components/EventCalendar';
import Leaderboard from './components/Leaderboard';
import Roadmap from './components/Roadmap';
import Internships from './components/Internships';
import Footer from './components/Footer';
import AstraChat from './components/AstraChat';
import PixelCharacters from './components/PixelCharacters';

const queryClient = new QueryClient();

function Home() {
  return (
    <div className="relative min-h-[100dvh] w-full bg-[#08081A] text-[#D8D8E8] overflow-hidden selection:bg-[#B64DFF]/30">
      <StarBackground />
      
      {/* Animated Aurora Background Blobs */}
      <div className="pointer-events-none absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#B64DFF]/10 blur-[120px] mix-blend-screen" />
      <div className="pointer-events-none absolute top-[20%] right-[-10%] w-[30%] h-[40%] rounded-full bg-[#4CC9FF]/10 blur-[120px] mix-blend-screen" />
      <div className="pointer-events-none absolute bottom-[10%] left-[20%] w-[50%] h-[50%] rounded-full bg-[#FF6ACB]/10 blur-[120px] mix-blend-screen" />
      
      <Navbar />
      <AstraChat />
      <PixelCharacters />
      
      <main className="relative z-10 flex flex-col gap-24 pb-24 pt-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <section id="hero"><Hero /></section>
        <section id="worldmap"><WorldMap /></section>
        <section id="quests"><QuestCards /></section>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 flex flex-col gap-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <section id="community"><CommunityChat /></section>
              <section id="calendar"><EventCalendar /></section>
            </div>
            <section id="roadmap"><Roadmap /></section>
            <section id="internships"><Internships /></section>
          </div>
          <div className="lg:col-span-4">
            <Leaderboard />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Home />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
