import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { CommonService } from '../common.service';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ListDialogComponent } from '../list-dialog/list-dialog.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  users: User[] = [];
  dataSource = [];
  search = new FormControl();
  options = [{ name: 'View Repos', id: '1' }];
  subscriptions = new Subscription();

  constructor(private service: CommonService, public dialog: MatDialog) { }

  ngOnInit() {
    if (sessionStorage.getItem('users')) {
      this.dataSource = JSON.parse(sessionStorage.getItem('users'))
      this.users = this.dataSource
    } else {
      this.subscriptions.add(this.service.getUsers().subscribe((response: User[]) => {
        this.users = response
        this.dataSource = this.users
        sessionStorage.setItem('users', JSON.stringify(response))
      }))
    }

    this.search.valueChanges.subscribe((change) => {
      if (change != '') {
        this.dataSource = this.users.filter((user) => user.login.toLowerCase().match(change.toLowerCase()))
      } else {
        this.dataSource = this.users
      }
    })
  }

  onOptionClick(id, username) {
    if (id === '1') {
      this.openDialog(username)
    }
  }

  openDialog(username) {
    const dialogRef = this.dialog.open(ListDialogComponent, {
      width: '800px',
      height: '600px',
      data: { username: username }
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }


  ngOnDestroy(){
    this.subscriptions.unsubscribe();
  }

}
