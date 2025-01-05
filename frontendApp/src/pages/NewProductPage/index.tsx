import { zNewProductTrpcInput } from '@WebApp/backendApp/src/router/newProduct/input'
import { useFormik } from 'formik'
import { withZodSchema } from 'formik-validator-zod'
import { useState } from 'react'
import { Alert } from '../../components/Alert'
import { Button } from '../../components/Button'
import { FormItems } from '../../components/Formitems'
import { Input } from '../../components/Input'
import { Segment } from '../../components/Segment'
import { trpc } from '../../lib/trpc'

export const NewProductPage = () => {
  const [successMessageVisible, setSuccessMesageVisible] = useState(false)
  const [submittingError, setSubmittingError] = useState<string | null>(null)
  const newProduct = trpc.newProduct.useMutation()
  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validate: withZodSchema(zNewProductTrpcInput),

    onSubmit: async (values) => {
      try {
        await newProduct.mutateAsync(values)
        formik.resetForm()
        setSuccessMesageVisible(true)
        setTimeout(() => {
          setSuccessMesageVisible(false)
        }, 3000)
      } catch (error: any) {
        setSubmittingError(error.message)
        setTimeout(() => {
          setSubmittingError(null)
        }, 3000)
      }
    },
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
          {!formik.isValid && !!formik.submitCount && <div style={{ color: 'red' }}>Поля должны быть заполнены</div>}
          {submittingError && <Alert color="red">{submittingError}</Alert>}
          {successMessageVisible && <Alert color="green">Товар успешно создан</Alert>}
          <Button loading={formik.isSubmitting}>Создать</Button>
        </FormItems>
      </form>
    </Segment>
  )
}
