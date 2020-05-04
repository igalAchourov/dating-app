import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/Core/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {


  model: any = {};

  @Output() cancelRegister = new EventEmitter();

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  cancel() {
    this.cancelRegister.emit(false);
  }


  register() {

    this.authService.register(this.model).subscribe(() => { console.log("registration successful") }, error => console.log(error));
  }

}
