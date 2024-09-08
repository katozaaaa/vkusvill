document.addEventListener('DOMContentLoaded', function () {
    // Prevent buttons and refs default behavior
    Array.from(document.querySelectorAll('button'))
    .concat(...document.querySelectorAll('a'))
    .forEach((el) => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
        });
    });

    // Acorrdion handler
    class Accordion {
      constructor(target, config) {
          this.accordion = typeof target === 'string' ? document.querySelector(target) : target;

          const defaultConfig = {
              alwaysClosePrev: true,
              firstOpen: true,
              duration: 200,
          };

          this._config = Object.assign(defaultConfig, config);

          if (this._config.firstOpen) {
              let firstItem = this.accordion.querySelector('.accordion__item');

              if (!firstItem) {
                  return;
              }

              firstItem.classList.add('accordion__item--open');
              firstItem.querySelector('.accordion__item-body').classList.add('accordion__item-body--collapse');
          }

          this.addEventListener();
      }

      addEventListener() {
          this.accordion.addEventListener('click', (e) => {
              const elItem = e.target.closest('.accordion__item');
          
              if (!elItem || this.accordion.classList.contains('accordion--open-item')) {
                  return;
              }

              if (this._config.alwaysClosePrev) {
                  const elOpenItem = this.accordion.querySelector('.accordion__item--open');
          
                  if (elOpenItem) {
                      elOpenItem !== elItem ? this.toggle(elOpenItem) : null;
                  }
              }

              this.toggle(elItem);
          });
      }

      show(el) {
          this.accordion.classList.add('accordion--open-item');
          const elBody = el.querySelector('.accordion__item-body');
        
          if (elBody.classList.contains('accordion__item-body--collapsing') || el.classList.contains('accordion__item--open')) {
              return;
          }

          elBody.style.display = 'flex';
          const height = elBody.offsetHeight;
          elBody.style.height = 0;
          elBody.style.overflow = 'hidden';
          elBody.style.transition = `height ${this._config.duration}ms ease`;
          elBody.classList.add('accordion__item-body--collapsing');
          el.classList.add('accordion__item--slidedown');
          elBody.offsetHeight;
          elBody.style.height = `${height}px`;

          window.setTimeout(() => {
              elBody.classList.remove('accordion__item-body--collapsing');
              el.classList.remove('accordion__item--slidedown');
              this.accordion.classList.remove('accordion--open-item');
              elBody.classList.add('accordion__item-body--collapse');
              el.classList.add('accordion__item--open');
              elBody.style.height = '';
              elBody.style.transition = '';
              elBody.style.overflow = '';
          }, this._config.duration);
      }

      hide(el) {
          const elBody = el.querySelector('.accordion__item-body');

          if (elBody.classList.contains('accordion__item-body--collapsing') || !el.classList.contains('accordion__item--open')) {
              return;
          }

          elBody.style.height = `${elBody.offsetHeight}px`;
          elBody.offsetHeight;
          elBody.style.display = 'flex';
          elBody.style.height = 0;
          elBody.style.overflow = 'hidden';
          elBody.style.transition = `height ${this._config.duration}ms ease`;
          elBody.classList.remove('accordion__item-body--collapse');
          el.classList.remove('accordion__item--open');
          elBody.classList.add('accordion__item-body--collapsing');

          window.setTimeout(() => {
              elBody.classList.remove('accordion__item-body--collapsing');
              elBody.classList.add('accordion__item-body--collapse');
              elBody.style.display = '';
              elBody.style.height = '';
              elBody.style.transition = '';
              elBody.style.overflow = '';
          }, this._config.duration);
      }

      toggle(el) {
          el.classList.contains('accordion__item--open') ? this.hide(el) : this.show(el);
      }
    }

    new Accordion('.ref__accordion', {
        alwaysClosePrev: false,
        firstOpen: false,
    });

    // Sliders handler

    /**
     * Initializes sliders
     * @param {Map} swiperSections A collection of pairs with selector as key and options as value.
     * @param {Object} defaultOptions Default settings of a Swiper.
     * @returns Array of Swipers
     */
    function swiperInit(swiperSections, defaultOptions) {
        let swipers = [...swiperSections.entries()].map(([selector, options]) => {
            let swiper = new Swiper(selector, options);

            if (defaultOptions) {
                swiper.defaults = defaultOptions;
            }

            return swiper;
        });

        return swipers;
    }

    const swipers = swiperInit(new Map([
        [
            '.faq .swiper',
            {   
                loop: true,
                speed: 300,
                spaceBetween: '16px',
                slidesPerView: 'auto',
                allowSlidePrev: false,
                navigation: {
                    nextEl: '.faq .swiper__button--next',
                },
                breakpoints: {
                    768: {
                        slidesPerView: 2,
                        spaceBetween: '25px',
                    },
                    998: {
                        slidesPerView: 3,
                        spaceBetween: '25px',
                    },
                    1280: {
                        slidesPerView: 4,
                        spaceBetween: '25px',
                    },
                },
            }
        ],
    ])); 
});