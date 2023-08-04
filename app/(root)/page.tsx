import { UserButton } from '@clerk/nextjs';

const SetupPage = () => {
  return (
    <>
      <p>This is a protected route</p>
      <UserButton afterSignOutUrl="/" />
    </>
  );
};

export default SetupPage;
