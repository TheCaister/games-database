import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class HttpHeadersInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Setting headers and parameters of the request
    // Modifying the clone since requests and responses are readonly
    req = req.clone({
      setHeaders: {
        'x-rapidapi-key': '',
        'x-rapidapi-host': 'rawg-video-games-database.p.rapidapi.com',
      },
      setParams: {
        key: '82e649ed826e4b678b7ba350d25b6ff8',
      },
    });

    return next.handle(req);
  }
}
