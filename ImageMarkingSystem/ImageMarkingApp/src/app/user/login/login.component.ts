import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserProfileService } from 'src/app/user-profile.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[UserService]
})
export class LoginComponent implements OnInit {

  userFormData = new FormGroup({
    userID:new FormControl('',[Validators.email,Validators.required])
  })

  showLoginErr = false
  constructor(private router:Router, private userService:UserService, private profileServive:UserProfileService) { 
    
  }

  ngOnInit(): void {
  }

  login()
  {
    var UserID = this.userFormData.controls['userID'].value
    this.userService.login(UserID).subscribe(
      (res:any)=> 
      {
        if(res.success== true)
        {
          this.profileServive.userID = UserID
          this.router.navigate(['document-manager/documents'])
        }
        else{
          this.showLoginErr=true
        }
      }, 
      error=>console.log(error)
    )
  }
}
