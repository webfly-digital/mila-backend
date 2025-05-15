$(document).on('click', '.like[data-fav]', function (e) {
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
                // todo: вставить счётчик при необходимости
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error('Ошибка ajax:', jqXHR.status, jqXHR.statusText, errorThrown);
        }
    });
});