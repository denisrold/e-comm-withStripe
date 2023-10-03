import Layout from "@/components/Layout";
import { ProductsContext } from "@/components/ProductContext";
import { useContext, useEffect, useState } from "react";

export default function CheckoutOutPage() {
  const { selectedProducts } = useContext(ProductsContext);
  const [productsInfos, setProductsInfos] = useState([]);
  useEffect(() => {
    const uniqueIds = [...new Set(selectedProducts)];
    if (uniqueIds) {
      fetch("/api/products?ids=" + uniqueIds.join(","))
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          setProductsInfos(json);
        });
    }
  }, [selectedProducts]);
  return (
    <div>
      <Layout>
        {!productsInfos.length && <div>No product in your shopping cart</div>}
        {productsInfos.length &&
          productsInfos.map((productInfo) => (
            <div key={productInfo._id} className="flex mb-5">
              <div className="bg-gray-100 p-3 rounded-xl shrink-0 h-fit">
                <img src={productInfo.picture} className="w-24 "></img>
              </div>
              <div className="pl-4">
                <h3 className=" font-bold text-lg">{productInfo.name}</h3>
                <p className="text-sm">{productInfo.description}</p>
              </div>
            </div>
          ))}
      </Layout>
    </div>
  );
}
