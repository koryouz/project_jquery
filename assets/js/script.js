$(function () {
  //navbar
  $('.btnNav').click(function () {
    var scroll = $(this).attr('data-nav'); ///get  data-nav attribut
    $(window).scrollTop(scroll);
  });

  // Wrap every letter in a span
  $('.ml9 .letters').each(function () {
    $(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
  });
  anime.timeline({
      loop: true
    })
    .add({
      targets: '.ml9 .letter',
      scale: [0, 1],
      duration: 4500,
      elasticity: 600,
      delay: function (el, i) {
        return 45 * (i + 1)
      }
    }).add({
      targets: '.ml9',
      opacity: 0,
      duration: 1000,
      easing: "easeOutExpo",
      delay: 2000
    });

  // On initialise le tableau panier

  var panier = [];
  //au click d'un boutton "Ajouter au panier"
  $('.btn-add').click(function () {
    var pics     = $(this).attr('data-pics');
    var name     = $(this).attr('data-name'); //on récupére le nom de l'article
    var ref      = $(this).attr('data-ref');
    var price    = $(this).attr('data-price'); //on récupére le prix de l'article
    var ordre    = parseInt($(this).attr('data-classe')); //on récupére l'index' de l'article
    var presence = false; //par défaut on dit qu'il n'est pas présent dans le panier
    //Boucle pour vérifié sa présence + boolean sur true si il est présent
    for (let i = 0; i < panier.length; i++) {
      if (ordre == panier[i]) {
        presence = true;
      }
    }

    //si l'article n'est pas présent dans le panier l'ajouter
    if (presence == false) {
      panier.push(ordre);
      $('#cart-tablebody').append('<tr class="article' + ordre + '"><td><img width="40" src="'+pics+'">' + name + '</td><td>'+ref+'</td><td class="price' + ordre + '">' + price + '</td><td><button type="button" class="amount-items moins' + ordre + '" data-classe="' + ordre + '">-</button><p class="amount-items nb-items' + ordre + '">1</p><button type="button" class="amount-items plus' + ordre + '" data-classe="' + ordre + '">+</button></td><td class="priceresult' + ordre + '">' + price + '</td></tr>');
      subtotalCalcul();

      //Au click de btn plus d'un article du panier
      $('.plus' + ordre).click(function () {
        var nbOrdre     = parseInt($(this).attr('data-classe'));
        var nb          = parseInt($('.nb-items' + nbOrdre).text());
        $('.nb-items' + nbOrdre).text(nb + 1);
        var priceAdd    = parseFloat($('.price' + nbOrdre).text());
        var priceResult = parseFloat($('.priceresult' + nbOrdre).text());
        priceResult     = (priceResult + priceAdd).toFixed(2);
        $('.priceresult' + nbOrdre).text(priceResult);
        subtotalCalcul();
      });

      //Au click de btn moins d'un article du panier
      $('.moins' + ordre).click(function () {
        var nbOrdre = parseInt($(this).attr('data-classe'));
        var nb      = parseInt($('.nb-items' + nbOrdre).text());
        //Si le nombre de l'article est égale ou supérieure à 2 retirer 1
        if (nb >= 2) {
          $('.nb-items' + nbOrdre).text(nb - 1);
          var priceAdd    = parseFloat($('.price' + nbOrdre).text());
          var priceResult = parseFloat($('.priceresult' + nbOrdre).text());
          priceResult     = (priceResult - priceAdd).toFixed(2);
          $('.priceresult' + nbOrdre).text(priceResult);
          subtotalCalcul();
        } else { //sinon supprimer l'article
          $('.article' + nbOrdre).empty();
          for (let i = 0; i < panier.length; i++) {
            if (nbOrdre == panier[i]) {
              delete panier[i];
              subtotalCalcul();
            }
          }
        }
      });
    } else { //sinon mettre une alerte
      alert('Article déjà présent dans le panier');
    }

    //Fonction permet de calculer le prix totale
    function subtotalCalcul() {
      var subtotalRes = 0;
      var subtotalAdd = 0;
      var panierEmpty = true;
      //Vérification de la présence de valeurs dans le tableau
      for (let i = 0; i < panier.length; i++) {
        if(panier[i] != undefined){
          panierEmpty = false;
        }
      }
      //Si le tableau est vide, la somme totale est de 0
      if(panierEmpty == true){
        $('.subtotal').text(0);
      }else{//Sinon le tableau n'est pas vide on calcule la somme totale
        for (let i = 0; i < panier.length; i++) {
          if(panier[i] != undefined){
            subtotalAdd = parseFloat($('.priceresult' + panier[i]).text());
            subtotalRes = parseFloat(subtotalRes + subtotalAdd);
            $('.subtotal').text(subtotalRes.toFixed(2));
          }
        }
      }
    }
  });

});
