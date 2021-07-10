import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, ChangeDetectorRef, forwardRef } from '@angular/core';
// import { AdminPermissionModel } from '../../../model/admin-permission.model';
import { ChangeDetectionStrategy } from '@angular/compiler/src/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-pagination',
  template: `
  <div class="bgff pad10">
    <ng-content></ng-content>
    <div class="w100">
      <nav aria-label="Page navigation example" class="txtAlign-center">
        <ul class="pagination" style="display: inline-block;">
          <li class="page-item">
            <a class="page-link unactiveClass" (click)="primeiraPag()" [ngClass]="disPrevious ? 'disabled' : 'bor-corde corbl'">«</a>
          </li>
          <li class="page-item">
            <a class="page-link unactiveClass" (click)="previousPagina()" [ngClass]="disPrevious ? 'disabled' : 'bor-corde corbl'"><</a>
          </li>
          <li class="page-item" 
              *ngFor="let pag of arrayPages">
            <a class="page-link" (click)="mudaPag(pag)" [ngClass]="pag === currentPage ? 'acctiveClass' : 'unactiveClass'">
              {{ pag }}
            </a>
          </li>
          <li class="page-item">
            <a class="page-link unactiveClass" (click)="nextPagina()" [ngClass]="disNext ? 'disabled' : 'bor-corde corbl'">></a>
          </li>
          <li class="page-item">
            <a class="page-link unactiveClass" (click)="ultimaPag()" [ngClass]="disNext ? 'disabled' : 'bor-corde corbl'">»</a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
  `,
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  
  @Input('per_page') per_page: number;
  @Input('page_data') page_data: any[];
  @Output() mudouPagina = new EventEmitter();
  
  totalPages: number;
  arrayPages: number[];
  linkNulo = 'javascript:void(0)';

  realPageData: any[];
  perPageData: number;
  currentPage: number;
  disNext: boolean = false;
  disPrevious: boolean = false;

  constructor(private cdr: ChangeDetectorRef) {
    this.disPrevious = false;
  }

  ngOnInit() {
    this.realPageData = this.page_data;
    this.perPageData = this.per_page;
    this.currentPage = 1;
    this.disabledChecking();
  }

  ngOnChanges(changes: SimpleChanges){

    if(changes.page_data && changes.page_data.currentValue) {
      this.realPageData = changes.page_data.currentValue;
    }

    if(changes.per_page && changes.per_page.currentValue) {
      this.perPageData = changes.per_page.currentValue;
    }

    if(!this.isExistData(this.realPageData)) {
      this.totalPages = 0
    } else {
      this.totalPages = (this.realPageData.length%this.perPageData) !== 0 ?  Math.ceil(this.realPageData.length/this.perPageData) : Math.floor(this.realPageData.length/this.perPageData);
    }
    this.listaPaginas();
  }

  isExistData(item: any[]): boolean {
    if(item && item.length !== 0) return true;
    return false;
  }

  listaPaginas() {
    this.arrayPages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      this.arrayPages.push(i);
    }
  }

  mudaPag(pag: number) {
    this.currentPage = pag;
    this.mudouPagina.emit({valor: pag});
    this.disabledChecking();
    this.cdr.detectChanges();
  }

  nextPagina() {
    if (this.currentPage < this.totalPages) {
      this.currentPage = this.currentPage + 1;
      this.mudouPagina.emit({valor: this.currentPage});
      this.disabledChecking();
      this.cdr.detectChanges();
    }
  }

  previousPagina() {
    if (this.currentPage > 1) {
      this.currentPage = this.currentPage - 1;
      this.mudouPagina.emit({valor: this.currentPage});
      this.disabledChecking();
      this.cdr.detectChanges();
    }
  }

  primeiraPag() {
    this.mudaPag(1);
    this.disabledChecking();
    this.cdr.detectChanges();
  }

  ultimaPag() {
    this.mudaPag(this.totalPages);
    this.disabledChecking();
    this.cdr.detectChanges();
  }

  disabledChecking() {
    this.disPrevious = this.currentPage === 1;
    this.disNext = this.currentPage === this.totalPages;
  }

}