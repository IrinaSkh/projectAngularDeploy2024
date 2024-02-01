import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';
import { MatStepperModule } from '@angular/material/stepper';
import {Router} from "@angular/router";
@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css'],
})
export class AddAssignmentComponent implements OnInit {
  // emetteur de l'événementy (nouvelAssignment)

  // du formulaire
  nomDevoir: string = '';
  dateDeRendu!: Date;
  assignmentTest:Assignment=new Assignment;
  matiereRendu:string[]=this.assignmentTest.listMatiere;
  profList:string[]=this.assignmentTest.listProf;
  matiere:string;
  prof:string="";
  auteur:string;
  constructor(private assignmentsService:AssignmentsService,     private router:Router) {}

  ngOnInit(): void {

  }

  onSubmit() {
    console.log(this.nomDevoir + ' a rendre le ' + this.dateDeRendu);
    const newAssignment = new Assignment();
    newAssignment.nom = this.nomDevoir;
    newAssignment.dateDeRendu = this.dateDeRendu;
    newAssignment.rendu = false;
    newAssignment.matiere=this.matiere;
    newAssignment.prof=this.prof;
    newAssignment.id = Math.floor(Math.random()*100000000);

    this.assignmentsService.addAssignment(newAssignment)
      .subscribe(reponse => {
        console.log(reponse.message);
      });
    this.router.navigate(['/home']);
  }
  changeProf(event){
    //this.matiere=event.value;
    console.log("testtttgegcec");
    this.prof=this.profList[this.matiereRendu.indexOf(event.value)[0] ];
  }
  onStepOneSubmit() {
  }
  onStepTwoSubmit() {

  }

  onStepThreeSubmit() {
    // Logique pour la soumission de la troisième étape
  }
}
