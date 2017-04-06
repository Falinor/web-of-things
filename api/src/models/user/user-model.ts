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
  displayName: String,
  roles: {
    type: String,
    required: true,
    lowercase: true,
    default: 'user',
    enum: ['user', 'admin']
  }
}, {
  timestamps: true
});

// Init User model
model('User', userSchema);

export const UserDAO: Model<Document> = model('User');
