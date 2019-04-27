'use strict';

var howWeDo;
var howWeDoIndex = 1;
var howWeDoMax = 3;
var productsMembers = 1;
var productsContent = 1;

$(function () {

	// Custom JS

	// START parallax effect

	var parallax = new Parallax(document.getElementById("parallax_scene"));
	setTimeout(function () {
		parallax.depths = [0.05, 0.03]
	}, 1700);

	// FINISH parallax effect

	// START animations

	$("body").css("opacity", 1);
	setTimeout(function () {
		$("#maxiru article").removeClass("hidden");
	}, 700)

	// FINISH animations

	// START scroll-based animations
	// https://github.com/jlmakes/scrollreveal
	
	var controller = new ScrollMagic.Controller();

	new ScrollMagic.Scene({
		triggerElement: "#maxiru",
		triggerHook: "onLeave",
		offset: 150
	}).addTo(controller)
		.on("progress", function () {
			$(".main").toggleClass("noconers");
		});

	new ScrollMagic.Scene({
		triggerElement: "#contacts",
		offset: 300
	}).addTo(controller)
		.on("progress", function () {
			$(".main").toggleClass("noconers");
		});

	new ScrollMagic.Scene({
		triggerElement: "#services",
		triggerHook: "onEnter",
		offset: 150
	}).addTo(controller)
		.on("progress", function () {
			$("#services article").toggleClass("hidden");
		});

	new ScrollMagic.Scene({
		triggerElement: "#works",
		triggerHook: "onEnter",
		offset: 150
	}).addTo(controller)
		.on("progress", function () {
			$("#works article").toggleClass("hidden");
		});

	new ScrollMagic.Scene({
		triggerElement: "#about",
		triggerHook: "onEnter",
		offset: 150
	}).addTo(controller)
		.on("progress", function () {
			$("#about article").toggleClass("hidden");
		});

	new ScrollMagic.Scene({
		triggerElement: "#fabric",
		triggerHook: "onEnter",
		offset: 150
	}).addTo(controller)
		.on("progress", function () {
			$("#fabric article").toggleClass("hidden");
		});

	new ScrollMagic.Scene({
		triggerElement: "#contacts",
		triggerHook: "onEnter",
		offset: 300
	}).addTo(controller)
		.on("progress", function () {
			$("#contacts article").toggleClass("hidden");
		})
		// .addIndicators(); // debug mode

	controller.scrollTo(function (newpos) {
		TweenMax.to(window, 0.5, {scrollTo: {y: newpos}});
	});

	var today = new Date();
	$("#date").text(today.getFullYear());

	$(document).on("click", "a[href^='#']", function (e) {
		$("body").css({
			"overflow": "",
			"height": ""
		});
		if ($("header nav").hasClass("opened")) {
			$("footer").removeClass("hidden");
		}
		$("header nav").removeClass("opened");
		$(".hamburger-ico").removeClass("cross");
		let id = $(this).attr("href");
		if ($(id).length > 0) {
			e.preventDefault();
			controller.scrollTo(id);
			if (window.history && window.history.pushState) {
				history.pushState("", document.title, id);
			}
		}
	});

	$(".hamburger-ico").click(function() {
		if ($("header nav").hasClass("opened")) {
			$("body").css({
				"overflow": "",
				"height": ""
			});
			if (!$("#work-page").length)
				$("footer").removeClass("hidden");
			$(".hamburger-ico").removeClass("cross");
			$("header nav").removeClass("opened");
		} else {
			$("body").css({
				"overflow": "hidden",
				"height": "100vh"
			});
			$("footer").addClass("hidden");
			$(".hamburger-ico").addClass("cross");
			$("header nav").addClass("opened");
		}
	});

	relax();
	$(window).scroll(function() {
		relax();
		landings();
	});
	$(window).resize(function() {
		landings();
	});

	function relax() {
    if (window.innerWidth > 1200) {
			$(".do-relax").each(function() {
				if ($(this).offset().top < parseInt($(document).scrollTop()) + ($(window).innerHeight()) && $(this).offset().top > parseInt($(document).scrollTop()) - ($(window).innerHeight())) {
					var speed = 10;
					if ($(this).is("[data-speed]")) {
						speed = speed / parseFloat($(this).attr("data-speed"));
					}
					$(this).css({
						"transform": "translateY(" + ((parseInt($(document).scrollTop()) - $(this).offset().top) / speed) + "px)"
					});
				}
			});
    } else {
        $(".do-relax").each(function() {
            $(this).css({
                "transform": "translateY(0)"
            });
        });
    }
	}

	function landings() {
    if (!$("#about article").hasClass("hidden")) {
			var relaxInterval = setInterval(function() {
				relax();
			}, 25);
			setTimeout(function() {
				clearInterval(relaxInterval);
			}, 1000);
    }
	}

	// FINISH scroll-based animations

	howWeDoGo(howWeDoIndex);
	$("#step1").click(function() {
		howWeDoIndex = 1;
		howWeDoGo();
	});
	$("#step2").click(function() {
		howWeDoIndex = 2;
		howWeDoGo();
	});
	$("#step3").click(function() {
		howWeDoIndex = 3;
		howWeDoGo();
	});
	
	$("#about .buttons input[value=next]").click(function() {
		if ($(this).attr("data-active") == "true") {
			$("#about .buttons input").attr("data-active", "false");
			hideLeft(productsMembers, productsContent);
			productsMembers++;
			if (productsMembers > 3)
				productsMembers = 1;
			productsContent++;
			if (productsContent > 3)
				productsContent = 1;
			
			let members = `#about .photo[data-order=${productsMembers}]`;
			let content = `#about .content[data-order=${productsContent}]`;

			$(members).removeClass("hidden");
			$(members).addClass("hidden-right");
			$(content).removeClass("hidden");
			$(content).addClass("hidden-right");
			setTimeout(function() {
				$(members).addClass("shown");
			}, 100);
			setTimeout(function() {
				$(content).addClass("shown");
			}, 200);
			setTimeout(function() {
				$(members).removeClass("hidden-right");
			}, 950);
			setTimeout(function() {
				$(content).removeClass("hidden-right");
				$("#about .buttons input").attr("data-active", "true");
			}, 1050);
		}
	});

	function hideLeft(m, c) {
		$(`#about .photo[data-order=${m}]`).addClass("hide-left");
		$(`#about .content[data-order=${c}]`).addClass("hide-left");
		setTimeout(function() {
			$(`#about .photo[data-order=${m}]`).removeClass("shown hide-left");
			$(`#about .photo[data-order=${m}]`).addClass("hidden");
			$(`#about .content[data-order=${c}]`).removeClass("shown hide-left");
			$(`#about .content[data-order=${c}]`).addClass("hidden");
		}, 1000);
	}

	$("#about .buttons input[value=prev]").click(function() {
		if ($(this).attr("data-active") == "true") {
			$("#about .buttons input").attr("data-active", "false");
			hideRight(productsMembers, productsContent);
			productsMembers--;
			if (productsMembers < 1)
				productsMembers = 3;
			productsContent--;
			if (productsContent < 1)
				productsContent = 3;
			
			let members = `#about .photo[data-order=${productsMembers}]`;
			let content = `#about .content[data-order=${productsContent}]`;

			$(members).removeClass("hidden");
			$(members).addClass("hidden-left");
			$(content).removeClass("hidden");
			$(content).addClass("hidden-left");
			setTimeout(function() {
				$(members).addClass("shown");
			}, 200);
			setTimeout(function() {
				$(content).addClass("shown");
			}, 100);
			setTimeout(function() {
				$(members).removeClass("hidden-left");
				$("#about .buttons input").attr("data-active", "true");
			}, 1050);
			setTimeout(function() {
				$(content).removeClass("hidden-left");
			}, 950);
		}
	});

	function hideRight(m, c) {
		$(`#about .photo[data-order=${m}]`).addClass("hide-right");
		$(`#about .content[data-order=${c}]`).addClass("hide-right");
		setTimeout(function() {
			$(`#about .photo[data-order=${m}]`).removeClass("shown hide-right");
			$(`#about .photo[data-order=${m}]`).addClass("hidden");
			$(`#about .content[data-order=${c}]`).removeClass("shown hide-right");
			$(`#about .content[data-order=${c}]`).addClass("hidden");
		}, 1000);
	};

	$(".bottom-bg-section").css("height", (parseInt($("#about").innerHeight()) + parseInt($("#fabric").innerHeight()) + parseInt($("#contact").innerHeight())) + "px");
	$(".bottom-bg-section .black-bg").css("height", (parseInt($("#about").innerHeight()) + parseInt($("#fabric").innerHeight())) + "px");
});

function howWeDoGo() {
	clearInterval(howWeDo);
	$(".step").removeClass("active");
	$("#step" + howWeDoIndex).addClass("active");
	howWeDo = setInterval(function() {
			howWeDoIndex++;
			if (howWeDoIndex > howWeDoMax)
					howWeDoIndex -= howWeDoMax;
			$(".step").removeClass("active");
			$("#step" + howWeDoIndex).addClass("active");
	}, 8000);
}