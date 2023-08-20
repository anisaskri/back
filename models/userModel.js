const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator= require('validator')
const Schema = mongoose.Schema

const userSchema = new Schema({
    FirstName : {
        type: String , 
        required :  true
    },
    SecondName :{
        type : String  ,
        required : true 
    },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
})

// static signup method
userSchema.statics.signup = async function(FirstName,SecondName,email, password) {
    if (!email || !password) {
        throw Error('all fields must be filled ')
    }
    if(!validator.isEmail(email)) {
        throw Error('email not valid')
    }else if (!validator.isStrongPassword(password)) {
        throw Error('password not strong enough')
    }

  const exists = await this.findOne({ email })

  if (exists) {
    throw Error('Email already in use')
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const user = await this.create({FirstName , SecondName, email, password: hash  })

  return user
}
// static login 
userSchema.statics.login = async function(email , password)  {
      
      const user = await this.findOne({ email })
      if (!user) {
        throw Error('Incorrect email')
      }
    
      const match = await bcrypt.compare(password, user.password)
      if (!match) {
        throw Error('Incorrect password')
      }
    
      return user
}
module.exports = mongoose.model('User', userSchema)