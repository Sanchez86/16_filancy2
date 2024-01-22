$(document).ready(function() {

new WOW().init();

// function heightDetect() {
    // $(".index-body .top-line").css("height", $(window).height());
  // };
  // heightDetect();
  // $(window).resize(function() {
    // heightDetect();
  // });

  $(".btn-group li").click(function() {
  $(".btn-group li").removeClass("active");
  $(this).addClass("active");
  });
  

  $('.owl-carousel-desk').owlCarousel({
    loop:true,
    autoplay:true,
    autoplayTimeout:1000,
    animateOut: 'fadeOut',
    autoHeight:true,
    items:1,
    margin:50,
    stagePadding:30,
    smartSpeed:450
});
  $('.owl-carousel-1').owlCarousel({
    loop:true,
    autoplay:true,
    autoplayTimeout:2000,
    animateOut: 'fadeOut',
    autoHeight:true,
    items:1,
    margin:30,
    stagePadding:30,
    smartSpeed:450
});
  $('.owl-carousel-2').owlCarousel({
    loop:true,
    autoplay:true,
    autoplayTimeout:3000,
    animateOut: 'fadeOut',
    autoHeight:true,
    items:1,
    margin:30,
    stagePadding:30,
    smartSpeed:450
});
  $('.owl-carousel-3').owlCarousel({
    loop:true,
    autoplay:true,
    autoplayTimeout:4000,
    animateOut: 'fadeOut',
    autoHeight:true,
    items:1,
    margin:30,
    stagePadding:30,
    smartSpeed:450
});
  $('.owl-carousel-4').owlCarousel({
    loop:true,
    autoplay:true,
    autoplayTimeout:4000,
    animateOut: 'fadeOut',
    autoHeight:true,
    items:1,
    margin:30,
    stagePadding:30,
    smartSpeed:450
});
  $('.owl-carousel-5').owlCarousel({
    loop:true,
    autoplay:true,
    autoplayTimeout:4000,
    animateOut: 'fadeOut',
    autoHeight:true,
    items:1,
    margin:30,
    stagePadding:30,
    smartSpeed:450
});


var updateGridLayout = function(){
  console.log('Resized');
  setTimeout(function(){
    $(".loader_inner").fadeOut();
    $(".loader").delay(400).fadeOut("slow");
    gridContainer = $('#shuffleContainer');
    var sizer = $('#sizerElem');
    var opts={
      // sizer: sizer[2],
      // sizer: '#sizerElem',
      columnWidth: $('#shuffleContainer').width()/4,
      itemSelector: '.picture-item',
      speed: 500,
      easing: 'ease-out'
    };
    console.log(opts);
    gridContainer.shuffle();
  }, 1000);
};

$(window).resize(updateGridLayout);

$(window).load(function() {
  $('.photoGrid').photoGrid();
  updateGridLayout();
});
/*var defaults = {
  itemSelector: ".item", // item selecor 
  resize: true, // automatic reload grid on window size change
  rowHeight: $(window).height() / 4, // looks best, but needs highres thumbs
  callback: function() {} // fires when layouting grid is done
};
*/

$('#showmore').on('click', function(e){
  e.preventDefault();

  var totalCount=$('#shuffleContainer figure').filter(function(i,x){
    return currentTab===""||$(x).data('group')==currentTab;
  }).length;
  var visibleCount=$('#shuffleContainer figure').filter(function(i,x){
    return $(x).css('visibility')==='visible';
  }).length;

  if(visibleCount+2>=totalCount)
    $(this).hide();
  $('#showLess').show();


  var i=0;
  gridContainer.shuffle('shuffle',function ($el, shuffle) {
      if(i<visibleCount+5&&(currentTab===""||$el.data('group')==currentTab)){
        i++;
        return true;
      }
  });
});

// $('#showLess').on('click', function(e){
//   e.preventDefault();

//   var visibleItems=$('#shuffleContainer figure').filter(function(i,x){
//     return $(x).css('visibility')==='visible';
//   });

//   var hideCount=visibleItems.length-5;
//   if(hideCount<5)
//     hideCount=visibleItems.length-5;
//   else
//     hideCount=5;

//   visibleItems.splice(visibleItems.length-hideCount, hideCount);


//   if(visibleItems.length===5)
//     $(this).hide();
//   $('#showmore').show();

//   gridContainer.shuffle('shuffle',function ($el, shuffle) {
//       return $(visibleItems).filter(function(i,x){
//         return $(x).data('index')===$el.data('index');
//       }).length;
//   });
// });

$('#btnAll').on('click', function() {
  var i=0;
  currentTab="";
  gridContainer.shuffle('shuffle',function ($el, shuffle) {
    if(i++<5)
      return true;
  });
  $('#showLess').hide();
});

$('#btnAll').on('click', function() {
  gridContainer.shuffle('shuffle',function ($el, shuffle) {
    return true;
  })
});

$('#btnFlyers').on('click', function() {
  gridContainer.shuffle('shuffle',function ($el, shuffle) {
    return $el.data('group') == 'flyers';
  })
});

$('#btnPromo').on('click', function() {
  gridContainer.shuffle('shuffle',function ($el, shuffle) {
    return $el.data('group') == 'promo';
  })
});

$('#btnOn-line').on('click', function() {
  gridContainer.shuffle('shuffle',function ($el, shuffle) {
    return $el.data('group') == 'on-line';
  })
});
$('#btnLP').on('click', function() {
  gridContainer.shuffle('shuffle',function ($el, shuffle) {
    return $el.data('group') == 'lp';
  })
});


var checkProgressStart=function(){
  /*$(window).scrollTop()>=$('.facts').offset().top&&!$('.loader:visible').length||*/
  if($(window).scrollTop()>1700){
      //console.log($(window).scrollTop());
      /*$(".progress-bar").each(function(){
        $(this).data('percent', Math.random()*100);
      });*/
      $(".progress-bar").loading();
      clearInterval(interval);
  }
};
var interval=setInterval(checkProgressStart, 500);

});



$(window).load(function() {

});

jQuery(document).ready(function () {
/*плавные переходы по якорям*/
    jQuery(".addMenue a").on("click", function (event) {
    //отменяем стандартную обработку нажатия по ссылке
    event.preventDefault();

    //забираем идентификатор бока с атрибута href
    var id = jQuery(this).attr('href'),

    //узнаем высоту от начала страницы до блока на который ссылается якорь
        top = jQuery(id).offset().top - 147;

    //анимируем переход на расстояние - top за 1500 мс
    jQuery('body,html').stop().animate({ scrollTop: top }, 1000);
});
/*конец плавные переходы по якорям*/
});
