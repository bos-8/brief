// @file: src/content/presentationDeck.ts
import type { AppLocale } from "@/schema/i18n";

type NamedPoint = {
  title: string;
  body: string;
};

type ComparisonRow = {
  label: string;
  eu: string[];
  us: string[];
};

export type PresentationDeckContent = {
  backToTopLabel: string;
  hero: {
    navTitle: string;
    eyebrow: string;
    titlePrimary: string;
    titleSecondary: string;
    subtitle: string;
    authorsLabel: string;
    authors: string[];
    affiliationLabel: string;
    affiliation: string;
    universityLabel: string;
    university: string;
    overlays: string[];
    callouts: string[];
  };
  evolution: {
    navTitle: string;
    eyebrow: string;
    title: string;
    mechanicalLabel: string;
    biologicalLabel: string;
    mechanicalItems: string[];
    biologicalItems: string[];
    aiNodeLabel: string;
    aiNodeBody: string;
    callouts: NamedPoint[];
  };
  objective: {
    navTitle: string;
    eyebrow: string;
    title: string;
    thesis: string;
    equationLabels: string[];
    resultLabel: string;
    goals: NamedPoint[];
  };
  ethics: {
    navTitle: string;
    eyebrow: string;
    title: string;
    cards: NamedPoint[];
    banner: string;
  };
  dualUse: {
    navTitle: string;
    eyebrow: string;
    title: string;
    civilLabel: string;
    civilBody: string;
    militaryLabel: string;
    militaryBody: string;
    cards: NamedPoint[];
  };
  genomeRisk: {
    navTitle: string;
    eyebrow: string;
    title: string;
    problemStatement: string;
    healthLabel: string;
    euFilter: NamedPoint;
    usFilter: NamedPoint;
    economyLabel: string;
    economyBody: string;
    cards: NamedPoint[];
    banner: string;
  };
  bias: {
    navTitle: string;
    eyebrow: string;
    title: string;
    chartTitle: string;
    chartBody: string;
    pulseTitle: string;
    pulseBody: string;
    cards: NamedPoint[];
  };
  legal: {
    navTitle: string;
    eyebrow: string;
    title: string;
    euLabel: string;
    usLabel: string;
    rows: ComparisonRow[];
  };
  anonymization: {
    navTitle: string;
    eyebrow: string;
    title: string;
    statement: string;
    cards: NamedPoint[];
  };
  lawAsCode: {
    navTitle: string;
    eyebrow: string;
    title: string;
    booksLabel: string;
    systemLabel: string;
    cards: NamedPoint[];
  };
  framework: {
    navTitle: string;
    eyebrow: string;
    title: string;
    layers: NamedPoint[];
  };
  dataModels: {
    navTitle: string;
    eyebrow: string;
    title: string;
    dataLayer: {
      title: string;
      goal: string;
      mechanisms: string[];
    };
    modelLayer: {
      title: string;
      goal: string;
      mechanisms: string[];
    };
  };
  decisions: {
    navTitle: string;
    eyebrow: string;
    title: string;
    bannerTitle: string;
    bannerBody: string;
    decisionLayer: NamedPoint & { bullets: string[] };
    governanceLayer: NamedPoint & { bullets: string[] };
  };
  caseStudy: {
    navTitle: string;
    eyebrow: string;
    title: string;
    scenario: string;
    unsafeTitle: string;
    unsafeItems: string[];
    safeTitle: string;
    safeItems: string[];
    hubLabel: string;
  };
  closing: {
    navTitle: string;
    eyebrow: string;
    title: string;
    quote: string;
    summary: string;
    nextStepTitle: string;
    nextSteps: string[];
  };
};

const presentationDeckContent = {
  pl: {
    backToTopLabel: "Wróć do początku",
    hero: {
      navTitle: "AIgmented HUMANity",
      eyebrow: "Hero / Cover",
      titlePrimary: "AIgmented",
      titleSecondary: "HUMANity",
      subtitle: "Etyczne i prawne aspekty integracji sztucznej inteligencji z ulepszaniem człowieka",
      authorsLabel: "Autorzy",
      authors: ["Kacper Bos", "Nikolas Jerzy Feduniewicz", "Anna Bryniarska"],
      affiliationLabel: "Afiliacja",
      affiliation: "Informatyka i governance AI",
      universityLabel: "Uczelnia",
      university: "Politechnika Opolska",
      overlays: ["DNA", "Neuro interface", "Prosthetic limb"],
      callouts: ["Strona biologiczna", "Strona mechaniczna", "Sieć sensorów i sterowania"],
    },
    evolution: {
      navTitle: "Evolution Converges",
      eyebrow: "Slide 02",
      title: "Ewolucja ulepszania zbiega się w jednym punkcie",
      mechanicalLabel: "Mechaniczne",
      biologicalLabel: "Biologiczne",
      mechanicalItems: ["Gears", "Robotic arm", "Prosthetic"],
      biologicalItems: ["DNA", "Vaccine", "Gene editing"],
      aiNodeLabel: "AI",
      aiNodeBody: "Warstwa integrująca sensing, analizę i decyzje.",
      callouts: [
        {
          title: "Tradycyjne ulepszanie",
          body: "Mechaniczne protezy i interwencje biologiczne rozwijały się dotąd głównie równolegle.",
        },
        {
          title: "AI jako warstwa unifikująca",
          body: "Uczenie maszynowe spina diagnostykę, personalizację i adaptacyjne sterowanie.",
        },
        {
          title: "Wniosek",
          body: "To nie science fiction, lecz koordynacja technologii, które już istnieją.",
        },
      ],
    },
    objective: {
      navTitle: "Short-Term Synthesis",
      eyebrow: "Slide 03",
      title: "Krótkoterminowa synteza zorientowana na cel",
      thesis: "Realistyczna integracja mechanicznych, biologicznych i algorytmicznych warstw jest osiągalna w obecnym horyzoncie technologicznym.",
      equationLabels: ["Mechaniczne", "Biologiczne", "AI"],
      resultLabel: "AIgmented HUMANity",
      goals: [
        { title: "Wydłużenie w zdrowiu", body: "Więcej lat z zachowaną sprawnością i autonomią." },
        { title: "Spersonalizowana prewencja", body: "Wcześniejsze wykrywanie ryzyka i lepsze profile interwencji." },
        { title: "Wsparcie funkcjonalności", body: "Skalowalne wsparcie ruchu, poznania i regeneracji." },
      ],
    },
    ethics: {
      navTitle: "Ethical Challenges",
      eyebrow: "Slide 04",
      title: "Etyczne wyzwania na styku biologii i algorytmów",
      cards: [
        {
          title: "Militaryzacja i Dual-Use",
          body: "To samo narzędzie może wspierać terapię albo przewagę operacyjną i kontrolę.",
        },
        {
          title: "Nadużycia Danych",
          body: "Genom, biometria i sygnały zdrowotne łatwo przesuwają się z opieki do profilowania.",
        },
        {
          title: "Błąd Algorytmiczny",
          body: "Proxy bias, ukryta stratyfikacja i bias wejściowy wzmacniają istniejące nierówności.",
        },
      ],
      banner:
        "Etyczne wdrożenie wymaga projektowania opartego na prawach człowieka, a nie symbolicznych deklaracji.",
    },
    dualUse: {
      navTitle: "Dual-Use Trap",
      eyebrow: "Slide 05",
      title: "Pułapka Dual-Use zaciera granice sprawczości",
      civilLabel: "Zastosowanie cywilne: terapia medyczna",
      civilBody: "Robotyczne wsparcie rehabilitacji i odzyskiwania funkcji.",
      militaryLabel: "Zastosowanie wojskowe: przewaga strategiczna",
      militaryBody: "Interfejsy i ulepszenia wpięte w logikę operacyjną oraz hierarchię rozkazów.",
      cards: [
        { title: "Interfejsy mózg-komputer (BCI)", body: "Sterowanie, analiza uwagi i potencjalna utrata autonomii użytkownika." },
        { title: "Zagrożenia biosecurity", body: "Modele AI mogą przyspieszać projektowanie lub dobór szkodliwych zastosowań." },
        { title: "Genetyczne backdoory", body: "Zależności biologiczne mogą zostać zaprojektowane jako punkt nacisku." },
      ],
    },
    genomeRisk: {
      navTitle: "Genome as Financial Risk",
      eyebrow: "Slide 06",
      title: "Genom jako instrument oceny ryzyka finansowego",
      problemStatement:
        "Szczegółowe dane genetyczne i biometryczne mogą zostać przesunięte ze sfery zdrowia do strukturalnej dyskryminacji ekonomicznej.",
      healthLabel: "Sfera zdrowia",
      euFilter: {
        title: "Podejście UE",
        body: "RODO, AI Act i EHDS budują silniejsze bariery dla wtórnego wykorzystania danych.",
      },
      usFilter: {
        title: "Podejście USA",
        body: "HIPAA i GINA zostawiają luki dla rynkowego profilowania poza ścisłą opieką zdrowotną.",
      },
      economyLabel: "Sfera ekonomiczna",
      economyBody: "Ubezpieczyciele i pracodawcy",
      cards: [
        { title: "Luki w prawie USA", body: "Ochrona sektorowa nie obejmuje całego łańcucha aktuarialnego i platformowego." },
        { title: "Rynki aktuarialne", body: "Predykcja ryzyka staje się narzędziem selekcji, a nie ochrony pacjenta." },
      ],
      banner: "Genom nie może stać się prywatnym scoringiem ryzyka ukrytym pod językiem efektywności rynku.",
    },
    bias: {
      navTitle: "Algorithmic Bias",
      eyebrow: "Slide 07",
      title: "Cyfrowe kodowanie nierówności przez błąd algorytmiczny",
      chartTitle: "Proxy bias w predykcji potrzeb",
      chartBody: "Koszt leczenia nie jest tym samym co rzeczywista potrzeba medyczna, ale bywa używany jako mylący substytut.",
      pulseTitle: "Bias na wejściu",
      pulseBody: "Pulsoksymetr i podobne sensory mogą systemowo mylić się dla części populacji jeszcze przed etapem modelowania.",
      cards: [
        { title: "Dyskryminacja przez Proxy", body: "Model optymalizuje wygodny wskaźnik zastępczy zamiast celu klinicznego." },
        { title: "Ukryta stratyfikacja", body: "Jedna etykieta może ukrywać grupy, dla których skuteczność realnie się rozpada." },
        { title: "Bias na wejściu", body: "Zniekształcone sensory i zbiory uczące wprowadzają błąd do całego pipeline'u." },
      ],
    },
    legal: {
      navTitle: "EU vs US",
      eyebrow: "Slide 08",
      title: "Ochrona prawna danych: analiza porównawcza",
      euLabel: "Unia Europejska",
      usLabel: "Stany Zjednoczone",
      rows: [
        {
          label: "Klasyfikacja danych",
          eu: ["RODO: dane genetyczne i zdrowotne jako szczególne kategorie.", "Silniejsza logika ograniczeń celu i podstaw przetwarzania."],
          us: ["HIPAA obejmuje tylko część ekosystemu zdrowotnego.", "GINA nie zamyka całego pola wtórnych użyć danych."],
        },
        {
          label: "Poziom ryzyka AI",
          eu: ["EU AI Act wzmacnia ex ante obowiązki dla systemów wysokiego ryzyka.", "Compliance ma być osadzone w procesie i dokumentacji."],
          us: ["FTC i podejścia sektorowe działają bardziej reaktywnie.", "Ciężar interpretacji częściej spada na post factum enforcement."],
        },
        {
          label: "Wykorzystanie wtórne",
          eu: ["EHDS i reżimy ochrony danych wzmacniają blokady dla function creep.", "Wtórne użycia wymagają silniejszego uzasadnienia i kontroli."],
          us: ["Fragmentacja prawa zostawia przestrzeń dla profilowania rynkowego.", "Dane mogą krążyć poza kliniką przez brokerów i platformy."],
        },
      ],
    },
    anonymization: {
      navTitle: "Anonymization Is Fragile",
      eyebrow: "Slide 09",
      title: "Kruchość anonimizacji: genom to nie hasło",
      statement:
        "Twierdzenia o pełnej anonimizacji danych genetycznych są naukowo kruche. Raz ujawnionego genomu nie da się zresetować.",
      cards: [
        { title: "Atak Homera", body: "Już częściowe ślady statystyczne mogą umożliwiać ponowną identyfikację wrażliwych danych." },
        { title: "Wyciek 23andMe (2023)", body: "Incydent pokazał, że skala i wtórne łączenie danych podnoszą ryzyko strukturalne." },
        { title: "Wniosek", body: "Anonimizacja genomu musi być traktowana jako środek kruchy, a nie pełne zabezpieczenie." },
      ],
    },
    lawAsCode: {
      navTitle: "Law as Code",
      eyebrow: "Slide 10",
      title: "Zmiana paradygmatu: prawo jako kod",
      booksLabel: "Normy, regulacje, prawa podstawowe",
      systemLabel: "System, pipeline, infrastruktura",
      cards: [
        { title: "Kluczowy wniosek z artykułu", body: "Same deklaracje etyczne są zbyt słabe wobec systemów, które uczą się i skalują." },
        { title: "Rozwiązanie systemowe", body: "Wymogi prawne muszą wejść do architektury jako jawne ograniczenia, logi i blokady." },
        { title: "Przejście do frameworku", body: "Compliance-by-Design zamienia normy w mechanizmy kontrolne." },
      ],
    },
    framework: {
      navTitle: "4-Layer Model",
      eyebrow: "Slide 11",
      title: "4-warstwowy model Compliance-by-Design",
      layers: [
        { title: "Warstwa danych", body: "Klasyfikacja wrażliwości, kontrola dostępu i ograniczenie celu przetwarzania." },
        { title: "Warstwa modelu AI", body: "Walidacja podgrup, monitoring biasu i reprezentatywność danych." },
        { title: "Warstwa decyzyjna", body: "Explainability, prawo do weryfikacji przez człowieka i eskalacja przypadków granicznych." },
        { title: "Zarządzanie systemem", body: "Immutable audit logs, dokumentacja techniczna i monitoring po wdrożeniu." },
      ],
    },
    dataModels: {
      navTitle: "Data and Models",
      eyebrow: "Slide 12",
      title: "Operacjonalizacja zabezpieczeń: dane i algorytmy",
      dataLayer: {
        title: "Warstwa danych",
        goal: "Zablokowanie nieuprawnionego przepływu danych i function creep.",
        mechanisms: ["Minimalizacja danych", "Role-based access", "Purpose limitation"],
      },
      modelLayer: {
        title: "Warstwa modelu",
        goal: "Zapobieganie ukrytej stratyfikacji i dziedziczeniu błędów przez system.",
        mechanisms: ["Subgroup validation", "Bias monitoring", "Representative datasets"],
      },
    },
    decisions: {
      navTitle: "Decisions and Accountability",
      eyebrow: "Slide 13",
      title: "Operacjonalizacja zabezpieczeń: decyzje i rozliczalność",
      bannerTitle: "Ludzki nadzór nad pipeline'em decyzji",
      bannerBody: "Najbardziej wrażliwe rekomendacje muszą pozostawiać miejsce na kontrolę, uzasadnienie i ślad audytowy.",
      decisionLayer: {
        title: "Warstwa decyzyjna",
        body: "Prawo do oceny przez człowieka nie może być dekoracją. Musi istnieć jako procedura systemowa.",
        bullets: ["Explainability", "Human-in-the-loop", "Prawo do weryfikacji decyzji"],
      },
      governanceLayer: {
        title: "Zarządzanie systemem",
        body: "Regulator i operator muszą widzieć historię zmian modelu, danych i decyzji.",
        bullets: ["Immutable audit logs", "Dokumentacja techniczna", "Post-market monitoring"],
      },
    },
    caseStudy: {
      navTitle: "Case Study",
      eyebrow: "Slide 14",
      title: "Studium przypadku: AI w prewencyjnej opiece zdrowotnej",
      scenario: "Aplikacja integruje dane z wearables i profil genomowy do oceny ryzyka zdrowotnego.",
      unsafeTitle: "Bez zabezpieczeń",
      unsafeItems: [
        "Zakodowanie uprzedzeń w scoringu ryzyka",
        "Profilowanie ubezpieczycieli i pracodawców",
        "Brak odwołania od automatycznej oceny",
      ],
      safeTitle: "Zgodnie z Compliance-by-Design",
      safeItems: [
        "Blokada profili wtórnych już na poziomie bazy",
        "Testowanie modelu dla grup demograficznych",
        "Skrajne diagnozy wymagają potwierdzenia lekarza",
      ],
      hubLabel: "Wearable + genomic AI hub",
    },
    closing: {
      navTitle: "Closing",
      eyebrow: "Slide 15",
      title: "Od etyki do inżynierii systemów",
      quote:
        "Integracja AI z biologicznym ulepszaniem to techniczna rzeczywistość. Sukces zależy od twardych ram systemowych, nie miękkich deklaracji.",
      summary:
        "AIgmented HUMANity to przede wszystkim problem projektowy. Inżynierowie, lekarze i prawnicy muszą wspólnie kodować regulacje w architekturze systemów.",
      nextStepTitle: "Następne kroki",
      nextSteps: ["Architektury referencyjne", "Empiryczna ocena biasu", "Compliance metrics dla pełnego lifecycle AI"],
    },
  },
  en: {
    backToTopLabel: "Back to top",
    hero: {
      navTitle: "AIgmented HUMANity",
      eyebrow: "Hero / Cover",
      titlePrimary: "AIgmented",
      titleSecondary: "HUMANity",
      subtitle: "Ethical and legal aspects of integrating artificial intelligence with human enhancement",
      authorsLabel: "Authors",
      authors: ["Kacper Bos", "Nikolas Jerzy Feduniewicz", "Anna Bryniarska"],
      affiliationLabel: "Affiliation",
      affiliation: "Computer science and AI governance",
      universityLabel: "University",
      university: "Opole University of Technology",
      overlays: ["DNA", "Neuro interface", "Prosthetic limb"],
      callouts: ["Biological half", "Mechanical half", "Sensor and control network"],
    },
    evolution: {
      navTitle: "Evolution Converges",
      eyebrow: "Slide 02",
      title: "The evolution of enhancement converges at one point",
      mechanicalLabel: "Mechanical",
      biologicalLabel: "Biological",
      mechanicalItems: ["Gears", "Robotic arm", "Prosthetic"],
      biologicalItems: ["DNA", "Vaccine", "Gene editing"],
      aiNodeLabel: "AI",
      aiNodeBody: "The layer that integrates sensing, analysis, and decision-making.",
      callouts: [
        {
          title: "Traditional enhancement",
          body: "Mechanical prosthetics and biological interventions have mostly evolved as parallel tracks.",
        },
        {
          title: "AI as the unifying layer",
          body: "Machine learning connects diagnostics, personalization, and adaptive control.",
        },
        {
          title: "Conclusion",
          body: "This is not science fiction. It is the coordination of technologies that already exist.",
        },
      ],
    },
    objective: {
      navTitle: "Short-Term Synthesis",
      eyebrow: "Slide 03",
      title: "A short-term synthesis oriented toward concrete outcomes",
      thesis: "A realistic integration of mechanical, biological, and algorithmic layers is reachable within the current technological horizon.",
      equationLabels: ["Mechanical", "Biological", "AI"],
      resultLabel: "AIgmented HUMANity",
      goals: [
        { title: "Longer healthy lifespan", body: "More years with preserved capability and autonomy." },
        { title: "Personalized prevention", body: "Earlier risk detection and better intervention profiles." },
        { title: "Functional support", body: "Scalable support for movement, cognition, and recovery." },
      ],
    },
    ethics: {
      navTitle: "Ethical Challenges",
      eyebrow: "Slide 04",
      title: "Ethical challenges at the intersection of biology and algorithms",
      cards: [
        {
          title: "Militarization and dual-use",
          body: "The same tool can support therapy or become a vehicle for operational advantage and control.",
        },
        {
          title: "Data misuse",
          body: "Genomic, biometric, and health signals can shift from care into profiling and sorting.",
        },
        {
          title: "Algorithmic error",
          body: "Proxy bias, hidden stratification, and input bias can encode existing inequalities.",
        },
      ],
      banner:
        "Ethical deployment requires rights-based engineering, not symbolic declarations.",
    },
    dualUse: {
      navTitle: "Dual-Use Trap",
      eyebrow: "Slide 05",
      title: "The dual-use trap blurs the boundaries of agency",
      civilLabel: "Civilian use: medical therapy",
      civilBody: "Robotic support for rehabilitation and functional recovery.",
      militaryLabel: "Military use: strategic advantage",
      militaryBody: "Interfaces and enhancements tied to operational logic and command hierarchy.",
      cards: [
        { title: "Brain-computer interfaces (BCI)", body: "Control, attention tracking, and possible loss of user autonomy." },
        { title: "Biosecurity threats", body: "AI models can accelerate the design or selection of harmful applications." },
        { title: "Genetic backdoors", body: "Biological dependencies can be engineered into points of pressure." },
      ],
    },
    genomeRisk: {
      navTitle: "Genome as Financial Risk",
      eyebrow: "Slide 06",
      title: "The genome as an instrument of financial risk assessment",
      problemStatement:
        "Detailed genetic and biometric data can move from healthcare into structural economic discrimination.",
      healthLabel: "Health domain",
      euFilter: {
        title: "EU approach",
        body: "GDPR, the AI Act, and EHDS build stronger barriers against secondary data use.",
      },
      usFilter: {
        title: "US approach",
        body: "HIPAA and GINA leave gaps for market profiling beyond tightly defined healthcare settings.",
      },
      economyLabel: "Economic domain",
      economyBody: "Insurers and employers",
      cards: [
        { title: "Gaps in US law", body: "Sectoral protections do not cover the entire actuarial and platform chain." },
        { title: "Actuarial markets", body: "Risk prediction turns into selection rather than patient protection." },
      ],
      banner: "The genome cannot become a private risk score hidden behind the language of market efficiency.",
    },
    bias: {
      navTitle: "Algorithmic Bias",
      eyebrow: "Slide 07",
      title: "Digital encoding of inequality through algorithmic bias",
      chartTitle: "Proxy bias in need prediction",
      chartBody: "Treatment cost is not the same thing as actual medical need, yet it is often used as a misleading substitute.",
      pulseTitle: "Input bias",
      pulseBody: "Pulse oximeters and similar sensors can systematically fail for some groups even before modeling begins.",
      cards: [
        { title: "Discrimination through proxy", body: "The model optimizes a convenient substitute indicator instead of the real clinical objective." },
        { title: "Hidden stratification", body: "A single label can hide subgroups for which performance quietly collapses." },
        { title: "Input bias", body: "Biased sensors and datasets inject error into the entire pipeline." },
      ],
    },
    legal: {
      navTitle: "EU vs US",
      eyebrow: "Slide 08",
      title: "Legal protection of data: a comparative analysis",
      euLabel: "European Union",
      usLabel: "United States",
      rows: [
        {
          label: "Data classification",
          eu: ["GDPR treats genetic and health data as special categories.", "Purpose limitation and legal basis logic are stronger."],
          us: ["HIPAA covers only part of the health ecosystem.", "GINA does not close the full field of secondary data uses."],
        },
        {
          label: "AI risk level",
          eu: ["The EU AI Act strengthens ex ante obligations for high-risk systems.", "Compliance is expected to live in process and documentation."],
          us: ["FTC and sectoral approaches are more reactive.", "Interpretation often depends on post hoc enforcement."],
        },
        {
          label: "Secondary use",
          eu: ["EHDS and data protection regimes build stronger barriers against function creep.", "Secondary uses require tighter justification and control."],
          us: ["Fragmented law leaves room for market profiling.", "Data can circulate beyond the clinic through brokers and platforms."],
        },
      ],
    },
    anonymization: {
      navTitle: "Anonymization Is Fragile",
      eyebrow: "Slide 09",
      title: "Fragile anonymization: the genome is not a password",
      statement:
        "Claims of full anonymization for genetic data are scientifically fragile. Once exposed, a genome cannot be reset.",
      cards: [
        { title: "Homer attack", body: "Even partial statistical traces can enable the re-identification of sensitive data." },
        { title: "23andMe breach (2023)", body: "The incident showed how scale and linkage amplify structural risk." },
        { title: "Conclusion", body: "Genomic anonymization must be treated as a fragile measure, not as complete protection." },
      ],
    },
    lawAsCode: {
      navTitle: "Law as Code",
      eyebrow: "Slide 10",
      title: "Paradigm shift: law as code",
      booksLabel: "Norms, regulation, fundamental rights",
      systemLabel: "System, pipeline, infrastructure",
      cards: [
        { title: "Core article takeaway", body: "Ethical declarations alone are too weak for systems that learn, adapt, and scale." },
        { title: "Systemic answer", body: "Legal requirements must enter architecture as explicit constraints, logs, and blocks." },
        { title: "Framework transition", body: "Compliance-by-Design turns norms into control mechanisms." },
      ],
    },
    framework: {
      navTitle: "4-Layer Model",
      eyebrow: "Slide 11",
      title: "The 4-layer Compliance-by-Design model",
      layers: [
        { title: "Data layer", body: "Sensitivity classification, access control, and purpose limitation." },
        { title: "AI model layer", body: "Subgroup validation, bias monitoring, and representative data." },
        { title: "Decision layer", body: "Explainability, human review rights, and escalation for borderline cases." },
        { title: "System governance", body: "Immutable audit logs, technical documentation, and post-market monitoring." },
      ],
    },
    dataModels: {
      navTitle: "Data and Models",
      eyebrow: "Slide 12",
      title: "Operationalizing safeguards: data and algorithms",
      dataLayer: {
        title: "Data layer",
        goal: "Block unauthorized data flow and function creep.",
        mechanisms: ["Data minimization", "Role-based access", "Purpose limitation"],
      },
      modelLayer: {
        title: "Model layer",
        goal: "Prevent hidden stratification and inherited error.",
        mechanisms: ["Subgroup validation", "Bias monitoring", "Representative datasets"],
      },
    },
    decisions: {
      navTitle: "Decisions and Accountability",
      eyebrow: "Slide 13",
      title: "Operationalizing safeguards: decisions and accountability",
      bannerTitle: "Human oversight across the decision pipeline",
      bannerBody: "The most sensitive recommendations must leave room for review, justification, and an auditable trail.",
      decisionLayer: {
        title: "Decision layer",
        body: "The right to human review cannot be decorative. It must exist as a system procedure.",
        bullets: ["Explainability", "Human-in-the-loop", "Right to decision review"],
      },
      governanceLayer: {
        title: "System governance",
        body: "Regulators and operators must be able to inspect the history of models, data, and outputs.",
        bullets: ["Immutable audit logs", "Technical documentation", "Post-market monitoring"],
      },
    },
    caseStudy: {
      navTitle: "Case Study",
      eyebrow: "Slide 14",
      title: "Case study: AI in preventive healthcare",
      scenario: "An application integrates wearable data and a genomic profile to assess health risk.",
      unsafeTitle: "Without safeguards",
      unsafeItems: [
        "Encoded bias in the risk score",
        "Profiling by insurers and employers",
        "No appeal against automated assessment",
      ],
      safeTitle: "With Compliance-by-Design",
      safeItems: [
        "Secondary profiles blocked at the database layer",
        "Model testing across demographic groups",
        "Extreme diagnoses require physician confirmation",
      ],
      hubLabel: "Wearable + genomic AI hub",
    },
    closing: {
      navTitle: "Closing",
      eyebrow: "Slide 15",
      title: "From ethics to systems engineering",
      quote:
        "The integration of AI with biological enhancement is a technical reality. Success depends on hard systemic constraints, not soft declarations.",
      summary:
        "AIgmented HUMANity is primarily a design problem. Engineers, clinicians, and lawyers have to encode regulation into system architecture together.",
      nextStepTitle: "Next steps",
      nextSteps: ["Reference architectures", "Empirical bias evaluation", "Compliance metrics for the full AI lifecycle"],
    },
  },
} satisfies Record<AppLocale, PresentationDeckContent>;

export function getPresentationDeck(locale: AppLocale): PresentationDeckContent {
  return presentationDeckContent[locale];
}
