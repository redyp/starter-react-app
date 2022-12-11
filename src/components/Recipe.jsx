import { useState } from "react"

function Recipe({ recipe: { recipe_name, available, special_offer_price } }) {
    const [cartAmount, setCartAmount] = useState(0)
    return (
        <div>
            <h2>{recipe_name}</h2>
            <p>price: {special_offer_price}</p>
            <p>Available: {available}</p>
            <div>
                <button disabled={cartAmount <= 0} onClick={() => setCartAmount(prevState => prevState - 1)}>-</button>
                <span> {cartAmount} </span>
                <button disabled={cartAmount >= available} onClick={() => setCartAmount(prevState => prevState + 1)}>+</button>
            </div>
            <p hidden={cartAmount <= 0}>Total price: {special_offer_price * cartAmount}</p>
            <div>
                <button hidden={cartAmount <= 0} onClick={() => { setCartAmount(0) }}>Cancel Buy</button>
            </div>
        </div>
    )
}

export default Recipe
