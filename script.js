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
	console.log(time);

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

	async function startQuiz(categ) {
		const apiUrl = `https://the-trivia-api.com/v2/questions?category=${encodeURI(categ)}`;
		const data = await fetch(apiUrl);
		const res = await data.json();

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
				console.log("Running the display change");

				const backBtn = document.getElementById("forfeit-btn");
				backBtn.addEventListener("click", () => {
					quizForfeit();
				});

				startQuiz(selectedCategory);

				console.log(backBtn);
				console.log(selectedCategory);
				console.log(selectedDifficulty);
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
