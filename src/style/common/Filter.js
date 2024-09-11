import styled from "styled-components";

export const Select = styled.select`
  outline: none !important;
  padding: 12px 10px;
  width: 100%;
  border-radius: 4px;
  border: 2px solid ${(props) => `${props.theme.light}50`};
  background: ${(props) => `${props.theme.dark_lt}`};
  color: ${(props) => props.theme.light+'90'};
  font-weight: 500;
  option {
    background: ${(props) => props.theme.dark};
  }
`;
