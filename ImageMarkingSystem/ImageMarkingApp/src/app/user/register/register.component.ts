import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  selectedFile = null
  userFormData = new FormGroup({
    name: new FormControl('',Validators.required),
    userID:new FormControl('',[Validators.email,Validators.required])
  })
  showRegisterErr: boolean= false
  
  constructor(private router:Router, private userService:UserService) {

   }

  ngOnInit(): void {
  }

  register()
  {
    var UserName = this.userFormData.controls['name'].value
    var UserID = this.userFormData.controls['userID'].value
    var user = {UserName, UserID}
    this.userService.register(user).subscribe(
      (res:any)=> 
      {
        if(res.success== true)
        {
          this.router.navigate(['/'])
        }
        else{
          this.showRegisterErr= true
        }
      }, 
      error=>console.log(error)
    )
  }

  onFileSelected(event:any)
  {
    this.selectedFile = event.target.files[0]
  }

  onUpload()
  {

  }

}
