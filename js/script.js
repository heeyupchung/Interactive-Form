
// focus the name field
const $name = $('#name');
$name.focus();


// job role section
$('#other-job-role').hide();
const $jobRole = $('#title');
$jobRole.on('change', e => {
    if (e.target.value === 'other') {
        $('#other-job-role').show();
    } else {
        $('#other-job-role').hide();
    }
});

// t-shirt info section
// https://api.jquery.com/attribute-equals-selector/ referenced for this part
const $color = $('#color');
$color.prop('disabled', true);

$('#design').on('change', e => {
    $color.prop('disabled', false);

    if (e.target.value === 'js puns') {
        $("[data-theme='heart js']").hide();
        $("[data-theme='heart js']")[0].removeAttribute('selected');
        $("[data-theme='js puns']")[0].setAttribute('selected', 'selected');
        $("[data-theme='js puns']").show();
    } else if (e.target.value === 'heart js') {
        $("[data-theme='js puns']").hide();
        $("[data-theme='js puns']")[0].removeAttribute('selected');
        $("[data-theme='heart js']")[0].setAttribute('selected', 'selected');
        $("[data-theme='heart js']").show();
    }
});

// register for actvities section
const $activities = $('.activities');
let totalCost = 0;
$activities.on('change', e => {
    const dataCost = (parseInt($(e.target).attr('data-cost')));
    if (e.target.checked) {
        totalCost = totalCost + dataCost;
    } else {
        totalCost = totalCost - dataCost;
    }
    $('#activities-cost').html(`Total: $${totalCost}`);
});

// payment info section
const $payment = $('#payment');
$payment.val('credit-card');
$('#paypal').hide();
$('#bitcoin').hide();

$payment.on('change', e => {
    if ($payment.val() === 'paypal') {
        $('#paypal').show();
        $('#bitcoin').hide();
        $('#credit-card').hide();
    }
    if ($payment.val() === 'bitcoin') {
        $('#bitcoin').show();
        $('#paypal').hide();
        $('#credit-card').hide();
    }
    if ($payment.val() === 'credit-card') {
        $('#credit-card').show();
        $('#paypal').hide();
        $('#bitcoin').hide();
    }
});

// form validation
function isNameValid() {
    const $nameInput = $('#name').val();
    let validName = /^.+$/;
    return validName.test($nameInput);
}

function isEmailValid() {
    const $emailInput = $('#email').val();
    let validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return validEmail.test($emailInput);
}

function isCardNumberValid() {
    const $cardNumberInput = $('#cc-num').val();
    let validCCNumber = /^\d{13,16}$/;
    return validCCNumber.test($cardNumberInput);
}

function isZipValid() {
    const $cardNumberInput = $('#zip').val();
    let validZip = /^\d{5}$/;
    return validZip.test($cardNumberInput);
}

function isCvvValid() {
    const $cardNumberInput = $('#cvv').val();
    let validCVV = /^\d{3}$/;
    return validCVV.test($cardNumberInput);
}

function isCreditCard() {
    if ($payment.val() === 'credit-card') {
        if (isCardNumberValid() && isZipValid() && isCvvValid()) {
            return true;
        } else {
            return false;
        }
    } else {
        return true;
    }
}

function isActivity() {
    const $activityInput = $('#activities-box').find('input');
    for (let i = 0; i < $activityInput.length; i++) {
        if ($activityInput[i].checked) {
            return true;
        }
    }
    return false;
}

$('form').on('submit', e => {
    if (isNameValid() && isEmailValid() && isCreditCard() && isActivity()) {
        
    } else {
        e.preventDefault();
    }
});

// accessbility: focus states
$('[type="checkbox"]').on('focus', e => {
    e.target.parentNode.classList.add('focus');
});

$('[type="checkbox"]').on('blur', e => {
    e.target.parentNode.classList.remove('focus');
});

// accessibility: form validation errors
$('form').on('submit', e => {
    if (!isNameValid()) {
        $name.parent().addClass('not-valid');
        $name.parent().removeClass('valid');
        $name.parent().children().last().show();
    } else {
        $name.parent().addClass('valid');
        $name.parent().removeClass('not-valid');
        $name.parent().children().last().hide();
    }
    if (!isEmailValid()) {
        $('#email').parent().addClass('not-valid');
        $('#email').parent().removeClass('valid');
        $('#email').parent().children().last().show();
    } else {
        $('#email').parent().addClass('valid');
        $('#email').parent().removeClass('not-valid');
        $('#email').parent().children().last().hide();
    }
    if(!isActivity()) {
        $('#activities').addClass('not-valid');
        $('#activities').removeClass('valid');
        $('#activities').children().last().show();
    } else {
        $('#activities').addClass('valid');
        $('#activities').removeClass('not-valid');
        $('#activities').children().last().hide();
    }
    if (!isCardNumberValid()) {
        $('#cc-num').parent().addClass('not-valid');
        $('#cc-num').parent().removeClass('valid');
        $('#cc-num').parent().children().last().show();
    } else {
        $('#cc-num').parent().addClass('valid');
        $('#cc-num').parent().removeClass('not-valid');
        $('#cc-num').parent().children().last().hide();
    }
    if (!isZipValid()) {
        $('#zip').parent().addClass('not-valid');
        $('#zip').parent().removeClass('valid');
        $('#zip').parent().children().last().show();
    } else {
        $('#zip').parent().addClass('valid');
        $('#zip').parent().removeClass('not-valid');
        $('#zip').parent().children().last().hide();
    }
    if (!isCvvValid()) {
        $('#cvv').parent().addClass('not-valid');
        $('#cvv').parent().removeClass('valid');
        $('#cvv').parent().children().last().show();
    } else {
        $('#cvv').parent().addClass('valid');
        $('#cvv').parent().removeClass('not-valid');
        $('#cvv').parent().children().last().hide();
    }
});