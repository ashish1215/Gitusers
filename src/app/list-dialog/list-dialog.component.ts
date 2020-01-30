import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from '../common.service';
import { Repo } from '../models/repo';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-list-dialog',
  templateUrl: './list-dialog.component.html',
  styleUrls: ['./list-dialog.component.scss']
})
export class ListDialogComponent implements OnInit {
  repoData: Repo[] = []
  subscriptions = new Subscription();

  constructor(public dialogRef: MatDialogRef<ListDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private service: CommonService) { }

  ngOnInit() {

    if (sessionStorage.getItem(this.data.username)) {
      this.repoData = JSON.parse(sessionStorage.getItem(this.data.username))
    } else {
      this.subscriptions.add(this.service.getReposByUser(this.data.username).subscribe((response) => {
        if (response) {
          this.repoData = response
          sessionStorage.setItem(this.data.username, JSON.stringify(response))
        }
      }))
    }
  }


  ngOnDestroy(){
    this.subscriptions.unsubscribe();
  }

}
