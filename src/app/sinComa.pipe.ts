// Pipe para darle formato a los numeros de cuenta, para que tenga 4 de digitos y no incluya coma

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'sinComa' })
export class PipeSinComa implements PipeTransform {
  transform(value: number): string {
    let str = value.toFixed(0);
    while (str.length < 4) {
      str = '0' + str;
    }
    return str;
  }
}