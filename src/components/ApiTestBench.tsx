import React, { useState } from 'react';
import { 
  Terminal, 
  RefreshCw, 
  Copy, 
  Check, 
  Send, 
  Code2, 
  Sliders,
  Sparkles,
  Compass
} from 'lucide-react';

interface ApiTestBenchProps {
  endpointUrl: string;
  onUpdateEndpointUrl: (url: string) => void;
  serverRunning: boolean;
}

export const ApiTestBench: React.FC<ApiTestBenchProps> = ({
  endpointUrl,
  onUpdateEndpointUrl,
  serverRunning,
}) => {
  const [selectedModel, setSelectedModel] = useState('llama3.1:8b');
  const [prompt, setPrompt] = useState('Spiegami in 3 punti chiave perché la VRAM è il fattore più critico per un server AI locale.');
  const [response, setResponse] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [metrics, setMetrics] = useState<{
    ttftMs: number;
    tokensGenerated: number;
    tokensPerSec: number;
    totalTimeSec: number;
  } | null>(null);

  const [activeTabSnippet, setActiveTabSnippet] = useState<'curl' | 'python' | 'js'>('curl');
  const [copiedSnippet, setCopiedSnippet] = useState(false);

  const simulatedResponses: Record<string, string> = {
    vram: `Ecco i tre motivi determinanti per cui la VRAM costituisce il parametro più critico di un server locale:

1. Allocazione Diretta dei Pesi (Velocità del Bus):
I chip di memoria grafica (VRAM) operano a una larghezza di banda superiore a 500-1000 GB/s. Caricare l'intero modello in VRAM permette al processore grafico di eseguire l'inferenza senza attendere il passaggio dei dati attraverso il bus PCIe del calcolatore.

2. Determinazione della Dimensione del Modello:
Ogni miliardo di parametri compresso a 4 bit esige circa 0.6 GB di memoria video, a cui si aggiunge la KV-Cache del contesto. Con 8 GB di VRAM è possibile ospitare modelli da 8B parametri; per modelli da 70B occorrono almeno 40-48 GB di memoria dedicata.

3. Cadenza di Generazione dei Token:
In memoria VRAM completa la velocità di scrittura oscilla tra 25 e 60+ token al secondo (ritmo fluido per la lettura). Quando la memoria video si esaurisce e il carico viene deviato sulla RAM di sistema (CPU offload), la cadenza precipita spesso a soli 2-6 token al secondo.`,
    general: `Connessione con il server locale stabilita regolarmente.
Endpoint: ${endpointUrl}
Modello in uso: ${selectedModel}
Stato: Servizio in ascolto e pronto per l'elaborazione.`
  };

  const handleSendPrompt = async () => {
    if (!prompt.trim() || isGenerating) return;

    setIsGenerating(true);
    setResponse('');
    setMetrics(null);

    const startTime = performance.now();
    let firstTokenTime = 0;

    const textToStream = prompt.toLowerCase().includes('vram') 
      ? simulatedResponses.vram 
      : simulatedResponses.general;

    const words = textToStream.split(' ');
    let currentText = '';
    let tokens = 0;

    for (let i = 0; i < words.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 30));
      if (i === 0) {
        firstTokenTime = performance.now();
      }
      currentText += (i === 0 ? '' : ' ') + words[i];
      tokens += Math.ceil(words[i].length / 3);
      setResponse(currentText);
    }

    const endTime = performance.now();
    const totalSec = (endTime - startTime) / 1000;
    const ttft = firstTokenTime ? Math.round(firstTokenTime - startTime) : 110;
    const tps = Math.round((tokens / totalSec) * 10) / 10;

    setMetrics({
      ttftMs: ttft,
      tokensGenerated: tokens,
      tokensPerSec: tps,
      totalTimeSec: Math.round(totalSec * 10) / 10,
    });
    setIsGenerating(false);
  };

  const curlCode = `curl ${endpointUrl}/chat/completions \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "${selectedModel}",
    "messages": [
      { "role": "user", "content": "${prompt.slice(0, 45)}..." }
    ],
    "temperature": 0.7
  }'`;

  const pythonCode = `from openai import OpenAI

# Indirizzo del server locale
client = OpenAI(
    base_url="${endpointUrl}",
    api_key="ollama"
)

response = client.chat.completions.create(
    model="${selectedModel}",
    messages=[{"role": "user", "content": "${prompt.slice(0, 45)}..."}]
)

print(response.choices[0].message.content)`;

  const jsCode = `import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "${endpointUrl}",
  apiKey: "ollama"
});

const completion = await client.chat.completions.create({
  model: "${selectedModel}",
  messages: [{ role: "user", content: "${prompt.slice(0, 45)}..." }]
});

console.log(completion.choices[0].message.content);`;

  const copySnippet = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Title */}
      <div className="border border-[#DDD3C1] bg-[#FDFBF7] p-6 sm:p-8 rounded shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-[10px] font-mono tracking-widest uppercase text-[#8B4513]">
            Capitolo IV • Esperimento & Collaudo
          </div>
          <h2 className="font-vintage-serif text-2xl sm:text-3xl font-bold text-[#241F1A] mt-1">
            Banco di Prova & Interrogazione dell'API
          </h2>
          <p className="text-xs sm:text-sm text-[#736654] font-serif mt-1">
            Invia quesiti al server locale per verificare la cadenza di generazione dei token e generare il codice per i tuoi programmi.
          </p>
        </div>

        {/* Live endpoint address */}
        <div className="flex items-center gap-2 bg-[#F6F1E6] border border-[#D8CCB7] p-2 rounded w-full sm:w-auto">
          <span className="text-xs text-[#706250] pl-1 font-serif shrink-0">Indirizzo:</span>
          <input
            type="text"
            value={endpointUrl}
            onChange={(e) => onUpdateEndpointUrl(e.target.value)}
            className="bg-[#FAF8F5] border border-[#D5C9B5] text-[#241F1A] font-mono text-xs rounded px-2.5 py-1 w-full sm:w-60 min-w-0 focus:outline-none"
          />
          <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-[#EBF3EC] text-[#2B5435] border border-[#C5DDC8] text-[11px] font-serif font-bold shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2B5435]" />
            200 OK
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Interactive Playground (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="border border-[#DDD3C1] bg-[#FDFBF7] rounded p-5 space-y-4 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#E8DEC9] pb-3 gap-2">
              <span className="text-xs font-serif font-bold uppercase tracking-wider text-[#3D3428]">
                Parametri di Richiesta
              </span>
              <div className="flex items-center gap-2">
                <label className="text-[11px] font-serif text-[#706352] shrink-0">Modello attivo:</label>
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="bg-[#FAF8F5] border border-[#D5C9B5] text-[#241F1A] font-mono text-xs rounded px-2 py-1 max-w-full"
                >
                  <option value="llama3.1:8b">llama3.1:8b (Standard)</option>
                  <option value="deepseek-r1:8b">deepseek-r1:8b (Ragionamento)</option>
                  <option value="qwen2.5-coder:7b">qwen2.5-coder:7b (Coding)</option>
                  <option value="llama3.2:3b">llama3.2:3b (Leggero)</option>
                </select>
              </div>
            </div>

            {/* Prompt input */}
            <div className="space-y-1.5 font-serif">
              <label className="text-xs font-bold text-[#362D23] flex items-center justify-between">
                <span>Testo della Richiesta (Prompt):</span>
                <span className="text-[11px] text-[#7C6E5C] font-normal italic">Esempi selezionabili sotto</span>
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={3}
                className="w-full bg-[#FAF8F5] border border-[#D5C9B5] text-[#241F1A] rounded p-3 text-xs focus:outline-none resize-none placeholder-[#A39582] leading-relaxed font-serif"
                placeholder="Scrivi qui il quesito o la richiesta da inviare..."
              />
            </div>

            {/* Quick Prompt Chips */}
            <div className="flex flex-wrap gap-1.5 text-xs font-serif">
              <button
                onClick={() => setPrompt('Spiegami in 3 punti chiave perché la VRAM è il fattore più critico per un server AI locale.')}
                type="button"
                className="px-2.5 py-1 rounded bg-[#F5EFE3] hover:bg-[#EAE2D2] text-[#42392E] border border-[#D5C9B5] transition text-[11px]"
              >
                Quesito VRAM & Requisiti
              </button>
              <button
                onClick={() => setPrompt('Scrivi uno script PowerShell per verificare che il server locale risponda sulla porta 11434.')}
                type="button"
                className="px-2.5 py-1 rounded bg-[#F5EFE3] hover:bg-[#EAE2D2] text-[#42392E] border border-[#D5C9B5] transition text-[11px]"
              >
                Script di Controllo Rete
              </button>
            </div>

            {/* Submit button */}
            <button
              onClick={handleSendPrompt}
              disabled={isGenerating || !prompt.trim()}
              type="button"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded bg-[#8B4513] hover:bg-[#72380F] text-[#FAF8F5] font-serif text-xs font-bold transition shadow-sm disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Trascrizione in corso dal server locale...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Trasmetti Richiesta al Server Locale</span>
                </>
              )}
            </button>
          </div>

          {/* Response Box */}
          <div className="border border-[#DDD3C1] bg-[#FDFBF7] rounded p-5 space-y-3 shadow-sm min-h-[220px]">
            <div className="flex items-center justify-between border-b border-[#E8DEC9] pb-2">
              <span className="text-xs font-serif font-bold text-[#42392E] uppercase tracking-wider">
                Risposta Ricevuta dal Calcolatore
              </span>
              {isGenerating && (
                <span className="text-[11px] text-[#8B4513] font-serif italic animate-pulse">
                  Generazione attiva...
                </span>
              )}
            </div>

            {response ? (
              <div className="text-xs font-serif text-[#241F1A] leading-relaxed whitespace-pre-line">
                {response}
              </div>
            ) : (
              <div className="h-32 flex flex-col items-center justify-center text-[#8C7D6A] text-xs font-serif gap-2 italic">
                <span>Nessuna risposta memorizzata. Premi il pulsante sopra per avviare il collaudo.</span>
              </div>
            )}

            {/* Performance Ledger */}
            {metrics && (
              <div className="mt-4 pt-3 border-t border-[#E8DEC9] grid grid-cols-4 gap-2 text-center text-xs font-serif">
                <div className="bg-[#FAF8F5] p-2 rounded border border-[#E8DFC9]">
                  <span className="text-[10px] text-[#786C5A] block">Latenza Iniziale</span>
                  <span className="font-mono text-[#8B4513] font-bold">{metrics.ttftMs} ms</span>
                </div>
                <div className="bg-[#FAF8F5] p-2 rounded border border-[#E8DFC9]">
                  <span className="text-[10px] text-[#786C5A] block">Cadenza Token</span>
                  <span className="font-mono text-[#2B5435] font-bold">{metrics.tokensPerSec} tok/s</span>
                </div>
                <div className="bg-[#FAF8F5] p-2 rounded border border-[#E8DFC9]">
                  <span className="text-[10px] text-[#786C5A] block">Token Emessi</span>
                  <span className="font-mono text-[#241F1A] font-bold">{metrics.tokensGenerated}</span>
                </div>
                <div className="bg-[#FAF8F5] p-2 rounded border border-[#E8DFC9]">
                  <span className="text-[10px] text-[#786C5A] block">Tempo Totale</span>
                  <span className="font-mono text-[#42392E] font-bold">{metrics.totalTimeSec} s</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Code Integration Snippets (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="border border-[#DDD3C1] bg-[#FDFBF7] rounded p-5 space-y-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-[#E8DEC9] pb-3">
              <span className="text-xs font-serif font-bold uppercase tracking-wider text-[#3D3428]">
                Integrazione nei Tuoi Programmi
              </span>
              <button
                onClick={() => copySnippet(activeTabSnippet === 'curl' ? curlCode : activeTabSnippet === 'python' ? pythonCode : jsCode)}
                type="button"
                className="flex items-center gap-1 text-xs text-[#5C4F3F] hover:text-[#241F1A] px-2 py-0.5 rounded border border-[#DACFBF] bg-[#FAF8F5] transition"
              >
                {copiedSnippet ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#2B5435]" />
                    <span className="text-[#2B5435] font-bold">Copiato!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#7A6D5B]" />
                    <span>Copia Codice</span>
                  </>
                )}
              </button>
            </div>

            {/* Language Switcher */}
            <div className="flex gap-1.5 text-xs font-serif">
              {[
                { id: 'curl', label: 'cURL' },
                { id: 'python', label: 'Python (OpenAI)' },
                { id: 'js', label: 'Node.js' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTabSnippet(tab.id as any)}
                  className={`py-1 px-2.5 rounded transition ${
                    activeTabSnippet === tab.id
                      ? 'bg-[#8B4513] text-[#FAF8F5] font-bold'
                      : 'bg-[#F5EFE3] text-[#554A3B] hover:bg-[#EAE2D2]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Code Block */}
            <pre className="p-3.5 rounded bg-[#FAF8F5] border border-[#E2D8C6] text-xs font-typewriter text-[#241F1A] overflow-x-auto leading-relaxed max-h-[360px] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              <code>
                {activeTabSnippet === 'curl' && curlCode}
                {activeTabSnippet === 'python' && pythonCode}
                {activeTabSnippet === 'js' && jsCode}
              </code>
            </pre>

            <p className="text-[11px] text-[#635747] font-serif leading-relaxed italic bg-[#F8F4EC] p-3 rounded border border-[#E8DEC9]">
              «Il protocollo esposto replica integralmente le specifiche aperte OpenAI v1. È sufficiente indicare il parametro base_url per convogliare le chiamate verso il tuo computer.»
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
