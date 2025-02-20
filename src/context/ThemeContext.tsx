import { createContext, useContext, useState } from 'react';

interface Props {
  children: React.ReactNode;
}

interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: Props) => {
  const [theme, setTheme] = useState('bw');
  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme: () => {
          setTheme(theme === 'bw' ? 'color' : 'bw');
        },
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('Please wrap up a component with ThemeProvider');
  }

  return context;
};
