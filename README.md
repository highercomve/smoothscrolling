Plugin para realizar scroll vertical usando las anclas HTML
===========================================================

El plugin puede ser aplicado a cualquier enlace que use anclas. Ejemplo

```html
  <ul class="nav">
    <li><a href="#home">Inicio</a></li>
    <li><a href="#nosotros">Nosotros</a></li>
    <li><a href="#contacto">Contacto</a></li>
  </ul>

  <div id="home">
    <h1>Contenido del Home al que debe ir el scroll</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur ab quidem incidunt deleniti suscipit nobis quos hic excepturi. Ratione laboriosam quo nobis necessitatibus culpa dignissimos magni sapiente error odio. Laudantium.</p>
  </div>

  <div id="nosotros">
    <h1>Contenido del Home al que debe ir el scroll</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur ab quidem incidunt deleniti suscipit nobis quos hic excepturi. Ratione laboriosam quo nobis necessitatibus culpa dignissimos magni sapiente error odio. Laudantium.</p>
  </div>

  <div id="contacto">
    <h1>Contenido del Home al que debe ir el scroll</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur ab quidem incidunt deleniti suscipit nobis quos hic excepturi. Ratione laboriosam quo nobis necessitatibus culpa dignissimos magni sapiente error odio. Laudantium.</p>
  </div>
```

Para activar el plugin usamos 

```js
  // En caso de aplicarlo a todos los enlaces
  $("a[href*=#]").smoothscrolling();

  // En caso de aplicarlo a una clase
  $("a.scroller").smoothscrolling();

  // En caso de necesitar que el scroll tenga un offset
  // como en casos donde tenemos un menu flotante
  $("a.scroller").smoothscrolling({ 
    offsetTop: 60 // cantidad de pixeles que tiene el elemento flotante
  });
  
```