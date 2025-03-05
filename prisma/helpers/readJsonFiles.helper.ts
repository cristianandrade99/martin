import fs from 'fs/promises'
import path from 'path'

export async function readJsonFiles(directory: string): Promise<Map<string, any[]>> {
  const files = new Map<string, any[]>()

  try {
    const dirContent = await fs.readdir(directory)

    for await (const file of dirContent) {
      if (path.extname(file) === '.json') {
        const modelName = path.basename(file, '.json')
        const content = await fs.readFile(path.join(directory, file), 'utf-8')
        const data = JSON.parse(content)

        if (!Array.isArray(data)) {
          console.log(`Warning: ${file} does not contain an array of records, skipping`)
          continue
        }

        files.set(modelName, data)
      }
    }
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
      throw new Error('ErrNoException')
    }

    console.log(`Directory ${directory} not found, skipping`)
  }

  return files
}
