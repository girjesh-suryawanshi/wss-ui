import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-track-incident',
  templateUrl: './track-incident.component.html',
  styleUrls: ['./track-incident.component.css']
})
export class TrackIncidentComponent implements OnInit {

  constructor() { }

  isProcessing: boolean;

  incidentSearchFrom :FormGroup

  ngOnInit(): void {

    this.incidentSearchFrom = new FormGroup({
      incidentNumber: new FormControl('', Validators.required),
      });
    
  }

  searchClicked(){

  }

}
