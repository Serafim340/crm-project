import { zSignUpTrpcInput } from '@WebApp/backendApp/src/router/signUp/input'
import { useFormik } from 'formik'
import { withZodSchema } from 'formik-validator-zod'
import Cookies from 'js-cookie'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { Alert } from '../../components/Alert'
import { Button } from '../../components/Button'
import { FormItems } from '../../components/Formitems'
import { Input } from '../../components/Input'
import { Segment } from '../../components/Segment'
import { getAllLocationsRoute } from '../../lib/routes'
import { trpc } from '../../lib/trpc'

export const SignUpPage = () => {
  const navigate = useNavigate()
  const trpcUtils = trpc.useContext()
  const [submittingError, setSubmittingError] = useState<string | null>(null)
  const signUp = trpc.signUp.useMutation()
  const formik = useFormik({
    initialValues: {
      login: '',
      name: '',
      surname: '',
      password: '',
      passwordAgain: '',
    },
    validate: withZodSchema(
      zSignUpTrpcInput
        .extend({
          passwordAgain: z.string().min(1),
        })
        .superRefine((val, ctx) => {
          if (val.password !== val.passwordAgain) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: 'Оба введенных пароля должны быть идентичны!',
              path: ['passwordAgain'],
            })
          }
        })
    ),
    onSubmit: async (values) => {
      try {
        setSubmittingError(null)
        const { token } = await signUp.mutateAsync(values)
        Cookies.set('token', token, { expires: 99999 })
        void trpcUtils.invalidate()
        void navigate(getAllLocationsRoute())
      } catch (err: any) {
        setSubmittingError(err.message)
      }
    },
  })

  return (
    <Segment title="Регистрация">
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input label="Логин" name="login" formik={formik} />
          <Input label="Имя" name="name" formik={formik} />
          <Input label="Фамилия" name="surname" formik={formik} />
          <Input label="Пароль" name="password" type="password" formik={formik} />
          <Input label="Пароль еще раз" name="passwordAgain" type="password" formik={formik} />
          {!formik.isValid && !!formik.submitCount && <Alert color="red">Поля должны быть заполнены</Alert>}
          {submittingError && <Alert color="red">{submittingError}</Alert>}
          <Button loading={formik.isSubmitting}>Зарегистрироваться</Button>
        </FormItems>
      </form>
    </Segment>
  )
}
