(function() {
	document.addEventListener("DOMContentLoaded", function() {
		var links = document.getElementsByClassName("modalYT");

		if(links.length !== 0) {
			for(let i = 0; i < links.length; i++) {
				let link = links[i];

				link.addEventListener("click", function(event) {
					event = event || window.event;
					event.preventDefault();

					YoutubeModal.create(this);
				});
			}
		}

		var YoutubeModal = (function() {
			var __private = {
				set(elem) {
					this.link = elem;
					this.videoID = elem.getAttribute("href");
					this.boxClassName = "modalYT__popup";
					this.closeClassName = "modalYT__close";
					this.boxID = this.videoID + "-box";
					this.closeID = this.videoID + "-close";
				},

				box() {
					var container = document.createElement("div");

					container.id = this.boxID;
					container.classList.add(this.boxClassName);
					container.innerHTML = `
						<div class=${this.closeClassName} id="${this.closeID}"></div>
						<iframe width="640" height="360" src="https://www.youtube.com/embed/${this.videoID}?autoplay=1" frameborder="0" allowfullscreen></iframe>
					`;

					this.link.parentElement.insertBefore(container, this.link.previousElementSibling);
				},

				remove() {
					document.getElementById(this.closeID).addEventListener("click", function() {
						var box = this.parentElement;
						var container = box.parentElement;

						container.removeChild(box);
					});
				}
			};

			return {
				create(elem) {
					__private.set(elem);
					__private.box();
					__private.remove();
				}
			};
		})();
	});
})();