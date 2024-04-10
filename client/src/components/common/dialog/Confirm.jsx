// import DialogContainer from "@/components/common/Dialog";
import styled from "styled-components";
import Button from "@/components/atom/button/Button";
import { createPortal } from "react-dom";
import { BackDrop } from "@/styles/Common";

const Confirm = ({
  title,
  content,
  primaryLabel,
  secondaryLabel,
  onClickPrimaryButton,
  onClickSecondaryButton,
}) => {
  return createPortal(
    <>
      <BackDrop />
      <DialogContainer>
        {/* <div>❗️</div> */}
        <h2>{title}</h2>
        <p className="dialog__content">{content}</p>

        <DialogButtonGroup>
          <Button
            variant="primary"
            // hovercolor={"default"}
            // hoveropacity={"active"}
            onClick={onClickPrimaryButton}
          >
            {primaryLabel}
          </Button>
          {secondaryLabel && (
            <Button
              variant="outline"
              // hovercolor={"default"}
              // hoveropacity={"active"}
              onClick={onClickSecondaryButton}
            >
              {secondaryLabel}
            </Button>
          )}
        </DialogButtonGroup>
      </DialogContainer>
    </>,
    document.querySelector("#root")
  );
};

export default Confirm;

const DialogContainer = styled.div`
  min-width: 300px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  z-index: 999;
  padding: 3rem;
  background-color: #f3f3f3;
  border-radius: 15px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
`;
const DialogButtonGroup = styled.div`
  width: 100%;
  display: flex;
  gap: 1rem;
  /* background-color: #fff; */
`;

// const DialogContent = styled.p`
//   /* background-color: #fff; */
//   font-size: 1rem;
// `;
