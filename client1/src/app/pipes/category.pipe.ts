import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'category'
})
export class CategoryPipe implements PipeTransform {

  transform(items: any, args?: any): any {
    if (!args || +args == 0) {
      return items;
    }
    return items.filter(item => item.category == args);
  }
}
