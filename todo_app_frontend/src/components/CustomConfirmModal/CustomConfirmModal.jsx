import styles from './CustomConfirmModal.module.css'

export function CustomConfirmModal({ message, onConfirm, onCancel }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <p className={styles.message}>{message}</p>
        <div className={styles.buttons}>
          <button className={styles.confirmButton} onClick={onConfirm}>
            Confirmar
          </button>
          <button className={styles.cancelButton} onClick={onCancel}>
            Não apagar
          </button>
        </div>
      </div>
    </div>
  );
}