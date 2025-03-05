import path from 'path';

import { PrismaClient } from '@prisma/client';
import { config } from 'dotenv';

import { readJsonFiles } from './helpers/readJsonFiles.helper';
import { seedFiles } from './helpers/seedFiles.helper';

const prisma = new PrismaClient();
config();

async function seedData() {
  const baseDir = path.join(__dirname, 'seeds');
  const files = await readJsonFiles(baseDir);

  const order = ['Country', 'DocumentType', 'Resolution3100Group', 'Resolution3100Service'];
  await seedFiles(files, order);
}

seedData()
  .catch(error => {
    console.error('Error seeding data:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
