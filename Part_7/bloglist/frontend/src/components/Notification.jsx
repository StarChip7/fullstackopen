import { useSelector } from 'react-redux'
import { Alert } from '@mui/material'

const Notification = () => {

  const notificationMessage = useSelector(state => state.notification)

  if (notificationMessage === null) {
    return null
  }
  else {
    return (
      <Alert severity={notificationMessage.status}>
        {notificationMessage.message}
      </Alert>
    )
  }
}

export default Notification