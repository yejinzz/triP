import { MdAdd } from "@react-icons/all-files/md/MdAdd";
import { MdRemove } from "@react-icons/all-files/md/MdRemove";
import Button from "../atom/button/Button";
import styled from "styled-components";

const ZoomBtn = ({ mapLevel, setMapLevel }) => {
  return (
    <ZoomBox>
      <Button
        variant="primary"
        // width="max-content"
        radius="10px"
        onClick={() => {
          setMapLevel(mapLevel > 1 ? mapLevel - 1 : 1);
        }}
      >
        <MdAdd size={20} />
      </Button>
      <Button
        variant="primary"
        // width="max-content"
        radius="10px"
        onClick={() => {
          setMapLevel(mapLevel < 14 ? mapLevel + 1 : 14);
        }}
      >
        <MdRemove size={20} />
      </Button>
    </ZoomBox>
  );
};

export default ZoomBtn;

const ZoomBox = styled.div`
  display: grid;
  gap: 5px;
  position: absolute;
  z-index: 1;
  bottom: 20px; /* 상단 여백 조절 */
  right: 20px; /* 오른쪽 여백 조절 */
`;
