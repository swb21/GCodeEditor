const $ = require("jquery");

$('.dropdown-list__header')
    .on('click', function () {
        $(this).find('.dropdown-list__options').toggleClass('dropdown-list__options_opened');
    });