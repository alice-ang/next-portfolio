import React from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import styled from "styled-components";

const Content = styled.div({
  minHeight: "100vh",
});
export default function Layout({ children }) {
  return (
    <Content>
      <Nav />
      {children}
      <Footer />
    </Content>
  );
}
