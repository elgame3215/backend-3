import { config } from 'dotenv'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
export const baseDir = resolve(__dirname, '../..')

config()

export const CONFIG = {
  MONGO_URL: process.env.MONGO_URL
}
