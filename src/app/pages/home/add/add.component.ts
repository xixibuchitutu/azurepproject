import { Component, OnInit } from '@angular/core';
import {Food} from "../../../types";
import {FoodService} from "../../../service/food.service";
import { MessageService } from 'primeng/api';
import { ajax } from 'rxjs/ajax';
import { map, catchError, of } from 'rxjs';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  fileinformation:any;
  add: any = {
    fileName: '',
    userName: '',
    description: '',
    file: '',
  }
  infomraitonnamefile:any
  uploadedFiles: any[] = [];
  myfile: any[] = []
  isvideo:Boolean = false
  isvideostring:string = "false"
  addFood(): void {
    this.add.file =  this.fileinformation
    var submitData = new FormData();
    submitData.append('file', this.fileinformation)
    submitData.append('fileName',this.add.fileName)
    submitData.append('userName',this.add.userName)
    submitData.append('detail',this.add.detail)
    console.log(this.infomraitonnamefile)
    submitData.append('filetype', this.infomraitonnamefile)
    submitData.append('isvideostring', this.isvideostring)
    this.foodService.addFood(submitData)
      .subscribe({
        next:(res)=>{
          this.message.add({severity: 'info', summary: 'File Uploaded', detail: ''});
          window.location.reload

        },error(){
          window.location.reload
        }
      }
        )
    //window.confirm(JSON.stringify(this.add));
  }

  constructor(private foodService: FoodService,private message:MessageService) { }

  ngOnInit(): void {
    ajax('').subscribe()
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
  
   this.infomraitonnamefile =event.files[0].name.slice(-4,event.files[0].name.length)

   if(event.files[0].name.slice(-4,event.files[0].name.length) == '.mp4'){
        this.isvideostring = "true"
   }

   console.log(this.infomraitonnamefile)
    //this.foodService.addpicture(submitData).subscribe({
      //next:(res)=>{
        //alert('success')
      //}
    //})
}


}
