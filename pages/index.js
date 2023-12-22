import { initMongoose } from "@/lib/mongoose";
import Product from "../components/Product";
import { useState } from "react";
import { findAllProducts } from "./api/products";
import Layout from "@/components/Layout";

export default function Home({ products }) {
  // const [productInfo, setProductInfo] = useState([]);
  const [phrase, setPhrase] = useState("");
  //esto sera reemplazado por getServrSideProps
  // useEffect(() => {
  //   fetch("/api/products")
  //     .then((response) => response.json())
  //     .then((json) => setProductInfo(json));
  // }, []);

  const categoryNames = [...new Set(products.map((p) => p.category))];

  // let products;
  if (phrase) {
    products = products.filter((p) => p.name.toLowerCase().includes(phrase));
  }
  return (
    <Layout>
      {" "}
      <h1 className="text-center font-raleway text-2xl p-1 font-bolder  bg-blue-200 rounded-xl rounded-bl-none rounded-br-none">
        e-Comm Digital Shop!
      </h1>
      <input
        value={phrase}
        onChange={(e) => {
          setPhrase(e.target.value.toLowerCase());
        }}
        type="text"
        placeholder="Search for products..."
        className="bg-gray-100 w-full py-2 px-4 rounded-xl rounded-tr-none rounded-tl-none outline-none"
      />
      <div className="xl:ml-52 2xl:ml-72">
        {categoryNames?.map((c) => {
          return (
            <div key={c}>
              {/* find by searchBar */}
              {products.find((p) => p.category === c) && (
                <div>
                  <h2 className="text-xl py-2 capitalize">{c}</h2>
                  <div className="flex -mx-5 overflow-x-scroll snap-x scrollbar-hide">
                    {products
                      .filter((p) => p.category === c)
                      .map((productInfo) => (
                        <div key={productInfo._id} className="px-5 snap-start">
                          <Product {...productInfo} />
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Layout>
  );
}
//getServerSideProps no permite generacion static por eso se usa getStatic props
export async function getStaticProps() {
  await initMongoose();
  const products = await findAllProducts();
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
