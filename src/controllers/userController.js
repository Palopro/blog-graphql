import User from '../models/User.model';

class UserController {
  findAllUsers = async () => {
    const users = await User.find();
    return users;
  }

  findUserById = async (args) => {
    const {_id} = args;

    const user = await User.findById(_id);
    return user;
  }
}


export const userController = new UserController();
