/* oxlint-disable react(only-export-components) */
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const LANGUAGE_STORAGE_KEY = 'movie-app-language'

const translations = {
  en: {
    appName: 'MovieScope',
    home: 'Home',
    search: 'Search',
    favorites: 'Favorites',
    profile: 'Profile',
    login: 'Login',
    register: 'Register',
    logout: 'Logout',
    searchMovies: 'Search movies',
    searchTitle: 'Find your next movie',
    searchPlaceholder: 'Try Inception, Interstellar, Dune...',
    searchEmptyTitle: 'Start with a movie title',
    searchEmptyDescription: 'Browse the latest releases, top-rated picks, and personal favorites.',
    noResultsTitle: 'No results found',
    noResultsDescription: 'We could not find anything for "{query}". Try a different title or a broader search.',
    results: 'Results',
    resultsCount: '{count} result{plural} for "{query}"',
    favoritesTitle: 'Your favorites',
    favoritesCount: 'You have {count} saved movie{plural}.',
    favoritesEmptyTitle: 'No saved movies yet',
    favoritesEmptyDescription: 'Save titles you like and they will appear here.',
    clearAll: 'Clear all',
    welcomeSection: 'Your movie hub',
    heroTitle: 'Sign in to save favorites, manage your profile, and personalize the experience.',
    heroSubtitle: 'Your account and saved movies stay on this device for a smooth return visit.',
    signInPrompt: 'Create an account or sign in to pick up where you left off.',
    welcomeBack: 'Welcome back,',
    theme: 'Appearance',
    language: 'Language',
    settings: 'Preferences',
    activeLanguage: 'English',
    authStatus: 'Account',
    signedIn: 'Signed in',
    guestMode: 'Browsing as guest',
    darkTheme: 'Dark',
    lightTheme: 'Light',
    english: 'English',
    arabic: 'Arabic',
    profileTitle: 'Account details',
    profileSubtitle: 'Review your profile and manage your app preferences.',
    fullName: 'Full name',
    email: 'Email address',
    password: 'Password',
    confirmPassword: 'Confirm password',
    signInTitle: 'Welcome back',
    signInSubtitle: 'Sign in to access your favorites and profile.',
    signInButton: 'Sign in',
    createAccountTitle: 'Create your account',
    createAccountSubtitle: 'Create an account to save your preferences and favorites on this device.',
    createAccountButton: 'Create account',
    alreadyAccount: 'Already signed up?',
    noAccount: 'New here?',
    profileSave: 'Save profile',
    profileLogout: 'Sign out',
    profileEditTitle: 'Edit your profile',
    profileEditSubtitle: 'Keep your display name up to date.',
    loginHelper: 'Use the email and password you created your account with.',
    registerHelper: 'Your account stays on this device for this demo.',
    loginSuccess: 'You are signed in.',
    registerSuccess: 'Your account is ready.',
    profileSuccess: 'Your profile was updated.',
    notFoundTitle: 'We could not find that page',
    notFoundDescription: 'The page you are looking for is not available.',
    backToHome: 'Go to home',
    footerText: 'Save favorites, manage your profile, and explore movies in one place.',
    errorTitle: 'We could not load this right now',
    loadingText: 'Loading movies',
    invalidCredentials: 'We could not sign you in with those details.',
    emailExists: 'That email is already in use.',
    passwordMismatch: 'Passwords do not match.',
    fullNameRequired: 'Please enter your full name.',
    emailRequired: 'Please enter your email address.',
    passwordRequired: 'Please enter your password.',
    confirmPasswordRequired: 'Please confirm your password.',
    invalidEmail: 'Please enter a valid email address.',
    requiredField: 'Please fill out this field.',
  },
  ar: {
    appName: 'موفي سكوب',
    home: 'الرئيسية',
    search: 'بحث',
    favorites: 'المفضلة',
    profile: 'الملف الشخصي',
    login: 'تسجيل الدخول',
    register: 'إنشاء حساب',
    logout: 'تسجيل الخروج',
    searchMovies: 'ابحث عن الأفلام',
    searchTitle: 'اعثر على فيلمك القادم',
    searchPlaceholder: 'جرّب Inception أو Interstellar أو Dune...',
    searchEmptyTitle: 'ابدأ بعنوان فيلم',
    searchEmptyDescription: 'تصفح أحدث الإصدارات والأعمال الأعلى تقييمًا ومفضلاتك الشخصية.',
    noResultsTitle: 'لا توجد نتائج',
    noResultsDescription: 'لم نجد نتائج لـ "{query}". جرّب عنوانًا مختلفًا أو بحثًا أوسع.',
    results: 'النتائج',
    resultsCount: 'تم العثور على {count} نتيجة لـ "{query}"',
    favoritesTitle: 'المفضلة',
    favoritesCount: 'لديك {count} فيلم محفوظ{plural}.',
    favoritesEmptyTitle: 'لا توجد أفلام محفوظة بعد',
    favoritesEmptyDescription: 'احفظ العناوين التي تعجبك وستظهر هنا.',
    clearAll: 'مسح الكل',
    welcomeSection: 'مركز أفلامك',
    heroTitle: 'سجّل الدخول لحفظ المفضلة وإدارة ملفك الشخصي وتخصيص تجربتك.',
    heroSubtitle: 'يبقى حسابك وأفلامك المحفوظة على هذا الجهاز لتعود بسهولة لاحقًا.',
    signInPrompt: 'أنشئ حسابًا أو سجّل الدخول لتكمل من حيث توقفت.',
    welcomeBack: 'مرحبًا بعودتك،',
    theme: 'المظهر',
    language: 'اللغة',
    settings: 'التفضيلات',
    activeLanguage: 'العربية',
    authStatus: 'الحساب',
    signedIn: 'مسجل الدخول',
    guestMode: 'تصفح كضيف',
    darkTheme: 'داكن',
    lightTheme: 'فاتح',
    english: 'الإنجليزية',
    arabic: 'العربية',
    profileTitle: 'تفاصيل الحساب',
    profileSubtitle: 'راجع ملفك الشخصي وأدِر تفضيلات التطبيق.',
    fullName: 'الاسم الكامل',
    email: 'البريد الإلكتروني',
    password: 'كلمة المرور',
    confirmPassword: 'تأكيد كلمة المرور',
    signInTitle: 'مرحبًا بعودتك',
    signInSubtitle: 'سجّل الدخول للوصول إلى المفضلة والملف الشخصي.',
    signInButton: 'تسجيل الدخول',
    createAccountTitle: 'أنشئ حسابك',
    createAccountSubtitle: 'أنشئ حسابًا لحفظ تفضيلاتك ومفضلاتك على هذا الجهاز.',
    createAccountButton: 'إنشاء الحساب',
    alreadyAccount: 'هل سجلت من قبل؟',
    noAccount: 'جديد هنا؟',
    profileSave: 'حفظ الملف',
    profileLogout: 'تسجيل الخروج',
    profileEditTitle: 'تعديل ملفك الشخصي',
    profileEditSubtitle: 'أبقِ اسم العرض محدثًا دائمًا.',
    loginHelper: 'استخدم البريد الإلكتروني وكلمة المرور اللذين أنشأت بهما حسابك.',
    registerHelper: 'يبقى حسابك على هذا الجهاز داخل هذا المثال فقط.',
    loginSuccess: 'تم تسجيل الدخول.',
    registerSuccess: 'حسابك جاهز.',
    profileSuccess: 'تم تحديث ملفك الشخصي.',
    notFoundTitle: 'الصفحة غير موجودة',
    notFoundDescription: 'الصفحة التي تبحث عنها غير متاحة.',
    backToHome: 'العودة للرئيسية',
    footerText: 'احفظ المفضلة وأدر ملفك الشخصي واستكشف الأفلام في مكان واحد.',
    errorTitle: 'تعذر تحميل هذه الصفحة الآن',
    loadingText: 'جارٍ تحميل الأفلام',
    invalidCredentials: 'تعذر تسجيل الدخول بهذه البيانات.',
    emailExists: 'هذا البريد الإلكتروني مستخدم بالفعل.',
    passwordMismatch: 'كلمتا المرور غير متطابقتين.',
    fullNameRequired: 'يرجى إدخال الاسم الكامل.',
    emailRequired: 'يرجى إدخال البريد الإلكتروني.',
    passwordRequired: 'يرجى إدخال كلمة المرور.',
    confirmPasswordRequired: 'يرجى تأكيد كلمة المرور.',
    invalidEmail: 'يرجى إدخال بريد إلكتروني صالح.',
    requiredField: 'يرجى تعبئة هذا الحقل.',
  },
}

const LanguageContext = createContext(null)

const getInitialLanguage = () => {
  if (typeof window === 'undefined') {
    return 'en'
  }

  const savedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY)

  if (savedLanguage === 'en' || savedLanguage === 'ar') {
    return savedLanguage
  }

  return window.navigator.language?.toLowerCase().startsWith('ar') ? 'ar' : 'en'
}

const formatMessage = (message, values = {}) =>
  message.replace(/\{(\w+)\}/g, (_, key) => {
    if (key === 'plural') {
      return Number(values.count) === 1 ? '' : 's'
    }

    return values[key] ?? ''
  })

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => getInitialLanguage())

  useEffect(() => {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language)
    document.documentElement.lang = language
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
  }, [language])

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t: (key, values) => {
        const message = translations[language]?.[key] ?? translations.en[key] ?? key
        return formatMessage(message, values)
      },
    }),
    [language],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)

  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }

  return context
}