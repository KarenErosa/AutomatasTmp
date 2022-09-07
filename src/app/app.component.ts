import { Component } from '@angular/core';
import {TLN} from './tnl'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'automatas';
  getTLN(){
    TLN.append_line_numbers('test');
  }  
}

