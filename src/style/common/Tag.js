import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const Tags = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  padding: 0;
  margin-bottom: 6px;
  list-style-type: none;
`;
export const Tag = styled.li`
  font-size: 14px;
  margin-right: 8px;
  color: ${(props) => props.theme.light};
`;

export const A = styled.a`
  text-decoration: none;
  color: ${(props) => props.color || props.theme.light};
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.primary};
  }
`;

export const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: ${(props) => props.color || props.theme.light};
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.primary};
  }
  &.active {
    color: ${(props) =>
      props.disable_active_style ? 'none' : props.theme.primary};
    display: ${(props)=>props.hide_on_active?"none":'initial'};
  }
`;
