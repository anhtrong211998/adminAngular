import { Component, OnInit, ViewChild } from '@angular/core';
import { TreeComponent } from 'angular-tree-component';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { MessageContstants } from 'src/app/core/common/message.constants';
import { DataService } from 'src/app/core/services/data.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { UtilityService } from 'src/app/core/services/utility.service';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit {

  
  @ViewChild('addEditModal', {static: false}) public addEditModal: ModalDirective;

  @ViewChild(TreeComponent, {static: false})
  private treeProductCategory: TreeComponent;
  public filter: string = '';
  public entity: any;
  public functionId: string;
  public _productCategoryHierachy: any[];
  public _productCategories: any[];
  constructor(private _dataService: DataService,
    private notificationService: NotificationService,
    private utilityService: UtilityService) { }

  ngOnInit() {
    this.loadData();
    this.getListForDropdown();
  }
  public createAlias() {
    this.entity.Alias = this.utilityService.MakeSeoTitle(this.entity.Name);
  }
  //Load data
  public loadData() {
    this._dataService.get('/api/productCategory/getall?filter=' + this.filter)
      .subscribe((response: any[]) => {
        this._productCategoryHierachy = this.utilityService.Unflatten2(response);
        this._productCategories = response;
      }, error => this._dataService.handleError(error));
  }
  public getListForDropdown() {
    this._dataService.get('/api/productCategory/getallhierachy')
      .subscribe((response: any[]) => {
        this._productCategories = response;
      }, error => this._dataService.handleError(error));
  }
  //Show add form
  public showAddModal() {
    this.entity = {};
    this.addEditModal.show();
  }
  //Show edit form
  public showEdit(id: string) {
    this._dataService.get('/api/productCategory/detail/' + id).subscribe((response: any) => {
      this.entity = response;
      this.addEditModal.show();
    }, error => this._dataService.handleError(error));
  }

  //Action delete
  public deleteConfirm(id: string): void {
    if(confirm("Are you sure to delete ")){
      this._dataService.delete('/api/productCategory/delete', 'id', id).subscribe((response: any) => {
        this.notificationService.printSuccessMessage(MessageContstants.DELETED_OK_MSG);
        this.loadData();
      });
    }
  }
  //Click button delete turn on confirm
  // public delete(id: string) {
  //   this.notificationService.printConfirmationDialog(MessageContstants.CONFIRM_DELETE_MSG, () => this.deleteConfirm(id));
  // }
  //Save change for modal popup
  public saveChanges(valid: boolean) {
    if (valid) {
      if (this.entity.ID == undefined) {
        this._dataService.post('/api/productCategory/add', JSON.stringify(this.entity)).subscribe((response: any) => {
          this.loadData();
          this.addEditModal.hide();
          this.notificationService.printSuccessMessage(MessageContstants.CREATED_OK_MSG);
        }, error => this._dataService.handleError(error));
      }
      else {
        this._dataService.put('/api/productCategory/update', JSON.stringify(this.entity)).subscribe((response: any) => {
          this.loadData();
          this.addEditModal.hide();
          this.notificationService.printSuccessMessage(MessageContstants.UPDATED_OK_MSG);
        }, error => this._dataService.handleError(error));

      }
    }

  }

  public onSelectedChange($event) {
    console.log($event);
  }

}
