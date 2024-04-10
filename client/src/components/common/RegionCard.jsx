import styled from "styled-components";
import { setDestination } from "@/store/slice/scheduleSlice";
import { useDispatch, useSelector } from "react-redux";

const RegionCard = ({ regionInfo }) => {
  const destination = useSelector((state) => state.schedule.destination);

  const dispatch = useDispatch();
  const handleRegionClick = (region) => {
    dispatch(
      setDestination({
        coords: { lat: region.coords.lat, lng: region.coords.lng },
        regionCode: region.code,
        regionName: region.name,
        regionImg: region.imgUrl,
      })
    );
    // setSelectedRegion();
  };
  const isSelected = destination.regionCode === regionInfo.code;
  return (
    <RegionList
      onClick={() => handleRegionClick(regionInfo)}
      isSelected={isSelected}
    >
      <img src={regionInfo.imgUrl} alt={regionInfo.name} />
      <div className="region-info">
        <h2>{regionInfo.nameEng}</h2>
        <p>{regionInfo.name}</p>
      </div>
    </RegionList>
  );
};

export default RegionCard;

const RegionList = styled.div`
  display: flex;
  flex-direction: column;
  /* margin: 1rem; */
  text-transform: uppercase;
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
  transform: ${(props) => (props.isSelected ? "scale(1.1)" : "")};
  opacity: ${(props) => (props.isSelected ? "1" : "0.5")};
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
    opacity: 1;
  }
  & > img {
    width: 200px;
    height: 180px;
    padding: 0.5rem;
    border-radius: 20px;
    object-fit: cover;
  }

  .region-info {
    margin-left: 0.5rem;
    & > h2 {
      font-family: "Montserrat", sans-serif;
      font-size: 1.5rem;
      letter-spacing: 0;
      margin-bottom: 0.3rem;
    }
  }
`;
