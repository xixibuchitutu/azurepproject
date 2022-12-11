import { Component,OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { UserService } from './service/user.service';
import { User } from './types';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'foodSystem';
  userInfo = this.userService.userInfo;
  constructor(private primengConfig: PrimeNGConfig,private userService: UserService) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    // this.userService.getUserInfo().subscribe(res => {
    //   this.userService.setUser({...res.data,avatar: ''})
    // })
  }
}
