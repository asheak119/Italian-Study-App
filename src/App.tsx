import { useState } from 'react';
import GrammarGuide from './components/GrammarGuide';
import ConjugationPractice from './components/ConjugationPractice';
import VocabularyPractice from './components/VocabularyPractice';
import { BookOpen, PenTool, Brain } from 'lucide-react';
import './index.css';

type Tab = 'grammar' | 'conjugation' | 'vocabulary';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('grammar');

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 font-sans">
      <header className="bg-indigo-900 text-white p-6 shadow-lg">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight">Impara L'Italiano</h1>
            <p className="text-indigo-200 mt-1">B1 Level Study Companion</p>
          </div>

          <nav className="flex bg-indigo-800 rounded-lg p-1 shadow-inner">
            <button
              onClick={() => setActiveTab('grammar')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-colors ${
                activeTab === 'grammar' ? 'bg-white text-indigo-900 shadow' : 'text-indigo-100 hover:bg-indigo-700'
              }`}
            >
              <BookOpen size={18} /> Guide
            </button>
            <button
              onClick={() => setActiveTab('conjugation')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-colors ${
                activeTab === 'conjugation' ? 'bg-white text-indigo-900 shadow' : 'text-indigo-100 hover:bg-indigo-700'
              }`}
            >
              <PenTool size={18} /> Verbs
            </button>
            <button
              onClick={() => setActiveTab('vocabulary')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-colors ${
                activeTab === 'vocabulary' ? 'bg-white text-indigo-900 shadow' : 'text-indigo-100 hover:bg-indigo-700'
              }`}
            >
              <Brain size={18} /> Vocab & Grammar
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto py-8 px-4">
        {activeTab === 'grammar' && <GrammarGuide />}
        {activeTab === 'conjugation' && <ConjugationPractice />}
        {activeTab === 'vocabulary' && <VocabularyPractice />}
      </main>

      <footer className="bg-gray-800 text-gray-400 py-6 text-center mt-auto">
        <p>B1 Italian Learning Application</p>
      </footer>
    </div>
  );
}

export default App;
