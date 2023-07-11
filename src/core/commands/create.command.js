const path = require('path')
const fs = require('fs')

const _ = require('lodash')

/**
 * Create folder with new component.
 * @param {string} componentName - The name of new component.
 */
const createComponent = componentName => {
  if (!componentName) {
    throw new Error('Component name must be set.')
  }

  const componentPath = path.resolve('src/', 'components/', `${componentName}/`)
  const templatePath = path.resolve('src/', 'core/', 'component/', 'template/')

  if (!fs.existsSync(componentPath)) {
    fs.mkdirSync(componentPath, { recursive: true })
  }

  componentName = componentName.slice(componentName.lastIndexOf('/') + 1)

  const templateFiles = fs.readdirSync(`${templatePath}`)

  for (const templateName of templateFiles) {
    let fileData = fs.readFileSync(`${templatePath}/${templateName}`, {
      encoding: 'utf8',
      flag: 'r'
    })

    const componentFile = componentName
    const pascalName = _.upperFirst(_.camelCase(componentName))

    fs.writeFileSync(
      `${componentPath}/${componentFile}.${templateName.replace('.ft', '')}`,
      fileData
        .replaceAll('<FTName>', componentName)
        .replaceAll('<FTName | PascalCase>', pascalName)
    )
  }

  console.log('Component created.')
}

const componentName = process.argv[2]
createComponent(componentName)
