import { Component, OnInit, ViewChild } from '@angular/core';
import { AssignmentsService } from '../shared/assignments.service';
import { Assignment } from './assignment.model';
import { Router } from '@angular/router';
import { AssignmentsPaginatorComponent } from './assignments.paginator/assignments.paginator.component';
import { PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import {LiveAnnouncer} from "@angular/cdk/a11y";

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
})
export class AssignmentsComponent implements OnInit {

  assignments!: Assignment[];

  assignmentSelectionne!: Assignment;
  page:number=1;
  limit:number=10;
  totalDocs:number;
  totalPages:number;
  hasPrevPage:boolean;
  prevPage:number;
  hasNextPage:boolean;
  nextPage:number;
  @ViewChild('tableAssignments') matTableAssignments: MatTable<Assignment>;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private assignmentsService: AssignmentsService, private router: Router,private _liveAnnouncer: LiveAnnouncer) {
  }

  onAssignmentClicke(assignment: Assignment) {
    this.assignmentSelectionne = assignment;
    this.router.navigate(["/assignment/"+assignment.id]);
  }

  displayedColumns: string[] = ['nom', 'dateRendu', 'matiere','rendu'];
  // ngAfterViewInit() {
  //   this.assignments.sort = this.sort;
  // }
  ngOnInit(): void {
    this.assignmentsService.getAssignmentPagine(this.page, this.limit).subscribe(data=>{
      console.log(data.docs);
      this.assignments=data.docs;
      this.page=data.page;
      this.limit=data.limit;
      this.totalDocs=data.totalDocs;
      this.hasPrevPage=data.hasPrevPage;
      this.prevPage=data.prevPage;
      this.hasNextPage=data.hasNextPage;
      this.nextPage=data.nextPage;
    })
//     this.assignmentsService.getAssignments().subscribe(data=>{
//       console.log(data);
//       this.assignments=data;
//       this.page=data.page;
//       this.limit=data.limit;
//       this.totalDocs=data.totalDocs;
//       this.hasPrevPage=data.hasPrevPage;
//       this.prevPage=data.prevPage;
//       this.hasNextPage=data.hasNextPage;
//       this.nextPage=data.nextPage;
//       console.log("test de fonction")
//     })
  }
  getAssignmentsPaginated(page: number, limit: number){
      this.assignmentsService.getAssignmentPagine(page,limit).subscribe(data=>{
      console.log(data.docs);
      this.assignments=data.docs;
      this.page=data.page;
      this.limit=data.limit;
      this.totalDocs=data.totalDocs;
      this.hasPrevPage=data.hasPrevPage;
      this.prevPage=data.prevPage;
      this.hasNextPage=data.hasNextPage;
      this.nextPage=data.nextPage;
    })

  }


  onPageChanged($event:PageEvent){

    this.getAssignmentsPaginated($event.pageIndex, $event.pageSize);
    //this.matTableAssignments.dataSource=this.assignments;
  }
  // ngAfterViewInit() {
  //   this.matTableAssignments.dataSource= this.sort;
  // }
  // /** Announce the change in sort state for assistive technology. */
  // announceSortChange(sortState: Sort) {
  //
  //   if (sortState.direction) {
  //     this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
  //   } else {
  //     this._liveAnnouncer.announce('Sorting cleared');
  //   }
  // }

  search(value: string) {
    this.assignments = this.assignments.filter(
      assignment => assignment.nom.toLowerCase().indexOf(value.toLowerCase()) !== -1);
}


}
