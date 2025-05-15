$(document).on('click', '.like[data-fav]', function (e) {
    e.preventDefault();

    const $like = $(this);
    const productId = parseInt($like.data('fav'));

    if (!productId) return;

    $.ajax({
        url: '/local/ajax/favorites.php',
        type: 'POST',
        data: JSON.stringify({ id: productId }),
        contentType: 'application/json',
        dataType: 'json',
        success: function (data) {
            if (data.redirectToLogin) {
                $('[data-opener="auth"]').trigger('click');
                return;
            }

            if (data.success) {
                $like.toggleClass('active', data.favorited);

                const $counter = $('.header_user-favourites .counter');
                if ($counter.length) {
                    $counter.text(data.count);
                }
            }
        },
        error: function () {
            console.error('Ошибка при добавлении в избранное');
        }
    });
});