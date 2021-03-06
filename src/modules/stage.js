import parser from 'mongodb-query-parser';
import { parse } from 'mongodb-stage-validator';

/**
 * Generates an Object representing the stage to be passed to the DataService.
 *
 * @param {Object} state - The state of the stage.
 *
 * @returns {Object} The stage as an object.
 */
export default function generateStage(state) {
  if (!state.isEnabled || !state.stageOperator || state.stage === '') {
    return {};
  }
  const stage = {};
  try {
    parse(`{${state.stageOperator}: ${state.stage}}`);
    stage[state.stageOperator] = parser(state.stage);
  } catch (e) {
    state.error = e.message;
    state.isValid = false;
    return {};
  }
  state.isValid = true;
  state.error = '';
  return stage;
}
