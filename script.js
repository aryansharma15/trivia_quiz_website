document.addEventListener("DOMContentLoaded", () => {
	const api = "https://the-trivia-api.com/v2/questions";
	const selDiffic = document.getElementById("diffic");
	const selCateg = document.getElementById("categ");

	console.log(api);
	console.log(selDiffic);
	console.log(selCateg);

	function selBackground(selection) {
		if (selection.value !== "") {
			selection.style.backgroundColor = "#b8fbcd";
		}

		console.log("selBack was run");
	}

	selDiffic.addEventListener("change", () => {
		selBackground(selDiffic);
	});

	// function listeners() {
	// 	selDiffic.addEventListener("change", selBackground);
	// }
});
