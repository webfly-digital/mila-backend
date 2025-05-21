document.addEventListener('DOMContentLoaded', function () {
    const input = document.getElementById('title-search-input');
    const resultsList = document.querySelector('.search_results-list');
    const resultsWrapper = document.querySelector('.search_results');

    if (!input || !resultsList || !resultsWrapper) return;

    let timer;

    input.addEventListener('keyup', function () {
        const query = input.value.trim();

        clearTimeout(timer);

        if (query.length < 3) {
            resultsList.innerHTML = '';
            resultsWrapper.style.display = 'none';
            return;
        }

        timer = setTimeout(function () {
            fetch('/local/ajax/search.php?q=' + encodeURIComponent(query))
                .then(response => response.json())
                .then(data => {
                    resultsList.innerHTML = '';

                    if (!data.length) {
                        resultsWrapper.style.display = 'none';
                        return;
                    }

                    data.forEach(function (item) {
                        const a = document.createElement('a');
                        a.href = item.url;

                        if (item.image) {
                            const img = document.createElement('img');
                            img.src = item.image;
                            img.alt = item.name;
                            a.appendChild(img);
                        }

                        const title = document.createElement('p');
                        title.className = 'text title';
                        title.textContent = item.name;
                        a.appendChild(title);

                        if (item.price) {
                            const price = document.createElement('p');
                            price.className = 'text price';
                            price.textContent = `${item.price} ₽`;
                            a.appendChild(price);
                        }

                        resultsList.appendChild(a);
                    });

                    resultsWrapper.style.display = '';
                });
        }, 300);
    });
});