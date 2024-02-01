import { Injectable } from '@angular/core';
import { Assignment } from '../assignments/assignment.model';
import { catchError, forkJoin, Observable, of } from 'rxjs';
import { LoggingService } from './logging.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { dbInitialAssignments } from './data';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  assignments:Assignment[] = [];
  private HttpOptions={
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }
  constructor(private logginService:LoggingService,
              private http:HttpClient) { }

 //uri = "http://localhost:8010/api/assignments";
 uri = "https://api-angular-project2024.onrender.com/api/assignments";

  getAssignments():Observable<any> {
  console.log(this.http.get<Assignment[]>(this.uri))
    return this.http.get<Assignment[]>(this.uri)

    //return of(this.assignments);
  }

  // renvoie comme Observable l'assignment dont l'id est passé
  // en paramètre, ou undefined s'il n'existe pas
  getAssignment(id:number):Observable<Assignment|undefined> {
    /*const a:Assignment|undefined = this.assignments.find(a => a.id === id);
    if(a)

    console.log("getAssignment id= " + id + " nom = " + a.nom)*/
    //return of(a);
    console.log("get by id id = "+id)
    return this.http.get<Assignment>(this.uri + "/" + id)
    .pipe( catchError(this.handleError<Assignment>(`getAssignment(id=${id}`))
    )
  }
  private handleError<T>(operation: any, result?: T) {
    return (error: any): Observable<T> => {
      console.log(error); // pour afficher dans la console
      console.log(operation + ' a échoué ' + error.message);

      return of(result as T);
    }
 };

  addAssignment(assignment:Assignment):Observable<any> {

    console.log(assignment);
    return this.http.post<Assignment>(this.uri, assignment, this.HttpOptions);
  }

  updateAssignment(assignment:Assignment):Observable<Assignment> {
    this.logginService.log(assignment.nom, "modifié !");
    return this.http.put<Assignment>(this.uri, assignment);
  }

  deleteAssignement(assignment:Assignment) :Observable<any> {
    // let pos = this.assignments.indexOf(assignment);
    // this.assignments.splice(pos, 1);
    let deletURI=this.uri+'/'+assignment._id;
    this.logginService.log(assignment.nom, "supprimé !");


    //return of("Assignment supprimé")
    return this.http.delete(deletURI);
  }

  peuplerBDAvecForkJoin():Observable<any>{
    const appelsVersAddAssignment: any=[];
    dbInitialAssignments.forEach((a)=>{
      const nouvelAssignment:any=new Assignment();
      nouvelAssignment.id=a.id;
      nouvelAssignment.dateDeRendu=a.dateDeRendu;
      nouvelAssignment.nom=a.nom;
      nouvelAssignment.rendu=a.rendu;
      nouvelAssignment.generateMatiere();
      nouvelAssignment.generateRemarqueEtNote();
      appelsVersAddAssignment.push(this.addAssignment(nouvelAssignment));
    });

    return forkJoin(appelsVersAddAssignment);
  }

  getAssignmentPagine(page:number, limit:number):Observable<any> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("page",page);
    queryParams = queryParams.append("limit",limit);

    return this.http.get<any>(this.uri,{params:queryParams})
    .pipe( catchError(this.handleError<Assignment>(`getAssignment(page=${page}`)));
    // return this.http.get<any>(this.uri + "/"+ page+"/"+limit)
    // .pipe( catchError(this.handleError<Assignment>(`getAssignment(page=${page}`)));
  }


}

