module.exports = (sequelize, dataTypes) => {
    let alias = 'Booksauthors';
    let cols = {
      Id: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      AuthorId: {
        type: dataTypes.INTEGER,
        allowNull: false
      },
      BookId: {
        type: dataTypes.INTEGER,
        allowNull: false
      }
    };
    let config = {
      tableName: 'booksauthors',
      timestamps: false
    };
    const Bookauthors = sequelize.define(alias, cols, config);
    return Bookauthors;
  };