import { zNewLocationTrpcInput } from '@WebApp/backendApp/src/router/newLocation/input'
import { useFormik } from 'formik'
import { withZodSchema } from 'formik-validator-zod'
import { useState } from 'react'
import { Alert } from '../../components/Alert'
import { Button } from '../../components/Button'
import { FormItems } from '../../components/Formitems'
import { Input } from '../../components/Input'
import { Segment } from '../../components/Segment'
import { Textarea } from '../../components/TextArea'
import { trpc } from '../../lib/trpc'

export const NewLocationPage = () => {
  const [successMessageVisible, setSuccessMesageVisible] = useState(false)
  const [submittingError, setSubmittingError] = useState<string | null>(null)
  const newLocation = trpc.newLocation.useMutation()
  const formik = useFormik({
    initialValues: {
      name: '',
      text: '',
    },
    validate: withZodSchema(zNewLocationTrpcInput),

    onSubmit: async (values) => {
      try {
        await newLocation.mutateAsync(values)
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
    <Segment title="Новый участок">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          formik.handleSubmit()
        }}
      >
        <FormItems>
          <Input name="name" label="Участок" formik={formik} />
          <Textarea name="text" label="Товар" formik={formik} />
          {!formik.isValid && !!formik.submitCount && <div style={{ color: 'red' }}>Поля должны быть заполнены</div>}
          {submittingError && <Alert color="red">{submittingError}</Alert>}
          {successMessageVisible && <Alert color="green">Участок успешно создан</Alert>}
          <Button loading={formik.isSubmitting}>Зарегистрировать</Button>
        </FormItems>
      </form>
    </Segment>
  )
}
