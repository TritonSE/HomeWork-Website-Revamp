import LoginForm from "@/components/loginForm";
import { UserContextProvider } from "@/contexts/userContext";
const LoginPage = () => {
  return (
    <UserContextProvider>
      <LoginForm />
    </UserContextProvider>
  );
};

export default LoginPage;
