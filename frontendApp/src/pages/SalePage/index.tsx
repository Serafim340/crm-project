import { useFormik } from 'formik'
import { withZodSchema } from 'formik-validator-zod'
import { z } from 'zod'
import { Input } from '../../components/Input'
import { Segment } from '../../components/Segment'
import { Textarea } from '../../components/TextArea'

export const SalePage = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      location: '',
      description: '',
      text: '',
    },
    validate: withZodSchema(
      z.object({
        name: z.string().min(1),
        location: z
          .string()
          .min(1)
          .regex(/^[a-z0-9-]+$/, 'Участок может содержать только строчные буквы, цифры и дефисы'),
        description: z.string().min(1),
        text: z.string().min(100),
      })
    ),

    onSubmit: (values) => {
      console.info('Submitted', values)
    },
  })

  return (
    <Segment title="Меню продажи">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          formik.handleSubmit()
        }}
      >
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
