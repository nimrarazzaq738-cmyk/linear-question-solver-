
import React from 'react';
import { HistoryItem } from '../types';

interface DetailProps {
  item: HistoryItem;
  onBack: () => void;
}

const Detail: React.FC<DetailProps> = ({ item, onBack }) => {
  const handleDownload = () => {
    const content = `
Linear Algebra AI Solve Report
Date: ${new Date(item.timestamp).toLocaleString()}

--- PROBLEM SUMMARY ---
${item.solution.problemSummary}

--- USER REQUEST ---
${item.prompt}

--- SOLUTION STEPS ---
${item.solution.steps.map((step, i) => `${i + 1}. ${step}`).join('\n')}

--- FINAL RESULT ---
${item.solution.finalResult}

--- COMPUTER SCIENCE / AI PERSPECTIVE ---
Title: ${item.solution.csPerspective.title}
Context: ${item.solution.csPerspective.description}
AI Applications: ${item.solution.csPerspective.aiApplications.join(', ')}
Key Algorithms: ${item.solution.csPerspective.algorithms.join(', ')}

---
Powered by LinAlg AI Solver & Gemini
    `.trim();

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `linalg-solve-${item.id.slice(0, 8)}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-5xl mx-auto animate-in fade-in duration-500">
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <button 
          onClick={onBack}
          className="flex items-center space-x-2 text-indigo-600 font-semibold hover:text-indigo-800 transition-colors"
        >
          <i className="fa-solid fa-arrow-left"></i>
          <span>Back to History</span>
        </button>

        <div className="flex space-x-3 w-full md:w-auto">
          <button 
            onClick={handleDownload}
            className="flex-1 md:flex-none px-6 py-2 bg-slate-800 text-white rounded-lg font-bold hover:bg-slate-700 flex items-center justify-center space-x-2 shadow-md transition-all active:scale-95"
          >
            <i className="fa-solid fa-download"></i>
            <span>Export Solution</span>
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column: Problem Image and Summary */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-200">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 ml-1">Original Image</h4>
            <div className="rounded-2xl overflow-hidden border border-slate-100">
              <img src={item.image} alt="Original" className="w-full h-auto" />
            </div>
          </div>

          <div className="bg-indigo-600 rounded-3xl p-6 text-white shadow-xl">
            <h3 className="text-xl font-bold mb-3">Problem Summary</h3>
            <p className="text-indigo-100 leading-relaxed">
              {item.solution.problemSummary}
            </p>
          </div>
        </div>

        {/* Right Column: Solution and CS Perspective */}
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                <i className="fa-solid fa-list-check"></i>
              </div>
              <h2 className="text-2xl font-extrabold text-slate-800">Step-by-Step Solution</h2>
            </div>
            
            <div className="space-y-6">
              {item.solution.steps.map((step, idx) => (
                <div key={idx} className="flex space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-50 border border-slate-200 text-slate-400 flex items-center justify-center font-bold text-sm">
                    {idx + 1}
                  </div>
                  <div className="pt-1 text-slate-700 leading-relaxed font-medium">
                    {step}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 p-6 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl text-center">
              <p className="text-xs font-bold text-slate-400 uppercase mb-2">Final Result</p>
              <div className="text-3xl font-black text-slate-900 math-font tracking-tight">
                {item.solution.finalResult}
              </div>
            </div>
          </section>

          {/* AI/CS Perspective */}
          <section className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-3xl p-8 shadow-2xl text-white">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-indigo-500 text-white rounded-xl flex items-center justify-center rotate-3">
                <i className="fa-solid fa-brain"></i>
              </div>
              <h2 className="text-2xl font-bold">AI / Computer Science Approach</h2>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-indigo-300 font-bold mb-2 text-lg uppercase tracking-wide">
                  {item.solution.csPerspective.title}
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  {item.solution.csPerspective.description}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center">
                    <i className="fa-solid fa-robot mr-2"></i> Real-world AI Uses
                  </h4>
                  <ul className="space-y-2">
                    {item.solution.csPerspective.aiApplications.map((app, i) => (
                      <li key={i} className="flex items-center space-x-2 text-sm text-slate-200">
                        <i className="fa-solid fa-check text-indigo-400 text-[10px]"></i>
                        <span>{app}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center">
                    <i className="fa-solid fa-code mr-2"></i> Key Algorithms
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {item.solution.csPerspective.algorithms.map((algo, i) => (
                      <span key={i} className="bg-slate-800 text-indigo-300 px-3 py-1 rounded-full text-xs font-semibold border border-slate-700">
                        {algo}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Detail;
