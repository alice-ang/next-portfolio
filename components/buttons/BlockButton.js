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

export default function BlockButton(props) {
  console.log(props);
  return (
    <Link href={props.link ? props.link : "/"} target={props.target}>
      <ButtonContainer isLight={props.isLight}>
        <h3>{props.title}</h3>
      </ButtonContainer>
    </Link>
  );
}
