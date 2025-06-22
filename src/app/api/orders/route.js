//Orders/route.js

import connectDB from "@/lib/Connection.js";
import { Order } from "@/components/Backend/models/Order.models";
import { User } from "@/components/Backend/models/Users.models";
import { Product } from "@/components/Backend/models/Product.models";
import OrderConfirmationEmail from "@/lib/Email-Service/OrderConfirmationEmail";
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    await connectDB();
    const data = await req.json();
    console.log(data)
    const generateOrderNumber = `Order-${Math.floor(10000 + Math.random() * 900000)}`;
    const customer = data[0];
    const billing = data[1];
    const cartItems = data[2];


    const products = cartItems.map((item) => ({
      name: item.name,
      size: item.size,
      price: item.price,
      quantity: item.quantity,
      image: item.image.length > 0 ? item.image[0] : item.colorImage,
      id: item.id,
      color : item.color
    }));

    const totalAmount = products.reduce((sum, product) => {
      return sum + product.price * product.quantity;
    }, 0)

    await Promise.all(
      cartItems.map(async (item) => {
        const product = await Product.findById(item.id);
        if (!product) throw new Error("Product not found");

        if(item.color){
            const sizeObject = product.colorSizeQuantities.find((obj)=>obj.color == item.color)
            const quantity = sizeObject.sizes[item.size]
            if(parseInt(quantity) < parseInt(item.quantity))
              throw new Error("Not enough stock");
            const newValue= parseInt(quantity) - parseInt(item.quantity)
            sizeObject.sizes[item.size] = newValue
        }
        else {
          const sizeObj = product.sizes.find((s) => s.size === item.size);
          if (!sizeObj) throw new Error("Size not found");

          if (parseInt(sizeObj.quantity) < parseInt(item.quantity)) {
            throw new Error("Not enough stock");
          }

          sizeObj.quantity = (parseInt(sizeObj.quantity) - parseInt(item.quantity)).toString();
          }
        await product.save();
      })
    );

    let user = await User.findOne({ email: customer.email });
    if (!user) {
      user = await User.create({
        email: customer.email,
        name: `${customer.fname} ${customer.lname}`,
      });
    }

    const isEmpty = Object.values(billing).some((value) => value === "");

    const commonOrderData = {
      orderNumber: generateOrderNumber,
      name: `${customer.fname} ${customer.lname}`,
      email: customer.email,
      shippingAddress: `${customer.address}, ${customer.city}`,
      postalCode: customer.postalcode,
      phone: customer.phone,
      paymentMethod: customer.payment,
      product: products,
    };

    const order = await Order.create(
      isEmpty
        ? {
            ...commonOrderData,
            billingName: `${customer.fname} ${customer.lname}`,
            billingPostal: customer.postalcode,
            billingAddress: `${customer.address}, ${customer.city}`,
            billingPhone: customer.phone,
          }
        : {
            ...commonOrderData,
            billingName: `${billing.fname} ${billing.lname}`,
            billingPostal: billing.postalcode,
            billingAddress: `${billing.address}, ${billing.city}`,
            billingPhone: billing.billingPhone,
          }
    );

    // Send Email
    await resend.emails.send({
      from: "Protees-clone <email@portfoliosite.store>",
      to: customer.email,
      subject: "Your Order Confirmation",
      react: OrderConfirmationEmail({
        customerName: `${customer.fname} ${customer.lname}`,
        orderNumber: generateOrderNumber,
        orderDate: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        orderItems: products.map((item) => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          color : item.color
        })),
        totalAmount: totalAmount,
        phone : customer.phone,
        shippingAddress: `${customer.address}, ${customer.city}`,
        ...(isEmpty
          ? {}
          : {
              billingAddress: `${billing.address}, ${billing.city}`,
              billingPhoneNumber: billing.billingPhone,
            }),
      }),
    });

    return Response.json(
      {
        message: "success",
        data: order,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Order Error:", error.message);
    return Response.json(
      {
        message: "Could not place order",
        error: error.message,
      },
      { status: 500 }
    );
  }
}