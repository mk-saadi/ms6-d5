// ! summary API

/* must known things of API
 # 1. fetch
    1.1 must provide "url": dynamic or static
    1.2 how to convert fetch promise return to "json"
    1.3 how to convert "json" to "data"
    1.4 how to extract data properly:
        1.4.1 array of object
        1.4.2 object with property 'users'
        1.4.3 object with property called 'data'
 # 2. nested object
 # 3. DOM manipulation:
    3.1 how to get something from DOM structure
    3.2 create element and append it to DOM structure
    3.3 dynamically load data based on id
 # 4. array:
    4.1 forEach element
    4.2 map element
    4.3 filter element
    4.4 reduce element
    4.5 find element
 # 5. template string
 */

// >>  can you get the phone which price not 500 ? which one is correct?

const phones = [
 { name: "sony", price: 500 },
 { name: "apple", price: 700 },
 { name: "sony", price: 700 },
];
console.log(phones.filter((phone) => phone.price !== 500));