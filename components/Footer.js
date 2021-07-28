import styled from "styled-components";

export default function Footer() {
  const FooterContainer = styled.footer({
    display: "flex",
    padding: "1em",
    background: "green  ",
  });
  return (
    <>
      <FooterContainer>Made using Sanity and NextJS</FooterContainer>
    </>
  );
}
