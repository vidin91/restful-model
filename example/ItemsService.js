import DAOService from '../server/DAOService';
import mysql from 'mysql';

export class ItemsService {
  constructor() {
    super();
    this.connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'sifra123',
      database: 'restful-model'
    });
  }

  async getAllItems() {
    return new Promise((resolve, reject) => {
      this.connection.query('select * from items', function (error, results, fields) {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  async getById(id) {
    return new Promise((resolve, reject) => {
      this.connection.query(`select * from items where id=${id}`, function (error, results, fields) {
        if (error) {
          reject(error);
        } else {
          resolve(results && results[0]);
        }
      });
    });
  }

  async create(payload) {
    return new Promise((resolve, reject) => {
      this.connection.query(`insert into items (name, description) values (?, ?)`,[payload.name, payload.description], async (error, results, fields) => {
        if (error) {
          reject(error);
        } else {
          resolve(await this.getById(results.insertId));
        }
      });
    });
  }

  async update(id, payload) {
    return new Promise((resolve, reject) => {
      let keys = Object.keys(payload).reduce((acc, cur) => {
        let a = `${cur}='${payload[cur]}'`;
        if (acc) {
          a = `${acc}, ${a}`;
        };
        return a;
      }, '');
      if (!keys) {
        reject('missing fields');
        return;
      }
      this.connection.query(`update items set ${keys} where id=${id}`, async (error, results, fields) => {
        if (error) {
          reject(error);
        } else {
          resolve(await this.getById(id));
        }
      });
    });
  }
}

export default new ItemsService();
