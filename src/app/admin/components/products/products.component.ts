import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClientService } from '../../../services/common/http-client.service';
import { Create_Product } from '../../../contracts/create_product';
import { ListComponent } from './list/list.component';
import { DialogService } from '../../../services/common/dialog.service';
import { QrcodeReadingDialogComponent } from '../../../dialogs/qrcode-reading-dialog/qrcode-reading-dialog.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService, private httpClientService: HttpClientService, private dialogService: DialogService) {
    super(spinner)
  }

    ngOnInit(): void {
      this.showSpinner(SpinnerType.BallAtom);
    }

    @ViewChild(ListComponent) listComponent : ListComponent;
    createdProduct(createdProduct: Create_Product){
      this.listComponent.getProducts();
    }

      showProductQrCodeReading() {
        this.dialogService.openDialog({
          componentType: QrcodeReadingDialogComponent,
          data: null,
          options: {
            width: "1000px"
          },
          afterClosed: () => { }
        });
      }
    }
  