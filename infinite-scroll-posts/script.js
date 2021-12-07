"use-strict";

const postContainer = document.querySelector(".posts-container"),
  filter = document.getElementById("filter"),
  loader = document.querySelector(".loader");

let page = 1;
let limit = 5;

// Get posts from API
async function getPost() {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );

  const data = res.json();
  return data;
}

// Show post in DOM
async function showPost() {
  const posts = await getPost();

  posts.forEach((post) => {
    const html = `
        <div class="post">
            <div class="number">${post.id}</div>
            <div class="post-info">
                <h2 class="post-title">${post.title}</h2>
                <p class="post-body">${post.body}</p>
            </div>
        </div>
      `;

    postContainer.insertAdjacentHTML("beforeend", html);
  });
}

// Show loader and fetch more posts
const showLoading = function () {
  loader.classList.add("show");

  setTimeout(() => {
    loader.classList.remove("show");

    setTimeout(() => {
      page++;
      showPost();
    }, 300);
  }, 1000);
};

// Filter posts by input
const filerPosts = function (e) {
  const term = e.target.value.toUpperCase();

  const posts = document.querySelectorAll(".post");
  posts.forEach((post) => {
    const title = post.querySelector(".post-title").innerText.toUpperCase();
    const body = post.querySelector(".post-body").innerText.toUpperCase();

    if (title.indexOf(term) > -1) {
      post.style.display = "flex";
    } else {
      post.style.display = "none";
    }
  });
};

/// Show initial post
showPost();

window.addEventListener("scroll", function () {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollHeight - scrollTop === clientHeight) {
    showLoading();
  }
});

filter.addEventListener("input", filerPosts);
