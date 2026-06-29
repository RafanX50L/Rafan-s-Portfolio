import React, { useState, useRef, useEffect } from 'react';
import { ZoomIn, ZoomOut, Maximize2, RotateCcw, ShieldAlert, Crosshair, HelpCircle, Activity } from 'lucide-react';

interface PathogenMarker {
  id: string;
  name: string;
  x: number; // percentage
  y: number; // percentage
  type: string;
  dangerLevel: 'High' | 'Medium' | 'Low';
  description: string;
  microStructure: string[];
}

const MARKERS: PathogenMarker[] = [
  {
    id: "pathogen-1",
    name: "Bacillus Anthracis Cluster",
    x: 35,
    y: 42,
    type: "Gram-positive, rod-shaped bacterium",
    dangerLevel: "High",
    description: "Spores visible under high-contrast optical zoom. Forms long, modular chain structures resembling bamboo under 1000x resolution.",
    microStructure: ["Spore capsule: Active", "Peptidoglycan wall: Thick", "S-layer protein lattice: Dense"]
  },
  {
    id: "pathogen-2",
    name: "Staphylococcus Aureus Colony",
    x: 68,
    y: 28,
    type: "Gram-positive coccal bacterium",
    dangerLevel: "Medium",
    description: "Arranged in grape-like clusters. Imaged during late-stage cell division under 800x fluorescent magnification.",
    microStructure: ["Teichoic acids: Stable", "Cell diameter: 0.9µm", "Biofilm density: Moderate"]
  },
  {
    id: "pathogen-3",
    name: "Pseudomonas Aeruginosa",
    x: 52,
    y: 73,
    type: "Gram-negative, rod-shaped bacterium",
    dangerLevel: "High",
    description: "Highly motile with a single polar flagellum. Exhibits high resistance profiling. Captured during active swarming motility.",
    microStructure: ["Polar flagellum: Active", "Outer membrane lipid: High", "Pili density: Dense"]
  }
];

export default function DeepZoomDemo() {
  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [selectedMarker, setSelectedMarker] = useState<PathogenMarker | null>(MARKERS[0]);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [scanStatus, setScanStatus] = useState<string>("System Ready");
  const [showGrid, setShowGrid] = useState<boolean>(true);
  
  const containerRef = useRef<HTMLDivElement>(null);

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.5, 4));
    logStatus("Scale updated: " + ((zoom + 0.5) * 100).toFixed(0) + "%");
  };

  const handleZoomOut = () => {
    setZoom(prev => {
      const next = Math.max(prev - 0.5, 1);
      if (next === 1) setPan({ x: 0, y: 0 }); // reset pan on min zoom
      logStatus("Scale updated: " + (next * 100).toFixed(0) + "%");
      return next;
    });
  };

  const handleReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setSelectedMarker(MARKERS[0]);
    logStatus("Resetting optical magnification to 100x");
  };

  const logStatus = (msg: string) => {
    setScanStatus(msg);
  };

  // Drag-to-pan handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom === 1) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;
    
    // Boundary check based on zoom
    const maxPan = (zoom - 1) * 100;
    setPan({
      x: Math.max(-maxPan, Math.min(maxPan, newX)),
      y: Math.max(-maxPan, Math.min(maxPan, newY))
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const focusOnMarker = (marker: PathogenMarker) => {
    setSelectedMarker(marker);
    setZoom(2.5);
    // Pan to center the marker
    // Marker coordinates are percentages (0-100)
    // We want to pan so the marker is in the center
    const targetX = -(marker.x - 50) * 4; 
    const targetY = -(marker.y - 50) * 4;
    setPan({ x: targetX, y: targetY });
    logStatus(`Scanning focused pathogen: ${marker.name}`);
  };

  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 backdrop-blur-md">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Viewport Side */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-mono text-zinc-400 font-medium tracking-wider">
                OPENSEADRAGON SIMULATOR (v4.0.0-PRO)
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-mono text-zinc-500">
                RESOLUTION: 0.08µm/px
              </span>
            </div>
          </div>

          {/* Interactive Zoom Canvas */}
          <div 
            ref={containerRef}
            className={`relative h-96 lg:h-[480px] rounded-xl border border-zinc-800 bg-zinc-950 overflow-hidden select-none ${zoom > 1 ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'}`}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {/* Visual Coordinate Grid lines */}
            {showGrid && (
              <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-10" style={{
                backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
                backgroundSize: `${30 * zoom}px ${30 * zoom}px`,
                transform: `translate(${pan.x}px, ${pan.y}px)`,
                transition: isDragging ? 'none' : 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
              }} />
            )}

            {/* Pathogen slide visualization background (Synthesized canvas CSS nodes) */}
            <div 
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              style={{
                transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                transformOrigin: 'center center',
                transition: isDragging ? 'none' : 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              {/* Outer boundary of microscopy slide */}
              <div className="w-80 h-80 rounded-full border border-zinc-800/60 bg-teal-950/10 flex items-center justify-center relative shadow-[inset_0_0_40px_rgba(13,148,136,0.15)] animate-pulse" style={{ animationDuration: '6s' }}>
                {/* Organic bacteriological nodes floating */}
                <div className="absolute w-24 h-12 bg-emerald-500/20 rounded-full blur-md top-1/4 left-1/4 transform -rotate-12" />
                <div className="absolute w-16 h-16 bg-teal-500/10 rounded-full blur-xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute w-28 h-8 bg-cyan-500/10 rounded-full blur-md bottom-1/4 right-1/4 transform rotate-45" />

                {/* Simulated spore nodes */}
                <div className="absolute w-2 h-4 bg-emerald-500/40 rounded-full top-24 left-32 transform -rotate-45" />
                <div className="absolute w-3 h-5 bg-emerald-500/50 rounded-full top-[130px] left-[105px] transform rotate-12" />
                <div className="absolute w-2.5 h-4 bg-emerald-600/40 rounded-full top-[145px] left-[118px] transform rotate-30" />
                
                {/* Staphylococcus group */}
                <div className="absolute w-2 h-2 bg-indigo-500/60 rounded-full top-28 right-24" />
                <div className="absolute w-2 h-2 bg-indigo-500/50 rounded-full top-26 right-[88px]" />
                <div className="absolute w-2 h-2 bg-indigo-600/70 rounded-full top-[110px] right-24" />
                <div className="absolute w-2 h-2 bg-indigo-400/60 rounded-full top-[115px] right-[102px]" />
                
                {/* Pseudomonas group */}
                <div className="absolute w-4 h-2 bg-teal-400/40 rounded-full bottom-24 left-44 transform rotate-[65deg]" />
                <div className="absolute w-1 h-6 bg-teal-400/20 rounded-full bottom-[76px] left-[184px] origin-top transform -rotate-12" /> {/* Flagellum */}
              </div>
            </div>

            {/* Pathogen Markers */}
            {MARKERS.map(marker => {
              const isSelected = selectedMarker?.id === marker.id;
              return (
                <button
                  key={marker.id}
                  onClick={() => focusOnMarker(marker)}
                  className="absolute z-20 group transition-all"
                  style={{
                    left: `calc(${marker.x}% + ${pan.x * (zoom === 1 ? 0 : 0.8)}px)`,
                    top: `calc(${marker.y}% + ${pan.y * (zoom === 1 ? 0 : 0.8)}px)`,
                    transform: `translate(-50%, -50%) scale(${zoom > 1.5 ? 1 / (zoom * 0.7) : 1})`,
                    transition: isDragging ? 'none' : 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), left 0.2s, top 0.2s'
                  }}
                >
                  <div className={`relative flex items-center justify-center p-1.5 rounded-full border transition-all ${
                    isSelected 
                      ? 'bg-emerald-500/20 border-emerald-400 text-emerald-400 ring-4 ring-emerald-500/20 scale-110' 
                      : 'bg-zinc-900/80 border-zinc-600 text-zinc-400 hover:border-emerald-400 hover:text-emerald-400 hover:scale-105'
                  }`}>
                    <Crosshair className={`w-4 h-4 ${isSelected ? 'animate-spin-slow' : ''}`} />
                    
                    {/* Tooltip on hover */}
                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-zinc-950/95 text-[10px] font-mono border border-zinc-800 text-zinc-200 px-2 py-0.5 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-30 shadow-lg">
                      {marker.name}
                    </span>
                  </div>
                </button>
              );
            })}

            {/* Overlay Magnifying Reticle Center (Visual only, on zoom) */}
            {zoom > 1.5 && (
              <div className="absolute inset-0 pointer-events-none border-2 border-emerald-500/15 rounded-xl flex items-center justify-center z-10">
                <div className="w-12 h-12 border border-emerald-500/30 rounded-full flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
                </div>
                {/* Horizontal & Vertical Crosshairs in corners */}
                <div className="absolute top-4 left-4 text-emerald-500/30 font-mono text-[9px]">LENS_SCALE: {zoom.toFixed(1)}x</div>
                <div className="absolute bottom-4 right-4 text-emerald-500/30 font-mono text-[9px]">POS_X: {pan.x.toFixed(0)}, Y: {pan.y.toFixed(0)}</div>
              </div>
            )}
          </div>

          {/* Viewport Control Dashboard */}
          <div className="flex flex-wrap items-center justify-between gap-4 mt-3 bg-zinc-950 border border-zinc-800/80 rounded-xl p-3">
            <div className="flex items-center gap-2">
              <button 
                onClick={handleZoomOut}
                disabled={zoom === 1}
                className="p-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                title="Zoom Out"
                id="btn-zoom-out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-xs font-mono font-bold text-zinc-300 w-12 text-center bg-zinc-900 py-1.5 border border-zinc-800 rounded-md">
                {(zoom * 100).toFixed(0)}%
              </span>
              <button 
                onClick={handleZoomIn}
                disabled={zoom === 4}
                className="p-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                title="Zoom In"
                id="btn-zoom-in"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button 
                onClick={handleReset}
                className="p-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all"
                title="Reset View"
                id="btn-zoom-reset"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-3">
              <label className="flex items-center gap-1.5 cursor-pointer select-none">
                <input 
                  type="checkbox" 
                  checked={showGrid} 
                  onChange={(e) => setShowGrid(e.target.checked)}
                  className="rounded border-zinc-800 bg-zinc-900 text-emerald-500 focus:ring-0 focus:ring-offset-0 w-3.5 h-3.5"
                  id="chk-grid"
                />
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">GRID</span>
              </label>
              
              <div className="h-4 w-[1px] bg-zinc-800" />

              <div className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-400">
                <Activity className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
                <span className="max-w-[120px] sm:max-w-[180px] truncate">{scanStatus}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Diagnosis / Metadata Info Side */}
        <div className="w-full md:w-80 flex flex-col justify-between border-t md:border-t-0 md:border-l border-zinc-800/80 pt-6 md:pt-0 md:pl-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <ShieldAlert className="w-4 h-4 text-emerald-400" />
              <h3 className="text-xs font-mono font-bold tracking-wider text-zinc-200 uppercase">
                Pathology Scanner Readout
              </h3>
            </div>

            {selectedMarker ? (
              <div className="space-y-4">
                <div>
                  <div className="text-[10px] font-mono text-zinc-500 uppercase">Imaged Pathogen</div>
                  <h4 className="text-sm font-semibold text-zinc-100 font-sans mt-0.5">
                    {selectedMarker.name}
                  </h4>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-lg p-2">
                    <div className="text-[9px] font-mono text-zinc-500 uppercase">Hazard Index</div>
                    <span className={`inline-flex items-center text-[10px] font-semibold font-mono mt-0.5 ${
                      selectedMarker.dangerLevel === 'High' 
                        ? 'text-red-400' 
                        : selectedMarker.dangerLevel === 'Medium' 
                        ? 'text-yellow-400' 
                        : 'text-emerald-400'
                    }`}>
                      ● {selectedMarker.dangerLevel} Hazard
                    </span>
                  </div>
                  <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-lg p-2">
                    <div className="text-[9px] font-mono text-zinc-500 uppercase">Focus Zoom</div>
                    <span className="text-[10px] font-mono text-emerald-400 font-medium block mt-0.5">
                      {selectedMarker.id === "pathogen-1" ? "1000x" : selectedMarker.id === "pathogen-2" ? "800x" : "1200x"}
                    </span>
                  </div>
                </div>

                <div>
                  <div className="text-[10px] font-mono text-zinc-500 uppercase mb-1">Morphological Analysis</div>
                  <p className="text-xs text-zinc-400 leading-relaxed font-sans bg-zinc-950/40 p-2.5 rounded-lg border border-zinc-800/40">
                    {selectedMarker.description}
                  </p>
                </div>

                <div>
                  <div className="text-[10px] font-mono text-zinc-500 uppercase mb-1.5">Membrane Ultrastructure</div>
                  <ul className="space-y-1">
                    {selectedMarker.microStructure.map((struct, i) => (
                      <li key={i} className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-300">
                        <span className="w-1 h-1 rounded-full bg-emerald-500" />
                        {struct}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="h-48 flex flex-col items-center justify-center text-center p-4">
                <HelpCircle className="w-8 h-8 text-zinc-600 mb-2 animate-pulse" />
                <p className="text-xs text-zinc-500 font-mono">
                  Select an active focal marker on the slide viewport to run high-resolution diagnostics.
                </p>
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-zinc-800/60">
            <div className="bg-emerald-950/10 border border-emerald-900/30 rounded-xl p-3 flex gap-2.5 items-start">
              <div className="p-1 rounded-lg bg-emerald-500/10 text-emerald-400 mt-0.5 shrink-0">
                <Activity className="w-3.5 h-3.5" />
              </div>
              <p className="text-[10.5px] text-emerald-400/80 leading-relaxed font-sans">
                <strong>Project Relevance:</strong> Built under SvelteKit + Elysia.js + Bun using OpenSeadragon for digital pathology analysis at Knowbin Technologies. Click on any crosshair marker to test the zooming action!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
