import LightTheme from './lightTheme';
import DarkTheme from './darkTheme';
import { Theme } from '@material-ui/core';

const themes: { [key: string]: Theme } = {
  light: LightTheme,
  dark: DarkTheme,
};

export default function getTheme(mode: string) {
  return themes[mode];
}
