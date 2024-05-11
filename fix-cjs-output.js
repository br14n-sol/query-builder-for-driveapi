import { fixCjsExports, fixCjsDts } from 'fix-tsup-cjs'
import { minify } from 'terser'

import path from 'node:path'
import fs from 'node:fs/promises'

const { outDir } = (
  await import('./tsup.config.json', {
    with: { type: 'json' }
  })
).default
const currentDir = process.cwd()
const outDirPath = path.resolve(currentDir, outDir)

await fixCjsExports({ globOptions: { cwd: outDirPath } })
await fixCjsDts({ globOptions: { cwd: outDirPath } })

const filesToMinify = (
  await fs.readdir(outDirPath)
).filter(fileName => /^.+\.(js|cjs)$/.test(fileName))

for (const fileName of filesToMinify) {
  const filePath = path.resolve(outDirPath, fileName)
  const fileContent = await fs.readFile(filePath, 'utf-8')
  const minifiedFileContent = (await minify(fileContent)).code

  if (minifiedFileContent) {
    await fs.writeFile(filePath, minifiedFileContent)

    logger(
      'minify',
      path.join(outDir, fileName),
      formatBytes(Buffer.byteLength(fileContent)),
      '➡',
      formatBytes(Buffer.byteLength(minifiedFileContent))
    )
  } else {
    logger('minify', path.join(outDir, fileName), '❌')
  }
}

function logger(prefix, ...messages) {
  console.log(`[${prefix}]`, ...messages)
}

function formatBytes(bytes) {
  return `${(bytes / 1024).toFixed(2)} KB`
}
