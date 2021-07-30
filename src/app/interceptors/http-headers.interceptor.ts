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
    req = req.clone({
      setHeaders: {
        'x-rapidapi-key': '0c456b89f4msh446650a72b3fee7p11d4e0jsna30d5186ad0f',
        'x-rapidapi-host': 'rawg-video-games-database.p.rapidapi.com',
      },
      setParams: {
        key: '82e649ed826e4b678b7ba350d25b6ff8',
      },
    });

    return next.handle(req);
  }
}
