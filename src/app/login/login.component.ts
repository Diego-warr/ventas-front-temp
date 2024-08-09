import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../services/login.service';
import { DataUserToken } from "../auth/data-user-token.service";
import { HttpClient } from '@angular/common/http';
import { ImgCarouselDTO } from '../dto/ImgCarouselDTO';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService,
    private http: HttpClient,
    private dataUserToken: DataUserToken) {
      this.responsiveOptions = [
        {
            breakpoint: '1024px',
            numVisible: 1,
            numScroll: 1
        },
        {
            breakpoint: '768px',
            numVisible: 1,
            numScroll: 1
        },
        {
            breakpoint: '560px',
            numVisible: 1,
            numScroll: 1
        }
    ];
  }

  columns = 2;
  hide = true;
  username = new FormControl('');
  password = new FormControl('');
  message = new FormControl('');
  mybreakpoint!: number;
  colSize!: number;
  rowSize!: number;

  imgCarousel: ImgCarouselDTO[]=[];
  responsiveOptions!: any;

  zona!: string;

  ngOnInit() {
    if (this.dataUserToken.isAuthenticated()) {
      this.router.navigate(['/principal']);
    }
    this.mybreakpoint = (window.innerWidth <= 850) ? 1 : 3;
    this.colSize = (window.innerWidth <= 850) ? 0 : 2;
    this.rowSize = (window.innerWidth <= 750) ? 1 : 1;

    this.imgCarousel = [
      {url :"assets/img/logo_carousel/Diapositiva3.JPG"},
      {url: "assets/img/logo_carousel/Diapositiva6.JPG"},
      {url: "assets/img/logo_carousel/Diapositiva7.JPG"},
      {url: "assets/img/logo_carousel/Diapositiva8.JPG"},
      {url: "assets/img/logo_carousel/Diapositiva11.JPG"},
      {url: "assets/img/logo_carousel/Diapositiva15.JPG"}
    ]
    this.setTituloNavbar();
  }

  handleSize(event) {
    this.mybreakpoint = (event.target.innerWidth <= 850) ? 1 : 3;
    this.colSize = (event.target.innerWidth <= 850) ? 0 : 2;
    this.rowSize = (event.target.innerWidth <= 750) ? 1 : 1;
  }

  ingresar(event: Event) {
    this.router.navigate(['/principal']);
  }

  login(event: Event) {
    this.loginService.login(this.username.value, this.password.value).subscribe(data => {
      if (data.data == null) {
        this.message.setValue('Credenciales incorrectas');
      } else {
        let getToken = data.data.split(" ");
        //let decoded = jwtDecode<JwtPayload>(getToken[1]);

        this.dataUserToken.saveToken(getToken[1]);

        if (this.loginService.urlRequested) {
          this.router.navigate([this.loginService.urlRequested]);
        } else {
          this.router.navigate(['/principal']);
        }
      }
    },
      error => {
        console.log(error);
        this.message.setValue('Ocurrió un error, vuelve a intentarlo más tarde.');
      });
  }

  public getDataStorage(name: string) {
    if (localStorage.getItem(name) != undefined) {
      return (localStorage.getItem(name));
    } else {
      return null;
    }
  }

  setTituloNavbar() {
    this.zona = environment.ZONA;  
  }

}