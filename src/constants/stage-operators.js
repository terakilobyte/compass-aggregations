/**
 * The stage operators.
 */
const STAGE_OPERATORS = [
  {
    name: '$addFields',
    value: '$addFields',
    label: '$addFields',
    score: 1,
    meta: 'stage',
    version: '3.4.0',
    snippet: '{\n  ${1:field}: ${2:expr}, ${3:...}\n}'
  },
  {
    name: '$bucket',
    value: '$bucket',
    label: '$bucket',
    score: 1,
    meta: 'stage',
    version: '3.4.0',
    snippet: '{\n  groupBy: ${1:expr},\n  boundaries: [ ${2:lowerbound}, ${3:...} ],\n  default: ${4:literal},\n  output: {\n     ${5:field}: { ${6:accumulator} }, ${7:...}\n  }\n}'
  },
  {
    name: '$bucketAuto',
    value: '$bucketAuto',
    label: '$bucketAuto',
    score: 1,
    meta: 'stage',
    version: '3.4.0',
    snippet: '{\n  groupBy: ${1:expr},\n  buckets: ${2:0},\n  output: {\n    ${3:field}: ${4:accumulator}, ${5:...}\n  },\ngranularity: \'${6}\'\n}'
  },
  {
    name: '$collStats',
    value: '$collStats',
    label: '$collStats',
    score: 1,
    meta: 'stage',
    version: '3.4.0',
    snippet: '{\n  latencyStats: {\n    histograms: ${1:false}\n  },\n  storageStats: {${2:}},\n  count: {${3}}\n}'
  },
  {
    name: '$count',
    value: '$count',
    label: '$count',
    score: 1,
    meta: 'stage',
    version: '2.2.0',
    snippet: '${1:0}'
  },
  {
    name: '$currentOp',
    value: '$currentOp',
    label: '$currentOp',
    score: 1,
    meta: 'stage',
    version: '3.6.0',
    snippet: '{\n  allUsers: ${1:false},\n  idleConnections: ${2:false}\n}'
  },
  {
    name: '$facet',
    value: '$facet',
    label: '$facet',
    score: 1,
    meta: 'stage',
    version: '3.4.0',
    snippet: '{\n  ${1:field}: [ ${2:stage}, ${3:...} ], ${4:...}\n}'
  },
  {
    name: '$geoNear',
    value: '$geoNear',
    label: '$geoNear',
    score: 1,
    meta: 'stage',
    version: '2.4.0',
    snippet: '{\n  ${1:geoNear options}\n}'
  },
  {
    name: '$graphLookup',
    value: '$graphLookup',
    label: '$graphLookup',
    score: 1,
    meta: 'stage',
    version: '3.4.0',
    snippet: '{\n  from: ${1:collection},\n' +
    '  startWith: ${2:expr},\n' +
    '  connectFromField: \'${3}\',\n' +
    '  connectToField: \'${4}\',\n' +
    '  as: \'${5}\',\n' +
    '  maxDepth: ${6:0},\n' +
    '  depthField: \'${7}\',\n' +
    '  restrictSearchWithMatch: {${8}}\n}'
  },
  {
    name: '$group',
    value: '$group',
    label: '$group',
    score: 1,
    meta: 'stage',
    version: '2.2.0',
    snippet: '{\n  _id: ${1:expr},\n  ${2:field}: {\n    ${3:accumulator}: ${4:expr}\n  }\n}'
  },
  {
    name: '$indexStats',
    value: '$indexStats',
    label: '$indexStats',
    score: 1,
    meta: 'stage',
    version: '3.2.0',
    snippet: '{\n  ${1}\n}'
  },
  {
    name: '$limit',
    value: '$limit',
    label: '$limit',
    score: 1,
    meta: 'stage',
    version: '2.2.0',
    snippet: '${1:1}'
  },
  {
    name: '$listLocalSessions',
    value: '$listLocalSessions',
    label: '$listLocalSessions',
    score: 1,
    meta: 'stage',
    version: '3.6.0',
    snippet: '{\n  ${1}\n}'
  },
  {
    name: '$listSessions',
    value: '$listSessions',
    label: '$listSessions',
    score: 1,
    meta: 'stage',
    version: '3.6.0',
    snippet: '{\n  {${1}}\n}'
  },
  {
    name: '$lookup',
    value: '$lookup',
    label: '$lookup',
    score: 1,
    meta: 'stage',
    version: '3.2.0',
    snippet: '{\n  from: ${1:collection},\n' +
    '  localField: ${2:field},\n' +
    '  foreignField: ${3:field},\n' +
    '  as: [${4}]\n}'
  },
  {
    name: '$match',
    value: '$match',
    label: '$match',
    score: 1,
    meta: 'stage',
    version: '2.2.0',
    snippet: '{\n  ${1:query}\n}'
  },
  {
    name: '$out',
    value: '$out',
    label: '$out',
    score: 1,
    meta: 'stage',
    version: '2.2.0',
    snippet: '{\n  ${1:collection}\n}'
  },
  {
    name: '$project',
    value: '$project',
    label: '$project',
    score: 1,
    meta: 'stage',
    version: '2.2.0',
    snippet: '{\n  ${1:project specifications}\n}'
  },
  {
    name: '$redact',
    value: '$redact',
    label: '$redact',
    score: 1,
    meta: 'stage',
    version: '2.6.0',
    snippet: '{\n  ${1:expr}\n}'
  },
  {
    name: '$replaceRoot',
    value: '$replaceRoot',
    label: '$replaceRoot',
    score: 1,
    meta: 'stage',
    version: '3.4.0',
    snippet: '{\n  newRoot: {${1}}\n}'
  },
  {
    name: '$sample',
    value: '$sample',
    label: '$sample',
    score: 1,
    meta: 'stage',
    version: '3.2.0',
    snippet: '{\n  size: ${1:1}\n}'
  },
  {
    name: '$skip',
    value: '$skip',
    label: '$skip',
    score: 1,
    meta: 'stage',
    version: '2.2.0',
    snippet: '{\n  ${1}\n}'
  },
  {
    name: '$sort',
    value: '$sort',
    label: '$sort',
    score: 1,
    meta: 'stage',
    version: '2.2.0',
    snippet: '{\n  ${1:field}: ${2:1}, ${3:...}\n}'
  },
  {
    name: '$sortByCount',
    value: '$sortByCount',
    label: '$sortByCount',
    score: 1,
    meta: 'stage',
    version: '3.4.0',
    snippet: '{\n  ${1:expr}\n}'
  },
  {
    name: '$unwind',
    value: '$unwind',
    label: '$unwind',
    score: 1,
    meta: 'stage',
    version: '2.2.0',
    snippet: '{\n  path: ${1:field path},\n' +
    '  includeArrayIndex: \'${2}\',\n' +
    '  preserveNullAndEmptyArrays: ${3:false}\n}'
  }
];

/**
 * The list of stage operator names.
 */
const STAGE_OPERATOR_NAMES = STAGE_OPERATORS.map(op => op.name);

export default STAGE_OPERATORS;
export { STAGE_OPERATOR_NAMES };
