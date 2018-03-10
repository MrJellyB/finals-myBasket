import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'smallerThen'
})
export class SmallerThenPipe implements PipeTransform {

  transform(items: any, args?: any): any {
    if (args == undefined || args == "") {
      return items;
    }
    return items.filter(item => item.price <= +args);
  }

}
