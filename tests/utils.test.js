import sinon from 'sinon';
import axios from 'axios';
import attachAuth from '../src/utilities/attachAuthToken';

describe('Unit test for the attach auth util', () => {
  it('should set the header when a token is passed', () => {
    const injector = {
      defaults: { headers: { common: {} } },
    };
    const expectedInjector = {
      defaults: { headers: { common: { 'x-access-token': 'my token' } } },
    };
    const stubCreate = sinon.stub(axios, 'create').returns(injector);
    expect(attachAuth('my token')).toEqual(expectedInjector);
    stubCreate.restore();
  });
  it('should remove the x-access-token header property when a '
  + 'token is not passed', () => {
    const injector = {
      defaults: { headers: { common: {} } },
    };
    const expectedInjector = {
      defaults: { headers: { common: {} } },
    };
    const stubCreate = sinon.stub(axios, 'create').returns(injector);
    expect(attachAuth()).toEqual(expectedInjector);
    stubCreate.restore();
  });
  it('should use an empty object if default headers is not found', () => {
    const injector = {
      defaults: { headers: {} },
    };
    const stubCreate = sinon.stub(axios, 'create').returns(injector);
    expect(attachAuth('token')).toEqual(injector);
    stubCreate.restore();
  });
});
