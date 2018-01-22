import { INITIAL_STATE as VIEW_INITIAL_STATE } from './view';
import { INITIAL_STATE as FIELDS_INITIAL_STATE } from './fields';
import { INITIAL_STATE as SV_INITIAL_STATE } from './server-version';
import { INITIAL_STATE as STAGE_INITIAL_STATE } from './stages';

/**
 * Namespace changed action.
 */
export const NAMESPACE_CHANGED = 'aggregations/namespace/NAMESPACE_CHANGED';

/**
 * The initial state.
 */
const INITIAL_STATE = '';

/**
 * Reducer function for handle state changes to namespace.
 *
 * @param {String} state - The namespace state.
 * @param {Object} action - The action.
 *
 * @returns {String} The new state.
 */
export default function reducer(state = INITIAL_STATE, action) {
  if (action.type === NAMESPACE_CHANGED) {
    // Set the rest of the state here
    const toret = {
      namespace: action.namespace,
      fields: FIELDS_INITIAL_STATE,
      serverVersion: SV_INITIAL_STATE,
      stages: [
        STAGE_INITIAL_STATE
      ],
      view: VIEW_INITIAL_STATE
    };

    return action.namespace;
  }
  return state;
}

/**
 * Action creator for namespace changed events.
 *
 * @param {String} namespace - The namespace value.
 *
 * @returns {Object} The namespace changed action.
 */
export const namespaceChanged = (namespace) => ({
  type: NAMESPACE_CHANGED,
  namespace: namespace
});
