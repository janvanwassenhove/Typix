import type { EnneagramType } from '../../scoring/enneagram'
import type { Localized } from './locale'

export interface EnneagramTypeContent {
  name: string
  /** Short label used on the symbol, where space is tight. */
  shortName: string
  subtitle: string
  motivation: string
  fear: string
  traits: string[]
  growth: string[]
}

export type EnneagramContent = Record<EnneagramType, EnneagramTypeContent>

export const enneagramContent: Localized<EnneagramContent> = {
  en: {
    1: {
      name: 'The Perfectionist', shortName: 'Perfectionist',
      subtitle: 'The Rational, Idealistic Type',
      motivation: 'To be good, right and principled, and to improve everything around you',
      fear: 'Being corrupt, defective, or in the wrong',
      traits: ['Principled and purposeful', 'Self-controlled and perfectionistic', 'Critical and resentful under stress', 'Well-organised and orderly'],
      growth: ['Practise self-compassion and accept imperfection', 'Learn to delegate and trust others', 'Measure progress rather than perfection']
    },
    2: {
      name: 'The Helper', shortName: 'Helper',
      subtitle: 'The Caring, Interpersonal Type',
      motivation: 'To feel loved and needed by being helpful to others',
      fear: 'Being unloved or unwanted for who you are',
      traits: ['Empathetic and sincere', 'Warm-hearted and appreciative', 'People-pleasing and possessive', 'Generous and demonstrative'],
      growth: ['Recognise and voice your own needs', 'Set healthy boundaries', 'Take care of yourself without guilt']
    },
    3: {
      name: 'The Achiever', shortName: 'Achiever',
      subtitle: 'The Success-Oriented, Pragmatic Type',
      motivation: 'To feel valuable and worthwhile through what you accomplish',
      fear: 'Being worthless apart from your achievements',
      traits: ['Adaptable and driven', 'Image-conscious and ambitious', 'Diplomatic and poised', 'Competitive, with a tendency to overwork'],
      growth: ['Connect with who you are beyond your achievements', 'Value being as well as doing', 'Practise vulnerability and emotional honesty']
    },
    4: {
      name: 'The Individualist', shortName: 'Individualist',
      subtitle: 'The Sensitive, Withdrawn Type',
      motivation: 'To find yourself and your own significance',
      fear: 'Having no identity or personal significance',
      traits: ['Self-aware and sensitive', 'Creative and emotionally honest', 'Moody and self-conscious', 'Withdrawn and temperamental'],
      growth: ['Focus on what you have rather than what is missing', 'Build emotional regulation skills', 'Practise gratitude and staying in the present']
    },
    5: {
      name: 'The Investigator', shortName: 'Investigator',
      subtitle: 'The Intense, Cerebral Type',
      motivation: 'To be capable and to understand how the world works',
      fear: 'Being useless, helpless, or out of your depth',
      traits: ['Perceptive and innovative', 'Independent and private', 'Isolated and intense', 'Highly strung and sceptical'],
      growth: ['Share your knowledge and insight with others', 'Practise emotional expression and connection', 'Act on your ideas rather than refining them further']
    },
    6: {
      name: 'The Loyalist', shortName: 'Loyalist',
      subtitle: 'The Committed, Security-Oriented Type',
      motivation: 'To have security and support you can rely on',
      fear: 'Being without support or guidance',
      traits: ['Engaging and responsible', 'Anxious and suspicious', 'Committed and hard-working', 'Defensive and evasive'],
      growth: ['Trust your own judgement', 'Practise self-reliance and confidence', 'Question your worst-case assumptions']
    },
    7: {
      name: 'The Enthusiast', shortName: 'Enthusiast',
      subtitle: 'The Spontaneous, Versatile Type',
      motivation: 'To stay happy, stimulated and free of pain',
      fear: 'Being trapped in pain or deprivation',
      traits: ['Spontaneous and versatile', 'Distractible and scattered', 'Acquisitive and restless', 'Optimistic and enthusiastic'],
      growth: ['Practise focus and follow-through', 'Learn to sit with difficult feelings', 'Choose depth over breadth']
    },
    8: {
      name: 'The Challenger', shortName: 'Challenger',
      subtitle: 'The Powerful, Assertive Type',
      motivation: 'To be self-reliant and in control of your own life',
      fear: 'Being controlled or left vulnerable to others',
      traits: ['Self-confident and strong', 'Confrontational and intimidating', 'Resourceful and decisive', 'Protective and controlling'],
      growth: ['Practise vulnerability and emotional openness', 'Use your strength in service of others', 'Let others support you']
    },
    9: {
      name: 'The Peacemaker', shortName: 'Peacemaker',
      subtitle: 'The Easygoing, Self-Effacing Type',
      motivation: 'To keep inner and outer peace',
      fear: 'Loss of connection and being pulled apart',
      traits: ['Receptive and reassuring', 'Agreeable and complacent', 'Creative and optimistic', 'Stubborn and inattentive'],
      growth: ['Develop your own agenda and priorities', 'Practise speaking up for yourself', 'Act on what matters to you']
    }
  },

  nl: {
    1: {
      name: 'De Perfectionist', shortName: 'Perfectionist',
      subtitle: 'Het rationele, idealistische type',
      motivation: 'Goed, juist en principieel zijn en alles om je heen verbeteren',
      fear: 'Corrupt, gebrekkig of fout zijn',
      traits: ['Principieel en doelgericht', 'Beheerst en perfectionistisch', 'Kritisch en verongelijkt onder stress', 'Goed georganiseerd en ordelijk'],
      growth: ['Wees milder voor jezelf en aanvaard imperfectie', 'Leer delegeren en anderen vertrouwen', 'Meet vooruitgang in plaats van perfectie']
    },
    2: {
      name: 'De Helper', shortName: 'Helper',
      subtitle: 'Het zorgzame, relationele type',
      motivation: 'Je geliefd en nodig voelen door er te zijn voor anderen',
      fear: 'Niet bemind of gewild zijn om wie je bent',
      traits: ['Empathisch en oprecht', 'Warm en waarderend', 'Pleasend en bezitterig', 'Gul en uitbundig'],
      growth: ['Herken je eigen behoeften en spreek ze uit', 'Stel gezonde grenzen', 'Zorg voor jezelf zonder schuldgevoel']
    },
    3: {
      name: 'De Presteerder', shortName: 'Presteerder',
      subtitle: 'Het succesgerichte, pragmatische type',
      motivation: 'Je waardevol voelen door wat je bereikt',
      fear: 'Waardeloos zijn los van je prestaties',
      traits: ['Aanpasbaar en gedreven', 'Imagobewust en ambitieus', 'Diplomatiek en zelfverzekerd', 'Competitief, met neiging tot overwerken'],
      growth: ['Maak contact met wie je bent los van je prestaties', 'Waardeer zijn naast doen', 'Oefen in kwetsbaarheid en eerlijkheid over gevoelens']
    },
    4: {
      name: 'De Individualist', shortName: 'Individualist',
      subtitle: 'Het gevoelige, teruggetrokken type',
      motivation: 'Jezelf en je eigen betekenis vinden',
      fear: 'Geen identiteit of eigen betekenis hebben',
      traits: ['Zelfbewust en gevoelig', 'Creatief en emotioneel eerlijk', 'Wisselend van stemming en onzeker', 'Teruggetrokken en temperamentvol'],
      growth: ['Richt je op wat je hebt in plaats van wat ontbreekt', 'Bouw vaardigheden op om emoties te reguleren', 'Oefen dankbaarheid en aanwezigheid in het nu']
    },
    5: {
      name: 'De Onderzoeker', shortName: 'Onderzoeker',
      subtitle: 'Het intense, cerebrale type',
      motivation: 'Bekwaam zijn en begrijpen hoe de wereld werkt',
      fear: 'Nutteloos, hulpeloos of onbekwaam zijn',
      traits: ['Scherpzinnig en vernieuwend', 'Onafhankelijk en gesloten', 'Geïsoleerd en intens', 'Gespannen en sceptisch'],
      growth: ['Deel je kennis en inzichten met anderen', 'Oefen in het uiten van gevoelens en verbinding maken', 'Zet je ideeën om in actie in plaats van ze verder te verfijnen']
    },
    6: {
      name: 'De Loyalist', shortName: 'Loyalist',
      subtitle: 'Het toegewijde, zekerheidsgerichte type',
      motivation: 'Zekerheid en steun hebben waarop je kunt bouwen',
      fear: 'Zonder steun of houvast zitten',
      traits: ['Betrokken en verantwoordelijk', 'Bezorgd en wantrouwig', 'Toegewijd en hardwerkend', 'Defensief en ontwijkend'],
      growth: ['Vertrouw op je eigen oordeel', 'Oefen in zelfstandigheid en zelfvertrouwen', 'Bevraag je doemscenario’s']
    },
    7: {
      name: 'De Enthousiasteling', shortName: 'Enthousiasteling',
      subtitle: 'Het spontane, veelzijdige type',
      motivation: 'Gelukkig en geprikkeld blijven en pijn vermijden',
      fear: 'Vastzitten in pijn of gemis',
      traits: ['Spontaan en veelzijdig', 'Snel afgeleid en verstrooid', 'Verzamelend en rusteloos', 'Optimistisch en enthousiast'],
      growth: ['Oefen in focus en afmaken wat je begint', 'Leer moeilijke gevoelens te verdragen', 'Kies diepgang boven breedte']
    },
    8: {
      name: 'De Uitdager', shortName: 'Uitdager',
      subtitle: 'Het krachtige, assertieve type',
      motivation: 'Zelfstandig zijn en de regie houden over je eigen leven',
      fear: 'Gecontroleerd worden of kwetsbaar zijn voor anderen',
      traits: ['Zelfverzekerd en sterk', 'Confronterend en imponerend', 'Vindingrijk en besluitvaardig', 'Beschermend en controlerend'],
      growth: ['Oefen in kwetsbaarheid en openheid', 'Zet je kracht in ten dienste van anderen', 'Laat anderen jou steunen']
    },
    9: {
      name: 'De Bemiddelaar', shortName: 'Bemiddelaar',
      subtitle: 'Het gemakkelijke, bescheiden type',
      motivation: 'Innerlijke en uiterlijke rust bewaren',
      fear: 'Verlies van verbinding en uit elkaar getrokken worden',
      traits: ['Ontvankelijk en geruststellend', 'Meegaand en berustend', 'Creatief en optimistisch', 'Koppig en onoplettend'],
      growth: ['Bepaal je eigen agenda en prioriteiten', 'Oefen in voor jezelf opkomen', 'Kom in actie voor wat jij belangrijk vindt']
    }
  },

  fr: {
    1: {
      name: 'Le Perfectionniste', shortName: 'Perfectionniste',
      subtitle: 'Le type rationnel et idéaliste',
      motivation: 'Être bon, juste et intègre, et améliorer tout ce qui vous entoure',
      fear: 'Être corrompu, défectueux ou dans l’erreur',
      traits: ['Intègre et déterminé', 'Maîtrisé et perfectionniste', 'Critique et amer sous pression', 'Organisé et ordonné'],
      growth: ['Soyez indulgent envers vous-même et acceptez l’imperfection', 'Apprenez à déléguer et à faire confiance', 'Mesurez les progrès plutôt que la perfection']
    },
    2: {
      name: 'L’Altruiste', shortName: 'Altruiste',
      subtitle: 'Le type attentionné et relationnel',
      motivation: 'Se sentir aimé et nécessaire en aidant les autres',
      fear: 'Ne pas être aimé pour ce que l’on est',
      traits: ['Empathique et sincère', 'Chaleureux et reconnaissant', 'Cherchant à plaire et possessif', 'Généreux et démonstratif'],
      growth: ['Reconnaissez et exprimez vos propres besoins', 'Posez des limites saines', 'Prenez soin de vous sans culpabilité']
    },
    3: {
      name: 'Le Battant', shortName: 'Battant',
      subtitle: 'Le type pragmatique tourné vers la réussite',
      motivation: 'Se sentir précieux à travers ce que l’on accomplit',
      fear: 'N’avoir aucune valeur en dehors de ses réussites',
      traits: ['Adaptable et motivé', 'Soucieux de son image et ambitieux', 'Diplomate et assuré', 'Compétitif, avec une tendance au surmenage'],
      growth: ['Reliez-vous à qui vous êtes au-delà de vos réussites', 'Valorisez l’être autant que le faire', 'Exercez-vous à la vulnérabilité et à l’honnêteté émotionnelle']
    },
    4: {
      name: 'L’Individualiste', shortName: 'Individualiste',
      subtitle: 'Le type sensible et introverti',
      motivation: 'Se trouver soi-même et sa propre signification',
      fear: 'N’avoir ni identité ni importance personnelle',
      traits: ['Conscient de soi et sensible', 'Créatif et émotionnellement honnête', 'Changeant et complexé', 'Réservé et lunatique'],
      growth: ['Regardez ce que vous avez plutôt que ce qui manque', 'Développez la régulation de vos émotions', 'Cultivez la gratitude et la présence au moment']
    },
    5: {
      name: 'L’Observateur', shortName: 'Observateur',
      subtitle: 'Le type intense et cérébral',
      motivation: 'Être compétent et comprendre le fonctionnement du monde',
      fear: 'Être inutile, impuissant ou dépassé',
      traits: ['Perspicace et innovant', 'Indépendant et discret', 'Isolé et intense', 'Tendu et sceptique'],
      growth: ['Partagez vos connaissances et vos intuitions', 'Exercez-vous à exprimer vos émotions et à créer du lien', 'Passez à l’action au lieu de peaufiner encore']
    },
    6: {
      name: 'Le Loyal', shortName: 'Loyal',
      subtitle: 'Le type engagé, en quête de sécurité',
      motivation: 'Disposer d’une sécurité et d’un soutien fiables',
      fear: 'Se retrouver sans appui ni repères',
      traits: ['Engageant et responsable', 'Anxieux et méfiant', 'Fidèle et travailleur', 'Sur la défensive et évasif'],
      growth: ['Faites confiance à votre propre jugement', 'Exercez votre autonomie et votre confiance', 'Interrogez vos scénarios catastrophes']
    },
    7: {
      name: 'L’Épicurien', shortName: 'Épicurien',
      subtitle: 'Le type spontané et polyvalent',
      motivation: 'Rester heureux, stimulé et à l’abri de la douleur',
      fear: 'Être enfermé dans la douleur ou le manque',
      traits: ['Spontané et polyvalent', 'Distrait et dispersé', 'Avide et agité', 'Optimiste et enthousiaste'],
      growth: ['Travaillez la concentration et l’achèvement', 'Apprenez à rester avec les émotions difficiles', 'Choisissez la profondeur plutôt que l’étendue']
    },
    8: {
      name: 'Le Chef', shortName: 'Chef',
      subtitle: 'Le type puissant et affirmé',
      motivation: 'Être autonome et maître de sa propre vie',
      fear: 'Être contrôlé ou rendu vulnérable',
      traits: ['Sûr de soi et fort', 'Direct et impressionnant', 'Ingénieux et décidé', 'Protecteur et contrôlant'],
      growth: ['Exercez-vous à la vulnérabilité et à l’ouverture', 'Mettez votre force au service des autres', 'Laissez les autres vous soutenir']
    },
    9: {
      name: 'Le Médiateur', shortName: 'Médiateur',
      subtitle: 'Le type accommodant et effacé',
      motivation: 'Préserver la paix intérieure et extérieure',
      fear: 'Perdre le lien et être écartelé',
      traits: ['Réceptif et rassurant', 'Conciliant et complaisant', 'Créatif et optimiste', 'Têtu et distrait'],
      growth: ['Définissez votre propre agenda et vos priorités', 'Exercez-vous à défendre votre position', 'Agissez sur ce qui compte pour vous']
    }
  },

  de: {
    1: {
      name: 'Der Perfektionist', shortName: 'Perfektionist',
      subtitle: 'Der rationale, idealistische Typ',
      motivation: 'Gut, richtig und prinzipientreu sein und alles um sich herum verbessern',
      fear: 'Fehlerhaft, verdorben oder im Unrecht zu sein',
      traits: ['Prinzipientreu und zielgerichtet', 'Selbstbeherrscht und perfektionistisch', 'Kritisch und verbittert unter Stress', 'Gut organisiert und ordentlich'],
      growth: ['Üben Sie Milde mit sich selbst und akzeptieren Sie Unvollkommenheit', 'Lernen Sie zu delegieren und anderen zu vertrauen', 'Messen Sie Fortschritt statt Perfektion']
    },
    2: {
      name: 'Der Helfer', shortName: 'Helfer',
      subtitle: 'Der fürsorgliche, zwischenmenschliche Typ',
      motivation: 'Sich geliebt und gebraucht fühlen, indem man für andere da ist',
      fear: 'Ungeliebt zu sein für das, was man ist',
      traits: ['Einfühlsam und aufrichtig', 'Herzlich und wertschätzend', 'Gefallsüchtig und besitzergreifend', 'Großzügig und offen'],
      growth: ['Erkennen und benennen Sie Ihre eigenen Bedürfnisse', 'Setzen Sie gesunde Grenzen', 'Sorgen Sie ohne Schuldgefühl für sich selbst']
    },
    3: {
      name: 'Der Leistungsmensch', shortName: 'Leistungsmensch',
      subtitle: 'Der erfolgsorientierte, pragmatische Typ',
      motivation: 'Sich wertvoll fühlen durch das, was man erreicht',
      fear: 'Ohne die eigenen Erfolge wertlos zu sein',
      traits: ['Anpassungsfähig und angetrieben', 'Imagebewusst und ehrgeizig', 'Diplomatisch und souverän', 'Wettbewerbsorientiert, mit Neigung zur Überarbeitung'],
      growth: ['Finden Sie Zugang zu sich jenseits Ihrer Erfolge', 'Schätzen Sie Sein ebenso wie Tun', 'Üben Sie Verletzlichkeit und emotionale Ehrlichkeit']
    },
    4: {
      name: 'Der Individualist', shortName: 'Individualist',
      subtitle: 'Der sensible, zurückgezogene Typ',
      motivation: 'Sich selbst und die eigene Bedeutung finden',
      fear: 'Keine Identität und keine eigene Bedeutung zu haben',
      traits: ['Selbstbewusst und feinfühlig', 'Kreativ und emotional ehrlich', 'Stimmungsabhängig und unsicher', 'Zurückgezogen und temperamentvoll'],
      growth: ['Richten Sie den Blick auf das Vorhandene statt auf das Fehlende', 'Bauen Sie Fähigkeiten zur Emotionsregulation auf', 'Üben Sie Dankbarkeit und Gegenwärtigkeit']
    },
    5: {
      name: 'Der Beobachter', shortName: 'Beobachter',
      subtitle: 'Der intensive, kopfbetonte Typ',
      motivation: 'Kompetent sein und verstehen, wie die Welt funktioniert',
      fear: 'Nutzlos, hilflos oder überfordert zu sein',
      traits: ['Scharfsinnig und innovativ', 'Unabhängig und verschlossen', 'Zurückgezogen und intensiv', 'Angespannt und skeptisch'],
      growth: ['Teilen Sie Ihr Wissen und Ihre Erkenntnisse', 'Üben Sie emotionalen Ausdruck und Verbindung', 'Setzen Sie Ihre Ideen um, statt sie weiter zu verfeinern']
    },
    6: {
      name: 'Der Loyale', shortName: 'Loyaler',
      subtitle: 'Der engagierte, sicherheitsorientierte Typ',
      motivation: 'Sicherheit und verlässliche Unterstützung haben',
      fear: 'Ohne Rückhalt oder Orientierung dazustehen',
      traits: ['Zugewandt und verantwortungsbewusst', 'Ängstlich und misstrauisch', 'Engagiert und fleißig', 'Abwehrend und ausweichend'],
      growth: ['Vertrauen Sie Ihrem eigenen Urteil', 'Üben Sie Eigenständigkeit und Zuversicht', 'Hinterfragen Sie Ihre Worst-Case-Annahmen']
    },
    7: {
      name: 'Der Enthusiast', shortName: 'Enthusiast',
      subtitle: 'Der spontane, vielseitige Typ',
      motivation: 'Glücklich und angeregt bleiben und Schmerz vermeiden',
      fear: 'In Schmerz oder Entbehrung gefangen zu sein',
      traits: ['Spontan und vielseitig', 'Ablenkbar und sprunghaft', 'Sammelnd und ruhelos', 'Optimistisch und begeisterungsfähig'],
      growth: ['Üben Sie Fokus und das Zuendebringen', 'Lernen Sie, schwierige Gefühle auszuhalten', 'Wählen Sie Tiefe statt Breite']
    },
    8: {
      name: 'Der Herausforderer', shortName: 'Herausforderer',
      subtitle: 'Der kraftvolle, durchsetzungsstarke Typ',
      motivation: 'Eigenständig sein und das eigene Leben bestimmen',
      fear: 'Kontrolliert oder anderen ausgeliefert zu sein',
      traits: ['Selbstsicher und stark', 'Konfrontativ und einschüchternd', 'Findig und entschlossen', 'Beschützend und kontrollierend'],
      growth: ['Üben Sie Verletzlichkeit und emotionale Offenheit', 'Nutzen Sie Ihre Kraft im Dienst anderer', 'Lassen Sie sich von anderen unterstützen']
    },
    9: {
      name: 'Der Friedensstifter', shortName: 'Friedensstifter',
      subtitle: 'Der gelassene, zurückhaltende Typ',
      motivation: 'Inneren und äußeren Frieden bewahren',
      fear: 'Verbindung zu verlieren und zerrissen zu werden',
      traits: ['Aufnehmend und beruhigend', 'Verträglich und genügsam', 'Kreativ und optimistisch', 'Stur und unaufmerksam'],
      growth: ['Entwickeln Sie eigene Ziele und Prioritäten', 'Üben Sie, für sich einzustehen', 'Werden Sie aktiv für das, was Ihnen wichtig ist']
    }
  },

  es: {
    1: {
      name: 'El Perfeccionista', shortName: 'Perfeccionista',
      subtitle: 'El tipo racional e idealista',
      motivation: 'Ser bueno, correcto y íntegro, y mejorar todo lo que te rodea',
      fear: 'Ser corrupto, defectuoso o estar equivocado',
      traits: ['Íntegro y decidido', 'Autocontrolado y perfeccionista', 'Crítico y resentido bajo presión', 'Organizado y ordenado'],
      growth: ['Practica la autocompasión y acepta la imperfección', 'Aprende a delegar y a confiar en los demás', 'Mide el progreso en lugar de la perfección']
    },
    2: {
      name: 'El Ayudador', shortName: 'Ayudador',
      subtitle: 'El tipo afectuoso e interpersonal',
      motivation: 'Sentirte querido y necesario estando ahí para los demás',
      fear: 'No ser querido por lo que eres',
      traits: ['Empático y sincero', 'Cálido y agradecido', 'Complaciente y posesivo', 'Generoso y expresivo'],
      growth: ['Reconoce y expresa tus propias necesidades', 'Pon límites sanos', 'Cuídate sin sentirte culpable']
    },
    3: {
      name: 'El Triunfador', shortName: 'Triunfador',
      subtitle: 'El tipo pragmático orientado al éxito',
      motivation: 'Sentirte valioso por lo que consigues',
      fear: 'No valer nada al margen de tus logros',
      traits: ['Adaptable y motivado', 'Consciente de su imagen y ambicioso', 'Diplomático y seguro', 'Competitivo, con tendencia a trabajar en exceso'],
      growth: ['Conecta con quién eres más allá de tus logros', 'Valora el ser tanto como el hacer', 'Practica la vulnerabilidad y la honestidad emocional']
    },
    4: {
      name: 'El Individualista', shortName: 'Individualista',
      subtitle: 'El tipo sensible y retraído',
      motivation: 'Encontrarte a ti mismo y tu propio significado',
      fear: 'No tener identidad ni relevancia propia',
      traits: ['Consciente de sí mismo y sensible', 'Creativo y emocionalmente honesto', 'Cambiante e inseguro', 'Retraído y temperamental'],
      growth: ['Fíjate en lo que tienes en vez de en lo que falta', 'Desarrolla la regulación emocional', 'Practica la gratitud y la presencia en el momento']
    },
    5: {
      name: 'El Investigador', shortName: 'Investigador',
      subtitle: 'El tipo intenso y cerebral',
      motivation: 'Ser capaz y entender cómo funciona el mundo',
      fear: 'Ser inútil, indefenso o incapaz',
      traits: ['Perspicaz e innovador', 'Independiente y reservado', 'Aislado e intenso', 'Tenso y escéptico'],
      growth: ['Comparte tu conocimiento y tus ideas', 'Practica expresar emociones y crear vínculos', 'Pasa a la acción en vez de seguir puliendo']
    },
    6: {
      name: 'El Leal', shortName: 'Leal',
      subtitle: 'El tipo comprometido, orientado a la seguridad',
      motivation: 'Contar con seguridad y apoyo fiables',
      fear: 'Quedarte sin apoyo ni orientación',
      traits: ['Cercano y responsable', 'Ansioso y desconfiado', 'Comprometido y trabajador', 'Defensivo y evasivo'],
      growth: ['Confía en tu propio criterio', 'Practica la autonomía y la confianza', 'Cuestiona tus escenarios catastróficos']
    },
    7: {
      name: 'El Entusiasta', shortName: 'Entusiasta',
      subtitle: 'El tipo espontáneo y versátil',
      motivation: 'Seguir feliz y estimulado y evitar el dolor',
      fear: 'Quedar atrapado en el dolor o la carencia',
      traits: ['Espontáneo y versátil', 'Distraído y disperso', 'Acaparador e inquieto', 'Optimista y entusiasta'],
      growth: ['Practica el foco y terminar lo empezado', 'Aprende a sostener las emociones difíciles', 'Elige profundidad antes que amplitud']
    },
    8: {
      name: 'El Desafiador', shortName: 'Desafiador',
      subtitle: 'El tipo poderoso y asertivo',
      motivation: 'Ser autosuficiente y llevar el control de tu propia vida',
      fear: 'Ser controlado o quedar expuesto ante otros',
      traits: ['Seguro de sí mismo y fuerte', 'Directo e imponente', 'Ingenioso y decidido', 'Protector y controlador'],
      growth: ['Practica la vulnerabilidad y la apertura emocional', 'Pon tu fuerza al servicio de los demás', 'Deja que otros te apoyen']
    },
    9: {
      name: 'El Pacificador', shortName: 'Pacificador',
      subtitle: 'El tipo tranquilo y discreto',
      motivation: 'Mantener la paz interior y exterior',
      fear: 'Perder la conexión y verte fragmentado',
      traits: ['Receptivo y tranquilizador', 'Conciliador y conformista', 'Creativo y optimista', 'Terco y despistado'],
      growth: ['Define tu propia agenda y tus prioridades', 'Practica defender tu posición', 'Actúa por lo que de verdad te importa']
    }
  }
}
