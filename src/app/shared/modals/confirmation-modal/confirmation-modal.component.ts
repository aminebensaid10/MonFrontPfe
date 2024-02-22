import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent implements OnInit {

  message = null;
  buttonText = null;
  modalClass = null;
  title=null;
  cancelButtonText=null;
  
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
