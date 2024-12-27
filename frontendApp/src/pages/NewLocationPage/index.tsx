import { zNewLocationTrpcInput } from '@WebApp/backendApp/src/router/newLocation/input'
import { useFormik } from 'formik'
import { withZodSchema } from 'formik-validator-zod'
import { useState } from 'react'
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
      id: '',
      name: '',
      location: '',
      description: '',
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
        <Input name="id" label="Номер" formik={formik} />
        <Input name="name" label="Менеджер" formik={formik} />
        <Input name="location" label="Участок" formik={formik} />
        <Input name="description" label="Товар" formik={formik} />
        <Textarea name="text" label="Комментарий" formik={formik} />
        {!formik.isValid && !!formik.submitCount && <div style={{ color: 'red' }}>Поля должны быть заполнены</div>}
        {submittingError && <div style={{ color: 'red' }}>{submittingError}</div>}
        {successMessageVisible && <div style={{ color: 'green' }}>Участок успешно создан</div>}
        <button type="submit" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? 'Регистрация...' : 'Зарегистрировать'}
        </button>
      </form>
    </Segment>
  )
}
