import { DateTime } from 'luxon';

const convertToDateTime = (dateTime = ''): string => DateTime.fromISO(dateTime).toFormat('DDDD');
export default convertToDateTime;
