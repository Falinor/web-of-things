import { Document, model, Model, Schema } from 'mongoose';

const userSchema: Schema = new Schema({
  // TODO
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  // Not required because only admins can connect
  // and therefore have a password
  password: String,
  roles: {
    type: String,
    required: true,
    lowercase: true,
    default: 'user',
    enum: ['user', 'admin']
  }
});

// Init User model
model('User', userSchema);

export const User: Model<Document> = model('User');
