import mongoose from 'mongoose';

import { app } from './';
import { logEvents } from './utils';

const PORT = process.env.PORT ?? 3500;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

mongoose.connection.once('open', () => {
  console.log('Connect to MongoDB 🍃');
});

mongoose.connection.on('error', (error) => {
  logEvents(
    `${error.name}: ${error.message}\t ${error.code ?? 500}`,
    'mongoErrorLog.log'
  );
});
