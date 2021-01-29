import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { SharedDataService } from './services/shared-data.service';

@Injectable()
export class Interceptor implements HttpInterceptor {
    constructor( private sharedDataService: SharedDataService){}
    
    token: string;
    request;

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // OK but not working!
        // this.sharedDataService.userDetails.subscribe(data => {
        //     console.log(data);
        //     this.token = data.token
        //     this.request = req.clone({
        //         headers: req.headers.set("Authorization", "Beare "+ this.token)
        //     })
        // });
        
        // !Ok but working!
        const user = JSON.parse(localStorage.getItem('userData'));
        try {
            this.token = user._token;
        } catch {
            this.token = '';
        }
        console.log('TOKEN --->', this.token);
        this.request = req.clone({
                    headers: req.headers.set("Authorization", "Bearer "+ this.token)
                })
        return next.handle(this.request);
    }

}
