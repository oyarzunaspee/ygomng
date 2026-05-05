import "./styles.css";

import { usePageContext } from "vike-react/usePageContext";

import RegularNav from "./components/RegularNav";
import PageNav from "./components/PageNav";
import Content from "./components/Content";
import { useAppDispatch } from "../store/hooks";

import Logo from "../components/Logo";


export default function Layout({ children }: { children: React.ReactNode }) {
    const dispatch = useAppDispatch()
    const { urlParsed, abortStatusCode } = usePageContext()
    const regex = /^\/(original|bunkoban)\/chapter\/\d{1,3}$/i


    return (
        <>
            <div className="min-h-screen bg-yami">
                {!urlParsed.pathnameOriginal.match(regex) && !abortStatusCode &&
                    <div className="pt-5">
                        <Logo classes="h-40" />
                    </div>
                }
                <Content>
                    {children}
                </Content>

                {urlParsed.pathnameOriginal.match(regex) && !abortStatusCode &&
                    <PageNav />
                }
                {!urlParsed.pathnameOriginal.match(regex) && !abortStatusCode &&
                    <RegularNav />
                }
            </div>
        </>
    )
}