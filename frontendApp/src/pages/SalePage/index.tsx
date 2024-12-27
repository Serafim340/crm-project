import { zNewLocationTrpcInput } from '@WebApp/backendApp/src/router/newLocation/input'
import { useFormik } from 'formik'
import { withZodSchema } from 'formik-validator-zod'
import { Input } from '../../components/Input'
import { Segment } from '../../components/Segment'
import { Textarea } from '../../components/TextArea'
import { trpc } from '../../lib/trpc'

export const SalePage = () => {
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
      await newLocation.mutateAsync(values)
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
        <button type="submit">Зарегистрировать</button>
      </form>
    </Segment>
  )
}
