import { format } from 'date-fns/format'
import { useParams } from 'react-router-dom'
import { LinkButton } from '../../../components/Button'
import { Segment } from '../../../components/Segment'
import { withPageWrapper } from '../../../lib/pageWrapper'
import { getEditLocationRoute, type ViewLocationRouteParams } from '../../../lib/routes'
import { trpc } from '../../../lib/trpc'
import css from './index.module.scss'

export const ViewLocationPage = withPageWrapper({
  useQuery: () => {
    const { locationName } = useParams() as ViewLocationRouteParams
    return trpc.getLocation.useQuery({
      locationName,
    })
  },
  checkExists: ({ queryResult }) => !!queryResult.data.location,
  checkExistsMessage: 'Участок не найден',
  setProps: ({ queryResult, ctx }) => ({
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    location: queryResult.data.location,
    me: ctx.me,
  }),
})(({ location, me }) => (
  <Segment title={location.name} address={location.address}>
    <div className={css.createdAt}>Создан: {format(location.createdAt, 'yyyy-MM-dd')}</div>
    {me && (
      <div className={css.editButton}>
        <LinkButton to={getEditLocationRoute({ locationName: location.name })}>Edit Idea</LinkButton>
      </div>
    )}
  </Segment>
))
