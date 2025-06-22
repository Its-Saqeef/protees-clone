import React from "react";

export default function OrderConfirmationEmail(props) {
  const {
    customerName,
    orderNumber,
    orderDate,
    orderItems,
    totalAmount,
    shippingAddress,
    billingAddress,
    billingPhoneNumber,
    phone
  } = props;

  return (
    <html>
      <head>
        <title>Order Confirmation</title>
        <meta charSet="UTF-8" />
      </head>
      <body style={styles.body}>
        <table width="100%" cellPadding="0" cellSpacing="0" style={styles.wrapper}>
          <tr>
            <td align="center">
              <table width="600" style={styles.container}>
                <tr>
                  <td style={styles.header}>
                    <h1 style={styles.h1}>Thanks for your order, {customerName}!</h1>
                    <p style={styles.text}>
                      We've received your order and will notify you when it's shipped.
                    </p>
                  </td>
                </tr>

                <tr>
                  <td>
                    <p style={styles.text}>
                      <strong>Order Number:</strong> {orderNumber}<br />
                      <strong>Order Date:</strong> {orderDate}
                    </p>
                  </td>
                </tr>

                <tr>
                  <td style={styles.divider}></td>
                </tr>

                <tr>
                  <td>
                    <h2 style={styles.h2}>Order Summary</h2>
                    {orderItems.map((item, idx) => (
                      <p style={styles.text} key={idx}>
                        {item.quantity} x {item.name} {item.color} — Rs {item.price.toLocaleString("en-IN")}.00
                      </p>
                    ))}
                    <p style={styles.text}>
                      <strong>Total: Rs.{totalAmount.toLocaleString("en-IN")}.00</strong>
                    </p>
                  </td>
                </tr>

                <tr>
                  <td>
                    <h2 style={styles.h2}>Shipping Address</h2>
                    <p style={styles.text}>{shippingAddress}</p>
                  </td>
                </tr>

                <tr>
                  <td>
                    <h2 style={styles.h2}>Billing Information</h2>
                    <p style={styles.text}>
                      <strong>Billing Address:</strong><br />
                      {!billingAddress ? shippingAddress : billingAddress}<br /><br />
                      <strong>Phone:</strong> {!billingPhoneNumber ? phone : billingPhoneNumber}
                    </p>
                  </td>
                </tr>

                <tr>
                  <td align="center" style={{ padding: "20px 0" }}>
                    <a
                      href={`${process.env.NEXT_PUBLIC_API_BASE_URL}/order/${orderNumber}`}
                      style={styles.button}
                    >
                      View Your Order
                    </a>
                  </td>
                </tr>

                <tr>
                  <td style={styles.divider}></td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  );
}

const styles = {
  body: {
    margin: 0,
    padding: 0,
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f9f9f9",
  },
  wrapper: {
    padding: "20px 0",
    width: "100%",
  },
  container: {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "6px",
  },
  header: {
    paddingBottom: "10px",
  },
  h1: {
    fontSize: "24px",
    margin: "0 0 10px 0",
  },
  h2: {
    fontSize: "18px",
    margin: "20px 0 10px",
  },
  text: {
    fontSize: "14px",
    margin: "4px 0",
    color: "#333333",
  },
  divider: {
    borderTop: "1px solid #e0e0e0",
    margin: "20px 0",
  },
  button: {
    display: "inline-block",
    backgroundColor: "#007bff",
    color: "#ffffff",
    textDecoration: "none",
    padding: "12px 24px",
    borderRadius: "4px",
    fontSize: "14px",
  },
  footer: {
    fontSize: "12px",
    color: "#888888",
    textAlign: "center",
    marginTop: "30px",
  },
  link: {
    color: "#007bff",
    textDecoration: "none",
  },
}