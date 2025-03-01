'use client';

import { useState } from 'react';

import ProfileResetPasswordDialog from './profile-reset-password';

const ProfilePassword = () => {
  const [isChangePassword, setIsChangePassword] = useState(false);
  return (
    <>
      <div className="flex flex-col gap-[10px]">
        <div className="typo-body-14-medium-100-tight">비밀번호</div>
        <div className="relative w-[360px]">
          <input
            type="password"
            value={'asdsadsa'}
            className="px-[10px] py-[12px] items-center w-[360px] h-[46px] typo-body-14-regular-150-tight text-slate-300"
            disabled
            readOnly
          />
          <button
            type="button"
            onClick={() => setIsChangePassword(true)}
            className="absolute top-[12px] right-[10px] flex items-center w-[44px] h-[20px] rounded-[4px] p-[10px] bg-white typo-body-14-regular-150-tight"
          >
            변경
          </button>
        </div>
      </div>
      <ProfileResetPasswordDialog
        open={isChangePassword}
        setIsOpen={setIsChangePassword}
      />
    </>
  );
};

export default ProfilePassword;
