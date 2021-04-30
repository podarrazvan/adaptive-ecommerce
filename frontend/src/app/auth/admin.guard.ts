import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Promise<boolean | UrlTree>
    | Observable<boolean | UrlTree> {
    // TODO
    return true; // DELETE THIS
    // //! NOT OK BUT WORKING
    // AND USE THIS:
    // const user = JSON.parse(localStorage.getItem('userData'));
    // if (user === null) {
    //   return this.router.createUrlTree(['/auth']);
    // } else {
    //   if (user._token === undefined) {
    //     return this.router.createUrlTree(['/auth']);
    //   } else {
    //     const isAdmin = user.isAdmin;
    //     return isAdmin != undefined
    //       ? true
    //       : this.router.createUrlTree(['/auth']);
    //   }
    // }
    // !
    // TODO
    // ! OK BUT NOT WORKING
    // return this.authService.user$.pipe(
    //   take(1),
    //   map((user$) => {
    //     if (user$) {
    //       if (user$.isAdmin) {
    //         return true;
    //       }
    //     }
    //     return this.router.createUrlTree(['/auth']);
    //   })
    // );
    // !
  }
}
