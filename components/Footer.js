import styled from "styled-components";

const FooterContainer = styled.footer({
  width: "100%",
  marginTop: "1em",
  bottom: 0,
  textAlign: "center",
});

const Heart = styled.span({
  color: ({ theme }) => theme.colors.heart,
});

export default function Footer() {
  return (
    <>
      <FooterContainer>
        <p>
          Made with <Heart>♥</Heart> using Sanity and NextJS
        </p>
      </FooterContainer>
    </>
  );
}
