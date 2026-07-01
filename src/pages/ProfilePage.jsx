import { useEffect, useState } from 'react'
import { Alert, Button, Form } from 'react-bootstrap'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useLanguage } from '../context/LanguageContext'
import useThemeStore from '../store/themeStore'

function ProfilePage() {
  const { currentUser, isAuthenticated, logout, updateProfile } = useAuth()
  const { t, language, setLanguage } = useLanguage()
  const theme = useThemeStore((state) => state.theme)
  const toggleTheme = useThemeStore((state) => state.toggleTheme)
  const [fullName, setFullName] = useState(currentUser?.fullName ?? '')
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    setFullName(currentUser?.fullName ?? '')
  }, [currentUser])

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    updateProfile({ fullName: fullName.trim() || currentUser.fullName })
    setSuccessMessage(t('profileSuccess'))
  }

  return (
    <section className="row justify-content-center">
      <div className="col-xl-8">
        <div className="glass-panel rounded-5 p-4 p-lg-5 d-grid gap-4">
          <div className="d-flex flex-column flex-lg-row justify-content-between gap-3 align-items-lg-start">
            <div>
              <p className="section-title mb-2">{t('profile')}</p>
              <h1 className="display-6 text-white mb-2">{t('profileTitle')}</h1>
              <p className="text-light mb-0">{t('profileSubtitle')}</p>
            </div>
            <Button type="button" variant="danger" onClick={logout}>
              {t('profileLogout')}
            </Button>
          </div>

          <div className="row g-4">
            <div className="col-lg-5">
              <div className="glass-panel rounded-4 p-4 h-100">
                <p className="section-title mb-3">{t('settings')}</p>
                <div className="d-grid gap-3 text-light">
                  <div>
                    <div className="text-secondary small">{t('fullName')}</div>
                    <div className="fw-semibold text-white">{currentUser.fullName}</div>
                  </div>
                  <div>
                    <div className="text-secondary small">{t('email')}</div>
                    <div className="fw-semibold text-white">{currentUser.email}</div>
                  </div>
                  <div>
                    <div className="text-secondary small">{t('theme')}</div>
                    <Button
                      type="button"
                      variant={theme === 'dark' ? 'outline-light' : 'outline-dark'}
                      className="w-100"
                      onClick={toggleTheme}
                    >
                      {theme === 'dark' ? t('lightTheme') : t('darkTheme')}
                    </Button>
                  </div>
                  <div>
                    <div className="text-secondary small">{t('language')}</div>
                    <Button
                      type="button"
                      variant={theme === 'dark' ? 'outline-light' : 'outline-dark'}
                      className="w-100"
                      onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
                    >
                      {language === 'en' ? t('arabic') : t('english')}
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-7">
              <div className="glass-panel rounded-4 p-4 h-100">
                <p className="section-title mb-2">{t('profileEditTitle')}</p>
                <p className="text-light mb-4">{t('profileEditSubtitle')}</p>

                {successMessage ? <Alert variant="success">{successMessage}</Alert> : null}

                <Form className="d-grid gap-3" onSubmit={handleSubmit}>
                  <Form.Group controlId="profileFullName">
                    <Form.Label className="text-light">{t('fullName')}</Form.Label>
                    <Form.Control
                      type="text"
                      value={fullName}
                      onChange={(event) => setFullName(event.target.value)}
                      className="theme-input"
                    />
                  </Form.Group>

                  <Form.Group controlId="profileEmail">
                    <Form.Label className="text-light">{t('email')}</Form.Label>
                    <Form.Control value={currentUser.email} className="theme-input" disabled readOnly />
                  </Form.Group>

                  <Button type="submit" variant="danger" size="lg">
                    {t('profileSave')}
                  </Button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProfilePage