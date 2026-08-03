import type { ColorKey } from '../../scoring/insights'
import type { SpreadBand } from '../../scoring/profile'
import type { Localized } from './locale'

export interface ColorContent {
  /** Display name of the colour energy, e.g. "Fiery Red". */
  label: string
  /** One word, for chart axes where the full name does not fit. */
  short: string
  description: string
  strengths: string[]
  development: string[]
  pitfalls: string[]
  goodDay: string
  strongDay: string
}

export interface InsightsContent {
  colors: Record<ColorKey, ColorContent>
  /**
   * The eight positions around the wheel, clockwise from the top. Drawn onto
   * the canvas, so they need a translation of their own.
   */
  wheel: [string, string, string, string, string, string, string, string]
  /** Label for each primary/secondary pair, e.g. `Red-Blue`. */
  positions: Record<string, string>
  /** Colour-specific wording for the shared spread bands. */
  balance: Record<SpreadBand, { label: string; description: string }>
}

export const insightsContent: Localized<InsightsContent> = {
  en: {
    colors: {
      Red: {
        label: 'Fiery Red',
        short: 'Red',
        description: 'Fiery Red energy stands for determination, leadership and results-oriented thinking. You are direct, competitive and at your best when there is something to win.',
        strengths: ['Natural leadership', 'Quick decision making', 'Results-focused', 'Competitive drive'],
        development: ['Practise patience with other people’s pace', 'Weigh how decisions land with others', 'Delegate more than you do now', 'Balance task focus with relationship building'],
        pitfalls: ['Deciding faster than the situation warrants', 'Little tolerance for inefficiency', 'Difficulty slowing down', 'Skipping over the detail'],
        goodDay: 'A good day for you is one where you can take charge, cut through the noise and close things out. Momentum is your fuel.',
        strongDay: 'At your strongest you turn a stalled situation around: you make the call others are avoiding and give the team a direction to move in.'
      },
      Yellow: {
        label: 'Sunshine Yellow',
        short: 'Yellow',
        description: 'Sunshine Yellow energy stands for enthusiasm, creativity and people-focused thinking. You are optimistic, persuasive and you lift the energy of a room.',
        strengths: ['Inspiring others', 'Creative problem solving', 'Building relationships', 'Positive outlook'],
        development: ['Follow through on what you commit to', 'Give the detail its due', 'Listen more than you speak sometimes', 'Manage time and priorities deliberately'],
        pitfalls: ['Avoiding conflict, so issues stay unresolved', 'Taking on too much out of eagerness', 'Finding it hard to say no', 'Overlooking practical detail'],
        goodDay: 'A good day for you involves people, ideas and room to improvise. Collaboration leaves you with more energy than you started with.',
        strongDay: 'At your strongest you get a room engaged: you connect people to an idea and make them want to be part of it.'
      },
      Blue: {
        label: 'Cool Blue',
        short: 'Blue',
        description: 'Cool Blue energy stands for analytical thinking, precision and a focus on quality. You are logical, systematic and you value getting it right.',
        strengths: ['Analytical thinking', 'Attention to detail', 'Quality focus', 'Systematic approach'],
        development: ['Decide with incomplete information when you must', 'Say more about how you feel', 'Take calculated risks', 'Explain complex things simply'],
        pitfalls: ['Being hard on yourself and others', 'Dwelling on problems rather than solutions', 'Coming across as distant', 'Struggling with sudden change'],
        goodDay: 'A good day for you gives you uninterrupted time with a hard problem and the information you need to do it properly.',
        strongDay: 'At your strongest you find the flaw nobody else saw and produce work that holds up to scrutiny long after it ships.'
      },
      Green: {
        label: 'Earth Green',
        short: 'Green',
        description: 'Earth Green energy stands for harmony, support and steady progress. You are reliable, patient and you create environments where people feel settled.',
        strengths: ['Team collaboration', 'Reliable support', 'Patient approach', 'Creating harmony'],
        development: ['State your own opinion more often', 'Meet change and new ideas with curiosity', 'Set personal boundaries', 'Take the initiative when it is needed'],
        pitfalls: ['Avoiding confrontation until frustration builds up', 'Accommodating others at your own expense', 'Finding quick decisions difficult', 'Resisting change that is actually needed'],
        goodDay: 'A good day for you is calm and predictable, with time to support the people around you and finish what you started.',
        strongDay: 'At your strongest you are the steady point in a turbulent situation: people trust you, and that trust holds the team together.'
      }
    },
    wheel: ['REFORMER', 'DIRECTOR', 'MOTIVATOR', 'INSPIRER', 'HELPER', 'SUPPORTER', 'COORDINATOR', 'OBSERVER'],
    positions: {
      'Red-Yellow': 'Dynamic Leader', 'Red-Blue': 'Analytical Driver', 'Red-Green': 'Supportive Leader',
      'Yellow-Red': 'Inspiring Motivator', 'Yellow-Blue': 'Creative Analyst', 'Yellow-Green': 'Collaborative Enthusiast',
      'Blue-Red': 'Strategic Executor', 'Blue-Yellow': 'Methodical Communicator', 'Blue-Green': 'Systematic Supporter',
      'Green-Red': 'Steady Achiever', 'Green-Yellow': 'Harmonious Facilitator', 'Green-Blue': 'Reliable Analyst'
    },
    balance: {
      balanced: { label: 'Well Balanced', description: 'You show a balanced approach across all colour energies, adapting your style to the situation. That flexibility is a real strength in varied environments.' },
      moderate: { label: 'Moderately Focused', description: 'You have clear preferences while keeping some flexibility. Your primary colours guide your approach, but you can draw on the others when you need to.' },
      focused: { label: 'Highly Focused', description: 'You have very strong preferences in specific colour energies. That focus gives you clear strengths, though developing the other energies would widen your range.' }
    }
  },

  nl: {
    colors: {
      Red: {
        label: 'Vurig Rood',
        short: 'Rood',
        description: 'Vurig Rood staat voor daadkracht, leiderschap en resultaatgericht denken. Je bent direct, competitief en op je best als er iets te winnen valt.',
        strengths: ['Natuurlijk leiderschap', 'Snelle besluitvorming', 'Resultaatgericht', 'Competitieve drive'],
        development: ['Heb geduld met het tempo van anderen', 'Weeg mee hoe beslissingen bij anderen landen', 'Delegeer meer dan je nu doet', 'Zoek balans tussen taak en relatie'],
        pitfalls: ['Sneller beslissen dan de situatie vraagt', 'Weinig geduld met inefficiëntie', 'Moeite met vertragen', 'Details overslaan'],
        goodDay: 'Een goede dag voor jou is er een waarop je de leiding kunt nemen, ruis kunt wegsnijden en zaken kunt afronden. Vaart is je brandstof.',
        strongDay: 'Op je sterkst draai je een vastgelopen situatie om: je neemt de beslissing die anderen ontwijken en geeft het team een richting.'
      },
      Yellow: {
        label: 'Stralend Geel',
        short: 'Geel',
        description: 'Stralend Geel staat voor enthousiasme, creativiteit en mensgericht denken. Je bent optimistisch, overtuigend en je tilt de energie in een ruimte op.',
        strengths: ['Anderen inspireren', 'Creatief problemen oplossen', 'Relaties opbouwen', 'Positieve kijk'],
        development: ['Maak af waar je ja tegen zegt', 'Geef het detail zijn plek', 'Luister soms meer dan je praat', 'Beheer je tijd en prioriteiten bewust'],
        pitfalls: ['Conflict vermijden, waardoor zaken blijven liggen', 'Te veel op je nemen uit gretigheid', 'Moeite met nee zeggen', 'Praktische details over het hoofd zien'],
        goodDay: 'Een goede dag voor jou draait om mensen, ideeën en ruimte om te improviseren. Samenwerken levert je meer energie op dan het kost.',
        strongDay: 'Op je sterkst krijg je een ruimte mee: je verbindt mensen aan een idee en maakt dat ze er deel van willen uitmaken.'
      },
      Blue: {
        label: 'Helder Blauw',
        short: 'Blauw',
        description: 'Helder Blauw staat voor analytisch denken, precisie en kwaliteitsfocus. Je bent logisch, systematisch en je wilt het juist hebben.',
        strengths: ['Analytisch denken', 'Oog voor detail', 'Kwaliteitsfocus', 'Systematische aanpak'],
        development: ['Beslis met onvolledige informatie als het moet', 'Zeg meer over hoe je je voelt', 'Neem berekende risico’s', 'Leg complexe zaken eenvoudig uit'],
        pitfalls: ['Streng zijn voor jezelf en anderen', 'Blijven hangen in problemen in plaats van oplossingen', 'Afstandelijk overkomen', 'Moeite met plotselinge verandering'],
        goodDay: 'Een goede dag voor jou geeft je ononderbroken tijd met een lastig vraagstuk en de informatie om het goed te doen.',
        strongDay: 'Op je sterkst vind je de fout die niemand anders zag en lever je werk dat ook later nog overeind blijft.'
      },
      Green: {
        label: 'Rustig Groen',
        short: 'Groen',
        description: 'Rustig Groen staat voor harmonie, ondersteuning en gestage vooruitgang. Je bent betrouwbaar, geduldig en je creëert een omgeving waarin mensen tot rust komen.',
        strengths: ['Samenwerken in een team', 'Betrouwbare steun', 'Geduldige aanpak', 'Harmonie creëren'],
        development: ['Zeg vaker wat je zelf vindt', 'Benader verandering en nieuwe ideeën nieuwsgierig', 'Stel persoonlijke grenzen', 'Neem initiatief wanneer het nodig is'],
        pitfalls: ['Confrontatie uitstellen tot de frustratie oploopt', 'Anderen tegemoetkomen ten koste van jezelf', 'Moeite met snelle beslissingen', 'Weerstand tegen verandering die wel nodig is'],
        goodDay: 'Een goede dag voor jou is rustig en voorspelbaar, met tijd om de mensen om je heen te steunen en af te maken waar je aan begon.',
        strongDay: 'Op je sterkst ben je het rustpunt in een onrustige situatie: mensen vertrouwen je, en dat vertrouwen houdt het team bij elkaar.'
      }
    },
    wheel: ['HERVORMER', 'DIRECTEUR', 'MOTIVATOR', 'INSPIRATOR', 'HELPER', 'STEUNPILAAR', 'COÖRDINATOR', 'WAARNEMER'],
    positions: {
      'Red-Yellow': 'Dynamische leider', 'Red-Blue': 'Analytische aanjager', 'Red-Green': 'Ondersteunende leider',
      'Yellow-Red': 'Inspirerende motivator', 'Yellow-Blue': 'Creatieve analist', 'Yellow-Green': 'Verbindende enthousiasteling',
      'Blue-Red': 'Strategische uitvoerder', 'Blue-Yellow': 'Methodische communicator', 'Blue-Green': 'Systematische ondersteuner',
      'Green-Red': 'Standvastige presteerder', 'Green-Yellow': 'Harmonieuze facilitator', 'Green-Blue': 'Betrouwbare analist'
    },
    balance: {
      balanced: { label: 'Goed in balans', description: 'Je laat een evenwichtige aanpak zien over alle kleurenergieën en past je stijl aan de situatie aan. Die flexibiliteit is een echte sterkte in wisselende omgevingen.' },
      moderate: { label: 'Matig uitgesproken', description: 'Je hebt duidelijke voorkeuren maar houdt flexibiliteit. Je primaire kleuren sturen je aanpak, en je kunt terugvallen op de andere wanneer dat nodig is.' },
      focused: { label: 'Sterk uitgesproken', description: 'Je hebt zeer sterke voorkeuren in specifieke kleurenergieën. Die focus geeft je duidelijke sterktes, al zou het ontwikkelen van de andere energieën je bereik vergroten.' }
    }
  },

  fr: {
    colors: {
      Red: {
        label: 'Rouge Ardent',
        short: 'Rouge',
        description: 'Le Rouge Ardent traduit la détermination, le leadership et une pensée tournée vers les résultats. Vous êtes direct, compétitif et au mieux quand il y a quelque chose à gagner.',
        strengths: ['Leadership naturel', 'Décisions rapides', 'Axé sur les résultats', 'Esprit de compétition'],
        development: ['Ayez de la patience pour le rythme des autres', 'Pesez l’effet de vos décisions sur les autres', 'Déléguez davantage', 'Équilibrez la tâche et la relation'],
        pitfalls: ['Décider plus vite que la situation ne l’exige', 'Peu de patience face à l’inefficacité', 'Difficulté à ralentir', 'Passer à côté du détail'],
        goodDay: 'Une bonne journée pour vous, c’est prendre les commandes, écarter le bruit et boucler les choses. L’élan est votre carburant.',
        strongDay: 'Au meilleur de vous-même, vous débloquez une situation enlisée : vous tranchez là où les autres hésitent et donnez une direction à l’équipe.'
      },
      Yellow: {
        label: 'Jaune Solaire',
        short: 'Jaune',
        description: 'Le Jaune Solaire traduit l’enthousiasme, la créativité et l’attention aux personnes. Vous êtes optimiste, persuasif et vous élevez l’énergie d’un groupe.',
        strengths: ['Inspirer les autres', 'Résolution créative des problèmes', 'Créer des relations', 'Regard positif'],
        development: ['Menez à terme ce que vous acceptez', 'Accordez au détail la place qu’il mérite', 'Écoutez parfois plus que vous ne parlez', 'Gérez le temps et les priorités volontairement'],
        pitfalls: ['Éviter le conflit, laissant les problèmes en suspens', 'Prendre trop de choses par empressement', 'Difficulté à dire non', 'Négliger les détails pratiques'],
        goodDay: 'Une bonne journée pour vous mêle personnes, idées et marge d’improvisation. La collaboration vous laisse plus d’énergie qu’au départ.',
        strongDay: 'Au meilleur de vous-même, vous embarquez une salle entière : vous reliez les gens à une idée et leur donnez envie d’en être.'
      },
      Blue: {
        label: 'Bleu Profond',
        short: 'Bleu',
        description: 'Le Bleu Profond traduit l’analyse, la précision et l’exigence de qualité. Vous êtes logique, méthodique et vous tenez à ce que ce soit juste.',
        strengths: ['Pensée analytique', 'Souci du détail', 'Exigence de qualité', 'Approche méthodique'],
        development: ['Décidez avec une information incomplète quand il le faut', 'Exprimez davantage ce que vous ressentez', 'Prenez des risques calculés', 'Expliquez simplement les choses complexes'],
        pitfalls: ['Être dur envers vous-même et les autres', 'S’attarder sur les problèmes plutôt que sur les solutions', 'Paraître distant', 'Mal vivre les changements soudains'],
        goodDay: 'Une bonne journée vous laisse du temps sans interruption sur un problème difficile, avec l’information nécessaire pour bien faire.',
        strongDay: 'Au meilleur de vous-même, vous trouvez la faille que personne n’avait vue et produisez un travail qui tient longtemps après sa livraison.'
      },
      Green: {
        label: 'Vert Terre',
        short: 'Vert',
        description: 'Le Vert Terre traduit l’harmonie, le soutien et le progrès régulier. Vous êtes fiable, patient et vous créez un cadre où les gens se sentent posés.',
        strengths: ['Collaboration en équipe', 'Soutien fiable', 'Approche patiente', 'Créer de l’harmonie'],
        development: ['Exprimez plus souvent votre propre avis', 'Abordez le changement avec curiosité', 'Posez vos limites personnelles', 'Prenez l’initiative quand c’est nécessaire'],
        pitfalls: ['Repousser la confrontation jusqu’à la frustration', 'Accommoder les autres à vos dépens', 'Difficulté à décider vite', 'Résister à un changement pourtant nécessaire'],
        goodDay: 'Une bonne journée pour vous est calme et prévisible, avec le temps de soutenir les autres et de finir ce que vous avez commencé.',
        strongDay: 'Au meilleur de vous-même, vous êtes le point stable dans la tourmente : on vous fait confiance, et cette confiance tient l’équipe.'
      }
    },
    wheel: ['RÉFORMATEUR', 'DIRECTEUR', 'MOTIVATEUR', 'INSPIRATEUR', 'AIDANT', 'SOUTIEN', 'COORDINATEUR', 'OBSERVATEUR'],
    positions: {
      'Red-Yellow': 'Leader dynamique', 'Red-Blue': 'Moteur analytique', 'Red-Green': 'Leader bienveillant',
      'Yellow-Red': 'Motivateur inspirant', 'Yellow-Blue': 'Analyste créatif', 'Yellow-Green': 'Enthousiaste collaboratif',
      'Blue-Red': 'Exécutant stratégique', 'Blue-Yellow': 'Communicant méthodique', 'Blue-Green': 'Soutien méthodique',
      'Green-Red': 'Réalisateur constant', 'Green-Yellow': 'Facilitateur harmonieux', 'Green-Blue': 'Analyste fiable'
    },
    balance: {
      balanced: { label: 'Bien équilibré', description: 'Vous montrez une approche équilibrée sur toutes les énergies de couleur et adaptez votre style à la situation. Cette souplesse est un vrai atout dans des environnements variés.' },
      moderate: { label: 'Modérément marqué', description: 'Vous avez des préférences claires tout en gardant de la souplesse. Vos couleurs principales guident votre approche, mais vous pouvez puiser dans les autres au besoin.' },
      focused: { label: 'Fortement marqué', description: 'Vous avez des préférences très marquées sur certaines énergies. Cette concentration vous donne des forces nettes ; développer les autres élargirait votre registre.' }
    }
  },

  de: {
    colors: {
      Red: {
        label: 'Feuriges Rot',
        short: 'Rot',
        description: 'Feuriges Rot steht für Entschlossenheit, Führung und ergebnisorientiertes Denken. Sie sind direkt, wettbewerbsorientiert und in Bestform, wenn es etwas zu gewinnen gibt.',
        strengths: ['Natürliche Führung', 'Schnelle Entscheidungen', 'Ergebnisorientiert', 'Wettbewerbsdrang'],
        development: ['Haben Sie Geduld mit dem Tempo anderer', 'Berücksichtigen Sie, wie Entscheidungen ankommen', 'Delegieren Sie mehr als bisher', 'Halten Sie Aufgabe und Beziehung in Balance'],
        pitfalls: ['Schneller entscheiden, als die Lage es verlangt', 'Wenig Geduld mit Ineffizienz', 'Schwierigkeiten, langsamer zu werden', 'Details überspringen'],
        goodDay: 'Ein guter Tag für Sie ist einer, an dem Sie die Führung übernehmen, den Lärm ausblenden und Dinge abschließen können. Schwung ist Ihr Treibstoff.',
        strongDay: 'In Bestform drehen Sie eine festgefahrene Lage: Sie treffen die Entscheidung, die andere meiden, und geben dem Team eine Richtung.'
      },
      Yellow: {
        label: 'Sonniges Gelb',
        short: 'Gelb',
        description: 'Sonniges Gelb steht für Begeisterung, Kreativität und menschenorientiertes Denken. Sie sind optimistisch, überzeugend und heben die Stimmung im Raum.',
        strengths: ['Andere begeistern', 'Kreative Problemlösung', 'Beziehungen aufbauen', 'Positive Grundhaltung'],
        development: ['Bringen Sie zu Ende, wozu Sie Ja sagen', 'Geben Sie dem Detail seinen Platz', 'Hören Sie manchmal mehr zu, als Sie reden', 'Steuern Sie Zeit und Prioritäten bewusst'],
        pitfalls: ['Konflikte meiden, sodass Themen offen bleiben', 'Aus Eifer zu viel übernehmen', 'Schwierigkeiten, Nein zu sagen', 'Praktische Details übersehen'],
        goodDay: 'Ein guter Tag für Sie hat Menschen, Ideen und Raum zum Improvisieren. Zusammenarbeit gibt Ihnen mehr Energie, als sie kostet.',
        strongDay: 'In Bestform nehmen Sie einen ganzen Raum mit: Sie verbinden Menschen mit einer Idee und wecken den Wunsch, dabei zu sein.'
      },
      Blue: {
        label: 'Kühles Blau',
        short: 'Blau',
        description: 'Kühles Blau steht für analytisches Denken, Präzision und Qualitätsanspruch. Sie sind logisch, systematisch und legen Wert darauf, dass es stimmt.',
        strengths: ['Analytisches Denken', 'Sinn für Details', 'Qualitätsanspruch', 'Systematisches Vorgehen'],
        development: ['Entscheiden Sie notfalls mit unvollständigen Informationen', 'Sagen Sie mehr darüber, wie es Ihnen geht', 'Gehen Sie kalkulierte Risiken ein', 'Erklären Sie Komplexes einfach'],
        pitfalls: ['Streng mit sich und anderen sein', 'Bei Problemen statt bei Lösungen verweilen', 'Distanziert wirken', 'Mühe mit plötzlichen Veränderungen'],
        goodDay: 'Ein guter Tag gibt Ihnen ununterbrochene Zeit mit einem schwierigen Problem und die Informationen, um es sauber zu lösen.',
        strongDay: 'In Bestform finden Sie den Fehler, den sonst niemand sah, und liefern Arbeit, die auch später standhält.'
      },
      Green: {
        label: 'Erdiges Grün',
        short: 'Grün',
        description: 'Erdiges Grün steht für Harmonie, Unterstützung und stetigen Fortschritt. Sie sind verlässlich, geduldig und schaffen ein Umfeld, in dem Menschen zur Ruhe kommen.',
        strengths: ['Zusammenarbeit im Team', 'Verlässliche Unterstützung', 'Geduldiges Vorgehen', 'Harmonie schaffen'],
        development: ['Sagen Sie öfter Ihre eigene Meinung', 'Begegnen Sie Veränderung mit Neugier', 'Setzen Sie persönliche Grenzen', 'Ergreifen Sie die Initiative, wenn es nötig ist'],
        pitfalls: ['Konfrontation aufschieben, bis sich Frust aufstaut', 'Anderen auf eigene Kosten entgegenkommen', 'Mühe mit schnellen Entscheidungen', 'Widerstand gegen tatsächlich nötige Veränderung'],
        goodDay: 'Ein guter Tag für Sie ist ruhig und planbar, mit Zeit, die Menschen um Sie zu unterstützen und Begonnenes abzuschließen.',
        strongDay: 'In Bestform sind Sie der ruhige Pol in einer turbulenten Lage: Menschen vertrauen Ihnen, und dieses Vertrauen hält das Team zusammen.'
      }
    },
    wheel: ['REFORMER', 'DIREKTOR', 'MOTIVATOR', 'INSPIRATOR', 'HELFER', 'STÜTZE', 'KOORDINATOR', 'BEOBACHTER'],
    positions: {
      'Red-Yellow': 'Dynamische Führung', 'Red-Blue': 'Analytischer Antreiber', 'Red-Green': 'Unterstützende Führung',
      'Yellow-Red': 'Inspirierender Motivator', 'Yellow-Blue': 'Kreativer Analytiker', 'Yellow-Green': 'Verbindender Enthusiast',
      'Blue-Red': 'Strategischer Umsetzer', 'Blue-Yellow': 'Methodischer Kommunikator', 'Blue-Green': 'Systematischer Unterstützer',
      'Green-Red': 'Beständiger Leister', 'Green-Yellow': 'Harmonischer Moderator', 'Green-Blue': 'Verlässlicher Analytiker'
    },
    balance: {
      balanced: { label: 'Gut ausbalanciert', description: 'Sie zeigen einen ausgewogenen Zugang über alle Farbenergien und passen Ihren Stil der Situation an. Diese Beweglichkeit ist in wechselnden Umfeldern eine echte Stärke.' },
      moderate: { label: 'Mäßig ausgeprägt', description: 'Sie haben klare Vorlieben und behalten dabei Beweglichkeit. Ihre Hauptfarben leiten Ihr Vorgehen, doch Sie können bei Bedarf auf die anderen zurückgreifen.' },
      focused: { label: 'Stark ausgeprägt', description: 'Sie haben sehr ausgeprägte Vorlieben in bestimmten Farbenergien. Dieser Fokus gibt Ihnen klare Stärken; die anderen Energien zu entwickeln, würde Ihre Bandbreite erweitern.' }
    }
  },

  es: {
    colors: {
      Red: {
        label: 'Rojo Fuego',
        short: 'Rojo',
        description: 'El Rojo Fuego representa determinación, liderazgo y pensamiento orientado a resultados. Eres directo, competitivo y estás en tu mejor momento cuando hay algo que ganar.',
        strengths: ['Liderazgo natural', 'Decisiones rápidas', 'Orientado a resultados', 'Impulso competitivo'],
        development: ['Ten paciencia con el ritmo de los demás', 'Valora cómo caen tus decisiones en el equipo', 'Delega más de lo que haces ahora', 'Equilibra la tarea con la relación'],
        pitfalls: ['Decidir más rápido de lo que pide la situación', 'Poca paciencia con la ineficiencia', 'Dificultad para bajar el ritmo', 'Pasar por alto el detalle'],
        goodDay: 'Un buen día para ti es aquel en el que puedes tomar el mando, apartar el ruido y cerrar asuntos. El impulso es tu combustible.',
        strongDay: 'En tu mejor versión das la vuelta a una situación estancada: tomas la decisión que otros evitan y das rumbo al equipo.'
      },
      Yellow: {
        label: 'Amarillo Solar',
        short: 'Amarillo',
        description: 'El Amarillo Solar representa entusiasmo, creatividad y pensamiento centrado en las personas. Eres optimista, persuasivo y elevas la energía de una sala.',
        strengths: ['Inspirar a otros', 'Resolución creativa de problemas', 'Construir relaciones', 'Actitud positiva'],
        development: ['Cumple aquello a lo que dices que sí', 'Dale al detalle el lugar que merece', 'Escucha a veces más de lo que hablas', 'Gestiona tiempo y prioridades con intención'],
        pitfalls: ['Evitar el conflicto y dejar temas sin resolver', 'Asumir demasiado por entusiasmo', 'Dificultad para decir que no', 'Descuidar los detalles prácticos'],
        goodDay: 'Un buen día para ti combina personas, ideas y margen para improvisar. Colaborar te deja con más energía de la que empezaste.',
        strongDay: 'En tu mejor versión enganchas a toda una sala: conectas a la gente con una idea y haces que quieran formar parte.'
      },
      Blue: {
        label: 'Azul Sereno',
        short: 'Azul',
        description: 'El Azul Sereno representa pensamiento analítico, precisión y foco en la calidad. Eres lógico, sistemático y valoras que las cosas estén bien.',
        strengths: ['Pensamiento analítico', 'Atención al detalle', 'Foco en la calidad', 'Enfoque sistemático'],
        development: ['Decide con información incompleta cuando haga falta', 'Expresa más lo que sientes', 'Asume riesgos calculados', 'Explica lo complejo de forma sencilla'],
        pitfalls: ['Ser duro contigo mismo y con los demás', 'Quedarte en el problema en vez de la solución', 'Parecer distante', 'Costarte los cambios repentinos'],
        goodDay: 'Un buen día te da tiempo sin interrupciones con un problema difícil y la información necesaria para resolverlo bien.',
        strongDay: 'En tu mejor versión encuentras el fallo que nadie vio y entregas un trabajo que aguanta el escrutinio mucho después.'
      },
      Green: {
        label: 'Verde Tierra',
        short: 'Verde',
        description: 'El Verde Tierra representa armonía, apoyo y progreso constante. Eres fiable, paciente y creas entornos donde la gente se siente tranquila.',
        strengths: ['Colaboración en equipo', 'Apoyo fiable', 'Enfoque paciente', 'Crear armonía'],
        development: ['Expresa tu opinión con más frecuencia', 'Recibe el cambio y las ideas nuevas con curiosidad', 'Pon límites personales', 'Toma la iniciativa cuando haga falta'],
        pitfalls: ['Aplazar la confrontación hasta acumular frustración', 'Ceder ante otros a costa tuya', 'Costarte las decisiones rápidas', 'Resistirte a un cambio que sí hace falta'],
        goodDay: 'Un buen día para ti es tranquilo y previsible, con tiempo para apoyar a los tuyos y terminar lo que empezaste.',
        strongDay: 'En tu mejor versión eres el punto estable en plena turbulencia: la gente confía en ti, y esa confianza sostiene al equipo.'
      }
    },
    wheel: ['REFORMADOR', 'DIRECTOR', 'MOTIVADOR', 'INSPIRADOR', 'AYUDANTE', 'APOYO', 'COORDINADOR', 'OBSERVADOR'],
    positions: {
      'Red-Yellow': 'Líder dinámico', 'Red-Blue': 'Impulsor analítico', 'Red-Green': 'Líder cercano',
      'Yellow-Red': 'Motivador inspirador', 'Yellow-Blue': 'Analista creativo', 'Yellow-Green': 'Entusiasta colaborador',
      'Blue-Red': 'Ejecutor estratégico', 'Blue-Yellow': 'Comunicador metódico', 'Blue-Green': 'Apoyo sistemático',
      'Green-Red': 'Realizador constante', 'Green-Yellow': 'Facilitador armonioso', 'Green-Blue': 'Analista fiable'
    },
    balance: {
      balanced: { label: 'Bien equilibrado', description: 'Muestras un enfoque equilibrado en todas las energías de color y adaptas tu estilo a la situación. Esa flexibilidad es una fortaleza real en entornos variados.' },
      moderate: { label: 'Moderadamente marcado', description: 'Tienes preferencias claras conservando cierta flexibilidad. Tus colores principales guían tu enfoque, pero puedes recurrir a los demás cuando lo necesitas.' },
      focused: { label: 'Muy marcado', description: 'Tienes preferencias muy fuertes en energías concretas. Ese foco te da fortalezas claras, aunque desarrollar las otras ampliaría tu registro.' }
    }
  }
}
