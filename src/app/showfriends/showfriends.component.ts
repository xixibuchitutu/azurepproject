import { Component, OnInit } from '@angular/core';
import {DialogService} from "primeng/dynamicdialog";
import {ActivatedRoute, Router} from "@angular/router";
import { FoodService } from '../service/food.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ReviewService } from '../service/review.service';
import { UserService } from '../service/user.service';
@Component({
  selector: 'app-showfriends',
  templateUrl: './showfriends.component.html',
  styleUrls: ['./showfriends.component.css']
})
export class ShowfriendsComponent implements OnInit {
  list:any
  addform: any={
    username:'',
  };
  constructor(public dialogService: DialogService, private foodService : FoodService, private activatedRoute : ActivatedRoute, private confirmationService : ConfirmationService, private reviewService: ReviewService,private message:MessageService,private userservice:UserService) { }

  ngOnInit(): void {
    this.showfriends()
  }
  deletefriends(){
    
  }
  showfriends(){
this.addform.username = this.activatedRoute.snapshot.queryParams['userName']     
this.userservice.showfriends(this.addform).subscribe(res=>{
      console.log(res);
      this.list= res
    }
    )
  }
}
