import { Component, OnInit ,AfterViewInit,ViewChild} from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatButton } from '@angular/material/button';
export interface tableStatusElement {
  emailAddress: string;
  googleAccounts: number;
  contacts: number;
  campaigns: number;
  messages:number;
}

const TABLE_DATA: tableStatusElement[] = [
  {emailAddress: 'Musaib@gmail.com', googleAccounts: 10, contacts: 14, campaigns: 11,messages:121}
 
  
  
];

@Component({
  selector: 'app-users-stats',
  templateUrl: './users-stats.component.html',
  styleUrls: ['./users-stats.component.scss']
})
export class UsersStatsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  displayedColumns: string[] = ['emailAddress', 'googleAccounts', 'contacts', 'campaigns', 'messages','creationTag'];
  dataSource = new MatTableDataSource<tableStatusElement>(TABLE_DATA);
  selection = new SelectionModel<tableStatusElement>(true, []);

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
checkboxLabel(row?: tableStatusElement): string {
  if (!row) {
    return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
  }
  return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.emailAddress + 1}`;
}
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}


}

