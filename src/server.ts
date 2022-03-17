import { app, App } from '@/app';

enum ExitCodes {
  Failure = 1,
  Success = 0,
}

process.on('unhandledRejection', (reason, promise) => {
  console.error(`Server exiting due to an unhandled promise rejection: ${promise} and reason ${reason}`);
  throw reason;
});

process.on('uncaughtException', (error) => {
  console.error('Server exiting due to uncaught exception', error);
  process.exit(ExitCodes.Failure);
});

async function initServer(): Promise<void> {
  const PORT = +process.env.PORT || 3000;
  try {
    await app.init();
    app.listen(PORT, () => {
      console.info(`Listening on port ${PORT}`);
    });
    handleExit(app);
  } catch (err) {
    console.error('Server exited with error', err);
    process.exit(ExitCodes.Failure);
  }
}

function handleExit(app: App) {
  const exitSignals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM', 'SIGQUIT'];

  exitSignals.forEach((sig) => {
    process.on(sig, async () => {
      try {
        await app.close();
        console.info('Server exited successfully');
        process.exit(ExitCodes.Success);
      } catch (err) {
        console.error('Server exited with error', err);
        process.exit(ExitCodes.Failure);
      }
    });
  });
}

initServer();
