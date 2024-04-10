import { RiEdit2Fill } from "@react-icons/all-files/ri/RiEdit2Fill";
import { useRef, useState } from "react";
import Modal from "../common/modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { instance } from "@/api/instance";
import { setUserInfo } from "@/store/slice/userSlice";
import ProfileImgChangeForm from "../form/ProfileImgChangeForm";
import styled from "styled-components";

const UserProfileImg = () => {
  const modalRef = useRef(null);
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);

  const [profileModal, setProfileModal] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);

  const handleProfileChange = () => {
    if (!selectedProfile) {
      return setProfileModal(false);
    }

    instance
      .patch(`/api/user/${userInfo.userId}`, {
        thumbnail: selectedProfile,
      })
      .then((res) => {
        console.log(res);
        dispatch(setUserInfo({ thumbNail: selectedProfile }));
      });
    return setProfileModal(false);
  };
  return (
    <>
      {profileModal && (
        <Modal modalRef={modalRef} handler={() => setProfileModal(false)}>
          <TitleWrapper>
            <h2>프로필 선택</h2>
            <p>사용할 프로필을 선택해주세요.</p>
          </TitleWrapper>
          <ProfileImgChangeForm
            selecte={selectedProfile}
            setSelected={setSelectedProfile}
            onClose={() => setProfileModal(false)}
            onChange={handleProfileChange}
          />
        </Modal>
      )}
      <ProfileImgContainer>
        <div className="thumb__wrap" aria-label="유저 프로필">
          {/* <DefaultThumbNail /> */}
          <img
            className="thumb__img"
            src={userInfo.thumbNail}
            alt="유저 프로필 이미지"
          />
          <div className="icon__wrap" onClick={() => setProfileModal(true)}>
            <RiEdit2Fill />
          </div>
        </div>
      </ProfileImgContainer>
    </>
  );
};

export default UserProfileImg;
const ProfileImgContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .thumb__wrap {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    border-radius: 50%;
    padding: 1rem;
    box-shadow: 0px 0px 8px rgb(0, 0, 0, 0.2);

    .thumb__img {
      width: 100px;
      height: 100px;
      color: var(--color-primary);
    }
    .icon__wrap {
      position: absolute;
      right: -5px;
      bottom: -0px;
      padding: 0.5rem;
      background-color: #424242;
      border-radius: 50%;
      cursor: pointer;
      & > svg {
        color: #ffffff;
        font-size: 1.2rem;
      }
    }
  }
`;

const TitleWrapper = styled.div`
  p {
    margin: 1rem 0;
  }
`;
