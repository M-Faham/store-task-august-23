import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [RouterLink, NgIf, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatCheckboxModule, MatProgressSpinnerModule],

})
export class LoginComponent implements OnInit {



  loginForm: UntypedFormGroup;


  constructor(
    private _formBuilder: UntypedFormBuilder,
    private _router: Router,
  ) {
  }

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required],
      rememberMe: [''],
    });
  }


  signIn(): void {

    if (this.loginForm.valid) {
      const u = this.loginForm.value.username;
      const p = this.loginForm.value.password;
      if (u === 'admin' && p === 'admin') {
        this._router.navigate(['dashboard']);
      } else if (u === 'user' && p === 'user') {
        this._router.navigate(['store']);
      }
    }
  }

}
