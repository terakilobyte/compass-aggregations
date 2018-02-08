import React from 'react';
import { shallow } from 'enzyme';

import InputPreview from 'components/input-preview';
import styles from './input-preview.less';

describe('InputPreview [Component]', () => {
  let component;

  beforeEach(() => {
    component = shallow(<InputPreview />);
  });

  afterEach(() => {
    component = null;
  });

  it('renders the wrapper div', () => {
    expect(component.find(`.${styles['input-preview']}`)).to.be.present();
  });
});