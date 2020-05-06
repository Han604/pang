import React from 'react';
import styled from 'styled';
import fetch from 'node-fetch';

const Wardrobe = () => {
    const [loading, setLoading] = React.useState(null);
    const [wardrobe, setWardrobe] = React.useState(null);

    React.useEffect(() => {
        setLoading('loading')
        fetch(`/api/wardrobe/${_id}`)
        .then(res=> res.json)
        .then(data => {
            if (data.status === 200) {
                setWardrobe(data)
                setLoading('idle')
            } else {
                console.log(data.message);
                setLoading('idle')
            }
        })
    })

    if (loading === 'idle') {
        return (
            <Wrapper>
                {wardrobe.forEach(item => {
                    return <img url={item.imgURL}/>
                })}
            </Wrapper>
        )
    }
}

const Wrapper = styled.div`
    min-width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: repeat(auto-fill, 100px);
`

export default Wardrobe