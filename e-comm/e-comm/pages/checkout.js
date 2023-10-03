import Layout from "@/components/Layout";
import { ProductsContext } from "@/components/ProductContext";
import { useContext, useEffect, useState } from "react";

export default function CheckoutOutPage() {
  const { selectedProducts, setSelectedProducts } = useContext(ProductsContext);
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
                        selectedProducts.filter((id) => id === productInfo._id)
                          .length
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
      </Layout>
    </div>
  );
}
