
import sharp from 'sharp'
import fs from 'node:fs'
import path from 'node:path'

const folder = path.join(
  process.cwd(),
  'public/images/products'
)

async function convertImages() {
  if (!fs.existsSync(folder)) {
    throw new Error(`Folder not found: ${folder}`)
  }

  const files = fs.readdirSync(folder)

  for (const file of files) {
    if (!/\.(jpg|jpeg|png)$/i.test(file)) continue

    const input = path.join(folder, file)
    const output = path.join(
      folder,
      path.parse(file).name + '.webp'
    )

    await sharp(input)
      .webp({ quality: 85, effort: 6 })
      .toFile(output)

    console.log(`Converted: ${file} -> ${path.basename(output)}`)
  }

  console.log('All images converted successfully!')
}

convertImages().catch(console.error)
