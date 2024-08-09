import {Component, OnInit} from '@angular/core';
import {MenuItem, MessageService} from "primeng/api";
import {UsuarioServiceService} from "../../../../services/usuario.service";

@Component({
  selector: 'app-lista-vendedores',
  templateUrl: './lista-vendedores.component.html',
  styleUrls: ['./lista-vendedores.component.scss'],
  providers: [MessageService]
})
export class ListaVendedoresComponent implements OnInit {

  constructor(private messageService: MessageService,
              private usuarioServiceService: UsuarioServiceService) {
  }

  items: MenuItem[] = [];
  display: any;

  ngOnInit() {
    this.items = [
      {
        label: 'Options',
        items: [{
          label: 'Update',
          icon: 'pi pi-refresh',
          command: () => {
            this.update();
          }
        },
          {
            label: 'Delete',
            icon: 'pi pi-times',
            command: () => {
              this.delete();
            }
          }
        ]
      },
      {
        label: 'Navigate',
        items: [{
          label: 'Angular',
          icon: 'pi pi-external-link',
          url: 'http://angular.io'
        },
          {
            label: 'Router',
            icon: 'pi pi-upload',
            routerLink: '/fileupload'
          }
        ]
      }
    ];
  }

  update() {
    this.messageService.add({severity: 'success', summary: 'Success', detail: 'Data Updated'});
  }

  delete() {
    this.messageService.add({severity: 'warn', summary: 'Delete', detail: 'Data Deleted'});
  }
}
