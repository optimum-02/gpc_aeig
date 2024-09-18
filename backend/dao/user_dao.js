const mongoose = require('mongoose');
const {UserEntity, UserEntityWithPassword} = require('../schemas/user_schema');
const { modelToEntityConverter } = require('../utils/dto');


const UserModel = mongoose.model('User', new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'membre'], required: true }
}, { timestamps: true }),);

const toEntity =(user)=>{
  return modelToEntityConverter({...user.toJSON(), _id: user.id}, UserEntityWithPassword)
}


class UserDAO {

  async findByEmail(email) {
    const user = await UserModel.findOne({ email });
    if(user) return toEntity(user);
  }
  async findById(userId) {
    const user = await UserModel.findById( userId );
    if(user) return toEntity(user);;
  }

  async createUser(userData) {
    const newUser =  UserModel(userData);
    const user =  await newUser.save({isNew:true});
    if(user) return toEntity(user);;

  }
}

module.exports = { UserDAO };



