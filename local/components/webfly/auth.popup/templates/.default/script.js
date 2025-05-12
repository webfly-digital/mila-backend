document.addEventListener('DOMContentLoaded', function () {
    const registerForms = document.querySelectorAll('.register_form');

    registerForms.forEach(form => {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            const formData = new FormData(form);
            const isLegal = form.dataset.type === 'form-legal';
            formData.append('USER_TYPE', isLegal ? 'legal' : 'individual');

            fetch('/local/ajax/register_user.php', {
                method: 'POST',
                body: formData,
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                },
            })
                .then(response => response.json())
                .then(result => {
                    if (result.status === 'success') {
                        alert('Регистрация прошла успешно!');
                        if (typeof closePopup === 'function') closePopup('register');
                        if (typeof openPopup === 'function') openPopup('auth'); // если нужно открыть авторизацию
                    } else {
                        alert(result.message || 'Ошибка регистрации');
                    }
                })
                .catch(err => {
                    console.error('Ошибка запроса:', err);
                    alert('Ошибка при отправке формы');
                });
        });
    });
});