import { Injectable } from '@angular/core';
import { HttpClient,HttpBackend } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginViewModel } from './login-view-model';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SignUpViewModel } from './sign-up-view-model';

@Injectable({
  providedIn: 'root'
})
export class LoginService
{
  private httpClient:HttpClient | null = null;
  private baseUrl = 'http://localhost:9090';
  constructor(private httpBackend: HttpBackend, private jwtHelpersService: JwtHelperService)
  {
  }

  currentUserName: any = null;

  public Login(loginViewModel: LoginViewModel): Observable<any>

  {
    this.httpClient = new HttpClient(this.httpBackend);
    return this.httpClient.post<any>(this.baseUrl + "/authenticate", loginViewModel, { responseType: "json", observe: "response" })
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

  
  getUserByEmail(Email: string): Observable<any>
  {
    this.httpClient = new HttpClient(this.httpBackend);
    return this.httpClient.get<any>(this.baseUrl + "/api/getUserByEmail/" + Email, { responseType: "json" });
  }



}
