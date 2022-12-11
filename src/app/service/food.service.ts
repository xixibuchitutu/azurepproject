import { Injectable } from '@angular/core';
import { HttpClient,HttpContext,HttpHeaders } from '@angular/common/http';
import { Food } from '../types';
import { environment } from 'src/environments/environment';

const jsonHeader = {
  headers: new HttpHeaders({
    'Content-type': 'application/json',
  })
}
const formHeader = {
  headers: new HttpHeaders({
    'Content-type':'multipart/form-data'
  })
  
}

const normalHeader = {
  headers: new HttpHeaders({
    'authorization': 'Bearer ' + localStorage.getItem('token')
  })
}

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private http: HttpClient) { }

  addFood(data: any) {
    return this.http.post<any>('https://yangzhengxilogicapps.azurewebsites.net:443/api/addvideo/triggers/manual/invoke?api-version=2022-05-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=mYfhKIZAdiwEESlYSmWtxY3Kup5YKjWrRyq0s7LnXnM',data)
  }

  showFoods(data:any) {
    return this.http.post<any>('https://yangzhengxilogicapps.azurewebsites.net:443/api/yangzhengxishowvideo/triggers/manual/invoke?api-version=2022-05-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=447BKVaKzjjTxDIN4LKyiH9lqer9nd5L-Ny1YYEv6bk',data,jsonHeader)
  }

  getFoodInfo(id: any) {
    return this.http.post<any>('https://yangzhengxilogicapps.azurewebsites.net:443/api/videodetail/triggers/manual/invoke?api-version=2022-05-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=vnr9NUMdy_UhlVbMD1hcpaf4GCiNTQGi4_2UKdIk45g',id,jsonHeader)
  }
  


  like(data:any){
    return this.http.post<any>('https://yangzhengxilogicapps.azurewebsites.net:443/api/addlike/triggers/manual/invoke?api-version=2022-05-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=zRy_8oHEUe8de22Pydt27eQ7E6CGIa083X9WtzE6998',data,jsonHeader)
  }
  likelist(data:any){
    return this.http.post<any>('https://yangzhengxilogicapps.azurewebsites.net:443/api/likeslist/triggers/manual/invoke?api-version=2022-05-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=l5SIXu3bNf7Wxn20i1TRGE0WZ27hAwxaBTYFkqnqOEE',data,jsonHeader)
  }



  addpicture(data:any){
    console.log(data)
    return this.http.post<any>('https://prod-08.centralus.logic.azure.com:443/workflows/962c0c52ce4f4f50bb9572cda78ca978/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=8cuKDH1KhJ28WGKEAWHNobI4tWV2szICf9irersahjY',data)
  }
  deletepciture(data:any){
    return this.http.delete<any>('https://yangzhengxilogicapps.azurewebsites.net/api/deletevideo/triggers/manual/invoke/delete/'+data+'?api-version=2022-05-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=t0YmkFiIcyFOhaQFhX2AKWKlql1XXGqx3yfm2J0Ym9E',jsonHeader)
  }

  showallpicture(){
    return this.http.get<any>('https://yangzhengxilogicapps.azurewebsites.net:443/api/showvideo/triggers/manual/invoke?api-version=2022-05-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=54OGhl2yKcDA7dRg764mc6ZVOhI48x6nsWWRAe78ZVI',jsonHeader)
  }
  editvideo(id:any,data:any){
    return this.http.put<any>('https://yangzhengxilogicapps.azurewebsites.net/api/updatevideo/triggers/manual/invoke/update/'+id+'?api-version=2022-05-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=KgBc6xaU-3CJyWrr60H3Eom9fgJpI7Urys0bNaaA_30',data)
  }
}
