import { Component, OnInit } from '@angular/core';
import {DialogService} from "primeng/dynamicdialog";
import {EditComponent} from "../edit/edit.component";
import {FoodService} from "../../../service/food.service";
import {ActivatedRoute} from "@angular/router";
import {ConfirmationService, MessageService} from "primeng/api";
import {Food, Review} from "../../../types";
import {ReviewService} from "../../../service/review.service";
import { EditreviewComponent } from 'src/app/editreview/editreview.component';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  video: any
  list: any;
  likestring:any;
  form: any = {
    fileName: this.activatedRoute.snapshot.queryParams['fileName'],
  }
  reviewfrom:any={
    userName:'',
    comment:'',
    fileName:'',
    filePath:'',
    judge:''
  }
  likeform:any={
    userName:'',
    fileName:''
  }
  text:any={
    text:''
  }
  data={
    text:String
  }
  deletereviewform:any={
    id:''
  }
   commentinformation:any
  filenameinformation:any
  videoid:any
  admin:Boolean=false
  userinformation : any={
    username:this.activatedRoute.snapshot.queryParams['userName']
  }
  
  userinformationdetail:any
  type:any
  filetypes:Boolean = false
  constructor(public dialogService: DialogService, private foodService : FoodService, private activatedRoute : ActivatedRoute, private confirmationService : ConfirmationService, private reviewService: ReviewService,private message:MessageService,private userservice : UserService) { }

  ngOnInit(): void {
   this.getFoodInfo();
    this.getreviewlist();
   this.likelist()
   this.usernamedetail()
   // console.log(this.likelist);
  }
  getreviewlist():void{
    this.reviewService.listreview(this.form).subscribe({
      next:(res)=>{
        console.log(res)
       this.list = res
       console.log(this.list)
      }
    })
  
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
  getFoodInfo(): void { 
    console.log(this.activatedRoute.snapshot.queryParams['fileName'])
    console.log(this.form)
    this.foodService.getFoodInfo(this.form)
      .subscribe(res => {
        console.log(res)
     this.video = res[0]
     this.reviewfrom.userName = this.video.userName
     this.likeform.userNmae = this.video.userName
     this.videoid = this.video.id
     console.log(this.video)
     this.type =this.video.filetype
     if(this.type=='.mp4'){  
      this.filetypes = true
     }else{
      this.filetypes=false
     }
     console.log(this.filetypes)

     console.log(this.type)
      });
  }

  open() {
    const ref = this.dialogService.open(EditComponent, {
      header: "Edit video",
      width: '30%',
      data:{
       id:this.video.id,
       fileName:this.activatedRoute.snapshot.queryParams['fileName']
    }

  }
    );
  }



  openReview(id:any) {
    const ref = this.dialogService.open(EditreviewComponent, {
      header: "Edit review",
      width: '30%',
      data:{
        id:id
      }
    });
  }

  

  addReview() {
    console.log(this.data.text)
    console.log(this.activatedRoute.snapshot.queryParams['userName'])
    this.reviewfrom.comment = this.data.text
    this.likeform.userName = this.activatedRoute.snapshot.queryParams['userName']
    this.userservice.getuserdetail(this.likeform).subscribe({
      next:(res)=>{
        console.log(res[0].filePath)
        this.filenameinformation = res[0].filePath
        this.reviewfrom.fileName = this.activatedRoute.snapshot.queryParams['fileName']
        this.reviewfrom.filePath =  res[0].filePath
        this.reviewfrom.userName = this.activatedRoute.snapshot.queryParams['userName']
        this.text.text=  this.reviewfrom.comment
        this.reviewService.addjudge(this.text).subscribe({
          next:(res)=>{
            console.log(res.documents)
            console.log(res.documents[0].sentiment)

            this.message.add({severity: 'success', summary: 'review',detail:res.documents[0].sentiment });

        this.reviewfrom.judge =res.documents[0].sentiment

        this.reviewService.addReview(this.reviewfrom)
        
        .subscribe(res => {
          this.message.add({severity: 'success', summary: 'review',detail:"success" });
         console.log(res)
         window.location.reload()
        })
      }
    })
      }

    })
 
  }

  deleteReview(id: any) {
    this.deletereviewform.id = id
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.reviewService.deleteReview(id)
          .subscribe(res => {
            this.message.add({severity: 'success', summary: 'delete',detail:"success" });
            window.location.reload()

          })
      }
    })
  }

  deleteFood() {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.foodService.deletepciture(this.videoid)
          .subscribe(res => {
            this.message.add({severity: 'success', summary: 'delete',detail:"success" });
            window.location.href="/home?userName="+this.activatedRoute.snapshot.queryParams['userName']
          });
      }
    })
  }
  like(){
    this.likeform.userName = this.video.userName
    this.likeform.fileName = this.activatedRoute.snapshot.queryParams['fileName']
    console.log(this.likeform)
    this.foodService.like(this.likeform).subscribe(res => {
      this.message.add({severity: 'success', summary: 'like',detail:"success" });
      window.location.reload()

    })
  }
  likelist(){
    this.foodService.likelist(this.form).subscribe(res =>{
      console.log(res);
      this.likestring = res;
    })
  }
  translate(data:any){
    const ref = this.dialogService.open(EditreviewComponent, {
      header: "translata review",
      width: '30%',
      data:{
        text:data
      }

     }
    )
  }
  

  filetype (fileName:any ) {
  // 后缀获取
  var suffix = '';
  // 获取类型结果
  var result :string =  '';
  try {
    var flieArr = fileName.split('.');
    suffix = flieArr[flieArr.length - 1];
  } catch (err) {
    suffix = '';
  }
  // fileName无后缀返回 false
  if (!suffix) {
    result = 'false';
    return result;
  }
  // 图片格式
  var imglist = ['png', 'jpg', 'jpeg', 'bmp', 'gif'];
  // 进行图片匹配
  result = String(imglist.some(function (item) {
    return item == suffix;
  }));
  if (result) {
    result = 'image';
    return result;
  }
  ;
  // 匹配txt
  var txtlist = ['txt'];
  result =  String(txtlist.some(function (item) {
    return item == suffix;
  }));
  if (result) {
    result = 'txt';
    return result;
  }
  ;
  // 匹配 excel
  var excelist = ['xls', 'xlsx'];
  result =  String(excelist.some(function (item) {
    return item == suffix;
  }));
  if (result) {
    result = 'excel';
    return result;
  }
  ;
  // 匹配 word
  var wordlist = ['doc', 'docx'];
  result =  String(wordlist.some(function (item) {
    return item == suffix;
  }));
  if (result) {
    result = 'word';
    return result;
  }
  ;
  // 匹配 pdf
  var pdflist = ['pdf'];
  result =  String(pdflist.some(function (item) {
    return item == suffix;
  }));
  if (result) {
    result = 'pdf';
    return result;
  }
  ;
  // 匹配 ppt
  var pptlist = ['ppt'];
  result =  String(pptlist.some(function (item) {
    return item == suffix;
  }));
  if (result) {
    result = 'ppt';
    return result;
  }
  ;
  // 匹配 视频
  var videolist = ['mp4', 'm2v', 'mkv'];
  result = String( videolist.some(function (item) {
    return item == suffix;
  }));
  if (result) {
    result = 'video';
    return result;
  }
  ;
  // 匹配 音频
  var radiolist = ['mp3', 'wav', 'wmv'];
  result =  String(radiolist.some(function (item) {
    return item == suffix;
  }));
  if (result) {
    result = 'radio';
    return result;
  }
  // 其他 文件类型
  result = 'other';
  return result;
}
}
