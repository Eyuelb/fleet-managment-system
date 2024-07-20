import { Button, Text, TextInput } from '@mantine/core';

export default function ResetPasswordPage() {
  return (
    <>
      <div className="mb-6 text-center text-xl">Reset Password</div>
      <Text className="mb-4 text-xs">
        We&apos;ll send you a quick link to reset your password
      </Text>
      <form>
        <div className="mb-4">
          <TextInput
            label="Email"
            placeholder="Enter your email address"
            type="email"
            required
          />
        </div>

        <Button type="submit" fullWidth>
          Send Link
        </Button>
      </form>
    </>
  );
}