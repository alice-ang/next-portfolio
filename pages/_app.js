import { ThemeProvider } from "styled-components";
import { GlobalStyle, Theme } from "../styles/styles";
import Layout from "@components/Layout";

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={Theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  );
}
