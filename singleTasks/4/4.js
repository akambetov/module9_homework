/**Задание 4.

Напишите код приложения, интерфейс которого представляет собой input и кнопку. В input можно ввести любое число. При клике на кнопку происходит следующее:

Если оба числа не попадают в диапазон от 100 до 300 или введено не число — выводить ниже текст «одно из чисел вне диапазона от 100 до 300»;
Если числа попадают в диапазон от 100 до 300 — сделать запрос c помощью fetch по URL https://picsum.photos/200/300, где первое число — ширина картинки, второе — высота. */

const url = "https://picsum.photos/";
const proportions = document.querySelector("#proportions");
const form = document.querySelector(".form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  request(url, render);
});

function checkLimit(width, height) {
  // Проверка лимита
  const check = {
    isRight: false,
    message: "",
  };
  if (isNaN(width) || isNaN(height)) {
    check.isRight = false;
    check.message =
      "Одно из значений или оба не числа! Введите число от 100 до 300";
  } else if (width < 100 || width > 300 || height < 100 || height > 300) {
    check.isRight = false;
    check.message = "Одно из значений или оба вне диапазона от 100 до 300";
  } else {
    check.isRight = true;
  }
  return check;
}

function render(checkRes, imgUrl) {
  const elem = document.querySelector(".result");
  if (!checkRes.isRight) {
    elem.innerHTML = checkRes.message;
  } else if (checkRes.isRight && imgUrl) {
    let img = `
        <div class="result-img">
          <img src="${imgUrl}" alt=""/>
        </div>
      `;
    elem.innerHTML = img;
  }
}
async function request(url, callback) {
  const size = proportions.value.match(/\d+[a-zа-яё]*/gi);
  const width = size[0];
  const height = size[1];
  const checkig = checkLimit(+width, +height);
  render(checkig);

  try {
    const response = await fetch(`${url}${width}/${height}`);
    if (!response.ok) {
      callback(checkig, `Статус ответа ${response.status}`);
    } else {
      callback(checkig, response.url);
    }
  } catch (e) {
    console.log(e);
  }
}
