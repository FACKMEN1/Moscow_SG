const pattern = /^[А-Яа-я]+\s*[А-Яа-я]*[\s,.]+(дом|д|д\.|дом\.|Дом|Дом\.|Д\.)*\s*\d+/g

let data
let latitude;
let longitude;
var myMap = undefined;
let userCoordinates = [];
let userBounds = '';

function showText(element, user_latitude, user_longitude, id) {
    let text = element.innerHTML;
    let sg_info = document.getElementById(text)
    if (sg_info.style.display != 'none') {
        sg_info.style.display = 'none';
        let map = document.getElementById("map" + id);
        sg_info.removeChild(map);
    }
    else {
        sg_info.style.display = 'flex'
        latitude = element.dataset.latitude;
        longitude = element.dataset.longitude;
        let map = document.createElement("div");
        map.className = "map";
        map.id = "map" + id;
        sg_info.append(map);
        init(map, element, user_latitude, user_longitude)
    }
}

function checkAddress(address){
    let check = address.matchAll(pattern)
    let result = Array.from(check)[0]
    if(result !== undefined){
        return result[0]
    }
    return null
}

function createMap(address){
    let map = document.createElement('img')
    let img = new Image(100, 100);
    img.src = "F:\\ЯСтудент\\Базы данных\\Cursach\\map.png"
    map.src = img.src
    map.width = '100%'
    map.height = '100%'
    map.style.display = 'block'
    //map.parentElement.style.display = 'block'
}

/*function findPlaces(address){
    let name = data[0].Cells.ObjectName;
    let item = document.createElement('div')
    let info = document.createElement('table')
    info.id = 'inf'
    info.style.display = 'none'
    for (const Key in data[0].Cells) {
        if (Key !== 'DimensionsSummer' && Key !== 'ObjectName' && Key !== 'global_id' && Key !== 'PhotoSummer' && Key !== 'geoData') {
            if (Key == 'WorkingHoursSummer'){
                let row = document.createElement('tr')
                let cell = document.createElement('td')
                cell.innerHTML = 'График работы'
                row.append(cell)
                info.append(row)
                for(const Days in data[0].Cells[Key]){
                    let row = document.createElement('tr')
                    let cell = document.createElement('td')
                    cell.innerHTML = data[0].Cells[Key][Days].DayOfWeek + ' ' + data[0].Cells[Key][Days].Hours
                    row.append(cell)
                    info.append(row)
                }
                continue
            }
            if(Key == 'WebSite'){
                let row = document.createElement('tr')
                let cell = document.createElement('td')
                let site = data[0].Cells[Key]
                site.url = data[0].Cells[Key]
                cell.innerHTML = site
                row.append(cell)
                info.append(row)
            }

            let row = document.createElement('tr')
            let cell = document.createElement('td')
            cell.innerHTML = data[0].Cells[Key]
            row.append(cell)
            info.append(row)
        }
    }

    item.classList.add('test')
    item.id = 'te';
    let p = document.createElement('p')
    p.innerHTML = name;
    //item.innerHTML = name
    item.appendChild(p)
    item.appendChild(info)

    let map = createMap(address)
    item.append(map)
    info.classList.add('hidden_text')


    p.onclick = function (){
        showText(item.lastElementChild.id)
    }
    return item
}*/

/*let find = document.getElementById('find')
find.onclick = function (e) {
    let footer = document.styleSheets[0].cssRules[24].style
    footer.removeProperty('position')
    let address = document.getElementById('address').value;
    let good_address = checkAddress(address);
    if(good_address !== null) {
        let old_data = document.querySelector('.test')
        if (old_data !== null)
            old_data.remove()
        let shooting_galleries = findPlaces(good_address);
        document.getElementById('info').append(shooting_galleries)

    }
    else{
        alert('Вы ввели странный адрес. Попробуйте ещё.')
    }
}*/
/*window.onload = function (){
    setInterval(selectData(), 30000)

}*/

/*const EART_RADIUS = 6371210; //Радиус земли
const DISTANCE = 20000; //Интересующее нас расстояние

//https://en.wikipedia.org/wiki/Longitude#Length_of_a_degree_of_longitude
function computeDelta(degrees) {
    return Math.PI / 180 * EART_RADIUS * Math.cos(deg2rad(degrees));
}

function deg2rad(degrees) {
    return degrees * Math.PI / 180;
}

const latitude = 55.460531; //Интересующие нас координаты широты
const longitude = 37.210488; //Интересующие нас координаты долготы

const deltaLat = computeDelta(latitude); //Получаем дельту по широте
const deltaLon = computeDelta(longitude); // Дельту по долготе

const aroundLat = DISTANCE / deltaLat; // Вычисляем диапазон координат по широте
const aroundLon = DISTANCE / deltaLon; // Вычисляем диапазон координат по долготе

console.log(aroundLat, aroundLon);*/

function findPlace(address){
    console.log("booba")
    ymaps.geocode(address, {
        results: 1
    }).then(function (res) {
        var firstGeoObject = res.geoObject.get(0),
            // Координаты геообъекта.
            coords = firstGeoObject.geometry.getCoordinates(),
            // Область видимости геообъекта.
            bounds = firstGeoObject.properties.get('boundedBy');
        //firstGeoObject.options.set('preset', 'islands#darkBlueDotIconWithCaption');

        userCoordinates[0] = coords[0];
        userCoordinates[1] = coords[1]
        userBounds = bounds;

    })
    let xhr = new XMLHttpRequest();
    let form = new FormData(document.forms.search);
    form.append("latitude", userCoordinates[0]);
    form.append("longitude", userCoordinates[1]);
    //let url = new URL()
    xhr.open("POST", "/article/xmlhttprequest/post/user");
    xhr.send(form)

    let footer = document.styleSheets[0].cssRules[19].style
    footer.removeProperty('position')
    xhr.upload.onerror = function() {
        alert(`Произошла ошибка во время отправки: ${xhr.status}`);
    };
}


function init(map, sg_name, user_latitude, user_longitude) {
    console.log(parseFloat(sg_name.dataset.latitude))
    myMap = new ymaps.Map(map.id + "", {
            center: [55.76, 37.64],
            zoom: 10
        }, {
            searchControlProvider: 'yandex#search'
        })

    myMap.geoObjects.add(new ymaps.Placemark([parseFloat(user_latitude), parseFloat(user_longitude)], {
            balloonContent: '<strong>Вы</strong>'
        }, {
            preset: 'islands#dotIcon',
            iconColor: '#f10b0b'
        })).add(new ymaps.Placemark([parseFloat(sg_name.dataset.latitude), parseFloat(sg_name.dataset.longitude)], {
            balloonContent: sg_name.innerHTML.toString()
            }, {
        preset: 'islands#dotIcon',
        iconColor: '#735184'
    }));
}
let find_button = document.forms.search;

function submit_form(){
/*    let latitude = document.getElementById('latitude');
    let longitude = document.getElementById('longitude');*/
    let form = document.forms.search
    let address = document.getElementById('address').value;
    let good_address = checkAddress(address);
    let userCoordinates = [];
    if(good_address !== null) {
        good_address = 'Москва ' + good_address;
        var myMap = new ymaps.Map('map', {
            center: [55.753994, 37.622093],
            zoom: 9
        });
        console.log(good_address)
        ymaps.geocode(good_address, {
            /**
             * Опции запроса
             * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/geocode.xml
             */
            // Сортировка результатов от центра окна карты.
            // boundedBy: myMap.getBounds(),
            // strictBounds: true,
            // Вместе с опцией boundedBy будет искать строго внутри области, указанной в boundedBy.
            // Если нужен только один результат, экономим трафик пользователей.
            results: 1
        }).then(function (res) {
            // Выбираем первый результат геокодирования.
            var firstGeoObject = res.geoObjects.get(0),
                // Координаты геообъекта.
                coords = firstGeoObject.geometry.getCoordinates(),
                // Область видимости геообъекта.
                bounds = firstGeoObject.properties.get('boundedBy');

            userCoordinates[0] = coords[0];
            userCoordinates[1] = coords[1];

            console.log(coords[0])

            firstGeoObject.options.set('preset', 'islands#darkBlueDotIconWithCaption');
            // Получаем строку с адресом и выводим в иконке геообъекта.
            firstGeoObject.properties.set('iconCaption', firstGeoObject.getAddressLine());

            // Добавляем первый найденный геообъект на карту.
            myMap.geoObjects.add(firstGeoObject);
            // Масштабируем карту на область видимости геообъекта.
            myMap.setBounds(bounds, {
                // Проверяем наличие тайлов на данном масштабе.
                checkZoomRange: false
            });

/*            form.elements.latitude.value = coords[0].toString();
            form.elements.longitude.value = coords[1].toString();*/

            /**
             * Все данные в виде javascript-объекта.
             */
            console.log('Все данные геообъекта: ', firstGeoObject.properties.getAll());
            /**
             * Метаданные запроса и ответа геокодера.
             * @see https://api.yandex.ru/maps/doc/geocoder/desc/reference/GeocoderResponseMetaData.xml
             */
            console.log('Метаданные ответа геокодера: ', res.metaData);
            /**
             * Метаданные геокодера, возвращаемые для найденного объекта.
             * @see https://api.yandex.ru/maps/doc/geocoder/desc/reference/GeocoderMetaData.xml
             */
            console.log('Метаданные геокодера: ', firstGeoObject.properties.get('metaDataProperty.GeocoderMetaData'));
            /**
             * Точность ответа (precision) возвращается только для домов.
             * @see https://api.yandex.ru/maps/doc/geocoder/desc/reference/precision.xml
             */
            console.log('precision', firstGeoObject.properties.get('metaDataProperty.GeocoderMetaData.precision'));
            /**
             * Тип найденного объекта (kind).
             * @see https://api.yandex.ru/maps/doc/geocoder/desc/reference/kind.xml
             */
            console.log('Тип геообъекта: %s', firstGeoObject.properties.get('metaDataProperty.GeocoderMetaData.kind'));
            console.log('Название объекта: %s', firstGeoObject.properties.get('name'));
            console.log('Описание объекта: %s', firstGeoObject.properties.get('description'));
            console.log('Полное описание объекта: %s', firstGeoObject.properties.get('text'));
            /**
             * Прямые методы для работы с результатами геокодирования.
             * @see https://tech.yandex.ru/maps/doc/jsapi/2.1/ref/reference/GeocodeResult-docpage/#getAddressLine
             */
            console.log('\nГосударство: %s', firstGeoObject.getCountry());
            console.log('Населенный пункт: %s', firstGeoObject.getLocalities().join(', '));
            console.log('Адрес объекта: %s', firstGeoObject.getAddressLine());
            console.log('Наименование здания: %s', firstGeoObject.getPremise() || '-');
            console.log('Номер здания: %s', firstGeoObject.getPremiseNumber() || '-');

            /**
             * Если нужно добавить по найденным геокодером координатам метку со своими стилями и контентом балуна, создаем новую метку по координатам найденной и добавляем ее на карту вместо найденной.
             */
            /**
             var myPlacemark = new ymaps.Placemark(coords, {
             iconContent: 'моя метка',
             balloonContent: 'Содержимое балуна <strong>моей метки</strong>'
             }, {
             preset: 'islands#violetStretchyIcon'
             });

             myMap.geoObjects.add(myPlacemark);
             */
            form.elements.latitude.value = userCoordinates[0].toString()
            form.elements.longitude.value = userCoordinates[1].toString()
            form.submit()
        });

    }
    else{
        alert('Вы ввели странный адрес. Попробуйте ещё.')
    }
}
