import React, { useState, useEffect, useRef } from 'react';
import { vocabList, normalizeItalian } from '../data';
import type { VocabItem } from '../data';
import { Zap, Eye, ArrowRight } from 'lucide-react';

type Direction = 'it-en' | 'en-it';

const FlashcardsPractice: React.FC = () => {
  const [direction, setDirection] = useState<Direction>('it-en');
  const [currentItem, setCurrentItem] = useState<VocabItem | null>(null);
  const [input, setInput] = useState('');
  const [status, setStatus] = useState<'typing' | 'correct' | 'incorrect' | 'revealed'>('typing');
  const [streak, setStreak] = useState(0);
  const [wordsPracticed, setWordsPracticed] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);

  const generateQuestion = () => {
    const randomIndex = Math.floor(Math.random() * vocabList.length);
    setCurrentItem(vocabList[randomIndex]);
    setInput('');
    setStatus('typing');
    setTimeout(() => {
      inputRef.current?.focus();
    }, 10);
  };

  useEffect(() => {
    generateQuestion();
  }, [direction]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentItem) return;
    if (status !== 'typing') {
      // If already evaluated, move to next
      generateQuestion();
      return;
    }

    const correctAnswer = direction === 'it-en' ? currentItem.en : currentItem.it;

    // Multiple valid translations might exist in our list separated by '/'
    const validAnswers = correctAnswer.split('/').map(s => s.trim().toLowerCase());

    let isCorrect = false;

    if (direction === 'en-it') {
      const normalizedInput = normalizeItalian(input);
      isCorrect = validAnswers.some(ans => normalizeItalian(ans) === normalizedInput);
    } else {
      const normalizedInput = input.trim().toLowerCase();
      isCorrect = validAnswers.includes(normalizedInput);
    }

    if (isCorrect) {
      setStatus('correct');
      setStreak(s => s + 1);
      setWordsPracticed(w => w + 1);
      // Rapid fire: move on automatically after a short delay
      setTimeout(() => {
        generateQuestion();
      }, 500);
    } else {
      setStatus('incorrect');
      setStreak(0);
    }
  };

  const handleReveal = () => {
    if (status === 'typing') {
      setStatus('revealed');
      setStreak(0);
      setTimeout(() => {
         inputRef.current?.focus();
      }, 10);
    }
  };

  if (!currentItem) return null;

  const questionWord = direction === 'it-en' ? currentItem.it : currentItem.en;
  const answerWord = direction === 'it-en' ? currentItem.en : currentItem.it;

  return (
    <div className="bg-white rounded-xl shadow-md p-6 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <h2 className="text-2xl font-bold text-indigo-900 flex items-center gap-2">
          <Zap className="text-yellow-500" /> Rapid Flashcards
        </h2>
        <div className="flex gap-4 text-sm font-medium text-gray-600">
          <div>Streak: <span className="text-orange-500 font-bold">{streak}</span> 🔥</div>
          <div>Practiced: <span className="text-indigo-600 font-bold">{wordsPracticed}</span></div>
        </div>
      </div>

      <div className="mb-6 flex justify-center gap-2">
        <button
          onClick={() => setDirection('it-en')}
          className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${
            direction === 'it-en' ? 'bg-indigo-600 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Italian → English
        </button>
        <button
          onClick={() => setDirection('en-it')}
          className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${
            direction === 'en-it' ? 'bg-indigo-600 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          English → Italian
        </button>
      </div>

      <div className="text-center py-8 bg-gray-50 rounded-xl mb-6 shadow-inner relative overflow-hidden">
        <span className="text-xs uppercase font-bold text-gray-400 absolute top-4 left-4 tracking-widest">
          {currentItem.type}
        </span>
        <div className="text-5xl font-extrabold text-gray-800 mb-2">
          {questionWord}
        </div>
        {currentItem.hint && (
          <div className="text-sm text-gray-500 italic">Hint: {currentItem.hint}</div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 relative">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={status === 'correct' || status === 'revealed'}
            placeholder={direction === 'it-en' ? "Type English translation..." : "Type Italian translation..."}
            className={`w-full p-4 text-xl border-2 rounded-lg outline-none transition-colors ${
              status === 'typing' ? 'border-indigo-300 focus:border-indigo-600' :
              status === 'correct' ? 'border-green-500 bg-green-50 text-green-800' :
              status === 'incorrect' ? 'border-red-500 bg-red-50 text-red-800 focus:border-red-500' :
              'border-blue-500 bg-blue-50'
            }`}
            autoComplete="off"
            autoFocus
          />
        </div>

        <div className="flex gap-2 justify-end">
          {status === 'typing' && (
            <button
              type="button"
              onClick={handleReveal}
              className="flex items-center gap-1 px-4 py-2 text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-medium"
            >
              <Eye size={18} /> Reveal
            </button>
          )}

          {(status === 'incorrect' || status === 'revealed') ? (
             <button
              type="button"
              onClick={() => {
                setWordsPracticed(w => w + 1);
                generateQuestion();
              }}
              className="flex items-center gap-1 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors font-bold shadow-md"
            >
              Next <ArrowRight size={18} />
            </button>
          ) : (
            <button
              type="submit"
              className={`flex items-center gap-1 px-6 py-2 text-white rounded-lg transition-colors font-bold shadow-md ${
                status === 'correct' ? 'bg-green-500' : 'bg-indigo-600 hover:bg-indigo-700'
              }`}
            >
              {status === 'correct' ? 'Correct!' : 'Check'}
            </button>
          )}
        </div>
      </form>

      {(status === 'incorrect' || status === 'revealed') && (
        <div className="mt-4 p-4 rounded-lg bg-blue-50 border border-blue-200 animate-fade-in text-center">
          <p className="text-gray-600 text-sm mb-1">Correct answer:</p>
          <p className="text-xl font-bold text-blue-900">{answerWord}</p>
          {status === 'incorrect' && (
             <p className="text-red-600 text-sm mt-2 font-medium">Keep trying! Your answer was incorrect.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default FlashcardsPractice;
