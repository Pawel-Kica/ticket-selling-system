import * as moment from 'moment';

export const gtBookTimeLimit = moment().add(3, 'd').toDate();
export const gtBuyTimeLimit = moment().toISOString();

export const requestDateFormat = 'DD-MM-YYYY';
