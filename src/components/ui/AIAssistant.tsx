import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot } from 'lucide-react';

const RESPONSES: Record<string, string> = {
  default: "I'm your AI Fit Intelligence assistant! I can help you find the perfect size for your dog, explain recommendations, or show ROI projections.",
  size: "Based on your dog's measurements, I recommend starting with the AI Fit Finder. Input your dog's chest, neck, and back measurements for a 95%+ accuracy recommendation.",
  return: "Our AI reduces return rates by up to 38%. The Return Risk Predictor shows exactly why a size might be returned before you buy.",
  roi: "Canada Pooch can expect $147,000 in annual savings with a 716% ROI. Implementation takes as little as 6 weeks.",
  breed: "Different breeds have very different sizing needs. French Bulldogs need wide chests, Poodles need longer backs. Our breed database covers 50+ breeds.",
};

function getResponse(msg: string): string {
  const lower = msg.toLowerCase();
  if (lower.includes('size') || lower.includes('fit')) return RESPONSES.size;
  if (lower.includes('return')) return RESPONSES.return;
  if (lower.includes('roi') || lower.includes('saving')) return RESPONSES.roi;
  if (lower.includes('breed') || lower.includes('dog')) return RESPONSES.breed;
  return RESPONSES.default;
}

interface Message { id: string; text: string; from: 'user' | 'ai'; }

export function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: "Hi! I'm your AI Fit Intelligence assistant. How can I help you today?", from: 'ai' },
  ]);

  const send = () => {
    if (!input.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), text: input, from: 'user' };
    const aiMsg: Message = { id: (Date.now() + 1).toString(), text: getResponse(input), from: 'ai' };
    setMessages(prev => [...prev, userMsg, aiMsg]);
    setInput('');
  };

  return (
    <div className="fixed bottom-20 xl:bottom-6 right-4 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-16 right-0 w-80 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden"
          >
            <div className="gradient-accent px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm">AI Assistant</p>
                  <p className="text-white/70 text-xs">Fit Intelligence</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="h-56 overflow-y-auto p-4 space-y-3">
              {messages.map(msg => (
                <div key={msg.id} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] px-3 py-2 rounded-2xl text-xs leading-relaxed ${
                    msg.from === 'user'
                      ? 'bg-black text-white rounded-br-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-bl-sm'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="px-3 pb-3 flex gap-2">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && send()}
                placeholder="Ask me anything..."
                className="flex-1 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs outline-none focus:border-black"
              />
              <button onClick={send} className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
                <Send className="w-3.5 h-3.5 text-white" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        onClick={() => setOpen(s => !s)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full gradient-accent shadow-glow-cyan flex items-center justify-center"
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </motion.button>
    </div>
  );
}
