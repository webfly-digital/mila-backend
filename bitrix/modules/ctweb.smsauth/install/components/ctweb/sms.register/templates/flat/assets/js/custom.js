$( document ).ready(function() {
	var boxes = $('[data-inputmask]');
	
	boxes.each(function(i) {
		mask = boxes.eq(i).attr('data-inputmask');
		boxes.eq(i).mask(mask);
	});
});