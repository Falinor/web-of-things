import mongoose, { Schema } from 'mongoose';

const PUBLIC_PATHS = [
  '/',
];

const accessSchema = new Schema({
  uid: {
    type: String,
    required: [true, 'UID required'],
    trim: true,
    lowercase: true,
    match: [/^[a-z]+:[0-9]+$/, 'Bad UID format'],
  },
  resources: {
    type: [String],
    required: [true, 'Resources required'],
  },
}, {
  timestamps: true,
});

accessSchema.statics = {
  PUBLIC_PATHS,

  isPublic(path) {
    return PUBLIC_PATHS.find(publicPath => publicPath === path);
  },
};

const model = mongoose.model('Access', accessSchema);

export const schema = model.schema;
export default model;
