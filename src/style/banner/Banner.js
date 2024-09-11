import { darken } from "polished";
import styled from "styled-components";

export const Banner = styled.section`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  @media (max-width: 968px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 668px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const BigPlayButton = styled.div`
  width: 60px;
  height:  60px;
  border-radius: 50%;
  justify-slef: center;
  color: ${(props) => props.theme.light} !important;
  cursor: pointer;
  text-decoration: none;
  background: ${(props) =>
    `linear-gradient(to bottom, ${props.theme.primary} 50%,${darken(
      0.2,
      props.theme.primary
    )} 100%)`};
  font-size: 20px;
  &:hover {
  }
`;

export const BannerCard = styled.div`
  aspect-ratio: 2/3;
  background: ${(props) => props.theme.dark_lt};
  background-image: url(${(props) => props.bgImage});
  background-size: cover;
  background-position: center center;
  backdrop-filter:blur(5px);
  position: relative;
`;

export const BannerCardContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  padding:20px;
  height: 100%;
  width: 100%;
  background: linear-gradient(
    to bottom,
    transparent 50%,
    ${(props) => `${props.theme.dark}dd 100%`}
  );
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  transition: 0.4s ease padding;
  padding-bottom: 0;
  &:hover {
    padding-bottom: 10% !important;
  }
  &:hover .hover-hide {
    opacity: 1;
    transform: translateY(0);
  }
  &:hover .content-hover-hide {
    max-height: 100px;
    opacity: 1;
  }
  @media (max-width: 668px) {
    padding-bottom: 10% !important;
    .hover-hide {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
    .content-hover-hide {
      max-height: 100px;
      opacity: 1;
    }
  }
`;
