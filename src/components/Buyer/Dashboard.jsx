import Navbar from "./Navbar/Navbar"
import Products from "./Products"

export default function Dashboard({products}) {
    return (
        <>
            <Navbar />
            <>
            <Products products={products} />
            </>
        </>
    )
}