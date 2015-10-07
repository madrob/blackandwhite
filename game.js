/* vim: set ts=4 sw=4 tw=4 et : */

function newState() {
    return {
        pa: 99,
        wa: 0,
        pb: 99,
        wb: 0,
        human: (Math.random() > 0.5) // Random starting player
    }
}
var state = newState();

var easy = {
    play: function() {
        return Math.random() * state.pb;
    },
    record: function() {
    }
}

function restart() {
    state = newState();
    $('.unlit').removeClass('unlit');
	$('.flag').removeClass('white black');
	$('#wager').spinner('value', 0).spinner('option', 'max', 99);
    $('#sa, #sb').text('0');
    $('#round').text('1');
}
function increment(what) {
	const current = parseInt(what.text());
	what.text(current + 1);
}

function aiRecord() {
    easy.record();
}
function evaluate() {
	if (state.wa > state.wb) {
        increment($('#sa'));
        state.human = true;
    } else if (state.wb > state.wa) {
        increment($('#sb'));
        state.human = false;
    } // else { human = human; } // same player starts

	if ($('#round').text() == '9') {
		if ($('#sa').text() > $('#sb').text()) var w = 'Player';
		else if ($('#sa').text() < $('#sb').text()) var w = 'Computer';
		else var w = 'Nobody';
		$('#submit').button('disable').button('option','label',w + ' Wins!');
	}

	state.wa = state.wb = 0;
	aiRecord();
}
function setFlag(wager, flag) {
	if (wager < 10) flag.addClass('white');
	else flag.addClass('black');
}
function aiPlay() {
	state.wb = easy.play();
	setFlag(state.wb, $('#bflag'));
	state.pb = state.pb - state.wb;
	if (state.pb < 80) $('#b80').addClass('unlit');
	if (state.pb < 60) $('#b60').addClass('unlit');
	if (state.pb < 40) $('#b40').addClass('unlit');
	if (state.pb < 20) $('#b20').addClass('unlit');

	if ($('#aflag').hasClass('black') || $('#aflag').hasClass('white')) {
	    evaluate();
    }
}
function cont() {
	$('.flag').removeClass('white black');
	$('#wager').spinner('value', 0);
	$(this).button('option', 'label', 'Submit!').off('click').click(submit);
	increment($('#round'));

	if (!state.human) {
		aiPlay();
	}
}
function submit() {
	state.wa = $('#wager').spinner('value');
	setFlag(state.wa, $('#aflag'));
	state.pa = state.pa - state.wa;
	if (state.pa < 80) $('#a80').addClass('unlit');
	if (state.pa < 60) $('#a60').addClass('unlit');
	if (state.pa < 40) $('#a40').addClass('unlit');
	if (state.pa < 20) $('#a20').addClass('unlit');
	$('#wager').spinner('option', 'max', state.pa);
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
    $('#restart').button({
        disabled: false
    }).click(restart);
    $('#options').accordion({
        collapsible: true,
        heightStyle: 'content',
        active: false
    });
    $('#difficulty').buttonset();
	if (!state.human) {
		aiPlay();
	}
});
