import { Component, OnInit ,Input,Output,EventEmitter} from '@angular/core';
import { Employee } from '../Models/Employee.model';




@Component({
  selector: 'app-user-grid',
  templateUrl: './user-grid.component.html',
  styleUrls: ['./user-grid.component.css']
})
export class UserGridComponent implements OnInit {

  
 
  @Input() employees :Employee[];
  @Output() EmpIdOutput = new EventEmitter<number>();
  @Output() DelEmpIdOutput = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {    
  }

  EditUser(id:number){
    this.EmpIdOutput.emit(id);
  }

  DeleteUser(id:number){
    this.DelEmpIdOutput.emit(id);
  }

}
