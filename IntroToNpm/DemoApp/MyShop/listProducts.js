var faker = require("faker");
var random = faker.helpers.createCard();
for(var i = 0; i <=10; i++) {
    console.log(faker.fake("{{commerce.productName}}, + '- $' {{commerce.price}}"));
    
}