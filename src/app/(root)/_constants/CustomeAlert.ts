import Swal, { SweetAlertIcon } from "sweetalert2";

const CustomAlert = (icon: SweetAlertIcon, message: string): void => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  Toast.fire({
    icon: icon,
    title: message,
  });
};

export default CustomAlert;
