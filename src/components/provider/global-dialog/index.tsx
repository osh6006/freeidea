import LoginDialog from './login-dialog';
import { NeedAuthorLevelDialog } from './need-author-level-dialog';
import { NeedLoginDialog } from './need-login-dialog';
import { NeedUseMembershipDialog } from './need-memebership-pang';

export default function GlobalDialogs() {
  return (
    <>
      <LoginDialog />
      <NeedLoginDialog />
      <NeedAuthorLevelDialog />
      <NeedUseMembershipDialog />
    </>
  );
}
