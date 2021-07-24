import styled from "styled-components";
const Menu = styled.nav`
  display: flex;
  background: ${({ theme }) => theme.colors.primary};
  padding: 1em;
  margin-bottom: 1em;
`;

export default function Nav() {
  return <Menu>hej</Menu>;
}
