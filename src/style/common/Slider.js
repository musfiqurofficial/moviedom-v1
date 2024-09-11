import styled from "styled-components";

export const SliderSection = styled.section`
  background: ${(props) =>
    props.dark ? props.theme.dark : props.theme.dark_lt};
  // padding: 100px auto !important;
`;

export const SliderSectionHeader = styled.div`
  display: flex;
  gap: 5px;
  justify-content: ${(props) => props.jc || "flex-start"};
  align-items: center;
  flex-deraction: row;
  flex-wrap: wrap;
`;

export const Devider = styled.div`
  height: 2px;
  flex-grow: 1;
  border-radius: 10px;
  background: ${(props) => `${props.theme.light}20`};
`;

export const TabName = styled.li`
  color: ${(props) => props.theme.light} !important;
  &:hover {
    color: ${(props) => props.theme.primary} !important;
  }
`;

export const SliderNavigator = styled.button`
  border: none;
  outline: none;
  --size: 50px;
  background: ${(props) => `${props.theme.dark_lt}`};
  border: 2px solid ${(props) => `${props.theme.primary}`};
  height: var(--size);
  width: var(--size);
  border-radius: 50%;
  display: flex;
  ${(props) =>
    props.shadow && `box-shadow: 0 10px 20px 5px ${props.theme.dark};`}
  justify-content: center;
  align-items: center;
  transition: 0.2s ease;
  .fa-solid {
    font-size: 18px;
    color: ${(props) => `${props.theme.light}80`};
  }
  &:hover {
    background: ${(props) => `${props.theme.primary}`};
    .fa-solid {
      color: ${(props) => props.theme.light};
    }
  }
`;
