import UserModel from "./user.schema.js";

class UserRepository {
  constructor() {}
  //Sign in repository function
  async signup(name, username, password) {
    const user = await  UserModel.create({ name, username, password });
    return user;
  }

  //Find by phone repository function
  async findUser(username) {
    const user = await UserModel.findOne({ username });
    return user;
  }

  //Find by id repository function
  async findById(id) {
    const user = await UserModel.findById(id);
    return user;
  }
}

export default UserRepository;
