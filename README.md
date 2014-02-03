JQUERY MINIPLUGINS
==================

Colección de miniplugins feitos na navalla suíza para solucións rápidas


Tabs
====

Usa a seguinte estructura de html

```html
<div class="tabs">
	<ul>
		<li><a href="#contido1" class="active">Contido 1</a></li>
		<li><a href="#contido2">Contido 2</a></li>
	</ul>

	<section id="contido1">
		Contido 1
	</section>

	<section id="contido2">
		Contido 2
	</section>
</div>
```

Uso do plugin:

```js
$('.tabs').tabs();

//Eventos ao mostrar/ocultar determinadas pestanas:
$('#contido1').on('tabShow', function () {
	alert('Contido 1 mostrouse');
});

$('#contido2').on('tabHide', function () {
	alert('Contido 2 ocultouse');
});
```

MediaQuery Scripts
==================

Permite executar javascript en determinados puntos especificados con media queries de css. Funciona usando un div oculto ao que lle podemos cambiar o ancho con mediaqueries e engadir funcións asociadas a cada ancho.

Exemplo: Facemos o seguinte css:

```css
.media-queries {
	width: 10px;
}

@media (min-width: 800px) {
	.media-queries {
		width: 20px;
	}
}

@media (min-width: 1200px) {
	.media-queries {
		width: 30px;
	}
}
```

Agora asociamos funcións de javascript por cada ancho do div (10, 20 ou 30 píxeles):

```js
addToMediaQuery(10, function () {
	alert('Estamos no primeiro punto do media query');
});

addToMediaQuery(20, function () {
	alert('Estamos no segundo punto do media query');
});

addToMediaQuery(30, function () {
	alert('Estamos no terceiro punto do media query');
});

addToMediaQuery(30, function () {
	alert('Seguimos no terceiro punto. Podemos engadir máis dunha función por cada punto');
});
```

scrollTo
========

Fai unha animación de scroll vertical a un punto do documento

```js
//Move directamente (sen animación)
$.scrollTo(340);

//Posición e duración
$.scrollTo(340, 'fast');

//Posición e opcións (as mesmas que a función animate de jquery: http://api.jquery.com/animate/#animate-properties-options)
$.scrollTo(340, {
	duration: 500,
	easing: 'linear'
});
```

clickOnScroll
=============

Lanza un click nun elemento cando o scroll chega a parte de abaixo dunha listaxe de elementos. Útil para que se vaia cargando o contido por abaixo segundo se vaia facendo scroll.

```html
<div class="contido-dinamico">
	<ul class="lista-elementos">
	</ul>
	<a href="cargar-elementos.php" id="#boton-vermais">Ver máis</a>
</div>
```

```js
$('#boton-vermais').click(function () {
	var $this = $(this);

	$this.clickOnScroll('pause'); //Pausamos o plugin

	//Cargar por ajax mais datos en .lista-elementos
	$.get($this.attr('href'), function (datos) {
		$('.lista-elementos').append(datos);

		$this.clickOnScroll('play');
	})
});

$('#boton-vermais').clickOnScroll({
	listElement: '.lista-elementos',
	offset: 500 //Queremos que se lance 500px antes de chegar ao final
})
```

faviconizer
===========

Engade imaxe do favicon do sitio web do href dos links externos

```js
$(document).ready(function () {
	$('a.external').ansFaviconizer({
		where: 'prepend', //see below possible values
		className: 'myclass' //this class will be applied to the favicon img
	});
});
```
