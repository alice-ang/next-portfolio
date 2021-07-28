import styled from "styled-components";

export default function Footer() {
  const FooterContainer = styled.footer({
    width: "100%",
    marginTop: "1em",
    bottom: 0,
    textAlign: "center",
  });

  const Heart = styled.span({
    color: ({ theme }) => theme.colors.heart,
  });
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
