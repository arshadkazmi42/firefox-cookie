const SQLiteCrud = require('sqlite3-promisify');
const FirefoxCookiePath = require('firefox-cookie-path');
const { ValuesPointer, SelectFields, QueryValues } = require('genql');

const { CONSTANTS, Util } = require('./lib');


function Firefox(path) {
  this.tableName = CONSTANTS['TABLE_NAME'];
  this.cookies = require(CONSTANTS['MODEL_PATH']);
  this.fields =  SelectFields.get(this.cookies);
  this.sqliteCrud = new SQLiteCrud(FirefoxCookiePath(path) || FirefoxCookiePath());
}


Firefox.prototype.setCookie = async function(cookies) {
  const columnsCount = this.cookies.columns.length;
  const insertQuery = `INSERT INTO ${this.tableName} (${this.fields.join(', ')}) VALUES (${ValuesPointer.get(columnsCount)})`;

  const queries = [];
  for (let cookie of cookies) {
    const values = QueryValues.get(this.cookies, cookie);
    queries.push(this.sqliteCrud.run(insertQuery, values));
  }
  
  return await Promise.all(queries);
};


Firefox.prototype.getCookie = async function(domain) {
  const query = `SELECT * from ${this.tableName} WHERE host like '%${domain}%'`;
  return Util.parse(this.cookies, await this.sqliteCrud.all(query));
};


Firefox.prototype.removeCookie = async function(domain) {
  const query = `DELETE from ${this.tableName} WHERE host like '%${domain}%'`;
  return await this.sqliteCrud.run(query);
};


module.exports = Firefox;
