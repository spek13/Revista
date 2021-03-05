import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, args: any): any {
    const result = [];
    for (const magazine of value) {
      if (magazine.name.toLowerCase().indexOf(args.toLowerCase()) > -1 || magazine.create_username.toLowerCase().indexOf(args.toLowerCase()) > -1){
        result.push(magazine)
      }
    }
    return result;
  }

}
