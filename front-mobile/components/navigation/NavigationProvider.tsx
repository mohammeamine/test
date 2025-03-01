import React, { createContext, useContext, useState, useCallback } from 'react';
import { LoadingScreen } from './LoadingScreen';
import { NavigationErrorBoundary } from './NavigationErrorBoundary';

interface NavigationContextType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  loadingMessage: string;
  setLoadingMessage: (message: string) => void;
}

const NavigationContext = createContext<NavigationContextType>({
  isLoading: false,
  setIsLoading: () => {},
  loadingMessage: '',
  setLoadingMessage: () => {},
});

export const useNavigation = () => useContext(NavigationContext);

interface Props {
  children: React.ReactNode;
}

export const NavigationProvider: React.FC<Props> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('Loading...');

  const handleSetLoading = useCallback((loading: boolean) => {
    setIsLoading(loading);
  }, []);

  const handleSetLoadingMessage = useCallback((message: string) => {
    setLoadingMessage(message);
  }, []);

  return (
    <NavigationContext.Provider
      value={{
        isLoading,
        setIsLoading: handleSetLoading,
        loadingMessage,
        setLoadingMessage: handleSetLoadingMessage,
      }}
    >
      <NavigationErrorBoundary>
        {isLoading ? (
          <LoadingScreen message={loadingMessage} />
        ) : (
          children
        )}
      </NavigationErrorBoundary>
    </NavigationContext.Provider>
  );
}; 