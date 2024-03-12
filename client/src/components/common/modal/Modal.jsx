import styled from "styled-components";

const Modal = ({ children }) => {
  return (
    <Background>
      <ModalBox>
        {children}
        {/* <CloseButton onClick={() => dispatch(closeModal())}>닫기</CloseButton> */}
      </ModalBox>
    </Background>
  );
};

export default Modal;

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(4px);
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const ModalBox = styled.div`
  /* position: relative; */
  /* box-shadow: -5px -5px 10px rgba(255, 255, 255, 0.8),
    5px 5px 10px rgba(0, 0, 0, 0.1); */
  padding: 3rem;
  border-radius: 20px;
  background: var(--color-bg-100);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

// const CloseButton = styled(MdClose)`
//   position: absolute;
//   top: 10px;
//   right: 10px;
//   color: #000000;
//   cursor: pointer;
// `;
