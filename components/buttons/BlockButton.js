import styled from "styled-components";
import Link from "next/link";

const ButtonContainer = styled.button({
  display: "flex",
  width: "100%",
  border: "none",
  justifyContent: "center",
  borderRadius: "5px",
  background: (props) =>
    props.isLight
      ? ({ theme }) => theme.colors.light
      : ({ theme }) => theme.colors.dark,
  color: (props) =>
    props.isLight
      ? ({ theme }) => theme.colors.dark
      : ({ theme }) => theme.colors.light,
  border: (props) =>
    props.isLight ? `2px solid ${({ theme }) => theme.colors.dark}` : "none",
  margin: "5px 0px",
});

const ButtonContent = styled.span({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  h3: {
    marginRight: 10,
  },
});

export default function BlockButton({
  link,
  target,
  isLight,
  title,
  children,
}) {
  return (
    <Link href={link ? link : "/"} target={target}>
      <ButtonContainer isLight={isLight}>
        <ButtonContent>
          <h3>{title}</h3>
          {children}
        </ButtonContent>
      </ButtonContainer>
    </Link>
  );
}
