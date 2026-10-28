import React from 'react';
import { 
  Cpu, 
  Terminal, 
  Layers, 
  Wifi, 
  Calculator, 
  Activity, 
  BookOpen,
  Compass
} from 'lucide-react';

export type TabType = 'requisiti' | 'configuratore' | 'modelli' | 'playground' | 'lan_clients' | 'vram_calc' | 'glossario';

interface HeaderProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  serverRunning: boolean;
  onToggleServer: () => void;
  endpointUrl: string;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  serverRunning,
  onToggleServer,
  endpointUrl,
}) => {
  return (
    <header className="border-b border-[#E2D8C6] bg-[#FAF8F5]/95 backdrop-blur-sm sticky top-0 z-50">
      {/* Top Editorial Crest */}
      <div className="border-b border-[#ECE3D4] py-1 px-4 text-center text-[10px] tracking-widest uppercase text-[#857969] font-serif">
        <span>Officina Computazionale • Manuale di Trasformazione del Calcolatore Personale</span>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3">
          {/* Logo with Real Server Icon - "Server AI Locale" text removed as requested */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group" 
            onClick={() => onTabChange('requisiti')}
            title="Torna alla Home"
          >
            <div className="h-11 w-10 border border-[#C5B7A0] rounded bg-[#F4EFE6] flex items-center justify-center p-0.5 group-hover:border-[#8B4513] transition shadow-xs overflow-hidden">
              <img 
                src="/assets/aistudio/______-81-1_acc5d854.png" 
                alt="Icona Server Rack AI" 
                className="h-full w-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] uppercase tracking-wider font-mono px-2 py-0.5 rounded border border-[#D5C9B5] bg-[#F2EDE2] text-[#6E604C] font-semibold">
                  Manuale Tecnico
                </span>
                <span className="text-[11px] font-serif text-[#877967] italic hidden sm:inline">
                  • Edizione 2026
                </span>
              </div>
              <p className="text-[11px] text-[#736858] font-serif italic hidden sm:block mt-0.5">
                Architettura locale, hardware & compendio operativo
              </p>
            </div>
          </div>

          {/* Status badge in vintage print style */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded border border-[#DFD5C2] bg-[#F6F1E7] text-xs text-[#52493D] font-mono text-[11px]">
              <span className={`w-2 h-2 rounded-full ${serverRunning ? 'bg-[#3B6E47]' : 'bg-[#A86438]'}`} />
              <span className="text-[#877A68]">Porta:</span>
              <span className="font-semibold text-[#2D2720]">{endpointUrl.replace('http://', '')}</span>
            </div>

            <button
              onClick={onToggleServer}
              type="button"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded border text-xs font-serif transition-colors ${
                serverRunning 
                  ? 'border-[#3B6E47]/40 bg-[#EEF5EF] text-[#2B5435] hover:bg-[#E3EFE4]' 
                  : 'border-[#CBBDA8] bg-[#F3EDE2] text-[#554A3B] hover:bg-[#EAE2D4]'
              }`}
            >
              <Activity className="w-3.5 h-3.5 stroke-[1.5]" />
              <span>{serverRunning ? 'Stato: In Funzione' : 'Stato: In Sospeso'}</span>
            </button>
          </div>
        </div>

        {/* Vintage Minimalist Navigation Tabs */}
        <nav className="flex space-x-1 sm:space-x-2.5 overflow-x-auto pt-1 border-t border-[#ECE3D4] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {[
            { id: 'requisiti', label: '1. Requisiti Hardware', icon: Cpu },
            { id: 'configuratore', label: '2. Configura Server', icon: Terminal },
            { id: 'modelli', label: '3. Catalogo Modelli', icon: Layers },
            { id: 'playground', label: '4. Banco di Prova', icon: Compass },
            { id: 'lan_clients', label: '5. Accesso LAN & Telefoni', icon: Wifi },
            { id: 'vram_calc', label: 'Calcolatore VRAM', icon: Calculator },
            { id: 'glossario', label: 'Glossario Tecnico', icon: BookOpen },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id as TabType)}
                className={`flex items-center gap-1.5 px-3 py-2 text-xs font-serif tracking-wide border-b-2 whitespace-nowrap transition-all ${
                  isActive
                    ? 'border-[#8B4513] text-[#8B4513] font-bold bg-[#F4EFE6]/70'
                    : 'border-transparent text-[#6D6252] hover:text-[#241F1A] hover:border-[#D1C4AD]'
                }`}
              >
                <Icon className="w-3.5 h-3.5 stroke-[1.5]" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
