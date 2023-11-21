'use client'
import { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of your context
interface MyContextType {
  state1: string;
  state2: string;
  state3: string;
  state4: string;
  state5: string;
  inputState1: boolean;
  inputState2: boolean;
  inputState3: boolean;
  inputState4: boolean;
  setState1: React.Dispatch<React.SetStateAction<string>>;
  setState2: React.Dispatch<React.SetStateAction<string>>;
  setState3: React.Dispatch<React.SetStateAction<string>>;
  setState4: React.Dispatch<React.SetStateAction<string>>;
  setState5: React.Dispatch<React.SetStateAction<string>>;
  setInputState1: React.Dispatch<React.SetStateAction<boolean>>;
  setInputState2: React.Dispatch<React.SetStateAction<boolean>>;
  setInputState3: React.Dispatch<React.SetStateAction<boolean>>;
  setInputState4: React.Dispatch<React.SetStateAction<boolean>>;

}

// Create the context
const MyContext = createContext<MyContextType | undefined>(undefined);

// Create a provider component
export const MyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state1, setState1] = useState<string>('');
  const [state2, setState2] = useState<string>('');
  const [state3, setState3] = useState<string>('');
  const [state4, setState4] = useState<string>('');
  const [state5, setState5] = useState<string>('');
  const [inputState1, setInputState1] = useState<boolean>(true)
  const [inputState2, setInputState2] = useState<boolean>(true)
  const [inputState3, setInputState3] = useState<boolean>(true)
  const [inputState4, setInputState4] = useState<boolean>(true)

  return (
    <MyContext.Provider value={{ state1, state2, state3,state4,state5, setState1, setState2, setState3, setState4,setState5, inputState1, setInputState1, inputState2, setInputState2, inputState3, setInputState3,inputState4,setInputState4 }}>
      {children}
    </MyContext.Provider>
  );
};

// Create a custom hook to access the context
export const useMyContext = () => {
  const context = useContext(MyContext);

  if (context === undefined) {
    throw new Error('useMyContext must be used within a MyProvider');
  }

  return context;
};
