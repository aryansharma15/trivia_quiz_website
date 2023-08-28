document.addEventListener("DOMContentLoaded", () => {
	const selDiffic = document.getElementById("diffic");
	const selCateg = document.getElementById("categ");
	const startBtn = document.getElementsByClassName("start-btn")[0];
	const landingContent = document.getElementsByClassName("top-content")[0];
	const quizSect = document.getElementsByClassName("quiz-section")[0];
	const scoreSection = document.getElementsByClassName("score-section")[0];
	const playAgainBtn = document.getElementById("play-again");

	let correctAns = 0;
	let incorrectAns = 0;
	let selectedOption = null;

	function resultDisplay(correctAnswers, incorrectAnswers) {
		const resultScore = document.getElementById("score-result");
		const correctScore = document.getElementById("correct-result");
		const incorrectScore = document.getElementById("incorrect-result");
		const passedResult = document.getElementById("passed-result");

		let i = 10 * correctAnswers - 2 * incorrectAnswers;

		let j = 10 - (correctAnswers + incorrectAnswers);

		resultScore.textContent = `Your final score is: ${i}`;
		correctScore.textContent = `You answered ${correctAnswers} questions correctly. (x10)`;
		incorrectScore.textContent = `You answered ${incorrectAnswers} questions correctly. (x-2)`;
		passedResult.textContent = `You passed on ${j} questions.`;

		// Correct answers displayed...
		// const questionsContainer = document.querySelector(".questions");
		// const correctAnswerElements = document.querySelectorAll(".correct-answer");

		// correctAnswerElements.forEach((correctAnswerElement) => {
		// 	const clonedCorrectAnswer = correctAnswerElement.cloneNode(true);
		// 	questionsContainer.appendChild(clonedCorrectAnswer);
		// });
	}

	function showScore(correctAnswers, incorrectAnswers) {
		// const totalQuesElem = document.getElementById("total-questions");
		const correctAnsElem = document.getElementById("correct-ans");
		const incorrectAnsElem = document.getElementById("incorrect-ans");

		correctAnsElem.textContent = `Correct Answers: ${correctAnswers}`;
		incorrectAnsElem.textContent = `Incorrect Answers: ${incorrectAnswers}`;
	}

	// display next question logic
	let currentQuestionIndex = 0;
	function displayNextQues() {
		if (currentQuestionIndex < l) {
			const currentQuestion = questions[currentQuestionIndex];
			setTimeout(() => {
				displayQuestions(currentQuestion);
			}, 1000);
			currentQuestionIndex++;
		} else {
			console.log("Quiz Complete");
			quizSect.style.display = "none";
			scoreSection.style.display = "block";
		}
	}

	function selBackground(selection) {
		if (selection.value === "") {
			selection.classList.remove("selected");
		} else {
			selection.classList.add("selected");
		}
	}

	function quizForfeit() {
		location.reload();
	}

	function shuffleArr(array) {
		const shuffled = array.slice();
		for (let i = shuffled.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
		}

		return shuffled;
	}

	function checkAnswer(isCorrect, selectedOption) {
		if (isCorrect) {
			selectedOption.classList.add("correct");
			showVanishingAlert("Correct! Well Done.", 2000);
			correctAns++;
		} else {
			selectedOption.classList.add("incorrect");
			showVanishingAlert("Incorrect. Focus!", 2000);
			incorrectAns++;
		}

		displayNextQues();
		showScore(correctAns, incorrectAns);
		resultDisplay(correctAns, incorrectAns);
	}

	function decodeHtmlEntities(text) {
		const parser = new DOMParser();
		const decoded = parser.parseFromString(`<!doctype html><body>${text}`, "text/html").body.textContent;
		return decoded;
	}

	function displayQuestions(quesData) {
		// const questions = document.getElementsByClassName("questions");
		const questions = document.querySelector(".questions");
		questions.innerHTML = "";

		const questionElement = document.createElement("div");
		questionElement.classList.add("question");

		// questionElement.textContent = quesData.question;
		const decodedQuestion = decodeHtmlEntities(quesData.question); // Decode the question text
		questionElement.textContent = decodedQuestion;

		const answerChoices = [...quesData.incorrect_answers, quesData.correct_answer];
		const shuffledChoices = shuffleArr(answerChoices);

		const optionsContainer = document.createElement("div");
		optionsContainer.classList.add("options");

		shuffledChoices.forEach((choice) => {
			const optionElement = document.createElement("button");
			optionElement.classList.add("choice");

			const decodedChoice = decodeHtmlEntities(choice);
			optionElement.textContent = decodedChoice;

			optionElement.addEventListener("click", (event) => {
				selectedOption = event.target;
				checkAnswer(choice === quesData.correct_answer, selectedOption);
			});

			optionsContainer.appendChild(optionElement);
		});

		questionElement.appendChild(optionsContainer);
		questions.appendChild(questionElement);
	}

	async function startQuiz(categ, diffic) {
		let dif = diffic.toLowerCase();
		const apiUrl = `https://opentdb.com/api.php?amount=10&category=${categ}&difficulty=${dif}&type=multiple`;
		try {
			// console.log(apiUrl);
			const data = await fetch(apiUrl);
			const res = await data.json();
			// console.log(res);

			if (data.status !== 200) {
				console.error("API Error:", data.status, data.statusText);
				// Handle the error appropriately
			}

			questions = res.results;
			l = questions.length;
			// let currentQuestionIndex = 0;

			displayNextQues();

			const nextButton = document.getElementById("next-btn");
			nextButton.addEventListener("click", () => {
				displayNextQues();
				showVanishingAlert("Passed");
			});

			// console.log(res);
		} catch (error) {
			console.error("Error fetching questions: ", error);
			showVanishingAlert("Error occurred while fetching questions");
		}
	}

	function listeners() {
		// alertBtn.addEventListener("click", () => {
		// 	alert.style.display = "none";
		// });
		selDiffic.addEventListener("input", () => {
			selBackground(selDiffic);
			selDiffic.blur();
		});

		selCateg.addEventListener("input", () => {
			selBackground(selCateg);
			selCateg.blur();
		});

		startBtn.addEventListener("click", () => {
			const selectedCategory = selCateg.options[selCateg.selectedIndex];
			const selectedCategoryId = selectedCategory.getAttribute("data-id");
			// console.log(selectedCategoryId);
			const selectedDifficulty = selDiffic.value;

			if (selectedCategory !== "" && selectedDifficulty !== "") {
				landingContent.style.display = "none";
				quizSect.style.display = "block";
				// console.log("Running the display change");

				const backBtn = document.getElementById("forfeit-btn");
				backBtn.addEventListener("click", () => {
					quizForfeit();
				});

				startQuiz(selectedCategoryId, selectedDifficulty);
			} else if (selectedCategory === "" && selectedDifficulty !== "") {
				showClickableAlert("Please select a valid category to continue.");
			} else if (selectedCategory !== "" && selectedDifficulty === "") {
				showClickableAlert("Please select a valid difficulty to continue.");
			} else {
				showClickableAlert("Please choose a category and a difficulty before continuing.");
			}
		});

		playAgainBtn.addEventListener("click", quizForfeit);
	}

	function showVanishingAlert(message, duration = 2000) {
		const alertContainer = document.createElement("div");
		alertContainer.className = "auto-vanishing-alert";

		const alertMessage = document.createElement("p");
		alertMessage.textContent = message;

		alertContainer.appendChild(alertMessage);
		document.body.appendChild(alertContainer);

		setTimeout(() => {
			document.body.removeChild(alertContainer);
		}, duration);
	}

	function showClickableAlert(message) {
		const alertContainer = document.createElement("div");
		alertContainer.className = "clickable-alert";

		const alertMessage = document.createElement("p");
		alertMessage.textContent = message;

		const closeButton = document.createElement("button");
		closeButton.textContent = "OK";
		closeButton.addEventListener("click", () => {
			document.body.removeChild(alertContainer);
		});

		alertContainer.appendChild(alertMessage);
		alertContainer.appendChild(closeButton);
		document.body.appendChild(alertContainer);
	}

	window.onload = () => {
		listeners();
		quizSect.classList.add("hidden");
	};
});
