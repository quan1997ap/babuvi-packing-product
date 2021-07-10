import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent {
  constructor(public translate: TranslateService, private router:Router) {
    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang('en');

    const browserLang: string = translate.getBrowserLang();
    translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');

  }

  //thêm load script zalo trong phần component để khi click menu sẽ hiện luôn nút quan tâm mà không phải load lại
   ngOnInit() { 
    //this.loadScript('https://sp.zalo.me/plugins/sdk.js');
   }

   //thêm load script zalo trong phần component để khi click menu sẽ hiện luôn nút quan tâm mà không phải load lại
  //  public loadScript(url: string) {
  //    const body = <HTMLDivElement> document.body;
  //    const script = document.createElement('script');
  //    script.innerHTML = '';
  //    script.src = url;
  //    script.async = false;
  //    script.defer = true;
  //    body.appendChild(script);
  //  }
}
