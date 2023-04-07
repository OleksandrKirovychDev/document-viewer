import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dynamicFilter',
  pure: false,
  standalone: true,
})
export class DynamicFilterPipe implements PipeTransform {
  transform(items: any[], filter: any): any[] {
    if (!items || !filter) {
      return items;
    }

    const type = typeof filter;
    if (type === 'function') {
      return items.filter(filter);
    } else {
      return items.filter((item) => this.compare(item, filter));
    }
  }

  compare(item: any, filter: any) {
    for (const prop in filter) {
      if (filter[prop] !== item[prop]) {
        return false;
      }
    }
    return true;
  }
}
