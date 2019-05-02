import {
  JupyterLab, JupyterLabPlugin
} from '@jupyterlab/application';
import {
  ICommandPalette
} from '@jupyterlab/apputils';
import {
  Widget
} from '@phosphor/widgets';

import '../style/index.css';


/**
 * Initialization data for the SeafileContentManagerInterface extension.
 */
const extension: JupyterLabPlugin<void> = {
  id: 'SeafileContentManagerInterface',
  autoStart: true,
  requires: [ICommandPalette],
  activate: (app: JupyterLab, palette: ICommandPalette) => {
    console.log('JupyterLab extension SeafileContentManagerInterface is activated!');

    // create a widget
    let widget:  Widget = new Widget();
    widget.id = 'SeafileInterface';
    widget.title.label = 'Seafile CM Interface';
    widget.title.closable = true;

    // Add application command
    const command: string = 'xkcd:open';
    app.commands.addCommand(command, {
      label: 'Seafile CM Interface',
      execute: () => {
        if (!widget.isAttached) {
          // Attach to main work area
          app.shell.addToMainArea(widget);
        }
        app.shell.activateById(widget.id);
      }
    });
    palette.addItem({command, category: 'Tutorial'});
  }
};

export default extension;
