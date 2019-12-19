var fs = require('fs');
fs.readFile('./angular.json', 'utf8', function(err, data) {
  if (err) {
    return console.log(err);
  }
  var result = data.replace(/angular-devkit\/build-angular:dev-server/g, 'angular-builders/custom-webpack:dev-server');
  var result = result.replace(/src\/main.ts/g, 'src/main.single-spa.ts');

  fs.writeFile('./angular.json', result, 'utf8', function(err) {
    if (err) return console.log(err);
  });
});
