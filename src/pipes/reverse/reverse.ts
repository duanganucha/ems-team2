import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the ReversePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'reverse',
})
export class ReversePipe implements PipeTransform {
  transform(value: any, args?: any): any {
   
    if (!value) return;

    return value.reverse();
  }
}
