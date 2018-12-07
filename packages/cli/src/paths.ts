import { join as pathJoin } from 'path'

export const TEMPLATES = pathJoin(__dirname, '..', 'node_modules', '@nawxt', 'templates', 'templates')
export const RELATIVE_NAWXT_CONFIG = '.nawxt'
export const RELATIVE_NAWXT_INSTALL_FOLDER = pathJoin(RELATIVE_NAWXT_CONFIG, 'install')
export const RELATIVE_NAWXT_TEMPLATE_PROMPT = pathJoin(RELATIVE_NAWXT_INSTALL_FOLDER, 'template.js')
export const RELATIVE_NAWXT_TEMPLATE_DEPS = pathJoin(RELATIVE_NAWXT_INSTALL_FOLDER, 'deps.js')
