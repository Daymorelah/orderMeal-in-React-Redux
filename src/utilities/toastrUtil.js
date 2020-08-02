import toastr from 'toastr';

/**
 * A method that shows toastr messages.
 * @param {string} type - Type of toastr message to display
 * e.g. success, error, warning, e.t.c
 * @param {string} message - The message to be displayed by toastr.
 */
const toastrUtil = (type, message) => {
  const options = {
    closeButton: true,
    preventDuplicates: true,
    extendedTimeOut: 3,
    timeOut: 4500,
    progressBar: true
  };
  if (type === 'success') {
    toastr.options = { ...options };
    return toastr[type](message);
  }
  if (type === 'error') {
    toastr.options = { ...options };
    return toastr[type](message);
  }
};

export default toastrUtil;
