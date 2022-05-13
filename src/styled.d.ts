// import original module declarations
import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    bgColor: string;
    textColor: string;
    cloudColor: string;
    accentColor: string;
    borderColor: string;
    contentColor: string;
    clickedStyle: string;
    boxShadow: string;
    }
  }