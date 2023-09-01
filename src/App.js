import React, { useEffect, useState } from "react";
import carousel from "./data/carousel.json";
import carouseldown from "./data/carouseldown.json";
import icons from "./data/icons.json";
import restaurants from "./data/restaurants.json";

import { MDBCarousel, MDBCarouselItem } from "mdb-react-ui-kit";

function App() {
  const [getRestaurants, setGetRestaurants] = useState(restaurants);
  const [query, setQuery] = useState("");
  const [isCategorized, setIsCategorized] = useState(false);

  const [getGroupId, setGetGropuId] = useState();
  const [getRestaurantId, setGetRestaurantId] = useState();
  const [showMagnifyngGlass, setShowMagnifyngGlass] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!restaurants) return;
  }, []);
  return (
    <div className="App">
      <Header
        showMagnifyngGlass={showMagnifyngGlass}
        setShowMagnifyngGlass={setShowMagnifyngGlass}
      />
      <Search
        query={query}
        setQuery={setQuery}
        showMagnifyngGlass={showMagnifyngGlass}
      />
      <Slider />
      <Categories
        setGetGropuId={setGetGropuId}
        setIsCategorized={setIsCategorized}
      />
      <Modal
        getRestaurantId={getRestaurantId}
        showModal={showModal}
        setShowModal={setShowModal}
      />
      <Restaurant
        getRestaurants={getRestaurants}
        query={query}
        setQuery={setQuery}
        getGroupId={getGroupId}
        isCategorized={isCategorized}
        setIsCategorized={setIsCategorized}
        setGetRestaurantId={setGetRestaurantId}
        setShowModal={setShowModal}
      />
      <DownCarousel />
      <TopRestaurants getRestaurants={getRestaurants} />
      <Footer />
    </div>
  );
}

function Header({ showMagnifyngGlass, setShowMagnifyngGlass }) {
  const onClickShowSearcher = () => {
    setShowMagnifyngGlass(!showMagnifyngGlass);
  };

  return (
    <div className="header-container">
      <div className="logo-container">
        <img className="logo" src="./images/logo.png" alt="welkhome" />
      </div>
      <div className="lupa-container">
        <img
          onClick={onClickShowSearcher}
          className="lupa"
          src="./images/lupa-white.png"
          alt="buscar..."
        />
      </div>
    </div>
  );
}

function Slider() {
  const [carouselItems, setCarouselItems] = useState(carousel);

  useEffect(() => {
    if (!carousel) return;
  }, []);

  return (
    // <MDBCarousel showControls showIndicators dark fade>
    <div className="slider">
      <MDBCarousel dark fade>
        {carouselItems.map((carousel) => (
          <MDBCarouselItem
            className="w-100 d-block"
            itemId={carousel.itemId}
            src={carousel.img}
            alt="..."
            key={carousel.itemId}
          >
            <div className="slider-content">
              <div className="slider-content-half-txt">
                <h1>{carousel.title}</h1>
                <h3>{carousel.subtitle}</h3>
                <a href="/#ancla">
                  <button className="thin">{carousel.boton}</button>
                </a>
              </div>
              <div className="slider-content-half-img">
                <img src={carousel.image} alt={carousel.title} />
              </div>
            </div>
          </MDBCarouselItem>
        ))}
      </MDBCarousel>
    </div>
  );
}

function Search({ query, setQuery, showMagnifyngGlass }) {
  return (
    <div
      className={showMagnifyngGlass ? "search-container" : "searcher-container"}
    >
      <div className="search-content">
        <input
          className="searcher"
          placeholder="Buscar..."
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
    </div>
  );
}

function Categories({ setGetGropuId, setIsCategorized }) {
  const [foodIcons, setFoodIcons] = useState(icons);

  const onClickGetGroupId = (id) => {
    setGetGropuId(id);
    setIsCategorized(true);
  };

  useEffect(() => {
    if (!icons) return;
  }, []);

  return (
    <div className="categories-container">
      <h2>CATEGORIAS</h2>
      <div className="icons-container">
        <div className="dif-left">
          <img src="./images/dif-left.png" />
        </div>
        <ul>
          {foodIcons.map((icon) => (
            <li onClick={() => onClickGetGroupId(icon.group)} key={icon.id}>
              <img className="icon-image" src={icon.img} alt={icon.name} />
              <p>{icon.name}</p>
            </li>
          ))}
        </ul>
        <div className="dif-right">
          <img src="./images/dif-right.png" />
        </div>
      </div>
    </div>
  );
}

function Restaurant({
  getRestaurants,
  query,
  setQuery,
  getGroupId,
  isCategorized,
  setIsCategorized,
  setGetRestaurantId,
  setShowModal,
}) {
  const [visibleRestaurants, setVisibleRestaurants] = useState(8);

  const loadMore = () => {
    setVisibleRestaurants(
      (prevVisibleRestaurants) => prevVisibleRestaurants + 4
    );
  };

  const loadLess = () => {
    setVisibleRestaurants(
      (prevVisibleRestaurants) => prevVisibleRestaurants - 12
    );
  };

  const total = visibleRestaurants === getRestaurants.length;
  const isSearchingFor = query.length > 0;

  const restaurantesFiltered = getRestaurants.filter((restaurant) =>
    restaurant.name.toLowerCase().includes(query.toLowerCase())
  );

  const restaurantesFilteredByCategory = getRestaurants
    .filter((restaurant) => restaurant.group == getGroupId)
    .filter((restaurant) =>
      restaurant.name.toLowerCase().includes(query.toLowerCase())
    );

  const onClickNewSearch = () => {
    setQuery("");
  };

  const onClickAllProducts = () => {
    setIsCategorized(false);
  };

  const onClickReserva = (id) => {
    setGetRestaurantId(id);
    setShowModal(true);
  };

  const isMatch = restaurantesFiltered.length > 0;

  return (
    <>
      <div id="ancla"></div>
      <div className="restaurant-container">
        <div className="restaurant-content">
          <h2>RESTAURANTES</h2>
          <h4>Elige el restaurantre de nuestra lista y haz tu reserva</h4>
          {isMatch ? (
            <>
              <div className="restaurants-container">
                {isCategorized ? (
                  restaurantesFilteredByCategory.map((restaurantFiltered) => (
                    <div className="card" key={restaurantFiltered.id}>
                      <img
                        className="restaurantFiltered-image"
                        src={restaurantFiltered.img}
                        alt={restaurantFiltered.name}
                      />
                      <h5>{restaurantFiltered.name}</h5>
                      <button
                        className="reservar"
                        onClick={() => onClickReserva(restaurantFiltered.id)}
                      >
                        Reservar
                      </button>
                    </div>
                  ))
                ) : (
                  <>
                    {restaurantesFiltered
                      .slice(0, visibleRestaurants)
                      .map((restaurant) => (
                        <div className="card" key={restaurant.id}>
                          <img
                            className="restaurant-image"
                            src={restaurant.img}
                            alt={restaurant.name}
                          />
                          <h5>{restaurant.name}</h5>
                          <p>
                            {restaurant.description.length > 10
                              ? restaurant.description.substring(0, 70) + "..."
                              : restaurant.description}
                          </p>
                          <button
                            className="reservar"
                            onClick={() => onClickReserva(restaurant.id)}
                          >
                            Reservar
                          </button>
                        </div>
                      ))}
                  </>
                )}
              </div>
              {isSearchingFor || isCategorized ? null : (
                <>
                  {total ? (
                    <button className="thin" onClick={loadLess}>
                      Cargar menos
                    </button>
                  ) : (
                    <button className="thin" onClick={loadMore}>
                      Cargar más
                    </button>
                  )}
                </>
              )}
            </>
          ) : (
            <div className="notfound-container">
              <div className="error-message">
                Lo sentimos pero no encontramos el restaurante que busca
              </div>
              <button className="thin" onClick={onClickNewSearch}>
                Nueva Búsqueda
              </button>
            </div>
          )}
          {isCategorized ? (
            <button className="thin" onClick={onClickAllProducts}>
              Ver todos
            </button>
          ) : null}
        </div>
      </div>
    </>
  );
}

function Modal({ getRestaurantId, showModal, setShowModal }) {
  const [mailSent, setMailSend] = useState(false);

  const restaurantSelected = restaurants.filter(
    (restaurant) => restaurant.id === getRestaurantId
  );

  const name = restaurantSelected.map((restaurant) => restaurant.name);
  const image = restaurantSelected.map((restaurant) => restaurant.img);
  const description = restaurantSelected.map(
    (restaurant) => restaurant.description
  );
  const tipos = restaurantSelected.map((restaurant) => restaurant.tipo)[0];

  const onClickCloseModal = () => {
    setShowModal(false);
  };

  const onClickConfirmSent = () => {
    setMailSend(true);

    setTimeout(() => {
      setMailSend(false);
    }, 2000);
  };

  useEffect(() => {
    if (!getRestaurantId) return;
  }, [getRestaurantId]);
  return (
    <>
      {showModal ? (
        <div className="modal-container">
          <div className="close" onClick={onClickCloseModal}>
            X
          </div>
          <div className="modal-content">
            <h2>Está realizando una reserva en el restaurante</h2>
            <h1>{name}</h1>
            <p>{description}</p>
            <div className="tipos-container">
              {tipos
                ? tipos.map((tipo) => (
                    <div key={tipo.name}>
                      <img src={tipo.img} />
                    </div>
                  ))
                : null}
            </div>
            <div className="fecha-container">
              <form>
                <div className="form">
                  <h2>Elije cuándo y cuántos</h2>
                  <input className="fecha-input" type="date" />
                  <input className="fecha-input" type="time" />
                  <input
                    className="fecha-input"
                    type="number"
                    placeholder="nº de personas"
                  />
                </div>
                <div className="form">
                  <h2>Elije cuándo y cuántos</h2>
                  <input
                    className="data-input"
                    type="text"
                    placeholder="Nombre"
                  />
                  <input
                    className="data-input"
                    type="mail"
                    placeholder="Email"
                  />
                  <input
                    className="data-input"
                    type="number"
                    placeholder="teléfono"
                  />
                </div>
                <button
                  className="send"
                  type="submit"
                  onClick={onClickConfirmSent}
                >
                  Enviar
                </button>
                {mailSent ? (
                  <div className="confirm-message">
                    Muchas gracias. Su reserva se ha realizado correctamente
                  </div>
                ) : null}
              </form>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function DownCarousel() {
  const [carouseDownlItems, setCarouseDownlItems] = useState(carouseldown);

  return (
    <div className="downcarousel-container">
      <MDBCarousel dark fade>
        {carouseDownlItems.map((carousel) => (
          <MDBCarouselItem
            className="w-100 d-block"
            itemId={carousel.itemId}
            src={carousel.image}
            alt="..."
            key={carousel.itemId}
          >
            <h1>{carousel.title}</h1>
            <h3>{carousel.subtitle}</h3>
          </MDBCarouselItem>
        ))}
      </MDBCarousel>
    </div>
  );
}

function TopRestaurants({ getRestaurants }) {
  const topRestaurantsValued = getRestaurants
    .sort((a, b) => b.valoracion - a.valoracion)
    .slice(0, 8);
  return (
    <div className="categories-container">
      <h2>TOP RESTAURANTES</h2>

      <div className="icons-container">
        <ul>
          {topRestaurantsValued.map((top) => (
            <li key={top.id}>
              <img className="icon-image-top" src={top.img} alt={top.name} />
              <div className="icon-image-top">
                <p>{top.name}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-content">
        <div className="logo-footer-container">
          <img src="./images/welkhome-logo-gold.png" />
        </div>
        <div className="items-container">
          <div className="block">
            <div className="column-title">Principal</div>
            <div className="column-item">
              <ul>
                <li>Restaurante</li>
                <li>Bebidas al peso</li>
                <li>Tu club</li>
                <li>Eventos</li>
                <li>Contacto</li>
              </ul>
            </div>
          </div>

          <div className="block">
            <div className="column-title">Otros</div>
            <div className="column-item">
              <ul>
                <li>Reservas</li>
                <li>Horarios</li>
                <li>Carta</li>
                <li>Promos</li>
                <li>Dónde Estamos</li>
              </ul>
            </div>
          </div>

          <div className="block">
            <div className="column-title">Sobre WELKHOMEclub</div>
            <div className="column-item">
              <p>No queremos cambiar el mundo, solo haceros sentir mejor.</p>
            </div>
          </div>

          <div className="block">
            <div className="column-title">Síguenos la pista</div>
            <div className="column-item">
              <ul>
                <li>
                  <span>
                    <img src="./images/icon-in.png" />
                  </span>
                  · Instagram
                </li>
                <li>
                  <span>
                    <img src="./images/icon-g.png" />
                  </span>
                  · Google
                </li>
                <li>
                  <span>
                    <img src="./images/icon-fb.png" />
                  </span>
                  · Facebook
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
