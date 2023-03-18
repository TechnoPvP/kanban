import styles from './client-ui.module.css';

/* eslint-disable-next-line */
export interface ClientUiProps {}

export function ClientUi(props: ClientUiProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to ClientUi!</h1>
    </div>
  );
}

export default ClientUi;
