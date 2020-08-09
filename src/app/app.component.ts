import { Component, OnInit ,Input} from '@angular/core';
import { FormControl, FormGroup, Validators ,FormControlName, FormBuilder } from '@angular/forms';
import { UserRegisterService } from './user-register.service';
import { HttpClient } from '@angular/common/http';
import { Employee} from './Models/Employee.model';
import { ThrowStmt, createOfflineCompileUrlResolver } from '@angular/compiler';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'ReactiveForms';

  emps :Employee[];

  emp : Employee ={
    Id:0,
    Name:null,
    DOB:null,
    BloodGroup:null,
    Gender:null,
    Mobile:null,
    Designation:null
  };

  
 bloodgroups = [ 
   {name : ""},
   {name : "A+"},
   {name : "A-"},
   {name : "B+"},
   {name : "B-"},
   {name : "AB+"},
   {name : "AB-"},
   {name : "O+"},
   {name : "O-"},
  ]

  NameRequired : string ="Name is required"
  NameMinMax : string ="Name must be greater than 5 characters and less than 15  characters";
  DOBRequired : string ="DOB is required"
  DesignationRequired : string ="Designation is required"
  MobileRequired : string ="Mobile no  is required"
  GenderRequired : string ="Gender is requied"
  selectedBGroup : string ;
  selectedGender : string;

  baseUrl : string ="./assets/Images"
  imageSrc : any ="./assets/Images/Employee.png"

  registrationForm : FormGroup;
  counter : number =1;


  constructor(private fb: FormBuilder, private userRegisterService : UserRegisterService,
    private http : HttpClient) {
  }

  ngOnInit(){
    this.registrationForm = this.fb.group({
      Name: ['',[Validators.required,Validators.minLength(5),Validators.maxLength(15)]],
      DOB: ['',[Validators.required]],    
      Mobile:['',[Validators.required]],
      Accept:['',[Validators.required]],
      Gender:['',],
      Id:['',],
      BloodGroup:['',], //BloodGroup: ["", [Validators.required, Validators.min(1)]]
      Designation:['',[Validators.required]]
    });  
  }

  SelectedBGroup(value:any){
    this.selectedBGroup =value;
  }

  onItemChange(value){
    this.selectedGender =value;
  }

  ImageUpload(event){
    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
      let file: File = fileList[0];
      console.log(file);
      const fd = new FormData();
        fd.append('image', file, file.name);
        this.http.post('http://localhost:4200/assets/Images', fd)
          .subscribe(res => {
            console.log(res);
          });
      
          var reader = new FileReader();
          reader.readAsDataURL(file); 
          reader.onload = (_event) => { 
          this.imageSrc = reader.result; 
      }       
    }   
}

Empid : number;
viewEmployee($event){  
  console.log($event);
  this.emp= new Employee();
  this.emp = this.userRegisterService.getEmployee($event);
  console.log(this.emp);

  this.registrationForm.setValue({
    Id: this.emp.Id,
    Name: this.emp.Name ,
    DOB: this.emp.DOB,
    Mobile: this.emp.Mobile,
    Designation: this.emp.Designation,
    Gender: this.emp.Gender,
    BloodGroup:this.emp.BloodGroup,
    Accept: true
 });

 if(this.emp.Gender.toLowerCase() == "male"){
  this.registrationForm.controls["Gender"].setValue(1);
 //this.registrationForm.patchValue({gender:"male", Gender:true});
 }
 else{
  this.registrationForm.controls["Gender"].setValue(2);
 //this.registrationForm.patchValue({gender:"female", Gender:true});
 }
 
  console.log(this.emp.Id);
  console.log(this.emp.Name);
}



deleteUser($event){  
  this.emps = [];  
  this.emps = this.userRegisterService.deleteEmployee($event);        
}

  RegisterUser(){    
    this.Empid = this.registrationForm.get('Id').value;
    if(this.registrationForm.valid){
      // Save to DB;              
      this.emp= new Employee();   
      if(this.Empid>0)  {
      this.emp.Id =this.Empid;
      }
      else{
      this.emp.Id =this.counter;
      this.counter= this.counter+1;
      }
      this.emp.Name=this.registrationForm.get('Name').value;
      this.emp.Mobile=this.registrationForm.get('Mobile').value;
      this.emp.BloodGroup= this.selectedBGroup;      
      this.emp.DOB=this.registrationForm.get('DOB').value;
      this.emp.Designation=this.registrationForm.get('Designation').value;
      this.emp.Gender=this.selectedGender;
           
      if(this.Empid == null || this.Empid == 0){
        console.log(this.Empid);
        console.log('Save');
      this.userRegisterService.saveUser(this.emp);
      }
      else{
        console.log('Update');
        console.log(this.Empid);
        this.userRegisterService.UpdateUser(this.emp);
      }
      console.log('1. Send Data to Service Layer : ',this.registrationForm);
      console.log('2. After Service Call : ',this.registrationForm);           
    }
    else{
      console.error('Invalid Form !!');
    }
    this.emps = [];    
    this.emps = this.userRegisterService.getEmployees();    
    this.registrationForm.reset();
  }
 

}
