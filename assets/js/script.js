$(function () {
//navbar
$('.btnNav').click(function(){
  var scroll = $(this).attr('data-nav'); ///get  data-nav attribut
  $(window).scrollTop(scroll);
});

// Wrap every letter in a span
$('.ml9 .letters').each(function(){
  $(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
});
anime.timeline({loop: true})
  .add({
    targets: '.ml9 .letter',
    scale: [0, 1],
    duration: 4500,
    elasticity: 600,
    delay: function(el, i) {
      return 45 * (i+1)
    }
  }).add({
    targets: '.ml9',
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 2000
});

// $('img').each(function(){
// $('.modal-body').append($(this).prop('src'));
// });
var Array =['Articles'+'Ref'+'Prix'+'Qté'];
var art1 = ['Sac 1'+'201901'+'3.50€'+'1'];
var art2 = ['Sac 2'+'201902'+'15.50€'+'1'];
$('.modal-body'){
  art1+art2
};
});
