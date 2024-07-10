import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from '../../base/base.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent, DeleteState } from '../../dialogs/delete-dialog/delete-dialog.component';
import { HttpClientService } from '../../services/common/http-client.service';
import { AlertifyService, MessageType, Position } from '../../services/admin/alertify.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DialogService } from '../../services/common/dialog.service';

declare var $: any;

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  constructor(
    private element: ElementRef,
    private _renderer: Renderer2,
    private httpClientService: HttpClientService,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog,
    private alertifyService: AlertifyService,
    private dialogService: DialogService
  ) {
    const img =_renderer.createElement("img");
    img.setAttribute("src", "../../../../../assets/close.png");
    img.setAttribute("style", "cursor: pointer;");
    img.width = 25;
    img.height = 25;
    _renderer.appendChild(element.nativeElement, img);
   }

   @Input() id: string;
   @Input() controller: string;
   @Output() callBack: EventEmitter<any> = new EventEmitter();

  @HostListener("click")
   async onclick() {
    this.dialogService.openDialog({
      componentType: DeleteDialogComponent,
      data: DeleteState.Yes,
      
      afterClosed: async () => {
        this.spinner.show(SpinnerType.BallAtom);
        const td: HTMLTableCellElement = this.element.nativeElement;
        this.httpClientService.delete({
          controller: this.controller
        }, this.id).subscribe(data => {
          $(td.parentElement).animate({
            opacity:0,
            left: "+=50",
            height: "toogle"
          }, 700, () => {
            this.callBack.emit();
            this.alertifyService.message(`${this.controller == 'roles' ? 'Role' : 'Product'} deleted successfully.`, {
              dismissOthers: true,
              messageType: MessageType.Success,
              position: Position.TopRight
            });
          }); 
        }, (errorResponse: HttpErrorResponse) =>{
          this.spinner.hide(SpinnerType.BallAtom);
          this.alertifyService.message("Unexpected error occurred while deleting the item", {
            dismissOthers: true,
            messageType: MessageType.Error,
            position: Position.TopRight
        });
      });
    }
    });
}


  //  openDialog(afterClosed: any): void {
  //   const dialogRef = this.dialog.open(DeleteDialogComponent, {
  //     data: DeleteState.Yes,
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if(result == DeleteState.Yes){
  //       afterClosed();
  //     }
  //   });
  // }
}

