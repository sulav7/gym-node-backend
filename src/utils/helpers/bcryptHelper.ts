import bcryptjs from "bcryptjs";

const bcryptedPassword = async (password: string) => {
  const hash = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(password, hash);
  return hashedPassword;
};

const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  const checkPassword = await bcryptjs.compare(password, hashedPassword);
  return checkPassword;
};
export { bcryptedPassword, comparePassword };
