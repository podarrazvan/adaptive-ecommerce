import { environment } from './../../../../environments/environment';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


import { Init } from './tinymce.config';

@Component({
  selector: 'text-editor',
  templateUrl: 'tinymce.component.html'
})
export class TinyMCEComponent implements OnInit {
  public Init: typeof Init = Init;
  public readonly APIKey: string = environment.tinyMCE;

  @Input()
  public initialValue: string;

  @Output()
  public contentChanged: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  public closeModal: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  public ngOnInit(): void {
    this.Init.init_instance_callback = el => {
      el.on('keyup', ev => {
        if (ev.keyCode === 27) {
          this.closeModal.emit();
        }
      });
    };
  }
}
