import { fileUrlToPath } from 'url'
import { dirname } from 'path'

const __filename = fileUrlToPath(import.meta.url)

export const __dirname = dirname(__filename)