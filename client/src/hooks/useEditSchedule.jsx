import { useDispatch, useSelector } from "react-redux";
import {
  setEditMode,
  setEditedSchedule,
} from "../store/slice/editedScheduleSlice";
import { editSchedule } from "../store/slice/scheduleSlice";

const useScheduleEditor = () => {
  //   const [isEdit, setIsEdit] = useState(false);
  //   const [editedSchedule, setEditedSchedule] = useState(initialSchedules);
  const dispatch = useDispatch();
  const isEdit = useSelector((state) => state.editedSchedule.isEdit);
  const editedSchedules = useSelector(
    (state) => state.editedSchedule.editedSchedules
  );
  const selectedDay = useSelector((state) => state.schedule.selectedDay);
  const handleEditMode = (initialSchedules) => {
    if (!isEdit) {
      dispatch(setEditedSchedule(initialSchedules));
      dispatch(setEditMode(true));
      return;
    } else {
      // Dispatch action to save editedSchedule
      dispatch(editSchedule(editedSchedules));
      dispatch(setEditMode(false));
      return;
    }
  };

  const handleChangeList = (result) => {
    if (!result.destination) return;
    const items = [...editedSchedules[selectedDay]];
    const reorderedItem = items.splice(result.source.index, 1)[0];
    items.splice(result.destination.index, 0, reorderedItem);

    dispatch(setEditedSchedule({ ...editedSchedules, [selectedDay]: items }));
  };
  const handleRemoveSchedule = (idx) => {
    const items = [...editedSchedules[selectedDay]];
    items.splice(idx, 1);
    dispatch(setEditedSchedule({ [selectedDay]: items }));
  };

  return {
    handleChangeList,
    handleRemoveSchedule,
    handleEditMode,
  };
};

export default useScheduleEditor;
