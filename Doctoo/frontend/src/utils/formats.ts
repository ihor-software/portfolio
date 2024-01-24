import { Address } from 'src/types/address.types';

export function formatCardNumber(cardNumber: string): string {
  return `**** **** **** ${cardNumber.slice(-4)}`;
}

export function formatAddress({
  country: { name },
  city,
  street,
  appartment,
  zip_code,
}: Address): string {
  return `${name}, ${city}, ${street}${appartment ? `, apt. ${appartment}` : ''}, ${zip_code}`;
}

export function formatDate(date: Date): string {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const month = months[date.getMonth()];
  const day = date.getDate();
  return `${month} ${day}`;
}

export function formatTime(time: Date): string {
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const period = hours >= 12 ? 'pm' : 'am';
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${formattedHours}:${formattedMinutes} ${period}`;
}

export function expDateToTimeStamp(date: string) {
  const [month, year] = date.split('/');
  return new Date(Number('20' + year), Number(month)).getTime();
}

export function formatExpDate(date: number) {
  const expDate = new Date(date);
  const year = expDate.getFullYear().toString().slice(-2);
  const month = (expDate.getMonth() + 1).toString().padStart(2, '0');
  return `${year}/${month}`;
}
