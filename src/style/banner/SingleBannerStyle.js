import styled from "styled-components";

function useTheme(props, theme) {
  return props.theme[theme];
}

export const SingleBannerStyle = styled.div`
  min-height: 560px;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: radial-gradient(
      circle at top right,
      transparent 40%,
      ${(props) => useTheme(props, "dark_lt")}
    ),
    linear-gradient(
      to top,
      ${(props) => useTheme(props, "dark_lt")},
      transparent
    ),
    url(${(props) => props.bg});
`;
