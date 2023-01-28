const btn = document.querySelector('.j-btn-test');
const iconOne = document.querySelector('.btn_icon1')
const iconTwo = document.querySelector('.btn_icon2')

btn.addEventListener('click', () => {
    iconOne.classList.toggle('hidden')
    iconTwo.classList.toggle('unset')
});