const bookContainer = document.querySelector('.list-book')
const searchBinder = document.querySelector('.search')
const getBinder = async book => {
    const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${book}`
    )
    const data = await response.json()
    return data
}
const drawListBook = async () => {
    if (searchBinder.value !== '') {
        const data = await getBinder(searchBinder.value)
        bookContainer.innerHTML = data.items
            .map(({
                      volumeInfo
                  }) => `<div class='book'><a href='${volumeInfo.infoLink}' target='_blank'><img class='thumbnail' src='${volumeInfo.imageLinks.thumbnail}'></a><div class='book-info'><a href='${volumeInfo.infoLink}' target='_blank'><h2 class='book-title'>${volumeInfo.title}</h2></a><a class='book-authors' href='javascript:updateAuthor(this);'>${volumeInfo.authors}</a></div></div>`)
            .join('')
    }
}
const updateAuthor = (e) => {
    document.querySelector('.search').value = `inauthor:` + e.innerHTML
    debounce(drawListBook, 1000)
}
const debounce = (fn, time, to = null) =>
    to ? clearTimeout(to) : (to = setTimeout(drawListBook, time))
searchBinder.addEventListener('change', () => debounce(drawListBook, 1000))