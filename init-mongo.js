db.createUser({
  user: process.env.MONGO_INITDB_USER,
  pwd: process.env.MONGO_INITDB_PWD,
  roles: [
    {
      role: 'readWrite',
      db: process.env.MONGO_INITDB_DATABASE,
    },
  ],
  passwordDigestor: 'server',
});

db.log.insertOne({ message: 'Database created.' });
