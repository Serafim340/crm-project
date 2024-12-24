import { useState } from 'react'
import { Input } from '../../components/Input'
import { Segment } from '../../components/Segment'
import { Textarea } from '../../components/TextArea'

export const SalePage = () => {
  const [state, setState] = useState({
    name: '',
    nick: '',
    description: '',
    text: '',
  })

  return (
    <Segment title="Меню продажи">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          console.info('Submitted', state)
        }}
      >
        <Input name="name" label="Менеджер" state={state} setState={setState} />
        <Input name="location" label="Участок" state={state} setState={setState} />
        <Input name="description" label="Товар" state={state} setState={setState} />
        <Textarea name="text" label="Комментарий" state={state} setState={setState} />
        <button type="submit">Зарегистрировать</button>
      </form>
    </Segment>
  )
}
