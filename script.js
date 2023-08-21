document.addEventListener("DOMContentLoaded", () => {
	// const api = "https://the-trivia-api.com/v2/questions";
	const selDiffic = document.getElementById("diffic");
	const selCateg = document.getElementById("categ");
	const startBtn = document.getElementsByClassName("start-btn")[0];
	const landingContent = document.getElementsByClassName("top-content")[0];
	const quizSect = document.getElementsByClassName("quiz-section")[0];

	const alert = document.getElementById("custom-modal");
	const alertMessage = document.getElementById("modal-message");
	const alertBtn = document.getElementById("modal-close-btn");

	const time = document.getElementsByClassName("time")[0];

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

	function checkAnswer(isCorrect) {
		if (isCorrect) {
		} else {
		}
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

		questionElement.textContent = quesData.question;

		const answerChoices = [...quesData.incorrect_answers, quesData.correct_answer];
		const shuffledChoices = shuffleArr(answerChoices);

		const optionsContainer = document.createElement("div");
		optionsContainer.classList.add("options");

		// console.log(questions);
		shuffledChoices.forEach((choice) => {
			const optionElement = document.createElement("button");
			optionElement.classList.add("choice");

			const decodedChoice = decodeHtmlEntities(choice);
			optionElement.textContent = decodedChoice;

			optionElement.addEventListener("click", () => {
				checkAnswer(choice === quesData.correct_answer);
			});

			optionsContainer.appendChild(optionElement);
		});

		questionElement.appendChild(optionsContainer);
		questions.appendChild(questionElement);
	}

	async function startQuiz(categ, diffic) {
		// const apiUrl = `https://opentdb.com/api.php?amount=10&category=19&difficulty=${diffic}&type=multiple`;
		const apiUrl = `https://opentdb.com/api.php?amount=10&category=11&difficulty=medium&type=multiple`;
		const data = await fetch(apiUrl);
		const res = await data.json();

		const questions = res.results;
		l = questions.length;
		let currentQuestionIndex = 0;

		const displayNextQues = () => {
			if (currentQuestionIndex < l) {
				const currentQuestion = questions[currentQuestionIndex];
				displayQuestions(currentQuestion);
				currentQuestionIndex++;
			} else {
				console.log("Quiz Complete");
			}
		};

		displayNextQues();

		const nextButton = document.getElementById("next-btn");

		nextButton.addEventListener("click", () => {
			displayNextQues();
			console.log("Next button clicked");
		});

		console.log(res);
	}

	function listeners() {
		alertBtn.addEventListener("click", () => {
			alert.style.display = "none";
		});
		selDiffic.addEventListener("input", () => {
			selBackground(selDiffic);
			selDiffic.blur();
		});

		selCateg.addEventListener("input", () => {
			selBackground(selCateg);
			selCateg.blur();
		});

		startBtn.addEventListener("click", () => {
			const selectedCategory = selCateg.value;
			const selectedDifficulty = selDiffic.value;

			if (selectedCategory !== "" && selectedDifficulty !== "") {
				landingContent.style.display = "none";
				quizSect.style.display = "block";
				// console.log("Running the display change");

				const backBtn = document.getElementById("forfeit-btn");
				backBtn.addEventListener("click", () => {
					quizForfeit();
				});

				startQuiz(selectedCategory, selectedDifficulty);

				// console.log(backBtn);
				// console.log(selectedCategory);
				// console.log(selectedDifficulty);
			} else if (selectedCategory === "" && selectedDifficulty !== "") {
				showAlert("Please select a valid category to continue.");
			} else if (selectedCategory !== "" && selectedDifficulty === "") {
				showAlert("Please select a valid difficulty to continue.");
			} else {
				showAlert("Please choose a category and a difficulty before continuing.");
			}
		});
	}

	function showAlert(message) {
		alert.style.display = "flex";
		alertMessage.textContent = message;
	}

	window.onload = () => {
		listeners();
		quizSect.classList.add("hidden");
	};
});
