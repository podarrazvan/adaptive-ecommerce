import { Component, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-home-you-may-like-top',
  templateUrl: './home-you-may-like-top.component.html',
  styleUrls: ['./home-you-may-like-top.component.scss']
})
export class HomeYouMayLikeTopComponent {
  @Output() refresh = new EventEmitter();

  onRefresh() {
    this.refresh.emit();
  }
}
