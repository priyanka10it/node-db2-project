
exports.up = function(knex) {
  return knex.schema.createTable('carSpecs',tbl=>{
      tbl.increments('id');
      tbl.varchar('VIN',128).unique().notNullable();
      tbl.text('Make',128).notNullable();
      tbl.text('Model',100).notNullable();
      tbl.decimal('Mileage',200).notNullable();
      tbl.text('Transmission_Type',128);
      tbl.text('Title_status',128);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('carSpecs');
};
