import bcrypt from 'bcrypt';
import crypto from 'crypto';
import _ from 'lodash';
import mongoose, { Schema } from 'mongoose';
import mongooseKeywords from 'mongoose-keywords';
import randtoken from 'rand-token';
import config from '../../config';

const roles = ['user', 'admin'];

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Email required'],
    unique: [true, 'This email already exists'],
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Bad email address format'],
  },
  password: {
    type: String,
    required: [true, 'Password required'],
    minlength: [8, 'Password must be longer than 8 characters'],
  },
  name: {
    type: String,
    index: true,
    trim: true,
  },
  services: {
    facebook: String,
    github: String,
    google: String,
  },
  role: {
    type: String,
    enum: roles,
    default: 'user',
  },
  picture: {
    type: String,
    trim: true,
  },
}, {
  timestamps: true,
});

userSchema.path('email').set(function(email) {
  if (!this.picture || this.picture.indexOf('https://gravatar.com') === 0) {
    const hash = crypto.createHash('md5').update(email).digest('hex');
    this.picture = `https://gravatar.com/avatar/${hash}?d=identicon`;
  }

  if (!this.name) {
    this.name = email.replace(/^(.+)@.+$/, '$1');
  }

  return email;
});

/**
 * Hash the password before saving user into database
 */
userSchema.pre('save', function(next) {
  if (!this.isModified('password')) return next();

  /* istanbul ignore next */
  const rounds = config.env === 'test' ? 1 : 9;

  bcrypt.hash(this.password, rounds).then((hash) => {
    this.password = hash;
    next();
  }).catch(next);
});

userSchema.methods = {
  view(full) {
    let fields = ['id', 'name', 'picture'];

    if (full) {
      fields = [...fields, 'email', 'createdAt'];
    }

    return _.pick(this, fields) || {};
  },

  authenticate(password) {
    return bcrypt.compare(password, this.password)
      .then((valid) => valid ? this : false);
  },
};

userSchema.statics = {
  roles,

  createFromService({ service, id, email, name, picture }) {
    return this.findOne({ $or: [{ [`services.${service}`]: id }, { email }] })
      .then((user) => {
        if (user) {
          user.services[service] = id;
          user.name = name;
          user.picture = picture;
          return user.save();
        } else {
          const password = randtoken.generate(16);
          return this.create({
            services: { [service]: id },
            email,
            password,
            name,
            picture,
          });
        }
    });
  },
};

userSchema.plugin(mongooseKeywords, { paths: ['email', 'name'] });

const model = mongoose.model('User', userSchema);

export const schema = model.schema;
export default model;
