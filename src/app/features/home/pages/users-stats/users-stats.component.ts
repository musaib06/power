import { Component, OnInit ,AfterViewInit,ViewChild} from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatButton } from '@angular/material/button';
import { UserService } from 'src/app/core/services/user-Services/user.service';
export interface tableStatusElement {
  emailAddress: string;
  googleAccounts: number;
  contacts: number;
  campaigns: number;
  messages:number;
  userStatsData:any;
}



@Component({
  selector: 'app-users-stats',
  templateUrl: './users-stats.component.html',
  styleUrls: ['./users-stats.component.scss']
})
export class UsersStatsComponent implements OnInit {

  constructor(private api:UserService) {
    this.api.getUserStats().subscribe(res => {
      console.log(res)
      this.dataSource.data = res;
    })
   }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  displayedColumns: string[] = ['emailAddress', 'googleAccounts', 'contacts', 'campaigns', 'messages','creationTag'];
  dataSource = new MatTableDataSource<tableStatusElement>();
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

