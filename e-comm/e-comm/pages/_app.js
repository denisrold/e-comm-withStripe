import { ProductContextProvider } from "@/components/ProductContext";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <ProductContextProvider>
      <Component {...pageProps} />
    </ProductContextProvider>
  );
}
