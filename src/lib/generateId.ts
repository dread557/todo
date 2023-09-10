export const generateNumericID = () => {
  const numericCharacters = "0123456789";
  let numericID: any = "";

  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * numericCharacters.length);
    numericID += numericCharacters[randomIndex];
  }

  return numericID;
};
