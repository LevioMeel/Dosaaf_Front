import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const toastMes = (text, type, autoClose = 3000) => {
    switch (true) {
        case type == 'error':
            toast.error(text, {
                position: "bottom-right",
                autoClose: autoClose,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            break;
        case type == 'info':
            toast.info(text, {
                position: "bottom-right",
                autoClose: autoClose,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            break;
        case type == 'success':
            toast.success(text, {
                position: "bottom-right",
                autoClose: autoClose,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            break;
        case type == 'warn':
            toast.warn(text, {
                position: "bottom-right",
                autoClose: autoClose,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            break;
        default:
            toast.success(text, {
                position: "top-right",
                autoClose: autoClose,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            break;
    }
}

export { toastMes };