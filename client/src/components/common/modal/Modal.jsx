import useCloseModal from "@/hooks/useCloseModal";
import { BackDrop } from "@/styles/Common";
import styled from "styled-components";
import { IoCloseOutline } from "@react-icons/all-files/io5/IoCloseOutline";
import { createPortal } from "react-dom";

const Modal = ({ children, modalRef = null, handler = null }) => {
  useCloseModal(modalRef, handler);

  return createPortal(
    <>
      <BackDrop />
      <ModalBox ref={modalRef}>
        {modalRef && handler && <CloseIcon onClick={handler} />}
        {children}
      </ModalBox>
    </>,
    document.querySelector("#root")
  );
};

export default Modal;
const ModalBox = styled.div`
  z-index: 999;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 3rem;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
`;
const CloseIcon = styled(IoCloseOutline)`
  position: absolute;
  font-size: 1.5rem;
  top: 1rem;
  right: 1rem;
`;
