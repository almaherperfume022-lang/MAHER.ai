import React, { useState } from 'react';
import { Sparkles, Volume2, Plus, Check, Play, Square, Wand2 } from 'lucide-react';
import { HostPersonality, HostVoice } from '../types';
import { PRESET_HOSTS, createCustomHost } from '../constants/hosts';
import { generateHostTTS } from '../services/api';
import { liveAudio } from '../services/liveAudio';
import { soundFX } from '../services/soundFx';

interface HostSelectorProps {
  selectedHost: HostPersonality;
  onSelectHost: (host: HostPersonality) => void;
  onClose?: () => void;
}

export const HostSelector: React.FC<HostSelectorProps> = ({
  selectedHost,
  onSelectHost,
  onClose,
}) => {
  const [hosts, setHosts] = useState<HostPersonality[]>(() => {
    const savedCustom = localStorage.getItem('persona_trivia_custom_hosts');
    if (savedCustom) {
      try {
        const parsed = JSON.parse(savedCustom);
        return [...PRESET_HOSTS, ...parsed];
      } catch (e) {}
    }
    return PRESET_HOSTS;
  });

  const [isPlayingPreviewId, setIsPlayingPreviewId] = useState<string | null>(null);
  const [isCreatingCustom, setIsCreatingCustom] = useState(false);

  // Custom Host Form State
  const [customName, setCustomName] = useState('');
  const [customTitle, setCustomTitle] = useState('');
  const [customEmoji, setCustomEmoji] = useState('🎭');
  const [customVoice, setCustomVoice] = useState<HostVoice>('Puck');
  const [customDescription, setCustomDescription] = useState('');
  const [customPrompt, setCustomPrompt] = useState('');

  const handlePlayPreview = async (host: HostPersonality, e: React.MouseEvent) => {
    e.stopPropagation();
    soundFX.playSelect();

    if (isPlayingPreviewId === host.id) {
      liveAudio.stop();
      setIsPlayingPreviewId(null);
      return;
    }

    setIsPlayingPreviewId(host.id);
    const sampleQuote = host.greetingPhrases[0] || `Hello, I am ${host.name}, your trivia host!`;

    try {
      const res = await generateHostTTS(sampleQuote, host.voice);
      if (res.success && res.audioBase64) {
        await liveAudio.playBase64Pcm(res.audioBase64);
      } else {
        await liveAudio.speakFallback(sampleQuote, host.voice === 'Kore' ? 'female' : 'male');
      }
    } catch (err) {
      console.warn('Voice preview failed, using fallback speech:', err);
      await liveAudio.speakFallback(sampleQuote);
    } finally {
      setIsPlayingPreviewId(null);
    }
  };

  const handleSelect = (host: HostPersonality) => {
    soundFX.playSelect();
    onSelectHost(host);
    if (onClose) onClose();
  };

  const handleSaveCustomHost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim()) return;

    soundFX.playPowerup();
    const newHost = createCustomHost({
      name: customName.trim(),
      title: customTitle.trim() || 'Dynamic Trivia Host',
      avatarEmoji: customEmoji || '🎭',
      voice: customVoice,
      styleDescription: customDescription.trim() || 'Custom created personality.',
      systemPrompt: customPrompt.trim() || `You are ${customName.trim()}, a lively trivia host. Keep commentary punchy (2 sentences max).`,
    });

    const updated = [...hosts, newHost];
    setHosts(updated);

    // Save custom hosts to local storage
    const customOnly = updated.filter((h) => h.isCustom);
    localStorage.setItem('persona_trivia_custom_hosts', JSON.stringify(customOnly));

    onSelectHost(newHost);
    setIsCreatingCustom(false);
    if (onClose) onClose();
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 bg-slate-900/90 rounded-3xl border border-slate-800 shadow-2xl backdrop-blur-xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-300 font-bold text-sm">
              AI Host Studio
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100">
              Choose Your AI Host Personality
            </h2>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Each host brings their own unique voice, banter, commentary style, and attitude to your trivia stage.
          </p>
        </div>

        <button
          id="create-custom-host-toggle-btn"
          onClick={() => {
            soundFX.playSelect();
            setIsCreatingCustom(!isCreatingCustom);
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition active:scale-95"
        >
          {isCreatingCustom ? <Sparkles className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          <span>{isCreatingCustom ? 'Browse Presets' : 'Create Custom Host'}</span>
        </button>
      </div>

      {/* Mode A: Custom Host Creator Form */}
      {isCreatingCustom ? (
        <form onSubmit={handleSaveCustomHost} className="mt-6 space-y-6 max-w-2xl mx-auto">
          <div className="bg-slate-950/60 rounded-2xl p-6 border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <Wand2 className="w-4 h-4" />
              <span>Design Your Own Trivia Persona</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Host Name *
                </label>
                <input
                  id="custom-host-name-input"
                  type="text"
                  required
                  placeholder="e.g. Captain Blackbeard, GLaDOS, Shakespeare"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Avatar Emoji
                </label>
                <div className="flex items-center gap-2">
                  <input
                    id="custom-host-emoji-input"
                    type="text"
                    maxLength={3}
                    value={customEmoji}
                    onChange={(e) => setCustomEmoji(e.target.value)}
                    className="w-16 text-center px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-2xl focus:outline-none focus:border-amber-400"
                  />
                  <span className="text-xs text-slate-400">Pick any emoji</span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Host Title / Subtitle
              </label>
              <input
                id="custom-host-title-input"
                type="text"
                placeholder="e.g. Dread Pirate of the Seven Trivia Seas"
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Gemini Voice Config (Model: gemini-3.1-flash-tts-preview)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {(['Puck', 'Charon', 'Kore', 'Fenrir', 'Zephyr'] as HostVoice[]).map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setCustomVoice(v)}
                    className={`py-2 px-3 rounded-xl border text-xs font-medium transition ${
                      customVoice === v
                        ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Personality Description & Tone
              </label>
              <input
                id="custom-host-desc-input"
                type="text"
                placeholder="e.g. Speaks in pirate slang, treats wrong answers like walking the plank."
                value={customDescription}
                onChange={(e) => setCustomDescription(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Detailed System Prompt Instructions (Optional)
              </label>
              <textarea
                id="custom-host-prompt-input"
                rows={3}
                placeholder="Detailed instructions for how the AI host should speak, banter, tease, and praise..."
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400 text-xs font-mono"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsCreatingCustom(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium transition"
              >
                Cancel
              </button>
              <button
                id="save-custom-host-btn"
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition active:scale-95"
              >
                Save & Select Host
              </button>
            </div>
          </div>
        </form>
      ) : (
        /* Mode B: Host Cards Grid */
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {hosts.map((host) => {
            const isSelected = selectedHost.id === host.id;
            const isPlaying = isPlayingPreviewId === host.id;

            return (
              <div
                key={host.id}
                onClick={() => handleSelect(host)}
                className={`relative group rounded-2xl p-4 sm:p-5 border cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-slate-800/90 border-amber-400/80 shadow-lg shadow-amber-500/10 ring-1 ring-amber-400/50'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
                }`}
              >
                {/* Top Row: Avatar & Select indicator */}
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${host.avatarBg} flex items-center justify-center text-2xl shadow-inner`}
                      >
                        {host.avatarEmoji}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-100 text-base group-hover:text-amber-300 transition">
                          {host.name}
                        </h3>
                        <p className="text-xs text-slate-400">{host.title}</p>
                      </div>
                    </div>

                    {isSelected && (
                      <div className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-xs shadow-md">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </div>

                  {/* Badge */}
                  <div className="inline-block px-2.5 py-0.5 rounded-full bg-slate-800 text-[11px] font-medium text-amber-300/90 border border-slate-700 mb-2">
                    {host.badge}
                  </div>

                  {/* Personality Description */}
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {host.styleDescription}
                  </p>
                </div>

                {/* Bottom Row: Voice preview & Select button */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                  <button
                    onClick={(e) => handlePlayPreview(host, e)}
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-medium transition ${
                      isPlaying
                        ? 'bg-amber-500/20 border-amber-400 text-amber-300 animate-pulse'
                        : 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800'
                    }`}
                    title="Listen to Voice Sample"
                  >
                    {isPlaying ? <Square className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-amber-400" />}
                    <span>{isPlaying ? 'Stop' : `Voice (${host.voice})`}</span>
                  </button>

                  <button
                    onClick={() => handleSelect(host)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                      isSelected
                        ? 'bg-amber-400 text-slate-950'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                    }`}
                  >
                    {isSelected ? 'Active Host' : 'Select'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
