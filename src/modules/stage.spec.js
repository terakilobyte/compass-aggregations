import reducer, {
  stageChanged,
  stageCollapseToggled,
  stageOperatorSelected,
  stageToggled,
  STAGE_CHANGED,
  STAGE_COLLAPSE_TOGGLED,
  STAGE_OPERATOR_SELECTED,
  STAGE_TOGGLED,
  generateStage
} from 'modules/stage';
import bson from 'bson';

describe('Stage module', () => {
  describe('#reducer', () => {
    context('when the action is undefined', () => {
      it('returns the default state', () => {
        expect(reducer(undefined, {type: 'test'})[0].stage).to.equal('');
      });
    });

    context('when the action is stage changed', () => {
      it('returns the new state', () => {
        expect(reducer(undefined, stageChanged('{}', 0))[0].stage).to.equal('{}');
      });
    });

    context('when the action is stage collapse toggled', () => {
      it('returns the new state', () => {
        expect(reducer(undefined, stageCollapseToggled(0))[0].isExpanded).to.equal(false);
      });
    });

    context('when the action is stage toggled', () => {
      it('returns the new state', () => {
        expect(reducer(undefined, stageToggled(0))[0].isEnabled).to.equal(false);
      });
    });

    context('when the action is stage operator selected', () => {
      context('when the stage is expanded', () => {
        it('returns the new state', () => {
          expect(reducer(undefined, stageOperatorSelected(0, '$collStats'))[0].stageOperator).to.equal('$collStats');
        });
      });

      context('when the stage is not expanded', () => {
        const state = [{
          isExpanded: false,
          stage: ''
        }];

        it('set the stage to expanded', () => {
          expect(reducer(state, stageOperatorSelected(0, '$collStats'))[0].isExpanded).to.equal(true);
        });

        it('returns the new state', () => {
          expect(reducer(state, stageOperatorSelected(0, '$collStats'))[0].stageOperator).to.equal('$collStats');
        });
      });
    });
  });
  describe('#stageChanged', () => {
    it('returns the STAGE_CHANGED action', () => {
      expect(stageChanged('{}', 0)).to.deep.equal({
        type: STAGE_CHANGED,
        index: 0,
        stage: '{}'
      });
    });
  });

  describe('#stageCollapseToggled', () => {
    it('returns the STAGE_COLLAPSE_TOGGLED action', () => {
      expect(stageCollapseToggled(0)).to.deep.equal({
        type: STAGE_COLLAPSE_TOGGLED,
        index: 0
      });
    });
  });

  describe('#stageOperatorSelected', () => {
    it('returns the STAGE_OPERATOR_SELECTED action', () => {
      expect(stageOperatorSelected(0, '$collStats')).to.deep.equal({
        type: STAGE_OPERATOR_SELECTED,
        index: 0,
        stageOperator: '$collStats'
      });
    });
  });

  describe('#stageToggled', () => {
    it('returns the STAGE_TOGGLED action', () => {
      expect(stageToggled(0)).to.deep.equal({
        type: STAGE_TOGGLED,
        index: 0
      });
    });
  });

  describe('generating stage object', () => {
    describe('invalid stage', () => {
      it('handles an empty stage', () => {
        const stage = {
          id: new Date().getTime(),
          stageOperator: '$bucket',
          stage: '',
          isValid: true,
          isEnabled: true,
          isExpanded: true
        };
        expect(generateStage(stage)).to.deep.equal({});
      });
      it('ignores an invalid stage', () => {
        const stage = {
          id: new Date().getTime(),
          stageOperator: null,
          stage: '{x: 1}',
          isValid: false,
          isEnabled: true,
          isExpanded: true
        };
        expect(generateStage(stage)).to.deep.equal({});
      });
      it('ignores a toggled stage', () => {
        const stage = {
          id: new Date().getTime(),
          stageOperator: null,
          stage: '{x: 1}',
          isValid: true,
          isEnabled: false,
          isExpanded: true
        };
        expect(generateStage(stage)).to.deep.equal({});
      });
    });

    describe('#generateStage', () => {
      it('handles the default stage', () => {
        const stage = {
          id: new Date().getTime(),
          stageOperator: null,
          stage: '',
          isValid: true,
          isEnabled: true,
          isExpanded: true
        };
        expect(generateStage(stage)).to.deep.equal({});
      });
      it('handles a nested object', () => {
        const stage = {
          id: 0, isEnabled: true, isExpanded: true, isValid: true, snippet: '',
          stageOperator: '$addFields',
          stage: '{\n       totalHomework: { $sum: "$homework" } ,\n       totalQuiz: { $sum: "$quiz" }\n  \n}'
        };
        expect(generateStage(stage)).to.deep.equal({
          '$addFields': {
            totalHomework: { $sum: '$homework' },
            totalQuiz: { $sum: '$quiz' }
          }
        });
      });
      it('handles multiple types', () => {
        const stage = {
          id: 0, isEnabled: true, isExpanded: true, isValid: true, snippet: '',
          stageOperator: '$bucket',
          stage: '{\n     groupBy: "$price",\n     boundaries: [ 0, 200, 400 ],\n     default: "Other",\n     output: {\n       "count": { $sum: 1 },\n       "titles" : { $push: "$title" }\n     }\n   }'
        };
        expect(generateStage(stage)).to.deep.equal({
          '$bucket': {
            groupBy: '$price',
            boundaries: [ 0, 200, 400 ],
            default: 'Other',
            output: {
              count: { $sum: 1 },
              titles: { $push: '$title' }
            }
          }
        });
      });
      it('handles constants', () => {
        const stage = {
          id: 0, isEnabled: true, isExpanded: true, isValid: true, snippet: '',
          stageOperator: '$count',
          stage: '100'
        };
        expect(generateStage(stage)).to.deep.equal({'$count': 100});
      });
      it('handles BSON types', () => {
        const stage = {
          id: 0, isEnabled: true, isExpanded: true, isValid: true, snippet: '',
          stageOperator: '$match',
          stage: '{\n' +
          '  code: Code(\'some code\'),\n' +
          '  oid: ObjectId(\'5a7382114ec1f67ae445f778\'),\n' +
          '  bin: Binary(\'aakjadfjadfldksjfadf\', \'1\'),\n' +
          '  dbref: DBRef(\'db.coll\', \'1\'),\n' +
          '  nl: NumberLong(\'3\'),\n' +
          '  nd: NumberDecimal(\'5.00000001\'),\n' +
          '  minkey: MinKey(),\n' +
          '  maxkey: MaxKey(),\n' +
          '  isodate: ISODate(\'1999-01-01\'),\n' +
          '  regexp: RegExp(\'/^[a-z0-9_-]{3,16}$/\')\n' +
          '}'
        };
        expect(generateStage(stage)).to.deep.equal({
          '$match': {
            code: bson.Code('some code'),
            oid: bson.ObjectId('5a7382114ec1f67ae445f778'),
            bin: bson.Binary('aakjadfjadfldksjfadf', '1'),
            dbref: bson.DBRef('db.coll', '1'),
            nl: bson.Long('3'),
            nd: new bson.Decimal128.fromString('5.00000001'),
            minkey: bson.MinKey(),
            maxkey: bson.MaxKey(),
            isodate: new Date('1999-01-01'),
            regexp: new RegExp('/^[a-z0-9_-]{3,16}$/')
          }
        });
      });
      /* TODO: Problems
         Timestamp throws an error when not given arguments.
         NumberInt is just not implemented in query-parser
      */
      it('handles Timestamp', () => {
        // const stage = {
        //   id: 0, isEnabled: true, isExpanded: true, isValid: true, snippet: '',
        //   stageOperator: '$match',
        //   stage: '"{\n' +
        //   '  ts: Timestamp(100)\n' +
        //   '}"'
        // };
        // expect(generateStage(stage)).to.deep.equal({
        //   '$match': {ts: bson.Timestamp(100)}
        // });
      });

      it('handles NumberInt', () => {
        // const stage = {
        //   id: 0, isEnabled: true, isExpanded: true, isValid: true, snippet: '',
        //   stageOperator: '$match',
        //   stage: '{\n  ni: NumberInt(1)\n}'
        // };
        // expect(generateStage(stage)).to.deep.equal({ni: 1});
      });
    });
  });
});
