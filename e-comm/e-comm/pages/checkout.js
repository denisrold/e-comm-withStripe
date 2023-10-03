import Layout from "@/components/Layout";
import { ProductsContext } from "@/components/ProductContext";
import { useContext, useEffect, useState } from "react";

export default function CheckoutOutPage() {
  const { selectedProducts, setSelectedProducts } = useContext(ProductsContext);
  const [productsInfos, setProductsInfos] = useState([]);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (!selectedProducts.length) {
      return;
    }
    const uniqueIds = [...new Set(selectedProducts)];
    if (uniqueIds) {
      fetch("/api/products?ids=" + uniqueIds.join(","))
        .then((response) => response.json())
        .then((json) => {
          setProductsInfos(json);
        });
    }
  }, [selectedProducts]);

  function moreOfThisProduct(id) {
    setSelectedProducts((prev) => [...prev, id]);
  }

  function lessOfThisProduct(id) {
    const pos = selectedProducts.indexOf(id);
    //if position not exist = pos ===-1
    if (pos !== -1) {
      //
      setSelectedProducts((prev) => {
        //filter and return all diferents at pos;
        return prev.filter((value, index) => index !== pos);
      });
    }
  }
  // cart values
  const deliveryPrice = 5;
  let subTotal = 0;

  if (selectedProducts?.length) {
    if (productsInfos.length) {
      for (let id of selectedProducts) {
        const price = productsInfos.find((p) => p._id === id).price;
        subTotal += price;
      }
    }
  }
  const total = subTotal + deliveryPrice;
  return (
    <div>
      <Layout>
        {!productsInfos.length && (
          <div className=" flex justify-center  items-center h-screen font-bold text-lg text-gray-500">
            No product in your shopping cart
          </div>
        )}
        {!selectedProducts.length
          ? " "
          : productsInfos.length &&
            productsInfos.map((productInfo) => (
              <div key={productInfo._id} className="flex mb-5">
                <div className="bg-gray-100 p-3 rounded-xl shrink-0 h-fit">
                  <img src={productInfo.picture} className="w-24 "></img>
                </div>
                <div className="pl-4">
                  <h3 className=" font-bold text-lg">{productInfo.name}</h3>
                  <p className="text-sm leading-4  text-gray-500">
                    {productInfo.description}
                  </p>
                  <div className="flex">
                    <div className="grow">${productInfo.price}</div>
                    <div>
                      <button
                        onClick={() => lessOfThisProduct(productInfo._id)}
                        className="border border-emerald-500 px-2 rounded-lg text-emerald-500"
                      >
                        -
                      </button>
                      <span className="px-3">
                        {
                          selectedProducts.filter(
                            (id) => id === productInfo._id
                          ).length
                        }
                      </span>
                      <button
                        onClick={() => moreOfThisProduct(productInfo._id)}
                        className="border border-emerald-500 bg-emerald-500 px-2 rounded-lg text-white"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        {!selectedProducts.length ? (
          " "
        ) : (
          <div>
            <div className="mt-6">
              <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="bg-gray-200 w-full rounded-lg px-4 py-2 mb-2"
                type="text"
                placeholder="Street address, number"
              />
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="bg-gray-200 w-full rounded-lg px-4 py-2 mb-2"
                type="text"
                placeholder="City and postal code"
              />
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-gray-200 w-full rounded-lg px-4 py-2 mb-2"
                type="text"
                placeholder="Your name"
              />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-200 w-full rounded-lg px-4 py-2 mb-2"
                type="email"
                placeholder="Email address"
              />
            </div>
            <div className="mt-4">
              <div className="flex my-3">
                <h3 className="grow font-bold text-gray-500">Subtotal:</h3>
                <h3 className="font-bold">${subTotal}</h3>
              </div>
              <div className="flex my-3">
                <h3 className="grow font-bold text-gray-500">Delivery</h3>
                <h3 className="font-bold">${deliveryPrice}</h3>
              </div>
              <div className="flex my-3 pt-3 border-t-2 border-dashed border-emerald-500">
                <h3 className="grow font-bold text-gray-500">Total:</h3>
                <h3 className="font-bold">${total}</h3>
              </div>
            </div>
            <button className="bg-emerald-500 p-5 text-white w-full rounded-xl py-2 font-bold my-4 shadow-lg shadow-emerald-300 ">
              Pay ${total}
            </button>
          </div>
        )}
      </Layout>
    </div>
  );
}
