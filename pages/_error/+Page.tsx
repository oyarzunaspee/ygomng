import { useState } from "react";
import { usePageContext } from "vike-react/usePageContext";
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
      <Logo animation="animate-bounce" />
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

    </div>
    </>
  );
}
