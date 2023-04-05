import 'reflect-metadata';

// import { createConnections } from 'typeorm';

// import '../../container';
// import server from './server';

// createConnections();

// const port = process.env.PORT || 3333;
// server.listen(port, () => {
//   console.log(`🚀server online on port ${port}`);
// });

import server from './server';

// server.use('/files', express.static(uploadConfig.uploadsPath));

const port = process.env.PORT || 3333;
server.listen(port, () => {
  console.log(`🚀server online on port ${port}`);
});
