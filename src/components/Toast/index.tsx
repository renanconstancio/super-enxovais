// Styled Components
// ==============================

import { ReactNode, useEffect } from 'react';
import { useToasts } from '../../hooks/useToasts';

const ToastContainer = (props: any) => (
  <div style={{ position: 'fixed', right: 0, top: 0, zIndex: 999 }} {...props} />
);

const Toast = ({
  id,
  children,
  onDismiss
}: {
  id: number;
  children: ReactNode;
  onDismiss(): void;
}) => {
  const { remove } = useToasts();

  useEffect(() => {
    const timer = setTimeout(() => {
      remove(id);
    }, 3500);

    return () => {
      clearTimeout(timer);
    };
  }, [id, remove]);

  return (
    <div
      className="toast align-items-center border-0 show mb-3 mt-2 me-3 bg-success text-white"
      role="alert"
      aria-live="assertive"
      aria-atomic="true">
      <div className="d-flex">
        <div className="toast-body fw-bold">{children}</div>
        <button
          type="button"
          className="btn-close me-2 m-auto btn-close-white"
          data-bs-dismiss="toast"
          aria-label="Close"
          onClick={onDismiss}></button>
      </div>
    </div>
  );
};

export { ToastContainer, Toast };
