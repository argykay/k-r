import React, { createContext, useContext } from 'react';
import { useIntroRevealResetGeneration } from '@hooks';

const IntroRevealResetContext = createContext(0);

export const useIntroRevealResetGenerationContext = () =>
  useContext(IntroRevealResetContext);

type IntroRevealResetProviderProps = {
  children: React.ReactNode;
};

export const IntroRevealResetProvider = ({
  children,
}: IntroRevealResetProviderProps) => {
  const generation = useIntroRevealResetGeneration();

  return (
    <IntroRevealResetContext.Provider value={generation}>
      {children}
    </IntroRevealResetContext.Provider>
  );
};
