import { Component, OnInit } from '@angular/core';
import {DialogService} from "primeng/dynamicdialog";
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

import {ActivatedRoute, Router} from "@angular/router";
import { SelectItemGroup } from 'primeng/api/selectitemgroup';
import { UserService } from 'src/app/service/user.service';
import {ConfirmationService, MessageService} from "primeng/api";
import { FoodService } from 'src/app/service/food.service';

@Component({
  selector: 'app-add',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  form: any = {
    id: this.config.data.id,
    fileName:this.config.data.fileName
  }
  fileinformation:any;
  add: any = {
    fileName: '',
    userName: '',
    description: '',
    file: '',
  }
  userinformationdetail:any
  viedeoid:any
  uploadedFiles: any[] = [];
  myfile: any[] = []
  admin : Boolean = false
  filestype:any
  addFood(): void {
    this.add.file =  this.fileinformation
    var submitData = new FormData();
    submitData.append('file', this.fileinformation)
    submitData.append('fileName',this.add.fileName)
    submitData.append('userName',this.add.userName)
    submitData.append('detail',this.add.detail)
    submitData.append('filetype',this.filestype)
    this.foodService.editvideo( this.form.id,submitData)
      .subscribe(res => {
        this.message.add({severity: 'success', summary: 'edit',detail:"success" });
        window.location.reload()
      })
    //window.confirm(JSON.stringify(this.add));
  }

  constructor(public dialogService: DialogService, private  foodService: FoodService, private router: Router,private activatedRoute : ActivatedRoute,private userservice:UserService,private confirmationService : ConfirmationService,private message:MessageService, public config: DynamicDialogConfig) { }

  ngOnInit(): void {
   console.log(this.config.data.id)
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
    this.filestype =event.files[0].name.slice(-4,event.files[0].name.length)
  console.log(this.filestype)
    //this.foodService.addpicture(submitData).subscribe({
      //next:(res)=>{
        //alert('success')
      //}
    //})
}

}
