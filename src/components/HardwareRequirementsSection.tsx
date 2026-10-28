import React, { useState } from 'react';
import { 
  Cpu, 
  HardDrive, 
  Zap, 
  CheckCircle, 
  AlertTriangle, 
  Info, 
  ArrowRight, 
  Sparkles, 
  Sliders, 
  Server,
  BookOpen,
  Check,
  Compass
} from 'lucide-react';
import { 
  HardwareSpecs, 
  evaluateHardware, 
  CompatibilityResult 
} from '../utils/hardwareChecker.ts';

interface HardwareRequirementsSectionProps {
  onGoToConfigurator: () => void;
  onGoToModels: () => void;
}

export const HardwareRequirementsSection: React.FC<HardwareRequirementsSectionProps> = ({
  onGoToConfigurator,
  onGoToModels,
}) => {
  const [specs, setSpecs] = useState<HardwareSpecs>({
    gpuVendor: 'nvidia',
    gpuModel: 'NVIDIA GeForce RTX 4060 (8 GB)',
    vramGB: 8,
    ramGB: 16,
    storageType: 'nvme_ssd',
    storageFreeGB: 80,
    os: 'windows',
  });

  const evaluation: CompatibilityResult = evaluateHardware(specs);

  const applyPreset = (preset: 'base' | 'workstation' | 'apple' | 'minipc') => {
    if (preset === 'base') {
      setSpecs({
        gpuVendor: 'nvidia',
        gpuModel: 'NVIDIA GeForce RTX 4060 / 3060 (8-12 GB)',
        vramGB: 8,
        ramGB: 16,
        storageType: 'nvme_ssd',
        storageFreeGB: 100,
        os: 'windows',
      });
    } else if (preset === 'workstation') {
      setSpecs({
        gpuVendor: 'nvidia',
        gpuModel: 'NVIDIA RTX 3090 / 4090 (24 GB) o Doppia GPU',
        vramGB: 24,
        ramGB: 64,
        storageType: 'nvme_ssd',
        storageFreeGB: 400,
        os: 'linux',
      });
    } else if (preset === 'apple') {
      setSpecs({
        gpuVendor: 'apple',
        gpuModel: 'Apple Mac Studio / MacBook Pro (M-Series Unified RAM)',
        vramGB: 0,
        ramGB: 64,
        storageType: 'nvme_ssd',
        storageFreeGB: 500,
        os: 'macos',
      });
    } else {
      setSpecs({
        gpuVendor: 'cpu_only',
        gpuModel: 'Solo CPU (Intel Core / AMD Ryzen con grafica integrata)',
        vramGB: 0,
        ramGB: 16,
        storageType: 'sata_ssd',
        storageFreeGB: 30,
        os: 'windows',
      });
    }
  };

  return (
    <div className="space-y-10 pb-16">
      {/* Editorial Header / Intro Note */}
      <div className="border border-[#DDD3C1] bg-[#FDFBF7] p-6 sm:p-8 rounded shadow-sm relative">
        <div className="max-w-3xl space-y-3">
          <div className="inline-block text-[11px] font-mono tracking-widest uppercase text-[#8B4513] border-b border-[#D8C7B0] pb-0.5">
            Manoscritto & Regolamento Tecnico
          </div>
          <h1 className="font-vintage-serif text-3xl sm:text-4xl text-[#241F1A] font-bold leading-tight">
            I Requisiti per Trasformare un Calcolatore in un Server AI Locale
          </h1>
          <p className="text-[#594E40] font-serif text-sm sm:text-base leading-relaxed italic">
            «Condurre l'elaborazione dei modelli di intelligenza artificiale sul proprio calcolatore domestico o d'ufficio preserva la segretezza dei dati, abolisce qualsiasi tributo verso servizi remoti e costituisce un presidio di computazione sovrana accessibile via rete locale.»
          </p>
        </div>
      </div>

      {/* Primary Hardware Requirements (Exact reproduction in classic vintage editorial layout) */}
      <section aria-labelledby="requisiti-hardware-heading" className="border border-[#DDD3C1] bg-[#FDFBF7] p-6 sm:p-8 rounded shadow-sm space-y-6">
        <div className="border-b border-[#E8DFC9] pb-4 flex items-center justify-between">
          <div>
            <h2 id="requisiti-hardware-heading" className="font-vintage-serif text-2xl font-bold text-[#241F1A]">
              1. Requisiti hardware minimi e consigliati
            </h2>
            <p className="text-xs text-[#7A6F5E] font-serif mt-1">
              Estratto dalle direttive di dimensionamento per modelli linguistici a pesi aperti.
            </p>
          </div>
          <span className="text-[11px] font-mono text-[#8C7B65] bg-[#F5EFE3] px-2.5 py-1 rounded border border-[#DFD3BE] hidden sm:inline-block">
            SPECIFICHE 2026
          </span>
        </div>

        {/* The Exact Document Content Styled Beautifully */}
        <div className="space-y-6 font-serif text-[#2C261F] text-sm sm:text-[15px] leading-relaxed max-w-4xl">
          {/* VRAM item */}
          <div className="space-y-3">
            <div className="flex items-start gap-2.5">
              <span className="text-[#8B4513] font-bold text-lg leading-none mt-0.5">•</span>
              <div>
                <span className="font-bold text-[#1E1A16]">VRAM (Memoria della scheda video):</span>
                <span> È il fattore più critico. Il modello AI deve poter essere caricato (totalmente o in gran parte) nella VRAM della GPU.</span>
              </div>
            </div>

            {/* Sub-bullets */}
            <div className="ml-6 sm:ml-8 space-y-2.5 text-xs sm:text-sm text-[#473E33]">
              <div className="flex items-start gap-2.5 p-3 rounded bg-[#F8F4EC] border border-[#E8DEC9]">
                <span className="text-[#8B4513] font-bold text-base leading-none mt-0.5">◦</span>
                <div>
                  <span className="italic font-semibold text-[#241F1A]">Base (modelli da 3B a 8B):</span>
                  <span> Almeno <strong>8 GB di VRAM</strong> (es. NVIDIA RTX 3060/4060 o equivalenti). Ideale per compiti quotidiani, scrittura ed elaborazione rapida.</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded bg-[#F8F4EC] border border-[#E8DEC9]">
                <span className="text-[#8B4513] font-bold text-base leading-none mt-0.5">◦</span>
                <div>
                  <span className="italic font-semibold text-[#241F1A]">Intermedio/Avanzato (modelli da 30B a 70B+):</span>
                  <span> Richiede <strong>32 GB, 64 GB o più</strong> (spesso ottenuti con GPU multiple come doppie RTX 3090/4090 o sistemi unificati ad alta memoria RAM come i chip Apple Silicon o piattaforme AMD Ryzen AI Max).</span>
                </div>
              </div>
            </div>
          </div>

          {/* System RAM item */}
          <div className="flex items-start gap-2.5 pt-1">
            <span className="text-[#8B4513] font-bold text-lg leading-none mt-0.5">•</span>
            <div>
              <span className="font-bold text-[#1E1A16]">RAM di sistema:</span>
              <span> Almeno <strong>16 GB</strong> (consigliati <strong>32 GB o 64+ GB</strong> se usi modelli pesanti o memoria condivisa). Necessaria per impedire il blocco del sistema durante l'offload dei pesi.</span>
            </div>
          </div>

          {/* Storage item */}
          <div className="flex items-start gap-2.5 pt-1">
            <span className="text-[#8B4513] font-bold text-lg leading-none mt-0.5">•</span>
            <div>
              <span className="font-bold text-[#1E1A16]">Storage:</span>
              <span> Unità <strong>SSD NVMe veloce</strong>, poiché i file dei modelli AI pesano da pochi gigabyte fino a decine di gigabyte. Un disco tradizionale ritarderebbe l'avvio a freddo di svariati minuti.</span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Evaluation Ledger (Minimalist Vintage Instrument) */}
      <section aria-labelledby="perizia-calcolatore-heading" className="border border-[#DDD3C1] bg-[#FDFBF7] p-6 sm:p-8 rounded shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8DFC9] pb-4">
          <div>
            <div className="text-[10px] font-mono tracking-widest uppercase text-[#8B4513]">
              Audit Interattivo • Strumento di Stima
            </div>
            <h2 id="perizia-calcolatore-heading" className="font-vintage-serif text-2xl font-bold text-[#241F1A] mt-0.5">
              Verifica se il Tuo Computer è Pronto
            </h2>
            <p className="text-xs text-[#7A6F5E] font-serif mt-1">
              Imposta le caratteristiche del tuo hardware per ricevere una perizia istantanea.
            </p>
          </div>

          {/* Presets */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs font-serif">
            <span className="text-[#8A7C6B] text-[11px] mr-1">Profili d'esempio:</span>
            <button
              onClick={() => applyPreset('base')}
              type="button"
              className="px-2.5 py-1 rounded border border-[#D5C9B5] bg-[#F5EFE3] hover:bg-[#EAE2D2] text-[#473E33] transition"
            >
              PC Base (8GB VRAM)
            </button>
            <button
              onClick={() => applyPreset('workstation')}
              type="button"
              className="px-2.5 py-1 rounded border border-[#D5C9B5] bg-[#F5EFE3] hover:bg-[#EAE2D2] text-[#473E33] transition"
            >
              Workstation (24GB)
            </button>
            <button
              onClick={() => applyPreset('apple')}
              type="button"
              className="px-2.5 py-1 rounded border border-[#D5C9B5] bg-[#F5EFE3] hover:bg-[#EAE2D2] text-[#473E33] transition"
            >
              Mac Studio (64GB)
            </button>
            <button
              onClick={() => applyPreset('minipc')}
              type="button"
              className="px-2.5 py-1 rounded border border-[#D5C9B5] bg-[#F5EFE3] hover:bg-[#EAE2D2] text-[#473E33] transition"
            >
              Solo CPU
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            {/* GPU Architecture */}
            <div className="space-y-2">
              <label className="text-xs font-serif font-bold uppercase tracking-wider text-[#3D352B] block">
                Architettura Grafica o Processore:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'nvidia', label: 'NVIDIA CUDA', note: 'Compatibilità totale' },
                  { id: 'apple', label: 'Apple Silicon', note: 'Metal Unified RAM' },
                  { id: 'amd', label: 'AMD ROCm', note: 'Radeon RDNA' },
                  { id: 'cpu_only', label: 'Solo CPU / Intel', note: 'Calcolo x86/AVX' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      const v = item.id as HardwareSpecs['gpuVendor'];
                      setSpecs({ 
                        ...specs, 
                        gpuVendor: v,
                        vramGB: v === 'apple' ? 0 : v === 'cpu_only' ? 0 : specs.vramGB === 0 ? 8 : specs.vramGB
                      });
                    }}
                    className={`p-2.5 rounded text-left border text-xs transition-all ${
                      specs.gpuVendor === item.id
                        ? 'bg-[#F2ECE0] border-[#8B4513] text-[#241F1A] font-semibold'
                        : 'bg-[#F9F6F0] border-[#E0D5C1] text-[#695D4D] hover:bg-[#F2ECE0]'
                    }`}
                  >
                    <div className="font-serif font-bold text-[#241F1A]">{item.label}</div>
                    <div className="text-[10px] text-[#8C7E6C] mt-0.5">{item.note}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* VRAM Slider */}
            {specs.gpuVendor !== 'apple' && specs.gpuVendor !== 'cpu_only' ? (
              <div className="p-4 rounded bg-[#F8F4EC] border border-[#E8DEC9] space-y-2.5">
                <div className="flex items-center justify-between">
                  <div>
                    <label htmlFor="vram-slider-vintage" className="text-xs font-serif font-bold text-[#241F1A]">
                      Memoria Dedicata VRAM della Scheda Video:
                    </label>
                    <p className="text-[11px] text-[#7A6E5C] font-serif">
                      Base raccomandata: almeno 8 GB. Avanzata: 24 - 48 GB.
                    </p>
                  </div>
                  <span className="font-mono text-sm font-bold text-[#8B4513] bg-[#EFE7D8] px-2.5 py-0.5 rounded border border-[#D5C6AF]">
                    {specs.vramGB} GB
                  </span>
                </div>
                <input
                  id="vram-slider-vintage"
                  type="range"
                  min="2"
                  max="48"
                  step="2"
                  value={specs.vramGB}
                  onChange={(e) => setSpecs({ ...specs, vramGB: parseInt(e.target.value, 10) })}
                  className="w-full accent-[#8B4513] h-1.5 bg-[#DDD3C1] rounded cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-[#8C7E6C]">
                  <span>4 GB (min)</span>
                  <span>8 GB (Base)</span>
                  <span>16 GB</span>
                  <span>24 GB</span>
                  <span>48 GB</span>
                </div>
              </div>
            ) : specs.gpuVendor === 'apple' ? (
              <div className="p-3.5 rounded bg-[#F4EFE6] border border-[#DDD0BC] text-xs font-serif text-[#4A4032]">
                <strong>Nota Apple Silicon:</strong> Impiega la memoria unificata condivisa con bus ad alta velocità (Metal). Ollama allocherà dinamicamente la quota necessaria.
              </div>
            ) : (
              <div className="p-3.5 rounded bg-[#FBF1EA] border border-[#E8D0C0] text-xs font-serif text-[#663A22]">
                <strong>Nota Solo CPU:</strong> Senza scheda video dedicata, l'inferenza avverrà interamente sulla CPU. Sarà possibile usare modelli da 3B-7B con velocità ridotta (3-8 tok/s).
              </div>
            )}

            {/* System RAM */}
            <div className="p-4 rounded bg-[#F8F4EC] border border-[#E8DEC9] space-y-2.5">
              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="ram-slider-vintage" className="text-xs font-serif font-bold text-[#241F1A]">
                    RAM di Sistema del PC:
                  </label>
                  <p className="text-[11px] text-[#7A6E5C] font-serif">
                    Minimo necessario: 16 GB. Raccomandati per server continuo: 32 - 64 GB.
                  </p>
                </div>
                <span className="font-mono text-sm font-bold text-[#2B5435] bg-[#E8EFE8] px-2.5 py-0.5 rounded border border-[#C2D8C3]">
                  {specs.ramGB} GB
                </span>
              </div>
              <input
                id="ram-slider-vintage"
                type="range"
                min="8"
                max="128"
                step="8"
                value={specs.ramGB}
                onChange={(e) => setSpecs({ ...specs, ramGB: parseInt(e.target.value, 10) })}
                className="w-full accent-[#2B5435] h-1.5 bg-[#DDD3C1] rounded cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-[#8C7E6C]">
                <span>8 GB</span>
                <span>16 GB (Minimo)</span>
                <span>32 GB</span>
                <span>64 GB</span>
                <span>128 GB</span>
              </div>
            </div>

            {/* Storage and OS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-serif font-bold text-[#3D352B] block">
                  Tipologia Disco:
                </label>
                <select
                  value={specs.storageType}
                  onChange={(e) => setSpecs({ ...specs, storageType: e.target.value as any })}
                  className="w-full bg-[#FAF8F5] border border-[#D5C9B5] text-[#241F1A] rounded px-3 py-2 text-xs font-serif focus:outline-none"
                >
                  <option value="nvme_ssd">SSD NVMe (Raccomandato)</option>
                  <option value="sata_ssd">SSD SATA (Accettabile)</option>
                  <option value="hdd">Disco Meccanico (Lento)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-serif font-bold text-[#3D352B] block">
                  Sistema Operativo:
                </label>
                <select
                  value={specs.os}
                  onChange={(e) => setSpecs({ ...specs, os: e.target.value as any })}
                  className="w-full bg-[#FAF8F5] border border-[#D5C9B5] text-[#241F1A] rounded px-3 py-2 text-xs font-serif focus:outline-none"
                >
                  <option value="windows">Windows 10 / 11</option>
                  <option value="linux">Linux (Debian / Ubuntu / Arch)</option>
                  <option value="macos">macOS (Apple Silicon)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results Ledger Card (5 cols) */}
          <div className="lg:col-span-5 bg-[#F6F1E6] rounded border border-[#D8CCB7] p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-[#E0D5BF] pb-2.5">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#7C6E5C]">
                Esito della Perizia
              </span>
              <span className="font-serif text-xs font-bold text-[#8B4513] bg-[#EFE7D7] px-2.5 py-0.5 rounded border border-[#D6C6AD]">
                {evaluation.tier}
              </span>
            </div>

            {/* Score in classic print style */}
            <div className="bg-[#FAF8F5] p-3.5 rounded border border-[#E2D8C6] flex items-center justify-between">
              <div>
                <span className="text-xs font-serif text-[#6D604E] block">Grado di Idoneità:</span>
                <span className="font-mono text-2xl font-bold text-[#241F1A]">
                  {evaluation.score} <span className="text-xs text-[#8A7C6A] font-normal">/ 100</span>
                </span>
              </div>
              <div className="text-right text-xs font-serif">
                <span className="text-[#6D604E] block">Condizione VRAM:</span>
                <span className="font-bold capitalize text-[#8B4513]">{evaluation.vramStatus}</span>
              </div>
            </div>

            <p className="text-xs font-serif text-[#4A4033] leading-relaxed italic bg-[#FAF8F5] p-3 rounded border border-[#E2D8C6]">
              «{evaluation.summary}»
            </p>

            {/* Runnable Models preview */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-serif font-bold text-[#42392E] block">
                Modelli Consigliati per Questa Macchina:
              </span>
              <div className="space-y-1">
                {evaluation.runnableModels.slice(0, 4).map(({ model, estimatedTokSec }) => (
                  <div key={model.id} className="p-2 rounded bg-[#FAF8F5] border border-[#E2D8C6] flex items-center justify-between text-xs font-serif">
                    <div>
                      <span className="font-bold text-[#241F1A]">{model.name}</span>
                      <span className="text-[10px] text-[#7C705E] block font-mono">{model.defaultQuant} • {model.minVramGB}GB VRAM</span>
                    </div>
                    <span className="font-mono text-[11px] font-bold text-[#2B5435] bg-[#EBF3EC] px-2 py-0.5 rounded border border-[#C5DDC8]">
                      {estimatedTokSec}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-2 space-y-2">
              <button
                onClick={onGoToConfigurator}
                type="button"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded bg-[#8B4513] hover:bg-[#72380F] text-[#FAF8F5] font-serif text-xs font-bold transition shadow-sm"
              >
                <span>Genera Script di Installazione Server</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={onGoToModels}
                type="button"
                className="w-full py-2 px-3 rounded bg-[#FAF8F5] hover:bg-[#F2ECE0] text-[#554A3B] text-xs font-serif border border-[#D5C9B5] transition text-center"
              >
                Sfoglia il Catalogo dei Modelli
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Classical Reference Table */}
      <section aria-labelledby="tabella-fasce-heading" className="space-y-3">
        <h3 id="tabella-fasce-heading" className="font-vintage-serif text-xl font-bold text-[#241F1A]">
          Compendio Sinottico delle Fasce di Modelli
        </h3>
        <div className="border border-[#DDD3C1] bg-[#FDFBF7] rounded overflow-x-auto shadow-sm [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <table className="w-full text-left text-xs font-serif">
            <thead className="bg-[#F5EFE3] text-[#473D30] font-bold border-b border-[#E2D8C6] uppercase tracking-wider text-[11px]">
              <tr>
                <th className="p-3">Fascia</th>
                <th className="p-3">Modelli Esempio</th>
                <th className="p-3">VRAM Richiesta</th>
                <th className="p-3">RAM di Sistema</th>
                <th className="p-3">Unità Disco</th>
                <th className="p-3">Destinazione d'Uso</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EFE7D8] text-[#3D352B]">
              <tr className="hover:bg-[#F8F4EC]">
                <td className="p-3 font-bold text-[#8B4513]">Base</td>
                <td className="p-3 font-mono text-[11px]">Llama 3.2 3B, Qwen 2.5 3B</td>
                <td className="p-3 font-mono font-bold text-[#2B5435]">4 - 6 GB</td>
                <td className="p-3 font-mono">8 - 16 GB</td>
                <td className="p-3">SSD (≥ 15 GB)</td>
                <td className="p-3">Laptop e calcolatori personali senza GPU pesante</td>
              </tr>
              <tr className="hover:bg-[#F8F4EC]">
                <td className="p-3 font-bold text-[#8B4513]">Consigliata</td>
                <td className="p-3 font-mono text-[11px]">Llama 3.1 8B, DeepSeek R1 8B</td>
                <td className="p-3 font-mono font-bold text-[#2B5435]">8 - 12 GB</td>
                <td className="p-3 font-mono">16 - 32 GB</td>
                <td className="p-3">SSD NVMe (≥ 30 GB)</td>
                <td className="p-3">Lavoro quotidiano, scrittura codice e ragionamento</td>
              </tr>
              <tr className="hover:bg-[#F8F4EC]">
                <td className="p-3 font-bold text-[#8B4513]">Intermedia</td>
                <td className="p-3 font-mono text-[11px]">Qwen Coder 14B/32B, Mistral NeMo</td>
                <td className="p-3 font-mono font-bold text-[#2B5435]">16 - 24 GB</td>
                <td className="p-3 font-mono">32 - 64 GB</td>
                <td className="p-3">SSD NVMe (≥ 60 GB)</td>
                <td className="p-3">Sviluppo avanzato e programmazione su larga scala</td>
              </tr>
              <tr className="hover:bg-[#F8F4EC]">
                <td className="p-3 font-bold text-[#8B4513]">Avanzata / 70B+</td>
                <td className="p-3 font-mono text-[11px]">Llama 3.3 70B, DeepSeek R1 70B</td>
                <td className="p-3 font-mono font-bold text-[#2B5435]">40 - 64+ GB</td>
                <td className="p-3 font-mono">64 - 128 GB</td>
                <td className="p-3">SSD NVMe (≥ 100 GB)</td>
                <td className="p-3">Stazioni di lavoro, laboratori e server aziendali</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
