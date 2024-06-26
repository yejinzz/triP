import { Polyline } from "react-kakao-maps-sdk";
import { useSelector } from "react-redux";

const PolyLine = ({ linePath }) => {
  const mapLevel = useSelector((state) => state.map.mapLevel);

  return (
    <Polyline
      path={linePath}
      strokeOpacity={1}
      strokeWeight={14 - mapLevel}
      strokeStyle={"shortdot"}
      strokeColor={"var(--color-primary)"}
    />
  );
};

export default PolyLine;
