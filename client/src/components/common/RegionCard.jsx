import styled from "styled-components";

const RegionCard = ({ isSelected, regionInfo, onClick }) => {
  return (
    <RegionList onClick={onClick} isSelected={isSelected}>
      <img src={regionInfo.imgUrl} alt={regionInfo.name} />
      <div className="region-info">
        <h1>{regionInfo.nameEng}</h1>
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
    & > h1 {
      font-family: "Montserrat", sans-serif;
      font-size: 1.5rem;
      letter-spacing: 0;
      margin-bottom: 0.3rem;
    }
  }
`;
