import styled from "styled-components";
import { MdAddCircle } from "@react-icons/all-files/md/MdAddCircle";

const PlaceListCard = ({ place, onClick }) => {
  return (
    <ListCardWrapper>
      <img src={place.placeInfo.imgUrl} alt="place-img" />
      <div className="place-info">
        <h4 className="place-name">{place.placeInfo.name}</h4>
        <p className="place-address">{place.placeInfo.address}</p>
        {/* <p className="place-phone">{place.placeInfo.phoneNumber}</p> */}
      </div>
      <MdAddCircle size={30} onClick={onClick} />
    </ListCardWrapper>
  );
};

export default PlaceListCard;

const ListCardWrapper = styled.div`
  display: flex;
  align-items: center;
  box-shadow: -3px -3px 5px rgba(255, 255, 255, 0.5),
    3px 3px 5px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  margin: 1rem 0;
  border-radius: 10px;
  & > img {
    max-width: 70px;
    width: 100%;
    height: 70px;
    object-fit: cover;
    border-radius: 10px;
  }
  & .place-info {
    margin: 0 0.85rem;
    width: 100%;

    & .place-address {
      white-space: nowrap;
      max-width: 150px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;
