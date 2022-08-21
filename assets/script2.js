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

        <div class="row">
            <div class="col-12">
                <h3 class="elems-title">Выберите один из похожих цветов</h3>
            </div>
        </div>
    `)
    console.log(res);
    for (let i = 0; i < res.length; i++){
    if (res[i]['is_color_creator'] == 0) {
        appWrapper.insertAdjacentHTML("beforeend", `
            <div class="col-4 mb-3 elem-wrapper">
                <div class="elem" color-name="${res[i].name}" color-name="${res[i].name}">
                    <div class="color-block mt-3 mb-3" color-name="${res[i].name}" style="background-color:rgb(${res[i].rgb[0]}, ${res[i].rgb[1]}, ${res[i].rgb[2]})"></div>
                    <p color-name="${res[i].name}" class="color-title">${res[i].name}</p>
                </div>
            </div>
        `)
       }else{
       appWrapper.insertAdjacentHTML("beforeend", `
            <div class="col-4 mb-3 elem-wrapper">
                <div class="elem" color-name="${res[i].name}" color-name="${res[i].name}" creator-name="${res[i].creator}">
                    <div class="color-block mt-3 mb-3" color-name="${res[i].name}" creator-name="${res[i].creator}" style="background-color:rgb(${res[i].rgb[0]}, ${res[i].rgb[1]}, ${res[i].rgb[2]})"></div>
                    <p color-name="${res[i].name}" class="color-title" creator-name="${res[i].creator}" >${res[i].name}</p>
                    <p color-name="${res[i].name}" class="color-title mt-1" creator-name="${res[i].creator}">Поставщик: <strong>${res[i].creator}</strong></p>
                </div>
            </div>
        `)
       }
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
            if (e.target.hasAttribute("creator-name")) {
                let creator = e.target.getAttribute('creator-name');
                let result = [color_name,creator, rgb_color, 'near_color'];
tg.sendData(JSON.stringify(result));
            console.log(result)
            }  else{
                let result = [color_name, rgb_color, 'near_color'];
                tg.sendData(JSON.stringify(result));
            console.log(result)
            }

        })
    }
    document.getElementById('modal-form-send').addEventListener("click", function(e){
        let color_name = document.getElementById('modal-color-name').innerHTML;
        let phone = document.getElementById('modal-form-phone').value;
        let count = document.getElementById('modal-form-count').value;
        let dop = document.getElementById('modal-form-dop').value;
        let perf = document.getElementById('modal-form-per').value;
        let result = [color_name,phone,count,dop,user,res[0].name, perf];
        tg.sendData(JSON.stringify(result));
    });

//    if (document.getElementById('modal-color-name').includes("эко-кожа") || document.getElementById('modal-color-name').includes("Эко-кожа")){
//        document.getElementById('meter_type').innerHTML = "Количество (пог. м)"
//    } else{
//        document.getElementById('meter_type').innerHTML = "Количество (м²)"
//    }
