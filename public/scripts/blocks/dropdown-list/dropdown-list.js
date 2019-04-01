const $ = require("jquery");

$('.dropdown-list')
    .on('mouseenter', function () {
        $(this).find('.dropdown-list__options').addClass('dropdown-list__options_opened');
    })
    .on('mouseleave', function () {
        $(this).find('.dropdown-list__options').removeClass('dropdown-list__options_opened');
    });