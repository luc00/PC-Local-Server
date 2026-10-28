import React, { useState } from 'react';
import { 
  Layers, 
  Search, 
  Copy, 
  Check, 
  Download, 
  Cpu, 
  Zap, 
  HardDrive
} from 'lucide-react';
import { POPULAR_MODELS, ModelSpec } from '../utils/hardwareChecker.ts';

export const ModelCatalog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTier, setSelectedTier] = useState<'all' | 'base' | 'intermedio' | 'avanzato'>('all');
  const [selectedUseCase, setSelectedUseCase] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredModels = POPULAR_MODELS.filter((m) => {
    const matchesSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          m.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          m.family.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTier = selectedTier === 'all' || m.tier === selectedTier;
    const matchesUseCase = selectedUseCase === 'all' || m.useCase === selectedUseCase;
    return matchesSearch && matchesTier && matchesUseCase;
  });

  const handleCopyCommand = (id: string, cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Title */}
      <div className="border border-[#DDD3C1] bg-[#FDFBF7] p-6 sm:p-8 rounded shadow-sm">
        <div className="text-[10px] font-mono tracking-widest uppercase text-[#8B4513]">
          Capitolo III • Repertorio dei Modelli
        </div>
        <h2 className="font-vintage-serif text-2xl sm:text-3xl font-bold text-[#241F1A] mt-1">
          Catalogo Ragionato dei Modelli per Server Locale
        </h2>
        <p className="text-xs sm:text-sm text-[#736654] font-serif mt-1">
          Ciascun modello è classificato secondo il fabbisogno di memoria video (VRAM) e la destinazione d'uso.
        </p>
      </div>

      {/* Filters Bar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 bg-[#FDFBF7] p-4 rounded border border-[#DDD3C1] shadow-sm">
        {/* Search */}
        <div className="md:col-span-5 relative">
          <Search className="w-4 h-4 text-[#8C7D6B] absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cerca modello per nome o compito..."
            className="w-full pl-9 pr-3 py-1.5 bg-[#FAF8F5] border border-[#D5C9B5] text-[#241F1A] rounded text-xs font-serif focus:outline-none placeholder-[#A39582]"
          />
        </div>

        {/* Tier Filter */}
        <div className="md:col-span-4 flex items-center gap-1 bg-[#F5EFE3] p-1 rounded border border-[#E2D8C6] overflow-x-auto text-xs font-serif [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {[
            { id: 'all', label: 'Tutti' },
            { id: 'base', label: 'Base (≤8GB)' },
            { id: 'intermedio', label: 'Medio (12-24GB)' },
            { id: 'avanzato', label: 'Avanzato (32GB+)' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setSelectedTier(t.id as any)}
              className={`flex-1 py-1 px-2 rounded font-medium whitespace-nowrap transition text-center ${
                selectedTier === t.id
                  ? 'bg-[#FAF8F5] text-[#8B4513] font-bold shadow-xs'
                  : 'text-[#695D4D] hover:text-[#241F1A]'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Use Case */}
        <div className="md:col-span-3">
          <select
            value={selectedUseCase}
            onChange={(e) => setSelectedUseCase(e.target.value)}
            className="w-full bg-[#FAF8F5] border border-[#D5C9B5] text-[#241F1A] rounded px-3 py-1.5 text-xs font-serif focus:outline-none"
          >
            <option value="all">Tutti i Compiti</option>
            <option value="ragionamento">Ragionamento Logico</option>
            <option value="codice">Programmazione & Codice</option>
            <option value="chat_generale">Conversazione Generale</option>
            <option value="visione">Analisi Immagini & Visione</option>
            <option value="embedding">Ricerca & Embedding RAG</option>
          </select>
        </div>
      </div>

      {/* Models Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredModels.map((model) => (
          <div
            key={model.id}
            className="border border-[#DDD3C1] bg-[#FDFBF7] rounded p-5 flex flex-col justify-between shadow-sm hover:border-[#B5A58D] transition-colors"
          >
            <div className="space-y-3 font-serif">
              {/* Header Badges */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#7A6D5B] bg-[#F4EFE6] px-2 py-0.5 rounded border border-[#E0D5C3]">
                  {model.family}
                </span>

                <span className={`text-[10px] font-serif font-bold px-2 py-0.5 rounded border ${
                  model.tier === 'base'
                    ? 'bg-[#EBF3EC] text-[#2B5435] border-[#C2DBC5]'
                    : model.tier === 'intermedio'
                    ? 'bg-[#F2ECE0] text-[#8B4513] border-[#DACDB9]'
                    : 'bg-[#F5EAE6] text-[#8B3A22] border-[#E2CBC3]'
                }`}>
                  {model.tier === 'base' ? 'Fascia Base' : model.tier === 'intermedio' ? 'Fascia Media' : 'Avanzato 70B+'}
                </span>
              </div>

              {/* Title & Description */}
              <div>
                <h3 className="font-vintage-serif text-lg font-bold text-[#241F1A]">
                  {model.name}
                </h3>
                <p className="text-xs text-[#5C5040] mt-1 line-clamp-2 leading-relaxed">
                  {model.description}
                </p>
              </div>

              {/* Memory Specs */}
              <div className="grid grid-cols-3 gap-2 py-2 border-y border-[#EDE4D4] text-center text-xs">
                <div className="bg-[#FAF8F5] p-2 rounded border border-[#E8DFC9]">
                  <span className="text-[10px] text-[#7A6D5B] block font-serif">VRAM Min</span>
                  <span className="font-mono font-bold text-[#8B4513]">
                    {model.minVramGB} GB
                  </span>
                </div>
                <div className="bg-[#FAF8F5] p-2 rounded border border-[#E8DFC9]">
                  <span className="text-[10px] text-[#7A6D5B] block font-serif">RAM PC</span>
                  <span className="font-mono font-bold text-[#2B5435]">
                    {model.minRamGB} GB
                  </span>
                </div>
                <div className="bg-[#FAF8F5] p-2 rounded border border-[#E8DFC9]">
                  <span className="text-[10px] text-[#7A6D5B] block font-serif">Peso File</span>
                  <span className="font-mono font-bold text-[#473D30]">
                    {model.diskSizeGB} GB
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-[#695D4C]">
                <span>Quantizzazione consigliata:</span>
                <span className="font-mono text-[#241F1A] bg-[#F2EDE2] px-1.5 py-0.5 rounded border border-[#D5C9B5]">
                  {model.defaultQuant}
                </span>
              </div>
            </div>

            {/* Run Command & Copy */}
            <div className="mt-4 pt-3 border-t border-[#EDE4D4] space-y-2">
              <div className="flex items-center justify-between bg-[#F7F3EB] px-2.5 py-1.5 rounded border border-[#DFD3BE]">
                <code className="text-[11px] font-typewriter text-[#241F1A] truncate mr-2">
                  {model.ollamaCommand}
                </code>
                <button
                  onClick={() => handleCopyCommand(model.id, model.ollamaCommand)}
                  type="button"
                  title="Copia comando"
                  className="p-1 rounded text-[#7A6D5B] hover:text-[#241F1A] transition"
                >
                  {copiedId === model.id ? (
                    <Check className="w-3.5 h-3.5 text-[#2B5435]" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
