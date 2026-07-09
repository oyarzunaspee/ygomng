import "./styles.css";
import { Analytics } from "@vercel/analytics/react"
import { usePageContext } from "vike-react/usePageContext";
import type { customPageContext } from "../pages/+onCreatePageContext";

import RegularNav from "./components/RegularNav";
import PageNav from "./components/PageNav";
import Content from "./components/Content";

import Logo from "../components/Logo";


export default function Layout({ children }: { children: React.ReactNode }) {
    const { urlParsed, abortStatusCode, fullView } = usePageContext() as customPageContext
    const regex = /^\/(original|bunkoban)\/chapter\/\d{1,3}$/i

    return (
        <>
            <div className="min-h-screen flex flex-col bg-yami">
                {!fullView && abortStatusCode == undefined &&
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