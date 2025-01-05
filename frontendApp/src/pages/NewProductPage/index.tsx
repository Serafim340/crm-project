import { zNewProductTrpcInput } from '@WebApp/backendApp/src/router/newProduct/input'
import { Alert } from '../../components/Alert'
import { Button } from '../../components/Button'
import { FormItems } from '../../components/Formitems'
import { Input } from '../../components/Input'
import { Segment } from '../../components/Segment'
import { useForm } from '../../lib/form'
import { trpc } from '../../lib/trpc'

export const NewProductPage = () => {
  const newProduct = trpc.newProduct.useMutation()
  const { formik, buttonProps, alertProps } = useForm({
    initialValues: {
      name: '',
    },
    validationSchema: zNewProductTrpcInput,

    onSubmit: async (values) => {
      await newProduct.mutateAsync(values)
      formik.resetForm()
    },
    successMessage: 'Товар успешно создан',
    showValidationAlert: true,
  })

  return (
    <Segment title="Новый товар">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          formik.handleSubmit()
        }}
      >
        <FormItems>
          <Input name="name" label="Наименование" formik={formik} />
          <Alert {...alertProps} />
          <Button {...buttonProps}>Создать</Button>
        </FormItems>
      </form>
    </Segment>
  )
}
