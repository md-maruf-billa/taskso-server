import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import configs from './app/configs';


let server: Server;

async function main() {
  try {
    await mongoose.connect(configs.database_url as string);

    server = app.listen(configs.port, () => {
      console.log(`app is listening on port ${configs.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();

process.on('unhandledRejection', () => {
  console.log(`😈 Unhandled Rejection is detected , shutting down ...`);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on('uncaughtException', () => {
  console.log(`😈 uncaughtException is detected , shutting down ...`);
  process.exit(1);
});