import * as moment from 'moment';

export const gtTimeLimit = moment().add(3, 'd').toISOString();

export const requestDateFormat = 'DD-MM-YYYY';
