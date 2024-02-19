import { Component } from '@angular/core';
import { LoginService } from './services/login.service';
import { DomSanitizer } from '@angular/platform-browser';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { RouterLoggerService } from './router-logger.service';
import { fadeAnimation, slideUpAnimation , zoomUpAnimation, zoomLeftAnimation,slideLeftOrRightAnimation,keyFrameAnimation} from './my-animations';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [keyFrameAnimation ]
})
export class AppComponent {

  constructor(public loginService: LoginService, private domSanitizer: DomSanitizer, private routerLoggerService: RouterLoggerService, private router: Router) {
  }



  ngOnInit() {
    this.loginService.detectIfAlreadyLoggedIn();
    
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        let userName = (this.loginService.currentUserName) ? this.loginService.currentUserName : "anonymous";

        let logMsg = new Date().toLocaleString() + ": " + userName + " navigates to " + event.url;

        this.routerLoggerService.log(logMsg).subscribe();
      }
    });
  }
//  myproperty="<svg>hello</svg>"          *) this is XSS attack  
                                      //   *) when we call this property in our template 
                                        // *) the Angular automatically sanitizes the given value     
    // mypropert=this.domSaitizer.bypassSecurityTrustHtml("http.////.....")
// mypropert=this.dom.........url("give here a google url and bind in template it will rediret to google")

  onSearchClick()
  {
    console.log(this.loginService.currentUserName);
  }


  getState(outlet: RouterOutlet) {
    return outlet.isActivated ?  outlet.activatedRoute.snapshot.url[0].path && outlet.activatedRouteData["linkIndex"] : "none";
  }
  }


