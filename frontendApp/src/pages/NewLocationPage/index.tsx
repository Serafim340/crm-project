import { zNewLocationTrpcInput } from '@WebApp/backendApp/src/router/newLocation/input'
import { Alert } from '../../components/Alert'
import { Button } from '../../components/Button'
import { FormItems } from '../../components/Formitems'
import { Input } from '../../components/Input'
import { Segment } from '../../components/Segment'
import { useForm } from '../../lib/form'
import { trpc } from '../../lib/trpc'

export const NewLocationPage = () => {
  const newLocation = trpc.newLocation.useMutation()
  const { formik, buttonProps, alertProps } = useForm({
    initialValues: {
      name: '',
      address: '',
    },
    validationSchema: zNewLocationTrpcInput,

    onSubmit: async (values) => {
      await newLocation.mutateAsync(values)
      formik.resetForm()
    },
    successMessage: 'Участок успешно создан',
    showValidationAlert: true,
  })

  return (
    <Segment title="Новый участок">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          formik.handleSubmit()
        }}
      >
        <FormItems>
          <Input name="name" label="Участок" formik={formik} />
          <Input name="address" label="Адрес" formik={formik} />
          <Alert {...alertProps} />
          <Button {...buttonProps}>Создать участок</Button>
        </FormItems>
      </form>
    </Segment>
  )
}
