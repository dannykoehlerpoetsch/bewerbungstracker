import React from "react";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <section className={styles.homeContainer}>
      <article>
        <h2 className={styles.welcome}>Willkommen!</h2>
        <h3 className={styles.homeHeader}>
          Hier ist dein persönlicher Bewerbungstracker!
        </h3>
        <p className={styles.homeContent}>
          {" "}
          <strong>
            Vergiss die unübersichtliche Excel-Tabelle – verwalte deine
            Bewerbungen digital!
          </strong>{" "}
          <br />
          Behalte jederzeit den Überblick über deine Bewerbungen: Wo hast du
          dich beworben? Wer sind deine Ansprechpartner? Welche Bewerbungen sind
          noch offen? Notiere Gesprächsdetails, Termine und wichtige Kommentare
          direkt in deinem Bewerbungsprofil. Exportiere deinen Fortschritt als
          PDF und teile ihn ganz einfach mit anderen – strukturiert und
          professionell.
        </p>
        <p className={styles.homeAction}>
          Starte jetzt und mach das Bewerben effizienter und stressfreier!
        </p>
      </article>

      <article className={styles.note}>
        <p>
          Diese Anwendung wurde für die Nutzung auf Desktop-Browsern,
          insbesondere Google Chrome, optimiert. Die Darstellung und
          Funktionalität auf mobilen Geräten (Tablets/Smartphones) ist
          möglicherweise eingeschränkt.
        </p>
      </article>
    </section>
  );
}
