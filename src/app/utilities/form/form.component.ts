import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EventNotificationInfo } from 'src/app/_interface/event';
import { EventService } from 'src/app/services/event.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  public myForm: any;
  @Input() typeForm: string = ''; 
  
  constructor(
    private formBuilder: FormBuilder,
    private sessionService: SessionService,
    private eventService: EventService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }


  public async sendForm( typeForm: string ) {
    let response = undefined;

    if ( typeForm === 'register') {
      response = await this.sessionService.write_local_storage_data( this.myForm.value );

      if ( response ) {
        await this.sessionService.write_session_storage_data( this.myForm.value );
        this.router.navigate(['/games']);
      }
    }

    if ( typeForm === 'login' ) {
      try {
        await this.sessionService.read_local_storage_data( this.myForm.value );
        await this.sessionService.write_session_storage_data( this.myForm.value );
        this.router.navigate(['/games']);

      } catch (error) {
        this.eventService.broadcast(
            new EventNotificationInfo (
              'Aviso',
              'Aun no te has registrado, registrate para continuar',
              'info'
            ))

        this.myForm.reset();
      }
    }
    
  }
}
