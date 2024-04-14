import styled, { keyframes } from "styled-components";

export const Loading = () => {
  return (
    <LoadingContainer>
      <span></span>
      <span></span>
      <span></span>
    </LoadingContainer>
  );
};

export default Loading;
const loadingAnimaition = keyframes`
    0%,
    100% {
      opacity: 0;
      transform: scale(0.5);
    }
    50% {
      opacity: 1;
      transform: scale(1.2);
    }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  & > span {
    display: inline-block;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    animation: ${loadingAnimaition} 1s linear infinite;
    background-color: var(--color-primary);
  }

  & > span:nth-child(1) {
    animation-delay: 0s;
  }

  & > span:nth-child(2) {
    animation-delay: 0.2s;
    margin: 0px 10px;
  }

  & > span:nth-child(3) {
    animation-delay: 0.4s;
  }
`;
