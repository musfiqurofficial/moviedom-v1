import styled, { css } from "styled-components";

const text_color = css`
  color: ${(p) => (p.color ? p.theme[p.color] : p.theme.light)};
`;

export const P = styled.p`
  ${text_color}
  font-weight:500;
`;

export const H1 = styled.h1`
  ${text_color}
  font-weight:700;
`;

export const H2 = styled.h2`
  ${text_color}
  font-weight:700;
`;

export const H3 = styled.h3`
  ${text_color}
  font-weight:700;
`;

export const H4 = styled.h4`
  ${text_color}
  font-weight:700;
`;

export const H5 = styled.h5`
  ${text_color}
  font-weight:700;
`;

export const H6 = styled.h6`
  ${text_color}
  font-weight:700;
`;
