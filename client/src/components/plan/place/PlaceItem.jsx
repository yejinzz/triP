import styled from "styled-components";
import useSelectedPlace from "@/hooks/useSelectedPlace";
import { getPlaceTypeLabel } from "@/utils/getPlaceTypeLabel";
// import PlaceAddBtn from "@/components/common/place_parts/PlaceAddBtn";
import PlaceItemImg from "@/components/common/place_parts/PlaceItemImg";

const PlaceItem = ({ place }) => {
  const handleClickPlace = useSelectedPlace(); // 해당하는 장소 정보 제공 및 좌표 이동
  return (
    <PlaceInfoBox onClick={() => handleClickPlace(place)}>
      <PlaceItemImg placeImg={place.firstimage} />
      <div className="place_info">
        <span>{getPlaceTypeLabel(place)}</span>
        <h4 className="place_name">{place.title}</h4>

        <p className="place_address">{`${place.addr1} ${place.addr2}`}</p>
      </div>
    </PlaceInfoBox>
  );
};

export default PlaceItem;
// const PlaceItemWrapper = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;

//   padding: 1rem 0;
//   border-bottom: 0.5px solid var(--color-gray);
// `;
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
    /* display: inline-block; */
    height: 70px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    /* width: 100%; */
    /* width: 50%; */
    /* width: 170px; */
    overflow: hidden;
    /* white-space: nowrap; */

    & span {
      font-size: 0.75rem;
      color: #4568dc;
    }
    & h4,
    p {
      overflow: hidden;
      text-overflow: ellipsis;
      word-wrap: break-word;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }
    & .place_name {
      font-weight: bold;
      height: 0.875rem;
    }
    & .place_address {
      color: #9f9f9f;
      font-size: 0.75rem;
      height: 0.75rem;
    }
  }
  @media (max-width: 425px) {
    .place_info {
      /* max-width: 100px; */
    }
  }
`;
