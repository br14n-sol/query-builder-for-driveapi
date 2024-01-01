import { minify } from 'terser'

import path from 'node:path'
import fs from 'node:fs/promises'

const statements = `
if (module.exports.default) {
  Object.assign(module.exports.default, module.exports);
  module.exports = module.exports.default;
  delete module.exports.default;
}
`

async function main() {
  const { outDir } = (
    await import('./tsup.config.json', {
      with: { type: 'json' }
    })
  ).default
  const currentDir = process.cwd()
  const outDirPath = path.resolve(currentDir, outDir)

  const files = await getFiles(outDirPath)
  for (const file of files) {
    const code = await fs.readFile(file.path, 'utf-8')
    let result

    if (/^.+\.cjs$/.test(file.name)) {
      result = fixExports(code)
      logger('fix-cjs-exports', `${result ? '✔' : 'skip'} ${file.name}`)
    }

    if (/^.+\.(js|cjs)$/.test(file.name)) {
      result = (await minify(result ?? code)).code
      const size = Buffer.byteLength(result)
      logger(
        'minify',
        path.relative(currentDir, file.path),
        `${formatBytes(file.size)} ➡ ${formatBytes(size)}`
      )
    }

    if (/^.+\.cts$/.test(file.name)) {
      result = fixTypes(code)
      logger('fix-cjs-types', `${result ? '✔' : 'skip'} ${file.name}`)
    }

    if (result) {
      await fs.writeFile(file.path, result)
    }
  }
}

async function getFiles(directory) {
  const filenames = await fs.readdir(directory)
  const output = []

  for (const file of filenames) {
    const filePath = path.join(directory, file)
    const fileStat = await fs.stat(filePath)

    if (fileStat.isDirectory()) {
      output.push(...(await getFiles(filePath)))
    } else {
      output.push({
        name: file,
        path: filePath,
        size: fileStat.size
      })
    }
  }

  return output
}

function fixExports(code) {
  if (
    code.includes('module.exports = __toCommonJS') &&
    !code.endsWith(statements)
  ) {
    return code + statements
  }
}

function fixTypes(code) {
  const result = /export \{.*\b(?<name>.+) as default.*\};/s.exec(code)
  if (result.groups.name) {
    const statement = `export = ${result.groups.name}`
    if (!code.endsWith(statement)) {
      return code + statement
    }
  }
}

function logger(name, ...messages) {
  console.log(`[${name}]`, ...messages)
}

function formatBytes(bytes) {
  return `${(bytes / 1024).toFixed(2)} KB`
}

await main()
