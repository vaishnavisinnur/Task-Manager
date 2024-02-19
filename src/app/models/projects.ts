import { ClientLocation } from "./client-location";

export class Projects
{
    projectID: number | any;
    projectName: string | any;
    dateOfStart: string | any;
    teamSize: number | any;
    active: boolean | any;
    status: string | any;
    clientLocationID: number | any;               //respresents actual value of foreign key
    clientLocation: ClientLocation | any;         // this contains the parent record including clientLocationID and clientLocationName

    constructor()
    {
        this.projectID = null;
        this.projectName = null;
        this.dateOfStart = null;
        this.teamSize = null;
        this.active = true;
        this.status = null;
        this.clientLocationID = null;
        this.clientLocation = new ClientLocation();
    }
}

