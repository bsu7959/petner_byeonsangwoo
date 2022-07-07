const slide = document.getElementById('slide');
let list2 = {};

console.log(slide)
fetch('https://petner.kr/api/v6/publics')
    .then(res => res.json())
    .then(data => {
        const list = Object.assign({}, data);
        list2 = Object.assign({}, data);
        for (let i = 0; i < 10; i++) {
            const now = new Date();
            const created = new Date(list[i].created_at)
            const time = parseInt(Math.abs((now.getTime() - created.getTime()) / (1000 * 3600 * 24)));
            const html = `
        <li class="card" id="card${i}">
                <div class="card_container">
                    <div class="card_header">
                        <img src="${list[i].petner.image}"
                            class="profile_img"></img>
                        <div class="header_name">
                            <p class="name">${list[i].petner.name}</p>
                            <div class="subname_container">
                                <img src="${list[i].petner.image}"
                                    alt="subimg" class="subimg" />
                                <p class="subname">전문펫시터</p>
                            </div>
                        </div>
                    </div>
                    <div class="card_body">
                        <img src="${list[i].image}"
                            alt="post_img" />
                    </div>
                    <div class="card_footer">
                        <p class="upload_time">약 ${time}일 전</p>
                        <p class="companion_name">${list[i].companion.name}</p>
                    </div>
                </div>
            </li>
        `;
            slide.innerHTML += html;
        }
    });

let position = 930;
let prev_card = 9;
let prev_id = -1;
let next_card = 0;
let next_id = 10;
let clicked = false;



    

$('#prev_btn').on("click", function () {
    if (clicked) return;
    clicked = true;
    $('.card').animate({
        right: `${position - 310}px`

    }, 800)
    position -= 310;
    console.log(position);
    setTimeout(function () {
        position += 310;
        $('.card').css('right', position);
        $(`#card${next_id - 1}`).remove();
        slide.innerHTML = `
            <li class="card" id="card${prev_id}" style="right:${position}px">
                    <div class="card_container">
                        <div class="card_header">
                            <img src="${list2[prev_card].petner.image}"
                                class="profile_img"></img>
                            <div class="header_name">
                                <p class="name">${list2[prev_card].petner.name}</p>
                                <div class="subname_container">
                                    <img src="${list2[prev_card].petner.image}"
                                        alt="subimg" class="subimg" />
                                    <p class="subname">전문펫시터</p>
                                </div>
                            </div>
                        </div>
                        <div class="card_body">
                            <img src="${list2[prev_card].image}"
                                alt="post_img" />
                        </div>
                        <div class="card_footer">
                            <p class="upload_time">약 6시간 전</p>
                            <p class="companion_name">${list2[prev_card].companion.name}</p>
                        </div>
                    </div>
                </li>
            ` + slide.innerHTML;
        if (prev_card == 0) {
            prev_card = 9;
        } else {
            prev_card--;
        }
        prev_id--;
        next_id--;
        clicked = false;
    }, 800);

});

let timer = setInterval(function () {
    $('#next_btn').click();
}, 3000)

$('#next_btn').on("click", function () {
    if (clicked) return;
    clicked = true;
    clearInterval(timer);
    $('.card').animate({
        right: `${position + 310}px`

    }, 800)
    position += 310;
    setTimeout(function () {
        position -= 310;
        $('.card').css('right', position);
        $(`#card${prev_id + 1}`).remove();
        slide.innerHTML =
            slide.innerHTML + `<li class="card" id="card${next_id}" style="right:${position}px">
            <div class="card_container">
                <div class="card_header">
                    <img src="${list2[next_card].petner.image}"
                        class="profile_img"></img>
                    <div class="header_name">
                        <p class="name">${list2[next_card].petner.name}</p>
                        <div class="subname_container">
                            <img src="${list2[next_card].petner.image}"
                                alt="subimg" class="subimg" />
                            <p class="subname">전문펫시터</p>
                        </div>
                    </div>
                </div>
                <div class="card_body">
                    <img src="${list2[next_card].image}"
                        alt="post_img" />
                </div>
                <div class="card_footer">
                    <p class="upload_time">약 6시간 전</p>
                    <p class="companion_name">${list2[next_card].companion.name}</p>
                </div>
            </div>
        </li>
    `;
        if (next_card == 9) {
            next_card = 0;
        } else {
            next_card++;
        }
        prev_id++;
        next_id++;
        clicked = false;
        timer = setInterval(function () {
            $('#next_btn').click();
        }, 3000);
    }, 800);

});
let reload_clicked = false;
$('#reload_btn').on('click', function () {
    if (reload_clicked == true) return;
    reload_clicked = true;
    clearInterval(timer);
    fetch('https://petner.kr/api/v6/publics')
        .then(res => res.json())
        .then(data => {
            const list = Object.assign({}, data);
            list2 = Object.assign({}, data);
            for (let i = 0; i < 10; i++) {
                const now = new Date();
                const created = new Date(list[i].created_at)
                const time = parseInt(Math.abs((now.getTime() - created.getTime()) / (1000 * 3600 * 24)));
                const html = `
    <li class="card" id="card${i}">
            <div class="card_container">
                <div class="card_header">
                    <img src="${list[i].petner.image}"
                        class="profile_img"></img>
                    <div class="header_name">
                        <p class="name">${list[i].petner.name}</p>
                        <div class="subname_container">
                            <img src="${list[i].petner.image}"
                                alt="subimg" class="subimg" />
                            <p class="subname">전문펫시터</p>
                        </div>
                    </div>
                </div>
                <div class="card_body">
                    <img src="${list[i].image}"
                        alt="post_img" />
                </div>
                <div class="card_footer">
                    <p class="upload_time">약 ${time}일 전</p>
                    <p class="companion_name">${list[i].companion.name}</p>
                </div>
            </div>
        </li>
    `;
                slide.innerHTML += html;
            }
            timer = setInterval(function () {
                $('#next_btn').click();
            }, 3000);
            reload_clicked = false;
        });
    position = 930;
    prev_card = 9;
    prev_id = -1;
    next_card = 0;
    next_id = 10;
    clicked = false;
    list2 = {};
    slide.innerHTML = "";
})




