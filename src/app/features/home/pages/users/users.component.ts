import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatButton } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/core/services/user-Services/user.service';
import { userData } from './user.model';
import { NgbPaginationNumber } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';




export interface tableElement {
  name: string;
  registrationEmail: string;
  status: string;
  lastlogin: string;
  datejoined:string;
  
 }
 

//const TABLE_DATA: tableElement[] = 

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit,AfterViewInit {
  public errorMessage:string |undefined=undefined;

  userModelobj :userData=new userData
  userData: any;

  constructor(private api:UserService, private router: Router) {
this.userModelobj.userId = 70,
this.userModelobj.limit = 10,
this.userModelobj.page=0,
this.userModelobj.orderBy= '-createdAt'

    this.api.getUser(this.userModelobj).subscribe({
      next:(res:any)=>{
        this.dataSource.data = res.content;
      },
      error:(error)=>{
        this.errorMessage=error;
          if(error == 'Access! Denied.'){
            this.router.navigate(['auth'])
          }
      }
    })
    // (res => {
    //   console.log(res)
    //   this.dataSource.data = res.content;
    // },
    // error=>{
    //   this.errorMessage=error;
    //   if(error == 'Access! Denied.'){
    //     this.router.navigate(['auth'])
    //   }
      
      
    // })
    
   }
   
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    
  }
  displayStyle = "none";
  
  displayedColumns: string[] = ['select','name', 'registrationEmail', 'status', 'lastlogin','datejoined','actions'];
  dataSource = new MatTableDataSource<tableElement>();
  selection = new SelectionModel<tableElement>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: tableElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.name + 1}`;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
}

/**ts for modal open/close */
openPopup() {
  this.displayStyle = "block";
}
closePopup() {
  this.displayStyle = "none";
}





}

