document.addEventListener("DOMContentLoaded", () => {
	const api = "https://the-trivia-api.com/v2/questions";
	const selDiffic = document.getElementById("diffic");
	const selCateg = document.getElementById("categ");
	const startBtn = document.getElementsByClassName("start-btn");

	console.log(api);
	console.log(selDiffic);
	console.log(selCateg);
	console.log(startBtn);

	function selBackground(selection) {
		if (selection.value === "") {
			selection.classList.remove("selected");
		} else {
			selection.classList.add("selected");
		}
	}

	function listeners() {
		selDiffic.addEventListener("input", () => {
			selBackground(selDiffic);
			selDiffic.blur();
		});

		selCateg.addEventListener("input", () => {
			selBackground(selCateg);
			selCateg.blur();
		});

		startBtn.addEventListener("click", () => {});
	}

	window.onload = () => {
		listeners();
	};

	// function listeners() {
	// 	selDiffic.addEventListener("change", selBackground);
	// }
});
