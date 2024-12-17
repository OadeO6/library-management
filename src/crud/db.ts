import { Book, Catalog, User } from '../models';

export const createUser = async (data) => {
  try {
    const user = await User.create(data);
    return user;
  } catch (error) {
     throw error;
  }
}

export const findUser = async (data) => {
  try {
    const user = await User.findOne({ where: { ...data } });
    return user;
  } catch (error) {
     throw error;
  }
}
