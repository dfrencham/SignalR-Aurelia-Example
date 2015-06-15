import 'bootstrap';
import 'bootstrap/css/bootstrap.css!';

export class App {
  configureRouter(config, router){
    config.title = 'Signal-R Test App';
    config.map([
      { route: ['','logViewer'],  moduleId: './log-viewer',      nav: true, title:'Log Viewer' },
      { route: 'about',  moduleId: './about',      nav: true, title:'About' }
    ]);

    this.router = router;
  }
}
