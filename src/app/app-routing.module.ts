import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AboutComponent } from './admin/about/about.component';
import { LoginComponent } from './components/login/login.component';
// import { CanActivateGuardService } from './guards/can-activate-guard.service';
import { SignUpComponent } from './components/sign-up/sign-up.component';


const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "login", component: LoginComponent, data: { linkIndex: 2 } },
  { path: "signup", component: SignUpComponent, data: { linkIndex: 3 } },
  { path: "about", component: AboutComponent, data: { linkIndex: 1 } },
  { path: "admin", loadChildren: () => import("./admin/admin.module").then(m => m.AdminModule) },
  { path: "employee", loadChildren: () => import("./employee/employee.module").then(m => m.EmployeeModule) }
];




@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, enableTracing: false, preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule
{
}