import { useState } from 'react';
import { stories, normalizeItalian } from '../data';
import { CheckCircle, XCircle } from 'lucide-react';

const StoryPractice: React.FC = () => {
  const [currentStoryIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [feedback, setFeedback] = useState<{ [key: string]: 'correct' | 'incorrect' }>({});

  const story = stories[currentStoryIndex];

  const handleInputChange = (blankId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [blankId]: value }));
    // Clear feedback when typing
    if (feedback[blankId]) {
      setFeedback(prev => {
        const newFeedback = { ...prev };
        delete newFeedback[blankId];
        return newFeedback;
      });
    }
  };

  const handleCheckAnswers = () => {
    const newFeedback: { [key: string]: 'correct' | 'incorrect' } = {};
    story.blanks.forEach(blank => {
      const userAnswer = answers[blank.id] || '';
      if (normalizeItalian(userAnswer) === normalizeItalian(blank.correctAnswer)) {
        newFeedback[blank.id] = 'correct';
      } else {
        newFeedback[blank.id] = 'incorrect';
      }
    });
    setFeedback(newFeedback);
  };

  const handleRevealAll = () => {
    const revealedAnswers: { [key: string]: string } = {};
    const newFeedback: { [key: string]: 'incorrect' } = {};
    story.blanks.forEach(blank => {
      revealedAnswers[blank.id] = blank.correctAnswer;
      newFeedback[blank.id] = 'incorrect'; // Mark as incorrect since they didn't guess it
    });
    setAnswers(revealedAnswers);
    setFeedback(newFeedback);
  };

  const isAllCorrect = story.blanks.every(blank => feedback[blank.id] === 'correct');

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-3xl font-bold mb-2 text-rose-700 text-center">Story Mode</h2>
      <p className="text-center text-gray-600 mb-8">Fill in the blanks with the correct verb conjugations.</p>

      <div className="bg-rose-50 p-8 rounded-xl border border-rose-100">
        <h3 className="text-2xl font-bold mb-6 text-gray-800 text-center">{story.title}</h3>

        <div className="text-lg leading-loose text-gray-800 mb-8">
          {story.textChunks.map((chunk, index) => {
            const blank = story.blanks[index];
            return (
              <span key={index}>
                {chunk}
                {blank && (
                  <span className="inline-block mx-1 group relative">
                    <input
                      type="text"
                      value={answers[blank.id] || ''}
                      onChange={(e) => handleInputChange(blank.id, e.target.value)}
                      className={`w-40 px-2 py-1 text-center border-b-2 bg-transparent focus:outline-none focus:border-rose-500 transition-colors ${
                        feedback[blank.id] === 'correct' ? 'border-green-500 text-green-700 font-semibold' :
                        feedback[blank.id] === 'incorrect' ? 'border-red-500 text-red-700' : 'border-gray-400'
                      }`}
                      placeholder={blank.verb}
                    />

                    {/* Tooltip for hint */}
                    <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                      {blank.pronoun} - {blank.tense}
                    </span>
                  </span>
                )}
              </span>
            );
          })}
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={handleCheckAnswers}
            className="px-6 py-2 bg-rose-600 text-white rounded-lg font-semibold hover:bg-rose-700 transition-colors"
          >
            Check Answers
          </button>
          <button
            onClick={handleRevealAll}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
          >
            Reveal Answers
          </button>
        </div>

        {isAllCorrect && Object.keys(feedback).length > 0 && (
          <div className="mt-6 p-4 bg-green-100 border border-green-300 rounded-lg text-center flex items-center justify-center gap-2">
            <CheckCircle className="text-green-600" />
            <span className="text-green-800 font-bold">Bravissimo! You completed the story correctly!</span>
          </div>
        )}

        {!isAllCorrect && Object.keys(feedback).length > 0 && (
          <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg text-center flex items-center justify-center gap-2">
            <XCircle className="text-amber-600" />
            <span className="text-amber-800 font-medium">Some answers are incorrect. Keep trying! (Hover over blanks for hints)</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoryPractice;
