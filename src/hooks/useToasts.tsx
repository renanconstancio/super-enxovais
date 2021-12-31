import { createContext, ReactNode, useContext, useState } from 'react';
import { Toast, ToastContainer } from '../components/Toast';

interface ToastProviderProps {
  children: ReactNode;
}

type ToastContextProps = {
  add: (content: string) => void;
  remove: (id: number) => void;
};

const ToastContext = createContext<ToastContextProps>({} as ToastContextProps);

// Provider
// ==============================

let toastCount = 0;

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<{ content: string; id: number }[]>([]);

  const add = (content: string) => {
    const toast = { content, id: toastCount++ };
    setToasts([...toasts, toast]);
  };

  const remove = (id: number) => {
    const newToasts = toasts.filter((t) => t.id !== id);
    setToasts(newToasts);
  };

  // avoid creating a new fn on every render
  const onDismiss = (id: number) => () => remove(id);

  return (
    <ToastContext.Provider value={{ add, remove }}>
      {children}
      <ToastContainer>
        {toasts.map(({ content, id, ...rest }) => (
          <Toast key={id} onDismiss={onDismiss(id)} id={id} {...rest}>
            {content}
          </Toast>
        ))}
      </ToastContainer>
    </ToastContext.Provider>
  );
}

// Consumer
// ==============================

export const useToasts = () => useContext(ToastContext);
