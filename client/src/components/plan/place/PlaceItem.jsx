import styled from "styled-components";
import useSelectedPlace from "@/hooks/useSelectedPlace";
import { getPlaceTypeLabel } from "@/utils/getPlaceTypeLabel";
import PlaceAddBtn from "@/components/common/place_parts/PlaceAddBtn";
import PlaceItemImg from "@/components/common/place_parts/PlaceItemImg";

const PlaceItem = ({ place, openDialog }) => {
  const handleClickPlace = useSelectedPlace(); // 해당하는 장소 정보 제공 및 좌표 이동
  console.log(place.firstimage);
  return (
    <>
      <PlaceItemWrapper>
        <PlaceInfoBox onClick={() => handleClickPlace(place)}>
          {/* {place.firstimage ? (
            <img src={place.firstimage} alt="place_img" />
          ) : (
            <NoImage />
          )} */}
          <PlaceItemImg placeImg={place.firstimage} />
          <div className="place_info">
            <span>{getPlaceTypeLabel(place)}</span>
            <p className="place_name">{place.title}</p>

            <p className="place_address">{`${place.addr1} ${place.addr2}`}</p>
          </div>
        </PlaceInfoBox>
        <PlaceAddBtn place={place} openDialog={openDialog} />
      </PlaceItemWrapper>
    </>
  );
};

export default PlaceItem;
const PlaceItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 1rem 0;
  border-bottom: 0.5px solid var(--color-gray);
`;
const PlaceInfoBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  & > img {
    width: 70px;
    height: 70px;
    object-fit: cover;
    border-radius: 10px;
  }
  & > svg {
    width: 70px;
    height: 70px;
  }
  .place_info {
    height: 70px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    max-width: 150px;
    overflow: hidden;
    white-space: nowrap;
    & span {
      font-size: 0.75rem;
      color: #4568dc;
    }
    & .place_name {
      /* font-size: 1rem; */
      font-weight: bold;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    & .place_address {
      color: #9f9f9f;
      font-size: 0.75rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;
