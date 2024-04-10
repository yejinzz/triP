import styled from "styled-components";

export const BackDrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  backdrop-filter: blur(4px);
  background-color: #000000ac;
  z-index: 998;
`;
export const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  width: 100%;

  & > input {
    border: 1px solid var(--color-gray);
    border-radius: 10px;
    padding: 0.7rem 0.6rem;
  }
`;
// const CloseButton = styled(MdClose)`
//   position: absolute;
//   top: 10px;
//   right: 10px;
//   color: #000000;
//   cursor: pointer;
// `;
