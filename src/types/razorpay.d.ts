declare module 'react-native-razorpay' {
  interface RazorpayOptions {
    description?: string;
    image?: string;
    currency?: string;
    key: string;
    amount: string;
    name: string;
    prefill?: {
      email?: string;
      contact?: string;
      name?: string;
    };
    theme?: {
      color?: string;
    };
    handler?: (response: any) => void;
    modal?: {
      ondismiss?: () => void;
    };
  }

  interface RazorpayCheckout {
    open(options: RazorpayOptions): Promise<any>;
  }

  const RazorpayCheckout: RazorpayCheckout;
  export default RazorpayCheckout;
} 