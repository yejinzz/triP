import styled from "styled-components";
import NoImage from "@/assets/images/no_image.svg?react";

const PlaceItemImg = ({ placeImg }) => {
  return (
    <PlaceImgContainer>
      {placeImg ? <img src={placeImg} alt="place_img" /> : <NoImage />}
    </PlaceImgContainer>
  );
};

export default PlaceItemImg;
const PlaceImgContainer = styled.div`
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
`;
