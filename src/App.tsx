/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header, TabType } from './components/Header.tsx';
import { HardwareRequirementsSection } from './components/HardwareRequirementsSection.tsx';
import { ServerConfigurator } from './components/ServerConfigurator.tsx';
import { ModelCatalog } from './components/ModelCatalog.tsx';
import { ApiTestBench } from './components/ApiTestBench.tsx';
import { LanClientsGuide } from './components/LanClientsGuide.tsx';
import { VramCalculator } from './components/VramCalculator.tsx';
import { GlossarioComponent } from './components/GlossarioComponent.tsx';
import { SERVER_ICON_BASE64 } from './constants/assets.ts';
import { BookOpen, ShieldCheck, ChevronRight } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('requisiti');
  const [serverRunning, setServerRunning] = useState<boolean>(true);
  const [endpointUrl, setEndpointUrl] = useState<string>('http://localhost:11434/v1');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get('tab') as TabType;
    if (tabParam && ['requisiti', 'configuratore', 'modelli', 'playground', 'lan_clients', 'vram_calc', 'glossario'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#241F1A] flex flex-col font-serif selection:bg-[#E8DFC9] selection:text-[#8B4513] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      {/* Top Editorial Navigation */}
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        serverRunning={serverRunning}
        onToggleServer={() => setServerRunning(!serverRunning)}
        endpointUrl={endpointUrl}
      />

      {/* Main Body */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {activeTab === 'requisiti' && (
          <HardwareRequirementsSection
            onGoToConfigurator={() => setActiveTab('configuratore')}
            onGoToModels={() => setActiveTab('modelli')}
          />
        )}

        {activeTab === 'configuratore' && (
          <ServerConfigurator
            onGoToPlayground={() => setActiveTab('playground')}
            onGoToLanClients={() => setActiveTab('lan_clients')}
          />
        )}

        {activeTab === 'modelli' && <ModelCatalog />}

        {activeTab === 'playground' && (
          <ApiTestBench
            endpointUrl={endpointUrl}
            onUpdateEndpointUrl={setEndpointUrl}
            serverRunning={serverRunning}
          />
        )}

        {activeTab === 'lan_clients' && <LanClientsGuide />}

        {activeTab === 'vram_calc' && <VramCalculator />}

        {activeTab === 'glossario' && <GlossarioComponent />}
      </main>

      {/* Classical Colophon & Footer with Glossary Quick Link */}
      <footer className="border-t border-[#E5DAC6] bg-[#FAF8F5] py-8 text-xs text-[#7A6D5B] font-serif mt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Quick Glossary Section Bar in Footer */}
          <div className="p-4 rounded border border-[#DDD3C1] bg-[#FDFBF7] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-8 w-7 border border-[#D5C9B5] rounded bg-[#F4EFE6] p-0.5 shrink-0">
                <img 
                  src={SERVER_ICON_BASE64} 
                  alt="Server icon" 
                  className="h-full w-full object-contain"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = './server-icon.png';
                  }}
                />
              </div>
              <div className="text-left">
                <span className="font-bold text-[#241F1A] text-xs block font-vintage-serif">
                  Glossario Concettuale dei Termini LLM
                </span>
                <span className="text-[11px] text-[#7A6D5B]">
                  Quantizzazione, Finestre di Contesto, VRAM, Cache KV, Ollama & Formato GGUF
                </span>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('glossario')}
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#F4EFE6] hover:bg-[#EAE2D2] text-[#8B4513] border border-[#D5C9B5] text-xs font-bold transition shrink-0"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Consulta il Glossario Completo</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          {/* Imprint line */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left pt-2 border-t border-[#EFE7D8]">
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <span className="font-bold text-[#3B3226]">Manuale Tecnico & Dispensa Computazionale</span>
              <span>— Per la sovranità computazionale su hardware personale</span>
            </div>

            <div className="flex items-center gap-4 text-[#7A6D5B] text-[11px] justify-center">
              <span>Elaborazione Privata al 100%</span>
              <span>•</span>
              <span className="font-mono">OpenAI v1 API Compatible</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
