import styled from "styled-components";
import { Breakpoints } from "@styles/styles";
import Link from "next/link";
const Menu = styled.nav({
  display: "flex",
  justifyContent: "center",
  padding: 0,
  a: {
    color: ({ theme }) => theme.colors.dark,
    padding: "1em",
    listStyle: "none",
    fontSize: "1.2em",
    fontWeight: "bold",
    textDecoration: "none",
    textTransform: "uppercase",
    "&:hover": {
      cursor: "pointer",
      border: `6px solid ${({ theme }) => theme.colors.gradient}`,
    },
  },
});

export default function Nav() {
  return (
    <Menu>
      <Link href="/">Home</Link>
      <Link href="/projects">Projects</Link>
    </Menu>
  );
}
