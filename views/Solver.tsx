
import React, { useState, useRef } from 'react';
import { solveLinearAlgebraProblem } from '../services/geminiService';
import { Solution } from '../types';

interface SolverProps {
  onSolved: (item: { image: string, prompt: string, solution: Solution }) => void;
}

const Solver: React.FC<SolverProps> = ({ onSolved }) => {
  const [image, setImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('Solve this step-by-step. Show it in matrix form if applicable.');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSolve = async () => {
    if (!image) {
      setError("Please upload an image first.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const solution = await solveLinearAlgebraProblem(image, prompt);
      onSolved({ image, prompt, solution });
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">
      <div className="bg-slate-900 p-6 text-white text-center">
        <h2 className="text-2xl font-bold">New Linear Algebra Query</h2>
        <p className="text-slate-400 text-sm mt-1">Upload a photo of your problem or matrix</p>
      </div>

      <div className="p-8 space-y-8">
        {/* Image Uploader */}
        <div 
          onClick={() => !loading && fileInputRef.current?.click()}
          className={`relative h-64 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center transition-all cursor-pointer ${
            image ? 'border-indigo-400 bg-indigo-50/10' : 'border-slate-300 bg-slate-50 hover:border-indigo-400 hover:bg-slate-100'
          }`}
        >
          {image ? (
            <>
              <img src={image} alt="Preview" className="h-full w-full object-contain rounded-xl" />
              <div className="absolute top-2 right-2 flex space-x-2">
                 <button 
                  onClick={(e) => { e.stopPropagation(); setImage(null); }}
                  className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 shadow-md"
                >
                  <i className="fa-solid fa-trash-can"></i>
                </button>
              </div>
            </>
          ) : (
            <div className="text-center space-y-3">
              <i className="fa-solid fa-cloud-arrow-up text-4xl text-slate-400"></i>
              <p className="text-slate-600 font-medium">Click to upload or drag & drop</p>
              <p className="text-slate-400 text-xs uppercase tracking-wider">JPG, PNG, WebP supported</p>
            </div>
          )}
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleImageUpload} 
            accept="image/*" 
            className="hidden" 
          />
        </div>

        {/* Prompt Input */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-slate-700 ml-1">How should I solve it?</label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g. Find the determinant and explain the geometric interpretation..."
            className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none min-h-[100px] text-slate-800"
          />
        </div>

        {/* Action Buttons */}
        <div className="pt-4">
          <button 
            disabled={loading || !image}
            onClick={handleSolve}
            className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all flex items-center justify-center space-x-3 ${
              loading || !image ? 'bg-slate-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 active:scale-95'
            }`}
          >
            {loading ? (
              <>
                <i className="fa-solid fa-circle-notch fa-spin"></i>
                <span>Analyzing Matrix...</span>
              </>
            ) : (
              <>
                <i className="fa-solid fa-wand-magic-sparkles"></i>
                <span>Compute Solution</span>
              </>
            )}
          </button>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-start space-x-3 text-red-600">
            <i className="fa-solid fa-triangle-exclamation mt-1"></i>
            <p className="text-sm">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Solver;
