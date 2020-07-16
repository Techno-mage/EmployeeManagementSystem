const connection = require("../config/connection.js");

class ORM {
    constructor(connection) {
        this.connection = connection;
    }

    selectAll(table) {
        console.log(typeof table);
        const queryString = 'SELECT * FROM  ??';
        return this.connection.query(queryString, [table])
    }
}

module.exports = new ORM(connection);