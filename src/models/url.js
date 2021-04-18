import { customAlphabet } from 'nanoid';

export default (Schema) => {
  const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 6);

  const schema = new Schema({
    full: {
      type: String,
      required: true,
      unique: true,
    },
    short: {
      type: String,
      default: () => nanoid(),
    },
    clicks: {
      type: Number,
      default: 0,
    },
  }, { timestamps: true });

  return schema;
};
