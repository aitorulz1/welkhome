# <img src="https://github.com/aitorulz1/welkhome/blob/main/public/images/welkhome-logo-gold.png" width="20px" /> Welkhome <img src="https://github.com/aitorulz1/welkhome/blob/main/public/images/welkhome-logo-gold.png" width="20px" />

La aplicación para la prueba consiste en una Landing Page que carga una serie de restaurantes.

Cada restaurante pertenece a una categoría. Éstas categorías las encontramos antes del listado de restaurantes y, seleccionando en cualquier icono, filtrará el listado de restaurantes por la categoría seleccionada.

También tenemos una lupa en el header que al presionar en ella, aparecerá un buscador. Al insertar el nombre de un restaurante, el listado de estos se filtrará hasta encontrar el deseado. Si no se encuentra en la lista, nos lanzará un mensaje que dirá que el restaurante que se busca, no existe en nuestra aplicación.

Debajo de cada restaurante aparecerá un botón de reservar. Al pulsarlo se abrirá un modal con una información más extensa y un formulario que habrá que completar para realizar la reserva. Una vez enviamos los datos, aparecerá un mensaje de confirmación de que ésta se ha realizado con éxito.

Ya que el formulario no debía hacer nada, no he realizado la lógica para que, salga un mensaje de error si se intenta enviar con los campos vacíos.

También he añadido un listado de los mejores 8 restaurantes en la parte inferior, después de un slider.

El inicio de la app aparece un slider también que anuncia diversos restaurantes con una imagen muy limpia con un botón que al pulsarlo te lleva al listado de restaurantes.

# Primeros pasos

- Funciona con node v 14. De lo contrario no instalará dependencias con npm i
- Fork this Repo
- Clone this Repo "git clone + url"

```sh
git clone https://github.com/aitorulz1/welkhome.git
```

# Clonado

Una vez tengas clonado el repositorio de la app, instala todas las dependencias | npm install

```sh
npm i
```

Podemos arrancar la aplicación usando

```sh
npm run start
```

# Correr la aplicación

La aplicación se abrirá en [http://localhost:3000/]


# Posibles mejoras

A nivel de código se podía haber utilizado typescript para tipar todos los objetos que se pintan en la landing page.

Todo el código está en App.js. Debería de haber creado componentes. Uno por cada función creada.



This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
