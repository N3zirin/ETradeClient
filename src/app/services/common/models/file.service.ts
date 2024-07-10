import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Create_Product } from '../../../contracts/create_product';
import { HttpErrorResponse } from '@angular/common/http';
import { List_Product } from '../../../contracts/list_product';
import { Observable, firstValueFrom } from 'rxjs';
import { List_Product_Image } from '../../../contracts/list_product_image';
import { BaseUrl } from '../../../contracts/base_url';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private httpClientService: HttpClientService) { }
  async getBaseStorageUrl() : Promise<BaseUrl>{
    const getObservable: Observable<BaseUrl> = this.httpClientService.get<BaseUrl>({
        controller: "files",
        action: "GetBaseStorageUrl"
    });
    return await firstValueFrom(getObservable);
  }
}