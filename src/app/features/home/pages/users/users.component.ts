import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatButton } from '@angular/material/button';
export interface tableElement {
  name: string;
  RegistrationEmail: string;
  status: string;
  lastlogin: string;
  Datejoined:string;
}

const TABLE_DATA: tableElement[] = [
  {name: 'Musaib', RegistrationEmail: 'musaib@gmail.com', status: 'DISABLE', lastlogin: '10/05/2022',Datejoined:'10/05/2022'},
  {name: 'bari', RegistrationEmail: 'musaib@gmail.com', status: 'DISABLE', lastlogin: '10/05/2022',Datejoined:'10/05/2022'},
  {name: 'naveed', RegistrationEmail: 'musaib@gmail.com', status: 'DISABLE', lastlogin: '10/05/2022',Datejoined:'10/05/2022'},
  {name: 'arif', RegistrationEmail: 'musaib@gmail.com', status: 'DISABLE', lastlogin: '10/05/2022',Datejoined:'10/05/2022'},
  {name: 'basit', RegistrationEmail: 'musaib@gmail.com', status: 'DISABLE', lastlogin: '10/05/2022',Datejoined:'10/05/2022'},
  {name: 'ovais', RegistrationEmail: 'musaib@gmail.com', status: 'DISABLE', lastlogin: '10/05/2022',Datejoined:'10/05/2022'},
  {name: 'umer', RegistrationEmail: 'musaib@gmail.com', status: 'DISABLE', lastlogin: '10/05/2022',Datejoined:'10/05/2022'},
  {name: 'akib', RegistrationEmail: 'musaib@gmail.com', status: 'DISABLE', lastlogin: '10/05/2022',Datejoined:'10/05/2022'},
  {name: 'sajad', RegistrationEmail: 'musaib@gmail.com', status: 'DISABLE', lastlogin: '10/05/2022',Datejoined:'10/05/2022'},
  {name: 'gowher', RegistrationEmail: 'musaib@gmail.com', status: 'DISABLE', lastlogin: '10/05/2022',Datejoined:'10/05/2022'},
  {name: 'sahil', RegistrationEmail: 'musaib@gmail.com', status: 'Disable', lastlogin: '10/05/2022',Datejoined:'10/05/2022'},
  {name: 'fazil', RegistrationEmail: 'musaib@gmail.com', status: 'Disable', lastlogin: '10/05/2022',Datejoined:'10/05/2022'},
  {name: 'amir', RegistrationEmail: 'musaib@gmail.com', status: 'Disable', lastlogin: '10/05/2022',Datejoined:'10/05/2022'},
  {name: 'Musaib', RegistrationEmail: 'musaib@gmail.com', status: 'Disable', lastlogin: '10/05/2022',Datejoined:'10/05/2022'},
  {name: 'Musaib', RegistrationEmail: 'musaib@gmail.com', status: 'Disable', lastlogin: '10/05/2022',Datejoined:'10/05/2022'},
  {name: 'Musaib', RegistrationEmail: 'musaib@gmail.com', status: 'Disable', lastlogin: '10/05/2022',Datejoined:'10/05/2022'},
  {name: 'Musaib', RegistrationEmail: 'musaib@gmail.com', status: 'Disable', lastlogin: '10/05/2022',Datejoined:'10/05/2022'},
  {name: 'Musaib', RegistrationEmail: 'musaib@gmail.com', status: 'Disable', lastlogin: '10/05/2022',Datejoined:'10/05/2022'},
  {name: 'Musaib', RegistrationEmail: 'musaib@gmail.com', status: 'Disable', lastlogin: '10/05/2022',Datejoined:'10/05/2022'},
  {name: 'Musaib', RegistrationEmail: 'musaib@gmail.com', status: 'Disable', lastlogin: '10/05/2022',Datejoined:'10/05/2022'},
  {name: 'Musaib', RegistrationEmail: 'musaib@gmail.com', status: 'Disable', lastlogin: '10/05/2022',Datejoined:'10/05/2022'},
  {name: 'Musaib', RegistrationEmail: 'musaib@gmail.com', status: 'Disable', lastlogin: '10/05/2022',Datejoined:'10/05/2022'},
  {name: 'Musaib', RegistrationEmail: 'musaib@gmail.com', status: 'DISABLE', lastlogin: '10/05/2022',Datejoined:'10/05/2022'},
  
  
];

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit,AfterViewInit {

  constructor() { }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
  }
  
  displayedColumns: string[] = ['select', 'name', 'RegistrationEmail', 'status', 'lastlogin','Datejoined','actions'];
  dataSource = new MatTableDataSource<tableElement>(TABLE_DATA);
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



}
