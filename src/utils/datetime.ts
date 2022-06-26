import { DateTime } from 'luxon';

const convertToDateTime = (dateTime = ''): string => DateTime.fromISO(dateTime).toFormat('DDDD');
export const convertToDateTimeShort = (dateTime = ''): string => DateTime.fromISO(dateTime).toFormat('dd/MM/yyyy');
export default convertToDateTime;
