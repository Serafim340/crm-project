import { useFormik } from 'formik'
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
        <button type="submit">Зарегистрировать</button>
      </form>
    </Segment>
  )
}
