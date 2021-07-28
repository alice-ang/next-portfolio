import styled from "styled-components";
import Link from "next/link";
import { FaArrowRight } from "@react-icons/all-files/fa/FaArrowRight";
import { FaArrowLeft } from "@react-icons/all-files/fa/FaArrowLeft";
export default function LinkButton({ link, title, isRight }) {
  const ButtonLink = styled.div({
    display: "flex",
    fontWeight: "bold",
    padding: "5px",
    fontSize: "1.1em",
    alignItems: "center",
    "&:hover": {
      textDecoration: "underline",
    },
    svg: {
      paddingLeft: "0.5em",
    },
  });

  return (
    <Link href={`/${link}`}>
      <ButtonLink>
        {title}
        {isRight ? <FaArrowRight /> : <FaArrowLeft />}
      </ButtonLink>
    </Link>
  );
}
