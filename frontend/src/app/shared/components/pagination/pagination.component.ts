import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  currentPage = 1;
  @Input() haveNext: boolean;
  @Output() nextPage = new EventEmitter();
  @Output() previousPage = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  previous() {
    this.currentPage--;
    this.previousPage.emit();
  }

  next() {
    this.currentPage++;
    this.nextPage.emit();
  }
}
