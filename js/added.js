var $prevActive;
$('.why-item').on('mouseenter', function () {
    $(this).children('h5').css('color', '#085e6b');
});

$('.why-item').on('mouseleave', function () {
    $(this).children('h5').css('color', '#fffefe');
});

$('.contentIcon').on('mouseenter', function () {
    $(this).addClass('active');
})
$('.contentIcon').on('mouseleave', function () {
    $(this).removeClass('active');
});

$('.contactsFormOpt').on('mouseenter', function () {
    $(this).addClass('active');
})
$('.contactsFormOpt').on('mouseleave', function () {
    $(this).removeClass('active');
});

$('.contactsFormOpt input').on('click', function () {
    $(this).parent('.contactsFormOpt').find('i').css('left', '0px').css('top', '-3px');
});

$('.subContactsFormTextarea textarea').on('click', function () {
    $(this).parent('.subContactsFormTextarea').find('i').css('left', '0px').css('top', '37px');
});

$('.areas .nav-tabs>li').hover(function () {
    $($(this).find('a')).tab('show');
    $prevActive=$(this).find('a');
    //console.log($(this).find('a').attr('href'), $prevActive.attr('href'));
});

$('.wrap-img').on('mouseenter', function(){
		$(this).addClass('active');
}); 
$('.wrap-img').on('mouseleave', function(){
		$(this).removeClass('active');
}); 

$(document).ready(function () {
    $('[href^="#Tab-"]').on('click', function (e) {
        e.preventDefault();
        
        //if($prevActive)
            //console.log($(this).attr('href'), $prevActive.attr('href'));
        if($prevActive&&$(this).attr('href')==$prevActive.attr('href'))
            $('body,html').animate({ scrollTop: $('[data-scrolltarget="' + $(this).data('scrollto') + '"]').offset().top }, 1000);
        $prevActive=$(this);
    });
});

$('.nanjaTeh').on('mouseenter', function () {
    $(this).addClass('active');
})
$('.nanjaTeh').on('mouseleave', function () {
    $(this).removeClass('active');
});

