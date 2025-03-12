import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from '@otc/app.component';
import { appConfig } from '@otc/app.config';

bootstrapApplication(AppComponent, appConfig).catch(err => console.error(err));
