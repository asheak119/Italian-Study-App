import React, { useState, useEffect } from 'react';
import { verbData } from '../data';
import type { Pronoun, Tense } from '../data';
import { Lightbulb, CheckCircle, XCircle } from 'lucide-react';

const pronouns: Pronoun[] = ['io', 'tu', 'lui/lei', 'noi', 'voi', 'loro'];
// const tenses: Tense[] = [
  // 'presente', 'passato prossimo', 'imperfetto',
  // We'll limit to a few for the exercise demo, but you can expand this
// ];

const ConjugationPractice: React.FC = () => {
  const [currentVerbIndex, setCurrentVerbIndex] = useState(0);
  const [currentPronoun, setCurrentPronoun] = useState<Pronoun>('io');
  const [currentTense, setCurrentTense] = useState<Tense>('presente');
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [showHint, setShowHint] = useState(false);

  const generateNewExercise = () => {
    const randomVerbIndex = Math.floor(Math.random() * verbData.length);
    const availableTenses = Object.keys(verbData[randomVerbIndex].conjugations) as Tense[];
    const randomTense = availableTenses[Math.floor(Math.random() * availableTenses.length)];
    const randomPronoun = pronouns[Math.floor(Math.random() * pronouns.length)];

    setCurrentVerbIndex(randomVerbIndex);
    setCurrentTense(randomTense);
    setCurrentPronoun(randomPronoun);
    setUserInput('');
    setFeedback(null);
    setShowHint(false);
  };

  useEffect(() => {
    generateNewExercise();
  }, []);

  const currentVerb = verbData[currentVerbIndex];
  const correctAnswer = currentVerb?.conjugations[currentTense]?.[currentPronoun];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userInput.toLowerCase().trim() === correctAnswer?.toLowerCase()) {
      setFeedback('correct');
      setTimeout(generateNewExercise, 1500);
    } else {
      setFeedback('incorrect');
    }
  };

  if (!currentVerb) return <div>Loading...</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-emerald-700 text-center">Conjugation Practice</h2>

      <div className="bg-emerald-50 p-8 rounded-xl border border-emerald-100 relative">
        <div className="absolute top-4 right-4 text-emerald-600 font-semibold bg-emerald-100 px-3 py-1 rounded-full text-sm">
          {currentTense}
        </div>

        <div className="text-center mb-8 mt-4">
          <p className="text-gray-500 mb-1">Conjugate the verb:</p>
          <h3 className="text-4xl font-bold text-gray-800">{currentVerb.verb}</h3>
          <p className="text-emerald-600 italic mt-1">({currentVerb.translation})</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <div className="flex items-center gap-4 mb-6 w-full max-w-md">
            <span className="text-2xl font-semibold text-gray-700 w-24 text-right">
              {currentPronoun}
            </span>
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className={`flex-1 p-3 text-lg border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                feedback === 'correct' ? 'border-green-500 bg-green-50' :
                feedback === 'incorrect' ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="Type conjugation here..."
              autoFocus
            />
          </div>

          <div className="flex gap-4 mb-4">
            <button
              type="submit"
              className="px-6 py-2 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
            >
              Check Answer
            </button>
            <button
              type="button"
              onClick={() => setShowHint(!showHint)}
              className="px-4 py-2 bg-amber-100 text-amber-700 rounded-lg font-semibold hover:bg-amber-200 transition-colors flex items-center gap-2"
            >
              <Lightbulb size={18} /> Hint
            </button>
            <button
              type="button"
              onClick={generateNewExercise}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              Skip
            </button>
          </div>

          {feedback === 'correct' && (
            <p className="text-green-600 font-bold flex items-center gap-2">
              <CheckCircle size={20} /> Correct! Perfetto!
            </p>
          )}
          {feedback === 'incorrect' && (
            <p className="text-red-500 font-bold flex items-center gap-2">
              <XCircle size={20} /> Incorrect, try again.
            </p>
          )}

          {showHint && (
            <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg w-full text-center">
              <p className="text-amber-800">
                <strong>Hint:</strong> The verb is <em>{currentVerb.regular ? 'regular' : 'irregular'}</em>.
                {currentTense === 'passato prossimo' && ` It uses the auxiliary verb "${currentVerb.auxiliary}".`}
              </p>
              {feedback === 'incorrect' && (
                <p className="text-sm mt-2 text-gray-600">First letter: {correctAnswer?.charAt(0)}...</p>
              )}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ConjugationPractice;
