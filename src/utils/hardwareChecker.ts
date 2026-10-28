export interface HardwareSpecs {
  gpuVendor: 'nvidia' | 'apple' | 'amd' | 'intel' | 'cpu_only';
  gpuModel: string;
  vramGB: number;
  ramGB: number;
  storageType: 'nvme_ssd' | 'sata_ssd' | 'hdd';
  storageFreeGB: number;
  os: 'windows' | 'macos' | 'linux';
}

export interface ModelSpec {
  id: string;
  name: string;
  family: string;
  paramsB: number; // in billions
  defaultQuant: string;
  minVramGB: number;
  recommendedVramGB: number;
  minRamGB: number;
  diskSizeGB: number;
  tier: 'base' | 'intermedio' | 'avanzato' | 'pro';
  description: string;
  ollamaCommand: string;
  useCase: 'codice' | 'chat_generale' | 'ragionamento' | 'visione' | 'embedding' | 'immagini';
  contextDefault: number;
}

export const POPULAR_MODELS: ModelSpec[] = [
  {
    id: 'llama-3.2-3b',
    name: 'Llama 3.2 3B',
    family: 'Meta Llama',
    paramsB: 3.2,
    defaultQuant: 'Q4_K_M',
    minVramGB: 4,
    recommendedVramGB: 6,
    minRamGB: 8,
    diskSizeGB: 2.2,
    tier: 'base',
    description: 'Ultra-leggero e velocissimo, ideale per PC con GPU base o laptop senza GPU dedicata.',
    ollamaCommand: 'ollama run llama3.2',
    useCase: 'chat_generale',
    contextDefault: 8192,
  },
  {
    id: 'deepseek-r1-8b',
    name: 'DeepSeek R1 8B (Distill)',
    family: 'DeepSeek',
    paramsB: 8,
    defaultQuant: 'Q4_K_M',
    minVramGB: 7,
    recommendedVramGB: 10,
    minRamGB: 16,
    diskSizeGB: 5.1,
    tier: 'base',
    description: 'Modello di ragionamento logico e matematico avanzato con "chain of thought" integrata.',
    ollamaCommand: 'ollama run deepseek-r1:8b',
    useCase: 'ragionamento',
    contextDefault: 8192,
  },
  {
    id: 'llama-3.1-8b',
    name: 'Llama 3.1 8B Instruct',
    family: 'Meta Llama',
    paramsB: 8,
    defaultQuant: 'Q4_K_M',
    minVramGB: 6,
    recommendedVramGB: 8,
    minRamGB: 16,
    diskSizeGB: 4.9,
    tier: 'base',
    description: 'Il punto di riferimento per compiti generici, riassunti, traduzione e automazioni su GPU da 8GB.',
    ollamaCommand: 'ollama run llama3.1:8b',
    useCase: 'chat_generale',
    contextDefault: 16384,
  },
  {
    id: 'qwen2.5-coder-7b',
    name: 'Qwen 2.5 Coder 7B',
    family: 'Qwen Alibaba',
    paramsB: 7.6,
    defaultQuant: 'Q4_K_M',
    minVramGB: 6,
    recommendedVramGB: 8,
    minRamGB: 16,
    diskSizeGB: 4.7,
    tier: 'base',
    description: 'Specializzato in scrittura codice, refactoring, debug e spiegazione di script software.',
    ollamaCommand: 'ollama run qwen2.5-coder:7b',
    useCase: 'codice',
    contextDefault: 16384,
  },
  {
    id: 'mistral-nemo-12b',
    name: 'Mistral NeMo 12B',
    family: 'Mistral AI',
    paramsB: 12.2,
    defaultQuant: 'Q4_K_M',
    minVramGB: 10,
    recommendedVramGB: 14,
    minRamGB: 24,
    diskSizeGB: 7.5,
    tier: 'intermedio',
    description: 'Grande capacità linguistica e multilingua con finestra di contesto nativa fino a 128k.',
    ollamaCommand: 'ollama run mistral-nemo',
    useCase: 'chat_generale',
    contextDefault: 32768,
  },
  {
    id: 'deepseek-r1-14b',
    name: 'DeepSeek R1 14B (Qwen)',
    family: 'DeepSeek',
    paramsB: 14.7,
    defaultQuant: 'Q4_K_M',
    minVramGB: 12,
    recommendedVramGB: 16,
    minRamGB: 24,
    diskSizeGB: 9.0,
    tier: 'intermedio',
    description: 'Eccezionale equilibrio tra ragionamento profondo e velocità di generazione su GPU da 12-16 GB.',
    ollamaCommand: 'ollama run deepseek-r1:14b',
    useCase: 'ragionamento',
    contextDefault: 16384,
  },
  {
    id: 'qwen2.5-coder-32b',
    name: 'Qwen 2.5 Coder 32B',
    family: 'Qwen Alibaba',
    paramsB: 32.5,
    defaultQuant: 'Q4_K_M',
    minVramGB: 22,
    recommendedVramGB: 26,
    minRamGB: 32,
    diskSizeGB: 20.0,
    tier: 'intermedio',
    description: 'Capacità di coding a livello di modelli cloud di grandi dimensioni su singola GPU 24GB (es. RTX 3090/4090).',
    ollamaCommand: 'ollama run qwen2.5-coder:32b',
    useCase: 'codice',
    contextDefault: 32768,
  },
  {
    id: 'llama-3.3-70b',
    name: 'Llama 3.3 70B Instruct',
    family: 'Meta Llama',
    paramsB: 70.6,
    defaultQuant: 'Q4_K_M',
    minVramGB: 40,
    recommendedVramGB: 48,
    minRamGB: 64,
    diskSizeGB: 43.0,
    tier: 'avanzato',
    description: 'Livello GPT-4 locale. Richiede 2x GPU da 24GB (RTX 3090/4090) o Mac Studio con 64GB+ memoria unificata.',
    ollamaCommand: 'ollama run llama3.3:70b',
    useCase: 'chat_generale',
    contextDefault: 32768,
  },
  {
    id: 'deepseek-r1-70b',
    name: 'DeepSeek R1 70B (Llama)',
    family: 'DeepSeek',
    paramsB: 70.6,
    defaultQuant: 'Q4_K_M',
    minVramGB: 42,
    recommendedVramGB: 48,
    minRamGB: 64,
    diskSizeGB: 44.0,
    tier: 'avanzato',
    description: 'Massima potenza di ragionamento open-source per server AI workstation e laboratori.',
    ollamaCommand: 'ollama run deepseek-r1:70b',
    useCase: 'ragionamento',
    contextDefault: 32768,
  },
  {
    id: 'nomic-embed-text',
    name: 'Nomic Embed Text v1.5',
    family: 'Nomic AI',
    paramsB: 0.137,
    defaultQuant: 'FP16',
    minVramGB: 1,
    recommendedVramGB: 2,
    minRamGB: 4,
    diskSizeGB: 0.3,
    tier: 'base',
    description: 'Generatore di embedding vettoriali per Retrieval-Augmented Generation (RAG) e ricerca semantica nei documenti.',
    ollamaCommand: 'ollama run nomic-embed-text',
    useCase: 'embedding',
    contextDefault: 8192,
  },
  {
    id: 'llava-13b',
    name: 'LLaVA 1.6 13B (Vision)',
    family: 'LLaVA',
    paramsB: 13.0,
    defaultQuant: 'Q4_K_M',
    minVramGB: 11,
    recommendedVramGB: 14,
    minRamGB: 16,
    diskSizeGB: 8.0,
    tier: 'intermedio',
    description: 'Modello multimodale in grado di comprendere e descrivere immagini, grafici e screenshot locali.',
    ollamaCommand: 'ollama run llava:13b',
    useCase: 'visione',
    contextDefault: 4096,
  }
];

export interface CompatibilityResult {
  score: number; // 0 - 100
  tier: 'Non idoneo' | 'Base (3B - 8B)' | 'Intermedio (12B - 32B)' | 'Avanzato (70B+ Workstation)';
  badgeColor: string;
  summary: string;
  vramStatus: 'ottimo' | 'sufficiente' | 'critico' | 'assente';
  ramStatus: 'ottimo' | 'sufficiente' | 'critico';
  storageStatus: 'ottimo' | 'sufficiente' | 'lento';
  runnableModels: {
    model: ModelSpec;
    performance: 'Full GPU (Massima velocità)' | 'CPU Offload (Rallentato)' | 'Non raccomandato (OOM)';
    estimatedTokSec: string;
  }[];
  recommendations: string[];
}

export function evaluateHardware(specs: HardwareSpecs): CompatibilityResult {
  const { gpuVendor, vramGB, ramGB, storageType, storageFreeGB } = specs;

  // Calculate base score
  let score = 0;
  
  // VRAM scoring (up to 45 pts)
  if (gpuVendor === 'apple') {
    // Apple Silicon unified memory can allocate ~70% as VRAM
    const effectiveVram = Math.round(ramGB * 0.7);
    if (effectiveVram >= 48) score += 45;
    else if (effectiveVram >= 24) score += 38;
    else if (effectiveVram >= 12) score += 30;
    else if (effectiveVram >= 6) score += 20;
    else score += 10;
  } else if (gpuVendor === 'nvidia') {
    if (vramGB >= 32) score += 45;
    else if (vramGB >= 24) score += 42;
    else if (vramGB >= 16) score += 35;
    else if (vramGB >= 12) score += 30;
    else if (vramGB >= 8) score += 24;
    else if (vramGB >= 6) score += 16;
    else if (vramGB >= 4) score += 10;
    else score += 4;
  } else if (gpuVendor === 'amd') {
    // AMD ROCm works on supported Linux and select Windows GPUs
    if (vramGB >= 24) score += 38;
    else if (vramGB >= 16) score += 30;
    else if (vramGB >= 8) score += 20;
    else score += 10;
  } else {
    // CPU only or Intel iGPU
    score += Math.min(10, Math.floor(ramGB / 4));
  }

  // RAM scoring (up to 30 pts)
  if (ramGB >= 64) score += 30;
  else if (ramGB >= 32) score += 25;
  else if (ramGB >= 16) score += 18;
  else if (ramGB >= 8) score += 10;
  else score += 4;

  // Storage scoring (up to 25 pts)
  if (storageType === 'nvme_ssd') score += 15;
  else if (storageType === 'sata_ssd') score += 10;
  else score += 3; // HDD

  if (storageFreeGB >= 100) score += 10;
  else if (storageFreeGB >= 40) score += 7;
  else if (storageFreeGB >= 20) score += 4;
  else score += 1;

  score = Math.min(100, Math.max(5, score));

  // Determine Tier & Status
  let tier: CompatibilityResult['tier'] = 'Non idoneo';
  let badgeColor = 'bg-red-500/20 text-red-400 border-red-500/30';
  let vramStatus: CompatibilityResult['vramStatus'] = 'critico';
  let ramStatus: CompatibilityResult['ramStatus'] = 'critico';
  let storageStatus: CompatibilityResult['storageStatus'] = 'sufficiente';

  const effectiveVram = gpuVendor === 'apple' ? Math.round(ramGB * 0.7) : vramGB;

  if (effectiveVram >= 32 || (gpuVendor === 'apple' && ramGB >= 48)) {
    tier = 'Avanzato (70B+ Workstation)';
    badgeColor = 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
    vramStatus = 'ottimo';
  } else if (effectiveVram >= 12 || (gpuVendor === 'apple' && ramGB >= 24)) {
    tier = 'Intermedio (12B - 32B)';
    badgeColor = 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    vramStatus = 'ottimo';
  } else if (effectiveVram >= 8 || (gpuVendor === 'apple' && ramGB >= 16)) {
    tier = 'Base (3B - 8B)';
    badgeColor = 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30';
    vramStatus = 'sufficiente';
  } else if (effectiveVram >= 4 || ramGB >= 16) {
    tier = 'Base (3B - 8B)';
    badgeColor = 'bg-amber-500/20 text-amber-400 border-amber-500/30';
    vramStatus = effectiveVram >= 4 ? 'sufficiente' : 'assente';
  } else {
    tier = 'Non idoneo';
    badgeColor = 'bg-red-500/20 text-red-400 border-red-500/30';
    vramStatus = 'critico';
  }

  if (ramGB >= 32) ramStatus = 'ottimo';
  else if (ramGB >= 16) ramStatus = 'sufficiente';
  else ramStatus = 'critico';

  if (storageType === 'nvme_ssd' && storageFreeGB >= 40) storageStatus = 'ottimo';
  else if (storageType === 'hdd') storageStatus = 'lento';
  else storageStatus = 'sufficiente';

  // Recommendations list
  const recommendations: string[] = [];
  if (vramStatus === 'assente' || vramStatus === 'critico') {
    recommendations.push('Per modelli fluidi senza attese, installa una GPU dedicata con almeno 8 GB di VRAM (es. NVIDIA RTX 3060 / 4060 o superiore).');
  }
  if (ramGB < 16) {
    recommendations.push('Porta la RAM di sistema ad almeno 16 GB (consigliati 32 GB) per consentire al sistema operativo e al server di gestire modelli e buffer di contesto senza swap.');
  }
  if (storageType === 'hdd') {
    recommendations.push('Sostituisci o affianca un disco SSD NVMe: caricare un modello da 5-20 GB da un hard disk meccanico richiede minuti ad ogni avvio invece di 2 secondi.');
  }
  if (storageFreeGB < 40) {
    recommendations.push('Libera almeno 40-50 GB di spazio su disco: ogni modello compresso pesa tra 3 e 45 GB.');
  }
  if (gpuVendor === 'nvidia') {
    recommendations.push('NVIDIA offre la massima compatibilità nativa tramite CUDA e supporto per TensorRT-LLM, Ollama e vLLM.');
  } else if (gpuVendor === 'apple') {
    recommendations.push('I chip Apple Silicon (M1/M2/M3/M4 Pro/Max) sfruttano la memoria unificata tramite Metal con velocità eccezionale e bassissimo consumo energetico.');
  }

  // Model compatibility evaluation
  const runnableModels = POPULAR_MODELS.map(model => {
    let performance: 'Full GPU (Massima velocità)' | 'CPU Offload (Rallentato)' | 'Non raccomandato (OOM)' = 'Non raccomandato (OOM)';
    let estimatedTokSec = '1-3 tok/s';

    if (effectiveVram >= model.minVramGB) {
      performance = 'Full GPU (Massima velocità)';
      if (model.paramsB <= 4) estimatedTokSec = '45-90 tok/s';
      else if (model.paramsB <= 9) estimatedTokSec = '25-50 tok/s';
      else if (model.paramsB <= 16) estimatedTokSec = '18-35 tok/s';
      else if (model.paramsB <= 35) estimatedTokSec = '12-25 tok/s';
      else estimatedTokSec = '8-18 tok/s';
    } else if (ramGB >= model.minRamGB) {
      performance = 'CPU Offload (Rallentato)';
      if (model.paramsB <= 4) estimatedTokSec = '10-20 tok/s';
      else if (model.paramsB <= 9) estimatedTokSec = '5-12 tok/s';
      else if (model.paramsB <= 16) estimatedTokSec = '3-7 tok/s';
      else estimatedTokSec = '1-4 tok/s';
    } else {
      performance = 'Non raccomandato (OOM)';
      estimatedTokSec = '< 1 tok/s';
    }

    return {
      model,
      performance,
      estimatedTokSec
    };
  });

  const summary = tier === 'Avanzato (70B+ Workstation)'
    ? 'Il tuo PC è una vera workstation AI: puoi eseguire modelli avanzati da 70B parametri, modelli multimodali e servire più utenti in contemporanea sulla LAN!'
    : tier === 'Intermedio (12B - 32B)'
    ? 'Ottima configurazione: puoi eseguire modelli da 12B a 32B (inclusi Qwen 2.5 Coder 14B e DeepSeek R1 14B) in VRAM completa a piena velocità.'
    : tier === 'Base (3B - 8B)'
    ? 'Il tuo PC soddisfa i requisiti base: ideale per modelli da 3B a 8B (Llama 3.1 8B, DeepSeek R1 8B, Qwen Coder 7B) per assistere il lavoro quotidiano.'
    : 'La configurazione attuale ha limiti di VRAM o RAM: potrai eseguire solo modelli ultra-compatti (3B) o sfruttare la CPU con velocità ridotta.';

  return {
    score,
    tier,
    badgeColor,
    summary,
    vramStatus,
    ramStatus,
    storageStatus,
    runnableModels,
    recommendations
  };
}

export function calculateVramFormula(paramsB: number, quantBits: number, contextLength: number): {
  weightsVramGB: number;
  kvCacheVramGB: number;
  totalVramGB: number;
} {
  // Model weights = params (billions) * quantBits / 8 * 1.2 (overhead)
  const weights = (paramsB * (quantBits / 8)) * 1.2;
  
  // KV Cache: approx per 1024 context tokens:
  // for typical 7B-8B: ~0.25GB per 4096 tokens at FP16, scales with layers & context
  const kvCachePer1k = 0.05 * (paramsB / 8); 
  const kvCache = (contextLength / 1024) * kvCachePer1k;

  const total = weights + kvCache;

  return {
    weightsVramGB: Math.round(weights * 10) / 10,
    kvCacheVramGB: Math.round(kvCache * 10) / 10,
    totalVramGB: Math.round(total * 10) / 10
  };
}

export function generateServerScript(params: {
  engine: 'ollama' | 'llama_cpp' | 'vllm' | 'docker_localai';
  os: 'windows' | 'macos' | 'linux';
  bindLan: boolean;
  port: number;
  model: string;
}): {
  installCommand: string;
  runCommand: string;
  notes: string;
} {
  const { engine, os, bindLan, port, model } = params;
  const host = bindLan ? '0.0.0.0' : '127.0.0.1';

  if (engine === 'ollama') {
    let installCommand = '';
    let runCommand = '';

    if (os === 'windows') {
      installCommand = `# 1. Installa Ollama via winget
winget install Ollama.Ollama

# 2. Configura host per accesso LAN (${host}:${port})
[System.Environment]::SetEnvironmentVariable('OLLAMA_HOST', '${host}:${port}', 'User')
[System.Environment]::SetEnvironmentVariable('OLLAMA_ORIGINS', '*', 'User')`;

      runCommand = `# Avvia il server e scarica il modello
ollama serve
# In un altro terminale o successivamente:
ollama run ${model}`;
    } else if (os === 'macos') {
      installCommand = `# 1. Installa Ollama via Homebrew o script
brew install ollama

# 2. Esporta variabili per LAN ed origini CORS
export OLLAMA_HOST="${host}:${port}"
export OLLAMA_ORIGINS="*"`;

      runCommand = `# Avvia il demone server
ollama serve &
sleep 2
ollama run ${model}`;
    } else {
      // Linux
      installCommand = `# 1. Scarica e installa Ollama su Linux
curl -fsSL https://ollama.com/install.sh | sh

# 2. Configura il servizio systemd per ascoltare su LAN
sudo mkdir -p /etc/systemd/system/ollama.service.d
cat << 'EOF' | sudo tee /etc/systemd/system/ollama.service.d/override.conf
[Service]
Environment="OLLAMA_HOST=${host}:${port}"
Environment="OLLAMA_ORIGINS=*"
EOF

sudo systemctl daemon-reload
sudo systemctl restart ollama`;

      runCommand = `# Verifica stato ed esegui modello
systemctl status ollama
ollama run ${model}`;
    }

    return {
      installCommand,
      runCommand,
      notes: `Ollama espone un endpoint OpenAI-compatibile su http://${host === '0.0.0.0' ? '<IP-DEL-TUO-PC>' : 'localhost'}:${port}/v1 con supporto nativo streaming e tool calling.`
    };
  }

  if (engine === 'llama_cpp') {
    const install = os === 'windows'
      ? `# Scarica le release precompilate con supporto CUDA / AVX2 da GitHub
# https://github.com/ggerganov/llama.cpp/releases`
      : `# Compilazione nativa veloce con accelerazione GPU
git clone https://github.com/ggerganov/llama.cpp
cd llama.cpp
cmake -B build ${os === 'macos' ? '-DGGML_METAL=ON' : '-DGGML_CUDA=ON'}
cmake --build build --config Release -j`;

    const run = `./build/bin/llama-server --model ./models/${model}.gguf --host ${host} --port ${port} --ctx-size 8192 --n-gpu-layers 99`;

    return {
      installCommand: install,
      runCommand: run,
      notes: 'llama.cpp è la libreria C++ più efficiente per quantizzazioni GGUF con minimo overhead e pieno offload su GPU.'
    };
  }

  if (engine === 'vllm') {
    const install = `pip install vllm`;
    const run = `vllm serve meta-llama/${model} --host ${host} --port ${port} --dtype auto --api-key sk-local-secret`;
    return {
      installCommand: install,
      runCommand: run,
      notes: 'vLLM è progettato per throughput elevato e continuous batching, ideale per servire dozzine di richieste concorrenti.'
    };
  }

  // Docker LocalAI
  const dockerCompose = `version: '3.8'
services:
  local-ai:
    image: localai/localai:latest-aio-gpu-nvidia-cuda-12
    ports:
      - "${port}:8080"
    environment:
      - MODELS_PATH=/models
      - DEBUG=true
    volumes:
      - ./models:/models
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: all
              capabilities: [gpu]`;

  return {
    installCommand: `# Salva come docker-compose.yml ed esegui con Docker Compose\n${dockerCompose}`,
    runCommand: `docker compose up -d`,
    notes: 'LocalAI in container Docker fornisce supporto combinato per audio Whisper, modelli di testo e generazione immagini.'
  };
}
