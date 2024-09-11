import styled from "styled-components";

export const Header = styled.header`
  background: #00000090;
  z-index: 1000;
  backdrop-filter: saturate(1.4) blur(5px);
`;

export const Logo = styled.img`
  max-width: 120px;
  width: 100%;
`;

export const SearchBox = styled.label`
  background: ${(e) => e.theme.dark_lt};
  border-radius: 1000px;
  border: 1px solid ${(e) => e.theme.primary};
  input {
    background: none;
    border: 0;
    outline: 0;
    border-radius: 1000px;
    color: ${(e) => e.theme.light};
  }
  i {
    color: ${(e) => e.theme.primary};
  }
`;

export const DropMenu = styled.ul`
  background: ${(e) => e.theme.dark_lt};
  width: max-content;
  min-width: 100%;
  max-height: 350px;
  overflow-x: clip;
  overflow-y: auto;
  box-shadow: 0 15px 25px 0 ${(props) => props.theme.dark};
`;

export const NavMenu = styled.div`
  background: none;
  flex-direction: row;
  flex-wrap: wrap;
  height: auto;
  width: auto;
  background: none;
  position: relative;
  align-items: center;
  @media (max-width: 868px) {
    background: ${(e) => e.theme.dark_lt};
    align-items: flex-start;
    z-index: 1000;
    height: 100vh;
    width: 100%;
    flex-direction: column;
    position: fixed;
    top: 0;
    left: 0;
    padding: 10px;
    padding-left:0px;
    margin-top: 0 !important;
    margin-bottom: 0 !important;
  }
`;
