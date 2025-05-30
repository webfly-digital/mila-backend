<div class="popup side" data-popup="review">
    <i class="close" data-closer="review"></i>
    <form class="review_content" enctype="multipart/form-data">
        <p class="heading_2">Оставить отзыв</p>

        <div class="review_score">
            <input type="number" name="rating" hidden value="5">
            <p class="heading_5">Ваша оценка</p>
            <ul>
                <li data-score="5"></li>
                <li data-score="4"></li>
                <li data-score="3"></li>
                <li data-score="2"></li>
                <li data-score="1"></li>
            </ul>
        </div>

        <label class="label">
            <p class="notify">Имя</p>
            <input type="text" name="name" placeholder="Имя" required>
        </label>

        <label class="label">
            <p class="notify">Комментарий</p>
            <textarea name="comment" placeholder="Комментарий" required></textarea>
        </label>

        <div class="dropzone">
            <label class="label">
                <input type="file" name="images[]" multiple accept="image/*">
            </label>
        </div>

        <button type="submit" class="button full-w">Отправить</button>

        <p class="small_text grey">
            Нажимая кнопку, я соглашаюсь с
            <a href="">условиями продажи</a>,
            <a href="">условиями обработки платежей</a>,
            <a href="">политикой конфиденциальности</a>
        </p>
    </form>
</div>