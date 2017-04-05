import { WotDashboardPage } from './app.po';

describe('wot-dashboard App', () => {
  let page: WotDashboardPage;

  beforeEach(() => {
    page = new WotDashboardPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('octo works!');
  });
});
