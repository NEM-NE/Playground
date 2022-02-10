import Layout from "../components/Layout";
import "../styles/globals.css";

export default function app({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
