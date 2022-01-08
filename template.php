<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
        <meta name="viewport"
              content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
                <title>Тиры Москвы</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <link rel="stylesheet" href="Style/style.css">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
    <script src="https://api-maps.yandex.ru/2.1/?lang=ru_RU&amp;apikey=2b7e9cf1-cc82-45e8-b178-813cef04cd6b" type="text/javascript">
    </script>
    <script src="Scripts/main.js"></script>

</head>

<body>
<header class="header">
    <img src="img/logo.svg" class="logo">
    <div class="container-header">
        <h1 class="title">СТРЕЛКОВЫЕ ТИРЫ МОСКВЫ</h1>
    </div>

</header>
    <main class="main">
        <div class="address-container">
            <div class="container w-100">
                <form class="container justify-content-center" name="search" method="POST">
                    <input name="latitude" id="latitude" type="hidden">
                    <input name="longitude" id="longitude" type="hidden">
                    <input id="enter" name="enter" type="submit" onclick="return false" hidden>
                    <div class="row">
                        <label class="address-label" for="address">Введите ваш адрес</label>
                        <div class="col-11">
                            <input class="address-input w-100" id="address" name="address" type="text" value="<?if (isset($_POST['address'])) echo $_POST['address']?>" placeholder="Большая Семеновская 38" required>
                        </div>
                        <div class="col-1">
                            <select id="count" name="count" style="max-width: 50px">
                                <option <?if($limit == 3) echo "selected='selected'"?>>3</option>
                                <option <?if($limit == 5) echo "selected='selected'"?>>5</option>
                                <option <?if($limit == 10) echo "selected='selected'"?>>10</option>
                                <option <?if($limit == 15) echo "selected='selected'"?>>15</option>
                            </select>
                        </div>

                    </div>
                    <button name="find" id="find" type="button" onclick="submit_form()" class="button">Найти</button>
                </form>
            </div>
        </div>
        <div class="container pb-0 bg-light" id="info">
            <?echo $content?>

        </div>

<div id="map">

</div>
    </main>
</body>
<footer id="footer" class="footer position-fixed bottom-0">
    <div class="footer-info">
        <p>&copy;Корчагин И.В.</p>
    </div>
</footer>
</html>
