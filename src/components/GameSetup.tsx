import React, { useState } from 'react';
import {
  Sparkles,
  Search,
  Zap,
  ShieldAlert,
  Flame,
  Clock,
  HelpCircle,
  Play,
  Volume2,
  Trophy,
  Sliders,
  ChevronRight,
} from 'lucide-react';
import { GameSettings, HostPersonality, GameMode, DifficultyLevel } from '../types';
import { TRIVIA_CATEGORIES } from '../constants/hosts';
import { soundFX } from '../services/soundFx';

interface GameSetupProps {
  host: HostPersonality;
  onStartGame: (settings: GameSettings) => void;
  onChangeHost: () => void;
  isLoading: boolean;
}

export const GameSetup: React.FC<GameSetupProps> = ({
  host,
  onStartGame,
  onChangeHost,
  isLoading,
}) => {
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [customTopic, setCustomTopic] = useState('');
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('medium');
  const [gameMode, setGameMode] = useState<GameMode>('classic');
  const [questionCount, setQuestionCount] = useState(5);
  const [timePerQuestion, setTimePerQuestion] = useState(20);
  const [ttsEnabled, setTtsEnabled] = useState(true);

  const handleLaunch = () => {
    soundFX.playPowerup();
    onStartGame({
      category: selectedCategory,
      customTopic: customTopic.trim() ? customTopic.trim() : undefined,
      difficulty,
      questionCount: gameMode === 'speed_blitz' ? 10 : questionCount,
      timePerQuestion: gameMode === 'speed_blitz' ? 10 : timePerQuestion,
      gameMode,
      host,
      ttsEnabled,
    });
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Hero Banner with Selected Host Spotlight */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-5">
            <div className="relative">
              <div
                className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br ${host.avatarBg} flex items-center justify-center text-4xl sm:text-5xl shadow-xl border border-amber-400/30`}
              >
                {host.avatarEmoji}
              </div>
              <div className="absolute -bottom-2 -right-1 px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 font-bold text-[10px] uppercase tracking-wider shadow-md">
                Host
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold text-amber-400 tracking-wide uppercase">
                  AI Quizmaster
                </span>
                <span className="text-xs text-slate-500">•</span>
                <span className="text-xs text-slate-400">Voice: {host.voice}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
                {host.name}
              </h2>
              <p className="text-sm text-slate-300 max-w-md mt-0.5 line-clamp-2">
                "{host.greetingPhrases[0]}"
              </p>
            </div>
          </div>

          <button
            id="setup-change-host-btn"
            onClick={onChangeHost}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold text-sm transition active:scale-95 shadow-md"
          >
            <span>Switch Host Personality</span>
            <ChevronRight className="w-4 h-4 text-amber-400" />
          </button>
        </div>
      </div>

      {/* Main Setup Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Topics & Categories (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Custom Grounded Topic Input */}
          <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-5 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-slate-200 flex items-center gap-2">
                <Search className="w-4 h-4 text-amber-400" />
                <span>Custom Topic or Specialty</span>
              </label>
              <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                <Sparkles className="w-3 h-3" />
                Google Search Grounded
              </span>
            </div>

            <div className="relative">
              <input
                id="custom-trivia-topic-input"
                type="text"
                value={customTopic}
                onChange={(e) => setCustomTopic(e.target.value)}
                placeholder="e.g. 2024 Olympic Breakdancing, Marvel Phase 5, James Webb Telescope, 90s Grunge..."
                className="w-full pl-4 pr-10 py-3 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400 text-sm shadow-inner transition"
              />
              {customTopic && (
                <button
                  onClick={() => setCustomTopic('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-200"
                >
                  Clear
                </button>
              )}
            </div>
            <p className="text-xs text-slate-400">
              Type any specific curiosity above, or select a preset category below. Gemini will use live Google Search to craft accurate, fresh questions!
            </p>
          </div>

          {/* Preset Categories */}
          <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-5 shadow-xl space-y-3">
            <h3 className="text-sm font-bold text-slate-200">
              Or Choose a Preset Category
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {TRIVIA_CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat.id && !customTopic.trim();
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      soundFX.playSelect();
                      setSelectedCategory(cat.id);
                      setCustomTopic('');
                    }}
                    className={`p-3 rounded-xl border text-left transition flex items-center justify-between ${
                      isSelected
                        ? 'bg-amber-500/15 border-amber-400/80 text-amber-200 shadow-md shadow-amber-500/10'
                        : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-900 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="font-semibold text-sm">{cat.name}</div>
                      <div className="text-xs text-slate-400 line-clamp-1">{cat.description}</div>
                    </div>
                    {isSelected && (
                      <div className="w-2 h-2 rounded-full bg-amber-400 shrink-0 ml-2" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Game Mode, Difficulty, Rules & Launch */}
        <div className="space-y-6">
          {/* Game Mode */}
          <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-5 shadow-xl space-y-3">
            <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Game Mode</span>
            </h3>

            <div className="space-y-2">
              {[
                {
                  id: 'classic' as GameMode,
                  title: 'Classic Game Show',
                  desc: 'Standard round with progressive multipliers & lifelines',
                  icon: Trophy,
                  color: 'text-amber-400',
                },
                {
                  id: 'survival' as GameMode,
                  title: 'Survival Sudden Death',
                  desc: '3 strikes and the AI host boots you off stage',
                  icon: ShieldAlert,
                  color: 'text-rose-400',
                },
                {
                  id: 'speed_blitz' as GameMode,
                  title: 'Speed Blitz Frenzy',
                  desc: 'Rapid fire questions with 10s blitz timer',
                  icon: Flame,
                  color: 'text-orange-400',
                },
              ].map((mode) => {
                const isSelected = gameMode === mode.id;
                const IconComponent = mode.icon;
                return (
                  <button
                    key={mode.id}
                    onClick={() => {
                      soundFX.playSelect();
                      setGameMode(mode.id);
                    }}
                    className={`w-full p-3 rounded-xl border text-left transition flex items-start gap-3 ${
                      isSelected
                        ? 'bg-amber-500/15 border-amber-400/80 text-slate-100 shadow-md shadow-amber-500/10'
                        : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-900 hover:border-slate-700'
                    }`}
                  >
                    <IconComponent className={`w-5 h-5 shrink-0 mt-0.5 ${mode.color}`} />
                    <div>
                      <div className="font-semibold text-sm">{mode.title}</div>
                      <div className="text-xs text-slate-400">{mode.desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Difficulty & Match Settings */}
          <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-5 shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-amber-400" />
              <span>Match Settings</span>
            </h3>

            {/* Difficulty Pills */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                Difficulty Level
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {[
                  { id: 'easy', label: 'Easy' },
                  { id: 'medium', label: 'Medium' },
                  { id: 'hard', label: 'Hard' },
                  { id: 'adaptive', label: 'Adaptive' },
                ].map((d) => (
                  <button
                    key={d.id}
                    onClick={() => {
                      soundFX.playSelect();
                      setDifficulty(d.id as DifficultyLevel);
                    }}
                    className={`py-1.5 text-xs font-semibold rounded-lg border transition ${
                      difficulty === d.id
                        ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Question Count & Timer */}
            {gameMode !== 'speed_blitz' && (
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">
                    Questions
                  </label>
                  <select
                    value={questionCount}
                    onChange={(e) => setQuestionCount(Number(e.target.value))}
                    className="w-full px-2.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs font-medium focus:outline-none focus:border-amber-400"
                  >
                    <option value={5}>5 Questions (Quick)</option>
                    <option value={10}>10 Questions (Standard)</option>
                    <option value={15}>15 Questions (Full Show)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">
                    Timer / Question
                  </label>
                  <select
                    value={timePerQuestion}
                    onChange={(e) => setTimePerQuestion(Number(e.target.value))}
                    className="w-full px-2.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs font-medium focus:outline-none focus:border-amber-400"
                  >
                    <option value={15}>15 Seconds</option>
                    <option value={20}>20 Seconds</option>
                    <option value={30}>30 Seconds</option>
                    <option value={0}>Untimed (Relaxed)</option>
                  </select>
                </div>
              </div>
            )}

            {/* Host Voice Toggle */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
              <span className="text-xs text-slate-300 font-medium flex items-center gap-1.5">
                <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                <span>Host Voice Commentary (TTS)</span>
              </span>
              <button
                onClick={() => setTtsEnabled(!ttsEnabled)}
                className={`w-11 h-6 rounded-full transition-colors relative ${
                  ttsEnabled ? 'bg-amber-500' : 'bg-slate-800'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-slate-950 absolute top-1 transition-transform ${
                    ttsEnabled ? 'left-6' : 'left-1'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Launch Action Button */}
          <button
            id="start-trivia-game-btn"
            disabled={isLoading}
            onClick={handleLaunch}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-lg shadow-xl shadow-amber-500/25 transition active:scale-98 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                <span>{host.name} is preparing questions...</span>
              </>
            ) : (
              <>
                <Play className="w-5 h-5 fill-slate-950" />
                <span>START TRIVIA MATCH</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
