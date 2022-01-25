"use strict";

const array = ['Apple', 'Orange', 'Pear', 'Banana', 'Cherry', 'Mango', 'Cucumber'];
const objArray = [
  { name: 'Apple', weight: 50, type: 'fruit' },
  { name: 'Orange', weight: 75, type: 'fruit' },
  { name: 'Pear', weight: 100, type: 'fruit' },
  { name: 'Banana', weight: 125, type: 'fruit' },
  { name: 'Cherry', weight: 150, type: 'berry' },
  { name: 'Mango', weight: 175, type: 'fruit' },
  { name: 'Cucumber', weight: 200, type: 'vegetable' }
];

// =====================================
// Loops (Ciklai)
// while, do while, for (break, continue)
// =====================================


// Kol salyga teisinga (true)
// while(salyga) {
//   vykdomas kodas
// }

// let counter = 0;
// while (counter < array.length) {
//   // code
//   console.log(counter, array[counter]);
//   counter++;
// }



// let result = '';
// let i = 0;
// // Do while
// do {
//   // Vykdomas kodas
//   console.log(i);
//   i++;


// for (pradzia; salyga; indekso didinimas;) {
// Vykdomas kodas
// }

// for (let i = 0; i < array.length; i++) {
//   const element = array[i];

//   // if (element === 'Banana') {
//   //   break;
//   // }
//   if (element === 'Banana') {
//     continue;
//   }
//   if (element === 'Cherry') {
//     continue;
//   }
//   console.log(element);
// }


// for (let arrItem of objArray) {
//   console.log(arrItem);
// }




// =====================================
// Masyvu metodai push, pop, shift, unshift, splice, split, join, sort, map, forEach, reduce, filter, find
// Multidimensional arrays
// =====================================

// // Push - prideda viena elementa i masyvo gala
// const arr1 = [...array];
// arr1.push('Added item');
// console.log(arr1);


// Pop - panaikina paskutini masyvo elementa
// const arr2 = [...array];
// arr2.pop();
// console.log(arr2);


// Shift - panaikina viena elementa is priekio
// const arr3 = [...array];
// arr3.shift();
// console.log(arr3);


// Unshift - prideda viena elementa is priekio
// const arr4 = [...array];
// arr4.unshift('Added item');
// console.log(arr4);


// // Splice - trinimas nuo kurio ir kiek
// const arr5 = [...array];
// console.log('Iprastas masyvas', arr5);
// const removedItems = arr5.splice(1, 3);
// console.log('Istrinti elementai', removedItems);
// console.log('Like elementai', arr5);


// Splice - trinimas nuo kurio ir kiek su pakeitimu
// const arr6 = [...array];
// console.log('Iprastas masyvas', arr6);
// const removedItems = arr6.splice(1, 5, 'HELLO');
// console.log('Istrinti elementai', removedItems);
// console.log('Like elementai', arr6);


// Splice - elemento pridejimas nieko netrinant
// const arr7 = [...array];
// console.log('Iprastas masyvas', arr7);
// arr7.splice(2, 0, "HELLO");
// console.log('Naujas masyvas', arr7);


// Splice - elemento pridejimas nieko netrinant su neigiamu indexu
// const arr8 = [...array];
// console.log('Iprastas masyvas', arr8);
// arr8.splice(-arr8.length, 0, "HELLO");
// console.log('Naujas masyvas', arr8);

// Split
// const myString = 'param1&param2&param3&param4';
// console.log(myString);
// const myArr = myString.split('&');
// console.log('Splitted string: ', myArr);

// Join
// console.log(myArr.join('@'));

// Sort - rikiuoja masyva
// const sortArr = ['a', 'c', 'b', 'g', 'f'];
// console.log(sortArr.sort());
// console.log(sortArr.sort(function (a, b) { return b - a; }));
// const points = [40, 100, 1, 5, 25, 10];
// console.log(sortArr.sort().reverse());


// Map pereina per visus masyvo elementus ir grazina rezultata
// const mapArr = [...objArray];
// console.log('Map array: ', mapArr);
// const changedMapArr = mapArr.map((arrItem) => {
//   console.log(arrItem);
//   return {
//     ...arrItem,
//     type: 'replaced type',
//     newItem: 'New param',
//   };
// })
// console.log('Changed map array: ', changedMapArr);

// forEach pereina per visus masyvo elementus
// const arr9 = [...array];
// objArray.forEach((item, index) => {
//   console.log(index, item);
// });


// const array1 = [1, 2, 3, 4, 5, 6, 7, 8, 12];
// const oddNumbers = [];
// Isrinkti visus lyginius skaicius ir idet i kita masyva
// const reducer = (oddNumbers, currentValue) => console.log(previousValue, currentValue);;

// array1.reduce(function (accumulator, currentValue) { currentValue % 2 === 0 ? oddNumbers.push(currentValue) : null });
// console.log(oddNumbers);


// Filter - atfitruoja masyvo elementus ir grazina masyva
// const arr10 = [...objArray];
// console.log(arr10.filter(item => item.type === 'berry'));

// // Find - iesko elemento ir grazina ojekta
// const arr11 = [...objArray];
// console.log(arr11.find(item => item.type === 'berry'));

// const arr = [
//   [1, 2, 3],
//   [2, 3, 4],
//   [4, 5, 6],
// ];
// console.log(arr, arr[1][1]);


// =====================================
// funkcijos
// =====================================

// function myFunc(param1, param2) {
//   console.log(param1, param2);
//   return param1 + param2;
// }

// myFunc('param1', 'param2');
// console.log(myFunc('param1', 'param2'));

// const myFunc2 = (param1, param2) => {
//   console.log(param1, param2);
//   return param1 + param2;
// }

// myFunc2('param1', 'param2');
// console.log(myFunc2('param1', 'param2'));


// =====================================
// innerHtml
// =====================================

// document.getElementById('content').innerText = 'Test';

// const img = "<img src='x' alt='alt'>";
// document.getElementById('content').innerHTML = img; // 
// document.getElementById('content').innerHTML = '<div>' + 33 + '</div>';