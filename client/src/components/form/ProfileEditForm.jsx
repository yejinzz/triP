import { useForm } from "react-hook-form";
import { instance } from "@/api/instance";
import { useSelector } from "react-redux";
import Button from "../atom/button/Button";
import Input from "../atom/Input";
import { getValidOptionByType } from "@/utils/getValidOptionByType";
import UserProfileImg from "../mypage/UserProfileImg";
import styled from "styled-components";
import { getDateFormat } from "@/utils/getFormatDate";
import { useRef, useState } from "react";
import Modal from "../common/modal/Modal";
import PasswordEditForm from "./PasswordEditForm";
import useOpenDialog from "@/hooks/useOpenDialog";
import Confirm from "../common/dialog/Confirm";
import { deleteUser } from "@/api/api";

const ProfileEditForm = () => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const [openPwdForm, setOpenPwdForm] = useState(false);
  const modalRef = useRef();
  const [isOpenDialog, openDialog, closeDialog] = useOpenDialog();

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isDirty, isValid },
  } = useForm({ mode: "onChange" });

  const onSubmit = (data) => {
    instance
      .patch(`/api/user/${userInfo.userId}`, data)
      .then(() => {
        location.reload();
      })
      .catch((err) => {
        if (err.response.data === "중복된 닉네임입니다") {
          setError("username", {
            type: "manual",
            message: "중복된 닉네임입니다.",
          });
        }
      });
  };

  return (
    <>
      {isOpenDialog && (
        <Confirm
          title="정말 탈퇴하시겠습니까?"
          content="다시 되돌릴 수 없습니다."
          primaryLabel="취소"
          secondaryLabel="삭제"
          onClickPrimaryButton={() => {
            closeDialog();
          }}
          onClickSecondaryButton={() => {
            deleteUser();
          }}
        />
      )}
      {openPwdForm && (
        <Modal modalRef={modalRef} handler={() => setOpenPwdForm(false)}>
          <PasswordEditForm setOpenPwdForm={setOpenPwdForm} />
        </Modal>
      )}

      <EditForm onSubmit={handleSubmit(onSubmit)}>
        <UserProfileImg />

        <fieldset>
          <Input
            label="닉네임"
            type="username"
            placeholder="닉네임을 입력해주세요."
            register={register}
            getOption={getValidOptionByType}
            errors={errors}
            defaultValue={userInfo.userName}
          ></Input>

          <Input
            label="이메일"
            type="email"
            placeholder="이메일을 입력해주세요."
            register={register}
            value={userInfo.email}
            readOnly
          ></Input>
          <div className="join__date">
            <div>가입일</div>
            <p>{getDateFormat(userInfo.createdAt, "korean")}</p>
          </div>
          <div className="other__btn_wrap">
            <Button
              variant="outline"
              type="button"
              onClick={() => setOpenPwdForm(true)}
            >
              비밀번호 변경
            </Button>
            <Button
              className="withdrawal__btn"
              variant="outline"
              type="button"
              onClick={() => openDialog()}
            >
              회원탈퇴
            </Button>
          </div>

          <Button
            variant="primary"
            type="submit"
            disabled={
              !isDirty || !isValid || userInfo.userName === watch("username")
            }
          >
            수정하기
          </Button>
        </fieldset>
      </EditForm>
    </>
  );
};

export default ProfileEditForm;
const EditForm = styled.form`
  width: 500px;
  .join__date {
    p {
      font-weight: 100;
      margin: 0.5rem;
    }
  }
  fieldset {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    margin: 1rem;
  }
  .other__btn_wrap {
    display: flex;
    gap: 3rem;
    .withdrawal__btn {
      color: var(--color-gray);
      border-color: var(--color-gray);
    }
  }

  @media (max-width: 500px) {
    width: 100%;
  }
`;
