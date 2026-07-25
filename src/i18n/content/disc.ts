import type { DiscCombination, DiscStyle } from '../../scoring/disc'
import type { Localized } from './locale'

export interface DiscStyleContent {
  name: string
  description: string
  traits: string[]
  tips: string[]
}

export interface DiscCombinationContent {
  name: string
  description: string
  traits: string[]
  teamRole: string
  complements: string[]
}

export interface DiscContent {
  styles: Record<DiscStyle, DiscStyleContent>
  combinations: Record<DiscCombination, DiscCombinationContent>
}

export const discContent: Localized<DiscContent> = {
  en: {
    styles: {
      D: {
        name: 'Dominance',
        description: 'Direct, results-oriented, firm, strong-willed, and forceful',
        traits: ['Decisive', 'Competitive', 'Results-focused', 'Direct communication'],
        tips: [
          'Be direct and to the point',
          'Focus on results and outcomes',
          'Provide options and let them choose',
          'Avoid too much detail or small talk'
        ]
      },
      I: {
        name: 'Influence',
        description: 'Outgoing, enthusiastic, optimistic, high-spirited, and lively',
        traits: ['Enthusiastic', 'Persuasive', 'People-oriented', 'Optimistic'],
        tips: [
          'Be enthusiastic and energetic',
          'Allow time for socialising',
          'Use stories and examples',
          'Provide recognition and praise'
        ]
      },
      S: {
        name: 'Steadiness',
        description: 'Even-tempered, accommodating, patient, humble, and tactful',
        traits: ['Reliable', 'Patient', 'Team-oriented', 'Good listener'],
        tips: [
          'Be patient and supportive',
          'Provide security and stability',
          'Allow time for decision making',
          'Show appreciation for their loyalty'
        ]
      },
      C: {
        name: 'Conscientiousness',
        description: 'Private, analytical, logical, critical thinker, and reserved',
        traits: ['Analytical', 'Precise', 'Quality-focused', 'Systematic'],
        tips: [
          'Provide detailed information',
          'Be prepared with facts and data',
          'Allow time for analysis',
          'Focus on quality and accuracy'
        ]
      }
    },
    combinations: {
      'D/I': {
        name: 'INITIATOR',
        description: 'Results-oriented and people-focused. You drive initiatives while inspiring others to follow, and you can move a team towards an ambitious goal.',
        traits: ['Charismatic leader', 'Goal-oriented', 'Persuasive', 'Energetic', 'Risk-taker'],
        teamRole: 'You excel at launching new projects and rallying support. Your mix of drive and enthusiasm makes you effective at both setting direction and getting buy-in.',
        complements: ['S/C profiles for detailed execution', 'C profiles for analytical support', 'S profiles for steady implementation']
      },
      'D/S': {
        name: 'DRIVER',
        description: 'Results-driven with a steady hand. You push for outcomes without churning the team around you, and you follow through on what you start.',
        traits: ['Determined', 'Persistent', 'Calm under pressure', 'Dependable', 'Outcome-focused'],
        teamRole: 'You keep momentum going long after the initial enthusiasm fades. Your mix of drive and patience suits work that needs both a push and a long attention span.',
        complements: ['I profiles for energy and visibility', 'C profiles for rigorous analysis', 'I/C profiles for polished communication']
      },
      'D/C': {
        name: 'LEADER',
        description: 'Results-driven with analytical precision. You decide from data and push for efficient, high-quality outcomes.',
        traits: ['Strategic thinker', 'Quality-focused', 'Efficient', 'Systematic leader', 'Performance-driven'],
        teamRole: 'You provide strong leadership with attention to detail. Combining vision with precision makes you effective at complex problem-solving.',
        complements: ['I profiles for team motivation', 'S profiles for relationship building', 'I/S profiles for team harmony']
      },
      'I/D': {
        name: 'MOTIVATOR',
        description: 'Enthusiastic and action-oriented. You inspire others while driving for results, combining social energy with goal achievement.',
        traits: ['Inspiring', 'Action-oriented', 'Socially confident', 'Goal-focused', 'Optimistic'],
        teamRole: 'You energise teams while keeping the focus on results. Motivating others while driving performance makes you effective in fast-moving environments.',
        complements: ['S profiles for stability', 'C profiles for detailed analysis', 'S/C profiles for steady execution']
      },
      'I/S': {
        name: 'ENCOURAGER',
        description: 'Warm and people-first. You bring energy to a group without pushing it, and you notice when someone needs support before they ask.',
        traits: ['Approachable', 'Encouraging', 'Patient listener', 'Enthusiastic', 'Loyal'],
        teamRole: 'You make teams feel safe enough to speak up. Your blend of optimism and steadiness is valuable during change, when people need reassurance and momentum at once.',
        complements: ['D profiles for decisive direction', 'C profiles for structure and rigour', 'D/C profiles for strategic leadership']
      },
      'I/C': {
        name: 'PROMOTER',
        description: 'People-oriented with attention to quality. You promote ideas and solutions while making sure they meet a high standard.',
        traits: ['Persuasive', 'Quality-minded', 'Creative', 'Thorough communicator', 'Relationship-focused'],
        teamRole: 'You excel at presenting ideas and building consensus around solid solutions. Social skill plus attention to detail helps in complex negotiations.',
        complements: ['D profiles for decision-making', 'S profiles for implementation', 'D/S profiles for leadership and stability']
      },
      'S/D': {
        name: 'ANCHOR',
        description: 'Steady first, but willing to take the lead. You hold things together day to day and step forward decisively when the situation calls for it.',
        traits: ['Grounded', 'Reliable', 'Quietly assertive', 'Practical', 'Protective of the team'],
        teamRole: 'You are the person a team leans on when things get turbulent. You absorb pressure rather than pass it on, and you will make the call when nobody else will.',
        complements: ['I profiles for visibility and energy', 'C profiles for detailed analysis', 'I/C profiles for persuasive communication']
      },
      'S/I': {
        name: 'CONNECTOR',
        description: 'Relationship-focused and supportive. You build strong connections while keeping the peace and encouraging people to work together.',
        traits: ['Team builder', 'Supportive', 'Collaborative', 'Encouraging', 'Diplomatic'],
        teamRole: 'You excel at bringing people together and keeping team dynamics healthy. Your warmth and stability create an environment where others do their best work.',
        complements: ['D profiles for direction setting', 'C profiles for analytical tasks', 'D/C profiles for strategic leadership']
      },
      'S/C': {
        name: 'SUPPORTER',
        description: 'Steady and detail-oriented. You deliver reliable, high-quality work while keeping the team stable and the process intact.',
        traits: ['Dependable', 'Detail-oriented', 'Loyal', 'Process-focused', 'Quality-conscious'],
        teamRole: 'You are the backbone of day-to-day operations, ensuring consistent quality and reliable delivery. Thoroughness and loyalty make you invaluable over the long run.',
        complements: ['D profiles for leadership', 'I profiles for innovation', 'D/I profiles for dynamic leadership']
      },
      'C/D': {
        name: 'ANALYST',
        description: 'Analytical and results-focused. You solve complex problems systematically while pushing for an efficient outcome.',
        traits: ['Problem solver', 'Systematic', 'Results-oriented', 'Logical', 'Efficient'],
        teamRole: 'You provide analytical leadership, tackling hard challenges with a data-driven approach. Analysis plus action orientation gets you to the optimal solution.',
        complements: ['I profiles for team engagement', 'S profiles for relationship management', 'I/S profiles for team harmony']
      },
      'C/I': {
        name: 'COORDINATOR',
        description: 'Detail-oriented and people-focused. You coordinate complex work while keeping relationships positive and quality high.',
        traits: ['Organised', 'Collaborative', 'Detail-focused', 'Communicative', 'Quality-driven'],
        teamRole: 'You excel at running work that needs both precision and coordination. Organising while maintaining relationships is valuable wherever people report in several directions.',
        complements: ['D profiles for strategic direction', 'S profiles for steady support', 'D/S profiles for leadership and stability']
      },
      'C/S': {
        name: 'EVALUATOR',
        description: 'Precise and unhurried. You want the work to be right rather than fast, and you build the checks that stop small errors becoming expensive ones.',
        traits: ['Methodical', 'Accurate', 'Patient', 'Risk-aware', 'Consistent'],
        teamRole: 'You are the quality conscience of a team. You spot the flaw in a plan before it ships, and you keep standards steady when everyone else is in a hurry.',
        complements: ['D profiles for decisive direction', 'I profiles for momentum and buy-in', 'D/I profiles for dynamic leadership']
      }
    }
  },

  nl: {
    styles: {
      D: {
        name: 'Dominantie',
        description: 'Direct, resultaatgericht, stevig, vastberaden en doortastend',
        traits: ['Besluitvaardig', 'Competitief', 'Resultaatgericht', 'Directe communicatie'],
        tips: [
          'Wees direct en kom ter zake',
          'Focus op resultaten en uitkomsten',
          'Bied opties aan en laat hen kiezen',
          'Vermijd te veel details of small talk'
        ]
      },
      I: {
        name: 'Invloed',
        description: 'Extravert, enthousiast, optimistisch, uitbundig en levendig',
        traits: ['Enthousiast', 'Overtuigend', 'Mensgericht', 'Optimistisch'],
        tips: [
          'Wees enthousiast en energiek',
          'Maak tijd voor informeel contact',
          'Gebruik verhalen en voorbeelden',
          'Geef erkenning en complimenten'
        ]
      },
      S: {
        name: 'Stabiliteit',
        description: 'Evenwichtig, meegaand, geduldig, bescheiden en tactvol',
        traits: ['Betrouwbaar', 'Geduldig', 'Teamgericht', 'Goede luisteraar'],
        tips: [
          'Wees geduldig en ondersteunend',
          'Bied zekerheid en stabiliteit',
          'Geef tijd om beslissingen te nemen',
          'Toon waardering voor hun loyaliteit'
        ]
      },
      C: {
        name: 'Consciëntieusheid',
        description: 'Gesloten, analytisch, logisch, kritisch denkend en gereserveerd',
        traits: ['Analytisch', 'Precies', 'Kwaliteitsgericht', 'Systematisch'],
        tips: [
          'Geef gedetailleerde informatie',
          'Kom voorbereid met feiten en cijfers',
          'Geef tijd om te analyseren',
          'Focus op kwaliteit en nauwkeurigheid'
        ]
      }
    },
    combinations: {
      'D/I': {
        name: 'INITIATOR',
        description: 'Resultaatgericht en mensgericht. Je trekt initiatieven op gang en inspireert anderen om mee te gaan, ook richting ambitieuze doelen.',
        traits: ['Charismatische leider', 'Doelgericht', 'Overtuigend', 'Energiek', 'Risicozoekend'],
        teamRole: 'Je bent sterk in het lanceren van nieuwe projecten en het verzamelen van steun. Je combinatie van drive en enthousiasme helpt je zowel richting te geven als draagvlak te creëren.',
        complements: ['S/C-profielen voor gedetailleerde uitvoering', 'C-profielen voor analytische ondersteuning', 'S-profielen voor stabiele implementatie']
      },
      'D/S': {
        name: 'DOORZETTER',
        description: 'Resultaatgericht met een vaste hand. Je duwt naar resultaat zonder het team op te jagen, en je maakt af waar je aan begint.',
        traits: ['Vastberaden', 'Volhardend', 'Kalm onder druk', 'Betrouwbaar', 'Resultaatgericht'],
        teamRole: 'Je houdt het tempo erin lang nadat het eerste enthousiasme is weggeëbd. Drive en geduld samen passen bij werk dat zowel een duw als een lange adem vraagt.',
        complements: ['I-profielen voor energie en zichtbaarheid', 'C-profielen voor grondige analyse', 'I/C-profielen voor verzorgde communicatie']
      },
      'D/C': {
        name: 'LEIDER',
        description: 'Resultaatgericht met analytische precisie. Je beslist op basis van data en stuurt op efficiënte resultaten van hoge kwaliteit.',
        traits: ['Strategisch denker', 'Kwaliteitsgericht', 'Efficiënt', 'Systematische leider', 'Prestatiegericht'],
        teamRole: 'Je geeft stevig leiding met oog voor detail. De combinatie van visie en precisie maakt je sterk in complexe vraagstukken.',
        complements: ['I-profielen voor teammotivatie', 'S-profielen voor relatieopbouw', 'I/S-profielen voor teamharmonie']
      },
      'I/D': {
        name: 'MOTIVATOR',
        description: 'Enthousiast en actiegericht. Je inspireert anderen en stuurt tegelijk op resultaat: sociale energie gekoppeld aan doelen halen.',
        traits: ['Inspirerend', 'Actiegericht', 'Sociaal zelfverzekerd', 'Doelgericht', 'Optimistisch'],
        teamRole: 'Je geeft teams energie zonder het resultaat uit het oog te verliezen. Dat maakt je sterk in snel bewegende omgevingen.',
        complements: ['S-profielen voor stabiliteit', 'C-profielen voor gedetailleerde analyse', 'S/C-profielen voor stabiele uitvoering']
      },
      'I/S': {
        name: 'AANMOEDIGER',
        description: 'Warm en mensgericht. Je brengt energie in een groep zonder te forceren, en je merkt het als iemand steun nodig heeft nog voor die erom vraagt.',
        traits: ['Toegankelijk', 'Aanmoedigend', 'Geduldige luisteraar', 'Enthousiast', 'Loyaal'],
        teamRole: 'Je zorgt dat mensen zich veilig genoeg voelen om iets te zeggen. Je mix van optimisme en stabiliteit is waardevol bij verandering, wanneer mensen tegelijk geruststelling en beweging nodig hebben.',
        complements: ['D-profielen voor besliste richting', 'C-profielen voor structuur en grondigheid', 'D/C-profielen voor strategisch leiderschap']
      },
      'I/C': {
        name: 'PROMOTOR',
        description: 'Mensgericht met oog voor kwaliteit. Je brengt ideeën en oplossingen aan de man en zorgt dat ze een hoge standaard halen.',
        traits: ['Overtuigend', 'Kwaliteitsbewust', 'Creatief', 'Zorgvuldige communicator', 'Relatiegericht'],
        teamRole: 'Je bent sterk in het presenteren van ideeën en het bouwen van consensus rond degelijke oplossingen. Sociale vaardigheid plus oog voor detail helpt bij complexe onderhandelingen.',
        complements: ['D-profielen voor besluitvorming', 'S-profielen voor implementatie', 'D/S-profielen voor leiderschap en stabiliteit']
      },
      'S/D': {
        name: 'ANKER',
        description: 'Eerst stabiel, maar bereid om het voortouw te nemen. Je houdt de boel dagelijks samen en stapt besluitvaardig naar voren als het nodig is.',
        traits: ['Geaard', 'Betrouwbaar', 'Rustig assertief', 'Praktisch', 'Beschermend voor het team'],
        teamRole: 'Jij bent degene op wie een team leunt als het onrustig wordt. Je vangt druk op in plaats van hem door te geven, en je neemt de beslissing als niemand anders dat doet.',
        complements: ['I-profielen voor zichtbaarheid en energie', 'C-profielen voor gedetailleerde analyse', 'I/C-profielen voor overtuigende communicatie']
      },
      'S/I': {
        name: 'VERBINDER',
        description: 'Relatiegericht en ondersteunend. Je bouwt sterke verbindingen, bewaart de rust en stimuleert mensen om samen te werken.',
        traits: ['Teambouwer', 'Ondersteunend', 'Samenwerkingsgericht', 'Aanmoedigend', 'Diplomatiek'],
        teamRole: 'Je bent sterk in mensen samenbrengen en de teamdynamiek gezond houden. Je warmte en stabiliteit creëren een omgeving waarin anderen hun beste werk leveren.',
        complements: ['D-profielen voor richting bepalen', 'C-profielen voor analytische taken', 'D/C-profielen voor strategisch leiderschap']
      },
      'S/C': {
        name: 'ONDERSTEUNER',
        description: 'Stabiel en detailgericht. Je levert betrouwbaar werk van hoge kwaliteit en houdt het team en het proces overeind.',
        traits: ['Betrouwbaar', 'Detailgericht', 'Loyaal', 'Procesgericht', 'Kwaliteitsbewust'],
        teamRole: 'Je bent de ruggengraat van de dagelijkse werking en zorgt voor constante kwaliteit en betrouwbare oplevering. Grondigheid en loyaliteit maken je onmisbaar op lange termijn.',
        complements: ['D-profielen voor leiderschap', 'I-profielen voor vernieuwing', 'D/I-profielen voor dynamisch leiderschap']
      },
      'C/D': {
        name: 'ANALIST',
        description: 'Analytisch en resultaatgericht. Je lost complexe problemen systematisch op en stuurt tegelijk op een efficiënte uitkomst.',
        traits: ['Probleemoplosser', 'Systematisch', 'Resultaatgericht', 'Logisch', 'Efficiënt'],
        teamRole: 'Je geeft analytisch leiding en pakt lastige vraagstukken datagedreven aan. Analyse plus actiegerichtheid brengt je bij de beste oplossing.',
        complements: ['I-profielen voor teambetrokkenheid', 'S-profielen voor relatiebeheer', 'I/S-profielen voor teamharmonie']
      },
      'C/I': {
        name: 'COÖRDINATOR',
        description: 'Detailgericht en mensgericht. Je coördineert complex werk en houdt tegelijk de relaties goed en de kwaliteit hoog.',
        traits: ['Georganiseerd', 'Samenwerkingsgericht', 'Detailgericht', 'Communicatief', 'Kwaliteitsgedreven'],
        teamRole: 'Je bent sterk in werk dat zowel precisie als afstemming vraagt. Organiseren zonder de relatie te verliezen is waardevol overal waar mensen in meerdere richtingen rapporteren.',
        complements: ['D-profielen voor strategische richting', 'S-profielen voor stabiele ondersteuning', 'D/S-profielen voor leiderschap en stabiliteit']
      },
      'C/S': {
        name: 'EVALUATOR',
        description: 'Precies en zonder haast. Je wilt dat het werk klopt in plaats van snel klaar is, en je bouwt de controles die kleine fouten duur maken voorkomen.',
        traits: ['Methodisch', 'Nauwkeurig', 'Geduldig', 'Risicobewust', 'Consistent'],
        teamRole: 'Je bent het kwaliteitsgeweten van het team. Je ziet de fout in een plan voordat het live gaat, en je houdt de standaard overeind terwijl iedereen haast heeft.',
        complements: ['D-profielen voor besliste richting', 'I-profielen voor vaart en draagvlak', 'D/I-profielen voor dynamisch leiderschap']
      }
    }
  },

  fr: {
    styles: {
      D: {
        name: 'Dominance',
        description: 'Direct, orienté résultats, ferme, déterminé et énergique',
        traits: ['Décidé', 'Compétitif', 'Axé sur les résultats', 'Communication directe'],
        tips: [
          'Soyez direct et allez à l’essentiel',
          'Concentrez-vous sur les résultats',
          'Proposez des options et laissez choisir',
          'Évitez les détails superflus et les banalités'
        ]
      },
      I: {
        name: 'Influence',
        description: 'Extraverti, enthousiaste, optimiste, exubérant et vivant',
        traits: ['Enthousiaste', 'Persuasif', 'Orienté vers les gens', 'Optimiste'],
        tips: [
          'Soyez enthousiaste et énergique',
          'Laissez du temps pour les échanges informels',
          'Utilisez des histoires et des exemples',
          'Offrez reconnaissance et compliments'
        ]
      },
      S: {
        name: 'Stabilité',
        description: 'Égal d’humeur, accommodant, patient, modeste et plein de tact',
        traits: ['Fiable', 'Patient', 'Orienté équipe', 'Bon auditeur'],
        tips: [
          'Soyez patient et soutenant',
          'Offrez sécurité et stabilité',
          'Laissez du temps pour décider',
          'Montrez votre reconnaissance pour leur loyauté'
        ]
      },
      C: {
        name: 'Conformité',
        description: 'Discret, analytique, logique, esprit critique et réservé',
        traits: ['Analytique', 'Précis', 'Axé sur la qualité', 'Systématique'],
        tips: [
          'Fournissez des informations détaillées',
          'Préparez faits et données',
          'Laissez du temps pour analyser',
          'Concentrez-vous sur la qualité et l’exactitude'
        ]
      }
    },
    combinations: {
      'D/I': {
        name: 'INITIATEUR',
        description: 'Orienté résultats et vers les gens. Vous lancez des initiatives tout en inspirant les autres à suivre, y compris vers des objectifs ambitieux.',
        traits: ['Leader charismatique', 'Orienté objectifs', 'Persuasif', 'Énergique', 'Preneur de risques'],
        teamRole: 'Vous excellez à lancer de nouveaux projets et à rallier du soutien. Votre mélange d’élan et d’enthousiasme vous permet à la fois de donner une direction et d’obtenir l’adhésion.',
        complements: ['Profils S/C pour une exécution détaillée', 'Profils C pour l’appui analytique', 'Profils S pour une mise en œuvre stable']
      },
      'D/S': {
        name: 'MOTEUR',
        description: 'Orienté résultats avec une main sûre. Vous poussez vers le résultat sans bousculer l’équipe, et vous terminez ce que vous commencez.',
        traits: ['Déterminé', 'Persévérant', 'Calme sous pression', 'Fiable', 'Axé sur le résultat'],
        teamRole: 'Vous maintenez l’élan longtemps après la disparition de l’enthousiasme initial. Élan et patience conviennent au travail qui demande à la fois une impulsion et de l’endurance.',
        complements: ['Profils I pour l’énergie et la visibilité', 'Profils C pour une analyse rigoureuse', 'Profils I/C pour une communication soignée']
      },
      'D/C': {
        name: 'DIRIGEANT',
        description: 'Orienté résultats avec une précision analytique. Vous décidez à partir des données et visez des résultats efficaces et de qualité.',
        traits: ['Penseur stratégique', 'Axé sur la qualité', 'Efficace', 'Leader systématique', 'Orienté performance'],
        teamRole: 'Vous dirigez fermement sans négliger le détail. Allier vision et précision vous rend efficace face aux problèmes complexes.',
        complements: ['Profils I pour motiver l’équipe', 'Profils S pour construire les relations', 'Profils I/S pour l’harmonie d’équipe']
      },
      'I/D': {
        name: 'MOTIVATEUR',
        description: 'Enthousiaste et orienté action. Vous inspirez les autres tout en visant le résultat : énergie sociale au service des objectifs.',
        traits: ['Inspirant', 'Orienté action', 'Sûr de lui socialement', 'Orienté objectifs', 'Optimiste'],
        teamRole: 'Vous donnez de l’énergie aux équipes sans perdre le résultat de vue, ce qui vous rend efficace dans les environnements rapides.',
        complements: ['Profils S pour la stabilité', 'Profils C pour l’analyse détaillée', 'Profils S/C pour une exécution stable']
      },
      'I/S': {
        name: 'ENCOURAGEUR',
        description: 'Chaleureux et tourné vers les gens. Vous apportez de l’énergie sans forcer, et vous remarquez qu’on a besoin de soutien avant qu’on ne le demande.',
        traits: ['Accessible', 'Encourageant', 'Auditeur patient', 'Enthousiaste', 'Loyal'],
        teamRole: 'Vous rendez les équipes assez sûres d’elles pour s’exprimer. Votre mélange d’optimisme et de stabilité compte en période de changement, quand il faut à la fois rassurer et avancer.',
        complements: ['Profils D pour une direction ferme', 'Profils C pour la structure et la rigueur', 'Profils D/C pour un leadership stratégique']
      },
      'I/C': {
        name: 'PROMOTEUR',
        description: 'Orienté vers les gens avec le souci de la qualité. Vous portez les idées et les solutions en veillant à ce qu’elles tiennent la route.',
        traits: ['Persuasif', 'Soucieux de la qualité', 'Créatif', 'Communicateur rigoureux', 'Axé sur la relation'],
        teamRole: 'Vous excellez à présenter des idées et à bâtir un consensus autour de solutions solides. Aisance sociale et sens du détail aident dans les négociations complexes.',
        complements: ['Profils D pour la décision', 'Profils S pour la mise en œuvre', 'Profils D/S pour le leadership et la stabilité']
      },
      'S/D': {
        name: 'PILIER',
        description: 'Stable d’abord, mais prêt à prendre les devants. Vous tenez l’ensemble au quotidien et vous avancez avec fermeté quand la situation l’exige.',
        traits: ['Ancré', 'Fiable', 'Affirmé sans bruit', 'Pragmatique', 'Protecteur de l’équipe'],
        teamRole: 'Vous êtes celui sur qui l’équipe s’appuie quand ça secoue. Vous absorbez la pression au lieu de la transmettre, et vous tranchez quand personne d’autre ne le fait.',
        complements: ['Profils I pour la visibilité et l’énergie', 'Profils C pour l’analyse détaillée', 'Profils I/C pour une communication persuasive']
      },
      'S/I': {
        name: 'CONNECTEUR',
        description: 'Axé sur la relation et soutenant. Vous créez des liens solides, préservez le calme et encouragez la collaboration.',
        traits: ['Bâtisseur d’équipe', 'Soutenant', 'Collaboratif', 'Encourageant', 'Diplomate'],
        teamRole: 'Vous excellez à rassembler les gens et à garder une dynamique d’équipe saine. Votre chaleur et votre stabilité créent un cadre où les autres donnent le meilleur.',
        complements: ['Profils D pour fixer le cap', 'Profils C pour les tâches analytiques', 'Profils D/C pour un leadership stratégique']
      },
      'S/C': {
        name: 'SOUTIEN',
        description: 'Stable et soucieux du détail. Vous livrez un travail fiable et de qualité tout en préservant l’équipe et le processus.',
        traits: ['Fiable', 'Soucieux du détail', 'Loyal', 'Axé sur le processus', 'Attentif à la qualité'],
        teamRole: 'Vous êtes la colonne vertébrale du fonctionnement quotidien : qualité constante et livraison fiable. Votre rigueur et votre loyauté sont précieuses sur la durée.',
        complements: ['Profils D pour le leadership', 'Profils I pour l’innovation', 'Profils D/I pour un leadership dynamique']
      },
      'C/D': {
        name: 'ANALYSTE',
        description: 'Analytique et orienté résultats. Vous résolvez les problèmes complexes de façon systématique tout en visant l’efficacité.',
        traits: ['Résolveur de problèmes', 'Systématique', 'Orienté résultats', 'Logique', 'Efficace'],
        teamRole: 'Vous apportez un leadership analytique et traitez les questions difficiles par les données. Analyse et sens de l’action mènent à la meilleure solution.',
        complements: ['Profils I pour l’engagement de l’équipe', 'Profils S pour la gestion des relations', 'Profils I/S pour l’harmonie d’équipe']
      },
      'C/I': {
        name: 'COORDINATEUR',
        description: 'Soucieux du détail et des gens. Vous coordonnez des travaux complexes en gardant de bonnes relations et un haut niveau de qualité.',
        traits: ['Organisé', 'Collaboratif', 'Attentif au détail', 'Communicatif', 'Exigeant sur la qualité'],
        teamRole: 'Vous excellez sur les travaux qui demandent précision et coordination. Organiser sans abîmer la relation compte partout où l’on rend des comptes dans plusieurs directions.',
        complements: ['Profils D pour la direction stratégique', 'Profils S pour un appui stable', 'Profils D/S pour le leadership et la stabilité']
      },
      'C/S': {
        name: 'ÉVALUATEUR',
        description: 'Précis et sans précipitation. Vous voulez que le travail soit juste plutôt que rapide, et vous mettez en place les contrôles qui évitent que de petites erreurs coûtent cher.',
        traits: ['Méthodique', 'Exact', 'Patient', 'Conscient des risques', 'Constant'],
        teamRole: 'Vous êtes la conscience qualité de l’équipe. Vous voyez la faille d’un plan avant sa mise en production et vous tenez le niveau quand tout le monde est pressé.',
        complements: ['Profils D pour une direction ferme', 'Profils I pour l’élan et l’adhésion', 'Profils D/I pour un leadership dynamique']
      }
    }
  },

  de: {
    styles: {
      D: {
        name: 'Dominanz',
        description: 'Direkt, ergebnisorientiert, bestimmt, willensstark und durchsetzungsfähig',
        traits: ['Entscheidungsfreudig', 'Wettbewerbsorientiert', 'Ergebnisorientiert', 'Direkte Kommunikation'],
        tips: [
          'Seien Sie direkt und kommen Sie zur Sache',
          'Konzentrieren Sie sich auf Ergebnisse',
          'Bieten Sie Optionen an und lassen Sie wählen',
          'Vermeiden Sie zu viele Details und Small Talk'
        ]
      },
      I: {
        name: 'Initiative',
        description: 'Kontaktfreudig, begeisterungsfähig, optimistisch, temperamentvoll und lebendig',
        traits: ['Begeisterungsfähig', 'Überzeugend', 'Menschenorientiert', 'Optimistisch'],
        tips: [
          'Seien Sie begeistert und energiegeladen',
          'Lassen Sie Raum für den persönlichen Austausch',
          'Nutzen Sie Geschichten und Beispiele',
          'Geben Sie Anerkennung und Lob'
        ]
      },
      S: {
        name: 'Stetigkeit',
        description: 'Ausgeglichen, entgegenkommend, geduldig, bescheiden und taktvoll',
        traits: ['Zuverlässig', 'Geduldig', 'Teamorientiert', 'Guter Zuhörer'],
        tips: [
          'Seien Sie geduldig und unterstützend',
          'Bieten Sie Sicherheit und Stabilität',
          'Lassen Sie Zeit für Entscheidungen',
          'Zeigen Sie Wertschätzung für ihre Loyalität'
        ]
      },
      C: {
        name: 'Gewissenhaftigkeit',
        description: 'Zurückhaltend, analytisch, logisch, kritisch denkend und reserviert',
        traits: ['Analytisch', 'Präzise', 'Qualitätsorientiert', 'Systematisch'],
        tips: [
          'Liefern Sie detaillierte Informationen',
          'Kommen Sie mit Fakten und Daten vorbereitet',
          'Lassen Sie Zeit für die Analyse',
          'Konzentrieren Sie sich auf Qualität und Genauigkeit'
        ]
      }
    },
    combinations: {
      'D/I': {
        name: 'INITIATOR',
        description: 'Ergebnis- und menschenorientiert. Sie bringen Initiativen in Gang und begeistern andere, auch für ehrgeizige Ziele.',
        traits: ['Charismatische Führung', 'Zielorientiert', 'Überzeugend', 'Energiegeladen', 'Risikobereit'],
        teamRole: 'Sie sind stark darin, neue Projekte zu starten und Unterstützung zu gewinnen. Antrieb und Begeisterung zusammen helfen Ihnen, Richtung zu geben und Zustimmung zu erzeugen.',
        complements: ['S/C-Profile für die detaillierte Umsetzung', 'C-Profile für analytische Unterstützung', 'S-Profile für eine stabile Umsetzung']
      },
      'D/S': {
        name: 'ANTREIBER',
        description: 'Ergebnisorientiert mit ruhiger Hand. Sie drängen auf Resultate, ohne das Team aufzuscheuchen, und bringen zu Ende, was Sie beginnen.',
        traits: ['Entschlossen', 'Beharrlich', 'Ruhig unter Druck', 'Verlässlich', 'Ergebnisorientiert'],
        teamRole: 'Sie halten das Tempo, lange nachdem die anfängliche Begeisterung verflogen ist. Antrieb und Geduld passen zu Arbeit, die Schub und Ausdauer zugleich verlangt.',
        complements: ['I-Profile für Energie und Sichtbarkeit', 'C-Profile für gründliche Analyse', 'I/C-Profile für gepflegte Kommunikation']
      },
      'D/C': {
        name: 'LEITER',
        description: 'Ergebnisorientiert mit analytischer Präzision. Sie entscheiden datenbasiert und steuern auf effiziente Ergebnisse hoher Qualität zu.',
        traits: ['Strategischer Denker', 'Qualitätsorientiert', 'Effizient', 'Systematische Führung', 'Leistungsorientiert'],
        teamRole: 'Sie führen klar und behalten das Detail im Blick. Vision plus Präzision macht Sie stark bei komplexen Fragestellungen.',
        complements: ['I-Profile für Teammotivation', 'S-Profile für den Beziehungsaufbau', 'I/S-Profile für Teamharmonie']
      },
      'I/D': {
        name: 'MOTIVATOR',
        description: 'Begeisterungsfähig und handlungsorientiert. Sie inspirieren andere und steuern zugleich auf Ergebnisse zu.',
        traits: ['Inspirierend', 'Handlungsorientiert', 'Sozial sicher', 'Zielorientiert', 'Optimistisch'],
        teamRole: 'Sie geben Teams Energie, ohne das Ergebnis aus den Augen zu verlieren. Das macht Sie in schnelllebigen Umfeldern wirksam.',
        complements: ['S-Profile für Stabilität', 'C-Profile für detaillierte Analyse', 'S/C-Profile für stabile Umsetzung']
      },
      'I/S': {
        name: 'ERMUTIGER',
        description: 'Warm und menschenzugewandt. Sie bringen Energie in eine Gruppe, ohne zu drängen, und merken es, wenn jemand Unterstützung braucht, bevor er darum bittet.',
        traits: ['Zugänglich', 'Ermutigend', 'Geduldiger Zuhörer', 'Begeisterungsfähig', 'Loyal'],
        teamRole: 'Sie sorgen dafür, dass Menschen sich sicher genug fühlen, etwas zu sagen. Optimismus und Beständigkeit sind gerade in Veränderungen wertvoll.',
        complements: ['D-Profile für klare Richtung', 'C-Profile für Struktur und Gründlichkeit', 'D/C-Profile für strategische Führung']
      },
      'I/C': {
        name: 'PROMOTER',
        description: 'Menschenorientiert mit Sinn für Qualität. Sie bringen Ideen und Lösungen voran und achten darauf, dass sie hohen Ansprüchen genügen.',
        traits: ['Überzeugend', 'Qualitätsbewusst', 'Kreativ', 'Sorgfältiger Kommunikator', 'Beziehungsorientiert'],
        teamRole: 'Sie sind stark darin, Ideen zu präsentieren und Konsens für tragfähige Lösungen zu schaffen. Soziales Geschick plus Detailgenauigkeit hilft in schwierigen Verhandlungen.',
        complements: ['D-Profile für Entscheidungen', 'S-Profile für die Umsetzung', 'D/S-Profile für Führung und Stabilität']
      },
      'S/D': {
        name: 'ANKER',
        description: 'Zuerst beständig, aber bereit, die Führung zu übernehmen. Sie halten den Alltag zusammen und treten entschlossen vor, wenn es nötig ist.',
        traits: ['Geerdet', 'Verlässlich', 'Leise bestimmt', 'Praktisch', 'Schützend für das Team'],
        teamRole: 'Sie sind derjenige, auf den sich ein Team stützt, wenn es turbulent wird. Sie fangen Druck ab, statt ihn weiterzugeben, und entscheiden, wenn es sonst niemand tut.',
        complements: ['I-Profile für Sichtbarkeit und Energie', 'C-Profile für detaillierte Analyse', 'I/C-Profile für überzeugende Kommunikation']
      },
      'S/I': {
        name: 'VERBINDER',
        description: 'Beziehungsorientiert und unterstützend. Sie bauen starke Verbindungen auf, halten die Ruhe und fördern die Zusammenarbeit.',
        traits: ['Teambildner', 'Unterstützend', 'Kooperativ', 'Ermutigend', 'Diplomatisch'],
        teamRole: 'Sie sind stark darin, Menschen zusammenzubringen und die Teamdynamik gesund zu halten. Ihre Wärme und Beständigkeit schaffen ein Umfeld, in dem andere ihr Bestes geben.',
        complements: ['D-Profile für die Richtung', 'C-Profile für analytische Aufgaben', 'D/C-Profile für strategische Führung']
      },
      'S/C': {
        name: 'UNTERSTÜTZER',
        description: 'Beständig und detailorientiert. Sie liefern verlässliche Arbeit hoher Qualität und halten Team und Prozess zusammen.',
        traits: ['Verlässlich', 'Detailorientiert', 'Loyal', 'Prozessorientiert', 'Qualitätsbewusst'],
        teamRole: 'Sie sind das Rückgrat des Tagesgeschäfts und sorgen für gleichbleibende Qualität und verlässliche Lieferung. Gründlichkeit und Loyalität machen Sie langfristig unverzichtbar.',
        complements: ['D-Profile für Führung', 'I-Profile für Innovation', 'D/I-Profile für dynamische Führung']
      },
      'C/D': {
        name: 'ANALYST',
        description: 'Analytisch und ergebnisorientiert. Sie lösen komplexe Probleme systematisch und steuern zugleich auf ein effizientes Ergebnis zu.',
        traits: ['Problemlöser', 'Systematisch', 'Ergebnisorientiert', 'Logisch', 'Effizient'],
        teamRole: 'Sie führen analytisch und gehen schwierige Fragen datengetrieben an. Analyse plus Handlungsorientierung führt zur besten Lösung.',
        complements: ['I-Profile für Teamengagement', 'S-Profile für Beziehungspflege', 'I/S-Profile für Teamharmonie']
      },
      'C/I': {
        name: 'KOORDINATOR',
        description: 'Detailorientiert und menschenorientiert. Sie koordinieren komplexe Arbeit und halten dabei Beziehungen gut und Qualität hoch.',
        traits: ['Organisiert', 'Kooperativ', 'Detailorientiert', 'Kommunikativ', 'Qualitätsgetrieben'],
        teamRole: 'Sie sind stark bei Arbeit, die Präzision und Abstimmung zugleich verlangt. Organisieren ohne die Beziehung zu verlieren ist überall wertvoll, wo in mehrere Richtungen berichtet wird.',
        complements: ['D-Profile für strategische Richtung', 'S-Profile für stabile Unterstützung', 'D/S-Profile für Führung und Stabilität']
      },
      'C/S': {
        name: 'PRÜFER',
        description: 'Präzise und ohne Hast. Ihnen ist wichtig, dass die Arbeit stimmt, nicht dass sie schnell fertig ist, und Sie bauen die Kontrollen, die kleine Fehler nicht teuer werden lassen.',
        traits: ['Methodisch', 'Genau', 'Geduldig', 'Risikobewusst', 'Beständig'],
        teamRole: 'Sie sind das Qualitätsgewissen des Teams. Sie sehen den Fehler im Plan, bevor er live geht, und halten den Standard, wenn alle anderen es eilig haben.',
        complements: ['D-Profile für klare Richtung', 'I-Profile für Schwung und Zustimmung', 'D/I-Profile für dynamische Führung']
      }
    }
  },

  es: {
    styles: {
      D: {
        name: 'Dominancia',
        description: 'Directo, orientado a resultados, firme, decidido y contundente',
        traits: ['Decidido', 'Competitivo', 'Orientado a resultados', 'Comunicación directa'],
        tips: [
          'Sé directo y ve al grano',
          'Céntrate en los resultados',
          'Ofrece opciones y deja elegir',
          'Evita el exceso de detalle y la charla informal'
        ]
      },
      I: {
        name: 'Influencia',
        description: 'Extrovertido, entusiasta, optimista, animado y vivaz',
        traits: ['Entusiasta', 'Persuasivo', 'Orientado a las personas', 'Optimista'],
        tips: [
          'Sé entusiasta y enérgico',
          'Deja tiempo para el trato informal',
          'Usa historias y ejemplos',
          'Ofrece reconocimiento y elogios'
        ]
      },
      S: {
        name: 'Estabilidad',
        description: 'Ecuánime, complaciente, paciente, humilde y con tacto',
        traits: ['Fiable', 'Paciente', 'Orientado al equipo', 'Buen oyente'],
        tips: [
          'Sé paciente y ofrece apoyo',
          'Aporta seguridad y estabilidad',
          'Da tiempo para decidir',
          'Muestra aprecio por su lealtad'
        ]
      },
      C: {
        name: 'Concienzudo',
        description: 'Reservado, analítico, lógico, de pensamiento crítico y discreto',
        traits: ['Analítico', 'Preciso', 'Orientado a la calidad', 'Sistemático'],
        tips: [
          'Aporta información detallada',
          'Ven preparado con datos y hechos',
          'Deja tiempo para analizar',
          'Céntrate en la calidad y la exactitud'
        ]
      }
    },
    combinations: {
      'D/I': {
        name: 'INICIADOR',
        description: 'Orientado a resultados y a las personas. Pones en marcha iniciativas e inspiras a otros a seguirte, incluso hacia metas ambiciosas.',
        traits: ['Líder carismático', 'Orientado a objetivos', 'Persuasivo', 'Enérgico', 'Asume riesgos'],
        teamRole: 'Destacas al lanzar proyectos nuevos y reunir apoyos. Tu mezcla de empuje y entusiasmo te permite marcar el rumbo y conseguir adhesión.',
        complements: ['Perfiles S/C para la ejecución detallada', 'Perfiles C para el apoyo analítico', 'Perfiles S para una implantación estable']
      },
      'D/S': {
        name: 'IMPULSOR',
        description: 'Orientado a resultados con mano firme. Empujas hacia el resultado sin agitar al equipo, y terminas lo que empiezas.',
        traits: ['Decidido', 'Persistente', 'Sereno bajo presión', 'Fiable', 'Orientado al resultado'],
        teamRole: 'Mantienes el ritmo mucho después de que el entusiasmo inicial se apague. Empuje y paciencia encajan con el trabajo que exige impulso y aguante a la vez.',
        complements: ['Perfiles I para energía y visibilidad', 'Perfiles C para un análisis riguroso', 'Perfiles I/C para una comunicación cuidada']
      },
      'D/C': {
        name: 'LÍDER',
        description: 'Orientado a resultados con precisión analítica. Decides con datos y buscas resultados eficientes y de alta calidad.',
        traits: ['Pensador estratégico', 'Orientado a la calidad', 'Eficiente', 'Líder sistemático', 'Orientado al rendimiento'],
        teamRole: 'Lideras con firmeza sin descuidar el detalle. Unir visión y precisión te hace eficaz ante problemas complejos.',
        complements: ['Perfiles I para motivar al equipo', 'Perfiles S para construir relaciones', 'Perfiles I/S para la armonía del equipo']
      },
      'I/D': {
        name: 'MOTIVADOR',
        description: 'Entusiasta y orientado a la acción. Inspiras a los demás mientras empujas hacia el resultado: energía social al servicio de los objetivos.',
        traits: ['Inspirador', 'Orientado a la acción', 'Seguro socialmente', 'Orientado a objetivos', 'Optimista'],
        teamRole: 'Das energía al equipo sin perder de vista el resultado, lo que te hace eficaz en entornos que se mueven rápido.',
        complements: ['Perfiles S para la estabilidad', 'Perfiles C para el análisis detallado', 'Perfiles S/C para una ejecución estable']
      },
      'I/S': {
        name: 'ALENTADOR',
        description: 'Cercano y centrado en las personas. Aportas energía sin forzar, y notas cuándo alguien necesita apoyo antes de que lo pida.',
        traits: ['Accesible', 'Alentador', 'Oyente paciente', 'Entusiasta', 'Leal'],
        teamRole: 'Consigues que la gente se sienta lo bastante segura para hablar. Tu mezcla de optimismo y estabilidad cuenta en los cambios, cuando hace falta tranquilizar y avanzar a la vez.',
        complements: ['Perfiles D para una dirección firme', 'Perfiles C para estructura y rigor', 'Perfiles D/C para un liderazgo estratégico']
      },
      'I/C': {
        name: 'PROMOTOR',
        description: 'Orientado a las personas con atención a la calidad. Impulsas ideas y soluciones asegurándote de que estén a la altura.',
        traits: ['Persuasivo', 'Consciente de la calidad', 'Creativo', 'Comunicador riguroso', 'Orientado a la relación'],
        teamRole: 'Destacas presentando ideas y construyendo consenso en torno a soluciones sólidas. Habilidad social y atención al detalle ayudan en negociaciones complejas.',
        complements: ['Perfiles D para decidir', 'Perfiles S para la implantación', 'Perfiles D/S para liderazgo y estabilidad']
      },
      'S/D': {
        name: 'ANCLA',
        description: 'Estable ante todo, pero dispuesto a tomar la iniciativa. Sostienes el día a día y das un paso al frente con decisión cuando hace falta.',
        traits: ['Con los pies en la tierra', 'Fiable', 'Firme sin ruido', 'Práctico', 'Protector del equipo'],
        teamRole: 'Eres aquel en quien se apoya el equipo cuando vienen curvas. Absorbes la presión en lugar de trasladarla, y decides cuando nadie más lo hace.',
        complements: ['Perfiles I para visibilidad y energía', 'Perfiles C para el análisis detallado', 'Perfiles I/C para una comunicación persuasiva']
      },
      'S/I': {
        name: 'CONECTOR',
        description: 'Orientado a la relación y al apoyo. Creas vínculos sólidos, mantienes la calma y animas a la gente a trabajar junta.',
        traits: ['Constructor de equipo', 'Solidario', 'Colaborativo', 'Alentador', 'Diplomático'],
        teamRole: 'Destacas uniendo a la gente y manteniendo sana la dinámica del equipo. Tu calidez y estabilidad crean un entorno donde los demás dan lo mejor.',
        complements: ['Perfiles D para marcar el rumbo', 'Perfiles C para tareas analíticas', 'Perfiles D/C para un liderazgo estratégico']
      },
      'S/C': {
        name: 'APOYO',
        description: 'Estable y detallista. Entregas trabajo fiable y de calidad mientras sostienes al equipo y respetas el proceso.',
        traits: ['Fiable', 'Detallista', 'Leal', 'Orientado al proceso', 'Consciente de la calidad'],
        teamRole: 'Eres la columna vertebral del funcionamiento diario: calidad constante y entrega fiable. Tu minuciosidad y lealtad son valiosas a largo plazo.',
        complements: ['Perfiles D para el liderazgo', 'Perfiles I para la innovación', 'Perfiles D/I para un liderazgo dinámico']
      },
      'C/D': {
        name: 'ANALISTA',
        description: 'Analítico y orientado a resultados. Resuelves problemas complejos de forma sistemática mientras buscas un resultado eficiente.',
        traits: ['Solucionador de problemas', 'Sistemático', 'Orientado a resultados', 'Lógico', 'Eficiente'],
        teamRole: 'Aportas liderazgo analítico y abordas los retos difíciles con datos. Análisis más orientación a la acción llevan a la mejor solución.',
        complements: ['Perfiles I para implicar al equipo', 'Perfiles S para gestionar relaciones', 'Perfiles I/S para la armonía del equipo']
      },
      'C/I': {
        name: 'COORDINADOR',
        description: 'Detallista y centrado en las personas. Coordinas trabajos complejos manteniendo buenas relaciones y alta calidad.',
        traits: ['Organizado', 'Colaborativo', 'Atento al detalle', 'Comunicativo', 'Exigente con la calidad'],
        teamRole: 'Destacas en trabajos que exigen precisión y coordinación. Organizar sin dañar la relación es valioso allí donde se responde en varias direcciones.',
        complements: ['Perfiles D para la dirección estratégica', 'Perfiles S para un apoyo estable', 'Perfiles D/S para liderazgo y estabilidad']
      },
      'C/S': {
        name: 'EVALUADOR',
        description: 'Preciso y sin prisa. Quieres que el trabajo esté bien antes que rápido, y montas los controles que evitan que un fallo pequeño salga caro.',
        traits: ['Metódico', 'Exacto', 'Paciente', 'Consciente del riesgo', 'Constante'],
        teamRole: 'Eres la conciencia de calidad del equipo. Ves el fallo del plan antes de que salga y mantienes el nivel cuando todos tienen prisa.',
        complements: ['Perfiles D para una dirección firme', 'Perfiles I para impulso y adhesión', 'Perfiles D/I para un liderazgo dinámico']
      }
    }
  }
}
