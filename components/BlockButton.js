import styled from "styled-components";
import Link from "next/link";
const ButtonContainer = styled.button({
  display: "flex",
  width: "100%",

  border: "none",
  justifyContent: "center",
  borderRadius: "5px",
  background: "red",
  margin: "5px 0px",
});

export default function BlockButton(props) {
  return (
    <Link href={props.link ? props.link : "/"} target={props.target}>
      <ButtonContainer>
        <h3>{props.title}</h3>
      </ButtonContainer>
    </Link>
  );
}
