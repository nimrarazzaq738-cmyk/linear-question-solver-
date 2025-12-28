
import React from 'react';
import { View } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentView: View;
  setView: (view: View) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentView, setView }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-indigo-700 text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => setView(View.HOME)}
          >
            <div className="bg-white p-2 rounded-lg">
              <i className="fa-solid fa-square-root-variable text-indigo-700 text-xl"></i>
            </div>
            <h1 className="text-xl font-bold tracking-tight">LinAlg AI</h1>
          </div>
          
          <nav className="hidden md:flex space-x-6">
            <button 
              onClick={() => setView(View.HOME)}
              className={`hover:text-indigo-200 transition-colors ${currentView === View.HOME ? 'border-b-2 border-white' : ''}`}
            >
              Home
            </button>
            <button 
              onClick={() => setView(View.SOLVER)}
              className={`hover:text-indigo-200 transition-colors ${currentView === View.SOLVER ? 'border-b-2 border-white' : ''}`}
            >
              Solve Problem
            </button>
            <button 
              onClick={() => setView(View.HISTORY)}
              className={`hover:text-indigo-200 transition-colors ${currentView === View.HISTORY ? 'border-b-2 border-white' : ''}`}
            >
              History
            </button>
          </nav>

          <button 
            className="md:hidden p-2"
            onClick={() => setView(currentView === View.HISTORY ? View.HOME : View.HISTORY)}
          >
            <i className="fa-solid fa-bars"></i>
          </button>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>

      <footer className="bg-slate-900 text-slate-400 py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">Built for Linear Algebra Students & AI Enthusiasts</p>
          <p className="text-xs mt-2">&copy; 2025 LinAlg AI Solver. Powered by Gemini.</p>
        </div>
      </footer>

      {/* Persistent Mobile Action Button */}
      {currentView !== View.SOLVER && (
        <button 
          onClick={() => setView(View.SOLVER)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-indigo-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-indigo-700 transition-transform hover:scale-110 active:scale-95 md:hidden"
        >
          <i className="fa-solid fa-plus text-xl"></i>
        </button>
      )}
    </div>
  );
};

export default Layout;
