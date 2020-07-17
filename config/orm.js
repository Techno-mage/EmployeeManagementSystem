const connection = require("../config/connection.js");
const { threadId } = require("../config/connection.js");

class ORM {
    constructor(connection) {
        this.connection = connection;
    }

    printQuestionMarks(numberOfValues){
        const questionMarks = [];
    
        for (var i = 0; i < numberOfValues; i++) {
          questionMarks.push("?");
        }
    
        return questionMarks.join(', ');
    }
    printDoubleQuestionMarks(numberOfValues){
        const questionMarks = [];
    
        for (var i = 0; i < numberOfValues; i++) {
          questionMarks.push("??");
        }
    
        return questionMarks.join(', ');
    }

    

    selectAll(table) {
        //console.log(typeof table);
        const queryString = 'SELECT * FROM  ??';
        return this.connection.query(queryString, [table])
    }

    select(col, table) {
        const queryString = `SELECT ${this.printDoubleQuestionMarks(col.length)} FROM ??`;

        return this.connection.query(queryString, col.concat([ table]))
    }

    leftJoin(colsToSelect, tableOne, tableTwo, tableOneCol, tableTwoCol) {
        //'SELECT firstName, lastName, title, coverPhoto FROM authors INNER JOIN books ON authors.id = books.authorsId'
    
        const queryString =
          `SELECT ${this.printDoubleQuestionMarks(colsToSelect.length)} FROM ?? LEFT JOIN ?? on ??.?? = ??.??`;
            
        return this.connection.query(
          queryString, colsToSelect.concat([ tableOne, tableTwo, tableOne, tableOneCol, tableTwo, tableTwoCol]));
    }

    create(table, variables, values){
        const queryString = `INSERT INTO ??(${variables.join(', ')}) VALUES (${this.printQuestionMarks(values.length)})`
        //console.log(queryString)
        //console.log([table].concat(variables.concat(values)))
        return this.connection.query(queryString, [table, ...values])
    }
    update(table, col, colValue, comp, compValue){
        //UPDATE employee SET role_id WHERE id = ?
        const queryString = `UPDATE ?? SET ?? = ? WHERE ?? = ?`

        return this.connection.query(queryString, [table, col, colValue, comp, compValue])

    }


}

module.exports = new ORM(connection);
