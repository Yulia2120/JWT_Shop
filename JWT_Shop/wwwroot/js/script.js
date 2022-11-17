
$("#formValid").validate({
    rules: {
        email: true,
        password: true,
    },
    messages: {
        email: {
            required: "Please enter your email",
            email: "Your email address must be in the format of name@domain.com",
        },
        password: {
            required: "Please enter your password",
        },
    },
    submitHandler: function (form) {
        var tokenKey = "accessToken";
        // при нажатии на кнопку отправки формы идет запрос к /login для получения токена
        document.getElementById("submitLogin").addEventListener("click", async e => {
            e.preventDefault();
            // отправляет запрос и получаем ответ
            const response = await fetch("/login", {
                method: "POST",
                headers: { "Accept": "application/json", "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: document.getElementById("email").value,
                    password: document.getElementById("password").value
                })
            });
            // если запрос прошел нормально
            if (response.ok === true) {
                // получаем данные
                const data = await response.json();
                // изменяем содержимое и видимость блоков на странице
                document.getElementById("userName").innerText = data.username;
                document.getElementById("rowInfo").style.display = "block";
                document.getElementById("contant").style.display = "none";

                // сохраняем в хранилище sessionStorage токен доступа
                sessionStorage.setItem(tokenKey, data.access_token);
            }
            else  // если произошла ошибка, получаем код статуса
                console.log("Status: ", response.status);
        });

        // кнопка для обращения по пути "/data" для получения данных
        document.getElementById("getData").addEventListener("click", async e => {
            e.preventDefault();
            // получаем токен из sessionStorage
            const token = sessionStorage.getItem(tokenKey);
            // отправляем запрос к "/data
            const response = await fetch("/data", {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Authorization": "Bearer " + token  // передача токена в заголовке
                }
            });

            if (response.ok === true) {
                const data = await response.json();
                alert(data.message);
            }
            else
                console.log("Status: ", response.status);
        });

        // условный выход - просто удаляем токен и меняем видимость блоков
        document.getElementById("logOut").addEventListener("click", e => {

            e.preventDefault();
            document.getElementById("userName").innerText = "";
            document.getElementById("rowInfo").style.display = "none";
            document.getElementById("contant").style.display = "block";
            sessionStorage.removeItem(tokenKey);
        });
    }
});