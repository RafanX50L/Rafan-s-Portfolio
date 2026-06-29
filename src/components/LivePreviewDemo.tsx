import React, { useState, useEffect, useRef, FormEvent } from 'react';
import { Globe, RefreshCw, ExternalLink, ArrowRight, Lock, Sparkles, AlertCircle, Laptop, Smartphone } from 'lucide-react';

interface LivePreviewDemoProps {
  type: 'fitness' | 'quiz';
  title: string;
  description: string;
  techStack: string[];
}

export default function LivePreviewDemo({ type, title, description, techStack }: LivePreviewDemoProps) {
  const storageKey = `rafan_portfolio_url_${type}`;
  
  // Set default placeholders based on standard patterns or empty
  const defaultUrl = type === 'fitness' 
    ? 'https://ai-gym-gen-example.vercel.app' 
    : 'https://quiz.rafan.me';

  const [url, setUrl] = useState<string>(() => {
    return localStorage.getItem(storageKey) || defaultUrl;
  });
  
  const [inputUrl, setInputUrl] = useState<string>(url || defaultUrl);
  const [iframeKey, setIframeKey] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Sync state with localstorage
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      setUrl(saved);
      setInputUrl(saved);
    } else {
      setUrl(defaultUrl);
      setInputUrl(defaultUrl);
    }
  }, [type, defaultUrl]);

  const handleSaveUrl = (e: React.FormEvent) => {
    e.preventDefault();
    let formattedUrl = inputUrl.trim();
    if (formattedUrl && !/^https?:\/\//i.test(formattedUrl)) {
      formattedUrl = 'https://' + formattedUrl;
    }
    
    setUrl(formattedUrl);
    setInputUrl(formattedUrl);
    if (formattedUrl) {
      localStorage.setItem(storageKey, formattedUrl);
    } else {
      localStorage.removeItem(storageKey);
    }
    setIframeKey(prev => prev + 1);
  };

  const handleClearUrl = () => {
    setUrl('');
    setInputUrl('');
    localStorage.removeItem(storageKey);
  };

  const handleRefresh = () => {
    setIframeKey(prev => prev + 1);
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    if (url) {
      setIsLoading(true);
    }
  }, [url, iframeKey]);

  return (
    <div className="bg-[#111] border border-[#222] rounded p-5 md:p-6 space-y-6" id={`live-preview-container-${type}`}>
      
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#222222]">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.15em] text-zinc-500 font-semibold font-mono">
              Live Application Sandbox
            </span>
            <span className="px-2 py-0.5 rounded bg-[#1A1A1A] border border-[#333] text-[9px] font-mono text-zinc-400">
              User-Configured Node
            </span>
          </div>
          <h3 className="text-lg font-bold text-white tracking-tight font-sans">
            {title}
          </h3>
          <p className="text-xs text-zinc-400 max-w-2xl font-sans">
            {description}
          </p>
        </div>

        {/* Tech Badges */}
        <div className="flex flex-wrap gap-1.5 self-start md:self-center">
          {techStack.map((tech) => (
            <span key={tech} className="px-2 py-0.5 bg-[#1A1A1A] border border-[#2c2c2c] text-[10px] font-mono text-zinc-400 rounded">
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Main Sandbox Area */}
      {!url ? (
        /* Onboarding / Setup View */
        <div className="bg-[#0A0A0A] border border-[#222] rounded p-8 text-center max-w-2xl mx-auto space-y-6 my-4">
          <div className="w-12 h-12 rounded bg-[#1A1A1A] border border-[#333] flex items-center justify-center mx-auto text-zinc-400">
            <Globe className="w-5 h-5" />
          </div>
          
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-[#F5F5F5] font-sans">
              Connect Your Deployed App Sandbox
            </h4>
            <p className="text-xs text-zinc-400 max-w-md mx-auto leading-relaxed">
              Muhammed Rafan has running URLs for this system. Paste your live deployment URL below to load it directly in the interactive viewport sandbox.
            </p>
          </div>

          <form onSubmit={handleSaveUrl} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="text"
              placeholder="e.g. https://my-running-fitness-app.vercel.app"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              className="flex-1 bg-[#111] border border-[#222] focus:border-zinc-550 rounded text-xs px-3.5 py-2.5 text-zinc-200 placeholder-zinc-700 focus:outline-none transition-all"
            />
            <button
              type="submit"
              className="bg-white hover:bg-zinc-200 text-black text-[10px] uppercase tracking-widest font-bold py-2.5 px-4 rounded flex items-center justify-center gap-1.5 transition-all cursor-pointer whitespace-nowrap"
            >
              Mount Stream <ArrowRight className="w-3 h-3" />
            </button>
          </form>

          <div className="text-[10px] text-zinc-500 font-mono flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-zinc-600" />
            Loaded sandbox references persist securely in your local browser cache.
          </div>
        </div>
      ) : (
        /* Browser Mock / Sandbox Active View */
        <div className="space-y-4">
          
          {/* Mock Address Bar & Controls */}
          <div className="bg-[#0A0A0A] border border-[#222] rounded p-2.5 flex flex-col sm:flex-row items-center justify-between gap-3">
            
            {/* Fake dots + Address Bar */}
            <div className="flex items-center gap-3 w-full sm:w-auto flex-1">
              {/* Traffic lights */}
              <div className="hidden md:flex items-center gap-1.5 shrink-0">
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
              </div>

              {/* Dynamic URL Address bar */}
              <div className="relative flex-1 max-w-xl">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
                  <Lock className="w-3 h-3 text-emerald-500" />
                </div>
                <input
                  type="text"
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  onBlur={(e) => {
                    // Save on blur if changed
                    if (inputUrl.trim() !== url) {
                      handleSaveUrl({ preventDefault: () => {} } as any);
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSaveUrl({ preventDefault: () => {} } as any);
                    }
                  }}
                  className="w-full bg-[#111] border border-[#222] rounded text-xs pl-8 pr-20 py-1.5 text-zinc-300 focus:text-white focus:outline-none focus:border-zinc-550 transition-all font-mono"
                />
                <div className="absolute inset-y-0 right-0 pr-2 flex items-center text-[9px] text-zinc-500 font-mono pointer-events-none">
                  Press Enter
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              
              {/* Responsive Layout Switchers */}
              <div className="flex items-center border border-[#222] bg-[#111] rounded p-0.5">
                <button
                  onClick={() => setViewMode('desktop')}
                  className={`p-1 rounded text-xs ${viewMode === 'desktop' ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
                  title="Desktop View"
                >
                  <Laptop className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setViewMode('mobile')}
                  className={`p-1 rounded text-xs ${viewMode === 'mobile' ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
                  title="Mobile View"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="h-4 w-[1px] bg-zinc-800" />

              <button
                onClick={handleRefresh}
                className="p-1.5 bg-[#111] border border-[#222] rounded text-zinc-400 hover:text-white transition-colors cursor-pointer"
                title="Reload Session"
                id={`btn-live-reload-${type}`}
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              </button>

              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 bg-[#111] border border-[#222] rounded text-zinc-400 hover:text-white transition-colors flex items-center gap-1 text-[10px] font-sans font-medium"
                title="Open in New Tab"
                id={`btn-live-ext-${type}`}
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Launch App</span>
              </a>

              <button
                onClick={handleClearUrl}
                className="px-2 py-1 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 rounded text-[10px] font-mono text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
                id={`btn-live-clear-${type}`}
              >
                Disconnect
              </button>
            </div>
          </div>

          {/* Iframe Viewport viewport wrapper */}
          <div className="relative border border-[#222] rounded bg-[#0A0A0A] overflow-hidden transition-all duration-300 flex justify-center">
            
            {/* Loading Indicator */}
            {isLoading && (
              <div className="absolute inset-0 bg-[#0A0A0A]/90 z-20 flex flex-col items-center justify-center gap-3">
                <RefreshCw className="w-6 h-6 text-zinc-400 animate-spin" />
                <div className="text-xs font-mono text-zinc-500">
                  Streaming live node session...
                </div>
              </div>
            )}

            {/* Simulated Iframe container */}
            <div 
              className={`transition-all duration-300 overflow-hidden w-full`}
              style={{ 
                height: '520px',
                maxWidth: viewMode === 'mobile' ? '375px' : '100%',
                borderLeft: viewMode === 'mobile' ? '1px solid #222' : 'none',
                borderRight: viewMode === 'mobile' ? '1px solid #222' : 'none',
              }}
            >
              <iframe
                key={iframeKey}
                ref={iframeRef}
                src={url}
                onLoad={handleIframeLoad}
                className="w-full h-full bg-white"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                title={`Live Stream - ${title}`}
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Safety/Iframe notice */}
          <div className="bg-[#1A1A1A]/40 border border-[#222] rounded p-3 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 text-zinc-500 mt-0.5" />
            <div className="text-[11px] text-zinc-400 leading-normal font-sans">
              <strong>Iframe Ingress Protection:</strong> Some deployments block rendering in embedded frames via security policies (like <code>X-Frame-Options</code>). If the viewport remains empty or reports connection blocks, click the <strong className="text-white">Launch App <ExternalLink className="w-3 h-3 inline" /></strong> button on the top right to open your live application directly in a dedicated tab.
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
