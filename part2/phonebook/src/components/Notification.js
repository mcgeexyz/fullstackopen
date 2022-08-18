const Notification = ({ notification: { message, type } }) => {
  return message === '' ? null : (
    <div className={`${type} notification`}>{message}</div>
  );
};

export default Notification;
