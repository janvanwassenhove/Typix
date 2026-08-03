import type { Centre } from '../../scoring/enneagram'
import type { SeparationBand, SpreadBand } from '../../scoring/profile'
import type { Localized } from './locale'

export interface ShapeContent {
  label: string
  description: string
}

export interface ProfileContent {
  /** How concentrated the profile is. Worded so it fits any assessment. */
  shape: Record<SpreadBand, ShapeContent>
  /** How far the leader sits ahead of the runner-up. `{first} {second} {gap}`. */
  separation: Record<SeparationBand, string>
  /** Only shown when the answering pattern compresses the differences. */
  responseStyle: Record<'agreeable' | 'reserved' | 'uniform', string>
  /** The three Enneagram centres of intelligence. */
  centres: Record<Centre, ShapeContent>
}

export const profileContent: Localized<ProfileContent> = {
  en: {
    shape: {
      balanced: {
        label: 'Well balanced',
        description: 'Your answers are spread fairly evenly. Adapting to the situation is a strength, but it also means no single result stands far out from the rest.'
      },
      moderate: {
        label: 'Clearly leaning',
        description: 'You have clear preferences while keeping some range. The leading result shapes the picture without crowding out the others.'
      },
      focused: {
        label: 'Strongly defined',
        description: 'Your answers concentrate heavily on a few areas. That makes the result well defined, and worth weighing against the areas you rarely chose.'
      }
    },
    separation: {
      distinct: '{first} sits {gap} points ahead of {second}, so the headline result stands clear of the alternatives.',
      close: '{first} and {second} are only {gap} points apart. Read both — the second may describe you just as well.',
      tied: '{first} and {second} are effectively level, {gap} points apart. Treat the headline result as one of two readings rather than a settled answer.'
    },
    responseStyle: {
      agreeable: 'You agreed with most of the statements. That lifts every type at once, so the differences between them are smaller than they look.',
      reserved: 'You disagreed with most of the statements. Every type scores low, so the ranking rests on relatively few clear preferences.',
      uniform: 'Your answers stayed close to one another. With little variation between them, the types end up bunched together.'
    },
    centres: {
      gut: {
        label: 'Body centre (8, 9, 1)',
        description: 'These types meet the world through instinct and action. Their shared tension is anger — expressed, avoided, or held in.'
      },
      heart: {
        label: 'Heart centre (2, 3, 4)',
        description: 'These types meet the world through feeling and relationship. Their shared tension is shame — about image, worth, or identity.'
      },
      head: {
        label: 'Head centre (5, 6, 7)',
        description: 'These types meet the world through thinking and anticipation. Their shared tension is fear — met with knowledge, loyalty, or distraction.'
      }
    }
  },

  nl: {
    shape: {
      balanced: {
        label: 'Goed in balans',
        description: 'Je antwoorden liggen redelijk gelijkmatig verdeeld. Je aanpassen aan de situatie is een sterkte, maar het betekent ook dat geen enkele uitkomst er ver bovenuit steekt.'
      },
      moderate: {
        label: 'Duidelijk neigend',
        description: 'Je hebt duidelijke voorkeuren en houdt tegelijk wat bandbreedte. De hoogste uitkomst bepaalt het beeld zonder de andere te verdringen.'
      },
      focused: {
        label: 'Sterk uitgesproken',
        description: 'Je antwoorden concentreren zich sterk op enkele gebieden. Dat maakt de uitkomst scherp, en de moeite waard om af te zetten tegen wat je zelden koos.'
      }
    },
    separation: {
      distinct: '{first} ligt {gap} punten voor op {second}, dus de hoofduitkomst steekt duidelijk uit boven de alternatieven.',
      close: '{first} en {second} liggen maar {gap} punten uit elkaar. Lees ze allebei — de tweede past mogelijk net zo goed bij je.',
      tied: '{first} en {second} liggen praktisch gelijk, {gap} punten uit elkaar. Behandel de hoofduitkomst als een van twee lezingen, niet als een vaststaand antwoord.'
    },
    responseStyle: {
      agreeable: 'Je was het met de meeste uitspraken eens. Dat tilt alle types tegelijk op, waardoor de verschillen ertussen kleiner zijn dan ze lijken.',
      reserved: 'Je was het met weinig uitspraken eens. Alle types scoren laag, waardoor de rangorde op relatief weinig duidelijke voorkeuren rust.',
      uniform: 'Je antwoorden lagen dicht bij elkaar. Met weinig variatie ertussen komen de types dicht op elkaar uit.'
    },
    centres: {
      gut: {
        label: 'Buikcentrum (8, 9, 1)',
        description: 'Deze types benaderen de wereld via instinct en handelen. Hun gedeelde spanning is boosheid — geuit, vermeden of ingehouden.'
      },
      heart: {
        label: 'Hartcentrum (2, 3, 4)',
        description: 'Deze types benaderen de wereld via gevoel en relatie. Hun gedeelde spanning is schaamte — over imago, waarde of identiteit.'
      },
      head: {
        label: 'Hoofdcentrum (5, 6, 7)',
        description: 'Deze types benaderen de wereld via denken en anticiperen. Hun gedeelde spanning is angst — beantwoord met kennis, loyaliteit of afleiding.'
      }
    }
  },

  fr: {
    shape: {
      balanced: {
        label: 'Bien équilibré',
        description: 'Vos réponses se répartissent assez uniformément. S’adapter à la situation est une force, mais cela signifie aussi qu’aucun résultat ne se détache nettement.'
      },
      moderate: {
        label: 'Nettement orienté',
        description: 'Vous avez des préférences claires tout en gardant de l’amplitude. Le résultat de tête dessine le tableau sans écraser les autres.'
      },
      focused: {
        label: 'Fortement marqué',
        description: 'Vos réponses se concentrent fortement sur quelques domaines. Le résultat est donc net, et mérite d’être pesé face à ce que vous avez rarement choisi.'
      }
    },
    separation: {
      distinct: '{first} devance {second} de {gap} points : le résultat principal se détache clairement des autres.',
      close: '{first} et {second} ne sont séparés que de {gap} points. Lisez les deux — le second vous décrit peut-être tout aussi bien.',
      tied: '{first} et {second} sont pratiquement à égalité, à {gap} points. Traitez le résultat principal comme l’une des deux lectures possibles, pas comme une réponse arrêtée.'
    },
    responseStyle: {
      agreeable: 'Vous avez approuvé la plupart des affirmations. Cela remonte tous les types en même temps : les écarts entre eux sont plus faibles qu’ils n’en ont l’air.',
      reserved: 'Vous avez rejeté la plupart des affirmations. Tous les types obtiennent des scores bas, et le classement repose sur peu de préférences nettes.',
      uniform: 'Vos réponses sont restées proches les unes des autres. Avec si peu de variation, les types se retrouvent groupés.'
    },
    centres: {
      gut: {
        label: 'Centre instinctif (8, 9, 1)',
        description: 'Ces types abordent le monde par l’instinct et l’action. Leur tension commune est la colère — exprimée, évitée ou contenue.'
      },
      heart: {
        label: 'Centre émotionnel (2, 3, 4)',
        description: 'Ces types abordent le monde par le ressenti et la relation. Leur tension commune est la honte — de l’image, de la valeur ou de l’identité.'
      },
      head: {
        label: 'Centre mental (5, 6, 7)',
        description: 'Ces types abordent le monde par la pensée et l’anticipation. Leur tension commune est la peur — affrontée par le savoir, la loyauté ou la distraction.'
      }
    }
  },

  de: {
    shape: {
      balanced: {
        label: 'Gut ausbalanciert',
        description: 'Ihre Antworten verteilen sich ziemlich gleichmäßig. Sich der Situation anzupassen ist eine Stärke, bedeutet aber auch, dass kein Ergebnis deutlich heraussticht.'
      },
      moderate: {
        label: 'Deutlich geneigt',
        description: 'Sie haben klare Vorlieben und behalten zugleich Bandbreite. Das führende Ergebnis prägt das Bild, ohne die anderen zu verdrängen.'
      },
      focused: {
        label: 'Stark ausgeprägt',
        description: 'Ihre Antworten konzentrieren sich stark auf wenige Bereiche. Das macht das Ergebnis klar und lohnt eine Abwägung gegen das, was Sie selten gewählt haben.'
      }
    },
    separation: {
      distinct: '{first} liegt {gap} Punkte vor {second}; das Hauptergebnis hebt sich klar von den Alternativen ab.',
      close: '{first} und {second} liegen nur {gap} Punkte auseinander. Lesen Sie beide — das zweite beschreibt Sie womöglich ebenso gut.',
      tied: '{first} und {second} liegen praktisch gleichauf, {gap} Punkte auseinander. Behandeln Sie das Hauptergebnis als eine von zwei Lesarten, nicht als feststehende Antwort.'
    },
    responseStyle: {
      agreeable: 'Sie haben den meisten Aussagen zugestimmt. Das hebt alle Typen zugleich an, sodass die Unterschiede kleiner sind, als sie wirken.',
      reserved: 'Sie haben den meisten Aussagen widersprochen. Alle Typen erreichen niedrige Werte, und die Rangfolge beruht auf wenigen klaren Vorlieben.',
      uniform: 'Ihre Antworten lagen nah beieinander. Bei so wenig Streuung rücken die Typen dicht zusammen.'
    },
    centres: {
      gut: {
        label: 'Bauchzentrum (8, 9, 1)',
        description: 'Diese Typen begegnen der Welt über Instinkt und Handeln. Ihre gemeinsame Spannung ist Wut — ausgedrückt, vermieden oder zurückgehalten.'
      },
      heart: {
        label: 'Herzzentrum (2, 3, 4)',
        description: 'Diese Typen begegnen der Welt über Gefühl und Beziehung. Ihre gemeinsame Spannung ist Scham — über Image, Wert oder Identität.'
      },
      head: {
        label: 'Kopfzentrum (5, 6, 7)',
        description: 'Diese Typen begegnen der Welt über Denken und Vorwegnehmen. Ihre gemeinsame Spannung ist Angst — beantwortet mit Wissen, Loyalität oder Ablenkung.'
      }
    }
  },

  es: {
    shape: {
      balanced: {
        label: 'Bien equilibrado',
        description: 'Tus respuestas se reparten de forma bastante pareja. Adaptarte a la situación es una fortaleza, pero también significa que ningún resultado destaca claramente sobre el resto.'
      },
      moderate: {
        label: 'Claramente inclinado',
        description: 'Tienes preferencias claras conservando cierto rango. El resultado principal marca el cuadro sin desplazar a los demás.'
      },
      focused: {
        label: 'Muy marcado',
        description: 'Tus respuestas se concentran mucho en unas pocas áreas. Eso hace el resultado nítido, y conviene sopesarlo frente a lo que casi nunca elegiste.'
      }
    },
    separation: {
      distinct: '{first} aventaja a {second} en {gap} puntos, así que el resultado principal destaca con claridad sobre las alternativas.',
      close: '{first} y {second} están separados por solo {gap} puntos. Lee los dos: el segundo puede describirte igual de bien.',
      tied: '{first} y {second} están prácticamente empatados, a {gap} puntos. Trata el resultado principal como una de dos lecturas, no como una respuesta cerrada.'
    },
    responseStyle: {
      agreeable: 'Estuviste de acuerdo con la mayoría de las afirmaciones. Eso eleva todos los tipos a la vez, así que las diferencias entre ellos son menores de lo que parecen.',
      reserved: 'Estuviste en desacuerdo con la mayoría de las afirmaciones. Todos los tipos puntúan bajo, y el orden se apoya en pocas preferencias claras.',
      uniform: 'Tus respuestas se mantuvieron cercanas entre sí. Con tan poca variación, los tipos acaban agrupados.'
    },
    centres: {
      gut: {
        label: 'Centro instintivo (8, 9, 1)',
        description: 'Estos tipos abordan el mundo desde el instinto y la acción. Su tensión compartida es la ira: expresada, evitada o contenida.'
      },
      heart: {
        label: 'Centro emocional (2, 3, 4)',
        description: 'Estos tipos abordan el mundo desde el sentir y el vínculo. Su tensión compartida es la vergüenza: por la imagen, el valor o la identidad.'
      },
      head: {
        label: 'Centro mental (5, 6, 7)',
        description: 'Estos tipos abordan el mundo desde el pensar y el anticipar. Su tensión compartida es el miedo: afrontado con conocimiento, lealtad o distracción.'
      }
    }
  }
}
