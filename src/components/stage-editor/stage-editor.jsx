import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import AceEditor from 'react-ace';
import ace from 'brace';
import classnames from 'classnames';
import Completer from 'models/completer';

import styles from './stage-editor.less';

import 'brace/ext/language_tools';
import 'brace/mode/javascript';
import 'brace/theme/github';

/**
 * Options for the ACE editor.
 */
const OPTIONS = {
  enableLiveAutocompletion: true,
  tabSize: 2,
  fontSize: 12,
  minLines: 1,
  maxLines: Infinity,
  showGutter: true
};

/**
 * Edit a single stage in the aggregation pipeline.
 */
class StageEditor extends PureComponent {
  static displayName = 'StageEditorComponent';

  static propTypes = {
    stage: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    onStageChange: PropTypes.func.isRequired
  }

  /**
   * Set up the autocompleters once on initialization.
   *
   * @param {Object} props - The properties.
   */
  constructor(props) {
    super(props);
    const tools = ace.acequire('ace/ext/language_tools');
    const textCompleter = tools.textCompleter;
    tools.setCompleters([ new Completer('3.4.0', textCompleter) ]);
  }

  /**
   * Need to decorate the change event with the stage index before
   * dispatching.
   *
   * @param {String} value - The value of the stage.
   */
  onStageChange(value) {
    this.props.onStageChange(value, this.props.index);
  }

  /**
   * Render the stage editor component.
   *
   * @returns {Component} The component.
   */
  render() {
    return (
      <div className={classnames(styles['stage-editor'])}>
        <AceEditor
          mode="javascript"
          theme="github"
          width="100%"
          value={this.props.stage}
          onChange={this.onStageChange.bind(this)}
          name={`aggregations-stage-editor-${this.props.index}`}
          setOptions={OPTIONS} />
      </div>
    );
  }
}

export default StageEditor;
export { StageEditor };