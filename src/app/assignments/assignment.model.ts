export class Assignment
{

  listMatiere:string[]=["Base de données", "Technologies Web", "Grails","Programmation orientée Objet", "Anglais"];
  listProf:string[]=["prog0.png","prof1.png", "prof2.png","prof3.png", "prof4.png"];
  _id!:string;
  id!: number;
  nom!:string;
  dateDeRendu!:Date;
  rendu!:boolean;
  auteur!:string;
  matiere!:string;
  prof!:string
  note:number;
  remarque!:string;

  generateMatiere(){
    let max;
    if(this.listMatiere.length>this.listProf.length-1){
      max=this.listMatiere.length;
    }
    else{
      max=this.listProf.length;

    }
    let index=Math.floor(Math.random() * max);
    this.matiere=this.listMatiere[index];
    this.prof=this.listProf[index];
  }
  generateRemarqueEtNote(){
    if(this.rendu==true){
      this.note=Math.floor(Math.random() * 20);
      if(Math.random() < 0.7){
        this.remarque="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
      }
    }
  }


}


// export class Matiere
// {
//   private listMatiere:string[]=["Base de données", "Technologies Web", "Grails","Programmation orientée Objet", "Anglais"];
//   private listProf:string[]=["prog0","prof1", "prof2","prof3", "prof4"];
//   nom!:string;
//   prof!:string;

//   generateMatiere(){
//     let max;
//     if(this.listMatiere.length>this.listProf.length){
//       max=this.listMatiere.length;
//     }
//     else{
//       max=this.listProf.length;

//     }
//     Math.floor(Math.random() * max);
//     this.nom=this.listMatiere[max];
//     this.prof=this.listProf[max];
//   }
// }
