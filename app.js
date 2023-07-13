const form = document.querySelector('form')
const finalScoreContainer = document.querySelector('.result')
const correctAnswers = ['A', 'C', 'D', 'B', 'A', 'D', 'C', 'B', 'A', 'A']
const buttonSubmit = document.querySelector('button[type="submit"]')

let score = 0

const userAnswers = []

const getUserAnswers = () => {
  correctAnswers.forEach((_, index) => {
    const userAnswer = form[`inputQuestion${index + 1}`].value
    userAnswers.push(userAnswer)
  })
}

const calculateUserScore = () => {
  userAnswers.forEach((answer, index) => {
    const isUserAnswerCorrect = answer === correctAnswers[index]
    if (isUserAnswerCorrect) {
      score += 10
    }
  })
}

const markCorrectAnswers = () => {
  correctAnswers.forEach((correctAnswer, index) => {
    const questionIndex = index + 1
    const correctInput = document.querySelector(`input[name="inputQuestion${questionIndex}"][value="${correctAnswer}"]`)
    correctInput.parentElement.classList.add('success')
  })
}

const markUserAnswers = () => {
  userAnswers.forEach((userAnswer, index) => {
    const questionIndex = index + 1
    const userInput = document.querySelector(`input[name="inputQuestion${questionIndex}"][value="${userAnswer}"]`)
    const correctAnswer = correctAnswers[questionIndex - 1]
    const isValidAnswer = userAnswer === correctAnswer

    if (userInput) {
      if (isValidAnswer) {
        userInput.parentElement.classList.add('success')
      } else {
        userInput.parentElement.classList.add('error')
        const correctInput = document.querySelector(`input[name="inputQuestion${questionIndex}"][value="${correctAnswer}"]`)
        if (correctInput) {
          correctInput.parentElement.classList.add('success')
        }
      }
    }
  })
}

const showFinalScore = () => {
  scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  })
  finalScoreContainer.classList.remove('d-none')
}

const animationFinalScore = () => {
  let counter = 0
  const time = setInterval(() => {
    if (counter === score) {
      clearInterval(time)
    }
    finalScoreContainer.querySelector('span').textContent = `${counter++}%`
  }, 25)
}

const disableSubmitButton = () => {
  buttonSubmit.style.display = 'none'
}

form.addEventListener('submit', event => {
  event.preventDefault()
  getUserAnswers()
  calculateUserScore()
  showFinalScore()
  animationFinalScore()
  markCorrectAnswers()
  markUserAnswers()
  disableSubmitButton()
})
