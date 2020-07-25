import fs from 'fs';
import util from 'util';

const testFilePath = `${__dirname}/commands.txt`;
const readFile = util.promisify(fs.readFile);

export const getTestCommands = async (): Promise<string[]> => {
  return processData();
};

const processData = async () => {
  const data = await readFile(testFilePath, 'utf8');
  return data.split('\n');
};
