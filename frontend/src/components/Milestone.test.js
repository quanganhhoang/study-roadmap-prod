import React from 'react'
import { shallow, mount, render } from 'enzyme'
import Milestone from './Milestone'

it('expect to render Milestone component', () => {
    expect(shallow(<Milestone />)).toMatchSnapshot();
})
