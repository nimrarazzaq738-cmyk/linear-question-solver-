
import React, { useState, useEffect } from 'react';
import { View, HistoryItem, Solution } from './types';
import Layout from './components/Layout';
import Home from './views/Home';
import Solver from './views/Solver';
import History from './views/History';
import Detail from './views/Detail';

const App: React.FC = () => {
  const [view, setView] = useState<View>(View.HOME);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);

  // Load history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('linalg_history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load history", e);
      }
    }
  }, []);

  // Save history to localStorage
  useEffect(() => {
    localStorage.setItem('linalg_history', JSON.stringify(history));
  }, [history]);

  const addToHistory = (item: Omit<HistoryItem, 'id' | 'timestamp'>) => {
    const newItem: HistoryItem = {
      ...item,
      id: crypto.randomUUID(),
      timestamp: Date.now(),
    };
    setHistory(prev => [newItem, ...prev]);
    setSelectedItem(newItem);
    setView(View.DETAIL);
  };

  const deleteFromHistory = (id: string) => {
    setHistory(prev => prev.filter(item => item.id !== id));
    if (selectedItem?.id === id) {
      setSelectedItem(null);
      setView(View.HISTORY);
    }
  };

  // Helper to handle item selection for details
  const handleSelectItem = (item: HistoryItem) => {
    setSelectedItem(item);
    setView(View.DETAIL);
  };

  const renderView = () => {
    const recentHistory = history.slice(0, 3);

    switch (view) {
      case View.HOME:
        return <Home onStart={() => setView(View.SOLVER)} recentHistory={recentHistory} onSelect={handleSelectItem} />;
      case View.SOLVER:
        return <Solver onSolved={addToHistory} />;
      case View.HISTORY:
        return <History history={history} onSelect={handleSelectItem} onDelete={deleteFromHistory} />;
      case View.DETAIL:
        return selectedItem ? (
          <Detail item={selectedItem} onBack={() => setView(View.HISTORY)} />
        ) : (
          /* Fix: Added missing required properties recentHistory and onSelect to Home component */
          <Home onStart={() => setView(View.SOLVER)} recentHistory={recentHistory} onSelect={handleSelectItem} />
        );
      default:
        /* Fix: Added missing required properties recentHistory and onSelect to Home component */
        return <Home onStart={() => setView(View.SOLVER)} recentHistory={recentHistory} onSelect={handleSelectItem} />;
    }
  };

  return (
    <Layout currentView={view} setView={setView}>
      {renderView()}
    </Layout>
  );
};

export default App;
