import React, { useState } from 'react';
import { Header } from './components/Header';
import { GameSetup } from './components/GameSetup';
import { HostSelector } from './components/HostSelector';
import { TriviaScreen } from './components/TriviaScreen';
import { GameOverScreen } from './components/GameOverScreen';
import { HostChatModal } from './components/HostChatModal';
import { PRESET_HOSTS, TRIVIA_CATEGORIES } from './constants/hosts';
import {
  HostPersonality,
  GameSettings,
  TriviaQuestion,
  QuestionResult,
  GameStats,
} from './types';
import { generateTriviaQuestions } from './services/api';
import { soundFX } from './services/soundFx';
import { liveAudio } from './services/liveAudio';
import { Sparkles, AlertCircle, RefreshCw } from 'lucide-react';

export default function App() {
  const [host, setHost] = useState<HostPersonality>(PRESET_HOSTS[0]);
  const [activeView, setActiveView] = useState<'setup' | 'host_selector' | 'playing' | 'game_over'>('setup');
  const [gameSettings, setGameSettings] = useState<GameSettings | null>(null);
  const [questions, setQuestions] = useState<TriviaQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Audio Toggles
  const [ttsEnabled, setTtsEnabled] = useState(true);
  const [soundFxEnabled, setSoundFxEnabled] = useState(true);

  // Live Chat / Voice Lounge Modal
  const [isLiveChatOpen, setIsLiveChatOpen] = useState(false);

  // Game Progress Stats & Results
  const [stats, setStats] = useState<GameStats>({
    score: 0,
    correctCount: 0,
    totalAnswered: 0,
    currentStreak: 0,
    maxStreak: 0,
    timeBonus: 0,
    lifelinesUsed: 0,
    livesRemaining: 3,
  });
  const [results, setResults] = useState<QuestionResult[]>([]);

  // Start Trivia Game Workflow
  const handleStartGame = async (settings: GameSettings) => {
    setGameSettings(settings);
    setIsLoadingQuestions(true);
    setLoadError(null);
    setTtsEnabled(settings.ttsEnabled);

    try {
      const result = await generateTriviaQuestions({
        category: settings.category,
        customTopic: settings.customTopic,
        difficulty: settings.difficulty,
        count: settings.questionCount,
        hostName: settings.host.name,
        hostStyle: settings.host.styleDescription,
      });

      if (!result.success || !result.questions || result.questions.length === 0) {
        throw new Error(result.error || 'Failed to generate questions. Please try again.');
      }

      setQuestions(result.questions);
      setCurrentQuestionIndex(0);
      setStats({
        score: 0,
        correctCount: 0,
        totalAnswered: 0,
        currentStreak: 0,
        maxStreak: 0,
        timeBonus: 0,
        lifelinesUsed: 0,
        livesRemaining: 3,
      });
      setResults([]);
      setActiveView('playing');
    } catch (err: any) {
      console.error('Start game error:', err);
      setLoadError(err.message || 'Unable to generate trivia questions with Gemini.');
    } finally {
      setIsLoadingQuestions(false);
    }
  };

  // Answer Submission Handler
  const handleAnswer = (
    selectedId: string,
    isCorrect: boolean,
    timeSpent: number,
    points: number
  ) => {
    const currentQ = questions[currentQuestionIndex];
    if (!currentQ) return;

    const newStreak = isCorrect ? stats.currentStreak + 1 : 0;
    const newMaxStreak = Math.max(stats.maxStreak, newStreak);
    const newLives = !isCorrect && gameSettings?.gameMode === 'survival'
      ? (stats.livesRemaining || 3) - 1
      : stats.livesRemaining;

    const newResult: QuestionResult = {
      question: currentQ,
      selectedAnswerId: selectedId,
      isCorrect,
      timeSpent,
      pointsEarned: points,
    };

    const updatedResults = [...results, newResult];
    setResults(updatedResults);

    setStats((prev) => ({
      ...prev,
      score: prev.score + points,
      correctCount: prev.correctCount + (isCorrect ? 1 : 0),
      totalAnswered: prev.totalAnswered + 1,
      currentStreak: newStreak,
      maxStreak: newMaxStreak,
      livesRemaining: newLives,
    }));

    // Delay slightly to let the host banter & sound FX complete before advancing
    setTimeout(() => {
      // Check if Survival game over
      if (gameSettings?.gameMode === 'survival' && newLives !== undefined && newLives <= 0) {
        setActiveView('game_over');
        return;
      }

      // Check if finished all questions
      if (currentQuestionIndex + 1 < questions.length) {
        setCurrentQuestionIndex((prev) => prev + 1);
      } else {
        setActiveView('game_over');
      }
    }, 2800);
  };

  // Timeout Handler
  const handleTimeout = () => {
    const currentQ = questions[currentQuestionIndex];
    if (!currentQ) return;

    const newLives = gameSettings?.gameMode === 'survival'
      ? (stats.livesRemaining || 3) - 1
      : stats.livesRemaining;

    const newResult: QuestionResult = {
      question: currentQ,
      selectedAnswerId: null,
      isCorrect: false,
      timeSpent: gameSettings?.timePerQuestion || 20,
      pointsEarned: 0,
    };

    setResults((prev) => [...prev, newResult]);
    setStats((prev) => ({
      ...prev,
      totalAnswered: prev.totalAnswered + 1,
      currentStreak: 0,
      livesRemaining: newLives,
    }));

    setTimeout(() => {
      if (gameSettings?.gameMode === 'survival' && newLives !== undefined && newLives <= 0) {
        setActiveView('game_over');
        return;
      }

      if (currentQuestionIndex + 1 < questions.length) {
        setCurrentQuestionIndex((prev) => prev + 1);
      } else {
        setActiveView('game_over');
      }
    }, 2600);
  };

  const handleToggleSoundFx = () => {
    const nextVal = !soundFxEnabled;
    setSoundFxEnabled(nextVal);
    soundFX.setEnabled(nextVal);
    if (nextVal) soundFX.playSelect();
  };

  const handleToggleTts = () => {
    const nextVal = !ttsEnabled;
    setTtsEnabled(nextVal);
    if (!nextVal) liveAudio.stop();
  };

  const currentCategoryName =
    gameSettings?.customTopic ||
    TRIVIA_CATEGORIES.find((c) => c.id === gameSettings?.category)?.name ||
    'Trivia Arena';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-amber-500/30 selection:text-amber-200">
      {/* Top Navigation & Status */}
      <Header
        host={host}
        ttsEnabled={ttsEnabled}
        soundFxEnabled={soundFxEnabled}
        onToggleTts={handleToggleTts}
        onToggleSoundFx={handleToggleSoundFx}
        onChangeHost={() => {
          liveAudio.stop();
          setActiveView('host_selector');
        }}
        onOpenLiveChat={() => setIsLiveChatOpen(true)}
        score={stats.score}
        inGame={activeView === 'playing'}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col items-center justify-center">
        {/* Error notification if question generation failed */}
        {loadError && (
          <div className="w-full max-w-xl mb-6 p-4 rounded-2xl bg-rose-950/60 border border-rose-800 text-rose-200 text-xs sm:text-sm flex items-center justify-between gap-3 shadow-xl">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{loadError}</span>
            </div>
            <button
              onClick={() => setLoadError(null)}
              className="px-3 py-1 rounded-lg bg-rose-800/80 hover:bg-rose-700 text-white font-semibold text-xs"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* View 1: Game Setup / Category Selection */}
        {activeView === 'setup' && (
          <GameSetup
            host={host}
            onStartGame={handleStartGame}
            onChangeHost={() => setActiveView('host_selector')}
            isLoading={isLoadingQuestions}
          />
        )}

        {/* View 2: Host Personality Selector & Custom Creator */}
        {activeView === 'host_selector' && (
          <HostSelector
            selectedHost={host}
            onSelectHost={(newHost) => {
              setHost(newHost);
              setActiveView('setup');
            }}
            onClose={() => setActiveView('setup')}
          />
        )}

        {/* View 3: Active Trivia Stage */}
        {activeView === 'playing' && questions.length > 0 && (
          <TriviaScreen
            question={questions[currentQuestionIndex]}
            questionIndex={currentQuestionIndex}
            totalQuestions={questions.length}
            host={host}
            gameMode={gameSettings?.gameMode || 'classic'}
            timeLimit={gameSettings?.timePerQuestion || 20}
            score={stats.score}
            streak={stats.currentStreak}
            lives={stats.livesRemaining}
            ttsEnabled={ttsEnabled}
            onAnswer={handleAnswer}
            onTimeout={handleTimeout}
            onOpenLiveChat={() => setIsLiveChatOpen(true)}
          />
        )}

        {/* View 4: Game Over Summary & Review */}
        {activeView === 'game_over' && (
          <GameOverScreen
            host={host}
            stats={stats}
            results={results}
            categoryName={currentCategoryName}
            ttsEnabled={ttsEnabled}
            onPlayAgain={() => {
              if (gameSettings) handleStartGame(gameSettings);
            }}
            onChangeSetup={() => setActiveView('setup')}
            onChangeHost={() => setActiveView('host_selector')}
          />
        )}
      </main>

      {/* Real-Time Live API / Interactive Chat with Host Modal */}
      <HostChatModal
        isOpen={isLiveChatOpen}
        onClose={() => setIsLiveChatOpen(false)}
        host={host}
        currentQuestion={activeView === 'playing' ? questions[currentQuestionIndex] : null}
        score={stats.score}
      />

      {/* Footer */}
      <footer className="w-full py-4 border-t border-slate-900 bg-slate-950/80 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <span>Built with Google AI Studio</span>
            <span>•</span>
            <span className="text-slate-400">Gemini 3.5 Flash Search Grounding</span>
            <span>•</span>
            <span className="text-slate-400">Gemini 3.1 Flash Live & TTS</span>
          </div>
          <div className="text-slate-600">
            {host.name} ({host.voice} voice) on stage
          </div>
        </div>
      </footer>
    </div>
  );
}
