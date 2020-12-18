# firefox-cookie

[![Build Status](https://api.travis-ci.com/arshadkazmi42/firefox-cookie.svg?branch=master)](https://api.travis-ci.com/arshadkazmi42/firefox-cookie)

Node Cookie Manager for Firefox, read / write cookie from sqlite db

## Install

```
npm i firefox-cookie
```

## Usage

```javascript

// Search for the "default" profile in Firefox implicitly https://support.mozilla.org/gl/questions/1264072
const FirefoxCookie = require('firefox-cookie');
const FFCookie = new FirefoxCookie();

// Search for the "default-release" new profile in Firefox explicitly (or any other profile you give as parameter)
const FirefoxCookie = require('firefox-cookie');
const FFCookie = new FirefoxCookie("default-release");

// Reading cookie
const cookie = await FFCookie.getCookie('arshad.com');

// Inserting cookie
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

await FFCookie.setCookie(DATA);
```

## API

- **`getCookie(path)`**
  - Returns cookie json from database for the input path
    - **Params**
      - path (String)

- **`setCookie(cookies)`**
  - Adds all the input cookies into the sqlite database
    - **Params**
      - cookies (Array of cookies object)

- **`removeCookie(domain)`**
  - Removes all records matching the domain.
  - > It uses `like` condition (`%domain%`) so anything matching the pattern will be removed
    - **Params**
      - path (String)

## Contributing

Interested in contributing to this project?
You can log any issues or suggestion related to this library [here](https://github.com/arshadkazmi42/firefox-cookie/issues/new)

Read our contributing [guide](CONTRIBUTING.md) on getting started with contributing to the codebase

## Contributors

Thank you to all the contributors who have helped us in making this project better :raised_hands:

<a href="https://github.com/arshadkazmi42"><img src="https://github.com/arshadkazmi42.png" width="30" /></a>
