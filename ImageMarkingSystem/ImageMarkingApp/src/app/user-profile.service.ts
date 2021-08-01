import { Injectable } from '@angular/core';

@Injectable({providedIn:"root"})

export class UserProfileService {

  private _userId: string 

  constructor() { 
    this._userId = ""
  }

    get userID(): string {
        return this._userId;
    }
    set userID(value: string) {
        this._userId = value;
    }
}
