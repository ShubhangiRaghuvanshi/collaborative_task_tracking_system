const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 100
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
    validate: {
      validator: function(v) {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email!`
    }
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 6,
    maxlength: 100
  },
  teams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }]
});


userSchema.pre('save', function(next) {
  const user = this;


  if (!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);


    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);

   
      user.password = hash;
      next();
    });
  });
});

module.exports = mongoose.model('User', userSchema);