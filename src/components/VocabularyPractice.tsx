import React, { useState, useEffect } from 'react';
import { vocabList } from '../data';
import type { VocabItem } from '../data';
import { Lightbulb, ArrowRight } from 'lucide-react';

const VocabularyPractice: React.FC = () => {
  const [currentItem, setCurrentItem] = useState<VocabItem | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState(0);

  const generateQuestion = () => {
    const randomIndex = Math.floor(Math.random() * vocabList.length);
    const item = vocabList[randomIndex];
    setCurrentItem(item);

    // Generate incorrect options of similar type if possible
    const sameTypeVocab = vocabList.filter(v => v.type === item.type && v.en !== item.en);
    const distractors = sameTypeVocab.sort(() => 0.5 - Math.random()).slice(0, 3).map(v => v.en);

    // If not enough same-type distractors, fill with random ones
    while (distractors.length < 3) {
      const randDistractor = vocabList[Math.floor(Math.random() * vocabList.length)].en;
      if (!distractors.includes(randDistractor) && randDistractor !== item.en) {
        distractors.push(randDistractor);
      }
    }

    const allOptions = [...distractors, item.en].sort(() => 0.5 - Math.random());
    setOptions(allOptions);
    setSelectedOption(null);
    setShowHint(false);
  };

  useEffect(() => {
    generateQuestion();
  }, []);

  const handleSelect = (option: string) => {
    if (selectedOption) return; // Prevent multiple selections
    setSelectedOption(option);
    if (option === currentItem?.en) {
      setScore(s => s + 1);
      setTimeout(generateQuestion, 1000);
    }
  };

  if (!currentItem) return <div>Loading...</div>;

  const isCorrect = selectedOption === currentItem.en;

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-blue-700">Vocabulary & Grammar</h2>
        <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-bold">
          Score: {score}
        </div>
      </div>

      <div className="bg-blue-50 p-8 rounded-xl border border-blue-100">
        <div className="text-center mb-8">
          <span className="inline-block px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
            {currentItem.type}
          </span>
          <p className="text-gray-500 mb-2">Translate the word:</p>
          <h3 className="text-5xl font-bold text-gray-800">{currentItem.it}</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {options.map((option, index) => {
            let btnClass = "p-4 text-lg border-2 rounded-lg font-medium transition-all duration-200 ";

            if (selectedOption) {
              if (option === currentItem.en) {
                btnClass += "bg-green-500 text-white border-green-600";
              } else if (option === selectedOption) {
                btnClass += "bg-red-500 text-white border-red-600";
              } else {
                btnClass += "bg-white text-gray-400 border-gray-200 opacity-50";
              }
            } else {
              btnClass += "bg-white text-gray-700 border-blue-200 hover:border-blue-500 hover:bg-blue-50 cursor-pointer";
            }

            return (
              <button
                key={index}
                onClick={() => handleSelect(option)}
                disabled={selectedOption !== null}
                className={btnClass}
              >
                {option}
              </button>
            );
          })}
        </div>

        <div className="flex justify-between items-center mt-6">
          <button
            onClick={() => setShowHint(true)}
            disabled={!currentItem.hint || showHint}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold ${
              !currentItem.hint ? 'opacity-50 cursor-not-allowed bg-gray-100 text-gray-400' :
              showHint ? 'bg-amber-100 text-amber-800' : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
            }`}
          >
            <Lightbulb size={18} /> {showHint ? currentItem.hint : 'Hint'}
          </button>

          {selectedOption && !isCorrect && (
            <button
              onClick={generateQuestion}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
            >
              Next <ArrowRight size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default VocabularyPractice;
