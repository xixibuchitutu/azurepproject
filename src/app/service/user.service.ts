import { Injectable } from '@angular/core';
import { UserInfo } from '../models/user.model';
import { User,Login,Register } from '../types';
import { Observable } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const jsonHeader = {
  headers: new HttpHeaders({
    'Content-type': 'application/json',
    
  })
}

const normalHeader = {
  headers: new HttpHeaders({
    'enctype': 'multipart/form-data',
    'contentType':'false',
    'processData':'false'
  })
}

@Injectable({
  providedIn: 'root'
})

export class UserService {
  userInfo = new UserInfo();
  constructor(private http: HttpClient) { }

  setUser(row: User) {
    this.userInfo = row;
  }



  register(data: any){
    return this.http.post<any>('https://yangzhengxilogicapps.azurewebsites.net:443/api/register/triggers/manual/invoke?api-version=2022-05-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=7cDpqL0RVk2ly2VTrQC9IkOY3lDhITn0OOlMVePx6m4',data)
  }

  login(data: any){
    console.log(data)
    return this.http.post<any>("https://yangzhengxilogicapps.azurewebsites.net:443/api/login/triggers/manual/invoke?api-version=2022-05-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=NIRsAWW03jxmJ06nbXZ4Q9qznMHdRtSQINZ76dLOxq4",data,jsonHeader)
  }

  getUserInfo(){
    return this.http.get<any>('https://yangzhengxilogicapps.azurewebsites.net:443/api/userlist/triggers/manual/invoke?api-version=2022-05-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Sx502g8sAdxa1F8eqbTav1bDwz3mJp49L-g2LdxvsUI',jsonHeader)
  }
  addfriends(data:any){
    return this.http.post<any>('https://yangzhengxilogicapps.azurewebsites.net:443/api/addfriends/triggers/manual/invoke?api-version=2022-05-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=c_Wl7A8tt0geAWwUWApkxfA_SunWc5x6EGCycMKVX_4',data,jsonHeader)
  }
  showfriends(data:any){
    return this.http.post<any>('https://yangzhengxilogicapps.azurewebsites.net:443/api/friendslist/triggers/manual/invoke?api-version=2022-05-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=u480StcJ94KC8f-5StwCrvqrlI4hlFcBHcQ65wNNLjU',data,jsonHeader)
  }
  getuserdetail(data:any){
    return this.http.post<any>('https://yangzhengxilogicapps.azurewebsites.net:443/api/userdetail/triggers/manual/invoke?api-version=2022-05-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=CakVe3oR6N0JjXr8LiZ5uHqjRBKtLASyTrQWfhOjxaY',data,jsonHeader)
  }
  
  deletefriends(data:any){
    return this.http.delete<any>('https://yangzhengxilogicapps.azurewebsites.net/api/deletefriends/triggers/manual/invoke/delete/'+data+'?api-version=2022-05-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Iqi3JMMzU7au9I0mkAmsVnYsnXNJPRtWe-QUq0J0lK0')
  }

}
