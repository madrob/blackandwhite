/* vim: set ts=4 sw=4 tw=4 et : */

var pa = 99;
var wa = 0;
var pb = 99;
var wb = 0;
var human = (Math.random() > 0.5); // Random starting player

var easy = {
    play: function() {
        return Math.random() * pb;
    },
    record: function() {
    }
}

function increment(what) {
	const current = parseInt(what.text());
	what.text(current + 1);
}

function aiRecord() {
    easy.record();
}
function evaluate() {
	if (wa > wb) {
        increment($('#sa'));
        human = true;
    } else if (wb > wa) {
        increment($('#sb'));
        human = false;
    } // else { human = human; } // same player starts

	if ($('#round').text() == '9') {
		if ($('#sa').text() > $('#sb').text()) var w = 'Player';
		else if ($('#sa').text() < $('#sb').text()) var w = 'Computer';
		else var w = 'Nobody';
		$('#submit').button('disable').button('option','label',w + ' Wins!');
	}

	wa = wb = 0;
	aiRecord();
}
function setFlag(wager, flag) {
	if (wager < 10) flag.addClass('white');
	else flag.addClass('black');
}
function aiPlay() {
	wb = easy.play();
	setFlag(wb, $('#bflag'));
	pb = pb - wb;
	if (pb < 80) $('#b80').addClass('unlit');
	if (pb < 60) $('#b60').addClass('unlit');
	if (pb < 40) $('#b40').addClass('unlit');
	if (pb < 20) $('#b20').addClass('unlit');

	if ($('#aflag').hasClass('black') || $('#aflag').hasClass('white')) {
	    evaluate();
    }
}
function cont() {
	$('.flag').removeClass('white black');
	$('#wager').spinner('value', '0');
	$(this).button('option', 'label', 'Submit!').off('click').click(submit);
	increment($('#round'));

	if (!human) {
		aiPlay();
	}
}
function submit() {
	wa = $('#wager').spinner('value');
	setFlag(wa, $('#aflag'));
	pa = pa - wa;
	if (pa < 80) $('#a80').addClass('unlit');
	if (pa < 60) $('#a60').addClass('unlit');
	if (pa < 40) $('#a40').addClass('unlit');
	if (pa < 20) $('#a20').addClass('unlit');
	$('#wager').spinner('option', 'max', pa);
	$(this).button('option', 'label', 'Continue...').off('click').click(cont);

	if ($('#bflag').hasClass('black') || $('#bflag').hasClass('white')) {
		evaluate();
	} else {
		aiPlay();
	}
}

$(function() {
    $('#wager').spinner({
        min: 0,
        max: 99,
        step: 1,
        page: 10
    });
    $('#submit').button({
        disabled: false,
        label: 'Submit!'
    }).click(submit);
    $('#options').accordion({
        collapsible: true,
        heightStyle: 'content',
        active: false
    });
    $('#difficulty').buttonset();
	if (!human) {
		aiPlay();
	}
});
