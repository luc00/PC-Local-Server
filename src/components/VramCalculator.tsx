import React, { useState } from 'react';
import { 
  Calculator, 
  Info
} from 'lucide-react';
import { calculateVramFormula } from '../utils/hardwareChecker.ts';

export const VramCalculator: React.FC = () => {
  const [paramsB, setParamsB] = useState<number>(8);
  const [quantBits, setQuantBits] = useState<number>(4);
  const [contextLength, setContextLength] = useState<number>(8192);

  const calc = calculateVramFormula(paramsB, quantBits, contextLength);

  return (
    <div className="space-y-8 pb-16">
      {/* Title */}
      <div className="border border-[#DDD3C1] bg-[#FDFBF7] p-6 sm:p-8 rounded shadow-sm">
        <div className="text-[10px] font-mono tracking-widest uppercase text-[#8B4513]">
          Appendice Matematica • Regolo di Calcolo Memoria
        </div>
        <h2 className="font-vintage-serif text-2xl sm:text-3xl font-bold text-[#241F1A] mt-1">
          Calcolo del Fabbisogno Esatto di VRAM
        </h2>
        <p className="text-xs sm:text-sm text-[#736654] font-serif mt-1">
          Stima matematica della memoria grafica necessaria per scongiurare arresti anomali per esaurimento risorse (OOM).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start font-serif">
        {/* Controls (6 cols) */}
        <div className="lg:col-span-6 space-y-6 border border-[#DDD3C1] bg-[#FDFBF7] p-6 rounded shadow-sm">
          {/* Parametri */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-[#383025]">
                1. Dimensione Modello (Miliardi di Parametri):
              </label>
              <span className="font-mono text-sm font-bold text-[#8B4513] bg-[#F4EFE6] px-2 py-0.5 rounded border border-[#DDD0BD]">
                {paramsB}B
              </span>
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5">
              {[3, 7, 8, 12, 14, 32, 70].map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() => setParamsB(b)}
                  className={`py-1.5 rounded text-xs font-mono font-medium border transition ${
                    paramsB === b
                      ? 'bg-[#8B4513] text-[#FAF8F5] border-[#8B4513] font-bold'
                      : 'bg-[#FAF8F5] text-[#554A3B] border-[#D5C9B5] hover:bg-[#F2ECE0]'
                  }`}
                >
                  {b}B
                </button>
              ))}
            </div>
          </div>

          {/* Quantizzazione */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-[#383025]">
                2. Grado di Quantizzazione:
              </label>
              <span className="font-mono text-sm font-bold text-[#2B5435] bg-[#EBF3EC] px-2 py-0.5 rounded border border-[#C2DBC5]">
                {quantBits} Bit
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { bits: 4, name: '4-bit (Standard)', note: 'Consigliata' },
                { bits: 5, name: '5-bit', note: 'Qualità extra' },
                { bits: 8, name: '8-bit', note: 'Doppio peso' },
                { bits: 16, name: '16-bit (FP16)', note: 'Intero' },
              ].map((q) => (
                <button
                  key={q.bits}
                  type="button"
                  onClick={() => setQuantBits(q.bits)}
                  className={`p-2 rounded text-left border text-xs transition ${
                    quantBits === q.bits
                      ? 'bg-[#F2ECE0] border-[#8B4513] text-[#241F1A] font-bold'
                      : 'bg-[#FAF8F5] text-[#695D4D] border-[#D5C9B5] hover:bg-[#F2ECE0]'
                  }`}
                >
                  <div className="font-serif font-semibold">{q.name}</div>
                  <div className="text-[10px] text-[#8C7E6C] font-mono">{q.note}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Finestra di Contesto */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-[#383025]">
                3. Finestra di Contesto (Token Memorizzabili):
              </label>
              <span className="font-mono text-sm font-bold text-[#241F1A] bg-[#F4EFE6] px-2 py-0.5 rounded border border-[#DDD0BD]">
                {contextLength >= 1024 ? `${contextLength / 1024}k` : contextLength} Token
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { len: 4096, label: '4k (Veloce)' },
                { len: 8192, label: '8k (Standard)' },
                { len: 16384, label: '16k' },
                { len: 32768, label: '32k' },
              ].map((c) => (
                <button
                  key={c.len}
                  type="button"
                  onClick={() => setContextLength(c.len)}
                  className={`py-1.5 px-2 rounded text-center text-xs border font-serif transition ${
                    contextLength === c.len
                      ? 'bg-[#8B4513] text-[#FAF8F5] border-[#8B4513] font-bold'
                      : 'bg-[#FAF8F5] text-[#554A3B] border-[#D5C9B5] hover:bg-[#F2ECE0]'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Formula */}
          <div className="p-3 rounded bg-[#F8F4EC] border border-[#E8DEC9] text-xs space-y-1">
            <span className="font-bold text-[#3D3428] block">Relazione Algebrica:</span>
            <code className="text-[#8B4513] font-typewriter text-[11px] block">
              VRAM = (Parametri × Bits / 8) × 1.2 + KV_Cache_Contesto
            </code>
          </div>
        </div>

        {/* Results (6 cols) */}
        <div className="lg:col-span-6 space-y-5 border border-[#DDD3C1] bg-[#FDFBF7] p-6 rounded shadow-sm">
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#7C6E5C] block">
            Computo Finale della Memoria Video
          </span>

          {/* Hero VRAM */}
          <div className="bg-[#FAF8F5] border border-[#E2D8C6] p-5 rounded flex items-center justify-between">
            <div>
              <span className="text-xs text-[#6B5E4D] block">VRAM Minima Necessaria:</span>
              <span className="text-3xl sm:text-4xl font-mono font-bold text-[#8B4513]">
                {calc.totalVramGB} <span className="text-lg text-[#241F1A]">GB</span>
              </span>
            </div>

            <div className="text-right">
              <span className="text-[11px] text-[#6B5E4D] block">Scheda Consigliata:</span>
              <span className="text-xs font-serif font-bold text-[#2B5435] bg-[#EBF3EC] px-2.5 py-1 rounded border border-[#C5DDC8] inline-block mt-1">
                {calc.totalVramGB <= 8 ? 'Scheda 8 GB (RTX 4060)' :
                 calc.totalVramGB <= 12 ? 'Scheda 12 GB (RTX 3060/4070)' :
                 calc.totalVramGB <= 16 ? 'Scheda 16 GB (RTX 4080)' :
                 calc.totalVramGB <= 24 ? 'Scheda 24 GB (RTX 3090/4090)' :
                 'Doppia GPU 48GB / Mac 64GB+'}
              </span>
            </div>
          </div>

          {/* Breakdown items */}
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-3 rounded bg-[#FAF8F5] border border-[#E2D8C6]">
              <div>
                <span className="font-bold text-[#241F1A] block">Pesi del Modello:</span>
                <span className="text-[11px] text-[#786D5D]">Parametri compressi con quota overhead</span>
              </div>
              <span className="font-mono text-sm font-bold text-[#8B4513]">
                {calc.weightsVramGB} GB
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded bg-[#FAF8F5] border border-[#E2D8C6]">
              <div>
                <span className="font-bold text-[#241F1A] block">Cache KV del Contesto ({contextLength} token):</span>
                <span className="text-[11px] text-[#786D5D]">Memoria temporanea per le risposte lunghe</span>
              </div>
              <span className="font-mono text-sm font-bold text-[#2B5435]">
                {calc.kvCacheVramGB} GB
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded bg-[#F8F4EC] border border-[#E8DEC9] text-xs text-[#524637] leading-relaxed italic">
            «Consiglio pratico: per calcolatori con schede video da 8 GB (come raccomandato per la fascia base), si consiglia di mantenere la finestra di contesto entro gli 8.192 token per preservare margine operativo.»
          </div>
        </div>
      </div>
    </div>
  );
};
