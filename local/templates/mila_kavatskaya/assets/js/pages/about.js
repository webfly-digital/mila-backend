$(function () {
    $("body").on("submit", ".review_content", function (e) {
        e.preventDefault();

        const $form = $(this);
        const formData = new FormData();

        const rating = $form.find("input[name='rating']").val() || 5;
        const name = $form.find("input[name='name']").val();
        const comment = $form.find("textarea[name='comment']").val();

        formData.append("rating", rating);
        formData.append("name", name);
        formData.append("comment", comment);

        $form.find("input[type='file']").each(function (i, input) {
            if (input.files.length) {
                for (let file of input.files) {
                    formData.append("images[]", file);
                }
            }
        });

        $.ajax({
            url: "/local/ajax/add_review.php",
            method: "POST",
            data: formData,
            processData: false,
            contentType: false,
            dataType: "json",
            success: function (res) {
                if (res.success) {
                    location.reload();
                } else {
                    alert("Ошибка: " + (res.error || "Не удалось отправить"));
                }
            },
            error: function () {
                alert("Ошибка отправки запроса");
            }
        });
    });
});