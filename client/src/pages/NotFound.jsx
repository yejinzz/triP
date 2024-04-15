import styled from "styled-components";
import { Link } from "react-router-dom";
import Button from "../components/atom/button/Button";
import NotFoundImage from "@/assets/images/not_found.svg?react";

const NotFound = () => {
  return (
    <NotfoundSection>
      <NotFoundImage />
      <div className="notfound_404">
        <span>4</span>
        <span>0</span>
        <span>4</span>
      </div>

      <p className="notfound_text">해당 페이지가 존재하지 않습니다.</p>
      <Link to="/">
        <Button variant="outline">돌아가기</Button>
      </Link>
    </NotfoundSection>
  );
};

export default NotFound;

const NotfoundSection = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  width: 100%;
  height: 100vh;
  position: relative;
  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    z-index: -10;
    opacity: 0.1;
  }

  .notfound_404 {
    display: flex;
  }
  .notfound_404 span {
    font-family: "Montserrat";
    font-weight: bold;
    font-size: 8rem;

    color: var(--color-primary);
    animation: bounce 2s ease-in-out;
    animation-iteration-count: 1;
  }

  @keyframes bounce {
    0%,
    50%,
    100% {
      transform: translateY(0);
    }
    25% {
      transform: translateY(-20px);
    }
    75% {
      transform: translateY(-8px);
    }
  }

  .notfound_404 span:nth-child(1) {
    animation-delay: 0.1s;
  }
  .notfound_404 span:nth-child(2) {
    animation-delay: 0.16s;
  }
  .notfound_404 span:nth-child(3) {
    animation-delay: 0.2s;
  }

  .notfound_text {
    font-size: 1.4rem;
    color: #828282;
  }
  opacity: 0;
  animation: opacity 1.5s ease forwards;
  @keyframes opacity {
    100% {
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    svg {
      width: 100%;
    }
  }
`;
