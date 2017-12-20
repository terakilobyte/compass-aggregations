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
    snippet: 'function ${1?:function_name}(${2:argument}) {\n\t\t${3:...}\n}'
  },
  {
    name: '$bucket',
    value: '$bucket',
    label: '$bucket',
    score: 1,
    meta: 'stage',
    version: '3.4.0',
    snippet: '{\n  groupBy: ${1:expr},\n  boundaries: [ ${2:boundaries} ],\n  default: ${3},\n  output: {\n     ${4}: { ${5} },\n}\n  }\n}'
  },
  {
    name: '$bucketAuto',
    value: '$bucketAuto',
    label: '$bucketAuto',
    score: 1,
    meta: 'stage',
    version: '3.4.0',
    snippet: ''
  },
  {
    name: '$collStats',
    value: '$collStats',
    label: '$collStats',
    score: 1,
    meta: 'stage',
    version: '3.4.0',
    snippet: '{\n  latencyStats: {\n    histograms: true\n  },\n  storageStats: {}\n}'
  },
  {
    name: '$count',
    value: '$count',
    label: '$count',
    score: 1,
    meta: 'stage',
    version: '2.2.0',
    snippet: ''
  },
  {
    name: '$currentOp',
    value: '$currentOp',
    label: '$currentOp',
    score: 1,
    meta: 'stage',
    version: '3.6.0',
    snippet: ''
  },
  {
    name: '$facet',
    value: '$facet',
    label: '$facet',
    score: 1,
    meta: 'stage',
    version: '3.4.0',
    snippet: ''
  },
  {
    name: '$geoNear',
    value: '$geoNear',
    label: '$geoNear',
    score: 1,
    meta: 'stage',
    version: '2.4.0',
    snippet: ''
  },
  {
    name: '$graphLookup',
    value: '$graphLookup',
    label: '$graphLookup',
    score: 1,
    meta: 'stage',
    version: '3.4.0',
    snippet: ''
  },
  {
    name: '$group',
    value: '$group',
    label: '$group',
    score: 1,
    meta: 'stage',
    version: '2.2.0',
    snippet: ''
  },
  {
    name: '$indexStats',
    value: '$indexStats',
    label: '$indexStats',
    score: 1,
    meta: 'stage',
    version: '3.2.0',
    snippet: ''
  },
  {
    name: '$limit',
    value: '$limit',
    label: '$limit',
    score: 1,
    meta: 'stage',
    version: '2.2.0',
    snippet: ''
  },
  {
    name: '$listLocalSessions',
    value: '$listLocalSessions',
    label: '$listLocalSessions',
    score: 1,
    meta: 'stage',
    version: '3.6.0',
    snippet: ''
  },
  {
    name: '$listSessions',
    value: '$listSessions',
    label: '$listSessions',
    score: 1,
    meta: 'stage',
    version: '3.6.0',
    snippet: ''
  },
  {
    name: '$lookup',
    value: '$lookup',
    label: '$lookup',
    score: 1,
    meta: 'stage',
    version: '3.2.0',
    snippet: ''
  },
  {
    name: '$match',
    value: '$match',
    label: '$match',
    score: 1,
    meta: 'stage',
    version: '2.2.0',
    snippet: ''
  },
  {
    name: '$out',
    value: '$out',
    label: '$out',
    score: 1,
    meta: 'stage',
    version: '2.2.0',
    snippet: ''
  },
  {
    name: '$project',
    value: '$project',
    label: '$project',
    score: 1,
    meta: 'stage',
    version: '2.2.0',
    snippet: ''
  },
  {
    name: '$redact',
    value: '$redact',
    label: '$redact',
    score: 1,
    meta: 'stage',
    version: '2.6.0',
    snippet: ''
  },
  {
    name: '$replaceRoot',
    value: '$replaceRoot',
    label: '$replaceRoot',
    score: 1,
    meta: 'stage',
    version: '3.4.0',
    snippet: ''
  },
  {
    name: '$sample',
    value: '$sample',
    label: '$sample',
    score: 1,
    meta: 'stage',
    version: '3.2.0',
    snippet: ''
  },
  {
    name: '$skip',
    value: '$skip',
    label: '$skip',
    score: 1,
    meta: 'stage',
    version: '2.2.0',
    snippet: ''
  },
  {
    name: '$sort',
    value: '$sort',
    label: '$sort',
    score: 1,
    meta: 'stage',
    version: '2.2.0',
    snippet: ''
  },
  {
    name: '$sortByCount',
    value: '$sortByCount',
    label: '$sortByCount',
    score: 1,
    meta: 'stage',
    version: '3.4.0',
    snippet: ''
  },
  {
    name: '$unwind',
    value: '$unwind',
    label: '$unwind',
    score: 1,
    meta: 'stage',
    version: '2.2.0',
    snippet: ''
  }
];

/**
 * The list of stage operator names.
 */
const STAGE_OPERATOR_NAMES = STAGE_OPERATORS.map(op => op.name);

export default STAGE_OPERATORS;
export { STAGE_OPERATOR_NAMES };
