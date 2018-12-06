import { join as pathJoin } from 'path'

export const TEMPLATES = pathJoin(__dirname, '..', 'node_modules', '@nawxt', 'templates', 'templates')
export const RELATIVE_NAWXT_CONFIG = '.nawxt'
export const RELATIVE_NAWXT_TEMPLATE_PROMPT = pathJoin(RELATIVE_NAWXT_CONFIG, 'prompts', 'template.js')
