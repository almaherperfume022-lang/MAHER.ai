import React, { useState, useEffect } from 'react';
import {
  Trophy,
  Award,
  Sparkles,
  Flame,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Volume2,
  Share2,
  Users,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { HostPersonality, QuestionResult, GameStats } from '../types';
import { HostAvatar } from './HostAvatar';
import { liveAudio } from '../services/liveAudio';
import { soundFX } from '../services/soundFx';
import { getHostCommentary, generateHostTTS } from '../services/api';

interface GameOverScreenProps {
  host: HostPersonality;
  stats: GameStats;
  results: QuestionResult[];
  categoryName: string;
  ttsEnabled: boolean;
  onPlayAgain: () => void;
  onChangeSetup: () => void;
  onChangeHost: () => void;
}

export const GameOverScreen: React.FC<GameOverScreenProps> = ({
  host,
  stats,
  results,
  categoryName,
  ttsEnabled,
  onPlayAgain,
  onChangeSetup,
  onChangeHost,
}) => {
  const [hostVerdictText, setHostVerdictText] = useState(
    host.gameOverPhrases[0] || 'That was quite a match!'
  );
  const [isHostSpeaking, setIsHostSpeaking] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [copiedShare, setCopiedShare] = useState(false);

  const accuracyPct = Math.round((stats.correctCount / Math.max(1, stats.totalAnswered)) * 100);

  useEffect(() => {
    soundFX.playVictory();
    if (accuracyPct >= 60) {
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
    }

    // Fetch dynamic host final report card
    async function fetchVerdict() {
      try {
        const res = await getHostCommentary({
          host,
          action: 'game_over',
          stats,
          score: stats.score,
          generateVoice: ttsEnabled,
        });

        if (res.success && res.commentary) {
          setHostVerdictText(res.commentary);
          if (ttsEnabled && res.audioBase64) {
            setIsHostSpeaking(true);
            await liveAudio.playBase64Pcm(res.audioBase64);
            setIsHostSpeaking(false);
          }
        }
      } catch (e) {
        console.warn('Game over verdict error:', e);
      }
    }

    fetchVerdict();

    return () => {
      liveAudio.stop();
    };
  }, []);

  const handleShare = () => {
    const text = `🧠 I scored ${stats.score.toLocaleString()} pts (${accuracyPct}% accuracy) on PersonaTrivia AI with ${host.name}! Can you beat my score?`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2500);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Top Banner / Verdict */}
      <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 shadow-2xl backdrop-blur-xl text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 font-bold text-xs uppercase tracking-wider">
          <Trophy className="w-3.5 h-3.5" />
          <span>Match Complete • {categoryName}</span>
        </div>

        {/* Big Score Display */}
        <div className="space-y-1">
          <div className="text-4xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-200 tracking-tight font-mono">
            {stats.score.toLocaleString()}
          </div>
          <p className="text-xs sm:text-sm text-slate-400 font-medium">
            Final Trivia Score
          </p>
        </div>

        {/* 4 Metric Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
          <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800">
            <div className="text-xl font-bold text-slate-100">
              {stats.correctCount} / {stats.totalAnswered}
            </div>
            <div className="text-xs text-slate-400 mt-0.5">Correct Answers</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800">
            <div className="text-xl font-bold text-emerald-400">
              {accuracyPct}%
            </div>
            <div className="text-xs text-slate-400 mt-0.5">Accuracy Rate</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800">
            <div className="text-xl font-bold text-orange-400 flex items-center justify-center gap-1">
              <Flame className="w-4 h-4 fill-orange-400" />
              <span>{stats.maxStreak}x</span>
            </div>
            <div className="text-xs text-slate-400 mt-0.5">Max Streak</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800">
            <div className="text-xl font-bold text-amber-300">
              +{stats.timeBonus.toLocaleString()}
            </div>
            <div className="text-xs text-slate-400 mt-0.5">Speed Bonus</div>
          </div>
        </div>

        {/* AI Host Report Card */}
        <HostAvatar
          host={host}
          speechText={hostVerdictText}
          mood={accuracyPct >= 60 ? 'excited' : 'smug'}
          isSpeaking={isHostSpeaking}
          onReplayVoice={() => {
            setIsHostSpeaking(true);
            generateHostTTS(hostVerdictText, host.voice)
              .then((res) => {
                if (res.audioBase64) liveAudio.playBase64Pcm(res.audioBase64);
              })
              .finally(() => setIsHostSpeaking(false));
          }}
        />

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            id="play-again-btn"
            onClick={onPlayAgain}
            className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-sm shadow-xl shadow-amber-500/20 transition active:scale-95 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Play Again</span>
          </button>

          <button
            id="change-setup-btn"
            onClick={onChangeSetup}
            className="px-5 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm transition active:scale-95 cursor-pointer"
          >
            Change Category & Settings
          </button>

          <button
            id="change-host-btn"
            onClick={onChangeHost}
            className="px-5 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-semibold text-sm transition active:scale-95 cursor-pointer"
          >
            Switch AI Host
          </button>

          <button
            id="share-score-btn"
            onClick={handleShare}
            className="p-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition active:scale-95 cursor-pointer"
            title="Copy Scorecard to Clipboard"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>

        {copiedShare && (
          <p className="text-xs text-emerald-400 font-semibold animate-pulse">
            ✓ Score summary copied to clipboard!
          </p>
        )}
      </div>

      {/* Detailed Question Review List */}
      <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 shadow-2xl space-y-4">
        <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-400" />
          <span>Question Review & Google Grounded Sources</span>
        </h3>

        <div className="space-y-3">
          {results.map((res, idx) => {
            const isExpanded = expandedIndex === idx;
            const correctOpt = res.question.options.find((o) => o.id === res.question.correctAnswerId);
            const userOpt = res.question.options.find((o) => o.id === res.selectedAnswerId);

            return (
              <div
                key={idx}
                className="rounded-2xl bg-slate-950/70 border border-slate-800/80 overflow-hidden transition"
              >
                <div
                  onClick={() => setExpandedIndex(isExpanded ? null : idx)}
                  className="p-4 flex items-center justify-between gap-3 cursor-pointer hover:bg-slate-900/50"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="shrink-0">
                      {res.isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <XCircle className="w-5 h-5 text-rose-400" />
                      )}
                    </div>
                    <div className="text-xs sm:text-sm font-semibold text-slate-200 truncate">
                      {idx + 1}. {res.question.question}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs font-mono font-bold text-amber-400">
                      +{res.pointsEarned} pts
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    )}
                  </div>
                </div>

                {isExpanded && (
                  <div className="px-4 pb-4 pt-1 border-t border-slate-800/80 text-xs sm:text-sm space-y-2 bg-slate-950/40">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                      <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                        <span className="text-slate-500 font-semibold block text-[11px]">
                          Your Answer:
                        </span>
                        <span
                          className={`font-semibold ${
                            res.isCorrect ? 'text-emerald-400' : 'text-rose-400'
                          }`}
                        >
                          {userOpt ? `${userOpt.id}. ${userOpt.text}` : 'No answer (Timed out)'}
                        </span>
                      </div>

                      <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                        <span className="text-slate-500 font-semibold block text-[11px]">
                          Correct Answer:
                        </span>
                        <span className="font-semibold text-emerald-400">
                          {correctOpt ? `${correctOpt.id}. ${correctOpt.text}` : 'N/A'}
                        </span>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                      <strong className="text-amber-300">Explanation:</strong> {res.question.explanation}
                    </div>

                    {res.question.groundingSources && res.question.groundingSources.length > 0 && (
                      <div className="pt-2">
                        <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1 mb-1.5">
                          <Sparkles className="w-3 h-3 text-emerald-400" />
                          Verified with Google Search Sources:
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {res.question.groundingSources.map((source, sIdx) => (
                            <a
                              key={sIdx}
                              href={source.uri}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-[11px] text-amber-300 hover:underline"
                            >
                              <span className="truncate max-w-[200px]">{source.title || source.uri}</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
