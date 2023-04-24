import React, { useMemo, useState } from "react";
import Link from "next/link";

import { globalRoutes } from "../../config/global.routes";

import * as S from "./styles";

type DropdownProps = {
  children?: string;
};

type Route = {
  path: string;
  name: string;
};

type Routes = {
  [key: string]: Route[];
};

const routes: Routes = {
  globalRoutes,
};

const Dropdown = ({ children }: DropdownProps) => {
  const [show, setShow] = useState(false);

  const toggleDropdown = () => {
    setShow((current) => !current);
  };

  return (
    <S.Wrapper>
      <S.Container isOpen={show}>
        <S.Title onClick={toggleDropdown}>
          <S.UserContainer>
            <span>
              {children}
              <S.ArrowIcon isOpen={show} />
            </span>
          </S.UserContainer>
        </S.Title>
        <S.Content isOpen={show}>
          <ul>
            {Object.entries(routes).map(([key, value]) => (
              <React.Fragment key={key}>
                {value.map((route) => (
                  <S.ListItem key={route.path}>
                    <Link href={route.path}>{route.name}</Link>
                  </S.ListItem>
                ))}
              </React.Fragment>
            ))}
          </ul>
        </S.Content>
      </S.Container>
      <S.Overlay isOpen={show} onClick={() => setShow(false)} />
    </S.Wrapper>
  );
};

export default Dropdown;
