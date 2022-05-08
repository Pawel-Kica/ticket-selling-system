import * as dayjs from 'dayjs';
import { ConsoleLogger } from '@nestjs/common';

const singleton = (function () {
  let logger = null;
  return {
    getLogger: () => {
      if (!logger) logger = new ConsoleLogger();
      return logger;
    },
  };
})();

const logger = singleton.getLogger();

export const logInfo = (mess: string, context = '') => {
  if (process.env.NODE_ENV !== 'test' || process.env.FORCE_LOG === 'true') {
    logger.log(mess, context);
  }
};

export const logError = (mess: string, context = '') => {
  logger.error(mess, context);
};
