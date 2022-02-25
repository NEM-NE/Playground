class Model {
  constructor() {
    this.tableName;
    this.sequelize;
    this.colInfo;
  }

  static init(colInfo, modelInfo) {
    this.colInfo = colInfo;
    this.tableName = modelInfo.tableName;
    this.sequelize = modelInfo.sequelize;

    this.createTable(colInfo, modelInfo);
  }

  // 아직 보류
  static hasMany(tableName, keyInfo) { }

  // table
  static belongsTo(tableInfo, keyInfo) {
    const sql = `ALTER TABLE ${this.tableName} ADD CONSTRAINT ${keyInfo.foreignKey} FOREIGN KEY (${keyInfo.foreignKey}) REFERENCES ${tableInfo.tableName}(${keyInfo.targetKey});`;
    this.sequelize.execute(sql);
  }

  static createTable(colInfo, modelInfo) {
    let sql = `CREATE TABLE IF NOT EXISTS ${this.tableName} (`;

    Object.entries(colInfo).forEach((item, index, ary) => {
      sql += `${item[0]} ${item[1].type} ${item[1].option !== undefined ? item[1].option : ''}`;
      if (index !== ary.length - 1) sql += ', ';
      else sql += ')';
    });

    Object.entries(modelInfo).forEach((item, index, ary) => {
      if (item[0] === 'tableName' || item[0] === 'sequelize') return;
      sql += `${item[0]}=${item[1]} `;
    });

    sql += ';';

    this.sequelize.execute(sql);
  }

  // insert
  static create(params) {
    let sql = `INSERT INTO ${this.tableName} (`;

    const col = Object.entries(params).map((item) => item[0]);

    const val = Object.entries(params).map((item) => {
      if (this.colInfo[item[0]].type.includes('VARCHAR') || this.colInfo[item[0]].type.includes('TEXT') || this.colInfo[item[0]].type.includes('DATE')) {
        return `"${item[1]}"`;
      }
      return item[1];
    });

    sql += `${col.toString()}) VALUES (`;
    sql += `${val.toString()})`;

    this.sequelize.execute(sql);
  }

  /*
        select & join Guide

        infoObj = {
            include: {
                type: '', 'left', 'right', 'cross', (default inner => '')
                curModel: {
                    tableName: 'dsds',
                    attribute" [col1, col2, col3...]
                },
                desModel: {
                    tableName: 'dsds',
                    attribute" [col1, col2, col3...]
                },
                on: 'where query'
            },
            where: 'where query',
            attribute: ['col1', 'col2', 'col3', ...];
        }
    */
  static join(include) {
    let sql = 'SELECT ';

    const curModelAttr = include.curModel.attribute
      .reduce((str, attr) => `${str}${include.curModel.tableName}.${attr}, `, '');

    const desModelAttr = include.desModel.attribute
      .reduce((str, attr, idx, src) => {
        if (idx === src.length - 1) return `${str}${include.desModel.tableName}.${attr} `;
        return `${str}${include.desModel.tableName}.${attr}, `;
      }, '');

    sql += `${curModelAttr + desModelAttr}
            FROM ${include.curModel.tableName} ${include.type} JOIN ${include.desModel.tableName} ON ${include.on}`;

    return sql;
  }

  static findAll(infoObj) {
    let sql = `SELECT * FROM ${this.tableName} `;
    // JOIN 기능인지 체크!
    if (infoObj.include !== undefined) {
      sql = this.join(infoObj.include);
    } else if (infoObj.where !== undefined) {
      sql += infoObj.where;
    }

    if (infoObj.attributes !== undefined) {
      sql.replace('*', infoObj.attributes.toString());
    }

    return this.sequelize.execute(sql);
  }

  static update(attributes, where) {
    let sql = `UPDATE ${this.tableName} SET `;
    Object.entries(attributes).forEach((item) => {
      sql += `${item[0]} = ${item[1]} `;
    });

    sql += where;

    return this.sequelize.execute(sql);
  }

  static destroy(where) {
    const sql = `DELETE FROM ${this.tableName} ${where}`;

    return this.sequelize.execute(sql);
  }
}

module.exports = Model;
