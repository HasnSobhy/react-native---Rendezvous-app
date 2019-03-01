import I18n from 'ex-react-native-i18n';

I18n.fallbacks=true;

I18n.translations={

    en:{

        'profile':'Profile',
        'home':'Home',
        'organizeMeeting':'Organize Meeting',
        'logout':'Logout',
    },
    ar:{
        'profile':'الصفحة الشخصية',
        'home':'الرئيسية',
        'organizeMeeting':'اضف موعد',
        'logout':'تسجيل الخروج',
        
    }

};

I18n.locale='en';

export default I18n;