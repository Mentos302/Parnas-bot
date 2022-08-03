import mongoose from 'mongoose'

const serviceScheme = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    site_url: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
)

export default serviceScheme
