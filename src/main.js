document.getElementById('my-form').addEventListener('submit', saveBookmark);
document.querySelector('body').onload = fetchBookmarks;

function saveBookmark(event) {
  event.preventDefault();
  const websiteNameEL = event.target.querySelector('#site-name');
  const websiteName = websiteNameEL.value;
  const websiteURLEl = event.target.querySelector('#site-url');
  const websiteURL = websiteURLEl.value;

  if (!validateInput(websiteName, websiteURL)) {
    return;
  }

  function validateInput(websiteName, websiteURL) {
    if (websiteName.trim() === '') {
      alert('Website name cannot be empty. Please enter a valid name');
      return false;
    }

    if (websiteURL.trim() === '') {
      alert('Website URL cannot be empty. Please enter a valid URL');
      return false;
    }

    const websiteRegex =
      /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
    if (!websiteRegex.test(websiteURL)) {
      alert('Please enter a valid website address');
      return false;
    }

    return true;
  }
  const bookmark = {
    name: websiteName,
    url: websiteURL
  };

  document.getElementById('my-form').reset();

  storeToLocalStorage(bookmark);
  fetchBookmarks();
}

function storeToLocalStorage(bookmark) {
  const bookmarksArr = [];
  bookmarksArr.push(bookmark);

  if (localStorage.getItem('bookmarks') === null) {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarksArr));
  } else {
    const storedBookmarksArr = JSON.parse(localStorage.getItem('bookmarks'));

    if (storedBookmarksArr.find(currItem => currItem.name === bookmark.name)) {
      return;
    }

    storedBookmarksArr.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(storedBookmarksArr));
  }
}

function fetchBookmarks() {
  const storedBookmarksArr = JSON.parse(localStorage.getItem('bookmarks'));

  const bookmarksDivEl = document.getElementById('bookmarks-results');

  bookmarksDivEl.innerHTML = '';

  for (const bookmark of storedBookmarksArr) {
    const name = bookmark.name;
    const url = bookmark.url;

    bookmarksDivEl.innerHTML += `
      <div class="well">
        <h3>${name}
          <a class="btn btn-default" target="_blank" href=${url}>Visit</a>
          <a class="btn btn-danger" href="#" onclick="deleteBookmark('${url}')">Delete</a>
        </h3>
      </div>
    `;
  }
}

function deleteBookmark(url) {
  const storedBookmarksArr = JSON.parse(localStorage.getItem('bookmarks'));
  const bookmarkIndex = storedBookmarksArr.findIndex(currItem => currItem.url === url);
  storedBookmarksArr.splice(bookmarkIndex, 1);
  localStorage.setItem('bookmarks', JSON.stringify(storedBookmarksArr));
  fetchBookmarks();
}

window.deleteBookmark = deleteBookmark;