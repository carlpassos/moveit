import { createContext, ReactNode, useState } from 'react';
import Cookies from 'js-cookie';

interface ThemeContextData {
  isDark: boolean;
  handleThemeButton: () => void;
}

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeContext = createContext({} as ThemeContextData);

export function ThemeProvider({ children, ...rest }: ThemeProviderProps) {

  const defaultThemecolor = Cookies.get('theme') === 'true' ? true : false;

  const [isDark, setIsDark] = useState(defaultThemecolor);


  async function handleThemeButton(){ 
    setIsDark(!isDark);
    await Cookies.set('theme', String(!isDark));
  }

  return (
    <ThemeContext.Provider value={{
      isDark,
      handleThemeButton
    }}>
      { children }
    </ThemeContext.Provider>
  )
}