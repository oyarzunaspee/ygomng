import { Squares2X2Icon, ListBulletIcon } from "@heroicons/react/24/outline";
import { navigate } from "vike/client/router";
import { useState } from "react";

const Switch = ({ 
  listing, 
  setListing, 
  bunkoban,
  loading }: { 
    listing: boolean, 
    setListing: Function, 
    bunkoban: boolean,
    loading: boolean
  }) => {

    const [editionClicked, setEditionClicked] = useState("")

  return (
    <>
      <div className="flex justify-between items-center mt-10 text-purple-300 px-10">
        <div className="flex">
          {["Original", "Bunkoban"].map((edition: string) => {
            return (

              <label key={edition} htmlFor={edition}
                onClick={() => {
                  setEditionClicked(edition)
                  navigate(`/${edition.toLowerCase()}`)
                }}
                className="mr-5 cursor-pointer flex align-items-center">
                  {loading && editionClicked == edition ?
                  <span className="loading loading-spinner loading-md mr-2"></span>
                  :
                  <input type="radio" name={edition}
                    className="radio-md radio mr-2"
                    checked={edition == "Original" && !bunkoban ? true : (edition == "Bunkoban" && bunkoban ? true : false)}
                  />
                }
                <span
                  className={edition == "Original" && bunkoban ? "opacity-50" : (edition == "Bunkoban" && !bunkoban ? "opacity-50" : "")}
                >
                  {edition}

                </span>
                
              </label>

            )
          })}
        </div>
        <label

          className="btn btn-circle rounded-full bg-yamier border-link text-link ">
          {listing ?
            <Squares2X2Icon
              onClick={() => setListing(!listing)}
              className={`size-7 `} />
            :
            <ListBulletIcon
              onClick={() => setListing(!listing)}
              className={`size-7 `} />

          }

        </label>
      </div>
    </>
  )
}

export default Switch;