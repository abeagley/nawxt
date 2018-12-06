import { exitWithLog } from '@nawxt/utils'
import { readFile, rename, writeFile } from 'fs-extra'
import Handlebars from 'handlebars'

/*
  Switch Helper Provided By:

  http://chrismontrois.net/2016/01/30/handlebars-switch/
*/

Handlebars.registerHelper('switch', function (value, options) {
  this._switch_value_ = value
  const html = options.fn(this) // Process the body of the switch block
  delete this._switch_value_
  return html
})

Handlebars.registerHelper('case', function (value, options) {
  return (value === this._switch_value_) ? options.fn(this) : null
})

export const compileTemplateFile = async (path: string, data: any): Promise<boolean> => {
  try {
    const beforeCompile = await readFile(path).then((contents) => contents.toString())
    const tmpl = Handlebars.compile(beforeCompile)
    await writeFile(path, tmpl(data))
    await rename(path, path.replace('.hbs', ''))
  } catch (e) {
    console.log(e)
    exitWithLog(`Unable to compile file at: ${path}.`)
  }

  return true
}
