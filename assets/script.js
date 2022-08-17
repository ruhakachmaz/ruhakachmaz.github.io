 var tg = window.Telegram.WebApp;

    let appWrapper = document.querySelector("#app-wrapper")
    let modalWindow = document.querySelector(".modal-overlay")
    let modalCloseBtns = document.querySelectorAll(".close-modal-window")


    function findGetParameter(parameterName) {
        var result = null,
        tmp = [];
        var items = location.search.substr(1).split("&");
        for (var index = 0; index < items.length; index++) {
            tmp = items[index].split("=");
            if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        }
        return result;
    }

    function urldecode(str) {
     return decodeURIComponent((str+'').replace(/\+/g, '%20'));
    }

    let st = urldecode(findGetParameter('data'));
    var res = eval(st);
    let us = urldecode(findGetParameter('user'));
    var user = eval(us);
    console.log(urldecode(findGetParameter('data')));
    console.log(res);

    appWrapper.insertAdjacentHTML("afterbegin", `
        <div class="col-12 mb-3 elem-wrapper">
            <div class="elem-main row">
                <div class="col-5 text-left">
                    <p>${res[0].name}</p>
                    <p class="main-color-rgb">RGB: (${res[0].rgb[0]}, ${res[0].rgb[1]}, ${res[0].rgb[2]})</p>
                </div>
                <div class="col-7">
                    <div class="color-block-main" style="background-color:rgb(${res[0].rgb[0]}, ${res[0].rgb[1]}, ${res[0].rgb[2]})"></div>
                </div>
            </div>
        </div>
        <hr>
        <div class="row">
            <div class="col-12">
                <h5 class="elems-title">Ниже Вы сможете увидеть наиболее близкие цвета к введенному Вами с параметрами CIE76 и CIEDE2000 соответственно.</h5>
                <a href="https://clc.to/BotHelp">Инструкция пользователю</a>
            </div>
        </div>
    `)

    for (let i = 1; i < res.length; i++){
        appWrapper.insertAdjacentHTML("beforeend", `
            <div class="col-4 mb-3 elem-wrapper">
                <div class="elem" color-name="${res[i].name}" color-name="${res[i].name}">
                    <div class="color-block mt-3 mb-3" color-name="${res[i].name}" style="background-color:rgb(${res[i].rgb[0]}, ${res[i].rgb[1]}, ${res[i].rgb[2]})"></div>
                    <p color-name="${res[i].name}" class="color-title">${res[i].name}</p>
                    <p color-name="${res[i].name}" class="color-delta">${Math.round(res[i].c76 * 10) / 10} | ${Math.round(res[i].C2000 * 10) / 10}</p>
                </div>
            </div>
        `)
    }

    let items = document.querySelectorAll(".elem")
    let offerBtn = document.querySelector("#send-offer")
    for (btn of modalCloseBtns){
        btn.addEventListener("click", function(){
            btn.parentNode.parentNode.parentNode.parentNode.classList.add("d-none")
        })
    }

    for (item of items){
        item.addEventListener("click", function(e){
            console.log(e);
            console.log(e.target.getAttribute('color-name'))
            let color_name = e.target.getAttribute('color-name')
            let rgb_color = '';
            for (var i = res.length - 1; i >= 0; i--) {
                if (res[i].name == color_name) {
                    rgb_color = res[i].rgb;
                }
            }
            console.log(color_name)
            console.log(rgb_color)
            document.getElementById('modal-color-name').innerHTML = color_name;
            document.getElementById('modal-color-rgb').style.backgroundColor  = "rgb("+rgb_color[0]+","+rgb_color[1]+","+rgb_color[2]+")"
            modalWindow.classList.remove("d-none")
        })
    }
    document.getElementById('modal-form-send').addEventListener("click", function(e){
        let color_name = document.getElementById('modal-color-name').innerHTML;
        let phone = document.getElementById('modal-form-phone').value;
        let count = document.getElementById('modal-form-count').value;
        let dop = document.getElementById('modal-form-dop').value;
        let perf = document.getElementById('modal-form-per').value;
        let result = [color_name,phone,count,dop,user,res[0].name, perf, 'choose_color'];
        tg.sendData(JSON.stringify(result));
    });

    if (document.getElementById('modal-color-name').includes("эко-кожа") || document.getElementById('modal-color-name').includes("Эко-кожа")){
        document.getElementById('meter_type').innerHTML = "Количество (пог. м)"
    } else{
        document.getElementById('meter_type').innerHTML = "Количество (м²)"
    }
