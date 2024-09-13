import styled from "styled-components"
import HeaderMenu from "./HeaderMenu"
import UserAvatar from '../features/authentication/UserAvatar'

const HeaderStyle = styled.header`
background-color:var(--color-gray-0);
padding:1.2rem 4.8rem;
border-bottom: 1px solid var(--color-grey-100);
display: flex;
gap: 2.4rem;
align-items: center;
justify-content: flex-end;
`

export default function Header() {
  return (
    <HeaderStyle>
      <UserAvatar />
      <HeaderMenu />
    </HeaderStyle>
  )
}
