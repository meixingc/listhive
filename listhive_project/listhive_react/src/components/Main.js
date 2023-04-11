import { Route } from "react-router-dom"
import About from "./main/basic/About"
import PageTitle from "./PageTitle"

export default function Main() {
    return (
        <div>
            <PageTitle />
            <About />
        </div>
    )
}