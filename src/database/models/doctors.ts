import mongoose from 'mongoose'

const doctorScheme = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    specialization: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
)

export default doctorScheme
