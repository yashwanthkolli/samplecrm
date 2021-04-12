import styled from 'styled-components';

export const Holder = styled.div`
    display: grid;
    width: 100%;
    height: 100%;
    place-items: center;
    grid-template-columns: 3fr 7fr;
    grid-gap: 15px;

    @media screen and (max-width: 768px){
        grid-template-columns: unset;
        display: flex;
        flex-direction: column;
    }
`

export const ImageHolder = styled.img`
    width: 100%;
    height: 100%;
`

export const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
`

export const TextContainer = styled.div`
    width: 100%;
    height: 100%;
`

export const Heading = styled.div`
    font-size: 28px;
    font-family: Nunito, sans-serif;
    width: 100%;
    text-align: center;
    margin-bottom: 15px;

    @media screen and (max-width: 768px){
        font-size: 22px;
    }
`

export const Summary = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: apce-between;
    align-items: center;
`