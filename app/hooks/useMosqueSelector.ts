import { useState } from 'react';

export function useMosqueSelector(initialMosque: string = 'vaureal') {
  const [selectedMosque, setSelectedMosque] = useState<string>(initialMosque);
  const [showMosqueSelector, setShowMosqueSelector] = useState(false);

  const handleMosqueChange = (mosqueKey: string) => {
    setSelectedMosque(mosqueKey);
    setShowMosqueSelector(false);
  };

  const toggleMosqueSelector = () => {
    setShowMosqueSelector(!showMosqueSelector);
  };

  const closeMosqueSelector = () => {
    setShowMosqueSelector(false);
  };

  return {
    selectedMosque,
    showMosqueSelector,
    handleMosqueChange,
    toggleMosqueSelector,
    closeMosqueSelector
  };
}