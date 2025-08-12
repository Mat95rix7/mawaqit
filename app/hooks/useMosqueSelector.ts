import { useState } from 'react';
import Cookies from 'js-cookie';

export function useMosqueSelector(initialMosque: string) {
  const [selectedMosque, setSelectedMosque] = useState(initialMosque);
  const [showMosqueSelector, setShowMosqueSelector] = useState(false);

  const handleMosqueChange = (mosqueKey: string) => {
    setSelectedMosque(mosqueKey);
    Cookies.set('selectedMosque', mosqueKey, { expires: 365 });
    setShowMosqueSelector(false);
  };

  return {
    selectedMosque,
    showMosqueSelector,
    handleMosqueChange,
    toggleMosqueSelector: () => setShowMosqueSelector(!showMosqueSelector),
    closeMosqueSelector: () => setShowMosqueSelector(false),
  };
}
