import { useRouter } from "next/router";
import { useAuthenticationStatus, useUserData } from "@nhost/nextjs";
import { ComponentType, ReactElement } from "react";

interface AdminProtectedProps {
  [key: string]: any;
}

function withAdminAuth<P extends AdminProtectedProps>(
  Component: ComponentType<P>
) {
  return function AdminProtected(props: P): ReactElement | null {
    const router = useRouter();
    const { isLoading, isAuthenticated } = useAuthenticationStatus();
    const user = useUserData();

    if (isLoading) {
      return <div className=""></div>;
    }

    if (
      !isAuthenticated ||
      !user ||
      !user.roles.find((role) => role === "admin")
    ) {
      router.push("/");
      return null;
    }

    return <Component {...props} />;
  };
}

export default withAdminAuth;
