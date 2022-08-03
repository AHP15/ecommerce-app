import styles from "../../styles/user/Input.module.css";

export default function Input({error, label, options}){
    return (
        <div className={styles.input_container}>
            <label className={styles.label} htmlFor={options.name}>{label}</label>
            <input {...options}/>
        </div>
    );
}