import Image from "next/image";
import Link from "next/link";
import UserDropdown from "../UserDropdown";
import Dropdown from "../Dropdown";

import * as S from "./styles";

const Navbar = () => {
  return (
    <S.Wrapper>
      <S.WrapperLogo>
        <Link href="/">
          <Image
            src="/assets/images/rubeus-white.svg"
            width={200}
            height={40}
            quality={80}
            alt="rubeus-white"
          />
        </Link>
      </S.WrapperLogo>
      <S.Menu>
        <S.MenuList>
          <S.MenuItem>
            <Link href="/">Inicio</Link>
          </S.MenuItem>
          <S.MenuItem>
            <Dropdown children="Cadastros" />
          </S.MenuItem>
        </S.MenuList>
      </S.Menu>
    </S.Wrapper>
  );
};

export default Navbar;
