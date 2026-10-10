import { serverEnv } from "@/lib/env.server";
import SmartsuppLoader from "./SmartsuppLoader";

export default function SmartsuppChat() {
  const key = serverEnv.smartsuppKey;
  if (!key) return null;
  return <SmartsuppLoader chatKey={key} />;
}
