import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from '../modals/confirmation-modal/confirmation-modal.component';

@Injectable({
  providedIn: 'root'
})
export class SharedModalsService {

  constructor(private modal: NgbModal) { }

  async openConfirmationModal(message: string, modalClass: 'danger' | 'warning' | 'success' | 'primary' = 'danger', buttonText = 'Confirmer') {
    const modalRef = this.modal.open(ConfirmationModalComponent, {
      size: 'md',
      windowClass: 'modal modal-' + modalClass,
      centered: true
    });
    modalRef.componentInstance.message= message;
    modalRef.componentInstance.modalClass= modalClass;
    modalRef.componentInstance.buttonText = buttonText;
    try {
      return await modalRef.result;
    } catch (exception) {
      return 'canceled';
    }
    
  }
}
