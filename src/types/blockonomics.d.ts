declare global {
  interface Window {
    Blockonomics: {
      widget: (config: { msg_area: string; uid: string; email?: string; amount?: number }) => void;
      registerPayButton: () => void;
    };
  }
}

export {} 