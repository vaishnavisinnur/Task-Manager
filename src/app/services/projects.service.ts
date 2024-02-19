import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, Observer, pipe } from 'rxjs';
import { Projects } from '../models/projects';
import{map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProjectsService
{
  urlPrefix: string = "http://localhost:9090"; //make this as empty ("") if you are using asp.net core [without CORS]
  MySubject: any;

// hideDetails: boolean = false;                                     hideshow functionality using services

  constructor(private httpClient: HttpClient)
  {
  }
  

// here we are making AJAX request

  getAllProjects(): Observable<Projects[]>
  

    {
      // var currentUser = { token: "" };
      // var headers = new HttpHeaders();
      // headers = headers.set("Authorization", "Bearer ");
      // if (sessionStorage['currentUser'] != null)
      // {
      //   currentUser = JSON.parse(sessionStorage['currentUser']);
      //   headers = headers.set("Authorization", "Bearer " + currentUser.token);
      // }
      debugger;
      return this.httpClient.get<Projects[]>(this.urlPrefix + "/api/projects", { responseType: "json" })   //add hearder:Heardwers if u write above code 
        .pipe(map(
          (data: Projects[]) =>
          {
            for (let i = 0; i < data.length; i++)
            {
              data[i].teamSize = data[i].teamSize * 100;
            }
            return data;
          }
        ));
    }

   
  getProjectByProjectID(ProjectID: number): Observable<Projects>
  {
    return this.httpClient.get<Projects>(this.urlPrefix + "/api/projects/searchbyprojectid/" + ProjectID, { responseType: "json" });
  }

  insertProject(newProject:Projects) : Observable<Projects>
  {
    var requestHeaders = new HttpHeaders();
    requestHeaders = requestHeaders.set("X-XSRF-TOKEN", sessionStorage['XSRFRequestToken']);
  
    return this.httpClient.post<Projects>(this.urlPrefix + "/api/projects", newProject, { responseType: "json" });
  }
  
  updateProject(existingProject:Projects) : Observable<Projects>
  {
    
    return this.httpClient.put<Projects>(this.urlPrefix + "/api/projects", existingProject,{responseType:"json"})
  }


  deleteProject(projectID:number) : Observable<string>
  {
   
    return this.httpClient.delete<string>(this.urlPrefix + "/api/projects?projectId=" + projectID);
  }


  SearchProjects (searchBy: string, searchText: string): Observable<Projects[]>
  {
    return this.httpClient.get<Projects[]>(
      this.urlPrefix + '/api/projects/search/' + searchBy + '/' + searchText,
      { responseType: 'json' }
    );
  }

  // toggleDetails()                                                      hideshow functionality using services 
  // {                                                                     hideshow functionality using custom RxJS
  //   this.hideDetails = !this.hideDetails;
  // }
}


function toggleDetails() {
  throw new Error('Function not implemented.');
}













                                                    // hideshow functionality using services


// public MyObservable: Observable<boolean>;
// private MyObservers: Observer<boolean>[] = [];
// hideDetails:  boolean = false ;


// // hideDetails: boolean = false;                                   

// constructor(private httpClient: HttpClient)
// {
//   this.MyObservable = Observable.create((observer: Observer<boolean>) => {
//     this.MyObservers.push(observer);
//   });


//   toggleDetails()
//   {
//     this.hideDetails = !this.hideDetails;
//     for (let i = 0; i < this.MyObservers.length ; i++)
//     {
//       this.MyObservers[i].next(this.hideDetails);
//     }
//   }
// }

                                                      // hideshow functionality using RxJS subject



  // public MySubject: Subject<boolean>;

  // constructor(private httpClient: HttpClient)
  // {
  //   this.MySubject = new Subject<boolean>();
  // }

  // hideDetails: boolean = false;

  // toggleDetails()
  // {
  //   this.hideDetails = !this.hideDetails;
  //   this.MySubject.next(this.hideDetails);
  // }
                                 
                                                 //   hideshow functionality using RxJS BehaviorSubject            

  // public MySubject: BehaviorSubject<boolean>;

  // constructor(private httpClient: HttpClient)
  // {
  //   this.MySubject = new BehaviorSubject<boolean>(false);
  // }

  // toggleDetails()
  // {
  //   this.MySubject.next(!this.MySubject.value);
  // }
