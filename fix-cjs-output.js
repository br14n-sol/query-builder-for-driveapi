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
const fixDir = path.resolve(currentDir, outDir)

await fixCjsExports({ globOptions: { cwd: fixDir } })
await fixCjsDts({ globOptions: { cwd: fixDir } })

const fixFiles = await fs.readdir(fixDir)
for (const file of fixFiles) {
  if (/^.+\.(js|cjs)$/.test(file)) {
    const filePath = path.resolve(fixDir, file)
    const { size: oldSize } = await fs.stat(filePath)

    const code = await fs.readFile(filePath, 'utf-8')
    const result = await minify(code)

    await fs.writeFile(filePath, result.code ?? '')

    const { size: newSize } = await fs.stat(filePath)

    console.log(
      '[minify]',
      path.join(outDir, file),
      formatBytes(oldSize),
      '➡',
      formatBytes(newSize)
    )
  }
}

function formatBytes(bytes) {
  return `${(bytes / 1024).toFixed(2)} KB`
}
