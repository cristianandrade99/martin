/* eslint-disable @typescript-eslint/no-unsafe-call */
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const findPotentialUniqueFields = (records: any[]): string[] => {
  if (!records.length) return []

  const sample = records[0]
  // eslint-disable-next-line
  const fields = Object.keys(sample)

  return fields.filter((field) => {
    // Check if field values are unique across records
    const values = new Set(
      // eslint-disable-next-line
      records.map((r) => (typeof r[field] === 'object' ? JSON.stringify(r[field]) : r[field])),
    )
    return values.size === records.length
  })
}

const getCompositeKey = (
  record: Record<string, Record<string, any> | string>,
  fields: string[],
): string =>
  fields
    .map((field) => {
      const value = record[field]
      return typeof value === 'object' ? JSON.stringify(value) : value
    })
    .join('|')

export const seedFiles = async (files: Map<string, any>, order: string[] = []) => {
  const sortedKeys = [...files.keys()].sort((a, b) => {
    const idxA = order.indexOf(a)
    const idxB = order.indexOf(b)

    const xa = idxA === -1 ? -Infinity : idxA
    const xb = idxB === -1 ? -Infinity : idxB

    return xa - xb
  })

  const orderedMap = new Map()
  for (const key of sortedKeys) {
    orderedMap.set(key, files.get(key))
  }

  for await (const [model, data] of orderedMap) {
    console.log(`Processing ${model}...`)

    if (!prisma[model]) {
      console.log(`Model ${model} not found in Prisma schema, skipping`)
      continue
    }

    try {
      // @ts-expect-error prisma dynamic models
      const existingRecords = await prisma[model].findMany()

      // Find potential unique identifiers
      const allRecords = [...existingRecords, ...data]
      const uniqueFields = findPotentialUniqueFields(allRecords)

      // eslint-disable-next-line
      const fieldsForKey = uniqueFields.length ? uniqueFields : Object.keys(data[0] || {})

      // eslint-disable-next-line
      const existingKeys = new Set(existingRecords.map((r) => getCompositeKey(r, fieldsForKey)))
      // eslint-disable-next-line
      const newRecords = data.filter((r) => !existingKeys.has(getCompositeKey(r, fieldsForKey)))

      if (newRecords.length === 0) {
        console.log(`No new records to insert into ${model}`)

        // @ts-expect-error prisma dynamic models
        const total = await prisma[model].count()
        console.log(`Total records in ${model}: ${total}`)

        continue
      }

      for await (const record of newRecords) {
        try {
          // @ts-expect-error prisma dynamic models
          await prisma[model].create({
            data: record,
          })
        } catch (e) {
          if (e.code === 'P2002') {
            // Unique constraint violation
            continue
          }

          console.log(record)
          throw new Error(`Error creating record in ${model}: ${e.message}`)
        }
      }

      // @ts-expect-error prisma dynamic models
      const count = await prisma[model].count()
      console.log(`Total records in ${model}: ${count}`)
    } catch (error) {
      console.error(`Error inserting records into ${model}:`, error)
    }
  }
}
