import { get as getAppDir } from 'app-root-dir'
import { join as pathJoin } from 'path'

export const APP_DIR = getAppDir()
export const APP_BABELRC = pathJoin(APP_DIR, '.babelrc')
export const APP_CACHE_DIR = pathJoin(APP_DIR, '.cache')
export const APP_DIST_DIR = pathJoin(APP_DIR, 'dist')
export const APP_MODULES_DIR = pathJoin(APP_DIR, 'node_modules')
export const APP_SRC_DIR = pathJoin(APP_DIR, 'src')
export const APP_SRC_ENTRY = pathJoin(APP_DIR, 'src', 'bootstrap', 'index.html')
export const APP_NAWXT_DIR = pathJoin(APP_DIR, '.nawxt')
export const APP_NAWXT_CONFIG_DIR = pathJoin(APP_NAWXT_DIR, 'config')
export const APP_NAWXT_ENV_DIR = pathJoin(APP_NAWXT_CONFIG_DIR, 'env')
export const APP_NAWXT_INSTALL_DIR = pathJoin(APP_NAWXT_DIR, 'install')
export const APP_NAWXT_TEMPLATE_PROMPT = pathJoin(APP_NAWXT_INSTALL_DIR, 'template.js')
export const APP_NAWXT_TEMPLATE_DEPS = pathJoin(APP_NAWXT_INSTALL_DIR, 'deps.js')
