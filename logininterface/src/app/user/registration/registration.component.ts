import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';
import { element } from 'protractor';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private service: UserService, private router: Router) { }

  ngOnInit() {
    this.service.formModel.reset();
  }
  onSubmit(){
    this.service.register().subscribe(
      (res:any)=>{
        if(res.succeded){
          this.service.formModel.reset();
          console.log('success');
        }else{
          res.errors.forEach(element=>{
            switch(element.code){
              case 'Duplicate name':
              console.log('username already taken');
              break;
              default:
              console.log('failed');
              break;
            }
          });
          
        }
      },
      err=>{
        console.log(err);
      }
    )
  }

}
