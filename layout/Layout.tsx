import "./styles.css";

import { usePageContext } from "vike-react/usePageContext";

import RegularNav from "./components/RegularNav";
import PageNav from "./components/PageNav";
import Content from "./components/Content";
import { useOutsideClick } from "../hooks/outsideClick";
import { useAppDispatch } from "../store/hooks";
import { closeScreen } from "../store/slices/pageMenu";

export default function Layout({ children }: { children: React.ReactNode }) {
    const dispatch = useAppDispatch()
    const { urlParsed } = usePageContext()
    const regex = /^\/(original|bunkoban)\/chapter\/\d{1,3}$/i

    
    return (
        <>
            <div className="min-h-screen bg-yami">
                <Content>
                    {children}
                </Content>

                {urlParsed.pathnameOriginal.match(regex) ?
                    
                        <PageNav />
                    :
                        <RegularNav />
                }
            </div>
        </>
    )
}