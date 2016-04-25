import {Pipe, PipeTransform} from 'angular2/core';

@Pipe({ name: 'money' })
export class MoneyPipe implements PipeTransform {
  transform(value: string): string {
    let money: any = parseInt(value).toFixed(2); //got something like this "22.20" string
    money = money.split('.');
    money[0] = toRussianLocale(money[0]); //localizing integer part of money string;
    return money.join(',');
  }
}

function toRussianLocale(integer) {
  integer = integer.toString();
  var unitsByThree = []; //like ["1","222","333","444","555"]
  var unitSize = 3;
  for (var i = 0; i > -integer.length; i = i - unitSize) {
    var unit = i === 0 ? integer.slice(-unitSize) : integer.slice(i - unitSize, i);
    unitsByThree.splice(0, 0, unit); //add to begin of array
  }
  return unitsByThree.join(' '); //to string like "1 222 333 444 555"
}
