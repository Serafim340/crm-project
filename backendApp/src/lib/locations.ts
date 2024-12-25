import _ from 'lodash'

export const locations = _.times(100, (i) => ({
  id: `location-${i}`,
  name: `Участок ${i}`,
  description: `Описание участка ${i}`,
  text: _.times(100, (j) => `<p>Текст участка ${j} предложения для участка ${i}</p>`).join(''),
}))
