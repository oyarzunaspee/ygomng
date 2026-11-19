import "./styles.css";
// external libraries
import { usePageContext } from "vike-react/usePageContext";
import type { ReactNode } from "react";
// types
import type { customPageContext } from "../pages/+onCreatePageContext";
// components
import RegularNav from "./components/RegularNav";
import PageNav from "./components/PageNav";
import Content from "./components/Content";
import Splash from "../components/Splash";


export default function Layout({ children }: { children: ReactNode }) {
    const { urlParsed, abortStatusCode, fullView } = usePageContext() as customPageContext

    const regex = /^\/(original|bunkoban)\/chapter\/\d{1,3}$/i

    const isChapterPage = urlParsed.pathnameOriginal.match(regex)

    return (
        <>
            <div className="min-h-screen flex flex-col bg-yami">
                {!fullView &&
                    <div className="pt-5">
                        <Splash classes="h-40" />
                    </div>
                }
                <Content>
                    {children}
                </Content>

                {isChapterPage &&
                    <PageNav />
                }
                {!isChapterPage &&
                    <RegularNav />
                }

            </div>
        </>
    )
}