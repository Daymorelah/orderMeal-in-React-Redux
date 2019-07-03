import toastr from 'toastr';

/**
 * A method that shows toastr messages.
 * @param {string} type - Type of toastr message to display
 * e.g. success, error, warning, e.t.c
 * @param {string} message - The message to be displayed by toastr.
 * @param {number} time - Duration we want the toaster to show
 */
const toastrUtil = (type, message, time) => {
  const options = {
    closeButton: true, preventDuplicates: true, timeOut: 0,
  };
  if (type === 'success') {
    toastr.options.progressBar = true;
    return toastr[type](message, { timeOut: time });
  }
  if (type === 'error') {
    toastr.options = { ...options };
    return toastr[type](message);
  }
};

export default toastrUtil;
