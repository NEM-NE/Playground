import { useRouter } from "next/router";

export default function Detail() {
  const route = useRouter();

  return <>{route.query.title || "Loading.."}</>;
}
