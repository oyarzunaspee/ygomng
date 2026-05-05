import { useState } from "react";
import { usePageContext } from "vike-react/usePageContext";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid";
import { navigate } from "vike/client/router";

import Logo from "../../components/Logo";

export default function Page() {
  const [isRedirecting, setIsRedirecting] = useState(false)
  const { is404, abortStatusCode } = usePageContext();

  const handleLogin = () => {
    setIsRedirecting(true)
    window.location.href = `${import.meta.env.BACKEND_URL}/v1/auth/twitter`;
  };


  return (
    <>
    <div className="flex flex-col h-screen justify-center items-center">

      <Logo classes="animate-bounce h-60" />
        {abortStatusCode === 401 &&
        <>
        <button 
        className="border-link text-link bg-transparent px-12 btn relative"
        onClick={handleLogin}>
          access with twitter
          {isRedirecting &&
          <span className="loading absolute text-link right-4 loading-spinner loading-sm"></span>
          }
        </button>
        </>
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
