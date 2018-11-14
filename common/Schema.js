let schema = Schema.shape({
  name: Schema.string().min(20),
  age: Schema.integer().min(18).max(150).required(),
});

schema.validate({name: 'Milos', age: 27}); //OK
schema.validate({name: 10, age: 27}); //Error


