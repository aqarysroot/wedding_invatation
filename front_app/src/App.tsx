import cn from "classnames";
import { useTranslation } from "react-i18next";
import { FormEvent, createRef, useState, useEffect, type FunctionComponent } from "react";
import styles from "@/App.module.scss";
import CeremonyIcon from "@/assets/icons/ceremony.svg?react";
import CakeIcon from "@/assets/icons/cake.svg?react";
import MusicIcon from "@/assets/icons/music.svg?react";
import CameraIcon from "@/assets/icons/camera.svg?react";
import PlayerIcon from "@/assets/icons/player.svg?react";
import CircledChevronLeftIcon from "@/assets/icons/circled-chevron-left.svg?react";
import CircledChevronRightIcon from "@/assets/icons/circled-chevron-right.svg?react";
import FormImage from "@/assets/images/form/dinmukhamed-maral.webp";
import Gallery1Image from "@/assets/images/gallery/1.webp";
import Gallery4Image from "@/assets/images/gallery/4.webp";
import Gallery5Image from "@/assets/images/gallery/5.webp";
import Gallery2Image from "@/assets/images/gallery/2.webp";
import Gallery3Image from "@/assets/images/gallery/3.webp";
import Gallery6Image from "@/assets/images/gallery/6.webp";
import Gallery7Image from "@/assets/images/gallery/7.webp";
import Audio from "@/assets/audios/audio.mp3";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import i18n from "./i18n";
import { sendForm } from "./api/form";
import Map from "@/components/Map.tsx";


export const App: FunctionComponent = () => {
  const { t } = useTranslation();

  const invitionRef = createRef<HTMLElement>();
  const dateRef = createRef<HTMLElement>();
  const addressRef = createRef<HTMLElement>();
  const anketaRef = createRef<HTMLElement>();

  const [isOpenedModal, setIsOpenedModal] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const ceremonyDate = new Date('2024-11-23T17:00:00').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = ceremonyDate - now;

      if (distance < 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    // Используем деструктуризацию для более чистого извлечения элементов формы
    const [nameInput, comingInput, withPairInput, noComingInput] = Array.from(
      event.target.elements
    ) as HTMLInputElement[];

    // Функция для определения значения приглашения
    const getInvitation = () => {
      if (comingInput.checked) return 1;
      if (withPairInput.checked) return 2;
      return 0;
    };

    // Проверяем, что элементы формы существуют перед отправкой данных
    if (nameInput && comingInput && withPairInput && noComingInput) {
      await sendForm({ name: nameInput.value, count: getInvitation() });
      setIsOpenedModal(true);

      setTimeout(() => {
        setIsOpenedModal(false);
      }, 3000);
    }
  };

  const handleToggleAudio = () => {
    const audio = document.querySelector("audio");

    if (!audio) return;

    if (audio.paused) {
      console.log("play");
      return audio.play();
    }
    console.log("pause");
    audio.pause();
  };

  return (
    <>
      <header className={styles["header"]}>
        <ul className={styles["header-languages"]}>
          <li className={styles["header-languages__item"]}>
            <button
              type="button"
              onClick={() => i18n.changeLanguage("kk")}
              className={cn(styles["header-languages__button"], {
                [styles["active"]]: i18n.language === "kk",
              })}
            >
              қаз
            </button>
          </li>

          <li className={styles["header-languages__item"]}>
            <button
              type="button"
              onClick={() => i18n.changeLanguage("ru")}
              className={cn(styles["header-languages__button"], {
                [styles["active"]]: i18n.language === "ru",
              })}
            >
              рус
            </button>
          </li>
        </ul>

        <nav className={styles["header-nav"]}>
          <ul className={styles["header-nav__list"]}>
            <li className={styles["header-nav__item"]}>
              <a
                href="#"
                onClick={() => invitionRef.current?.scrollIntoView({ behavior: "smooth" })}
                className={styles["header-nav__link"]}
              >
                {t("header.nav.coming")}
              </a>
            </li>

            <li className={styles["header-nav__item"]}>
              <button
                type="button"
                onClick={() => dateRef.current?.scrollIntoView({ behavior: "smooth" })}
                className={styles["header-nav__link"]}
              >
                {t("header.nav.day")}
              </button>
            </li>

            <li className={styles["header-nav__item"]}>
              <button
                type="button"
                onClick={() => addressRef.current?.scrollIntoView({ behavior: "smooth" })}
                className={styles["header-nav__link"]}
              >
                {t("header.nav.address")}
              </button>
            </li>

            <li className={styles["header-nav__item"]}>
              <button
                type="button"
                onClick={() => anketaRef.current?.scrollIntoView({ behavior: "smooth" })}
                className={styles["header-nav__link"]}
              >
                {t("header.nav.form")}
              </button>
            </li>
          </ul>
        </nav>
      </header>

      <button type="button" onClick={handleToggleAudio} className={styles["player"]}>
        <PlayerIcon />

        <audio src={Audio} autoPlay></audio>
      </button>

      <section className={styles["main"]}>
        <h1 className={styles["main__title"]}>
          Arnur <br /> & <br /> Zhanerke
        </h1>

        <div className={styles["main__subtitle"]}>
          <p>{t("main.saturday")}</p>
          <span>23</span>
          <p>{t("main.september")}</p>
        </div>
      </section>

      <section ref={invitionRef} id="invition" className={styles["about"]}>
        <p
          className={styles["about__title"]}
          dangerouslySetInnerHTML={{ __html: t("about.title") }}
        ></p>

        <p
          className={styles["about__subtitle"]}
          dangerouslySetInnerHTML={{ __html: t("about.subtitle") }}
        ></p>
      </section>

      <section ref={dateRef} id="date" className={styles["ceremony"]}>
        <div className={styles["ceremony__icon"]}>
          <CeremonyIcon />
        </div>

        <h2 className={styles["ceremony__title"]}>{t("ceremony.title")}</h2>
        <h2 className={styles["ceremony__date"]}>23.11.24</h2>

        <div className={styles["ceremony-calendar"]}>
          <h2 className={styles["ceremony-calendar__title"]}>{t("ceremony.september")}</h2>

          <ul className={styles["ceremony-calendar__days"]}>
            <li className={styles["ceremony-calendar__day"]}>
              <span>{t("ceremony.weeks.1")}</span>
              <span>18</span>
            </li>

            <li className={cn(styles["ceremony-calendar__day"])}>
              <span>{t("ceremony.weeks.2")}</span>
              <span>19</span>
            </li>

            <li className={styles["ceremony-calendar__day"]}>
              <span>{t("ceremony.weeks.3")}</span>
              <span>20</span>
            </li>

            <li className={styles["ceremony-calendar__day"]}>
              <span>{t("ceremony.weeks.4")}</span>
              <span>21</span>
            </li>

            <li className={styles["ceremony-calendar__day"]}>
              <span>{t("ceremony.weeks.5")}</span>
              <span>22</span>
            </li>

            <li className={cn(styles["ceremony-calendar__day"], styles["active"])}>
              <span>{t("ceremony.weeks.6")}</span>
              <span>23</span>
            </li>

            <li className={styles["ceremony-calendar__day"]}>
              <span>{t("ceremony.weeks.7")}</span>
              <span>24</span>
            </li>
          </ul>
        </div>

        <div className={styles["ceremony__time"]}>
          <p>{t("ceremony.start")}</p>
          <span>17:00</span>
        </div>

        <div className={styles.ceremony}>
        <div className={styles.ceremony__icon}>
          {/* Ceremony Icon */}
        </div>
        <h2 className={styles.ceremony__title}>{t("ceremony.countdown")}</h2>
        <div className={styles.countdownWrapper}>
          <div className={styles.countdownItem}>
            <span className={styles.countdownTime}>{timeLeft.days}</span>
            <span className={styles.countdownLabel}>{t("ceremony.count_day")}</span>
          </div>
          <div className={styles.countdownItem}>
            <span className={styles.countdownTime}>{timeLeft.hours}</span>
            <span className={styles.countdownLabel}>{t("ceremony.count_hour")}</span>
          </div>
          <div className={styles.countdownItem}>
            <span className={styles.countdownTime}>{timeLeft.minutes}</span>
            <span className={styles.countdownLabel}>{t("ceremony.count_minute")}</span>
          </div>
          <div className={styles.countdownItem}>
            <span className={styles.countdownTime}>{timeLeft.seconds}</span>
            <span className={styles.countdownLabel}>{t("ceremony.count_second")}</span>
          </div>
        </div>
      </div>
      </section>

      <section ref={addressRef} id="address" className={styles["address"]}>
        <div className={styles["address__icon"]}>
          <CakeIcon />
        </div>

        <h2 className={styles["address__title"]}>{t("address.title")}</h2>
        <div className={styles["address__content"]}>
          <p>{t("address.content.slice_1")}</p>
          <p style={{ marginTop: '-10px'}}>{t("address.content.slice_2")}</p>
          <p className={styles["colored"]}>{t("address.content.slice_3")}</p>
          <p className={styles["colored__subtitle"]}>{t("address.content.slice_4")}</p>
        </div>

        <div className={styles["address__map"]}>
          <Map />
        </div>
      </section>



      <section ref={anketaRef} id="anketa" className={styles["form"]}>
        <div className={styles["form__icon"]}>
          <MusicIcon />
        </div>

        <h2
          className={styles["form__title"]}
          dangerouslySetInnerHTML={{ __html: t("form.title") }}
        />

        <p className={styles["form__subtitle"]}>{t("form.subtitle")}</p>

        <div className={styles["form-card"]}>
          <form className={styles["form-element"]} onSubmit={handleSubmit}>
            <input
              required
              placeholder={t("form.placeholder")}
              className={styles["form-element__field"]}
            />

            <div className={styles["form-element__checkboxes"]}>
              <label htmlFor="coming">
                <input required type="radio" name="invition" id="coming" />
                <span>{t("form.coming")}</span>
              </label>

              <label htmlFor="with-pair">
                <input required type="radio" name="invition" id="with-pair" />
                <span>{t("form.with-pair")}</span>
              </label>

              <label htmlFor="no-coming">
                <input required type="radio" name="invition" id="no-coming" />
                <span>{t("form.no-coming")}</span>
              </label>
            </div>

            <button type="submit" className={styles["form-element__submit"]}>
              {t("form.submit")}
            </button>
          </form>

          {/*<div className={styles["form-card__image"]}>*/}
          {/*  <img src={FormImage} alt="" />*/}
          {/*</div>*/}
        </div>
      </section>

      {isOpenedModal && (
        <div className={styles["success-modal"]}>
          <div className={styles["success-modal__icon"]}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
          </div>

          <div className={styles["success-modal__title"]}>{t("modal.success.title")}</div>
        </div>
      )}

      {/*<section className={styles["gallery"]}>*/}
      {/*  <h2 className={styles["gallery__title"]}>{t("gallery.title")}</h2>*/}

      {/*  <div className={styles["gallery__icon"]}>*/}
      {/*    <CameraIcon />*/}
      {/*  </div>*/}

      {/*  <Swiper*/}
      {/*    breakpoints={{*/}
      {/*      768: {*/}
      {/*        spaceBetween: 50,*/}
      {/*        slidesPerView: 3,*/}
      {/*      },*/}
      {/*      0: {*/}
      {/*        spaceBetween: 50,*/}
      {/*        slidesPerView: 1,*/}
      {/*      },*/}
      {/*    }}*/}
      {/*    spaceBetween={50}*/}
      {/*    slidesPerView={3}*/}
      {/*    className={styles["swiper"]}*/}
      {/*    allowTouchMove*/}
      {/*    modules={[Navigation]}*/}
      {/*    navigation={{ nextEl: "#swiper-next", prevEl: "#swiper-prev" }}*/}
      {/*  >*/}
      {/*    <SwiperSlide className={styles["swiper__item"]}>*/}
      {/*      <img className={styles["swiper__image"]} src={Gallery1Image} alt="" />*/}
      {/*    </SwiperSlide>*/}
      {/*    <SwiperSlide className={styles["swiper__item"]}>*/}
      {/*      <img className={styles["swiper__image"]} src={Gallery5Image} alt="" />*/}
      {/*    </SwiperSlide>*/}
      {/*    <SwiperSlide className={styles["swiper__item"]}>*/}
      {/*      <img className={styles["swiper__image"]} src={Gallery7Image} alt="" />*/}
      {/*    </SwiperSlide>*/}
      {/*    /!* <SwiperSlide className={styles["swiper__item"]}>*/}
      {/*      <img className={styles["swiper__image"]} src={Gallery2Image} alt="" />*/}
      {/*    </SwiperSlide> *!/*/}
      {/*    <SwiperSlide className={styles["swiper__item"]}>*/}
      {/*      <img className={styles["swiper__image"]} src={Gallery3Image} alt="" />*/}
      {/*    </SwiperSlide>*/}
      {/*    <SwiperSlide className={styles["swiper__item"]}>*/}
      {/*      <img className={styles["swiper__image"]} src={Gallery6Image} alt="" />*/}
      {/*    </SwiperSlide>*/}
      {/*    <SwiperSlide className={styles["swiper__item"]}>*/}
      {/*      <img className={styles["swiper__image"]} src={Gallery4Image} alt="" />*/}
      {/*    </SwiperSlide>*/}
      {/*    */}
      {/*  </Swiper>*/}

      {/*  <div className={styles["swiper-actions"]}>*/}
      {/*    <button type="button" id="swiper-prev" className={styles["swiper-actions__button"]}>*/}
      {/*      <CircledChevronLeftIcon />*/}
      {/*    </button>*/}

      {/*    <button type="button" id="swiper-next" className={styles["swiper-actions__button"]}>*/}
      {/*      <CircledChevronRightIcon />*/}
      {/*    </button>*/}
      {/*  </div>*/}
      {/*</section>*/}

      <section className={styles["owners"]}>
        <h2 className={styles["owners__title"]}>{t("owners.title")}</h2>
        <h2 style={{
          marginTop: '-35px'
        }} className={styles["owners__names"]}>{t("owners.names")}</h2>
        <h2 className={styles["owners__subtitle"]}>{t("owners.subtitle")}</h2>
      </section>
    </>
  );
};
