import styles from "../styles/Alert.module.css";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useAlert } from "../contexts/AlertContext";

export default function Alert({type, message}){
    const {setAlert} = useAlert();

    return (
        <div className={type === "error"?styles.alert_error:styles.alert_success}>
            <p className={styles.message}>{message}</p>
            <div onClick={() =>setAlert(null)}>
                <IconButton>
                    <CloseIcon />
                </IconButton>
            </div>
        </div>
    );
}