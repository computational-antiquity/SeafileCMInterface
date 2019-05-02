import {
  JupyterLab, JupyterLabPlugin, ILayoutRestorer
} from '@jupyterlab/application';
import {
  ICommandPalette, InstanceTracker
} from '@jupyterlab/apputils';
import {
  JSONExt
} from '@phosphor/coreutils';
import {
  Widget
} from '@phosphor/widgets';
import {
  Message
} from '@phosphor/messaging';

import '../style/index.css';

class SeafileWidget extends Widget {
 /**
 Build Seafile Interface Widget
 **/
 constructor() {
   super();

   this.id = 'SeafileInterface';
   this.title.label = 'Seafile CM Interface';
   this.title.closable = true;
   this.addClass('jp-seafileInterfaceWidget');

   this.img = document.createElement('img');
   this.img.className = 'jp-seafileInterfaceInput';
   this.node.appendChild(this.img);

   this.img.insertAdjacentHTML('afterend',
   `
   <div class="jp-seafileAttribution">
     <a href="https://creativecommons.org/licenses/by-nc/2.5/" class="jp-seafileAttribution" target="_blank">
       <img src="https://licensebuttons.net/l/by-nc/2.5/80x15.png" />
     </a>
   </div>
   `
   );
 }

 readonly img: HTMLImageElement;

 onUpdateRequest(msg: Message): void {
   fetch('https:////egszlpbmle.execute-api.us-east-1.amazonaws.com/prod').then(response => {
     return response.json();
   }).then(data => {
     this.img.src = data.img;
     this.img.alt = data.title;
     this.img.title = data.alt;
   });
 }
};

function activate(app: JupyterLab, palette: ICommandPalette, restorer: ILayoutRestorer) {
  console.log('JupyterLab extension SeafileContentManagerInterface is activated!');

  // create a widget
  let widget:  SeafileWidget = new SeafileWidget();


  // Add application command
  const command: string = 'xkcd:open';
  app.commands.addCommand(command, {
    label: 'Seafile CM Interface',
    execute: () => {
      if (!widget) {
        widget = new SeafileWidget();
        widget.update();
      }
      if (!tracker.has(widget)) {
        tracker.add(widget);
      }
      if (!widget.isAttached) {
        // Attach to main work area
        app.shell.addToMainArea(widget);
      } else {
        widget.update();
      }
      app.shell.activateById(widget.id);
    }
  });
  palette.addItem({command, category: 'Tutorial'});

  let tracker = new InstanceTracker<Widget>({ namespace: 'seafile'});
  restorer.restore(tracker, {
    command,
    args: () => JSONExt.emptyObject,
    name: () => 'seafile'
  });
};


/**
 * Initialization data for the SeafileContentManagerInterface extension.
 */
const extension: JupyterLabPlugin<void> = {
  id: 'SeafileContentManagerInterface',
  autoStart: true,
  requires: [ICommandPalette, ILayoutRestorer],
  activate: activate
};

export default extension;
