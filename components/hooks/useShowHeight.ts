const useShowHeight = (player: any) => {
  if (player && player.height_feet && player.height_inches) {
    return `${player.height_feet}' ${player.height_inches}"`;
  } else {
    return "N/A";
  }
};

export default useShowHeight;
