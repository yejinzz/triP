import { useEffect } from "react";
import { setCloseModal } from "@/store/slice/modalSlice";
import { useDispatch } from "react-redux";

const useCloseModal = (ref, handler) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const listener = (e) => {
      if (!ref || ref.current.contains(e.target)) {
        return;
      }

      handler ? handler() : dispatch(setCloseModal());
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
};

export default useCloseModal;
