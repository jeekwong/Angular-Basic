import { Pipe, PipeTransform } from '@angular/core';
import { HttpClient }          from '@angular/common/http';

@Pipe({
  name: 'fetch',
  pure: false
})
export class FetchJsonPipe implements PipeTransform {

  private cachedData: any = null;
  private cacheUrl = '';

  constructor(private http: HttpClient) {}

  transform(url: string): any {
    if(url !== this.cacheUrl) {
      this.cachedData = null;
      this.cacheUrl = url;
      this.http.get(url).subscribe(result => this.cachedData = result);
    }
    return this.cachedData;
  }

}
