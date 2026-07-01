import { useState } from 'react'
import { Alert, Button, Form } from 'react-bootstrap'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useLanguage } from '../context/LanguageContext'
import useThemeStore from '../store/themeStore'

const INITIAL_FORM_STATE = {
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
}

function RegisterPage() {
  const navigate = useNavigate()
  const { register, isAuthenticated } = useAuth()
  const { t } = useLanguage()
  const theme = useThemeStore((state) => state.theme)
  const [formValues, setFormValues] = useState(INITIAL_FORM_STATE)
  const [errorMessage, setErrorMessage] = useState('')
  const [validationErrors, setValidationErrors] = useState({})

  if (isAuthenticated) {
    return <Navigate to="/profile" replace />
  }

  const validate = () => {
    const nextErrors = {}

    if (!formValues.fullName.trim()) {
      nextErrors.fullName = t('fullNameRequired')
    }

    if (!formValues.email.trim()) {
      nextErrors.email = t('emailRequired')
    } else if (!/^\S+@\S+\.\S+$/.test(formValues.email.trim())) {
      nextErrors.email = t('invalidEmail')
    }

    if (!formValues.password.trim()) {
      nextErrors.password = t('passwordRequired')
    }

    if (!formValues.confirmPassword.trim()) {
      nextErrors.confirmPassword = t('confirmPasswordRequired')
    } else if (formValues.password !== formValues.confirmPassword) {
      nextErrors.confirmPassword = t('passwordMismatch')
    }

    setValidationErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormValues((currentValues) => ({ ...currentValues, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    setErrorMessage('')

    if (!validate()) {
      return
    }

    const result = register(formValues)

    if (!result.ok) {
      setErrorMessage(result.message === 'Email already exists.' ? t('emailExists') : result.message)
      return
    }

    navigate('/profile', { replace: true })
  }

  return (
    <section className="row justify-content-center">
      <div className="col-lg-6 col-xl-5">
        <div className="glass-panel rounded-5 p-4 p-lg-5">
          <p className="section-title mb-2">{t('register')}</p>
          <h1 className="display-6 text-white mb-2">{t('createAccountTitle')}</h1>
          <p className="text-light mb-4">{t('createAccountSubtitle')}</p>

          {errorMessage ? <Alert variant="danger">{errorMessage}</Alert> : null}

          <Form className="d-grid gap-3" onSubmit={handleSubmit}>
            <Form.Group controlId="registerFullName">
              <Form.Label className="text-light">{t('fullName')}</Form.Label>
              <Form.Control
                type="text"
                name="fullName"
                value={formValues.fullName}
                onChange={handleChange}
                className="theme-input"
                isInvalid={Boolean(validationErrors.fullName)}
              />
              <Form.Control.Feedback type="invalid">{validationErrors.fullName}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="registerEmail">
              <Form.Label className="text-light">{t('email')}</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formValues.email}
                onChange={handleChange}
                className="theme-input"
                placeholder="name@example.com"
                isInvalid={Boolean(validationErrors.email)}
              />
              <Form.Control.Feedback type="invalid">{validationErrors.email}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="registerPassword">
              <Form.Label className="text-light">{t('password')}</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formValues.password}
                onChange={handleChange}
                className="theme-input"
                isInvalid={Boolean(validationErrors.password)}
              />
              <Form.Control.Feedback type="invalid">{validationErrors.password}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="registerConfirmPassword">
              <Form.Label className="text-light">{t('confirmPassword')}</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                value={formValues.confirmPassword}
                onChange={handleChange}
                className="theme-input"
                isInvalid={Boolean(validationErrors.confirmPassword)}
              />
              <Form.Control.Feedback type="invalid">{validationErrors.confirmPassword}</Form.Control.Feedback>
            </Form.Group>

            <Button type="submit" variant="danger" size="lg">
              {t('createAccountButton')}
            </Button>
          </Form>

          <div className="mt-4 d-flex flex-column flex-sm-row justify-content-between gap-2 text-light">
            <span>{t('alreadyAccount')}</span>
            <Link to="/login" className={`fw-semibold ${theme === 'dark' ? 'text-white' : 'text-dark'}`}>
              {t('login')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default RegisterPage