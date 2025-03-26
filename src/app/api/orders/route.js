import connectDB from "@/lib/Connection.js";
import { Order } from "@/components/Backend/models/Order.models";
import { User } from "@/components/Backend/models/Users.models";
import { Product } from "@/components/Backend/models/Product.models";

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
            image : item.image[0],
        }))

        console.log(data[2])

        const updateResult=await Promise.all(
            data[2].map(async(item)=>{
                try {
                    const product = await Product.findById(item.id)
                    if (!product) {
                        return { status: "error", message: "Product not found" };
                    }

                    const sizeObj = product.sizes.find((s) => s.size === item.size)
                    if (!sizeObj) {
                        return { status: "error", message: "Size not found" };
                    }

                    if (parseInt(sizeObj.quantity) < parseInt(item.quantity)) {
                        return { status: "error", message: "Not enough stock" };
                    }

                    sizeObj.quantity = (parseInt(sizeObj.quantity) - parseInt(item.quantity)).toString();
                    await product.save();

                } catch (error) {
                    console.log("Error",error)
                }
            })
        )

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