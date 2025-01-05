import type { TrpcRouterOutput } from '@WebApp/backendApp/src/router'
import { zUpdateLocationTrpcInput } from '@WebApp/backendApp/src/router/updateLocation/input'
import pick from 'lodash/pick'
import { useNavigate, useParams } from 'react-router-dom'
import { Alert } from '../../components/Alert'
import { Button } from '../../components/Button'
import { FormItems } from '../../components/Formitems'
import { Input } from '../../components/Input'
import { Segment } from '../../components/Segment'
import { useForm } from '../../lib/form'
import { type EditIdeaRouteParams, getViewLocationRoute } from '../../lib/routes'
import { trpc } from '../../lib/trpc'

const EditLocationComponent = ({
  location,
}: {
  location: NonNullable<TrpcRouterOutput['getLocation']['location']>
}) => {
  const navigate = useNavigate()
  const updateLocation = trpc.updateLocation.useMutation()
  const { formik, buttonProps, alertProps } = useForm({
    initialValues: pick(location, ['name', 'address']),
    validationSchema: zUpdateLocationTrpcInput.omit({ locationId: true }),
    onSubmit: async (values) => {
      await updateLocation.mutateAsync({ locationId: location.id, ...values })
      void navigate(getViewLocationRoute({ locationName: values.name }))
    },
    resetOnSuccess: false,
    showValidationAlert: true,
  })
  return (
    <Segment title={`Редактировать участок: ${location.name}`}>
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input name="name" label="Участок" formik={formik} />
          <Input name="address" label="Адрес" formik={formik} />
          <Alert {...alertProps} />
          <Button {...buttonProps}>Редактировать</Button>
        </FormItems>
      </form>
    </Segment>
  )
}

export const EditLocationPage = () => {
  const { locationName } = useParams() as EditIdeaRouteParams

  const getLocationResult = trpc.getLocation.useQuery({
    locationName,
  })
  const getMeResult = trpc.getMe.useQuery()

  if (getLocationResult.isLoading || getLocationResult.isFetching || getMeResult.isLoading || getMeResult.isFetching) {
    return <span>Загрузка...</span>
  }

  if (getLocationResult.isError) {
    return <span>Ошибка: {getLocationResult.error.message}</span>
  }

  if (getMeResult.isError) {
    return <span>Ошибка: {getMeResult.error.message}</span>
  }

  if (!getLocationResult.data.location) {
    return <span>Участок не найден</span>
  }

  const location = getLocationResult.data.location
  const me = getMeResult.data.me

  if (!me) {
    return <span>Only for authorized</span>
  }
  return <EditLocationComponent location={location} />
}
