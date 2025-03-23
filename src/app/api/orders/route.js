import connectDB from "@/lib/Connection.js";
import { Order } from "@/components/Backend/models/Order.models";
import { User } from "@/components/Backend/models/Users.models";

export async function POST(req){
    try {
       await connectDB()
        const data=await req.json()
        
        const generateOrderNumber =`Order-${Math.floor(10000 + Math.random() * 900000)}`
        const customer = data[0]
        let billing =data[1]
        const products = data[2].map((item) => ({
            name: item.name,
            size: item.size,
            price: item.price,
            quantity: item.quantity,
            image : item.image[0]
        }))

        const user= await User.findOne({email : customer.email})
        if(!user){
            await User.create({email : customer.email})
        }

        const isEmpty=Object.values(billing).some(value => value === "")
        let order
        if(isEmpty){
            order = await Order.create({
                orderNumber: generateOrderNumber,
                name: `${customer.fname} ${customer.lname}`,
                email: customer.email,
                shippingAddress: `${customer.address}, ${customer.city}`,
                postalCode: customer.postalcode,
                phone: customer.phone,
                paymentMethod : customer.payment,
                billingName : `${customer.fname} ${customer.lname}`,
                billingPostal :customer.postalcode,
                billingAddress : `${customer.address}, ${customer.city}`,
                billingPhone : customer.phone,
                product: products, 
            })
        }else{
            order = await Order.create({
                orderNumber: generateOrderNumber,
                name: `${customer.fname} ${customer.lname}`,
                email: customer.email,
                shippingAddress: `${customer.address}, ${customer.city}`,
                postalCode: customer.postalcode,
                phone: customer.phone,
                paymentMethod : customer.payment,
                billingName : `${billing.fname} ${billing.lname}`,
                billingPostal :billing.postalcode,
                billingAddress : `${billing.address}, ${billing.city}`,
                billingPhone : billing.billingPhone,
                product: products, 
            })
        }         

        return Response.json({
            message : "success",
            data : order
        })
    } catch (error) {
        return Response.json({
            message : "Could not Place Order"
        })
    }
}