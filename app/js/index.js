(function () {


    const humanModelPoints = document.getElementById('human-model-points');
    const pointsTarget = document.getElementById('points-target');
    const commentsBox = document.getElementById('comments-box');
    const showCommentsBtn = document.getElementById('show-comments-btn');
    console.log(humanModelPoints);

    const coordinats = {
        '01': [255, 138],
        '02': [240, 60],
        '03': [241, 27],
        '04': [240, 95],
        '05': [241, 27],
        '06': [275, 315],
        '07': [240, 27],
        '08': [240, 200],
        '09': [240, 27]
    };

    const comments = {
        ru: [
            {
                id: 1,
                name: 'Аноним',
                text: `Если время от времени употреблять горечь, 
                        то вообще не будет болеть ОРЗ или ангинами. Младшему
                        сыну я развожу раствор слабее (горечь, вода),
                        он с удоволь- ствием пьет, иногда даже сам просит 
                        сделать ему го- речь. Только делаю меньше половины стакана,
                        чтобы малыш смог выпить.`
            },
            {
                id: 2,
                name: 'Юлия',
                text: `Этот сбор действительно очень хорошая вещь. Я его приобрела по совету своей тёти.             Замечательно помогает при зубной боли, а также я его постоянно принимаю при простуде.         Помогает хорошо и нет никакой химии.`
            },
            {
                id: 3,
                name: 'Натали',
                text: `Моя семья на протяжение многих лет пользуется шведской горечью. При болях в горле мы          полоскаем горечью. Когда температура я даю горечь и при этом мы не пользуемся                 таблетками.`
            },
            {
                id: 4,
                name: 'Евгения',
                text: `Я покупаю уже готовый сбор шведский бальзам. Отказались от многих лекарственных               препаратов благодаря бальзаму. Так что могу только посоветовать самим попробовать, это        стоит того.`
            }

        ],
        en: [
            {
                id: 1,
                name: 'Paul',
                text: `the balm is very good. it has a lot of vitamins and other beneficial substances`
            },
            {
                id: 2,
                name: 'Lisa',
                text: `This fee is really a very good thing. I bought it on the advice of my aunt. It helps          with toothache, and I always take it for colds. It helps well and there is no                 chemistry.`
            },
            {
                id: 3,
                name: 'Barbara',
                text: `My family has enjoyed Swedish bitterness for many years. When the temperature I give          bitterness and at the same time we do not use pills.`
            },
            {
                id: 4,
                name: 'Robert',
                text: `I refused many medications thanks to the balm. the balm is very good`
            }
        ]
    }


    const getCommentTemplate = (element) => {
        return (
            `<div class="reviews-inner-box-items-current">
                <p class="reviews-inner-box-items-current-text">
                ${element.text}
                </p>
                <span class="reviews-inner-box-items-current-author">
                    ${element.name}
                </span>
            </div>`
        )
    };

    const getPointTemplate = (value) => {
        return `<div class="types-ailments-inner-view-model-point" id="model-point">${value}</div>`;
    };

    const fillCommentsSection = (data, local = 'ru') => {

        const fragment = data[local].reduce((accum, element) => {
            return accum + getCommentTemplate(element);
        }, '');

        commentsBox.insertAdjacentHTML('beforeEnd', fragment);
    };

    fillCommentsSection(comments);

    showCommentsBtn.addEventListener('click', (event) => {
        while (commentsBox.firstChild) {
            commentsBox.removeChild(commentsBox.firstChild);
        }
        const targetParent = event.target.closest('div');
        const elementContainingClass = targetParent.querySelector('.active');
        const currentTarget = event.target;
        const local = currentTarget.dataset.type;

        elementContainingClass.classList.remove('active');
        currentTarget.classList.add('active');
        fillCommentsSection(comments, local);
    })

    pointsTarget.addEventListener('click', (event) => {
        while (humanModelPoints.firstChild) {
            humanModelPoints.removeChild(humanModelPoints.firstChild);
        }

        const dataTarget = event.target.closest('li').dataset.id;
        const currentPoint = getPointTemplate(dataTarget);

        humanModelPoints.insertAdjacentHTML('beforeEnd', currentPoint);

        const modelPoint = document.getElementById('model-point');
        const [left, top] = coordinats[dataTarget];

        modelPoint.style.left = `${left}px`;
        modelPoint.style.top = `${top}px`;
    });
    
})();
