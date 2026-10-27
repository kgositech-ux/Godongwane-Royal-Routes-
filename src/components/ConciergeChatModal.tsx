import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Send, 
  MessageSquare, 
  Crown, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  CheckCheck,
  Bot
} from 'lucide-react';
import { SupportMessage } from '../types';
import { CONCIERGE_QUICK_INQUIRIES } from '../data/mockInventory';

interface ConciergeChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  messages: SupportMessage[];
  onSendMessage: (text: string, bookingId?: string) => Promise<void>;
  userId: string;
  userName: string;
  initialBookingId?: string;
}

export const ConciergeChatModal: React.FC<ConciergeChatModalProps> = ({
  isOpen,
  onClose,
  messages,
  onSendMessage,
  userId,
  userName,
  initialBookingId
}) => {
  if (!isOpen) return null;

  const [inputMessage, setInputMessage] = useState<string>('');
  const [isSending, setIsSending] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim() || isSending) return;

    setIsSending(true);
    setInputMessage('');
    try {
      await onSendMessage(text, initialBookingId);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#0c140e] border border-amber-500/40 rounded-3xl shadow-2xl text-white my-8 overflow-hidden flex flex-col h-[85vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-amber-500/20 bg-gradient-to-r from-amber-950/50 via-[#101c12] to-transparent flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/50 flex items-center justify-center">
                <Crown className="w-5 h-5 text-amber-400" />
              </div>
              <span className="w-3 h-3 rounded-full bg-emerald-400 border-2 border-black absolute -bottom-0.5 -right-0.5 animate-pulse" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif font-bold text-white text-base">
                  Royal Concierge Desk
                </h3>
                <span className="text-[10px] font-mono bg-emerald-950/80 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">
                  Online 24/7
                </span>
              </div>
              <p className="text-xs text-gray-400">
                Liaison: Lady Naledi Khumalo & Flight Dispatch
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages Stream */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {/* Welcome Note */}
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 text-xs text-gray-300 space-y-1">
            <div className="flex items-center gap-1.5 text-amber-400 font-semibold uppercase tracking-wider font-mono text-[10px]">
              <Sparkles className="w-3.5 h-3.5" />
              Direct Sovereign Assistance
            </div>
            <p>
              Welcome to your dedicated communications channel. Inquire about in-flight dining, helicopter transfers, baggage allowances, or immediate itinerary modifications.
            </p>
          </div>

          {messages.length === 0 ? (
            <div className="text-center py-8 text-gray-400 text-xs">
              No previous messages. Send your inquiry or select a prompt below.
            </div>
          ) : (
            messages.map((msg) => {
              const isMe = msg.senderRole === 'traveler';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                >
                  <div className="flex items-center gap-1.5 text-[10px] text-gray-400 mb-1 px-1">
                    <span className="font-semibold text-gray-300">{msg.senderName}</span>
                    <span>•</span>
                    <span>{new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>

                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                      isMe
                        ? 'bg-amber-500 text-black font-medium rounded-br-none shadow-md shadow-amber-500/10'
                        : 'bg-[#152418] border border-amber-500/30 text-white rounded-bl-none shadow-md'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-4 py-2 border-t border-white/5 bg-black/40 flex items-center gap-2 overflow-x-auto text-[11px]">
          <span className="text-gray-400 whitespace-nowrap text-[10px] font-mono">QUICK INQUIRY:</span>
          {CONCIERGE_QUICK_INQUIRIES.slice(0, 3).map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(prompt)}
              className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white whitespace-nowrap transition-colors cursor-pointer"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-black/60 border-t border-amber-500/20 flex items-center gap-2">
          <input
            type="text"
            placeholder="Type your message to Royal Concierge..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSend();
            }}
            className="flex-1 bg-[#101b12] border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 transition-colors"
          />
          <button
            onClick={() => handleSend()}
            disabled={!inputMessage.trim() || isSending}
            className="p-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black disabled:opacity-40 transition-all cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
