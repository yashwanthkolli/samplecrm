import styled from 'styled-components';

export const Holder = styled.div`
    display: grid;
    width: 100%;
    height: 100%;
    grid-template-columns: 3fr 7fr;
    grid-gap: 18px;

    @media screen and (max-width: 768px){
        grid-template-columns: unset;
        display: flex;
        flex-direction: column;
    }
`

export const ImageHolder = styled.img`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    align-items: flex-start;
    justify-content: center;
    margin-top: 15px;

    @media screen and (maxx-width: 768px){
        flex-direction: row;
    }
`

export const TextContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;

    @media screen and (max-width: 768px){
        align-items: center;
    }
`

export const Heading = styled.div`
    font-size: 30px;
    font-family: Nunito, sans-serif;
    width: 100%;
    font-weight: 600;
    margin-bottom: 15px;

    @media screen and (max-width: 768px){
        font-size: 22px;
    }
`

export const TextWrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 85%;
    min-height: 50px;
    align-items: center;
    justify-content: center;

    @media screen and (max-width: 768px){
        width: 100%;
    }
`

export const Title = styled.div`
    width: 40%;
    font-size: 20px;
    font-family: Nunito;
    font-weight: 600;

    @media screen and (max-width: 768px){
        font-size: 16px;
    }
`

export const Value = styled.div`
    font-size: 20px;
    font-family: Nunito;
    width: 60%;

    @media screen and (max-width: 768px){
        font-size: 16px;
    }
`