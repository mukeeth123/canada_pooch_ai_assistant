import { Navbar } from './Navbar';
import { AIAssistant } from '../ui/AIAssistant';
import { MobileBottomNav } from './MobileBottomNav';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <Navbar />
      <main className="pt-16 pb-20 xl:pb-0">
        {children}
      </main>
      <MobileBottomNav />
      <AIAssistant />
    </div>
  );
}
