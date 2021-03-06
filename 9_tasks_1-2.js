/**Задание 1.
Вам дана заготовка и результат, который вы должны получить. Ваша задача — написать код, который будет преобразовывать XML в JS-объект и выводить его в консоль. 
Получить JS объект:
{
  list: [
    { name: 'Ivan Ivanov', age: 35, prof: 'teacher', lang: 'en' },
    { name: 'Петр Петров', age: 58, prof: 'driver', lang: 'ru' },
  ]
}
*/

console.log("Задание 1.");
const XMLTemplate = `<list>
<student>
  <name lang="en">
    <first>Ivan</first>
    <second>Ivanov</second>
  </name>
  <age>35</age>
  <prof>teacher</prof>
</student>
<student>
  <name lang="ru">
    <first>Петр</first>
    <second>Петров</second>
  </name>
  <age>58</age>
  <prof>driver</prof>
</student>
</list>`;

const parser = new DOMParser();
const XOM = parser.parseFromString(XMLTemplate, "text/xml");

const elemCollection = XOM.querySelectorAll("student");
const students = [];
const result = {
  list: [],
};
function walk(collection) {
  [].forEach.call(collection, (root) => {
    const data = {};
    [].forEach.call(root.children, (child) => {
      const text = child.textContent.includes("  ")
        ? child.textContent.match(/[a-zа-яё\d]+/gi).join(" ")
        : child.textContent;

      let lang;

      if (child.hasAttribute("lang")) {
        lang = child.getAttribute("lang");
        data["lang"] = lang;
      }

      data[child.tagName] = text;
    });
    result.list.push(data);
  });
}
walk(elemCollection);
console.log(`Result of XML parsing:`);
console.log(result);
// console.log("_________________________________");

/**Задание 2.
Вам дана заготовка и результат, который вы должны получить. Ваша задача — написать код, который будет преобразовывать JSON в JS-объект и выводить его в консоль.
Получить JS объект:
{
  list: [
    { name: 'Petr', age: 20, prof: 'mechanic' },
    { name: 'Vova', age: 60, prof: 'pilot' },
  ]
}
*/
console.log("Задание 2.");
const jsonString = `{
  "list": [
    {
      "name": "Petr",
      "age": "20",
      "prof": "mechanic"
    },
    {
      "name": "Vova",
      "age": "60",
      "prof": "pilot"
    }
  ]
}`;
const data = JSON.parse(jsonString);
console.log(`Result of JSON parsing:`);
console.log(data);
