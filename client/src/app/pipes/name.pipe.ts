import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'name'
})
export class NamePipe implements PipeTransform {
  
  transform(items: any, args?: any): any {
    if (args == "") {
      return items;
    }
    return items.filter(item => item.name == args);
  }

}
