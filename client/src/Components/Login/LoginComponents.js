import styled from 'styled-components';

export const Section = styled.div`
    height: 100vh;
    display: grid;
    place-items: center;
    background-color: #E0E0F8;
`
export const Holder = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50%;
    height: 425px;
    background-color: white;
`

export const Container = styled.div`
    display: grid;
    width: 100%;
    height: 100%;
    grid-template-columns: 0.9fr 1.1fr;
    grid-gap: 5px;
`

export const Left = styled.div`
    display: grid;
    place-items: center;
`

export const Logo = styled.img`
    width: 100%;
    height: 100%;
`

export const Right = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px 0;
    align-items: center;
    justify-content: space-evenly;
`

export const Ice = styled.img`
    width: 45%;
    display: grid;
    place-items: center;
`

export const Form = styled.div`
    display: grid;
    place-items: center;
    width: 100%;
    height: 100%;
    padding: 10px 0px;
    grid-template-rows: 1fr 1fr 1fr;
`