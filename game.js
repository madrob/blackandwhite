/* vim: set ts=4 sw=4 tw=4 et : */

var pa = 99;
var wa = 0;
var pb = 99;
var wb = 0;
var human = (Math.random() > 0.5); // Random starting player
var aiPlayed = false;
var round = 1;

function aiRecord() { }
function evaluate() {
	if (wa > wb) var toInc = $('#sa');
	else if (wb > wa) var toInc = $('#sb');
	else var toInc = $('<th>0</th>');
	const current = parseInt(toInc.text());
	toInc.text(current + 1);

	if (round == 9) {
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
	wb = Math.random() * pb;
	setFlag(wb, $('#bflag'));
	pb = pb - wb;
	if (pb < 80) $('#b80').addClass('unlit');
	if (pb < 60) $('#b60').addClass('unlit');
	if (pb < 40) $('#b40').addClass('unlit');
	if (pb < 20) $('#b20').addClass('unlit');

	aiPlayed = true;
	if (human) evaluate();
}
function cont() {
	$('.flag').removeClass('white black');
	$('#wager').spinner('value', '0');
	$(this).button('option', 'label', 'Submit!').off('click').click(submit);
	round = round + 1;
	$('#round').text('Round ' + round);
	aiPlayed = false;

	if (!human) {
		aiPlay();
		human = true;
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

	if (aiPlayed) {
		evaluate();
	} else {
		aiPlay();
		human = false;
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
        human = true;
    }
});
