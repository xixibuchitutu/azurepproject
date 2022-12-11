import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Review} from '../types';
import { environment } from 'src/environments/environment';

const jsonHeader = {
  headers: new HttpHeaders({
    'Content-type': 'application/json',
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
export class ReviewService {

  constructor(private http: HttpClient) { }

  addReview(data:any) {
    console.log(data)
    return this.http.post<any>('https://yangzhengxilogicapps.azurewebsites.net:443/api/addreview/triggers/manual/invoke?api-version=2022-05-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=F4VNF2QfmNEVnYoW5MxgeEBTeIpqrs1fGvsAncV1HL8',data,jsonHeader)
  }

  deleteReview(id: any) {
    return this.http.delete<any>('https://yangzhengxilogicapps.azurewebsites.net/api/deletereview/triggers/manual/invoke/delete/'+id+'?api-version=2022-05-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=3eWf2o_fY3sxwqSpa0dOLJYkw_DGMtrW8a2tjiNRjxw',jsonHeader)
  }


  listreview(data:any){
    return this.http.post<any>('https://yangzhengxilogicapps.azurewebsites.net:443/api/reviewlist/triggers/manual/invoke?api-version=2022-05-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Cc1yzK5NV0F1uVLYteBZBgAwxK2CRVX9LXeV9c_BxWw',data,jsonHeader)
  }
  addjudge(data:any){
    return this.http.post<any>('https://prod-27.centralus.logic.azure.com:443/workflows/451bc091e1274f33bd2a1a441e659f76/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=W9iXbS08xL7B0P4qMDwE56RMINiyDo1gHD3Ie_2xBKg', data, jsonHeader)

  }
  translate(data:any){
    return this.http.post<any>('https://prod-06.centralus.logic.azure.com:443/workflows/329a6f6e6bca49bbb785a2f672a07907/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=BOyqCwhJKR2n_lZjVxskKinTA44z9YXsdo4K27d1-4A', data, jsonHeader)
  }
}
