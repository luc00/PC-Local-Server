import test from 'node:test';
import assert from 'node:assert/strict';
import { evaluateHardware, calculateVramFormula, generateServerScript, POPULAR_MODELS } from './hardwareChecker.ts';

test('POPULAR_MODELS contains baseline, intermediate and advanced models', () => {
  assert.ok(POPULAR_MODELS.length >= 8);
  const llama8b = POPULAR_MODELS.find(m => m.id === 'llama-3.1-8b');
  assert.ok(llama8b);
  assert.equal(llama8b?.tier, 'base');

  const llama70b = POPULAR_MODELS.find(m => m.id === 'llama-3.3-70b');
  assert.ok(llama70b);
  assert.equal(llama70b?.tier, 'avanzato');
});

test('evaluateHardware correctly identifies Base Tier for RTX 3060 12GB + 16GB RAM', () => {
  const result = evaluateHardware({
    gpuVendor: 'nvidia',
    gpuModel: 'NVIDIA GeForce RTX 3060 12GB',
    vramGB: 12,
    ramGB: 16,
    storageType: 'nvme_ssd',
    storageFreeGB: 200,
    os: 'windows'
  });

  assert.ok(result.score >= 70, `Score was ${result.score}`);
  assert.equal(result.tier, 'Intermedio (12B - 32B)');
  assert.equal(result.vramStatus, 'ottimo');
  assert.equal(result.storageStatus, 'ottimo');
  
  // Can run 8b model on full GPU
  const r1_8b = result.runnableModels.find(r => r.model.id === 'deepseek-r1-8b');
  assert.equal(r1_8b?.performance, 'Full GPU (Massima velocità)');
});

test('evaluateHardware identifies Apple Silicon unified memory properly', () => {
  const result = evaluateHardware({
    gpuVendor: 'apple',
    gpuModel: 'Apple M3 Max 64GB',
    vramGB: 0,
    ramGB: 64,
    storageType: 'nvme_ssd',
    storageFreeGB: 500,
    os: 'macos'
  });

  assert.equal(result.tier, 'Avanzato (70B+ Workstation)');
  assert.ok(result.score >= 85);
  const llama70b = result.runnableModels.find(r => r.model.id === 'llama-3.3-70b');
  assert.equal(llama70b?.performance, 'Full GPU (Massima velocità)');
});

test('calculateVramFormula calculates correct memory consumption', () => {
  // 8B params, 4-bit, 8192 context tokens
  const res = calculateVramFormula(8, 4, 8192);
  // (8 * 0.5) * 1.2 = 4.8 GB for weights
  assert.ok(res.weightsVramGB >= 4.5 && res.weightsVramGB <= 5.2);
  assert.ok(res.totalVramGB >= 5.0 && res.totalVramGB <= 6.5);
});

test('generateServerScript generates valid Ollama config with host and port', () => {
  const script = generateServerScript({
    engine: 'ollama',
    os: 'linux',
    bindLan: true,
    port: 11434,
    model: 'llama3.1:8b'
  });

  assert.ok(script.installCommand.includes('OLLAMA_HOST=0.0.0.0:11434'));
  assert.ok(script.runCommand.includes('ollama run llama3.1:8b'));
});
