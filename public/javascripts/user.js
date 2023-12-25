const mathTypeInput = document.querySelector('#mathType')
const addBtn = document.querySelector('#add-btn')
const multiplyBtn = document.querySelector('#multiply-btn')
const calculateForm = document.querySelector('#calculate-form')

addBtn.addEventListener('click', () => {
  mathTypeInput.value = 'add'
  calculateForm.submit()
})

multiplyBtn.addEventListener('click', () => {
  mathTypeInput.value = 'multiply'
  calculateForm.submit()
})