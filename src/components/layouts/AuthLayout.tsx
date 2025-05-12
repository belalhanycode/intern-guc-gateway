
import { ReactNode } from "react";
import BaseLayout from "./BaseLayout";
import { Card, CardContent } from "@/components/ui/card";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
}

const AuthLayout = ({ children, title }: AuthLayoutProps) => {
  return (
    <BaseLayout>
      <div className="flex min-h-screen items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-guc-blue">{title}</h1>
            <p className="mt-2 text-sm text-gray-600">
              GUC Internship System
            </p>
          </div>
          <Card>
            <CardContent className="pt-6">{children}</CardContent>
          </Card>
        </div>
      </div>
    </BaseLayout>
  );
};

export default AuthLayout;
