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
    validate: (values) => {
      const errors: Partial<typeof values> = {}
      if (!values.name) {
        errors.name = 'Имя обязательно'
      }
      if (!values.location) {
        errors.location = 'Участок обязателен'
      } else if (!values.location.match(/^[a-z0-9-]+$/)) {
        errors.location = 'Участок может содержать только строчные буквы, цифры и дефисы'
      }
      if (!values.description) {
        errors.description = 'Товар обязателен'
      }
      if (!values.text) {
        errors.text = 'Комментарий обязателен'
      } else if (values.text.length < 100) {
        errors.text = 'Комментарий должен быть не менее 100 символов'
      }
      return errors
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
        {!formik.isValid && <div style={{ color: 'red' }}>Поля должны быть заполнены</div>}
        <button type="submit">Зарегистрировать</button>
      </form>
    </Segment>
  )
}
