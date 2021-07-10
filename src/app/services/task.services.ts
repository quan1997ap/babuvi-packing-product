import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpService} from './common/http.service';
import {ApiApplication} from 'app/config/app.config';
import {ApiService} from './common/api.service';

@Injectable()
export class TaskServices extends ApiService {
    constructor(http: HttpService, _router: Router) {
        super(ApiApplication.task.controller, http, _router);
    }

    getTaskList(page:number,perPage:number,param:any){
        return this.post(this.apiBaseController + `searchMyTask?perPage=${perPage}&page=${page}`,param)
    }

    getTaskRefType(){
        return this.get(ApiApplication.system.controller + "/getTaskReffType")
    }
    getTaskType(){
        return this.get(ApiApplication.system.controller + "/getTaskType")
    }
    getTaskStatus(){
        return this.get(ApiApplication.system.controller + "/getTaskStatus")
    }

    removeTaskMember(data){
        return this.put(this.apiBaseController +  `removeTaskMember`,data)
    }

    getTaskByCode(taskCode:any){
        return this.get(this.apiBaseController + `getTaskByCode?taskCode=${taskCode}`)
    }
    addTaskChat(content){
        return this.post(this.apiBaseController + `addTaskChat`,content)
    }
    deleteTaskChat(taskChatId){
        return this.delete(this.apiBaseController + `deleteTaskChat?taskChatId=${taskChatId}`)
    }
    updateTaskChat(content){
        return this.post(this.apiBaseController + `updateTaskChat`,content)
    }

    addTaskMember(data){
        return this.post(this.apiBaseController + `addTaskMember`,data)
    }
    
    updateTaskDescrip(data:any){
        return this.post(this.apiBaseController + `updateTask`,data)
    }

    updateTaskStatus(data:any){
        return this.post(this.apiBaseController + `updateTaskStatus`,data)
    }
    
    addTaskAttachFile(data:any){
        return this.post(this.apiBaseController + `addTaskAttachFile`,data)
    }

    deleteTaskAttachFile(fileid){
        return this.delete(this.apiBaseController + `deleteAttachFile?attackFileId=${fileid}`)
    }

    updateAmount(data:any){
        return this.post(this.apiBaseController + `updateTaskAmount`,data)
    }

    getLsReasion(data:any){
        return this.post(this.apiBaseController + `getLsTaskReasion`,{lsTask:data})
    }

    updateManyTaskStatus(data:any){
        return this.post(this.apiBaseController + `updateLsTaskStatus`,{lsTask:data})
    }
}