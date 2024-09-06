import { useState } from "react";
import { ResetPasswordForm } from "./form-reset-password";
import { SignInForm } from "./form-sign-in";

export const FormSignIn = () => {
  const [isResetPassword, setIsResetPassword] = useState(false);

  return (
    <div>
      {isResetPassword ? (
        <ResetPasswordForm onSwitch={() => setIsResetPassword(false)} />
      ) : (
        <SignInForm onSwitch={() => setIsResetPassword(true)} />
      )}
    </div>
  );
};
