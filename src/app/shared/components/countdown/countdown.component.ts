import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CountdownConfig } from 'ngx-countdown';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss'],
})
export class CountdownComponent implements OnInit {
  @Input() endDate: Date = null;
  @Output() done = new EventEmitter<void>();

  config: CountdownConfig;

  private secondsInADay = 86400;
  private secondsInAHour = 3600;

  end: Date;

  ngOnInit(): void {
    this.end = new Date(this.endDate);
    console.log(this.end.getTime);
    this.config = {
      format: this.calculateFormatTime(),
      leftTime: this.calculateRemainingTime(),
    };
  }

  handleEvent(event) {
    event.action = 'done' && this.done.emit();
  }

  private calculateFormatTime() {
    console.log(this.calculateRemainingTime());
    return this.calculateRemainingTime() <= this.secondsInADay
      ? 'HH:mm:ss'
      : 'd HH:mm:ss';
  }

  private calculateRemainingTime() {
    return Math.floor((this.end.getTime() - new Date().getTime()) / 1000);
  }
}
