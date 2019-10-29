/**
 * @file jest.setup.js
 * Sets up and configures Enzyme for Jest.
 */

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
