import React, { useState, useCallback, FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUpApi, checkEmailDuplicate } from '@apis/userApi';


interface SignUpProps { }

const SignUp: FunctionComponent<SignUpProps> = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [pwd, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [gender, setGender] = useState<string>('');

  const [nameMessage, setNameMessage] = useState<string>('');
  const [emailMessage, setEmailMessage] = useState<string>('');
  const [passwordMessage, setPasswordMessage] = useState<string>('');
  const [passwordConfirmMessage, setPasswordConfirmMessage] =
    useState<string>('');

  const [isName, setIsName] = useState<boolean>(false);
  const [isEmail, setIsEmail] = useState<boolean>(false);
  const [emailDuplicate, setEmailDuplicate] = useState<boolean>(true);
  const [emailCheckState, setEmailCheckState] = useState<boolean>(false);
  const [isPassword, setIsPassword] = useState<boolean>(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState<boolean>(false);
  const [isDate, setIsDate] = useState<boolean>(false);
  const [isGender, setIsGender] = useState<boolean>(false);

  const [isNameBlur, setIsNameBlur] = useState<boolean>(true);
  const [isEmailBlur, setIsEmailBlur] = useState<boolean>(true);
  const [isPasswordBlur, setIsPasswordBlur] = useState<boolean>(true);
  const [isPasswordConfirmBlur, setIsPasswordConfirmBlur] =
    useState<boolean>(true);
  const today = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = ("0" + (1 + date.getMonth())).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);

    return year + "-" + month + "-" + day;
  }

  const onChangeName = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (e.target.value.length < 2 || e.target.value.length > 12) {
      setNameMessage('2?????? ?????? 12?????? ???????????? ??????????????????.');
      setIsName(false);
    } else {
      setNameMessage('????????? ?????? ??????????????? :)');
      setIsName(true);
    }
  }, []);

  const onChangeEmail = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const emailRegex =
        /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
      const emailCurrent = e.target.value;
      setEmail(emailCurrent);

      if (!emailRegex.test(emailCurrent)) {
        setEmailMessage('????????? ????????? ????????????! ?????? ?????????????????? ??? ???');
        setEmailCheckState(false);
        setIsEmail(false);
      } else {
        setIsEmail(true);
        setEmailCheckState(false);
        setEmailDuplicate(true);
        setEmailMessage('????????? ?????? ????????? ????????????!');
      }
    },
    [],
  );

  // ????????????
  const onChangePassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const passwordRegex =
        /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-?_~])(?=.*[0-9]).{8,15}$/;
      const passwordCurrent = e.target.value;
      setPassword(passwordCurrent);

      if (!passwordRegex.test(passwordCurrent)) {
        setPasswordMessage(
          '??????+?????????+???????????? ???????????? 8?????? ?????? ??????????????????!',
        );
        setIsPassword(false);
      } else {
        setPasswordMessage('????????? ?????????????????? : )');
        setIsPassword(true);
      }
    },
    [],
  );

  // ???????????? ??????
  const onChangePasswordConfirm = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const passwordConfirmCurrent = e.target.value;
      setPasswordConfirm(passwordConfirmCurrent);

      if (pwd === passwordConfirmCurrent) {
        setPasswordConfirmMessage('??????????????? ????????? ??????????????? : )');
        setIsPasswordConfirm(true);
      } else {
        setPasswordConfirmMessage('??????????????? ?????????. ?????? ?????????????????? ??? ???');
        setIsPasswordConfirm(false);
      }
    },
    [pwd],
  );

  // ?????? ?????? ??????
  const onChangeDatePicker = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const date = e.target.value;
      setDate(date);
      setIsDate(true);
    },
    [],
  );

  // ?????? ?????? ??????
  const onChangeGender = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const gender = e.target.value;
      setGender(gender);
      setIsGender(true);
    },
    [],
  );
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isSignUp = signUpApi({
      email,
      pwd,
      name,
      gender,
      birthday: date,
      role: 'u',
    }).then(data => {
      if (data) {
        navigate('/login');
      }
    });
  };

  const checkEmail = async (currentEmail: string) => {
    const status = await checkEmailDuplicate(currentEmail);
    if (status === true) {
      setEmailCheckState(true);
      setEmailMessage('????????? ????????? ????????????????????? : )');
      setEmailDuplicate(false);
    } else {
      setEmailMessage('?????? ????????? ?????????????????? .. ???????????? ????????? ?????????!');
      setEmailDuplicate(true);
      setEmailCheckState(false);
    }
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <div className="container mx-auto flex max-w-sm flex-1 flex-col items-center justify-center px-2">
        <div className="w-full rounded bg-white px-6 py-8 text-black ">
          <div className='pb-6'><img src="https://j7d108.p.ssafy.io/resource/logo.png" alt="" className='w-14 h-14' /></div>
          <h1 className="mb-4 text-xl leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
            ????????????
          </h1>
          <input
            id="FullName"
            onChange={onChangeName}
            type="text"
            className={`my-2 block w-full rounded border p-3  ${isNameBlur
                ? 'border-stone-200'
                : `${isName ? 'border-green-600' : 'border-red-500'}`
              }`}
            name="fullname"
            placeholder="??????"
            onBlur={() => {
              setIsNameBlur(false);
            }}
            required
          />
          {name.length > 0 && (
            <span
              className={`text-[0.7rem] ${isName ? 'text-blue-400' : 'text-gray-500'
                }`}
            >
              {nameMessage}
            </span>
          )}
          <input
            id="Email"
            onChange={onChangeEmail}
            type="text"
            className={`my-2 block w-full rounded border p-3  ${isEmailBlur
                ? 'border-stone-200'
                : `${isEmail ? 'border-green-600' : 'border-red-500'}`
              }`}
            name="email"
            placeholder="?????????"
            onBlur={() => {
              setIsEmailBlur(false);
            }}
            required
          />
          <div className="flex justify-between">
            {email.length > 0 && (
              <span
                className={`text-[0.7rem] ${isEmail && !emailDuplicate && emailCheckState
                    ? 'text-blue-400'
                    : 'text-gray-500'
                  }`}
              >
                {emailMessage}{' '}
              </span>
            )}
            {isEmail && emailDuplicate ? (
              <span
                onClick={() => {
                  checkEmail(email);
                }}
                className="text-[0.7rem] text-blue-600"
              >
                ????????? ?????? ????????????
              </span>
            ) : (
              ''
            )}
          </div>

          <input
            id="Password1"
            onChange={onChangePassword}
            type="password"
            className={`my-2 block w-full rounded border p-3  ${isPasswordBlur
                ? 'border-stone-200'
                : `${isPassword ? 'border-green-600' : 'border-red-500'}`
              }`}
            name="pwd"
            placeholder="????????????"
            required
          />
          {pwd.length > 0 && (
            <span
              className={`text-[0.7rem] ${isPassword ? 'text-blue-400' : 'text-gray-500'
                }`}
            >
              {passwordMessage}
            </span>
          )}
          <input
            id="Password2"
            onChange={onChangePasswordConfirm}
            type="password"
            className={`my-2 block w-full rounded border p-3  ${isPasswordConfirmBlur
                ? 'border-stone-200'
                : `${isPasswordConfirm ? 'border-green-600' : 'border-red-500'}`
              }`}
            name="confirm_password"
            placeholder="???????????? ??????"
            required
          />
          {passwordConfirm.length > 0 && (
            <span
              className={`text-[0.7rem] ${isPasswordConfirm ? 'text-blue-400' : 'text-gray-500'
                }`}
            >
              {passwordConfirmMessage}
            </span>
          )}
          <input
            id="Birth"
            type="date"
            onChange={onChangeDatePicker}
            data-placeholder="????????????"
            required
            aria-required="true"
            className="my-2 block w-full rounded border border-stone-200 p-3"
            name="birthday"
            min="1899-12-31"
            max={today()}
          />
          {/* gender selectors */}
          <div className="required mx-auto mb-4 grid max-w-md grid-cols-2 gap-x-3">
            <div>
              <input
                className="peer sr-only"
                type="radio"
                value="m"
                name="gender"
                id="male"
                onChange={onChangeGender}
              />
              <label
                className="flex cursor-pointer rounded-lg border border-gray-300 bg-white p-3 hover:bg-gray-50 focus:outline-none peer-checked:border-transparent peer-checked:ring-2 peer-checked:ring-stone-700"
                htmlFor="male"
              >
                ??????
              </label>
            </div>
            <div>
              <input
                className="peer sr-only"
                type="radio"
                value="f"
                name="gender"
                id="female"
                onChange={onChangeGender}
              />
              <label
                className="flex  cursor-pointer rounded-lg border border-gray-300 bg-white p-3 hover:bg-gray-50 focus:text-gray-600 focus:outline-none peer-checked:border-transparent peer-checked:ring-2 peer-checked:ring-stone-700"
                htmlFor="female"
              >
                ??????
              </label>
            </div>
          </div>
          {/* input box end */}
          <button
            type="submit"
            className={`my-1 w-full rounded-lg ${!(
                isName &&
                isEmail &&
                isPassword &&
                isGender &&
                isPasswordConfirm &&
                isDate &&
                emailCheckState
              )
                ? 'bg-gray-400'
                : 'bg-blue-500'
              } py-2.5 text-center text-white focus:outline-none`}
            disabled={
              !(
                isName &&
                isEmail &&
                isPassword &&
                isPasswordConfirm &&
                isDate &&
                isGender &&
                emailCheckState
              )
            }
          >
            ??????????????????
          </button>
        </div>

        <div className="mb-6 text-stone-600">
          ?????? ???????????????????{' '}
          <a className="text-blue-500" href="../login/">
            ???????????????
          </a>
        </div>
      </div>
    </form>
  );
};

export default SignUp;
