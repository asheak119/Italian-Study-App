import { useState } from 'react';
import { grammarRules } from '../data';

const GrammarGuide: React.FC = () => {
  const [selectedTense, setSelectedTense] = useState<string | null>(null);

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-indigo-700">Italian Tenses Guide</h2>
      <p className="mb-6 text-gray-700">Select a tense to see its rules and examples.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {grammarRules.map(rule => (
          <button
            key={rule.tense}
            onClick={() => setSelectedTense(rule.tense)}
            className={`p-3 rounded-lg text-left transition-colors font-semibold ${
              selectedTense === rule.tense
                ? 'bg-indigo-600 text-white'
                : 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200'
            }`}
          >
            {rule.tense.charAt(0).toUpperCase() + rule.tense.slice(1)}
          </button>
        ))}
      </div>

      {selectedTense && (
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          {grammarRules.filter(r => r.tense === selectedTense).map(rule => (
            <div key={rule.tense}>
              <h3 className="text-2xl font-bold mb-4 text-indigo-900 capitalize">{rule.tense}</h3>

              <div className="mb-4">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Description:</h4>
                <p className="text-gray-700">{rule.description}</p>
              </div>

              <div className="mb-4">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">When to use:</h4>
                <ul className="list-disc pl-5 text-gray-700">
                  {rule.usage.map((u, i) => (
                    <li key={i}>{u}</li>
                  ))}
                </ul>
              </div>

              {rule.regularEndings && (
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">Regular Conjugation:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-3 rounded shadow-sm border border-gray-100">
                      <h5 className="font-bold text-indigo-700 mb-1">-are verbs</h5>
                      <ul className="list-none text-gray-600 text-sm">
                        {rule.regularEndings.are.map((ending, i) => <li key={i}>{ending}</li>)}
                      </ul>
                    </div>
                    <div className="bg-white p-3 rounded shadow-sm border border-gray-100">
                      <h5 className="font-bold text-indigo-700 mb-1">-ere verbs</h5>
                      <ul className="list-none text-gray-600 text-sm">
                        {rule.regularEndings.ere.map((ending, i) => <li key={i}>{ending}</li>)}
                      </ul>
                    </div>
                    <div className="bg-white p-3 rounded shadow-sm border border-gray-100">
                      <h5 className="font-bold text-indigo-700 mb-1">-ire verbs</h5>
                      <ul className="list-none text-gray-600 text-sm">
                        {rule.regularEndings.ire.map((ending, i) => <li key={i}>{ending}</li>)}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {rule.importantIrregulars && (
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">Important Irregulars:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {rule.importantIrregulars.map((irr, i) => (
                       <div key={i} className="bg-amber-50 p-3 rounded border border-amber-200">
                         <span className="font-bold text-amber-900 block mb-1">{irr.verb}</span>
                         <span className="text-amber-800 text-sm">{irr.conjugation.join(', ')}</span>
                       </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Examples:</h4>
                <div className="space-y-3">
                  {rule.examples.map((ex, i) => (
                    <div key={i} className="bg-white p-3 rounded shadow-sm border border-gray-100">
                      <p className="font-medium text-indigo-700">{ex.it}</p>
                      <p className="text-gray-500 italic">{ex.en}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GrammarGuide;
