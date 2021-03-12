document.addEventListener('DOMContentLoaded', () => {
  'use strict';


  const getData = (url, callback) => {
    const request = new XMLHttpRequest();
    // настраиваем соединение    
    request.open('GET', url);
    request.send();
    request.addEventListener('readystatechange', () => {
      if (request.readyState !== 4) return;
      if (request.status === 200) {
        const response = JSON.parse(request.response);
        callback(response);
      } else {

        console.error(new Error('ошибка:', request.status));

      };


    });

  };


  const tabs = () => {
    const cardDetailChangeElems = document.querySelectorAll('.card-detail__change');
    const cardDetailsTitleElem = document.querySelector('.card-details__title');
    const cardImageItemElem = document.querySelector('.card__image_item');
    const cardDetailsPriceElem = document.querySelector('.card-details__price');
    const descriptionMemory = document.querySelector('.description__memory');

    const data = [{
        name: 'Смартфон Apple iPhone 12 Pro 128GB Graphite',
        img: 'img/iPhone-graphite.png',
        price: 95990,
        memoryROM: 128

      },
      {
        name: 'Смартфон Apple iPhone 12 Pro 256GB Silver',
        img: 'img/iPhone-silver.png',
        price: 120990,
        memoryROM: 256

      },
      {
        name: 'Смартфон Apple iPhone 12 Pro 128GB Pacific Blue',
        img: 'img/iPhone-blue.png',
        price: 99990,
        memoryROM: 128

      },
    ];
    const deactive = () => {
      cardDetailChangeElems.forEach(btn => btn.classList.remove('active'));
    }
    // оброботчик событий методом переберем 
    cardDetailChangeElems.forEach((btn, i) => {
      btn.addEventListener('click', () => {
        if (!btn.classList.contains('active')) {
          deactive();
          btn.classList.add('active');

          cardDetailsTitleElem.textContent = data[i].name;
          cardImageItemElem.src = data[i].img;
          cardImageItemElem.alt = data[i].name;
          cardDetailsPriceElem.textContent = data[i].price + '₽';
          descriptionMemory.textContent = `Встроенная память (ROM) ${data[i].memoryROM} ГБ`;
        }
      });
    });

  };
  const accordion = () => {
    const characteristicsListElem = document.querySelector('.characteristics__list');
    const characteristicsItemElems = document.querySelectorAll('.characteristics__item');
    // ф-я которая проверяет ли есть ли уже активный класс открытый при условии желаний заказчика
    characteristicsItemElems.forEach(elem => {
      if (elem.children[1].classList.contains('active')) {
        elem.children[1].style.height = `${elem.children[1].scrollHeight}px`;

      }
    })

    // characteristicsList.style.backgroundColor = "red";
    const open = (button, dropDown) => {
      closeAllDrops();
      dropDown.style.height = `${dropDown.scrollHeight}px`;
      button.classList.add('active');
      dropDown.classList.add('active');

    };
    const close = (button, dropDown) => {
      button.classList.remove('active');
      dropDown.classList.remove('active');
      dropDown.style.height = '';
    };
    const closeAllDrops = (button, dropDown) => {
      characteristicsItemElems.forEach((elem) => {
        if (elem.children[0] !== button && elem.children[1] !== dropDown) {
          close(elem.children[0], elem.children[1]);
        }

      });
    }

    characteristicsListElem.addEventListener('click', (event) => {
      const target = event.target;
      if (target.classList.contains('characteristics__title')) {
        const parent = target.closest('.characteristics__item');
        const description = parent.querySelector('.characteristics__description');
        description.classList.contains('active') ? close(target, description) : open(target, description);
      }
    });
    // когда кликну мимо аккордиона то закроется открытый элемент
    document.body.addEventListener('click', (event) => {
      const target = event.target;
      if (!target.closest('.characteristics__list')) {
        closeAllDrops();
      }

    });

    // setTimeout(closeAllDrops, 5000);
  };
  const modals = () => {
    const cardDetailsButtonBuy = document.querySelector('.card-details__button_buy');
    const cardDetailsButtonDelivery = document.querySelector('.card-details__button_delivery');
    const modal = document.querySelector('.modal');
    const cardDetailsTitle = document.querySelector('.card-details__title ');
    const modalTitle = document.querySelector('.modal__title');
    const modalSubtitle = document.querySelector('.modal__subtitle');
    const modalTitleSubmit = document.querySelector('.modal__title-submit');

    const openModal = event => {
      const target = event.target;
      modal.classList.add('open');
      document.addEventListener('keydown', escapeHandler);
      // меняем текст в модалке
      modalTitle.textContent = cardDetailsTitle.textContent;
      modalTitleSubmit.value = cardDetailsTitle.textContent;
      modalSubtitle.textContent = target.dataset.buttonBuy;

    };

    const closeModal = () => {
      modal.classList.remove('open');
      document.removeEventListener('keydown', escapeHandler);
    };
    // закрываем модал при помощи  esc
    const escapeHandler = event => {
      if (event.code === 'Escape' || keyCode === "27") {
        closeModal();
      };
    };
    modal.addEventListener('click', (event) => {
      const target = event.target;
      if (target.classList.contains('modal__close') || target === modal) {
        closeModal();
      }
    });
    cardDetailsButtonBuy.addEventListener('click', openModal);
    cardDetailsButtonDelivery.addEventListener('click', openModal);
  }

  const renderCrossSel = () => {
    const COUNT_ROW_GOODS = 4;
    const crossSellList = document.querySelector('.cross-sell__list');
    const crossSellAdd = document.querySelector('.cross-sell__add');
    const allGoods = [];
    let wrapRender = null;
    // a-я которая перемешивает товары
    const shuffle = arr => arr.sort(() => Math.random() - 0.5);

    const createCrossSellItem = (good) => {

      const {
        photo: picture,
        name,
        price
      } = good;
      const liItem = document.createElement('li');
      liItem.innerHTML = `<article class="cross-sell__item">
							<img class = "cross-sell__image"
							src = "${picture}"
							alt = ${good.name} >
							<h3 class="cross-sell__title">${name}
              </h3>
              <p>артикул:${good.id}</p> <br>
							<p class="cross-sell__price"> ${price} ₽</p>
							<div class="button button_buy cross-sell__button">Купить</div>
						</article>`;
      return liItem;
    };

    const render = arr => {
      arr.forEach(item => {
        crossSellList.append(createCrossSellItem(item));
      });
    }

    const wrapper = (fn, count) => {
      let counter = 0;
      return (...args) => {
        if (counter === count) return;
        counter++;
        return fn(...args);
      }
    };


    const createCrossSellList = (goods) => {
      wrapRender = wrapper(render, parseInt(goods.length / COUNT_ROW_GOODS) + 1);

      allGoods.push(...shuffle(goods))

      // crossSellList.textContent = '';
      // переменная shuffleGoots принимает ф-ю shuffle(goods)
      // const shuffleGoots = shuffle(allGoods);
      // slice-вырезать
      const fourItems = allGoods.splice(0, COUNT_ROW_GOODS);
      render(fourItems);
      // выводим на экран на страницу append перенесли выше
      // fourItems.forEach(item => {
      //   crossSellList.append(createCrossSellItem(item));
      // });
      // рекурсия щтложеный вызов -листает  4 перемешанных товара по 
      // setTimeout(createCrossSellList, 5000);
    };
    crossSellAdd.addEventListener('click', () => {
      wrapRender(allGoods.splice(0, COUNT_ROW_GOODS));
    })
    getData('cross-sell-dbase/dbase.json', createCrossSellList);
  }
  tabs();
  accordion();
  modals();
  renderCrossSel();
  amenu('.header__menu', '.header-menu__list', '.header-menu__item', '.header-menu__burger');
});



// 1-й вариант 
// document.addEventListener('DOMContentLoaded', () => {
//       'use strict';
//       const tabs = () => {
//           const cardDetailChangeElems = document.querySelectorAll('.card-detail__change');
//           const cardDetailsTitleElems = document.querySelectorAll('.card-details__title');
// const cardImageElems = document.querySelectorAll('.card__image');
// const hideAll = () => {
//   for (let i = 0; i < cardDetailChangeElems.length; i++) {
//     cardDetailChangeElems[i].classList.remove('active');
//     cardDetailsTitleElems[i].classList.remove('active');
//     cardImageElems[i].classList.remove('active');
//   }
// };
// for (let i = 0; i < cardDetailChangeElems.length; i++) {
//   cardDetailChangeElems[i].addEventListener('click', () => {
//     hideAll();
//     cardDetailChangeElems[i].classList.add('active');
//     cardDetailsTitleElems[i].classList.add('active');
//     cardImageElems[i].classList.add('active');
//   });
// };
// };
// const accordion = () => {
//   const characteristicsTitle = document.querySelectorAll('.characteristics__title');
//   const characteristicsDescription = document.querySelectorAll('.characteristics__description');
//   characteristicsTitle.forEach((elem, i) => {
//     elem.addEventListener('click', () => {
//       elem.classList.toggle('active');
//       characteristicsDescription[i].classList.toggle('active');
//     });

//   });
// };

// tabs();
// accordion();



// });