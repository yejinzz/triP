import styled from "styled-components";
import { useSelector } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { IoIosRemoveCircleOutline } from "@react-icons/all-files/io/IoIosRemoveCircleOutline";
import { IoReorderThreeOutline } from "@react-icons/all-files/io5/IoReorderThreeOutline";
import useScheduleEditor from "@/hooks/useEditSchedule";
import ScheduleItem from "./ScheduleItem";

const ScheduleList = () => {
  // const dispatch = useDispatch();
  const schedules = useSelector((state) => state.schedule.schedules);
  const selectedDay = useSelector((state) => state.schedule.selectedDay);
  const isEdit = useSelector((state) => state.editedSchedule.isEdit);
  const editedSchedules = useSelector(
    (state) => state.editedSchedule.editedSchedules
  );

  const { handleChangeList, handleRemoveSchedule, handleEditMode } =
    useScheduleEditor();

  return (
    <Container>
      <EditButton isEdit={isEdit} onClick={() => handleEditMode(schedules)}>
        {!isEdit ? "일정 편집하기" : "편집 완료하기"}
      </EditButton>
      <ListContainer>
        {!isEdit ? (
          schedules[selectedDay]?.map((place, idx) => {
            return (
              <ScheduleContainer key={idx}>
                <CircleMarker>{idx + 1}</CircleMarker>
                <ScheduleItem place={place} />
              </ScheduleContainer>
            );
          })
        ) : (
          <>
            <DragDropContext onDragEnd={handleChangeList}>
              <Droppable droppableId="schedules">
                {(provided) => (
                  <ul
                    className="schedules"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {editedSchedules[selectedDay]?.map((place, idx) => (
                      <Draggable key={idx} draggableId={`${idx}`} index={idx}>
                        {(provided) => (
                          <li
                            className="schedule"
                            ref={provided.innerRef}
                            {...provided.dragHandleProps}
                            {...provided.draggableProps}
                          >
                            <RemoveIcon
                              onClick={() => handleRemoveSchedule(idx)}
                            />
                            <ScheduleItem place={place} />
                            <ChangeListIcon />
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
  height: 100%;
  overflow: auto;
`;
const ListContainer = styled.div`
  .schedule {
    display: flex;
    justify-content: space-between;
    align-items: center;
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
const RemoveIcon = styled(IoIosRemoveCircleOutline)`
  font-size: 1.3rem;
  cursor: pointer;
  color: var(--color-red);
`;
const ChangeListIcon = styled(IoReorderThreeOutline)`
  font-size: 1.2rem;
  cursor: pointer;
`;
