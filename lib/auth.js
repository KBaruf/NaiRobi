import { hash, compare } from 'bcryptjs';

export async function hashPassword(password) {
  const hashedPass = await hash(password, 12);
  return hashedPass;
}

export async function verifyPass(password, hashedPass) {
  const isvalid = await compare(password, hashedPass);
  return isvalid;
}
