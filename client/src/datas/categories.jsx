import { IoFlagOutline } from "@react-icons/all-files/io5/IoFlagOutline";
import { IoFastFoodOutline } from "@react-icons/all-files/io5/IoFastFoodOutline";
import { IoBedOutline } from "@react-icons/all-files/io5/IoBedOutline";
// import { MdFlag } from "@react-icons/all-files/md/MdFlag";
// import { MdHotel } from '@react-icons/all-files/md/MdHotel';
// import { MdLocalCafe } from '@react-icons/all-files/md/MdLocalCafe';
// import { MdRestaurant } from '@react-icons/all-files/md/MdRestaurant';
export const MAP_CATEGORIES = [
  {
    id: 1,
    name: "관광명소",
    icon: <IoFlagOutline />,
    code: "AT4",
    typeId: 12,
    placeType: "place",
  },
  {
    id: 2,
    name: "음식점",
    icon: <IoFastFoodOutline />,
    code: "FD6",
    typeId: 39,
    placeType: "restaurant",
  },
  {
    id: 3,
    name: "숙박",
    icon: <IoBedOutline />,
    code: "AD5",
    typeId: 32,
  }, // {
  //   id: 2,
  //   name: "카페",
  //   code: "CE7",
  // },
];
