const Notification = ({ notificationMessage }) => {
  if (notificationMessage === null) {
    return null
  }
  else {
    return (
      <div className={notificationMessage.status}>
        {notificationMessage.message}
      </div>
    )
  }
}

export default Notification