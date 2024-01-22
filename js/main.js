var particleList=[
	'1.png',
	'2.png',
	'3.png',
	'4.png',
	'5.png',
	'6.png',
	'7.png',
	'8.png',
	'9.png',
	'10.png',
	'11.png',
	'12.png',
	'13.png',
	'14.png',
	'15.png',
	'16.png',
	'17.png',
	'18.png',
	'19.png',
	'20.png',
	'21.png',
	'22.png',
	
	/*'0ww.png','0ww.png','0ww.png','0ww.png','0ww.png','0ww.png','0ww.png','0ww.png','0ww.png',*/
	
];
var MAX_PARTICLES = 50;
var Z_OFFSET = Math.min($(window).width() / 3.5, $(window).height() / 3.5);
var PARTICLE_DIAMETER = Z_OFFSET / 5;

var lastEventX = null;
var lastEventY = null

$(init);

function chunkify(a, n, balanced){
    if (n < 2)
        return [a];
    var len = a.length,
        out = [],
        i = 0,
        size;
    if (len % n === 0) {
        size = Math.floor(len / n);
        while (i < len) {
            out.push(a.slice(i, i += size));
        }
    }
    else if (balanced) {
        while (i < len) {
            size = Math.ceil((len - i) / n--);
            out.push(a.slice(i, i += size));
        }
    }
    else {
        n--;
        size = Math.floor(len / n);
        if (len % size === 0)
            size--;
        while (i < size * n) {
            out.push(a.slice(i, i += size));
        }
        out.push(a.slice(size * n));
    }
    return out;
}


function init() {
	if (!Modernizr.csstransforms3d) {
		alert('This demo requires a browser that has 3D CSS transforms. As of July 27, 2011 that means the latest Chrome or Safari.');
	}
	
	$('#curtain').css('-webkit-transform', 'translateZ(' + (Z_OFFSET * 0.58) + 'px)');
	$('#curtain').css('-moz-transform', 'translateZ(' + (Z_OFFSET * 0.58) + 'px)');
	

	var parts=chunkify(particleList, 3, true);
	$('.sphere').each(function(j,x) {
		var p=parts[j];
		for (var i = 0; i < p.length; i++) {
			var vectorX = -1 + Math.random() * 2;
			var vectorY = -1 + Math.random() * 2;
			var vectorZ = -1 + Math.random() * 2;
			var angle = Math.random() * 360;

			var particle = $('<div class="particle"></div>');
			var image = p[i];
			particle
				.css('background-image', "url(../images/"+image+")")
				.css('background-repeat','no-repeat')
				.css('width', PARTICLE_DIAMETER)
				.css('height', PARTICLE_DIAMETER)
				.css('margin', (-PARTICLE_DIAMETER / 2) + 'px 0 0 ' + (-PARTICLE_DIAMETER / 2) + 'px')
				.css('-webkit-transform', 'rotate3d(' + vectorX + ',' + vectorY + ',' + vectorZ + ',' + angle + 'deg) translateZ(' + Z_OFFSET + 'px)')
				.css('-moz-transform', 'rotate3d(' + vectorX + ',' + vectorY + ',' + vectorZ + ',' + angle + 'deg) translateZ(' + Z_OFFSET + 'px)');
			particle.appendTo(x);
		}
	});

	var needUpdate=true;
	function updateScreen(event){
		if (lastEventX != null) {
			var velocityX = (event.clientX - lastEventX) * 0.005;
			var velocityY = (event.clientY - lastEventY) * 0.005;
			var maxVelocity = velocityX;
			
			if (Math.abs(velocityX) < Math.abs(velocityY)) {
				maxVelocity = velocityY;
			}
			
			var sphere1Velocity = $('#sphere1').data('velocity');
			var sphere2Velocity = $('#sphere2').data('velocity');
			var sphere3Velocity = $('#sphere3').data('velocity');
			
			$('#sphere1').data('velocity', sphere1Velocity + velocityY);
			$('#sphere2').data('velocity', sphere2Velocity + velocityX);
			$('#sphere3').data('velocity', sphere3Velocity + maxVelocity);
		}
	}
	
	var updateTimeout=-1;
	setInterval(function(){
		if(!needUpdate)
			return false;
		var offset=10;
		/*if(lastEventX>=$(window).width())
			lastEventX=0;
		lastEventX+=offset;

		if(lastEventY>=$(window).height())
			lastEventY=0;
		lastEventY+=offset;*/
		updateScreen({
			clientX: lastEventX+offset,
			clientY: lastEventY+offset
		});
	}, 100);
	
	
	$(document).mousemove(function(event) {		
		needUpdate=false;
		clearTimeout(updateTimeout);

		updateScreen(event);	
		lastEventX = event.clientX;
		lastEventY = event.clientY;		

		updateTimeout=setTimeout(function(){
			needUpdate=true;
		}, 500);
	});
	
	var body = document.getElementsByTagName('body')[0];
	body.addEventListener('touchmove', touchMove, false);
	body.addEventListener('touchstart', touchStart, false);
	body.addEventListener('touchend', touchEnd, false);

	/*var contentList=document.querySelectorAll('.nav-tabs');
	for(var i in contentList){
		contentList[i].addEventListener('touchstart', function(e){ e.preventDefault(); console.log(123); }, false);
		contentList[i].addEventListener('touchend', function(e){ e.preventDefault(); console.log(123); }, false);
	}*/

	setTimeout(function() {
		$(document).mousemove(hideInstructions);
		body.addEventListener('touchmove', hideInstructions, false);
		
		function hideInstructions() {
			$('#instructions').animate({opacity: 0}, 500, function() {
				$(this).remove();
			});
		}
	}, 2000);

	draw();
}

function draw() {
	var FRICTION = 0.96;
	var MIN_VELOCITY = 0.01;
	
	var sphere1 = $('#sphere1');
	var sphere2 = $('#sphere2');
	var sphere3 = $('#sphere3');
	
	if (sphere1.data('angle') == null) {
		sphere1.data('angle', 0);
		sphere2.data('angle', 0);
		sphere3.data('angle', 0);
		sphere1.data('velocity', 3);
		sphere2.data('velocity', 3);
		sphere3.data('velocity', 3);
	}
	
	var sphere1Angle = sphere1.data('angle');
	var sphere2Angle = sphere2.data('angle');
	var sphere3Angle = sphere3.data('angle');
	var sphere1Velocity = sphere1.data('velocity');
	var sphere2Velocity = sphere2.data('velocity');
	var sphere3Velocity = sphere3.data('velocity');
	
	sphere1Angle = (sphere1Angle + sphere1Velocity) % 360;
	sphere1.data('angle', sphere1Angle);
	sphere1Velocity *= FRICTION;
	if (Math.abs(sphere1Velocity) < MIN_VELOCITY) {
		sphere1Velocity = 0;
	}
	else {
		sphere1.data('velocity', sphere1Velocity);
		sphere1.css('-webkit-transform', 'rotateX(' + (-sphere1Angle) +'deg)');
		sphere1.css('-moz-transform', 'rotateX(' + (-sphere1Angle) +'deg)');
	}

	sphere2Angle = (sphere2Angle + sphere2Velocity) % 360;
	sphere2.data('angle', sphere2Angle);
	sphere2Velocity *= FRICTION;
	if (Math.abs(sphere2Velocity) < MIN_VELOCITY) {
		sphere2Velocity = 0;
	}
	else {
		sphere2.data('velocity', sphere2Velocity);
		sphere2.css('-webkit-transform', 'rotateY(' + sphere2Angle +'deg)');
		sphere2.css('-moz-transform', 'rotateY(' + sphere2Angle +'deg)');
	}

	sphere3Angle = (sphere3Angle + sphere3Velocity) % 360;
	sphere3.data('angle', sphere3Angle);
	sphere3Velocity *= FRICTION;
	if (Math.abs(sphere3Velocity) < MIN_VELOCITY) {
		sphere3Velocity = 0;
	}
	else {
		sphere3.data('velocity', sphere3Velocity);
		sphere3.css('-webkit-transform', 'rotateX(' + (-sphere3Angle) +'deg) rotateY(' + (-sphere3Angle) +'deg)');
		sphere3.css('-moz-transform', 'rotateX(' + (-sphere3Angle) +'deg) rotateY(' + (-sphere3Angle) +'deg)');
	}

	setTimeout(draw, 25);
}

function touchStart(event) {
	//event.preventDefault();
}

function touchEnd(event) {
	//event.preventDefault();
}

function touchMove(event) {
	//event.preventDefault();

	if (lastEventX != null) {
		var velocityX = (event.touches[0].pageX - lastEventX) * 0.025;
		var velocityY = (event.touches[0].pageY - lastEventY) * 0.025;
		var maxVelocity = velocityX;
		
		if (Math.abs(velocityX) < Math.abs(velocityY)) {
			maxVelocity = velocityY;
		}
		
		var sphere1Velocity = $('#sphere1').data('velocity');
		var sphere2Velocity = $('#sphere2').data('velocity');
		var sphere3Velocity = $('#sphere3').data('velocity');
		
		$('#sphere1').data('velocity', sphere1Velocity + velocityY);
		$('#sphere2').data('velocity', sphere2Velocity + velocityX);
		$('#sphere3').data('velocity', sphere3Velocity + maxVelocity);
	}
	
	lastEventX = event.touches[0].pageX;
	lastEventY = event.touches[0].pageY;
}
