import {
  JupyterLab, JupyterLabPlugin
} from '@jupyterlab/application';

import '../style/index.css';


/**
 * Initialization data for the SeafileContentManagerInterface extension.
 */
const extension: JupyterLabPlugin<void> = {
  id: 'SeafileContentManagerInterface',
  autoStart: true,
  activate: (app: JupyterLab) => {
    console.log('JupyterLab extension SeafileContentManagerInterface is activated!');
  }
};

export default extension;
