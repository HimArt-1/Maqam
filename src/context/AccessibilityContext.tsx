import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface AccessibilityState {
  isFocusMode: boolean;
  isLowSensory: boolean;
  isAnimationDisabled: boolean;
  toggleFocusMode: () => void;
  toggleLowSensory: () => void;
  toggleAnimationDisabled: () => void;
}

const AccessibilityContext = createContext<AccessibilityState | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Try loading initial state from localStorage if available
  const [isFocusMode, setIsFocusMode] = useState<boolean>(() => localStorage.getItem('isFocusMode') === 'true');
  const [isLowSensory, setIsLowSensory] = useState<boolean>(() => localStorage.getItem('isLowSensory') === 'true');
  const [isAnimationDisabled, setIsAnimationDisabled] = useState<boolean>(() => localStorage.getItem('isAnimationDisabled') === 'true');

  useEffect(() => {
    localStorage.setItem('isFocusMode', isFocusMode.toString());
    // Directly apply focus mode class to body if needed
    if (isFocusMode) {
      document.documentElement.classList.add('focus-mode-active');
    } else {
      document.documentElement.classList.remove('focus-mode-active');
    }
  }, [isFocusMode]);

  useEffect(() => {
    localStorage.setItem('isLowSensory', isLowSensory.toString());
  }, [isLowSensory]);

  useEffect(() => {
    localStorage.setItem('isAnimationDisabled', isAnimationDisabled.toString());
  }, [isAnimationDisabled]);

  const toggleFocusMode = () => setIsFocusMode(prev => !prev);
  const toggleLowSensory = () => setIsLowSensory(prev => !prev);
  const toggleAnimationDisabled = () => setIsAnimationDisabled(prev => !prev);

  return (
    <AccessibilityContext.Provider value={{
      isFocusMode,
      isLowSensory,
      isAnimationDisabled,
      toggleFocusMode,
      toggleLowSensory,
      toggleAnimationDisabled
    }}>
      {children}
    </AccessibilityContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};
