// Yandex map
let myMap;

function init() {
    myMap = new ymaps.Map("map", {
        center: [55.745777, 37.666890],
        zoom: 15,
        controls: [],
    });
    myMap.behaviors.disable('scrollZoom');
    myMap.behaviors.disable('drag');
    myMap.behaviors.disable('multiTouch');
    myMap.behaviors.disable('dblClickZoom');

    let coords = [55.745777, 37.666890],
        myCollection = new ymaps.GeoObjectCollection({}, {
            iconLayout: 'default#image',
            iconImageHref: '/img/icon/logo_map.svg',
            iconImageSize: [90, 100],
            iconImageOffset: [-45, -88]
        });

    myCollection.add(new ymaps.Placemark(coords));

    myMap.geoObjects.add(myCollection);
}

ymaps.ready(init);