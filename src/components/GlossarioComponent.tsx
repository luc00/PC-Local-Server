import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Cpu, 
  Zap, 
  Database, 
  Layers, 
  Sparkles, 
  HelpCircle,
  ExternalLink,
  Sliders,
  Check
} from 'lucide-react';

export interface GlossarioTerm {
  id: string;
  term: string;
  originalTerm?: string;
  category: 'memoria' | 'architettura' | 'prestazioni' | 'software';
  shortDesc: string;
  fullDesc: string;
  formulaOrExample?: string;
  whyItMatters: string;
}

export const GLOSSARIO_TERMS: GlossarioTerm[] = [
  {
    id: 'vram',
    term: 'VRAM (Video Random Access Memory)',
    originalTerm: 'Memoria Grafica Dedicata',
    category: 'memoria',
    shortDesc: 'La memoria ultra-rapida alloggiata sul circuito stampato della scheda video (GPU).',
    fullDesc: 'A differenza della RAM del computer, la VRAM vanta canali di comunicazione con larghezze di banda che superano i 500-1000 GB/s. Poiché un modello AI deve scorrere miliardi di parametri per generare ciascun token, disporre dell\'intero modello in VRAM è il fattore determinante tra una velocità fluida (30-60+ token/s) e una lenta (2-6 token/s).',
    whyItMatters: 'Se la VRAM è inferiore alla somma dei pesi del modello e del buffer di contesto, il server incorre in Out Of Memory (OOM) o deve riversare i calcoli sulla CPU.',
    formulaOrExample: 'Esempio: NVIDIA RTX 4060 (8GB), RTX 3090 (24GB), RTX 4090 (24GB).'
  },
  {
    id: 'quantizzazione',
    term: 'Quantizzazione (Quantization)',
    originalTerm: 'Precisione Numerica dei Pesi (4-bit, 8-bit, 16-bit)',
    category: 'architettura',
    shortDesc: 'Compressione algoritmica dei numeri che rappresentano i pesi del modello neuronale.',
    fullDesc: 'I modelli linguistici vengono addestrati originariamente a 16 bit a virgola mobile (FP16 o BF16, dove ogni parametro pesa 2 byte). La quantizzazione riduce questa precisione a 8 bit (1 byte) o 4 bit (0.5 byte, es. Q4_K_M). Questa riduzione comprime un modello da 8 miliardi di parametri da 16 GB a circa 4.9 GB, permettendo di ospitarlo su una normale scheda video domestica.',
    whyItMatters: 'Permette di ridurre l\'uso di memoria fino al 70% con una perdita di ragionamento ed accuratezza trascurabile (inferiore al 2-3%).',
    formulaOrExample: 'Q4_K_M (~4.5 bit medi per parametro) rappresenta il compromesso ideale tra velocità e qualità.'
  },
  {
    id: 'context-window',
    term: 'Finestra di Contesto (Context Window)',
    originalTerm: 'Dimensione della Memoria Conversazionale',
    category: 'memoria',
    shortDesc: 'La quantità massima di testo (misurata in token) che il modello può leggere e considerare contemporaneamente.',
    fullDesc: 'Comprende la cronologia della conversazione corrente, le istruzioni di sistema (system prompt) e i documenti inseriti. Modelli recenti come Llama 3 supportano da 8.192 fino a 128.000 token. Tuttavia, un contesto esteso richiede considerevole memoria supplementare nella KV-Cache.',
    whyItMatters: 'Impostare contesti immensi (es. 64k token) su schede video da 8 GB può saturare la VRAM e bloccare il server, anche se il modello base pesasse poco.',
    formulaOrExample: 'Regola pratica: 1.000 token corrispondono approssimativamente a 750 parole in inglese o 600 parole in italiano.'
  },
  {
    id: 'kv-cache',
    term: 'KV Cache (Key-Value Cache)',
    originalTerm: 'Memoria dei Vettori di Attenzione',
    category: 'memoria',
    shortDesc: 'La memoria temporanea allocata per immagazzinare i tensori calcolati per ogni token della conversazione.',
    fullDesc: 'Nei modelli con architettura Transformer, ogni parola elaborata produce vettori Chiave (Key) e Valore (Value). Per evitare di ricalcolare l\'intero testo a ogni parola successiva generata, questi vettori vengono memorizzati nella KV-Cache. La dimensione della cache cresce in modo proporzionale al numero di strati, teste d\'attenzione e token del contesto.',
    whyItMatters: 'Rappresenta il consumo dinamico di VRAM: a inizio conversazione la memoria occupata è minima, ma al raggiungimento di lunghi documenti si espande rapidamente.',
    formulaOrExample: 'KV Cache (GB) ≈ 2 × Strati × Teste × Dim_Testa × Token × Precisione_Byte.'
  },
  {
    id: 'ollama',
    term: 'Ollama & Motori d\'Inferenza',
    originalTerm: 'Gestore ed Esecutore del Server Locale',
    category: 'software',
    shortDesc: 'Il programma demone che orchestra lo scaricamento dei pesi, l\'allocazione grafica e l\'ascolto delle richieste di rete.',
    fullDesc: 'Ollama impacchetta il motore a elevate prestazioni llama.cpp in un servizio facile da comandare via terminale. Espone un endpoint HTTP REST compatibile al 100% con le specifiche ufficiali OpenAI (/v1/chat/completions), consentendo a qualsiasi applicativo di interrogare il PC come se fosse un servizio remoto.',
    whyItMatters: 'Semplifica l\'avvio di un server AI locale a un singolo comando (es. "ollama run llama3.1:8b"), gestendo in automatico CUDA, Metal e CPU fallback.',
    formulaOrExample: 'Comando tipico: "ollama serve" per il demone in ascolto su porta 11434.'
  },
  {
    id: 'gguf',
    term: 'Formato GGUF (GGML Unified Format)',
    originalTerm: 'Standard Binario per Modelli Quantizzati',
    category: 'architettura',
    shortDesc: 'Il formato di file binario unificato ideato da Georgi Gerganov per la distribuzione compatta di LLM locali.',
    fullDesc: 'GGUF raccoglie in un unico file autocontenuto i pesi quantizzati, i metadati di vocabolario del tokenizer, i parametri di contesto e la struttura dei tensori. Consente il caricamento rapido mediante memory mapping (mmap), permettendo al sistema operativo di caricare i dati in memoria in frazioni di secondo senza de-serializzazioni onerose.',
    whyItMatters: 'È il formato standard adottato da Ollama, llama.cpp, LM Studio e LocalAI per scaricare modelli leggeri e pronti all\'uso.',
    formulaOrExample: 'Estensione tipica: modello-q4_k_m.gguf'
  },
  {
    id: 'cpu-offload',
    term: 'CPU Offload (Ripartizione su Processore)',
    originalTerm: 'Offloading Ibrido GPU + CPU',
    category: 'prestazioni',
    shortDesc: 'La tecnica che suddivide gli strati del modello tra la scheda grafica e la memoria RAM di sistema.',
    fullDesc: 'Se un modello necessita di 14 GB e la tua GPU dispone solo di 8 GB di VRAM, un motore come llama.cpp o Ollama può caricare 20 strati sulla GPU e lasciare i restanti 12 strati alla CPU del calcolatore. Il modello funzionerà senza andare in crash, ma la generazione risentirà della velocità inferiore della RAM di sistema.',
    whyItMatters: 'Permette di sperimentare modelli più grandi rispetto al limite rigido della scheda video, accettando una cadenza di scrittura ridotta.',
    formulaOrExample: 'Parametro flag: "--n-gpu-layers 24"'
  },
  {
    id: 'rag',
    term: 'RAG (Retrieval-Augmented Generation)',
    originalTerm: 'Generazione Aumentata da Ricerca Documentale',
    category: 'architettura',
    shortDesc: 'Metodologia che arricchisce la risposta dell\'AI collegandola a documenti, archivi o database privati locali.',
    fullDesc: 'Invece di riaddestrare un modello sui propri dati, il testo dei documenti aziendali o personali viene convertito in vettori numerici (embedding) e salvato in una banca dati vettoriale locale. Alla richiesta dell\'utente, il sistema cerca i passaggi più pertinenti e li include nel contesto inviato al server AI locale.',
    whyItMatters: 'Garantisce risposte fondate sui tuoi dati reali e riservati, con zero allucinazioni e senza spedire documenti sensibili nel cloud.',
    formulaOrExample: 'Modello consigliato per embedding locale: "nomic-embed-text" (~0.3 GB VRAM).'
  },
  {
    id: 'token-e-ttft',
    term: 'Token al Secondo & TTFT (Latenza Iniziale)',
    originalTerm: 'Metriche di Prestazione dell\'Incoronazione',
    category: 'prestazioni',
    shortDesc: 'Gli indici primari che quantificano la velocità di elaborazione e risposta di un server locale.',
    fullDesc: 'Il TTFT (Time To First Token) misura il tempo che intercorre tra l\'invio della richiesta e la comparsa della prima sillaba della risposta (tempo impiegato per leggere il prompt). I Token/s misurano il flusso di parole successive emesse durante lo streaming.',
    whyItMatters: 'Per la lettura umana fluida è consigliata una cadenza di almeno 20-30 token/s. Valori inferiori a 5 token/s indicano saturazione della VRAM o calcolo delegato alla CPU.',
    formulaOrExample: 'Lettura umana normale: ~5 token/s. Lettura rapida: ~20-30 token/s.'
  },
  {
    id: 'apple-silicon-uma',
    term: 'Memoria Unificata Apple Silicon (UMA)',
    originalTerm: 'Architettura Unified Memory Metal',
    category: 'memoria',
    shortDesc: 'La memoria condivisa ad altissima velocità tra processore centrale (CPU) e grafico (GPU) nei chip Mac.',
    fullDesc: 'Nei calcolatori Mac dotati di chip M1, M2, M3 o M4 (soprattutto varianti Pro, Max e Ultra), la RAM di sistema è saldata direttamente nel package del processore con una larghezza di banda compresa tra 150 e 800 GB/s. Non esiste una VRAM separata: l\'intero quantitativo di memoria (fino a 64GB o 128GB) può essere allocato dinamicamente al modello AI via Metal.',
    whyItMatters: 'Consente a stazioni di lavoro compatte (come il Mac Studio) di eseguire modelli imponenti da 70B parametri senza ricorrere a costose schede video multiple.',
    formulaOrExample: 'Un Mac con 64GB di RAM unificata può dedicare circa 48GB esclusivamente all\'AI locale.'
  },
  {
    id: 'temperature',
    term: 'Temperatura & Campionamento Top-P',
    originalTerm: 'Parametri di Creatività o Rigore',
    category: 'software',
    shortDesc: 'I coefficienti matematici che governano la casualità nella selezione della parola successiva.',
    fullDesc: 'Durante la generazione, il modello assegna una probabilità a ogni possibile token successivo. Una temperatura pari a 0 rende il modello perfettamente deterministico (sceglie sempre la parola più probabile, ideale per compiti logici e codice). Valori compresi tra 0.7 e 1.0 introducono varietà espressiva, ideali per la scrittura creativa.',
    whyItMatters: 'Regolare la temperatura consente di evitare risposte monotone o, all\'opposto, divagazioni stravaganti.',
    formulaOrExample: 'Codice: temp = 0.2. Sintesi o spiegazione: temp = 0.7. Creatività: temp = 0.9.'
  }
];

export const GlossarioComponent: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'memoria' | 'architettura' | 'prestazioni' | 'software'>('all');

  const filteredTerms = GLOSSARIO_TERMS.filter((item) => {
    const matchesSearch = item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.shortDesc.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.fullDesc.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (item.originalTerm && item.originalTerm.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-8 pb-16 font-serif">
      {/* Editorial Header */}
      <div className="border border-[#DDD3C1] bg-[#FDFBF7] p-6 sm:p-8 rounded shadow-sm">
        <div className="text-[10px] font-mono tracking-widest uppercase text-[#8B4513]">
          Appendice Lessicale • Repertorio dei Concetti
        </div>
        <h2 className="font-vintage-serif text-2xl sm:text-3xl font-bold text-[#241F1A] mt-1">
          Glossario Tecnico del Calcolo AI Locale
        </h2>
        <p className="text-xs sm:text-sm text-[#736654] font-serif mt-1 max-w-3xl leading-relaxed">
          Una rassegna ragionata dei termini fondamentali dell'ingegneria dei modelli linguistici a pesi aperti: quantizzazione, memoria video, finestre di contesto e protocolli di servizio.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 bg-[#FDFBF7] p-4 rounded border border-[#DDD3C1] shadow-sm">
        {/* Search */}
        <div className="md:col-span-5 relative">
          <Search className="w-4 h-4 text-[#8C7D6B] absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cerca termine (es. Quantizzazione, VRAM, KV Cache)..."
            className="w-full pl-9 pr-3 py-1.5 bg-[#FAF8F5] border border-[#D5C9B5] text-[#241F1A] rounded text-xs font-serif focus:outline-none placeholder-[#A39582]"
          />
        </div>

        {/* Category Pills */}
        <div className="md:col-span-7 flex items-center gap-1 bg-[#F5EFE3] p-1 rounded border border-[#E2D8C6] overflow-x-auto text-xs [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {[
            { id: 'all', label: 'Tutti i Concetti' },
            { id: 'memoria', label: 'Memoria & VRAM' },
            { id: 'architettura', label: 'Architettura LLM' },
            { id: 'prestazioni', label: 'Prestazioni & Metriche' },
            { id: 'software', label: 'Software & Protocolli' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as any)}
              className={`flex-1 py-1 px-2.5 rounded font-medium whitespace-nowrap transition text-center ${
                selectedCategory === cat.id
                  ? 'bg-[#FAF8F5] text-[#8B4513] font-bold shadow-xs'
                  : 'text-[#695D4D] hover:text-[#241F1A]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Terms Dictionary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTerms.map((t) => (
          <article
            key={t.id}
            className="border border-[#DDD3C1] bg-[#FDFBF7] p-6 rounded shadow-sm hover:border-[#BFAF98] transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              {/* Category tag */}
              <div className="flex items-center justify-between border-b border-[#ECE2D2] pb-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#7A6D5B]">
                  {t.originalTerm || 'Concetto Fondamentale'}
                </span>
                <span className={`text-[10px] font-serif font-bold px-2 py-0.5 rounded border ${
                  t.category === 'memoria' ? 'bg-[#F2ECE0] text-[#8B4513] border-[#DACDB9]' :
                  t.category === 'prestazioni' ? 'bg-[#EBF3EC] text-[#2B5435] border-[#C2DBC5]' :
                  t.category === 'software' ? 'bg-[#F4EFE6] text-[#695B47] border-[#DACFBF]' :
                  'bg-[#F5EAE6] text-[#8B3A22] border-[#E2CBC3]'
                }`}>
                  {t.category === 'memoria' ? 'Memoria' :
                   t.category === 'prestazioni' ? 'Prestazioni' :
                   t.category === 'software' ? 'Software' : 'Architettura'}
                </span>
              </div>

              {/* Term Title */}
              <h3 className="font-vintage-serif text-xl font-bold text-[#241F1A]">
                {t.term}
              </h3>

              {/* Short Definition */}
              <p className="text-xs font-serif font-semibold text-[#8B4513] leading-relaxed italic">
                «{t.shortDesc}»
              </p>

              {/* Full Description */}
              <p className="text-xs font-serif text-[#4A4032] leading-relaxed">
                {t.fullDesc}
              </p>
            </div>

            {/* Why It Matters Callout */}
            <div className="pt-3 border-t border-[#EDE4D4] space-y-2">
              <div className="bg-[#FAF8F5] p-3 rounded border border-[#E2D8C6] space-y-1">
                <span className="text-[11px] font-serif font-bold text-[#241F1A] block">
                  Perché è essenziale per il tuo server:
                </span>
                <p className="text-[11px] text-[#5C5040] leading-relaxed font-serif">
                  {t.whyItMatters}
                </p>
              </div>

              {t.formulaOrExample && (
                <div className="text-[11px] font-typewriter text-[#7A6D5B] bg-[#F7F3EB] p-2 rounded border border-[#DFD3BE] overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                  {t.formulaOrExample}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>

      {filteredTerms.length === 0 && (
        <div className="text-center py-12 border border-dashed border-[#D5C9B5] rounded p-6 bg-[#FDFBF7]">
          <BookOpen className="w-8 h-8 mx-auto text-[#A39582] mb-2" />
          <p className="text-xs font-serif text-[#695D4D]">
            Nessun termine corrisponde ai criteri di ricerca «{searchTerm}».
          </p>
        </div>
      )}
    </div>
  );
};
