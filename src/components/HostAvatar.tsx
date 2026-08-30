import React, { useEffect, useState } from 'react';
import { Volume2, Sparkles, MessageSquare, Mic } from 'lucide-react';
import { HostPersonality, HostMood } from '../types';
import { liveAudio } from '../services/liveAudio';

interface HostAvatarProps {
  host: HostPersonality;
  speechText?: string;
  mood?: HostMood;
  isSpeaking?: boolean;
  onReplayVoice?: () => void;
  onOpenVoiceChat?: () => void;
  compact?: boolean;
}

export const HostAvatar: React.FC<HostAvatarProps> = ({
  host,
  speechText,
  mood = 'idle',
  isSpeaking = false,
  onReplayVoice,
  onOpenVoiceChat,
  compact = false,
}) => {
  const [audioLevel, setAudioLevel] = useState(0);

  useEffect(() => {
    const unsubscribe = liveAudio.subscribeAudioLevel((level) => {
      setAudioLevel(level);
    });
    return () => unsubscribe();
  }, []);

  const speakingAura = isSpeaking || audioLevel > 0.05;

  return (
    <div className={`w-full flex ${compact ? 'flex-row items-center gap-3' : 'flex-col items-center gap-4'}`}>
      {/* Avatar Graphic & Lighting Stage */}
      <div className="relative flex items-center justify-center">
        {/* Ambient Glowing Aura */}
        <div
          className={`absolute -inset-2 rounded-3xl bg-gradient-to-r ${host.avatarBg} opacity-40 blur-xl transition-all duration-300 ${
            speakingAura ? 'scale-125 opacity-80' : 'scale-100'
          }`}
        />

        {/* Outer Avatar Frame */}
        <div
          className={`relative z-10 rounded-2xl p-1 bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 border ${
            speakingAura ? 'border-amber-400 shadow-xl shadow-amber-500/20' : 'border-slate-700'
          } transition-all duration-200`}
        >
          <div
            className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-gradient-to-br ${host.avatarBg} flex items-center justify-center text-3xl sm:text-4xl shadow-inner relative overflow-hidden`}
          >
            {/* Animated Emoji Avatar */}
            <span
              className={`transform transition-transform duration-150 select-none ${
                speakingAura ? 'scale-110' : 'scale-100'
              } ${mood === 'excited' ? 'animate-bounce' : ''}`}
            >
              {host.avatarEmoji}
            </span>

            {/* Speaking Audio Equalizer Wave Overlay at bottom */}
            {speakingAura && (
              <div className="absolute bottom-1.5 inset-x-2 flex items-end justify-center gap-0.5 h-3">
                {[40, 80, 100, 60, 90, 50, 75].map((height, i) => {
                  const scale = Math.max(0.2, Math.min(1.2, (audioLevel * 3 + height / 100) / 2));
                  return (
                    <div
                      key={i}
                      className="w-1 bg-amber-300 rounded-full transition-all duration-75"
                      style={{ height: `${Math.round(scale * 12)}px` }}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Live Speaking Status Badge */}
        <div className="absolute -bottom-2 z-20 flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-950/90 border border-slate-700 text-[10px] font-semibold text-slate-300 shadow-md">
          {speakingAura ? (
            <>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
              <span className="text-amber-300">Speaking...</span>
            </>
          ) : (
            <>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>{host.name.split(' ')[0]}</span>
            </>
          )}
        </div>
      </div>

      {/* Host Speech Bubble / Banter Output */}
      {speechText && (
        <div className="relative z-10 w-full max-w-2xl">
          <div className="relative rounded-2xl bg-slate-900/90 border border-slate-700/80 p-3.5 sm:p-4 shadow-xl backdrop-blur-md">
            {/* Pointer arrow */}
            {!compact && (
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-slate-900 border-t border-l border-slate-700/80 rotate-45" />
            )}

            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                    {host.name}
                  </span>
                  <span className="text-[10px] text-slate-400">({host.title})</span>
                </div>
                <p className="text-sm sm:text-base text-slate-200 font-medium leading-relaxed italic">
                  "{speechText}"
                </p>
              </div>

              {/* Action Buttons: Replay Voice or Talk to Host */}
              <div className="flex flex-col gap-1.5 shrink-0">
                {onReplayVoice && (
                  <button
                    id="host-replay-voice-btn"
                    onClick={onReplayVoice}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-amber-300 transition"
                    title="Replay Voice Audio"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                )}
                {onOpenVoiceChat && (
                  <button
                    id="host-talk-direct-btn"
                    onClick={onOpenVoiceChat}
                    className="p-1.5 rounded-lg bg-violet-600/30 hover:bg-violet-600/50 border border-violet-500/40 text-violet-300 hover:text-white transition"
                    title="Talk back to host (Live Audio)"
                  >
                    <Mic className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
