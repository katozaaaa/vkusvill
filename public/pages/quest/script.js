document.addEventListener('DOMContentLoaded', function () {
    // Prevent buttons and refs default behavior
    Array.from(document.querySelectorAll('button'))
    .concat(...document.querySelectorAll('a'))
    .forEach((el) => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
        });
    });
});