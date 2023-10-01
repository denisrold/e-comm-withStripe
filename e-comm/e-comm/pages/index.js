import Product from "../components/Product";
import { useEffect, useState } from "react";

export default function Home() {
  const [productInfo, setProductInfo] = useState([]);
  useEffect(() => {
    fetch("/api/products")
      .then((response) => response.json())
      .then((json) => setProductInfo(json));
  }, []);

  const categoryNames = [...new Set(productInfo.map((p) => p.category))];

  return (
    <div className="p-5">
      <div>
        {categoryNames?.map((c) => {
          return (
            <div key={c}>
              <h2 className="text-xl capitalize">{c}</h2>
              {productInfo
                .filter((p) => p.category === c)
                .map((productInfo) => (
                  <Product {...productInfo} />
                ))}
            </div>
          );
        })}
        <div className="py-4"></div>
      </div>
    </div>
  );
}
