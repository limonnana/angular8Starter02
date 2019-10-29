import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { User } from '../../entities/user';
import {Router} from "@angular/router";

@Component({
  selector: 'anms-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserComponent implements OnInit {

  userList: User[];
  private _open: boolean = false;
  private id: string;
  private message: string;

  constructor(private userService: UserService, private router: Router ) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(data => {
      this.userList = data;
    });
  }

  editUser(user: User): void {
    localStorage.removeItem("editUserId");
    localStorage.setItem("editUserId", user.id.toString());
    this.router.navigate(['editUser']);
  };

  deleteUser(id: string): void{
    console.log('deleteUser: ' + id);
    // this._open = true;
    this.id = id;
    this.openChange(true);
  }

  get open() {
    return this._open
  }
  
  set open(value: boolean) {
    this._open = value;
    if (!value) {
      // Put your cleanup code here
      console.log("Cleaning up " + value);
    }
  }
  
  cancelDelete(){
    console.log('cancelDelete');
    this._open = false;
  }
  
  openChange(value: boolean) {
    if (value) {
       this.open = true;
    } else {
      this.open = false;
    }
  }

  yesDelete(){
    console.log('user.id: ' + this.id);
    this.open = false;
    this.userService.delete(this.id).subscribe(data => {
      console.log('Data: ' + data.message);
      if(data.message === 200){
        this.deleteFromTable(this.id);             //filter(u => +(u.id) !== this.id);
      }
    });
  }

  deleteFromTable(id: string){
    for(let i = 0; i < this.userList.length; ++i){
     
      let idString = ""+this.userList[i].id;
      let idS = ""+id;
      if (idString === idS) {
          this.userList.splice(i,1);
      }
  }
  }

 


}
