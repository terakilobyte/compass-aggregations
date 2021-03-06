import React from 'react';
import { shallow } from 'enzyme';

import StageWorkspace from 'components/stage-workspace';
import styles from './stage-workspace.less';

describe('StageWorkspace [Component]', () => {
  const stage = { previewDocuments: [], isValid: true, isLoading: false, isEnabled: true };
  let component;
  let stageChangedSpy;
  let runStageSpy;
  let setIsModifiedSpy;
  let runOutStageSpy;
  let gotoOutResultsSpy;

  beforeEach(() => {
    stageChangedSpy = sinon.spy();
    runStageSpy = sinon.spy();
    setIsModifiedSpy = sinon.spy();
    runOutStageSpy = sinon.spy();
    gotoOutResultsSpy = sinon.spy();

    component = shallow(
      <StageWorkspace
        stage={stage}
        index={0}
        serverVersion="3.6.0"
        fields={[]}
        isEnabled
        runStage={runStageSpy}
        gotoOutResults={gotoOutResultsSpy}
        runOutStage={runOutStageSpy}
        setIsModified={setIsModifiedSpy}
        stageChanged={stageChangedSpy} />
    );
  });

  afterEach(() => {
    component = null;
  });

  it('renders the wrapper div', () => {
    expect(component.find(`.${styles['stage-workspace']}`)).to.be.present();
  });
});
