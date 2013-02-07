JQUERY MINIPLUGINS
==================

Colección de miniplugins feitos na navalla suíza para solucións rápidas


Tabs
====

Usa a seguinte estructura de html

```html
<div class="tabs">
	<ul>
		<li><a href="#contido1">Contido 1</a></li>
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
	width: 1px;
}

@media (min-width: 800px) {
	.media-queries {
		width: 2px;
	}
}

@media (min-width: 1200px) {
	.media-queries {
		width: 3px;
	}
}
```

Agora por css, asociamos scripts a cada ancho do div (1, 2 ou 3 píxeles):

```js
addToMediaQuery(1, function () {
	alert('Estamos no primeiro punto do media query');
});

addToMediaQuery(2, function () {
	alert('Estamos no segundo punto do media query');
});

addToMediaQuery(3, function () {
	alert('Estamos no terceiro punto do media query');
});

addToMediaQuery(3, function () {
	alert('Seguimos no terceiro punto. Podemos engadir máis dunha función por cada punto');
});
```
