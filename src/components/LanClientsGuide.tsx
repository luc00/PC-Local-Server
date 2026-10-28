import React, { useState } from 'react';
import { 
  Wifi, 
  Smartphone, 
  Monitor, 
  Code, 
  Copy, 
  Check, 
  Lock
} from 'lucide-react';

export const LanClientsGuide: React.FC = () => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyText = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const winFirewallCmd = `New-NetFirewallRule -DisplayName "Ollama AI Server LAN" -Direction Inbound -LocalPort 11434 -Protocol TCP -Action Allow`;
  const linuxUfwCmd = `sudo ufw allow 11434/tcp comment "Ollama AI Server"`;
  const openWebUiCmd = `docker run -d -p 3000:8080 --add-host=host.docker.internal:host-gateway -v open-webui:/app/backend/data --name open-webui --restart always ghcr.io/open-webui/open-webui:main`;

  return (
    <div className="space-y-8 pb-16">
      {/* Title */}
      <div className="border border-[#DDD3C1] bg-[#FDFBF7] p-6 sm:p-8 rounded shadow-sm">
        <div className="text-[10px] font-mono tracking-widest uppercase text-[#8B4513]">
          Capitolo V • Dispositivi Connessi & Rete Locale
        </div>
        <h2 className="font-vintage-serif text-2xl sm:text-3xl font-bold text-[#241F1A] mt-1">
          Accesso da Smartphone, Portatili e Strumenti d'Ufficio
        </h2>
        <p className="text-xs sm:text-sm text-[#736654] font-serif mt-1">
          Istruzioni per collegare telefoni cellulari, interfacce web e ambienti di sviluppo al server AI del tuo calcolatore.
        </p>
      </div>

      {/* Firewall Notice */}
      <div className="border border-[#DDD3C1] bg-[#FDFBF7] p-6 rounded shadow-sm space-y-4 font-serif">
        <div className="space-y-1">
          <h3 className="font-vintage-serif text-lg font-bold text-[#241F1A]">
            Norma Preliminare: Permesso sulla Porta 11434 nel Firewall
          </h3>
          <p className="text-xs text-[#594E40] leading-relaxed">
            Per consentire agli altri apparati collegati al Wi-Fi domestico di dialogare con il calcolatore, è necessario autorizzare il transito sulla porta designata:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          {/* Windows Rule */}
          <div className="bg-[#FAF8F5] p-3.5 rounded border border-[#E2D8C6] space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#241F1A]">Windows PowerShell (Amministratore):</span>
              <button
                onClick={() => copyText('win', winFirewallCmd)}
                type="button"
                className="text-[11px] text-[#7A6D5B] hover:text-[#241F1A] flex items-center gap-1"
              >
                {copiedKey === 'win' ? <Check className="w-3 h-3 text-[#2B5435]" /> : <Copy className="w-3 h-3" />}
                {copiedKey === 'win' ? 'Copiato' : 'Copia'}
              </button>
            </div>
            <pre className="text-[11px] font-typewriter text-[#241F1A] overflow-x-auto bg-[#F5EFE3] p-2 rounded [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              <code>{winFirewallCmd}</code>
            </pre>
          </div>

          {/* Linux Rule */}
          <div className="bg-[#FAF8F5] p-3.5 rounded border border-[#E2D8C6] space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#241F1A]">Linux (Comando UFW):</span>
              <button
                onClick={() => copyText('linux', linuxUfwCmd)}
                type="button"
                className="text-[11px] text-[#7A6D5B] hover:text-[#241F1A] flex items-center gap-1"
              >
                {copiedKey === 'linux' ? <Check className="w-3 h-3 text-[#2B5435]" /> : <Copy className="w-3 h-3" />}
                {copiedKey === 'linux' ? 'Copiato' : 'Copia'}
              </button>
            </div>
            <pre className="text-[11px] font-typewriter text-[#241F1A] overflow-x-auto bg-[#F5EFE3] p-2 rounded [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              <code>{linuxUfwCmd}</code>
            </pre>
          </div>
        </div>
      </div>

      {/* Clients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Open WebUI */}
        <div className="border border-[#DDD3C1] bg-[#FDFBF7] p-5 rounded shadow-sm space-y-3 font-serif">
          <div className="flex items-center justify-between">
            <h3 className="font-vintage-serif text-base font-bold text-[#241F1A]">
              1. Interfaccia Open WebUI (Simile a ChatGPT)
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F4EFE6] text-[#786A58] border border-[#DDD0BD]">
              Web Browser
            </span>
          </div>
          <p className="text-xs text-[#594E40] leading-relaxed">
            Offre un portale web per consultare i modelli locali da qualunque tablet o browser, con gestione delle conversazioni passate e caricamento documenti:
          </p>
          <div className="bg-[#FAF8F5] p-2.5 rounded border border-[#E2D8C6] space-y-1.5">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-[#786C5A] font-mono">Comando Docker d'avvio:</span>
              <button
                onClick={() => copyText('openwebui', openWebUiCmd)}
                type="button"
                className="text-[#7A6D5B] hover:text-[#241F1A] flex items-center gap-1"
              >
                {copiedKey === 'openwebui' ? <Check className="w-3 h-3 text-[#2B5435]" /> : <Copy className="w-3 h-3" />}
                <span>{copiedKey === 'openwebui' ? 'Copiato' : 'Copia'}</span>
              </button>
            </div>
            <pre className="text-[10px] font-typewriter text-[#241F1A] overflow-x-auto bg-[#F5EFE3] p-2 rounded [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              <code>{openWebUiCmd}</code>
            </pre>
          </div>
        </div>

        {/* Smartphone */}
        <div className="border border-[#DDD3C1] bg-[#FDFBF7] p-5 rounded shadow-sm space-y-3 font-serif">
          <div className="flex items-center justify-between">
            <h3 className="font-vintage-serif text-base font-bold text-[#241F1A]">
              2. Applicazioni Mobili per Smartphone
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F4EFE6] text-[#786A58] border border-[#DDD0BD]">
              iOS & Android
            </span>
          </div>
          <p className="text-xs text-[#594E40] leading-relaxed">
            Per dialogare con il modello dal tuo telefono cellulare:
          </p>
          <ol className="text-xs text-[#42392E] space-y-1 list-decimal list-inside bg-[#FAF8F5] p-3 rounded border border-[#E2D8C6]">
            <li>Verifica l'indirizzo IP locale del PC (es. <code className="font-typewriter text-[#8B4513]">192.168.1.50</code>).</li>
            <li>Installa l'applicazione <strong>Chatbox</strong> o <strong>Enchanted</strong>.</li>
            <li>Indica come fornitore <em>Ollama</em> o <em>OpenAI Custom</em>.</li>
            <li>Inserisci l'indirizzo <code className="font-typewriter text-[#8B4513]">http://192.168.1.50:11434</code>.</li>
          </ol>
        </div>

        {/* VS Code Continue */}
        <div className="border border-[#DDD3C1] bg-[#FDFBF7] p-5 rounded shadow-sm space-y-3 font-serif">
          <div className="flex items-center justify-between">
            <h3 className="font-vintage-serif text-base font-bold text-[#241F1A]">
              3. Editor di Testo & Programmazione (Continue)
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F4EFE6] text-[#786A58] border border-[#DDD0BD]">
              VS Code / Cursor
            </span>
          </div>
          <p className="text-xs text-[#594E40] leading-relaxed">
            L'estensione <strong>Continue</strong> in Visual Studio Code permette di avere il completamento del codice generato localmente dal modello <code className="font-typewriter text-[#8B4513]">qwen2.5-coder:7b</code> senza alcun abbonamento esterno e mantenendo il codice riservato.
          </p>
        </div>

        {/* Remote Tailscale */}
        <div className="border border-[#DDD3C1] bg-[#FDFBF7] p-5 rounded shadow-sm space-y-3 font-serif">
          <div className="flex items-center justify-between">
            <h3 className="font-vintage-serif text-base font-bold text-[#241F1A]">
              4. Collegamento Remoto Sicuro (Tailscale)
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F4EFE6] text-[#786A58] border border-[#DDD0BD]">
              Rete Mesh Privata
            </span>
          </div>
          <p className="text-xs text-[#594E40] leading-relaxed">
            Adottando la rete cifrata <strong>Tailscale</strong> puoi interrogare il server domestico da qualsiasi luogo fuori casa senza aprire alcuna porta pericolosa sul router, mediante un indirizzo IP privato dedicato (es. <code className="font-typewriter text-[#8B4513]">http://100.x.y.z:11434</code>).
          </p>
        </div>
      </div>
    </div>
  );
};
