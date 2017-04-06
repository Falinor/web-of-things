import { expect } from 'chai';
import { Greeter } from '../src/index';

describe('index', () => {
  it('should provide Greeter', () => {
    expect(Greeter).to.not.be.undefined;
  });
});
