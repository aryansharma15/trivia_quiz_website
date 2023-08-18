document.addEventListener("DOMContentLoaded", () => {
	const api = "https://the-trivia-api.com/v2/questions";
	const selDiffic = document.getElementById("diffic");
	const selCateg = document.getElementById("categ");
	const startBtn = document.getElementsByClassName("start-btn")[0];
	const landingContent = document.getElementsByClassName("top-content")[0];
	const quizSect = document.getElementsByClassName("quiz-section")[0];

	const alert = document.getElementById("custom-modal");
	const alertMessage = document.getElementById("modal-message");
	const alertBtn = document.getElementById("modal-close-btn");

	function selBackground(selection) {
		if (selection.value === "") {
			selection.classList.remove("selected");
		} else {
			selection.classList.add("selected");
		}
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
				landingContent.classList.add("hidden");
				quizSect.classList.remove("hidden");
				// quizSect.classList.add("visible");
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
	};
});
