import React, { createContext, useContext } from 'react';

import { IQnaAnswer } from '@/types/qna';

interface QnaAnswerContextProps {
  data: IQnaAnswer;
}

const QnaAnswerContext = createContext<QnaAnswerContextProps | null>(null);

export const QnaAnswerProvider = ({
  data,
  children,
}: {
  children: React.ReactNode;
  data: IQnaAnswer;
}) => {
  return (
    <QnaAnswerContext.Provider value={{ data }}>
      {children}
    </QnaAnswerContext.Provider>
  );
};

export const useQnaAnswerContext = () => {
  const context = useContext(QnaAnswerContext);
  if (!context) {
    throw new Error(
      'useQnaAnswerContext must be used within an QnaAnswerProvider'
    );
  }
  return context;
};
