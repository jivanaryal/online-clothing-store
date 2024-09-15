import { useEffect, useRef } from "react";

interface PayPalButtonProps {
  price: number;
}

const PayPalButton = ({ price }: PayPalButtonProps) => {
  const paypalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.paypal) {
      window.paypal.Buttons({
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: price.toFixed(2), // Ensure the price has two decimal places
                },
              },
            ],
          });
        },
        onApprove: (data: any, actions: any) => {
          return actions.order.capture().then(function (details: any) {
            alert(`Transaction completed by ${details.payer.name.given_name}`);
          });
        },
        onError: (err: any) => {
          console.error("PayPal Checkout onError", err);
        },
      }).render(paypalRef.current);
    }
  }, [price]);

  return <div ref={paypalRef} />;
};

export default PayPalButton;
