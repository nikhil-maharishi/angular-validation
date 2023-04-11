import { Component, OnInit } from '@angular/core';
import { user } from 'src/user';
import { AbstractControl, FormControl } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { ConfigService } from '../config.service';
import { Observable } from 'rxjs';
// import { ConfirmPasswordValidator } from './checkcnfrmpassword';
@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  signInForm :FormGroup = new FormGroup({})
  emailpattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/;
  passwordpattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{1,}$/;

  constructor(private config: ConfigService,private fb: FormBuilder) { }
  ngOnInit() {
    this.signInForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(this.emailpattern)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(this.passwordpattern)]],
      cnfrmpassword: ["", [Validators.required,]],
    },
    {
      validator: this.ConfirmPasswordValidator("password","cnfrmpassword")
    }
   )
  //  this.myObservable.subscribe((value)=>{
  //   console.log(value)
  //  },(error)=>{console.log(error)})
   }

  onSubmit(newUser: any) {
    this.config.postUser(newUser).subscribe((response) => {
      console.warn(response);
      this.signInForm.reset();
    })
   

  }
  get f(){
    return this.signInForm.controls;
  }

   ConfirmPasswordValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      let control = formGroup.controls[controlName];
      let matchingControl = formGroup.controls[matchingControlName]
      if (
        matchingControl.errors &&
        !matchingControl.errors["confirmPasswordValidator"]
      ) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmPasswordValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  // myObservable = new Observable((observer)=>{
  //   setTimeout(()=>{observer.next('1')},1000)
  //   setTimeout(()=>{observer.next('2')},2000)
  //   setTimeout(()=>{observer.next('3')},3000)
  //   setTimeout(()=>{observer.error(new Error ('something went wrong'))},3500)
  //   setTimeout(()=>{observer.next('4')},4000)
  // })
  

}
