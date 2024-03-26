import styled from "styled-components";

const OverlayModal = ({ markerInfo }) => {
  return (
    <Modal>
      <strong className="place_title">{markerInfo.title}</strong>
      <p className="place_address">{`${markerInfo.addr1} ${markerInfo.addr2}`}</p>
    </Modal>
  );
};

export default OverlayModal;
const Modal = styled.div`
  width: 20rem;
  position: relative;
  bottom: 65px;
  right: 17%;
  /* bottom: 100px;
  left: 0; */
  background-color: #fff;
  padding: 1rem;
  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    /* width: 0;
    height: 0; */
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 30px solid #ffffff;
    /* margin-left: -4px; */
    margin-bottom: -30px;
  }
`;
