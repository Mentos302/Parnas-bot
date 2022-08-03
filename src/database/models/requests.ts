import mongoose from 'mongoose'

const serviceScheme = new mongoose.Schema(
  {
    client_id: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
)

export default serviceScheme
