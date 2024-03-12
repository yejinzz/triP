import styled from "styled-components";
import { useSelector } from "react-redux";

const ScheduleCard = () => {
  const schedules = useSelector((state) => state.schedule.schedules);
  const selectedDay = useSelector((state) => state.schedule.selectedDay);

  console.log(schedules);
  return (
    <Container>
      {schedules[selectedDay]?.map((place, idx) => {
        return (
          <ScheduleCardContainer key={idx}>
            <CircleMarker>{idx + 1}</CircleMarker>
            <div className="info">
              <ScheduleImg alt="" src={place.placeInfo.imgUrl} />
              <ScheduleInfo>
                <p>{place.placeInfo.name}</p>
                <p>{place.placeInfo.address}</p>
              </ScheduleInfo>
            </div>
          </ScheduleCardContainer>
        );
      })}
    </Container>
    // <ScheduleCardContainer>
    //   <ScheduleImg alt="" src={planList[0]?.placeInfo.imgUrl} />
    //   <ScheduleInfo>
    //     <p>{planList[0]?.placeInfo.name}</p>
    //     <p>{planList[0]?.placeInfo.address}</p>
    //   </ScheduleInfo>
    // </ScheduleCardContainer>
  );
};

export default ScheduleCard;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* margin: 1rem; */
  /* height: 100%; */

  height: calc(100% - 2.5rem);
  overflow-y: auto;
  /* padding: 1rem; */
  &::-webkit-scrollbar {
    width: 5px;
    border-radius: 25px;
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--color-gray);
    border-radius: 4px;
  }
`;

const CircleMarker = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  color: #fff;
  top: 10px;
  left: 0;
  /* transform: translateY(-50%); */
  width: 25px; /* 조절 가능한 값 */
  height: 25px; /* 조절 가능한 값 */
  background-color: var(--color-primary); /* 도형의 배경색 */
  border-radius: 50%; /* 도형을 원 모양으로 만듭니다. */
`;
const ScheduleCardContainer = styled.div`
  position: relative;
  /* padding-left: 30px; */
  padding-left: 3rem;
  /* margin: 0.1rem 0; */
  &::before {
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    border-left: 1px dashed var(--color-gray);
    margin: 10px;
    height: 100%;
  }

  .info {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    /* height: 100px; */
    padding: 1.5rem 0;
    width: 100%;
    border-bottom: 1px solid var(--color-gray);
    /* margin-bottom: 1rem; */
  }
`;

const ScheduleImg = styled.img`
  width: 70px;
  height: 70px;
  object-fit: cover;
  border-radius: 10px;
`;

const ScheduleInfo = styled.div`
  /* height: 100%; */
  /* display: flex;
  flex-direction: column;
  justify-content: center; */
`;
