import Product from "../components/Product";
import { useEffect, useState } from "react";

export default function Home() {
  const [productInfo, setProductInfo] = useState([]);
  const [phrase, setPhrase] = useState("");
  useEffect(() => {
    fetch("/api/products")
      .then((response) => response.json())
      .then((json) => setProductInfo(json));
  }, []);

  const categoryNames = [...new Set(productInfo.map((p) => p.category))];

  return (
    <div className="p-5">
      <input
        value={phrase}
        onChange={(e) => {
          setPhrase(e.target.value);
        }}
        type="text"
        placeholder="Search for products..."
        className="bg-gray-100 w-full py-2 px-4 rounded-xl"
      />
      <div>
        {categoryNames?.map((c) => {
          return (
            <div key={c}>
              <h2 className="text-xl py-2 capitalize">{c}</h2>
              <div className="flex -mx-5 overflow-x-scroll snap-x scrollbar-hide">
                {productInfo
                  .filter((p) => p.category === c)
                  .map((productInfo) => (
                    <div key={productInfo._id} className="px-5 snap-start">
                      <Product {...productInfo} />
                    </div>
                  ))}
              </div>
            </div>
          );
        })}
        <div className="py-4"></div>
      </div>
    </div>
  );
}
