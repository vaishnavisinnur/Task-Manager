import { Injectable } from '@angular/core';
import { HttpClient,HttpBackend } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginViewModel } from '../models/login-view-model';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SignUpViewModel } from '../models/sign-up-view-model';

@Injectable({
  providedIn: 'root'
})
export class LoginService
{
  [x: string]: any;
  private httpClient:HttpClient | null = null;
  private baseUrl = 'http://localhost:9090';
  userRole: any;
  constructor(private httpBackend: HttpBackend, private jwtHelpersService: JwtHelperService)
  {
    
  }
 

  currentUserName: any = null;
  currentUserRole : any= null;


  public Login(loginViewModel: LoginViewModel): Observable<any>

  
  {
    this.httpClient = new HttpClient(this.httpBackend);
    return this.httpClient.post<any>(this.baseUrl + "/authenticate", loginViewModel, { responseType: "json", observe: "response" })
      .pipe(map(response =>
      {
        if (response)
        {
          this.currentUserName = response.body.userName;
          this.currentUserRole = response.body.role;
          sessionStorage['currentUser'] = JSON.stringify(response.body);
          sessionStorage['XSRFRequestToken'] = response.headers.get("XSRF-REQUEST-TOKEN");
        }
        return response.body;
      }));
  }




  public Register(signUpViewModel: SignUpViewModel): Observable<any>
  {
    this.httpClient = new HttpClient(this.httpBackend);
    return this.httpClient.post<any>(this.baseUrl + "/register", signUpViewModel, { responseType: "json", observe: "response" })
      .pipe(map(response =>
      {
        if (response)
        {
          this.currentUserName = response.body.userName;
          sessionStorage['currentUser'] = JSON.stringify(response.body);
          sessionStorage['XSRFRequestToken'] = response.headers.get("XSRF-REQUEST-TOKEN");
        }
        return response.body;
      }));
  }
 // {
  //   this.httpClient=new HttpClient(this.httpBackend)
  //   const url = `${this.baseUrl}/authenticate`;
  //   return this.httpClient.post<any>(url , loginViewModel, { responseType: "json" })
  //     .pipe(map((loginResponse: LoginViewModel) =>
  //     {
  //       if (loginResponse && loginResponse.UserName)
  //       {
  //         this.currentUserName = loginResponse.UserName;
  //         sessionStorage['currentUser']=JSON.stringify(loginResponse)
  //       }
  //       return loginResponse;
  //     }));
  // }

  public Logout()
  {
    sessionStorage.removeItem("currentUser");
    this.currentUserName = null;
  }
  public isauthenticated():boolean
  {
    console.log('Checking authentication status.');
    var token = sessionStorage.getItem("currentUser") ? JSON.parse(sessionStorage.getItem("currentUser") as any).token : null;
    if (this.jwtHelpersService.isTokenExpired(token))
    {
      return false; //token is not valid
    }
    else
    {
      return true; //token is valid
    }
  }

  public detectIfAlreadyLoggedIn()
  {
    if (this.jwtHelpersService.isTokenExpired() == false)
    {
      var currentUser = JSON.parse(sessionStorage['currentUser']);
      this.currentUserName = currentUser.userName;
      this.currentUserRole = currentUser.role;
    }
  }

  
  getUserByEmail(Email: string): Observable<any>
  {
    this.httpClient = new HttpClient(this.httpBackend);
    return this.httpClient.get<any>(this.baseUrl + "/api/getUserByEmail/" + Email, { responseType: "json" });
  }

   public getAllEmployes(): Observable<any>
  {
    this.httpClient = new HttpClient(this.httpBackend);
    return this.httpClient.get<any>("http://localhost:9090/api/getallemployees", { responseType: "json" });
  }



}
function ngOnInit() {
  throw new Error('Function not implemented.');
}

