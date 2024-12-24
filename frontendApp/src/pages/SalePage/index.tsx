import { useState } from 'react'
import { Segment } from '../../components/Segment'

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
        <div style={{ marginBottom: 10 }}>
          <label htmlFor="name">Менеджер</label>
          <br />
          <input
            type="text"
            onChange={(e) => {
              setState({ ...state, name: e.target.value })
            }}
            value={state.name}
            name="name"
            id="name"
          />
        </div>

        <div style={{ marginBottom: 10 }}>
          <label htmlFor="nick">Участок</label>
          <br />
          <input
            type="text"
            onChange={(e) => {
              setState({ ...state, nick: e.target.value })
            }}
            value={state.nick}
            name="nick"
            id="nick"
          />
        </div>

        <div style={{ marginBottom: 10 }}>
          <label htmlFor="description">Товар</label>
          <br />
          <input
            type="text"
            onChange={(e) => {
              setState({ ...state, description: e.target.value })
            }}
            value={state.description}
            name="description"
            id="description"
          />
        </div>

        <div style={{ marginBottom: 10 }}>
          <label htmlFor="text">Комментарий</label>
          <br />
          <textarea
            onChange={(e) => {
              setState({ ...state, text: e.target.value })
            }}
            value={state.text}
            name="text"
            id="text"
          />
        </div>

        <button type="submit">Зарегистрировать</button>
      </form>
    </Segment>
  )
}
