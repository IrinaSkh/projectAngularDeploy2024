import {Component, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './shared/auth.service';
import { MatDrawer } from '@angular/material/sidenav';
import {AssignmentsService} from "./shared/assignments.service";
import { MatDialog } from '@angular/material/dialog';
import {LoginDialogComponent} from "./shared/components/login-dialog/login-dialog.component";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('drawer') drawer: MatDrawer;
  title = 'Application de gestion des Assignments';
  identifiant: string;
  motdepasse: string;

  constructor(public authService:AuthService, public router:Router,private assignmentsService: AssignmentsService,public dialog: MatDialog,) {}

  login() {
    // Vérifier si les champs sont vides
    if (!this.identifiant || !this.motdepasse) {
      alert('Veuillez entrer un identifiant et un mot de passe.');
      return;
    }
    // Appel de la méthode de connexion du service d'authentification
    this.authService.logIn(this.identifiant, this.motdepasse)
      .then(role => {
        if (role) {
          this.authService.loggedIn = true;
          // Rediriger vers la page d'accueil ou une autre page appropriée
          // this.router.navigate(['/home']);
          alert('Connexion réussie en tant que ' + role);
        }
      })
      .catch(error => {
        // Gestion des erreurs
        console.error('Erreur de connexion', error);
        alert('Erreur lors de la tentative de connexion. Identifiant ou mot de passe incorrect.');
        this.authService.loggedIn = false;
      });
  }

  logout() {
    this.authService.logOut();
    this.router.navigate(['/home']);
    this.authService.loggedIn = false;
}
  toggleDrawer() {
    this.drawer.toggle();
  }

  openLoginForm() {
    // Code pour ouvrir le formulaire de connexion
  }
  peuplerDB(){
    this.assignmentsService.peuplerBDAvecForkJoin().subscribe(()=>{
        console.log("La bd a été peuplée");
        // this.router.navigate(["/home"], {replaceUrl: true});
      }
    )
  }
  openLoginDialog() {
    this.dialog.open(LoginDialogComponent);
    this.drawer.close();
  }
  onLinkClicked(){
    this.drawer.close();
  }


}
