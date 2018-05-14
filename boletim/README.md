# Readme

a test [Sails](http://sailsjs.org) application for [sails-ng-curd](https://github.com/shootsoft/sails-ng-curd)


# Install

Install depedencies

```shell
npm install
sudo npm install -g bower
bower install
```

Currently, its default database is MySQL, you just need to create an empty db, when you launch this project, it will automatically create databales.

Edit `config/connections.js`

Update the following part in to your own

```javascript
  testMysqlServer: {
    adapter: 'sails-mysql',
    host: 'YOUR_MYSQL_SERVER_HOSTNAME_OR_IP_ADDRESS',
    user: 'YOUR_MYSQL_USER',
    password: 'YOUR_MYSQL_PASSWORD',
    database: 'YOUR_MYSQL_DB'
  }
```

Now start the porject

```shell
sails lift
```

Visit http://localhost:1337/test or http://localhost:1337/customer to see result
