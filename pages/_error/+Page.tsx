import { useState } from "react";
import { usePageContext } from "vike-react/usePageContext";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid";
import { navigate } from "vike/client/router";

import Splash from "../../components/Splash";

export default function Page() {
  // const [isRedirecting, setIsRedirecting] = useState(false)
  const { is404, abortStatusCode } = usePageContext();

  // const handleLogin = () => {
  //   setIsRedirecting(true)
  //   window.location.href = `${import.meta.env.PUBLIC_ENV__BACKEND_URL}/v1/auth/twitter`;
  // };


  return (
    <>
    <div className="flex flex-col h-screen text-white justify-center items-center">

      <Splash classes="animate-bounce h-60" />
        {abortStatusCode === 401 &&
        <h1 className="text-[25px] my-2">
          Not available rn
        </h1>
        }
        {is404 &&
        <>
        <h1 className="text-[25px] my-2">
          Page not found
        </h1>
        </>
        }
        {(abortStatusCode != 401 && !is404) &&
        <>
        <h1 className="text-[25px] my-2">
          Something went wrong
        </h1>
        <span className="opacity-75">
          idk man let's pray
        </span>
        </>
        }
        {abortStatusCode != 401 &&
        <div 
        onClick={() => {
          navigate("/")
        }}
        className="flex flex-col mt-5 p-5 items-center cursor-pointer hover:text-link">
          <ArrowUturnLeftIcon className="size-6" />
          <small>
            back home
          </small>
        </div>
        }

    </div>
    </>
  );
}
