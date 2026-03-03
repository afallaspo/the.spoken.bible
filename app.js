/**
 * Bible App - Core Logic
 * Handles data fetching, state management, and UI updates
 */

const BIBLE_API_BASE = 'https://raw.githubusercontent.com/thiagobodruk/bible/master/json/es_rvr.json';

const BOOK_NAMES = {
    es: {
        "gn": "Génesis", "ex": "Éxodo", "lv": "Levítico", "nm": "Números", "dt": "Deuteronomio",
        "js": "Josué", "jud": "Jueces", "rt": "Rut", "1sm": "1 Samuel", "2sm": "2 Samuel",
        "1kgs": "1 Reyes", "2kgs": "2 Reyes", "1ch": "1 Crónicas", "2ch": "2 Crónicas",
        "ezr": "Esdras", "ne": "Nehemías", "et": "Ester", "job": "Job", "ps": "Salmos",
        "prv": "Proverbios", "ec": "Eclesiastés", "so": "Cantares", "is": "Isaías",
        "jr": "Jeremías", "lm": "Lamentaciones", "ez": "Ezequiel", "dn": "Daniel",
        "ho": "Oseas", "jl": "Joel", "am": "Amós", "ob": "Abdías", "jn": "Jonás",
        "mi": "Miqueas", "na": "Nahúm", "hk": "Habacuc", "zp": "Sofonías", "hg": "Hageo",
        "zc": "Zacarías", "ml": "Malaquías", "mt": "Mateo", "mk": "Marcos", "lk": "Lucas",
        "jo": "Juan", "act": "Hechos", "rm": "Romanos", "1co": "1 Corintios", "2co": "2 Corintios",
        "gl": "Gálatas", "eph": "Efesios", "ph": "Filipenses", "cl": "Colosenses",
        "1ts": "1 Tesalonicenses", "2ts": "2 Tesalonicenses", "1tm": "1 Timoteo",
        "2tm": "2 Timoteo", "tt": "Tito", "phm": "Filemón", "hb": "Hebreos", "jm": "Santiago",
        "1pe": "1 Pedro", "2pe": "2 Pedro", "1jo": "1 Juan", "2jo": "2 Juan", "3jo": "3 Juan",
        "jd": "Judas", "re": "Apocalipsis"
    },
    en: {
        "gn": "Genesis", "ex": "Exodus", "lv": "Leviticus", "nm": "Numbers", "dt": "Deuteronomy",
        "js": "Joshua", "jud": "Judges", "rt": "Ruth", "1sm": "1 Samuel", "2sm": "2 Samuel",
        "1kgs": "1 Kings", "2kgs": "2 Kings", "1ch": "1 Chronicles", "2ch": "2 Chronicles",
        "ezr": "Ezra", "ne": "Nehemiah", "et": "Esther", "job": "Job", "ps": "Psalms",
        "prv": "Proverbs", "ec": "Ecclesiastes", "so": "Song of Solomon", "is": "Isaiah",
        "jr": "Jeremiah", "lm": "Lamentations", "ez": "Ezekiel", "dn": "Daniel",
        "ho": "Hosea", "jl": "Joel", "am": "Amos", "ob": "Obadiah", "jn": "Jonah",
        "mi": "Micah", "na": "Nahum", "hk": "Habakkuk", "zp": "Zephaniah", "hg": "Haggai",
        "zc": "Zechariah", "ml": "Malachi", "mt": "Matthew", "mk": "Mark", "lk": "Luke",
        "jo": "John", "act": "Acts", "rm": "Romans", "1co": "1 Corinthians", "2co": "2 Corinthians",
        "gl": "Galatians", "eph": "Ephesians", "ph": "Philippians", "cl": "Colossians",
        "1ts": "1 Thessalonians", "2ts": "2 Thessalonians", "1tm": "1 Timothy",
        "2tm": "2 Timothy", "tt": "Titus", "phm": "Philemon", "hb": "Hebrews", "jm": "James",
        "1pe": "1 Peter", "2pe": "2 Peter", "1jo": "1 John", "2jo": "2 John", "3jo": "3 John",
        "jd": "Jude", "re": "Revelation"
    },
    pt: {
        "gn": "Gênesis", "ex": "Êxodo", "lv": "Levítico", "nm": "Números", "dt": "Deuteronômio",
        "js": "Josué", "jud": "Juízes", "rt": "Rute", "1sm": "1 Samuel", "2sm": "2 Samuel",
        "1kgs": "1 Reis", "2kgs": "2 Reis", "1ch": "1 Crônicas", "2ch": "2 Crônicas",
        "ezr": "Esdras", "ne": "Neemias", "et": "Ester", "job": "Jó", "ps": "Salmos",
        "prv": "Provérbios", "ec": "Eclesiastes", "so": "Cânticos", "is": "Isaías",
        "jr": "Jeremias", "lm": "Lamentações", "ez": "Ezequiel", "dn": "Daniel",
        "ho": "Oseias", "jl": "Joel", "am": "Amós", "ob": "Obadias", "jn": "Jonas",
        "mi": "Miqueias", "na": "Naum", "hk": "Habacuque", "zp": "Sofonias", "hg": "Ageu",
        "zc": "Zacarias", "ml": "Malaquias", "mt": "Mateus", "mk": "Marcos", "lk": "Lucas",
        "jo": "João", "act": "Atos", "rm": "Romanos", "1co": "1 Coríntios", "2co": "2 Coríntios",
        "gl": "Gálatas", "eph": "Efésios", "ph": "Filipenses", "cl": "Colossenses",
        "1ts": "1 Tessalonicenses", "2ts": "2 Tessalonicenses", "1tm": "1 Timóteo",
        "2tm": "2 Timóteo", "tt": "Tito", "phm": "Filemom", "hb": "Hebreus", "jm": "Tiago",
        "1pe": "1 Pedro", "2pe": "2 Pedro", "1jo": "1 João", "2jo": "2 João", "3jo": "3 João",
        "jd": "Judas", "re": "Apocalipse"
    },
    fr: {
        "gn": "Genèse", "ex": "Exode", "lv": "Lévitique", "nm": "Nombres", "dt": "Deutéronome",
        "js": "Josué", "jud": "Juges", "rt": "Ruth", "1sm": "1 Samuel", "2sm": "2 Samuel",
        "1kgs": "1 Rois", "2kgs": "2 Rois", "1ch": "1 Chroniques", "2ch": "2 Chroniques",
        "ezr": "Esdras", "ne": "Néhémie", "et": "Esther", "job": "Job", "ps": "Psaumes",
        "prv": "Proverbes", "ec": "Ecclésiaste", "so": "Cantique", "is": "Ésaïe",
        "jr": "Jérémie", "lm": "Lamentations", "ez": "Ézéchiel", "dn": "Daniel",
        "ho": "Osée", "jl": "Joël", "am": "Amos", "ob": "Abdias", "jn": "Jonas",
        "mi": "Michée", "na": "Nahum", "hk": "Habacuc", "zp": "Sophonie", "hg": "Aggée",
        "zc": "Zacharie", "ml": "Malachie", "mt": "Matthieu", "mk": "Marc", "lk": "Luc",
        "jo": "Jean", "act": "Actes", "rm": "Romains", "1co": "1 Corinthiens", "2co": "2 Corinthiens",
        "gl": "Galates", "eph": "Éphésiens", "ph": "Philippiens", "cl": "Colossiens",
        "1ts": "1 Thessaloniciens", "2ts": "2 Thessaloniciens", "1tm": "1 Timothée",
        "2tm": "2 Timothée", "tt": "Tite", "phm": "Philémon", "hb": "Hébreux", "jm": "Jacques",
        "1pe": "1 Pierre", "2pe": "2 Pierre", "1jo": "1 Jean", "2jo": "2 Jean", "3jo": "3 Jean",
        "jd": "Jude", "re": "Apocalypse"
    },
    "de": {
        "gn": "1 Mose", "ex": "2 Mose", "lv": "3 Mose", "nm": "4 Mose", "dt": "5 Mose",
        "js": "Josua", "jud": "Richter", "rt": "Rut", "1sm": "1 Samuel", "2sm": "2 Samuel",
        "1kgs": "1 Könige", "2kgs": "2 Könige", "1ch": "1 Chronik", "2ch": "2 Chronik",
        "ezr": "Esra", "ne": "Nehemia", "et": "Ester", "job": "Hiob", "ps": "Psalmen",
        "prv": "Sprüche", "ec": "Prediger", "so": "Hoheslied", "is": "Jesaja",
        "jr": "Jeremia", "lm": "Klagelieder", "ez": "Hesekiel", "dn": "Daniel",
        "ho": "Hosea", "jl": "Joel", "am": "Amos", "ob": "Obadja", "jn": "Jona",
        "mi": "Micha", "na": "Nahum", "hk": "Habakuk", "zp": "Zefanja", "hg": "Haggai",
        "zc": "Sacharja", "ml": "Maleachi", "mt": "Matthäus", "mk": "Markus", "lk": "Lukas",
        "jo": "Johannes", "act": "Apostelgeschichte", "rm": "Römer", "1co": "1 Korinther", "2co": "2 Korinther",
        "gl": "Galater", "eph": "Epheser", "ph": "Philipper", "cl": "Kolosser",
        "1ts": "1 Thessalonicher", "2ts": "2 Thessalonicher", "1tm": "1 Timotheus",
        "2tm": "2 Timotheus", "tt": "Titus", "phm": "Philemon", "hb": "Hebräer", "jm": "Jakobus",
        "1pe": "1 Petrus", "2pe": "2 Petrus", "1jo": "1 Johannes", "2jo": "2 Johannes", "3jo": "3 Johannes",
        "jd": "Judas", "re": "Offenbarung"
    },
    ru: {
        "gn": "Бытие", "ex": "Исход", "lv": "Левит", "nm": "Числа", "dt": "Второзаконие",
        "js": "Иисус Навин", "jud": "Судьи", "rt": "Руфь", "1sm": "1 Царств", "2sm": "2 Царств",
        "1kgs": "3 Царств", "2kgs": "4 Царств", "1ch": "1 Паралипоменон", "2ch": "2 Паралипоменон",
        "ezr": "Ездра", "ne": "Неемия", "et": "Есфирь", "job": "Иов", "ps": "Псалтирь",
        "prv": "Притчи", "ec": "Екклесиаст", "so": "Песня Песней", "is": "Исаия",
        "jr": "Иеремия", "lm": "Плач Иеремии", "ez": "Иезекииль", "dn": "Даниил",
        "ho": "Осия", "jl": "Иоиль", "am": "Амос", "ob": "Авдий", "jn": "Иона",
        "mi": "Михей", "na": "Наум", "hk": "Аввакум", "zp": "Софония", "hg": "Аггей",
        "zc": "Захария", "ml": "Малахия", "mt": "От Матфея", "mk": "От Марка", "lk": "От Луки",
        "jo": "От Иоанна", "act": "Деяния", "rm": "К Римлянам", "1co": "1 Коринфянам", "2co": "2 Коринфянам",
        "gl": "К Галатам", "eph": "К Ефесянам", "ph": "К Филиппийцам", "cl": "К Колоссянам",
        "1ts": "1 Фессалоникийцам", "2ts": "2 Фессалоникийцам", "1tm": "1 Тимофею",
        "2tm": "2 Тимофею", "tt": "К Титу", "phm": "К Филимону", "hb": "К Евреям", "jm": "Иакова",
        "1pe": "1 Петра", "2pe": "2 Петра", "1jo": "1 Иоанна", "2jo": "2 Иоанна", "3jo": "3 Иоанна",
        "jd": "Иуды", "re": "Откровение"
    },
    ko: {
        "gn": "창세기", "ex": "출애굽기", "lv": "레위기", "nm": "민수기", "dt": "신명기",
        "js": "여호수아", "jud": "사사기", "rt": "룻기", "1sm": "사무엘상", "2sm": "사무엘하",
        "1kgs": "열왕기상", "2kgs": "열왕기하", "1ch": "역대상", "2ch": "역대하",
        "ezr": "에스라", "ne": "느헤미야", "et": "에스더", "job": "욥기", "ps": "시편",
        "prv": "잠언", "ec": "전도서", "so": "아가", "is": "이사야",
        "jr": "예레미야", "lm": "애가", "ez": "에스겔", "dn": "다니엘",
        "ho": "호세아", "jl": "요엘", "am": "아모스", "ob": "오바댜", "jn": "요나",
        "mi": "미가", "na": "나훔", "hk": "하박국", "zp": "스바냐", "hg": "학개",
        "zc": "스가랴", "ml": "말라기", "mt": "마태복음", "mk": "마가복음", "lk": "누가복음",
        "jo": "요한복음", "act": "사도행전", "rm": "로마서", "1co": "고린도전서", "2co": "고린도후서",
        "gl": "갈라디아서", "eph": "에베소서", "ph": "빌립보서", "cl": "골로새서",
        "1ts": "데살로니가전서", "2ts": "데살로니가후서", "1tm": "디모데전서",
        "2tm": "디모데후서", "tt": "디도서", "phm": "빌레몬서", "hb": "히브리서", "jm": "야고보서",
        "1pe": "베드로전서", "2pe": "베드로후서", "1jo": "요한1서", "2jo": "요한2서", "3jo": "요한3서",
        "jd": "유다서", "re": "요한계시록"
    },
    zh: {
        "gn": "创世记", "ex": "出埃及记", "lv": "利未记", "nm": "民数记", "dt": "申命记",
        "js": "约书亚记", "jud": "士师记", "rt": "路得记", "1sm": "撒母耳记上", "2sm": "撒母耳记下",
        "1kgs": "列王纪上", "2kgs": "列王纪下", "1ch": "历代志上", "2ch": "历代志下",
        "ezr": "以斯拉记", "ne": "尼希米记", "et": "以斯帖记", "job": "约伯记", "ps": "诗篇",
        "prv": "箴言", "ec": "传道书", "so": "雅歌", "is": "以赛亚书",
        "jr": "耶利米书", "lm": "耶利米哀歌", "ez": "以西结书", "dn": "但以理书",
        "ho": "何西阿书", "jl": "约珥书", "am": "阿摩司书", "ob": "俄巴底亚书", "jn": "约拿书",
        "mi": "弥迦书", "na": "那鸿书", "hk": "哈巴谷书", "zp": "西番雅书", "hg": "哈该书",
        "zc": "撒迦利亚书", "ml": "玛拉基书", "mt": "马太福音", "mk": "马可福音", "lk": "路加福音",
        "jo": "约翰福音", "act": "使徒行传", "rm": "罗马书", "1co": "哥林多前书", "2co": "哥林多后书",
        "gl": "加拉太书", "eph": "以弗所书", "ph": "腓立比书", "cl": "歌罗西书",
        "1ts": "帖撒罗尼迦前书", "2ts": "帖撒罗尼迦后书", "1tm": "提摩太前书",
        "2tm": "提摩太后书", "tt": "提多书", "phm": "腓利门书", "hb": "希伯来书", "jm": "雅各书",
        "1pe": "彼得前书", "2pe": "彼得后书", "1jo": "约翰一书", "2jo": "约翰二书", "3jo": "约翰三书",
        "jd": "犹大书", "re": "启示录"
    },
    el: {
        "gn": "Γένεσις", "ex": "Έξοδος", "lv": "Λευιτικόν", "nm": "Αριθμοί", "dt": "Δευτερονόμιον",
        "js": "Ιησούς του Ναυή", "jud": "Κριταί", "rt": "Ρουθ", "1sm": "Α' Σαμουήλ", "2sm": "Β' Σαμουήλ",
        "1kgs": "Α' Βασιλέων", "2kgs": "Β' Βασιλέων", "1ch": "Α' Χρονικών", "2ch": "Β' Χρονικών",
        "ezr": "Έσδρας", "ne": "Νεεμίας", "et": "Εσθήρ", "job": "Ιώβ", "ps": "Ψαλμοί",
        "prv": "Παροιμίαι", "ec": "Εκκλησιαστής", "so": "Άσμα Ασμάτων", "is": "Ησαΐας",
        "jr": "Ιερεμίας", "lm": "Θρήνοι", "ez": "Ιεζεκιήλ", "dn": "Δανιήλ",
        "ho": "Ωσηέ", "jl": "Ιωήλ", "am": "Αμώς", "ob": "Οβδιού", "jn": "Ιωνάς",
        "mi": "Μιχαίας", "na": "Ναούμ", "hk": "Αββακούμ", "zp": "Σοφονίας", "hg": "Αγγαίος",
        "zc": "Ζαχαρίας", "ml": "Μαλαχίας", "mt": "Ματθαίος", "mk": "Μάρκος", "lk": "Λουκάς",
        "jo": "Ιωάννης", "act": "Πράξεις", "rm": "Ρωμαίους", "1co": "Α' Κορινθίους", "2co": "Β' Κορινθίους",
        "gl": "Γαλάτας", "eph": "Εφεσίους", "ph": "Φιλιππησίους", "cl": "Κολασσαείς",
        "1ts": "Α' Θεσσαλονικείς", "2ts": "Β' Θεσσαλονικείς", "1tm": "Α' Τιμόθεον",
        "2tm": "Β' Τιμόθεον", "tt": "Τίτον", "phm": "Φιλήμονα", "hb": "Εβραίους", "jm": "Ιακώβου",
        "1pe": "Α' Πέτρου", "2pe": "Β' Πέτρου", "1jo": "Α' Ιωάννου", "2jo": "Β' Ιωάννου", "3jo": "Γ' Ιωάννου",
        "jd": "Ιούδα", "re": "Αποκάλυψις"
    },
    fi: {
        "gn": "1. Mooseksen", "ex": "2. Mooseksen", "lv": "3. Mooseksen", "nm": "4. Mooseksen", "dt": "5. Mooseksen",
        "js": "Joosua", "jud": "Tuomarien", "rt": "Ruut", "1sm": "1. Samuelin", "2sm": "2. Samuelin",
        "1kgs": "1. Kuninkaiden", "2kgs": "2. Kuninkaiden", "1ch": "1. Aikakirja", "2ch": "2. Aikakirja",
        "ezr": "Esra", "ne": "Nehemia", "et": "Ester", "job": "Job", "ps": "Psalmit",
        "prv": "Sananlaskut", "ec": "Saarnaaja", "so": "Laulujen laulu", "is": "Jesaja",
        "jr": "Jeremia", "lm": "Valitusvirret", "ez": "Hesekiel", "dn": "Daniel",
        "ho": "Hoosea", "jl": "Joel", "am": "Aamos", "ob": "Obadja", "jn": "Joona",
        "mi": "Miika", "na": "Nahum", "hk": "Habakuk", "zp": "Sefanja", "hg": "Haggai",
        "zc": "Sakarja", "ml": "Malakia", "mt": "Matteus", "mk": "Markus", "lk": "Luukas",
        "jo": "Johannes", "act": "Apostolien teot", "rm": "Roomalaiskirje", "1co": "1. Korinttolaiskirje", "2co": "2. Korinttolaiskirje",
        "gl": "Galatalaiskirje", "eph": "Efesolaiskirje", "ph": "Filippiläiskirje", "cl": "Kolossalaiskirje",
        "1ts": "1. Tessalonikalaiskirje", "2ts": "2. Tessalonikalaiskirje", "1tm": "1. Timoteuksen kirje",
        "2tm": "2. Timoteuksen kirje", "tt": "Tituksen kirje", "phm": "Filemonin kirje", "hb": "Heprealaiskirje", "jm": "Jaakobin kirje",
        "1pe": "1. Pietarin kirje", "2pe": "2. Pietarin kirje", "1jo": "1. Johanneksen kirje", "2jo": "2. Johanneksen kirje", "3jo": "3. Johanneksen kirje",
        "jd": "Juudaksen kirje", "re": "Ilmestyskirja"
    },
    ro: {
        "gn": "Geneza", "ex": "Exodul", "lv": "Leviticul", "nm": "Numeri", "dt": "Deuteronomul",
        "js": "Iosua", "jud": "Judecători", "rt": "Rut", "1sm": "1 Samuel", "2sm": "2 Samuel",
        "1kgs": "1 Împărați", "2kgs": "2 Împărați", "1ch": "1 Cronici", "2ch": "2 Cronici",
        "ezr": "Ezra", "ne": "Neemia", "et": "Estera", "job": "Iov", "ps": "Psalmii",
        "prv": "Proverbe", "ec": "Eclesiastul", "so": "Cântarea Cântărilor", "is": "Isaia",
        "jr": "Ieremia", "lm": "Plângerile", "ez": "Ezechiel", "dn": "Daniel",
        "ho": "Osea", "jl": "Ioel", "am": "Amos", "ob": "Obadia", "jn": "Iona",
        "mi": "Mica", "na": "Naum", "hk": "Habacuc", "zp": "Țefania", "hg": "Hagai",
        "zc": "Zaharia", "ml": "Maleahi", "mt": "Matei", "mk": "Marcu", "lk": "Luca",
        "jo": "Ioan", "act": "Faptele Apostolilor", "rm": "Romani", "1co": "1 Corinteni", "2co": "2 Corinteni",
        "gl": "Galateni", "eph": "Efeseni", "ph": "Filipeni", "cl": "Coloseni",
        "1ts": "1 Tesaloniceni", "2ts": "2 Tesaloniceni", "1tm": "1 Timotei",
        "2tm": "2 Timotei", "tt": "Tit", "phm": "Filimon", "hb": "Evrei", "jm": "Iacov",
        "1pe": "1 Petru", "2pe": "2 Petru", "1jo": "1 Ioan", "2jo": "2 Ioan", "3jo": "3 Ioan",
        "jd": "Iuda", "re": "Apocalipsa"
    },
    ar: {
        "gn": "التكوين", "ex": "الخروج", "lv": "اللاويين", "nm": "العدد", "dt": "التثنية",
        "js": "يشوع", "jud": "القضاة", "rt": "راعوث", "1sm": "صموئيل الأول", "2sm": "صموئيل الثاني",
        "1kgs": "الملوك الأول", "2kgs": "الملوك الثاني", "1ch": "أخبار الأيام الأول", "2ch": "أخبار الأيام الثاني",
        "ezr": "عزرا", "ne": "نحميا", "et": "أستير", "job": "أيوب", "ps": "المزامير",
        "prv": "الأمثال", "ec": "الجامعة", "so": "نشيد الأنشاد", "is": "إشعياء",
        "jr": "إرميا", "lm": "المراثي", "ez": "حزقيال", "dn": "دانيال",
        "ho": "هوشع", "jl": "يوئيل", "am": "عاموس", "ob": "عوبديا", "jn": "يونان",
        "mi": "ميخا", "na": "ناحوم", "hk": "حبقوق", "zp": "صفنيا", "hg": "حجي",
        "zc": "زكريا", "ml": "ملاخي", "mt": "متى", "mk": "مرقس", "lk": "لوقا",
        "jo": "يوحنا", "act": "أعمال الرسل", "rm": "رومية", "1co": "كورنثوس الأولى", "2co": "كورنثوس الثانية",
        "gl": "غلاطية", "eph": "أفسس", "ph": "فيلبي", "cl": "كولوسي",
        "1ts": "تسالونيكي الأولى", "2ts": "تسالونيكي الثانية", "1tm": "تيموثاوس الأولى",
        "2tm": "تيموثاوس الثانية", "tt": "تيطس", "phm": "فليمون", "hb": "العبرانيين", "jm": "يعقوب",
        "1pe": "بطرس الأولى", "2pe": "بطرس الثانية", "1jo": "يوحنا الأولى", "2jo": "يوحنا الثانية", "3jo": "يوحنا الثالثة",
        "jd": "يهوذا", "re": "الرؤيا"
    },
    vi: {
        "gn": "Sáng-thế Ký", "ex": "Xuất Ê-díp-tô Ký", "lv": "Lê-vi Ký", "nm": "Dân-số Ký", "dt": "Phục-truyền Luật-lệ Ký",
        "js": "Giô-suê", "jud": "Các Quan Xét", "rt": "Ru-tơ", "1sm": "1 Sa-mu-ên", "2sm": "2 Sa-mu-ên",
        "1kgs": "1 Các Vua", "2kgs": "2 Các Vua", "1ch": "1 Sử-ký", "2ch": "2 Sử-ký",
        "ezr": "E-xơ-ra", "ne": "Nê-hê-mi", "et": "Ê-stê", "job": "Gióp", "ps": "Thi-thiên",
        "prv": "Châm-ngôn", "ec": "Truyền-đạo", "so": "Nhã-ca", "is": "Ê-sai",
        "jr": "Giê-rê-mi", "lm": "Ca-thương", "ez": "Ê-xê-chi-ên", "dn": "Đa-ni-ên",
        "ho": "Ô-sê", "jl": "Giô-ên", "am": "A-mốt", "ob": "Áp-đia", "jn": "Giô-na",
        "mi": "Mi-chê", "na": "Na-hum", "hk": "Ha-ba-cúc", "zp": "Sô-phô-ni", "hg": "A-gai",
        "zc": "Xa-cha-ri", "ml": "Ma-la-chi", "mt": "Ma-thi-ơ", "mk": "Mác", "lk": "Lu-ca",
        "jo": "Giăng", "act": "Công-vụ", "rm": "Rô-ma", "1co": "1 Cô-rinh-tô", "2co": "2 Cô-rinh-tô",
        "gl": "Ga-la-ti", "eph": "Ê-phê-sô", "ph": "Phi-líp", "cl": "Cô-lô-se",
        "1ts": "1 Tê-sa-lô-ni-ca", "2ts": "2 Tê-sa-lô-ni-ca", "1tm": "1 Ti-mô-thê",
        "2tm": "2 Ti-mô-thê", "tt": "Tít", "phm": "Phi-lê-môn", "hb": "Hê-bơ-rơ", "jm": "Gia-cơ",
        "1pe": "1 Phi-e-rơ", "2pe": "2 Phi-e-rơ", "1jo": "1 Giăng", "2jo": "2 Giăng", "3jo": "3 Giăng",
        "jd": "Giu-đa", "re": "Khải-huyền"
    }
};

function getBookName(book) {
    const langDict = BOOK_NAMES[state.lang] || BOOK_NAMES['es'];
    return langDict[book.abbrev] || book.name || book.abbrev;
}

// Application State
const state = {
    bibleData: null,
    fontSize: 1.25, // default rem
    fontFamily: 'serif', // default family
    lang: localStorage.getItem('lang') || 'es',
    apiFile: localStorage.getItem('apiFile') || 'es_rvr',
    currentBook: null,
    currentChapter: 1,
    searchResults: [],
    theme: localStorage.getItem('theme') || 'light',
    isSidebarOpen: false,
    isSidebarPinned: localStorage.getItem('sidebarPinned') === 'true',
    navView: 'books', // 'books', 'chapters', 'verses'
    navSelectedBook: null,
    navSelectedChapter: null
};

// DOM Elements
const elements = {
    booksList: document.getElementById('books-list'),
    versesContainer: document.getElementById('verses-container'),
    chapterTitle: document.getElementById('chapter-title'),
    breadcrumb: document.getElementById('bread-crumb'),
    fontDecreaseBtn: document.getElementById('font-decrease'),
    fontIncreaseBtn: document.getElementById('font-increase'),
    readerContainer: document.getElementById('reader-container'),
    initialState: document.getElementById('initial-state'),
    themeToggle: document.getElementById('theme-toggle'),
    themeToggleMobile: document.getElementById('theme-toggle-mobile'),
    themeIcon: document.getElementById('theme-icon'),
    themeIconMobile: document.getElementById('theme-icon-mobile'),
    menuToggle: document.getElementById('menu-toggle'),
    sidebar: document.getElementById('sidebar'),
    sidebarOverlay: document.getElementById('sidebar-overlay'),
    closeSidebar: document.getElementById('close-sidebar'),
    pinSidebar: document.getElementById('pin-sidebar'),
    mainContent: document.getElementById('main-content'),
    globalSearch: document.getElementById('global-search'),
    searchMobileTrigger: document.getElementById('search-mobile-trigger'),
    searchModal: document.getElementById('search-modal'),
    modalSearchInput: document.getElementById('modal-search-input'),
    searchResultsContainer: document.getElementById('search-results'),
    closeSearch: document.getElementById('close-search'),
    languageSelect: document.getElementById('language-select'),
    languageSelectMobile: document.getElementById('language-select-mobile'),
    liveAudioBar: document.getElementById('live-audio-bar'),
    liveAudioReference: document.getElementById('live-audio-reference'),
    liveAudioPlayBtn: document.getElementById('live-audio-play-btn'),
    livePlayIcon: document.getElementById('live-play-icon'),
    livePauseIcon: document.getElementById('live-pause-icon'),
    liveSyncIcon: document.getElementById('live-sync-icon'),
    liveBtnText: document.getElementById('live-btn-text'),
    liveLoopCounter: document.getElementById('live-loop-counter')
};

// --- Live Audio State ---
const liveState = {
    GLOBAL_EPOCH: new Date("2026-02-01T00:00:00Z").getTime(),
    VERSE_DURATION: 12000, // 12 seconds fixed per verse ensures global sync
    flatBibleList: [],
    isLiveMode: true,
    isPlaying: false,
    currentUtterance: null,
    syncInterval: null,
    lastPlayedIndex: -1
};

// --- Typography Controllers ---

function applyTypography() {
    if (!elements.readerContainer) return;
    elements.readerContainer.style.setProperty('--reader-font-size', `${state.fontSize}rem`);

    // If we are currently tracking live, re-apply the highlight since resizing might have moved scroll
    if (liveState.isLiveMode && liveState.lastPlayedIndex !== -1) {
        const globalPos = getGlobalPosition();
        if (globalPos) {
            // Let UI stabilize, then re-scroll
            setTimeout(() => highlightActiveVerse(globalPos.verseData.verseNum), 100);
        }
    }
}

function handleFontDecrease() {
    // Min font size 0.875rem
    if (state.fontSize > 0.875) {
        state.fontSize -= 0.125;
        localStorage.setItem('fontSize', state.fontSize.toString());
        applyTypography();
    }
}

function handleFontIncrease() {
    // Max font size 2.5rem
    if (state.fontSize < 2.5) {
        state.fontSize += 0.125;
        localStorage.setItem('fontSize', state.fontSize.toString());
        applyTypography();
    }
}

function handleFontFamilyToggle() {
    state.fontFamily = state.fontFamily === 'serif' ? 'sans' : 'serif';
    localStorage.setItem('fontFamily', state.fontFamily);
    applyTypography();
}

// --- Initialization ---

async function init() {
    setupTheme();
    setupEventListeners();
    setupPinState();

    // Sync language selects with current state
    if (elements.languageSelect) elements.languageSelect.value = state.lang;
    if (elements.languageSelectMobile) elements.languageSelectMobile.value = state.lang;

    await fetchBibleData();
    renderBooks();

    // Check live mode preference. Default to true for new users.
    const storedLiveMode = localStorage.getItem('isLiveMode');
    liveState.isLiveMode = storedLiveMode === null ? true : storedLiveMode === 'true';

    // Initialize Typography
    const storedFontSize = localStorage.getItem('fontSize');
    if (storedFontSize) state.fontSize = parseFloat(storedFontSize);

    applyTypography();

    initLiveAudio();

    // If not live tracking and has a last book, go there
    if (!liveState.isLiveMode) {
        const lastBook = localStorage.getItem('lastBook');
        const lastChapter = parseInt(localStorage.getItem('lastChapter'));
        if (lastBook) {
            navigateTo(lastBook, lastChapter || 1, null, true);
        }
    } else {
        elements.initialState.classList.add('hidden');
        // Navigate to the current live verse for visual orientation,
        // then auto-start playback (browsers allow audio after page-interactive)
        const globalPos = getGlobalPosition();
        if (globalPos) {
            const { abbrev, chapterNum, verseNum } = globalPos.verseData;
            // Immediate visual sync
            navigateTo(abbrev, chapterNum, verseNum, true);

            // Start audio if allowed
            setTimeout(() => {
                if (!liveState.isPlaying) toggleLiveAudio();
            }, 500);
        }
    }
}

// --- Data Fetching ---

async function fetchBibleData() {
    try {
        const url = `https://raw.githubusercontent.com/thiagobodruk/bible/master/json/${state.apiFile}.json`;
        const response = await fetch(url);
        state.bibleData = await response.json();
        console.log('Bible data loaded:', state.bibleData.length, 'books', state.lang);
    } catch (error) {
        console.error('Error loading Bible data:', error);
        elements.booksList.innerHTML = '<p class="p-4 text-red-500 text-sm">Error al cargar datos. Reintente más tarde.</p>';
        throw error;
    }
}

// --- Language Controller ---

async function changeLanguage(lang, apiFile) {
    state.lang = lang;
    state.apiFile = apiFile;
    localStorage.setItem('lang', lang);
    localStorage.setItem('apiFile', apiFile);

    // Sync selects
    elements.languageSelect.value = lang;
    elements.languageSelectMobile.value = lang;

    // Show loading
    elements.versesContainer.innerHTML = '<div class="animate-pulse space-y-4 pt-10"><div class="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full"></div><div class="h-4 bg-gray-200 dark:bg-gray-800 rounded w-5/6"></div><div class="h-4 bg-gray-200 dark:bg-gray-800 rounded w-4/6"></div></div>';

    // Remember current position
    const { currentBook, currentChapter } = state;

    await fetchBibleData();
    buildFlatBibleList();

    if (currentBook) {
        navigateTo(currentBook, currentChapter || 1, null, true);
    } else {
        renderBooks();
    }
}

// --- Navigation & Rendering ---

function renderBooks() {
    if (!state.bibleData) return;

    if (state.navView === 'books') {
        elements.booksList.innerHTML = state.bibleData.map((book, index) => {
            const name = getBookName(book);
            return `
                <button class="book-item w-full text-left px-4 py-3 text-sm flex items-center gap-3 transition-colors ${state.currentBook === book.abbrev ? 'active' : ''}" 
                        onclick="navSelectBook('${book.abbrev}')">
                    <span class="w-6 h-6 flex items-center justify-center rounded-md bg-gray-100 dark:bg-gray-800 text-[10px] font-bold text-gray-400">
                        ${index + 1}
                    </span>
                    ${name}
                </button>
            `;
        }).join('');
    } else if (state.navView === 'chapters') {
        const book = state.bibleData.find(b => b.abbrev === state.navSelectedBook);
        if (!book) return;

        const bookName = getBookName(book);
        let html = `
            <div class="px-2 pb-4 border-b border-gray-100 dark:border-gray-900 mb-4">
                <button onclick="navGoBack()" class="flex items-center gap-2 text-sm text-gray-500 hover:text-gemini-accent transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                    Volver a Libros
                </button>
                <div class="mt-2 font-semibold text-lg">${bookName}</div>
                <div class="text-xs text-gray-500">Selecciona un capítulo</div>
            </div>
            <div class="grid grid-cols-5 gap-2 px-2">
        `;

        book.chapters.forEach((_, index) => {
            const isActive = (state.currentBook === state.navSelectedBook && state.currentChapter === (index + 1)) ? 'active' : '';
            html += `
                <button class="nav-grid-item ${isActive} aspect-square flex items-center justify-center rounded-lg text-sm font-medium transition-all hover:bg-gemini-accent hover:text-white dark:hover:bg-gemini-accent dark:hover:text-white"
                        onclick="navSelectChapter(${index + 1})">
                    ${index + 1}
                </button>
            `;
        });

        html += `</div>`;
        elements.booksList.innerHTML = html;

    } else if (state.navView === 'verses') {
        const book = state.bibleData.find(b => b.abbrev === state.navSelectedBook);
        if (!book) return;

        const chapter = book.chapters[state.navSelectedChapter - 1];
        if (!chapter) return;

        const bookName = getBookName(book);
        let html = `
            <div class="px-2 pb-4 border-b border-gray-100 dark:border-gray-900 mb-4">
                <button onclick="navGoBack()" class="flex items-center gap-2 text-sm text-gray-500 hover:text-gemini-accent transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                    Volver a Capítulos
                </button>
                <div class="mt-2 font-semibold text-lg">${bookName} ${state.navSelectedChapter}</div>
                <div class="text-xs text-gray-500">Selecciona un versículo</div>
            </div>
            <div class="grid grid-cols-5 gap-2 px-2">
        `;

        chapter.forEach((_, index) => {
            html += `
                <button class="nav-grid-item aspect-square flex items-center justify-center rounded-lg text-sm font-medium transition-all hover:bg-gemini-accent hover:text-white dark:hover:bg-gemini-accent dark:hover:text-white"
                        onclick="navSelectVerse(${index + 1})">
                    ${index + 1}
                </button>
            `;
        });

        html += `</div>`;
        elements.booksList.innerHTML = html;
    }

    // Scroll active element into view
    setTimeout(() => {
        const activeEl = elements.booksList.querySelector('.active');
        if (activeEl) {
            activeEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, 50);
}

function navSelectBook(abbrev) {
    state.navSelectedBook = abbrev;
    state.navView = 'chapters';
    renderBooks();
}

function navSelectChapter(chapterNum) {
    state.navSelectedChapter = chapterNum;
    state.navView = 'verses';
    renderBooks();
}

function navSelectVerse(verseNum) {
    navigateTo(state.navSelectedBook, state.navSelectedChapter, verseNum);
}

function navGoBack() {
    if (state.navView === 'verses') {
        state.navView = 'chapters';
    } else if (state.navView === 'chapters') {
        state.navView = 'books';
    }
    renderBooks();
}

function navigateTo(abbrev, chapterNum, verseNum = null, isAuto = false) {
    const book = state.bibleData.find(b => b.abbrev === abbrev);
    if (!book) return;

    if (!isAuto && liveState.isLiveMode) {
        liveState.isLiveMode = false;
        localStorage.setItem('isLiveMode', 'false');
        elements.liveAudioSyncBtn.classList.remove('hidden');
        elements.liveAudioReference.textContent = 'Modo Manual';
    }

    state.currentBook = abbrev;
    state.currentChapter = chapterNum;

    if (state.isSidebarPinned) {
        state.navView = verseNum ? 'verses' : 'chapters';
        state.navSelectedBook = abbrev;
        state.navSelectedChapter = chapterNum;
    } else {
        // Reset sidebar view logically (so it opens to books next time)
        state.navView = 'books';
        state.navSelectedBook = null;
        state.navSelectedChapter = null;
    }

    // Save to local storage
    localStorage.setItem('lastBook', abbrev);
    localStorage.setItem('lastChapter', chapterNum);

    renderChapter(book, chapterNum);
    renderBooks();
    closeSidebar();

    // Hide initial state
    elements.initialState.classList.add('hidden');
    elements.readerContainer.classList.remove('opacity-0', 'translate-y-4');

    if (verseNum) {
        // Scroll to specific verse
        setTimeout(() => {
            const verseEl = document.getElementById(`verse-${verseNum}`);
            if (verseEl) {
                const yOffset = -80; // Account for fixed header
                const y = verseEl.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({ top: y, behavior: 'smooth' });

                // Add highlight effect
                verseEl.classList.add('verse-highlight');
                setTimeout(() => {
                    verseEl.classList.remove('verse-highlight');
                }, 2500);
            }
        }, 100); // small delay to ensure DOM is updated
    } else {
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function renderChapter(book, chapterNum) {
    const chapterIndex = chapterNum - 1;
    const chapters = book.chapters;

    if (!chapters[chapterIndex]) return;

    const verses = chapters[chapterIndex];

    const bookName = getBookName(book);
    elements.breadcrumb.textContent = `${bookName} • Capítulo ${chapterNum}`;
    elements.chapterTitle.textContent = `${bookName} ${chapterNum}`;

    elements.versesContainer.innerHTML = verses.map((verse, index) => `
        <div id="verse-${index + 1}" class="verse-block group">
            <span class="verse-num">${index + 1}</span>
            <span class="verse-text">${verse}</span>
        </div>
    `).join('');

    // Add navigation buttons at the bottom
    renderChapterNav(book, chapterNum);
}

function renderChapterNav(book, chapterNum) {
    const totalChapters = book.chapters.length;
    let navHtml = '<div class="flex justify-between items-center pt-16 pb-12 border-t dark:border-gray-800 mt-12">';

    if (chapterNum > 1) {
        navHtml += `
            <button onclick="navigateTo('${book.abbrev}', ${chapterNum - 1})" class="flex items-center gap-2 text-sm text-gray-500 hover:text-gemini-accent transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                Anterior
            </button>
        `;
    } else {
        navHtml += '<div></div>';
    }

    // Chapter indicator/selector (Simplified for now)
    navHtml += `<span class="text-xs font-semibold text-gray-400">${chapterNum} / ${totalChapters}</span>`;

    if (chapterNum < totalChapters) {
        navHtml += `
            <button onclick="navigateTo('${book.abbrev}', ${chapterNum + 1})" class="flex items-center gap-2 text-sm text-gray-500 hover:text-gemini-accent transition-colors text-right">
                Siguiente
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>
        `;
    } else {
        navHtml += '<div></div>';
    }

    navHtml += '</div>';
    elements.versesContainer.insertAdjacentHTML('beforeend', navHtml);
}

// --- Search Logic ---

function performSearch(query) {
    if (!query || query.length < 3) return;

    const results = [];
    const lowerQuery = query.toLowerCase();

    // Basic search across all books
    state.bibleData.forEach(book => {
        book.chapters.forEach((chapter, cIndex) => {
            chapter.forEach((verse, vIndex) => {
                if (verse.toLowerCase().includes(lowerQuery)) {
                    results.push({
                        book: getBookName(book),
                        abbrev: book.abbrev,
                        chapter: cIndex + 1,
                        verseNum: vIndex + 1,
                        text: verse
                    });
                }
            });
        });
    });

    renderSearchResults(results, query);
}

function renderSearchResults(results, query) {
    elements.searchResultsContainer.innerHTML = `
        <div class="mb-4 text-sm text-gray-500">
            ${results.length} results for "${query}"
        </div>
        ${results.map(res => `
            <div class="p-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 cursor-pointer hover:border-gemini-accent transition-all"
                 onclick="closeSearchModal(); navigateTo('${res.abbrev}', ${res.chapter})">
                <div class="text-xs font-bold text-gemini-accent mb-1 uppercase tracking-wider">
                    ${res.book} ${res.chapter}:${res.verseNum}
                </div>
                <div class="text-sm leading-relaxed">
                    ${highlightText(res.text, query)}
                </div>
            </div>
        `).join('')}
    `;

    if (results.length === 0) {
        elements.searchResultsContainer.innerHTML = `
            <div class="flex flex-col items-center justify-center pt-20 text-center">
                <p class="text-gray-500">No results found for "${query}"</p>
            </div>
        `;
    }
}

function highlightText(text, query) {
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map(part =>
        part.toLowerCase() === query.toLowerCase()
            ? `<mark class="bg-yellow-200 dark:bg-yellow-900/40 dark:text-yellow-200 rounded px-1">${part}</mark>`
            : part
    ).join('');
}

// --- Live Audio Controller ---

function buildFlatBibleList() {
    liveState.flatBibleList = [];
    if (!state.bibleData) return;

    state.bibleData.forEach(book => {
        book.chapters.forEach((chapter, cIndex) => {
            chapter.forEach((verse, vIndex) => {
                liveState.flatBibleList.push({
                    abbrev: book.abbrev,
                    chapterNum: cIndex + 1,
                    verseNum: vIndex + 1,
                    text: verse
                });
            });
        });
    });
}

function getGlobalPosition() {
    if (!liveState.flatBibleList.length) return null;

    // Calculate global delta regardless of language
    const elapsed = Date.now() - liveState.GLOBAL_EPOCH;
    const totalDuration = liveState.flatBibleList.length * liveState.VERSE_DURATION;

    // Calculate loops
    const loops = Math.floor(elapsed / totalDuration) + 1;

    const currentPositionInLoop = elapsed % totalDuration;
    const globalVerseIndex = Math.floor(currentPositionInLoop / liveState.VERSE_DURATION);

    return {
        index: globalVerseIndex,
        verseData: liveState.flatBibleList[globalVerseIndex],
        loops: loops
    };
}

function updateLiveUI() {
    const globalPos = getGlobalPosition();
    if (!globalPos) return;

    const { abbrev, chapterNum, verseNum, text } = globalPos.verseData;
    const bookName = getBookName({ abbrev });

    elements.liveAudioReference.textContent = `${bookName} ${chapterNum}:${verseNum}`;

    if (elements.liveLoopCounter) {
        elements.liveLoopCounter.textContent = `Reading #${globalPos.loops}`;
        elements.liveLoopCounter.classList.remove('hidden');
    }

    if (!liveState.isLiveMode) {
        document.querySelectorAll('.verse-active').forEach(el => el.classList.remove('verse-active'));
        elements.liveBtnText.textContent = "Activate Live";
        elements.livePlayIcon.classList.add('hidden');
        elements.livePauseIcon.classList.add('hidden');
        elements.liveSyncIcon.classList.remove('hidden');
        return;
    }

    // Is in live mode
    elements.liveSyncIcon.classList.add('hidden');
    if (liveState.isPlaying) {
        elements.liveBtnText.textContent = "Pause Audio";
        elements.livePlayIcon.classList.add('hidden');
        elements.livePauseIcon.classList.remove('hidden');
    } else {
        elements.liveBtnText.textContent = "Activate Audio";
        elements.livePlayIcon.classList.remove('hidden');
        elements.livePauseIcon.classList.add('hidden');
    }

    // Play audio logic
    if (liveState.isPlaying && globalPos.index !== liveState.lastPlayedIndex) {
        liveState.lastPlayedIndex = globalPos.index;
        playVerseAudio(text);
    }

    // Navigate and Highlight
    if (state.currentBook !== abbrev || state.currentChapter !== chapterNum) {
        navigateTo(abbrev, chapterNum, verseNum, true);
    } else {
        highlightActiveVerse(verseNum);
    }
}

function highlightActiveVerse(verseNum) {
    document.querySelectorAll('.verse-active').forEach(el => el.classList.remove('verse-active'));
    const verseEl = document.getElementById(`verse-${verseNum}`);
    if (verseEl) {
        verseEl.classList.add('verse-active');

        // Auto-scroll if out of view
        const rect = verseEl.getBoundingClientRect();
        const isInView = (
            rect.top >= 100 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) - 100
        );
        if (!isInView) {
            const yOffset = -200; // Account for headers
            const y = rect.top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    }
}

function getBestVoice(targetLang) {
    const voices = window.speechSynthesis.getVoices();
    if (!voices.length) return null;

    // Filter by language prefix
    const prefix = targetLang.split('-')[0].toLowerCase();
    const langVoices = voices.filter(v => v.lang.toLowerCase().startsWith(prefix));

    if (langVoices.length === 0) return null;

    // Prefer high quality / natural voices
    const premiumKeywords = ['premium', 'enhanced', 'natural', 'google', 'neural', 'multilingual'];

    // First pass: look for premium keywords
    for (const v of langVoices) {
        if (premiumKeywords.some(kw => v.name.toLowerCase().includes(kw))) {
            return v;
        }
    }

    // Second pass: well-known pleasant voices (Mac/iOS/Windows)
    const goodNames = ['paulina', 'monica', 'jorge', 'luciana', 'samantha', 'tom', 'ava', 'microsoft elena', 'microsoft sabina'];
    for (const v of langVoices) {
        if (goodNames.some(name => v.name.toLowerCase().includes(name))) {
            return v;
        }
    }

    // Default fallback
    return langVoices.find(v => v.default) || langVoices[0];
}

function playVerseAudio(verseText) {
    if (!liveState.isPlaying) return;

    if (liveState.currentUtterance) {
        window.speechSynthesis.cancel();
    }

    liveState.currentUtterance = new SpeechSynthesisUtterance(verseText);

    // Default mapped locales
    const langMap = {
        'es': 'es-MX', // MX often has smoother default voices
        'en': 'en-US', 'pt': 'pt-BR', 'fr': 'fr-FR',
        'de': 'de-DE', 'ru': 'ru-RU', 'ko': 'ko-KR', 'zh': 'zh-CN',
        'el': 'el-GR', 'fi': 'fi-FI', 'ro': 'ro-RO', 'ar': 'ar-SA', 'vi': 'vi-VN'
    };

    const targetLang = langMap[state.lang] || 'es-ES';
    liveState.currentUtterance.lang = targetLang;

    // Attempt to set a high-quality human voice
    const bestVoice = getBestVoice(targetLang);
    if (bestVoice) {
        liveState.currentUtterance.voice = bestVoice;
    }

    // Tweak to make it softer, slower, and sweeter
    liveState.currentUtterance.rate = 0.88; // Slower pace for contemplation
    liveState.currentUtterance.pitch = 1.05; // Slightly sweeter/higher tone
    liveState.currentUtterance.volume = 1.0;

    window.speechSynthesis.speak(liveState.currentUtterance);
}

function toggleLiveAudio() {
    if (!liveState.isLiveMode) {
        syncToLive();
        return;
    }

    liveState.isPlaying = !liveState.isPlaying;

    if (liveState.isPlaying) {
        liveState.lastPlayedIndex = -1; // force trigger play/scroll
        const globalPos = getGlobalPosition();
        if (globalPos) {
            playVerseAudio(globalPos.verseData.text);
        }
    } else {
        window.speechSynthesis.cancel();
    }
    updateLiveUI();
}

function syncToLive() {
    liveState.isLiveMode = true;
    localStorage.setItem('isLiveMode', 'true');
    liveState.lastPlayedIndex = -1;

    // Auto-scroll to correct position upon sync
    const globalPos = getGlobalPosition();
    if (globalPos) {
        const { abbrev, chapterNum, verseNum } = globalPos.verseData;
        navigateTo(abbrev, chapterNum, verseNum, true);
    }

    updateLiveUI();
}

function initLiveAudio() {
    buildFlatBibleList();
    if (liveState.syncInterval) clearInterval(liveState.syncInterval);

    // Fire immediately so UI doesn't show 'loading connection'
    updateLiveUI();

    // Then keep syncing every second
    liveState.syncInterval = setInterval(() => updateLiveUI(), 1000);

    // Preload synthesis voices to ensure getBestVoice works when Play is clicked
    if (window.speechSynthesis && window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
        window.speechSynthesis.getVoices();
    }
}

// --- UI Utilities ---

function setupTheme() {
    if (state.theme === 'dark' || (!state.theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
        state.theme = 'dark';
    } else {
        document.documentElement.classList.remove('dark');
        state.theme = 'light';
    }
    updateThemeIcon();
}

function toggleTheme() {
    state.theme = state.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', state.theme);
    setupTheme();
}

function updateThemeIcon() {
    const iconHtml = state.theme === 'light'
        ? '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>'
        : '<circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path>';

    elements.themeIcon.innerHTML = iconHtml;
    if (elements.themeIconMobile) {
        elements.themeIconMobile.innerHTML = iconHtml;
    }
}

function setupPinState() {
    if (state.isSidebarPinned && window.innerWidth >= 768) {
        elements.pinSidebar.classList.add('pinned');
        elements.sidebar.classList.remove('-translate-x-full');
        elements.mainContent.classList.add('sidebar-pinned-margin');
        state.isSidebarOpen = true;
    }
}

function togglePinSidebar() {
    state.isSidebarPinned = !state.isSidebarPinned;
    localStorage.setItem('sidebarPinned', state.isSidebarPinned);

    if (state.isSidebarPinned) {
        elements.pinSidebar.classList.add('pinned');
        elements.mainContent.classList.add('sidebar-pinned-margin');
        elements.sidebarOverlay.classList.add('hidden');
        if (!state.isSidebarOpen) {
            state.isSidebarOpen = true;
            elements.sidebar.classList.remove('-translate-x-full');
        }
    } else {
        elements.pinSidebar.classList.remove('pinned');
        elements.mainContent.classList.remove('sidebar-pinned-margin');
        if (state.isSidebarOpen) {
            elements.sidebarOverlay.classList.remove('hidden');
        }
    }
}

function toggleSidebar() {
    if (state.isSidebarPinned && window.innerWidth >= 768) {
        togglePinSidebar();
        return;
    }

    state.isSidebarOpen = !state.isSidebarOpen;
    if (state.isSidebarOpen) {
        elements.sidebar.classList.remove('-translate-x-full');
        if (!state.isSidebarPinned || window.innerWidth < 768) {
            elements.sidebarOverlay.classList.remove('hidden');
        }
    } else {
        closeSidebar();
    }
}

function closeSidebar() {
    if (state.isSidebarPinned && window.innerWidth >= 768) return;

    state.isSidebarOpen = false;
    elements.sidebar.classList.add('-translate-x-full');
    elements.sidebarOverlay.classList.add('hidden');
}

function openSearchModal() {
    elements.searchModal.classList.remove('hidden');
    elements.modalSearchInput.focus();
}

function closeSearchModal() {
    elements.searchModal.classList.add('hidden');
}

// --- Event Listeners ---

function setupEventListeners() {
    elements.themeToggle.addEventListener('click', toggleTheme);
    if (elements.themeToggleMobile) {
        elements.themeToggleMobile.addEventListener('click', toggleTheme);
    }

    if (elements.fontDecreaseBtn) elements.fontDecreaseBtn.addEventListener('click', handleFontDecrease);
    if (elements.fontIncreaseBtn) elements.fontIncreaseBtn.addEventListener('click', handleFontIncrease);

    elements.menuToggle.addEventListener('click', toggleSidebar);
    elements.sidebarOverlay.addEventListener('click', closeSidebar);
    elements.closeSidebar.addEventListener('click', closeSidebar);
    if (elements.pinSidebar) {
        elements.pinSidebar.addEventListener('click', togglePinSidebar);
    }

    const handleLanguageChange = (e) => {
        const lang = e.target.value;
        const apiFiles = {
            'es': 'es_rvr',
            'en': 'en_kjv',
            'pt': 'pt_nvi',
            'fr': 'fr_apee',
            'de': 'de_schlachter',
            'ru': 'ru_synodal',
            'ko': 'ko_ko',
            'zh': 'zh_cuv',
            'el': 'el_greek',
            'fi': 'fi_finnish',
            'ro': 'ro_cornilescu',
            'ar': 'ar_svd',
            'vi': 'vi_vietnamese'
        };
        changeLanguage(lang, apiFiles[lang]);
    };

    if (elements.languageSelect) {
        elements.languageSelect.addEventListener('change', handleLanguageChange);
    }
    if (elements.languageSelectMobile) {
        elements.languageSelectMobile.addEventListener('change', handleLanguageChange);
    }

    // Search related
    elements.globalSearch.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            openSearchModal();
            elements.modalSearchInput.value = e.target.value;
            performSearch(e.target.value);
        }
    });

    elements.searchMobileTrigger.addEventListener('click', openSearchModal);
    elements.closeSearch.addEventListener('click', closeSearchModal);

    elements.modalSearchInput.addEventListener('input', (e) => {
        const query = e.target.value;
        if (query.length >= 3) {
            performSearch(query);
        }
    });

    if (elements.liveAudioPlayBtn) {
        elements.liveAudioPlayBtn.addEventListener('click', toggleLiveAudio);
    }
}

// Global expose for onclick handlers
window.navigateTo = navigateTo;
window.closeSearchModal = closeSearchModal;
window.navSelectBook = navSelectBook;
window.navSelectChapter = navSelectChapter;
window.navSelectVerse = navSelectVerse;
window.navGoBack = navGoBack;

// Run it
document.addEventListener('DOMContentLoaded', init);
