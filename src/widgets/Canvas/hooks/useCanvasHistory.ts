import { useState } from 'react';

export const useCanvasHistory = () => {
  const [history, setHistory] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);

  const addToHistory = (dataUrl: string) => {
    const newHistory = history.slice(0, currentStep + 1);
    newHistory.push(dataUrl);
    setHistory(newHistory);
    setCurrentStep(currentStep + 1);
  };

  return {
    history,
    currentStep,
    setHistory,
    setCurrentStep,
    addToHistory,
  };
}; 