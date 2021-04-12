import styled from 'styled-components';

export const Holder = styled.div`
    display: grid;
    width: 100%;
    height: 100%;
    place-items: center;
    grid-template-columns: 3fr 7fr;
    grid-gap: 15px;

    @media screen and (max-width: 768px){
        
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