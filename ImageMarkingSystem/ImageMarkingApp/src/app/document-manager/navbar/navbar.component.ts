import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserProfileService } from 'src/app/user-profile.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  userID : string
  constructor(private userProfileService:UserProfileService, private router:Router) {
    this.userID= userProfileService.userID

   }

  ngOnInit(): void {
  }

  logout()
  {
    this.userProfileService.userID=""
    this.router.navigate(['/'])
  }

}
