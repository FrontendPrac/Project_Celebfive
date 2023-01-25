import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import GugiFont from "./assets/fonts/Gugi-Regular.ttf";

export const GlobalStyle = createGlobalStyle`
${reset}
* {
  box-sizing: border-box;
}
body{
  background-color: #ffffff;
}
a {
  color: inherit;
  text-decoration: none;
}
input, button {
  background-color: transparent;
  /* border: none; */
  outline: none;
}
h1, h2, h3, h4, h5, h6{
  font-family:'Maven Pro', sans-serif;
}
ol, ul, li {
  list-style: none;
}
img {
  display: block;
  width: 100%;
  height: 100%;
}
@font-face {
        font-family: 'GugiFont';
        src: local('GugiFont'), local('GugiFont');
        font-style: normal;
        src: url(${GugiFont}) format('truetype');
  }
`;
