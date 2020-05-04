import { Component, OnInit } from '@angular/core';
import { ValuesService } from 'src/app/Core/values.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  values: any;
  registerMode: boolean = false;

  constructor(private valuesService: ValuesService) { }

  ngOnInit(): void {

  }

  registerToggle() {
    this.registerMode = true;
  }



  cancelRegisterMode(registerMode: boolean) {

    this.registerMode = registerMode;
  }

}
