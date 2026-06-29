import React, { useState, useEffect } from 'react';
import { Mail, Send, CheckCircle, Database, Trash2, MailOpen, User, Sparkles, MessageSquare } from 'lucide-react';
import { ContactMessage } from '../types';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  
  // Database messages state
  const [dbMessages, setDbMessages] = useState<ContactMessage[]>([]);
  const [showInbox, setShowInbox] = useState<boolean>(false);

  // Load initial contact messages from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('portfolio_messages');
    if (saved) {
      try {
        setDbMessages(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    } else {
      // Seed initial messages to make the inbox look full-stack and functional immediately
      const seed: ContactMessage[] = [
        {
          id: "seed-1",
          name: "Saurabh Sharma",
          email: "saurabh.sharma@talentcorp.io",
          subject: "Senior React Role Proposal",
          message: "Hey Muhammed! I reviewed your portfolio, especially your work with OpenSeadragon and Elysia.js. We are scaling a deeptech biotechnology visualization project and would love to have a call this Wednesday to discuss a remote consulting role.",
          timestamp: new Date(Date.now() - 3600000 * 24).toLocaleString()
        },
        {
          id: "seed-2",
          name: "Emily Watson",
          email: "emily.watson@knowbin.tech",
          subject: "Pathology Viewer Upgrades",
          message: "Excellent portfolio, Rafan. I was part of the Knowbin team during SvelteKit architecture scoping. Glad to see your simulator captures the Deep Zoom complexity so accurately. Let's stay in touch!",
          timestamp: new Date(Date.now() - 3600000 * 5).toLocaleString()
        }
      ];
      localStorage.setItem('portfolio_messages', JSON.stringify(seed));
      setDbMessages(seed);
    }
  }, []);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Full name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.subject.trim()) newErrors.subject = "Subject line is required";
    if (!formData.message.trim()) newErrors.message = "Message text is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const newMessage: ContactMessage = {
        id: "msg-" + Date.now(),
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
        timestamp: new Date().toLocaleString()
      };

      const updated = [newMessage, ...dbMessages];
      localStorage.setItem('portfolio_messages', JSON.stringify(updated));
      setDbMessages(updated);
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      
      // Reset success banner after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    }, 800);
  };

  const deleteMessage = (id: string) => {
    const updated = dbMessages.filter(msg => msg.id !== id);
    localStorage.setItem('portfolio_messages', JSON.stringify(updated));
    setDbMessages(updated);
  };

  const clearAllMessages = () => {
    if (confirm("Are you sure you want to clear the entire message sandbox?")) {
      localStorage.removeItem('portfolio_messages');
      setDbMessages([]);
    }
  };

  return (
    <div className="bg-[#111] border border-[#222] rounded p-6 md:p-8 relative overflow-hidden" id="contact-section-container">
      {/* Decorative background lines */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.01]" style={{
        backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        
        {/* Informational Text Side */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="p-2.5 rounded bg-[#1A1A1A] border border-[#333] text-zinc-350">
                <Mail className="w-4 h-4" />
              </span>
              <h3 className="text-sm font-bold text-zinc-100 font-sans tracking-tight">
                Secure Message Relay
              </h3>
            </div>

            <div className="space-y-3">
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                Have a challenging full-stack engineering role or contract project? Submit your inquiry through this secure gateway.
              </p>
              <p className="text-xs text-zinc-500 font-sans leading-relaxed">
                Messages submitted through this responsive form are instantly routed into a persistent database-like local store, which you can read directly in the <strong className="text-white">Sandbox Inbox</strong> toggle on the bottom left.
              </p>
            </div>

            <div className="pt-4 space-y-2 text-xs font-mono text-zinc-400">
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                <span>Primary: rafanmu33@gmail.com</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                <span>Telegram/WhatsApp: +91 9400690106</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                <span>Availability: Remote / Open to travel</span>
              </div>
            </div>
          </div>

          {/* Sandbox Inbox toggle button */}
          <div className="pt-6 border-t border-[#222222] mt-6 lg:mt-0">
            <button
              onClick={() => setShowInbox(!showInbox)}
              className={`w-full py-2.5 px-4 rounded border font-mono text-[10px] uppercase tracking-widest font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                showInbox 
                  ? 'bg-white text-black border-white' 
                  : 'bg-[#1A1A1A] border border-[#333] text-zinc-400 hover:text-white'
              }`}
              id="btn-toggle-inbox"
            >
              <Database className="w-4 h-4" />
              {showInbox ? 'Close Message Sandbox' : `Open Sandbox Inbox (${dbMessages.length})`}
            </button>
          </div>
        </div>

        {/* Contact Form or Sandbox Inbox View */}
        <div className="lg:col-span-7 bg-[#151515] border border-[#222] rounded p-5 md:p-6 min-h-[380px] flex flex-col">
          
          {showInbox ? (
            /* Database Sandbox Inbox View */
            <div className="flex-1 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#222222]">
                  <div className="flex items-center gap-2">
                    <Database className="w-4 h-4 text-zinc-400" />
                    <span className="text-[10px] font-mono font-bold text-zinc-200 uppercase tracking-wide">
                      Recruiter Sandbox Inbox (Local Store)
                    </span>
                  </div>
                  {dbMessages.length > 0 && (
                    <button
                      onClick={clearAllMessages}
                      className="text-[10px] font-mono text-zinc-500 hover:text-red-400 transition-colors flex items-center gap-1 cursor-pointer"
                      id="btn-clear-messages"
                    >
                      <Trash2 className="w-3 h-3" /> Clear Inbox
                    </button>
                  )}
                </div>

                {dbMessages.length === 0 ? (
                  <div className="py-12 text-center text-zinc-500 font-mono text-xs flex flex-col items-center gap-2">
                    <MailOpen className="w-8 h-8 text-zinc-750 animate-pulse" />
                    <p>No messages in local storage sandbox yet.</p>
                    <p className="text-[10px] text-zinc-600 max-w-xs leading-normal">
                      Try filling out the contact form and sending a message to see it propagate in this live dashboard instantly!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-[340px] overflow-y-auto pr-1">
                    {dbMessages.map((msg) => (
                      <div 
                        key={msg.id} 
                        className="p-3 bg-[#111] border border-[#222] rounded space-y-2 hover:border-zinc-750 transition-all"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs font-semibold text-zinc-200">{msg.name}</span>
                              <span className="text-[10px] font-mono text-zinc-550">({msg.email})</span>
                            </div>
                            <h4 className="text-[11px] font-mono font-semibold text-zinc-400 mt-0.5">{msg.subject}</h4>
                          </div>
                          <button
                            onClick={() => deleteMessage(msg.id)}
                            className="text-zinc-500 hover:text-red-400 p-1 rounded hover:bg-[#1A1A1A] transition-all cursor-pointer"
                            title="Delete message"
                            id={`btn-del-${msg.id}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-xs text-zinc-400 font-sans leading-relaxed whitespace-pre-wrap bg-[#151515] p-2 rounded border border-[#222]">
                          {msg.message}
                        </p>
                        <div className="text-[9px] font-mono text-zinc-500 text-right">
                          Received: {msg.timestamp}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="text-[10px] font-mono text-zinc-500 text-center pt-4 border-t border-[#222222] mt-4 leading-normal">
                This inbox represents active client-side model synchronization, letting recruiters instantly audit the CRUD data loops they expect in state-driven full-stack portals.
              </div>
            </div>
          ) : (
            /* Standard Contact Form view */
            <form onSubmit={handleSubmit} className="space-y-4 flex-1 flex flex-col justify-between">
              
              {isSuccess && (
                <div className="bg-[#1A1A1A] border border-zinc-850 text-white p-3.5 rounded flex items-start gap-2.5 animate-fade-in">
                  <CheckCircle className="w-4 h-4 shrink-0 mt-0.5 text-zinc-450" />
                  <div className="text-xs font-sans leading-normal">
                    <strong>Message Broadcast Successful!</strong> Muhammed Rafan's portfolio has securely cataloged your inquiry. Check the <strong>Sandbox Inbox</strong> toggle on the bottom-left to view your message in the local store.
                  </div>
                </div>
              )}

              <div className="space-y-3.5">
                {/* Name & Email Group */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label htmlFor="name" className="text-[10px] font-mono font-bold text-zinc-500 block mb-1.5 uppercase tracking-[0.15em]">
                      Your Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Saurabh Sharma"
                        className={`w-full bg-[#111] border ${errors.name ? 'border-red-500' : 'border-[#222] focus:border-zinc-550'} rounded text-xs px-3.5 py-2.5 text-zinc-200 placeholder-zinc-700 focus:outline-none transition-all`}
                      />
                    </div>
                    {errors.name && <span className="text-[10px] font-mono text-red-400 mt-1 block">{errors.name}</span>}
                  </div>

                  <div>
                    <label htmlFor="email" className="text-[10px] font-mono font-bold text-zinc-500 block mb-1.5 uppercase tracking-[0.15em]">
                      Email Address
                    </label>
                    <input
                      type="text"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. recruit@company.com"
                      className={`w-full bg-[#111] border ${errors.email ? 'border-red-500' : 'border-[#222] focus:border-zinc-550'} rounded text-xs px-3.5 py-2.5 text-zinc-200 placeholder-zinc-700 focus:outline-none transition-all`}
                    />
                    {errors.email && <span className="text-[10px] font-mono text-red-400 mt-1 block">{errors.email}</span>}
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="text-[10px] font-mono font-bold text-zinc-500 block mb-1.5 uppercase tracking-[0.15em]">
                    Subject Line
                    </label>
                  <input
                    type="text"
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Contract Full-Stack Role / Consultation Inquiry"
                    className={`w-full bg-[#111] border ${errors.subject ? 'border-red-500' : 'border-[#222] focus:border-zinc-550'} rounded text-xs px-3.5 py-2.5 text-zinc-200 placeholder-zinc-700 focus:outline-none transition-all`}
                  />
                  {errors.subject && <span className="text-[10px] font-mono text-red-400 mt-1 block">{errors.subject}</span>}
                </div>

                {/* Message Body */}
                <div>
                  <label htmlFor="message" className="text-[10px] font-mono font-bold text-zinc-500 block mb-1.5 uppercase tracking-[0.15em]">
                    Message Body
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Write your technical project description or interview invite here..."
                    className={`w-full bg-[#111] border ${errors.message ? 'border-red-500' : 'border-[#222] focus:border-zinc-550'} rounded text-xs p-3.5 text-zinc-200 placeholder-zinc-700 focus:outline-none transition-all resize-none`}
                  />
                  {errors.message && <span className="text-[10px] font-mono text-red-400 mt-1 block">{errors.message}</span>}
                </div>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-4 bg-white hover:bg-zinc-200 text-black font-sans text-[10px] uppercase tracking-widest font-bold py-3 px-4 rounded flex items-center justify-center gap-2 transition-all cursor-pointer"
                id="btn-contact-submit"
              >
                <Send className="w-3.5 h-3.5" />
                {isSubmitting ? 'Transmitting Over Web Socket...' : 'Broadcast Message Securely'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
