import mongoose from 'mongoose'

const doctorScheme = new mongoose.Schema(
  {
    chat_id: {
      type: String,
      required: true,
    },
    first_name: {
      type: String,
      required: true,
    },
    name: {
      type: String,
    },
    phone: {
      type: String,
    },
  },
  { versionKey: false }
)

export default doctorScheme
