import ErrorModule from './error.module';

describe('ErrorModule', () => {
  let errorModule;

  beforeEach(() => {
    errorModule = new ErrorModule();
  });

  it('should create an instance', () => {
    expect(errorModule).toBeTruthy();
  })
});
