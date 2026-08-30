import React from 'react';
import { Volume2, VolumeX, Mic, Sparkles, MessageSquare, RefreshCw, Trophy } from 'lucide-react';
import { HostPersonality } from '../types';

interface HeaderProps {
  host: HostPersonality;
  ttsEnabled: boolean;
  soundFxEnabled: boolean;
  onToggleTts: () => void;
  onToggleSoundFx: () => void;
  onChangeHost: () => void;
  onOpenLiveChat: () => void;
  score?: number;
  inGame?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  host,
  ttsEnabled,
  soundFxEnabled,
  onToggleTts,
  onToggleSoundFx,
  onChangeHost,
  onOpenLiveChat,
  score,
  inGame,
}) => {
  return (
    <header className="w-full bg-slate-900/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Brand & Host Identity */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/20 text-white font-bold text-xl">
            🧠
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold text-slate-100 tracking-tight">
                PersonaTrivia <span className="text-amber-400 text-xs px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30">AI Live</span>
              </h1>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <span>Host:</span>
              <button
                onClick={onChangeHost}
                className="font-medium text-amber-300 hover:text-amber-200 underline decoration-amber-400/40 hover:decoration-amber-300 flex items-center gap-1 transition"
                title="Change AI Host Personality"
              >
                <span>{host.avatarEmoji} {host.name}</span>
                <RefreshCw className="w-3 h-3 text-slate-400 hover:text-amber-300" />
              </button>
            </div>
          </div>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {inGame && score !== undefined && (
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono font-semibold text-sm">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>{score.toLocaleString()} pts</span>
            </div>
          )}

          {/* Live Voice / Chat with Host Button */}
          <button
            id="header-talk-host-btn"
            onClick={onOpenLiveChat}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-medium text-xs sm:text-sm shadow-md shadow-indigo-600/25 transition active:scale-95"
            title="Open real-time voice conversation or chat with your AI Host"
          >
            <Mic className="w-3.5 h-3.5 text-violet-200 animate-pulse" />
            <span className="hidden xs:inline">Talk to Host</span>
            <span className="xs:hidden">Chat</span>
          </button>

          {/* Voice Speech (TTS) Toggle */}
          <button
            id="header-tts-toggle-btn"
            onClick={onToggleTts}
            className={`p-2 rounded-lg border transition ${
              ttsEnabled
                ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/20'
                : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:text-slate-200'
            }`}
            title={ttsEnabled ? 'AI Host Voice (TTS) Enabled' : 'AI Host Voice (TTS) Muted'}
          >
            {ttsEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Sound FX Toggle */}
          <button
            id="header-sfx-toggle-btn"
            onClick={onToggleSoundFx}
            className={`p-2 rounded-lg border transition text-xs font-mono font-semibold ${
              soundFxEnabled
                ? 'bg-amber-500/10 border-amber-500/40 text-amber-300 hover:bg-amber-500/20'
                : 'bg-slate-800/80 border-slate-700 text-slate-500 hover:text-slate-300 line-through'
            }`}
            title={soundFxEnabled ? 'Sound FX Enabled' : 'Sound FX Disabled'}
          >
            SFX
          </button>
        </div>
      </div>
    </header>
  );
};
