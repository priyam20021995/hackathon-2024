export const extractHexColors = (str) => {
  const regex = /#[0-9A-Fa-f]{6}\b/g;
  return str.match(regex) || [];
};
