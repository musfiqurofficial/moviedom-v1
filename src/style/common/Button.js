import styled from "styled-components";
import { darken } from "polished";

export const Button = styled.button`
  background: ${(props) =>
    props.light ? props.theme.light : props.theme.primary};
  padding: 15px 20px;
  font-weight: 600;
  letter-spacing: 1;
  border-radius: 5px;
  text-decoration: none;
  color: ${(props) => props.theme.light} !important;
  cursor: pointer;
  border: 0;
  outline: 0;
  transition: 0.2s ease all;
  &:hover {
    background-color: ${(props) =>
      darken(0.1, props.light ? props.theme.light : props.theme.primary)};
    box-shadow: 0 6px 10px 0 ${(props) => props.theme.primary + "99"};
  }
`;
