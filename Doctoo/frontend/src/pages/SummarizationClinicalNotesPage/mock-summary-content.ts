export const mockSummaryContent = {
  doctorNote:
    'Client’s Subjective Concerns/Chief Complaint: “I’m starting to feel more depressed.” Client noted concerns about his mood, endorsing depressed mood, lethargy, insomnia, loss of energy and motivation, and urges to isolate from his romantic partner. Clinical Observations: Client appeared disheveled, which is unusual for him, and a marked change since last session. Client sat in a hunched position upon the beginning of the session, and appeared tired, with slowed movements and dysthymic mood. He was attentive and cooperative, and had congruent and appropriate affect. Client denies suicidal ideation. Issues and Stressors Discussed/Session Description: Client discussed experiencing increased difficulty with depressive symptoms beginning last week, following an argument with his romantic partner. Client reviewed the details of the argument, and stated that it occurred late on Tuesday night, causing him to get only 4 hours of sleep. Client has continued to attend work, and reports compliance with prescribed medication. In addition, the patient has complaints of headaches, chest tightness, fractures of the arms and legs, and pain in the heart. Taking all this into account, the following medications should be prescribed: Ibuprofen 20 mg 3 times a day. 6 morphine tablets, one every 4 hours. A spoonful of strepsils twice a day.',
  appointment_id: 1,
  summary: {
    entityMentionsTypesMap: {
      PROBLEM: [
        {
          mentionId: '1',
          type: 'PROBLEM',
          text: {
            content: 'depressed',
            beginOffset: 73,
          },
          linkedEntities: [
            {
              entityId: 'UMLS/C0011570',
            },
            {
              entityId: 'UMLS/C0011581',
            },
            {
              entityId: 'UMLS/C0344315',
            },
          ],
          temporalAssessment: {
            value: 'CURRENT',
            confidence: 0.9858852624893188,
          },
          certaintyAssessment: {
            value: 'LIKELY',
            confidence: 0.9713048338890076,
          },
          subject: {
            value: 'PATIENT',
            confidence: 0.9996227622032166,
          },
          confidence: 0.7717435956001282,
        },
        {
          mentionId: '3',
          type: 'PROBLEM',
          text: {
            content: 'depressed mood',
            beginOffset: 133,
          },
          linkedEntities: [
            {
              entityId: 'UMLS/C0344315',
            },
          ],
          temporalAssessment: {
            value: 'CURRENT',
            confidence: 0.9993951916694641,
          },
          certaintyAssessment: {
            value: 'LIKELY',
            confidence: 0.9976242184638977,
          },
          subject: {
            value: 'PATIENT',
            confidence: 0.9996469616889954,
          },
          confidence: 0.6815552115440369,
        },
        {
          mentionId: '4',
          type: 'PROBLEM',
          text: {
            content: 'lethargy',
            beginOffset: 149,
          },
          linkedEntities: [
            {
              entityId: 'UMLS/C0023380',
            },
          ],
          temporalAssessment: {
            value: 'CURRENT',
            confidence: 0.9996227622032166,
          },
          certaintyAssessment: {
            value: 'LIKELY',
            confidence: 0.9894915819168091,
          },
          subject: {
            value: 'PATIENT',
            confidence: 0.9996469616889954,
          },
          confidence: 0.9912155270576477,
        },
        {
          mentionId: '5',
          type: 'PROBLEM',
          text: {
            content: 'insomnia',
            beginOffset: 159,
          },
          linkedEntities: [
            {
              entityId: 'UMLS/C0917801',
            },
          ],
          temporalAssessment: {
            value: 'CURRENT',
            confidence: 0.9996985197067261,
          },
          certaintyAssessment: {
            value: 'LIKELY',
            confidence: 0.9974998235702515,
          },
          subject: {
            value: 'PATIENT',
            confidence: 0.9996469616889954,
          },
          confidence: 0.9932747483253479,
        },
        {
          mentionId: '6',
          type: 'PROBLEM',
          text: {
            content: 'loss of energy',
            beginOffset: 169,
          },
          linkedEntities: [
            {
              entityId: 'UMLS/C3176501',
            },
          ],
          temporalAssessment: {
            value: 'CURRENT',
            confidence: 0.9995849132537842,
          },
          certaintyAssessment: {
            value: 'LIKELY',
            confidence: 0.9785231351852417,
          },
          subject: {
            value: 'PATIENT',
            confidence: 0.9996469616889954,
          },
          confidence: 0.7478339076042175,
        },
        {
          mentionId: '7',
          type: 'PROBLEM',
          text: {
            content: 'tired',
            beginOffset: 446,
          },
          linkedEntities: [
            {
              entityId: 'UMLS/C0015672',
            },
          ],
          temporalAssessment: {
            value: 'CURRENT',
            confidence: 0.9968925714492798,
          },
          certaintyAssessment: {
            value: 'LIKELY',
            confidence: 0.9987373948097229,
          },
          subject: {
            value: 'PATIENT',
            confidence: 0.9996469616889954,
          },
          confidence: 0.56215900182724,
        },
        {
          mentionId: '8',
          type: 'PROBLEM',
          text: {
            content: 'slowed movements',
            beginOffset: 458,
          },
          linkedEntities: [
            {
              entityId: 'UMLS/C0233565',
            },
          ],
          temporalAssessment: {
            value: 'CURRENT',
            confidence: 0.9942952394485474,
          },
          certaintyAssessment: {
            value: 'LIKELY',
            confidence: 0.99177485704422,
          },
          subject: {
            value: 'PATIENT',
            confidence: 0.9994842410087585,
          },
          confidence: 0.395768404006958,
        },
        {
          mentionId: '9',
          type: 'PROBLEM',
          text: {
            content: 'dysthymic mood',
            beginOffset: 479,
          },
          linkedEntities: [
            {
              entityId: 'UMLS/C0013415',
            },
          ],
          temporalAssessment: {
            value: 'CURRENT',
            confidence: 0.9810214638710022,
          },
          certaintyAssessment: {
            value: 'LIKELY',
            confidence: 0.997525691986084,
          },
          subject: {
            value: 'PATIENT',
            confidence: 0.9989042282104492,
          },
          confidence: 0.5004895925521851,
        },
        {
          mentionId: '10',
          type: 'PROBLEM',
          text: {
            content: 'suicidal ideation',
            beginOffset: 585,
          },
          linkedEntities: [
            {
              entityId: 'UMLS/C0424000',
            },
          ],
          temporalAssessment: {
            value: 'CURRENT',
            confidence: 0.9966638088226318,
          },
          certaintyAssessment: {
            value: 'UNLIKELY',
            confidence: 0.9986321330070496,
          },
          subject: {
            value: 'PATIENT',
            confidence: 0.9996469616889954,
          },
          confidence: 0.9408866763114929,
        },
        {
          mentionId: '11',
          type: 'PROBLEM',
          text: {
            content: 'Issues',
            beginOffset: 604,
          },
          linkedEntities: [
            {
              entityId: 'UMLS/C0033213',
            },
          ],
          temporalAssessment: {
            value: 'CURRENT',
            confidence: 0.9955281019210815,
          },
          certaintyAssessment: {
            value: 'LIKELY',
            confidence: 0.6473665237426758,
          },
          subject: {
            value: 'PATIENT',
            confidence: 0.9996469616889954,
          },
          confidence: 0.6027544140815735,
        },
        {
          mentionId: '12',
          type: 'PROBLEM',
          text: {
            content: 'Stressors',
            beginOffset: 615,
          },
          linkedEntities: [
            {
              entityId: 'UMLS/C0038443',
            },
            {
              entityId: 'UMLS/C0178815',
            },
            {
              entityId: 'UMLS/C3842878',
            },
          ],
          temporalAssessment: {
            value: 'CURRENT',
            confidence: 0.9924143552780151,
          },
          certaintyAssessment: {
            value: 'LIKELY',
            confidence: 0.7895716428756714,
          },
          subject: {
            value: 'PATIENT',
            confidence: 0.9996469616889954,
          },
          confidence: 0.5507025122642517,
        },
        {
          mentionId: '13',
          type: 'PROBLEM',
          text: {
            content: 'depressive symptoms',
            beginOffset: 712,
          },
          linkedEntities: [
            {
              entityId: 'UMLS/C0086132',
            },
            {
              entityId: 'UMLS/C1579931',
            },
          ],
          temporalAssessment: {
            value: 'CURRENT',
            confidence: 0.704767107963562,
          },
          certaintyAssessment: {
            value: 'LIKELY',
            confidence: 0.9703289866447449,
          },
          subject: {
            value: 'PATIENT',
            confidence: 0.9995327591896057,
          },
          confidence: 0.9398286938667297,
        },
        {
          mentionId: '15',
          type: 'PROBLEM',
          text: {
            content: 'headaches',
            beginOffset: 1071,
          },
          linkedEntities: [
            {
              entityId: 'UMLS/C0018681',
            },
          ],
          temporalAssessment: {
            value: 'CURRENT',
            confidence: 0.9619466662406921,
          },
          certaintyAssessment: {
            value: 'LIKELY',
            confidence: 0.990967333316803,
          },
          subject: {
            value: 'PATIENT',
            confidence: 0.9996856451034546,
          },
          confidence: 0.9957436919212341,
        },
        {
          mentionId: '17',
          type: 'PROBLEM',
          text: {
            content: 'tightness',
            beginOffset: 1088,
          },
          linkedEntities: [
            {
              entityId: 'UMLS/C0232292',
            },
            {
              entityId: 'UMLS/C0241166',
            },
            {
              entityId: 'UMLS/C0730573',
            },
            {
              entityId: 'UMLS/C0877322',
            },
          ],
          temporalAssessment: {
            value: 'CURRENT',
            confidence: 0.8862980008125305,
          },
          certaintyAssessment: {
            value: 'LIKELY',
            confidence: 0.9795204997062683,
          },
          subject: {
            value: 'PATIENT',
            confidence: 0.9996469616889954,
          },
          confidence: 0.9867182374000549,
        },
        {
          mentionId: '18',
          type: 'PROBLEM',
          text: {
            content: 'fractures',
            beginOffset: 1099,
          },
          linkedEntities: [
            {
              entityId: 'UMLS/C0016658',
            },
            {
              entityId: 'UMLS/C4554413',
            },
          ],
          temporalAssessment: {
            value: 'CURRENT',
            confidence: 0.9532970786094666,
          },
          certaintyAssessment: {
            value: 'LIKELY',
            confidence: 0.9902867674827576,
          },
          subject: {
            value: 'PATIENT',
            confidence: 0.9996469616889954,
          },
          confidence: 0.9850212335586548,
        },
        {
          mentionId: '21',
          type: 'PROBLEM',
          text: {
            content: 'pain',
            beginOffset: 1135,
          },
          linkedEntities: [
            {
              entityId: 'UMLS/C0030193',
            },
          ],
          temporalAssessment: {
            value: 'CURRENT',
            confidence: 0.9460680484771729,
          },
          certaintyAssessment: {
            value: 'LIKELY',
            confidence: 0.991034746170044,
          },
          subject: {
            value: 'PATIENT',
            confidence: 0.9996856451034546,
          },
          confidence: 0.988801896572113,
        },
      ],
      BODY_FUNCTION: [
        {
          mentionId: '2',
          type: 'BODY_FUNCTION',
          text: {
            content: 'mood',
            beginOffset: 117,
          },
          linkedEntities: [
            {
              entityId: 'UMLS/C0026516',
            },
            {
              entityId: 'UMLS/C2713234',
            },
          ],
          temporalAssessment: {
            value: 'CURRENT',
            confidence: 0.9994829297065735,
          },
          certaintyAssessment: {
            value: 'LIKELY',
            confidence: 0.9996049404144287,
          },
          subject: {
            value: 'PATIENT',
            confidence: 0.9996469616889954,
          },
          confidence: 0.48124605417251587,
        },
      ],
      MEDICINE: [
        {
          mentionId: '14',
          type: 'MEDICINE',
          text: {
            content: 'medication',
            beginOffset: 1016,
          },
          linkedEntities: [
            {
              entityId: 'UMLS/C0013227',
            },
          ],
          temporalAssessment: {
            value: 'CURRENT',
            confidence: 0.956928551197052,
          },
          certaintyAssessment: {
            value: 'LIKELY',
            confidence: 0.9897561073303223,
          },
          subject: {
            value: 'PATIENT',
            confidence: 0.999046802520752,
          },
          confidence: 0.9448337554931641,
        },
        {
          mentionId: '23',
          type: 'MEDICINE',
          text: {
            content: 'medications',
            beginOffset: 1198,
          },
          linkedEntities: [
            {
              entityId: 'UMLS/C0013227',
            },
          ],
          temporalAssessment: {
            value: 'CURRENT',
            confidence: 0.9579027891159058,
          },
          certaintyAssessment: {
            value: 'LIKELY',
            confidence: 0.9974275827407837,
          },
          subject: {
            value: 'PATIENT',
            confidence: 0.999559760093689,
          },
          confidence: 0.5450941324234009,
        },
        {
          mentionId: '24',
          type: 'MEDICINE',
          text: {
            content: 'Ibuprofen',
            beginOffset: 1232,
          },
          linkedEntities: [
            {
              entityId: 'UMLS/C0020740',
            },
          ],
          temporalAssessment: {
            value: 'UPCOMING',
            confidence: 0.7161632180213928,
          },
          certaintyAssessment: {
            value: 'LIKELY',
            confidence: 0.8785431981086731,
          },
          subject: {
            value: 'PATIENT',
            confidence: 0.9995561838150024,
          },
          confidence: 0.9962401390075684,
        },
        {
          mentionId: '29',
          type: 'MEDICINE',
          text: {
            content: 'morphine',
            beginOffset: 1265,
          },
          linkedEntities: [
            {
              entityId: 'UMLS/C0026549',
            },
            {
              entityId: 'UMLS/C0026553',
            },
          ],
          temporalAssessment: {
            value: 'CURRENT',
            confidence: 0.620257556438446,
          },
          certaintyAssessment: {
            value: 'LIKELY',
            confidence: 0.8747679591178894,
          },
          subject: {
            value: 'PATIENT',
            confidence: 0.9993507862091064,
          },
          confidence: 0.9768913984298706,
        },
        {
          mentionId: '33',
          type: 'MEDICINE',
          text: {
            content: 'strepsils',
            beginOffset: 1316,
          },
          linkedEntities: [
            {
              entityId: 'UMLS/C0592141',
            },
          ],
          temporalAssessment: {
            value: 'CURRENT',
            confidence: 0.057481713593006134,
          },
          certaintyAssessment: {
            value: 'LIKELY',
            confidence: 0.057481713593006134,
          },
          subject: {
            value: 'PATIENT',
            confidence: 0.8191273808479309,
          },
          confidence: 0.6422738432884216,
        },
      ],
      ANATOMICAL_STRUCTURE: [
        {
          mentionId: '16',
          type: 'ANATOMICAL_STRUCTURE',
          text: {
            content: 'chest',
            beginOffset: 1082,
          },
          linkedEntities: [
            {
              entityId: 'UMLS/C0817096',
            },
          ],
          confidence: 0.9422274827957153,
        },
        {
          mentionId: '19',
          type: 'ANATOMICAL_STRUCTURE',
          text: {
            content: 'arms',
            beginOffset: 1116,
          },
          linkedEntities: [
            {
              entityId: 'UMLS/C0446516',
            },
          ],
          confidence: 0.9949317574501038,
        },
        {
          mentionId: '20',
          type: 'ANATOMICAL_STRUCTURE',
          text: {
            content: 'legs',
            beginOffset: 1125,
          },
          linkedEntities: [
            {
              entityId: 'UMLS/C1140621',
            },
          ],
          confidence: 0.9961537718772888,
        },
        {
          mentionId: '22',
          type: 'ANATOMICAL_STRUCTURE',
          text: {
            content: 'heart',
            beginOffset: 1147,
          },
          linkedEntities: [
            {
              entityId: 'UMLS/C0018787',
            },
            {
              entityId: 'UMLS/C4037974',
            },
          ],
          confidence: 0.9928666353225708,
        },
      ],
      MED_STRENGTH: [
        {
          mentionId: '25',
          type: 'MED_STRENGTH',
          text: {
            content: '20',
            beginOffset: 1242,
          },
          confidence: 0.9885463714599609,
        },
      ],
      MED_UNIT: [
        {
          mentionId: '26',
          type: 'MED_UNIT',
          text: {
            content: 'mg',
            beginOffset: 1245,
          },
          confidence: 0.9762817621231079,
        },
      ],
      MED_FREQUENCY: [
        {
          mentionId: '27',
          type: 'MED_FREQUENCY',
          text: {
            content: '3 times a day',
            beginOffset: 1248,
          },
          confidence: 0.9753290414810181,
        },
        {
          mentionId: '32',
          type: 'MED_FREQUENCY',
          text: {
            content: 'every 4 hours',
            beginOffset: 1287,
          },
          confidence: 0.9725239872932434,
        },
        {
          mentionId: '34',
          type: 'MED_FREQUENCY',
          text: {
            content: 'twice a day',
            beginOffset: 1326,
          },
          confidence: 0.8594827055931091,
        },
      ],
      MED_DOSE: [
        {
          mentionId: '28',
          type: 'MED_DOSE',
          text: {
            content: '6',
            beginOffset: 1263,
          },
          confidence: 0.44476228952407837,
        },
        {
          mentionId: '31',
          type: 'MED_DOSE',
          text: {
            content: 'one',
            beginOffset: 1283,
          },
          confidence: 0.4944850206375122,
        },
      ],
      MED_FORM: [
        {
          mentionId: '30',
          type: 'MED_FORM',
          text: {
            content: 'tablets',
            beginOffset: 1274,
          },
          linkedEntities: [
            {
              entityId: 'UMLS/C0039225',
            },
          ],
          confidence: 0.9304339289665222,
        },
      ],
    },
    entityMentions: [
      {
        mentionId: '1',
        type: 'PROBLEM',
        text: {
          content: 'depressed',
          beginOffset: 73,
        },
        linkedEntities: [
          {
            entityId: 'UMLS/C0011570',
          },
          {
            entityId: 'UMLS/C0011581',
          },
          {
            entityId: 'UMLS/C0344315',
          },
        ],
        temporalAssessment: {
          value: 'CURRENT',
          confidence: 0.9858852624893188,
        },
        certaintyAssessment: {
          value: 'LIKELY',
          confidence: 0.9713048338890076,
        },
        subject: {
          value: 'PATIENT',
          confidence: 0.9996227622032166,
        },
        confidence: 0.7717435956001282,
      },
      {
        mentionId: '2',
        type: 'BODY_FUNCTION',
        text: {
          content: 'mood',
          beginOffset: 117,
        },
        linkedEntities: [
          {
            entityId: 'UMLS/C0026516',
          },
          {
            entityId: 'UMLS/C2713234',
          },
        ],
        temporalAssessment: {
          value: 'CURRENT',
          confidence: 0.9994829297065735,
        },
        certaintyAssessment: {
          value: 'LIKELY',
          confidence: 0.9996049404144287,
        },
        subject: {
          value: 'PATIENT',
          confidence: 0.9996469616889954,
        },
        confidence: 0.48124605417251587,
      },
      {
        mentionId: '3',
        type: 'PROBLEM',
        text: {
          content: 'depressed mood',
          beginOffset: 133,
        },
        linkedEntities: [
          {
            entityId: 'UMLS/C0344315',
          },
        ],
        temporalAssessment: {
          value: 'CURRENT',
          confidence: 0.9993951916694641,
        },
        certaintyAssessment: {
          value: 'LIKELY',
          confidence: 0.9976242184638977,
        },
        subject: {
          value: 'PATIENT',
          confidence: 0.9996469616889954,
        },
        confidence: 0.6815552115440369,
      },
      {
        mentionId: '4',
        type: 'PROBLEM',
        text: {
          content: 'lethargy',
          beginOffset: 149,
        },
        linkedEntities: [
          {
            entityId: 'UMLS/C0023380',
          },
        ],
        temporalAssessment: {
          value: 'CURRENT',
          confidence: 0.9996227622032166,
        },
        certaintyAssessment: {
          value: 'LIKELY',
          confidence: 0.9894915819168091,
        },
        subject: {
          value: 'PATIENT',
          confidence: 0.9996469616889954,
        },
        confidence: 0.9912155270576477,
      },
      {
        mentionId: '5',
        type: 'PROBLEM',
        text: {
          content: 'insomnia',
          beginOffset: 159,
        },
        linkedEntities: [
          {
            entityId: 'UMLS/C0917801',
          },
        ],
        temporalAssessment: {
          value: 'CURRENT',
          confidence: 0.9996985197067261,
        },
        certaintyAssessment: {
          value: 'LIKELY',
          confidence: 0.9974998235702515,
        },
        subject: {
          value: 'PATIENT',
          confidence: 0.9996469616889954,
        },
        confidence: 0.9932747483253479,
      },
      {
        mentionId: '6',
        type: 'PROBLEM',
        text: {
          content: 'loss of energy',
          beginOffset: 169,
        },
        linkedEntities: [
          {
            entityId: 'UMLS/C3176501',
          },
        ],
        temporalAssessment: {
          value: 'CURRENT',
          confidence: 0.9995849132537842,
        },
        certaintyAssessment: {
          value: 'LIKELY',
          confidence: 0.9785231351852417,
        },
        subject: {
          value: 'PATIENT',
          confidence: 0.9996469616889954,
        },
        confidence: 0.7478339076042175,
      },
      {
        mentionId: '7',
        type: 'PROBLEM',
        text: {
          content: 'tired',
          beginOffset: 446,
        },
        linkedEntities: [
          {
            entityId: 'UMLS/C0015672',
          },
        ],
        temporalAssessment: {
          value: 'CURRENT',
          confidence: 0.9968925714492798,
        },
        certaintyAssessment: {
          value: 'LIKELY',
          confidence: 0.9987373948097229,
        },
        subject: {
          value: 'PATIENT',
          confidence: 0.9996469616889954,
        },
        confidence: 0.56215900182724,
      },
      {
        mentionId: '8',
        type: 'PROBLEM',
        text: {
          content: 'slowed movements',
          beginOffset: 458,
        },
        linkedEntities: [
          {
            entityId: 'UMLS/C0233565',
          },
        ],
        temporalAssessment: {
          value: 'CURRENT',
          confidence: 0.9942952394485474,
        },
        certaintyAssessment: {
          value: 'LIKELY',
          confidence: 0.99177485704422,
        },
        subject: {
          value: 'PATIENT',
          confidence: 0.9994842410087585,
        },
        confidence: 0.395768404006958,
      },
      {
        mentionId: '9',
        type: 'PROBLEM',
        text: {
          content: 'dysthymic mood',
          beginOffset: 479,
        },
        linkedEntities: [
          {
            entityId: 'UMLS/C0013415',
          },
        ],
        temporalAssessment: {
          value: 'CURRENT',
          confidence: 0.9810214638710022,
        },
        certaintyAssessment: {
          value: 'LIKELY',
          confidence: 0.997525691986084,
        },
        subject: {
          value: 'PATIENT',
          confidence: 0.9989042282104492,
        },
        confidence: 0.5004895925521851,
      },
      {
        mentionId: '10',
        type: 'PROBLEM',
        text: {
          content: 'suicidal ideation',
          beginOffset: 585,
        },
        linkedEntities: [
          {
            entityId: 'UMLS/C0424000',
          },
        ],
        temporalAssessment: {
          value: 'CURRENT',
          confidence: 0.9966638088226318,
        },
        certaintyAssessment: {
          value: 'UNLIKELY',
          confidence: 0.9986321330070496,
        },
        subject: {
          value: 'PATIENT',
          confidence: 0.9996469616889954,
        },
        confidence: 0.9408866763114929,
      },
      {
        mentionId: '11',
        type: 'PROBLEM',
        text: {
          content: 'Issues',
          beginOffset: 604,
        },
        linkedEntities: [
          {
            entityId: 'UMLS/C0033213',
          },
        ],
        temporalAssessment: {
          value: 'CURRENT',
          confidence: 0.9955281019210815,
        },
        certaintyAssessment: {
          value: 'LIKELY',
          confidence: 0.6473665237426758,
        },
        subject: {
          value: 'PATIENT',
          confidence: 0.9996469616889954,
        },
        confidence: 0.6027544140815735,
      },
      {
        mentionId: '12',
        type: 'PROBLEM',
        text: {
          content: 'Stressors',
          beginOffset: 615,
        },
        linkedEntities: [
          {
            entityId: 'UMLS/C0038443',
          },
          {
            entityId: 'UMLS/C0178815',
          },
          {
            entityId: 'UMLS/C3842878',
          },
        ],
        temporalAssessment: {
          value: 'CURRENT',
          confidence: 0.9924143552780151,
        },
        certaintyAssessment: {
          value: 'LIKELY',
          confidence: 0.7895716428756714,
        },
        subject: {
          value: 'PATIENT',
          confidence: 0.9996469616889954,
        },
        confidence: 0.5507025122642517,
      },
      {
        mentionId: '13',
        type: 'PROBLEM',
        text: {
          content: 'depressive symptoms',
          beginOffset: 712,
        },
        linkedEntities: [
          {
            entityId: 'UMLS/C0086132',
          },
          {
            entityId: 'UMLS/C1579931',
          },
        ],
        temporalAssessment: {
          value: 'CURRENT',
          confidence: 0.704767107963562,
        },
        certaintyAssessment: {
          value: 'LIKELY',
          confidence: 0.9703289866447449,
        },
        subject: {
          value: 'PATIENT',
          confidence: 0.9995327591896057,
        },
        confidence: 0.9398286938667297,
      },
      {
        mentionId: '14',
        type: 'MEDICINE',
        text: {
          content: 'medication',
          beginOffset: 1016,
        },
        linkedEntities: [
          {
            entityId: 'UMLS/C0013227',
          },
        ],
        temporalAssessment: {
          value: 'CURRENT',
          confidence: 0.956928551197052,
        },
        certaintyAssessment: {
          value: 'LIKELY',
          confidence: 0.9897561073303223,
        },
        subject: {
          value: 'PATIENT',
          confidence: 0.999046802520752,
        },
        confidence: 0.9448337554931641,
      },
      {
        mentionId: '15',
        type: 'PROBLEM',
        text: {
          content: 'headaches',
          beginOffset: 1071,
        },
        linkedEntities: [
          {
            entityId: 'UMLS/C0018681',
          },
        ],
        temporalAssessment: {
          value: 'CURRENT',
          confidence: 0.9619466662406921,
        },
        certaintyAssessment: {
          value: 'LIKELY',
          confidence: 0.990967333316803,
        },
        subject: {
          value: 'PATIENT',
          confidence: 0.9996856451034546,
        },
        confidence: 0.9957436919212341,
      },
      {
        mentionId: '16',
        type: 'ANATOMICAL_STRUCTURE',
        text: {
          content: 'chest',
          beginOffset: 1082,
        },
        linkedEntities: [
          {
            entityId: 'UMLS/C0817096',
          },
        ],
        confidence: 0.9422274827957153,
      },
      {
        mentionId: '17',
        type: 'PROBLEM',
        text: {
          content: 'tightness',
          beginOffset: 1088,
        },
        linkedEntities: [
          {
            entityId: 'UMLS/C0232292',
          },
          {
            entityId: 'UMLS/C0241166',
          },
          {
            entityId: 'UMLS/C0730573',
          },
          {
            entityId: 'UMLS/C0877322',
          },
        ],
        temporalAssessment: {
          value: 'CURRENT',
          confidence: 0.8862980008125305,
        },
        certaintyAssessment: {
          value: 'LIKELY',
          confidence: 0.9795204997062683,
        },
        subject: {
          value: 'PATIENT',
          confidence: 0.9996469616889954,
        },
        confidence: 0.9867182374000549,
      },
      {
        mentionId: '18',
        type: 'PROBLEM',
        text: {
          content: 'fractures',
          beginOffset: 1099,
        },
        linkedEntities: [
          {
            entityId: 'UMLS/C0016658',
          },
          {
            entityId: 'UMLS/C4554413',
          },
        ],
        temporalAssessment: {
          value: 'CURRENT',
          confidence: 0.9532970786094666,
        },
        certaintyAssessment: {
          value: 'LIKELY',
          confidence: 0.9902867674827576,
        },
        subject: {
          value: 'PATIENT',
          confidence: 0.9996469616889954,
        },
        confidence: 0.9850212335586548,
      },
      {
        mentionId: '19',
        type: 'ANATOMICAL_STRUCTURE',
        text: {
          content: 'arms',
          beginOffset: 1116,
        },
        linkedEntities: [
          {
            entityId: 'UMLS/C0446516',
          },
        ],
        confidence: 0.9949317574501038,
      },
      {
        mentionId: '20',
        type: 'ANATOMICAL_STRUCTURE',
        text: {
          content: 'legs',
          beginOffset: 1125,
        },
        linkedEntities: [
          {
            entityId: 'UMLS/C1140621',
          },
        ],
        confidence: 0.9961537718772888,
      },
      {
        mentionId: '21',
        type: 'PROBLEM',
        text: {
          content: 'pain',
          beginOffset: 1135,
        },
        linkedEntities: [
          {
            entityId: 'UMLS/C0030193',
          },
        ],
        temporalAssessment: {
          value: 'CURRENT',
          confidence: 0.9460680484771729,
        },
        certaintyAssessment: {
          value: 'LIKELY',
          confidence: 0.991034746170044,
        },
        subject: {
          value: 'PATIENT',
          confidence: 0.9996856451034546,
        },
        confidence: 0.988801896572113,
      },
      {
        mentionId: '22',
        type: 'ANATOMICAL_STRUCTURE',
        text: {
          content: 'heart',
          beginOffset: 1147,
        },
        linkedEntities: [
          {
            entityId: 'UMLS/C0018787',
          },
          {
            entityId: 'UMLS/C4037974',
          },
        ],
        confidence: 0.9928666353225708,
      },
      {
        mentionId: '23',
        type: 'MEDICINE',
        text: {
          content: 'medications',
          beginOffset: 1198,
        },
        linkedEntities: [
          {
            entityId: 'UMLS/C0013227',
          },
        ],
        temporalAssessment: {
          value: 'CURRENT',
          confidence: 0.9579027891159058,
        },
        certaintyAssessment: {
          value: 'LIKELY',
          confidence: 0.9974275827407837,
        },
        subject: {
          value: 'PATIENT',
          confidence: 0.999559760093689,
        },
        confidence: 0.5450941324234009,
      },
      {
        mentionId: '24',
        type: 'MEDICINE',
        text: {
          content: 'Ibuprofen',
          beginOffset: 1232,
        },
        linkedEntities: [
          {
            entityId: 'UMLS/C0020740',
          },
        ],
        temporalAssessment: {
          value: 'UPCOMING',
          confidence: 0.7161632180213928,
        },
        certaintyAssessment: {
          value: 'LIKELY',
          confidence: 0.8785431981086731,
        },
        subject: {
          value: 'PATIENT',
          confidence: 0.9995561838150024,
        },
        confidence: 0.9962401390075684,
      },
      {
        mentionId: '25',
        type: 'MED_STRENGTH',
        text: {
          content: '20',
          beginOffset: 1242,
        },
        confidence: 0.9885463714599609,
      },
      {
        mentionId: '26',
        type: 'MED_UNIT',
        text: {
          content: 'mg',
          beginOffset: 1245,
        },
        confidence: 0.9762817621231079,
      },
      {
        mentionId: '27',
        type: 'MED_FREQUENCY',
        text: {
          content: '3 times a day',
          beginOffset: 1248,
        },
        confidence: 0.9753290414810181,
      },
      {
        mentionId: '28',
        type: 'MED_DOSE',
        text: {
          content: '6',
          beginOffset: 1263,
        },
        confidence: 0.44476228952407837,
      },
      {
        mentionId: '29',
        type: 'MEDICINE',
        text: {
          content: 'morphine',
          beginOffset: 1265,
        },
        linkedEntities: [
          {
            entityId: 'UMLS/C0026549',
          },
          {
            entityId: 'UMLS/C0026553',
          },
        ],
        temporalAssessment: {
          value: 'CURRENT',
          confidence: 0.620257556438446,
        },
        certaintyAssessment: {
          value: 'LIKELY',
          confidence: 0.8747679591178894,
        },
        subject: {
          value: 'PATIENT',
          confidence: 0.9993507862091064,
        },
        confidence: 0.9768913984298706,
      },
      {
        mentionId: '30',
        type: 'MED_FORM',
        text: {
          content: 'tablets',
          beginOffset: 1274,
        },
        linkedEntities: [
          {
            entityId: 'UMLS/C0039225',
          },
        ],
        confidence: 0.9304339289665222,
      },
      {
        mentionId: '31',
        type: 'MED_DOSE',
        text: {
          content: 'one',
          beginOffset: 1283,
        },
        confidence: 0.4944850206375122,
      },
      {
        mentionId: '32',
        type: 'MED_FREQUENCY',
        text: {
          content: 'every 4 hours',
          beginOffset: 1287,
        },
        confidence: 0.9725239872932434,
      },
      {
        mentionId: '33',
        type: 'MEDICINE',
        text: {
          content: 'strepsils',
          beginOffset: 1316,
        },
        linkedEntities: [
          {
            entityId: 'UMLS/C0592141',
          },
        ],
        temporalAssessment: {
          value: 'CURRENT',
          confidence: 0.057481713593006134,
        },
        certaintyAssessment: {
          value: 'LIKELY',
          confidence: 0.057481713593006134,
        },
        subject: {
          value: 'PATIENT',
          confidence: 0.8191273808479309,
        },
        confidence: 0.6422738432884216,
      },
      {
        mentionId: '34',
        type: 'MED_FREQUENCY',
        text: {
          content: 'twice a day',
          beginOffset: 1326,
        },
        confidence: 0.8594827055931091,
      },
    ],
  },
};
