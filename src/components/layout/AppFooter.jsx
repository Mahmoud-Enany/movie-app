import { useLanguage } from '../../context/LanguageContext'

function AppFooter() {
  const { t } = useLanguage()

  return (
    <footer className="app-footer border-top py-4 text-center">
      <div className="container">
        <span className="d-block fw-semibold text-white">{t('appName')}</span>
        <span>{t('footerText')}</span>
      </div>
    </footer>
  )
}

export default AppFooter