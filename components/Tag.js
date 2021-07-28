import styled from "styled-components";

const Badge = styled.div({
  background: ({ theme }) => theme.colors.gardient,
  color: ({ theme }) => theme.colors.light,
  width: "fit-content",
  padding: "7px 12px",
  margin: "0.5em",
  borderRadius: "10px",
  fontWeight: "bold",
  textTransform: "uppercase",
});

export default function Tag({ children }) {
  return <Badge>{children}</Badge>;
}
