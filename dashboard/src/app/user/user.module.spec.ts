import UserModule from './user.module';

describe('UserModule', () => {
  let userModule;

  beforeEach(() => {
    userModule = new UserModule();
  });

  it('should create an instance', () => {
    expect(userModule).toBeTruthy();
  })
});
