import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent
{
  constructor(public loginService: LoginService, private domSaitizer:DomSanitizer)
  {
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
}