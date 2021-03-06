/**Задание 5.
Написать код приложения, интерфейс которого состоит из двух input и кнопки. В input можно ввести любое число.

Заголовок первого input — «номер страницы».
Заголовок второго input — «лимит».
Заголовок кнопки — «запрос».
При клике на кнопку происходит следующее:
Если число в первом input не попадает в диапазон от 1 до 10 или не является числом — выводить ниже текст «Номер страницы вне диапазона от 1 до 10»;
Если число во втором input не попадает в диапазон от 1 до 10 или не является числом — выводить ниже текст «Лимит вне диапазона от 1 до 10»;
Если и первый, и второй input не в диапазонах или не являются числами — выводить ниже текст «Номер страницы и лимит вне диапазона от 1 до 10»;
Если числа попадают в диапазон от 1 до 10 — сделать запрос по URL
https://picsum.photos/v2/list?page=1&limit=10, где GET-параметр page — это число из первого input, а GET-параметр limit — это введённое число второго input.  
После получения данных вывести список картинок на экран.
Если пользователь перезагрузил страницу, то ему должны показываться картинки из последнего успешно выполненного запроса (использовать localStorage).*/

const url = "https://picsum.photos/v2/list?";
const pageField = document.querySelector("#page");
const limitField = document.querySelector("#limit");
const form = document.querySelector(".form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  request(url, render);
});

function checkLimit(page, limit) {
  // Проверка лимита
  const check = {
    isRight: false,
    message: "",
  };
  const isPageWrong = isNaN(page) || page < 1 || page > 10;
  const isLimitWrong = isNaN(limit) || limit < 1 || limit > 10;
  if (isPageWrong && isLimitWrong) {
    check.isRight = false;
    check.message = "Номер страницы и лимит вне диапазона от 1 до 10";
  } else if (isPageWrong) {
    check.isRight = false;
    check.message = "Номер страницы вне диапазона от 1 до 10";
  } else if (isLimitWrong) {
    check.isRight = false;
    check.message = "Лимит вне диапазона от 1 до 10";
  } else if (!isPageWrong || !isLimitWrong) {
    check.isRight = true;
  }
  console.log(check.isRight);
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
async function request(url, callback) {
  const page = +pageField.value;
  const limit = +limitField.value;
  const fullUrl = `${url}page=${page}&limit=${limit}`;
  const checking = checkLimit(page, limit);
  console.log(checking);
  render(checking);

  try {
    if (localStorage.getItem("lastRequest")) {
      const data = JSON.parse(localStorage.getItem("lastRequest"));
      callback(checking, data);
    } else {
      if (checking.isRight) {
        const response = await fetch(fullUrl);
        const data = await response.json();
        localStorage.setItem("lastRequest", JSON.stringify(data));
        localStorage.setItem("checking", JSON.stringify(checking));
        if (!response.ok) {
          console.log(`Ошибка ${response.status}`);
        } else {
          callback(checking, data);
        }
      } else throw Error("Данные вне диапазона");
    }
  } catch (e) {
    console.log(e);
  }
}

window.addEventListener("load", () => {
  const data = JSON.parse(localStorage.getItem("lastRequest"));
  const checking = JSON.parse(localStorage.getItem("checking"));
  console.log(data);
  render(checking, data);
});
