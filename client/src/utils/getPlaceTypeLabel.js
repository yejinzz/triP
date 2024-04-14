export const getPlaceTypeLabel = (place) => {
  switch (place.contenttypeid) {
    case "12":
      return "관광명소";
    case "39":
      return "음식점";
    case "32":
      return "숙박";
    default:
      return null;
  }
};
