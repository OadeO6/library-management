import { User } from "../../models";
import { UniqueConstraintError } from "sequelize";
import { UserAlreadyExistsError, TransactionFailedError } from "../../errors/db";
import { findUserArgType } from "../../types";


export const createUser = async (data: User): Promise<User> => {
  try {
    return await User.create(data);
  } catch (error) {
    if (error instanceof UniqueConstraintError) {
      throw new UserAlreadyExistsError(`User with email ${data.email} already exists.`);
    }
    // Handle other errors, such as database issues or validation errors
    throw new TransactionFailedError("creating user", (error as Error).message);
  }
};

export const findUser = async (data: findUserArgType): Promise<User | null> => {
  try {
    const user = await User.findOne({ where: { ...data } });
    return user;
  } catch (error) {
    throw new TransactionFailedError("finding user", (error as Error).message);
  }
};
