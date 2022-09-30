// Add your models here if you have any
export interface Order {
    name: string,
    email: string
    size: string
    base: boolean
    sauce: string 
    toppings: string[]
    comments: string
}

export interface OrderSummary{

    orderId: Number
    totalPrice: Number


}