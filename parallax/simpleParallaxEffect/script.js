var image1 = document.querySelector('.parallaxImg1');
var image2 = document.querySelector('.parallaxImg2');
var image3 = document.querySelector('.parallaxImg3');
var image4 = document.querySelector('.parallaxImg4');

new simpleParallax(image1, {
	orientation: 'left',
  delay: .6,
	transition: 'cubic-bezier(0,0,0,1)'
});

new simpleParallax(image2, {
	orientation: 'down',
  scale: 1.5,
  delay: .8,
	transition: 'cubic-bezier(0,0,0,1)'
});

new simpleParallax(image3, {
	orientation: 'up',
  scale: 1.5,
  delay: .8,
	transition: 'cubic-bezier(0,0,0,1)'
});

new simpleParallax(image4, {
	orientation: 'right',
  scale: 1.5,
  delay: .8,
	transition: 'cubic-bezier(0,0,0,1)'
});

// new simpleParallax(image, {
// 	orientation: 'right'
// });