
import React from 'react';
import { HistoryItem } from '../types';

interface HomeProps {
  onStart: () => void;
  recentHistory: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
}

const Home: React.FC<HomeProps> = ({ onStart, recentHistory, onSelect }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <section className="text-center space-y-6 py-12">
        <div className="inline-block px-4 py-1.5 bg-indigo-100 text-indigo-700 rounded-full font-semibold text-sm mb-4">
          The Ultimate Linear Algebra Companion
        </div>
        <h2 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight">
          Solving Math with <span className="text-indigo-600">AI Precision</span>
        </h2>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Upload any matrix or equation. Get step-by-step solutions and discover how 
          linear algebra powers the world's most advanced AI models.
        </p>
        <div className="flex justify-center pt-4">
          <button 
            onClick={onStart}
            className="px-8 py-4 bg-indigo-600 text-white rounded-xl font-bold text-lg shadow-xl hover:bg-indigo-700 hover:scale-105 transition-all flex items-center space-x-3"
          >
            <i className="fa-solid fa-camera"></i>
            <span>Start Solving Now</span>
          </button>
        </div>
      </section>

      <div className="grid md:grid-cols-3 gap-8 px-4">
        {[
          { icon: 'fa-microchip', title: 'Matrix & Equations', desc: 'Solve determinants, eigenvalues, SVD, and system of equations.' },
          { icon: 'fa-brain', title: 'AI Perspective', desc: 'Learn why these concepts matter in Neural Networks and Deep Learning.' },
          { icon: 'fa-file-export', title: 'Export Ready', desc: 'Download your solutions as structured documents for study and review.' }
        ].map((feat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow text-center space-y-3">
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className={`fa-solid ${feat.icon} text-xl`}></i>
            </div>
            <h3 className="font-bold text-lg text-slate-800">{feat.title}</h3>
            <p className="text-slate-500 text-sm leading-relaxed">{feat.desc}</p>
          </div>
        ))}
      </div>

      {recentHistory.length > 0 && (
        <section className="space-y-6 px-4">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold text-slate-800">Recent Solves</h3>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {recentHistory.map((item) => (
              <div 
                key={item.id} 
                onClick={() => onSelect(item)}
                className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-200 cursor-pointer hover:border-indigo-300 hover:shadow-lg transition-all"
              >
                <div className="h-32 overflow-hidden bg-slate-100">
                  <img src={item.image} alt="Problem" className="w-full h-full object-cover" />
                </div>
                <div className="p-4">
                  <p className="text-xs text-slate-400 mb-1">{new Date(item.timestamp).toLocaleDateString()}</p>
                  <p className="font-semibold text-slate-800 truncate">{item.solution.problemSummary}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
