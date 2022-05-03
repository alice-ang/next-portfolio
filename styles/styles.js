import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Roboto", sans-serif;
  background: rgb(38, 34, 99);
  color: #fff;

}

h1, h2, h3, h4, h5, h6{
  font-family: 'Libre Bodoni', serif;
}

p {
  font-family: "Roboto", sans-serif;
}
`;
export const Theme = {
  colors: {
    primary: "rgb(38, 34, 99)",
    accent: "rgb(255, 119, 121)",
    dark: "#000",
    light: "#fff",
    gardient:
      "linear-gradient(to right top, #ff00d6, #ff00a2, #ff0070, #ff1640, #ff4d00)",
    heart: "#f79",
  },
};

export const Breakpoints = {
  TabletOrLarger: "@media (min-width: 501px)",
  LaptopOrLarger: "@media (min-width: 813px)",
  MediumScreenOrLarger: "@media (min-width: 990px)",
  BigScreenOrLarger: "@media (min-width: 1246px)",
  TabletOrSmaller: "@media (max-width: 812px)",
};
