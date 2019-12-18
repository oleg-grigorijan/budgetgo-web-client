import {enableProdMode, TRANSLATIONS, TRANSLATIONS_FORMAT} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';

if (environment.production) {
    enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule, {
    providers: [
        {provide: TRANSLATIONS, useValue: ''},
        {provide: TRANSLATIONS_FORMAT, useValue: 'xlf'}
    ]
}).catch(err => console.error(err));
