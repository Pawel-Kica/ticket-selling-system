import { ConsoleLogger } from '@nestjs/common';

const logger = new ConsoleLogger();

export const logInfo = (mess: string, context = '') => {
  if (process.env.NODE_ENV !== 'test' || process.env.FORCE_LOG === 'true') {
    logger.log(mess, context);
  }
};

export const logError = (mess: string, context = '') => {
  logger.error(mess, context);
};
