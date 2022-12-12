import { Component, OnInit } from '@angular/core';
import {DialogService} from "primeng/dynamicdialog";
import {AddComponent} from "./add/add.component";
import {FoodService} from "../../service/food.service";
import {Food} from "../../types";
import {ActivatedRoute, Router} from "@angular/router";
import { SelectItemGroup } from 'primeng/api/selectitemgroup';
import { UserService } from 'src/app/service/user.service';
import {ConfirmationService, MessageService} from "primeng/api";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  list: any;
  total :any;
  userName:any;
  userinformationdetail:any
  selectedCountries: any | undefined;
  countries: any;
  groupedCities: SelectItemGroup[] | undefined;
  userinformation : any={
    username:this.activatedRoute.snapshot.queryParams['userName']
  }
  videolist:any []=[]
  friendlist:any;
  admin:any =false
  videolistadmin:any
  filestypes:Boolean = false
  listimage:[]=[]

  judge:Boolean =false
  constructor(public dialogService: DialogService, private  foodService: FoodService, private router: Router,private activatedRoute : ActivatedRoute,private userservice:UserService,private confirmationService : ConfirmationService,private message:MessageService) { 
    
  }

  ngOnInit(): void {
    this.usernamedetail();
   this.showfriend()
   this.showFoods();
  }
  usernamedetail(){
  this.userservice.getuserdetail(this.userinformation).subscribe({
    next:(res)=>{
      console.log(res[0])
      this.userinformationdetail = res[0]
      
      console.log(this.userinformationdetail.admin)
      if(this.userinformationdetail.admin == 'true'){
        this.admin = true
      }
    }
  })
  }
  showFoods(): void {
    this.userservice.getuserdetail(this.userinformation).subscribe({
      next:(res)=>{
    console.log(res[0].admin)
    if(res[0].admin == "true"){
      this.admin = true
      this.foodService.showallpicture().subscribe({
        next:(res)=>{
          console.log(res.Documents)
          console.log(res)
          var count = 0; 
          for (var key in res.Documents) { 
            //if (Object.prototype.hasOwnProperty.call(obj, key)) {//感觉好像没必要，希望有人能探讨一下
            //if (obj.hasOwnProperty(key)) {//同上简写
                count++;  //直接加
            //}    
        }  
        console.log(count)
          for(let index = 0; index < count; index++){
            if(res.Documents[index].isvideo == 'true'){
              this.judge = true
            }
          }
          this.videolistadmin = res.Documents
          console.log(this.judge)

          console.log(this.videolistadmin)
        }
      })
    }else{
    this.foodService.showFoods(this.userinformation)
      .subscribe(res => {
        this.list=res
        console.log(this.list)
        var count = 0; 
        for (var key in this.list) { 
 
          //if (Object.prototype.hasOwnProperty.call(obj, key)) {//感觉好像没必要，希望有人能探讨一下
          //if (obj.hasOwnProperty(key)) {//同上简写
              count++;  //直接加
          //}    
      }  
 console.log(count)
        console.log(this.list)
        for (let index = 2; index < count+2; index++) {
          console.log(res[2])
          this.videolist.push(res[index]);
        }
        console.log(this.videolist)

  })
}
}
})
  }
  
  open() {
   
  }

  goPage(fileName: any): void {
    console.log(fileName)
    this.router.navigate(['/detail'],{ queryParams: { fileName: fileName,userName:this.activatedRoute.snapshot.queryParams['userName'] }});
  }

  paginate(event: { page: any; }) {
    //event.first = Index of the first record
    //event.rows = Number of rows to display in new page
    //event.page = Index of the new page
    //event.pageCount = Total number of pages
    console.info(event.page+1);
    this.foodService.showFoods(this.activatedRoute.snapshot.queryParams['userName']).subscribe(res => {
      this.list=res.datainformation
  })
  }

  searchfriedns(){
    console.log(this.activatedRoute.snapshot.queryParams['userName'])
    this.router.navigate(['/friends'],{ queryParams: { userName: this.activatedRoute.snapshot.queryParams['userName'] }});
  }
  showfriends(){
    this.router.navigate(['/showfriends'],{ queryParams: { userName: this.activatedRoute.snapshot.queryParams['userName'] }});

  }
  add(){
     this.router.navigate(['/add']);
  }

  showfriend(){
    this.userservice.showfriends(this.userinformation).subscribe({
      next:(res)=>{
        console.log(res)
        this.friendlist = res;
      }
    })
  }
  deletefriends(id : any){

       this.userservice.deletefriends(id) .subscribe(res => {
      this.message.add({severity: 'success', summary: 'delete',detail:"success" });
      window.location.reload()

    
  
    })
}

}
