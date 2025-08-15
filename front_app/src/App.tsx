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


export const App: FunctionComponent = () => {
  const { t } = useTranslation();

  const invitionRef = createRef<HTMLElement>();
  const dateRef = createRef<HTMLElement>();
  const addressRef = createRef<HTMLElement>();
  const anketaRef = createRef<HTMLElement>();

  const [isOpenedModal, setIsOpenedModal] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const ceremonyDate = new Date('2025-10-04T18:00:00').getTime();

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


useEffect(() => {
  const LOADER_ID = 'dgis-widget-loader';
  const ensureLoader = () => new Promise<void>((resolve)=>{
    const existing = document.getElementById(LOADER_ID) as HTMLScriptElement | null;
    if (existing){
      if ((window as any).DGWidgetLoader) return resolve();
      existing.addEventListener('load', ()=>resolve(), {once:true});
      return;
    }
    const s = document.createElement('script');
    s.id = LOADER_ID;
    s.src = 'https://widgets.2gis.com/js/DGWidgetLoader.js';
    s.async = true;
    s.addEventListener('load', ()=>resolve(), {once:true});
    document.body.appendChild(s);
  });

  const initMap = () => {
    const W:any = window as any;
    const holder = document.getElementById('dg-map');
    if (!holder || !W.DGWidgetLoader) return;
    holder.innerHTML = '';
    new W.DGWidgetLoader({
      widget: 'firmsonmap',
      container: 'dg-map',
      width: '100%',
      height: '100%',
      borderColor: '#ffffff',
      pos: { lat: 43.245887, lon: 76.916869, zoom: 18 },
      opt: { city: 'almaty', lang: 'ru' },
      org: [{ id: '70000001100146442' }],
    });
  };

  ensureLoader().then(initMap);
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
<div className={styles.heroBg} />

<div className={styles.inviteCard}>
  <span className={styles.inviteLead}>СІЗДЕРДІ АЯУЛЫ ҚЫЗЫМЫЗ</span>
  <h1 className={styles.inviteName}>Сымбаттың</h1>
  <span className={styles.inviteDivider} aria-hidden="true" />
  <p className={styles.inviteTail}>
    ҰЗАТУ ТОЙЫНА АРНАЛҒАН САЛТАНАТТЫ АҚ ДАСТАРХАНЫМЫЗДЫҢ
    СЫЙЛЫ ҚОНАҒЫ БОЛУҒА ШАҚЫРАМЫЗ!
  </p>
</div>

<div className={styles.datePill}>
  <span className={styles.dateWord}>{t("main.saturday")}</span>
  <span className={styles.dateNum}>4</span>
  <span className={styles.dateWord}>{t("main.october")}</span>
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

        <h2 className={styles["ceremony__title"]}>{t("ceremony.title")}</h2>
        <h2 className={styles["ceremony__date"]}>04.10.2025</h2>

        <div className={styles["ceremony-calendar"]}>
          <h2 className={styles["ceremony-calendar__title"]}>{t("ceremony.october")}</h2>

          <ul className={styles["ceremony-calendar__days"]}>
            <li className={styles["ceremony-calendar__day"]}>
              <span>{t("ceremony.weeks.1")}</span>
              <span>30</span>
            </li>

            <li className={styles["ceremony-calendar__day"]}>
              <span>{t("ceremony.weeks.2")}</span>
              <span>31</span>
            </li>

            <li className={styles["ceremony-calendar__day"]}>
              <span>{t("ceremony.weeks.3")}</span>
              <span>1</span>
            </li>

            <li className={styles["ceremony-calendar__day"]}>
              <span>{t("ceremony.weeks.4")}</span>
              <span>2</span>
            </li>

            <li className={styles["ceremony-calendar__day"]}>
              <span>{t("ceremony.weeks.5")}</span>
              <span>3</span>
            </li>

            <li className={cn(styles["ceremony-calendar__day"], styles["active"])}>
              <span>{t("ceremony.weeks.6")}</span>
              <span>4</span>
            </li>

            <li className={styles["ceremony-calendar__day"]}>
              <span>{t("ceremony.weeks.7")}</span>
              <span>5</span>
            </li>
          </ul>
        </div>

        <div className={styles["ceremony__time"]}>
          <p>{t("ceremony.start")}</p>
          <span>18:00</span>
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
          <p>{t("address.content.slice_2")}</p>
          <p className={styles["colored"]}>{t("address.content.slice_3")}</p>
          <p>{t("address.content.slice_4")}</p>
        </div>
          
        <div className={styles["address__map"]}>
          <iframe
            src="https://www.google.com/maps?q=43.245887,76.916869&z=18&hl=ru&output=embed"
            width="600" 
            height="450"  
            style={{ border: "0" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
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


      <section className={styles["owners"]}>
        <h2 className={styles["owners__title"]}>{t("owners.title")}</h2>
        <h2 className={styles["owners__names"]}>{t("owners.names")}</h2>
        <h2 className={styles["owners__subtitle"]}>{t("owners.subtitle")}</h2>
      </section>
    </>
  );
};
