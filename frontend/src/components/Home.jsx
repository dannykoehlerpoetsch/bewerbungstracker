import React from "react";

export default function Home() {
  return (
    <div className="home-container container">
      <h2 className="home-header">
        Behalte den Überblick über deine Bewerbungen
      </h2>
      <p className="home-content">
        Willkommen bei deinem persönlichen Bewerbungstracker! Verwalte alle
        deine Bewerbungen an einem Ort: Von Status-Updates bis hin zu Notizen
        über Gespräche – du hast alles im Griff. Filtere und sortiere deine
        Einträge nach deinen Bedürfnissen und exportiere sie als übersichtliche
        PDF, um deine Fortschritte immer im Blick zu behalten.
      </p>
      <p className="home-action">
        Starte jetzt und mach das Bewerben effizienter und stressfreier!
      </p>

      <div className="note">
        <p>
          Diese Anwendung wurde für die Nutzung auf Desktop-Browsern,
          insbesondere Google Chrome, optimiert. Die Darstellung und
          Funktionalität auf mobilen Geräten (Tablets/Smartphones) ist
          möglicherweise eingeschränkt.
        </p>
        <p>
          Mobile Optimierung ist in Arbeit. Wir danken Ihnen für Ihr
          Verständnis!
        </p>
      </div>
    </div>
  );
}
