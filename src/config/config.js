import { config } from 'dotenv'

config()

export const CONFIG = {
  MONGO_URL: process.env.MONGO_URL
}
