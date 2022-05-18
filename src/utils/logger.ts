import { ConsoleLogger } from '@nestjs/common';

const main = (function () {
  let logger = null;
  return {
    getLogger: () => {
      if (!logger) logger = new ConsoleLogger();
      return logger;
    },
  };
})();

const logger = main.getLogger();

export const logInfo = (mess: string, context = '') => {
  if (process.env.NODE_ENV !== 'test' || process.env.FORCE_LOG === 'true') {
    logger.log(mess, context);
  }
};

export const logError = (mess: string, context = '') => {
  logger.error(mess, context);
};
