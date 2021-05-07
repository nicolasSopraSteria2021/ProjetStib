import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.css']
})
export class ConnectionComponent implements OnInit {
  formLogIn: FormGroup = this.fb.group({
    name:['',[Validators.required]],
    password : ['',Validators.required]
  });

  constructor(public fb : FormBuilder) { }

  ngOnInit(): void {
  }

  logIn() {

  }
}
