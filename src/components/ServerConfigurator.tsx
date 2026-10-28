import React, { useState } from 'react';
import { 
  Terminal, 
  Copy, 
  Check, 
  Download, 
  Wifi, 
  Play, 
  Info,
  Globe,
  Compass
} from 'lucide-react';
import { generateServerScript, POPULAR_MODELS } from '../utils/hardwareChecker.ts';

interface ServerConfiguratorProps {
  onGoToPlayground: () => void;
  onGoToLanClients: () => void;
}

export const ServerConfigurator: React.FC<ServerConfiguratorProps> = ({
  onGoToPlayground,
  onGoToLanClients,
}) => {
  const [engine, setEngine] = useState<'ollama' | 'llama_cpp' | 'vllm' | 'docker_localai'>('ollama');
  const [os, setOs] = useState<'windows' | 'macos' | 'linux'>('windows');
  const [bindLan, setBindLan] = useState<boolean>(true);
  const [port, setPort] = useState<number>(11434);
  const [selectedModel, setSelectedModel] = useState<string>('llama3.1:8b');
  const [copiedInstall, setCopiedInstall] = useState<boolean>(false);
  const [copiedRun, setCopiedRun] = useState<boolean>(false);

  const scriptData = generateServerScript({
    engine,
    os,
    bindLan,
    port,
    model: selectedModel,
  });

  const handleCopy = (text: string, type: 'install' | 'run') => {
    navigator.clipboard.writeText(text);
    if (type === 'install') {
      setCopiedInstall(true);
      setTimeout(() => setCopiedInstall(false), 2000);
    } else {
      setCopiedRun(true);
      setTimeout(() => setCopiedRun(false), 2000);
    }
  };

  const downloadScriptFile = () => {
    const isWin = os === 'windows';
    const ext = isWin ? 'ps1' : 'sh';
    const filename = `avvia-server-ai.${ext}`;
    const fileContent = isWin
      ? `# Manuale Tecnico Server AI - Script per Windows PowerShell
# Esegui come Amministratore

${scriptData.installCommand}

${scriptData.runCommand}
`
      : `#!/usr/bin/env bash
# Manuale Tecnico Server AI - Script per Unix/Linux/macOS

${scriptData.installCommand}

${scriptData.runCommand}
`;

    const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Title */}
      <div className="border border-[#DDD3C1] bg-[#FDFBF7] p-6 sm:p-8 rounded shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-[10px] font-mono tracking-widest uppercase text-[#8B4513]">
            Capitolo II • Istruzioni Operative
          </div>
          <h2 className="font-vintage-serif text-2xl sm:text-3xl font-bold text-[#241F1A] mt-1">
            Configurazione & Avvio del Servizio Locale
          </h2>
          <p className="text-xs sm:text-sm text-[#736654] font-serif mt-1">
            Seleziona il motore di computazione per generare gli ordini da impartire al terminale del tuo calcolatore.
          </p>
        </div>

        <button
          onClick={downloadScriptFile}
          type="button"
          className="flex items-center gap-2 px-4 py-2 rounded bg-[#F4EFE6] hover:bg-[#EAE2D4] text-[#42382C] border border-[#CBBFA9] text-xs font-serif font-bold transition shadow-sm shrink-0"
        >
          <Download className="w-4 h-4 text-[#8B4513]" />
          <span>Salva Script (.{os === 'windows' ? 'ps1' : 'sh'})</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form (5 cols) */}
        <div className="lg:col-span-5 space-y-5 border border-[#DDD3C1] bg-[#FDFBF7] p-6 rounded shadow-sm">
          {/* Motore */}
          <div className="space-y-2">
            <label className="text-xs font-serif font-bold uppercase tracking-wider text-[#383025] block">
              1. Motore d'Inferenza Locale:
            </label>
            <div className="space-y-2">
              {[
                { 
                  id: 'ollama', 
                  title: 'Ollama (Raccomandato)', 
                  desc: 'Il più agevole. Gestione autonoma delle GPU e compatibilità nativa con lo standard OpenAI.',
                  tag: 'Standard'
                },
                { 
                  id: 'llama_cpp', 
                  title: 'llama.cpp Server', 
                  desc: 'Compilazione nativa in puro C++, massimo risparmio di risorse e quantizzazione estrema GGUF.',
                  tag: 'C++ Diretto'
                },
                { 
                  id: 'vllm', 
                  title: 'vLLM Engine', 
                  desc: 'Progettato per compiti continui e alto volume di richieste simultanee su stazioni di lavoro.',
                  tag: 'Flusso Continuo'
                },
                { 
                  id: 'docker_localai', 
                  title: 'LocalAI (Docker)', 
                  desc: 'Soluzione unificata in container per modelli di testo, trascrizione vocale e immagini.',
                  tag: 'Container'
                },
              ].map((m) => (
                <div
                  key={m.id}
                  onClick={() => {
                    const eng = m.id as any;
                    setEngine(eng);
                    if (eng === 'ollama') setPort(11434);
                    else if (eng === 'llama_cpp') setPort(8080);
                    else if (eng === 'vllm') setPort(8000);
                    else setPort(8080);
                  }}
                  className={`p-3 rounded border cursor-pointer transition-all ${
                    engine === m.id
                      ? 'bg-[#F4EFE6] border-[#8B4513] shadow-xs'
                      : 'bg-[#FAF8F5] border-[#E2D8C6] hover:bg-[#F4EFE6] text-[#554A3B]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-serif font-bold text-xs text-[#241F1A]">
                      {m.title}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#ECE3D4] text-[#695B47] border border-[#DACFBF]">
                      {m.tag}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#736756] font-serif mt-1">
                    {m.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Sistema Operativo */}
          <div className="space-y-1.5">
            <label className="text-xs font-serif font-bold uppercase tracking-wider text-[#383025] block">
              2. Sistema Operativo del Calcolatore:
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'windows', label: 'Windows' },
                { id: 'linux', label: 'Linux' },
                { id: 'macos', label: 'macOS' },
              ].map((o) => (
                <button
                  key={o.id}
                  type="button"
                  onClick={() => setOs(o.id as any)}
                  className={`py-2 px-3 rounded text-center text-xs font-serif font-bold border transition ${
                    os === o.id
                      ? 'bg-[#8B4513] text-[#FAF8F5] border-[#8B4513]'
                      : 'bg-[#FAF8F5] border-[#DDD2BE] text-[#5C5040] hover:bg-[#F2ECE0]'
                  }`}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </div>

          {/* Rete */}
          <div className="p-3.5 rounded bg-[#F8F4EC] border border-[#E8DEC9] space-y-3">
            <label className="text-xs font-serif font-bold uppercase tracking-wider text-[#383025] block">
              3. Modalità d'Ascolto sulla Rete:
            </label>

            <div className="flex items-start gap-2.5">
              <input
                id="lan-vintage-check"
                type="checkbox"
                checked={bindLan}
                onChange={(e) => setBindLan(e.target.checked)}
                className="mt-0.5 w-4 h-4 accent-[#8B4513]"
              />
              <label htmlFor="lan-vintage-check" className="text-xs font-serif text-[#3D3428] cursor-pointer">
                <span className="font-bold block">Abilita accesso da tutta la rete locale (0.0.0.0)</span>
                <span className="text-[#786B5A] text-[11px] block mt-0.5">
                  Consente l'interrogazione da smartphone, portatili e altri calcolatori collegati allo stesso apparato Wi-Fi.
                </span>
              </label>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#E5DAC6]">
              <span className="text-xs font-serif text-[#4E4334]">Porta designata:</span>
              <input
                type="number"
                value={port}
                onChange={(e) => setPort(parseInt(e.target.value, 10) || 11434)}
                className="w-20 bg-[#FAF8F5] border border-[#D5C9B5] text-[#241F1A] font-mono text-xs rounded px-2 py-1 text-center"
              />
            </div>
          </div>

          {/* Modello */}
          <div className="space-y-1">
            <label className="text-xs font-serif font-bold uppercase tracking-wider text-[#383025] block">
              4. Modello Iniziale:
            </label>
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="w-full bg-[#FAF8F5] border border-[#D5C9B5] text-[#241F1A] rounded px-3 py-2 text-xs font-serif focus:outline-none"
            >
              {POPULAR_MODELS.map((m) => (
                <option key={m.id} value={m.ollamaCommand.replace('ollama run ', '')}>
                  {m.name} ({m.minVramGB}GB VRAM)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Right Output Terminal & Code (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Phase 1: Installation */}
          <div className="border border-[#DDD3C1] bg-[#FDFBF7] rounded shadow-sm overflow-hidden">
            <div className="bg-[#F5EFE3] px-4 py-2.5 border-b border-[#E2D8C6] flex items-center justify-between">
              <span className="font-serif text-xs font-bold text-[#3B3226]">
                Fase I — Installazione & Istruzioni per {os.toUpperCase()}
              </span>
              <button
                onClick={() => handleCopy(scriptData.installCommand, 'install')}
                type="button"
                className="flex items-center gap-1 text-xs text-[#5C4F3F] hover:text-[#241F1A] px-2 py-0.5 rounded border border-[#DACFBF] bg-[#FAF8F5] transition"
              >
                {copiedInstall ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#2B5435]" />
                    <span className="text-[#2B5435] font-bold">Copiato!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#7A6D5B]" />
                    <span>Copia</span>
                  </>
                )}
              </button>
            </div>
            <pre className="p-4 text-xs font-typewriter text-[#241F1A] bg-[#FAF8F5] overflow-x-auto leading-relaxed border-b border-[#F0E8D8] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              <code>{scriptData.installCommand}</code>
            </pre>
          </div>

          {/* Phase 2: Start */}
          <div className="border border-[#DDD3C1] bg-[#FDFBF7] rounded shadow-sm overflow-hidden">
            <div className="bg-[#F5EFE3] px-4 py-2.5 border-b border-[#E2D8C6] flex items-center justify-between">
              <span className="font-serif text-xs font-bold text-[#3B3226]">
                Fase II — Avvio del Demone & Caricamento del Modello
              </span>
              <button
                onClick={() => handleCopy(scriptData.runCommand, 'run')}
                type="button"
                className="flex items-center gap-1 text-xs text-[#5C4F3F] hover:text-[#241F1A] px-2 py-0.5 rounded border border-[#DACFBF] bg-[#FAF8F5] transition"
              >
                {copiedRun ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#2B5435]" />
                    <span className="text-[#2B5435] font-bold">Copiato!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#7A6D5B]" />
                    <span>Copia</span>
                  </>
                )}
              </button>
            </div>
            <pre className="p-4 text-xs font-typewriter text-[#1F2F24] bg-[#FAF8F5] overflow-x-auto leading-relaxed [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              <code>{scriptData.runCommand}</code>
            </pre>
          </div>

          {/* Summary Details */}
          <div className="p-4 rounded bg-[#F8F4EC] border border-[#E8DEC9] space-y-2 text-xs font-serif text-[#4A4032]">
            <span className="font-bold text-[#241F1A] block">Indicazioni sull'Accesso:</span>
            <p className="leading-relaxed text-[#5C5040]">{scriptData.notes}</p>
            <div className="pt-2 font-mono text-[11px] text-[#8B4513] font-bold">
              URL Base: http://{bindLan ? '0.0.0.0' : '127.0.0.1'}:{port}/v1
            </div>
          </div>

          {/* Navigation Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              onClick={onGoToPlayground}
              type="button"
              className="py-2.5 px-4 rounded bg-[#8B4513] hover:bg-[#72380F] text-[#FAF8F5] font-serif text-xs font-bold transition shadow-sm text-center"
            >
              Testa l'API nel Banco di Prova →
            </button>
            <button
              onClick={onGoToLanClients}
              type="button"
              className="py-2.5 px-4 rounded bg-[#FAF8F5] hover:bg-[#F2ECE0] text-[#473D30] font-serif text-xs font-bold border border-[#D5C9B5] transition shadow-sm text-center"
            >
              Guida di Rete per Smartphone & LAN →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
