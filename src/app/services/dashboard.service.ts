import { Injectable } from '@angular/core';

@Injectable()
export class DashboardService {

  getTeamMembersSummary(): any[] {

    var TeamMembersSummary = [
      {Region:"East" , TeamMembersCount:40 , TemporarilyUnavailableMembers:2  },
      {Region:"South" , TeamMembersCount:30 , TemporarilyUnavailableMembers:4  },
      {Region:"West" , TeamMembersCount:20 , TemporarilyUnavailableMembers:6 },
      {Region:"North" , TeamMembersCount:60 , TemporarilyUnavailableMembers:7  }
     ]
     return TeamMembersSummary;
  }


  getTeamMembers(){
     
    var TeamMembers = [
      [
        { Region:"East", Members:[
         {ID:1, Name:"Vaishnavi",Status:"Available"},
         {ID:2, Name:"Archi",Status:"Busy"},
         {ID:3, Name:"Rajath",Status:"Busy"},
         {ID:4, Name:"Sonu",Status:"Available"}
        ]},
        { Region:"West", Members:[
         {ID:1, Name:"Vaishnavi",Status:"Available"},
         {ID:2, Name:"Archi",Status:"Busy"},
         {ID:3, Name:"Rajath",Status:"Busy"},
         {ID:4, Name:"Sonu",Status:"Available"}
        ]},
        { Region:"North", Members:[
         {ID:1, Name:"Vaishnavi",Status:"Available"},
         {ID:2, Name:"Archi",Status:"Busy"},
         {ID:3, Name:"Rajath",Status:"Busy"},
         {ID:4, Name:"Sonu",Status:"Available"}
        ]},
        { Region:"South", Members:[
         {ID:1, Name:"Vaishnavi",Status:"Available"},
         {ID:2, Name:"Archi",Status:"Busy"},
         {ID:3, Name:"Rajath",Status:"Busy"},
         {ID:4, Name:"Sonu",Status:"Available"}
        ]}
        ]
    ]
    return TeamMembers;
  }
  
  
}
