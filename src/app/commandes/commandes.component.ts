import {Component, OnInit} from '@angular/core';
import {CommandeService} from "../services/commande.service";

@Component({
  selector: 'app-commandes',
  templateUrl: './commandes.component.html',
  styleUrls: ['./commandes.component.css']
})
export class CommandesComponent implements OnInit {

  commandes!:any;
  constructor(private commandesService: CommandeService) {
  }
  ngOnInit(): void {
    this.commandesService.getCommandes().subscribe({
      next: (data) => {
        console.log(data.datas)
        this.commandes = data.datas;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}
