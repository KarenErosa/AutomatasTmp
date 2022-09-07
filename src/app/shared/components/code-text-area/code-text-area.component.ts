import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TLN } from './tools/tnl';


@Component({
  selector: 'app-code-text-area',
  templateUrl: './code-text-area.component.html',
  styleUrls: ['./code-text-area.component.css']
})
export class CodeTextAreaComponent implements OnInit {

  @Input() $data?: EventEmitter<string>;
  private line?: Number = 1;
  private lines?: Number = 1;

  default:string = "\
def prueba ( a , b , c ) {\n\
\twhile ( a == b ) {\n\
\t\twhile ( c != a ) {\n\
\t\t\tprint ( 'Hola' )\n\
\t\t\tc = prueba ( c , b , a )\n\
\t\t}\n\
\t}\n\
}"
  constructor() { }

  ngOnInit(): void {
    //
  }

  getTLN(id:string){
    TLN.append_line_numbers(id);
  }

  private checkLine(temp: any) {
    const data: string = temp.value.substring(0, temp.selectionStart);
    const arr = data.split('\n');
    return arr.length;
  }
  private checkLines(temp: any) {
    const data: string = temp.value;
    const arr = data.split('\n');
    return arr.length;
  }

  handleKeydown(event: any) {
    if (event.key == 'Tab') {
      event.preventDefault();
      var start = event.target.selectionStart;
      var end = event.target.selectionEnd;
      event.target.value = event.target.value.substring(0, start) + '\t' + event.target.value.substring(end);
      event.target.selectionStart = event.target.selectionEnd = start + 1;
    } else if (event.key == '{') {
      this.agregarCaracterFinal(event, '{', '}', '\n', 1);
    } else if (event.key == "'") {
      this.agregarCaracterFinal(event, "'", "'", '', 1);
    } else if (event.key == '"') {
      this.agregarCaracterFinal(event, '"', '"', '', 1);
    } else if (event.key == '(') {
      this.agregarCaracterFinal(event, ' (', ') ', '  ', 1);
    } else if (event.key == '[') {
      this.agregarCaracterFinal(event, ' [', '] ', '', 1);
    } else if (event.key == '+') {
      this.agregarCaracterFinal(event, ' ', '+ ', '', 3);
    } else if (event.key == '-') {
      this.agregarCaracterFinal(event, ' ', '- ', '', 3);
    } else if (event.key == '*') {
      this.agregarCaracterFinal(event, ' ', '* ', '', 3);
    } else if (event.key == '/') {
      this.agregarCaracterFinal(event, ' ', '/ ', '', 3);
    } else if (event.key == '%') {
      this.agregarCaracterFinal(event, ' ', '% ', '', 3);
    } else if (event.key == '^') {
      this.agregarCaracterFinal(event, ' ', '^ ', '', 3);
    } else if (event.key == ',') {
      this.agregarCaracterFinal(event, ' ', ', ', '', 3);
    } else if (event.key == '.') {
      this.agregarCaracterFinal(event, ' ', '. ', '', 3);
    } else if (event.key == ':') {
      this.agregarCaracterFinal(event, ' ', ': ', '', 3);
    } else if (event.key == ';') {
      this.agregarCaracterFinal(event, ' ', '; ', '', 3);
    } else if (event.key == '=') {
      this.agregarCaracterFinal(event, ' ', '= ', '', 3);
    }
    
    
  }

  private agregarCaracterFinal(event: any, caracterInicio: string, caracterFinal: string, separador: string, newPos: number) {
    event.preventDefault();
    var start = event.target.selectionStart;
    var end = event.target.selectionEnd;
    event.target.value = event.target.value.substring(0, start) + caracterInicio + separador + caracterFinal + event.target.value.substring(end);
    event.target.selectionStart = event.target.selectionEnd = start + newPos;
  }

  handleKeyup(temp: any) {
    this.line = this.checkLine(temp);
    this.lines = this.checkLines(temp);
  }

  getLine() {
    return this.line;
  }

  getLines() {
    return this.lines;
  }
  sendData(textArea: any) {
    if (this.$data) {
      this.$data.emit(textArea.value);
    }
  }
}