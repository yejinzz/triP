import MyPlanList from "../components/mypage/MyPlanList";
import ProfileEditForm from "../components/form/ProfileEditForm";

export const MYPAGE_MENU = [
  {
    name: "나의 여행",
    content: <MyPlanList />,
  },
  {
    name: "프로필 수정",
    content: <ProfileEditForm />,
  },
];
