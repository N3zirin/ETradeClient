import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../services/common/models/product.service';
import { List_Product } from '../../../../contracts/list_product';
import { ActivatedRoute } from '@angular/router';
import { FileService } from '../../../../services/common/models/file.service';
import { BaseUrl } from '../../../../contracts/base_url';
import { BasketService } from '../../../../services/common/models/basket.service';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { Create_Basket_Item } from '../../../../contracts/basket/create_basket_item';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../../services/ui/custom-toastr.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent extends BaseComponent implements OnInit{
  constructor(private productService: ProductService,
    readonly activatedRoute: ActivatedRoute,
    readonly fileService: FileService,
    private basketService: BasketService,
    private spinnerService: NgxSpinnerService,
    private customToastrservice: CustomToastrService){
    super(spinnerService)
   }

  currentPageNo: number;
  totalProductCount: number;
  totalPageCount: number;
  pageSize: number = 5;
  pageList: number[] = [];
  baseUrl: BaseUrl;

  products: List_Product[];
  async ngOnInit() {
    this.baseUrl = await this.fileService.getBaseStorageUrl();

    this.activatedRoute.params.subscribe(async params => {
      this.currentPageNo = parseInt(params["pageNo"] ?? 1);
      
      const data: {totalProductCount: number, products: List_Product[]} = await
      this.productService.read(this.currentPageNo - 1, this.pageSize,
       () => {
   
       },
     errorMessage => {
   
     });
     this.products = data.products;
     this.products = this.products.map<List_Product>( p => {
      const listProduct: List_Product = {
          id: p.id,
          createdDate: p.createdDate,
          imagePath: `${p.productImageFiles.length ? p.productImageFiles.find(p => p.showcase).path : ""}`,
          name: p.name,
          updatedDate: p.updatedDate,
          price: p.price,
          stock: p.stock,
          productImageFiles: p.productImageFiles
        };
        return listProduct;
     });
    

     this.totalProductCount = data.totalProductCount;
     this.totalPageCount = Math.ceil(this.totalProductCount / this.pageSize);

     this.pageList = [];
     
     if(this.currentPageNo - 3 <= 1)
      for(let i = 1; i <= 7; i++)
      this.pageList.push(i);

     else if(this.currentPageNo + 3 >= this.totalPageCount)
      for(let i = this.totalPageCount - 6; i <= this.totalPageCount; i++)
        this.pageList.push(i);

     else
     for(let i = this.currentPageNo - 3; i <= this.currentPageNo; i++)
      this.pageList.push(i);
    });

  }

  async addToBasket(product: List_Product){
    this.showSpinner(SpinnerType.BallAtom);
    let _basketItem: Create_Basket_Item = new Create_Basket_Item();
    _basketItem.productId = product.id;
    _basketItem.quantity = 1;
    await this.basketService.add(_basketItem);
    this.hideSpinner(SpinnerType.BallAtom);
    this.customToastrservice.message("Product successfully added to the basket.", "Product added", {
      messageType: ToastrMessageType.Success,
      position: ToastrPosition.TopRight
    })
  }
}
