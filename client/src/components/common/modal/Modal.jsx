import styled from "styled-components";
import useCloseModal from "@/hooks/useCloseModal";

const Modal = ({ children, modalRef = null }) => {
  useCloseModal(modalRef);
  return (
    <>
      <Background></Background>
      <ModalBox ref={modalRef}>{children}</ModalBox>
    </>
  );
};

export default Modal;

const Background = styled.div`
  /* position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999; */
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  backdrop-filter: blur(4px);
  background-color: #000000ac;
  z-index: 999;
`;

const ModalBox = styled.div`
  /* position: relative; */
  /* box-shadow: -5px -5px 10px rgba(255, 255, 255, 0.8),
    5px 5px 10px rgba(0, 0, 0, 0.1); */

  /* padding: 3rem;
  border-radius: 20px;
  background: var(--color-bg-100);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); */
  z-index: 999;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 3rem;
  /* width: 80vw;*/
  /* width: 100vw; */
  /* transform: translate(50%, 50%); */
  background-color: #f3f3f3;
  border-radius: 15px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
`;

// const CloseButton = styled(MdClose)`
//   position: absolute;
//   top: 10px;
//   right: 10px;
//   color: #000000;
//   cursor: pointer;
// `;
