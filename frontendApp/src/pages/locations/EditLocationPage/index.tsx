import { zUpdateLocationTrpcInput } from '@WebApp/backendApp/src/router/locations/updateLocation/input'
import pick from 'lodash/pick'
import { useNavigate, useParams } from 'react-router-dom'
import { Alert } from '../../../components/Alert'
import { Button } from '../../../components/Button'
import { FormItems } from '../../../components/FormItems'
import { Input } from '../../../components/Input'
import { Segment } from '../../../components/Segment'
import { useForm } from '../../../lib/form'
import { withPageWrapper } from '../../../lib/pageWrapper'
import { type EditLocationRouteParams, getViewLocationRoute } from '../../../lib/routes'
import { trpc } from '../../../lib/trpc'

export const EditLocationPage = withPageWrapper({
  authorizedOnly: true,
  useQuery: () => {
    const { locationName } = useParams() as EditLocationRouteParams
    return trpc.getLocation.useQuery({
      locationName,
    })
  },
  setProps: ({ queryResult, checkExists }) => {
    const location = checkExists(queryResult.data.location, 'Idea not found')
    return {
      location,
    }
  },
})(({ location }) => {
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
})
