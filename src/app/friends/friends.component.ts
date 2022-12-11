import { Component, OnInit } from '@angular/core';
import {DialogService} from "primeng/dynamicdialog";
import {ActivatedRoute, Router} from "@angular/router";
import { FoodService } from '../service/food.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ReviewService } from '../service/review.service';
import { UserService } from '../service/user.service';
import {TreeNode} from 'primeng/api';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
  list:any=[]
  cols: any=[];
  filepathinformation:any

  addform: any={
    username:'',
    friendsname:'',
    filePath:'',
  };

  userinformation:any={
    username:''
  }
  constructor(public dialogService: DialogService, private foodService : FoodService, private activatedRoute : ActivatedRoute, private confirmationService : ConfirmationService, private reviewService: ReviewService,private message:MessageService,private userservice:UserService) { }

  ngOnInit(): void {
    console.log(this.activatedRoute.snapshot.queryParams['userName'])
    this.getalluser()
    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'Email', header: 'Email' },
  ];
  
  }
  getalluser(){
    this.userservice.getUserInfo().subscribe(res => {
      console.log(res)
      this.list=res.Documents
      console.log(this.list)

})
  }

  addfriends(data:any){
    this.addform.friendsname=data;
    this.userinformation.username = data;
    this.userservice.getuserdetail(this.userinformation).subscribe({
      next:(res)=>{
        this.filepathinformation = res[0].filePath
        this.addform.filePath  = this.filepathinformation
        this.addform.username = this.activatedRoute.snapshot.queryParams['userName'];
        this.userservice.addfriends(this.addform).subscribe(res=>{
          this.message.add({severity: 'success', summary: 'add',detail:"success" });
        })
      }

    })
   
  }
}
