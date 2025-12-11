// @ts-check
const { test, expect } = require('@playwright/test');
import { fa, faker } from '@faker-js/faker';
const { DateTime } = require("luxon");

/* const randomFirstName = faker.person.firstName()
const randomLastName = faker.person.lastName()
const randomNumber = faker.string.numeric(4)
console.log(randomFirstName)
console.log(randomLastName)
console.log(randomNumber) */

// const currentDate = DateTime.now().toFormat('yyyy-MM-dd')
// const currentDatePlusFive = DateTime.now().plus({ days: 5 }).toFormat('yyyy-MM-dd')
/* 
test('should be able to create a booking', async ({ request }) => {
    const response = await request.post(`/booking`, {
        data: {
            "firstname": randomFirstName,
            "lastname": randomLastName,
            "totalprice": 1212,
            "depositpaid": true,
            // "bookingdates": {
            //     "checkin": currentDate,
            //     "checkout": currentDatePlusFive
            // },
            "additionalneeds": "Breakfast"
        }
    });
    console.log(await response.json());
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    const responseBody = await response.json()
    expect(responseBody.booking).toHaveProperty("firstname", randomFirstName);
    expect(responseBody.booking).toHaveProperty("lastname", randomLastName);
}); */

const id = faker.random.numeric(4);

const productname = faker.commerce.productName();
const qty = faker.random.numeric(2);
const price = faker.commerce.price();
console.log(productname)
console.log(qty)
console.log(price)

test('should be able to add a product',async({request}) =>{
  
    const response = await request.post(`product`,{
        data:{
            "id" : id,
            "name" : productname,
            "quantity": qty,
            "price": price
        }
        
    })
    console.log(await response.json());

    const resonse2 = await request.get(`product`);
    console.log(await resonse2.json());
    
})