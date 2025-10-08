import * as fs from 'fs';

export const clearAndCreateDirectory = (dirPath: string): void => {
  // Clear folder if it exists
  if (fs.existsSync(dirPath)) {
    fs.rmSync(dirPath, { recursive: true, force: true });
  }

  // Create the folder
  fs.mkdirSync(dirPath, { recursive: true });
};

export const saveJsonFile = (filePath: string, data: any): void => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  console.log(`Data saved to ${filePath}`);
};
