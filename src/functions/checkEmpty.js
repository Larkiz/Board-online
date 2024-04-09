export const checkEmpty = (e) => {
  const clickedOnEmpty = e.target == e.target.getStage();

  return clickedOnEmpty;
};
