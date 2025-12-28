
import React from 'react';
import { HistoryItem } from '../types';

interface HistoryProps {
  history: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
  onDelete: (id: string) => void;
}

const History: React.FC<HistoryProps> = ({ history, onSelect, onDelete }) => {
  if (history.length === 0) {
    return (
      <div className="max-w-2xl mx-auto text-center py-20 space-y-6">
        <div className="w-20 h-20 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
          <i className="fa-solid fa-clock-rotate-left text-3xl"></i>
        </div>
        <h2 className="text-2xl font-bold text-slate-800">No History Yet</h2>
        <p className="text-slate-500">Problems you solve will appear here for future reference.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-slate-900">Your Math History</h2>
        <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-semibold">
          {history.length} Saved Items
        </span>
      </div>

      <div className="grid gap-6">
        {history.map((item) => (
          <div 
            key={item.id}
            className="group bg-white rounded-2xl shadow-sm border border-slate-200 p-4 md:p-6 flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6 hover:shadow-md transition-all hover:border-indigo-200"
          >
            <div 
              className="w-full md:w-48 h-32 bg-slate-100 rounded-xl overflow-hidden cursor-pointer flex-shrink-0"
              onClick={() => onSelect(item)}
            >
              <img src={item.image} alt="Problem" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
            
            <div className="flex-grow space-y-2 text-center md:text-left overflow-hidden">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <span className="text-xs text-slate-400 order-2 md:order-1">
                  {new Date(item.timestamp).toLocaleString()}
                </span>
                <button 
                  onClick={() => onDelete(item.id)}
                  className="text-slate-300 hover:text-red-500 transition-colors p-2 self-end md:self-auto order-1 md:order-2"
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
              <h3 
                className="text-lg font-bold text-slate-800 cursor-pointer hover:text-indigo-600 truncate"
                onClick={() => onSelect(item)}
              >
                {item.solution.problemSummary}
              </h3>
              <p className="text-slate-500 text-sm line-clamp-2 italic">
                "{item.prompt}"
              </p>
            </div>
            
            <div className="flex-shrink-0 pt-2">
              <button 
                onClick={() => onSelect(item)}
                className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg font-semibold hover:bg-indigo-100 transition-colors"
              >
                View Result
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
