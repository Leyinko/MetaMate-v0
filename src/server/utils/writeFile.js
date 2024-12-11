import fs from 'fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'url';

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

const filePath = path.resolve(_dirname, '../mate/mate-answer.json');

export async function writeMetaAnswer(data) {
  try {
    const dir = path.dirname(filePath);
    await fs.mkdir(dir, { recursive: true });

    const jsonString = JSON.stringify(data, null, 2);
    await fs.writeFile(filePath, jsonString);
  } catch (error) {
    console.error('Error saving Mate answer into .json...', error);
  }
}
