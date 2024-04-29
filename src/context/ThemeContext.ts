import { createContext } from 'react';
import { ThemeContextType } from '../utils/type';

const ThemeContext = createContext({} as ThemeContextType);

export default ThemeContext;