/**Напишите код приложения, интерфейс которого представляет собой input и кнопку. В input можно ввести любое число. При клике на кнопку происходит следующее:

Если число не попадает в диапазон от 1 до 10 — выводить ниже текст «число вне диапазона от 1 до 10».
Если число попадает в диапазон от 1 до 10 — сделать запрос c помощью XHR по URL https://picsum.photos/v2/list?limit=10, где get-параметр limit — это введённое число.
 */

const url = "https://picsum.photos/v2/list?limit=";
const inputField = document.querySelector("#limit");
const form = document.querySelector(".form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  request(url, render);
});

function checkLimit(limit) {
  // Проверка лимита
  const check = {
    isRight: false,
    message: "",
  };
  if (isNaN(limit)) {
    check.isRight = false;
    check.message = "Введите число от 1 до 10";
  } else if (limit < 1 || limit > 11) {
    check.isRight = false;
    check.message = "Число вне диапазона от 1 до 10";
  } else {
    check.isRight = true;
  }
  return check;
}

function render(checkRes, response) {
  const elem = document.querySelector(".result");
  if (!checkRes.isRight) {
    elem.innerHTML = checkRes.message;
  } else if (checkRes.isRight && response) {
    let template = "";
    let img = "";
    response.forEach((image) => {
      img = `
        <div class="result-img">
          <img src="${image.download_url}" alt="${image.author}"/>
        </div>
      `;
      template += img;
    });
    elem.innerHTML = template;
  }
}
function request(url, callback) {
  const xhr = new XMLHttpRequest();
  limit = +inputField.value;
  const checkig = checkLimit(limit);
  render(checkig);

  xhr.open("GET", `${url}${limit}`);
  xhr.onload = function () {
    if (xhr.status != 200) {
      callback(checkig, `Статус ответа ${xhr.status}`);
    } else {
      callback(checkig, JSON.parse(xhr.response));
    }
  };
  xhr.onerror = function () {
    callback(checkig, "Ошибка! Статус ответа: ", xhr.status);
  };
  if (checkig.isRight) xhr.send();
}
