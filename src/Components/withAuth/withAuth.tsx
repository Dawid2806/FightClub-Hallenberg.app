import { useRouter } from "next/router";
import { useAuthenticationStatus } from "@nhost/nextjs";
import { ComponentType, ReactElement } from "react";

interface AuthProtectedProps {
  [key: string]: any;
}

function withAuth<P extends AuthProtectedProps>(Component: ComponentType<P>) {
  return function AuthProtected(props: P): ReactElement | null {
    const router = useRouter();
    const { isLoading, isAuthenticated } = useAuthenticationStatus();

    if (isLoading) {
      return <div className=""></div>;
    }

    if (!isAuthenticated) {
      router.push("/");
      return null;
    }

    return <Component {...props} />;
  };
}

export default withAuth;
