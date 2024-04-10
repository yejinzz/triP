import { useState } from "react";

const useOpenDialog = () => {
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const openDialog = () => {
    setIsOpenDialog(true);
  };

  const closeDialog = () => {
    setIsOpenDialog(false);
  };
  return [isOpenDialog, openDialog, closeDialog];
};

export default useOpenDialog;
