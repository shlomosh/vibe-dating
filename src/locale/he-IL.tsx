import { 
  AgeType,
  TravelDistanceType, 
  PositionType, 
  BodyType, 
  SexualityType,
  HostingType,
  MeetingTimeType,
  EquipmentSizeType,
  ButtShapeType,
  HealthPracticesType,
  HivStatusType,
  PreventionPracticesType,
  ChatStatusType,
} from '../types/profile';

export const globalDict = {
    // general app info
    appName: (<>Vibe</>),
    appSlogon: (<>find what makes you vibe</>),

    // general buttons  
    accept: (<>אישור</>),
    cancel: (<>ביטול</>),
    delete: (<>מחק</>),
    next: (<>הבא</>),
    back: (<>חזור</>),
    select: (<>בחר</>),
    create: (<>צור</>),
    save: (<>שמור</>),
    reset: (<>איפוס</>),
    apply: (<>החל</>),
    zoom: (<>זום</>),
    processing: (<>מעבד...</>),

    // general text
    loading: (<>טוען...</>),

    // terms and conditions
    termsAndConditions: (<>תנאי שימוש</>),
    readTermsAndConditions: (<>קרא תנאי שימוש</>),
    acceptTermsAndLogin: (<>קבל תנאי שימוש והתחבר</>),

    // profile
    selectProfile: (<>בחר פרופיל</>),
    yourProfile: (<>פרופיל</>),
    deleteProfile: (<>מחק פרופיל</>),
    deleteProfileAreYouSureQ: (profileId: string) => (<>{`למחוק את הפרופיל '${profileId}'? לא ניתן לבטל פעולה זו.`}</>),
    addProfile: (<>פרופיל חדש</>),
    enterNewProfileName: (<>הזן שם פרופיל חדש (נראה רק לך)</>),
    profileName: (<>שם פרופיל</>),
    extraProfileSettings: (<>הגדרות פרופיל נוספות (לחץ לפתיחה)</>),
    noImagesOnAlbum: (<>אין תמונות באלבום</>),
    clickToEditAlbum: (<>לחץ לעריכת אלבום...</>),
    addImage: (<>הוסף תמונה</>),
    clickToUploadImage: (<>לחץ להעלאת תמונה...</>),
    profileImage: (<>תמונת פרופיל</>),

    // image-editor
    uploadPhoto: (<>העלאת תמונה</>),
    editPhoto: (<>עריכת תמונה</>),
    pleaseUploadImageFile: (<>נא להעלות קובץ תמונה</>),
    failedToProcessImage: (<>נכשל בעיבוד התמונה</>),
    adjustCropArea: (<>התאמת תאריך ליחס 3:4</>),
    supportedImageFormats: (maxFileSize: number) => (<>נתמך: JPEG, PNG, WebP (מקסימום {maxFileSize}MB)</>),
    fileSizeMustBeLessThan: (maxFileSize: number) => (<>גודל הקובץ חייב להיות פחות מ- {maxFileSize}MB</>),
    dropImageHere: (<>הזן את התמונה כאן...</>),
    dragAndDropImage: (<>גרור ושחרר את התמונה כאן, או לחץ כדי לבחור</>),
    clickToTakePhoto: (<>לחץ לצילום תמונה</>),
    errorUploadingImage: (<>שגיאה בעיבוד התמונה</>),

    // camera
    cameraAccessDenied: (<>גישה למצלמה נדחתה</>),
    cameraNotSupported: (<>מצלמה לא נתמכת במכשיר זה</>),
    takePhoto: (<>צלם תמונה</>),
    retakePhoto: (<>צלם מחדש</>),
    cameraLoading: (<>טוען מצלמה...</>),
    switchCamera: (<>החלף מצלמה</>),
    cameraError: (<>אירעה שגיאה במצלמה</>),
    
    // location
    yourLocation: (<>מיקום</>),
    locationMode: (<>מצב מיקום</>),
    automaticLocation: (<>מיקום אוטומטי</>),
    manualLocation: (<>מיקום ידני</>),
    updateLocation: (<>עדכן מיקום</>),
    getDeviceLocation: (<>קבל מיקום מהמכשיר</>),
    enterYourLocation: (<>הזן את המיקום שלך</>),
    yourLocationAsItWillAppear: (<>המיקום שלך כפי שיופיע:</>),
    obscureRadius: (<>רדיוס הסתרה</>),
    locationNotSetAutomatic: (<div>המיקום שלך לא הוגדר.<p className="text-sm italic">לחץ על מפה או על <div className="inline-block border-1 border-white text-white px-1 py-1 rounded-md">עדכן מיקום</div> כדי להגדיר אותו</p></div>),
    locationNotSetManual: (<div>המיקום שלך לא הוגדר.<p className="text-sm italic">(הזן את כתובת המיקום שלך כדי להגדיר אותו)</p></div>),
    radius: (<>רדיוס</>),
    km: (<>ק"מ</>),
    longitude: (<>קו אורך</>),
    latitude: (<>קו רוחב</>),
    
    // radar
    radar: (<>ראדר</>),
    likes: (<>מועדפים</>),
    inbox: (<>הודעות</>),
    board: (<>לוח</>),
    profile: (<>פרופיל</>),
    filters: (<>סינון</>),
    customizeYourRadarFeedPreferences: (<>התאמת סינון הראדר שלך.</>),
}

export const nameGenerator = {
    animals: [
        'אריה', 'סוס', 'שור', 'כלב', 'תרנגול', 'תיש', 'איל', 'ברווז', 'חמור', 'חתול',
        'חזיר בר', 'איל', 'נץ', 'ארנב', 'חמור', 'ברווז', 'איל', 'צבי', 'אווז', 'תרנגול',
        'צבי', 'עגל', 'סייח', 'תן', 'נמר', 'זאב', 'דוב',
        'נץ', 'בז', 'נשר', 'ברדלס', 'פנתר', 'יגואר', 'נמר'
    ] as const,
    adjectives: [
        'אדום', 'כחול', 'צהוב', 'ירוק', 'כתום', 'סגול', 'ורוד', 'חום', 'שחור', 'לבן',
        'אפור', 'כסף', 'זהב', 'ארגמן', 'שני', 'רובי', 'דובדבן', 'ורדרד', 'חום כהה', 'לבנים',
        'חמוד', 'מצחיק', 'נאמן', 'אמיץ', 'חמוד', 'עדין', 'מרשים', 'אכזרי', 'שובב', 'חכם',
        'סקרן', 'חינני', 'זריז', 'משאבי', 'חברתי', 'עמיד', 'מסתורי', 'עיקש', 'יוצא דופן', 'פראי',
        'מבוית', 'נועז', 'לילי', 'ערני', 'נודד', 'טורף', 'צמחוני', 'ימי', 'יבשתי',
        'עצי', 'מכונף', 'מנוצה', 'מעור', 'קשקשי', 'רירי', 'ארסי', 'טורף', 'חברותי', 'בודד',
        'מהיר', 'איטי', 'חמקן', 'חזק', 'חסר פחד', 'ראשוני', 'אקזוטי', 'הרמוני', 'אמפתי',
        'אותנטי', 'אמיץ', 'נחוש'
    ] as const
};

export const termsAndConditionsDict = {
  sectionsText: [
    {
      title: (<>1. מבוא</>),
      content: (<>
          <p>ברוכים הבאים ל-{globalDict.appName}! בשימוש באפליקציה שלנו, אתה מסכים לעמוד בתנאי השימוש האלה.
          אם אינך מסכים, אנא הימנע משימוש בשירות.</p>
        </>)
    },
    {
      title: (<>2. זכאות</>),
      content: (<>
        <p>עליך להיות בן 18 לפחות כדי להשתמש ב-{globalDict.appName}.
        בהרשמה, אתה מאשר שכל המידע שתספק הוא מדויק.</p>
      </>)
    },
    {
      title: (<>3. כבד את עצמך וכבד אחרים</>),
      content: (<>
          <p>ב-{globalDict.appName}, אנו מאמינים בקידום סביבה בטוחה ומכבדת. משתמשים חייבים לעמוד בעקרונות הבאים:</p>
          <p>
            <p className="ps-[1em] pt-1">• כבד אחרים והתייחס לכל המשתמשים בנדיבות ובכבוד. דיבור שנאה, הטרדה או אפליה לא יסבלו.</p>
            <p className="ps-[1em] pt-1">• כבד את עצמך ועסוק באינטראקציות חיוביות וטפל בעצמך תוך שימוש בפלטפורמה.</p>
            <p className="ps-[1em] pt-1">• וודא תמיד שכל השיחות והאינטראקציות הן בהסכמה.</p>
            <p className="ps-[1em] pt-1">• דיווח על הפרות, אם אתה חווה או עד להתנהגות לא הולמת, אנא דווח על כך באמצעות מערכת הדיווח של האפליקציה.</p>
          </p>
        </>)
    },
    {
      title: (<>4. התנהגות משתמש</>),
      content: (<>
        <p>משתמשים לא רשאים:</p>
        <p>
          <p className="ps-[1em] pt-1">• להשתמש ב-{globalDict.appName} לפעילויות בלתי חוקיות.</p>
          <p className="ps-[1em] pt-1">• לשתף או להפיץ תוכן מזיק, מפורש או מטעה.</p>
          <p className="ps-[1em] pt-1">• להתחזות לאדם אחר או ליצור פרופילים מזויפים.</p>
        </p>
      </>)
    },
    {
      title: (<>5. פרטיות והגנת מידע</>),
      content: (<>
        <p>המידע האישי שלך יטופל בהתאם למדיניות הפרטיות שלנו.</p>
        <p>אנו נוקטים באמצעי אבטחה סבירים להגנה על המידע שלך, אך איננו יכולים להבטיח אבטחה מוחלטת.</p>
      </>)
    },
    {
      title: (<>6. אחריות והצהרות</>),
      content: (<>
        <p>{globalDict.appName} מספקת פלטפורמה לחיבור אך אינה אחראית לאינטראקציות משתמש מחוץ לאפליקציה.</p>
        <p>משתמשים נושאים באחריות מלאה לתקשורת ולפגישות שלהם.</p>
      </>)
    },
    {
      title: (<>7. סיום חשבון</>),
      content: (<>
        <p>{globalDict.appName} שומרת לעצמה את הזכות להשעות או לסיים חשבונות המפרים את התנאים שלנו.</p>
      </>)
    },
    {
      title: (<>8. שינויים בתנאים</>),
      content: (<>
        <p>אנו עשויים לעדכן תנאים אלה מעת לעת. המשך השימוש ב-{globalDict.appName} לאחר עדכונים מרמז על קבלת השינויים.</p>
      </>)
    },
  ],
};

export const profileDict = {
  nickName: {
      label: 'כינוי',
  },
  aboutMe: {
      label: 'עליי',
  },
  sexuality: {
      label: 'נטייה',
      options: {
        gay: ' גיי',
        bisexual: 'ביסקסואל',
        curious: 'סקרן',
        trans: 'טרנס',
        fluid: 'גמיש'
      }
  } satisfies {
    label: string,
    options: Record<SexualityType, string>
  },
  age: {
      label: 'גיל',
      options: {
        ...Object.fromEntries(
          Array.from({ length: 59 - 18 + 1 }, (_, i) => [
            `${18 + i}`, `${18 + i}`
          ])
        ),
        '60-64': '60-64',
        '65-69': '65-69',
        '70-79': '70-79',
        '80+': '80+'
      }
  } satisfies {
    label: string,
    options: Record<AgeType, string>
  },
  hosting: {
      label: 'אירוח',
      options: {
        hostAndTravel: 'נייד / ממוקם',
        hostOnly: 'ממוקם',
        travelOnly: 'נייד'
      }
  } satisfies {
    label: string,
    options: Record<HostingType, string>
  },
  travelDistance: {
      label: 'טווח נסיעה',
      options: {
        none: '0 ק"מ',
        block: '1 ק"מ',
        neighbourhood: '2 ק"מ',
        city: '5 ק"מ',
        metropolitan: '10 ק"מ',
        state: '20+ ק"מ'
      }
  } satisfies {
    label: string,
    options: Record<TravelDistanceType, string>
  },
  distance: {
    label: 'מרחק',
  },
  position: {
      label: 'פוזיציה',
      options: {
        bottom: 'פס',
        versBottom: 'ורס פס',
        vers: 'ורס',
        versTop: 'ורס אק',
        top: 'אק',
        side: 'סייד',
        blower: 'מוצץ',
        blowie: 'נמצץ'
      }
  } satisfies {
    label: string,
    options: Record<PositionType, string>
  },
  body: {
      label: 'סוג גוף',
      options: {
        petite: 'קטן',
        slim: 'רזה',
        average: 'ממוצע',
        fit: 'חטוב',
        muscular: 'שרירי',
        stocky: 'מוצק',
        chubby: 'שמנמן',
        large: 'גדול'
      }
  } satisfies {
    label: string,
    options: Record<BodyType, string>
  },
  equipmentSize: {
      label: 'חציל 🍆',
      options: {
        small: 'קטן',
        average: 'ממוצע',
        large: 'גדול',
        extraLarge: 'גדול מאוד',
        gigantic: 'ענק'
      }
  } satisfies {
    label: string,
    options: Record<EquipmentSizeType, string>
  },
  buttShape: {
      label: 'אפרסק 🍑',
      options: {
        small: 'קטן',
        average: 'ממוצע',
        bubble: 'עגלגל',
        solid: 'מוצק',
        large: 'גדול',
      }
  } satisfies {
    label: string,
    options: Record<ButtShapeType, string>
  },
  healthPractices: {
      label: 'מנהגי מין',
      options: {
        condoms: 'קונדומים',
        bb: 'BB',
        condomsOrBb: 'קונדומים או BB',
        noPenetrations: 'ללא חדירות'
      }
  } satisfies {
    label: string,
    options: Record<HealthPracticesType, string>
  },
  hivStatus: {
    label: 'סטטוס HIV',
    options: {
      negative: 'שלילי',
      positive: 'חיובי',
      positiveUndetectable: 'חיובי, לא ניתן לגילוי'
    }
  } satisfies {
    label: string,
    options: Record<HivStatusType, string>
  },
  preventionPractices: {
    label: 'טיפול מונע',
    options: {
      none: 'ללא',
      prep: 'פרפ',
      doxypep: 'דוקסי-פפ',
      prepAndDoxypep: 'פרפ & דוקסי-פפ',
    }
  } satisfies {
    label: string,
    options: Record<PreventionPracticesType, string>
  },
  meetingTime: {
      label: '? למתי',
      options: {
        now: 'עכשיו',
        today: 'היום',
        whenever: 'מתישהו'
      }
  } satisfies {
    label: string,
    options: Record<MeetingTimeType, string>
  },
  chatStatus: {
    label: 'סטטוס',
    options: {
      online: 'מחובר',
      busy: 'עסוק',
      offline: 'מנותק',
    }
  } satisfies {
    label: string,
    options: Record<ChatStatusType, string>
  },
}; 