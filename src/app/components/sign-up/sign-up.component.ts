import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Country } from '../../models/country';
import { CustomValidatorsService } from '../../services/custom-validators.service';
import { SignUpViewModel } from '../../models/sign-up-view-model';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit
{
  signUpForm: FormGroup | any = null;
  genders = ["male", "female"];
  countries: Country[] = [];
  registerError: string | null = null;

  constructor(private countryService: CountriesService, private formBuilder: FormBuilder, private customValidatorsService: CustomValidatorsService, private loginService: LoginService, private router: Router)
  {
  }

  ngOnInit()
  {
    this.countryService.getCountries().subscribe((response: Country[]) =>
    {
      this.countries = response;
    });

    this.signUpForm = this.formBuilder.group({
      personName: this.formBuilder.group({
        firstName: [null, [Validators.required, Validators.minLength(2)]],
        lastName: [null, [Validators.required, Validators.minLength(2)]],
      }),

      email: [null, [Validators.required, Validators.email], [this.customValidatorsService.DuplicateEmailValidator()], { updateOn: 'blur' }],
      mobile: [null, [Validators.required, Validators.pattern(/^[789]\d{9}$/)]],
      dateOfBirth: [null, [Validators.required, this.customValidatorsService.minimumAgeValidator(18)]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
      gender: [null, [Validators.required]],
      countryID: [null, [Validators.required]],
      receiveNewsLetters: [null],
      skills: this.formBuilder.array([])
    },
      {
        validators: [
          this.customValidatorsService.compareValidator("confirmPassword", "password")
        ]
      });

    this.signUpForm.valueChanges.subscribe((value: any) =>
    {
      //console.log(value);
    });
  }

  onSubmitClick() {
    //Display current form value
    this.signUpForm["submitted"] = true;
    console.log(this.signUpForm);

    if (this.signUpForm.valid) {
      var signUpVieModel = this.signUpForm.value as SignUpViewModel;
      this.loginService.Register(signUpVieModel).subscribe(
        (response) => {
          this.router.navigate(["/employee", "tasks"]);
        },
        (error) => {
          console.log(error);
          this.registerError = "Unable to submit";
        });
    }
  // onSubmitClick()
  // {
  //   //Display current form value
  //   this.signUpForm["submitted"] = true;
  //   console.log(this.signUpForm);

  //   if (this.signUpForm.valid)
  //   {
  //     var signUpVieModel = this.signUpForm.value as SignUpViewModel;
  //     this.loginService.Register(signUpVieModel).subscribe(
  //       (response) =>
  //       {
  //         this.router.navigate(["tasks"]);   
  //          },
  //       (error) =>
  //       {
  //         console.log(error);
  //         this.registerError = "Unable to submit";
  //       });
  //   }

    //setValue
    // this.signUpForm.setValue({
    //   firstName: "Adam",
    //   lastName: "Smith",
    //   email: "smith@gmail.com",
    //   mobile: "9876543210",
    //   dateOfBirth: "2020-01-01",
    //   gender: "male",
    //   countryID: 3,
    //   receiveNewsLetters: true
    // });

    //patchValue
    // this.signUpForm.patchValue({
    //   firstName: "Adam",
    //   lastName: "Smith",
    //   email: "smith@gmail.com"
    // });

    //reset
    //this.signUpForm.reset();

    //reset with Parameters
    // this.signUpForm.reset({
    //   firstName: "Adam",
    //   lastName: "Smith",
    //   email: "smith@gmail.com"
    // });
  }

  onAddSkill()
  {
    var formGroup = new FormGroup({
      skillName: new FormControl(null, [Validators.required]),
      skillLevel: new FormControl(null, [Validators.required])
    });

    (<FormArray>this.signUpForm.get("skills")).push(formGroup);
  }

  onRemoveClick(index: number)
  {
    (<FormArray>this.signUpForm.get("skills")).removeAt(index);
  }
}