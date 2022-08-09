import {
  readFileSync,
  readdirSync,
  statSync,
  watch,
  writeFileSync,
} from 'fs'

import { join } from 'path'

import template from './template'

interface Options {
  svgFolderPath: string
  outputPath: string
  basePath: string
}
export default ({ svgFolderPath, outputPath }: Options) => {
  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }
  const toCamelCase = (str: string) => capitalizeFirstLetter(str.replace(/-\w/g, x => `${x[1].toUpperCase()}`))

  const generateObjectContent = (files: string[]) => {
    const objectContent = files.map((fileName) => {
      const fileNameWithoutExtension = fileName.split('.')[0]
      let content = readFileSync(join(svgFolderPath, fileName), 'utf-8')

      // Remove enters
      content = content.replace(/(\r\n|\n|\r)/gm, '')
      const name = toCamelCase(fileNameWithoutExtension)
      return { name, content }
    })

    return objectContent
  }

  const generateOutput = () => {
    const files = readdirSync(svgFolderPath)
      .filter(entry => !statSync(join(svgFolderPath, entry)).isDirectory())
    const svgObjectContent = generateObjectContent(files)
    svgObjectContent.forEach((svg) => {
      const output = template(svg.content)

      writeFileSync(`${outputPath}/${svg.name}.vue`, output)
    })
  }

  return {
    name: 'svg-transformer',
    config(_: any, { command }: any) {
      if (command === 'serve')
        watch(svgFolderPath, generateOutput)
    },
  }
}
