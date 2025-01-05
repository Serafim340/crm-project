import { zSignUpTrpcInput } from '@WebApp/backendApp/src/router/signUp/input'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { Alert } from '../../components/Alert'
import { Button } from '../../components/Button'
import { FormItems } from '../../components/Formitems'
import { Input } from '../../components/Input'
import { Segment } from '../../components/Segment'
import { useForm } from '../../lib/form'
import { getAllLocationsRoute } from '../../lib/routes'
import { trpc } from '../../lib/trpc'

export const SignUpPage = () => {
  const navigate = useNavigate()
  const trpcUtils = trpc.useContext()
  const signUp = trpc.signUp.useMutation()
  const { formik, buttonProps, alertProps } = useForm({
    initialValues: {
      login: '',
      name: '',
      surname: '',
      password: '',
      passwordAgain: '',
    },
    validationSchema: zSignUpTrpcInput
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
      }),
    onSubmit: async (values) => {
      const { token } = await signUp.mutateAsync(values)
      Cookies.set('token', token, { expires: 99999 })
      void trpcUtils.invalidate()
      void navigate(getAllLocationsRoute())
    },
    resetOnSuccess: false,
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
          <Alert {...alertProps} />
          <Button {...buttonProps}>Зарегистрироваться</Button>
        </FormItems>
      </form>
    </Segment>
  )
}
