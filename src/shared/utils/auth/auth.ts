import { paths } from "@/shared/paths";
import { removeToken } from "../cookies";

export function signOut() {
  removeToken();
  window.location.href = paths.signIn;
}