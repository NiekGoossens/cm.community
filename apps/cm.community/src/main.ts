import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
// import { ComponentFeedComponent } from './app/component-feed/component-feed.component'; 

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
