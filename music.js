var mouse = {
	x: window.innerWidth * 0.5,
	y: window.innerHeight * 0.5,
}

//setup input
var input = {
	mouseX: {
		start: 0,
		end: window.innerWidth,
		current: mouse.x
	},
	mouseY: {
		start: 0,
		end: window.innerHeight,
		current: mouse.y
	},

};
input.mouseX.range = input.mouseX.end - input.mouseX.start;
input.mouseY.range = input.mouseY.end - input.mouseY.start;

//setup output
var output = {
	blur: {
		start: 0.2,
		range: 10,
	},
	x: {
		start: -150,
		end: 150,
		current: 0,
	},
	y: {
		start: -150,
		end: 150,
		current: 0,
	},
	z: {
		range: 10000,
	}
};
output.x.range = output.x.end - output.x.start;
output.y.range = output.y.end - output.y.start;

var parallaxContainer = document.getElementById('parallaxContainer');
var itemsArray = [];

for (var i = 0; i <23; i++) {

	//create new element with parallax item classname, create note inside element
	//add element to container
	var item = document.createElement('div');
	item.className = 'parallax-item';
	itemsArray.push(item);


	var note = document.createElement('div');
	note.className = 'note';
	item.appendChild(note);

	parallaxContainer.appendChild(item);

	//random width height depth rotation and background img
	var bgImgNum = Math.round(Math.random() * 3);
	var depth = Math.random();
	var rotateNum = (360 * Math.random());
	var blur = (depth - output.blur.start) * output.blur.range;
	var zIndex = output.z.range - (depth * output.z.range);

	item.style.zIndex = zIndex;
	item.style.width = (500 * Math.random()) + 50;
	item.style.height = (500 * Math.random()) + 50;
	item.dataset.depth = depth;
	note.style.transform = 'rotate('+rotateNum+'deg)';

	note.style.backgroundImage ='url(css/note'+bgImgNum+'.png)';

	//blurriness
	
	item.style.filter = 'blur('+blur+'px)';

	item.style.top = Math.round(Math.random() * 100 - 20) + '%';
	item.style.left = Math.round(Math.random() * 100 - 20) + '%';

}

//MouseMovement (var mouse at the beginning)


var updateInputs = function (event) {
	
	input.mouseX.current = mouse.x;
	input.mouseY.current = mouse.y;
	input.mouseX.fraction = (input.mouseX.current- input.mouseX.start)/ input.mouseX.range;
	input.mouseY.fraction = (input.mouseY.current- input.mouseY.start)/ input.mouseY.range;
}
var updateOutputs = function () {
	//output current
	 output.x.current = output.x.end - (input.mouseX.fraction * output.x.range);
	 output.y.current = output.y.end - (input.mouseY.fraction * output.y.range);
}

var updateParallaxItems = function () {
	//apply to html
	itemsArray.forEach(function(item, i) {
		var depth = parseFloat(item.dataset.depth, 10);
		var itemOutput = {
			x: output.x.current * depth,
			y: output.y.current * depth,
		}
		item.style.transform = 'translate('+itemOutput.x+'px, '+itemOutput.y+'px)';

	})

}

var handleMouseMove = function () {
	mouse.x = event.clientX;
	mouse.y = event.clientY;

	updateInputs ();
	updateOutputs ();
	updateParallaxItems ();

	
}

var handleResize = function () {
	input.mouseX.end = window.innerWidth;
	input.mouseY.end = window.innerHeight;
	input.mouseX.range = input.mouseX.end - input.mouseX.start;
	input.mouseY.range = input.mouseY.end - input.mouseY.start;

}

window.addEventListener('mousemove', handleMouseMove);
window.addEventListener('resize', handleResize);