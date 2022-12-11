import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ReviewService } from '../service/review.service';

@Component({
  selector: 'app-editreview',
  templateUrl: './editreview.component.html',
  styleUrls: ['./editreview.component.css']
})
export class EditreviewComponent implements OnInit {
 
  data = {
    text: ''
  } 
  commentinformation:any
  updateReview(){
    this.data.text = this.config.data.text
    this.reviewservice.translate(this.data).subscribe(res=>{
        console.log(res.name)
        this.commentinformation =res.name
    })
  }

  constructor(private foodreview:ReviewService, public config: DynamicDialogConfig,public message:MessageService,public reviewservice:ReviewService) { }

  ngOnInit(): void {
    console.log(this.config.data)
    this.updateReview();
  }

}
