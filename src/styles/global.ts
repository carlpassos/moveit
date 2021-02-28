import { createGlobalStyle } from 'styled-components'

interface globalStyleProps {
  isDark?: boolean;
}

export default createGlobalStyle<globalStyleProps>`
    * {
      transition: all 0.4s ease;
    }

    :root {
      --white: ${props => props.isDark ? '#202024' : '#fff'};
      --background: ${props => props.isDark ? '#121214' : '#f2f3f5'};
      --backgroundHover: ${props => props.isDark ? '#f2f3f5' : '#121214'};
      --gray-line: ${props => props.isDark ? '#444' : '#DCDDE0'};
      --text: ${props => props.isDark ? '#A8A8B3' : '#666666'};
      --text-highlight: #b3b9ff;
      --modal-background: ${props => props.isDark ? 'rgba(89, 101, 223, 0.25)' : 'rgba(89, 101, 223, 0.25)'};
      --title: ${props => props.isDark ? '#fff' : '#2e384d'};
      --red: #e83f5b;
      --green: #4cd62b;
      --blue: #5965e0;
      --blue-dark: #4953b8;
      --blue-twitter: #2aa9e0;
    }
`