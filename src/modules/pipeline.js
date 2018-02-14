/**
 * Action name prefix.
 */
export const PREFIX = 'aggregations/pipeline';

/**
 * Stage added action name. keep
 */
export const STAGE_ADDED = `${PREFIX}/STAGE_ADDED`;

/**
 * Stage deleted action name. keep
 */
export const STAGE_DELETED = `${PREFIX}/STAGE_DELETED`;

/**
 * Stage moved action name. keep
 */
export const STAGE_MOVED = `${PREFIX}/STAGE_MOVED`;

/**
 * An initial stage.
 */
const EMPTY_STAGE = {
  id: new Date().getTime(),
  stageOperator: null,
  stage: '',
  isValid: true,
  isEnabled: true,
  isExpanded: true
};

/**
 * The initial state.
 */
export const INITIAL_STATE = [ EMPTY_STAGE ];


/**
 * Copy the state.
 *
 * @param {Array} state - The current state.
 *
 * @returns {Array} The copied state.
 */
const copyState = (state) => (state.map(s => Object.assign({}, s)));

/**
 * Add a stage.
 *
 * @param {Object} state - The state.
 *
 * @returns {Object} The new state.
 */
const addStage = (state) => {
  const newState = copyState(state);
  const newStage = { ...EMPTY_STAGE };
  newStage.id = new Date().getTime();
  newState.push(newStage);
  return newState;
};

/**
 * Delete a stage.
 *
 * @param {Object} state - The state.
 * @param {Object} action - The action.
 *
 * @returns {Object} The new state.
 */
const deleteStage = (state, action) => {
  const newState = copyState(state);
  newState.splice(action.index, 1);
  return newState;
};

/**
 * Move a stage in the pipeline.
 *
 * @param {Object} state - The state.
 * @param {Object} action - The action.
 *
 * @returns {Object} The new state.
 */
const moveStage = (state, action) => {
  if (action.fromIndex === action.toIndex) return state;
  const newState = copyState(state);
  newState.splice(action.toIndex, 0, newState.splice(action.fromIndex, 1)[0]);
  return newState;
};


/**
 * To not have a huge switch statement in the reducer.
 */
const MAPPINGS = {};

MAPPINGS[STAGE_ADDED] = addStage;
MAPPINGS[STAGE_DELETED] = deleteStage;
MAPPINGS[STAGE_MOVED] = moveStage;

Object.freeze(MAPPINGS);

/**
 * Reducer function for handle state changes to pipeline.
 *
 * @param {Array} state - The pipeline state.
 * @param {Object} action - The action.
 *
 * @returns {Array} The new state.
 */
export default function reducer(state = INITIAL_STATE, action) {
  const fn = MAPPINGS[action.type];
  return fn ? fn(state, action) : state;
}

/**
 * Action creator for adding a stage.
 *
 * @returns {Object} the stage added action.
 */
export const stageAdded = () => ({
  type: STAGE_ADDED
});

/**
 * Action creator for stage deleted events.
 *
 * @param {Number} index - The index of the stage.
 *
 * @returns {Object} The stage deleted action.
 */
export const stageDeleted = (index) => ({
  type: STAGE_DELETED,
  index: index
});

/**
 * Action creator for stage moved events.
 *
 * @param {Number} fromIndex - The original index.
 * @param {Number} toIndex - The index to move to.
 *
 * @returns {Object} The stage moved action.
 */
export const stageMoved = (fromIndex, toIndex) => ({
  type: STAGE_MOVED,
  fromIndex: fromIndex,
  toIndex: toIndex
});

