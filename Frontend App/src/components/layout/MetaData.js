import React from 'react'
import { Helmet } from 'react-helmet'//setting various HTTP headers

const MetaData = ({ title }) => {//metadata add various headers according to the title
    return (
        <Helmet>
            <title>{`${title} - Next-Level`}</title>
        </Helmet>
    )
}

export default MetaData
