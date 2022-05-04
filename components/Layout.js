import React from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import styled from "styled-components";
import { Breakpoints } from "@styles/styles";

const Content = styled.div({
  minHeight: "100vh",
  [Breakpoints.BigScreenOrLarger]: {
    width: "70%",
    margin: "0 auto",
  },
});
export default function Layout({ children }) {
  return (
    <Content>
      {/* <Nav /> */}
      {children}
      <Footer />
    </Content>
  );
}
