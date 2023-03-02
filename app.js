const URL = `http://localhost:3000/comments`;

const commentsContainer = document.querySelector(".reviews__list");
const submitButton = document.querySelector(".form__submit");
const textArea = document.querySelector(".form__input");

const getComments = async function (url, settings = {}) {
  try {
    const response = await fetch(url, settings);

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }

    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const renderComment = function (item) {
  let html = `
    <li class="reviews__item">
      <header class="reviews__item-header">
        <span class="reviews__item-username">${item.username}</span>
        <time class="reviews__item-time">${item.date}</time>
      </header>
      <span class="reviews__item-text">
        ${item.body}
      </span>
    </li>
  `;
  commentsContainer.insertAdjacentHTML("beforeend", html);
};

const renderError = (text) => {
  const html = `
    <span class="reviews__item-no-result">${text}</span>
  `;
  commentsContainer.insertAdjacentHTML("beforeend", html);
};

const showComments = async function () {
  const commnets = await getComments(URL);
  console.log(commnets);
  commnets.map((comment) => {
    renderComment(comment);
  });
};

const addComment = async function (event) {
  event.preventDefault();
  console.log(event);
  if (!textArea.value) return;

  const settings = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: crypto.randomUUID(),
      username: "Me",
      date: `${new Date().toLocaleDateString("en-us", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })}`,
      body: textArea.value,
    }),
  };

  try {
    getComments(URL, settings);
    commentsContainer.innerHTML = "";
    showComments(URL);
  } catch (err) {
    console.log(err);
  }
};

submitButton.addEventListener("click", addComment);

showComments();
