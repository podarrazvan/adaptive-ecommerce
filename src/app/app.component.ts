import { Component, OnInit } from '@angular/core';

declare var tinymce: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ecommerce';

  ngOnInit (){
    tinymce.init(
      {
          selector: "tinyMce"
      });
  }
}
