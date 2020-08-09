import { Injectable } from '@angular/core';
import {Employee} from './Models/Employee.model';

@Injectable({
  providedIn: 'root'
})
export class UserRegisterService {
  private listEmployees :Employee[] =[];

  constructor() { }


saveUser(employee:Employee){
  this.listEmployees.push(employee);  
  console.log(this.listEmployees);
}

UpdateUser(employee:Employee){
  let index = this.listEmployees.findIndex(d => d.Id === employee.Id)
  console.log(index);
  this.listEmployees[index].Id = employee.Id;
  this.listEmployees[index].Name = employee.Name;
  this.listEmployees[index].Gender = employee.Gender;
  this.listEmployees[index].DOB = employee.DOB;
  this.listEmployees[index].BloodGroup = employee.BloodGroup;
  this.listEmployees[index].Designation = employee.Designation;
  this.listEmployees[index].Mobile = employee.Mobile;
}

  postImage(Url : string,files: File[]){

  }

  getEmployees() :Employee[]{
    return this.listEmployees;
  }
 
 getEmployee(id:number): Employee {
   console.log(this.listEmployees.find(x => x.Id == id));
   return this.listEmployees.find(x => x.Id == id);
 }

 deleteEmployee(id:number) :Employee[]{
  let index = this.listEmployees.findIndex(d => d.Id === id); //find index in your array
  this.listEmployees.splice(index, 1);//remove element from array
  return this.listEmployees;
 }

}
