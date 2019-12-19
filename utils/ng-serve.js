var fs = require('fs');
fs.readFile('./angular.json', 'utf8', function(err, data) {
  if (err) {
    return console.log(err);
  }
  var result = data.replace(/angular-builders\/custom-webpack:dev-server/g, 'angular-devkit/build-angular:dev-server');
  var result = result.replace(/src\/main.single-spa.ts/g, 'src/main.ts');

  fs.writeFile('./angular.json', result, 'utf8', function(err) {
    if (err) return console.log(err);
  });
});
