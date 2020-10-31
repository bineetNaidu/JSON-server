// javascript for index.html
const container = document.querySelector('.blogs');
const searchForm = document.querySelector('.search');

const renderPosts = async (term) => {
  let uri = 'http://localhost:4242/posts?_sort=likes&_order=desc';
  if (term) {
    uri += `&q=${term}`;
  }

  const res = await fetch(uri);
  const posts = await res.json();

  let template = '';
  posts.forEach((p) => {
    template += `
  <div class="post">
  <h2>${p.title}</h2>
  <p><small>${p.likes}</small></p>
  <p>${p.body.substring(0, 200)}...</p>
  <a href="/details.html?id=${p.id}">Read more</a>
  </div>
  `;
  });

  container.innerHTML = template;
};

// search
searchForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  renderPosts(searchForm.term.value.trim());
});

window.addEventListener('DOMContentLoaded', () => renderPosts());
