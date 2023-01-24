import path from 'node:path';
import fs from 'node:fs';
import fsPromises from 'node:fs/promises';
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';

async function logEvents(message: string, fileName: string) {
  const dateTime = format(new Date(), 'yyyyMMdd\tHH:mm:ss');
  const logMessage = `${dateTime}\t${uuidv4()}\t${message}\n`;

  const logsFolderPath = path.resolve(__dirname, '..', 'logs');
  const logFileName = fileName.endsWith('.log') ? fileName : `${fileName}.log`;

  try {
    if (!fs.existsSync(logsFolderPath)) {
      await fsPromises.mkdir(logsFolderPath);
    }

    await fsPromises.appendFile(
      path.resolve(logsFolderPath, logFileName),
      logMessage
    );
  } catch (error) {
    console.log(error);
  }
}

export { logEvents };
