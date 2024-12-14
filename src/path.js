import { fileUrlToPath } from 'node: url'
import { dirname } from 'path'

export const __filename = fileUrlToPath(import.meta.url)

export const __dirname = dirname(__filename)