import { zSignInTrpcInput } from '@WebApp/backendApp/src/router/signIn/input'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import { Alert } from '../../components/Alert'
import { Button } from '../../components/Button'
import { FormItems } from '../../components/Formitems'
import { Input } from '../../components/Input'
import { Segment } from '../../components/Segment'
import { useForm } from '../../lib/form'
import { getAllLocationsRoute } from '../../lib/routes'
import { trpc } from '../../lib/trpc'

export const SignInPage = () => {
  const navigate = useNavigate()
  const trpcUtils = trpc.useContext()
  const signIn = trpc.signIn.useMutation()
  const { formik, buttonProps, alertProps } = useForm({
    initialValues: {
      login: '',
      password: '',
    },
    validationSchema: zSignInTrpcInput,
    onSubmit: async (values) => {
      const { token } = await signIn.mutateAsync(values)
      Cookies.set('token', token, { expires: 99999 })
      void trpcUtils.invalidate()
      void navigate(getAllLocationsRoute())
    },
    resetOnSuccess: false,
  })

  return (
    <Segment title="Войти">
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input label="Логин" name="login" formik={formik} />
          <Input label="Пароль" name="password" type="password" formik={formik} />
          <Alert {...alertProps} />
          <Button {...buttonProps}>Sign In</Button>
        </FormItems>
      </form>
    </Segment>
  )
}
