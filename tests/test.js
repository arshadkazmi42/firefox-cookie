const { expect } = require('chai');

const CookieCrud = require('../index');
const Cookie = new CookieCrud(__dirname + '/cookies.sqlite');

const DATA = [
  {
    'baseDomain': 'arshad.com',
    'originAttributes': '',
    'name': 'arshad',
    'value': 'arshad-test-cookie',
    'host': 'arshad.com',
    'path': '/root',
    'expiry': 1,
    'lastAccessed': 111111111,
    'creationTime': 10001110,
    'isSecure': 1,
    'isHttpOnly': 0,
    'inBrowserElement': 0,
    'sameSite': 0,
  }
];


describe('firefox cookie get and set operations', () => {
  it('should add new row in the database', async () => {
    await Cookie.setCookie(DATA);
    let rows = await Cookie.getCookie('arshad.com');
    expect(rows.length).to.equal(1);
    expect(rows).to.deep.equal(DATA);
    await Cookie.removeCookie('arshad.com');
    rows = await Cookie.getCookie('arshad.com');
    expect(rows.length).to.equal(0);
  });
});
