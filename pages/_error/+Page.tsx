import { useState } from "react";
import { usePageContext } from "vike-react/usePageContext";
import { ArrowUturnLeftIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";
import { navigate } from "vike/client/router";

import Splash from "../../components/Splash";

export default function Page() {
  // const [isRedirecting, setIsRedirecting] = useState(false)
  const { is404, abortStatusCode, isErrorPage } = usePageContext();

  // twitter login (deprecated)
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
        {abortStatusCode != 401 && (abortStatusCode != undefined && isErrorPage) &&
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
        {abortStatusCode == undefined &&

        <a href="https://kbsta.straw.page" target="_blank" className="mt-5 underline-offset-5 underline text-link">
          <span>
          shoot me a message
          </span>
          <ArrowTopRightOnSquareIcon className="size-6 inline ml-2" />
        </a>
        }

    </div>
    </>
  );
}
