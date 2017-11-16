let mousedown, mousemove, mouseup;

if( document.ontouchstart )
{
	[ mousedown, mousemove, mouseup, ]= [ 'touchstart', 'touchmove', 'touchend', ];
}
else
{
	[ mousedown, mousemove, mouseup, ]= [ 'mousedown', 'mousemove', 'mouseup', ];
}


export { mousedown, mousemove, mouseup, };
