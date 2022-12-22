import { Toaster } from "react-hot-toast";
import SignUpFormComponent from "../../components/sign-up-form-component";

export default function AddUsers() {
  return (
    <div>
      <Toaster />
      <SignUpFormComponent></SignUpFormComponent>
    </div>
  );
}
