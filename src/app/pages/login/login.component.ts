import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/service/user.service';
import { MessageService } from 'primeng/api';
import {Login, Register, User} from 'src/app/types';
import {UserInfo} from "../../models/user.model";
import { Router } from '@angular/router';
import { ConstantPool } from '@angular/compiler';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {
  isLogin: boolean = true;
  isok:boolean = true
  fileinformation:any;

  form: any = {
    username: '',
    password: ''
  }
  uploadedFiles: any[] = [];

  regForm: any = {
    username: '',
    password: '',
    email: ''
  }
  admin: string ='false';
  constructor(private userService: UserService, private message: MessageService ,private router: Router,private messageService: MessageService) {
   }

  login() {
    console.log(this.form)
    console.log(this.form.username)
    this.userService.login(this.form).subscribe({
      next:(res)=>{
      this.message.add({ severity: 'success', summary: 'REGISTER',detail:res});
      this.router.navigate(['/home'],{ queryParams: { userName:this.form.username }});
      },
      error(res){
        alert("wrong password or usernames")
      }
    });
  }

  register() {
    var reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
    this.isok = reg.test(this.regForm.email)

    if(!this.isok){
      this.message.add({ severity: 'danger', summary: 'REGISTER',detail:"error formate email"});

    }else{
      if(this.regForm.username='admin'){
        this.admin='true'
      }else{
        this.admin='false'
      }
       var submitData = new FormData();
    submitData.append('file', this.fileinformation)
    submitData.append('username',this.regForm.username)
    submitData.append('password',this.regForm.password)
    submitData.append('email',this.regForm.email)
    submitData.append('admin',this.admin)
    this.userService.register(submitData).subscribe({
   next:(res)=>{
    this.message.add({ severity: 'success', summary: 'REGISTER',detail:res});

   },
   error(res){
    alert('the username already used before')
   }
    })
  }
  }
  onUpload(event:any) {
    for(let file of event.files) {
        this.uploadedFiles.push(file);
        console.log(file)
        this.fileinformation.push(file);
    }
    this.message.add({severity: 'info', summary: 'File Uploaded', detail: ''});
  }
  myUploader(event:any) {
    console.log(event.files[0])
    this.fileinformation = event.files[0]

    //this.foodService.addpicture(submitData).subscribe({
      //next:(res)=>{
        //alert('success')
      //}
    //})
}

  ngOnInit(): void {
  }
  showResponse(event: any) {
    this.messageService.add({severity:'info', summary:'Succees', detail: 'User Responded', sticky: true});
}


}
