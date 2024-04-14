import { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

const TypingText = ({ children = null, fontSize }) => {
  const [text, setText] = useState("");
  const [count, setCount] = useState(0);

  useEffect(() => {
    let typingInterval;
    if (count < children.length) {
      typingInterval = setInterval(() => {
        setText((prevValue) => {
          let result = prevValue + children[count];
          setCount((prevCount) => prevCount + 1);

          if (count === children.length) {
            clearInterval(typingInterval);
          }

          return result;
        });
      }, 100);
    }

    return () => {
      clearInterval(typingInterval);
    };
  });

  return (
    <TypeAnimation fontSize={fontSize}>
      <p className="text">{text}</p>
    </TypeAnimation>
  );
};

export default TypingText;

const cursor = keyframes`
  from, to {
    border-right-color: transparent;
  }
  50% {
    border-right-color: #ffffff;
  }
`;

const TypeAnimation = styled.div`
  margin: 1rem 0;
  .text {
    color: #fff;
    font-size: ${(props) => props.fontSize && props.fontSize};
    font-weight: 300;
    letter-spacing: -2px;
    display: inline;
    border-right: 0.05em solid black;
    animation: ${cursor} 0.8s steps(1) infinite;
    padding-right: 0.25rem;
  }
`;
