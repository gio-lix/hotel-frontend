import {useParams} from "react-router-dom";

import React from "react";

const generatePage = (name: string) => {
    const component = () => require(`./pages/${name}`).default

    try {
        return React.createElement(component())
    } catch (err) {
        return "";
    }
}

const PageRender: any = () => {
    const {page, slug} = useParams()

    let name = ""

    if (page) {
        name = slug ? `${page}/[slug]` : `${page}`
    }

    return generatePage(name)
};

export default PageRender;