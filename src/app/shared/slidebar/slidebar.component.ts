import { AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-slidebar',
  templateUrl: './slidebar.component.html',
  styleUrls: ['./slidebar.component.css']
})
export class SlidebarComponent implements OnInit {

  public functions: any[];
  constructor(private dataService: DataService,private renderer: Renderer2) { }

  ngAfterViewInit() { 
     this.loadScripts();
    }

  public loadScripts() {
    this.renderExternalScript('assets/js/ace-elements.min.js').onload = () => {
    }
   
    this.renderExternalScript('assets/js/ace-extra.min.js').onload = () => {
    }
    this.renderExternalScript('assets/js/ace.min.js').onload = () => {
    }
  }

  public renderExternalScript(src: string): HTMLScriptElement {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = src;
      script.async = true;
      script.defer = true;
      this.renderer.appendChild(document.body, script);
      return script;
    }


  ngOnInit() {
     this.dataService.get('/api/function/getlisthierarchy').subscribe((response: any[]) => {
      this.functions = response.sort((n1, n2) => {
        if (n1.DisplayOrder > n2.DisplayOrder) {
          return 1;
        } else if (n1.DisplayOrder < n2.DisplayOrder) {
          return -1;
        }
        return 0;
      });
    }, error => this.dataService.handleError(error));
  }

}
