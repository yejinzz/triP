import styled from "styled-components";
import { useState } from "react";
import { useSelector } from "react-redux";
import PlaceItem from "./place/PlaceItem";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const ScheduleList = () => {
  const schedules = useSelector((state) => state.schedule.schedules);
  const selectedDay = useSelector((state) => state.schedule.selectedDay);
  const [isEdit, setIsEdit] = useState(false);

  const handleChange = (result) => {
    if (!result.destination) return;
    console.log(result);
    const items = [...schedules[selectedDay]];
    console.log(items);
    // const [reorderedItem] = items.splice(result.source.index, 1);
    // items.splice(result.destination.index, 0, reorderedItem);
  };
  const handleEdit = (result) => {
    if (!result.destination) return setIsEdit(!isEdit);
  };
  return (
    <Container>
      <EditButton isEdit={isEdit} onClick={() => setIsEdit(!isEdit)}>
        {!isEdit ? "일정 편집하기" : "편집 완료하기"}
      </EditButton>
      <ListContainer>
        {!isEdit ? (
          schedules[selectedDay]?.map((place, idx) => {
            return (
              <ScheduleContainer key={idx}>
                <CircleMarker>{idx + 1}</CircleMarker>
                <PlaceItem place={place} />
              </ScheduleContainer>
            );
          })
        ) : (
          <>
            <DragDropContext onDragEnd={handleChange}>
              <Droppable droppableId="schedules">
                {(provided) => (
                  <ul
                    className="schedules"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {schedules[selectedDay]?.map((place, idx) => (
                      <Draggable key={idx} draggableId={`${idx}`} index={idx}>
                        {(provided) => (
                          <li
                            ref={provided.innerRef}
                            {...provided.dragHandleProps}
                            {...provided.draggableProps}
                          >
                            <PlaceItem place={place} isEdit={isEdit} />
                          </li>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
            </DragDropContext>
          </>
        )}
      </ListContainer>
    </Container>
  );
};

export default ScheduleList;
const EditButton = styled.button`
  width: 100%;
  /* background-color: #e2e2e2; */
  background-color: ${({ isEdit }) =>
    !isEdit ? "#e2e2e2" : "var(--color-primary)"};
  color: ${({ isEdit }) => isEdit && "#fff"};
  padding: 0.7rem;
  border-radius: 10px;
`;

const Container = styled.div`
  overflow: auto;
`;
const ListContainer = styled.div`
  height: calc(100% - 2.5rem);
  overflow-y: auto;
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
  width: 25px;
  height: 25px;
  background-color: var(--color-primary);
  border-radius: 50%;
`;
const ScheduleContainer = styled.div`
  position: relative;
  /* display: block; */
  padding-left: 2rem;

  &::before {
    /* margin-right: 3rem; */
    /* display: ${({ isEdit }) => isEdit && "none"}; */
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    border-left: 1px dashed var(--color-gray);
    margin: 10px;
    height: 100%;
  }
`;
